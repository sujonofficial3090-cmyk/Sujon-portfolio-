import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reveal immediately on mobile/touch — no observer overhead
    const isMobileOrTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    const revealAll = () => {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
    };

    if (isMobileOrTouch) {
      revealAll();
      return;
    }

    // If user prefers reduced motion, reveal everything immediately
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      revealAll();
      return;
    }

    // High performance IntersectionObserver for smooth one-time scroll reveal on desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // One-time only: immediately stop observing once revealed
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.06,
        rootMargin: "0px 0px -25px 0px",
      },
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observation
    observeAll();

    // Check after render transitions settle
    const timer = setTimeout(observeAll, 200);

    let mutationTimer: ReturnType<typeof setTimeout>;
    // Watch for DOM mutations (route changes in SPA) with debounce
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(observeAll, 150);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(mutationTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
