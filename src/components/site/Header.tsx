import { Menu, X, Sun, Moon, Palette, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NeumorphicCard } from "@/components/nm";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#portfolio" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

const COLOR_MOODS = [
  { id: "gold", label: "Gold", hex: "#F5B700" },
  { id: "orange", label: "Orange", hex: "#F97316" },
  { id: "blue", label: "Blue", hex: "#2563EB" },
  { id: "purple", label: "Purple", hex: "#7C3AED" },
  { id: "teal", label: "Teal", hex: "#0D9488" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/#home");
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState("gold");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    const currentAccent =
      document.documentElement.getAttribute("data-accent") ||
      localStorage.getItem("accentColor") ||
      "gold";
    setAccent(currentAccent);
    document.documentElement.setAttribute("data-accent", currentAccent);

    function handleClickOutside(e: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Instant mood selection without transition delay
  const selectAccent = (colorId: string) => {
    setAccent(colorId);
    document.documentElement.setAttribute("data-accent", colorId);
    localStorage.setItem("accentColor", colorId);
  };

  // Instant Light/Dark toggle without any transition animation
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <header className="sticky top-3 z-50">
      <NeumorphicCard depth="md" radius="lg" className="px-4 py-3 sm:px-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          {/* Pure Typographic Logo — SUJON Only */}
          <a href="/#home" className="flex min-w-0 items-center">
            <span className="text-brand-gradient text-[24px] sm:text-[27px] font-extrabold tracking-[0.14em] uppercase transition-colors">
              SUJON
            </span>
          </a>

          {/* Desktop Navigation: Real Neumorphic Buttons with Funnel Display 16px/20px, 600 weight, rgb(255,96,0) */}
          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-3">
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setActive(item.href)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-[10px] px-[18px] py-[10px] uppercase tracking-wider transition-all duration-200",
                        isActive
                          ? "nm-inset font-bold shadow-[var(--shadow-nm-inset)] scale-[0.98]"
                          : "nm-raised-sm hover:nm-interactive hover:-translate-y-0.5 font-semibold",
                      )}
                      style={{
                        fontFamily: '"Funnel Display", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "rgb(255, 96, 0)",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center justify-end gap-2.5">
            {/* Get a Quote Button Styled like Menu Item but slightly larger in size */}
            <a
              href="/#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-[11px] px-[22px] py-[11px] uppercase tracking-wider transition-all duration-200 nm-raised-sm hover:nm-interactive hover:-translate-y-0.5 active:nm-inset font-bold"
              style={{
                fontFamily: '"Funnel Display", sans-serif',
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                color: "rgb(255, 96, 0)",
              }}
            >
              Get a Quote
            </a>

            {/* Theme & Color Mood Trigger */}
            <div className="relative" ref={paletteRef}>
              <button
                type="button"
                onClick={() => setPaletteOpen((v) => !v)}
                aria-label="Theme and color palette"
                aria-expanded={paletteOpen}
                className={cn(
                  "nm-raised-sm nm-interactive flex h-10 items-center gap-1.5 rounded-[10px] px-3 text-foreground/80",
                  paletteOpen && "nm-inset text-brand-deep",
                )}
              >
                <Palette className="h-4 w-4 text-brand-deep" />
                <span
                  className="h-3 w-3 rounded-full shrink-0 shadow-xs border border-white/40 dark:border-black/40"
                  style={{
                    backgroundColor:
                      COLOR_MOODS.find((c) => c.id === accent)?.hex || "#F5B700",
                  }}
                />
              </button>

              {/* 5-Color Mood + Light/Dark Neumorphic Popover (100% Perfectly Centered on Mobile) */}
              {paletteOpen && (
                <>
                  {/* Backdrop for Mobile */}
                  <div
                    onClick={() => setPaletteOpen(false)}
                    className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] sm:hidden"
                  />

                  <div className="fixed left-1/2 -translate-x-1/2 top-[72px] z-50 w-[min(calc(100vw-32px),300px)] rounded-[18px] bg-surface p-4 nm-raised-lg border border-white/50 dark:border-white/10 animate-in fade-in zoom-in-95 duration-150 shadow-[var(--shadow-nm-hover)] sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:translate-x-0 sm:w-72">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border pb-2.5">
                      <span className="text-[12px] font-extrabold uppercase tracking-wider text-foreground">
                        Color Mood
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                        {COLOR_MOODS.find((c) => c.id === accent)?.label}
                      </span>
                    </div>

                    {/* Exactly 5 Color Options */}
                    <div className="mt-3.5 flex items-center justify-between gap-1.5 sm:gap-2">
                      {COLOR_MOODS.map((c) => {
                        const isSelected = accent === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => selectAccent(c.id)}
                            title={`${c.label} Mood`}
                            aria-label={`Select ${c.label} color mood`}
                            className={cn(
                              "relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200",
                              isSelected
                                ? "nm-inset scale-105 ring-2 ring-brand-deep ring-offset-2 ring-offset-surface"
                                : "nm-raised-sm hover:scale-105",
                            )}
                          >
                            <span
                              className="h-5 w-5 sm:h-6 sm:w-6 rounded-full shrink-0 shadow-inner flex items-center justify-center"
                              style={{ backgroundColor: c.hex }}
                            >
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 stroke-[3px] text-white drop-shadow-xs" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Surface Mode Toggle (Light / Dark) */}
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          Surface Mode
                        </span>
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="nm-raised-sm nm-interactive flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-foreground/80"
                        >
                          {dark ? (
                            <>
                              <Sun className="h-3.5 w-3.5 text-brand-deep" />
                              <span>Light</span>
                            </>
                          ) : (
                            <>
                              <Moon className="h-3.5 w-3.5 text-brand-deep" />
                              <span>Dark</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Direct Quick Light/Dark Instant Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle light or dark theme"
              className="nm-raised-sm nm-interactive grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-foreground/75"
            >
              {dark ? (
                <Sun className="h-4 w-4 text-brand-deep" />
              ) : (
                <Moon className="h-4 w-4 text-brand-deep" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="nm-raised-sm nm-interactive grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-foreground/70 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown with Real Neumorphic Buttons & Built-in 5-Color Mood Bar */}
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-250 lg:hidden",
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <ul className="nm-inset flex flex-col gap-2.5 rounded-[14px] p-3">
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => {
                        setActive(item.href);
                        setOpen(false);
                      }}
                      className={cn(
                        "block text-center rounded-[10px] px-4 py-3 uppercase tracking-wider transition-all duration-200",
                        isActive
                          ? "nm-inset font-bold shadow-[var(--shadow-nm-inset)]"
                          : "nm-raised-sm font-semibold",
                      )}
                      style={{
                        fontFamily: '"Funnel Display", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
                        color: "rgb(255, 96, 0)",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}

              {/* Mobile Get a Quote button */}
              <li className="sm:hidden mt-1">
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="nm-raised-sm hover:nm-interactive active:nm-inset block text-center rounded-[11px] px-5 py-3.5 uppercase tracking-wider transition-all duration-200 font-bold"
                  style={{
                    fontFamily: '"Funnel Display", sans-serif',
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "rgb(255, 96, 0)",
                  }}
                >
                  Get a Quote
                </a>
              </li>

              {/* Mobile 5-Color Moods & Mode Selector */}
              <li className="mt-2 border-t border-border/60 pt-3 px-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground/80">
                    Color Mood: <span className="text-brand-deep">{COLOR_MOODS.find((c) => c.id === accent)?.label}</span>
                  </span>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="nm-raised-sm nm-interactive flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-foreground/80"
                  >
                    {dark ? (
                      <>
                        <Sun className="h-3.5 w-3.5 text-brand-deep" />
                        <span>Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5 text-brand-deep" />
                        <span>Dark</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-1">
                  {COLOR_MOODS.map((c) => {
                    const isSelected = accent === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectAccent(c.id)}
                        title={`${c.label} Mood`}
                        aria-label={`Select ${c.label} color mood`}
                        className={cn(
                          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200",
                          isSelected
                            ? "nm-inset scale-105 ring-2 ring-brand-deep ring-offset-2 ring-offset-surface"
                            : "nm-raised-sm hover:scale-105",
                        )}
                      >
                        <span
                          className="h-5 w-5 rounded-full shrink-0 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: c.hex }}
                        >
                          {isSelected && (
                            <Check className="h-3.5 w-3.5 stroke-[3px] text-white drop-shadow-xs" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </NeumorphicCard>
    </header>
  );
}
