// @ts-nocheck
// Generated from tools/design/color-picker.html
// Source SHA-256: 9fcf2b3cbedabadf8b6892bb91d8dd0c273309f0e8d5c9ee9a160f253caf0f03
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const colorPicker = document.getElementById("colorPicker");
      const colorPreview = document.getElementById("colorPreview");
      const hexInput = document.getElementById("hexValue");
      const rgbInput = document.getElementById("rgbValue");
      const hslInput = document.getElementById("hslValue");
      const hsvInput = document.getElementById("hsvValue");
      const statusEl = document.getElementById("status");
      const swatchesEl = document.getElementById("swatches");

      const defaultColors = [
        "#ff6b6b",
        "#feca57",
        "#48dbfb",
        "#1dd1a1",
        "#5f27cd",
        "#ff9ff3",
        "#54a0ff",
        "#00d2d3",
        "#ff9f43",
        "#2e86de"
      ];

      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
          : null;
      }

      function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
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
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
      }

      function rgbToHsv(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        let h,
          s,
          v = max;
        const d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
          h = 0;
        } else {
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
        return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
      }

      function updateColor(hex) {
        if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return;
        colorPreview.style.background = hex;
        colorPicker.value = hex;
        const rgb = hexToRgb(hex);
        if (rgb) {
          rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
          const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
          hsvInput.value = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
        }
      }

      colorPicker.addEventListener("input", (e) => {
        const hex = e.target.value;
        hexInput.value = hex;
        updateColor(hex);
      });

      hexInput.addEventListener("input", (e) => {
        let hex = e.target.value;
        if (!hex.startsWith("#")) hex = "#" + hex;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          updateColor(hex);
        }
      });

      function copyValue(type) {
        let value;
        switch (type) {
          case "hex":
            value = hexInput.value;
            break;
          case "rgb":
            value = rgbInput.value;
            break;
          case "hsl":
            value = hslInput.value;
            break;
          case "hsv":
            value = hsvInput.value;
            break;
        }
        navigator.clipboard.writeText(value).then(() => {
          statusEl.textContent = "已复制: " + value;
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      // 创建色板
      defaultColors.forEach((color) => {
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.background = color;
        swatch.onclick = () => {
          hexInput.value = color;
          updateColor(color);
        };
        swatchesEl.appendChild(swatch);
      });

      // 初始化
      updateColor("#0d6efd");

      // 主题切换
      function toggleTheme() {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
