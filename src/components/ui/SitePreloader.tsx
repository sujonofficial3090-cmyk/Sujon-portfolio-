import React, { useEffect, useState, useRef } from "react";

interface SitePreloaderProps {
  onComplete?: () => void;
}

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
  const [shouldRun] = useState(() => {
    if (typeof window === "undefined") return true;
    return shouldRunPreloader();
  });

  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(!shouldRun);

  const animFrameRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!shouldRun) {
      setIsDone(true);
      if (onComplete) onComplete();
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    try {
      sessionStorage.setItem("sujon_preloader_shown", "true");
    } catch {}
    memoryPreloaded = true;

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // Absolute fallback: ensure scroll is never stuck under any circumstance (max 1.6s)
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = "";
      setIsDone(true);
      if (onComplete) onComplete();
    }, 1600);

    const startTime = performance.now();
    // 850ms duration: fast, fluid, finishes cleanly within 1-2 seconds
    const duration = 850;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(ratio);
      const currentVal = Math.min(Math.floor(eased * 100), 100);

      setProgress(currentVal);

      if (ratio < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Instantly unlock body scroll as soon as 100% is reached
        document.body.style.overflow = "";

        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            clearTimeout(safetyTimer);
            setIsDone(true);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 380);
        }, 70);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(safetyTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  // Dynamic status text corresponding to loading milestones
  const getStatusText = () => {
    if (progress >= 100) return "READY";
    if (progress >= 80) return "POLISHING EXPERIENCE";
    if (progress >= 40) return "LOADING ASSETS";
    return "INITIALIZING STUDIO";
  };

  return (
    <div
      id="site-preloader"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-surface select-none overflow-hidden will-change-transform"
      style={{
        transform: isExiting ? "translate3d(0, -100%, 0)" : "translate3d(0, 0, 0)",
        boxShadow: isExiting ? "0 30px 60px -15px rgba(0, 0, 0, 0.3)" : "none",
        borderBottom: isExiting ? "1px solid rgba(var(--brand), 0.2)" : "none",
        transition:
          "transform 0.45s cubic-bezier(0.85, 0, 0.15, 1), box-shadow 0.45s ease",
        pointerEvents: isExiting ? "none" : "auto",
      }}
      aria-hidden={isDone}
    >
      {/* Soft Ambient Radial Light Aura */}
      <div
        className="pointer-events-none absolute w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full bg-brand-light/35 dark:bg-brand-light/20 blur-3xl animate-pulse transition-opacity duration-500"
        style={{ opacity: isExiting ? 0 : 1 }}
      />

      {/* Center Neumorphic Card */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-[28px] bg-surface/95 backdrop-blur-md p-8 sm:p-10 nm-raised border border-white/70 dark:border-white/10 shadow-[var(--shadow-nm)] max-w-[340px] sm:max-w-[370px] w-[calc(100%-40px)]"
        style={{
          transform: isExiting
            ? "translate3d(0, -45px, 0) scale(0.94)"
            : "translate3d(0, 0, 0) scale(1)",
          opacity: isExiting ? 0 : 1,
          filter: isExiting ? "blur(8px)" : "blur(0px)",
          transition:
            "transform 0.4s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.35s ease-out, filter 0.35s ease-out",
        }}
      >
        {/* Embossed Monogram Emblem with Orbital Glow Ring */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Spinning decorative halo */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-brand/40 animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-1 rounded-full border border-brand/20" />

          {/* Raised Outer Circle */}
          <div className="nm-raised flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-[var(--shadow-nm-sm)]">
            {/* Inset Inner Well */}
            <div className="nm-inset flex h-14 w-14 items-center justify-center rounded-full">
              <span className="sujon-logo text-[28px] font-black uppercase tracking-wider text-brand-deep">
                S
              </span>
            </div>
          </div>
        </div>

        {/* Brand Wordmark & Availability Pill */}
        <h1 className="sujon-logo text-[26px] sm:text-[30px] font-black tracking-[0.15em] select-none uppercase text-foreground">
          Sujon
        </h1>

        <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase nm-inset">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>WordPress Studio</span>
        </div>

        {/* Bold Modern Numeric Counter */}
        <div className="mt-7 flex items-baseline justify-center gap-1">
          <span className="text-4xl sm:text-5xl font-black font-display tracking-tight text-foreground tabular-nums">
            {progress}
          </span>
          <span className="text-base font-extrabold text-brand">%</span>
        </div>

        {/* Neumorphic Inset Progress Bar */}
        <div className="mt-3 w-full">
          <div className="nm-inset h-2 w-full overflow-hidden rounded-full p-[2px]">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-out shadow-[0_0_12px_var(--brand)]"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--brand-deep) 0%, var(--brand) 100%)",
              }}
            />
          </div>

          {/* Dynamic Status Text */}
          <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
            <span>{getStatusText()}</span>
            <span className="text-brand-deep font-black">{progress}/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}
