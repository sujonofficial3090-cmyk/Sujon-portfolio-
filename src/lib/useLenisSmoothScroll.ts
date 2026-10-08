import { useEffect } from "react";
import Lenis from "lenis";

export function useLenisSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Disable Lenis on touch/mobile devices — native scroll is faster & smoother
    const isMobileOrTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024;

    if (isMobileOrTouch) {
      // On mobile, just handle anchor smooth scrolling natively without Lenis overhead
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest("a");
        if (!target) return;
        const href = target.getAttribute("href");
        if (href && (href.startsWith("/#") || href.startsWith("#"))) {
          const id = href.replace("/#", "").replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            const top = element.getBoundingClientRect().top + window.scrollY - 85;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      };
      document.addEventListener("click", handleAnchorClick, { passive: false });
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    // Desktop only: Lenis luxurious smooth scroll
    const lenis = new Lenis({
      syncTouch: false,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 0.95,
      autoResize: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth scroll for in-page anchors on desktop
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && (href.startsWith("/#") || href.startsWith("#"))) {
        const id = href.replace("/#", "").replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          lenis.scrollTo(element, {
            offset: -85,
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Expose lenis instance globally for scroll buttons and components
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
