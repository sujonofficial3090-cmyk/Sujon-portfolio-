import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "@tanstack/react-router";
import { Sparkles, Play, X, RefreshCw } from "lucide-react";

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

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

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

  // Poll state to know when the swarm is currently running
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.__swarmRebuild) {
        setIsRunning(!!window.__swarmRebuild.app);
      }
    }, 250);
    return () => clearInterval(interval);
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

  const handleStartOrToggle = useCallback(() => {
    if (window.__swarmRebuild) {
      if (window.__swarmRebuild.app) {
        window.__swarmRebuild.restart();
      } else {
        window.__swarmRebuild.start();
      }
    }
  }, []);

  return (
    <>
      {/* Floating Trigger Pill on Page (Visible when Swarm is not actively running) */}
      {!isMinimized && !isRunning && (
        <aside
          aria-label="Swarm Rebuild Quick Launcher"
          className="fixed bottom-3 left-3 sm:bottom-4 sm:left-5 z-[999980] flex items-center gap-1.5 sm:gap-2 p-1 pl-2.5 sm:p-1.5 sm:pl-3 rounded-full nm-raised bg-surface/95 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl text-foreground text-xs select-none transition-all duration-200 hover:scale-[1.02] max-w-[calc(100vw-24px)]"
        >
          <button
            type="button"
            onClick={handleStartOrToggle}
            className="flex items-center gap-1.5 sm:gap-2 font-bold text-brand-deep hover:text-brand transition-colors cursor-pointer"
            title="Start Swarm Rebuild (Alt+Shift+S)"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand animate-spin" />
            <span className="text-[11px] sm:text-xs">Swarm Rebuild</span>
            <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-brand/10 text-brand font-black">
              48 Cursors
            </span>
          </button>

          <span className="text-muted-foreground/30">|</span>

          <button
            type="button"
            onClick={handleStartOrToggle}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Run Swarm (Alt+Shift+S)"
          >
            <Play className="h-3.5 w-3.5 fill-current text-brand" />
          </button>

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Minimize"
          >
            <X className="h-3 w-3" />
          </button>
        </aside>
      )}

      {/* Minimized Floating Reopen Icon */}
      {isMinimized && !isRunning && (
        <aside
          aria-label="Reopen Swarm Quick Launcher"
          className="fixed bottom-3 left-3 sm:bottom-4 sm:left-5 z-[999980]"
        >
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full nm-raised bg-surface flex items-center justify-center text-brand-deep hover:scale-110 active:scale-95 transition-all shadow-xl border border-white/40 dark:border-white/10"
            title="Open Swarm Rebuild Quick Launcher"
          >
            <Sparkles className="h-4 w-4 text-brand" />
          </button>
        </aside>
      )}
    </>
  );
}
