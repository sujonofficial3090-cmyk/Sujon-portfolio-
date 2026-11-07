import { useEffect } from "react";
import { playClickSound } from "@/lib/useClickSound";

export function ClickSoundEffect() {
  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      // Fire on any left-click or touch anywhere on the page
      if (e.button !== 0 && e.pointerType !== "touch") return;

      // Do not play click sounds when typing or focusing inside form inputs / textareas / contenteditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      // Slight random pitch variation for organic feel
      const pitch = 0.94 + Math.random() * 0.12;
      playClickSound(pitch);
    };

    // pointerdown gives zero-latency tactile feedback on any interactive element
    window.addEventListener("pointerdown", handleClick, { passive: true, capture: true });

    return () => {
      window.removeEventListener("pointerdown", handleClick, { capture: true });
    };
  }, []);

  return null;
}
