import { NeumorphicCard } from "@/components/nm";
import { Sparkles, Brain, Cpu, ShieldCheck, Rocket, Zap, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function AiWorkflow() {
  const { t } = useTranslation();

  const workflowPillars = [
    {
      icon: Brain,
      tag: t("wf_phase_1_tag", "Phase 01 • Strategy"),
      title: t("wf_phase_1_title", "Vision & Architecture"),
      desc: t("wf_phase_1_desc", "Every project starts with human engineering. I analyze requirements, design database models, map user journeys, and establish scalable foundations."),
      benefit: t("wf_phase_1_benefit", "Flawless technical roadmap"),
    },
    {
      icon: Zap,
      tag: t("wf_phase_2_tag", "Phase 02 • Acceleration"),
      title: t("wf_phase_2_title", "Vibe Coding & Rapid Prototyping"),
      desc: t("wf_phase_2_desc", "Harnessing advanced AI workflows to rapidly translate ideas into pixel-perfect, responsive components, reducing prototyping time drastically."),
      benefit: t("wf_phase_2_benefit", "3x faster feature velocity"),
    },
    {
      icon: Cpu,
      tag: t("wf_phase_3_tag", "Phase 03 • Precision"),
      title: t("wf_phase_3_title", "Refinement & Code Control"),
      desc: t("wf_phase_3_desc", "AI never works unsupervised. I review every line, audit architecture, eliminate bottlenecks, and ensure strict security and maintainability."),
      benefit: t("wf_phase_3_benefit", "Zero blind AI generation"),
    },
    {
      icon: Rocket,
      tag: t("wf_phase_4_tag", "Phase 04 • Perfection"),
      title: t("wf_phase_4_title", "Performance & Launch"),
      desc: t("wf_phase_4_desc", "Rigorous cross-device testing, 90+ Core Web Vitals optimization, accessibility audits, and smooth deployment to live production environments."),
      benefit: t("wf_phase_4_benefit", "Production-ready scale"),
    },
  ];

  const highlightBadges = [
    t("wf_badge_1", "⚡ Rapid Concept to Execution"),
    t("wf_badge_2", "🛡️ 100% Human-Supervised Architecture"),
    t("wf_badge_3", "💎 Clean, Maintainable Codebase"),
    t("wf_badge_4", "🚀 Cross-Device & Speed Optimized"),
  ];

  return (
    <section id="workflow" aria-label="AI-Powered Development Workflow" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 reveal-on-scroll">
          <div className="mb-3.5 inline-flex items-center gap-2">
            <span className="nm-inset text-brand-deep rounded-[8px] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> {t("workflow_badge", "Modern Engineering Workflow")}
            </span>
          </div>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("workflow_heading", "AI-Powered Development & Vibe Coding")}
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16.5px] font-medium leading-[1.75] text-foreground/85">
            {t("workflow_subtitle", "I don’t blindly generate code — I engineer solutions. By pairing Senior WordPress expertise with intelligent AI coding workflows, I turn ideas into production-ready web experiences faster without compromising quality.")}
          </p>
        </div>

        {/* 4 Gorgeous, Simple & Balanced Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {workflowPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <NeumorphicCard
                key={p.tag}
                depth="sm"
                radius="lg"
                interactive
                className={`flex flex-col justify-between p-6 group transition-all duration-300 hover:-translate-y-1.5 reveal-on-scroll stagger-${idx + 1}`}
              >
                <div>
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="nm-inset text-brand-deep flex h-11 w-11 items-center justify-center rounded-[12px] transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground/80 nm-inset px-2.5 py-1 rounded-[6px]">
                      {p.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[17px] font-extrabold text-foreground tracking-tight group-hover:text-brand-deep transition-colors mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] font-medium leading-[1.65] text-muted-foreground">
                    {p.desc}
                  </p>
                </div>

                {/* Bottom Benefit Tag */}
                <div className="mt-5 pt-3.5 border-t border-border/40 flex items-center gap-1.5 text-[11.5px] font-extrabold text-brand-deep">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{p.benefit}</span>
                </div>
              </NeumorphicCard>
            );
          })}
        </div>

        {/* Sleek Bottom Highlights Pill Ribbon */}
        <div className="nm-inset rounded-[14px] p-3 sm:p-4 reveal-on-scroll">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {highlightBadges.map((badge) => (
              <span
                key={badge}
                className="nm-raised-sm rounded-full px-4 py-1.5 text-[11px] sm:text-[12px] font-bold text-foreground/90 whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </NeumorphicCard>
    </section>
  );
}
