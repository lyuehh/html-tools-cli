// @ts-nocheck
// Generated from tools/math/permutation-combination.html
// Source SHA-256: 886074cde97aa9954b0cba4b18fcd68ee7d7ec93fda3748eb56bcc88c21a7d0b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "permutation";

      function setMode(m, btn) {
        mode = m;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        btn.classList.add("active");
        calculate();
      }

      function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1n;
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); i++) {
          result *= i;
        }
        return result;
      }

      function permutation(n, r) {
        if (r > n || r < 0 || n < 0) return 0n;
        return factorial(n) / factorial(n - r);
      }

      function combination(n, r) {
        if (r > n || r < 0 || n < 0) return 0n;
        return factorial(n) / (factorial(r) * factorial(n - r));
      }

      function formatBigInt(num) {
        const str = num.toString();
        if (str.length <= 15) return str;

        // Scientific notation
        const exp = str.length - 1;
        const mantissa = str[0] + "." + str.slice(1, 5);
        return `≈ ${mantissa} × 10^${exp}`;
      }

      function calculate() {
        const n = parseInt(document.getElementById("n").value);
        const r = parseInt(document.getElementById("r").value);

        if (isNaN(n) || isNaN(r) || n < 0 || r < 0) {
          document.getElementById("resultValue").textContent = "-";
          document.getElementById("scientific").textContent = "";
          return;
        }

        if (r > n) {
          document.getElementById("resultValue").textContent = "0";
          document.getElementById("scientific").textContent = "r 不能大于 n";
          return;
        }

        let result;
        if (mode === "permutation") {
          result = permutation(n, r);
          document.getElementById("formula").textContent =
            `P(${n}, ${r}) = ${n}! / (${n}-${r})! = ${n}! / ${n - r}!`;
          document.getElementById("resultLabel").textContent = `排列数 P(${n}, ${r})`;
          document.getElementById("explanation").innerHTML = `
          <h4>排列 (Permutation)</h4>
          <p>从 ${n} 个不同元素中取出 ${r} 个元素进行排列（考虑顺序）的方法数。</p>
          <p>公式: <code>P(n,r) = n! / (n-r)!</code></p>
          <p>例如: 从${n}人中选${r}人站成一排的排法数。</p>
        `;
        } else {
          result = combination(n, r);
          document.getElementById("formula").textContent =
            `C(${n}, ${r}) = ${n}! / (${r}! × (${n}-${r})!) = ${n}! / (${r}! × ${n - r}!)`;
          document.getElementById("resultLabel").textContent = `组合数 C(${n}, ${r})`;
          document.getElementById("explanation").innerHTML = `
          <h4>组合 (Combination)</h4>
          <p>从 ${n} 个不同元素中取出 ${r} 个元素的组合（不考虑顺序）的方法数。</p>
          <p>公式: <code>C(n,r) = n! / (r! × (n-r)!)</code></p>
          <p>例如: 从${n}人中选${r}人组成小组的选法数。</p>
        `;
        }

        const resultStr = result.toString();
        if (resultStr.length <= 15) {
          document.getElementById("resultValue").textContent = resultStr;
          document.getElementById("scientific").textContent = "";
        } else {
          document.getElementById("resultValue").textContent = formatBigInt(result);
          document.getElementById("scientific").textContent = `共 ${resultStr.length} 位数`;
        }
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
    
