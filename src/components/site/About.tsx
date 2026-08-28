import { NeumorphicCard } from "@/components/nm";

const SKILLS = [
  "WordPress Development",
  "Elementor & Elementor Pro",
  "WooCommerce",
  "Custom WordPress Websites",
  "Responsive Web Design",
  "WordPress Speed Optimization",
  "Website Redesign",
  "WordPress Maintenance",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-10 sm:py-10 reveal-on-scroll stagger-1">
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Who am I?
          </h2>

          <div className="mt-5 space-y-4 text-[15px] sm:text-[16px] font-medium leading-[1.75] text-foreground/85 dark:text-foreground/85">
            <p>
              I'm <span className="text-brand-deep font-extrabold">Sujon</span>, a passionate WordPress Developer focused on building beautiful, responsive and high-performing websites. I work with WordPress, Elementor, WooCommerce and custom website development to create professional digital experiences for businesses and clients worldwide.
            </p>
            <p>
              Over the years, I've helped numerous clients establish a stronger digital presence through robust, scalable, and conversion-focused digital experiences that accelerate business growth and create lasting online impact.
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-[14px] sm:text-[15px] font-extrabold text-foreground mb-4 uppercase tracking-wider">
              Skills Highlight
            </h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-foreground/80"
                >
                  <span className="nm-raised-sm flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] text-brand-deep font-extrabold">
                    ✓
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </NeumorphicCard>

        <NeumorphicCard
          depth="md"
          radius="lg"
          className="relative flex min-h-[460px] lg:min-h-[520px] items-end justify-center overflow-hidden px-4 pt-8 reveal-on-scroll stagger-2"
        >
          {/* Soft ambient lighting */}
          <div className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-brand-light/25 dark:bg-brand-light/15 blur-3xl" />
          {/* Arch frame */}
          <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 bottom-0 h-3/4 rounded-t-[120px] bg-gradient-to-t from-brand/20 via-surface/40 to-surface/10 border-t border-x border-white/50 dark:border-white/10 nm-raised-sm opacity-85" />
          <img
            src="https://i.ibb.co.com/KzBDF6fr/Chat-GPT-Image-Aug-27-2026-02-42-07-PM.png"
            alt="Sujon, Professional WordPress Developer"
            loading="lazy"
            width={900}
            height={1200}
            className="relative z-10 max-h-[480px] lg:max-h-[540px] w-auto object-contain object-bottom drop-shadow-[0_14px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]"
          />
          {/* Bottom subtle blend */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
        </NeumorphicCard>
      </div>
    </section>
  );
}
