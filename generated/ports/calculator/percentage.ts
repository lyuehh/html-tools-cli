// @ts-nocheck
// Generated from tools/calculator/percentage.html
// Source SHA-256: 40b45e398b6ac1413e847aa5cd6a1b04dbd0cc036cb07d2db70262302fc1964c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Calc 1: X is what % of Y
      document.getElementById("calc1-x").addEventListener("input", calc1);
      document.getElementById("calc1-y").addEventListener("input", calc1);
      function calc1() {
        const x = parseFloat(document.getElementById("calc1-x").value);
        const y = parseFloat(document.getElementById("calc1-y").value);
        const r = document.getElementById("result1");
        if (!isNaN(x) && !isNaN(y) && y !== 0) {
          r.textContent = ((x / y) * 100).toFixed(4).replace(/\.?0+$/, "") + "%";
        } else {
          r.textContent = "?%";
        }
      }

      // Calc 2: X% of Y
      document.getElementById("calc2-x").addEventListener("input", calc2);
      document.getElementById("calc2-y").addEventListener("input", calc2);
      function calc2() {
        const y = parseFloat(document.getElementById("calc2-y").value);
        const x = parseFloat(document.getElementById("calc2-x").value);
        const r = document.getElementById("result2");
        if (!isNaN(x) && !isNaN(y)) {
          r.textContent = ((y * x) / 100).toFixed(4).replace(/\.?0+$/, "");
        } else {
          r.textContent = "?";
        }
      }

      // Calc 3: X +/- Y%
      document.getElementById("calc3-x").addEventListener("input", calc3);
      document.getElementById("calc3-y").addEventListener("input", calc3);
      document.getElementById("calc3-op").addEventListener("change", calc3);
      function calc3() {
        const x = parseFloat(document.getElementById("calc3-x").value);
        const y = parseFloat(document.getElementById("calc3-y").value);
        const op = document.getElementById("calc3-op").value;
        const r = document.getElementById("result3");
        if (!isNaN(x) && !isNaN(y)) {
          const change = (x * y) / 100;
          const result = op === "add" ? x + change : x - change;
          r.textContent = result.toFixed(4).replace(/\.?0+$/, "");
        } else {
          r.textContent = "?";
        }
      }

      // Calc 4: % change from X to Y
      document.getElementById("calc4-x").addEventListener("input", calc4);
      document.getElementById("calc4-y").addEventListener("input", calc4);
      function calc4() {
        const x = parseFloat(document.getElementById("calc4-x").value);
        const y = parseFloat(document.getElementById("calc4-y").value);
        const r = document.getElementById("result4");
        if (!isNaN(x) && !isNaN(y) && x !== 0) {
          const pct = ((y - x) / x) * 100;
          const sign = pct >= 0 ? "+" : "";
          r.textContent = sign + pct.toFixed(4).replace(/\.?0+$/, "") + "%";
        } else {
          r.textContent = "?%";
        }
      }

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
    
