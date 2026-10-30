// @ts-nocheck
// Generated from tools/design/palette-generator.html
// Source SHA-256: 6f86d26f933a8383121f6b5ad7720a5da83ed76fc75776e84ee2fc5298b35d12
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const baseColorEl = document.getElementById("baseColor");
      const schemeEl = document.getElementById("scheme");
      const paletteEl = document.getElementById("palette");
      const exportEl = document.getElementById("exportGrid");
      const statusEl = document.getElementById("status");

      function hexToHsl(hex) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
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
        return { h: h * 360, s: s * 100, l: l * 100 };
      }

      function hslToHex(h, s, l) {
        h = ((h % 360) + 360) % 360;
        s /= 100;
        l /= 100;
        const a = s * Math.min(l, 1 - l);
        const f = (n) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      }

      function isLight(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 128;
      }

      function hexToRgb(hex) {
        return {
          r: parseInt(hex.slice(1, 3), 16),
          g: parseInt(hex.slice(3, 5), 16),
          b: parseInt(hex.slice(5, 7), 16)
        };
      }

      function generateScheme(baseHex, scheme) {
        const hsl = hexToHsl(baseHex);
        let colors = [];

        switch (scheme) {
          case "complementary":
            colors = [hslToHex(hsl.h, hsl.s, hsl.l), hslToHex(hsl.h + 180, hsl.s, hsl.l)];
            break;
          case "analogous":
            colors = [
              hslToHex(hsl.h - 30, hsl.s, hsl.l),
              hslToHex(hsl.h, hsl.s, hsl.l),
              hslToHex(hsl.h + 30, hsl.s, hsl.l)
            ];
            break;
          case "triadic":
            colors = [
              hslToHex(hsl.h, hsl.s, hsl.l),
              hslToHex(hsl.h + 120, hsl.s, hsl.l),
              hslToHex(hsl.h + 240, hsl.s, hsl.l)
            ];
            break;
          case "split":
            colors = [
              hslToHex(hsl.h, hsl.s, hsl.l),
              hslToHex(hsl.h + 150, hsl.s, hsl.l),
              hslToHex(hsl.h + 210, hsl.s, hsl.l)
            ];
            break;
          case "tetradic":
            colors = [
              hslToHex(hsl.h, hsl.s, hsl.l),
              hslToHex(hsl.h + 90, hsl.s, hsl.l),
              hslToHex(hsl.h + 180, hsl.s, hsl.l),
              hslToHex(hsl.h + 270, hsl.s, hsl.l)
            ];
            break;
          case "monochromatic":
            colors = [
              hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 30, 10)),
              hslToHex(hsl.h, hsl.s, Math.max(hsl.l - 15, 20)),
              hslToHex(hsl.h, hsl.s, hsl.l),
              hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 15, 80)),
              hslToHex(hsl.h, hsl.s, Math.min(hsl.l + 30, 90))
            ];
            break;
        }
        return colors;
      }

      function generatePalette() {
        const baseHex = baseColorEl.value;
        const scheme = schemeEl.value;
        const colors = generateScheme(baseHex, scheme);

        paletteEl.innerHTML = "";
        colors.forEach((hex) => {
          const rgb = hexToRgb(hex);
          const div = document.createElement("div");
          div.className = `color-swatch ${isLight(hex) ? "light" : "dark"}`;
          div.style.background = hex;
          div.innerHTML = `
          <div class="hex">${hex.toUpperCase()}</div>
          <div class="rgb">rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
        `;
          div.onclick = () => copyColor(hex);
          paletteEl.appendChild(div);
        });

        // 导出格式
        exportEl.innerHTML = `
        <div class="export-item" onclick="copyText('${colors.join(", ")}')">${colors.join(", ")}</div>
        <div class="export-item" onclick="copyText('${colors
          .map((c) => hexToRgb(c))
          .map((r) => `rgb(${r.r},${r.g},${r.b})`)
          .join(", ")}')">${colors
          .map((c) => hexToRgb(c))
          .map((r) => `rgb(${r.r},${r.g},${r.b})`)
          .join(", ")}</div>
        <div class="export-item" onclick="copyText(':root { ${colors.map((c, i) => `--color-${i + 1}: ${c}`).join("; ")}; }')">CSS Variables</div>
        <div class="export-item" onclick="copyText('${JSON.stringify(colors)}')">${JSON.stringify(colors)}</div>
      `;
      }

      function randomBase() {
        const hex =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        baseColorEl.value = hex;
        generatePalette();
      }

      function copyColor(hex) {
        navigator.clipboard.writeText(hex).then(() => {
          statusEl.textContent = `已复制: ${hex}`;
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      function copyText(text) {
        navigator.clipboard.writeText(text).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      generatePalette();

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
    
