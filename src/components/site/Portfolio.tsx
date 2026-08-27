import { Link } from "@tanstack/react-router";
import { NeumorphicCard } from "@/components/nm";
import { PROJECTS } from "@/data/projects";

export function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-28">
      <NeumorphicCard
        depth="md"
        radius="lg"
        className="from-brand/25 via-brand/10 bg-gradient-to-b to-transparent p-5 sm:p-7"
      >
        <h2 className="text-brand-gradient mb-6 text-center text-[clamp(1.4rem,4vw,2rem)] font-extrabold tracking-tight">
          Recent Projects
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((item) => (
            <figure
              key={item.id}
              className="group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-2.5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="max-h-[220px] overflow-hidden rounded-[12px] bg-background">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-2 pt-4">
                  <span className="nm-inset text-brand-deep rounded-[6px] px-2.5 py-0.5 text-[8.5px] font-bold tracking-[0.1em] uppercase">
                    {item.category}
                  </span>
                  <h3 className="mt-2.5 text-[13.5px] font-extrabold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.6] text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 px-2 pb-1.5">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: item.id }}
                  className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-1.5 rounded-[10px] w-full py-2.5 text-[10.5px] font-bold tracking-[0.08em] uppercase transition-all duration-300"
                >
                  View Project
                </Link>
              </div>
            </figure>
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}
