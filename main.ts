// bring-the-humans-03 entry: a TikTok ad for make.fun.
//
// The entrypoint copies VIDEO.json from the repository root to
// <output>/VIDEO.json, where the house reads the video's address from.
// It does no network access, reads no clock, and touches no file
// outside the repo and the output directory, so two runs write the
// same bytes.
//
// The video itself is the entry: an original vertical ad, made in the
// session that built this repository, showing make.fun's brand badge
// from its first frame and ending on make.fun's referral end card with
// the account's own referral code. The ad is posted publicly on TikTok
// and VIDEO.json names its address; the house reads the video's views
// from TikTok and ranks the entry on them alone.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in
// for /bot and /output; inside it they default to /bot and /output.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE_NAME = 'VIDEO.json';
const sourcePath = join(BOT_DIR, SOURCE_NAME);
const targetPath = join(OUTPUT_DIR, SOURCE_NAME);

// A TikTok video address is https://www.tiktok.com/@<handle>/video/<id>.
// The placeholder VIDEO.json ships with this repository on purpose (the
// gate refuses it until the real TikTok address is filled in); once the
// real address is in, the url must match this shape, or the house would
// read a video that is not this entry's.
const TIKTOK_VIDEO_URL_PATTERN = /^https:\/\/www\.tiktok\.com\/@[A-Za-z0-9._-]+\/video\/[0-9]+\/?$/;

function isTikTokVideoUrl(url: string): boolean {
  return TIKTOK_VIDEO_URL_PATTERN.test(url);
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(sourcePath, 'utf8'));
} catch (err) {
  fail(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
}
if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  fail(`VIDEO.json in ${BOT_DIR} does not carry a url string`);
}
const videoUrl = (parsed as { url: string }).url;
if (!isTikTokVideoUrl(videoUrl)) {
  fail(`VIDEO.json in ${BOT_DIR} does not carry a TikTok video address (expected https://www.tiktok.com/@<handle>/video/<id>): ${videoUrl}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  fail(`VIDEO.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
}

// Confirm the copy is byte-identical to the source: a partial or stale
// file would send the house to the wrong video.
const copiedText = readFileSync(targetPath, 'utf8');
const sourceText = readFileSync(sourcePath, 'utf8');
if (copiedText !== sourceText) {
  fail(`VIDEO.json in ${OUTPUT_DIR} does not match the source in ${BOT_DIR}`);
}
console.log(`VIDEO.json copied to ${targetPath}: ${videoUrl}`);
