import { oklchToHex } from "./convertColorTypeUtil.ts";

export function getContrastYIQ(rgbHex: string): boolean {
  rgbHex = rgbHex.replace("#", "");
  const r = parseInt(rgbHex.substring(0, 2), 16);
  const g = parseInt(rgbHex.substring(2, 4), 16);
  const b = parseInt(rgbHex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

// 应用主题色
export function applyThemeColor(oklch: number) {
  document.documentElement.style.setProperty("--primary", oklchToHex(oklch));
  document.documentElement.style.setProperty("--primary-h", oklch.toString());
  localStorage.setItem("ThemeColor", oklch.toString());
}

export function applyThemeWhileStartup() {
  const saveColor = localStorage.getItem("ThemeColor") as string;
  if (saveColor) applyThemeColor(Number(saveColor));
}
