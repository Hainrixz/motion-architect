import { useCurrentFrame } from "remotion";
import { brand } from "../brand/brand";
import { ease, enterStyle, progress } from "../lib/motion";
import { useScale } from "../lib/useScale";

// Número que cuenta hacia arriba. tabular-nums evita que el ancho "baile".
export const Counter: React.FC<{
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  size?: number;
}> = ({ to, from = 0, delay = 0, duration = 40, prefix = "", suffix = "", label, size = 260 }) => {
  const frame = useCurrentFrame();
  const { u } = useScale();
  const p = progress(frame, delay, duration, ease.out);
  const value = Math.round(from + (to - from) * p);
  const lp = progress(frame, delay + 10, 18);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 * u }}>
      <div
        style={{
          fontFamily: brand.fontDisplay,
          fontWeight: 800,
          fontSize: size * u,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: brand.colors.accent,
          fontVariantNumeric: "tabular-nums",
          ...enterStyle(progress(frame, delay, 14), 30 * u),
        }}
      >
        {prefix}
        {value.toLocaleString("es-MX")}
        {suffix}
      </div>
      {label ? (
        <div
          style={{
            fontFamily: brand.fontBody,
            fontSize: 44 * u,
            color: brand.colors.text,
            ...enterStyle(lp, 16 * u),
          }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
};
