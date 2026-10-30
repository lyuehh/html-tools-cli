// @ts-nocheck
// Generated from tools/dev/color-mixer.html
// Source SHA-256: c35830cd57b5a5e17faa3555bb4c245e6f44efb858e6cd7afcfb1695b4c00a96
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const $ = (id) => document.getElementById(id);
      const presetColors = [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#14b8a6",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#000000",
        "#ffffff",
        "#6b7280",
        "#1f2937"
      ];
      function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }
      function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
      }
      function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          l = (max + min) / 2;
        let h = 0,
          s = 0;
        if (max !== min) {
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
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
      }
      function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
            p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
      }
      function mixColors() {
        const hexA = $("hexA").value,
          hexB = $("hexB").value;
        const ratio = $("ratio").value / 100;
        const rgbA = hexToRgb(hexA),
          rgbB = hexToRgb(hexB);
        const mode = $("mixMode").value;
        let result;
        if (mode === "rgb") {
          result = {
            r: rgbA.r * (1 - ratio) + rgbB.r * ratio,
            g: rgbA.g * (1 - ratio) + rgbB.g * ratio,
            b: rgbA.b * (1 - ratio) + rgbB.b * ratio
          };
        } else if (mode === "hsl") {
          const hslA = rgbToHsl(rgbA.r, rgbA.g, rgbA.b),
            hslB = rgbToHsl(rgbB.r, rgbB.g, rgbB.b);
          let h = hslA.h * (1 - ratio) + hslB.h * ratio;
          if (Math.abs(hslA.h - hslB.h) > 180) {
            h = ((hslA.h + 360) * (1 - ratio) + hslB.h * ratio) % 360;
          }
          const s = hslA.s * (1 - ratio) + hslB.s * ratio,
            l = hslA.l * (1 - ratio) + hslB.l * ratio;
          result = hslToRgb(h, s, l);
        } else if (mode === "multiply") {
          result = {
            r: (rgbA.r * rgbB.r) / 255,
            g: (rgbA.g * rgbB.g) / 255,
            b: (rgbA.b * rgbB.b) / 255
          };
        } else if (mode === "screen") {
          result = {
            r: 255 - ((255 - rgbA.r) * (255 - rgbB.r)) / 255,
            g: 255 - ((255 - rgbA.g) * (255 - rgbB.g)) / 255,
            b: 255 - ((255 - rgbA.b) * (255 - rgbB.b)) / 255
          };
        }
        const hex = rgbToHex(result.r, result.g, result.b);
        const hsl = rgbToHsl(Math.round(result.r), Math.round(result.g), Math.round(result.b));
        $("resultPreview").style.background = hex;
        $("resultPreview").textContent = hex;
        $("resultPreview").style.color = hsl.l > 50 ? "#000" : "#fff";
        $("resultHex").textContent = hex;
        $("resultRgb").textContent =
          `rgb(${Math.round(result.r)},${Math.round(result.g)},${Math.round(result.b)})`;
        $("resultHsl").textContent = `hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`;
        $("gradientPreview").style.background =
          `linear-gradient(to right, ${hexA}, ${hex}, ${hexB})`;
        $("ratioLabel").textContent = Math.round(ratio * 100) + "%";
      }
      window.updatePreview = function (id, color) {
        $(id).style.background = color;
      };
      function setupColorInput(colorId, hexId, previewId, presetsId) {
        const colorInput = $(colorId),
          hexInput = $(hexId);
        colorInput.oninput = () => {
          hexInput.value = colorInput.value;
          updatePreview(previewId, colorInput.value);
          mixColors();
        };
        hexInput.oninput = () => {
          if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value)) {
            colorInput.value = hexInput.value;
            updatePreview(previewId, hexInput.value);
            mixColors();
          }
        };
        $(presetsId).innerHTML = presetColors
          .map(
            (c) =>
              `<div class="preset-color" style="background:${c}" onclick="document.getElementById('${colorId}').value='${c}';document.getElementById('${hexId}').value='${c}';updatePreview('${previewId}','${c}');mixColors();"></div>`
          )
          .join("");
        updatePreview(previewId, colorInput.value);
      }
      window.copyValue = function (el) {
        navigator.clipboard.writeText(el.textContent);
        alert("已复制: " + el.textContent);
      };
      setupColorInput("colorA", "hexA", "previewA", "presetsA");
      setupColorInput("colorB", "hexB", "previewB", "presetsB");
      $("ratio").oninput = mixColors;
      $("mixMode").onchange = mixColors;
      function loadTheme() {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", t);
        $("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
        $("themeToggle").textContent = n === "dark" ? "☀️" : "🌙";
      };
      $("themeToggle").onclick = toggleTheme;
      loadTheme();
      mixColors();
    
