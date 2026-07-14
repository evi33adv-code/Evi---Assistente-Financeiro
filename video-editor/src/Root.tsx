import "./index.css";
import { EviReelComposition } from "./Composition";
import { BotafogoReelComposition } from "./BotafogoComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <EviReelComposition />
      <BotafogoReelComposition />
    </>
  );
};
