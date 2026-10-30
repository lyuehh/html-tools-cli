// @ts-nocheck
// Generated from tools/math/equation-solver.html
// Source SHA-256: 24410559f91690cd865b87ff7d7f14ea83a225fcd59dba749024d108428d18e9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentType = "linear";

      function switchType(type) {
        currentType = type;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document
          .querySelector(`.tab:nth-child(${type === "linear" ? 1 : 2})`)
          .classList.add("active");

        document.getElementById("linearForm").style.display = type === "linear" ? "block" : "none";
        document.getElementById("quadraticForm").style.display =
          type === "quadratic" ? "block" : "none";
        document.getElementById("result").style.display = "none";

        const formulaInfo = document.getElementById("formulaInfo");
        if (type === "linear") {
          formulaInfo.innerHTML = `<h4>一元一次方程 ax + b = 0</h4><p>解: <code>x = -b/a</code> (a ≠ 0)</p>`;
        } else {
          formulaInfo.innerHTML = `<h4>一元二次方程 ax² + bx + c = 0</h4><p>判别式: <code>Δ = b² - 4ac</code></p><p>求根公式: <code>x = (-b ± √Δ) / 2a</code></p>`;
        }
      }

      function solve() {
        const resultEl = document.getElementById("result");
        const valueEl = document.getElementById("resultValue");
        const detailEl = document.getElementById("resultDetail");

        if (currentType === "linear") {
          const a = parseFloat(document.getElementById("linear_a").value);
          const b = parseFloat(document.getElementById("linear_b").value);

          if (a === 0) {
            if (b === 0) {
              valueEl.innerHTML = "无穷多解";
              detailEl.textContent = "方程 0 = 0 对任意 x 成立";
            } else {
              valueEl.innerHTML = '<span class="error">无解</span>';
              detailEl.textContent = `方程 ${b} = 0 不成立`;
            }
          } else {
            const x = -b / a;
            valueEl.textContent = `x = ${formatNumber(x)}`;
            detailEl.innerHTML = `
            方程: ${formatCoef(a)}x ${formatSign(b)} = 0<br>
            解: x = -${formatNumber(b)} / ${formatNumber(a)} = ${formatNumber(x)}<br>
            验证: ${formatNumber(a)} × ${formatNumber(x)} + ${formatNumber(b)} = ${formatNumber(a * x + b)}
          `;
          }
        } else {
          const a = parseFloat(document.getElementById("quad_a").value);
          const b = parseFloat(document.getElementById("quad_b").value);
          const c = parseFloat(document.getElementById("quad_c").value);

          if (a === 0) {
            valueEl.innerHTML = '<span class="error">a 不能为 0</span>';
            detailEl.textContent = "这不是一个二次方程，请使用一元一次方程求解";
          } else {
            const delta = b * b - 4 * a * c;
            let solutions;

            if (delta > 0) {
              const x1 = (-b + Math.sqrt(delta)) / (2 * a);
              const x2 = (-b - Math.sqrt(delta)) / (2 * a);
              valueEl.textContent = `x₁ = ${formatNumber(x1)}, x₂ = ${formatNumber(x2)}`;
              solutions = "两个不相等的实根";
            } else if (delta === 0) {
              const x = -b / (2 * a);
              valueEl.textContent = `x = ${formatNumber(x)}`;
              solutions = "两个相等的实根（重根）";
            } else {
              const realPart = -b / (2 * a);
              const imagPart = Math.sqrt(-delta) / (2 * a);
              valueEl.textContent = `x₁ = ${formatNumber(realPart)} + ${formatNumber(imagPart)}i, x₂ = ${formatNumber(realPart)} - ${formatNumber(imagPart)}i`;
              solutions = "两个共轭复根";
            }

            detailEl.innerHTML = `
            方程: ${formatCoef(a)}x² ${formatSign(b)}x ${formatSign(c)} = 0<br>
            判别式: Δ = ${formatNumber(b)}² - 4 × ${formatNumber(a)} × ${formatNumber(c)} = ${formatNumber(delta)}<br>
            结论: ${solutions}
          `;
          }
        }

        resultEl.style.display = "block";
      }

      function formatNumber(n) {
        if (Number.isInteger(n)) return n.toString();
        return parseFloat(n.toFixed(6)).toString();
      }

      function formatCoef(n) {
        if (n === 1) return "";
        if (n === -1) return "-";
        return n.toString();
      }

      function formatSign(n) {
        return n >= 0 ? `+ ${Math.abs(n)}` : `- ${Math.abs(n)}`;
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
    
