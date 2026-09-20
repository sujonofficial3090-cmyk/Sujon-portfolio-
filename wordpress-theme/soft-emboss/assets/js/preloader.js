/**
 * Soft Emboss Studio — Standalone Luxury Preloader Engine
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const preloader = document.getElementById("se-site-preloader");
    if (!preloader) return;

    const progressFill = document.getElementById("se-preloader-fill");
    const percentEl = document.getElementById("se-preloader-percent");
    const phaseEl = document.getElementById("se-preloader-phase");
    const curtainTop = document.getElementById("se-curtain-top");
    const curtainBottom = document.getElementById("se-curtain-bottom");
    const centerBox = document.getElementById("se-preloader-center");

    const duration = 1900; // 1.9s smooth duration
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const eased = Math.sin((progressRatio * Math.PI) / 2);
      const percent = Math.floor(eased * 100);

      if (progressFill) progressFill.style.width = percent + "%";
      if (percentEl) percentEl.textContent = (percent < 10 ? "0" : "") + percent + "%";

      if (phaseEl) {
        if (percent < 30) {
          phaseEl.textContent = "INITIALIZING ENVIRONMENT";
        } else if (percent < 65) {
          phaseEl.textContent = "LOADING ASSETS & SHADERS";
        } else if (percent < 92) {
          phaseEl.textContent = "CONFIGURING 3D MATRIX";
        } else {
          phaseEl.textContent = "WELCOME";
        }
      }

      if (progressRatio < 1) {
        requestAnimationFrame(update);
      } else {
        // Completed - Hold briefly then trigger cinematic split curtain exit
        setTimeout(function () {
          if (centerBox) {
            centerBox.style.opacity = "0";
            centerBox.style.transform = "scale(1.08) translateY(-10px)";
          }
          if (curtainTop) curtainTop.style.transform = "translateY(-101%)";
          if (curtainBottom) curtainBottom.style.transform = "translateY(101%)";

          setTimeout(function () {
            preloader.style.display = "none";
            document.body.style.overflow = "";
          }, 850);
        }, 300);
      }
    }

    requestAnimationFrame(update);
  });
})();
