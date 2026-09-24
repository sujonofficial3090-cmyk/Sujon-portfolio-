// ============================================================================
// useClickSound.ts — 6 Professional UI Click Sound Engine (Web Audio API)
// Zero latency, zero bandwidth, works offline, 60fps compatible
// ============================================================================

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Klass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (Klass) audioCtx = new Klass();
  }
  if (audioCtx?.state === "suspended") audioCtx.resume().catch(() => {});
  return audioCtx;
}

export type SoundMode =
  | "pop"        // Soft satisfying pop (default)
  | "tick"       // Crisp mechanical keyboard tick
  | "bubble"     // Bubbly water drop
  | "chime"      // Bright glass chime bell
  | "swoosh"     // Airy modern swoosh
  | "digital"    // Sci-fi digital blip
  | "none";      // Silent (off)

export const SOUND_OPTIONS: { id: SoundMode; label: string; emoji: string; desc: string }[] = [
  { id: "pop",     label: "Soft Pop",    emoji: "🔵", desc: "Smooth modern pop" },
  { id: "tick",    label: "Mech Tick",   emoji: "⌨️", desc: "Keyboard tactile click" },
  { id: "bubble",  label: "Bubble",      emoji: "💧", desc: "Water drop pop" },
  { id: "chime",   label: "Glass Chime", emoji: "🔔", desc: "Bright bell ring" },
  { id: "swoosh",  label: "Swoosh",      emoji: "🌬️", desc: "Airy modern swipe" },
  { id: "digital", label: "Digital",     emoji: "🤖", desc: "Sci-fi blip" },
  { id: "none",    label: "Silent",      emoji: "🔇", desc: "No sound" },
];

export function getSoundMode(): SoundMode {
  if (typeof window === "undefined") return "pop";
  return (localStorage.getItem("clickSound") as SoundMode) || "pop";
}

export function setSoundMode(mode: SoundMode) {
  if (typeof window !== "undefined") {
    localStorage.setItem("clickSound", mode);
    window.dispatchEvent(new CustomEvent("clickSoundChange", { detail: mode }));
  }
}

// ── 1. Soft Pop (Linear / Apple style) ──────────────────────────────────────
function playSoftPop(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(420 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(880 * pitch, now + 0.014);
  osc.frequency.exponentialRampToValueAtTime(310 * pitch, now + 0.055);
  gain.gain.setValueAtTime(0.13, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.07);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "triangle";
  o2.frequency.setValueAtTime(1600 * pitch, now);
  o2.frequency.exponentialRampToValueAtTime(180, now + 0.02);
  g2.gain.setValueAtTime(0.07, now);
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  o2.connect(g2); g2.connect(ctx.destination);
  o2.start(now); o2.stop(now + 0.03);
}

// ── 2. Mechanical Keyboard Tick ──────────────────────────────────────────────
function playMechTick(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // White noise burst (mechanical transient)
  const bufferSize = Math.floor(ctx.sampleRate * 0.025);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3200 * pitch;
  filter.Q.value = 1.2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.28, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  noise.connect(filter); filter.connect(noiseGain); noiseGain.connect(ctx.destination);
  noise.start(now);

  // Low thud
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.015);
  g.gain.setValueAtTime(0.18, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
  osc.connect(g); g.connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.03);
}

// ── 3. Bubble Water Drop ─────────────────────────────────────────────────────
function playBubble(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(400 * pitch, now + 0.06);
  gain.gain.setValueAtTime(0.0, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.1);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "sine";
  o2.frequency.setValueAtTime(1400 * pitch, now + 0.01);
  o2.frequency.exponentialRampToValueAtTime(600 * pitch, now + 0.07);
  g2.gain.setValueAtTime(0.07, now + 0.01);
  g2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  o2.connect(g2); g2.connect(ctx.destination);
  o2.start(now + 0.01); o2.stop(now + 0.09);
}

// ── 4. Glass Chime Bell ──────────────────────────────────────────────────────
function playChime(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const freqs = [1047 * pitch, 1319 * pitch, 1568 * pitch];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const delay = i * 0.018;
    gain.gain.setValueAtTime(0.0, now + delay);
    gain.gain.linearRampToValueAtTime(0.10 - i * 0.02, now + delay + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.25);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + 0.28);
  });
}

// ── 5. Airy Swoosh ───────────────────────────────────────────────────────────
function playSwoosh(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const bufferSize = Math.floor(ctx.sampleRate * 0.09);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const d = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const env = Math.sin(Math.PI * t) * Math.sin(Math.PI * t);
    d[i] = (Math.random() * 2 - 1) * env * 0.7;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.setValueAtTime(200 * pitch, now);
  lpf.frequency.exponentialRampToValueAtTime(2400 * pitch, now + 0.04);
  lpf.frequency.exponentialRampToValueAtTime(800 * pitch, now + 0.09);

  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 80;

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.22, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  noise.connect(hpf); hpf.connect(lpf); lpf.connect(g); g.connect(ctx.destination);
  noise.start(now);
}

// ── 6. Digital Sci-Fi Blip ───────────────────────────────────────────────────
function playDigital(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(320 * pitch, now);
  osc.frequency.setValueAtTime(640 * pitch, now + 0.02);
  osc.frequency.setValueAtTime(1280 * pitch, now + 0.04);
  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

  const filt = ctx.createBiquadFilter();
  filt.type = "bandpass";
  filt.frequency.value = 800 * pitch;
  filt.Q.value = 3;

  osc.connect(filt); filt.connect(gain); gain.connect(ctx.destination);
  osc.start(now); osc.stop(now + 0.07);
}

// ── Master play dispatcher ────────────────────────────────────────────────────
export function playClickSound(pitch = 1.0, mode?: SoundMode) {
  const soundMode = mode ?? getSoundMode();
  if (soundMode === "none") return;

  try {
    switch (soundMode) {
      case "pop":     playSoftPop(pitch);    break;
      case "tick":    playMechTick(pitch);   break;
      case "bubble":  playBubble(pitch);     break;
      case "chime":   playChime(pitch);      break;
      case "swoosh":  playSwoosh(pitch);     break;
      case "digital": playDigital(pitch);    break;
    }
  } catch {
    // fail silently
  }
}
