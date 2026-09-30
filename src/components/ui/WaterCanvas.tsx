import { useRef, useCallback, useEffect, useState } from "react";

/**
 * WaterCanvas — physics-based water ripple overlay.
 *
 * Strategy: renders a fully transparent canvas on top of a normal <img>.
 * On hover, it reads the image pixels (via an offscreen copy) and applies
 * the height-map displacement, then putImageData onto the visible canvas
 * (which has a transparent background). The original <img> sits beneath
 * the canvas and handles all its normal CSS sizing/object-fit.
 */

interface WaterCanvasProps {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
  /** Applied to the outer wrapper <div> */
  className?: string;
  /** Applied to the fallback <img> and, once ready, the canvas */
  imgClassName?: string;
}

export function WaterCanvas({
  src,
  alt,
  loading = "lazy",
  className = "",
  imgClassName = "w-full object-cover block",
}: WaterCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offRef = useRef<HTMLCanvasElement | null>(null);   // offscreen copy of img
  const rafRef = useRef<number | null>(null);
  const buf1Ref = useRef<Int32Array | null>(null);
  const buf2Ref = useRef<Int32Array | null>(null);
  const wRef = useRef(0);
  const hRef = useRef(0);
  const activeRef = useRef(false);
  const [ready, setReady] = useState(false);

  /* ── Build offscreen copy & size the canvas ──────────────── */
  const init = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !img.naturalWidth) return;

    const W = wrap.clientWidth || img.clientWidth || img.naturalWidth;
    const aspect = img.naturalHeight / img.naturalWidth;
    const H = Math.round(W * (aspect || 0.75));

    wRef.current = W;
    hRef.current = H;
    canvas.width = W;
    canvas.height = H;

    buf1Ref.current = new Int32Array(W * H);
    buf2Ref.current = new Int32Array(W * H);

    // Offscreen canvas — permanent pixel source
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    off.getContext("2d")!.drawImage(img, 0, 0, W, H);
    offRef.current = off;

    setReady(true);
  }, []);

  /* ── Water drop ──────────────────────────────────────────── */
  const drop = useCallback(
    (x: number, y: number, r: number, strength: number) => {
      const buf = buf1Ref.current;
      const W = wRef.current;
      const H = hRef.current;
      if (!buf || !W || !H) return;
      const ir = Math.ceil(r);
      for (let dy = -ir; dy <= ir; dy++) {
        for (let dx = -ir; dx <= ir; dx++) {
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d >= r) continue;
          const nx = (x | 0) + dx;
          const ny = (y | 0) + dy;
          if (nx >= 0 && nx < W && ny >= 0 && ny < H)
            buf[ny * W + nx] += ((strength * (1 - d / r)) | 0);
        }
      }
    },
    []
  );

  /* ── Physics + render tick ───────────────────────────────── */
  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const off = offRef.current;
    if (!canvas || !off) return;

    const W = wRef.current;
    const H = hRef.current;
    let cur = buf1Ref.current!;
    let prv = buf2Ref.current!;
    const isHovering = activeRef.current;

    // Wave propagation
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const i = y * W + x;
        prv[i] =
          ((cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) >> 1) - prv[i];
        if (isHovering) {
          prv[i] -= prv[i] >> 5; // original gentle damping while hovering
        } else {
          prv[i] -= prv[i] >> 3; // faster damping after mouse leave (finishes in ~1-1.5s)
        }
      }
    }
    buf1Ref.current = prv;
    buf2Ref.current = cur;
    cur = buf1Ref.current;

    // Render displaced pixels (preserve alpha channel)
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    const srcPx = off.getContext("2d")!.getImageData(0, 0, W, H).data;
    const out = ctx.createImageData(W, H);
    const op = out.data;

    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        const i = y * W + x;
        const dx = (cur[i - 1] - cur[i + 1]) >> 3;
        const dy = (cur[i - W] - cur[i + W]) >> 3;
        let sx = x + dx;
        let sy = y + dy;
        sx = sx < 0 ? 0 : sx >= W ? W - 1 : sx;
        sy = sy < 0 ? 0 : sy >= H ? H - 1 : sy;
        const s = (sy * W + sx) * 4;
        const d4 = i * 4;
        op[d4] = srcPx[s];
        op[d4 + 1] = srcPx[s + 1];
        op[d4 + 2] = srcPx[s + 2];
        op[d4 + 3] = srcPx[s + 3]; // ← preserve alpha!
      }
    }
    ctx.clearRect(0, 0, W, H);
    ctx.putImageData(out, 0, 0);

    const alive = isHovering
      ? cur.some((v) => v > 1 || v < -1)
      : cur.some((v) => v > 4 || v < -4);

    if (isHovering || alive) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
      ctx.clearRect(0, 0, W, H); // fully transparent → base img shows
    }
  }, []);

  const startLoop = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  /* ── Mouse / touch helpers ───────────────────────────────── */
  const coords = (e: React.MouseEvent | React.TouchEvent): [number, number] => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const sx = wRef.current / (rect.width || 1);
    const sy = hRef.current / (rect.height || 1);
    if ("touches" in e) {
      const t = e.touches[0];
      return [(t.clientX - rect.left) * sx, (t.clientY - rect.top) * sy];
    }
    return [(e.clientX - rect.left) * sx, (e.clientY - rect.top) * sy];
  };

  const onEnter = useCallback(
    (e: React.MouseEvent) => {
      if (!ready) return;
      activeRef.current = true;
      const [x, y] = coords(e);
      drop(x, y, 24, 350);
      startLoop();
    },
    [ready, drop, startLoop]
  );

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ready || !activeRef.current) return;
      const [x, y] = coords(e);
      drop(x, y, 7, 90);
    },
    [ready, drop]
  );

  const onLeave = useCallback(() => {
    activeRef.current = false;
  }, []);

  // Handle cached images
  useEffect(() => {
    const imgs = wrapRef.current?.querySelectorAll("img");
    imgs?.forEach((img) => {
      if (img.complete && img.naturalWidth) init(img as HTMLImageElement);
    });
  }, [init, src]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ cursor: "crosshair", lineHeight: 0 }}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Base image — always visible, handles all CSS sizing */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        crossOrigin="anonymous"
        className={imgClassName}
        style={{ display: "block" }}
        onLoad={(e) => init(e.currentTarget)}
      />

      {/* Canvas overlay — transparent background, only shows displaced pixels on hover */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",        // let mouse events pass through to the div
          display: ready ? "block" : "none",
          background: "transparent",   // NEVER add any fill color
        }}
      />
    </div>
  );
}
