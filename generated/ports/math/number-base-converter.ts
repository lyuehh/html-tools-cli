// @ts-nocheck
// Generated from tools/math/number-base-converter.html
// Source SHA-256: 8d97e71bfe9942ec7127f0539b4a1365c6dc66616083297d78aa30a90898f3ed
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const input = document.getElementById("inputValue").value.trim();
        const base = parseInt(document.getElementById("inputBase").value);

        if (!input) {
          document.getElementById("binary").textContent = "-";
          document.getElementById("octal").textContent = "-";
          document.getElementById("decimal").textContent = "-";
          document.getElementById("hex").textContent = "-";
          document.getElementById("bitDisplay").style.display = "none";
          return;
        }

        try {
          const decimal = parseInt(input, base);

          if (isNaN(decimal)) {
            throw new Error("Invalid number");
          }

          document.getElementById("binary").textContent = decimal.toString(2);
          document.getElementById("octal").textContent = decimal.toString(8);
          document.getElementById("decimal").textContent = decimal.toString(10);
          document.getElementById("hex").textContent = decimal.toString(16).toUpperCase();

          // Show bit display for positive integers
          if (decimal >= 0 && decimal <= 0xffffffff) {
            document.getElementById("bitDisplay").style.display = "block";
            const binary32 = (decimal >>> 0).toString(2).padStart(32, "0");
            const bitsHtml = binary32
              .split("")
              .map((b) => `<span class="bit ${b === "1" ? "one" : ""}">${b}</span>`)
              .join("");
            document.getElementById("bits").innerHTML = bitsHtml;

            const indexHtml = Array.from({ length: 32 }, (_, i) => `<span>${31 - i}</span>`).join(
              ""
            );
            document.getElementById("bitIndex").innerHTML = indexHtml;
          } else {
            document.getElementById("bitDisplay").style.display = "none";
          }
        } catch (e) {
          document.getElementById("binary").textContent = "无效输入";
          document.getElementById("octal").textContent = "无效输入";
          document.getElementById("decimal").textContent = "无效输入";
          document.getElementById("hex").textContent = "无效输入";
          document.getElementById("bitDisplay").style.display = "none";
        }
      }

      function copyValue(id) {
        const value = document.getElementById(id).textContent;
        if (value && value !== "-" && value !== "无效输入") {
          navigator.clipboard.writeText(value);
        }
      }

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
