export const MAX_ROOMS = 10;

export const HEATMAP_SCALE = [
  { max: 0,  bg: "#F8FAFC", text: "#94A3B8" },   // empty
  { max: 2,  bg: "#DBEAFE", text: "#1E40AF" },   // low
  { max: 4,  bg: "#93C5FD", text: "#1E3A8A" },   // low-medium
  { max: 6,  bg: "#F97316", text: "#FFFFFF" },   // medium-high
  { max: 8,  bg: "#EA580C", text: "#FFFFFF" },   // high
  { max: 10, bg: "#B91C1C", text: "#FFFFFF" },   // peak
];


export function getHeatmapColor(count) {
  for (const step of HEATMAP_SCALE) {
    if (count <= step.max) return step;
  }
  
  return HEATMAP_SCALE[HEATMAP_SCALE.length - 1];
}
