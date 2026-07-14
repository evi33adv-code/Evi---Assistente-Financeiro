import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type Pan = "in" | "out" | "left-right" | "right-left";

export const KenBurnsImage: React.FC<{
  file: string;
  pan?: Pan;
  focalPoint?: string;
}> = ({ file, pan = "in", focalPoint = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = durationInFrames > 1 ? frame / (durationInFrames - 1) : 0;
  const ease = Easing.out(Easing.quad);

  const scale =
    pan === "out"
      ? interpolate(progress, [0, 1], [1.18, 1.04], { easing: ease })
      : interpolate(progress, [0, 1], [1.04, 1.18], { easing: ease });

  const translateX =
    pan === "left-right"
      ? interpolate(progress, [0, 1], [-2, 2], { easing: ease })
      : pan === "right-left"
        ? interpolate(progress, [0, 1], [2, -2], { easing: ease })
        : 0;

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", backgroundColor: "black" }}>
      <Img
        src={staticFile(file)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: focalPoint,
          transform: `scale(${scale}) translateX(${translateX}%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
