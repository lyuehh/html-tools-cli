// @ts-nocheck
// Generated from tools/education/math-solver.html
// Source SHA-256: 5fc3c23d747c01740faf1282b60e0bed2dedc83378fa9c26cb7b469a7e097cf8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");

          const type = tab.dataset.type;
          document.getElementById("linearPanel").style.display =
            type === "linear" ? "block" : "none";
          document.getElementById("quadraticPanel").style.display =
            type === "quadratic" ? "block" : "none";
          document.getElementById("systemPanel").style.display =
            type === "system" ? "block" : "none";
        });
      });

      function formatNum(n) {
        if (Number.isInteger(n)) return n.toString();
        return n.toFixed(4).replace(/\.?0+$/, "");
      }

      function formatCoef(n, isFirst, varName) {
        if (n === 0) return "";
        let sign = n > 0 ? (isFirst ? "" : " + ") : " - ";
        let abs = Math.abs(n);
        let coef = abs === 1 ? "" : abs;
        return sign + coef + varName;
      }

      function solveLinear() {
        const a = parseFloat(document.getElementById("la").value) || 0;
        const b = parseFloat(document.getElementById("lb").value) || 0;
        const c = parseFloat(document.getElementById("lc").value) || 0;

        let eq = "";
        if (a !== 0) eq += (a === 1 ? "" : a === -1 ? "-" : a) + "x";
        if (b !== 0) eq += (b > 0 && eq ? " + " : b < 0 ? " - " : "") + (b < 0 ? -b : b);
        eq += " = " + c;
        document.getElementById("linearEq").textContent = eq || "0 = " + c;

        const stepsDiv = document.getElementById("linearSteps");
        stepsDiv.textContent = "";

        if (a === 0) {
          if (b === c) {
            document.getElementById("linearResult").textContent = "x 为任意实数";
          } else {
            document.getElementById("linearResult").textContent = "无解";
            document.getElementById("linearResult").className = "result-value error";
          }
          return;
        }

        document.getElementById("linearResult").className = "result-value";

        const x = (c - b) / a;
        document.getElementById("linearResult").textContent = "x = " + formatNum(x);

        const steps = [
          { num: "步骤 1", content: eq },
          {
            num: "步骤 2",
            content: a + "x = " + c + " - " + (b >= 0 ? "(" + b + ")" : "(" + b + ")")
          },
          { num: "步骤 3", content: a + "x = " + (c - b) },
          { num: "步骤 4", content: "x = " + (c - b) + " / " + a },
          { num: "结果", content: "x = " + formatNum(x) }
        ];

        steps.forEach((step) => {
          const div = document.createElement("div");
          div.className = "solution-step";

          const numDiv = document.createElement("div");
          numDiv.className = "step-num";
          numDiv.textContent = step.num;

          const contentDiv = document.createElement("div");
          contentDiv.className = "step-content";
          contentDiv.textContent = step.content;

          div.appendChild(numDiv);
          div.appendChild(contentDiv);
          stepsDiv.appendChild(div);
        });
      }

      function solveQuadratic() {
        const a = parseFloat(document.getElementById("qa").value) || 0;
        const b = parseFloat(document.getElementById("qb").value) || 0;
        const c = parseFloat(document.getElementById("qc").value) || 0;

        let eq = "";
        if (a !== 0) eq += (a === 1 ? "" : a === -1 ? "-" : a) + "x²";
        if (b !== 0) {
          let bStr = (Math.abs(b) === 1 ? "" : Math.abs(b)) + "x";
          eq += (b > 0 && eq ? " + " : b < 0 ? " - " : "") + bStr;
        }
        if (c !== 0) eq += (c > 0 && eq ? " + " : c < 0 ? " - " : "") + Math.abs(c);
        eq += " = 0";
        document.getElementById("quadraticEq").textContent = eq || "0 = 0";

        const stepsDiv = document.getElementById("quadraticSteps");
        stepsDiv.textContent = "";

        if (a === 0) {
          document.getElementById("discriminant").textContent = "非二次方程";
          if (b !== 0) {
            const x = -c / b;
            document.getElementById("quadraticResult").textContent = "x = " + formatNum(x);
          } else {
            document.getElementById("quadraticResult").textContent =
              c === 0 ? "x 为任意实数" : "无解";
          }
          return;
        }

        const delta = b * b - 4 * a * c;
        document.getElementById("discriminant").textContent =
          "Δ = " + b + "² - 4×" + a + "×" + c + " = " + formatNum(delta);

        const resultEl = document.getElementById("quadraticResult");
        resultEl.className = "result-value";

        if (delta < 0) {
          const realPart = -b / (2 * a);
          const imagPart = Math.sqrt(-delta) / (2 * a);
          resultEl.textContent =
            "x₁ = " +
            formatNum(realPart) +
            " + " +
            formatNum(imagPart) +
            "i, x₂ = " +
            formatNum(realPart) +
            " - " +
            formatNum(imagPart) +
            "i";

          addStep(stepsDiv, "判别式", "Δ = " + formatNum(delta) + " < 0，方程有两个共轭复根");
          addStep(stepsDiv, "复数根", "x = (-b ± √Δi) / (2a)");
        } else if (delta === 0) {
          const x = -b / (2 * a);
          resultEl.textContent = "x = " + formatNum(x) + " (重根)";

          addStep(stepsDiv, "判别式", "Δ = 0，方程有两个相等的实根");
          addStep(stepsDiv, "计算", "x = -" + b + " / (2×" + a + ") = " + formatNum(x));
        } else {
          const sqrtDelta = Math.sqrt(delta);
          const x1 = (-b + sqrtDelta) / (2 * a);
          const x2 = (-b - sqrtDelta) / (2 * a);
          resultEl.textContent = "x₁ = " + formatNum(x1) + ", x₂ = " + formatNum(x2);

          addStep(stepsDiv, "判别式", "Δ = " + formatNum(delta) + " > 0，方程有两个不相等的实根");
          addStep(stepsDiv, "√Δ", "√" + formatNum(delta) + " = " + formatNum(sqrtDelta));
          addStep(
            stepsDiv,
            "x₁",
            "(-(" + b + ") + " + formatNum(sqrtDelta) + ") / (2×" + a + ") = " + formatNum(x1)
          );
          addStep(
            stepsDiv,
            "x₂",
            "(-(" + b + ") - " + formatNum(sqrtDelta) + ") / (2×" + a + ") = " + formatNum(x2)
          );
        }
      }

      function solveSystem() {
        const a1 = parseFloat(document.getElementById("s1a").value) || 0;
        const b1 = parseFloat(document.getElementById("s1b").value) || 0;
        const c1 = parseFloat(document.getElementById("s1c").value) || 0;
        const a2 = parseFloat(document.getElementById("s2a").value) || 0;
        const b2 = parseFloat(document.getElementById("s2b").value) || 0;
        const c2 = parseFloat(document.getElementById("s2c").value) || 0;

        let eq1 = formatEq(a1, b1, c1);
        let eq2 = formatEq(a2, b2, c2);
        document.getElementById("systemEq").textContent = eq1 + "\n" + eq2;

        const stepsDiv = document.getElementById("systemSteps");
        stepsDiv.textContent = "";

        const D = a1 * b2 - a2 * b1;
        const Dx = c1 * b2 - c2 * b1;
        const Dy = a1 * c2 - a2 * c1;

        addStep(
          stepsDiv,
          "行列式 D",
          "D = " + a1 + "×" + b2 + " - " + a2 + "×" + b1 + " = " + formatNum(D)
        );

        const resultEl = document.getElementById("systemResult");
        resultEl.className = "result-value";

        if (D === 0) {
          if (Dx === 0 && Dy === 0) {
            resultEl.textContent = "无穷多解（方程相关）";
          } else {
            resultEl.textContent = "无解（方程矛盾）";
            resultEl.className = "result-value error";
          }
          return;
        }

        const x = Dx / D;
        const y = Dy / D;

        addStep(
          stepsDiv,
          "Dx",
          "Dx = " + c1 + "×" + b2 + " - " + c2 + "×" + b1 + " = " + formatNum(Dx)
        );
        addStep(
          stepsDiv,
          "Dy",
          "Dy = " + a1 + "×" + c2 + " - " + a2 + "×" + c1 + " = " + formatNum(Dy)
        );
        addStep(
          stepsDiv,
          "x",
          "x = Dx / D = " + formatNum(Dx) + " / " + formatNum(D) + " = " + formatNum(x)
        );
        addStep(
          stepsDiv,
          "y",
          "y = Dy / D = " + formatNum(Dy) + " / " + formatNum(D) + " = " + formatNum(y)
        );

        resultEl.textContent = "x = " + formatNum(x) + ", y = " + formatNum(y);
      }

      function formatEq(a, b, c) {
        let eq = "";
        if (a !== 0) eq += (a === 1 ? "" : a === -1 ? "-" : a) + "x";
        if (b !== 0) {
          let bStr = (Math.abs(b) === 1 ? "" : Math.abs(b)) + "y";
          eq += (b > 0 && eq ? " + " : b < 0 ? " - " : "") + bStr;
        }
        return eq + " = " + c;
      }

      function addStep(container, num, content) {
        const div = document.createElement("div");
        div.className = "solution-step";

        const numDiv = document.createElement("div");
        numDiv.className = "step-num";
        numDiv.textContent = num;

        const contentDiv = document.createElement("div");
        contentDiv.className = "step-content";
        contentDiv.textContent = content;

        div.appendChild(numDiv);
        div.appendChild(contentDiv);
        container.appendChild(div);
      }

      solveLinear();
      solveQuadratic();
      solveSystem();

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
    
