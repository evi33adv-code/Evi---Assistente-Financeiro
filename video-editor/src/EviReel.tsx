import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, type TransitionTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { GradedClip } from "./components/GradedClip";
import { BrandCard } from "./components/BrandCard";
import { CinemaGrade } from "./components/CinemaGrade";
import { WatermarkMask } from "./components/WatermarkMask";
import { segments, transitions, type TransitionKind } from "./timeline";

const timing = (durationInFrames: number): TransitionTiming =>
  linearTiming({ durationInFrames, easing: Easing.inOut(Easing.cubic) });

const presentationFor = (kind: TransitionKind, width: number, height: number) => {
  switch (kind) {
    case "fade":
      return fade();
    case "slide-right":
      return slide({ direction: "from-right" });
    case "slide-bottom":
      return slide({ direction: "from-bottom" });
    case "wipe-left":
      return wipe({ direction: "from-left" });
    case "wipe-top":
      return wipe({ direction: "from-top" });
    case "clock-wipe":
      return clockWipe({ width, height });
    default:
      return fade();
  }
};

export const EviReel: React.FC = () => {
  const { width, height, durationInFrames, fps } = useVideoConfig();

  const musicVolume = (frame: number) =>
    interpolate(
      frame,
      [0, fps * 1, durationInFrames - fps * 1.2, durationInFrames],
      [0, 0.85, 0.85, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Audio src={staticFile("audio/nonstop.mp3")} volume={musicVolume} />

      <CinemaGrade>
        <TransitionSeries>
          {segments.map((segment, i) => {
            const node =
              segment.kind === "card" ? (
                <BrandCard
                  eyebrow={segment.eyebrow}
                  title={segment.title}
                  subtitle={segment.subtitle}
                  accent={segment.accent}
                />
              ) : (
                <GradedClip
                  file={segment.file}
                  zoom={segment.zoom}
                  grade={segment.grade}
                  focalPoint={segment.focalPoint}
                />
              );

            const transition = transitions[i];

            return (
              <React.Fragment key={i}>
                <TransitionSeries.Sequence durationInFrames={segment.durationInFrames}>
                  {node}
                </TransitionSeries.Sequence>
                {transition ? (
                  <TransitionSeries.Transition
                    timing={timing(transition.durationInFrames)}
                    presentation={presentationFor(transition.kind, width, height) as never}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </TransitionSeries>
      </CinemaGrade>

      <WatermarkMask />
    </AbsoluteFill>
  );
};
