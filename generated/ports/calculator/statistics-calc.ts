// @ts-nocheck
// Generated from tools/calculator/statistics-calc.html
// Source SHA-256: 6b3bb2f573af72d6d450783caa8b23bd1c8a8018034fa001f22b42320d233c96
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      function parseData(input) {
        return input
          .split(/[\s,\n]+/)
          .map((s) => parseFloat(s.trim()))
          .filter((n) => !isNaN(n));
      }

      function mean(arr) {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
      }

      function median(arr) {
        const sorted = [...arr].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
      }

      function mode(arr) {
        const freq = {};
        arr.forEach((n) => (freq[n] = (freq[n] || 0) + 1));
        const maxFreq = Math.max(...Object.values(freq));
        const modes = Object.keys(freq)
          .filter((k) => freq[k] === maxFreq)
          .map(Number);
        return modes.length === arr.length ? "无" : modes.join(", ");
      }

      function variance(arr, sample = false) {
        const m = mean(arr);
        const sum = arr.reduce((acc, val) => acc + Math.pow(val - m, 2), 0);
        return sum / (sample ? arr.length - 1 : arr.length);
      }

      function quantile(arr, q) {
        const sorted = [...arr].sort((a, b) => a - b);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
          return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        }
        return sorted[base];
      }

      function skewness(arr) {
        const m = mean(arr);
        const s = Math.sqrt(variance(arr));
        const n = arr.length;
        return arr.reduce((acc, val) => acc + Math.pow((val - m) / s, 3), 0) / n;
      }

      function kurtosis(arr) {
        const m = mean(arr);
        const s = Math.sqrt(variance(arr));
        const n = arr.length;
        return arr.reduce((acc, val) => acc + Math.pow((val - m) / s, 4), 0) / n - 3;
      }

      window.calculate = function () {
        const input = document.getElementById("dataInput").value;
        const data = parseData(input);

        if (data.length < 2) {
          alert("请输入至少2个有效数字");
          return;
        }

        document.getElementById("results").style.display = "block";

        const n = data.length;
        const sum = data.reduce((a, b) => a + b, 0);
        const m = mean(data);
        const v = variance(data);
        const sv = variance(data, true);
        const q1 = quantile(data, 0.25);
        const q3 = quantile(data, 0.75);
        const sorted = [...data].sort((a, b) => a - b);

        const format = (num) =>
          Number.isFinite(num) ? (Number.isInteger(num) ? num : num.toFixed(4)) : "-";

        document.getElementById("count").textContent = n;
        document.getElementById("sum").textContent = format(sum);
        document.getElementById("mean").textContent = format(m);
        document.getElementById("median").textContent = format(median(data));
        document.getElementById("mode").textContent = mode(data);
        document.getElementById("range").textContent = format(sorted[n - 1] - sorted[0]);
        document.getElementById("min").textContent = format(sorted[0]);
        document.getElementById("max").textContent = format(sorted[n - 1]);
        document.getElementById("variance").textContent = format(v);
        document.getElementById("stddev").textContent = format(Math.sqrt(v));
        document.getElementById("sampleVariance").textContent = format(sv);
        document.getElementById("sampleStddev").textContent = format(Math.sqrt(sv));
        document.getElementById("q1").textContent = format(q1);
        document.getElementById("q3").textContent = format(q3);
        document.getElementById("iqr").textContent = format(q3 - q1);
        document.getElementById("cv").textContent = format((Math.sqrt(v) / m) * 100) + "%";
        document.getElementById("skewness").textContent = format(skewness(data));
        document.getElementById("kurtosis").textContent = format(kurtosis(data));

        drawHistogram(data);
      };

      function drawHistogram(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const binCount = Math.min(10, Math.ceil(Math.sqrt(data.length)));
        const binWidth = (max - min) / binCount || 1;

        const bins = Array(binCount).fill(0);
        data.forEach((val) => {
          let binIndex = Math.floor((val - min) / binWidth);
          if (binIndex >= binCount) binIndex = binCount - 1;
          bins[binIndex]++;
        });

        const maxBin = Math.max(...bins);
        const histogram = document.getElementById("histogram");
        const labels = document.getElementById("histogramLabels");
        histogram.textContent = "";
        labels.textContent = "";

        bins.forEach((count, i) => {
          const bar = document.createElement("div");
          bar.className = "histogram-bar";
          bar.style.height = (count / maxBin) * 100 + "%";
          bar.title = "频数: " + count;
          histogram.appendChild(bar);

          const label = document.createElement("span");
          label.textContent = (min + i * binWidth).toFixed(1);
          labels.appendChild(label);
        });

        const tbody = document.querySelector("#freqTable tbody");
        tbody.textContent = "";
        let cumFreq = 0;
        bins.forEach((count, i) => {
          const from = (min + i * binWidth).toFixed(2);
          const to = (min + (i + 1) * binWidth).toFixed(2);
          const freq = count / data.length;
          cumFreq += freq;
          const tr = document.createElement("tr");
          tr.innerHTML =
            "<td>[" +
            from +
            ", " +
            to +
            ")</td><td>" +
            count +
            "</td><td>" +
            (freq * 100).toFixed(2) +
            "%</td><td>" +
            (cumFreq * 100).toFixed(2) +
            "%</td>";
          tbody.appendChild(tr);
        });
      }

      window.clearData = function () {
        document.getElementById("dataInput").value = "";
        document.getElementById("results").style.display = "none";
      };

      window.generateSample = function () {
        const n = 30;
        const data = [];
        for (let i = 0; i < n; i++) {
          data.push(Math.round(Math.random() * 100 * 10) / 10);
        }
        document.getElementById("dataInput").value = data.join(", ");
      };

      loadTheme();
    
