import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      {
        title: "Work Experience — Sujon | Full-Stack Web Developer & WordPress Expert",
      },
      {
        name: "description",
        content:
          "5+ years of verified professional experience building enterprise WordPress websites, dynamic architectures, WooCommerce stores, and AI-assisted web workflows.",
      },
    ],
  }),
  component: ExperiencePage,
});

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  badge?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "sparktech",
    role: "Executive WordPress Developer",
    company: "SparkTech Agency",
    period: "Jan 2025 – Oct 2026",
    location: "On-Site (Physical)",
    type: "Full-Time (On-Site)",
    badge: "Latest Role",
    summary:
      "Worked on-site on international client projects, developing and maintaining professional WordPress websites, custom dynamic web solutions, and modern AI-accelerated vibe coding workflows.",
    highlights: [
      "Developed responsive business websites and high-converting landing pages using WordPress and Elementor Pro.",
      "Engineered advanced dynamic websites using JetEngine, Custom Post Types (CPT), relational meta fields, and dynamic listing grids.",
      "Built and customized WooCommerce stores with custom product flows, payment gateways, and booking workflows.",
      "Converted complex Figma and PSD design systems into pixel-perfect, responsive WordPress websites.",
      "Customized WordPress themes, plugins, templates, and core website functionality to match client specifications.",
      "Configured automated forms, booking systems, email workflows, SMTP configurations, and third-party API integrations.",
      "Handled domain, hosting, SSL certificates, DNS configurations, database migrations, and proactive maintenance.",
      "Applied AI-assisted coding and vibe coding workflows to dramatically accelerate prototyping, debugging, and feature delivery.",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "JetEngine",
      "JetFormBuilder",
      "Custom Post Types",
      "JavaScript",
      "AI-Assisted Coding",
      "Vibe Coding",
      "Figma",
      "cPanel / DNS",
      "SMTP",
    ],
  },
  {
    id: "designsilc",
    role: "WordPress Developer",
    company: "Designsilc",
    period: "2024 – 2024",
    location: "Agency Client Projects",
    type: "Contract",
    badge: "Agency Role",
    summary:
      "Specialized in responsive WordPress website customization, user-friendly frontend layouts, and conversion-focused business web experiences.",
    highlights: [
      "Developed and customized WordPress websites based on diverse project requirements.",
      "Built responsive pages and targeted landing pages using Elementor with seamless cross-browser consistency.",
      "Converted design concepts and wireframes into clean, functional WordPress websites.",
      "Customized theme layouts, styling components, and navigation structures.",
      "Diagnosed and resolved responsive layout bottlenecks across desktop, mobile, and tablet viewports.",
      "Conducted site maintenance, security updates, and performance tuning for live client websites.",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Figma",
    ],
  },
  {
    id: "frontier-labs",
    role: "Senior WordPress Developer",
    company: "Frontier Labs",
    period: "2021 – 2023",
    location: "Client Solutions",
    type: "Senior Role",
    badge: "Senior Technical Role",
    summary:
      "Spearheaded client website development, custom layout architecture, WooCommerce implementations, and search-engine-friendly performance optimization.",
    highlights: [
      "Delivered professional WordPress websites for corporate and business clients using Elementor Pro.",
      "Transformed Figma and PSD assets into high-performance, mobile-first WordPress websites.",
      "Developed and tailored custom WooCommerce functionality, product catalogs, and checkout experiences.",
      "Implemented dynamic content architectures and custom WordPress features tailored to client business models.",
      "Optimized websites for speed, Core Web Vitals, and search-engine-friendly technical SEO structure.",
      "Managed website migrations, deployment pipelines, and provided post-launch technical support.",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "HTML5 / CSS3",
      "JavaScript",
      "Figma / PSD",
      "Dynamic Content",
      "Theme Customization",
      "Plugin Customization",
    ],
  },
];

function ExperiencePage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-16 pt-3 sm:gap-8 sm:px-5">
      <Header />

      <main className="flex flex-col gap-8 sm:gap-10">
        {/* Simple & Realistic Hero Header */}
        <section aria-label="Experience header">
          <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
            {/* Top Navigation Row */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                to="/"
                className="nm-raised-sm hover:nm-inset inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-[12px] font-extrabold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-brand-deep cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> {t("exp_back_home", "Back to Home")}
              </Link>

              <span className="nm-inset text-brand-deep inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest">
                <Briefcase className="h-3.5 w-3.5" /> {t("exp_career_journey", "Career Journey")}
              </span>
            </div>

            {/* Title & Realistic Intro */}
            <div className="max-w-3xl flex flex-col items-start gap-2.5">
              <span className="nm-inset text-brand-deep inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3" /> {t("exp_verified_history", "Verified Work History")}
              </span>
              <h1 className="text-brand-gradient text-[clamp(2.1rem,4.8vw,3.2rem)] font-extrabold tracking-tight leading-[1.2] block w-full mt-0.5">
                {t("exp_page_heading", "Professional Experience")}
              </h1>
              <p className="mt-1 text-[15px] sm:text-[16.5px] font-normal leading-[1.7] text-muted-foreground">
                {t("exp_intro", "Over 5+ years of delivering high-performing WordPress solutions, custom dynamic web architectures, eCommerce platforms, and AI-accelerated workflows for agencies and international clients.")}
              </p>
            </div>

            {/* Clean Minimalist Stats Strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-border/50">
              <div className="nm-inset rounded-[12px] p-3.5 text-center">
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">5+ Years</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {t("exp_stat_dev", "Professional Dev")}
                </div>
              </div>
              <div className="nm-inset rounded-[12px] p-3.5 text-center">
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">50+</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {t("exp_stat_sites", "Client Websites")}
                </div>
              </div>
              <div className="nm-inset rounded-[12px] p-3.5 text-center">
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">100%</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {t("exp_stat_rating", "Client Rating")}
                </div>
              </div>
              <div className="nm-inset rounded-[12px] p-3.5 text-center">
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">On-Site</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {t("exp_stat_onsite", "Physical & Global")}
                </div>
              </div>
            </div>
          </NeumorphicCard>
        </section>

        {/* Realistic Vertical Timeline of Work History */}
        <section aria-label="Career Timeline" className="relative">
          <div className="flex flex-col gap-6 sm:gap-8">
            {EXPERIENCES.map((exp) => {
              const prefix = exp.id === "sparktech" ? "exp_sparktech" : exp.id === "designsilc" ? "exp_designsilc" : "exp_frontier";
              const localizedRole = t(`${prefix}_role` as any, exp.role);
              const localizedPeriod = t(`${prefix}_period` as any, exp.period);
              const localizedLocation = t(`${prefix}_location` as any, exp.location);
              const localizedType = t(`${prefix}_type` as any, exp.type);
              const localizedBadge = exp.badge ? t(`${prefix}_badge` as any, exp.badge) : undefined;
              const localizedSummary = t(`${prefix}_summary` as any, exp.summary);

              return (
                <NeumorphicCard
                  key={exp.id}
                  depth="md"
                  radius="lg"
                  className="p-6 sm:p-9 transition-all duration-300 hover:shadow-[var(--shadow-nm-hover)]"
                >
                  {/* Top Bar: Role, Company, Period */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-border/60">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {localizedBadge && (
                          <span className="nm-inset text-brand-deep inline-flex items-center gap-1 rounded-[6px] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3" /> {localizedBadge}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          {localizedType}
                        </span>
                      </div>

                      <h2 className="text-[20px] sm:text-[24px] font-extrabold text-foreground tracking-tight pt-0.5">
                        {localizedRole}
                      </h2>

                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-[14px] sm:text-[15px] font-bold text-brand-deep">
                        <span
                          translate="no"
                          className="notranslate inline-flex items-center gap-1.5"
                        >
                          <Building2 className="h-4 w-4 shrink-0" /> {exp.company}
                        </span>
                        <span className="text-muted-foreground/40">•</span>
                        <span className="inline-flex items-center gap-1 text-muted-foreground font-semibold text-[13px] sm:text-[14px]">
                          <MapPin className="h-3.5 w-3.5 shrink-0" /> {localizedLocation}
                        </span>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div className="shrink-0 sm:self-start">
                      <span className="nm-raised-sm inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[12px] font-bold text-foreground tracking-tight">
                        <Calendar className="h-3.5 w-3.5 text-brand-deep" /> {localizedPeriod}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-[14.5px] sm:text-[15.5px] font-normal leading-[1.7] text-foreground/90">
                    {localizedSummary}
                  </p>

                  {/* Clean, Realistic Bullet Points */}
                  <div className="mt-6">
                    <h3 className="text-[11.5px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-deep" /> {t("exp_responsibilities", "Key Responsibilities & Contributions")}
                    </h3>

                    <ul className="space-y-2.5 pl-0.5">
                      {exp.highlights.map((point, pIdx) => {
                        const pointKey = `${prefix}_h${pIdx + 1}`;
                        const localizedPoint = t(pointKey as any, point);
                        return (
                          <li key={pIdx} className="flex items-start gap-2.5 text-[13.5px] sm:text-[14.5px] leading-[1.65] text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-deep shrink-0 ring-4 ring-brand-deep/15" />
                            <span>{localizedPoint}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Technologies Pills */}
                  <div className="mt-6 pt-5 border-t border-border/50">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mr-1">
                        {t("exp_tech_stack", "Tech Stack:")}
                      </span>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          translate="no"
                          className="nm-raised-sm inline-block rounded-[6px] px-2.5 py-1 text-[11px] sm:text-[11.5px] font-bold text-foreground/80 transition-colors hover:text-brand-deep notranslate"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </NeumorphicCard>
              );
            })}
          </div>
        </section>

        {/* Clean Realistic Bottom CTA */}
        <section aria-label="Direct contact CTA">
          <NeumorphicCard depth="md" radius="lg" className="p-7 sm:p-10 text-center">
            <div className="max-w-xl mx-auto space-y-3.5">
              <span className="nm-inset text-brand-deep inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-widest">
                <ShieldCheck className="h-3.5 w-3.5" /> {t("exp_cta_tag", "Direct Collaboration")}
              </span>
              <h2 className="text-brand-gradient text-[clamp(1.6rem,3.5vw,2.3rem)] font-extrabold tracking-tight">
                {t("exp_cta_heading", "Need an Experienced Senior Developer?")}
              </h2>
              <p className="text-[14px] sm:text-[15px] font-normal text-muted-foreground leading-[1.7]">
                {t("exp_cta_desc", "Available for high-stakes WordPress development, custom web solutions, and AI-accelerated projects with guaranteed delivery.")}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/#contact"
                  className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[12px] font-black uppercase tracking-wider transition-all duration-200 active:nm-inset cursor-pointer"
                >
                  {t("exp_cta_button", "Get in Touch")} <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://wa.me/8801936711699"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-inset text-foreground inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[12px] font-bold uppercase tracking-wider transition-all duration-200 hover:text-brand-deep cursor-pointer"
                >
                  <Globe2 className="h-3.5 w-3.5 text-[#25D366]" /> {t("exp_cta_whatsapp", "Chat on WhatsApp")}
                </a>
              </div>
            </div>
          </NeumorphicCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
