import React, { useEffect, useRef, useState } from "react";

export type CursorMode =
  | "circle"
  | "spark"
  | "glow-dot"
  | "trail"
  | "crosshair"
  | "bubble"
  | "orbit"
  | "fire"
  | "matrix"
  | "ripple"
  | "galaxy"
  | "default";

const VALID_MODES: CursorMode[] = [
  "circle",
  "spark",
  "glow-dot",
  "trail",
  "crosshair",
  "bubble",
  "orbit",
  "fire",
  "matrix",
  "ripple",
  "galaxy",
  "default",
];

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface RippleRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

/* ==========================================================================
   GLOBAL THEME & MOUSE CACHE
   Zero forced layout reflows (getComputedStyle) and zero state-driven latency.
   ========================================================================== */

let globalThemePalette: string[] = ["#FFEDD5", "#F97316", "#EA580C", "#FFFFFF"];
let globalPrimaryColor = "#F97316";

function refreshThemePalette() {
  if (typeof window === "undefined") return;
  try {
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    const brand = computed.getPropertyValue("--brand").trim() || "#F97316";
    const brandLight = computed.getPropertyValue("--brand-light").trim() || "#FFEDD5";
    const brandDeep = computed.getPropertyValue("--brand-deep").trim() || "#EA580C";
    globalThemePalette = [brandLight, brand, brandDeep, "#FFFFFF"];
    globalPrimaryColor = brand;
  } catch {
    // fallback
  }
}

export function MagicCursorEffect() {
  const [mode, setMode] = useState<CursorMode>("crosshair");
  const [mounted, setMounted] = useState(false);

  // References to permanently mounted DOM elements (guarantees ref is never null!)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const domContainerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowDotRef = useRef<HTMLDivElement | null>(null);
  const crosshairRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const radarContainerRef = useRef<HTMLDivElement | null>(null);
  const radarDotRef = useRef<HTMLDivElement | null>(null);

  // Mode ref for instantaneous access inside event handlers without re-creating closures
  const modeRef = useRef<CursorMode>("crosshair");
  modeRef.current = mode;

  // Initialize and listen to mode changes
  useEffect(() => {
    setMounted(true);
    refreshThemePalette();

    const getInitialMode = (): CursorMode => {
      try {
        const saved = localStorage.getItem("magicCursor") as CursorMode;
        if (saved && VALID_MODES.includes(saved)) {
          return saved;
        }
      } catch {
        // fallback
      }
      return "crosshair";
    };

    const initial = getInitialMode();
    setMode(initial);
    modeRef.current = initial;
    document.documentElement.setAttribute("data-cursor", initial);

    const handleCursorChange = (e?: Event) => {
      const customDetail = (e as CustomEvent)?.detail;
      let targetMode: CursorMode = "crosshair";
      if (typeof customDetail === "string" && VALID_MODES.includes(customDetail as CursorMode)) {
        targetMode = customDetail as CursorMode;
      } else {
        targetMode = getInitialMode();
      }
      setMode(targetMode);
      modeRef.current = targetMode;
      document.documentElement.setAttribute("data-cursor", targetMode);
    };

    window.addEventListener("magicCursorChange", handleCursorChange);
    window.addEventListener("storage", handleCursorChange);
    window.addEventListener("accentColorChange", refreshThemePalette, { passive: true });
    window.addEventListener("themeChange", refreshThemePalette, { passive: true });

    return () => {
      window.removeEventListener("magicCursorChange", handleCursorChange);
      window.removeEventListener("storage", handleCursorChange);
      window.removeEventListener("accentColorChange", refreshThemePalette);
      window.removeEventListener("themeChange", refreshThemePalette);
    };
  }, []);

  // Unified high-performance animation engine
  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // Disable if touch-only screen
    if (window.matchMedia("(pointer: coarse) and (hover: none)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let prevX = -100;
    let prevY = -100;
    let radarX = -100;
    let radarY = -100;

    let sparks: SparkParticle[] = [];
    let trailPoints: TrailPoint[] = [];
    let fireParticles: FireParticle[] = [];
    let ripples: RippleRing[] = [];
    let lastRippleX = -100;
    let lastRippleY = -100;
    let orbitAngle = 0;
    let galaxyAngle = 0;
    let isHovering = false;
    let animId: number | null = null;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    const spawnSparkBurst = (x: number, y: number, count = 12) => {
      const palette = globalThemePalette;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 1.2 + Math.random() * 2.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.2 + Math.random() * 2.4,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1,
          life: 0,
          maxLife: 26 + Math.random() * 12,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (currX === -100) {
        currX = mouseX;
        currY = mouseY;
        prevX = mouseX;
        prevY = mouseY;
        radarX = mouseX - 20;
        radarY = mouseY - 20;
      }

      const currentMode = modeRef.current;
      const palette = globalThemePalette;
      const primaryColor = globalPrimaryColor;

      // Particle spawn logic for canvas modes
      if (currentMode === "spark") {
        const count = Math.random() > 0.35 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.4 + Math.random() * 1.4;
          sparks.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.3,
            size: 1.8 + Math.random() * 2.2,
            color: palette[Math.floor(Math.random() * palette.length)],
            alpha: 1,
            life: 0,
            maxLife: 22 + Math.random() * 14,
          });
        }
      } else if (currentMode === "trail") {
        trailPoints.push({ x: mouseX, y: mouseY, time: Date.now() });
        if (trailPoints.length > 28) trailPoints.shift();
      } else if (currentMode === "fire") {
        const fireColors = ["#FF3B30", "#FF9500", "#FFCC00", "#FFF3A8", primaryColor];
        const count = Math.random() > 0.4 ? 3 : 2;
        for (let i = 0; i < count; i++) {
          fireParticles.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -(1.2 + Math.random() * 2.2),
            size: 2.8 + Math.random() * 2.6,
            color: fireColors[Math.floor(Math.random() * fireColors.length)],
            alpha: 1,
            life: 0,
            maxLife: 20 + Math.random() * 14,
          });
        }
      } else if (currentMode === "ripple") {
        const dist = Math.hypot(e.clientX - lastRippleX, e.clientY - lastRippleY);
        if (dist > 20) {
          lastRippleX = e.clientX;
          lastRippleY = e.clientY;
          ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 3,
            maxRadius: 36,
            alpha: 0.85,
            color: primaryColor,
          });
        }
      }

      // Check interactive hovering without forced reflow
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, select, textarea, .nm-interactive, .sujon-logo-reveal, [data-interactive], [tabindex="0"], label, summary, .cursor-pointer'
      );

      if (interactive !== isHovering) {
        isHovering = interactive;
        ringRef.current?.classList.toggle("is-hover", isHovering);
        dotRef.current?.classList.toggle("is-hover", isHovering);
        glowDotRef.current?.classList.toggle("is-hover", isHovering);
        crosshairRef.current?.classList.toggle("is-hover", isHovering);
        bubbleRef.current?.classList.toggle("is-hover", isHovering);
        radarContainerRef.current?.classList.toggle("is-hover", isHovering);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      ringRef.current?.classList.add("is-down");
      glowDotRef.current?.classList.add("is-down");
      crosshairRef.current?.classList.add("is-down");
      bubbleRef.current?.classList.add("is-down");

      const currentMode = modeRef.current;
      const primaryColor = globalPrimaryColor;

      if (currentMode === "spark") {
        spawnSparkBurst(e.clientX, e.clientY, 16);
      } else if (currentMode === "ripple") {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 4,
          maxRadius: 48,
          alpha: 1,
          color: primaryColor,
        });
      } else if (currentMode === "fire") {
        const fireColors = ["#FF3B30", "#FF9500", "#FFCC00", "#FFF3A8"];
        for (let i = 0; i < 7; i++) {
          fireParticles.push({
            x: e.clientX + (Math.random() - 0.5) * 10,
            y: e.clientY + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2.5,
            vy: -(1.5 + Math.random() * 3),
            size: 3.5 + Math.random() * 3,
            color: fireColors[Math.floor(Math.random() * fireColors.length)],
            alpha: 1,
            life: 0,
            maxLife: 26 + Math.random() * 12,
          });
        }
      } else if (currentMode === "matrix") {
        if (radarDotRef.current) {
          radarDotRef.current.classList.add("radar-dot-pop");
          setTimeout(() => {
            radarDotRef.current?.classList.remove("radar-dot-pop");
          }, 240);
        }
      }
    };

    const handleMouseUp = () => {
      ringRef.current?.classList.remove("is-down");
      glowDotRef.current?.classList.remove("is-down");
      crosshairRef.current?.classList.remove("is-down");
      bubbleRef.current?.classList.remove("is-down");
    };

    const handleMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    // Master render loop: executes every frame at max monitor refresh rate
    const renderLoop = () => {
      const currentMode = modeRef.current;

      // ── 1. DOM Followers (circle, glow-dot, crosshair, bubble) ──
      const isDomMode =
        currentMode === "circle" ||
        currentMode === "glow-dot" ||
        currentMode === "crosshair" ||
        currentMode === "bubble";

      if (domContainerRef.current) {
        domContainerRef.current.style.display = isDomMode ? "block" : "none";
      }

      if (isDomMode && mouseX > -50 && mouseY > -50) {
        const lerpFactor = currentMode === "crosshair" ? 0.4 : currentMode === "glow-dot" ? 0.35 : 0.3;
        currX += (mouseX - currX) * lerpFactor;
        currY += (mouseY - currY) * lerpFactor;

        if (currentMode === "circle") {
          if (ringRef.current) {
            ringRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
          }
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
          }
        } else if (currentMode === "glow-dot") {
          if (glowDotRef.current) {
            glowDotRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
          }
        } else if (currentMode === "crosshair") {
          if (crosshairRef.current) {
            crosshairRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
          }
        } else if (currentMode === "bubble") {
          if (bubbleRef.current) {
            const vx = currX - prevX;
            const vy = currY - prevY;
            const speed = Math.min(Math.hypot(vx, vy), 25);
            const angle = Math.atan2(vy, vx);
            const stretch = 1 + speed * 0.018;
            const squash = 1 / stretch;
            bubbleRef.current.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squash})`;
            prevX = currX;
            prevY = currY;
          }
        }
      }

      // ── 2. Cyber Radar Cursor (matrix mode) ──
      const isRadarMode = currentMode === "matrix";
      if (radarContainerRef.current) {
        radarContainerRef.current.style.display = isRadarMode ? "block" : "none";
        if (isRadarMode && mouseX > -50 && mouseY > -50) {
          radarX += (mouseX - 20 - radarX) * 0.4;
          radarY += (mouseY - 20 - radarY) * 0.4;
          radarContainerRef.current.style.transform = `translate3d(${radarX}px, ${radarY}px, 0)`;
        }
      }

      // ── 3. Canvas Followers (spark, trail, orbit, fire, ripple, galaxy) ──
      const isCanvasMode =
        currentMode === "spark" ||
        currentMode === "trail" ||
        currentMode === "orbit" ||
        currentMode === "fire" ||
        currentMode === "ripple" ||
        currentMode === "galaxy";

      if (canvas && ctx) {
        if (!isCanvasMode) {
          canvas.style.display = "none";
        } else {
          canvas.style.display = "block";
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const palette = globalThemePalette;
          const primaryColor = globalPrimaryColor;

          // SPARK
          if (currentMode === "spark") {
            sparks = sparks.filter((sp) => {
              sp.x += sp.vx;
              sp.y += sp.vy;
              sp.life += 1;
              sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);
              if (sp.alpha <= 0.01) return false;

              const currentSize = Math.max(0.4, sp.size * sp.alpha);
              ctx.beginPath();
              ctx.arc(sp.x, sp.y, currentSize, 0, Math.PI * 2);
              ctx.fillStyle = sp.color;
              ctx.globalAlpha = sp.alpha * 0.9;
              ctx.fill();

              if (currentSize > 1.6 && sp.alpha > 0.4) {
                ctx.beginPath();
                ctx.moveTo(sp.x - currentSize * 1.8, sp.y);
                ctx.lineTo(sp.x + currentSize * 1.8, sp.y);
                ctx.moveTo(sp.x, sp.y - currentSize * 1.8);
                ctx.lineTo(sp.x, sp.y + currentSize * 1.8);
                ctx.strokeStyle = sp.color;
                ctx.lineWidth = 0.8;
                ctx.globalAlpha = sp.alpha * 0.6;
                ctx.stroke();
              }
              return sp.life < sp.maxLife;
            });

            if (mouseX > -50 && mouseY > -50) {
              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = 0.95;
              ctx.fill();
            }
          }

          // TRAIL (Comet)
          if (currentMode === "trail") {
            const now = Date.now();
            trailPoints = trailPoints.filter((pt) => now - pt.time < 350);

            if (trailPoints.length > 1) {
              for (let i = 1; i < trailPoints.length; i++) {
                const p1 = trailPoints[i - 1];
                const p2 = trailPoints[i];
                const progress = i / trailPoints.length;

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = primaryColor;
                ctx.lineWidth = progress * 7;
                ctx.lineCap = "round";
                ctx.globalAlpha = progress * 0.7;
                ctx.stroke();
              }

              const tip = trailPoints[trailPoints.length - 1];
              ctx.beginPath();
              ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = 0.95;
              ctx.fill();
            } else if (mouseX > -50 && mouseY > -50) {
              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = 0.9;
              ctx.fill();
            }
          }

          // ORBIT
          if (currentMode === "orbit") {
            if (mouseX > -50 && mouseY > -50) {
              orbitAngle += 0.05;

              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = primaryColor;
              ctx.globalAlpha = 0.95;
              ctx.fill();

              const r1 = 20;
              const s1X = mouseX + Math.cos(orbitAngle) * r1;
              const s1Y = mouseY + Math.sin(orbitAngle) * r1;

              ctx.beginPath();
              ctx.arc(s1X, s1Y, 3, 0, Math.PI * 2);
              ctx.fillStyle = palette[0] || "#FFFFFF";
              ctx.globalAlpha = 0.85;
              ctx.fill();

              const r2 = 25;
              const s2X = mouseX + Math.cos(orbitAngle + Math.PI) * r2;
              const s2Y = mouseY + Math.sin(orbitAngle + Math.PI) * (r2 * 0.7);

              ctx.beginPath();
              ctx.arc(s2X, s2Y, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = palette[2] || primaryColor;
              ctx.globalAlpha = 0.75;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(mouseX, mouseY, r1, 0, Math.PI * 2);
              ctx.strokeStyle = primaryColor;
              ctx.lineWidth = 0.7;
              ctx.globalAlpha = 0.2;
              ctx.stroke();
            }
          }

          // FIRE (Flame)
          if (currentMode === "fire") {
            fireParticles = fireParticles.filter((p) => {
              p.x += p.vx + (Math.random() - 0.5) * 0.4;
              p.y += p.vy;
              p.life += 1;
              p.alpha = Math.max(0, 1 - p.life / p.maxLife);
              if (p.alpha <= 0.01) return false;

              const curSize = Math.max(0.4, p.size * (1 - p.life / p.maxLife));
              ctx.beginPath();
              ctx.arc(p.x, p.y, curSize, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.alpha * 0.9;
              ctx.fill();
              return p.life < p.maxLife;
            });

            if (mouseX > -50 && mouseY > -50) {
              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
              ctx.fillStyle = "#FFF3A8";
              ctx.globalAlpha = 0.95;
              ctx.fill();
            }
          }

          // RIPPLE
          if (currentMode === "ripple") {
            ripples = ripples.filter((r) => {
              r.radius += 1.4;
              r.alpha = Math.max(0, 0.85 * (1 - r.radius / r.maxRadius));
              if (r.alpha <= 0.01 || r.radius >= r.maxRadius) return false;

              ctx.beginPath();
              ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
              ctx.strokeStyle = r.color;
              ctx.lineWidth = Math.max(0.8, 2.2 * (1 - r.radius / r.maxRadius));
              ctx.globalAlpha = r.alpha;
              ctx.stroke();
              return true;
            });

            if (mouseX > -50 && mouseY > -50) {
              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
              ctx.fillStyle = primaryColor;
              ctx.globalAlpha = 0.9;
              ctx.fill();
            }
          }

          // GALAXY
          if (currentMode === "galaxy") {
            if (mouseX > -50 && mouseY > -50) {
              galaxyAngle += 0.04;

              ctx.beginPath();
              ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = 1;
              ctx.fill();

              for (let arm = 0; arm < 3; arm++) {
                const armOffset = (arm * Math.PI * 2) / 3;
                for (let step = 1; step <= 4; step++) {
                  const dist = 7 + step * 6;
                  const currentAngle = galaxyAngle + armOffset + step * 0.45;
                  const starX = mouseX + Math.cos(currentAngle) * dist;
                  const starY = mouseY + Math.sin(currentAngle) * (dist * 0.8);
                  const starSize = Math.max(1, 3.2 - step * 0.5);

                  ctx.beginPath();
                  ctx.arc(starX, starY, starSize, 0, Math.PI * 2);
                  ctx.fillStyle = step % 2 === 0 ? primaryColor : (palette[0] || "#FFFFFF");
                  ctx.globalAlpha = 0.85 - step * 0.12;
                  ctx.fill();
                }
              }
            }
          }

          ctx.globalAlpha = 1;
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    animId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [mounted]);

  if (!mounted) return null;

  if (
    typeof window !== "undefined" &&
    (window.innerWidth < 1024 ||
      "ontouchstart" in window ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches))
  ) {
    return null;
  }

  return (
    <>
      {/* ── 1. Canvas Layer (always mounted, display toggled in loop) ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999998]"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* ── 2. Cyber Radar Cursor (matrix mode) ── */}
      <div
        ref={radarContainerRef}
        className="radar-cursor-container"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="radar-rings-svg">
          <g className="radar-rings-spin">
            <g className="radar-rings-pulse">
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="var(--brand-deep)"
                className="radar-ring-inner"
                strokeWidth="1.5"
                strokeDasharray="12 8"
                opacity="0.85"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="var(--brand)"
                className="radar-ring-outer"
                strokeWidth="1"
                strokeDasharray="3 12"
                opacity="0.9"
              />
            </g>
          </g>
        </svg>
        <div ref={radarDotRef} className="radar-core-dot" />
      </div>

      {/* ── 3. DOM Follower Layer (circle, glow-dot, crosshair, bubble) ── */}
      <div
        ref={domContainerRef}
        className="magic-cursor-container"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        {/* Circle mode */}
        <div
          ref={ringRef}
          className="magic-cursor-ring"
          style={{ display: mode === "circle" ? "block" : "none" }}
        />
        <div
          ref={dotRef}
          className="magic-cursor-dot"
          style={{ display: mode === "circle" ? "block" : "none" }}
        />

        {/* Glow Dot (Laser) mode */}
        <div
          ref={glowDotRef}
          className="magic-cursor-glow-dot"
          style={{ display: mode === "glow-dot" ? "block" : "none" }}
        />

        {/* Crosshair (Target) mode */}
        <div
          ref={crosshairRef}
          className="magic-cursor-crosshair"
          style={{ display: mode === "crosshair" ? "block" : "none" }}
        >
          <div className="magic-cursor-crosshair-inner">
            <div
              style={{
                position: "absolute",
                inset: 2,
                borderRadius: "9999px",
                border: "1.5px solid var(--brand)",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 4,
                height: 4,
                borderRadius: "9999px",
                backgroundColor: "var(--brand)",
              }}
            />
            <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 1.5, height: 5, backgroundColor: "var(--brand)" }} />
            <div style={{ position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)", width: 1.5, height: 5, backgroundColor: "var(--brand)" }} />
            <div style={{ position: "absolute", left: -3, top: "50%", transform: "translateY(-50%)", height: 1.5, width: 5, backgroundColor: "var(--brand)" }} />
            <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", height: 1.5, width: 5, backgroundColor: "var(--brand)" }} />
          </div>
        </div>

        {/* Bubble mode */}
        <div
          ref={bubbleRef}
          className="magic-cursor-bubble"
          style={{ display: mode === "bubble" ? "block" : "none" }}
        />
      </div>
    </>
  );
}
