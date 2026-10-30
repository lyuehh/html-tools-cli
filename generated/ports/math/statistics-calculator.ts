// @ts-nocheck
// Generated from tools/math/statistics-calculator.html
// Source SHA-256: baca9b8787076b8234bb78677cbca7ff108c3f3db2fbc8c90d9eb127b84435cf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function parseData(input) {
        return input
          .split(/[,\s\n]+/)
          .map((s) => s.trim())
          .filter((s) => s !== "")
          .map((s) => parseFloat(s))
          .filter((n) => !isNaN(n));
      }

      function calculate() {
        const input = document.getElementById("dataInput").value;
        const data = parseData(input);

        if (data.length === 0) {
          alert("请输入有效的数字数据");
          return;
        }

        const sorted = [...data].sort((a, b) => a - b);
        const n = data.length;
        const sum = data.reduce((a, b) => a + b, 0);
        const mean = sum / n;

        // 中位数
        const median =
          n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];

        // 众数
        const frequency = {};
        data.forEach((x) => (frequency[x] = (frequency[x] || 0) + 1));
        const maxFreq = Math.max(...Object.values(frequency));
        const modes = Object.keys(frequency)
          .filter((k) => frequency[k] === maxFreq)
          .map(Number);
        const modeStr = maxFreq === 1 ? "无" : modes.join(", ");

        // 极差
        const min = sorted[0];
        const max = sorted[n - 1];
        const range = max - min;

        // 方差和标准差（总体）
        const variance = data.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / n;
        const stddev = Math.sqrt(variance);

        // 样本方差和标准差
        const sampleVariance =
          n > 1 ? data.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0) / (n - 1) : 0;
        const sampleStddev = Math.sqrt(sampleVariance);

        // 四分位数
        const q1 = sorted[Math.floor(n * 0.25)];
        const q3 = sorted[Math.floor(n * 0.75)];

        // 更新显示
        document.getElementById("count").textContent = n;
        document.getElementById("sum").textContent = formatNum(sum);
        document.getElementById("mean").textContent = formatNum(mean);
        document.getElementById("median").textContent = formatNum(median);
        document.getElementById("mode").textContent = modeStr;
        document.getElementById("range").textContent = formatNum(range);
        document.getElementById("min").textContent = formatNum(min);
        document.getElementById("max").textContent = formatNum(max);
        document.getElementById("variance").textContent = formatNum(variance);
        document.getElementById("stddev").textContent = formatNum(stddev);
        document.getElementById("sampleVariance").textContent = formatNum(sampleVariance);
        document.getElementById("sampleStddev").textContent = formatNum(sampleStddev);

        document.getElementById("sortedData").textContent =
          `排序后: ${sorted.map(formatNum).join(", ")}`;
        document.getElementById("quartiles").textContent =
          `四分位数: Q1=${formatNum(q1)}, Q2(中位数)=${formatNum(median)}, Q3=${formatNum(q3)}`;

        document.getElementById("results").style.display = "grid";
        document.getElementById("summary").style.display = "block";
      }

      function formatNum(n) {
        if (Number.isInteger(n)) return n.toString();
        return parseFloat(n.toFixed(4)).toString();
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
    
