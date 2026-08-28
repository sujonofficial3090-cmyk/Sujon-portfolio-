import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Star } from "lucide-react";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="overflow-hidden">
        <div className="grid min-h-[540px] items-center gap-8 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:py-16 lg:pl-12 lg:pr-10">
          {/* LEFT — Text content & Dual CTAs */}
          <div className="flex flex-col justify-center">
            {/* Live Agency Status Badge */}
            <div className="mb-5 hero-animate-1 flex items-center gap-2">
              <span className="nm-inset text-brand-deep inline-flex items-center gap-2 rounded-[8px] px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.15em] uppercase">
                <span className="h-2 w-2 rounded-full bg-brand-deep animate-ping" />
                DIGITAL PRODUCT &amp; WEB AGENCY
              </span>
              <span className="nm-raised-sm hidden sm:inline-flex items-center gap-1 rounded-[8px] px-3 py-1.5 text-[11px] font-bold text-muted-foreground">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" /> 5.0 Rated Agency
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-animate-1 text-[clamp(2.2rem,5.2vw,3.8rem)] font-extrabold tracking-[-0.03em] text-foreground leading-[1.12]">
              We Build{" "}
              <span className="text-brand-gradient pb-1 inline-block">High-Converting</span>
              <br />
              Digital Experiences &amp; Scalable Web Solutions
            </h1>

            {/* Subtitle */}
            <p className="hero-animate-2 mt-6 max-w-xl text-[15px] sm:text-[16px] font-medium leading-[1.8] text-foreground/85">
              We partner with ambitious startups, eCommerce brands, and global enterprises to design, engineer, and scale bespoke websites that drive measurable revenue and dominate search rankings.
            </p>

            {/* CTA Buttons */}
            <div className="hero-animate-3 mt-8 grid grid-cols-2 gap-3 w-full sm:w-auto sm:inline-flex sm:flex-row sm:gap-4">
              <NeumorphicLinkButton
                href="/#contact"
                tone="brand"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[12px] sm:text-[13px] px-3 py-3.5 sm:px-7 sm:py-4 whitespace-nowrap text-center"
              >
                START YOUR PROJECT <ArrowRight className="h-4 w-4 ml-1.5 hidden sm:inline" />
              </NeumorphicLinkButton>
              <NeumorphicLinkButton
                href="/#portfolio"
                size="lg"
                className="w-full sm:w-auto justify-center font-extrabold text-[12px] sm:text-[13px] px-3 py-3.5 sm:px-7 sm:py-4 whitespace-nowrap text-center"
              >
                VIEW CASE STUDIES
              </NeumorphicLinkButton>
            </div>

            {/* Quick Guarantees */}
            <div className="hero-animate-4 mt-8 flex flex-wrap items-center gap-4 text-[12px] font-bold text-muted-foreground pt-4 border-t border-border/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-deep" /> 100% Satisfaction Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-brand-deep" /> 95+ PageSpeed Index
              </span>
            </div>
          </div>

          {/* RIGHT — Interactive Agency Bento Showcase Matrix */}
          <div className="hero-animate-4 flex flex-col gap-4">
            {/* Top Row — 2 Big Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="nm-raised-sm rounded-[16px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)]">
                <div className="flex items-center justify-between">
                  <span className="nm-inset text-brand-deep flex h-9 w-9 items-center justify-center rounded-[10px]">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-wider">
                    +340% Avg
                  </span>
                </div>
                <div className="mt-3 text-[32px] sm:text-[36px] font-extrabold font-display text-foreground tracking-tight">
                  $50M+
                </div>
                <p className="text-[12px] sm:text-[13px] font-medium text-muted-foreground mt-0.5">
                  Client Revenue Generated
                </p>
              </div>

              <div className="nm-raised-sm rounded-[16px] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)]">
                <div className="flex items-center justify-between">
                  <span className="nm-inset text-brand-deep flex h-9 w-9 items-center justify-center rounded-[10px]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-extrabold text-brand-deep uppercase tracking-wider">
                    Global
                  </span>
                </div>
                <div className="mt-3 text-[32px] sm:text-[36px] font-extrabold font-display text-foreground tracking-tight">
                  500+
                </div>
                <p className="text-[12px] sm:text-[13px] font-medium text-muted-foreground mt-0.5">
                  Digital Builds Delivered
                </p>
              </div>
            </div>

            {/* Bottom Row — Live Agency Highlights Card */}
            <div className="nm-raised rounded-[18px] p-6 transition-all duration-300 hover:shadow-[var(--shadow-nm-hover)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[13px] font-extrabold uppercase tracking-wider text-brand-deep">
                  Engineering Stack
                </span>
                <span className="nm-inset text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-[6px] text-muted-foreground">
                  Enterprise Ready
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[12px] font-bold text-foreground/85">
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">WordPress VIP</div>
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">Next.js / React</div>
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">WooCommerce</div>
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">Shopify Plus</div>
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">UI/UX (Figma)</div>
                <div className="nm-inset py-2.5 px-2 rounded-[8px]">Cloud Hosting</div>
              </div>

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[12px] font-bold">
                <span className="text-muted-foreground">Average Delivery Time</span>
                <span className="text-brand-deep font-extrabold">2 – 4 Weeks</span>
              </div>
            </div>
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}

