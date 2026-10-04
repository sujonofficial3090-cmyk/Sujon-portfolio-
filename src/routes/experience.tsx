import { useState, useEffect, useRef } from "react";
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
  Download,
} from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useTranslation } from "@/lib/i18n";
import { TransparentVideo } from "@/components/ui/TransparentVideo";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      {
        title: "Work Experience — Sujon | Senior WordPress Developer",
      },
      {
        name: "description",
        content:
          "3+ years of professional experience building responsive, high-performance, and conversion-focused WordPress websites for international clients.",
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
    period: "1 Year 8 Months",
    location: "Mohakhali Aqua Tower, Dhaka",
    type: "Full-Time",
    badge: "1 Year 8 Months",
    summary:
      "Developed responsive WordPress websites using Elementor Pro, WooCommerce, dynamic content, and custom functionality for international clients.",
    highlights: [
      "Developed responsive WordPress websites using Elementor Pro & WooCommerce.",
      "Built dynamic solutions with JetEngine, CPTs and custom functionality.",
      "Converted Figma/PSD designs into responsive WordPress websites.",
      "Customized themes, plugins and website features.",
      "Optimized websites for performance, SEO and responsiveness.",
      "Managed troubleshooting, migration, hosting, DNS, SSL and deployment.",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "JetEngine",
      "Custom Post Types",
      "Figma",
      "Performance & SEO",
      "Hosting & DNS",
      "SSL & Migration",
    ],
  },
  {
    id: "designsilc",
    role: "WordPress Developer",
    company: "DesignSilc Digital LTD.",
    period: "6 Months",
    location: "Remote",
    type: "Remote",
    badge: "6 Months",
    summary:
      "Converted design concepts into responsive WordPress websites, managed dynamic content, and handled website maintenance.",
    highlights: [
      "Converted Figma/PSD designs into responsive websites.",
      "Worked with WooCommerce, dynamic content, and custom functionalities.",
      "Handled bug fixing, performance optimization, and website maintenance.",
      "Collaborated remotely with clients and team members.",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "Dynamic Content",
      "Figma to WordPress",
      "Bug Fixing & Maintenance",
    ],
  },
  {
    id: "frontier-labs",
    role: "Senior WordPress Developer",
    company: "Frontier Labs",
    period: "1 Year",
    location: "Rampura, Banasree, Dhaka",
    type: "Full-Time",
    badge: "1 Year",
    summary:
      "Developed and customized WordPress websites using Elementor Pro, worked with WooCommerce and custom WordPress functionality, and handled bug fixing and maintenance.",
    highlights: [
      "Developed and customized WordPress websites using Elementor Pro.",
      "Converted Figma/PSD designs into responsive websites.",
      "Worked with WooCommerce and custom WordPress functionalities.",
      "Handled bug fixing, optimization, and website maintenance.",
      "Collaborated with clients and team members on website projects.",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "WooCommerce",
      "Custom Functionality",
      "Figma/PSD Conversion",
      "Performance Optimization",
    ],
  },
  {
    id: "freelance",
    role: "Business Development & Sales Executive",
    company: "Fiverr & Upwork",
    period: "",
    location: "International",
    type: "Remote / Freelance",
    summary:
      "Managed international client projects through Fiverr and Upwork, handling client communications, requirement gathering, proposals, quotations, project delivery, and post-delivery support.",
    highlights: [
      "Managed international client projects through Fiverr and Upwork.",
      "Handled client communication, requirements gathering, and project discussions.",
      "Prepared proposals, quotations, project scopes, and delivery timelines.",
      "Managed orders, milestones, revisions, and project delivery.",
      "Handled client feedback, negotiations, and issue resolution.",
      "Maintained client relationships and provided post-delivery support.",
      "Experienced in platform workflows, project management, and international client communication.",
      "Coordinated with developers, designers, and internal teams to deliver projects successfully.",
    ],
    technologies: [
      "Fiverr & Upwork",
      "Business Development",
      "Sales Execution",
      "Client Communication",
      "Requirement Gathering",
      "Proposal Preparation",
      "Milestone Delivery",
      "Post-Delivery Support",
    ],
  },
];

function ExperiencePage() {
  const { t } = useTranslation();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      // Run cascading deck animation ONLY on desktop screens (1024px+)
      // On mobile/tablet screens, cards flow naturally with zero RAF mutations to eliminate 100% of shaking & jitter
      if (window.innerWidth < 1024) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth < 1024) {
            ticking = false;
            return;
          }

          const cards = cardRefs.current;
          const total = cards.length;

          for (let i = 0; i < total - 1; i++) {
            const currentCard = cards[i];
            const nextCard = cards[i + 1];

            if (!currentCard || !nextCard) continue;

            const nextRect = nextCard.getBoundingClientRect();
            const stickyTopBase = 128;
            const stepOffset = 26;
            const nextStickyTop = stickyTopBase + (i + 1) * stepOffset;

            const buffer = 380;
            const distance = nextRect.top - nextStickyTop;

            if (distance < buffer && distance > 0) {
              const progress = (buffer - distance) / buffer;
              const scale = 1 - progress * 0.035;
              const opacity = 1 - progress * 0.12;

              currentCard.style.transform = `scale(${scale.toFixed(4)})`;
              currentCard.style.opacity = `${opacity.toFixed(4)}`;
            } else if (distance <= 0) {
              currentCard.style.transform = "scale(0.965)";
              currentCard.style.opacity = "0.88";
            } else {
              currentCard.style.transform = "scale(1)";
              currentCard.style.opacity = "1";
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        cardRefs.current.forEach((card) => {
          if (card) {
            card.style.transform = "";
            card.style.opacity = "";
          }
        });
      } else {
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-16 pt-3 sm:gap-8 sm:px-5">
      <Header />

      <main className="flex flex-col gap-8 sm:gap-10">
        {/* Simple & Realistic Hero Header */}
        <section aria-label="Experience header">
          <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
            {/* Top Navigation Row — Mobile Responsive & Anti-Squish */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <Link
                to="/"
                className="nm-raised-sm hover:nm-inset inline-flex items-center gap-1.5 sm:gap-2 rounded-[10px] px-3.5 py-2 text-[11.5px] sm:text-[12px] font-extrabold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:text-brand-deep cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{t("exp_back_home", "Back to Home")}</span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <a
                  href="/SUJON.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-raised-sm hover:nm-inset inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-widest text-brand-deep transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{t("hero_download_cv", "Download CV")}</span>
                </a>
                <span className="nm-inset text-brand-deep hidden sm:inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-widest whitespace-nowrap shrink-0">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{t("exp_career_journey", "Career Journey")}</span>
                </span>
              </div>
            </div>

            {/* Title & Right-Side 3D Video Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-8 lg:gap-10">
              {/* Left Column: Text & Badges */}
              <div className="flex flex-col items-start gap-2.5">
                <span className="nm-inset text-brand-deep inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" /> {t("exp_verified_history", "Verified Work History")}
                </span>
                <h1 className="text-brand-gradient text-[clamp(2.1rem,4.8vw,3.2rem)] font-extrabold tracking-tight leading-[1.2] block w-full mt-0.5">
                  {t("exp_page_heading", "Professional Experience")}
                </h1>
                <p className="mt-1 text-[15px] sm:text-[16.5px] font-normal leading-[1.7] text-muted-foreground">
                  {t("exp_intro", "3+ years of professional experience building responsive, high-performance, and conversion-focused WordPress websites for international clients.")}
                </p>

                {/* Quick Career Highlights Tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="nm-inset text-[11px] font-extrabold px-3 py-1.5 rounded-[8px] text-foreground/85">
                    WordPress & Elementor Pro
                  </span>
                  <span className="nm-inset text-[11px] font-extrabold px-3 py-1.5 rounded-[8px] text-foreground/85">
                    WooCommerce & Dynamic CPT
                  </span>
                  <span className="nm-inset text-[11px] font-extrabold px-3 py-1.5 rounded-[8px] text-foreground/85">
                    Speed & SEO Optimization
                  </span>
                </div>
              </div>

              {/* Right Column: 3D Transparent Floating Showcase (matched to section height, zero background) */}
              <div className="flex flex-col items-center justify-center self-center mx-auto lg:mx-0 lg:-translate-x-6 xl:-translate-x-10">
                <div className="relative flex items-center justify-center">
                  <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[350px] lg:h-[350px] flex items-center justify-center">
                    <TransparentVideo
                      src="/videos/service-video.mp4"
                      width={350}
                      height={350}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Minimalist Stats Strip */}
            <div className="nm-divider-groove mt-8 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="nm-inset rounded-[12px] p-3.5 text-center">
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">3+ Years</div>
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
                <div className="text-[24px] sm:text-[26px] font-extrabold text-brand-deep">Global</div>
                <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  {t("exp_stat_onsite", "International Clients")}
                </div>
              </div>
            </div>
          </NeumorphicCard>
        </section>

        {/* Realistic Cascading Stacking Cards Timeline (Inspired by modern stacking cards UX) */}
        <section aria-label="Career Timeline" className="relative pb-6 sm:pb-12">
          <div className="flex flex-col">
            {EXPERIENCES.map((exp, idx) => {
              const prefix =
                exp.id === "sparktech"
                  ? "exp_sparktech"
                  : exp.id === "designsilc"
                  ? "exp_designsilc"
                  : exp.id === "frontier-labs"
                  ? "exp_frontier"
                  : exp.id === "freelance"
                  ? "exp_freelance"
                  : `exp_${exp.id}`;
              const localizedRole = t(`${prefix}_role` as any, exp.role);
              const localizedPeriod = exp.period ? t(`${prefix}_period` as any, exp.period) : "";
              const localizedLocation = t(`${prefix}_location` as any, exp.location);
              const localizedType = t(`${prefix}_type` as any, exp.type);
              const localizedBadge = exp.badge ? t(`${prefix}_badge` as any, exp.badge) : undefined;
              const localizedSummary = t(`${prefix}_summary` as any, exp.summary);

              return (
                <div
                  key={exp.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="experience-stacked-card sticky"
                  style={{
                    top: `calc(var(--sticky-top-base, 128px) + ${idx * 26}px)`,
                    zIndex: 10 + idx,
                    transformOrigin: "top center",
                    marginBottom: idx < EXPERIENCES.length - 1 ? "clamp(90px, 16vh, 160px)" : "0",
                  }}
                >
                  <div className="experience-emboss-card overflow-hidden p-6 sm:p-8 lg:p-10 border-0 outline-none">
                    {/* Massive Display Step Watermark (Reference web style: 01, 02, 03, 04) */}
                    <span className="pointer-events-none absolute right-4 sm:right-8 top-2 sm:top-4 font-display font-black text-[64px] sm:text-[96px] lg:text-[112px] tracking-tighter text-brand-deep/[0.07] dark:text-brand-light/[0.07] leading-none select-none">
                      0{idx + 1}
                    </span>

                    {/* Top Bar: Step Pill, Role, Company, Period */}
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Reference "STEP" pill badge */}
                          <span className="nm-inset text-brand-deep inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] sm:text-[11px] font-black uppercase tracking-widest font-mono">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-deep animate-pulse" />
                            <span>STEP 0{idx + 1}</span>
                          </span>

                          {localizedBadge && (
                            <span className="nm-raised-sm text-foreground/90 inline-flex items-center gap-1 rounded-[6px] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                              <Sparkles className="h-3 w-3 text-brand-deep" /> {localizedBadge}
                            </span>
                          )}
                          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            {localizedType}
                          </span>
                        </div>

                        <h2 className="text-[20px] sm:text-[25px] font-extrabold text-foreground tracking-tight pt-1">
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

                      {/* Period Badge - only if localizedPeriod exists */}
                      {localizedPeriod ? (
                        <div className="shrink-0 sm:self-start relative z-10">
                          <span className="nm-raised-sm inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[12px] font-bold text-foreground tracking-tight">
                            <Calendar className="h-3.5 w-3.5 text-brand-deep" /> {localizedPeriod}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {/* Soft Debossed Groove Divider (No border color) */}
                    <div className="nm-divider-groove my-4" />

                    {/* Summary */}
                    <p className="relative z-10 mt-3 text-[14.5px] sm:text-[15.5px] font-normal leading-[1.7] text-foreground/90">
                      {localizedSummary}
                    </p>

                    {/* Clean, Realistic Bullet Points */}
                    <div className="relative z-10 mt-6">
                      <h3 className="text-[11.5px] font-extrabold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-deep" /> {t("exp_responsibilities", "Key Responsibilities & Contributions")}
                      </h3>

                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 pl-0.5">
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

                    {/* Soft Debossed Groove Divider (No border color) */}
                    <div className="nm-divider-groove mt-6 mb-4" />

                    {/* Technologies Pills */}
                    <div className="relative z-10">
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
                  </div>
                </div>
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
                {t("exp_cta_heading", "Need an Experienced WordPress Developer?")}
              </h2>
              <p className="text-[14px] sm:text-[15px] font-normal text-muted-foreground leading-[1.7]">
                {t("exp_cta_desc", "Available for WordPress development, custom functionality, Elementor Pro, WooCommerce, and AI-assisted workflows with guaranteed delivery.")}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/#contact"
                  className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[12px] font-black uppercase tracking-wider transition-all duration-200 active:nm-inset cursor-pointer"
                >
                  {t("exp_cta_button", "Get in Touch")} <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/SUJON.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nm-raised-sm nm-interactive text-foreground inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[12px] font-black uppercase tracking-wider transition-all duration-200 active:nm-inset hover:text-brand-deep cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-brand-deep" /> {t("hero_download_cv", "Download CV")}
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
