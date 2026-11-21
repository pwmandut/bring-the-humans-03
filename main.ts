// bring-the-humans-03 entry: a TikTok ad for make.fun.
//
// This program is the whole entrypoint. It takes VIDEO.json from the
// repository root and places an identical copy at <output>/VIDEO.json,
// which is where the house reads the video's address from. It does no
// network access, reads no clock, and touches no file outside the repo
// and the output directory, so two runs write the same bytes.
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

// Fail loudly instead of shipping a stale or unreadable file: the
// submitted file must be a JSON object carrying a url string. The
// placeholder VIDEO.json ships with this repository on purpose (the
// gate refuses it until the real TikTok address is filled in), so the
// url is not format-checked here: the house reads the video itself.
let parsed;
try {
  parsed = JSON.parse(readFileSync(sourcePath, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof parsed !== 'object' || parsed === null || typeof parsed.url !== 'string') {
  console.error(`VIDEO.json in ${BOT_DIR} does not carry a url string`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
