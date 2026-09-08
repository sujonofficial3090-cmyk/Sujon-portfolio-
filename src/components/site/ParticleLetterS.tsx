import React, { useEffect, useRef } from "react";

interface Particle {
  originX: number;
  originY: number;
  cloudX: number;
  cloudY: number;
  x: number;
  y: number;
  size: number;
  color: string;
  bucket: number; // 0: light, 1: mid, 2: deep
  seed: number;
  stagger: number;
  progress: number;
  ease: number;
}

export function ParticleLetterS() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let buckets: Particle[][] = [[], [], []];
    let width = 0;
    let height = 0;
    let isInitialized = false;

    // Formation state
    let isFormed = false;
    let isForming = false;
    let isVisible = true;
    let assemblyStartTime = 0;

    // Track active theme state to detect instant changes
    let lastAccent = document.documentElement.getAttribute("data-accent") || "gold";
    let lastDark = document.documentElement.classList.contains("dark");

    // Raw pointer from user mouse/touch
    const rawMouse = {
      x: -9999,
      y: -9999,
      isHovered: false,
    };

    // Snappier, responsive mouse tracking
    const smoothMouse = {
      x: -9999,
      y: -9999,
      isHovered: false,
      radius: 135,
      maxRepel: 90,
    };

    // 5-Color Mood Palettes (Gold, Orange, Blue, Purple, Teal)
    function getThemePalette() {
      const accent = document.documentElement.getAttribute("data-accent") || "gold";

      switch (accent) {
        case "orange":
          return {
            light: "#FDBA74",
            mid: "#F97316",
            deep: "#EA580C",
          };
        case "blue":
          return {
            light: "#7DD3FC",
            mid: "#2563EB",
            deep: "#1D4ED8",
          };
        case "purple":
          return {
            light: "#C4B5FD",
            mid: "#7C3AED",
            deep: "#5B21B6",
          };
        case "teal":
          return {
            light: "#5EEAD4",
            mid: "#0D9488",
            deep: "#0F766E",
          };
        case "gold":
        default:
          return {
            light: "#FBBF24",
            mid: "#F59E0B",
            deep: "#EA580C",
          };
      }
    }

    function updateParticleColors() {
      const palette = getThemePalette();
      const paletteArr = [palette.light, palette.mid, palette.deep];
      for (let i = 0; i < particles.length; i++) {
        particles[i].color = paletteArr[particles[i].bucket];
      }
    }

    // Reset all particles to a circular ring outside the S ("gol hoye")
    function resetToCloud() {
      isFormed = false;
      isForming = false;
      assemblyStartTime = 0;
      if (particles.length === 0 || width <= 0 || height <= 0) return;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxDim = Math.max(width, height);
      const ringRadius = maxDim * 0.52;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Clean circular ring around the perimeter
        const angle = Math.atan2(p.originY - centerY, p.originX - centerX) + (Math.random() - 0.5) * 0.25;
        const radius = ringRadius + (Math.random() - 0.5) * (maxDim * 0.08);
        p.cloudX = centerX + Math.cos(angle) * radius;
        p.cloudY = centerY + Math.sin(angle) * radius;
        p.x = p.cloudX;
        p.y = p.cloudY;
      }
    }

    // Trigger smooth assembly from outside into the letter S
    function startAssembly() {
      if (isFormed || isForming) return;
      if (particles.length === 0) return;
      isForming = true;
      assemblyStartTime = performance.now() + 40;
    }

    function initParticles() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.round(rect.width);
      height = Math.round(rect.height);

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Offscreen canvas for font rasterization
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Base font size for sampling
      const baseFontSize = Math.min(width, height) * 0.85;
      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = "#ffffff";
      offCtx.font = `900 ${baseFontSize}px "Funnel Display", "Poppins", sans-serif`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText("S", width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;

      // Find precise pixel bounding box of letter S
      let minX = width, maxX = 0, minY = height, maxY = 0;
      let hasPixels = false;

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const idx = (y * width + x) * 4;
          if (imgData[idx + 3] > 40) {
            hasPixels = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (!hasPixels) return;

      const rawWidth = Math.max(1, maxX - minX);
      const rawHeight = Math.max(1, maxY - minY);
      const rawCenterX = (minX + maxX) / 2;
      const rawCenterY = (minY + maxY) / 2;

      // EXACT 95% scaling: Letter S fills 95% of container height and width
      const targetMaxHeight = height * 0.95;
      const targetMaxWidth = width * 0.95;
      const scale = Math.min(targetMaxWidth / rawWidth, targetMaxHeight / rawHeight);

      particles = [];
      buckets = [[], [], []];

      // High-performance stardust step (~6,000 crisp micro-particles for silky 120 FPS)
      const step = 1.85;
      const palette = getThemePalette();
      const paletteArr = [palette.light, palette.mid, palette.deep];

      const centerX = width / 2;
      const centerY = height / 2;

      for (let y = minY; y <= maxY; y += step) {
        for (let x = minX; x <= maxX; x += step) {
          const jitterX = (Math.random() - 0.5) * 0.55;
          const jitterY = (Math.random() - 0.5) * 0.55;
          const sampleX = Math.round(x + jitterX);
          const sampleY = Math.round(y + jitterY);

          if (sampleX >= 0 && sampleX < width && sampleY >= 0 && sampleY < height) {
            const index = (sampleY * width + sampleX) * 4;
            const alpha = imgData[index + 3];

            if (alpha > 45) {
              const finalX = (sampleX - rawCenterX) * scale + centerX;
              const finalY = (sampleY - rawCenterY) * scale + centerY;

              const normX = (sampleX - minX) / rawWidth;
              const normY = (sampleY - minY) / rawHeight;
              const progress = normX * 0.45 + normY * 0.55;

              // Assign gradient bucket: 0 (light tint), 1 (mid brand), 2 (deep shade)
              let bucket = 0;
              if (progress < 0.38) {
                bucket = 0;
              } else if (progress < 0.7) {
                bucket = 1;
              } else {
                bucket = 2;
              }

              // Crisp stardust micro-dots: 1.5px to 2.1px
              const size = 1.55 + Math.random() * 0.55;

              // Start in a circular ring outside the letter S ("gol hoye")
              const maxDim = Math.max(width, height);
              const ringRadius = maxDim * 0.52;
              const angle = Math.atan2(finalY - centerY, finalX - centerX) + (Math.random() - 0.5) * 0.25;
              const radius = ringRadius + (Math.random() - 0.5) * (maxDim * 0.08);
              const cloudX = centerX + Math.cos(angle) * radius;
              const cloudY = centerY + Math.sin(angle) * radius;

              const p: Particle = {
                originX: finalX,
                originY: finalY,
                cloudX,
                cloudY,
                x: cloudX,
                y: cloudY,
                size,
                color: paletteArr[bucket],
                bucket,
                seed: Math.random() * 100,
                stagger: Math.random() * 0.35,
                progress,
                // Organic ease for fluid convergence into S
                ease: 0.11 + Math.random() * 0.04,
              };

              particles.push(p);
              buckets[bucket].push(p);
            }
          }
        }
      }

      isInitialized = true;

      // Check if container is currently visible in viewport on mount/refresh
      const curRect = container.getBoundingClientRect();
      const inView = curRect.top < window.innerHeight && curRect.bottom > 0;
      if (inView) {
        startAssembly();
      }
    }

    // Initialize particles on mount
    initParticles();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!isInitialized) {
          initParticles();
        }
      });
    }

    // Trigger cloud assemble on scroll into view and pause render loop when off-screen to eliminate scroll lag
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!wasVisible) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = requestAnimationFrame(animate);
            }
            if (entry.intersectionRatio >= 0.1) {
              startAssembly();
            }
          } else {
            cancelAnimationFrame(animationFrameId);
            resetToCloud();
          }
        });
      },
      { threshold: [0, 0.1, 0.25] }
    );
    intersectionObserver.observe(container);

    // Also trigger on navigation / hash changes targeting #about
    const handleHashChange = () => {
      if (window.location.hash === "#about") {
        resetToCloud();
        setTimeout(startAssembly, 100);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    // Global hook for programmatic testing
    (window as unknown as { __triggerSIntro?: () => void }).__triggerSIntro = () => {
      resetToCloud();
      startAssembly();
    };

    // Responsive coordinate tracking directly on container without forced layout reflow
    const handlePointerMove = (e: MouseEvent) => {
      rawMouse.x = e.offsetX;
      rawMouse.y = e.offsetY;
      rawMouse.isHovered = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        rawMouse.x = e.touches[0].clientX - rect.left;
        rawMouse.y = e.touches[0].clientY - rect.top;
        rawMouse.isHovered = true;
      }
    };

    const handlePointerLeave = () => {
      rawMouse.x = -9999;
      rawMouse.y = -9999;
      rawMouse.isHovered = false;
    };

    container.addEventListener("mousemove", handlePointerMove, { passive: true });
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handlePointerLeave);

    // Watch for Theme and Accent changes
    const themeObserver = new MutationObserver(() => {
      lastAccent = document.documentElement.getAttribute("data-accent") || "gold";
      lastDark = document.documentElement.classList.contains("dark");
      updateParticleColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-accent", "class", "style"],
    });

    const resizeObserver = new ResizeObserver(() => {
      if (isInitialized) {
        initParticles();
      }
    });
    resizeObserver.observe(container);

    let time = 0;

    // High-performance 60+ FPS animation loop with batched color rendering
    function animate() {
      if (!ctx || !isVisible) return;
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Snappy mouse interpolation
      if (rawMouse.isHovered) {
        if (!smoothMouse.isHovered) {
          smoothMouse.x = rawMouse.x;
          smoothMouse.y = rawMouse.y;
          smoothMouse.isHovered = true;
        } else {
          smoothMouse.x += (rawMouse.x - smoothMouse.x) * 0.28;
          smoothMouse.y += (rawMouse.y - smoothMouse.y) * 0.28;
        }
      } else {
        if (smoothMouse.isHovered) {
          smoothMouse.x += (-9999 - smoothMouse.x) * 0.2;
          smoothMouse.y += (-9999 - smoothMouse.y) * 0.2;
          if (smoothMouse.x < -5000) {
            smoothMouse.isHovered = false;
          }
        }
      }

      const mouseRadius = smoothMouse.radius;
      const mouseRadiusSq = mouseRadius * mouseRadius;
      const maxRepel = smoothMouse.maxRepel;
      const isMouseActive = isFormed && smoothMouse.isHovered && smoothMouse.x > -2000;
      const palette = getThemePalette();
      const paletteArr = [palette.light, palette.mid, palette.deep];

      const now = performance.now();
      const elapsedAssembly = isForming ? (now - assemblyStartTime) / 1000 : 0;

      if (isForming && elapsedAssembly > 1.35) {
        isFormed = true;
        isForming = false;
      }

      // Batched rendering per bucket: only 3 fillStyle calls per frame for 25,000+ particles!
      for (let b = 0; b < 3; b++) {
        const bucket = buckets[b];
        const bLen = bucket.length;
        if (bLen === 0) continue;

        ctx.fillStyle = paletteArr[b];

        for (let i = 0; i < bLen; i++) {
          const p = bucket[i];

          let targetX = p.originX;
          let targetY = p.originY;

          if (isFormed) {
            // Fully formed letter S - mouse interaction active
            let repelX = 0;
            let repelY = 0;

            if (isMouseActive) {
              const dx = p.x - smoothMouse.x;
              const dy = p.y - smoothMouse.y;
              const distSq = dx * dx + dy * dy;

              if (distSq < mouseRadiusSq && distSq > 0.0001) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / mouseRadius;
                const smoothT = t * t * (3 - 2 * t);
                const repel = smoothT * maxRepel;

                repelX = (dx / dist) * repel;
                repelY = (dy / dist) * repel;
              }
            }

            let breathingX = 0;
            let breathingY = 0;
            if (isMouseActive) {
              breathingX = Math.sin(time + p.seed) * 0.18;
              breathingY = Math.cos(time + p.seed * 1.3) * 0.18;
            }

            targetX = p.originX + repelX + breathingX;
            targetY = p.originY + repelY + breathingY;

            const diffX = targetX - p.x;
            const diffY = targetY - p.y;
            if (Math.abs(diffX) > 0.02 || Math.abs(diffY) > 0.02) {
              p.x += diffX * p.ease;
              p.y += diffY * p.ease;
            } else {
              p.x = targetX;
              p.y = targetY;
            }
          } else if (isForming) {
            // Assembling inward from the circular outer ring ("gol hoye") into the letter S (fast & energetic)
            if (elapsedAssembly <= 0) {
              p.x = p.cloudX;
              p.y = p.cloudY;
            } else {
              // Faster brisk duration (~1.05s)
              const t = Math.max(0, Math.min(1, (elapsedAssembly - p.stagger) / 1.05));
              // High-aesthetic cubic ease out: fast initial rush from outside, smooth settling into S
              const easeT = 1 - Math.pow(1 - t, 3);
              const curX = p.cloudX + (p.originX - p.cloudX) * easeT;
              const curY = p.cloudY + (p.originY - p.cloudY) * easeT;

              // Smooth circular vortex motion ("gol hoye jeno ashe")
              const swirlAngle = (1 - easeT) * 0.45;
              const dx = curX - (width / 2);
              const dy = curY - (height / 2);
              const cosA = Math.cos(swirlAngle);
              const sinA = Math.sin(swirlAngle);
              const rotatedX = (width / 2) + dx * cosA - dy * sinA;
              const rotatedY = (height / 2) + dx * sinA + dy * cosA;

              targetX = rotatedX;
              targetY = rotatedY;
              // Snappier convergence
              p.x += (targetX - p.x) * 0.22;
              p.y += (targetY - p.y) * 0.22;
            }
          } else {
            // Waiting outside the card (e.g. before entering viewport)
            p.x = p.cloudX;
            p.y = p.cloudY;
          }

          // Blazing fast micro-dot render
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handlePointerLeave);
      window.removeEventListener("hashchange", handleHashChange);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full min-h-[480px] lg:min-h-[560px] items-center justify-center select-none cursor-default overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
