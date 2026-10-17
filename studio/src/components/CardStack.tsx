import { useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand/brand";
import { springAt, springs } from "../lib/motion";
import { useScale } from "../lib/useScale";

export type Card = { title: string; body?: string; icon?: string };

// Tarjetas que llegan una por una. En vertical se apilan; en horizontal van en fila.
export const CardStack: React.FC<{ cards: Card[]; delay?: number; stagger?: number }> = ({
  cards,
  delay = 0,
  stagger = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isLandscape } = useScale();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: isLandscape ? "row" : "column",
        gap: 32 * u,
        width: "100%",
        justifyContent: "center",
      }}
    >
      {cards.map((c, i) => {
        const s = springAt(frame, fps, delay + i * stagger, springs.snappy);
        return (
          <div
            key={i}
            style={{
              flex: isLandscape ? 1 : undefined,
              background: brand.colors.surface,
              border: `${2 * u}px solid ${brand.colors.text}14`,
              borderRadius: brand.radius * u,
              padding: `${44 * u}px ${48 * u}px`,
              textAlign: "left",
              opacity: s,
              transform: `translateY(${(1 - s) * 80 * u}px) scale(${0.94 + 0.06 * s})`,
              boxShadow: `0 ${30 * u}px ${60 * u}px #00000055`,
            }}
          >
            {c.icon ? (
              <div style={{ fontSize: 56 * u, marginBottom: 20 * u, color: brand.colors.accent }}>
                {c.icon}
              </div>
            ) : null}
            <div
              style={{
                fontFamily: brand.fontDisplay,
                fontWeight: 700,
                fontSize: 54 * u,
                letterSpacing: "-0.02em",
                color: brand.colors.text,
                lineHeight: 1.08,
              }}
            >
              {c.title}
            </div>
            {c.body ? (
              <div
                style={{
                  fontFamily: brand.fontBody,
                  fontSize: 32 * u,
                  color: brand.colors.muted,
                  marginTop: 14 * u,
                  lineHeight: 1.35,
                }}
              >
                {c.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
