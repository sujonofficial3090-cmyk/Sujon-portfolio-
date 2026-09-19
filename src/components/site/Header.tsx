import { Menu, X, Sun, Moon, Palette, Check, Globe, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NeumorphicCard } from "@/components/nm";
import { cn } from "@/lib/utils";
import {
  ALL_LANGUAGES,
  POPULAR_LANGUAGES,
  setGoogleTranslateLanguage,
  getCurrentLanguage,
} from "@/lib/languages";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#portfolio" },
  { label: "Reviews", href: "/#reviews" },
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
  const [cursorMode, setCursorMode] = useState<"circle" | "spark" | "default">("default");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [searchLang, setSearchLang] = useState("");
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    const currentAccent =
      document.documentElement.getAttribute("data-accent") ||
      localStorage.getItem("accentColor") ||
      "gold";
    setAccent(currentAccent);
    document.documentElement.setAttribute("data-accent", currentAccent);

    const currentCursor =
      (localStorage.getItem("magicCursor") as "circle" | "spark" | "default") || "default";
    setCursorMode(currentCursor);
    document.documentElement.setAttribute("data-cursor", currentCursor);

    setCurrentLang(getCurrentLanguage());

    function handleClickOutside(e: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (code: string) => {
    setCurrentLang(code);
    setLangOpen(false);
    setOpen(false);
    setGoogleTranslateLanguage(code);
  };

  const selectCursor = (mode: "circle" | "spark" | "default") => {
    setCursorMode(mode);
    localStorage.setItem("magicCursor", mode);
    document.documentElement.setAttribute("data-cursor", mode);
    window.dispatchEvent(new Event("magicCursorChange"));
  };

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
    <>
      {/* Invisible Document Flow Spacer (Ensures content starts below fixed header) */}
      <div className="h-16 sm:h-20 w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Rock-Solid Fixed Header — 100% immune to scroll vibration, jitter, or shaking */}
      <header className="fixed top-2 sm:top-3.5 left-0 right-0 z-50 mx-auto w-full max-w-[1500px] px-3 sm:px-5 pointer-events-none isolate [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <div className="pointer-events-auto relative">
          <NeumorphicCard depth="md" radius="lg" className="px-3.5 py-3 sm:px-6 sm:py-3.5 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:grid lg:grid-cols-[auto_1fr_auto]">
          {/* SUJON — Clean Bold Text Logo */}
          <a href="/#home" className="flex min-w-0 shrink items-center group">
            <span className="sujon-logo text-[22px] min-[380px]:text-[26px] sm:text-[30px] lg:text-[34px] font-black tracking-[0.06em] select-none uppercase truncate">
              Sujon
            </span>
          </a>

          {/* Desktop Navigation: Real Neumorphic Buttons with Funnel Display, responsive scaling */}
          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-1.5 xl:gap-3">
              {NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <li key={item.href} className="shrink-0">
                    <a
                      href={item.href}
                      onClick={() => setActive(item.href)}
                      className={cn(
                        "inline-flex items-center justify-center rounded-[10px] px-2.5 py-2 xl:px-4 xl:py-2.5 uppercase tracking-wider select-none transition-[box-shadow,color] duration-150 font-semibold text-[13px] xl:text-[15px]",
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
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
            {/* Get a Quote Button - visible from tablet (md: 768px+) */}
            <a
              href="/#contact"
              className="hidden md:inline-flex items-center justify-center rounded-[10px] px-3.5 py-2 lg:px-5 lg:py-2.5 uppercase tracking-wider transition-all duration-200 nm-raised-sm hover:nm-interactive active:nm-inset font-bold text-[13px] lg:text-[15px]"
              style={{
                fontFamily: '"Funnel Display", sans-serif',
                fontStyle: "normal",
                fontWeight: 700,
                color: "rgb(255, 96, 0)",
              }}
            >
              Get a Quote
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
                  "nm-raised-sm nm-interactive flex h-9 min-[380px]:h-10 items-center justify-center gap-1 sm:gap-1.5 rounded-[9px] sm:rounded-[10px] px-2.5 sm:px-3 text-foreground/85 font-extrabold text-[11px] sm:text-[12px] tracking-wider shrink-0",
                  langOpen && "nm-inset text-brand-deep",
                )}
                title="Change language / ভাষা পরিবর্তন করুন"
              >
                <Globe className="h-4 w-4 text-brand-deep shrink-0" />
                <span className="text-[11px] font-black uppercase">
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

                  <div className="fixed left-1/2 -translate-x-1/2 top-[68px] sm:top-12 z-50 w-[calc(100vw-24px)] max-w-[340px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-[18px] bg-surface p-3.5 sm:p-4 nm-raised-lg border border-white/50 dark:border-white/10 animate-in fade-in zoom-in-95 duration-150 shadow-[var(--shadow-nm-hover)] sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:w-80">
                    {/* Popover Header */}
                    <div className="flex items-center justify-between border-b border-border pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Globe className="h-4 w-4 text-brand-deep" />
                        <span className="text-[12px] font-extrabold uppercase tracking-wider text-foreground">
                          Language / ভাষা
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-brand-deep uppercase">
                        {ALL_LANGUAGES.find((l) => l.code === currentLang)?.nativeName || "English"}
                      </span>
                    </div>

                    {/* Search Input */}
                    <div className="mt-3 relative">
                      <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search language / ভাষা খুঁজুন..."
                        value={searchLang}
                        onChange={(e) => setSearchLang(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-[9px] nm-inset bg-surface text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-hidden"
                      />
                    </div>

                    {/* Quick Popular Languages */}
                    {!searchLang && (
                      <div className="mt-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                          Popular / জনপ্রিয়
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {POPULAR_LANGUAGES.slice(0, 6).map((lang) => {
                            const isSelected = currentLang === lang.code;
                            return (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => selectLanguage(lang.code)}
                                className={cn(
                                  "flex items-center gap-1.5 px-2 py-1.5 rounded-[8px] text-[11px] font-bold transition-all text-left",
                                  isSelected
                                    ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                                    : "nm-raised-sm hover:nm-interactive text-foreground/80",
                                )}
                              >
                                <span className="text-sm">{lang.flag}</span>
                                <span className="truncate">{lang.nativeName}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* All 100+ Languages Scrollable List */}
                    <div className="mt-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                        {searchLang ? "Search Results" : "All Languages / সকল ভাষা"}
                      </span>
                      <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-1 nm-inset rounded-[10px] p-1.5">
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
                                "flex items-center justify-between px-2.5 py-1.5 rounded-[7px] text-[12px] font-semibold transition-colors",
                                isSelected
                                  ? "bg-brand/15 text-brand-deep font-bold"
                                  : "hover:bg-muted text-foreground/85",
                              )}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="text-sm">{lang.flag}</span>
                                <span className="font-bold">{lang.nativeName}</span>
                                <span className="text-[10px] text-muted-foreground">({lang.name})</span>
                              </div>
                              {isSelected && <Check className="h-3.5 w-3.5 text-brand-deep shrink-0 ml-1" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme & Color Mood Trigger - visible on sm: 640px+ (mobile drawer has full color mood) */}
            <div className="relative hidden sm:block" ref={paletteRef}>
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
                      COLOR_MOODS.find((c) => c.id === accent)?.hex || "#F5B700",
                  }}
                />
              </button>

              {/* 5-Color Mood + Light/Dark Neumorphic Popover */}
              {paletteOpen && (
                <>
                  {/* Backdrop for Mobile */}
                  <div
                    onClick={() => setPaletteOpen(false)}
                    className="fixed inset-0 z-40 bg-transparent sm:hidden"
                  />

                  <div className="fixed left-1/2 -translate-x-1/2 top-[68px] sm:top-12 z-50 w-[calc(100vw-24px)] max-w-[320px] max-h-[calc(100vh-80px)] overflow-y-auto rounded-[18px] bg-surface p-3.5 sm:p-4 nm-raised-lg border border-white/50 dark:border-white/10 animate-in fade-in zoom-in-95 duration-150 shadow-[var(--shadow-nm-hover)] sm:absolute sm:left-auto sm:right-0 sm:translate-x-0 sm:w-72">
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

                    {/* Magic Cursor Selection (Circle Dot, Magic Spark Arrow, System Default) */}
                    <div className="mt-4 border-t border-border pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground">
                          Magic Cursor
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                          {cursorMode === "circle" ? "Circle Dot" : cursorMode === "spark" ? "Magic Spark" : "Default"}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Circle Dot Option (Matching user's image icon ⊙) */}
                        <button
                          type="button"
                          onClick={() => selectCursor("circle")}
                          title="Circle Dot Cursor"
                          aria-label="Circle Dot Cursor"
                          className={cn(
                            "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                            cursorMode === "circle"
                              ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                              : "nm-raised-sm hover:nm-interactive text-foreground/80",
                          )}
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="8.5" />
                            <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                          </svg>
                          <span className="text-[10px]">Circle</span>
                        </button>

                        {/* Magic Spark Arrow Option (Matching user's image icon ↖✨) */}
                        <button
                          type="button"
                          onClick={() => selectCursor("spark")}
                          title="Magic Spark Arrow Cursor"
                          aria-label="Magic Spark Arrow Cursor"
                          className={cn(
                            "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                            cursorMode === "spark"
                              ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                              : "nm-raised-sm hover:nm-interactive text-foreground/80",
                          )}
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
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
                          <span className="text-[10px]">Spark</span>
                        </button>

                        {/* System Default Option */}
                        <button
                          type="button"
                          onClick={() => selectCursor("default")}
                          title="Default System Cursor"
                          aria-label="Default System Cursor"
                          className={cn(
                            "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                            cursorMode === "default"
                              ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                              : "nm-raised-sm hover:nm-interactive text-foreground/80",
                          )}
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                          </svg>
                          <span className="text-[10px]">Default</span>
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
            <NeumorphicCard depth="lg" radius="lg" className="p-2.5 sm:p-3.5 border border-white/50 dark:border-white/10">
              <ul className="nm-inset flex flex-col gap-2 rounded-[14px] p-2.5 sm:p-3">
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
                        "block text-center rounded-[10px] px-4 py-3 uppercase tracking-wider select-none transition-[box-shadow,color] duration-150 font-semibold",
                        isActive
                          ? "nm-inset text-brand-deep"
                          : "nm-raised-sm hover:nm-interactive text-[rgb(255,96,0)]",
                      )}
                      style={{
                        fontFamily: '"Funnel Display", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "20px",
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
                  className="nm-raised-sm hover:nm-interactive active:nm-inset block text-center rounded-[10px] px-5 py-3 uppercase tracking-wider transition-all duration-200 font-bold text-[15px]"
                  style={{
                    fontFamily: '"Funnel Display", sans-serif',
                    fontStyle: "normal",
                    fontWeight: 700,
                    color: "rgb(255, 96, 0)",
                  }}
                >
                  Get a Quote
                </a>
              </li>

              {/* Mobile Multi-Language Selector */}
              <li className="mt-2 border-t border-border/60 pt-3 px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground/80 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-brand-deep" />
                    Language: <span className="text-brand-deep">{ALL_LANGUAGES.find((l) => l.code === currentLang)?.nativeName || "English"}</span>
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{currentLang}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {POPULAR_LANGUAGES.slice(0, 6).map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => selectLanguage(lang.code)}
                        className={cn(
                          "flex items-center justify-center gap-1 py-1.5 px-1 rounded-[8px] text-[11px] font-bold transition-all truncate",
                          isSelected
                            ? "nm-inset text-brand-deep"
                            : "nm-raised-sm hover:nm-interactive text-foreground/80",
                        )}
                      >
                        <span className="text-xs">{lang.flag}</span>
                        <span className="truncate text-[10px]">{lang.nativeName}</span>
                      </button>
                    );
                  })}
                </div>
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
                <div className="mt-3 border-t border-border/60 pt-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-foreground/80">
                      Magic Cursor
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-deep">
                      {cursorMode === "circle" ? "Circle Dot" : cursorMode === "spark" ? "Magic Spark" : "Default"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* Circle Dot Option */}
                    <button
                      type="button"
                      onClick={() => selectCursor("circle")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                        cursorMode === "circle"
                          ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                          : "nm-raised-sm hover:nm-interactive text-foreground/80",
                      )}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="8.5" />
                        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                      </svg>
                      <span className="text-[10px]">Circle</span>
                    </button>

                    {/* Magic Spark Arrow Option */}
                    <button
                      type="button"
                      onClick={() => selectCursor("spark")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                        cursorMode === "spark"
                          ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                          : "nm-raised-sm hover:nm-interactive text-foreground/80",
                      )}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
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
                      <span className="text-[10px]">Spark</span>
                    </button>

                    {/* System Default Option */}
                    <button
                      type="button"
                      onClick={() => selectCursor("default")}
                      className={cn(
                        "flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-[10px] text-[11px] font-bold transition-all duration-200",
                        cursorMode === "default"
                          ? "nm-inset text-brand-deep ring-1 ring-brand-deep/30"
                          : "nm-raised-sm hover:nm-interactive text-foreground/80",
                      )}
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                      </svg>
                      <span className="text-[10px]">Default</span>
                    </button>
                  </div>
                </div>
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
