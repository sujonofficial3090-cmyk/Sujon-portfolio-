import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobileOrTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach((el) => {
        el.classList.add("is-revealed");
      });
    };

    if (isMobileOrTouch || prefersReducedMotion) {
      revealAll();
      // Keep lightweight observer on touch to ensure dynamic tab-switching never leaves elements invisible
      const mobileObserver = new MutationObserver(() => {
        revealAll();
      });
      mobileObserver.observe(document.body, { childList: true, subtree: true });
      return () => mobileObserver.disconnect();
    }

    // High performance IntersectionObserver for smooth one-time scroll reveal on desktop
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.04,
        rootMargin: "0px 0px 50px 0px",
      },
    );

    const checkAndObserve = () => {
      const windowHeight = window.innerHeight;
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already inside or above viewport (e.g. from tab filter), reveal immediately
        if (rect.top <= windowHeight + 50) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check
    checkAndObserve();
    const timer = setTimeout(checkAndObserve, 50);

    // Watch for DOM mutations (route changes and dynamic tab filtering)
    let animId: number;
    const mutationObserver = new MutationObserver(() => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(checkAndObserve);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
