import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach((el) => {
        el.classList.add("is-revealed");
      });
    };

    if (prefersReducedMotion) {
      revealAll();
      return;
    }

    // High performance IntersectionObserver for buttery smooth scroll reveal
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
        threshold: 0.05,
        rootMargin: "0px 0px -25px 0px",
      },
    );

    const checkAndObserve = () => {
      const windowHeight = window.innerHeight;
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in the viewport or above it, reveal it immediately
        if (rect.top < windowHeight * 0.92 && rect.bottom > 0) {
          el.classList.add("is-revealed");
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check
    checkAndObserve();
    const timer = setTimeout(checkAndObserve, 60);

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
