import { useEffect } from "react";
import Lenis from "lenis";

export function useLenisSmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect touch/mobile device
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    // Initialize Lenis — tuned for smooth scroll on both desktop and mobile
    const lenis = new Lenis({
      lerp: isTouchDevice ? 0.08 : 0.1,       // slightly faster on mobile for responsiveness
      wheelMultiplier: 0.85,
      touchMultiplier: isTouchDevice ? 1.4 : 1.0,  // stronger touch response on mobile
      smoothWheel: true,
      syncTouch: isTouchDevice,                // sync native touch on mobile = no stutter
      syncTouchLerp: 0.06,                     // smooth interpolation on touch
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth scroll for in-page anchors (#about, #services, #portfolio, #contact, etc.)
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
            offset: -28,
            duration: isTouchDevice ? 0.9 : 1.15,
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
