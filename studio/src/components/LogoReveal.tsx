import { useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand/brand";
import { ease, progress, springAt, springs } from "../lib/motion";
import { useScale } from "../lib/useScale";

// Marca: un símbolo que entra con spring y el nombre que se descubre con máscara.
export const LogoReveal: React.FC<{ name?: string; tagline?: string; delay?: number }> = ({
  name = brand.name,
  tagline = brand.tagline,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isVertical } = useScale();
  const s = springAt(frame, fps, delay, springs.snappy);
  const reveal = progress(frame, delay + 8, 22, ease.inOut);
  const tag = progress(frame, delay + 26, 18);
  const mark = 128 * u;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 * u }}>
      <div
        style={{
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          alignItems: "center",
          gap: 32 * u,
        }}
      >
        <div
          style={{
            width: mark,
            height: mark,
            borderRadius: brand.radius * u,
            background: brand.colors.accent,
            transform: `scale(${0.6 + 0.4 * s}) rotate(${(1 - s) * -24}deg)`,
            opacity: s,
            display: "grid",
            placeItems: "center",
            boxShadow: `0 ${24 * u}px ${80 * u}px ${brand.colors.accent}55`,
          }}
        >
          <div
            style={{
              width: mark * 0.42,
              height: mark * 0.42,
              borderRadius: "50%",
              border: `${10 * u}px solid ${brand.colors.background}`,
              borderRightColor: "transparent",
              transform: `rotate(${s * 220}deg)`,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: brand.fontDisplay,
            fontWeight: 800,
            fontSize: (isVertical ? 104 : 132) * u,
            letterSpacing: "-0.04em",
            color: brand.colors.text,
            clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </div>
      <div
        style={{
          fontFamily: brand.fontBody,
          fontSize: 40 * u,
          color: brand.colors.muted,
          opacity: tag,
          transform: `translateY(${(1 - tag) * 12 * u}px)`,
        }}
      >
        {tagline}
      </div>
    </div>
  );
};
