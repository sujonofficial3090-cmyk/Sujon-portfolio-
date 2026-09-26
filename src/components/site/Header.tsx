import { Menu, X, Sun, Moon, Palette, Check, Globe, Search, Pipette, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NeumorphicCard } from "@/components/nm";
import { cn } from "@/lib/utils";
import {
  ALL_LANGUAGES,
  POPULAR_LANGUAGES,
} from "@/lib/languages";
import { useTranslation } from "@/lib/i18n";
import {
  COLOR_MOODS,
  applyCustomColor,
  clearCustomColor,
} from "@/lib/accentColors";
import type { CursorMode } from "@/components/ui/MagicCursorEffect";
import { SOUND_OPTIONS, getSoundMode, setSoundMode, type SoundMode } from "@/lib/useClickSound";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#portfolio" },
  { label: "Reviews", href: "/#reviews" },
];

const CURSOR_OPTIONS: { id: CursorMode; label: string; icon: React.ReactNode }[] = [
  {
    id: "circle",
    label: "Circle",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "spark",
    label: "Spark",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3L11.5 19.5L14.2 13.8L20 11.2L5 3Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M17 3V6M17 3H14M17 3H20M17 3V0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "glow-dot",
    label: "Laser",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "trail",
    label: "Comet",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 19C7 18 10 14 12 11C14 8 16 5 20 4" />
        <circle cx="20" cy="4" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "crosshair",
    label: "Target",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="7" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="22" />
        <line x1="2" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    id: "bubble",
    label: "Bubble",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M9 8a4 4 0 0 1 4-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "orbit",
    label: "Orbit",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="20" cy="10" r="1.5" fill="currentColor" />
        <circle cx="4" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "fire",
    label: "Flame",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
      </svg>
    ),
  },
  {
    id: "matrix",
    label: "Cyber Radar",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 1.5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "ripple",
    label: "Ripple",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "galaxy",
    label: "Galaxy",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
        <path d="M12 21a9 9 0 0 1-9-9" strokeLinecap="round" />
        <circle cx="19" cy="8" r="1.2" fill="currentColor" />
        <circle cx="5" cy="16" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "default",
    label: "Default",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    ),
  },
];

export function Header() {
  const { t, lang: currentLang, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/#home");
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState("gold");
  const [customHex, setCustomHex] = useState("#EC4899");
  const [cursorMode, setCursorMode] = useState<CursorMode>("circle");
  const [soundMode, setSoundModeState] = useState<SoundMode>("pop");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [searchLang, setSearchLang] = useState("");
  const langRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t("nav_home"), href: "/#home" },
    { label: t("nav_about"), href: "/#about" },
    { label: t("nav_services"), href: "/#services" },
    { label: t("nav_projects"), href: "/#portfolio" },
    { label: t("nav_reviews"), href: "/#reviews" },
  ];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    const currentAccent =
      document.documentElement.getAttribute("data-accent") ||
      localStorage.getItem("accentColor") ||
      "gold";
    setAccent(currentAccent);

    const savedCustomHex = localStorage.getItem("customAccentHex") || "#EC4899";
    setCustomHex(savedCustomHex);

    const currentCursor =
      (localStorage.getItem("magicCursor") as CursorMode) || "circle";
    setCursorMode(currentCursor);

    setSoundModeState(getSoundMode());

    // Sync sound mode if changed from elsewhere
    const onSoundChange = (e: Event) => {
      setSoundModeState((e as CustomEvent<SoundMode>).detail);
    };
    window.addEventListener("clickSoundChange", onSoundChange);

    function handleClickOutside(e: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("clickSoundChange", onSoundChange);
    };
  }, []);

  const selectLanguage = (code: string) => {
    setLanguage(code);
    setLangOpen(false);
    setOpen(false);
  };

  const selectCursor = (mode: CursorMode) => {
    setCursorMode(mode);
    try {
      localStorage.setItem("magicCursor", mode);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-cursor", mode);
    window.dispatchEvent(new CustomEvent("magicCursorChange", { detail: mode }));
  };

  const selectSound = (mode: SoundMode) => {
    setSoundModeState(mode);
    setSoundMode(mode);
  };

  const selectAccent = (colorId: string) => {
    setAccent(colorId);
    if (colorId === "custom") {
      applyCustomColor(customHex);
    } else {
      clearCustomColor(colorId);
    }
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomHex(hex);
    setAccent("custom");
    applyCustomColor(hex);
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
    <>
      {/* Invisible Document Flow Spacer (Ensures content starts below fixed header) */}
      <div className="h-16 sm:h-20 w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Rock-Solid Fixed Header — 100% immune to scroll vibration, jitter, or shaking */}
      <header className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 mx-auto w-full max-w-[1500px] px-3 sm:px-5 pointer-events-none isolate [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <div className="pointer-events-auto relative">
          <NeumorphicCard depth="md" radius="lg" className="px-3.5 py-3 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between gap-2.5 sm:gap-4 lg:grid lg:grid-cols-[auto_1fr_auto]">
          {/* SUJON — Clean Bold Text Logo */}
          <a href="/#home" className="flex min-w-0 shrink items-center group">
            <span className="sujon-logo text-[22px] min-[380px]:text-[26px] sm:text-[30px] lg:text-[34px] font-black tracking-[0.06em] select-none uppercase truncate">
              Sujon
            </span>
          </a>

          {/* Desktop Navigation: Real Neumorphic Buttons with Funnel Display, responsive scaling */}
          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      href={item.href}
                      onClick={() => setActive(item.href)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-[10px] px-4 py-2 xl:px-6 xl:py-2.5 uppercase tracking-wider select-none transition-[box-shadow,color] duration-150 font-semibold text-[13px] xl:text-[15px]",
                        isActive
                          ? "nm-inset text-brand-deep"
                          : "nm-raised-sm hover:nm-interactive text-[rgb(255,96,0)]",
                      )}
                      style={{
                        fontFamily: '"Funnel Display", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "18px",
                        transform: "none",
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
          <div className="flex items-center justify-end gap-2.5 min-[380px]:gap-3 sm:gap-3.5 md:gap-3.5 lg:gap-4 xl:gap-5 shrink-0">
            {/* Get a Quote Button - visible from tablet (md: 768px+) */}
            <a
              href="/#contact"
              className="hidden md:inline-flex items-center justify-center rounded-[10px] px-4 py-2 lg:px-6 lg:py-2.5 uppercase tracking-wider transition-all duration-200 nm-raised-sm hover:nm-interactive active:nm-inset font-bold text-[13px] lg:text-[15px]"
              style={{
                fontFamily: '"Funnel Display", sans-serif',
                fontStyle: "normal",
                fontWeight: 700,
                color: "rgb(255, 96, 0)",
              }}
            >
              {t("nav_quote")}
            </a>

            {/* Multi-Language Selector Trigger & Popover */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => {
                  setLangOpen((v) => !v);
                  if (paletteOpen) setPaletteOpen(false);
                }}
                aria-label="Select language"
                aria-expanded={langOpen}
                className={cn(
                  "nm-raised-sm nm-interactive flex h-9.5 min-[380px]:h-10.5 items-center justify-center gap-1.5 rounded-[10px] px-3 sm:px-3.5 text-foreground/85 font-black text-[12px] sm:text-[13px] tracking-wider shrink-0",
                  langOpen && "nm-inset text-brand-deep",
                )}
                title="Change language / ভাষা পরিবর্তন করুন"
              >
                <Globe className="h-4.5 w-4.5 text-brand-deep shrink-0" />
                <span className="text-[12px] sm:text-[13px] font-black uppercase">
                  {currentLang.slice(0, 2).toUpperCase()}
                </span>
              </button>

              {/* Multi-Language Neumorphic Popover (100% Centered on Mobile & Scroll-Safe) */}
              {langOpen && (
                <>
                  {/* Backdrop for Mobile */}
                  <div
                    onClick={() => setLangOpen(false)}
                    className="fixed inset-0 z-40 bg-transparent sm:hidden"
                  />

                  <div className="fixed left-1/2 -translate-x-1/2 top-[68px] sm:top-12 z-50 w-[calc(100vw-20px)] max-w-[360px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-[20px] bg-surface p-4 sm:p-4.5 nm-raised-lg border border-white/50 dark:border-white/10 animate-in fade-in zoom-in-95 duration-150 shadow-[var(--shadow-nm-hover)] sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:w-[360px]">
                    {/* Popover Header */}
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4.5 w-4.5 text-brand-deep" />
                        <span className="text-[13px] font-black uppercase tracking-wider text-foreground">
                          {t("nav_language")}
                        </span>
                      </div>
                      <span className="text-[12px] font-black text-brand-deep uppercase">
                        {ALL_LANGUAGES.find((l) => l.code === currentLang)?.nativeName || "English"}
                      </span>
                    </div>

                    {/* Search Input */}
                    <div className="mt-3 relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t("nav_search_lang")}
                        value={searchLang}
                        onChange={(e) => setSearchLang(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-[10px] nm-inset bg-surface text-[13px] font-medium text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                      />
                    </div>

                    {/* Quick Popular Languages */}
                    {!searchLang && (
                      <div className="mt-3.5">
                        <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2 block">
                          {t("nav_popular")}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {POPULAR_LANGUAGES.slice(0, 6).map((lang) => {
                            const isSelected = currentLang === lang.code;
                            return (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => selectLanguage(lang.code)}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 rounded-[9px] text-[13px] font-bold transition-all text-left",
                                  isSelected
                                    ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                                    : "nm-raised-sm hover:nm-interactive text-foreground/85",
                                )}
                              >
                                <span className="text-lg shrink-0">{lang.flag}</span>
                                <span className="truncate">{lang.nativeName}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* All 100+ Languages Scrollable List */}
                    <div className="mt-3.5">
                      <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2 block">
                        {searchLang ? "Search Results" : t("nav_all_languages")}
                      </span>
                      <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-1.5 nm-inset rounded-[11px] p-2">
                        {ALL_LANGUAGES.filter(
                          (l) =>
                            l.name.toLowerCase().includes(searchLang.toLowerCase()) ||
                            l.nativeName.toLowerCase().includes(searchLang.toLowerCase()) ||
                            l.code.toLowerCase().includes(searchLang.toLowerCase()),
                        ).map((lang) => {
                          const isSelected = currentLang === lang.code;
                          return (
                            <button
                              key={lang.code}
                              type="button"
                              onClick={() => selectLanguage(lang.code)}
                              className={cn(
                                "flex items-center justify-between px-3 py-2.5 rounded-[9px] text-[13px] font-semibold transition-colors",
                                isSelected
                                  ? "bg-brand/15 text-brand-deep font-bold"
                                  : "hover:bg-muted text-foreground/85",
                              )}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                <span className="text-lg shrink-0">{lang.flag}</span>
                                <span className="font-bold text-[13px] sm:text-[14px]">{lang.nativeName}</span>
                                <span className="text-[11px] text-muted-foreground">({lang.name})</span>
                              </div>
                              {isSelected && <Check className="h-4 w-4 text-brand-deep shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme & Color Mood Trigger - visible on all screens */}
            <div className="relative" ref={paletteRef}>
              <button
                type="button"
                onClick={() => setPaletteOpen((v) => !v)}
                aria-label="Theme and color palette"
                aria-expanded={paletteOpen}
                className={cn(
                  "nm-raised-sm nm-interactive flex h-9 sm:h-10 items-center gap-1.5 rounded-[9px] sm:rounded-[10px] px-2.5 sm:px-3 text-foreground/80 shrink-0",
                  paletteOpen && "nm-inset text-brand-deep",
                )}
              >
                <Palette className="h-4 w-4 text-brand-deep" />
                <span
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full shrink-0 shadow-xs border border-white/40 dark:border-black/40"
                  style={{
                    backgroundColor:
                      accent === "custom"
                        ? customHex
                        : COLOR_MOODS.find((c) => c.id === accent)?.hex || "#F5B700",
                  }}
                />
              </button>

              {/* 5-Color Mood + Custom Picker + Light/Dark Neumorphic Popover */}
              {paletteOpen && (
                <>
                  {/* Backdrop for Mobile */}
                  <div
                    onClick={() => setPaletteOpen(false)}
                    className="fixed inset-0 z-40 bg-transparent sm:hidden"
                  />

                  <div className="fixed left-1/2 -translate-x-1/2 top-[68px] sm:top-12 z-50 w-[calc(100vw-24px)] max-w-[340px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-[18px] bg-surface p-3.5 sm:p-4 nm-raised-lg border border-white/50 dark:border-white/10 animate-in fade-in zoom-in-95 duration-150 shadow-[var(--shadow-nm-hover)] sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:w-80">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border pb-2.5">
                      <span className="text-[12px] font-extrabold uppercase tracking-wider text-foreground">
                        Color Mood
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-deep">
                        {accent === "custom" ? "Custom" : COLOR_MOODS.find((c) => c.id === accent)?.label}
                      </span>
                    </div>

                    {/* 5 Preset Color Options + Custom Color Picker */}
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
                              "relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200",
                              isSelected
                                ? "nm-inset scale-105 ring-2 ring-brand-deep ring-offset-2 ring-offset-surface"
                                : "nm-raised-sm hover:scale-105",
                            )}
                          >
                            <span
                              className="h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full shrink-0 shadow-inner flex items-center justify-center"
                              style={{ backgroundColor: c.hex }}
                            >
                              {isSelected && (
                                <Check
                                  className={cn(
                                    "h-3 w-3 stroke-[3px] drop-shadow-xs",
                                    c.id === "mint" ? "text-zinc-950" : "text-white",
                                  )}
                                />
                              )}
                            </span>
                          </button>
                        );
                      })}

                      {/* Custom Color Picker Swatch & Trigger */}
                      <label
                        title="Pick Any Custom Color"
                        aria-label="Pick any custom color"
                        className={cn(
                          "relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform duration-200",
                          accent === "custom"
                            ? "nm-inset scale-105 ring-2 ring-brand-deep ring-offset-2 ring-offset-surface"
                            : "nm-raised-sm hover:scale-105",
                        )}
                      >
                        <input
                          type="color"
                          value={customHex}
                          onChange={(e) => handleCustomColorChange(e.target.value)}
                          className="sr-only"
                        />
                        <span
                          className="h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full shrink-0 shadow-inner flex items-center justify-center border border-black/10 overflow-hidden relative"
                          style={{
                            background:
                              accent === "custom"
                                ? customHex
                                : "conic-gradient(from 0deg, #f43f5e, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #f43f5e)",
                          }}
                        >
                          {accent === "custom" ? (
                            <Check className="h-3 w-3 stroke-[3px] text-white drop-shadow-xs" />
                          ) : (
                            <Pipette className="h-2.5 w-2.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                          )}
                        </span>
                      </label>
                    </div>

                    {/* Custom Color Live Input */}
                    {accent === "custom" && (
                      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-black/5 dark:bg-white/5 px-2.5 py-1 border border-border/50 text-[11px]">
                        <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
                          <Pipette className="h-3 w-3 text-brand-deep" />
                          <span>Hex:</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={customHex}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomHex(val);
                              if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                                applyCustomColor(val);
                              }
                            }}
                            maxLength={7}
                            className="w-20 bg-transparent text-right font-mono text-[11px] font-bold uppercase text-brand-deep focus:outline-none"
                            placeholder="#RRGGBB"
                          />
                          <label className="cursor-pointer shrink-0">
                            <input
                              type="color"
                              value={customHex}
                              onChange={(e) => handleCustomColorChange(e.target.value)}
                              className="sr-only"
                            />
                            <span
                              className="inline-block h-4 w-4 rounded-full border border-black/20 shadow-xs"
                              style={{ backgroundColor: customHex }}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Surface Mode Toggle (Light / Dark) */}
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          {t("nav_surface_mode")}
                        </span>
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="nm-raised-sm nm-interactive flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-foreground/80"
                        >
                          {dark ? (
                            <>
                              <Sun className="h-3.5 w-3.5 text-brand-deep" />
                              <span>{t("nav_light")}</span>
                            </>
                          ) : (
                            <>
                              <Moon className="h-3.5 w-3.5 text-brand-deep" />
                              <span>{t("nav_dark")}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Magic Cursor Selection */}
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
                          {t("nav_magic_cursor")}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                          {CURSOR_OPTIONS.find((c) => c.id === cursorMode)?.label || "Circle"}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        {CURSOR_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => selectCursor(opt.id)}
                            title={`${opt.label} Cursor`}
                            aria-label={`${opt.label} Cursor`}
                            className={cn(
                              "flex flex-col items-center justify-center gap-1 py-1.5 px-0.5 rounded-[10px] text-[10px] font-bold transition-all duration-200",
                              cursorMode === opt.id
                                ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                                : "nm-raised-sm hover:nm-interactive text-foreground/80",
                            )}
                          >
                            {opt.icon}
                            <span className="text-[9.5px] truncate max-w-full">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Click Sound Selection */}
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <Volume2 className="h-3.5 w-3.5 text-brand-deep" />
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
                            Click Sound
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                          {SOUND_OPTIONS.find((s) => s.id === soundMode)?.label || "Soft Pop"}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {SOUND_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => selectSound(opt.id)}
                            title={opt.desc}
                            aria-label={`${opt.label} click sound`}
                            className={cn(
                              "flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-[10px] text-[10px] font-bold transition-all duration-200",
                              soundMode === opt.id
                                ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                                : "nm-raised-sm hover:nm-interactive text-foreground/80",
                            )}
                          >
                            <span className="text-[15px] leading-none">{opt.emoji}</span>
                            <span className="text-[9px] truncate max-w-full">{opt.label}</span>
                          </button>
                        ))}
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
              className="nm-raised-sm nm-interactive grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-[9px] sm:rounded-[10px] text-foreground/75"
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
              className="nm-raised-sm nm-interactive grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-[9px] sm:rounded-[10px] text-foreground/70 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </NeumorphicCard>

      {/* Mobile Navigation Dropdown Menu - Floating Overlay Card (No page layout shifts / zero shake) */}
      {open && (
        <>
          {/* Backdrop to close menu when tapping outside */}
          <div
            className="fixed inset-0 z-40 bg-transparent lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[calc(100vh-85px)] overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl pb-4">
            <NeumorphicCard depth="lg" radius="lg" className="p-3 sm:p-4 border border-white/50 dark:border-white/10">
              <ul className="nm-inset flex flex-col gap-2.5 sm:gap-3 rounded-[14px] p-2.5 sm:p-3">
              {navItems.map((item) => {
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
                        "block text-center rounded-[10px] px-5 py-2.5 uppercase tracking-wider select-none transition-[box-shadow,color] duration-150 font-semibold",
                        isActive
                          ? "nm-inset text-brand-deep"
                          : "nm-raised-sm hover:nm-interactive text-[rgb(255,96,0)]",
                      )}
                      style={{
                        fontFamily: '"Funnel Display", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "15px",
                        lineHeight: "19px",
                        transform: "none",
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}

              {/* Mobile Get a Quote button */}
              <li className="md:hidden mt-0.5">
                <a
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="nm-raised-sm hover:nm-interactive active:nm-inset block text-center rounded-[10px] px-5 py-2.5 uppercase tracking-wider transition-all duration-200 font-bold text-[14px]"
                  style={{
                    fontFamily: '"Funnel Display", sans-serif',
                    fontStyle: "normal",
                    fontWeight: 700,
                    color: "rgb(255, 96, 0)",
                  }}
                >
                  {t("nav_quote")}
                </a>
              </li>
            </ul>
            </NeumorphicCard>
          </div>
        </>
      )}
        </div>
      </header>
    </>
  );
}
