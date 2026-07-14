import React from "react";
import { AbsoluteFill } from "remotion";

// A single global "LUT-like" pass over the whole edit: punchier contrast and
// saturation, a light teal-shadows/orange-highlights split, and a soft
// vignette. Applied once so every shot reads as one consistent look instead
// of stacking per-clip corrections.
export const CinemaGrade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{ filter: "contrast(1.12) saturate(1.2) brightness(0.99)" }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, rgba(0,45,60,0.08) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0) 58%, rgba(255,110,30,0.06) 100%)",
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 62%, rgba(0,0,0,0.24) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
