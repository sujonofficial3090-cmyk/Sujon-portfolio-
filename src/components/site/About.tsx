import { NeumorphicCard } from "@/components/nm";
import { ParticleLetterS } from "@/components/site/ParticleLetterS";
import { useTranslation } from "@/lib/i18n";

export function About() {
  const { t } = useTranslation();

  const skillPillars = [
    {
      title: t("svc_1_title", "WordPress Website Development"),
      desc: t("svc_1_desc", "Professional and responsive WordPress websites built around real business requirements."),
    },
    {
      title: t("svc_2_title", "Elementor Pro & WooCommerce"),
      desc: t("svc_2_desc", "Responsive layouts, landing pages, and full eCommerce functionality with custom styling."),
    },
    {
      title: t("svc_3_title", "Dynamic WordPress & CPT"),
      desc: t("svc_3_desc", "Dynamic websites using Custom Post Types, ACF, JetEngine, JetFormBuilder, and dynamic content."),
    },
    {
      title: t("svc_4_title", "AI-Assisted Development"),
      desc: t("svc_4_desc", "Using modern AI tools to accelerate coding, debugging, research, and development workflows."),
    },
  ];

  return (
    <section id="about" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-10 sm:py-10 reveal-on-scroll stagger-1">
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("about_heading")}
          </h2>

          <div className="mt-5 space-y-4 text-[14.5px] sm:text-[15.5px] font-medium leading-[1.75] text-foreground/85 dark:text-foreground/85">
            <p>{t("about_p1")}</p>
            <p>{t("about_p2")}</p>
            <p>{t("about_p3")}</p>
            <p>{t("about_p4")}</p>
            <p>{t("about_p5")}</p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-[14px] sm:text-[15px] font-extrabold text-foreground mb-4 uppercase tracking-wider">
              {t("about_skills_title")}
            </h3>
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {skillPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="nm-inset rounded-[12px] p-3.5 flex flex-col justify-start"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="nm-raised-sm flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-brand-deep font-extrabold">
                      ✓
                    </span>
                    <span className="text-[14px] font-extrabold text-foreground tracking-tight">
                      {pillar.title}
                    </span>
                  </div>
                  <p className="text-[12.5px] font-medium leading-[1.6] text-muted-foreground pl-7">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard
          depth="md"
          radius="lg"
          className="relative flex min-h-[460px] lg:min-h-[520px] items-center justify-center overflow-hidden p-4 reveal-on-scroll stagger-2"
        >
          {/* Soft ambient lighting */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-3xl" />
          <ParticleLetterS />
        </NeumorphicCard>
      </div>
    </section>
  );
}
