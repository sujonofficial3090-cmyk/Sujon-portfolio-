import React, { useEffect, useRef } from "react";

interface WorldGlobeSProps {
  className?: string;
}

export function WorldGlobeS({ className }: WorldGlobeSProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let rotY = 0;
    let dragVelocity = 0;
    let isDragging = false;
    let lastMouseX = 0;

    // Earth's natural axial tilt (~23.44 degrees)
    const TILT = (23.44 * Math.PI) / 180;
    const cosTilt = Math.cos(TILT);
    const sinTilt = Math.sin(TILT);

    // Natural Earth Geographic Data Points (Realistic Landmass Density)
    interface GeoPoint {
      lat: number;
      lon: number;
      size: number;
      type: "land" | "city" | "coast";
    }

    const earthPoints: GeoPoint[] = [];

    function addLand(
      minLat: number,
      maxLat: number,
      minLon: number,
      maxLon: number,
      count: number,
      filter?: (lat: number, lon: number) => boolean
    ) {
      for (let i = 0; i < count; i++) {
        const latDeg = minLat + Math.random() * (maxLat - minLat);
        const lonDeg = minLon + Math.random() * (maxLon - minLon);
        if (filter && !filter(latDeg, lonDeg)) continue;

        const isCity = Math.random() > 0.88;
        earthPoints.push({
          lat: (latDeg * Math.PI) / 180,
          lon: (lonDeg * Math.PI) / 180,
          size: isCity ? 1.6 + Math.random() * 0.8 : 1.05 + Math.random() * 1.1,
          type: isCity ? "city" : "land",
        });
      }
    }

    // --- ACCURATE REALISTIC EARTH CONTINENTS ---
    // North America (Canada, USA, Mexico, Alaska)
    addLand(15, 68, -135, -55, 420, (lat, lon) => {
      if (lat > 50 && lon > -75) return Math.random() > 0.6; // Hudson bay
      if (lat < 25 && lon < -105) return false; // Pacific ocean cut
      return true;
    });

    // Central America & Caribbean
    addLand(8, 22, -92, -62, 70);

    // South America (Brazil, Andes, Amazon, Argentina, Chile)
    addLand(-54, 12, -80, -35, 340, (lat, lon) => {
      const taper = (lat + 54) / 66; // Tapers toward Cape Horn
      return Math.abs(lon - (-60)) < 24 * Math.max(0.2, taper);
    });

    // Europe (British Isles, Scandinavia, Mediterranean, Central Europe)
    addLand(36, 70, -10, 40, 360, (lat, lon) => {
      if (lat < 42 && lon < 0 && lon > -5) return Math.random() > 0.3;
      return true;
    });

    // British Isles & Ireland
    addLand(50, 59, -10, 2, 70);

    // Africa (North Sahara, West Africa, Central, Horn, Southern)
    addLand(-35, 36, -18, 52, 460, (lat, lon) => {
      if (lat < 0) {
        // Taper south
        return Math.abs(lon - 24) < 22 * ((lat + 35) / 35);
      }
      return true;
    });

    // Madagascar
    addLand(-25, -12, 44, 50, 35);

    // Asia (Middle East, India, China, Russia / Siberia, SE Asia)
    addLand(5, 75, 42, 145, 750, (lat, lon) => {
      if (lat < 22 && lon < 68 && lon > 55) return false; // Arabian Sea
      if (lat < 8 && lon < 100) return false; // Indian Ocean
      return true;
    });

    // Indian Subcontinent
    addLand(8, 30, 68, 90, 160, (lat, lon) => {
      const taper = (lat - 8) / 22;
      return Math.abs(lon - 79) < 14 * taper;
    });

    // Japan & East Asian Island Arc
    addLand(30, 46, 128, 146, 90);

    // Southeast Asia & Indonesia / Philippines
    addLand(-10, 20, 95, 130, 150);

    // Australia & New Zealand
    addLand(-42, -10, 112, 155, 260, (lat, lon) => {
      return lat < -12 && lon > 113 && lon < 154;
    });
    addLand(-46, -34, 165, 178, 45); // New Zealand

    // Greenland & High Arctic
    addLand(60, 82, -55, -20, 120);

    // Major Global Cities with Longitude/Latitude
    const CITIES = [
      { name: "Dhaka", lat: (23.8 * Math.PI) / 180, lon: (90.4 * Math.PI) / 180 },
      { name: "London", lat: (51.5 * Math.PI) / 180, lon: (-0.12 * Math.PI) / 180 },
      { name: "New York", lat: (40.7 * Math.PI) / 180, lon: (-74.0 * Math.PI) / 180 },
      { name: "San Francisco", lat: (37.7 * Math.PI) / 180, lon: (-122.4 * Math.PI) / 180 },
      { name: "Tokyo", lat: (35.6 * Math.PI) / 180, lon: (139.6 * Math.PI) / 180 },
      { name: "Sydney", lat: (-33.8 * Math.PI) / 180, lon: (151.2 * Math.PI) / 180 },
      { name: "Dubai", lat: (25.2 * Math.PI) / 180, lon: (55.3 * Math.PI) / 180 },
      { name: "Frankfurt", lat: (50.1 * Math.PI) / 180, lon: (8.68 * Math.PI) / 180 },
    ];

    const CONNECTIONS = [
      { from: 0, to: 6 }, // Dhaka -> Dubai
      { from: 6, to: 7 }, // Dubai -> Frankfurt
      { from: 7, to: 1 }, // Frankfurt -> London
      { from: 1, to: 2 }, // London -> New York
      { from: 2, to: 3 }, // New York -> SF
      { from: 0, to: 4 }, // Dhaka -> Tokyo
      { from: 4, to: 5 }, // Tokyo -> Sydney
    ];

    function getThemeColor() {
      const accent = document.documentElement.getAttribute("data-accent") || "gold";
      switch (accent) {
        case "orange":
          return {
            primary: "#F97316",
            light: "#FED7AA",
            deep: "#EA580C",
            rgb: "249, 115, 22",
            atmo: "rgba(249, 115, 22, 0.25)",
            land: "#34D399",
          };
        case "blue":
          return {
            primary: "#38BDF8",
            light: "#E0F2FE",
            deep: "#0284C7",
            rgb: "56, 189, 248",
            atmo: "rgba(56, 189, 248, 0.28)",
            land: "#10B981",
          };
        case "purple":
          return {
            primary: "#A78BFA",
            light: "#EDE9FE",
            deep: "#7C3AED",
            rgb: "167, 139, 250",
            atmo: "rgba(167, 139, 250, 0.26)",
            land: "#34D399",
          };
        case "teal":
          return {
            primary: "#2DD4BF",
            light: "#CCFBF1",
            deep: "#0F766E",
            rgb: "45, 212, 191",
            atmo: "rgba(45, 212, 191, 0.26)",
            land: "#10B981",
          };
        case "mint":
          return {
            primary: "#00FD90",
            light: "#D1FAE5",
            deep: "#059669",
            rgb: "0, 253, 144",
            atmo: "rgba(0, 253, 144, 0.25)",
            land: "#34D399",
          };
        case "gold":
        default:
          return {
            primary: "#FBBF24",
            light: "#FEF3C7",
            deep: "#D97706",
            rgb: "251, 191, 36",
            atmo: "rgba(251, 191, 36, 0.24)",
            land: "#10B981",
          };
      }
    }

    function handleResize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(rect.width);
      height = Math.round(rect.height);
      if (width <= 0 || height <= 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    handleResize();
    const resizeObs = new ResizeObserver(handleResize);
    resizeObs.observe(container);

    const intersectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animId);
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.1 }
    );
    intersectionObs.observe(container);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      dragVelocity = 0;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      lastMouseX = e.clientX;
      rotY += deltaX * 0.007;
      dragVelocity = deltaX * 0.0035;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        dragVelocity = 0;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - lastMouseX;
      lastMouseX = e.touches[0].clientX;
      rotY += deltaX * 0.007;
      dragVelocity = deltaX * 0.0035;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    function project(x: number, y: number, z: number, radius: number, cx: number, cy: number) {
      const cosR = Math.cos(rotY);
      const sinR = Math.sin(rotY);
      const rx = x * cosR + z * sinR;
      const ry = y;
      const rz = -x * sinR + z * cosR;

      const tx = rx * cosTilt - ry * sinTilt;
      const ty = rx * sinTilt + ry * cosTilt;
      const tz = rz;

      const fov = 600;
      const scale = fov / (fov + tz * radius);
      return {
        px: cx + tx * radius * scale,
        py: cy + ty * radius * scale,
        pz: tz,
        scale,
      };
    }

    let time = 0;

    function render() {
      if (!ctx || !isVisible || width <= 0 || height <= 0) return;
      time += 0.016;

      if (!isDragging) {
        rotY += 0.0065 + dragVelocity;
        dragVelocity *= 0.94;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      // Precision calibrated radius guaranteeing 100% full view with zero edge-cropping
      const globeRadius = Math.min(width, height) * 0.32;
      const colors = getThemeColor();

      // --- 1. REALISTIC RAYLEIGH ATMOSPHERIC CORONA (Blue/Theme haze around Earth) ---
      const atmoGrad = ctx.createRadialGradient(cx, cy, globeRadius * 0.88, cx, cy, globeRadius * 1.16);
      atmoGrad.addColorStop(0, colors.atmo);
      atmoGrad.addColorStop(0.5, `rgba(${colors.rgb}, 0.05)`);
      atmoGrad.addColorStop(1, "transparent");
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.16, 0, Math.PI * 2);
      ctx.fill();

      // --- 2. NATURAL DEEP OCEAN SPHERE (Sunlit Day-to-Night Terminator) ---
      // Sun vector from top-left
      const sunX = cx - globeRadius * 0.35;
      const sunY = cy - globeRadius * 0.35;

      const oceanGrad = ctx.createRadialGradient(sunX, sunY, globeRadius * 0.1, cx, cy, globeRadius);
      oceanGrad.addColorStop(0, "rgba(16, 32, 54, 0.45)"); // Sunlit deep ocean
      oceanGrad.addColorStop(0.65, "rgba(7, 14, 28, 0.6)"); // Mid depth ocean
      oceanGrad.addColorStop(1, "rgba(3, 7, 18, 0.78)"); // Deep space limb
      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.fill();

      // Delicate horizon atmospheric edge
      ctx.strokeStyle = `rgba(${colors.rgb}, 0.35)`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.stroke();

      // --- 3. BACK-SIDE EARTH LANDMASS POINTS (pz < 0) ---
      for (let i = 0; i < earthPoints.length; i++) {
        const pt = earthPoints[i];
        const y = Math.sin(pt.lat);
        const rLat = Math.cos(pt.lat);
        const x = Math.cos(pt.lon) * rLat;
        const z = Math.sin(pt.lon) * rLat;
        const p = project(x, y, z, globeRadius, cx, cy);

        if (p.pz < 0) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, pt.size * 0.6 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${colors.rgb}, 0.1)`;
          ctx.fill();
        }
      }

      // --- 4. BACK-SIDE LATITUDE & LONGITUDE GRID WIRES ---
      const latAngles = [-45, -20, 0, 20, 45].map((d) => (d * Math.PI) / 180);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(${colors.rgb}, 0.05)`;

      for (const lat of latAngles) {
        const y = Math.sin(lat);
        const rLat = Math.cos(lat);
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= 36; s++) {
          const lon = (s / 36) * Math.PI * 2;
          const x = Math.cos(lon) * rLat;
          const z = Math.sin(lon) * rLat;
          const p = project(x, y, z, globeRadius, cx, cy);
          if (p.pz <= 0.04) {
            if (!started) {
              ctx.moveTo(p.px, p.py);
              started = true;
            } else {
              ctx.lineTo(p.px, p.py);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // --- 5. THE CORE SCULPTED & ILLUMINATED "S" EMBLEM ---
      const sFloatY = Math.sin(time * 1.8) * 3;
      const sCenterY = cy + sFloatY;
      const sCenterX = cx;

      // Volumetric core glow radiating outward through the continents
      const coreGlow = ctx.createRadialGradient(sCenterX, sCenterY, 5, sCenterX, sCenterY, globeRadius * 0.58);
      coreGlow.addColorStop(0, `rgba(${colors.rgb}, 0.38)`);
      coreGlow.addColorStop(0.55, `rgba(${colors.rgb}, 0.12)`);
      coreGlow.addColorStop(1, "transparent");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(sCenterX, sCenterY, globeRadius * 0.58, 0, Math.PI * 2);
      ctx.fill();

      // Sculpted Luxury Letter "S"
      ctx.save();
      const fontSize = Math.round(globeRadius * 1.05);
      ctx.font = `800 ${fontSize}px "Funnel Display", "Poppins", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Depth drop shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.fillText("S", sCenterX + 2.5, sCenterY + 3.5);

      // Deep metallic bevel
      ctx.fillStyle = colors.deep;
      ctx.fillText("S", sCenterX + 1, sCenterY + 1.2);

      // Gradient face
      const sTextGrad = ctx.createLinearGradient(
        sCenterX,
        sCenterY - globeRadius * 0.45,
        sCenterX,
        sCenterY + globeRadius * 0.45
      );
      sTextGrad.addColorStop(0, colors.light);
      sTextGrad.addColorStop(0.5, colors.primary);
      sTextGrad.addColorStop(1, colors.deep);
      ctx.fillStyle = sTextGrad;
      ctx.fillText("S", sCenterX, sCenterY);

      // Top specular light
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fillText("S", sCenterX, sCenterY - 1);
      ctx.restore();

      // --- 6. FRONT-SIDE NATURAL EARTH CONTINENTS (pz > 0) ---
      for (let i = 0; i < earthPoints.length; i++) {
        const pt = earthPoints[i];
        const y = Math.sin(pt.lat);
        const rLat = Math.cos(pt.lat);
        const x = Math.cos(pt.lon) * rLat;
        const z = Math.sin(pt.lon) * rLat;
        const p = project(x, y, z, globeRadius, cx, cy);

        if (p.pz >= 0) {
          const depthAlpha = p.pz * 0.75 + 0.25;
          const radius = pt.size * p.scale;

          ctx.beginPath();
          ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);

          if (pt.type === "city") {
            // Golden glowing city lights
            ctx.fillStyle = `rgba(253, 224, 71, ${depthAlpha * 0.95})`;
          } else {
            // Natural landmass coloring with thematic aura
            ctx.fillStyle = p.pz > 0.45 ? colors.light : `rgba(${colors.rgb}, ${depthAlpha * 0.85})`;
          }
          ctx.fill();
        }
      }

      // --- 7. PULSING CAPITAL TECH HUBS (Living Global Network) ---
      for (let h = 0; h < CITIES.length; h++) {
        const hub = CITIES[h];
        const y = Math.sin(hub.lat);
        const rLat = Math.cos(hub.lat);
        const x = Math.cos(hub.lon) * rLat;
        const z = Math.sin(hub.lon) * rLat;
        const p = project(x, y, z, globeRadius, cx, cy);

        if (p.pz > 0.08) {
          const pulse = (Math.sin(time * 3.2 + h * 0.8) + 1) * 0.5;
          // Radar pulse ring
          ctx.beginPath();
          ctx.arc(p.px, p.py, (4 + pulse * 4.5) * p.scale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.rgb}, ${0.6 * (1 - pulse)})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Hub luminous center
          ctx.beginPath();
          ctx.arc(p.px, p.py, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = colors.light;
          ctx.shadowColor = colors.primary;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // --- 8. 3D CURVED FLIGHT / GLOBAL DATA ARCS ---
      for (let c = 0; c < CONNECTIONS.length; c++) {
        const conn = CONNECTIONS[c];
        const fromHub = CITIES[conn.from];
        const toHub = CITIES[conn.to];

        const y1 = Math.sin(fromHub.lat), r1 = Math.cos(fromHub.lat);
        const x1 = Math.cos(fromHub.lon) * r1, z1 = Math.sin(fromHub.lon) * r1;
        const p1 = project(x1, y1, z1, globeRadius, cx, cy);

        const y2 = Math.sin(toHub.lat), r2 = Math.cos(toHub.lat);
        const x2 = Math.cos(toHub.lon) * r2, z2 = Math.sin(toHub.lon) * r2;
        const p2 = project(x2, y2, z2, globeRadius, cx, cy);

        if (p1.pz > -0.15 || p2.pz > -0.15) {
          const midX = (x1 + x2) * 0.5;
          const midY = (y1 + y2) * 0.5;
          const midZ = (z1 + z2) * 0.5;
          const midLen = Math.sqrt(midX * midX + midY * midY + midZ * midZ) || 1;
          const arcAltitude = 1.08;
          const archX = (midX / midLen) * arcAltitude;
          const archY = (midY / midLen) * arcAltitude;
          const archZ = (midZ / midLen) * arcAltitude;
          const pMid = project(archX, archY, archZ, globeRadius, cx, cy);

          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.quadraticCurveTo(pMid.px, pMid.py, p2.px, p2.py);
          ctx.strokeStyle = `rgba(${colors.rgb}, 0.22)`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Traveling photon comet
          const travelT = (time * 0.42 + c * 0.16) % 1;
          const curveX =
            (1 - travelT) * (1 - travelT) * p1.px + 2 * (1 - travelT) * travelT * pMid.px + travelT * travelT * p2.px;
          const curveY =
            (1 - travelT) * (1 - travelT) * p1.py + 2 * (1 - travelT) * travelT * pMid.px + travelT * travelT * p2.py;

          ctx.beginPath();
          ctx.arc(curveX, curveY, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = colors.light;
          ctx.shadowColor = colors.primary;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // --- 9. EQUATORIAL ORBIT RING WITH SATELLITE ---
      const orbitRadius = globeRadius * 1.12;
      ctx.beginPath();
      for (let s = 0; s <= 48; s++) {
        const angle = (s / 48) * Math.PI * 2;
        const ox = Math.cos(angle);
        const oz = Math.sin(angle);
        const pt = project(ox, 0, oz, orbitRadius, cx, cy);
        if (s === 0) ctx.moveTo(pt.px, pt.py);
        else ctx.lineTo(pt.px, pt.py);
      }
      ctx.strokeStyle = `rgba(${colors.rgb}, 0.16)`;
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      const satAngle = time * 0.75;
      const satPt = project(Math.cos(satAngle), 0, Math.sin(satAngle), orbitRadius, cx, cy);
      ctx.beginPath();
      ctx.arc(satPt.px, satPt.py, 3, 0, Math.PI * 2);
      ctx.fillStyle = colors.light;
      ctx.shadowColor = colors.primary;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      intersectionObs.disconnect();
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible ${
        className || "h-[340px] sm:h-[380px] lg:h-[400px] w-full"
      }`}
      title="Natural 3D Earth Globe — Drag to rotate"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
    </div>
  );
}
