// @ts-nocheck
// Generated from tools/data/outlier-detector.html
// Source SHA-256: af4eb63b4d7f1ea96e553e98560d0ea47ea99eaec0eaad5eae0317f89ed2bd7f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "outlier-detector-data";
      var lastResults = null;

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Update method options
      function updateMethodOptions() {
        var method = document.getElementById("method").value;
        var thresholdLabel = document.getElementById("thresholdLabel");
        var thresholdSelect = document.getElementById("threshold");
        var methodHint = document.getElementById("methodHint");

        if (method === "iqr") {
          thresholdLabel.textContent = "IQR 乘数";
          thresholdSelect.innerHTML =
            '<option value="1.5">1.5（标准）</option><option value="2.2">2.2（中等）</option><option value="3">3（宽松）</option>';
          methodHint.textContent = "IQR 方法：异常值 = 值 < Q1 - k×IQR 或 值 > Q3 + k×IQR";
        } else {
          thresholdLabel.textContent = "Z-score 阈值";
          thresholdSelect.innerHTML =
            '<option value="2">2（严格）</option><option value="2.5">2.5（中等）</option><option value="3">3（宽松）</option>';
          methodHint.textContent = "Z-score 方法：异常值 = |z| > 阈值，z = (x - μ) / σ";
        }
        saveToStorage();
      }

      // Parse input data
      function parseData(input) {
        var lines = input.trim().split("\n");
        var values = [];
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (line === "") continue;
          var num = parseFloat(line);
          if (!isNaN(num)) {
            values.push(num);
          }
        }
        return values;
      }

      // Calculate statistics
      function calculateStats(values) {
        var n = values.length;
        if (n === 0) return null;

        var sorted = values.slice().sort(function (a, b) {
          return a - b;
        });

        // Mean
        var sum = 0;
        for (var i = 0; i < n; i++) sum += values[i];
        var mean = sum / n;

        // Standard deviation
        var sqSum = 0;
        for (var i = 0; i < n; i++) sqSum += Math.pow(values[i] - mean, 2);
        var std = Math.sqrt(sqSum / n);

        // Median
        var median;
        var mid = Math.floor(n / 2);
        if (n % 2 === 0) {
          median = (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
          median = sorted[mid];
        }

        // Quartiles
        var q1Idx = Math.floor(n * 0.25);
        var q3Idx = Math.floor(n * 0.75);
        var q1 = sorted[q1Idx];
        var q3 = sorted[q3Idx];
        var iqr = q3 - q1;

        return {
          mean: mean,
          std: std,
          median: median,
          q1: q1,
          q3: q3,
          iqr: iqr,
          min: sorted[0],
          max: sorted[n - 1]
        };
      }

      // IQR method
      function detectIQR(values, multiplier) {
        var stats = calculateStats(values);
        if (!stats) return null;

        var lowerBound = stats.q1 - multiplier * stats.iqr;
        var upperBound = stats.q3 + multiplier * stats.iqr;

        var results = [];
        for (var i = 0; i < values.length; i++) {
          var v = values[i];
          var isOutlier = v < lowerBound || v > upperBound;
          results.push({
            value: v,
            isOutlier: isOutlier,
            reason: isOutlier ? (v < lowerBound ? "低于下界" : "高于上界") : ""
          });
        }

        return {
          results: results,
          stats: stats,
          lowerBound: lowerBound,
          upperBound: upperBound,
          method: "IQR",
          threshold: multiplier
        };
      }

      // Z-score method
      function detectZScore(values, threshold) {
        var stats = calculateStats(values);
        if (!stats) return null;

        var lowerBound = stats.mean - threshold * stats.std;
        var upperBound = stats.mean + threshold * stats.std;

        var results = [];
        for (var i = 0; i < values.length; i++) {
          var v = values[i];
          var zScore = stats.std > 0 ? (v - stats.mean) / stats.std : 0;
          var isOutlier = Math.abs(zScore) > threshold;
          results.push({
            value: v,
            isOutlier: isOutlier,
            zScore: zScore,
            reason: isOutlier ? "Z-score = " + zScore.toFixed(2) : ""
          });
        }

        return {
          results: results,
          stats: stats,
          lowerBound: lowerBound,
          upperBound: upperBound,
          method: "Z-score",
          threshold: threshold
        };
      }

      // Main detection function
      function detectOutliers() {
        var input = document.getElementById("dataInput").value;
        var values = parseData(input);

        if (values.length < 4) {
          showToast("请输入至少 4 个数值", "error");
          return;
        }

        var method = document.getElementById("method").value;
        var threshold = parseFloat(document.getElementById("threshold").value);

        var result;
        if (method === "iqr") {
          result = detectIQR(values, threshold);
        } else {
          result = detectZScore(values, threshold);
        }

        if (!result) {
          showToast("检测失败", "error");
          return;
        }

        lastResults = result;
        displayResults(result);
        saveToStorage();
        showToast("检测完成");
      }

      // Display results
      function displayResults(result) {
        var stats = result.stats;
        var results = result.results;

        // Count stats
        var total = results.length;
        var outlierCount = 0;
        for (var i = 0; i < results.length; i++) {
          if (results[i].isOutlier) outlierCount++;
        }
        var normalCount = total - outlierCount;
        var outlierPercent = ((outlierCount / total) * 100).toFixed(1) + "%";

        document.getElementById("totalCount").textContent = total;
        document.getElementById("normalCount").textContent = normalCount;
        document.getElementById("outlierCount").textContent = outlierCount;
        document.getElementById("outlierPercent").textContent = outlierPercent;

        // Bounds info
        document.getElementById("lowerBound").textContent = result.lowerBound.toFixed(4);
        document.getElementById("upperBound").textContent = result.upperBound.toFixed(4);
        document.getElementById("meanValue").textContent = stats.mean.toFixed(4);
        document.getElementById("medianValue").textContent = stats.median.toFixed(4);
        document.getElementById("stdValue").textContent = stats.std.toFixed(4);
        document.getElementById("boundsInfo").style.display = "block";

        // Results list
        var container = document.getElementById("resultsContainer");
        container.textContent = "";

        for (var i = 0; i < results.length; i++) {
          var r = results[i];
          var item = document.createElement("div");
          item.className = "result-item " + (r.isOutlier ? "outlier" : "normal");

          var valueSpan = document.createElement("span");
          valueSpan.className = "value";
          valueSpan.textContent = r.value;

          var badge = document.createElement("span");
          badge.className = "badge";
          badge.textContent = r.isOutlier ? "异常" : "正常";

          item.appendChild(valueSpan);
          item.appendChild(badge);
          container.appendChild(item);
        }
      }

      // Copy results
      function copyResults() {
        if (!lastResults) {
          showToast("请先检测异常值", "error");
          return;
        }

        var lines = ["检测方法: " + lastResults.method + " (阈值: " + lastResults.threshold + ")"];
        lines.push("下界: " + lastResults.lowerBound.toFixed(4));
        lines.push("上界: " + lastResults.upperBound.toFixed(4));
        lines.push("");
        lines.push("值\t状态");
        lines.push("--------------------");

        for (var i = 0; i < lastResults.results.length; i++) {
          var r = lastResults.results[i];
          lines.push(r.value + "\t" + (r.isOutlier ? "异常" : "正常"));
        }

        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showToast("结果已复制");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      // Copy outliers only
      function copyOutliersOnly() {
        if (!lastResults) {
          showToast("请先检测异常值", "error");
          return;
        }

        var outliers = [];
        for (var i = 0; i < lastResults.results.length; i++) {
          var r = lastResults.results[i];
          if (r.isOutlier) outliers.push(r.value);
        }

        if (outliers.length === 0) {
          showToast("没有检测到异常值", "error");
          return;
        }

        navigator.clipboard
          .writeText(outliers.join("\n"))
          .then(function () {
            showToast("异常值已复制");
          })
          .catch(function () {
            showToast("复制失败", "error");
          });
      }

      // Paste data
      function pasteData() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("dataInput").value = text;
            saveToStorage();
            showToast("已粘贴");
          })
          .catch(function () {
            showToast("无法访问剪贴板", "error");
          });
      }

      // Load sample data
      function loadSampleData() {
        var sample = "10\n12\n14\n15\n16\n18\n20\n22\n24\n25\n100\n-50\n28\n30\n32";
        document.getElementById("dataInput").value = sample;
        saveToStorage();
        detectOutliers();
      }

      // Clear all
      function clearAll() {
        document.getElementById("dataInput").value = "";
        document.getElementById("method").value = "iqr";
        updateMethodOptions();

        document.getElementById("totalCount").textContent = "-";
        document.getElementById("normalCount").textContent = "-";
        document.getElementById("outlierCount").textContent = "-";
        document.getElementById("outlierPercent").textContent = "-";
        document.getElementById("boundsInfo").style.display = "none";

        var container = document.getElementById("resultsContainer");
        container.textContent = "";
        var placeholder = document.createElement("div");
        placeholder.className = "results-placeholder";
        placeholder.textContent = "输入数据后显示结果";
        container.appendChild(placeholder);

        lastResults = null;
        localStorage.removeItem(LS_KEY);
        window.location.hash = "";

        showToast("已清空");
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          input: document.getElementById("dataInput").value,
          method: document.getElementById("method").value,
          threshold: document.getElementById("threshold").value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        if (window.location.hash) return;

        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);
          if (data.input) document.getElementById("dataInput").value = data.input;
          if (data.method) {
            document.getElementById("method").value = data.method;
            updateMethodOptions();
          }
          if (data.threshold) document.getElementById("threshold").value = data.threshold;
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Load from URL
      function loadFromUrl() {
        var hash = window.location.hash.slice(1);
        if (!hash) return;

        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          if (data.input) document.getElementById("dataInput").value = data.input;
          if (data.method) {
            document.getElementById("method").value = data.method;
            updateMethodOptions();
          }
          if (data.threshold) document.getElementById("threshold").value = data.threshold;

          if (data.input) {
            setTimeout(detectOutliers, 100);
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Show toast
      function showToast(msg, type) {
        type = type || "success";
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (type === "error" ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize
      document.addEventListener("DOMContentLoaded", function () {
        loadFromStorage();
        loadFromUrl();

        // Auto-save
        document.querySelectorAll("input, textarea, select").forEach(function (el) {
          el.addEventListener("input", saveToStorage);
          el.addEventListener("change", saveToStorage);
        });
      });
    
