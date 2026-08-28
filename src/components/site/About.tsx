import { CheckCircle2, Award, Users, Target } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";

const PILLARS = [
  {
    icon: Target,
    title: "Conversion & Revenue Focused",
    desc: "Every design decision, pixel, and line of code is engineered with one metric in mind: maximizing your business revenue.",
  },
  {
    icon: Award,
    title: "Zero Cookie-Cutter Templates",
    desc: "We build bespoke, tailor-made digital architectures from the ground up to give your brand a distinct competitive advantage.",
  },
  {
    icon: Users,
    title: "Dedicated Senior Team",
    desc: "Direct access to senior full-stack developers and UI/UX strategists without bureaucratic agency bloat.",
  },
  {
    icon: CheckCircle2,
    title: "Guaranteed Performance SLA",
    desc: "Sub-second loading speeds, 99.9% uptime reliability, and continuous proactive security monitoring.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* LEFT — Agency Story */}
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-10 sm:py-10 reveal-on-scroll stagger-1 flex flex-col justify-between">
          <div>
            <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
              ABOUT OUR AGENCY
            </span>
            <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
              Architecting the Future of High-Growth Digital Brands
            </h2>

            <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] font-medium leading-[1.75] text-foreground/85">
              <p>
                At <span className="text-brand-deep font-extrabold">Apex Digital</span>, we believe that an extraordinary website is not just a digital brochure — it is your most powerful sales asset, brand amplifier, and revenue engine.
              </p>
              <p>
                We combine deep technical mastery (WordPress, React, Next.js, Headless CMS) with psychology-driven UI/UX design to build bespoke platforms that load in milliseconds, convert traffic into paying clients, and scale effortlessly.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="nm-inset p-3 rounded-[12px]">
              <div className="text-[22px] font-extrabold text-brand-deep font-display">5+ Yrs</div>
              <div className="text-[11px] font-bold text-muted-foreground">Industry Exp</div>
            </div>
            <div className="nm-inset p-3 rounded-[12px]">
              <div className="text-[22px] font-extrabold text-brand-deep font-display">500+</div>
              <div className="text-[11px] font-bold text-muted-foreground">Projects Done</div>
            </div>
            <div className="nm-inset p-3 rounded-[12px]">
              <div className="text-[22px] font-extrabold text-brand-deep font-display">99.4%</div>
              <div className="text-[11px] font-bold text-muted-foreground">Client Score</div>
            </div>
            <div className="nm-inset p-3 rounded-[12px]">
              <div className="text-[22px] font-extrabold text-brand-deep font-display">24/7</div>
              <div className="text-[11px] font-bold text-muted-foreground">Support SLA</div>
            </div>
          </div>
        </NeumorphicCard>

        {/* RIGHT — 4 Agency Core Pillars */}
        <NeumorphicCard
          depth="md"
          radius="lg"
          className="p-6 sm:p-8 reveal-on-scroll stagger-2 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[17px] font-extrabold text-foreground mb-5 uppercase tracking-wider">
              Our Core Agency Pillars
            </h3>

            <div className="space-y-4">
              {PILLARS.map((p) => (
                <div key={p.title} className="nm-raised-sm rounded-[14px] p-4 transition-all duration-300 hover:shadow-[var(--shadow-nm-hover)]">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="nm-inset text-brand-deep flex h-7 w-7 items-center justify-center rounded-[8px]">
                      <p.icon className="h-4 w-4" />
                    </span>
                    <h4 className="text-[15px] font-extrabold text-foreground">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-[13px] leading-[1.6] font-medium text-muted-foreground pl-9">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 text-center">
            <span className="text-[12px] font-bold text-muted-foreground">
              Ready to transform your digital presence? <a href="/#contact" className="text-brand-deep font-extrabold hover:underline">Let's talk →</a>
            </span>
          </div>
        </NeumorphicCard>
      </div>
    </section>
  );
}

