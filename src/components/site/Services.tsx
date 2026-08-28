import { Code, Layout, ShoppingBag, Gauge, Smartphone, ShieldCheck, ArrowUpRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const SERVICES = [
  {
    icon: Code,
    title: "Custom Web & App Engineering",
    desc: "Bespoke high-performance websites and web applications built with Next.js, React, and custom WordPress architecture engineered for speed and scale.",
    features: ["Next.js & React Applications", "Custom WordPress Architecture", "Headless CMS Integrations", "Sub-second 95+ PageSpeed"],
    badge: "Core Engineering",
  },
  {
    icon: Layout,
    title: "UI/UX & Brand Identity Design",
    desc: "Psychology-driven user interface and user experience design that captivates audiences, lowers bounce rates, and maximizes checkout conversions.",
    features: ["Figma Design Systems", "Interactive Prototypes", "Visual Brand Guidelines", "Conversion-Focused UX"],
    badge: "Creative Design",
  },
  {
    icon: ShoppingBag,
    title: "Enterprise E-Commerce Scaling",
    desc: "High-volume online storefronts and custom eCommerce funnels built on Shopify Plus and WooCommerce designed to handle millions in revenue.",
    features: ["Shopify Plus & WooCommerce", "One-Click Checkout Funnels", "Custom Subscription Systems", "ERP & Inventory Sync"],
    badge: "E-Commerce",
  },
  {
    icon: Gauge,
    title: "Performance SEO & CRO Optimization",
    desc: "Technical SEO, Core Web Vitals dominance, and conversion rate optimization (CRO) that turn casual visitors into loyal paying customers.",
    features: ["Core Web Vitals Optimization", "AI Search & Schema Markup", "A/B Conversion Testing", "Technical SEO Audits"],
    badge: "Growth & SEO",
  },
  {
    icon: Smartphone,
    title: "Mobile & Progressive Web Apps",
    desc: "Seamless, native-like mobile experiences and Progressive Web Apps (PWA) that provide app-store quality speed and offline functionality.",
    features: ["Progressive Web Apps (PWA)", "Cross-Browser Testing", "Mobile-First UX Optimization", "Push Notifications"],
    badge: "Mobile Solutions",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Cloud & Dedicated SLA Maintenance",
    desc: "Proactive security monitoring, automated cloud backups, staging environment deployments, and guaranteed rapid response SLA support.",
    features: ["24/7 Uptime & Security Monitoring", "Daily Automated Backups", "Core & Plugin Health Audits", "Dedicated Slack Channel"],
    badge: "Ongoing Care",
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
        {/* Section Header */}
        <div className="mb-10 text-center reveal-on-scroll">
          <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
            WHAT WE DO BEST
          </span>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
            Full-Spectrum Digital Solutions
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            We deliver enterprise-grade engineering, bespoke design, and revenue growth strategies tailored to your exact business goals.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => (
            <div
              key={s.title}
              className={`group nm-raised-sm relative flex flex-col justify-between rounded-[18px] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 3) + 1}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="nm-raised-sm flex h-12 w-12 items-center justify-center rounded-[12px] text-brand-deep group-hover:scale-110 transition-transform">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <span className="nm-inset text-muted-foreground rounded-[6px] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider">
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-[18px] sm:text-[19px] font-extrabold text-foreground tracking-tight mb-2 group-hover:text-brand-deep transition-colors">
                  {s.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-muted-foreground font-medium mb-5">
                  {s.desc}
                </p>

                <ul className="space-y-2 border-t border-border/50 pt-4">
                  {s.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-[13px] font-medium text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-deep shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-extrabold uppercase text-brand-deep hover:underline"
                >
                  Request Proposal <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}

