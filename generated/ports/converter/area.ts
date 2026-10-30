// @ts-nocheck
// Generated from tools/converter/area.html
// Source SHA-256: c00fbcd957571aa4d8f82950430b1da1c725f0f53eda36fb3708d6138a28fdc1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        m2: { name: "平方米 (m²)", toM2: 1, category: "metric" },
        km2: { name: "平方千米 (km²)", toM2: 1e6, category: "metric" },
        cm2: { name: "平方厘米 (cm²)", toM2: 1e-4, category: "metric" },
        mm2: { name: "平方毫米 (mm²)", toM2: 1e-6, category: "metric" },
        ha: { name: "公顷 (ha)", toM2: 10000, category: "metric" },
        are: { name: "公亩 (are)", toM2: 100, category: "metric" },
        sqft: { name: "平方英尺 (sq ft)", toM2: 0.09290304, category: "imperial" },
        sqyd: { name: "平方码 (sq yd)", toM2: 0.83612736, category: "imperial" },
        sqmi: { name: "平方英里 (sq mi)", toM2: 2589988.11, category: "imperial" },
        acre: { name: "英亩 (acre)", toM2: 4046.8564224, category: "imperial" },
        sqin: { name: "平方英寸 (sq in)", toM2: 0.00064516, category: "imperial" },
        mu: { name: "亩", toM2: 666.67, category: "chinese" },
        qing: { name: "顷", toM2: 66667, category: "chinese" },
        fen: { name: "分", toM2: 66.667, category: "chinese" }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const m2 = value * units[fromUnit].toM2;

        const categories = {
          metric: document.getElementById("metricResults"),
          imperial: document.getElementById("imperialResults"),
          chinese: document.getElementById("chineseResults")
        };

        Object.values(categories).forEach((el) => (el.innerHTML = ""));

        Object.entries(units).forEach(([key, unit]) => {
          const result = m2 / unit.toM2;
          const formatted = formatNumber(result);
          const html = `
                    <div class="result-item" onclick="copyValue('${formatted}')">
                        <div class="unit">${unit.name}</div>
                        <div class="value">${formatted}</div>
                    </div>
                `;
          categories[unit.category].innerHTML += html;
        });
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (Math.abs(num) >= 1e10 || Math.abs(num) < 1e-6) {
          return num.toExponential(6);
        }
        return parseFloat(num.toPrecision(10)).toString();
      }

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        convert();
      })();
    
