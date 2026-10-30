// @ts-nocheck
// Generated from tools/converter/length.html
// Source SHA-256: 8aee63098b9c036f5d14042fa3e95e1185851683aaea3c9180254c39a4e0e2bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        m: { name: "米 (m)", toMeter: 1, category: "metric" },
        km: { name: "千米 (km)", toMeter: 1000, category: "metric" },
        cm: { name: "厘米 (cm)", toMeter: 0.01, category: "metric" },
        mm: { name: "毫米 (mm)", toMeter: 0.001, category: "metric" },
        um: { name: "微米 (μm)", toMeter: 1e-6, category: "metric" },
        nm: { name: "纳米 (nm)", toMeter: 1e-9, category: "metric" },
        mi: { name: "英里 (mi)", toMeter: 1609.344, category: "imperial" },
        yd: { name: "码 (yd)", toMeter: 0.9144, category: "imperial" },
        ft: { name: "英尺 (ft)", toMeter: 0.3048, category: "imperial" },
        in: { name: "英寸 (in)", toMeter: 0.0254, category: "imperial" },
        nmi: { name: "海里 (nmi)", toMeter: 1852, category: "imperial" },
        ly: { name: "光年 (ly)", toMeter: 9.461e15, category: "astro" },
        au: { name: "天文单位 (AU)", toMeter: 1.496e11, category: "astro" },
        li: { name: "里", toMeter: 500, category: "chinese" },
        zhang: { name: "丈", toMeter: 10 / 3, category: "chinese" },
        chi: { name: "尺", toMeter: 1 / 3, category: "chinese" },
        cun: { name: "寸", toMeter: 1 / 30, category: "chinese" }
      };

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const meters = value * units[fromUnit].toMeter;

        const categories = {
          metric: document.getElementById("metricResults"),
          imperial: document.getElementById("imperialResults"),
          astro: document.getElementById("astroResults"),
          chinese: document.getElementById("chineseResults")
        };

        Object.values(categories).forEach((el) => (el.innerHTML = ""));

        Object.entries(units).forEach(([key, unit]) => {
          const result = meters / unit.toMeter;
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
        if (Number.isInteger(num)) return num.toString();
        return parseFloat(num.toPrecision(10)).toString();
      }

      window.copyValue = function (value) {
        navigator.clipboard.writeText(value);
        showToast();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

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
    
