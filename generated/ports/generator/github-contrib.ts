// @ts-nocheck
// Generated from tools/generator/github-contrib.html
// Source SHA-256: e8325cf74bc61c13c3328a02cec77291d2ba2e5486dc79ec94b87c8057d8b87e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Color schemes
      var colorSchemes = [
        { name: "GitHub", colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"] },
        { name: "GitHub Dark", colors: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] },
        { name: "Blue", colors: ["#ebedf0", "#c6e0f5", "#79b8f3", "#2188ff", "#0366d6"] },
        { name: "Purple", colors: ["#ebedf0", "#d8b9ff", "#b87fff", "#8b5cf6", "#6d28d9"] },
        { name: "Orange", colors: ["#ebedf0", "#ffd8b8", "#ffb088", "#f97316", "#ea580c"] },
        { name: "Pink", colors: ["#ebedf0", "#ffc0cb", "#ff69b4", "#ec4899", "#db2777"] },
        { name: "Red", colors: ["#ebedf0", "#fecaca", "#f87171", "#ef4444", "#dc2626"] },
        { name: "Cyan", colors: ["#ebedf0", "#a5f3fc", "#22d3ee", "#06b6d4", "#0891b2"] }
      ];

      var currentScheme = colorSchemes[0];
      var currentPattern = "random";
      var contributionData = [];
      var brushLevel = 4;

      // Theme toggle
      var themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
        if (currentScheme.name === "GitHub" || currentScheme.name === "GitHub Dark") {
          currentScheme = currentTheme === "dark" ? colorSchemes[0] : colorSchemes[1];
          generateGraph();
        }
      });

      // Initialize color schemes
      var schemesContainer = document.getElementById("colorSchemes");
      colorSchemes.forEach(function (scheme, index) {
        var div = document.createElement("div");
        div.className = "scheme-option" + (index === 0 ? " active" : "");
        div.title = scheme.name;
        scheme.colors.forEach(function (color) {
          var colorDiv = document.createElement("div");
          colorDiv.className = "scheme-color";
          colorDiv.style.background = color;
          div.appendChild(colorDiv);
        });
        div.addEventListener("click", function () {
          document.querySelectorAll(".scheme-option").forEach(function (s) {
            s.classList.remove("active");
          });
          div.classList.add("active");
          currentScheme = scheme;
          generateGraph();
        });
        schemesContainer.appendChild(div);
      });

      // Pattern selection
      document.querySelectorAll(".pattern-type").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".pattern-type").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentPattern = btn.dataset.pattern;
          document.getElementById("textPatternGroup").style.display =
            currentPattern === "text" ? "block" : "none";
          if (currentPattern !== "custom") {
            generateGraph();
          }
        });
      });

      // Elements
      var activity = document.getElementById("activity");
      var maxContrib = document.getElementById("maxContrib");
      var weeks = document.getElementById("weeks");
      var brushLevelInput = document.getElementById("brushLevel");
      var textPattern = document.getElementById("textPattern");

      // Update range values
      activity.addEventListener("input", function () {
        document.getElementById("activityValue").textContent = activity.value;
        if (currentPattern !== "custom") generateGraph();
      });
      maxContrib.addEventListener("input", function () {
        document.getElementById("maxContribValue").textContent = maxContrib.value;
        if (currentPattern !== "custom") generateGraph();
      });
      weeks.addEventListener("input", function () {
        document.getElementById("weeksValue").textContent = weeks.value;
        generateGraph();
      });
      brushLevelInput.addEventListener("input", function () {
        brushLevel = parseInt(brushLevelInput.value);
        document.getElementById("brushLevelValue").textContent = brushLevel;
      });
      textPattern.addEventListener("input", function () {
        if (currentPattern === "text") generateGraph();
      });

      // Letter patterns (5x7 grid)
      var letterPatterns = {
        A: [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1]
        ],
        B: [
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ],
        C: [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        D: [
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ],
        E: [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ],
        F: [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0]
        ],
        G: [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 0],
          [1, 0, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        H: [
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1]
        ],
        I: [
          [1, 1, 1, 1, 1],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [1, 1, 1, 1, 1]
        ],
        L: [
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ],
        O: [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        V: [
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 0, 1, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 1, 0, 0]
        ],
        " ": [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0]
        ]
      };

      // Generate contribution data
      function generateContributionData() {
        var numWeeks = parseInt(weeks.value);
        var activityLevel = parseInt(activity.value) / 100;
        var maxContributions = parseInt(maxContrib.value);

        contributionData = [];

        for (var week = 0; week < numWeeks; week++) {
          var weekData = [];
          for (var day = 0; day < 7; day++) {
            var value = 0;

            switch (currentPattern) {
              case "random":
                if (Math.random() < activityLevel) {
                  value = Math.floor(Math.random() * maxContributions) + 1;
                }
                break;
              case "wave":
                var waveValue = Math.sin((week / numWeeks) * Math.PI * 4) * 0.5 + 0.5;
                if (Math.random() < waveValue * activityLevel) {
                  value = Math.floor(Math.random() * maxContributions * waveValue) + 1;
                }
                break;
              case "gradient":
                var gradientValue = week / numWeeks;
                if (Math.random() < gradientValue * activityLevel) {
                  value = Math.floor(Math.random() * maxContributions * gradientValue) + 1;
                }
                break;
              case "sparse":
                if (Math.random() < activityLevel * 0.3) {
                  value = Math.floor(Math.random() * maxContributions * 0.5) + 1;
                }
                break;
              case "dense":
                if (Math.random() < activityLevel * 1.5) {
                  value = Math.floor(Math.random() * maxContributions) + 1;
                }
                break;
              case "weekday":
                if (day > 0 && day < 6 && Math.random() < activityLevel) {
                  value = Math.floor(Math.random() * maxContributions) + 1;
                }
                break;
              case "clear":
                value = 0;
                break;
            }

            weekData.push(value);
          }
          contributionData.push(weekData);
        }

        // Handle text pattern
        if (currentPattern === "text") {
          var text = textPattern.value.toUpperCase();
          contributionData = [];
          for (var w = 0; w < numWeeks; w++) {
            contributionData.push([0, 0, 0, 0, 0, 0, 0]);
          }

          var col = 1;
          for (var i = 0; i < text.length && col < numWeeks - 5; i++) {
            var letter = text[i];
            var pattern = letterPatterns[letter];
            if (pattern) {
              for (var x = 0; x < 5; x++) {
                for (var y = 0; y < 7; y++) {
                  if (pattern[y][x] && col + x < numWeeks) {
                    contributionData[col + x][y] =
                      Math.floor(Math.random() * (maxContributions - 5)) + 5;
                  }
                }
              }
              col += 6;
            }
          }
        }
      }

      // Get level from contribution count
      function getLevel(count, maxContributions) {
        if (count === 0) return 0;
        var ratio = count / maxContributions;
        if (ratio < 0.25) return 1;
        if (ratio < 0.5) return 2;
        if (ratio < 0.75) return 3;
        return 4;
      }

      // Generate graph
      function generateGraph() {
        generateContributionData();
        renderGraph();
      }

      // Render graph
      function renderGraph() {
        var numWeeks = parseInt(weeks.value);
        var maxContributions = parseInt(maxContrib.value);
        var container = document.getElementById("contribGraph");
        container.textContent = "";

        // Create rows (7 days)
        for (var day = 0; day < 7; day++) {
          var row = document.createElement("div");
          row.className = "contrib-row";

          for (var week = 0; week < numWeeks; week++) {
            var cell = document.createElement("div");
            cell.className = "contrib-cell";
            var value = contributionData[week] ? contributionData[week][day] : 0;
            var level = getLevel(value, maxContributions);
            cell.style.background = currentScheme.colors[level];
            cell.title = value + " contributions";
            cell.dataset.week = week;
            cell.dataset.day = day;

            // Click to edit in custom mode
            (function (c, w, d) {
              c.addEventListener("click", function () {
                if (currentPattern === "custom") {
                  var newValue =
                    brushLevel === 0 ? 0 : Math.floor((brushLevel / 4) * maxContributions);
                  contributionData[w][d] = newValue;
                  c.style.background = currentScheme.colors[brushLevel];
                  c.title = newValue + " contributions";
                  updateStats();
                }
              });
            })(cell, week, day);

            row.appendChild(cell);
          }

          container.appendChild(row);
        }

        // Update month labels
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        var monthLabels = document.getElementById("monthLabels");
        var numMonths = Math.ceil(numWeeks / 4);
        var startMonth = new Date().getMonth() - numMonths + 1;
        monthLabels.textContent = "";
        for (var i = 0; i < numMonths; i++) {
          var monthIndex = (startMonth + i + 12) % 12;
          var span = document.createElement("span");
          span.textContent = months[monthIndex];
          monthLabels.appendChild(span);
        }

        updateStats();
      }

      // Update stats
      function updateStats() {
        var numWeeks = parseInt(weeks.value);
        var total = 0;
        var activeDays = 0;
        var maxStreak = 0;
        var currentStreak = 0;

        for (var week = 0; week < numWeeks; week++) {
          for (var day = 0; day < 7; day++) {
            var value = contributionData[week] ? contributionData[week][day] : 0;
            total += value;
            if (value > 0) {
              activeDays++;
              currentStreak++;
              maxStreak = Math.max(maxStreak, currentStreak);
            } else {
              currentStreak = 0;
            }
          }
        }

        var statsContainer = document.getElementById("stats");
        statsContainer.textContent = "";

        var items = [
          { value: total, label: "总贡献" },
          { value: activeDays, label: "活跃天数" },
          { value: maxStreak, label: "最长连续" }
        ];

        items.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "stat-item";
          var valueSpan = document.createElement("span");
          valueSpan.className = "stat-value";
          valueSpan.textContent = item.value;
          var labelSpan = document.createElement("span");
          labelSpan.textContent = item.label;
          div.appendChild(valueSpan);
          div.appendChild(labelSpan);
          statsContainer.appendChild(div);
        });
      }

      // Random generation
      document.getElementById("randomBtn").addEventListener("click", function () {
        var patterns = ["random", "wave", "gradient", "sparse", "dense", "weekday"];
        currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
        document.querySelectorAll(".pattern-type").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.pattern === currentPattern);
        });

        activity.value = Math.floor(Math.random() * 60) + 30;
        document.getElementById("activityValue").textContent = activity.value;

        currentScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        document.querySelectorAll(".scheme-option").forEach(function (s, i) {
          s.classList.toggle("active", colorSchemes[i] === currentScheme);
        });

        generateGraph();
      });

      // Generate button
      document.getElementById("generateBtn").addEventListener("click", generateGraph);

      // Download PNG
      document.getElementById("downloadPng").addEventListener("click", function () {
        var numWeeks = parseInt(weeks.value);
        var cellSize = 12;
        var gap = 3;
        var padding = 20;
        var maxContributions = parseInt(maxContrib.value);

        var canvas = document.createElement("canvas");
        canvas.width = numWeeks * (cellSize + gap) + padding * 2;
        canvas.height = 7 * (cellSize + gap) + padding * 2;
        var ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle =
          document.documentElement.getAttribute("data-theme") === "dark" ? "#0d1117" : "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cells
        for (var week = 0; week < numWeeks; week++) {
          for (var day = 0; day < 7; day++) {
            var value = contributionData[week] ? contributionData[week][day] : 0;
            var level = getLevel(value, maxContributions);
            ctx.fillStyle = currentScheme.colors[level];
            ctx.beginPath();
            ctx.roundRect(
              padding + week * (cellSize + gap),
              padding + day * (cellSize + gap),
              cellSize,
              cellSize,
              2
            );
            ctx.fill();
          }
        }

        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "github-contributions.png";
        a.click();
      });

      // Download SVG
      document.getElementById("downloadSvg").addEventListener("click", function () {
        var numWeeks = parseInt(weeks.value);
        var cellSize = 12;
        var gap = 3;
        var padding = 20;
        var maxContributions = parseInt(maxContrib.value);

        var width = numWeeks * (cellSize + gap) + padding * 2;
        var height = 7 * (cellSize + gap) + padding * 2;

        var svgParts = [];
        svgParts.push('<?xml version="1.0" encoding="UTF-8"?>');
        svgParts.push(
          '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">'
        );
        svgParts.push(
          '  <rect width="100%" height="100%" fill="' +
            (document.documentElement.getAttribute("data-theme") === "dark"
              ? "#0d1117"
              : "#ffffff") +
            '"/>'
        );

        for (var week = 0; week < numWeeks; week++) {
          for (var day = 0; day < 7; day++) {
            var value = contributionData[week] ? contributionData[week][day] : 0;
            var level = getLevel(value, maxContributions);
            svgParts.push(
              '  <rect x="' +
                (padding + week * (cellSize + gap)) +
                '" y="' +
                (padding + day * (cellSize + gap)) +
                '" width="' +
                cellSize +
                '" height="' +
                cellSize +
                '" rx="2" fill="' +
                currentScheme.colors[level] +
                '"/>'
            );
          }
        }

        svgParts.push("</svg>");

        var blob = new Blob([svgParts.join("\n")], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "github-contributions.svg";
        a.click();
        URL.revokeObjectURL(url);
      });

      // Initial generation
      generateGraph();

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
    
