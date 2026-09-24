import { useEffect } from "react";
import { playClickSound } from "@/lib/useClickSound";

export function ClickSoundEffect() {
  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      // Fire on any left-click or touch anywhere on the page
      if (e.button !== 0 && e.pointerType !== "touch") return;

      // Slight random pitch variation for organic feel
      const pitch = 0.94 + Math.random() * 0.12;
      playClickSound(pitch);
    };

    // pointerdown gives zero-latency tactile feedback on any element
    window.addEventListener("pointerdown", handleClick, { passive: true, capture: true });

    return () => {
      window.removeEventListener("pointerdown", handleClick, { capture: true });
    };
  }, []);

  return null;
}
