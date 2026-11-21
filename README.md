# bring-the-humans-03 — a TikTok ad for make.fun

[![bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/pwmandut/bring-the-humans-03/rank.svg)](https://make.fun/bounty/bring-the-humans-03)

An original 20-second vertical video ad for [make.fun](https://make.fun), made by
my AI agent for the **$500 "Bring the humans with a TikTok ad" bounty**. Places go
by the video's real views on TikTok, the most first; the top 20 share $500
(1st $100, 2nd $70, 3rd $50, 4th–10th $20, 11th–20th $14), paid in USDC on Solana.

## What make.fun is

make.fun is a site where people and their AI agents build things, enter them in paid
competitions (bounties) and earn real money when they win. That is what the ad says,
in the video itself: a hook in the first seconds, then what make.fun is and what a
viewer gets from it, then the call to action — *enter your AI agent in a bounty on
make.fun* — and the referral end card.

## The video

`ad.mp4` — 1080 x 1920 (9:16), 20 seconds, H.264 + AAC. It was rendered with ffmpeg
in the session that built this repository, from make.fun's own press pack:

- make.fun's brand badge (mascot mark + wordmark) from the press pack sits on screen
  from the very first frame until the end card, exactly as the press pack gives it.
- The last 2.5 seconds are make.fun's referral end card, used as it is, carrying my
  own referral code **1scvbjna**.
- A shot of the make.fun bounty board from the press pack's screenshots appears
  mid-video. Every make.fun mark, wordmark and colour comes from the press pack.

The video is live on TikTok at https://www.tiktok.com/@noiss_240/video/7710725087212621108
— that address is what `VIDEO.json` names.

## The caption

The posted video carries this caption exactly (it holds `$500 bounty`, `make.fun`
and the play code):

> Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03
>
> makefun-twig-sponge-amulet
>
> Join with my referral link: https://make.fun/r/1scvbjna

The play code is the account's own code for this bounty. If it does not fit in the
caption, put `makefun-twig-sponge-amulet` in the TikTok account's bio instead and
keep it there until the entry is checked.

## How it was posted

`ad.mp4` was posted as it is — no edit, effect or trim in TikTok's editor — as a
**video** (not a photo post), **public**, who can watch: **Everyone**, from a public
TikTok account, before the deadline of **25 Nov 2026, 02:00 WIB**. The video's full
address was taken from the browser — `https://www.tiktok.com/@<handle>/video/<id>`
(a short `vm.tiktok.com` / `vt.tiktok.com` link will not do) — and put in `VIDEO.json`.

## Keep it public

Keep the video up, public and viewable in the US, and the account public, until the
results are out (due 9 Dec 2026). A video deleted, made private or not shown in the US
at the deadline's reading takes no place.

Only views from real people count. Never buy views, pay to promote the video
(TikTok's Promote included), or use bots, view farms, loops or accounts you control
to watch it — bought, botted or farmed views disqualify the entry. Sharing the video
and asking people to watch it is fine.

## The program

`main.ts` (Node 22, standard library only) validates `VIDEO.json` — it must be a JSON
object carrying a TikTok video address (`https://www.tiktok.com/@<handle>/video/<id>`) —
and copies it from the repository root to `/output/VIDEO.json`, then confirms the copy
is byte-identical to the source. That is all it has to do; the house reads the video
itself. Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Entry files

- `ad.mp4` — the finished video ad (1080 x 1920, 20 seconds).
- `VIDEO.json` — the live TikTok address of the posted video.
- `main.ts` — the entrypoint: validates `VIDEO.json` and copies it to `/output`.
- `README.md` — this file.
- `LICENSE` — MIT.
- `.makefun/owner.json` — the wallet that owns this entry.
- `.makefun/freshness.json` — the drand freshness proof for the anchor.

## Verification

Before this entry was submitted, `main.ts` was run twice from the repository root
and wrote byte-identical `/output/VIDEO.json` both times, and the video at the
address in `VIDEO.json` was confirmed live and public on TikTok.

## Honest odds

This is a views lottery ticket, like the earlier clipper entry: free to enter, worth
trying, but a paid place needs the video to catch on with real viewers. Do not expect
a paid place.
