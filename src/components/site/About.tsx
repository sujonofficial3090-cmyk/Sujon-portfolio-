import { lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Zap, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";

// Lazy load heavy particle component — only on desktop
const ParticleLetterS = lazy(() =>
  import("@/components/site/ParticleLetterS").then((m) => ({ default: m.ParticleLetterS }))
);

// High-impact Developer Highlights Card for Mobile (fast, zero canvas bloat, high aesthetic)
function MobileDeveloperCard() {
  const { t } = useTranslation();
  return (
    <div className="relative flex flex-col items-center justify-between h-full w-full py-2 px-1 select-none">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-brand-light/20 dark:bg-brand-light/10 blur-3xl" />

      {/* Top Header: Branded Emblem & Availability */}
      <div className="relative z-10 flex flex-col items-center text-center w-full">
        {/* Embossed S Emblem */}
        <div className="relative mb-3">
          <div className="nm-raised flex h-16 w-16 items-center justify-center rounded-[20px] transition-transform duration-300">
            <span
              className="sujon-logo text-brand-gradient text-3xl font-black select-none"
              style={{
                lineHeight: 1,
                background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand) 60%, #FFD101 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 4px 12px color-mix(in srgb, var(--brand) 30%, transparent))",
              }}
            >
              S
            </span>
          </div>
          {/* Subtle online indicator dot */}
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-background" />
          </span>
        </div>

        {/* Developer name & status */}
        <h3 className="text-[18px] font-black tracking-tight text-foreground">
          Sujon Mia
        </h3>
        <p className="text-[11.5px] font-extrabold text-brand-deep uppercase tracking-wider mt-0.5">
          Senior WordPress & Frontend Developer
        </p>

        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full nm-inset px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for New Projects
        </div>
      </div>

      {/* 4 Feature Highlights Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-2.5 w-full mt-4">
        <div className="nm-inset rounded-[14px] p-3 text-left">
          <div className="flex items-center gap-1.5 text-brand-deep">
            <Zap className="h-3.5 w-3.5" />
            <span className="text-[12.5px] font-black">99+</span>
          </div>
          <p className="text-[11px] font-bold text-foreground mt-1">Core Web Vitals</p>
          <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">Sub-second speed</p>
        </div>

        <div className="nm-inset rounded-[14px] p-3 text-left">
          <div className="flex items-center gap-1.5 text-brand-deep">
            <Award className="h-3.5 w-3.5" />
            <span className="text-[12.5px] font-black">3+ Yrs</span>
          </div>
          <p className="text-[11px] font-bold text-foreground mt-1">Dual Expertise</p>
          <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">WordPress & Frontend</p>
        </div>

        <div className="nm-inset rounded-[14px] p-3 text-left">
          <div className="flex items-center gap-1.5 text-brand-deep">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-[12.5px] font-black">30+</span>
          </div>
          <p className="text-[11px] font-bold text-foreground mt-1">Delivered</p>
          <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">US, UK, UAE, EU</p>
        </div>

        <div className="nm-inset rounded-[14px] p-3 text-left">
          <div className="flex items-center gap-1.5 text-brand-deep">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="text-[12.5px] font-black">100%</span>
          </div>
          <p className="text-[11px] font-bold text-foreground mt-1">Clean & Secure</p>
          <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-0.5">Scalable & SEO</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex items-center gap-2.5 w-full mt-4">
        <a
          href="#contact"
          className="nm-raised-sm hover:nm-interactive text-brand-deep flex-1 py-2.5 rounded-[10px] text-center text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-1"
        >
          {t("cta_contact", "Get In Touch")} <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <Link
          to="/projects"
          className="nm-inset text-foreground/85 hover:text-brand-deep flex-1 py-2.5 rounded-[10px] text-center text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-1"
        >
          {t("nav_projects", "Projects")}
        </Link>
      </div>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();

  const capabilities = [
    {
      title: t("svc_1_title", "WordPress & Frontend Development"),
      desc: t("svc_1_desc", "High-performance WordPress websites and modern frontend interfaces built around business needs."),
    },
    {
      title: t("svc_2_title", "Modern Frontend (React & Next.js)"),
      desc: t("svc_2_desc", "Component-driven user interfaces, React/Next.js apps, TypeScript, and Tailwind CSS."),
    },
    {
      title: t("svc_4_title", "WooCommerce & E-Commerce"),
      desc: t("svc_4_desc", "High-converting WooCommerce stores, product layouts, customization and checkout flows."),
    },
    {
      title: t("svc_3_title", "Custom Functionality & APIs"),
      desc: t("svc_3_desc", "Custom WordPress plugins, RESTful APIs, dynamic CPTs, and headless solutions."),
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
              {t("about_heading", "Senior WordPress & Frontend Developer")}
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
                {t("about_skills_title", "Core WordPress & Frontend Capabilities")}
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

        {/* Right Side: Interactive WebGL particle "S" on desktop, executive developer card on mobile */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="relative flex min-h-[360px] lg:min-h-[520px] items-center justify-center overflow-hidden p-6 reveal-on-scroll stagger-2"
        >
          {/* Soft ambient lighting */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-brand-light/20 dark:bg-brand-light/10 blur-3xl" />

          {/* Mobile: lightweight high-end developer card */}
          <div className="block lg:hidden w-full h-full">
            <MobileDeveloperCard />
          </div>

          {/* Desktop only: interactive WebGL particle S */}
          <div className="hidden lg:block w-full h-full">
            <Suspense fallback={<MobileDeveloperCard />}>
              <ParticleLetterS />
            </Suspense>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
}
