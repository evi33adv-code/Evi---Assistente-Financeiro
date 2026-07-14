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
  file: string;
  zoom?: Zoom;
  grade?: Grade;
  focalPoint?: string;
}> = ({ file, zoom = "in", grade = "warm", focalPoint = "50% 30%" }) => {
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

  // Kept deliberately subtle: the shared cinema LUT in CinemaGrade carries
  // the overall contrast/saturation look. This is just per-shot balancing.
  const filter =
    grade === "warm"
      ? "brightness(1.02) sepia(0.04)"
      : grade === "cool"
        ? "brightness(0.99) hue-rotate(-3deg)"
        : grade === "bw"
          ? "grayscale(1) contrast(1.08)"
          : grade === "night"
            ? "contrast(1.05) brightness(1.04)"
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
        src={staticFile(file)}
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
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.16) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
