// @ts-nocheck
// Generated from tools/dev/code-diff.html
// Source SHA-256: cdaa0cea578b32dbaf2c270fef3937c7c86fe2fd2a61f65e46d952c5352d2b58
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.compare = function () {
        var original = document.getElementById("original").value;
        var modified = document.getElementById("modified").value;

        var oldLines = original.split("\n");
        var newLines = modified.split("\n");

        var diff = computeDiff(oldLines, newLines);
        renderDiff(diff);
      };

      function computeDiff(oldLines, newLines) {
        var m = oldLines.length;
        var n = newLines.length;

        var dp = [];
        for (var i = 0; i <= m; i++) {
          dp[i] = [];
          for (var j = 0; j <= n; j++) {
            dp[i][j] = 0;
          }
        }

        for (var i = 1; i <= m; i++) {
          for (var j = 1; j <= n; j++) {
            if (oldLines[i - 1] === newLines[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }

        var result = [];
        var i = m,
          j = n;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
            result.unshift({ type: "same", oldNum: i, newNum: j, content: oldLines[i - 1] });
            i--;
            j--;
          } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.unshift({ type: "add", oldNum: null, newNum: j, content: newLines[j - 1] });
            j--;
          } else {
            result.unshift({ type: "del", oldNum: i, newNum: null, content: oldLines[i - 1] });
            i--;
          }
        }

        return result;
      }

      function renderDiff(diff) {
        var table = document.getElementById("diffTable");
        while (table.firstChild) table.removeChild(table.firstChild);

        var additions = 0,
          deletions = 0;

        diff.forEach(function (item) {
          var tr = document.createElement("tr");
          tr.className = item.type === "add" ? "add" : item.type === "del" ? "del" : "";

          var tdOldNum = document.createElement("td");
          tdOldNum.className = "line-num";
          tdOldNum.textContent = item.oldNum || "";
          tr.appendChild(tdOldNum);

          var tdNewNum = document.createElement("td");
          tdNewNum.className = "line-num";
          tdNewNum.textContent = item.newNum || "";
          tr.appendChild(tdNewNum);

          var tdSign = document.createElement("td");
          tdSign.style.width = "20px";
          tdSign.style.textAlign = "center";
          if (item.type === "add") {
            tdSign.textContent = "+";
            additions++;
          } else if (item.type === "del") {
            tdSign.textContent = "-";
            deletions++;
          }
          tr.appendChild(tdSign);

          var tdContent = document.createElement("td");
          tdContent.className = "line-content";
          tdContent.textContent = item.content;
          tr.appendChild(tdContent);

          table.appendChild(tr);
        });

        var stats = document.getElementById("stats");
        stats.textContent =
          "共 " + diff.length + " 行，+" + additions + " 新增，-" + deletions + " 删除";
      }

      window.swap = function () {
        var orig = document.getElementById("original");
        var mod = document.getElementById("modified");
        var temp = orig.value;
        orig.value = mod.value;
        mod.value = temp;
        compare();
      };

      window.clearAll = function () {
        document.getElementById("original").value = "";
        document.getElementById("modified").value = "";
        document.getElementById("diffTable").innerHTML = "";
        document.getElementById("stats").textContent = "";
      };

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
    
