import { useEffect } from "react";
import { playClickSound } from "@/lib/useClickSound";

export function ClickSoundEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target is a button, link, interactive card, input or has role="button"
      const clickable = target.closest(
        "button, a, input[type='button'], input[type='submit'], [role='button'], [role='tab'], [role='switch'], .nm-interactive, .nm-raised-sm, .nm-raised, .nm-raised-deep"
      );

      if (clickable) {
        // Slight subtle variation in pitch for dynamic organic feel
        const pitch = 0.96 + Math.random() * 0.08;
        playClickSound(pitch);
      }
    };

    // Use pointerdown for instantaneous tactile response with zero latency
    window.addEventListener("pointerdown", handleClick, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleClick);
    };
  }, []);

  return null;
}
