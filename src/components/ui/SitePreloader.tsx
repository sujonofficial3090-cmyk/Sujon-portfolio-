import { useEffect, useState, useRef } from "react";

interface SitePreloaderProps {
  onComplete?: () => void;
}

// Session memory check
let memoryPreloaded = false;

function shouldRunPreloader(): boolean {
  if (typeof window === "undefined") return false;
  if (memoryPreloaded) return false;

  try {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload =
      navEntries.length > 0 &&
      (navEntries[0] as PerformanceNavigationTiming).type === "reload";
    const hasSeenInSession =
      sessionStorage.getItem("sujon_preloader_shown") === "true";

    // Show ONLY if fresh reload OR first time in session
    if (isReload || !hasSeenInSession) {
      return true;
    }
    return false;
  } catch {
    return !memoryPreloaded;
  }
}

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasFinishedRef = useRef(false);

  // Client-only initialization to eliminate SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
    const run = shouldRunPreloader();
    setShouldRun(run);

    if (!run) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    try {
      sessionStorage.setItem("sujon_preloader_shown", "true");
    } catch {}
    memoryPreloaded = true;

    // Safely pause Lenis momentum if active
    const globalLenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (globalLenis?.stop) {
      try {
        globalLenis.stop();
      } catch {}
    }

    const cleanupAndFinish = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;

      // Ensure Lenis scroll is safely resumed
      const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
      if (lenis?.start) {
        try {
          lenis.start();
        } catch {}
      }

      setIsExiting(true);
      setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 300);
    };

    // Absolute fail-safe hard timer: unconditionally finish within 1200ms
    const hardTimer = setTimeout(() => {
      setProgress(100);
      cleanupAndFinish();
    }, 1200);

    const startTime = performance.now();
    // Fast, responsive 750ms total progress duration
    const duration = 750;

    const easeOutQuad = (t: number) => t * (2 - t);

    // Primary driver: RAF
    const tick = (now: number) => {
      if (hasFinishedRef.current) return;

      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const val = Math.min(Math.floor(easeOutQuad(ratio) * 100), 100);

      setProgress(val);

      if (ratio < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(cleanupAndFinish, 60);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Secondary backup driver: ensures mobile low-power or throttled tabs never stall
    intervalRef.current = setInterval(() => {
      if (hasFinishedRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      const elapsed = performance.now() - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const val = Math.min(Math.floor(easeOutQuad(ratio) * 100), 100);
      setProgress((prev) => Math.max(prev, val));

      if (ratio >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        cleanupAndFinish();
      }
    }, 50);

    return () => {
      clearTimeout(hardTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Re-enable Lenis on unmount
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      if (lenis?.start) {
        try {
          lenis.start();
        } catch {}
      }
    };
  }, [onComplete]);

  // Prevent background touch scrolling on mobile while preloader is active
  useEffect(() => {
    if (!mounted || isDone || !shouldRun) return;

    const el = containerRef.current;
    if (!el) return;

    const preventTouch = (e: TouchEvent) => {
      if (!isExiting) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchmove", preventTouch, { passive: false });
    return () => {
      el.removeEventListener("touchmove", preventTouch);
    };
  }, [mounted, isDone, shouldRun, isExiting]);

  if (!mounted || !shouldRun || isDone) {
    return null;
  }

  // Dynamic status text
  const getStatusText = () => {
    if (progress >= 100) return "READY";
    if (progress >= 80) return "POLISHING";
    if (progress >= 40) return "LOADING";
    return "INITIALIZING";
  };

  return (
    <div
      ref={containerRef}
      id="site-preloader"
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-surface select-none overflow-hidden touch-none"
      style={{
        height: "100dvh",
        width: "100vw",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "scale(1.025)" : "scale(1)",
        pointerEvents: isExiting ? "none" : "auto",
        transition: "opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.28s ease",
      }}
      aria-hidden={isDone}
    >
      {/* Soft Ambient Radial Light Aura */}
      <div
        className="pointer-events-none absolute w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-brand-light/30 dark:bg-brand-light/15 blur-2xl transition-opacity duration-300"
        style={{ opacity: isExiting ? 0 : 1 }}
      />

      {/* Center Neumorphic Card — 100% Mobile Responsive & Zero Border Colors */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-[24px] bg-surface p-6 sm:p-9 nm-raised border-0 outline-none w-[min(340px,calc(100vw-36px))] max-h-[92dvh] overflow-y-auto"
        style={{
          boxShadow: "var(--shadow-nm-lg)",
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "translate3d(0, -18px, 0) scale(0.96)" : "translate3d(0, 0, 0) scale(1)",
          transition: "transform 0.26s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.26s ease",
        }}
      >
        {/* Embossed Monogram Emblem with Orbital Glow Ring */}
        <div className="relative mb-4 sm:mb-5 flex items-center justify-center">
          {/* Subtle spinning accent ring */}
          <div className="absolute -inset-1.5 rounded-full border border-dashed border-brand/35 animate-[spin_8s_linear_infinite]" />

          {/* Raised Outer Circle */}
          <div className="nm-raised flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-surface shadow-[var(--shadow-nm-sm)] border-0">
            {/* Inset Inner Well */}
            <div className="nm-inset flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full border-0">
              <span className="sujon-logo text-[22px] sm:text-[28px] font-black uppercase tracking-wider text-brand-deep">
                S
              </span>
            </div>
          </div>
        </div>

        {/* Brand Wordmark & Availability Pill */}
        <h1 className="sujon-logo text-[24px] sm:text-[28px] font-black tracking-[0.14em] select-none uppercase text-foreground leading-none">
          Sujon
        </h1>

        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9.5px] sm:text-[10.5px] font-extrabold tracking-[0.18em] text-muted-foreground uppercase nm-inset border-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>WordPress Studio</span>
        </div>

        {/* Numeric Counter */}
        <div className="mt-5 sm:mt-6 flex items-baseline justify-center gap-1">
          <span className="text-3xl sm:text-5xl font-black font-display tracking-tight text-foreground tabular-nums">
            {progress}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-brand">%</span>
        </div>

        {/* Neumorphic Inset Progress Bar */}
        <div className="mt-3 w-full">
          <div className="nm-inset h-2 w-full overflow-hidden rounded-full p-[2px] border-0">
            <div
              className="h-full rounded-full transition-[width] duration-75 ease-out shadow-[0_0_10px_var(--brand)]"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--brand-deep) 0%, var(--brand) 100%)",
              }}
            />
          </div>

          {/* Dynamic Status Text */}
          <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
            <span>{getStatusText()}</span>
            <span className="text-brand-deep font-black">{progress}/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
