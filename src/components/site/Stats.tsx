import { NeumorphicCard } from "@/components/nm";

const STATS = [
  { value: "5+", line1: "Years", line2: "Experience" },
  { value: "200+", line1: "Completed", line2: "Projects" },
  { value: "150+", line1: "Happy", line2: "Clients" },
  { value: "99%", line1: "Client", line2: "Satisfaction" },
];

export function Stats() {
  return (
    <section aria-label="Company statistics">
      <NeumorphicCard depth="md" radius="lg" className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {STATS.map((s) => (
            <NeumorphicCard
              key={s.value}
              depth="sm"
              radius="md"
              interactive
              className="px-4 py-6 text-center sm:py-8"
            >
              <div className="text-brand-gradient text-[clamp(1.6rem,4vw,2.15rem)] font-extrabold tracking-tight">
                {s.value}
              </div>
              <p className="mt-1 text-[12px] leading-[1.35] font-medium text-foreground/75">
                {s.line1}
                <br />
                {s.line2}
              </p>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
