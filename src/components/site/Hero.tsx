import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="overflow-hidden">
        <div className="grid min-h-[520px] items-center gap-0 lg:grid-cols-[1.25fr_auto]">
          {/* LEFT — Text content & CTA */}
          <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 lg:py-16 lg:pl-14">
            {/* Badge */}
            <div className="mb-5 hero-animate-1">
              <span className="nm-inset text-brand-deep inline-block rounded-[8px] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase">
                WORDPRESS DEVELOPER
              </span>
            </div>

            {/* Main heading: Funnel Display, Weight 800, Desktop Line-height 96px */}
            <h1 className="hero-animate-1 text-[clamp(2.1rem,5vw,3.8rem)] font-extrabold tracking-[-0.025em] text-foreground leading-[1.15] lg:leading-[96px]">
              I Build{" "}
              <span className="text-brand-gradient pb-1 inline-block">Modern &amp; High-Performance</span>
              <br />
              WordPress Websites
            </h1>

            {/* Body text: 16px Poppins font */}
            <p className="hero-animate-2 mt-6 max-w-2xl text-[15px] sm:text-[16px] font-medium leading-[1.8] text-foreground/85 dark:text-foreground/85">
              I'm <strong className="text-brand-deep font-extrabold">Sujon</strong>, a professional WordPress Developer specializing in
              responsive, fast, modern and conversion-focused WordPress websites for businesses,
              startups and personal brands worldwide.
            </p>

            {/* CTA Buttons — STRICTLY SIDE BY SIDE ON MOBILE (1 ROW) & INLINE ON DESKTOP */}
            <div className="hero-animate-3 mt-8 grid grid-cols-2 gap-3 w-full sm:w-auto sm:inline-flex sm:flex-row sm:gap-4">
              <NeumorphicLinkButton
                href="/SUJON.pdf"
                target="_blank"
                rel="noopener noreferrer"
                tone="brand"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                DOWNLOAD CV
              </NeumorphicLinkButton>
              <NeumorphicLinkButton
                href="/#portfolio"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                VIEW PROJECTS
              </NeumorphicLinkButton>
            </div>

            {/* Mobile/Tablet Centered Photo Integration */}
            <div className="hero-animate-4 relative mt-10 flex lg:hidden w-full items-end justify-center overflow-hidden pt-6">
              {/* Soft Ambient Radial Light */}
              <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-2xl" />
              {/* Neumorphic Arch Backdrop */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] h-[340px] sm:h-[400px] rounded-t-[140px] bg-gradient-to-b from-brand/15 via-surface/40 to-surface border-t border-x border-white/50 dark:border-white/10 nm-raised-sm opacity-85" />
              <img
                src="https://i.ibb.co.com/KzBDF6fr/Chat-GPT-Image-Aug-27-2026-02-42-07-PM.png"
                alt="Sujon — Professional WordPress Developer"
                loading="eager"
                width={700}
                height={950}
                className="relative z-10 max-h-[420px] sm:max-h-[480px] w-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_14px_28px_rgba(0,0,0,0.5)]"
              />
              {/* Bottom Surface Fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
            </div>
          </div>

          {/* RIGHT — Desktop Personal Photo with Seamless Neumorphic Arch & Lighting */}
          <div className="hero-animate-4 relative hidden lg:flex h-full min-h-[560px] w-[400px] xl:w-[480px] items-end justify-center overflow-hidden">
            {/* Soft Ambient Radial Glow behind the silhouette */}
            <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-3xl" />
            
            {/* Elegant Neumorphic Arch Backdrop */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] xl:w-[380px] h-[480px] xl:h-[540px] rounded-t-[160px] bg-gradient-to-b from-brand/15 via-surface/40 to-surface border-t border-x border-white/60 dark:border-white/10 nm-raised-sm opacity-85" />

            {/* Natural Personal Photo */}
            <img
              src="https://i.ibb.co.com/KzBDF6fr/Chat-GPT-Image-Aug-27-2026-02-42-07-PM.png"
              alt="Sujon — Professional WordPress Developer"
              loading="eager"
              width={900}
              height={1200}
              className="relative z-10 h-full max-h-[580px] xl:max-h-[620px] w-auto object-contain object-bottom drop-shadow-[0_14px_32px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_34px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]"
            />

            {/* Seamless Bottom Gradient Fade into Card Surface */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}
