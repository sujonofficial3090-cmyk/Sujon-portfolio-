import { useState, useMemo, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Search,
  FolderGit2,
  Sparkles,
  X,
  Layers,
  Lock,
} from "lucide-react";
import { NeumorphicCard } from "@/components/nm";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PROJECTS, type Project } from "@/data/projects";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      {
        title: "All Projects & Client Work — Sujon | Senior WordPress Developer",
      },
      {
        name: "description",
        content:
          "Browse all production WordPress websites, WooCommerce stores, dynamic content architectures, and custom client solutions built by Sujon.",
      },
      {
        property: "og:title",
        content: "All Projects — Sujon | Senior WordPress Developer",
      },
      {
        property: "og:description",
        content:
          "Explore full case studies, live websites, and tech stack details across all client projects.",
      },
    ],
  }),
  component: AllProjectsPage,
});

function ProjectCard({ item, idx }: { item: Project; idx: number }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  const isActive = (isHovered || isMobileActive) && canScroll;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.naturalHeight && target.naturalWidth) {
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

  const domainDisplay = useMemo(() => {
    if (!item.liveUrl || item.liveUrl.includes("vercel.app")) {
      return `${item.id}.com`;
    }
    try {
      const url = new URL(item.liveUrl);
      return url.hostname.replace(/^www\./, "");
    } catch {
      return `${item.id}.com`;
    }
  }, [item.liveUrl, item.id]);

  return (
    <figure
      className="project-grid-card group flex h-full flex-col justify-between overflow-hidden rounded-[20px] p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="flex flex-col flex-1">
        {/* Browser Mockup Window with Screenshot Preview */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            setCanScroll(true);
            setIsMobileActive((prev) => !prev);
          }}
          className="relative w-full overflow-hidden rounded-[14px] bg-muted/20 nm-inset cursor-pointer select-none [contain:paint]"
          title="Hover or tap to preview full website"
        >
          {/* macOS Browser Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/30">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-background/80 nm-inset text-[10px] font-mono text-muted-foreground/85 max-w-[170px] truncate">
              <Lock className="h-2.5 w-2.5 text-brand-deep/75 shrink-0" />
              <span className="truncate">{domainDisplay}</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Screenshot Scroll Viewport */}
          <div className="relative h-[215px] sm:h-[235px] w-full overflow-hidden bg-muted/10">
            <img
              src={item.img}
              alt={`${item.title} Real Website Preview`}
              loading={idx < 3 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onLoad={handleImageLoad}
              className="w-full h-auto block object-cover object-top pointer-events-none"
              style={{
                transform: isActive
                  ? "translate3d(0, calc(-100% + 235px), 0)"
                  : "translate3d(0, 0, 0)",
                transition: isActive
                  ? "transform 8.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "transform 0.75s ease-out",
                willChange: isActive ? "transform" : "auto",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />

            {/* Bottom subtle gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-background/70 via-background/20 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-300 flex items-end justify-center pb-1">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-muted-foreground/90 group-hover:hidden">
                Hover to scroll
              </span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="px-1 pt-4 sm:pt-4.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="nm-inset text-brand-deep rounded-[7px] px-2.5 py-0.5 text-[10.5px] font-extrabold tracking-[0.08em] uppercase">
                {categoryLabels[item.category] || item.category}
              </span>
              {localizedRole && (
                <span className="text-[11px] font-bold text-muted-foreground">
                  • {localizedRole}
                </span>
              )}
            </div>

            <h3
              translate="no"
              className="notranslate mt-2.5 text-[17px] sm:text-[18.5px] font-extrabold tracking-tight text-foreground hover:text-brand-deep transition-colors line-clamp-1"
            >
              <Link to="/projects/$projectId" params={{ projectId: item.id }}>
                {item.title}
              </Link>
            </h3>

            <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.6] font-normal text-muted-foreground line-clamp-2 min-h-[42px]">
              {localizedDesc}
            </p>
          </div>

          {/* Tech Stack Pills */}
          {item.techStack && item.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-[6px] bg-muted/40 px-2 py-0.5 text-[10.5px] font-medium text-foreground/75"
                >
                  {tech}
                </span>
              ))}
              {item.techStack.length > 3 && (
                <span className="rounded-[6px] bg-muted/40 px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
                  +{item.techStack.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-5 flex items-center gap-2.5 px-1 pb-1">
        <Link
          to="/projects/$projectId"
          params={{ projectId: item.id }}
          className="nm-raised-sm nm-interactive text-brand-deep inline-flex flex-1 items-center justify-center gap-1.5 rounded-[11px] py-2.5 text-[11.5px] font-extrabold tracking-[0.08em] uppercase transition-all duration-300 active:nm-inset"
        >
          {t("portfolio_view_project", "View Case Study")} <ArrowUpRight className="h-4 w-4" />
        </Link>

        {item.liveUrl && item.liveUrl !== "https://sujon-portfolio.vercel.app/" && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Live Website"
            className="nm-raised-sm hover:nm-interactive text-muted-foreground hover:text-brand-deep inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] transition-all duration-300 active:nm-inset"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </figure>
  );
}

function AllProjectsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Read category query param if present in browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        setSelectedCategory(catParam);
      }
    }
  }, []);

  // Category counts and list
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const categories = [
    { id: "all", label: t("cat_all", "All Projects"), count: categoryCounts["all"] },
    { id: "Service Website", label: "Service Website", count: categoryCounts["Service Website"] || 0 },
    { id: "WooCommerce", label: t("cat_woo", "WooCommerce"), count: categoryCounts["WooCommerce"] || 0 },
    { id: "Landing Page", label: "Landing Page", count: categoryCounts["Landing Page"] || 0 },
    { id: "Plumbing Website", label: "Plumbing Website", count: categoryCounts["Plumbing Website"] || 0 },
    { id: "Business Website", label: t("cat_business", "Business Website"), count: categoryCounts["Business Website"] || 0 },
    { id: "WordPress", label: t("cat_wp", "WordPress"), count: categoryCounts["WordPress"] || 0 },
    { id: "Dynamic Content", label: t("cat_custom", "Dynamic Content"), count: categoryCounts["Dynamic Content"] || 0 },
  ].filter((c) => c.count > 0 || c.id === "all");

  // Filtered projects by category and search
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const roleMatch = (project.role || "").toLowerCase().includes(q);
      const techMatch = (project.techStack || []).some((t) => t.toLowerCase().includes(q));
      const whatMatch = (project.whatIBuilt || "").toLowerCase().includes(q);

      return titleMatch || descMatch || roleMatch || techMatch || whatMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Group projects into rows of 3 for grid-level sticky deck stacking
  const projectRows = useMemo(() => {
    const rows: Project[][] = [];
    for (let i = 0; i < filteredProjects.length; i += 3) {
      rows.push(filteredProjects.slice(i, i + 3));
    }
    return rows;
  }, [filteredProjects]);

  // Exact Experience-page cascading deck scroll physics for rows on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      // Run cascading deck animation ONLY on desktop screens (1024px+)
      if (window.innerWidth < 1024) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerWidth < 1024) {
            ticking = false;
            return;
          }

          const rows = rowRefs.current;
          const total = rows.length;

          for (let i = 0; i < total - 1; i++) {
            const currentRow = rows[i];
            const nextRow = rows[i + 1];

            if (!currentRow || !nextRow) continue;

            const nextRect = nextRow.getBoundingClientRect();
            const stickyTop = 144;

            const buffer = 320;
            const distance = nextRect.top - stickyTop;

            if (distance < buffer && distance > 0) {
              const progress = (buffer - distance) / buffer;
              const scale = 1 - progress * 0.045;
              const brightness = 1 - progress * 0.07;

              currentRow.style.transform = `scale(${scale.toFixed(4)})`;
              currentRow.style.filter = `brightness(${brightness.toFixed(3)})`;
              currentRow.style.opacity = "1";
            } else if (distance <= 0) {
              currentRow.style.transform = "scale(0.955)";
              currentRow.style.filter = "brightness(0.93)";
              currentRow.style.opacity = "1";
            } else {
              currentRow.style.transform = "scale(1)";
              currentRow.style.filter = "brightness(1)";
              currentRow.style.opacity = "1";
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        rowRefs.current.forEach((row) => {
          if (row) {
            row.style.transform = "";
            row.style.filter = "";
            row.style.opacity = "";
          }
        });
      } else {
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [projectRows]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-6 px-3 pb-12 pt-3 sm:px-5 sm:gap-8">
      <Header />

      <main className="flex flex-col gap-6 sm:gap-8">
        {/* Top Hero Banner Section */}
        <section aria-label="Projects header">
          <NeumorphicCard depth="md" radius="lg" className="p-5 sm:p-9">
            {/* Back link */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="nm-raised-sm hover:nm-inset inline-flex items-center gap-2 rounded-[9px] px-4 py-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-muted-foreground transition-all duration-300 hover:text-brand-deep"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>

              <span className="nm-inset text-brand-deep hidden sm:inline-flex items-center gap-1.5 rounded-[8px] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider">
                <Layers className="h-3.5 w-3.5" /> Full Showcase
              </span>
            </div>

            {/* Page Titles */}
            <div className="mt-6 sm:mt-7 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold text-brand-deep">
                <Sparkles className="h-3.5 w-3.5" /> Client Case Studies & Production Websites
              </div>
              <h1 className="text-brand-gradient mt-2 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold tracking-tight leading-[1.12] pb-1">
                All Projects & Client Work
              </h1>
              <p className="mt-3.5 text-[15px] sm:text-[16px] font-medium leading-[1.75] text-muted-foreground">
                A comprehensive showcase of production WordPress websites, custom WooCommerce storefronts, dynamic content architectures, and business platforms built by Sujon.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="nm-inset rounded-[12px] p-3 text-center sm:text-left">
                <div className="text-[20px] sm:text-[24px] font-black text-brand-deep">
                  {PROJECTS.length}+
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Featured Projects
                </div>
              </div>

              <div className="nm-inset rounded-[12px] p-3 text-center sm:text-left">
                <div className="text-[20px] sm:text-[24px] font-black text-foreground">
                  100%
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Responsive & Mobile Ready
                </div>
              </div>

              <div className="nm-inset rounded-[12px] p-3 text-center sm:text-left">
                <div className="text-[20px] sm:text-[24px] font-black text-foreground">
                  Elementor & CPT
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Dynamic Architecture
                </div>
              </div>

              <div className="nm-inset rounded-[12px] p-3 text-center sm:text-left">
                <div className="text-[20px] sm:text-[24px] font-black text-emerald-600 dark:text-emerald-400">
                  Active
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Live Client Sites
                </div>
              </div>
            </div>
          </NeumorphicCard>
        </section>

        {/* Filter & Search Bar */}
        <section aria-label="Project filtering and search">
          <NeumorphicCard depth="sm" radius="md" className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 touch-pan-x sm:flex-wrap">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`shrink-0 whitespace-nowrap rounded-[10px] px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-extrabold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none flex items-center gap-1.5 ${
                        isSelected
                          ? "nm-inset text-brand-deep shadow-inner"
                          : "nm-raised-sm hover:nm-interactive text-foreground/80 hover:text-brand-deep active:scale-95"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[9.5px] font-black ${
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

              {/* Instant Search Bar */}
              <div className="relative w-full sm:w-72 lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects or stack..."
                  className="nm-inset w-full rounded-[10px] bg-background/50 pl-10 pr-9 py-2.5 text-[12.5px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Summary Status */}
            <div className="mt-3.5 flex items-center justify-between text-[11.5px] font-medium text-muted-foreground border-t border-border/50 pt-3">
              <span>
                Showing <strong className="text-foreground">{filteredProjects.length}</strong> of{" "}
                <strong className="text-foreground">{PROJECTS.length}</strong> total projects
                {selectedCategory !== "all" && (
                  <> in <span className="text-brand-deep font-bold">"{selectedCategory}"</span></>
                )}
                {searchQuery && (
                  <> matching <span className="text-brand-deep font-bold">"{searchQuery}"</span></>
                )}
              </span>

              {(selectedCategory !== "all" || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="text-brand-deep hover:underline font-bold cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </NeumorphicCard>
        </section>

        {/* Projects Grid Showcase with Cascading Stacking Rows on Scroll */}
        <section aria-label="Project card list">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col">
              {projectRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  ref={(el) => {
                    rowRefs.current[rowIndex] = el;
                  }}
                  className="project-grid-row sticky"
                  style={{
                    top: "144px",
                    zIndex: 10 + rowIndex,
                    transformOrigin: "top center",
                    marginBottom: rowIndex < projectRows.length - 1 ? "clamp(100px, 18vh, 180px)" : "0",
                  }}
                >
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {row.map((item, colIdx) => (
                      <ProjectCard key={item.id} item={item} idx={rowIndex * 3 + colIdx} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NeumorphicCard depth="sm" radius="md" className="p-12 text-center">
              <FolderGit2 className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
              <h3 className="text-[17px] font-extrabold text-foreground">No projects found</h3>
              <p className="mt-1.5 text-[13.5px] text-muted-foreground max-w-sm mx-auto">
                No projects matched your active category and search filter. Try clearing your search or switching categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 nm-raised-sm hover:nm-interactive text-brand-deep inline-flex items-center gap-1.5 rounded-[9px] px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-wider cursor-pointer"
              >
                Show All Projects
              </button>
            </NeumorphicCard>
          )}
        </section>

        {/* Bottom CTA / Hire Me Card */}
        <section aria-label="Hire Sujon CTA">
          <NeumorphicCard
            depth="md"
            radius="lg"
            className="p-6 sm:p-10 md:p-12 text-center"
          >
            <h2 className="text-brand-gradient text-[22px] sm:text-[28px] md:text-[32px] font-black tracking-tight leading-snug">
              Need a High-Converting WordPress Website?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] sm:text-[15.5px] font-medium text-muted-foreground leading-relaxed">
              Whether you need a custom corporate website, dynamic WooCommerce store, or custom post type development with Elementor Pro, I build clean, high-performing digital experiences.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="/#contact"
                className="w-full sm:w-auto nm-raised-sm nm-interactive text-brand-deep inline-flex items-center justify-center gap-2 rounded-[11px] px-7 py-3.5 text-[12.5px] font-extrabold uppercase tracking-wider transition-all duration-300 active:nm-inset"
              >
                Discuss Your Project <ArrowUpRight className="h-4 w-4" />
              </a>

              <Link
                to="/"
                className="w-full sm:w-auto nm-raised-sm hover:nm-inset text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-2 rounded-[11px] px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-wider transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </NeumorphicCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AllProjectsPage;
