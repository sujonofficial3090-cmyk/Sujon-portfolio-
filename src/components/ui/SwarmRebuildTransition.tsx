import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";

declare global {
  interface Window {
    __swarmRebuild?: {
      toggle: () => void;
      start: () => void;
      stop: (reveal?: boolean) => void;
      restart: () => void;
      app: any;
      debug: any;
    };
  }
}

export function SwarmRebuildTransition() {
  const location = useLocation();
  const currentPath = location.pathname;
  const prevPathRef = useRef(currentPath);

  const [, setIsScriptLoaded] = useState(false);

  // Load the genuine 100% official Swarm Rebuild engine (/swarm.js)
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.__swarmRebuild) {
      setIsScriptLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src="/swarm.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsScriptLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "/swarm.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    script.onerror = (err) => {
      console.error("[SwarmRebuild] Failed to load /swarm.js", err);
    };
    document.head.appendChild(script);
  }, []);

  // Keyboard shortcut: Alt + Shift + S (Official extension shortcut)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        if (window.__swarmRebuild) {
          window.__swarmRebuild.toggle();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Trigger rebuild when navigating to a new page
  useEffect(() => {
    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;

      // Small delay to let TanStack router mount the new page's DOM elements
      const timer = setTimeout(() => {
        if (window.__swarmRebuild) {
          if (window.__swarmRebuild.app) {
            window.__swarmRebuild.restart();
          } else {
            window.__swarmRebuild.start();
          }
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentPath]);

  return null;
}
