import React from "react";
import { AbsoluteFill } from "remotion";

// The source export has a CapCut logo burned into the top-right corner of
// every frame. A strong, edge-feathered blur over just that region hides it
// without a visible rectangle, whatever the background behind it is.
export const WatermarkMask: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "36%",
          height: "8%",
          backdropFilter: "blur(60px) saturate(1.15)",
          WebkitBackdropFilter: "blur(60px) saturate(1.15)",
          maskImage:
            "radial-gradient(ellipse at 72% 30%, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 72% 30%, black 40%, transparent 75%)",
        }}
      />
    </AbsoluteFill>
  );
};
