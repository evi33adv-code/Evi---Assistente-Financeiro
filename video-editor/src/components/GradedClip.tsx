import React from "react";
import {
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Zoom = "in" | "out" | "none";
type Grade = "warm" | "cool" | "bw" | "night" | "none";

export const GradedClip: React.FC<{
  trimBefore: number;
  trimAfter: number;
  zoom?: Zoom;
  grade?: Grade;
  focalPoint?: string;
}> = ({
  trimBefore,
  trimAfter,
  zoom = "in",
  grade = "warm",
  focalPoint = "50% 30%",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = durationInFrames > 1 ? frame / (durationInFrames - 1) : 0;

  const scale =
    zoom === "in"
      ? interpolate(progress, [0, 1], [1, 1.14], {
          easing: Easing.out(Easing.quad),
        })
      : zoom === "out"
        ? interpolate(progress, [0, 1], [1.14, 1], {
            easing: Easing.out(Easing.quad),
          })
        : 1.02;

  const filter =
    grade === "warm"
      ? "contrast(1.08) saturate(1.28) brightness(1.03) sepia(0.05)"
      : grade === "cool"
        ? "contrast(1.1) saturate(1.12) brightness(0.99) hue-rotate(-4deg)"
        : grade === "bw"
          ? "grayscale(1) contrast(1.18)"
          : grade === "night"
            ? "contrast(1.18) saturate(1.35) brightness(1.1)"
            : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      <OffthreadVideo
        src={staticFile("source.mp4")}
        trimBefore={trimBefore}
        trimAfter={trimAfter}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPoint,
          transform: `scale(${scale})`,
          filter,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.32) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
