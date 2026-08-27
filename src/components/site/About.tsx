import portrait from "@/assets/portrait.png";
import { NeumorphicCard } from "@/components/nm";

const SKILLS = [
  "WordPress Development",
  "Elementor & Elementor Pro",
  "WooCommerce",
  "Custom WordPress Website",
  "Responsive Design",
  "WordPress Speed Optimization",
  "Website Redesign",
  "WordPress Maintenance",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <NeumorphicCard depth="md" radius="lg" className="px-5 py-8 sm:px-9 sm:py-10">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight">
            Who am I?
          </h2>

          <div className="mt-5 space-y-4 text-[12.5px] leading-[1.85] text-muted-foreground">
            <p>
              I'm <span className="text-brand-deep font-semibold">Sujon</span>, a passionate WordPress Developer focused on building beautiful, responsive and high-performing websites. I work with WordPress, Elementor, WooCommerce and custom website development to create professional digital experiences for businesses and clients.
            </p>
            <p>
              Over the years, I've helped numerous clients establish a stronger digital presence through robust, scalable, and conversion-focused digital experiences that accelerate business growth and create lasting online impact.
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-[13px] font-bold text-foreground mb-3.5 uppercase tracking-wider">
              Skills Highlight
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
                  <span className="nm-raised-sm flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] text-brand-deep font-extrabold">
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
            className="relative z-10 max-h-[430px] w-auto object-contain"
          />
        </NeumorphicCard>
      </div>
    </section>
  );
}
