// @ts-nocheck
// Generated from tools/education/statistics.html
// Source SHA-256: 567d07545730dd7d7fdf8f49e5be4a06c2741bb1e0f4f83009a1ac9c373fb067
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var chart = null;

      function parseData(input) {
        var numbers = input
          .split(/[,\s\n]+/)
          .map(function (s) {
            return s.trim();
          })
          .filter(function (s) {
            return s !== "";
          })
          .map(function (s) {
            return parseFloat(s);
          })
          .filter(function (n) {
            return !isNaN(n);
          });
        return numbers;
      }

      function formatNum(n, digits) {
        if (n === undefined || n === null || isNaN(n)) return "-";
        if (digits === undefined) digits = 4;
        return n.toFixed(digits).replace(/\.?0+$/, "");
      }

      function mean(arr) {
        if (arr.length === 0) return NaN;
        var sum = arr.reduce(function (a, b) {
          return a + b;
        }, 0);
        return sum / arr.length;
      }

      function median(arr) {
        if (arr.length === 0) return NaN;
        var sorted = arr.slice().sort(function (a, b) {
          return a - b;
        });
        var mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
          return (sorted[mid - 1] + sorted[mid]) / 2;
        }
        return sorted[mid];
      }

      function mode(arr) {
        if (arr.length === 0) return NaN;
        var counts = {};
        var maxCount = 0;
        arr.forEach(function (n) {
          counts[n] = (counts[n] || 0) + 1;
          if (counts[n] > maxCount) maxCount = counts[n];
        });
        var modes = [];
        for (var n in counts) {
          if (counts[n] === maxCount) modes.push(parseFloat(n));
        }
        if (modes.length === arr.length) return NaN; // no mode
        return modes;
      }

      function variance(arr) {
        if (arr.length === 0) return NaN;
        var m = mean(arr);
        var sumSq = arr.reduce(function (acc, n) {
          return acc + Math.pow(n - m, 2);
        }, 0);
        return sumSq / arr.length;
      }

      function stdDev(arr) {
        return Math.sqrt(variance(arr));
      }

      function quartile(arr, q) {
        if (arr.length === 0) return NaN;
        var sorted = arr.slice().sort(function (a, b) {
          return a - b;
        });
        var pos = (sorted.length - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if (sorted[base + 1] !== undefined) {
          return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        }
        return sorted[base];
      }

      function calculate() {
        var input = document.getElementById("dataInput").value;
        var data = parseData(input);

        var preview = document.getElementById("dataPreview");
        preview.textContent = "";

        if (data.length === 0) {
          document.getElementById("resultHero").style.display = "none";
          document.getElementById("statsCard").style.display = "none";
          document.getElementById("freqCard").style.display = "none";
          return;
        }

        // Show data preview
        data.forEach(function (n) {
          var span = document.createElement("span");
          span.className = "data-item";
          span.textContent = formatNum(n, 2);
          preview.appendChild(span);
        });

        document.getElementById("resultHero").style.display = "block";
        document.getElementById("statsCard").style.display = "block";
        document.getElementById("freqCard").style.display = "block";

        document.getElementById("countValue").textContent = data.length;

        var m = mean(data);
        var med = median(data);
        var mod = mode(data);
        var v = variance(data);
        var s = stdDev(data);
        var min = Math.min.apply(null, data);
        var max = Math.max.apply(null, data);
        var sum = data.reduce(function (a, b) {
          return a + b;
        }, 0);
        var q1 = quartile(data, 0.25);
        var q3 = quartile(data, 0.75);
        var iqr = q3 - q1;

        document.getElementById("meanValue").textContent = formatNum(m);
        document.getElementById("medianValue").textContent = formatNum(med);
        document.getElementById("modeValue").textContent = Array.isArray(mod)
          ? mod
              .map(function (n) {
                return formatNum(n);
              })
              .join(", ")
          : "-";
        document.getElementById("rangeValue").textContent = formatNum(max - min);
        document.getElementById("varianceValue").textContent = formatNum(v);
        document.getElementById("stdValue").textContent = formatNum(s);
        document.getElementById("minValue").textContent = formatNum(min);
        document.getElementById("maxValue").textContent = formatNum(max);
        document.getElementById("sumValue").textContent = formatNum(sum);
        document.getElementById("q1Value").textContent = formatNum(q1);
        document.getElementById("q3Value").textContent = formatNum(q3);
        document.getElementById("iqrValue").textContent = formatNum(iqr);

        // Frequency distribution
        var numBins = Math.min(10, Math.ceil(Math.sqrt(data.length)));
        var binWidth = (max - min) / numBins;
        if (binWidth === 0) binWidth = 1;

        var bins = [];
        for (var i = 0; i < numBins; i++) {
          bins.push({
            start: min + i * binWidth,
            end: min + (i + 1) * binWidth,
            count: 0
          });
        }

        data.forEach(function (n) {
          var binIdx = Math.min(Math.floor((n - min) / binWidth), numBins - 1);
          bins[binIdx].count++;
        });

        var freqBody = document.getElementById("freqBody");
        freqBody.textContent = "";
        var cumFreq = 0;

        bins.forEach(function (bin) {
          var freq = bin.count / data.length;
          cumFreq += freq;

          var tr = document.createElement("tr");

          var td1 = document.createElement("td");
          td1.textContent = "[" + formatNum(bin.start, 2) + ", " + formatNum(bin.end, 2) + ")";

          var td2 = document.createElement("td");
          td2.textContent = bin.count;

          var td3 = document.createElement("td");
          td3.textContent = (freq * 100).toFixed(1) + "%";

          var td4 = document.createElement("td");
          td4.textContent = (cumFreq * 100).toFixed(1) + "%";

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          freqBody.appendChild(tr);
        });

        // Draw histogram
        drawHistogram(bins, data.length);
      }

      function drawHistogram(bins, total) {
        var canvas = document.getElementById("histChart");
        var ctx = canvas.getContext("2d");

        var isDark =
          window.matchMedia("(prefers-color-scheme: dark)").matches ||
          getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() === "#0a0a0f";

        var width = canvas.parentElement.clientWidth;
        var height = 200;
        canvas.width = width;
        canvas.height = height;

        var padding = 40;
        var chartWidth = width - padding * 2;
        var chartHeight = height - padding * 2;

        ctx.fillStyle = isDark ? "#0a0a0f" : "#f5f5f5";
        ctx.fillRect(0, 0, width, height);

        var maxCount = Math.max.apply(
          null,
          bins.map(function (b) {
            return b.count;
          })
        );
        if (maxCount === 0) maxCount = 1;

        var barWidth = chartWidth / bins.length - 4;

        bins.forEach(function (bin, i) {
          var barHeight = (bin.count / maxCount) * chartHeight;
          var x = padding + i * (chartWidth / bins.length) + 2;
          var y = height - padding - barHeight;

          ctx.fillStyle = "#8b5cf6";
          ctx.fillRect(x, y, barWidth, barHeight);
        });

        // Draw axes
        ctx.strokeStyle = isDark ? "#2a2a3a" : "#e0e0e0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();

        // Labels
        ctx.fillStyle = isDark ? "#888" : "#666";
        ctx.font = "11px system-ui";
        ctx.textAlign = "center";

        ctx.fillText("0", padding - 15, height - padding + 4);
        ctx.fillText(maxCount.toString(), padding - 15, padding + 4);
      }

      function loadSample() {
        document.getElementById("dataInput").value =
          "85, 90, 78, 92, 88, 95, 72, 80, 85, 91, 87, 93, 76, 84, 89, 82, 94, 77, 86, 90";
        calculate();
      }

      function clearData() {
        document.getElementById("dataInput").value = "";
        document.getElementById("dataPreview").textContent = "";
        document.getElementById("resultHero").style.display = "none";
        document.getElementById("statsCard").style.display = "none";
        document.getElementById("freqCard").style.display = "none";
      }

      calculate();

      window.addEventListener("resize", function () {
        var input = document.getElementById("dataInput").value;
        var data = parseData(input);
        if (data.length > 0) {
          calculate();
        }
      });

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
    
