import { useState, useMemo } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { NeumorphicCard } from "@/components/nm";
import { PROJECTS, type Project } from "@/data/projects";
import { useTranslation } from "@/lib/i18n";

function ProjectCard({ item, idx }: { item: Project; idx: number }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  const isActive = (isHovered || isMobileActive) && canScroll;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.naturalHeight && target.naturalWidth) {
      // Check if image height exceeds container viewport
      const renderedHeight = (target.naturalHeight / target.naturalWidth) * target.clientWidth;
      setCanScroll(renderedHeight > 260);
    }
  };

  const projKeys: Record<string, { descKey: string; roleKey: string }> = {
    "appliance-world": { descKey: "proj_appliance_desc", roleKey: "proj_appliance_role" },
    "clean-corp": { descKey: "proj_cleancorp_desc", roleKey: "proj_cleancorp_role" },
    "tommys-real-estate": { descKey: "proj_cleancorp_desc", roleKey: "proj_cleancorp_role" },
    "montgomery-inn": { descKey: "proj_montgomery_desc", roleKey: "proj_montgomery_role" },
    "cater-psychiatry": { descKey: "proj_cater_desc", roleKey: "proj_cater_role" },
    "diesel-repair": { descKey: "proj_diesel_desc", roleKey: "proj_diesel_role" },
    "digital-dropify": { descKey: "proj_dropify_desc", roleKey: "proj_dropify_role" },
    "salvaje-group": { descKey: "proj_dropify_desc", roleKey: "proj_dropify_role" },
    "tima": { descKey: "proj_tima_desc", roleKey: "proj_tima_role" },
    "moritz-dunkel": { descKey: "proj_tima_desc", roleKey: "proj_tima_role" },
    "global-med": { descKey: "proj_globalmed_desc", roleKey: "proj_globalmed_role" },
    "finseo": { descKey: "proj_finseo_desc", roleKey: "proj_finseo_role" },
    "emodula": { descKey: "proj_finseo_desc", roleKey: "proj_finseo_role" },
  };

  const currentKeys = projKeys[item.id];
  const localizedDesc = currentKeys ? t(currentKeys.descKey as any, item.description) : item.description;
  const localizedRole = currentKeys ? t(currentKeys.roleKey as any, item.role) : item.role;

  const categoryLabels: Record<string, string> = {
    "Service Website": "Service Website",
    "Landing Page": "Landing Page",
    "Plumbing Website": "Plumbing Website",
    WordPress: t("cat_wp", "WordPress"),
    WooCommerce: t("cat_woo", "WooCommerce"),
    "Business Website": t("cat_business", "Business Website"),
    "Dynamic Content": t("cat_custom", "Dynamic Content"),
  };

  return (
    <figure
      style={{ animationDelay: `${(idx % 6) * 45}ms` }}
      className="group nm-raised-sm flex flex-col justify-between overflow-hidden rounded-[16px] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-nm-hover)] animate-tab-fade"
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
          title="Tap / Hover to preview full website"
        >
          <img
            src={item.img}
            alt={`${item.title} Full Screenshot Preview`}
            loading={idx < 3 ? "eager" : "lazy"}
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="nm-inset text-brand-deep rounded-[6px] px-3 py-1 text-[10px] font-extrabold tracking-[0.1em] uppercase">
              {categoryLabels[item.category] || item.category}
            </span>
            {localizedRole && (
              <span className="text-[10.5px] font-bold text-muted-foreground">
                • {localizedRole}
              </span>
            )}
          </div>
          <h3
            translate="no"
            className="notranslate mt-2.5 text-[16px] sm:text-[17px] font-extrabold tracking-tight text-foreground hover:text-brand-deep transition-colors"
          >
            <Link
              to="/projects/$projectId"
              params={{ projectId: item.id }}
              className="hover:text-brand-deep transition-colors"
            >
              {item.title}
            </Link>
          </h3>
          <p className="mt-2 text-[13.5px] sm:text-[14px] leading-[1.65] font-normal text-muted-foreground line-clamp-3">
            {localizedDesc}
          </p>
        </div>
      </div>

      <div className="mt-6 px-2 pb-1.5">
        <Link
          to="/projects/$projectId"
          params={{ projectId: item.id }}
          className="nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[10px] w-full py-3.5 text-[12px] font-extrabold tracking-[0.1em] uppercase transition-all duration-300 active:nm-inset"
        >
          {t("portfolio_view_project")} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </figure>
  );
}

export function Portfolio() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories = useMemo(() => {
    return [
      { id: "all", label: t("cat_all", "All Projects"), count: categoryCounts["all"] },
      { id: "Service Website", label: "Service Website", count: categoryCounts["Service Website"] || 0 },
      { id: "WooCommerce", label: t("cat_woo", "WooCommerce"), count: categoryCounts["WooCommerce"] || 0 },
      { id: "Business Website", label: t("cat_business", "Business Website"), count: categoryCounts["Business Website"] || 0 },
      { id: "Landing Page", label: "Landing Page", count: categoryCounts["Landing Page"] || 0 },
      { id: "WordPress", label: t("cat_wp", "WordPress"), count: categoryCounts["WordPress"] || 0 },
      { id: "Dynamic Content", label: t("cat_custom", "Dynamic Content"), count: categoryCounts["Dynamic Content"] || 0 },
      { id: "Plumbing Website", label: "Plumbing Website", count: categoryCounts["Plumbing Website"] || 0 },
    ].filter((c) => c.count > 0 || c.id === "all");
  }, [categoryCounts, t]);

  // Curated diverse showcase for "all", and exact filtered list for specific categories
  const visibleProjects = useMemo(() => {
    if (selectedCategory === "all") {
      // Pick a diverse mix across different categories for the homepage preview
      const diverseIds = [
        "elixirmark", // Service
        "pesa-car-rental", // WooCommerce
        "salvaje-group", // Business / Nightlife
        "moritz-dunkel", // Dynamic Content
        "bridgeway-digital", // Service
        "viknordisk", // WooCommerce
      ];
      const featured = diverseIds
        .map((id) => PROJECTS.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p));

      // Fallback in case any id is missing
      if (featured.length < 6) {
        return PROJECTS.slice(0, 6);
      }
      return featured;
    }

    return PROJECTS.filter((p) => p.category === selectedCategory).slice(0, 6);
  }, [selectedCategory]);

  return (
    <section id="portfolio" className="scroll-mt-28">
      <NeumorphicCard
        depth="md"
        radius="lg"
        className="from-brand/25 via-brand/10 bg-gradient-to-b to-transparent p-5 sm:p-8"
      >
        <div className="mb-6 text-center reveal-on-scroll">
          <h2 className="text-brand-gradient text-[clamp(1.6rem,4.2vw,2.5rem)] font-extrabold tracking-tight pb-1 leading-normal inline-block">
            {t("portfolio_heading")}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14.5px] sm:text-[16px] font-medium text-muted-foreground">
            {t("portfolio_subtitle")}
          </p>
        </div>

        {/* Category Filter Pills — Smooth Horizontal Swipeable on Mobile, Centered on Desktop */}
        <div className="flex items-center gap-2 sm:gap-2.5 mb-8 overflow-x-auto sm:overflow-visible no-scrollbar py-3 px-2 sm:px-0 sm:py-2.5 sm:flex-wrap sm:justify-center touch-pan-x [contain:paint]">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 whitespace-nowrap rounded-[10px] px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none my-1 flex items-center gap-1.5 ${
                  isSelected
                    ? "nm-inset text-brand-deep shadow-inner"
                    : "nm-raised-sm hover:nm-interactive text-foreground/80 hover:text-brand-deep active:scale-95"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9.5px] font-black transition-colors ${
                    isSelected
                      ? "bg-brand text-white dark:text-black"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Grid with Smooth Transition */}
        {visibleProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((item, idx) => (
              <ProjectCard key={`${selectedCategory}-${item.id}`} item={item} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="nm-inset rounded-[16px] py-12 text-center text-muted-foreground">
            <p className="text-sm font-semibold">No projects found in this category.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/projects"
            className="nm-raised-sm hover:nm-interactive text-brand-deep inline-flex items-center justify-center gap-2.5 rounded-[12px] px-7 sm:px-9 py-3.5 text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider transition-all duration-300 active:nm-inset select-none cursor-pointer"
            style={{ fontFamily: '"Funnel Display", sans-serif' }}
          >
            {t("portfolio_show_more", "View All Projects")} ({PROJECTS.length}){" "}
            <ArrowRight className="h-4 w-4 text-brand-deep" />
          </Link>
        </div>
      </NeumorphicCard>
    </section>
  );
}

