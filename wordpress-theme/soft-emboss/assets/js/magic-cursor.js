/**
 * Soft Emboss Studio — Custom Fluid Cursor & Ripple Engine
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const dot = document.getElementById("se-cursor-dot");
    const ring = document.getElementById("se-cursor-ring");

    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";

      requestAnimationFrame(renderRing);
    }
    requestAnimationFrame(renderRing);

    // Interactive Hover Elements (links, buttons, inputs)
    const interactiveSelector = "a, button, input, textarea, .se-btn, .se-card, .elementor-clickable";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(interactiveSelector)) {
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.borderColor = "var(--brand)";
        ring.style.backgroundColor = "rgba(var(--brand-rgb), 0.08)";
        dot.style.transform = "translate(-50%, -50%) scale(1.5)";
      }
    });

    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(interactiveSelector)) {
        ring.style.width = "34px";
        ring.style.height = "34px";
        ring.style.borderColor = "rgba(var(--brand-rgb), 0.45)";
        ring.style.backgroundColor = "transparent";
        dot.style.transform = "translate(-50%, -50%) scale(1)";
      }
    });

    // Click Ripple Effect
    document.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "se-click-ripple";
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "6px";
      ripple.style.height = "6px";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "var(--brand)";
      ripple.style.boxShadow = "0 0 14px var(--brand)";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "999999";
      ripple.style.transform = "translate(-50%, -50%) scale(1)";
      ripple.style.transition = "transform 0.5s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.5s ease-out";

      document.body.appendChild(ripple);

      requestAnimationFrame(function () {
        ripple.style.transform = "translate(-50%, -50%) scale(8)";
        ripple.style.opacity = "0";
      });

      setTimeout(function () {
        if (ripple.parentElement) ripple.parentElement.removeChild(ripple);
      }, 550);
    });
  });
})();
