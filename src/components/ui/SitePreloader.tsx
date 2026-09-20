import React, { useEffect, useState, useRef } from "react";

interface SitePreloaderProps {
  onComplete?: () => void;
}

export function SitePreloader({ onComplete }: SitePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [phaseText, setPhaseText] = useState("INITIALIZING SYSTEM...");
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable body scrolling during preloader
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 2000; // Crisp, luxury 2.0 second duration

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);
      
      // Easing curve: smooth ease-out with natural cadence
      const eased = Math.sin((rawRatio * Math.PI) / 2);
      const currentVal = Math.floor(eased * 100);

      setProgress(currentVal);

      if (currentVal < 28) {
        setPhaseText("INITIALIZING ENVIRONMENT");
      } else if (currentVal < 62) {
        setPhaseText("LOADING DIGITAL ASSETS");
      } else if (currentVal < 90) {
        setPhaseText("CONFIGURING SHADERS & 3D");
      } else if (currentVal < 100) {
        setPhaseText("PREPARING EXPERIENCE");
      } else {
        setPhaseText("WELCOME");
      }

      if (rawRatio < 1) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setPhaseText("WELCOME");
        // Hold at 100% briefly for visual satisfaction before cinematic split exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 850);
        }, 320);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isComplete) return null;

  // Format progress as 2 or 3 digits (e.g., 01%, 45%, 100%)
  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div
      id="site-preloader"
      className={`fixed inset-0 z-[99999] pointer-events-auto select-none transition-all duration-700 ${
        isExiting ? "pointer-events-none" : ""
      }`}
      aria-hidden={isComplete}
    >
      {/* Top Split Curtain */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#090b10] border-b border-white/[0.04] transition-transform duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)] origin-top will-change-transform"
        style={{
          transform: isExiting ? "translateY(-101%)" : "translateY(0%)",
        }}
      />

      {/* Bottom Split Curtain */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#090b10] border-t border-white/[0.04] transition-transform duration-[850ms] ease-[cubic-bezier(0.77,0,0.175,1)] origin-bottom will-change-transform"
        style={{
          transform: isExiting ? "translateY(101%)" : "translateY(0%)",
        }}
      />

      {/* Ambient Brand Aurora Glow in center */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: isExiting ? 0 : 1 }}
      >
        <div
          className="w-[520px] h-[520px] rounded-full blur-[110px] opacity-25 animate-pulse"
          style={{
            background: "radial-gradient(circle, var(--brand, #00FD90) 0%, rgba(var(--brand-rgb, 0, 253, 144), 0.15) 50%, transparent 75%)",
            animationDuration: "3s",
          }}
        />
      </div>

      {/* Subtle Matrix Micro-Grid Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] transition-opacity duration-500"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          opacity: isExiting ? 0 : 0.035,
        }}
      />

      {/* Central Content Container */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(1.08) translateY(-10px)" : "scale(1) translateY(0)",
        }}
      >
        {/* Soft Emboss Luxury Medallion */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Atmospheric Pulse Halo */}
          <div
            className="absolute -inset-5 rounded-full opacity-30 animate-ping pointer-events-none"
            style={{
              background: "radial-gradient(circle, var(--brand, #00FD90) 0%, transparent 70%)",
              animationDuration: "2.8s",
            }}
          />

          {/* Orbiting Celestial Ring 1 - Dashed Slow Rotation */}
          <div
            className="absolute -inset-4 rounded-full border border-dashed border-white/15 animate-[spin_12s_linear_infinite]"
            style={{
              borderColor: "rgba(var(--brand-rgb, 0, 253, 144), 0.22)",
            }}
          />

          {/* Orbiting Celestial Ring 2 - Luminous Satellites */}
          <div className="absolute -inset-7 rounded-full animate-[spin_4.5s_linear_infinite]">
            {/* Satellite Bead 1 */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_var(--brand,#00FD90)]"
              style={{
                background: "var(--brand, #00FD90)",
              }}
            />
            {/* Satellite Bead 2 */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full opacity-60"
              style={{
                background: "var(--brand, #00FD90)",
                boxShadow: "0 0 8px var(--brand, #00FD90)",
              }}
            />
          </div>

          {/* Outer Beveled Neumorphic Frame */}
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1.5 flex items-center justify-center relative shadow-[14px_14px_32px_rgba(0,0,0,0.7),-8px_-8px_24px_rgba(255,255,255,0.035)] border border-white/[0.08]"
            style={{
              background: "linear-gradient(135deg, #161b24 0%, #0d1017 100%)",
            }}
          >
            {/* Inner Concave Deep Well */}
            <div
              className="w-full h-full rounded-[22px] flex items-center justify-center relative overflow-hidden shadow-[inset_6px_6px_14px_rgba(0,0,0,0.8),inset_-5px_-5px_12px_rgba(255,255,255,0.04)] border border-black/40"
              style={{
                background: "radial-gradient(circle at 35% 30%, #151a23 0%, #0a0d13 100%)",
              }}
            >
              {/* Internal Fluid Shimmer Light Sweep */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none animate-[shimmer_2.8s_infinite]"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.2) 45%, var(--brand, #00FD90) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Sculpted Embossed Monogram "S" */}
              <div className="relative z-10 flex items-center justify-center filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                <svg
                  className="w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                      <stop offset="45%" stopColor="var(--brand, #00FD90)" />
                      <stop offset="100%" stopColor="var(--brand-deep, #00c770)" />
                    </linearGradient>
                    <filter id="embossInner" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
                    </filter>
                  </defs>
                  
                  {/* Monogram S Vector Geometry with Bevel Edge */}
                  <path
                    d="M68 28C68 28 62 21 49 21C35 21 27 29 27 38C27 54 73 44 73 66C73 78 61 83 48 83C33 83 26 73 26 73"
                    stroke="url(#monogramGrad)"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#embossInner)"
                  />
                  {/* Inner Crisp Precision Hairline for 3D Chrome Effect */}
                  <path
                    d="M68 28C68 28 62 21 49 21C35 21 27 29 27 38C27 54 73 44 73 66C73 78 61 83 48 83C33 83 26 73 26 73"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Wordmark with Liquid Light Shimmer */}
        <div className="flex flex-col items-center mb-7">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-[0.38em] uppercase text-transparent bg-clip-text font-display transition-all duration-300 relative"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #FFFFFF 0%, #E2E8F0 30%, var(--brand, #00FD90) 65%, #FFFFFF 100%)",
              backgroundSize: "220% 100%",
              animation: "shimmer 3.2s infinite linear",
              paddingLeft: "0.38em", // Balance out letter-spacing offset
            }}
          >
            SUJON
          </h1>

          {/* Subtitle Identity Tag */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--brand, #00FD90)",
                boxShadow: "0 0 6px var(--brand, #00FD90)",
              }}
            />
            <span className="text-[11px] sm:text-xs tracking-[0.28em] font-medium text-slate-400 uppercase font-sans">
              CREATIVE TECHNOLOGIST
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--brand, #00FD90)",
                boxShadow: "0 0 6px var(--brand, #00FD90)",
              }}
            />
          </div>
        </div>

        {/* Minimalist Hairline Progress Bar */}
        <div className="w-56 sm:w-64 flex flex-col items-center">
          <div className="w-full h-1 bg-[#141822] rounded-full p-[1px] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-white/[0.05] relative overflow-hidden">
            {/* Moving Progress Bar */}
            <div
              className="h-full rounded-full relative transition-[width] duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, rgba(var(--brand-rgb, 0, 253, 144), 0.3) 0%, var(--brand, #00FD90) 100%)",
                boxShadow: "0 0 12px var(--brand, #00FD90)",
              }}
            >
              {/* Glowing Leading Head Tip */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFF,0_0_14px_var(--brand,#00FD90)]"
              />
            </div>
          </div>

          {/* Bottom Info Row: Percentage & Micro Status */}
          <div className="w-full flex items-center justify-between mt-3 text-xs">
            <span className="font-mono text-[10px] tracking-[0.18em] text-slate-400 font-medium uppercase">
              {phaseText}
            </span>
            <span
              className="font-mono font-bold text-xs tracking-wider"
              style={{ color: "var(--brand, #00FD90)" }}
            >
              {formattedProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
