// @ts-nocheck
// Generated from tools/calculator/storage-converter.html
// Source SHA-256: aa8224daf42ec9ae89faffa081ec124b81c685f39d2acd32bedcbac6835099e9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const units = ["B", "KB", "MB", "GB", "TB", "PB"];
      function convert() {
        const v = parseFloat(document.getElementById("value").value) || 0;
        const u = parseInt(document.getElementById("unit").value);
        const bytes = v * Math.pow(1024, u);
        let html = "";
        for (let i = 0; i < units.length; i++) {
          const val = bytes / Math.pow(1024, i);
          const display =
            val >= 1
              ? val.toLocaleString(undefined, { maximumFractionDigits: 4 })
              : val.toExponential(4);
          html +=
            '<div class="result"><span class="label">' +
            units[i] +
            '</span><span class="value">' +
            display +
            "</span></div>";
        }
        document.getElementById("results").innerHTML = html;
      }
      convert();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
