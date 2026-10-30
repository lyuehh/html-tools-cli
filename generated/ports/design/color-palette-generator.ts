// @ts-nocheck
// Generated from tools/design/color-palette-generator.html
// Source SHA-256: 3864322ba86e1bd9f4084ae725af135d4ab121e0bf621f19340ac5ccc1bf3e55
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function hexToHSL(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

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

        return [h * 360, s * 100, l * 100];
      }

      function HSLToHex(h, s, l) {
        s /= 100;
        l /= 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;

        let r = 0,
          g = 0,
          b = 0;

        if (0 <= h && h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (60 <= h && h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (120 <= h && h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (180 <= h && h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (240 <= h && h < 300) {
          r = x;
          g = 0;
          b = c;
        } else if (300 <= h && h < 360) {
          r = c;
          g = 0;
          b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
      }

      function hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
      }

      function generateScheme(baseColor, type) {
        const [h, s, l] = hexToHSL(baseColor);
        const colors = [baseColor];

        switch (type) {
          case "analogous":
            colors.push(HSLToHex((h + 30) % 360, s, l));
            colors.push(HSLToHex((h + 60) % 360, s, l));
            colors.push(HSLToHex((h - 30 + 360) % 360, s, l));
            colors.push(HSLToHex((h - 60 + 360) % 360, s, l));
            break;

          case "complementary":
            colors.push(HSLToHex((h + 180) % 360, s, l));
            colors.push(HSLToHex(h, s * 0.7, l * 1.2));
            colors.push(HSLToHex((h + 180) % 360, s * 0.7, l * 1.2));
            colors.push(HSLToHex(h, s * 0.5, l * 0.8));
            break;

          case "triadic":
            colors.push(HSLToHex((h + 120) % 360, s, l));
            colors.push(HSLToHex((h + 240) % 360, s, l));
            colors.push(HSLToHex(h, s * 0.6, l * 1.1));
            colors.push(HSLToHex((h + 120) % 360, s * 0.6, l * 1.1));
            break;

          case "tetradic":
            colors.push(HSLToHex((h + 90) % 360, s, l));
            colors.push(HSLToHex((h + 180) % 360, s, l));
            colors.push(HSLToHex((h + 270) % 360, s, l));
            colors.push(HSLToHex(h, s * 0.5, l * 1.2));
            break;

          case "monochromatic":
            colors.push(HSLToHex(h, s, l * 1.3));
            colors.push(HSLToHex(h, s, l * 1.15));
            colors.push(HSLToHex(h, s, l * 0.85));
            colors.push(HSLToHex(h, s, l * 0.7));
            break;
        }

        return colors;
      }

      function generate() {
        const baseColor = document.getElementById("baseColor").value;
        const schemeType = document.getElementById("schemeType").value;
        const colors = generateScheme(baseColor, schemeType);

        const container = document.getElementById("palette");
        container.innerHTML = colors
          .map(
            (color) => `
        <div class="color-card" style="background:${color}" onclick="copyColor('${color}')">
          <div class="color-info">
            <div class="color-hex">${color.toUpperCase()}</div>
            <div class="color-rgb">${hexToRGB(color)}</div>
          </div>
        </div>
      `
          )
          .join("");
      }

      function copyColor(color) {
        navigator.clipboard.writeText(color);
        alert(`已复制: ${color}`);
      }

      function randomColor() {
        const randomHex =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        document.getElementById("baseColor").value = randomHex;
        generate();
      }

      function exportCSS() {
        const baseColor = document.getElementById("baseColor").value;
        const schemeType = document.getElementById("schemeType").value;
        const colors = generateScheme(baseColor, schemeType);

        const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n")}\n}`;
        navigator.clipboard.writeText(css);
        alert("CSS 变量已复制到剪贴板！");
      }

      function exportJSON() {
        const baseColor = document.getElementById("baseColor").value;
        const schemeType = document.getElementById("schemeType").value;
        const colors = generateScheme(baseColor, schemeType);

        const json = JSON.stringify({ colors }, null, 2);
        navigator.clipboard.writeText(json);
        alert("JSON 已复制到剪贴板！");
      }

      function exportSCSS() {
        const baseColor = document.getElementById("baseColor").value;
        const schemeType = document.getElementById("schemeType").value;
        const colors = generateScheme(baseColor, schemeType);

        const scss = colors.map((c, i) => `$color-${i + 1}: ${c};`).join("\n");
        navigator.clipboard.writeText(scss);
        alert("SCSS 变量已复制到剪贴板！");
      }

      function exportTailwind() {
        const baseColor = document.getElementById("baseColor").value;
        const schemeType = document.getElementById("schemeType").value;
        const colors = generateScheme(baseColor, schemeType);

        const tw = `theme: {\n  extend: {\n    colors: {\n${colors.map((c, i) => `      'brand-${i + 1}': '${c}',`).join("\n")}\n    }\n  }\n}`;
        navigator.clipboard.writeText(tw);
        alert("Tailwind 配置已复制到剪贴板！");
      }

      // Initialize
      generate();

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
    
