import React, { useEffect, useRef } from "react";

interface DotParticle {
  startX: number;
  startY: number;
  targetDistance: number;
  angle: number;
  size: number;
  color: string;
  baseAlpha: number;
  ring: number;
}

interface ClickBurst {
  id: number;
  createdAt: number;
  duration: number;
  particles: DotParticle[];
}

export function ClickDotEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let bursts: ClickBurst[] = [];
    let animationFrameId: number | null = null;
    let burstIdCounter = 0;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Dynamic color resolution matching website's accent & dark/light theme
    const getThemeColors = (): string[] => {
      const root = document.documentElement;
      const computed = getComputedStyle(root);
      const accent = root.getAttribute("data-accent") || "gold";

      const brandColor = computed.getPropertyValue("--brand").trim();
      const brandLight = computed.getPropertyValue("--brand-light").trim();
      const brandDeep = computed.getPropertyValue("--brand-deep").trim();

      let palette: string[];
      switch (accent) {
        case "orange":
          palette = ["#FFEDD5", "#FDBA74", "#F97316", "#EA580C", "#C2410C"];
          break;
        case "blue":
          palette = ["#EFF6FF", "#93C5FD", "#3B82F6", "#2563EB", "#1D4ED8"];
          break;
        case "purple":
          palette = ["#F5F3FF", "#DDD6FE", "#A78BFA", "#7C3AED", "#6D28D9"];
          break;
        case "teal":
          palette = ["#F0FDFA", "#99F6E4", "#2DD4BF", "#0D9488", "#0F766E"];
          break;
        case "gold":
        default:
          palette = ["#FEF3C7", "#FDE68A", "#F59E0B", "#D97706", "#B45309"];
          break;
      }

      if (brandColor) {
        return [
          brandLight || palette[0],
          palette[1],
          brandColor,
          brandDeep || palette[3],
          palette[4],
        ];
      }

      return palette;
    };

    const createBurst = (clickX: number, clickY: number) => {
      const colors = getThemeColors();
      const particles: DotParticle[] = [];

      // Concentric ring structure matching the reference screenshot:
      // Ring 1 (Inner): 6 dots, radius ~26px
      // Ring 2 (Mid-inner): 8 dots, radius ~52px
      // Ring 3 (Mid-outer): 10 dots, radius ~84px
      // Ring 4 (Outer): 12 dots, radius ~124px
      const ringConfigs = [
        { count: 6, dist: 26, sizeMin: 3.5, sizeMax: 5.0, alphaMin: 0.75, alphaMax: 0.95 },
        { count: 8, dist: 52, sizeMin: 3.8, sizeMax: 5.5, alphaMin: 0.6, alphaMax: 0.85 },
        { count: 10, dist: 84, sizeMin: 3.2, sizeMax: 4.8, alphaMin: 0.45, alphaMax: 0.75 },
        { count: 12, dist: 124, sizeMin: 2.5, sizeMax: 4.2, alphaMin: 0.25, alphaMax: 0.55 },
      ];

      ringConfigs.forEach((config, ringIdx) => {
        const angleStep = (Math.PI * 2) / config.count;
        const ringRotationOffset = (ringIdx % 2 === 1 ? angleStep / 2 : 0) + (Math.random() - 0.5) * 0.1;

        for (let i = 0; i < config.count; i++) {
          const baseAngle = i * angleStep + ringRotationOffset;
          const angleJitter = (Math.random() - 0.5) * 0.12;
          const angle = baseAngle + angleJitter;
          const distJitter = (Math.random() - 0.5) * 12;
          const targetDistance = config.dist + distJitter;

          const size = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);
          const baseAlpha = config.alphaMin + Math.random() * (config.alphaMax - config.alphaMin);

          const color = colors[Math.floor(Math.random() * colors.length)];

          particles.push({
            startX: clickX,
            startY: clickY,
            targetDistance,
            angle,
            size,
            color,
            baseAlpha,
            ring: ringIdx + 1,
          });
        }
      });

      bursts.push({
        id: burstIdCounter++,
        createdAt: performance.now(),
        duration: 750,
        particles,
      });

      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (bursts.length === 0) {
        animationFrameId = null;
        return;
      }

      bursts = bursts.filter((burst) => {
        const elapsed = now - burst.createdAt;
        const progress = Math.min(elapsed / burst.duration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 3);
        const fadeProgress = Math.max(0, (progress - 0.1) / 0.9);
        const globalAlpha = 1 - Math.pow(fadeProgress, 1.5);

        burst.particles.forEach((p) => {
          const currentDist = p.targetDistance * easeOut;
          const currentX = p.startX + Math.cos(p.angle) * currentDist;
          const currentY = p.startY + Math.sin(p.angle) * currentDist;

          const currentAlpha = p.baseAlpha * globalAlpha;
          if (currentAlpha <= 0.01) return;

          const currentSize = Math.max(0.1, p.size);

          ctx.beginPath();
          ctx.arc(currentX, currentY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
        });

        return progress < 1;
      });

      ctx.globalAlpha = 1;

      if (bursts.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        animationFrameId = null;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      createBurst(clientX, clientY);
    };

    window.addEventListener("pointerdown", handlePointerDown, { capture: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[999999]"
      aria-hidden="true"
    />
  );
}
