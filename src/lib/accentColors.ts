export interface ColorMood {
  id: string;
  label: string;
  hex: string;
}

export const COLOR_MOODS: ColorMood[] = [
  { id: "gold", label: "Gold", hex: "#F5B700" },
  { id: "orange", label: "Orange", hex: "#F97316" },
  { id: "blue", label: "Blue", hex: "#2563EB" },
  { id: "purple", label: "Purple", hex: "#7C3AED" },
  { id: "teal", label: "Teal", hex: "#0D9488" },
  { id: "mint", label: "Mint", hex: "#00FD90" },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6 && clean.length !== 3) return null;
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function applyCustomColor(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return;
  const { r, g, b } = rgb;

  const deepR = Math.max(0, Math.floor(r * 0.82));
  const deepG = Math.max(0, Math.floor(g * 0.82));
  const deepB = Math.max(0, Math.floor(b * 0.82));
  const deepHex = `#${[deepR, deepG, deepB].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

  const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.85));
  const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.85));
  const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.85));
  const lightHex = `#${[lightR, lightG, lightB].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

  const cleanHex = `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

  // Calculate hue shift from base blue (~218deg)
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let targetHue = 0;
  if (max !== min) {
    const d = max - min;
    if (max === rNorm) targetHue = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) * 60;
    else if (max === gNorm) targetHue = ((bNorm - rNorm) / d + 2) * 60;
    else targetHue = ((rNorm - gNorm) / d + 4) * 60;
  }
  const hueShift = Math.round((targetHue - 218 + 360) % 360);
  const rotateDegFromSepia = Math.round((targetHue - 45 + 360) % 360);

  const root = document.documentElement;
  root.style.setProperty("--brand", cleanHex);
  root.style.setProperty("--brand-deep", deepHex);
  root.style.setProperty("--brand-light", lightHex);
  root.style.setProperty("--brand-rgb", `${r}, ${g}, ${b}`);
  root.style.setProperty("--primary", cleanHex);
  root.style.setProperty("--accent", cleanHex);
  root.style.setProperty("--ring", cleanHex);
  root.style.setProperty(
    "--arrow-filter",
    `hue-rotate(${hueShift}deg) saturate(1.4) brightness(1.1)`
  );
  root.style.setProperty(
    "--theme-media-filter",
    `sepia(1) saturate(6) hue-rotate(${rotateDegFromSepia}deg) brightness(1.2)`
  );
  root.style.setProperty("--theme-build-filter", "url(#tint-custom)");

  // Update SVG feComponentTransfer for Light Mode
  const denom = 0.58;
  const sR = ((1.0 - rNorm) / denom).toFixed(3);
  const iR = (1.0 - parseFloat(sR)).toFixed(3);
  const sG = ((1.0 - gNorm) / denom).toFixed(3);
  const iG = (1.0 - parseFloat(sG)).toFixed(3);
  const sB = ((1.0 - bNorm) / denom).toFixed(3);
  const iB = (1.0 - parseFloat(sB)).toFixed(3);

  const feR = document.getElementById("fe-custom-r");
  const feG = document.getElementById("fe-custom-g");
  const feB = document.getElementById("fe-custom-b");
  if (feR) { feR.setAttribute("slope", sR); feR.setAttribute("intercept", iR); }
  if (feG) { feG.setAttribute("slope", sG); feG.setAttribute("intercept", iG); }
  if (feB) { feB.setAttribute("slope", sB); feB.setAttribute("intercept", iB); }

  root.setAttribute("data-accent", "custom");

  localStorage.setItem("accentColor", "custom");
  localStorage.setItem("customAccentHex", cleanHex);
  window.dispatchEvent(new Event("accentColorChange"));
}

export function clearCustomColor(colorId: string) {
  const root = document.documentElement;
  root.style.removeProperty("--brand");
  root.style.removeProperty("--brand-deep");
  root.style.removeProperty("--brand-light");
  root.style.removeProperty("--brand-rgb");
  root.style.removeProperty("--primary");
  root.style.removeProperty("--accent");
  root.style.removeProperty("--ring");
  root.style.removeProperty("--arrow-filter");
  root.style.removeProperty("--theme-media-filter");
  root.style.removeProperty("--theme-build-filter");
  root.setAttribute("data-accent", colorId);

  localStorage.setItem("accentColor", colorId);
  window.dispatchEvent(new Event("accentColorChange"));
}

export function initAccentColor() {
  if (typeof window === "undefined") return;
  const storedAccent = localStorage.getItem("accentColor") || "gold";
  if (storedAccent === "custom") {
    const customHex = localStorage.getItem("customAccentHex") || "#EC4899";
    applyCustomColor(customHex);
  } else {
    clearCustomColor(storedAccent);
  }
}
