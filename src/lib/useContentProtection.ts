import { useEffect } from "react";

/**
 * Content Protection & Anti-Copy Hook
 * - Prevents right-click context menu (Save image as, inspect)
 * - Prevents drag-and-drop on images
 * - Blocks Ctrl+C, Ctrl+X, Ctrl+U, Ctrl+S, Ctrl+P, F12, and DevTools shortcuts
 * - Preserves normal typing and input behavior in form fields (input, textarea)
 */
export function useContentProtection() {
  useEffect(() => {
    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right-click only if user is actively editing a text input
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
    };

    // 2. Prevent Image and Element Dragging
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Block Copy/Cut on non-form elements
    const handleCopyCut = (e: ClipboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
    };

    // 4. Block Keyboard Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+P, F12, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLElement).isContentEditable);

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12 (Devtools)
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (Devtools)
      if (
        isCtrlOrCmd &&
        e.shiftKey &&
        (e.key === "I" ||
          e.key === "i" ||
          e.key === "J" ||
          e.key === "j" ||
          e.key === "C" ||
          e.key === "c")
      ) {
        e.preventDefault();
        return;
      }

      // View Source (Ctrl+U)
      if (isCtrlOrCmd && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
        return;
      }

      // Save Page (Ctrl+S)
      if (isCtrlOrCmd && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        return;
      }

      // Print Page (Ctrl+P)
      if (isCtrlOrCmd && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        return;
      }

      // Copy / Cut outside form fields
      if (!isInput && isCtrlOrCmd && (e.key === "c" || e.key === "C" || e.key === "x" || e.key === "X")) {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, { capture: true });
    document.addEventListener("dragstart", handleDragStart, { capture: true });
    document.addEventListener("copy", handleCopyCut, { capture: true });
    document.addEventListener("cut", handleCopyCut, { capture: true });
    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      document.removeEventListener("dragstart", handleDragStart, { capture: true });
      document.removeEventListener("copy", handleCopyCut, { capture: true });
      document.removeEventListener("cut", handleCopyCut, { capture: true });
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);
}
