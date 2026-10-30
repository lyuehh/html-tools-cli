// @ts-nocheck
// Generated from tools/calculator/probability.html
// Source SHA-256: 93d755821910b1f01e21191c9c1c5506583e6bbbfe42987b95338ee0b7316bfc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let selectedDice = [];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        html.setAttribute("data-theme", current === "light" ? "dark" : "light");
      };

      window.switchTab = function (tabName) {
        document.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        document.querySelectorAll(".tab-content").forEach(function (c) {
          c.classList.remove("active");
        });
        document
          .querySelector("[onclick=\"switchTab('" + tabName + "')\"]")
          .classList.add("active");
        document.getElementById(tabName + "-tab").classList.add("active");

        if (tabName === "dice") {
          updateDiceGrid();
        }
      };

      // Factorial with memoization
      const factorialCache = {};
      window.factorial = function (n) {
        if (n <= 1) return 1;
        if (factorialCache[n]) return factorialCache[n];
        factorialCache[n] = n * factorial(n - 1);
        return factorialCache[n];
      };

      // Combination C(n, k)
      function combination(n, k) {
        if (k > n || k < 0) return 0;
        if (k === 0 || k === n) return 1;
        return factorial(n) / (factorial(k) * factorial(n - k));
      }

      function formatProbability(p) {
        const percent = (p * 100).toFixed(4);
        const fraction = toFraction(p);
        return percent + "%" + (fraction ? " (" + fraction + ")" : "");
      }

      function toFraction(decimal, tolerance) {
        tolerance = tolerance || 0.0001;
        if (decimal === 0) return "0";
        if (decimal === 1) return "1";

        let h1 = 1,
          h2 = 0,
          k1 = 0,
          k2 = 1;
        let b = decimal;

        do {
          const a = Math.floor(b);
          let aux = h1;
          h1 = a * h1 + h2;
          h2 = aux;
          aux = k1;
          k1 = a * k1 + k2;
          k2 = aux;
          b = 1 / (b - a);
        } while (Math.abs(decimal - h1 / k1) > decimal * tolerance && k1 < 10000);

        if (k1 > 1000) return null;
        return h1 + "/" + k1;
      }

      window.calculateBasic = function () {
        const favorable = parseInt(document.getElementById("favorable").value) || 0;
        const total = parseInt(document.getElementById("total").value) || 1;

        if (favorable > total) {
          alert("有利结果数不能大于总可能结果数");
          return;
        }

        const prob = favorable / total;
        document.getElementById("result").textContent = formatProbability(prob);
        document.getElementById("resultDetail").textContent =
          favorable + " / " + total + " = " + prob.toFixed(6);
      };

      window.clearBasic = function () {
        document.getElementById("favorable").value = 1;
        document.getElementById("total").value = 6;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
      };

      window.calculateCombined = function () {
        const pA = parseFloat(document.getElementById("probA").value) || 0;
        const pB = parseFloat(document.getElementById("probB").value) || 0;
        const type = document.getElementById("combineType").value;

        let result, detail;

        switch (type) {
          case "and":
            result = pA * pB;
            detail = "P(A 且 B) = " + pA + " × " + pB + " = " + result.toFixed(6);
            break;
          case "or":
            result = pA + pB - pA * pB;
            detail =
              "P(A 或 B) = " +
              pA +
              " + " +
              pB +
              " - " +
              (pA * pB).toFixed(6) +
              " = " +
              result.toFixed(6);
            break;
          case "not":
            result = 1 - pA;
            detail = "P(非A) = 1 - " + pA + " = " + result.toFixed(6);
            break;
          case "xor":
            result = pA + pB - 2 * pA * pB;
            detail =
              "P(仅一个) = " +
              pA +
              " + " +
              pB +
              " - 2×" +
              (pA * pB).toFixed(6) +
              " = " +
              result.toFixed(6);
            break;
        }

        document.getElementById("result").textContent = formatProbability(result);
        document.getElementById("resultDetail").textContent = detail;
      };

      window.clearCombined = function () {
        document.getElementById("probA").value = 0.5;
        document.getElementById("probB").value = 0.3;
        document.getElementById("combineType").value = "and";
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
      };

      window.calculateConditional = function () {
        const pA = parseFloat(document.getElementById("priorA").value) || 0;
        const pBgivenA = parseFloat(document.getElementById("probBgivenA").value) || 0;
        const pBgivenNotA = parseFloat(document.getElementById("probBgivenNotA").value) || 0;

        // P(B) = P(B|A)P(A) + P(B|非A)P(非A)
        const pB = pBgivenA * pA + pBgivenNotA * (1 - pA);

        // P(A|B) = P(B|A)P(A) / P(B)
        const pAgivenB = (pBgivenA * pA) / pB;

        document.getElementById("result").textContent = formatProbability(pAgivenB);
        document.getElementById("resultDetail").textContent =
          "P(A|B) = (" +
          pBgivenA +
          " × " +
          pA +
          ") / " +
          pB.toFixed(6) +
          " = " +
          pAgivenB.toFixed(6);
      };

      window.clearConditional = function () {
        document.getElementById("priorA").value = 0.01;
        document.getElementById("probBgivenA").value = 0.9;
        document.getElementById("probBgivenNotA").value = 0.05;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
      };

      // Binomial probability
      function binomialProb(n, k, p) {
        return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      }

      document.getElementById("binomialType").addEventListener("change", function () {
        document.getElementById("k2Container").style.display =
          this.value === "between" ? "block" : "none";
      });

      window.calculateBinomial = function () {
        const n = parseInt(document.getElementById("trials").value) || 10;
        const p = parseFloat(document.getElementById("successProb").value) || 0.5;
        const k = parseInt(document.getElementById("successes").value) || 0;
        const type = document.getElementById("binomialType").value;

        let result, detail;

        switch (type) {
          case "exact":
            result = binomialProb(n, k, p);
            detail =
              "P(X=" +
              k +
              ") = C(" +
              n +
              "," +
              k +
              ") × " +
              p +
              "^" +
              k +
              " × " +
              (1 - p).toFixed(2) +
              "^" +
              (n - k);
            break;
          case "atLeast":
            result = 0;
            for (let i = k; i <= n; i++) {
              result += binomialProb(n, i, p);
            }
            detail = "P(X≥" + k + ") = Σ P(X=i), i=" + k + " to " + n;
            break;
          case "atMost":
            result = 0;
            for (let i = 0; i <= k; i++) {
              result += binomialProb(n, i, p);
            }
            detail = "P(X≤" + k + ") = Σ P(X=i), i=0 to " + k;
            break;
          case "between":
            const k2 = parseInt(document.getElementById("successes2").value) || k;
            result = 0;
            for (let i = k; i <= k2; i++) {
              result += binomialProb(n, i, p);
            }
            detail = "P(" + k + "≤X≤" + k2 + ") = Σ P(X=i), i=" + k + " to " + k2;
            break;
        }

        document.getElementById("result").textContent = formatProbability(result);
        document.getElementById("resultDetail").textContent = detail;
      };

      window.clearBinomial = function () {
        document.getElementById("trials").value = 10;
        document.getElementById("successProb").value = 0.5;
        document.getElementById("successes").value = 5;
        document.getElementById("binomialType").value = "exact";
        document.getElementById("k2Container").style.display = "none";
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
      };

      function updateDiceGrid() {
        const faces = parseInt(document.getElementById("diceFaces").value) || 6;
        const grid = document.getElementById("diceGrid");

        while (grid.firstChild) {
          grid.removeChild(grid.firstChild);
        }
        selectedDice = [];

        for (let i = 1; i <= faces; i++) {
          const btn = document.createElement("button");
          btn.className = "dice-btn secondary";
          btn.textContent = i;
          btn.onclick = function () {
            toggleDice(i, this);
          };
          grid.appendChild(btn);
        }
      }

      function toggleDice(value, btn) {
        const index = selectedDice.indexOf(value);
        if (index > -1) {
          selectedDice.splice(index, 1);
          btn.classList.remove("selected");
        } else {
          selectedDice.push(value);
          btn.classList.add("selected");
        }
      }

      document.getElementById("diceFaces").addEventListener("change", updateDiceGrid);
      document.getElementById("diceCount").addEventListener("change", updateDiceGrid);

      window.calculateDice = function () {
        const numDice = parseInt(document.getElementById("diceCount").value) || 1;
        const faces = parseInt(document.getElementById("diceFaces").value) || 6;
        const type = document.getElementById("diceType").value;

        if (selectedDice.length === 0) {
          alert("请选择至少一个目标点数");
          return;
        }

        const totalOutcomes = Math.pow(faces, numDice);
        let favorableOutcomes = 0;

        if (type === "any" && numDice === 1) {
          favorableOutcomes = selectedDice.length;
        } else if (type === "exact" && numDice === 2) {
          const targetSum = selectedDice.reduce(function (a, b) {
            return a + b;
          }, 0);
          for (let i = 1; i <= faces; i++) {
            for (let j = 1; j <= faces; j++) {
              if (i + j === targetSum) favorableOutcomes++;
            }
          }
        } else if (type === "atLeast" && numDice === 2) {
          const minTarget = Math.min.apply(null, selectedDice);
          for (let i = 1; i <= faces; i++) {
            for (let j = 1; j <= faces; j++) {
              if (i + j >= minTarget) favorableOutcomes++;
            }
          }
        } else if (type === "atMost" && numDice === 2) {
          const maxTarget = Math.max.apply(null, selectedDice);
          for (let i = 1; i <= faces; i++) {
            for (let j = 1; j <= faces; j++) {
              if (i + j <= maxTarget) favorableOutcomes++;
            }
          }
        } else if (type === "any") {
          // Probability of getting at least one of the selected faces
          const probSingle = selectedDice.length / faces;
          const prob = 1 - Math.pow(1 - probSingle, numDice);
          document.getElementById("result").textContent = formatProbability(prob);
          document.getElementById("resultDetail").textContent = "至少一次投出选中点数的概率";
          return;
        } else {
          // Generic calculation for single die
          favorableOutcomes = selectedDice.length;
        }

        const prob = favorableOutcomes / totalOutcomes;
        document.getElementById("result").textContent = formatProbability(prob);
        document.getElementById("resultDetail").textContent =
          favorableOutcomes + " / " + totalOutcomes + " 种情况";
      };

      window.clearDice = function () {
        document.getElementById("diceCount").value = 2;
        document.getElementById("diceFaces").value = 6;
        document.getElementById("diceType").value = "exact";
        updateDiceGrid();
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
      };

      // Initialize
      updateDiceGrid();
    
