import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ChevronDown, ChevronUp } from "lucide-react";

export function NationalAnthemPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const isUserManuallyPaused = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/national-anthem.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Function to start playback
    const startAudio = () => {
      if (isUserManuallyPaused.current) return;
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
        })
        .catch(() => {});
      removeGestureListeners();
    };

    const addGestureListeners = () => {
      window.addEventListener("pointerdown", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("touchstart", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("click", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("keydown", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("scroll", unlockOnGesture, { capture: true, once: true });
      window.addEventListener("mousemove", unlockOnGesture, { capture: true, once: true });
    };

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", unlockOnGesture, { capture: true });
      window.removeEventListener("touchstart", unlockOnGesture, { capture: true });
      window.removeEventListener("click", unlockOnGesture, { capture: true });
      window.removeEventListener("keydown", unlockOnGesture, { capture: true });
      window.removeEventListener("scroll", unlockOnGesture, { capture: true });
      window.removeEventListener("mousemove", unlockOnGesture, { capture: true });
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
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      isUserManuallyPaused.current = true;
      audioRef.current.pause();
    } else {
      isUserManuallyPaused.current = false;
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
          title="জাতীয় সংগীত প্লেয়ার বড় করুন | Expand National Anthem Player"
          aria-label="Expand National Anthem Player"
        >
          {/* Bangladesh Flag Badge */}
          <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#006a4e] overflow-hidden shrink-0 shadow-sm">
            <div className="h-3 w-3 rounded-full bg-[#f42a41]" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold text-foreground tracking-wide font-sans">
              জাতীয় সংগীত
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
        <div className="nm-raised rounded-[18px] p-3 sm:p-3.5 bg-background/95 backdrop-blur-lg border border-border/70 shadow-2xl max-w-[310px] sm:max-w-[335px] transition-all duration-300">
          <div className="flex items-center justify-between gap-3 mb-2.5">
            {/* Flag & Song Details */}
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#006a4e] shrink-0 shadow-md">
                <div className="h-4 w-4 rounded-full bg-[#f42a41]" />
                {isPlaying && (
                  <span className="absolute -inset-0.5 rounded-full border border-[#006a4e]/50 animate-ping opacity-75" />
                )}
              </div>

              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[13px] font-extrabold text-foreground truncate tracking-tight">
                    আমার সোনার বাংলা
                  </h4>
                  {isPlaying ? (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ) : (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                  )}
                </div>
                <p className="text-[11px] font-semibold text-muted-foreground truncate">
                  {isPlaying ? "▶ জাতীয় সংগীত বাজছে" : "⏸ জাতীয় সংগীত পজ করা"}
                </p>
              </div>
            </div>

            {/* Minimize button */}
            <button
              onClick={() => setIsMinimized(true)}
              className="nm-inset text-muted-foreground hover:text-foreground grid h-6 w-6 place-items-center rounded-full transition-colors shrink-0"
              title="মিনিমাইজ করুন | Minimize"
              aria-label="Minimize player"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

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
            <div className="flex items-end gap-[3px] h-4 px-2" title={isPlaying ? "Playing" : "Paused"}>
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
