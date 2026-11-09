import React, { useEffect, useRef } from "react";
// @ts-expect-error nextparticle is a plain JS vendor file
import NextParticle from "@/lib/nextparticle";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
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

function getThemeStops(theme: string): [string, string, string] {
  if (theme === "gold") {
    return ["#FEF08A", "#F5B700", "#D97706"];
  } else if (theme === "blue") {
    return ["#93C5FD", "#2563EB", "#1D4ED8"];
  } else if (theme === "purple") {
    return ["#DDD6FE", "#7C3AED", "#5B21B6"];
  } else if (theme === "teal") {
    return ["#99F6E4", "#0D9488", "#0F766E"];
  } else if (theme === "mint") {
    return ["#A7F3D0", "#00FD90", "#059669"];
  } else if (theme === "custom") {
    const customHex =
      (typeof window !== "undefined" && localStorage.getItem("customAccentHex")) ||
      "#EC4899";
    const rgb = hexToRgb(customHex);
    if (rgb) {
      const lightR = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * 0.45));
      const lightG = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * 0.45));
      const lightB = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * 0.45));
      const light = `#${[lightR, lightG, lightB].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
      const deepR = Math.max(0, Math.floor(rgb.r * 0.72));
      const deepG = Math.max(0, Math.floor(rgb.g * 0.72));
      const deepB = Math.max(0, Math.floor(rgb.b * 0.72));
      const deep = `#${[deepR, deepG, deepB].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
      return [light, customHex, deep];
    }
    return [customHex, customHex, customHex];
  }
  // Default Orange / Amber (Identical to reference screenshot 2)
  return ["#FFD101", "#FF7B00", "#FF3D00"];
}

function getLetterSDataUrl(size: number, theme: string): string {
  if (typeof window === "undefined") return "";

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 3-Stop Diagonal Linear Gradient (Identical to reference screenshot 2)
  const grad = ctx.createLinearGradient(
    size * 0.1,
    size * 0.08,
    size * 0.9,
    size * 0.92
  );
  const stops = getThemeStops(theme);
  grad.addColorStop(0, stops[0]);
  grad.addColorStop(0.48, stops[1]);
  grad.addColorStop(1, stops[2]);

  ctx.fillStyle = grad;
  // Font size: 1.08x size so the S fills ~80-84% with clean, elegant padding (no cropping!)
  const fontSize = Math.round(size * 1.08);
  ctx.font = `900 ${fontSize}px "Funnel Display", "Poppins", "Montserrat", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S", size / 2, size / 2 + size * 0.012);

  return canvas.toDataURL("image/png");
}

interface ParticleLetterSProps {
  className?: string;
}

export function ParticleLetterS({ className }: ParticleLetterSProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const npInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !NextParticle) return;

    let isDestroyed = false;
    let activeGen = 0;
    let updateTimer: ReturnType<typeof setTimeout> | null = null;
    let cleanupPointerListeners: (() => void) | null = null;

    const stopCurrentInstance = () => {
      if (cleanupPointerListeners) {
        cleanupPointerListeners();
        cleanupPointerListeners = null;
      }

      if (npInstanceRef.current) {
        try {
          npInstanceRef.current.state = "stopped";
          npInstanceRef.current.stop();
        } catch {}
        if (npInstanceRef.current.canvas) {
          try {
            npInstanceRef.current.canvas.remove();
          } catch {}
        }
        npInstanceRef.current = null;
      }

      if (containerRef.current) {
        // Completely remove all canvas and img children to eliminate ghost instances
        containerRef.current.querySelectorAll("canvas, img").forEach((el) => el.remove());
      }
    };

    const startParticle = () => {
      if (isDestroyed || !containerRef.current) return;

      const gen = ++activeGen;
      stopCurrentInstance();

      const container = containerRef.current;
      if (!container) return;

      // High-DPI master render resolution
      const renderSize = 320;

      const accent =
        document.documentElement.getAttribute("data-accent") ||
        localStorage.getItem("accentColor") ||
        "orange";
      const dataUrl = getLetterSDataUrl(renderSize, accent);

      // Create hidden image element for NextParticle
      const img = document.createElement("img");
      img.src = dataUrl;
      img.style.display = "none";
      img.setAttribute("data-width", String(renderSize));
      img.setAttribute("data-height", String(renderSize));
      img.setAttribute("data-particle-gap", "3");
      img.setAttribute("data-particle-size", "2.2");
      img.setAttribute("data-gravity", "0.26");
      img.setAttribute("data-noise", "4");
      img.setAttribute("data-renderer", "webgl");
      img.setAttribute("data-mouse-force", "36");
      img.setAttribute("data-init-position", "none");
      img.setAttribute("data-init-direction", "none");

      container.appendChild(img);

      try {
        const np = new NextParticle(img);
        npInstanceRef.current = np;

        const onImageReady = () => {
          if (isDestroyed || gen !== activeGen) {
            // Outdated instance from rapid color click: kill immediately
            try {
              np.state = "stopped";
              np.stop();
            } catch {}
            if (np.canvas) np.canvas.remove();
            return;
          }

          // Strict guarantee: remove any duplicate canvases if present
          const canvases = container.querySelectorAll("canvas");
          if (canvases.length > 1) {
            for (let i = 0; i < canvases.length - 1; i++) {
              canvases[i].remove();
            }
          }

          if (np.canvas) {
            np.canvas.style.position = "absolute";
            np.canvas.style.top = "0";
            np.canvas.style.left = "0";
            np.canvas.style.width = "100%";
            np.canvas.style.height = "100%";
            np.canvas.style.display = "block";
            np.canvas.style.transform = "scale(1.14)";
            np.canvas.style.transformOrigin = "center center";
            np.canvas.style.pointerEvents = "none";
            np.canvas.setAttribute("data-img-src", dataUrl);
            container.setAttribute("data-img-src", dataUrl);
          }
        };

        np.on("imageLoaded", onImageReady);

        if (np.canvas) {
          onImageReady();
        }

        // Attach reliable pointer & mouse interaction handlers directly to container
        const handlePointer = (e: MouseEvent | PointerEvent) => {
          if (!npInstanceRef.current || !container || isDestroyed || gen !== activeGen) return;
          const rect = container.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;

          const scaleAdjust = 1.14;
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const normX = (e.clientX - centerX) / (rect.width * scaleAdjust);
          const normY = (e.clientY - centerY) / (rect.height * scaleAdjust);

          const mouseX = (normX + 0.5) * renderSize;
          const mouseY = (normY + 0.5) * renderSize;

          npInstanceRef.current.touches = [
            {
              x: mouseX,
              y: mouseY,
              z: 50,
              force: 1.5,
            },
          ];
        };

        const handleLeave = () => {
          if (npInstanceRef.current) {
            npInstanceRef.current.touches = [];
          }
        };

        container.addEventListener("pointermove", handlePointer);
        container.addEventListener("pointerenter", handlePointer);
        container.addEventListener("pointerleave", handleLeave);
        container.addEventListener("mousemove", handlePointer);
        container.addEventListener("mouseleave", handleLeave);

        cleanupPointerListeners = () => {
          container.removeEventListener("pointermove", handlePointer);
          container.removeEventListener("pointerenter", handlePointer);
          container.removeEventListener("pointerleave", handleLeave);
          container.removeEventListener("mousemove", handlePointer);
          container.removeEventListener("mouseleave", handleLeave);
        };
      } catch (err) {
        console.error("NextParticle initialization:", err);
      }
    };

    // Debounced schedule so concurrent color events never launch parallel instances
    const scheduleUpdate = () => {
      if (isDestroyed) return;
      if (updateTimer) clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        if (!isDestroyed) {
          startParticle();
        }
      }, 40);
    };

    // Initial load
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          if (!isDestroyed) startParticle();
        })
        .catch(() => {
          if (!isDestroyed) startParticle();
        });
    } else {
      startParticle();
    }

    // React cleanly to accent color and theme mood changes
    window.addEventListener("accentColorChange", scheduleUpdate);
    window.addEventListener("themeChange", scheduleUpdate);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-accent") {
          scheduleUpdate();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent"],
    });

    const handleResize = () => {
      scheduleUpdate();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDestroyed = true;
      if (updateTimer) clearTimeout(updateTimer);
      stopCurrentInstance();
      window.removeEventListener("accentColorChange", scheduleUpdate);
      window.removeEventListener("themeChange", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden cursor-pointer [&>canvas]:!absolute [&>canvas]:!inset-0 [&>canvas]:!w-full [&>canvas]:!h-full [&>canvas]:!block [&>canvas]:scale-[1.14] ${className || ""}`}
    />
  );
}
