import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp,
  Globe,
  Check,
  Search,
  Sparkles,
} from "lucide-react";
import {
  NATIONAL_ANTHEMS,
  DEFAULT_ANTHEM_CODE,
  detectVisitorCountry,
  type NationalAnthem,
} from "@/data/nationalAnthems";

export function NationalAnthemPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  
  // Country state
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(() => {
    try {
      const saved = sessionStorage.getItem("selected_anthem_country");
      if (saved && NATIONAL_ANTHEMS[saved]) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_ANTHEM_CODE;
  });

  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem("selected_anthem_country");
    } catch {
      return true;
    }
  });

  const isUserManuallyPaused = useRef<boolean>(
    typeof window !== "undefined" && sessionStorage.getItem("anthem_paused_by_user") === "true"
  );

  const isInternalNav = useRef<boolean>(
    typeof window !== "undefined" && (() => {
      try {
        const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const isReload = navEntry?.type === "reload";
        const hasInit = sessionStorage.getItem("anthem_initialized_session");
        return Boolean(hasInit && !isReload);
      } catch {
        return false;
      }
    })()
  );

  const activeAnthem: NationalAnthem =
    NATIONAL_ANTHEMS[selectedCountryCode] || NATIONAL_ANTHEMS[DEFAULT_ANTHEM_CODE];

  // Auto-detect visitor country on mount
  useEffect(() => {
    let isMounted = true;
    detectVisitorCountry().then((code) => {
      if (!isMounted) return;
      setDetectedCountryCode(code);
      
      // If user hasn't manually overridden the country, switch to detected country if available
      try {
        const manual = sessionStorage.getItem("selected_anthem_country");
        if (!manual) {
          if (NATIONAL_ANTHEMS[code]) {
            setSelectedCountryCode(code);
            setIsAutoDetected(true);
          } else {
            // Country has no local anthem file -> fallback to Bangladesh
            setSelectedCountryCode(DEFAULT_ANTHEM_CODE);
            setIsAutoDetected(true);
          }
        }
      } catch {
        // fallback
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize and manage audio playback
  useEffect(() => {
    const audio = new Audio(activeAnthem.audioSrc);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Function to start playback
    const startAudio = () => {
      // If user paused it, or navigating between pages in same session, DO NOT autoplay!
      if (isUserManuallyPaused.current || isInternalNav.current) return;

      try {
        sessionStorage.setItem("anthem_initialized_session", "true");
      } catch {}

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy without gesture -> wait for earliest gesture
            addGestureListeners();
          });
      }
    };

    const unlockOnGesture = () => {
      if (isUserManuallyPaused.current) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          removeGestureListeners();
        })
        .catch(() => {
          // Keep listeners active until an eligible user gesture unlocks audio
        });
    };

    const addGestureListeners = () => {
      window.addEventListener("pointerdown", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("touchstart", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("click", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("keydown", unlockOnGesture, { capture: true, once: true });
    };

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", unlockOnGesture, { capture: true });
      window.removeEventListener("touchstart", unlockOnGesture, { capture: true });
      window.removeEventListener("click", unlockOnGesture, { capture: true });
      window.removeEventListener("keydown", unlockOnGesture, { capture: true });
    };

    // Try starting immediately on website open
    startAudio();

    // Listen for custom global toggle if needed
    const handleGlobalToggle = () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        isUserManuallyPaused.current = false;
        audioRef.current.play().catch(() => {});
      } else {
        isUserManuallyPaused.current = true;
        audioRef.current.pause();
      }
    };
    window.addEventListener("toggle-national-anthem", handleGlobalToggle);

    return () => {
      removeGestureListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("toggle-national-anthem", handleGlobalToggle);
      audio.pause();
      audio.src = "";
    };
  }, [activeAnthem.audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      isUserManuallyPaused.current = true;
      try {
        sessionStorage.setItem("anthem_paused_by_user", "true");
      } catch {}
      audioRef.current.pause();
    } else {
      isUserManuallyPaused.current = false;
      try {
        sessionStorage.removeItem("anthem_paused_by_user");
        sessionStorage.setItem("anthem_initialized_session", "true");
      } catch {}
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleSelectCountry = (code: string, isAuto = false) => {
    setSelectedCountryCode(code);
    setIsAutoDetected(isAuto);
    setShowCountrySelector(false);
    isUserManuallyPaused.current = false;
    try {
      if (isAuto) {
        sessionStorage.removeItem("selected_anthem_country");
      } else {
        sessionStorage.setItem("selected_anthem_country", code);
      }
    } catch {
      // ignore
    }
  };

  // Filtered country list for switcher
  const anthemList = Object.values(NATIONAL_ANTHEMS);
  const filteredAnthems = anthemList.filter((item) => {
    const q = countrySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      item.countryName.toLowerCase().includes(q) ||
      item.countryNameBn.toLowerCase().includes(q) ||
      item.anthemTitle.toLowerCase().includes(q) ||
      item.anthemTitleBn.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed bottom-24 left-4 sm:bottom-28 sm:left-6 z-40 transition-all duration-300 select-none print:hidden"
      style={{ isolation: "isolate" }}
    >
      {/* Minimized Pill */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="group nm-raised flex items-center gap-2.5 rounded-full px-3.5 py-2.5 bg-background/95 backdrop-blur-md border border-border/60 text-foreground shadow-xl hover:nm-interactive active:scale-95 transition-all duration-200"
          title={`${activeAnthem.countryNameBn} জাতীয় সংগীত প্লেয়ার বড় করুন | Expand National Anthem Player`}
          aria-label="Expand National Anthem Player"
        >
          {/* Country Flag Badge */}
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full text-base shrink-0 shadow-sm overflow-hidden bg-muted/60">
            <span>{activeAnthem.flagEmoji}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold text-foreground tracking-wide font-sans">
              {activeAnthem.countryName}
            </span>

            {/* Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-3.5 px-0.5">
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all ${
                  isPlaying ? "animate-[eq-wave-1_1s_ease-in-out_infinite]" : "h-1"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all ${
                  isPlaying ? "animate-[eq-wave-2_0.8s_ease-in-out_infinite]" : "h-2"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all ${
                  isPlaying ? "animate-[eq-wave-3_1.1s_ease-in-out_infinite]" : "h-1.5"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all ${
                  isPlaying ? "animate-[eq-wave-4_0.9s_ease-in-out_infinite]" : "h-1"
                }`}
              />
            </div>
          </div>

          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand-deep transition-colors" />
        </button>
      ) : (
        /* Expanded Player Card */
        <div className="relative nm-raised rounded-[18px] p-3 sm:p-3.5 bg-background/95 backdrop-blur-lg border border-border/70 shadow-2xl w-[310px] sm:w-[340px] transition-all duration-300">
          {/* Header Bar: Flag & Song Info & Actions */}
          <div className="flex items-center justify-between gap-2.5 mb-2.5">
            {/* Flag & Song Details */}
            <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setShowCountrySelector(!showCountrySelector)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full shrink-0 shadow-md bg-muted/60 text-lg hover:scale-105 active:scale-95 transition-transform"
                title="দেশ পরিবর্তন করুন | Change Country"
                aria-label="Change Country"
              >
                <span>{activeAnthem.flagEmoji}</span>
                {isPlaying && (
                  <span className="absolute -inset-0.5 rounded-full border border-brand-deep/50 animate-ping opacity-75" />
                )}
              </button>

              <div className="overflow-hidden flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-extrabold text-foreground truncate tracking-tight">
                    {activeAnthem.anthemTitleBn}
                  </h4>
                  {isPlaying ? (
                    <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                  ) : (
                    <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground truncate">
                  <span className="truncate">{activeAnthem.countryNameBn}</span>
                  <span className="text-[10px] opacity-70">({activeAnthem.code})</span>
                  {isAutoDetected && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-brand-deep/10 text-brand-deep font-bold">
                      Auto
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Top Right Action Buttons: Country Switcher & Minimize */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setShowCountrySelector(!showCountrySelector)}
                className={`nm-inset grid h-6 w-6 place-items-center rounded-full transition-colors ${
                  showCountrySelector
                    ? "text-brand-deep bg-brand-deep/15"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="দেশ বাছাই করুন | Select Country Anthem"
                aria-label="Select Country"
              >
                <Globe className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="nm-inset text-muted-foreground hover:text-foreground grid h-6 w-6 place-items-center rounded-full transition-colors"
                title="মিনিমাইজ করুন | Minimize"
                aria-label="Minimize player"
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Country Selector Popover */}
          {showCountrySelector && (
            <div className="mb-2.5 rounded-[14px] p-2.5 bg-background border border-border/80 shadow-inner animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between gap-1 mb-2 px-1">
                <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                  <Globe className="h-3 w-3 text-brand-deep" />
                  দেশ নির্বাচন করুন (National Anthem)
                </span>
                {detectedCountryCode && (
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectCountry(
                        NATIONAL_ANTHEMS[detectedCountryCode]
                          ? detectedCountryCode
                          : DEFAULT_ANTHEM_CODE,
                        true
                      )
                    }
                    className="text-[10px] font-bold text-brand-deep hover:underline flex items-center gap-0.5"
                    title="আইপি অনুযায়ী স্বয়ংক্রিয় সনাক্ত করুন"
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                    Auto: {detectedCountryCode}
                  </button>
                )}
              </div>

              {/* Search box */}
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="দেশ খুঁজুন (Search country)..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full pl-7 pr-2.5 py-1 text-xs rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-brand-deep"
                />
              </div>

              {/* Country List */}
              <div className="max-h-36 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredAnthems.map((anthem) => {
                  const isSelected = anthem.code === selectedCountryCode;
                  return (
                    <button
                      key={anthem.code}
                      type="button"
                      onClick={() => handleSelectCountry(anthem.code, false)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${
                        isSelected
                          ? "bg-brand-deep/15 text-brand-deep font-bold"
                          : "hover:bg-muted/60 text-foreground font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{anthem.flagEmoji}</span>
                        <div className="truncate">
                          <p className="truncate text-[11px] leading-tight">
                            {anthem.countryNameBn}{" "}
                            <span className="text-[10px] opacity-70">({anthem.countryName})</span>
                          </p>
                          <p className="text-[9px] text-muted-foreground truncate leading-tight">
                            {anthem.anthemTitleBn}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="h-3.5 w-3.5 text-brand-deep shrink-0 ml-1" />}
                    </button>
                  );
                })}
                {filteredAnthems.length === 0 && (
                  <p className="text-[11px] text-center text-muted-foreground py-2">
                    কোনো দেশ পাওয়া যায়নি
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Controls Bar */}
          <div className="nm-inset flex items-center justify-between rounded-[12px] px-3 py-2 bg-muted/40">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="nm-raised-sm nm-interactive flex items-center gap-1.5 rounded-[9px] px-2.5 py-1 text-xs font-bold text-brand-deep transition-all active:scale-95"
              title={isPlaying ? "বিরতি দিন (Pause)" : "চালান (Play)"}
              aria-label={isPlaying ? "Pause Anthem" : "Play Anthem"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Equalizer Animation Display */}
            <div
              className="flex items-end gap-[3px] h-4 px-2"
              title={isPlaying ? "বাজছে (Playing)" : "বন্ধ (Paused)"}
            >
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all duration-150 ${
                  isPlaying ? "animate-[eq-wave-1_0.9s_ease-in-out_infinite]" : "h-1.5 opacity-40"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all duration-150 ${
                  isPlaying ? "animate-[eq-wave-2_0.75s_ease-in-out_infinite]" : "h-2.5 opacity-40"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all duration-150 ${
                  isPlaying ? "animate-[eq-wave-3_1.05s_ease-in-out_infinite]" : "h-1.5 opacity-40"
                }`}
              />
              <span
                className={`w-[2.5px] rounded-full bg-brand-deep transition-all duration-150 ${
                  isPlaying ? "animate-[eq-wave-4_0.85s_ease-in-out_infinite]" : "h-2 opacity-40"
                }`}
              />
            </div>

            {/* Volume / Mute Controls */}
            <div className="flex items-center gap-1.5 relative">
              <button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="nm-raised-sm hover:nm-interactive grid h-7 w-7 place-items-center rounded-[8px] text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                title={isMuted ? "আনমিউট করুন | Unmute" : "মিউট করুন | Mute"}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5 text-destructive" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5 text-brand-deep" />
                )}
              </button>

              {/* Quick Volume Slider on Hover or Toggle */}
              {showVolumeSlider && (
                <div
                  onMouseLeave={() => setShowVolumeSlider(false)}
                  className="absolute bottom-9 right-0 nm-raised rounded-[10px] px-2.5 py-1.5 bg-background/95 backdrop-blur-md border border-border shadow-lg flex items-center gap-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1.5 accent-brand-deep cursor-pointer"
                    aria-label="Volume slider"
                  />
                  <span className="text-[10px] font-bold text-muted-foreground w-6 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
