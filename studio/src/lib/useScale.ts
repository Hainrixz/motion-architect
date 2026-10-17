import { useVideoConfig } from "remotion";

// Unidad relativa al lado corto: 1u = 1px en un lienzo de 1080.
// Así el mismo diseño funciona en 16:9, 9:16, 1:1 y 4:5.
export const useScale = () => {
  const { width, height } = useVideoConfig();
  const u = Math.min(width, height) / 1080;
  const isVertical = height > width;
  const isLandscape = width > height;
  return { u, width, height, isVertical, isLandscape };
};
