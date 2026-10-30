// @ts-nocheck
// Generated from tools/dev/color-palette-generator.html
// Source SHA-256: 7f81207855955d07c3fd9fe0ee18ef1ac73868cdee32dda029d3e6b218396136
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "complementary";
      let baseHex = "#e91e63";
      let palette = [];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // Color conversion utilities
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
        const toHex = (x) => {
          const hex = Math.round(x * 255).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      }

      function isLight(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 128;
      }

      function generatePalette() {
        const hsl = hexToHsl(baseHex);
        palette = [];

        switch (currentMode) {
          case "complementary":
            palette = [
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l), name: "互补色" }
            ];
            break;
          case "analogous":
            palette = [
              { hex: hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l), name: "类似色 1" },
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l), name: "类似色 2" }
            ];
            break;
          case "triadic":
            palette = [
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l), name: "三角色 1" },
              { hex: hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l), name: "三角色 2" }
            ];
            break;
          case "split":
            palette = [
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l), name: "分裂 1" },
              { hex: hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l), name: "分裂 2" }
            ];
            break;
          case "tetradic":
            palette = [
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l), name: "四角 1" },
              { hex: hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l), name: "四角 2" },
              { hex: hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l), name: "四角 3" }
            ];
            break;
          case "monochromatic":
            palette = [
              { hex: hslToHex(hsl.h, hsl.s, 20), name: "暗色" },
              { hex: hslToHex(hsl.h, hsl.s, 40), name: "深色" },
              { hex: baseHex, name: "基础色" },
              { hex: hslToHex(hsl.h, hsl.s, 70), name: "浅色" },
              { hex: hslToHex(hsl.h, hsl.s, 85), name: "淡色" }
            ];
            break;
        }

        renderPalette();
        renderShades();
      }

      function renderPalette() {
        const container = document.getElementById("paletteDisplay");
        container.innerHTML = palette
          .map(
            (c) => `
                <div class="palette-color ${isLight(c.hex) ? "light" : "dark"}" 
                     style="background: ${c.hex}" 
                     onclick="copyColor('${c.hex}')">
                    <span class="hex">${c.hex.toUpperCase()}</span>
                    <span class="name">${c.name}</span>
                </div>
            `
          )
          .join("");
      }

      function renderShades() {
        const hsl = hexToHsl(baseHex);
        const shades = [];
        for (let i = 5; i <= 95; i += 10) {
          shades.push(hslToHex(hsl.h, hsl.s, i));
        }

        const container = document.getElementById("shadesGrid");
        container.innerHTML = shades
          .map(
            (hex) => `
                <div class="shade-item ${isLight(hex) ? "light" : "dark"}" 
                     style="background: ${hex}" 
                     onclick="copyColor('${hex}')"
                     title="${hex}">
                </div>
            `
          )
          .join("");
      }

      window.updateFromPicker = function () {
        baseHex = document.getElementById("baseColor").value;
        document.getElementById("hexInput").value = baseHex;
        generatePalette();
      };

      window.updateFromHex = function () {
        let hex = document.getElementById("hexInput").value;
        if (!hex.startsWith("#")) hex = "#" + hex;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          baseHex = hex;
          document.getElementById("baseColor").value = hex;
          generatePalette();
        }
      };

      window.setMode = function (mode) {
        currentMode = mode;
        document.querySelectorAll(".mode-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.mode === mode);
        });
        generatePalette();
      };

      window.randomColor = function () {
        baseHex =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        document.getElementById("baseColor").value = baseHex;
        document.getElementById("hexInput").value = baseHex;
        generatePalette();
      };

      window.copyColor = function (hex) {
        navigator.clipboard.writeText(hex);
        showToast();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      window.exportCSS = function () {
        const css = `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n")}\n}`;
        document.getElementById("codeOutput").textContent = css;
        navigator.clipboard.writeText(css);
        showToast();
      };

      window.exportSCSS = function () {
        const scss = palette.map((c, i) => `$color-${i + 1}: ${c.hex};`).join("\n");
        document.getElementById("codeOutput").textContent = scss;
        navigator.clipboard.writeText(scss);
        showToast();
      };

      window.exportJSON = function () {
        const json = JSON.stringify(
          palette.map((c) => c.hex),
          null,
          2
        );
        document.getElementById("codeOutput").textContent = json;
        navigator.clipboard.writeText(json);
        showToast();
      };

      window.exportTailwind = function () {
        const tw = `colors: {\n  palette: {\n${palette.map((c, i) => `    '${(i + 1) * 100}': '${c.hex}',`).join("\n")}\n  }\n}`;
        document.getElementById("codeOutput").textContent = tw;
        navigator.clipboard.writeText(tw);
        showToast();
      };

      // Initialize preset colors
      const presets = [
        "#f44336",
        "#e91e63",
        "#9c27b0",
        "#673ab7",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
        "#00bcd4",
        "#009688",
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722"
      ];
      document.getElementById("presetColors").innerHTML = presets
        .map(
          (c) =>
            `<div class="preset-color" style="background: ${c}" onclick="setBaseColor('${c}')"></div>`
        )
        .join("");

      window.setBaseColor = function (hex) {
        baseHex = hex;
        document.getElementById("baseColor").value = hex;
        document.getElementById("hexInput").value = hex;
        generatePalette();
      };

      generatePalette();
    
