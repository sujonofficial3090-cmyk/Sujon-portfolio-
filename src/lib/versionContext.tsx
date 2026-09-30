import React, { createContext, useContext, useEffect, useState } from "react";

export type SiteVersion = "v2" | "v1";

interface VersionContextType {
  version: SiteVersion;
  setVersion: (v: SiteVersion) => void;
  toggleVersion: () => void;
  isV2: boolean;
}

const VersionContext = createContext<VersionContextType>({
  version: "v2",
  setVersion: () => {},
  toggleVersion: () => {},
  isV2: true,
});

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersionState] = useState<SiteVersion>("v2");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check URL param: ?v=1 or ?v=2 or ?version=classic or ?version=new
      const params = new URLSearchParams(window.location.search);
      const v = params.get("v") || params.get("version");
      if (v === "1" || v === "v1" || v === "classic") {
        setVersionState("v1");
        return;
      }
      if (v === "2" || v === "v2" || v === "new") {
        setVersionState("v2");
        return;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem("portfolio_site_version");
      if (saved === "v1" || saved === "v2") {
        setVersionState(saved);
      }
    }
  }, []);

  const setVersion = (v: SiteVersion) => {
    setVersionState(v);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_site_version", v);
      const url = new URL(window.location.href);
      url.searchParams.set("v", v === "v2" ? "2" : "1");
      window.history.replaceState({}, "", url.toString());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleVersion = () => {
    const next = version === "v2" ? "v1" : "v2";
    setVersion(next);
  };

  return (
    <VersionContext.Provider value={{ version, setVersion, toggleVersion, isV2: version === "v2" }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useSiteVersion() {
  return useContext(VersionContext);
}
