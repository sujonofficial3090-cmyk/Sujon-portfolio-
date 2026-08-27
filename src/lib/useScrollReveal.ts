import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // If user prefers reduced motion, reveal everything immediately
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    // High performance IntersectionObserver for smooth one-time scroll reveal
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

    // Observe any dynamic additions
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
