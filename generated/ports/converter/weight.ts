// @ts-nocheck
// Generated from tools/converter/weight.html
// Source SHA-256: 6ff99659e201abd7363b23b94f51f631eadb4b6f0aaae3e1f658baccc1cc8452
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        kg: { name: "千克 (kg)", toKg: 1, category: "metric" },
        g: { name: "克 (g)", toKg: 0.001, category: "metric" },
        mg: { name: "毫克 (mg)", toKg: 1e-6, category: "metric" },
        t: { name: "吨 (t)", toKg: 1000, category: "metric" },
        ct: { name: "克拉 (ct)", toKg: 0.0002, category: "metric" },
        lb: { name: "磅 (lb)", toKg: 0.45359237, category: "imperial" },
        oz: { name: "盎司 (oz)", toKg: 0.028349523, category: "imperial" },
        st: { name: "英石 (st)", toKg: 6.35029318, category: "imperial" },
        gr: { name: "格令 (gr)", toKg: 0.00006479891, category: "imperial" },
        jin: { name: "斤", toKg: 0.5, category: "chinese" },
        liang: { name: "两", toKg: 0.05, category: "chinese" },
        qian: { name: "钱", toKg: 0.005, category: "chinese" },
        dan: { name: "担", toKg: 50, category: "chinese" }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const kg = value * units[fromUnit].toKg;

        const categories = {
          metric: document.getElementById("metricResults"),
          imperial: document.getElementById("imperialResults"),
          chinese: document.getElementById("chineseResults")
        };

        Object.values(categories).forEach((el) => (el.innerHTML = ""));

        Object.entries(units).forEach(([key, unit]) => {
          const result = kg / unit.toKg;
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
    
