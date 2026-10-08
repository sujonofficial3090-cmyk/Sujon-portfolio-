import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";
import { useTranslation } from "@/lib/i18n";

import heroProfileImg from "@/assets/hero-profile.png";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="overflow-hidden">
        <div className="grid min-h-[520px] items-center gap-0 lg:grid-cols-[1.25fr_auto]">
          {/* LEFT — Text content & CTA */}
          <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 lg:py-16 lg:pl-14">
            {/* Badge */}
            <div className="mb-4 hero-animate-1 flex flex-wrap gap-2">
              <span className="nm-inset text-brand-deep inline-block rounded-[8px] px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.14em] uppercase">
                {t("hero_badge")}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="hero-animate-1 text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold tracking-[-0.025em] text-foreground leading-[1.15]">
              {t("hero_heading_1")}{" "}
              <span className="text-brand-gradient pb-1 inline-block">
                {t("hero_heading_gradient")}
              </span>
            </h1>

            {/* Supporting text */}
            <p className="hero-animate-2 mt-4 max-w-2xl text-[15px] sm:text-[17px] font-bold leading-[1.5] text-foreground/90">
              {t("hero_subheading")}
            </p>

            {/* Short bio */}
            <p className="hero-animate-2 mt-3 max-w-2xl text-[14px] sm:text-[15px] font-medium leading-[1.75] text-foreground/80 dark:text-foreground/80">
              {t("hero_bio")}
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate-3 mt-7 relative inline-flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full sm:w-auto">
              <NeumorphicLinkButton
                href="/SUJON.pdf"
                target="_blank"
                rel="noopener noreferrer"
                tone="brand"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                {t("hero_download_cv")}
              </NeumorphicLinkButton>
              <NeumorphicLinkButton
                href="/#portfolio"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                {t("hero_view_projects")}
              </NeumorphicLinkButton>
            </div>

            {/* ── Mobile / Tablet Photo ── */}
            <div className="hero-animate-4 relative mt-10 flex lg:hidden w-full items-end justify-center overflow-hidden pt-6">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-2xl" />
              {/* Arch backdrop */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] h-[340px] sm:h-[400px] rounded-t-[140px] bg-gradient-to-b from-brand/15 via-surface/40 to-surface border-t border-x border-white/50 dark:border-white/10 nm-raised-sm opacity-85" />

              <img
                src={heroProfileImg}
                alt="Sujon — Senior WordPress Developer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 max-h-[420px] sm:max-h-[480px] w-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)]"
              />

              {/* Bottom surface fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
            </div>
          </div>

          {/* ── RIGHT — Desktop Photo ── */}
          <div className="hero-animate-4 relative hidden lg:flex h-full min-h-[560px] w-[400px] xl:w-[480px] items-end justify-center overflow-hidden">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-3xl" />
            {/* Arch backdrop */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] xl:w-[380px] h-[480px] xl:h-[540px] rounded-t-[160px] bg-gradient-to-b from-brand/15 via-surface/40 to-surface border-t border-x border-white/60 dark:border-white/10 nm-raised-sm opacity-85" />

            <img
              src={heroProfileImg}
              alt="Sujon — Senior WordPress Developer"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="relative z-10 h-full max-h-[580px] xl:max-h-[620px] w-auto object-contain object-bottom drop-shadow-[0_14px_32px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_34px_rgba(0,0,0,0.5)]"
            />

            {/* Seamless bottom gradient fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}
