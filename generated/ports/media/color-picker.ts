// @ts-nocheck
// Generated from tools/media/color-picker.html
// Source SHA-256: 2febaef98431cf009fdc783f16a36234d697f212e2d1e6154d171538cc75a38c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateColor() {
        const hex = document.getElementById("colorPicker").value;
        document.getElementById("preview").style.background = hex;
        document.getElementById("hex").textContent = hex;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        document.getElementById("rgb").textContent = "rgb(" + r + ", " + g + ", " + b + ")";
        const max = Math.max(r, g, b) / 255,
          min = Math.min(r, g, b) / 255;
        const l = (max + min) / 2;
        let h = 0,
          s = 0;
        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          if (max === r / 255) h = ((g - b) / 255 / d + (g < b ? 6 : 0)) / 6;
          else if (max === g / 255) h = ((b - r) / 255 / d + 2) / 6;
          else h = ((r - g) / 255 / d + 4) / 6;
        }
        document.getElementById("hsl").textContent =
          "hsl(" +
          Math.round(h * 360) +
          ", " +
          Math.round(s * 100) +
          "%, " +
          Math.round(l * 100) +
          "%)";
      }
      function copy(el) {
        navigator.clipboard.writeText(el.textContent);
        el.style.background = "#48bb78";
        setTimeout(() => (el.style.background = ""), 500);
      }
    
