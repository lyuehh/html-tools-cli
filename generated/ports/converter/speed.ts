// @ts-nocheck
// Generated from tools/converter/speed.html
// Source SHA-256: 290ce1b2e9d847344b4c65a79a9f8083a4d35eae577323989140d121a6469359
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        kmh: { name: "千米/时 (km/h)", toMs: 1 / 3.6 },
        ms: { name: "米/秒 (m/s)", toMs: 1 },
        mph: { name: "英里/时 (mph)", toMs: 0.44704 },
        knot: { name: "节 (knot)", toMs: 0.514444 },
        mach: { name: "马赫 (Mach)", toMs: 340.29 },
        fps: { name: "英尺/秒 (ft/s)", toMs: 0.3048 },
        c: { name: "光速 (c)", toMs: 299792458 }
      };

      const comparisons = [
        { icon: "🚶", name: "步行速度", speed: 1.4 },
        { icon: "🚴", name: "自行车", speed: 5.5 },
        { icon: "🚗", name: "城市驾车", speed: 16.7 },
        { icon: "🚄", name: "高铁", speed: 97.2 },
        { icon: "✈️", name: "民航客机", speed: 250 },
        { icon: "🔊", name: "音速", speed: 340.29 },
        { icon: "🚀", name: "第一宇宙速度", speed: 7900 }
      ];

      function convert() {
        const value = parseFloat(document.getElementById("inputValue").value) || 0;
        const fromUnit = document.getElementById("inputUnit").value;
        const ms = value * units[fromUnit].toMs;

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        Object.entries(units).forEach(([key, unit]) => {
          const result = ms / unit.toMs;
          const formatted = formatNumber(result);
          resultsDiv.innerHTML += `
                    <div class="result-item" onclick="copyValue('${formatted}')">
                        <div class="unit">${unit.name}</div>
                        <div class="value">${formatted}</div>
                    </div>
                `;
        });

        updateComparisons(ms);
      }

      function updateComparisons(ms) {
        const div = document.getElementById("comparisons");
        div.innerHTML = comparisons
          .map((c) => {
            const ratio = ms / c.speed;
            const ratioText =
              ratio >= 1 ? `${formatNumber(ratio)}x` : `${formatNumber(1 / ratio)}x 慢`;
            return `
                    <div class="comparison-item">
                        <span class="comparison-icon">${c.icon}</span>
                        <span class="comparison-name">${c.name}</span>
                        <span class="comparison-speed">${ratioText}</span>
                    </div>
                `;
          })
          .join("");
      }

      function formatNumber(num) {
        if (num === 0) return "0";
        if (Math.abs(num) >= 1e10 || Math.abs(num) < 1e-10) {
          return num.toExponential(4);
        }
        if (Math.abs(num) < 0.01) return num.toExponential(4);
        return parseFloat(num.toPrecision(8)).toString();
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
    
