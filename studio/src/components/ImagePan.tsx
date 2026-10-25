// Copyright (c) 2026 Enrique Rocha (@soyenriquerocha)
// SPDX-License-Identifier: MIT
// id: er-22575577
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ease } from "../lib/motion";

// Ken Burns suave sobre una imagen de public/ (p. ej. "references/foto.jpg").
export const ImagePan: React.FC<{
  src: string;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number; // % de desplazamiento horizontal total
  overlay?: string;
}> = ({ src, zoomFrom = 1.08, zoomTo = 1.18, panX = 4, overlay }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(frame, [0, durationInFrames], [0, 1], { easing: ease.inOut });
  const scale = zoomFrom + (zoomTo - zoomFrom) * t;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={src.startsWith("http") ? src : staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${(t - 0.5) * panX}%)`,
        }}
      />
      {overlay ? <AbsoluteFill style={{ background: overlay }} /> : null}
    </AbsoluteFill>
  );
};
