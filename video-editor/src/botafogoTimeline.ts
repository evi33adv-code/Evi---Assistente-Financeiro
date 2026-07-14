// Timeline for the Botafogo property reel: talking-head clips from the raw
// walk-and-talk video, cut away to Botafogo neighborhood photos (and one
// reused renovation shot) while her voiceover keeps playing underneath.

export type TalkSegment = {
  kind: "talk";
  file: string;
  durationInFrames: number;
};

export type ImageSegment = {
  kind: "image";
  file: string;
  pan: "in" | "out" | "left-right" | "right-left";
  focalPoint?: string;
  durationInFrames: number;
  caption: { eyebrow?: string; text: string; accent?: string };
};

export type ClipSegment = {
  kind: "clip";
  file: string;
  zoom: "in" | "out" | "none";
  grade: "warm" | "cool" | "bw" | "night" | "none";
  durationInFrames: number;
  caption?: { eyebrow?: string; text: string; accent?: string };
};

export type CardSegment = {
  kind: "card";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
  durationInFrames: number;
};

export type Segment = TalkSegment | ImageSegment | ClipSegment | CardSegment;

export type TransitionKind =
  | "fade"
  | "slide-right"
  | "slide-bottom"
  | "wipe-left"
  | "wipe-top"
  | "clock-wipe";

export const segments: Segment[] = [
  {
    kind: "card",
    durationInFrames: 27,
    eyebrow: "Botafogo, Rio de Janeiro",
    title: "Seu proximo endereco",
    accent: "#FFB020",
  },
  { kind: "talk", file: "botafogo_clips/talk1.mp4", durationInFrames: 40 },
  {
    kind: "image",
    file: "images/botafogo-bay.jpg",
    pan: "in",
    durationInFrames: 42,
    caption: { eyebrow: "Direto ao ponto", text: "Documentacao 100% em dia", accent: "#FFB020" },
  },
  { kind: "talk", file: "botafogo_clips/talk2.mp4", durationInFrames: 45 },
  {
    kind: "clip",
    file: "clips/clip07.mp4",
    zoom: "in",
    grade: "warm",
    durationInFrames: 36,
    caption: { eyebrow: "Antes e depois", text: "Apartamento totalmente reformado", accent: "#3DDC97" },
  },
  { kind: "talk", file: "botafogo_clips/talk3.mp4", durationInFrames: 42 },
  {
    kind: "image",
    file: "images/botafogo-lifestyle.jpg",
    pan: "right-left",
    durationInFrames: 39,
    caption: { eyebrow: "Bairro vivo", text: "Pronto para voce investir", accent: "#FFB020" },
  },
  { kind: "talk", file: "botafogo_clips/talk4.mp4", durationInFrames: 41 },
  {
    kind: "image",
    file: "images/botafogo-night.jpg",
    pan: "out",
    durationInFrames: 45,
    caption: { eyebrow: "Vida em Botafogo", text: "Morar ou lucrar no Airbnb", accent: "#3DDC97" },
  },
  {
    kind: "card",
    durationInFrames: 40,
    eyebrow: "Vamos juntos",
    title: "Fale com a Evi",
    subtitle: "e agende sua visita em Botafogo",
    accent: "#3DDC97",
  },
];

export const transitions: { kind: TransitionKind; durationInFrames: number }[] = [
  { kind: "slide-right", durationInFrames: 10 },
  { kind: "wipe-left", durationInFrames: 10 },
  { kind: "fade", durationInFrames: 8 },
  { kind: "wipe-top", durationInFrames: 10 },
  { kind: "fade", durationInFrames: 8 },
  { kind: "clock-wipe", durationInFrames: 12 },
  { kind: "fade", durationInFrames: 8 },
  { kind: "slide-bottom", durationInFrames: 10 },
  { kind: "fade", durationInFrames: 14 },
];

export const totalDurationInFrames =
  segments.reduce((sum, s) => sum + s.durationInFrames, 0) -
  transitions.reduce((sum, t) => sum + t.durationInFrames, 0);

// Where each segment begins in the final composition, per TransitionSeries'
// own overlap rule (next start = previous end - transition duration). Used
// to find when the first "talk" segment appears, so the continuous
// voiceover <Audio> can be started at that exact frame and stay in lip-sync
// with every later "talk" segment (each one was cut from the source at the
// matching offset -- see the comment above the talk clip cuts in the repo
// history / README).
const segmentStarts: number[] = [];
{
  let end = 0;
  segments.forEach((s, i) => {
    const start = i === 0 ? 0 : end - transitions[i - 1].durationInFrames;
    segmentStarts.push(start);
    end = start + s.durationInFrames;
  });
}

const firstTalkIndex = segments.findIndex((s) => s.kind === "talk");
export const voiceoverStartFrame = segmentStarts[firstTalkIndex];
