// @ts-nocheck
// Generated from tools/converter/power-converter.html
// Source SHA-256: f157512237a4e806a0faa1446c76805368bd29e0ab6b93ef5dd55f5155a4d325
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const toW = {
        w: 1,
        kw: 1000,
        mw: 1000000,
        hp: 745.7,
        ps: 735.5,
        ftlbs: 1.356,
        btuhr: 0.293,
        cals: 4.184
      };
      const labels = {
        w: "瓦特 (W)",
        kw: "千瓦 (kW)",
        mw: "兆瓦 (MW)",
        hp: "马力 (hp)",
        ps: "公制马力 (PS)",
        ftlbs: "英尺·磅力/秒",
        btuhr: "BTU/小时",
        cals: "卡路里/秒"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const watts = value * toW[unit];
        let html = "";
        for (const [key, factor] of Object.entries(toW)) {
          const result = watts / factor;
          const formatted =
            result < 0.0001 || result > 999999
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
    
