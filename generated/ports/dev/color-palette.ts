// @ts-nocheck
// Generated from tools/dev/color-palette.html
// Source SHA-256: b977d5d1f5e61d8bad9c923634aacc54173de095c7d12ce5134827574d38f479
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const primaryColorEl = document.getElementById("primaryColor");
      const primaryHexEl = document.getElementById("primaryHex");
      const secondaryColorEl = document.getElementById("secondaryColor");
      const secondaryHexEl = document.getElementById("secondaryHex");
      const schemeTypeEl = document.getElementById("schemeType");
      const colorCountEl = document.getElementById("colorCount");
      const saturationEl = document.getElementById("saturation");
      const lightnessEl = document.getElementById("lightness");
      const paletteGridEl = document.getElementById("paletteGrid");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");

      function hexToHSL(hex) {
        let r = 0,
          g = 0,
          b = 0;
        if (hex.length === 4) {
          r = parseInt(hex[1] + hex[1], 16);
          g = parseInt(hex[2] + hex[2], 16);
          b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
          r = parseInt(hex[1] + hex[2], 16);
          g = parseInt(hex[3] + hex[4], 16);
          b = parseInt(hex[5] + hex[6], 16);
        }
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
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
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

        if (h >= 0 && h < 60) {
          r = c;
          g = x;
          b = 0;
        } else if (h >= 60 && h < 120) {
          r = x;
          g = c;
          b = 0;
        } else if (h >= 120 && h < 180) {
          r = 0;
          g = c;
          b = x;
        } else if (h >= 180 && h < 240) {
          r = 0;
          g = x;
          b = c;
        } else if (h >= 240 && h < 300) {
          r = x;
          g = 0;
          b = c;
        } else if (h >= 300 && h < 360) {
          r = c;
          g = 0;
          b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return (
          "#" +
          [r, g, b]
            .map((x) => {
              const hex = x.toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        );
      }

      function generateColorScheme(baseHSL, schemeType, count) {
        const s = parseInt(saturationEl.value) || 70;
        const l = parseInt(lightnessEl.value) || 50;
        const colors = [];
        const baseH = baseHSL.h;

        for (let i = 0; i < count; i++) {
          let h;
          switch (schemeType) {
            case "analogous":
              h = (baseH + (i - Math.floor(count / 2)) * 30 + 360) % 360;
              break;
            case "complementary":
              h = (baseH + (i % 2 === 0 ? 0 : 180)) % 360;
              break;
            case "triadic":
              h = (baseH + i * 120) % 360;
              break;
            case "tetradic":
              h = (baseH + i * 90) % 360;
              break;
            case "monochromatic":
              h = baseH;
              break;
            case "shades":
              h = baseH;
              break;
            default:
              h = (baseH + i * (360 / count)) % 360;
          }

          let colorS = s;
          let colorL = l;

          if (schemeType === "shades") {
            colorL = 10 + i * (80 / (count - 1));
          } else if (schemeType === "monochromatic") {
            colorL = 30 + i * (50 / (count - 1));
          }

          colors.push(HSLToHex(h, colorS, colorL));
        }

        return colors;
      }

      function generatePalette() {
        const primaryHex = primaryHexEl.value;
        const schemeType = schemeTypeEl.value;
        const count = parseInt(colorCountEl.value) || 5;

        if (!/^#[0-9A-Fa-f]{3,6}$/.test(primaryHex)) {
          showStatus("颜色格式无效", "error");
          return;
        }

        const baseHSL = hexToHSL(primaryHex);
        const colors = generateColorScheme(baseHSL, schemeType, count);

        paletteGridEl.innerHTML = "";
        colors.forEach(function (hex, index) {
          const colorDiv = document.createElement("div");
          colorDiv.className = "palette-color";
          colorDiv.style.backgroundColor = hex;
          colorDiv.innerHTML =
            '<div class="color-hex">' +
            hex +
            "</div>" +
            '<div class="color-name">颜色 ' +
            (index + 1) +
            "</div>";
          paletteGridEl.appendChild(colorDiv);

          colorDiv.addEventListener("click", function () {
            document.querySelectorAll(".palette-color").forEach(function (c) {
              c.classList.remove("active");
            });
            colorDiv.classList.add("active");
            primaryColorEl.value = hex;
            primaryHexEl.value = hex;
            updateHexInputs();
          });
        });

        // Generate CSS code
        const css =
          ":root {\n" +
          colors
            .map(function (hex, index) {
              return `  --color-${index + 1}: ${hex};`;
            })
            .join("\n") +
          "\n}";
        outputEl.value = css;

        showStatus("配色方案已生成", "success");
      }

      function updateHexInputs() {
        primaryColorEl.value = primaryHexEl.value;
        secondaryColorEl.value = secondaryHexEl.value;
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      window.randomColor = function () {
        const hex =
          "#" +
          Math.floor(Math.random() * 0x1000000)
            .toString(16)
            .padStart(6, "0");
        primaryHexEl.value = hex;
        updateHexInputs();
        generatePalette();
      };

      function reset() {
        primaryHexEl.value = "#00f5d4";
        secondaryHexEl.value = "#4cc9f0";
        schemeTypeEl.value = "analogous";
        colorCountEl.value = "5";
        saturationEl.value = "70";
        lightnessEl.value = "50";
        updateHexInputs();
        generatePalette();
      }

      primaryColorEl.addEventListener("input", function () {
        primaryHexEl.value = this.value;
        generatePalette();
      });

      primaryHexEl.addEventListener("input", function () {
        primaryColorEl.value = this.value;
        if (this.value.length === 7 || this.value.length === 4) {
          generatePalette();
        }
      });

      secondaryColorEl.addEventListener("input", function () {
        secondaryHexEl.value = this.value;
      });

      secondaryHexEl.addEventListener("input", function () {
        secondaryColorEl.value = this.value;
      });

      document.getElementById("btnGenerate").onclick = generatePalette;
      document.getElementById("btnRandom").onclick = randomColor;
      document.getElementById("btnClear").onclick = reset;

      document.getElementById("btnCopy").onclick = async function () {
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败");
        }
      };

      [schemeTypeEl, colorCountEl, saturationEl, lightnessEl].forEach(function (el) {
        el.addEventListener("change", generatePalette);
      });

      // Initial generation
      updateHexInputs();
      generatePalette();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
