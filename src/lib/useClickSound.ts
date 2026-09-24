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
  | "crystal"    // Magical rising crystal sparkle
  | "snap"       // Warm wood snap / finger flick
  | "none";      // Silent (off)

export const SOUND_OPTIONS: { id: SoundMode; label: string; emoji: string; desc: string }[] = [
  { id: "pop",     label: "Soft Pop",    emoji: "🔵", desc: "Smooth modern pop" },
  { id: "tick",    label: "Mech Tick",   emoji: "⌨️", desc: "Keyboard tactile click" },
  { id: "bubble",  label: "Bubble",      emoji: "💧", desc: "Water drop pop" },
  { id: "chime",   label: "Glass Chime", emoji: "🔔", desc: "Bright bell ring" },
  { id: "crystal", label: "Crystal",     emoji: "✨", desc: "Magical sparkle shimmer" },
  { id: "snap",    label: "Wood Snap",   emoji: "🪵", desc: "Warm wooden tap" },
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

// ── 5. Crystal Sparkle Shimmer ───────────────────────────────────────────────
// 5 staggered sine partials with rising frequencies creating a magical
// fairy-dust shimmer effect — very premium and satisfying
function playCrystal(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Staggered rising crystal partials
  const partials = [
    { freq: 1760 * pitch, delay: 0.000, vol: 0.11, dur: 0.18 },
    { freq: 2093 * pitch, delay: 0.016, vol: 0.09, dur: 0.16 },
    { freq: 2637 * pitch, delay: 0.030, vol: 0.07, dur: 0.14 },
    { freq: 3136 * pitch, delay: 0.042, vol: 0.05, dur: 0.12 },
    { freq: 3951 * pitch, delay: 0.052, vol: 0.04, dur: 0.10 },
  ];

  for (const p of partials) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    // Slight inharmonic vibrato for shimmer effect
    osc.frequency.setValueAtTime(p.freq * 0.996, now + p.delay);
    osc.frequency.linearRampToValueAtTime(p.freq * 1.004, now + p.delay + p.dur * 0.4);
    osc.frequency.linearRampToValueAtTime(p.freq, now + p.delay + p.dur);
    gain.gain.setValueAtTime(0.0, now + p.delay);
    gain.gain.linearRampToValueAtTime(p.vol, now + p.delay + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, now + p.delay + p.dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + p.delay);
    osc.stop(now + p.delay + p.dur + 0.01);
  }

  // Soft sparkle transient noise burst
  const bufSize = Math.floor(ctx.sampleRate * 0.018);
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
  }
  const ns = ctx.createBufferSource();
  ns.buffer = buf;
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 5000;
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.06, now);
  ng.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
  ns.connect(hpf); hpf.connect(ng); ng.connect(ctx.destination);
  ns.start(now);
}

// ── 6. Warm Wood Snap / Finger Flick ─────────────────────────────────────────
// A warm, organic percussion click — like snapping fingers or a gentle
// wooden table tap. Very satisfying and pleasant.
function playSnap(pitch = 1.0) {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Pitched thud (low woody body)
  const body = ctx.createOscillator();
  const bodyGain = ctx.createGain();
  body.type = "sine";
  body.frequency.setValueAtTime(180 * pitch, now);
  body.frequency.exponentialRampToValueAtTime(55 * pitch, now + 0.035);
  bodyGain.gain.setValueAtTime(0.22, now);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  body.connect(bodyGain);
  bodyGain.connect(ctx.destination);
  body.start(now);
  body.stop(now + 0.055);

  // Sharp attack transient (the snap crack)
  const crack = ctx.createOscillator();
  const crackGain = ctx.createGain();
  crack.type = "triangle";
  crack.frequency.setValueAtTime(900 * pitch, now);
  crack.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.012);
  crackGain.gain.setValueAtTime(0.15, now);
  crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
  crack.connect(crackGain);
  crackGain.connect(ctx.destination);
  crack.start(now);
  crack.stop(now + 0.02);

  // Warm noise burst (wood texture)
  const bufSize = Math.floor(ctx.sampleRate * 0.022);
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2.5) * 0.6;
  }
  const nSrc = ctx.createBufferSource();
  nSrc.buffer = buf;
  const lpf = ctx.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 2800;
  const nGain = ctx.createGain();
  nGain.gain.setValueAtTime(0.18, now);
  nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
  nSrc.connect(lpf); lpf.connect(nGain); nGain.connect(ctx.destination);
  nSrc.start(now);
}

// ── Master play dispatcher ────────────────────────────────────────────────────
export function playClickSound(pitch = 1.0, mode?: SoundMode) {
  const soundMode = mode ?? getSoundMode();
  if (soundMode === "none") return;

  try {
    switch (soundMode) {
      case "pop":     playSoftPop(pitch);   break;
      case "tick":    playMechTick(pitch);  break;
      case "bubble":  playBubble(pitch);    break;
      case "chime":   playChime(pitch);     break;
      case "crystal": playCrystal(pitch);   break;
      case "snap":    playSnap(pitch);      break;
    }
  } catch {
    // fail silently
  }
}
