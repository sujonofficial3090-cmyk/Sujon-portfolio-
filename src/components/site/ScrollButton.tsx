import { useState, useEffect } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollButton() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={scrolled ? "Back to Top" : "Scroll Down"}
      title={scrolled ? "Back to Top" : "Scroll Down"}
      className={cn(
        "fixed right-4 bottom-6 z-40 sm:right-6 sm:bottom-8",
        "nm-raised nm-interactive flex h-12 w-12 items-center justify-center rounded-full text-brand-deep",
        "border border-white/40 dark:border-white/10 shadow-[var(--shadow-nm)]",
        "transition-all duration-300 hover:scale-105 active:scale-95 active:nm-inset",
      )}
    >
      {scrolled ? (
        <ArrowUp className="h-5 w-5 stroke-[2.5px] transition-transform duration-300 group-hover:-translate-y-0.5" />
      ) : (
        <ArrowDown className="h-5 w-5 stroke-[2.5px] transition-transform duration-300 group-hover:translate-y-0.5" />
      )}
    </button>
  );
}
