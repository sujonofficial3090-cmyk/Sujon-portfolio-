import { NeumorphicCard } from "@/components/nm";

const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "200+", label: "Completed Projects" },
  { value: "150+", label: "Happy Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

export function Stats() {
  return (
    <section aria-label="Company statistics" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-7">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="nm-inset flex min-h-[140px] sm:min-h-[160px] flex-col items-center justify-center rounded-[18px] sm:rounded-[20px] p-5 sm:p-7 text-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="text-brand-gradient text-[clamp(2.2rem,4.8vw,3.2rem)] font-extrabold tracking-tight leading-none pb-1">
                {s.value}
              </div>
              <p className="mt-3 text-[14px] sm:text-[15px] font-bold tracking-tight text-foreground/90 leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
