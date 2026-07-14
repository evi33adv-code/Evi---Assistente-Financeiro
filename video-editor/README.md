# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Evi Reel edit

The `EviReel` composition (`src/EviReel.tsx`) assembles a vertical (1080x1920)
Instagram-style edit. `public/source.mp4` is the full tone-mapped master;
`public/clips/clip01.mp4` … `clip10.mp4` are the individual shots already cut
out of it (each its own file — see "Gotcha" below for why). The cut points,
per-clip color grade / Ken Burns zoom, and the transition between every pair
of clips are all defined in one place: `src/timeline.ts`.

A shared `CinemaGrade` wrapper (`src/components/CinemaGrade.tsx`) applies one
global contrast/saturation/vignette pass over the whole edit so every shot
reads as one consistent look, and `WatermarkMask` blurs out the CapCut logo
baked into the top-right corner of the source footage.

Render it with:

```console
npx remotion render src/index.ts EviReel out/evi-reel.mp4
```

**Gotcha:** the original export was HDR (BT.2020/HLG) tagged; a naive
transcode that copies those tags onto an SDR h264 stream renders with
blown-out, neon-saturated colors in some players. `source.mp4` and the
`clips/*.mp4` were produced with an HDR→SDR tonemap
(`zscale=t=linear...,tonemap=hable,zscale=t=bt709...`) — re-run that if you
regenerate them from the original .mov. Separately, having multiple
`OffthreadVideo`s reference different trims of the *same* file inside a
`TransitionSeries` was hitting what looks like a Remotion/Chromium frame
decode bug during transitions (color corruption, only during the overlap);
per-clip files sidestep it. If you add clips, cut a new file per shot rather
than trimming a shared one.

**Music:** `public/audio/nonstop.mp3` is "Nonstop" by Kevin MacLeod
(incompetech.com), licensed under Creative Commons: By Attribution 4.0
(http://creativecommons.org/licenses/by/4.0/). Keep the attribution in the
post/video description when publishing.

## Botafogo Reel edit

The `BotafogoReel` composition (`src/BotafogoReel.tsx`, timeline in
`src/botafogoTimeline.ts`) is a second edit: a walk-and-talk voiceover
(`public/botafogo-source.mp4`, cut into `public/botafogo_clips/talk1..4.mp4`)
intercut with neighborhood photos (`public/images/`) and one reused shot from
the `EviReel` edit (`clips/clip07.mp4`).

The voiceover audio plays once, continuously, from `botafogo-source.mp4`
(wrapped in a `<Sequence from={voiceoverStartFrame}>`); the video cuts away
to photos/other clips on top of it without cutting the audio (standard
B-roll/voiceover editing). `voiceoverStartFrame` and the `talk*` clip in/out
points are pre-computed so playback stays lip-synced across every cutaway --
see the comment above `voiceoverStartFrame` in `botafogoTimeline.ts` before
changing any segment's `durationInFrames` or the transition durations,
since both feed that math.

Render it with:

```console
npx remotion render src/index.ts BotafogoReel out/botafogo-reel.mp4
```

**Photos:** from Wikimedia Commons.
- `botafogo-bay.jpg` -- ["20 Botafogo & Pão de Açúcar"](https://commons.wikimedia.org/wiki/File:20_Botafogo_%26_P%C3%A3o_de_A%C3%A7%C3%BAcar_(50700568102).jpg), CC BY-SA 2.0
- `botafogo-lifestyle.jpg` -- ["Pista de corrida e Corcovado"](https://commons.wikimedia.org/wiki/File:Pista_de_corrida_e_Corcovado_-_panoramio.jpg), CC BY-SA 3.0
- `botafogo-night.jpg` -- ["Playa de Botafogo"](https://commons.wikimedia.org/wiki/File:Playa_de_Botafogo_(8787831198).jpg), GFDL 1.2

Keep the attribution if you publish with these photos.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
