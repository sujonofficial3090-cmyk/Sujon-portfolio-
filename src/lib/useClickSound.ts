// High-performance, zero-latency Web Audio UI Click Sound Effect
// Creates a subtle, extremely satisfying tactile 'pop/click' sound on button & link clicks

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a satisfying, modern soft pop click sound (Linear / Apple style)
 */
export function playClickSound(pitch = 1.0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Primary Oscillator: Warm pitch sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    const startFreq = 420 * pitch;
    const peakFreq = 880 * pitch;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(peakFreq, now + 0.015);
    osc.frequency.exponentialRampToValueAtTime(320 * pitch, now + 0.05);

    // Exponential decay gain envelope (very soft and pleasant, not harsh)
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);

    // Subtle tactile mechanical click transient (harmonic pop)
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(1400 * pitch, now);
    clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.02);

    clickGain.gain.setValueAtTime(0.08, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    clickOsc.start(now);
    clickOsc.stop(now + 0.03);
  } catch {
    // Ignore any audio context restrictions safely
  }
}
