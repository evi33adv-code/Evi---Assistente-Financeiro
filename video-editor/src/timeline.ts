// Single source of truth for the edit: every clip/card duration and every
// transition duration between them. EviReel.tsx renders this, Composition.tsx
// sums it to get the exact total duration (TransitionSeries overlaps
// sequences by each transition's duration).

export type ClipSpec = {
  kind: "clip";
  trimBefore: number;
  trimAfter: number;
  zoom: "in" | "out" | "none";
  grade: "warm" | "cool" | "bw" | "night" | "none";
  focalPoint?: string;
};

export type CardSpec = {
  kind: "card";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
};

export type Segment = (ClipSpec | CardSpec) & { durationInFrames: number };

export type TransitionKind = "fade" | "slide-right" | "slide-bottom" | "wipe-left" | "wipe-top" | "clock-wipe";

// Clip in/out points were located by eye from an 8fps contact sheet of the
// source footage: every cut sits inside a stable window, clear of the
// original CapCut transitions/collages baked into the source pixels.
export const segments: Segment[] = [
  {
    kind: "card",
    durationInFrames: 30,
    eyebrow: "Evi Assistente Financeiro",
    title: "O que importa\nnuma compra",
    accent: "#FFB020",
  },
  { kind: "clip", durationInFrames: 43, trimBefore: 64, trimAfter: 107, zoom: "in", grade: "warm" },
  { kind: "clip", durationInFrames: 43, trimBefore: 120, trimAfter: 163, zoom: "out", grade: "cool" },
  { kind: "clip", durationInFrames: 16, trimBefore: 180, trimAfter: 196, zoom: "in", grade: "warm", focalPoint: "50% 40%" },
  { kind: "clip", durationInFrames: 17, trimBefore: 210, trimAfter: 227, zoom: "out", grade: "cool" },
  { kind: "clip", durationInFrames: 48, trimBefore: 236, trimAfter: 284, zoom: "in", grade: "warm" },
  { kind: "clip", durationInFrames: 32, trimBefore: 300, trimAfter: 332, zoom: "in", grade: "none" },
  { kind: "clip", durationInFrames: 43, trimBefore: 341, trimAfter: 384, zoom: "in", grade: "warm" },
  { kind: "clip", durationInFrames: 23, trimBefore: 424, trimAfter: 447, zoom: "out", grade: "night" },
  { kind: "clip", durationInFrames: 36, trimBefore: 469, trimAfter: 505, zoom: "in", grade: "warm" },
  { kind: "clip", durationInFrames: 39, trimBefore: 529, trimAfter: 568, zoom: "out", grade: "cool" },
  {
    kind: "card",
    durationInFrames: 45,
    eyebrow: "Vamos juntos",
    title: "Fale com a Evi",
    subtitle: "e organize o sonho da casa propria",
    accent: "#3DDC97",
  },
];

// One transition between every pair of consecutive segments. Each duration is
// kept <= the shorter of its two neighbouring segments (a TransitionSeries
// requirement).
export const transitions: { kind: TransitionKind; durationInFrames: number }[] = [
  { kind: "slide-right", durationInFrames: 14 },
  { kind: "wipe-left", durationInFrames: 8 },
  { kind: "clock-wipe", durationInFrames: 12 },
  { kind: "slide-bottom", durationInFrames: 8 },
  { kind: "fade", durationInFrames: 8 },
  { kind: "fade", durationInFrames: 14 },
  { kind: "fade", durationInFrames: 14 },
  { kind: "slide-right", durationInFrames: 8 },
  { kind: "wipe-top", durationInFrames: 8 },
  { kind: "fade", durationInFrames: 14 },
  { kind: "fade", durationInFrames: 16 },
];

export const totalDurationInFrames =
  segments.reduce((sum, s) => sum + s.durationInFrames, 0) -
  transitions.reduce((sum, t) => sum + t.durationInFrames, 0);
