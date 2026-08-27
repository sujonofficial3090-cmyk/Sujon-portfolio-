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
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <NeumorphicCard depth="md" radius="lg" className="px-6 py-8 sm:px-10 sm:py-10">
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
          className="relative flex items-end justify-center overflow-hidden px-4 pt-8"
        >
          <div className="from-brand/25 pointer-events-none absolute inset-x-6 bottom-0 h-2/3 rounded-t-[80px] bg-gradient-to-t to-transparent" />
          <img
            src='https://i.ibb.co.com/KzBDF6fr/Chat-GPT-Image-Aug-27-2026-02-42-07-PM.png'
            alt="Sujon, Professional WordPress Developer"
            loading="lazy"
            width={900}
            height={1200}
            className="relative z-10 max-h-[440px] w-auto object-contain"
          />
        </NeumorphicCard>
      </div>
    </section>
  );
}
