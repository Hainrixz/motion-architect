import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand/brand";

// Fondo de marca con un brillo que deriva muy lento. Sutil a propósito.
export const Background: React.FC<{ glow?: string }> = ({ glow = brand.colors.accent }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const x = interpolate(frame, [0, durationInFrames], [30, 70]);
  return (
    <AbsoluteFill style={{ backgroundColor: brand.colors.background }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(60% 50% at ${x}% 40%, ${glow}22 0%, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 90% at 50% 50%, transparent 55%, ${brand.colors.background} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
