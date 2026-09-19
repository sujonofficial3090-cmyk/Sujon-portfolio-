import { useEffect } from "react";
import Lenis from "lenis";

export function useLenisSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis — hardware accelerated buttery smooth momentum scrolling
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth scroll for in-page anchors on both mobile and desktop
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
            offset: -90,
            duration: 1.15,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    // Expose lenis instance globally for scroll buttons
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
