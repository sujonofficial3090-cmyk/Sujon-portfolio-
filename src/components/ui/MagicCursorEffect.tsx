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

interface MatrixDrop {
  x: number;
  y: number;
  vy: number;
  char: string;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  size: number;
}

interface RippleRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export function MagicCursorEffect() {
  const [mode, setMode] = useState<CursorMode>("circle");
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        window.innerWidth < 768;
      setIsTouch(isTouchDevice);
      if (isTouchDevice) return;
    }
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const domContainerRef = useRef<HTMLDivElement>(null);
  const domCursorRef = useRef<HTMLDivElement>(null);

  // Sync cursor mode from Header & LocalStorage
  useEffect(() => {
    if (isTouch) return;
    const validModes: CursorMode[] = [
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

    const getInitialMode = (): CursorMode => {
      const saved = localStorage.getItem("magicCursor") as CursorMode;
      if (validModes.includes(saved)) {
        return saved;
      }
      return "circle";
    };

    const initialMode = getInitialMode();
    setMode(initialMode);
    document.documentElement.setAttribute("data-cursor", initialMode);

    const handleCursorChange = () => {
      const current = (localStorage.getItem("magicCursor") as CursorMode) || "circle";
      setMode(current);
      document.documentElement.setAttribute("data-cursor", current);
    };

    window.addEventListener("magicCursorChange", handleCursorChange);
    window.addEventListener("storage", handleCursorChange);

    return () => {
      window.removeEventListener("magicCursorChange", handleCursorChange);
      window.removeEventListener("storage", handleCursorChange);
    };
  }, []);

  // Helper to dynamically read theme colors from CSS variables
  const getThemePalette = (): string[] => {
    if (typeof window === "undefined") return ["#F5B700", "#FDE68A"];
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    const brand = computed.getPropertyValue("--brand").trim() || "#F5B700";
    const brandLight = computed.getPropertyValue("--brand-light").trim() || "#FEF3C7";
    const brandDeep = computed.getPropertyValue("--brand-deep").trim() || "#D99B00";
    return [brandLight, brand, brandDeep, "#FFFFFF"];
  };

  // 1. DOM Based Follower Physics (circle, glow-dot, crosshair, bubble)
  useEffect(() => {
    if (
      mode !== "circle" &&
      mode !== "glow-dot" &&
      mode !== "crosshair" &&
      mode !== "bubble"
    ) {
      return;
    }

    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let prevX = -100;
    let prevY = -100;
    let animId: number | null = null;
    let isHovering = false;
    let isVisible = false;

    const el = domCursorRef.current;
    const container = domContainerRef.current;

    const renderLoop = () => {
      if (mouseX > -50 && mouseY > -50) {
        // Lerp factor
        const lerpFactor = mode === "crosshair" ? 0.35 : mode === "glow-dot" ? 0.3 : 0.22;
        currX += (mouseX - currX) * lerpFactor;
        currY += (mouseY - currY) * lerpFactor;

        if (el) {
          if (mode === "bubble") {
            // Velocity squash & stretch
            const vx = currX - prevX;
            const vy = currY - prevY;
            const speed = Math.min(Math.sqrt(vx * vx + vy * vy), 25);
            const angle = Math.atan2(vy, vx);
            const stretch = 1 + speed * 0.018;
            const squash = 1 / stretch;
            el.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${stretch}, ${squash})`;
            prevX = currX;
            prevY = currY;
          } else {
            el.style.transform = `translate3d(${currX}px, ${currY}px, 0) translate(-50%, -50%)`;
          }
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (container) container.style.opacity = "1";
      }

      if (currX === -100) {
        currX = mouseX;
        currY = mouseY;
        prevX = mouseX;
        prevY = mouseY;
      }

      const target = e.target as HTMLElement | null;
      const interactive = !!(
        target &&
        target.closest(
          'a, button, [role="button"], input, select, textarea, .nm-interactive, .sujon-logo-reveal, [data-interactive], [tabindex="0"]'
        )
      );

      if (interactive !== isHovering) {
        isHovering = interactive;
        if (el) el.classList.toggle("is-hover", isHovering);
      }
    };

    const handleMouseDown = () => {
      if (el) el.classList.add("is-down");
    };

    const handleMouseUp = () => {
      if (el) el.classList.remove("is-down");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (container) container.style.opacity = "0";
      mouseX = -100;
      mouseY = -100;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    animId = requestAnimationFrame(renderLoop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mode]);

  // 2. Canvas Based Physics (spark, trail, orbit, fire, matrix, ripple, galaxy)
  useEffect(() => {
    if (
      mode !== "spark" &&
      mode !== "trail" &&
      mode !== "orbit" &&
      mode !== "fire" &&
      mode !== "matrix" &&
      mode !== "ripple" &&
      mode !== "galaxy"
    ) {
      return;
    }

    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let sparks: SparkParticle[] = [];
    let trailPoints: TrailPoint[] = [];
    let fireParticles: FireParticle[] = [];
    let matrixDrops: MatrixDrop[] = [];
    let ripples: RippleRing[] = [];
    let lastRippleX = -100;
    let lastRippleY = -100;
    let galaxyAngle = 0;
    let mouseX = -100;
    let mouseY = -100;
    let orbitAngle = 0;
    let animId: number | null = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const palette = getThemePalette();
      const primaryColor = palette[1] || "#F5B700";

      if (mode === "spark") {
        const count = Math.random() > 0.35 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.3 + Math.random() * 1.2;
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
      } else if (mode === "trail") {
        trailPoints.push({ x: mouseX, y: mouseY, time: Date.now() });
        if (trailPoints.length > 25) trailPoints.shift();
      } else if (mode === "fire") {
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
      } else if (mode === "matrix") {
        const chars = ["0", "1", "0", "1", "1", "0", "λ", "⚡", "◊", "1"];
        matrixDrops.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vy: 1.2 + Math.random() * 2.0,
          char: chars[Math.floor(Math.random() * chars.length)],
          color: Math.random() > 0.35 ? (palette[0] || "#22C55E") : "#FFFFFF",
          alpha: 1,
          life: 0,
          maxLife: 22 + Math.random() * 10,
          size: 11,
        });
      } else if (mode === "ripple") {
        const dist = Math.hypot(e.clientX - lastRippleX, e.clientY - lastRippleY);
        if (dist > 18) {
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

      if (!animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const palette = getThemePalette();
      const primaryColor = palette[1] || "#F5B700";

      if (mode === "ripple") {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 4,
          maxRadius: 48,
          alpha: 1,
          color: primaryColor,
        });
      } else if (mode === "fire") {
        const fireColors = ["#FF3B30", "#FF9500", "#FFCC00", "#FFF3A8"];
        for (let i = 0; i < 6; i++) {
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
      }

      if (!animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const renderLoop = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const palette = getThemePalette();
      const primaryColor = palette[1] || "#F5B700";

      let hasActiveDrawing = false;

      // MODE: SPARK
      if (mode === "spark") {
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

          if (currentSize > 1.8 && sp.alpha > 0.4) {
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
        hasActiveDrawing = sparks.length > 0;
      }

      // MODE: TRAIL (Smooth Comet Ribbon)
      if (mode === "trail") {
        const now = Date.now();
        trailPoints = trailPoints.filter((pt) => now - pt.time < 350);

        if (trailPoints.length > 1) {
          hasActiveDrawing = true;
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

          // Glowing tip
          const tip = trailPoints[trailPoints.length - 1];
          ctx.beginPath();
          ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = 0.95;
          ctx.fill();
        }
      }

      // MODE: ORBIT (Cosmic Orbiting Satellites)
      if (mode === "orbit") {
        if (mouseX > -50 && mouseY > -50) {
          hasActiveDrawing = true;
          orbitAngle += 0.05;

          // Center micro core
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = 0.9;
          ctx.fill();

          // Satellite 1
          const r1 = 20;
          const s1X = mouseX + Math.cos(orbitAngle) * r1;
          const s1Y = mouseY + Math.sin(orbitAngle) * r1;

          ctx.beginPath();
          ctx.arc(s1X, s1Y, 3, 0, Math.PI * 2);
          ctx.fillStyle = palette[0] || "#FFFFFF";
          ctx.globalAlpha = 0.85;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Satellite 2
          const r2 = 24;
          const s2X = mouseX + Math.cos(orbitAngle + Math.PI) * r2;
          const s2Y = mouseY + Math.sin(orbitAngle + Math.PI) * (r2 * 0.7);

          ctx.beginPath();
          ctx.arc(s2X, s2Y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = palette[2] || primaryColor;
          ctx.globalAlpha = 0.75;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Subtle faint orbital rings
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, r1, 0, Math.PI * 2);
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 0.7;
          ctx.globalAlpha = 0.2;
          ctx.stroke();
        }
      }

      // MODE: FIRE (Fiery Embers & Flame Sparks)
      if (mode === "fire") {
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
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
          return p.life < p.maxLife;
        });

        if (mouseX > -50) {
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FFF3A8";
          ctx.globalAlpha = 0.95;
          ctx.shadowColor = "#FF9500";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        hasActiveDrawing = fireParticles.length > 0;
      }

      // MODE: MATRIX (Cyber Rain & Digital Glyphs)
      if (mode === "matrix") {
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        matrixDrops = matrixDrops.filter((d) => {
          d.y += d.vy;
          d.life += 1;
          d.alpha = Math.max(0, 1 - d.life / d.maxLife);
          if (d.alpha <= 0.01) return false;

          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha * 0.95;
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 5;
          ctx.fillText(d.char, d.x, d.y);
          ctx.shadowBlur = 0;
          return d.life < d.maxLife;
        });

        if (mouseX > -50) {
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = 1;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        hasActiveDrawing = matrixDrops.length > 0;
      }

      // MODE: RIPPLE (Concentric Liquid Waves)
      if (mode === "ripple") {
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

        if (mouseX > -50) {
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = 0.9;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        hasActiveDrawing = ripples.length > 0;
      }

      // MODE: GALAXY (Swirling Cosmic Vortex)
      if (mode === "galaxy") {
        if (mouseX > -50 && mouseY > -50) {
          hasActiveDrawing = true;
          galaxyAngle += 0.04;

          // Glowing Galactic Nucleus
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = 1;
          ctx.shadowColor = primaryColor;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // 3 Spiral Arms
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
              ctx.shadowColor = primaryColor;
              ctx.shadowBlur = 5;
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      ctx.globalAlpha = 1;

      if (hasActiveDrawing || mode === "orbit" || mode === "galaxy") {
        animId = requestAnimationFrame(renderLoop);
      } else {
        animId = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [mode, isTouch]);

  if (isTouch) return null;

  if (mode === "default") {
    return null;
  }

  return (
    <>
      {/* Canvas Layer for Particle & Dynamic Cursors (spark, trail, orbit, fire, matrix, ripple, galaxy) */}
      {(mode === "spark" ||
        mode === "trail" ||
        mode === "orbit" ||
        mode === "fire" ||
        mode === "matrix" ||
        mode === "ripple" ||
        mode === "galaxy") && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[9999998]"
          aria-hidden="true"
        />
      )}

      {/* DOM Layer for Follower Cursors (circle, glow-dot, crosshair, bubble) */}
      {(mode === "circle" ||
        mode === "glow-dot" ||
        mode === "crosshair" ||
        mode === "bubble") && (
        <div
          ref={domContainerRef}
          className="magic-cursor-container transition-opacity duration-150 opacity-0"
          aria-hidden="true"
        >
          {mode === "circle" && (
            <div ref={domCursorRef} className="magic-cursor-ring" />
          )}

          {mode === "glow-dot" && (
            <div
              ref={domCursorRef}
              className="magic-cursor-glow-dot"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                borderRadius: "9999px",
                width: 14,
                height: 14,
                backgroundColor: "var(--brand)",
                boxShadow: "0 0 14px var(--brand), 0 0 28px var(--brand)",
                transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
              }}
            />
          )}

          {mode === "crosshair" && (
            <div
              ref={domCursorRef}
              className="magic-cursor-crosshair"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                width: 32,
                height: 32,
                transition: "transform 0.08s ease-out",
              }}
            >
              {/* Outer Reticle Ring */}
              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: "9999px",
                  border: "1.5px solid var(--brand)",
                  opacity: 0.85,
                }}
              />
              {/* Center Dot */}
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
              {/* 4 Precision Tick Marks */}
              <div style={{ position: "absolute", top: -3, left: "50%", transform: "translateX(-50%)", width: 1.5, height: 5, backgroundColor: "var(--brand)" }} />
              <div style={{ position: "absolute", bottom: -3, left: "50%", transform: "translateX(-50%)", width: 1.5, height: 5, backgroundColor: "var(--brand)" }} />
              <div style={{ position: "absolute", left: -3, top: "50%", transform: "translateY(-50%)", height: 1.5, width: 5, backgroundColor: "var(--brand)" }} />
              <div style={{ position: "absolute", right: -3, top: "50%", transform: "translateY(-50%)", height: 1.5, width: 5, backgroundColor: "var(--brand)" }} />
            </div>
          )}

          {mode === "bubble" && (
            <div
              ref={domCursorRef}
              className="magic-cursor-bubble"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                borderRadius: "50%",
                width: 28,
                height: 28,
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), transparent 60%), color-mix(in srgb, var(--brand) 35%, transparent)",
                border: "1.5px solid color-mix(in srgb, var(--brand) 70%, white)",
                backdropFilter: "blur(2px)",
                boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.15), 0 4px 12px color-mix(in srgb, var(--brand) 25%, transparent)",
                willChange: "transform",
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
