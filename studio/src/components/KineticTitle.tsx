import { useCurrentFrame } from "remotion";
import { brand } from "../brand/brand";
import { enterStyle, progress } from "../lib/motion";
import { useScale } from "../lib/useScale";

type Props = {
  text: string;
  delay?: number; // frames
  stagger?: number; // frames entre palabras
  size?: number; // px en un lienzo de 1080
  color?: string;
  highlight?: string[]; // palabras en color de acento
  weight?: number;
};

// Título que entra palabra por palabra. Duración por palabra 18 frames (~600ms):
// suficiente para leerse, sin sentirse lento.
export const KineticTitle: React.FC<Props> = ({
  text,
  delay = 0,
  stagger = 4,
  size = 120,
  color = brand.colors.text,
  highlight = [],
  weight = 800,
}) => {
  const frame = useCurrentFrame();
  const { u } = useScale();
  const words = text.split(" ");
  return (
    <div
      style={{
        fontFamily: brand.fontDisplay,
        fontWeight: weight,
        fontSize: size * u,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        color,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "inherit",
        gap: `0 ${0.25 * size * u}px`,
        maxWidth: "100%",
      }}
    >
      {words.map((w, i) => {
        const p = progress(frame, delay + i * stagger, 18);
        const clean = w.replace(/[.,!?¿¡]/g, "");
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              ...enterStyle(p, 0.4 * size * u),
              color: highlight.includes(clean) ? brand.colors.accent : undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
