import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Immediately reveal all elements — zero delay, zero late-loading
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      el.classList.add("is-revealed");
    });
  }, []);
}
