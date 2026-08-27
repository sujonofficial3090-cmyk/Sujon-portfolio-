import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

import logoMark from "@/assets/logo-mark.png";
import { NeumorphicCard, NeumorphicLinkButton } from "@/components/nm";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(false);
      // Wait, we need to set state to true, let's make sure it's correct
      setDark(true);
    }
  };

  return (
    <header className="sticky top-3 z-50">
      <NeumorphicCard depth="md" radius="lg" className="px-4 py-3 sm:px-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
          <a href="#home" className="flex min-w-0 items-center gap-2">
            <img
              src={logoMark}
              alt="SUJON logo"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 object-contain"
            />
            <span className="truncate text-[15px] font-extrabold tracking-wider uppercase text-foreground">
              SUJON
            </span>
          </a>

          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={cn(
                      "rounded-[8px] px-4 py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all duration-300",
                      active === item.href
                        ? "nm-inset text-brand-deep"
                        : "text-muted-foreground hover:text-brand-deep",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <NeumorphicLinkButton
              href="#contact"
              tone="brand"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Get a Quote
            </NeumorphicLinkButton>
            
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="nm-raised-sm nm-interactive grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-foreground/75"
            >
              {dark ? <Sun className="h-4 w-4 text-brand-deep" /> : <Moon className="h-4 w-4 text-brand-deep" />}
            </button>

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

        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden",
            open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0">
            <ul className="nm-inset flex flex-col gap-1 rounded-[12px] p-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => {
                      setActive(item.href);
                      setOpen(false);
                    }}
                    className="nm-raised-sm block rounded-[8px] px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground/75"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="nm-raised-sm text-brand-deep block rounded-[8px] px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase"
                >
                  Get a Quote
                </a>
              </li>
            </ul>
          </div>
        </div>
      </NeumorphicCard>
    </header>
  );
}
