import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brandFontFaceCss, fontFamily } from "./BrandCard";

export const Caption: React.FC<{
  eyebrow?: string;
  text: string;
  accent?: string;
}> = ({ eyebrow, text, accent = "#FFB020" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 220, mass: 0.6 }, durationInFrames: 14 });
  const exitStart = durationInFrames - 8;
  const exit = interpolate(frame, [exitStart, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = enter * exit;
  const translateY = interpolate(enter, [0, 1], [26, 0]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      <style>{brandFontFaceCss}</style>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "14%",
          opacity,
          transform: `translateY(${translateY}px)`,
          padding: "0 64px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, rgba(11,18,32,0.88) 0%, rgba(11,18,32,0.55) 85%, rgba(11,18,32,0) 100%)",
            borderLeft: `6px solid ${accent}`,
            padding: "18px 26px",
            borderRadius: "0 10px 10px 0",
          }}
        >
          {eyebrow ? (
            <div style={{ color: accent, fontSize: 24, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
              {eyebrow}
            </div>
          ) : null}
          <div style={{ color: "white", fontSize: 42, fontWeight: 800, lineHeight: 1.15 }}>{text}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
