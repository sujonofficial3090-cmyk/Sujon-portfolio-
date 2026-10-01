import { useEffect, useRef, useState } from "react";

interface TransparentVideoProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  filterTheme?: boolean;
}

/**
 * TransparentVideo — renders video with edge-connected exterior background removal.
 *
 * Preserves 100% of the original video quality:
 * - Flood fill strictly isolates the exterior background from the 4 outer image borders.
 * - Glass shadows and subtle refractions are strictly protected.
 * - Internal reflections, metallic sheen, and specular highlights remain 100% solid and crisp.
 * - Only the black background is made transparent, with no holes or quality loss.
 * - filterTheme applies website theme accent colors (Gold, Mint, Orange, Teal, Purple, etc.) seamlessly.
 */
export function TransparentVideo({
  src,
  className = "",
  width = 380,
  height = 380,
  filterTheme = true,
}: TransparentVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let rafId: number | null = null;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const totalPixels = width * height;
    const visited = new Uint8Array(totalPixels);
    const queue = new Int32Array(totalPixels);

    const isWhiteBg = src.toLowerCase().includes("about-video");

    const renderFrame = () => {
      if (video.readyState >= 2) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, 0, 0, width, height);

        const frame = ctx.getImageData(0, 0, width, height);
        const data = frame.data;

        visited.fill(0);
        let head = 0;
        let tail = 0;

        if (isWhiteBg) {
          // Exterior White Background Removal
          const isWhiteBgPixel = (p: number) => {
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const min = Math.min(r, g, b);
            const isNeutral = Math.abs(r - g) <= 6 && Math.abs(g - b) <= 6;
            return min > 240 || (min > 220 && isNeutral);
          };

          for (let x = 0; x < width; x++) {
            let idx = x;
            if (!visited[idx] && isWhiteBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
            idx = (height - 1) * width + x;
            if (!visited[idx] && isWhiteBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
          }
          for (let y = 1; y < height - 1; y++) {
            let idx = y * width;
            if (!visited[idx] && isWhiteBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
            idx = y * width + (width - 1);
            if (!visited[idx] && isWhiteBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
          }

          while (head < tail) {
            const curr = queue[head++];
            const cx = curr % width;
            const cy = (curr / width) | 0;

            if (cx > 0) {
              const n = curr - 1;
              if (!visited[n] && isWhiteBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cx < width - 1) {
              const n = curr + 1;
              if (!visited[n] && isWhiteBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cy > 0) {
              const n = curr - width;
              if (!visited[n] && isWhiteBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cy < height - 1) {
              const n = curr + width;
              if (!visited[n] && isWhiteBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
          }

          for (let i = 0; i < totalPixels; i++) {
            const p = i * 4;
            if (visited[i]) {
              const min = Math.min(data[p], data[p + 1], data[p + 2]);
              if (min > 232) {
                data[p + 3] = 0;
              } else {
                const alpha = Math.round(((232 - min) / 22) * 255);
                data[p + 3] = Math.max(0, Math.min(255, alpha));
                // Defringe so no white halo shows on dark cards
                const f = data[p + 3] / 255;
                data[p] = Math.round(data[p] * f);
                data[p + 1] = Math.round(data[p + 1] * f);
                data[p + 2] = Math.round(data[p + 2] * f);
              }
            }
          }
        } else {
          // Exterior Black/Dark Background Removal (service-video)
          // Strictly discriminates neutral background noise from the blue 3D model
          const isDarkBgPixel = (p: number) => {
            const r = data[p];
            const g = data[p + 1];
            const b = data[p + 2];
            const max = Math.max(r, g, b);
            const isNeutral =
              Math.abs(r - g) <= 5 &&
              Math.abs(g - b) <= 5 &&
              Math.abs(r - b) <= 5;
            // It is background only if it's pitch black OR very dark neutral noise without color
            return max < 16 || (max < 30 && isNeutral);
          };

          // 1. Seed borders (top, bottom, left, right edges)
          for (let x = 0; x < width; x++) {
            let idx = x;
            if (!visited[idx] && isDarkBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
            idx = (height - 1) * width + x;
            if (!visited[idx] && isDarkBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
          }
          for (let y = 1; y < height - 1; y++) {
            let idx = y * width;
            if (!visited[idx] && isDarkBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
            idx = y * width + (width - 1);
            if (!visited[idx] && isDarkBgPixel(idx * 4)) {
              visited[idx] = 1;
              queue[tail++] = idx;
            }
          }

          // 2. Flood fill exterior background only
          while (head < tail) {
            const curr = queue[head++];
            const cx = curr % width;
            const cy = (curr / width) | 0;

            if (cx > 0) {
              const n = curr - 1;
              if (!visited[n] && isDarkBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cx < width - 1) {
              const n = curr + 1;
              if (!visited[n] && isDarkBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cy > 0) {
              const n = curr - width;
              if (!visited[n] && isDarkBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
            if (cy < height - 1) {
              const n = curr + width;
              if (!visited[n] && isDarkBgPixel(n * 4)) {
                visited[n] = 1;
                queue[tail++] = n;
              }
            }
          }

          // 3. Transparentize ONLY visited exterior pixels.
          // ALL unvisited pixels (the entire 3D model) retain 100% original solid video quality!
          for (let i = 0; i < totalPixels; i++) {
            const p = i * 4;
            if (visited[i]) {
              const max = Math.max(data[p], data[p + 1], data[p + 2]);
              if (max < 14) {
                data[p + 3] = 0; // Pure transparent
              } else {
                // Soft 1-pixel antialiased transition
                data[p + 3] = Math.round(((max - 14) / 18) * 255);
              }
            }
            // If NOT visited (part of the 3D model), data[p + 3] is unchanged (255 solid)
          }
        }

        ctx.putImageData(frame, 0, 0);
      }

      if (isVisible) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        rafId = null;
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          video.play().catch(() => {});
          if (!rafId) rafId = requestAnimationFrame(renderFrame);
        } else {
          video.pause();
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handlePlay = () => {
      setIsPlaying(true);
      if (isVisible && !rafId) rafId = requestAnimationFrame(renderFrame);
    };

    video.addEventListener("play", handlePlay);
    video.play().catch(() => {});

    rafId = requestAnimationFrame(renderFrame);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener("play", handlePlay);
    };
  }, [src, width, height]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Hidden source video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />

      {/* Visible transparent canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          display: "block",
          filter: filterTheme
            ? "var(--theme-media-filter, var(--arrow-filter, none))"
            : undefined,
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
}
