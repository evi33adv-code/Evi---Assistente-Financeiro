import { Composition } from "remotion";
import { BotafogoReel } from "./BotafogoReel";
import { totalDurationInFrames } from "./botafogoTimeline";

export const BotafogoReelComposition = () => {
  return (
    <Composition
      id="BotafogoReel"
      component={BotafogoReel}
      durationInFrames={totalDurationInFrames}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
