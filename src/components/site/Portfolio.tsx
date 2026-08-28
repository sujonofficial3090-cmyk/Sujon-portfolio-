import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { PROJECTS, type Project } from "@/data/projects";

function ProjectCard({ item, idx }: { item: Project; idx: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const projectUrl = `/projects/${item.id}`;

  const isActive = (isHovered || isMobileActive) && canScroll;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.naturalHeight && target.naturalWidth) {
      // Check if image height exceeds container viewport
      const renderedHeight = (target.naturalHeight / target.naturalWidth) * target.clientWidth;
      setCanScroll(renderedHeight > 260);
    }
  };

  return (
    <figure
      className={`group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] reveal-on-scroll stagger-${(idx % 3) + 1}`}
    >
      <div>
        {/* Fixed Viewport Container for Static Screenshot with Overflow Hidden */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setCanScroll(true);
            setIsMobileActive((prev) => !prev);
          }}
          className="relative h-[230px] sm:h-[240px] w-full overflow-hidden rounded-[12px] bg-muted/20 nm-inset cursor-pointer select-none [contain:paint]"
          title="Hover to preview full website"
        >
          <img
            src={item.img}
            alt={`${item.title} Full Screenshot Preview`}
            loading={idx < 2 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onLoad={handleImageLoad}
            className="w-full h-auto block object-cover object-top pointer-events-none"
            style={{
              transform: isActive
                ? "translate3d(0, calc(-100% + 230px), 0)"
                : "translate3d(0, 0, 0)",
              transition: isActive
                ? "transform 8.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                : "transform 0.75s ease-out",
              willChange: isActive ? "transform" : "auto",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          />

          {/* Subtle bottom gradient indicator */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background/40 to-transparent opacity-70 group-hover:opacity-0 transition-opacity duration-300" />
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
}

const CATEGORIES = [
  "All",
  "WooCommerce & E-Commerce",
  "Landing Page & Funnel Design",
  "AI SaaS / Business Website",
  "Real Estate & Property Listing",
  "Healthcare & Medical Services",
  "Portfolio Website",
];

export function Portfolio() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filteredProjects = selectedCat === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCat);

  return (
    <section id="portfolio" className="scroll-mt-28">
      <NeumorphicCard
        depth="md"
        radius="lg"
        className="from-brand/25 via-brand/10 bg-gradient-to-b to-transparent p-6 sm:p-10"
      >
        <div className="mb-10 text-center reveal-on-scroll">
          <span className="nm-inset text-brand-deep rounded-[8px] px-3.5 py-1 text-[11px] font-extrabold tracking-[0.15em] uppercase inline-block mb-3">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-brand-gradient text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight pb-1 leading-normal">
            Featured Agency Case Studies
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[15px] sm:text-[16px] font-medium text-muted-foreground">
            Explore our curated showcase of high-converting digital platforms, eCommerce engines, and custom web applications.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`rounded-[10px] px-4 py-2 text-[12px] font-extrabold tracking-wide uppercase transition-all duration-300 ${
                  selectedCat === cat
                    ? "nm-inset text-brand-deep font-black"
                    : "nm-raised-sm text-foreground/80 hover:text-brand-deep hover:-translate-y-0.5"
                }`}
              >
                {cat === "All" ? "⚡ All Case Studies" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((item, idx) => (
            <ProjectCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </NeumorphicCard>
    </section>
  );
}


