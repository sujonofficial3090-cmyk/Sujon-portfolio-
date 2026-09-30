import { NeumorphicCard } from "@/components/nm";
import { Compass, FileCode2, Hammer, ShieldAlert, SlidersHorizontal } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const STEPS = [
  {
    num: "01",
    nameKey: "how_s1_name",
    descKey: "how_s1_desc",
    fallbackName: "Understand",
    fallbackDesc: "Understand the business, user requirements, goals, and technical requirements.",
    icon: Compass,
  },
  {
    num: "02",
    nameKey: "how_s2_name",
    descKey: "how_s2_desc",
    fallbackName: "Plan",
    fallbackDesc: "Define the structure, functionality, technology, and development approach.",
    icon: FileCode2,
  },
  {
    num: "03",
    nameKey: "how_s3_name",
    descKey: "how_s3_desc",
    fallbackName: "Build",
    fallbackDesc: "Use modern development techniques, WordPress, and AI-assisted coding workflows to implement the solution.",
    icon: Hammer,
  },
  {
    num: "04",
    nameKey: "how_s4_name",
    descKey: "how_s4_desc",
    fallbackName: "Test",
    fallbackDesc: "Test responsiveness, functionality, usability, performance, and edge cases.",
    icon: ShieldAlert,
  },
  {
    num: "05",
    nameKey: "how_s5_name",
    descKey: "how_s5_desc",
    fallbackName: "Optimize",
    fallbackDesc: "Refine the experience, fix issues, optimize performance, and prepare the final product.",
    icon: SlidersHorizontal,
  },
];

export function HowIBuild() {
  const { t } = useTranslation();

  return (
    <section id="approach" aria-label="How I Build" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("how_heading", "How I Build")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14.5px] sm:text-[16px] font-medium text-muted-foreground">
            {t("how_subtitle", "A structured, quality-driven approach from initial discovery to high-performance launch.")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <NeumorphicCard
                key={s.num}
                depth="sm"
                radius="lg"
                interactive
                className={`flex flex-col justify-between p-5 text-left group transition-transform duration-300 hover:-translate-y-1 reveal-on-scroll stagger-${idx + 1}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[12px] font-black tracking-widest text-brand-deep uppercase">
                      {s.num}
                    </span>
                    <div className="nm-inset text-brand-deep flex h-9 w-9 items-center justify-center rounded-[10px]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold text-foreground tracking-tight group-hover:text-brand-deep transition-colors mb-2">
                    {t(s.nameKey as any, s.fallbackName)}
                  </h3>
                  <p className="text-[13px] font-medium leading-[1.65] text-muted-foreground">
                    {t(s.descKey as any, s.fallbackDesc)}
                  </p>
                </div>
              </NeumorphicCard>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
