// @ts-nocheck
// Generated from tools/dev/css-unit-converter.html
// Source SHA-256: b4c5efa7955238a8b716eaeeb21a426e1647639bd08c8040b27b8815832e648b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.setViewport = function (width, height) {
        document.getElementById("viewportWidth").value = width;
        document.getElementById("viewportHeight").value = height;
        convert();
      };

      function getSettings() {
        return {
          rootFontSize: parseFloat(document.getElementById("rootFontSize").value) || 16,
          parentFontSize: parseFloat(document.getElementById("parentFontSize").value) || 16,
          viewportWidth: parseFloat(document.getElementById("viewportWidth").value) || 1920,
          viewportHeight: parseFloat(document.getElementById("viewportHeight").value) || 1080
        };
      }

      // Convert any unit to px
      function toPx(value, unit, settings) {
        const { rootFontSize, parentFontSize, viewportWidth, viewportHeight } = settings;

        switch (unit) {
          case "px":
            return value;
          case "rem":
            return value * rootFontSize;
          case "em":
            return value * parentFontSize;
          case "vw":
            return (value * viewportWidth) / 100;
          case "vh":
            return (value * viewportHeight) / 100;
          case "vmin":
            return (value * Math.min(viewportWidth, viewportHeight)) / 100;
          case "vmax":
            return (value * Math.max(viewportWidth, viewportHeight)) / 100;
          case "percent":
            return (value * parentFontSize) / 100; // Assuming font-size context
          case "pt":
            return (value * 96) / 72;
          case "cm":
            return (value * 96) / 2.54;
          case "mm":
            return (value * 96) / 25.4;
          case "in":
            return value * 96;
          default:
            return value;
        }
      }

      // Convert px to any unit
      function fromPx(px, unit, settings) {
        const { rootFontSize, parentFontSize, viewportWidth, viewportHeight } = settings;

        switch (unit) {
          case "px":
            return px;
          case "rem":
            return px / rootFontSize;
          case "em":
            return px / parentFontSize;
          case "vw":
            return (px * 100) / viewportWidth;
          case "vh":
            return (px * 100) / viewportHeight;
          case "vmin":
            return (px * 100) / Math.min(viewportWidth, viewportHeight);
          case "vmax":
            return (px * 100) / Math.max(viewportWidth, viewportHeight);
          case "percent":
            return (px * 100) / parentFontSize;
          case "pt":
            return (px * 72) / 96;
          case "cm":
            return (px * 2.54) / 96;
          case "mm":
            return (px * 25.4) / 96;
          case "in":
            return px / 96;
          default:
            return px;
        }
      }

      function formatValue(value) {
        if (Math.abs(value) < 0.0001) return "0";
        if (Math.abs(value) >= 1000) return value.toFixed(2);
        if (Math.abs(value) >= 1) return value.toFixed(4).replace(/\.?0+$/, "");
        return value.toPrecision(4).replace(/\.?0+$/, "");
      }

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value);
        const unit = document.getElementById("inputUnit").value;
        const settings = getSettings();

        if (isNaN(value)) {
          document.getElementById("results").innerHTML =
            '<p style="opacity:0.6;">请输入有效数值</p>';
          return;
        }

        const px = toPx(value, unit, settings);

        const units = [
          { unit: "px", name: "像素", desc: "绝对单位" },
          { unit: "rem", name: "rem", desc: "相对根字体" },
          { unit: "em", name: "em", desc: "相对父字体" },
          { unit: "vw", name: "vw", desc: "视口宽度%" },
          { unit: "vh", name: "vh", desc: "视口高度%" },
          { unit: "vmin", name: "vmin", desc: "视口最小边%" },
          { unit: "vmax", name: "vmax", desc: "视口最大边%" },
          { unit: "percent", name: "%", desc: "百分比" },
          { unit: "pt", name: "pt", desc: "点 (印刷)" },
          { unit: "cm", name: "cm", desc: "厘米" },
          { unit: "mm", name: "mm", desc: "毫米" },
          { unit: "in", name: "in", desc: "英寸" }
        ];

        const resultsHTML = units
          .map((u) => {
            const converted = fromPx(px, u.unit, settings);
            const displayUnit = u.unit === "percent" ? "%" : u.unit;
            const displayValue = formatValue(converted) + displayUnit;

            return `
                    <div class="result-card" onclick="copyValue('${displayValue}')" title="点击复制">
                        <div class="unit">${u.name}</div>
                        <div class="value">${displayValue}</div>
                        <div class="desc">${u.desc}</div>
                    </div>
                `;
          })
          .join("");

        document.getElementById("results").innerHTML = resultsHTML;

        // Update formula
        updateFormula(value, unit, px, settings);
      }

      function updateFormula(value, unit, px, settings) {
        const { rootFontSize, parentFontSize, viewportWidth, viewportHeight } = settings;
        let formula = "";

        switch (unit) {
          case "px":
            formula = `<code>${value}px</code> = <code>${value}px</code>`;
            break;
          case "rem":
            formula = `<code>${value}rem</code> × <code>${rootFontSize}px</code> (根字体) = <code>${px}px</code>`;
            break;
          case "em":
            formula = `<code>${value}em</code> × <code>${parentFontSize}px</code> (父字体) = <code>${px}px</code>`;
            break;
          case "vw":
            formula = `<code>${value}vw</code> × <code>${viewportWidth}px</code> / 100 = <code>${px}px</code>`;
            break;
          case "vh":
            formula = `<code>${value}vh</code> × <code>${viewportHeight}px</code> / 100 = <code>${px}px</code>`;
            break;
          case "percent":
            formula = `<code>${value}%</code> × <code>${parentFontSize}px</code> / 100 = <code>${px}px</code>`;
            break;
          default:
            formula = `<code>${value}${unit}</code> = <code>${formatValue(px)}px</code>`;
        }

        document.getElementById("formula").innerHTML = formula;
      }

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value).then(() => {
          showToast("已复制: " + value);
        });
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      convert();
    
