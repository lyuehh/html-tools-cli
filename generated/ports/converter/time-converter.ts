// @ts-nocheck
// Generated from tools/converter/time-converter.html
// Source SHA-256: 89490ffff5ee68119a444437c68c6f664346ba08281f4015bd0589bbfc0ea89c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = {
        ms: 0.001,
        s: 1,
        min: 60,
        h: 3600,
        d: 86400,
        w: 604800,
        m: 2592000,
        y: 31536000
      };
      const labels = {
        ms: "毫秒",
        s: "秒",
        min: "分钟",
        h: "小时",
        d: "天",
        w: "周",
        m: "月",
        y: "年"
      };
      function convert() {
        const value = parseFloat(document.getElementById("value").value) || 0;
        const unit = document.getElementById("unit").value;
        const seconds = value * units[unit];
        let html = "";
        for (const [key, factor] of Object.entries(units)) {
          const result = seconds / factor;
          const formatted =
            result < 0.0001
              ? result.toExponential(4)
              : result > 999999
                ? result.toExponential(4)
                : result.toLocaleString("zh-CN", { maximumFractionDigits: 4 });
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
    
