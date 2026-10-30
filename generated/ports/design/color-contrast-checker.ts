// @ts-nocheck
// Generated from tools/design/color-contrast-checker.html
// Source SHA-256: 6adfb050034b7214746522101be079c8f1eb53485326ebce8a45e590bec21180
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

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

      function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map((c) => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }

      function getContrastRatio(fg, bg) {
        const fgRgb = hexToRgb(fg);
        const bgRgb = hexToRgb(bg);
        if (!fgRgb || !bgRgb) return 1;

        const l1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
        const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        return (lighter + 0.05) / (darker + 0.05);
      }

      function updateCheck() {
        const fg = document.getElementById("fgColor").value;
        const bg = document.getElementById("bgColor").value;

        document.getElementById("fgHex").value = fg;
        document.getElementById("bgHex").value = bg;

        const preview = document.getElementById("preview");
        preview.style.backgroundColor = bg;
        preview.style.color = fg;

        const ratio = getContrastRatio(fg, bg);
        document.getElementById("ratioValue").textContent = ratio.toFixed(2) + ":1";

        // 检查各级别
        const checks = [
          { id: "aaNormal", threshold: 4.5 },
          { id: "aaLarge", threshold: 3 },
          { id: "aaaNormal", threshold: 7 },
          { id: "aaaLarge", threshold: 4.5 }
        ];

        checks.forEach((check) => {
          const pass = ratio >= check.threshold;
          const el = document.getElementById(check.id);
          const textEl = document.getElementById(check.id + "Text");
          el.textContent = pass ? "✓" : "✗";
          el.className = "status " + (pass ? "pass" : "fail");
          textEl.className = "level " + (pass ? "pass" : "fail");
          textEl.textContent = (pass ? "通过" : "失败") + ` (≥${check.threshold}:1)`;
        });
      }

      function syncColor(type) {
        const hexInput = document.getElementById(type + "Hex");
        const colorInput = document.getElementById(type + "Color");
        let hex = hexInput.value;
        if (!hex.startsWith("#")) hex = "#" + hex;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          colorInput.value = hex;
          updateCheck();
        }
      }

      function swapColors() {
        const fg = document.getElementById("fgColor").value;
        const bg = document.getElementById("bgColor").value;
        document.getElementById("fgColor").value = bg;
        document.getElementById("bgColor").value = fg;
        updateCheck();
      }

      function randomColors() {
        const randomHex = () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        document.getElementById("fgColor").value = randomHex();
        document.getElementById("bgColor").value = randomHex();
        updateCheck();
      }

      updateCheck();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
