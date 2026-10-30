// @ts-nocheck
// Generated from tools/calculator/permutation.html
// Source SHA-256: 81abd5f58e1a3c396491f1945f226d5391ae051890e656cbe5fe66916ad3be91
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

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
        document.getElementById("steps").style.display = "none";
      };

      // BigInt factorial for large numbers
      window.factorial = function (n) {
        if (n < 0) return BigInt(0);
        if (n <= 1) return BigInt(1);
        let result = BigInt(1);
        for (let i = 2; i <= n; i++) {
          result *= BigInt(i);
        }
        return result;
      };

      function formatBigNumber(num) {
        const str = num.toString();
        if (str.length <= 20) {
          return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return str.slice(0, 10) + "..." + str.slice(-5) + " (" + str.length + "位数)";
      }

      window.calculatePermutation = function () {
        const n = parseInt(document.getElementById("permN").value) || 0;
        const r = parseInt(document.getElementById("permR").value) || 0;
        const repeat = document.getElementById("permRepeat").checked;

        if (r > n && !repeat) {
          alert("取出元素数不能大于总元素数");
          return;
        }

        let result, steps;

        if (repeat) {
          result = BigInt(n) ** BigInt(r);
          steps = "P重复(" + n + "," + r + ") = " + n + "^" + r + "\n= " + formatBigNumber(result);
        } else {
          result = factorial(n) / factorial(n - r);
          steps = "P(" + n + "," + r + ") = " + n + "! / (" + n + "-" + r + ")!\n";
          steps += "= " + n + "! / " + (n - r) + "!\n";
          steps +=
            "= " + formatBigNumber(factorial(n)) + " / " + formatBigNumber(factorial(n - r)) + "\n";
          steps += "= " + formatBigNumber(result);
        }

        document.getElementById("result").textContent = formatBigNumber(result);
        document.getElementById("resultDetail").textContent = repeat
          ? "可重复排列 " + n + "^" + r
          : "排列 P(" + n + "," + r + ")";
        document.getElementById("steps").textContent = steps;
        document.getElementById("steps").style.display = "block";
      };

      window.clearPermutation = function () {
        document.getElementById("permN").value = 5;
        document.getElementById("permR").value = 3;
        document.getElementById("permRepeat").checked = false;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
        document.getElementById("steps").style.display = "none";
      };

      window.calculateCombination = function () {
        const n = parseInt(document.getElementById("combN").value) || 0;
        const r = parseInt(document.getElementById("combR").value) || 0;
        const repeat = document.getElementById("combRepeat").checked;

        if (r > n && !repeat) {
          alert("取出元素数不能大于总元素数");
          return;
        }

        let result, steps;

        if (repeat) {
          // C(n+r-1, r)
          const m = n + r - 1;
          result = factorial(m) / (factorial(r) * factorial(m - r));
          steps = "C重复(" + n + "," + r + ") = C(" + n + "+" + r + "-1, " + r + ")\n";
          steps += "= C(" + m + "," + r + ")\n";
          steps += "= " + m + "! / (" + r + "! × " + (m - r) + "!)\n";
          steps += "= " + formatBigNumber(result);
        } else {
          result = factorial(n) / (factorial(r) * factorial(n - r));
          steps = "C(" + n + "," + r + ") = " + n + "! / (" + r + "! × (" + n + "-" + r + ")!)\n";
          steps += "= " + n + "! / (" + r + "! × " + (n - r) + "!)\n";
          steps += "= " + formatBigNumber(result);
        }

        document.getElementById("result").textContent = formatBigNumber(result);
        document.getElementById("resultDetail").textContent = repeat
          ? "可重复组合 C(" + (n + r - 1) + "," + r + ")"
          : "组合 C(" + n + "," + r + ")";
        document.getElementById("steps").textContent = steps;
        document.getElementById("steps").style.display = "block";
      };

      window.clearCombination = function () {
        document.getElementById("combN").value = 5;
        document.getElementById("combR").value = 3;
        document.getElementById("combRepeat").checked = false;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
        document.getElementById("steps").style.display = "none";
      };

      function calculateFactorial() {
        const n = parseInt(document.getElementById("factN").value) || 0;

        if (n > 170) {
          alert("数值过大，请输入170以内的数");
          return;
        }

        const result = factorial(n);
        let steps = n + "! = ";

        if (n <= 10) {
          const parts = [];
          for (let i = n; i >= 1; i--) {
            parts.push(i);
          }
          steps += parts.join(" × ") + "\n";
        } else {
          steps += n + " × " + (n - 1) + " × ... × 2 × 1\n";
        }
        steps += "= " + formatBigNumber(result);

        document.getElementById("result").textContent = formatBigNumber(result);
        document.getElementById("resultDetail").textContent = n + "! 阶乘";
        document.getElementById("steps").textContent = steps;
        document.getElementById("steps").style.display = "block";
      }

      window.quickFactorial = function (n) {
        document.getElementById("factN").value = n;
        calculateFactorial();
      };

      window.clearFactorial = function () {
        document.getElementById("factN").value = 5;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
        document.getElementById("steps").style.display = "none";
      };

      window.calculateMulti = function () {
        const n = parseInt(document.getElementById("multiN").value) || 0;
        const countsStr = document.getElementById("multiCounts").value;
        const counts = countsStr.split(",").map(function (s) {
          return parseInt(s.trim()) || 0;
        });

        const sum = counts.reduce(function (a, b) {
          return a + b;
        }, 0);
        if (sum !== n) {
          alert("各类元素个数之和 (" + sum + ") 必须等于总元素数 (" + n + ")");
          return;
        }

        let denominator = BigInt(1);
        counts.forEach(function (c) {
          denominator *= factorial(c);
        });

        const result = factorial(n) / denominator;

        let steps =
          "多重排列 = " +
          n +
          "! / (" +
          counts
            .map(function (c) {
              return c + "!";
            })
            .join(" × ") +
          ")\n";
        steps += "= " + formatBigNumber(factorial(n)) + " / " + formatBigNumber(denominator) + "\n";
        steps += "= " + formatBigNumber(result);

        document.getElementById("result").textContent = formatBigNumber(result);
        document.getElementById("resultDetail").textContent = "多重排列";
        document.getElementById("steps").textContent = steps;
        document.getElementById("steps").style.display = "block";
      };

      window.clearMulti = function () {
        document.getElementById("multiN").value = 5;
        document.getElementById("multiCounts").value = "2,2,1";
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
        document.getElementById("steps").style.display = "none";
      };

      window.calculateCircular = function () {
        const n = parseInt(document.getElementById("circularN").value) || 1;
        const necklace = document.getElementById("circularNecklace").checked;

        let result = factorial(n - 1);
        let steps = "圆排列 = (" + n + "-1)! = " + (n - 1) + "!\n";

        if (necklace) {
          result = result / BigInt(2);
          steps += "项链问题（考虑翻转）= " + (n - 1) + "! / 2\n";
        }

        steps += "= " + formatBigNumber(result);

        document.getElementById("result").textContent = formatBigNumber(result);
        document.getElementById("resultDetail").textContent = necklace ? "项链排列" : "圆排列";
        document.getElementById("steps").textContent = steps;
        document.getElementById("steps").style.display = "block";
      };

      window.clearCircular = function () {
        document.getElementById("circularN").value = 5;
        document.getElementById("circularNecklace").checked = false;
        document.getElementById("result").textContent = "--";
        document.getElementById("resultDetail").textContent = "输入数值并点击计算";
        document.getElementById("steps").style.display = "none";
      };
    
