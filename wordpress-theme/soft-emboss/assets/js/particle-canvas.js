/**
 * Soft Emboss Studio — 3D Particle Letter Interactive Canvas Engine
 */
(function () {
  "use strict";

  window.initParticleLetterCanvas = function (canvasId, targetLetter) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : 500);
    let height = (canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : 500);

    const letter = targetLetter || canvas.getAttribute("data-letter") || "S";
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: 90 };

    class Particle {
      constructor(destX, destY, color) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.destX = destX;
        this.destY = destY;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.accX = 0;
        this.accY = 0;
        this.friction = 0.88;
        this.spring = 0.08;
        this.radius = Math.random() * 2 + 1.6;
        this.color = color;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.accX -= Math.cos(angle) * force * 7;
          this.accY -= Math.sin(angle) * force * 7;
        }

        this.accX += (this.destX - this.x) * this.spring;
        this.accY += (this.destY - this.y) * this.spring;

        this.vx = (this.vx + this.accX) * this.friction;
        this.vy = (this.vy + this.accY) * this.friction;

        this.x += this.vx;
        this.y += this.vy;

        this.accX = 0;
        this.accY = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function sampleLetterPoints() {
      particles = [];
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      const fontSize = Math.min(width, height) * 0.75;
      offCtx.font = "900 " + fontSize + "px 'Funnel Display', 'Poppins', sans-serif";
      offCtx.fillStyle = "#ffffff";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(letter, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const step = Math.max(5, Math.floor(width / 75));

      const brandColor = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#00FD90";

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (imgData[index + 3] > 140) {
            const isHighlight = Math.random() > 0.65;
            const color = isHighlight ? "#FFFFFF" : brandColor;
            particles.push(new Particle(x, y, color));
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings behind particles
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width * 0.38, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 500;
      sampleLetterPoints();
    }

    window.addEventListener("resize", handleResize);

    canvas.addEventListener("mousemove", function (e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    sampleLetterPoints();
    animate();
  };

  document.addEventListener("DOMContentLoaded", function () {
    const canvasList = document.querySelectorAll(".se-particle-canvas");
    canvasList.forEach(function (c) {
      if (c.id) {
        window.initParticleLetterCanvas(c.id, c.getAttribute("data-letter"));
      }
    });
  });
})();
