// @ts-nocheck
// Generated from tools/converter/color-converter.html
// Source SHA-256: aba340df3254d4727ce8e7b807fcb60793bbb2550ff4a8e5da5283aa421bb2c1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

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
      function updateFromHex(hex) {
        if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        document.getElementById("preview").style.background = hex;
        document.getElementById("picker").value = hex;
        document.getElementById("rgb").value = "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
        document.getElementById("hsl").value = "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
      }
      document.getElementById("picker").addEventListener("input", (e) => {
        document.getElementById("hex").value = e.target.value;
        updateFromHex(e.target.value);
      });
      document
        .getElementById("hex")
        .addEventListener("input", (e) => updateFromHex(e.target.value));
    
