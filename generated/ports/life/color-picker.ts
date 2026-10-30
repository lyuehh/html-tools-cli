// @ts-nocheck
// Generated from tools/life/color-picker.html
// Source SHA-256: a9dec6ca4511314de1411397ae2e39698a29863e1b08d38a0e74d82f83073341
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 预设调色板
      const palette = [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFEB3B",
        "#FFC107",
        "#FF9800",
        "#FF5722",
        "#795548",
        "#9E9E9E",
        "#607D8B",
        "#000000",
        "#FFCDD2",
        "#F8BBD9",
        "#E1BEE7",
        "#D1C4E9",
        "#C5CAE9",
        "#BBDEFB",
        "#B3E5FC",
        "#B2EBF2",
        "#B2DFDB",
        "#C8E6C9",
        "#DCEDC8",
        "#F0F4C3",
        "#FFF9C4",
        "#FFECB3",
        "#FFE0B2",
        "#FFCCBC",
        "#D7CCC8",
        "#F5F5F5",
        "#CFD8DC",
        "#FFFFFF"
      ];

      let currentColor = { r: 233, g: 30, b: 99, a: 1 };
      let history = JSON.parse(localStorage.getItem("colorHistory") || "[]");

      // 初始化
      function init() {
        renderPalette();
        renderHistory();
        updateAllFromRGB();
      }

      function renderPalette() {
        const grid = document.getElementById("paletteGrid");
        grid.innerHTML = palette
          .map(
            (color) =>
              `<div class="palette-color" style="background: ${color}" onclick="selectPaletteColor('${color}')"></div>`
          )
          .join("");
      }

      function renderHistory() {
        const container = document.getElementById("historyColors");
        if (history.length === 0) {
          container.innerHTML =
            '<div style="color: #888; font-size: 14px;">选择颜色后会自动保存到历史</div>';
          return;
        }
        container.innerHTML = history
          .map(
            (color) =>
              `<div class="history-color" style="background: ${color}" onclick="selectPaletteColor('${color}')"></div>`
          )
          .join("");
      }

      function addToHistory(hex) {
        if (history.includes(hex)) {
          history = history.filter((c) => c !== hex);
        }
        history.unshift(hex);
        if (history.length > 20) history.pop();
        localStorage.setItem("colorHistory", JSON.stringify(history));
        renderHistory();
      }

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));

        if (tab === "rgb") {
          document.querySelector(".tab:nth-child(1)").classList.add("active");
          document.getElementById("rgbPanel").classList.add("active");
        } else {
          document.querySelector(".tab:nth-child(2)").classList.add("active");
          document.getElementById("hslPanel").classList.add("active");
        }
      }

      function selectPaletteColor(hex) {
        const rgb = hexToRgb(hex);
        currentColor.r = rgb.r;
        currentColor.g = rgb.g;
        currentColor.b = rgb.b;
        updateAllFromRGB();
        addToHistory(hex);
      }

      function onNativePickerChange() {
        const hex = document.getElementById("nativePicker").value;
        const rgb = hexToRgb(hex);
        currentColor.r = rgb.r;
        currentColor.g = rgb.g;
        currentColor.b = rgb.b;
        updateAllFromRGB();
        addToHistory(hex.toUpperCase());
      }

      function onRGBChange() {
        currentColor.r = parseInt(document.getElementById("sliderR").value);
        currentColor.g = parseInt(document.getElementById("sliderG").value);
        currentColor.b = parseInt(document.getElementById("sliderB").value);
        updateAllFromRGB();
      }

      function onHSLChange() {
        const h = parseInt(document.getElementById("sliderH").value);
        const s = parseInt(document.getElementById("sliderS").value);
        const l = parseInt(document.getElementById("sliderL").value);
        const rgb = hslToRgb(h, s, l);
        currentColor.r = rgb.r;
        currentColor.g = rgb.g;
        currentColor.b = rgb.b;
        updateAllFromRGB(false);
      }

      function onAlphaChange() {
        currentColor.a = parseInt(document.getElementById("sliderA").value) / 100;
        updateFormats();
        updatePreview();
      }

      function onHexInput() {
        let hex = document.getElementById("hexInput").value.trim();
        if (!hex.startsWith("#")) hex = "#" + hex;

        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          const rgb = hexToRgb(hex);
          currentColor.r = rgb.r;
          currentColor.g = rgb.g;
          currentColor.b = rgb.b;
          updateAllFromRGB();
        }
      }

      function updateAllFromRGB(updateHSL = true) {
        // 更新 RGB 滑块
        document.getElementById("sliderR").value = currentColor.r;
        document.getElementById("sliderG").value = currentColor.g;
        document.getElementById("sliderB").value = currentColor.b;
        document.getElementById("rValue").textContent = currentColor.r;
        document.getElementById("gValue").textContent = currentColor.g;
        document.getElementById("bValue").textContent = currentColor.b;

        // 更新 HSL 滑块
        if (updateHSL) {
          const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
          document.getElementById("sliderH").value = hsl.h;
          document.getElementById("sliderS").value = hsl.s;
          document.getElementById("sliderL").value = hsl.l;
          document.getElementById("hValue").textContent = hsl.h;
          document.getElementById("sValue").textContent = hsl.s;
          document.getElementById("lValue").textContent = hsl.l;
        }

        // 更新原生选择器
        document.getElementById("nativePicker").value = rgbToHex(
          currentColor.r,
          currentColor.g,
          currentColor.b
        );

        updateFormats();
        updatePreview();
        updateContrast();
      }

      function updateFormats() {
        const { r, g, b, a } = currentColor;
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);

        document.getElementById("hexInput").value = hex;
        document.getElementById("rgbInput").value = `rgb(${r}, ${g}, ${b})`;
        document.getElementById("rgbaInput").value = `rgba(${r}, ${g}, ${b}, ${a})`;
        document.getElementById("hslInput").value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById("aValue").textContent = Math.round(a * 100) + "%";
      }

      function updatePreview() {
        const { r, g, b, a } = currentColor;
        document.getElementById("colorPreview").style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      function updateContrast() {
        const { r, g, b } = currentColor;
        const hex = rgbToHex(r, g, b);

        document.getElementById("contrastWhite").style.background = hex;
        document.getElementById("contrastWhite").style.color = "#fff";
        document.getElementById("contrastBlack").style.background = hex;
        document.getElementById("contrastBlack").style.color = "#000";

        const luminance = getLuminance(r, g, b);
        const whiteLum = 1;
        const blackLum = 0;

        const ratioWhite =
          (Math.max(luminance, whiteLum) + 0.05) / (Math.min(luminance, whiteLum) + 0.05);
        const ratioBlack =
          (Math.max(luminance, blackLum) + 0.05) / (Math.min(luminance, blackLum) + 0.05);

        document.getElementById("ratioWhite").textContent = `对比度: ${ratioWhite.toFixed(2)}:1`;
        document.getElementById("ratioBlack").textContent = `对比度: ${ratioBlack.toFixed(2)}:1`;
      }

      function copyFormat(type) {
        const inputs = {
          hex: "hexInput",
          rgb: "rgbInput",
          rgba: "rgbaInput",
          hsl: "hslInput"
        };
        const value = document.getElementById(inputs[type]).value;
        navigator.clipboard.writeText(value).then(() => {
          const btn = event.target;
          const original = btn.textContent;
          btn.textContent = "已复制";
          setTimeout(() => (btn.textContent = original), 1000);
        });
      }

      // 颜色转换函数
      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : { r: 0, g: 0, b: 0 };
      }

      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
        );
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
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
      }

      function getLuminance(r, g, b) {
        const a = [r, g, b].map((v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
      }

      init();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
