// @ts-nocheck
// Generated from tools/math/factorial-calculator.html
// Source SHA-256: 1c0756f01e47f53764774ba8a704ec6b92032ba504cd0b7433787e0c0b862487
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1n;
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); i++) {
          result *= i;
        }
        return result;
      }

      function formatBigInt(n) {
        if (typeof n === "bigint") {
          const str = n.toString();
          if (str.length > 100) {
            return (
              str.substring(0, 50) + "..." + str.substring(str.length - 20) + ` (${str.length}位数)`
            );
          }
          return str;
        }
        return n.toString();
      }

      function calcFactorial() {
        const n = parseInt(document.getElementById("factN").value);
        if (isNaN(n) || n < 0) {
          document.getElementById("factResult").textContent = "请输入非负整数";
          return;
        }
        if (n > 170) {
          const result = factorial(n);
          document.getElementById("factResult").textContent = formatBigInt(result);
        } else {
          const result = factorial(n);
          document.getElementById("factResult").textContent = formatBigInt(result);
        }
      }

      function calcPermutation() {
        const n = parseInt(document.getElementById("permN").value);
        const r = parseInt(document.getElementById("permR").value);

        if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
          document.getElementById("permResult").textContent = "请输入非负整数";
          return;
        }
        if (r > n) {
          document.getElementById("permResult").textContent = "r 不能大于 n";
          return;
        }

        const result = factorial(n) / factorial(n - r);
        document.getElementById("permResult").textContent = formatBigInt(result);
      }

      function calcCombination() {
        const n = parseInt(document.getElementById("combN").value);
        const r = parseInt(document.getElementById("combR").value);

        if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
          document.getElementById("combResult").textContent = "请输入非负整数";
          return;
        }
        if (r > n) {
          document.getElementById("combResult").textContent = "r 不能大于 n";
          return;
        }

        const result = factorial(n) / (factorial(r) * factorial(n - r));
        document.getElementById("combResult").textContent = formatBigInt(result);
      }

      function calcDoubleFactorial() {
        const n = parseInt(document.getElementById("dfactN").value);

        if (isNaN(n) || n < 0) {
          document.getElementById("dfactResult").textContent = "请输入非负整数";
          return;
        }

        if (n === 0 || n === 1) {
          document.getElementById("dfactResult").textContent = "1";
          return;
        }

        let result = 1n;
        for (let i = BigInt(n); i >= 1n; i -= 2n) {
          result *= i;
        }
        document.getElementById("dfactResult").textContent = formatBigInt(result);
      }

      // Initial calculations
      calcFactorial();
      calcPermutation();
      calcCombination();
      calcDoubleFactorial();

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
    
