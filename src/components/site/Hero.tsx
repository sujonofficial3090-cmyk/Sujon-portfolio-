import portrait from "@/assets/portrait.png";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="overflow-hidden">
        <div className="grid min-h-[480px] items-center gap-0 lg:grid-cols-[1fr_auto]">
          {/* LEFT — Text content */}
          <div className="flex flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:py-14 lg:pl-14">
            {/* Badge */}
            <div className="mb-5">
              <span className="nm-inset text-brand-deep inline-block rounded-[8px] px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase">
                WORDPRESS DEVELOPER
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-foreground">
              I Build{" "}
              <span className="text-brand-gradient">Modern &amp; High-Performance</span>
              <br />
              WordPress Websites
            </h1>

            {/* Supporting text */}
            <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-muted-foreground">
              I'm <strong className="text-brand-deep font-semibold">Sujon</strong>, a professional WordPress Developer specializing in
              responsive, fast, modern and conversion-focused WordPress websites for businesses,
              startups and personal brands.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NeumorphicLinkButton href="#contact" tone="brand" size="lg">
                GET A QUOTE
              </NeumorphicLinkButton>
              <NeumorphicLinkButton href="#portfolio" size="lg">
                VIEW PROJECTS
              </NeumorphicLinkButton>
            </div>

            {/* Quick stats row */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6">
              {[
                { num: "5+", label: "Years Exp." },
                { num: "200+", label: "Projects Done" },
                { num: "150+", label: "Happy Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-brand-gradient text-[22px] font-extrabold leading-none">{s.num}</div>
                  <div className="mt-0.5 text-[11px] font-medium text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Personal photo */}
          <div className="relative hidden lg:flex h-full min-h-[480px] w-[340px] xl:w-[400px] items-end justify-center overflow-hidden">
            {/* Gradient overlay */}
            <div className="from-brand/20 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface to-transparent" />
            <img
              src='https://i.ibb.co.com/jkG56Fxt/00-1.jpg'
              alt="Sujon — Professional WordPress Developer"
              loading="eager"
              width={900}
              height={1200}
              className="relative z-10 h-full max-h-[520px] w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}
