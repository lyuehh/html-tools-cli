// @ts-nocheck
// Generated from tools/converter/number-base-converter.html
// Source SHA-256: 37d62ea61da83c28227a9fb15c9c4fc72e526e6566d39cf30bcf37a9daf2ef8d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const input = document.getElementById("input").value.trim();
        const fromBase = parseInt(document.getElementById("fromBase").value);
        const num = parseInt(input, fromBase);
        if (isNaN(num)) {
          document.getElementById("results").innerHTML =
            '<p style="color:#e74c3c;text-align:center">无效输入</p>';
          return;
        }
        document.getElementById("results").innerHTML = [
          { label: "二进制 (Binary)", value: num.toString(2) },
          { label: "八进制 (Octal)", value: num.toString(8) },
          { label: "十进制 (Decimal)", value: num.toString(10) },
          { label: "十六进制 (Hex)", value: num.toString(16).toUpperCase() }
        ]
          .map(
            (r) =>
              '<div class="result-item"><span class="result-label">' +
              r.label +
              '</span><span class="result-value">' +
              r.value +
              "</span></div>"
          )
          .join("");
      }
      document.getElementById("input").addEventListener("input", convert);
      document.getElementById("fromBase").addEventListener("change", convert);
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
    
