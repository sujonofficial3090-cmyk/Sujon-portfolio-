import React, { useEffect, useRef } from "react";
import NextParticle from "@/lib/nextparticle";

function getLetterSDataUrl(size: number, theme: string): string {
  if (typeof window === "undefined") return "";

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // 3-Stop Diagonal Linear Gradient (Identical to websolutions.tech W logo)
  const grad = ctx.createLinearGradient(size * 0.1, size * 0.08, size * 0.9, size * 0.92);

  let stops = ["#FFD101", "#FF7B00", "#FF3D00"]; // Default Orange / Amber
  if (theme === "gold") {
    stops = ["#FEF08A", "#F5B700", "#D97706"];
  } else if (theme === "blue") {
    stops = ["#93C5FD", "#2563EB", "#1D4ED8"];
  } else if (theme === "purple") {
    stops = ["#DDD6FE", "#7C3AED", "#5B21B6"];
  } else if (theme === "teal") {
    stops = ["#99F6E4", "#0D9488", "#0F766E"];
  } else if (theme === "mint") {
    stops = ["#A7F3D0", "#00FD90", "#059669"];
  }

  grad.addColorStop(0, stops[0]);
  grad.addColorStop(0.48, stops[1]);
  grad.addColorStop(1, stops[2]);

  ctx.fillStyle = grad;
  const fontSize = Math.round(size * 0.88);
  ctx.font = `900 ${fontSize}px "Funnel Display", "Poppins", "Montserrat", system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S", size / 2, size / 2 + size * 0.02);

  return canvas.toDataURL("image/png");
}

export function ParticleLetterS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const npInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !NextParticle) return;

    let isDestroyed = false;
    let resizeTimer: any = null;

    const startParticle = () => {
      if (isDestroyed || !containerRef.current) return;

      // Stop previous instance if existing
      if (npInstanceRef.current) {
        try {
          npInstanceRef.current.stop();
        } catch {}
        npInstanceRef.current = null;
      }

      // Clear container DOM
      containerRef.current.innerHTML = "";

      const rect = containerRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const availableWidth = rect.width > 0 ? rect.width : (isMobile ? 320 : 460);
      const availableHeight = rect.height > 0 ? rect.height : (isMobile ? 320 : 460);
      const renderSize = Math.max(280, Math.min(availableWidth, availableHeight, isMobile ? 360 : 460));

      const accent = document.documentElement.getAttribute("data-accent") || "orange";
      const dataUrl = getLetterSDataUrl(renderSize, accent);

      // Create image element for NextParticle with exact websolutions.tech parameters
      const img = document.createElement("img");
      img.src = dataUrl;
      img.style.display = "none";
      img.setAttribute("data-width", String(renderSize));
      img.setAttribute("data-height", String(renderSize));
      img.setAttribute("data-particle-gap", isMobile ? "5" : "4");
      img.setAttribute("data-particle-size", isMobile ? "2" : "2");
      img.setAttribute("data-gravity", "0.25");
      img.setAttribute("data-noise", "8");
      img.setAttribute("data-renderer", "webgl");
      img.setAttribute("data-mouse-force", "32");
      img.setAttribute("data-init-position", "none");
      img.setAttribute("data-init-direction", "none");

      containerRef.current.appendChild(img);

      try {
        const np = new NextParticle(img);
        npInstanceRef.current = np;
      } catch (err) {
        console.error("NextParticle initialization:", err);
      }
    };

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!isDestroyed) startParticle();
      });
    } else {
      startParticle();
    }

    // Watch for theme/accent changes to re-tint the S
    const observer = new MutationObserver(() => {
      if (!isDestroyed) {
        startParticle();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent"],
    });

    // Resize handler (debounced)
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isDestroyed) startParticle();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDestroyed = true;
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (npInstanceRef.current) {
        try {
          npInstanceRef.current.stop();
        } catch {}
        npInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full min-h-[460px] lg:min-h-[540px] items-center justify-center select-none overflow-hidden"
    />
  );
}
