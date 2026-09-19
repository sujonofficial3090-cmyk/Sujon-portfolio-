import React, { useEffect, useRef, useState } from "react";

export type CursorMode = "circle" | "spark" | "default";

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

export function MagicCursorEffect() {
  const [mode, setMode] = useState<CursorMode>("circle");

  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync cursor mode from Header & LocalStorage
  useEffect(() => {
    const getInitialMode = (): CursorMode => {
      const saved = localStorage.getItem("magicCursor") as CursorMode;
      if (saved === "circle" || saved === "spark" || saved === "default") {
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

  // 1. Circle Follower Physics (mode === "circle")
  useEffect(() => {
    if (mode !== "circle") return;

    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId: number | null = null;
    let isHovering = false;
    let isVisible = false;

    const ringEl = ringRef.current;
    const containerEl = containerRef.current;

    const renderLoop = () => {
      if (mouseX > -50 && mouseY > -50) {
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;

        if (ringEl) {
          ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (containerEl) {
          containerEl.style.opacity = "1";
        }
      }

      if (ringX === -100) {
        ringX = mouseX;
        ringY = mouseY;
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
        if (ringEl) {
          ringEl.classList.toggle("is-hover", isHovering);
        }
      }
    };

    const handleMouseDown = () => {
      if (ringEl) ringEl.classList.add("is-down");
    };

    const handleMouseUp = () => {
      if (ringEl) ringEl.classList.remove("is-down");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (containerEl) {
        containerEl.style.opacity = "0";
      }
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

  // 2. Spark Particle Trail Physics (mode === "spark")
  useEffect(() => {
    if (mode !== "spark") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let sparks: SparkParticle[] = [];
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

    const getThemeColors = (): string[] => {
      const root = document.documentElement;
      const accent = root.getAttribute("data-accent") || "gold";
      switch (accent) {
        case "orange":
          return ["#FFEDD5", "#FDBA74", "#F97316", "#EA580C"];
        case "blue":
          return ["#EFF6FF", "#93C5FD", "#3B82F6", "#2563EB"];
        case "purple":
          return ["#F5F3FF", "#DDD6FE", "#A78BFA", "#7C3AED"];
        case "teal":
          return ["#F0FDFA", "#99F6E4", "#2DD4BF", "#0D9488"];
        case "gold":
        default:
          return ["#FEF3C7", "#FDE68A", "#F59E0B", "#D97706"];
      }
    };

    const renderSparks = () => {
      const dpr = window.devicePixelRatio || 1;

      // Safe clean wipe: always wipes full buffer without trails
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (sparks.length === 0) {
        animId = null;
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sparks = sparks.filter((sp) => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life += 1;
        sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);

        if (sp.alpha <= 0.01) return false;

        const currentSize = Math.max(0.4, sp.size * sp.alpha);

        // Core spark dot
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha * 0.9;
        ctx.fill();

        // Cross sparkle ray for stars
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

      ctx.globalAlpha = 1;

      if (sparks.length > 0) {
        animId = requestAnimationFrame(renderSparks);
      } else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const colors = getThemeColors();
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
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          life: 0,
          maxLife: 22 + Math.random() * 14,
        });
      }

      if (!animId) {
        animId = requestAnimationFrame(renderSparks);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [mode]);

  if (mode === "default") {
    return null;
  }

  return (
    <>
      {/* Spark Particle Trail Canvas (mode === "spark") */}
      {mode === "spark" && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[9999998]"
          aria-hidden="true"
        />
      )}

      {/* Circle Follower Ring (mode === "circle") */}
      {mode === "circle" && (
        <div
          ref={containerRef}
          className="magic-cursor-container transition-opacity duration-150 opacity-0"
          aria-hidden="true"
        >
          <div ref={ringRef} className="magic-cursor-ring" />
        </div>
      )}
    </>
  );
}
