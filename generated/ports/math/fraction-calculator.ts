// @ts-nocheck
// Generated from tools/math/fraction-calculator.html
// Source SHA-256: a4b8f40177ae8fbd776a5d45975baacd0cdd8b00dc896f50ffac6f939015884e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentOperator = "+";

      function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
          [a, b] = [b, a % b];
        }
        return a;
      }

      function reduceFraction(num, denom) {
        if (denom === 0) return { num: 0, denom: 1 };
        const g = gcd(num, denom);
        num = num / g;
        denom = denom / g;
        if (denom < 0) {
          num = -num;
          denom = -denom;
        }
        return { num, denom };
      }

      function setOperator(op) {
        currentOperator = op;
        document.querySelectorAll(".operator-btn").forEach((btn) => btn.classList.remove("active"));
        const btnId = op === "+" ? "opAdd" : op === "-" ? "opSub" : op === "*" ? "opMul" : "opDiv";
        document.getElementById(btnId).classList.add("active");
        calculate();
      }

      function calculate() {
        const num1 = parseInt(document.getElementById("num1").value) || 0;
        const denom1 = parseInt(document.getElementById("denom1").value) || 1;
        const num2 = parseInt(document.getElementById("num2").value) || 0;
        const denom2 = parseInt(document.getElementById("denom2").value) || 1;

        let resultNum, resultDenom;

        switch (currentOperator) {
          case "+":
            resultNum = num1 * denom2 + num2 * denom1;
            resultDenom = denom1 * denom2;
            break;
          case "-":
            resultNum = num1 * denom2 - num2 * denom1;
            resultDenom = denom1 * denom2;
            break;
          case "*":
            resultNum = num1 * num2;
            resultDenom = denom1 * denom2;
            break;
          case "/":
            resultNum = num1 * denom2;
            resultDenom = denom1 * num2;
            break;
        }

        const reduced = reduceFraction(resultNum, resultDenom);

        document.getElementById("result").innerHTML = `
        <span class="num">${reduced.num}</span>
        <div class="line"></div>
        <span class="denom">${reduced.denom}</span>
      `;

        const decimal = reduced.denom !== 0 ? (reduced.num / reduced.denom).toFixed(4) : "∞";
        document.getElementById("decimal").textContent = `≈ ${decimal}`;
      }

      function simplify() {
        const num = parseInt(document.getElementById("simplifyNum").value) || 0;
        const denom = parseInt(document.getElementById("simplifyDenom").value) || 1;

        const reduced = reduceFraction(num, denom);

        document.getElementById("simplifiedNum").value = reduced.num;
        document.getElementById("simplifiedDenom").value = reduced.denom;
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
    
