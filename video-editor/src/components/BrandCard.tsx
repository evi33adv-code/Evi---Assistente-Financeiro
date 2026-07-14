import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const fontFamily = "EviPoppins";

export const brandFontFaceCss = `
@font-face {
  font-family: "${fontFamily}";
  src: url("${staticFile("fonts/Poppins-SemiBold.ttf")}") format("truetype");
  font-weight: 600;
}
@font-face {
  font-family: "${fontFamily}";
  src: url("${staticFile("fonts/Poppins-ExtraBold.ttf")}") format("truetype");
  font-weight: 800;
}
`;

export const BrandCard: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accent?: string;
}> = ({ eyebrow, title, subtitle, accent = "#FFB020" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 210, mass: 0.6 },
    durationInFrames: 16,
  });

  const exitStart = durationInFrames - 10;
  const exit = interpolate(frame, [exitStart, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = enter * exit;
  const translateY = interpolate(enter, [0, 1], [24, 0]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg, #0B1220 0%, #131C2E 55%, #0B1220 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
      }}
    >
      <style>{brandFontFaceCss}</style>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
          textAlign: "center",
          padding: "0 90px",
        }}
      >
        {eyebrow ? (
          <div
            style={{
              color: accent,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            color: "white",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.08,
            whiteSpace: "pre-line",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              color: "#B9C2D0",
              fontSize: 36,
              fontWeight: 600,
              marginTop: 26,
            }}
          >
            {subtitle}
          </div>
        ) : null}
        <div
          style={{
            width: 84,
            height: 6,
            borderRadius: 3,
            background: accent,
            margin: "34px auto 0",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
