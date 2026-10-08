import { lazy, Suspense } from "react";
import { NeumorphicCard } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";

// Lazy load heavy particle component — only on desktop
const ParticleLetterS = lazy(() =>
  import("@/components/site/ParticleLetterS").then((m) => ({ default: m.ParticleLetterS }))
);

// Lightweight SVG "S" fallback for mobile
function StaticLetterS() {
  return (
    <div className="relative flex h-full w-full min-h-[300px] items-center justify-center select-none">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-brand-light/25 dark:bg-brand-light/12 blur-3xl" />
      <span
        className="sujon-logo text-brand-gradient relative z-10 select-none"
        style={{
          fontSize: "clamp(120px, 30vw, 200px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand) 60%, #FFD101 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 8px 24px color-mix(in srgb, var(--brand) 35%, transparent))",
        }}
      >
        S
      </span>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();

  const capabilities = [
    {
      title: t("svc_1_title", "WordPress Website Development"),
      desc: t("svc_1_desc", "Professional and responsive WordPress websites built around real business requirements."),
    },
    {
      title: t("svc_2_title", "Elementor Pro Development"),
      desc: t("svc_2_desc", "Responsive websites and landing pages using Elementor Pro with clean and flexible layouts."),
    },
    {
      title: t("svc_4_title", "WooCommerce Development"),
      desc: t("svc_4_desc", "WooCommerce websites, product layouts, customization and eCommerce functionality."),
    },
    {
      title: t("svc_3_title", "Custom WordPress Functionality"),
      desc: t("svc_3_desc", "Custom features and functionality developed according to specific website requirements."),
    },
  ];

  return (
    <section id="about" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr] items-stretch">
        {/* Left Side: Clean, simple & elegant executive profile */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 reveal-on-scroll stagger-1"
        >
          <div>
            {/* Title */}
            <h2 className="text-brand-gradient text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-[1.25] inline-block">
              {t("about_heading", "Senior WordPress Developer")}
            </h2>

            {/* Clean, readable bio */}
            <div className="mt-4 space-y-3.5 text-[15px] sm:text-[16px] font-medium leading-[1.75] text-foreground/85">
              <p>{t("about_p1")}</p>
              <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-[1.7]">
                {t("about_p2")}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="mt-8 border-t border-border/80 pt-6">
              <h3 className="text-[13px] sm:text-[13.5px] font-extrabold text-foreground mb-4 uppercase tracking-wider">
                {t("about_skills_title", "Core WordPress Capabilities")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {capabilities.map((item) => (
                  <div
                    key={item.title}
                    className="nm-inset rounded-[14px] p-4 flex items-start gap-3 transition-transform duration-200 hover:scale-[1.01]"
                  >
                    <span className="nm-raised-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand text-[12px] font-black mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-foreground tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[12px] font-medium text-muted-foreground mt-1 leading-[1.55]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </NeumorphicCard>

        {/* Right Side: Particle "S" on desktop, static SVG on mobile */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="relative flex min-h-[300px] lg:min-h-[520px] items-center justify-center overflow-hidden p-6 reveal-on-scroll stagger-2"
        >
          {/* Soft ambient lighting */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-brand-light/20 dark:bg-brand-light/10 blur-3xl" />

          {/* Mobile: lightweight static S (no WebGL, no canvas) */}
          <div className="block lg:hidden w-full h-full">
            <StaticLetterS />
          </div>

          {/* Desktop only: interactive WebGL particle S */}
          <div className="hidden lg:block w-full h-full">
            <Suspense fallback={<StaticLetterS />}>
              <ParticleLetterS />
            </Suspense>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
}
