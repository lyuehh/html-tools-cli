// @ts-nocheck
// Generated from tools/art/color-wheel.html
// Source SHA-256: 7c81ad004c37909618f8d5148b88cdde380bfd6856f62ac83d832c5ab01c5c98
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const canvas = document.getElementById("colorWheel");
      const ctx = canvas.getContext("2d");
      const pointer = document.getElementById("pointer");

      let currentHue = 0;
      let currentSaturation = 100;
      let currentLightness = 50;
      let currentScheme = "complementary";

      function drawColorWheel() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 5;

        // Draw hue ring
        for (let angle = 0; angle < 360; angle++) {
          const startAngle = ((angle - 1) * Math.PI) / 180;
          const endAngle = ((angle + 1) * Math.PI) / 180;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);
          ctx.closePath();

          ctx.fillStyle = `hsl(${angle}, 100%, 50%)`;
          ctx.fill();
        }

        // Draw saturation gradient (white center)
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      function updatePointer() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = (canvas.width / 2 - 5) * (currentSaturation / 100);

        const angle = (currentHue * Math.PI) / 180 - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        pointer.style.left = x + "px";
        pointer.style.top = y + "px";
        pointer.style.backgroundColor = hslToHex(currentHue, currentSaturation, currentLightness);
      }

      function handleWheel(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxRadius = canvas.width / 2 - 5;

        if (distance <= maxRadius) {
          currentHue = ((Math.atan2(dy, dx) * 180) / Math.PI + 90 + 360) % 360;
          currentSaturation = Math.min(100, (distance / maxRadius) * 100);

          updateColor();
        }
      }

      canvas.addEventListener("click", handleWheel);
      canvas.addEventListener("mousemove", (e) => {
        if (e.buttons === 1) handleWheel(e);
      });

      function hslToHex(h, s, l) {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let r, g, b;
        if (h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (h < 300) {
          r = x;
          g = 0;
          b = c;
        } else {
          r = c;
          g = 0;
          b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return (
          "#" +
          [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
        );
      }

      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null;
      }

      function updateColor() {
        const hex = hslToHex(currentHue, currentSaturation, currentLightness);
        const rgb = hexToRgb(hex);

        document.getElementById("colorPreview").style.backgroundColor = hex;
        document.getElementById("colorHex").textContent = hex;
        document.getElementById("rgbValue").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
        document.getElementById("hslValue").textContent =
          `HSL: ${Math.round(currentHue)}°, ${Math.round(currentSaturation)}%, ${currentLightness}%`;

        updatePointer();
        generatePalette();
      }

      function setScheme(scheme) {
        currentScheme = scheme;
        document.querySelectorAll(".scheme-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        generatePalette();
      }

      function generatePalette() {
        const colors = [];
        const h = currentHue;

        switch (currentScheme) {
          case "complementary":
            colors.push({ hue: h, label: "主色" });
            colors.push({ hue: (h + 180) % 360, label: "互补色" });
            break;
          case "analogous":
            colors.push({ hue: (h - 30 + 360) % 360, label: "类似色1" });
            colors.push({ hue: h, label: "主色" });
            colors.push({ hue: (h + 30) % 360, label: "类似色2" });
            break;
          case "triadic":
            colors.push({ hue: h, label: "主色" });
            colors.push({ hue: (h + 120) % 360, label: "三色2" });
            colors.push({ hue: (h + 240) % 360, label: "三色3" });
            break;
          case "split":
            colors.push({ hue: h, label: "主色" });
            colors.push({ hue: (h + 150) % 360, label: "分裂1" });
            colors.push({ hue: (h + 210) % 360, label: "分裂2" });
            break;
          case "tetradic":
            colors.push({ hue: h, label: "主色" });
            colors.push({ hue: (h + 90) % 360, label: "四色2" });
            colors.push({ hue: (h + 180) % 360, label: "四色3" });
            colors.push({ hue: (h + 270) % 360, label: "四色4" });
            break;
        }

        const paletteHtml = colors
          .map((c) => {
            const hex = hslToHex(c.hue, currentSaturation, currentLightness);
            return `
          <div class="palette-color">
            <div class="palette-swatch" style="background:${hex}" onclick="copyHex('${hex}')"></div>
            <span class="palette-label">${c.label}</span>
            <span class="palette-hex">${hex}</span>
          </div>
        `;
          })
          .join("");

        document.getElementById("palette").innerHTML = paletteHtml;
      }

      function copyColor() {
        const hex = document.getElementById("colorHex").textContent;
        copyHex(hex);
      }

      function copyHex(hex) {
        navigator.clipboard.writeText(hex).then(() => {
          alert(`已复制: ${hex}`);
        });
      }

      // Initialize
      drawColorWheel();
      updateColor();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
