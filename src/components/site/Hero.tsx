import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="overflow-hidden">
        <div className="grid min-h-[520px] items-center gap-0 lg:grid-cols-[1.25fr_auto]">
          {/* LEFT — Text content & CTA */}
          <div className="flex flex-col justify-center px-5 py-10 sm:px-10 sm:py-14 lg:py-16 lg:pl-14">
            {/* Badge */}
            <div className="mb-5">
              <span className="nm-inset text-brand-deep inline-block rounded-[8px] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.2em] uppercase">
                WORDPRESS DEVELOPER
              </span>
            </div>

            {/* Main heading: Funnel Display, Weight 800, Desktop Line-height 96px */}
            <h1 className="text-[clamp(2.1rem,5vw,3.8rem)] font-extrabold tracking-[-0.025em] text-foreground leading-[1.15] lg:leading-[96px]">
              I Build{" "}
              <span className="text-brand-gradient pb-1">Modern &amp; High-Performance</span>
              <br />
              WordPress Websites
            </h1>

            {/* Body text: 16px Poppins font */}
            <p className="mt-6 max-w-2xl text-[15px] sm:text-[16px] font-medium leading-[1.8] text-foreground/85 dark:text-foreground/85">
              I'm <strong className="text-brand-deep font-extrabold">Sujon</strong>, a professional WordPress Developer specializing in
              responsive, fast, modern and conversion-focused WordPress websites for businesses,
              startups and personal brands worldwide.
            </p>

            {/* CTA Buttons — STRICTLY SIDE BY SIDE ON MOBILE (1 ROW) & INLINE ON DESKTOP */}
            <div className="mt-8 grid grid-cols-2 gap-3 w-full sm:w-auto sm:inline-flex sm:flex-row sm:gap-4">
              <NeumorphicLinkButton
                href="/#contact"
                tone="brand"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                GET A QUOTE
              </NeumorphicLinkButton>
              <NeumorphicLinkButton
                href="/#portfolio"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[11.5px] sm:text-[13px] px-2 py-3.5 sm:px-6 sm:py-3.5 whitespace-nowrap text-center"
              >
                VIEW PROJECTS
              </NeumorphicLinkButton>
            </div>
          </div>

          {/* RIGHT — Personal photo */}
          <div className="relative hidden lg:flex h-full min-h-[520px] w-[360px] xl:w-[440px] items-end justify-center overflow-hidden">
            {/* Gradient overlay */}
            <div className="from-brand/20 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
            <img
              src='https://i.ibb.co.com/KzBDF6fr/Chat-GPT-Image-Aug-27-2026-02-42-07-PM.png'
              alt="Sujon — Professional WordPress Developer"
              loading="eager"
              width={900}
              height={1200}
              className="relative z-10 h-full max-h-[550px] w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}
