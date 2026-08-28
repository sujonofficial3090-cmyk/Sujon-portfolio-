import { Check, Zap, Sparkles, ShieldCheck } from "lucide-react";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";

const TIERS = [
  {
    name: "Launchpad",
    subtitle: "For Startups & Service Providers",
    price: "$1,490",
    period: "one-time",
    popular: false,
    icon: Zap,
    description: "A high-converting 5 to 7-page custom website designed to launch your brand authority and capture leads fast.",
    features: [
      "Custom UI/UX Design (Figma + Mobile First)",
      "WordPress or React/Vite Core Build",
      "5-7 Custom Engineered Pages",
      "Basic SEO & Schema Architecture",
      "Mobile, Tablet & Speed Optimized (90+ Score)",
      "Contact Funnel & WhatsApp Integration",
      "14 Days Post-Launch Support",
    ],
    cta: "Choose Launchpad",
    badge: "Fast 2-Week Delivery",
  },
  {
    name: "Growth Accelerator",
    subtitle: "For Scaling Brands & Businesses",
    price: "$2,990",
    period: "one-time",
    popular: true,
    icon: Sparkles,
    description: "Full-scale custom website or WooCommerce platform with advanced conversion funnels, animation, and SEO dominance.",
    features: [
      "Everything in Launchpad +",
      "Full WooCommerce / E-Commerce or CMS Build",
      "Up to 15 Custom Designed Pages & Templates",
      "Advanced Conversion Triggers & Animations",
      "Comprehensive Speed Optimization (95+ Score)",
      "Google Analytics 4 & Meta Pixel Tracking",
      "Payment Gateways (Stripe, PayPal, Local)",
      "30 Days Dedicated Agency Support & SLA",
    ],
    cta: "Choose Growth",
    badge: "Most Popular",
  },
  {
    name: "Enterprise Custom",
    subtitle: "For Large Enterprises & SaaS",
    price: "$5,490+",
    period: "custom scope",
    popular: false,
    icon: ShieldCheck,
    description: "Bespoke high-performance headless architecture, complex web app development, and dedicated growth retainer.",
    features: [
      "Custom Headless / Next.js Web Application",
      "Unlimited Scalable Pages & Custom APIs",
      "Bespoke 3D / Interactive WebGL Elements",
      "Enterprise Grade Security & Cloud Infrastructure",
      "Multi-Currency & Multilingual Localization",
      "Full CRO A/B Testing Strategy",
      "Dedicated Slack Channel & Senior Project Manager",
      "90 Days VIP Maintenance & Priority SLA",
    ],
    cta: "Contact for Enterprise",
    badge: "Custom Engineering",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
            TRANSPARENT &amp; VALUE-DRIVEN
          </span>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
            Predictable Pricing for High-ROI Projects
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            No hidden fees, no cookie-cutter templates. Premium agency execution with clear timelines and guaranteed satisfaction.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative flex flex-col justify-between rounded-[18px] p-6 sm:p-8 transition-all duration-300 reveal-on-scroll stagger-${i + 1} ${
                tier.popular
                  ? "nm-raised-lg border-2 border-brand/40 -translate-y-2 shadow-[var(--shadow-nm-hover)]"
                  : "nm-raised-sm hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand text-slate-900 font-extrabold text-[11px] uppercase tracking-[0.15em] px-4 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <div className="nm-inset flex h-10 w-10 items-center justify-center rounded-[10px] text-brand-deep">
                    <tier.icon className="h-5 w-5" />
                  </div>
                  {!tier.popular && (
                    <span className="nm-inset text-muted-foreground text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-[6px]">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-[20px] font-extrabold text-foreground tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-[13px] font-medium text-muted-foreground mt-0.5">
                  {tier.subtitle}
                </p>

                <div className="mt-5 flex items-baseline gap-1.5 border-b border-border pb-5">
                  <span className="text-[34px] sm:text-[38px] font-extrabold text-foreground font-display tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-[13px] font-bold text-muted-foreground">
                    / {tier.period}
                  </span>
                </div>

                <p className="mt-4 text-[14px] leading-[1.6] font-medium text-foreground/80">
                  {tier.description}
                </p>

                <div className="mt-6 space-y-2.5">
                  <p className="text-[12px] font-extrabold uppercase tracking-wider text-brand-deep">
                    What's Included:
                  </p>
                  <ul className="space-y-2">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-[13px] sm:text-[14px] font-medium text-foreground/85">
                        <Check className="h-4 w-4 text-brand-deep shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <NeumorphicLinkButton
                  href="/#contact"
                  tone={tier.popular ? "brand" : "default"}
                  size="lg"
                  className="w-full justify-center text-center font-extrabold text-[13px] py-3.5"
                >
                  {tier.cta}
                </NeumorphicLinkButton>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
