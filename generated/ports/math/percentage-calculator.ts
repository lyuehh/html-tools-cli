// @ts-nocheck
// Generated from tools/math/percentage-calculator.html
// Source SHA-256: 0511bfe9bad7b4b433d6b6d3f0849129944c590afd391f2f43aef3cf3dd0d833
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatNum(n) {
        if (isNaN(n) || !isFinite(n)) return "-";
        return n.toLocaleString("zh-CN", { maximumFractionDigits: 4 });
      }

      function calc1() {
        const x = parseFloat(document.getElementById("calc1_x").value);
        const y = parseFloat(document.getElementById("calc1_y").value);
        const result = (x * y) / 100;
        document.getElementById("result1").textContent = formatNum(result);
      }

      function calc2() {
        const x = parseFloat(document.getElementById("calc2_x").value);
        const y = parseFloat(document.getElementById("calc2_y").value);
        const result = (x / y) * 100;
        document.getElementById("result2").textContent = formatNum(result) + "%";
      }

      function calc3() {
        const x = parseFloat(document.getElementById("calc3_x").value);
        const y = parseFloat(document.getElementById("calc3_y").value);
        const result = ((y - x) / x) * 100;
        const prefix = result >= 0 ? "+" : "";
        document.getElementById("result3").textContent = prefix + formatNum(result) + "%";
        document.getElementById("result3").style.color = result >= 0 ? "#10b981" : "#ef4444";
      }

      function calc4() {
        const x = parseFloat(document.getElementById("calc4_x").value);
        const y = parseFloat(document.getElementById("calc4_y").value);
        const result = (x * y) / 10;
        document.getElementById("result4").textContent = formatNum(result);
      }

      function calc5() {
        const x = parseFloat(document.getElementById("calc5_x").value);
        const y = parseFloat(document.getElementById("calc5_y").value);
        const result = x * (1 + y / 100);
        document.getElementById("result5").textContent = formatNum(result);
      }

      function calc6() {
        const x = parseFloat(document.getElementById("calc6_x").value);
        const y = parseFloat(document.getElementById("calc6_y").value);
        const result = x * (1 - y / 100);
        document.getElementById("result6").textContent = formatNum(result);
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
    
