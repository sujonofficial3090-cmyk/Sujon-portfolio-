import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Strategy",
    description:
      "We analyze your market, dissect competitors, audit technical roadblocks, and engineer a high-impact digital roadmap tailored for measurable conversion growth.",
    badge: "Week 1",
  },
  {
    number: "02",
    icon: PenTool,
    title: "UI/UX & Prototyping",
    description:
      "Our design team creates bespoke, conversion-centered interactive prototypes in Figma with sleek design systems, user journeys, and micro-interactions.",
    badge: "Week 2",
  },
  {
    number: "03",
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "We engineer clean, modular, ultra-fast web architectures (WordPress, Next.js, React) optimized for 95+ Google PageSpeed and rock-solid security.",
    badge: "Week 3-4",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Growth Scaling",
    description:
      "Rigorous cross-browser QA testing, analytics tracking setup, SEO indexing, frictionless go-live deployment, and 24/7 post-launch scaling support.",
    badge: "Go-Live",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-6 sm:p-10">
        <div className="text-center mb-10 reveal-on-scroll">
          <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
            HOW WE DELIVER EXCELLENCE
          </span>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
            Our 4-Step Proven Agency Process
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            From strategic discovery to high-impact launch, our battle-tested agency methodology ensures projects are delivered on time, within budget, and built for explosive ROI.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`group nm-raised-sm relative flex flex-col justify-between rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${i + 1}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-deep font-display text-[26px] font-extrabold tracking-tighter">
                    {step.number}
                  </span>
                  <span className="nm-inset text-muted-foreground rounded-[6px] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                    {step.badge}
                  </span>
                </div>

                <div className="nm-raised-sm mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[12px] text-brand-deep group-hover:scale-110 transition-transform">
                  <step.icon className="h-6 w-6" />
                </div>

                <h3 className="text-[17px] font-extrabold text-foreground tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.65] font-medium text-muted-foreground">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[12px] font-extrabold uppercase text-brand-deep">
                <span>Phase {step.number}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
