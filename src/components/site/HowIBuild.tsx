import { useRef, useEffect } from "react";
import { NeumorphicCard } from "@/components/nm";
import { Compass, FileCode2, Hammer, ShieldAlert, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const STEPS = [
  {
    num: "01",
    nameKey: "how_s1_name",
    descKey: "how_s1_desc",
    fallbackName: "Understand",
    fallbackDesc: "Understand the business, user requirements, goals, and technical requirements.",
    icon: Compass,
  },
  {
    num: "02",
    nameKey: "how_s2_name",
    descKey: "how_s2_desc",
    fallbackName: "Plan",
    fallbackDesc: "Define the structure, functionality, technology, and development approach.",
    icon: FileCode2,
  },
  {
    num: "03",
    nameKey: "how_s3_name",
    descKey: "how_s3_desc",
    fallbackName: "Build",
    fallbackDesc: "Use modern development techniques, WordPress, and AI-assisted coding workflows to implement the solution.",
    icon: Hammer,
  },
  {
    num: "04",
    nameKey: "how_s4_name",
    descKey: "how_s4_desc",
    fallbackName: "Test",
    fallbackDesc: "Test responsiveness, functionality, usability, performance, and edge cases.",
    icon: ShieldAlert,
  },
  {
    num: "05",
    nameKey: "how_s5_name",
    descKey: "how_s5_desc",
    fallbackName: "Optimize",
    fallbackDesc: "Refine the experience, fix issues, optimize performance, and prepare the final product.",
    icon: SlidersHorizontal,
  },
];

export function HowIBuild() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    // Sync custom color filter values if custom color is active
    const syncCustomFilter = () => {
      const storedAccent = localStorage.getItem("accentColor") || localStorage.getItem("accent");
      const hex = localStorage.getItem("customAccentHex");
      if (storedAccent === "custom" && hex) {
        const clean = hex.replace("#", "").trim();
        if (clean.length === 6) {
          const r = parseInt(clean.slice(0, 2), 16) / 255;
          const g = parseInt(clean.slice(2, 4), 16) / 255;
          const b = parseInt(clean.slice(4, 6), 16) / 255;
          const denom = 0.58;
          const sR = ((1.0 - r) / denom).toFixed(3);
          const iR = (1.0 - parseFloat(sR)).toFixed(3);
          const sG = ((1.0 - g) / denom).toFixed(3);
          const iG = (1.0 - parseFloat(sG)).toFixed(3);
          const sB = ((1.0 - b) / denom).toFixed(3);
          const iB = (1.0 - parseFloat(sB)).toFixed(3);

          const feR = document.getElementById("fe-custom-r");
          const feG = document.getElementById("fe-custom-g");
          const feB = document.getElementById("fe-custom-b");
          if (feR) { feR.setAttribute("slope", sR); feR.setAttribute("intercept", iR); }
          if (feG) { feG.setAttribute("slope", sG); feG.setAttribute("intercept", iG); }
          if (feB) { feB.setAttribute("slope", sB); feB.setAttribute("intercept", iB); }
        }
      }
    };

    syncCustomFilter();
    window.addEventListener("accentColorChange", syncCustomFilter);

    return () => {
      observer.disconnect();
      window.removeEventListener("accentColorChange", syncCustomFilter);
    };
  }, []);

  return (
    <section id="approach" aria-label="How I Build" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Header with Title & 3D Stepped Architecture Video */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 reveal-on-scroll">
          <div className="text-left">
            <span className="nm-inset text-brand-deep inline-block rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.14em] uppercase mb-2.5">
              {t("how_badge", "Structured Execution")}
            </span>
            <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal block">
              {t("how_heading", "How I Build")}
            </h2>
            <p className="mt-2 max-w-2xl text-[14.5px] sm:text-[16px] font-medium text-muted-foreground">
              {t("how_subtitle", "A structured, quality-driven approach from initial discovery to high-performance launch.")}
            </p>
          </div>

          {/* 3D Stepped Animation Video — 100% crystal clear quality, dynamic theme color, completely shadow-free */}
          <div className="flex items-center justify-center self-center w-full lg:w-auto">
            {/* Mathematical SVG filters ensuring 100.0% transparent background and theme colors */}
            <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
              <defs>
                <filter id="tint-gold">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="0.067" intercept="0.933" />
                    <feFuncG type="linear" slope="0.486" intercept="0.514" />
                    <feFuncB type="linear" slope="1.724" intercept="-0.724" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-orange">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="0.041" intercept="0.959" />
                    <feFuncG type="linear" slope="0.947" intercept="0.053" />
                    <feFuncB type="linear" slope="1.576" intercept="-0.576" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-blue">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="1.474" intercept="-0.474" />
                    <feFuncG type="linear" slope="1.055" intercept="-0.055" />
                    <feFuncB type="linear" slope="0.134" intercept="0.866" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-purple">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="0.886" intercept="0.114" />
                    <feFuncG type="linear" slope="1.333" intercept="-0.333" />
                    <feFuncB type="linear" slope="0.122" intercept="0.878" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-teal">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="1.636" intercept="-0.636" />
                    <feFuncG type="linear" slope="0.724" intercept="0.276" />
                    <feFuncB type="linear" slope="0.805" intercept="0.195" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-mint">
                  <feComponentTransfer>
                    <feFuncR type="linear" slope="1.724" intercept="-0.724" />
                    <feFuncG type="linear" slope="0.278" intercept="0.722" />
                    <feFuncB type="linear" slope="0.905" intercept="0.095" />
                  </feComponentTransfer>
                </filter>
                <filter id="tint-custom">
                  <feComponentTransfer id="fe-tint-custom">
                    <feFuncR id="fe-custom-r" type="linear" slope="1" intercept="0" />
                    <feFuncG id="fe-custom-g" type="linear" slope="1" intercept="0" />
                    <feFuncB id="fe-custom-b" type="linear" slope="1" intercept="0" />
                  </feComponentTransfer>
                </filter>
              </defs>
            </svg>

            {/* 3D Stepped Architecture Video — visible on all devices (mobile, tablet, desktop) */}
            <div className="relative flex w-full max-w-[220px] h-[135px] sm:h-[150px] items-center justify-center bg-transparent mx-auto">
              <video
                ref={videoRef}
                src="/videos/about-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain select-none pointer-events-none transition-all duration-300 how-build-3d-video"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <NeumorphicCard
                key={s.num}
                depth="sm"
                radius="lg"
                interactive
                className={`flex flex-col justify-between p-5 text-left group transition-transform duration-300 hover:-translate-y-1 reveal-on-scroll stagger-${idx + 1}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-black tracking-widest text-brand-deep uppercase">
                      {s.num}
                    </span>
                    <div className="nm-inset text-brand-deep flex h-9 w-9 items-center justify-center rounded-[10px]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold text-foreground tracking-tight group-hover:text-brand-deep transition-colors mb-2">
                    {t(s.nameKey as any, s.fallbackName)}
                  </h3>
                  <p className="text-[13px] font-medium leading-[1.65] text-muted-foreground">
                    {t(s.descKey as any, s.fallbackDesc)}
                  </p>
                </div>
              </NeumorphicCard>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
