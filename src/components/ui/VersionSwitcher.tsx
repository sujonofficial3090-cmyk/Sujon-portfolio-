import { Sparkles, Layers, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useSiteVersion } from "@/lib/versionContext";
import { useTranslation } from "@/lib/i18n";
import { playClickSound } from "@/lib/useClickSound";

export function VersionSwitcher() {
  const { version, toggleVersion, isV2 } = useSiteVersion();
  const { t } = useTranslation();

  const handleToggle = () => {
    playClickSound();
    toggleVersion();
    const nextMsg = !isV2
      ? t("version_toast_v2", "Switched to New Version (v2.0) with latest features ✨")
      : t("version_toast_v1", "Switched to Classic Version (v1.0)");
    toast.success(nextMsg);
  };

  return (
    <aside
      aria-label="Website Version Switcher"
      className="fixed bottom-4 left-3 sm:bottom-5 sm:left-5 z-40 select-none animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="nm-raised-sm rounded-full p-1 bg-background/85 backdrop-blur-md border border-border/40 shadow-xl flex items-center gap-1.5 transition-all duration-300 hover:shadow-2xl">
        {/* Current Version Indicator Pill */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold text-foreground"
          style={{ fontFamily: '"Funnel Display", sans-serif' }}
        >
          <span
            className={`h-2 w-2 rounded-full transition-colors ${
              isV2 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="font-extrabold tracking-tight">
            {isV2
              ? t("version_current_v2", "v2.0 New")
              : t("version_current_v1", "v1.0 Classic")}
          </span>
        </div>

        {/* Action Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="nm-raised-sm hover:nm-interactive active:nm-inset text-brand-deep flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] sm:text-[11.5px] font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer"
          style={{ fontFamily: '"Funnel Display", sans-serif' }}
          title={
            isV2
              ? t("version_switch_to_v1", "Switch to Classic")
              : t("version_switch_to_v2", "Switch to New v2.0")
          }
        >
          {isV2 ? (
            <>
              <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden xs:inline sm:inline">
                {t("version_switch_to_v1", "Switch to Classic")}
              </span>
              <span className="xs:hidden sm:hidden">v1</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-brand-deep" />
              <span className="hidden xs:inline sm:inline">
                {t("version_switch_to_v2", "Switch to New v2.0 ✨")}
              </span>
              <span className="xs:hidden sm:hidden">v2 ✨</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
