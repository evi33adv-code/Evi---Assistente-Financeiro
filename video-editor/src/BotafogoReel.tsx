import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming, type TransitionTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { GradedClip } from "./components/GradedClip";
import { KenBurnsImage } from "./components/KenBurnsImage";
import { Caption } from "./components/Caption";
import { BrandCard } from "./components/BrandCard";
import { CinemaGrade } from "./components/CinemaGrade";
import { segments, transitions, voiceoverStartFrame, type TransitionKind } from "./botafogoTimeline";

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

export const BotafogoReel: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Sequence from={voiceoverStartFrame}>
        <Audio src={staticFile("botafogo-source.mp4")} />
      </Sequence>

      <CinemaGrade>
        <TransitionSeries>
          {segments.map((segment, i) => {
            const node = (() => {
              switch (segment.kind) {
                case "card":
                  return (
                    <BrandCard
                      eyebrow={segment.eyebrow}
                      title={segment.title}
                      subtitle={segment.subtitle}
                      accent={segment.accent}
                    />
                  );
                case "talk":
                  return <GradedClip file={segment.file} zoom="none" grade="warm" focalPoint="50% 35%" />;
                case "clip":
                  return (
                    <>
                      <GradedClip file={segment.file} zoom={segment.zoom} grade={segment.grade} />
                      {segment.caption ? <Caption {...segment.caption} /> : null}
                    </>
                  );
                case "image":
                  return (
                    <>
                      <KenBurnsImage file={segment.file} pan={segment.pan} focalPoint={segment.focalPoint} />
                      <Caption {...segment.caption} />
                    </>
                  );
                default:
                  return null;
              }
            })();

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
    </AbsoluteFill>
  );
};
