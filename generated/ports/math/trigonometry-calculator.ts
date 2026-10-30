// @ts-nocheck
// Generated from tools/math/trigonometry-calculator.html
// Source SHA-256: 1801a90952303ea808155be25b20f225610dd4f6425d9a3597f82c139a64e7ce
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const angle = parseFloat(document.getElementById("angle").value);
        const unit = document.getElementById("unit").value;

        if (isNaN(angle)) {
          alert("请输入有效的数字");
          return;
        }

        const rad = unit === "deg" ? (angle * Math.PI) / 180 : angle;

        const sin = Math.sin(rad);
        const cos = Math.cos(rad);
        const tan = Math.tan(rad);
        const csc = 1 / sin;
        const sec = 1 / cos;
        const cot = 1 / tan;

        document.getElementById("sinVal").textContent = formatNum(sin);
        document.getElementById("cosVal").textContent = formatNum(cos);
        document.getElementById("tanVal").textContent =
          Math.abs(cos) < 1e-10 ? "∞" : formatNum(tan);
        document.getElementById("cscVal").textContent =
          Math.abs(sin) < 1e-10 ? "∞" : formatNum(csc);
        document.getElementById("secVal").textContent =
          Math.abs(cos) < 1e-10 ? "∞" : formatNum(sec);
        document.getElementById("cotVal").textContent =
          Math.abs(sin) < 1e-10 ? "∞" : formatNum(cot);
      }

      function formatNum(n) {
        if (Math.abs(n) < 1e-10) return "0";
        if (Math.abs(n - 1) < 1e-10) return "1";
        if (Math.abs(n + 1) < 1e-10) return "-1";
        return n.toFixed(6).replace(/\.?0+$/, "");
      }

      calculate();

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
    
