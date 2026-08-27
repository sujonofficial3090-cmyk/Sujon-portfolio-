import svc1 from "@/assets/svc-1.png";
import svc2 from "@/assets/svc-2.png";
import svc3 from "@/assets/svc-3.png";
import svc4 from "@/assets/svc-4.png";
import svc5 from "@/assets/svc-5.png";
import svc6 from "@/assets/svc-6.png";
import svc7 from "@/assets/svc-7.png";
import svc8 from "@/assets/svc-8.png";
import { NeumorphicCard } from "@/components/nm";

const SERVICES = [
  {
    title: "Bespoke Web Design",
    img: svc1,
  },
  {
    title: "Web Development",
    img: svc2,
  },
  {
    title: "eCommerce Development",
    img: svc3,
  },
  {
    title: "App Development",
    img: svc4,
  },
  {
    title: "Speed Optimization",
    img: svc5,
  },
  {
    title: "SEO/AEO/GEO",
    img: svc6,
  },
  {
    title: "Complete Marketing",
    img: svc7,
  },
  {
    title: "Company Branding",
    img: svc8,
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28">
      <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Explore Our Services
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-[15px] sm:text-[16px] font-medium text-muted-foreground leading-[1.65]">
            Professional WordPress solutions designed to help businesses build a stronger online presence.
          </p>
        </div>

        {/* 4x2 Responsive Grid matching the exact reference screenshot */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <NeumorphicCard
              key={s.title}
              depth="sm"
              radius="lg"
              interactive
              className="flex min-h-[220px] flex-col items-center justify-between px-5 py-7 text-center group transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Large 3D Illustration sitting cleanly directly on the card surface matching screenshot */}
              <div className="flex flex-1 items-center justify-center w-full py-2">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={180}
                  height={180}
                  className="h-[115px] sm:h-[130px] w-auto max-w-[88%] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Service Title matching screenshot typography & positioning */}
              <h3 className="mt-4 text-[15px] sm:text-[16px] font-extrabold leading-snug tracking-tight text-foreground">
                {s.title}
              </h3>
            </NeumorphicCard>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
