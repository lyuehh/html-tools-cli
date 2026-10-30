// @ts-nocheck
// Generated from tools/converter/volume.html
// Source SHA-256: fcc6ebc0d64cec8b7cfbd377ffe0b60d155403f259f762fa951d2a9b8c9a64aa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        l: { name: "升 (L)", toL: 1, category: "metric" },
        ml: { name: "毫升 (mL)", toL: 0.001, category: "metric" },
        m3: { name: "立方米 (m³)", toL: 1000, category: "metric" },
        cm3: { name: "立方厘米 (cm³)", toL: 0.001, category: "metric" },
        mm3: { name: "立方毫米 (mm³)", toL: 1e-6, category: "metric" },
        gal: { name: "美制加仑", toL: 3.785411784, category: "imperial" },
        galuk: { name: "英制加仑", toL: 4.54609, category: "imperial" },
        qt: { name: "夸脱 (qt)", toL: 0.946352946, category: "imperial" },
        pt: { name: "品脱 (pt)", toL: 0.473176473, category: "imperial" },
        cuft: { name: "立方英尺", toL: 28.3168466, category: "imperial" },
        cuin: { name: "立方英寸", toL: 0.016387064, category: "imperial" },
        cup: { name: "杯 (cup)", toL: 0.2365882365, category: "cooking" },
        floz: { name: "液盎司 (fl oz)", toL: 0.0295735296, category: "cooking" },
        tbsp: { name: "汤匙 (tbsp)", toL: 0.0147867648, category: "cooking" },
        tsp: { name: "茶匙 (tsp)", toL: 0.0049289216, category: "cooking" }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const liters = value * units[fromUnit].toL;

        const categories = {
          metric: document.getElementById("metricResults"),
          imperial: document.getElementById("imperialResults"),
          cooking: document.getElementById("cookingResults")
        };

        Object.values(categories).forEach((el) => (el.innerHTML = ""));

        Object.entries(units).forEach(([key, unit]) => {
          const result = liters / unit.toL;
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
    
