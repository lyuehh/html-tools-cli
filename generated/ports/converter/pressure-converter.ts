// @ts-nocheck
// Generated from tools/converter/pressure-converter.html
// Source SHA-256: 490dc5c7748eaf60c0982330656b704eccb7c9e1f27056a77334d96b6de53bf0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const toPa = {
        pa: 1,
        kpa: 1000,
        mpa: 1000000,
        bar: 100000,
        atm: 101325,
        psi: 6894.76,
        mmhg: 133.322,
        torr: 133.322
      };
      const labels = {
        pa: "帕斯卡 (Pa)",
        kpa: "千帕 (kPa)",
        mpa: "兆帕 (MPa)",
        bar: "巴 (bar)",
        atm: "标准大气压 (atm)",
        psi: "psi",
        mmhg: "毫米汞柱 (mmHg)",
        torr: "托 (Torr)"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const pa = value * toPa[unit];
        let html = "";
        for (const [key, factor] of Object.entries(toPa)) {
          const result = pa / factor;
          const formatted =
            result < 0.0001
              ? result.toExponential(4)
              : result > 999999
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
    
