// @ts-nocheck
// Generated from tools/converter/energy-converter.html
// Source SHA-256: f2d1603ebcefae1dc976e7dc7d302ca1b130c078dda0480f1d23ed264e2d0495
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const toJ = {
        j: 1,
        kj: 1000,
        cal: 4.184,
        kcal: 4184,
        wh: 3600,
        kwh: 3600000,
        ev: 1.602e-19,
        btu: 1055.06
      };
      const labels = {
        j: "焦耳 (J)",
        kj: "千焦 (kJ)",
        cal: "卡路里 (cal)",
        kcal: "千卡 (kcal)",
        wh: "瓦时 (Wh)",
        kwh: "千瓦时 (kWh)",
        ev: "电子伏特 (eV)",
        btu: "英热单位 (BTU)"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const joules = value * toJ[unit];
        let html = "";
        for (const [key, factor] of Object.entries(toJ)) {
          const result = joules / factor;
          const formatted =
            result < 0.0001 || result > 999999999
              ? result.toExponential(4)
              : result.toLocaleString("zh-CN", { maximumFractionDigits: 6 });
          html += `<div class="result-item"><span class="result-label">${labels[key]}</span><span class="result-value">${formatted}</span></div>`;
        }
        document.getElementById("results").innerHTML = html;
      }
      document.getElementById("value").addEventListener("input", convert);
      document.getElementById("unit").addEventListener("change", convert);
      convert();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
