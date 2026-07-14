import { Composition } from "remotion";
import { EviReel } from "./EviReel";
import { totalDurationInFrames } from "./timeline";

export const EviReelComposition = () => {
  return (
    <Composition
      id="EviReel"
      component={EviReel}
      durationInFrames={totalDurationInFrames}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
