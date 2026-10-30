// @ts-nocheck
// Generated from tools/art/color-mixer.html
// Source SHA-256: d3f1e957943c4d69ba71ed79fa0ed954f0eb09784dd07b64c0e3a55154c54c3f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let colorA = "#ff6b6b";
      let colorB = "#4ecdc4";

      function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map((x) => {
              const hex = Math.round(x).toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        );
      }

      function rgbToHSL(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h,
          s,
          l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
        }

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }

      function updateColor(which, value) {
        value = value.trim();

        if (!value.match(/^#[0-9A-Fa-f]{6}$/)) {
          if (value.match(/^#[0-9A-Fa-f]{3}$/)) {
            value = "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
          } else {
            return;
          }
        }

        if (which === "A") {
          colorA = value.toUpperCase();
          document.getElementById("colorA").style.background = colorA;
          document.getElementById("inputA").value = colorA;
          document.getElementById("textA").value = colorA;
        } else {
          colorB = value.toUpperCase();
          document.getElementById("colorB").style.background = colorB;
          document.getElementById("inputB").value = colorB;
          document.getElementById("textB").value = colorB;
        }

        mixColors();
      }

      function mixColors() {
        const ratio = parseInt(document.getElementById("ratio").value) / 100;

        const rgbA = hexToRGB(colorA);
        const rgbB = hexToRGB(colorB);

        const mixed = {
          r: rgbA.r * (1 - ratio) + rgbB.r * ratio,
          g: rgbA.g * (1 - ratio) + rgbB.g * ratio,
          b: rgbA.b * (1 - ratio) + rgbB.b * ratio
        };

        const hexMixed = rgbToHex(mixed.r, mixed.g, mixed.b);
        const hsl = rgbToHSL(mixed.r, mixed.g, mixed.b);

        document.getElementById("colorMix").style.background = hexMixed;
        document.getElementById("hexValue").textContent = hexMixed;
        document.getElementById("rgbValue").textContent =
          `rgb(${Math.round(mixed.r)},${Math.round(mixed.g)},${Math.round(mixed.b)})`;
        document.getElementById("hslValue").textContent = `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`;

        const ratioA = Math.round((1 - ratio) * 100);
        const ratioB = Math.round(ratio * 100);
        document.getElementById("ratioValue").textContent = `A ${ratioA}% : B ${ratioB}%`;
      }

      function loadPreset(a, b) {
        updateColor("A", a);
        updateColor("B", b);
        document.getElementById("ratio").value = 50;
        mixColors();
      }

      // Initialize
      mixColors();

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
    
