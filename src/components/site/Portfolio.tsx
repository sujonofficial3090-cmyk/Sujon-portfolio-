import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { PROJECTS } from "@/data/projects";

export function Portfolio() {
  // Track active mobile preview scroll on tap
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);

  const toggleMobileScroll = (id: string) => {
    setActiveMobileId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="portfolio" className="scroll-mt-28">
      <NeumorphicCard
        depth="md"
        radius="lg"
        className="from-brand/25 via-brand/10 bg-gradient-to-b to-transparent p-5 sm:p-8"
      >
        <div className="mb-8 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            Recent Projects
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            A curated showcase of recent high-converting WordPress client websites. Hover over cards to preview full pages.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((item, idx) => {
            const isMobileActive = activeMobileId === item.id;
            const projectUrl = `/projects/${item.id}`;
            return (
              <figure
                key={item.id}
                className={`group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 3) + 1}`}
              >
                <div>
                  {/* Browser Mockup Frame with Overflow Hidden & Auto-Scroll */}
                  <div
                    onClick={() => toggleMobileScroll(item.id)}
                    className="relative h-[230px] w-full overflow-hidden rounded-[12px] bg-background nm-inset cursor-pointer"
                    title="Hover to scroll through full website preview"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      width={900}
                      height={1200}
                      className="w-full object-cover object-top will-change-transform"
                      style={{
                        transform: isMobileActive
                          ? "translateY(calc(-100% + 230px))"
                          : undefined,
                        transition: isMobileActive
                          ? "transform 5s ease-in-out"
                          : "transform 1.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(calc(-100% + 230px))";
                        e.currentTarget.style.transition = "transform 5.5s ease-in-out";
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobileActive) {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.transition = "transform 1.2s ease-in-out";
                        }
                      }}
                    />

                    {/* Subtle top/bottom gradient overlay cues */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/25 to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                  </div>

                  {/* Project Details */}
                  <div className="px-2 pt-4">
                    <span className="nm-inset text-brand-deep rounded-[6px] px-3 py-1 text-[10px] font-extrabold tracking-[0.1em] uppercase">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-[16px] sm:text-[17px] font-extrabold tracking-tight text-foreground">
                      <a href={projectUrl} className="hover:text-brand-deep transition-colors">
                        {item.title}
                      </a>
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.65] font-normal text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 px-2 pb-1.5">
                  <a
                    href={projectUrl}
                    className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[10px] w-full py-3.5 text-[12px] font-extrabold tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[var(--shadow-nm-hover)] hover:-translate-y-0.5 active:nm-inset"
                  >
                    View Project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </figure>
            );
          })}
        </div>
      </NeumorphicCard>
    </section>
  );
}
