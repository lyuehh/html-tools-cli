// @ts-nocheck
// Generated from tools/data/statistics-calculator.html
// Source SHA-256: 5d1bde648ce28bc1d665d5354ea4cb156ff377eb445ca4a29b119cf52f32c127
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const LS_KEY = "statistics_calculator_input_v1";

      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          inputEl.value = decodeURIComponent(atob(hash));
          return true;
        } catch (e) {
          return false;
        }
      };

      function saveToUrl() {
        try {
          if (inputEl.value.length > 2000) return;
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(inputEl.value)));
        } catch (e) {}
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) inputEl.value = saved;
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function parseNumbers(text) {
        const numbers = [];
        const parts = text.split(/[\n,;，；\s]+/);
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed === "") continue;
          const num = parseFloat(trimmed);
          if (!isNaN(num) && isFinite(num)) {
            numbers.push(num);
          }
        }
        return numbers;
      }

      function sum(arr) {
        return arr.reduce((a, b) => a + b, 0);
      }

      function mean(arr) {
        return sum(arr) / arr.length;
      }

      function median(sortedArr) {
        const n = sortedArr.length;
        const mid = Math.floor(n / 2);
        if (n % 2 === 0) {
          return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
        }
        return sortedArr[mid];
      }

      function mode(arr) {
        const freq = {};
        let maxFreq = 0;
        for (const num of arr) {
          freq[num] = (freq[num] || 0) + 1;
          if (freq[num] > maxFreq) maxFreq = freq[num];
        }
        if (maxFreq === 1) return null;
        const modes = [];
        for (const [num, f] of Object.entries(freq)) {
          if (f === maxFreq) modes.push(parseFloat(num));
        }
        return modes;
      }

      function variance(arr, isSample) {
        const m = mean(arr);
        const squaredDiffs = arr.map((x) => Math.pow(x - m, 2));
        const divisor = isSample ? arr.length - 1 : arr.length;
        return sum(squaredDiffs) / divisor;
      }

      function stdDev(arr, isSample) {
        return Math.sqrt(variance(arr, isSample));
      }

      function coefficientOfVariation(arr) {
        const m = mean(arr);
        if (m === 0) return null;
        return (stdDev(arr, true) / Math.abs(m)) * 100;
      }

      function percentile(sortedArr, p) {
        if (sortedArr.length === 1) return sortedArr[0];
        const index = (p / 100) * (sortedArr.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        if (lower === upper) return sortedArr[lower];
        const fraction = index - lower;
        return sortedArr[lower] + fraction * (sortedArr[upper] - sortedArr[lower]);
      }

      function skewness(arr) {
        const n = arr.length;
        if (n < 3) return null;
        const m = mean(arr);
        const s = stdDev(arr, true);
        if (s === 0) return null;
        const sumCubed = arr.reduce((acc, x) => acc + Math.pow((x - m) / s, 3), 0);
        return (n / ((n - 1) * (n - 2))) * sumCubed;
      }

      function kurtosis(arr) {
        const n = arr.length;
        if (n < 4) return null;
        const m = mean(arr);
        const s = stdDev(arr, true);
        if (s === 0) return null;
        const sumFourth = arr.reduce((acc, x) => acc + Math.pow((x - m) / s, 4), 0);
        const excess =
          ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sumFourth -
          (3 * Math.pow(n - 1, 2)) / ((n - 2) * (n - 3));
        return excess;
      }

      function formatNumber(num, decimals) {
        if (num === null || num === undefined) return "-";
        if (!isFinite(num)) return "-";
        decimals = decimals !== undefined ? decimals : 6;
        const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return rounded.toLocaleString("zh-CN", {
          maximumFractionDigits: decimals,
          minimumFractionDigits: 0
        });
      }

      function createStatRow(label, value) {
        const row = document.createElement("div");
        row.className = "stat-row";
        const labelSpan = document.createElement("span");
        labelSpan.className = "stat-label";
        labelSpan.textContent = label;
        const valueSpan = document.createElement("span");
        valueSpan.className = "stat-value";
        valueSpan.textContent = value;
        row.appendChild(labelSpan);
        row.appendChild(valueSpan);
        return row;
      }

      function createStatSection(title) {
        const section = document.createElement("div");
        section.className = "stat-section";
        const titleEl = document.createElement("div");
        titleEl.className = "stat-section-title";
        titleEl.textContent = title;
        section.appendChild(titleEl);
        return section;
      }

      function calculate() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入数据", "error");
          return;
        }

        const numbers = parseNumbers(text);
        if (numbers.length === 0) {
          showStatus("未找到有效数字", "error");
          return;
        }

        const sorted = [...numbers].sort((a, b) => a - b);

        const count = numbers.length;
        const total = sum(numbers);
        const avg = mean(numbers);
        const med = median(sorted);
        const modes = mode(numbers);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const range = max - min;

        const popVariance = variance(numbers, false);
        const sampleVariance = count > 1 ? variance(numbers, true) : null;
        const popStdDev = stdDev(numbers, false);
        const sampleStdDev = count > 1 ? stdDev(numbers, true) : null;
        const cv = count > 1 ? coefficientOfVariation(numbers) : null;

        const q1 = percentile(sorted, 25);
        const q2 = percentile(sorted, 50);
        const q3 = percentile(sorted, 75);
        const iqr = q3 - q1;

        const skew = skewness(numbers);
        const kurt = kurtosis(numbers);

        let modesStr = "-";
        if (modes !== null) {
          if (modes.length <= 5) {
            modesStr = modes.map((m) => formatNumber(m, 4)).join(", ");
          } else {
            modesStr = modes.length + " 个众数";
          }
        }

        outputEl.textContent = "";

        const basicSection = createStatSection("基本统计");
        basicSection.appendChild(createStatRow("数据个数", count.toString()));
        basicSection.appendChild(createStatRow("总和", formatNumber(total, 6)));
        basicSection.appendChild(createStatRow("均值 (Mean)", formatNumber(avg, 6)));
        basicSection.appendChild(createStatRow("中位数 (Median)", formatNumber(med, 6)));
        basicSection.appendChild(createStatRow("众数 (Mode)", modesStr));
        basicSection.appendChild(createStatRow("最小值", formatNumber(min, 6)));
        basicSection.appendChild(createStatRow("最大值", formatNumber(max, 6)));
        basicSection.appendChild(createStatRow("极差 (Range)", formatNumber(range, 6)));
        outputEl.appendChild(basicSection);

        const dispersionSection = createStatSection("离散程度");
        dispersionSection.appendChild(createStatRow("总体方差", formatNumber(popVariance, 6)));
        dispersionSection.appendChild(createStatRow("样本方差", formatNumber(sampleVariance, 6)));
        dispersionSection.appendChild(createStatRow("总体标准差", formatNumber(popStdDev, 6)));
        dispersionSection.appendChild(createStatRow("样本标准差", formatNumber(sampleStdDev, 6)));
        dispersionSection.appendChild(
          createStatRow("变异系数 (CV)", cv !== null ? formatNumber(cv, 4) + "%" : "-")
        );
        outputEl.appendChild(dispersionSection);

        const percentileSection = createStatSection("百分位数");
        percentileSection.appendChild(createStatRow("Q1 (25%)", formatNumber(q1, 6)));
        percentileSection.appendChild(createStatRow("Q2 (50%)", formatNumber(q2, 6)));
        percentileSection.appendChild(createStatRow("Q3 (75%)", formatNumber(q3, 6)));
        percentileSection.appendChild(createStatRow("四分位距 (IQR)", formatNumber(iqr, 6)));
        outputEl.appendChild(percentileSection);

        const shapeSection = createStatSection("分布形态");
        shapeSection.appendChild(createStatRow("偏度 (Skewness)", formatNumber(skew, 6)));
        shapeSection.appendChild(createStatRow("峰度 (Kurtosis)", formatNumber(kurt, 6)));
        outputEl.appendChild(shapeSection);

        const sortedSection = createStatSection("排序数据");
        const sortedDiv = document.createElement("div");
        sortedDiv.className = "sorted-data";
        sortedDiv.textContent = sorted.map((n) => formatNumber(n, 4)).join(", ");
        sortedSection.appendChild(sortedDiv);
        outputEl.appendChild(sortedSection);

        showStatus("计算完成，共 " + count + " 个数据", "success");
      }

      function getResultsAsText() {
        const text = inputEl.value.trim();
        if (!text) return "";

        const numbers = parseNumbers(text);
        if (numbers.length === 0) return "";

        const sorted = [...numbers].sort((a, b) => a - b);

        const count = numbers.length;
        const total = sum(numbers);
        const avg = mean(numbers);
        const med = median(sorted);
        const modes = mode(numbers);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const range = max - min;

        const popVariance = variance(numbers, false);
        const sampleVariance = count > 1 ? variance(numbers, true) : null;
        const popStdDev = stdDev(numbers, false);
        const sampleStdDev = count > 1 ? stdDev(numbers, true) : null;
        const cv = count > 1 ? coefficientOfVariation(numbers) : null;

        const q1 = percentile(sorted, 25);
        const q2 = percentile(sorted, 50);
        const q3 = percentile(sorted, 75);
        const iqr = q3 - q1;

        const skew = skewness(numbers);
        const kurt = kurtosis(numbers);

        let modesStr = "-";
        if (modes !== null) {
          if (modes.length <= 5) {
            modesStr = modes.map((m) => formatNumber(m, 4)).join(", ");
          } else {
            modesStr = modes.length + " 个众数";
          }
        }

        let result = "=== 统计结果 ===\n\n";
        result += "【基本统计】\n";
        result += "数据个数: " + count + "\n";
        result += "总和: " + formatNumber(total, 6) + "\n";
        result += "均值: " + formatNumber(avg, 6) + "\n";
        result += "中位数: " + formatNumber(med, 6) + "\n";
        result += "众数: " + modesStr + "\n";
        result += "最小值: " + formatNumber(min, 6) + "\n";
        result += "最大值: " + formatNumber(max, 6) + "\n";
        result += "极差: " + formatNumber(range, 6) + "\n\n";

        result += "【离散程度】\n";
        result += "总体方差: " + formatNumber(popVariance, 6) + "\n";
        result += "样本方差: " + formatNumber(sampleVariance, 6) + "\n";
        result += "总体标准差: " + formatNumber(popStdDev, 6) + "\n";
        result += "样本标准差: " + formatNumber(sampleStdDev, 6) + "\n";
        result += "变异系数: " + (cv !== null ? formatNumber(cv, 4) + "%" : "-") + "\n\n";

        result += "【百分位数】\n";
        result += "Q1 (25%): " + formatNumber(q1, 6) + "\n";
        result += "Q2 (50%): " + formatNumber(q2, 6) + "\n";
        result += "Q3 (75%): " + formatNumber(q3, 6) + "\n";
        result += "四分位距: " + formatNumber(iqr, 6) + "\n\n";

        result += "【分布形态】\n";
        result += "偏度: " + formatNumber(skew, 6) + "\n";
        result += "峰度: " + formatNumber(kurt, 6) + "\n\n";

        result += "【排序数据】\n";
        result += sorted.map((n) => formatNumber(n, 4)).join(", ");

        return result;
      }

      function showEmptyState() {
        outputEl.textContent = "";
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        const icon = document.createElement("div");
        icon.className = "empty-state-icon";
        icon.textContent = "📊";
        const text = document.createElement("div");
        text.textContent = '输入数据后点击"计算"查看统计结果';
        emptyState.appendChild(icon);
        emptyState.appendChild(text);
        outputEl.appendChild(emptyState);
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnCalculate").onclick = calculate;

      document.getElementById("btnSample").onclick = function () {
        inputEl.value = "12, 15, 18, 22, 25, 28, 30, 32, 35, 40\n18, 22, 25, 28, 30";
        saveToStorage();
        saveToUrl();
        calculate();
      };

      document.getElementById("btnCopy").onclick = async function () {
        const result = getResultsAsText();
        if (!result) {
          showStatus("没有结果可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(result);
          showStatus("已复制结果", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        showEmptyState();
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      if (loadFromUrl()) {
        calculate();
      } else {
        loadFromStorage();
        if (inputEl.value.trim()) {
          calculate();
        }
      }
    
