// @ts-nocheck
// Generated from tools/math/quadratic-equation.html
// Source SHA-256: 674ca7bfa316df500666f970c37b5d96bd75c87501606b1a951715246fee836d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatNumber(n) {
        if (Number.isInteger(n)) return n.toString();
        return n.toFixed(6).replace(/\.?0+$/, "");
      }

      function solve() {
        const a = parseFloat(document.getElementById("a").value);
        const b = parseFloat(document.getElementById("b").value);
        const c = parseFloat(document.getElementById("c").value);

        const discEl = document.getElementById("discriminant");
        const x1El = document.getElementById("x1");
        const x2El = document.getElementById("x2");
        const vertexEl = document.getElementById("vertex");
        const stepsEl = document.getElementById("stepsContainer");

        if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
          discEl.className = "discriminant";
          discEl.textContent = a === 0 ? "错误: a 不能为 0 (非二次方程)" : "请输入有效系数";
          x1El.textContent = "-";
          x2El.textContent = "-";
          vertexEl.textContent = "-";
          stepsEl.innerHTML = "";
          return;
        }

        const D = b * b - 4 * a * c;
        let steps = [];

        steps.push(`方程: ${a}x² + ${b}x + ${c} = 0`);
        steps.push(`判别式: Δ = b² - 4ac = ${b}² - 4×${a}×${c} = ${formatNumber(D)}`);

        if (D > 0) {
          discEl.className = "discriminant positive";
          discEl.textContent = `Δ = ${formatNumber(D)} > 0，方程有两个不相等的实根`;

          const sqrtD = Math.sqrt(D);
          const x1 = (-b + sqrtD) / (2 * a);
          const x2 = (-b - sqrtD) / (2 * a);

          steps.push(`√Δ = √${formatNumber(D)} = ${formatNumber(sqrtD)}`);
          steps.push(
            `x₁ = (-b + √Δ) / 2a = (${-b} + ${formatNumber(sqrtD)}) / ${2 * a} = ${formatNumber(x1)}`
          );
          steps.push(
            `x₂ = (-b - √Δ) / 2a = (${-b} - ${formatNumber(sqrtD)}) / ${2 * a} = ${formatNumber(x2)}`
          );

          x1El.textContent = formatNumber(x1);
          x2El.textContent = formatNumber(x2);
        } else if (D === 0) {
          discEl.className = "discriminant zero";
          discEl.textContent = `Δ = 0，方程有两个相等的实根（重根）`;

          const x = -b / (2 * a);
          steps.push(`x₁ = x₂ = -b / 2a = ${-b} / ${2 * a} = ${formatNumber(x)}`);

          x1El.textContent = formatNumber(x);
          x2El.textContent = formatNumber(x);
        } else {
          discEl.className = "discriminant negative";
          discEl.textContent = `Δ = ${formatNumber(D)} < 0，方程有两个共轭复根`;

          const realPart = -b / (2 * a);
          const imagPart = Math.sqrt(-D) / (2 * a);

          steps.push(`实部: -b / 2a = ${-b} / ${2 * a} = ${formatNumber(realPart)}`);
          steps.push(
            `虚部: √|Δ| / 2a = √${formatNumber(-D)} / ${2 * a} = ${formatNumber(imagPart)}`
          );
          steps.push(`x₁ = ${formatNumber(realPart)} + ${formatNumber(imagPart)}i`);
          steps.push(`x₂ = ${formatNumber(realPart)} - ${formatNumber(imagPart)}i`);

          x1El.textContent = `${formatNumber(realPart)} + ${formatNumber(imagPart)}i`;
          x2El.textContent = `${formatNumber(realPart)} - ${formatNumber(imagPart)}i`;
        }

        // Vertex
        const vx = -b / (2 * a);
        const vy = a * vx * vx + b * vx + c;
        vertexEl.textContent = `(${formatNumber(vx)}, ${formatNumber(vy)})`;
        steps.push(`顶点: x = -b/2a = ${formatNumber(vx)}, y = ${formatNumber(vy)}`);

        stepsEl.innerHTML = steps
          .map((step, i) => `<div class="step"><span class="number">${i + 1}</span>${step}</div>`)
          .join("");
      }

      solve();

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
    
