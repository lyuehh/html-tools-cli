// @ts-nocheck
// Generated from tools/legal/agreement-compare.html
// Source SHA-256: b74e4fce81a06270554987cf156deedbb9e24eac9e3b88436b4897e4db0bf2a6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var STORAGE_SLOT = "agreement_compare_v1";

      function getOptions() {
        return {
          ignoreWhitespace: document.getElementById("ignoreWhitespace").checked,
          ignoreCase: document.getElementById("ignoreCase").checked,
          showLineNumbers: document.getElementById("showLineNumbers").checked,
          sideBySide: document.getElementById("sideBySide").checked
        };
      }

      function preprocessText(text, options) {
        if (options.ignoreWhitespace) {
          text = text.replace(/[ \t]+/g, " ").replace(/^ +| +$/gm, "");
        }
        if (options.ignoreCase) {
          text = text.toLowerCase();
        }
        return text;
      }

      function computeLCS(arr1, arr2) {
        var m = arr1.length;
        var n = arr2.length;
        var dp = [];

        for (var i = 0; i <= m; i++) {
          dp[i] = [];
          for (var j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
              dp[i][j] = 0;
            } else if (arr1[i - 1] === arr2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }

        var lcs = [];
        var i = m,
          j = n;
        while (i > 0 && j > 0) {
          if (arr1[i - 1] === arr2[j - 1]) {
            lcs.unshift({ value: arr1[i - 1], index1: i - 1, index2: j - 1 });
            i--;
            j--;
          } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
          } else {
            j--;
          }
        }

        return lcs;
      }

      function computeDiff(original, modified, options) {
        var origLines = original.split("\n");
        var modLines = modified.split("\n");

        var processedOrig = preprocessText(original, options).split("\n");
        var processedMod = preprocessText(modified, options).split("\n");

        var lcs = computeLCS(processedOrig, processedMod);

        var diff = [];
        var origIdx = 0;
        var modIdx = 0;
        var lcsIdx = 0;

        while (origIdx < origLines.length || modIdx < modLines.length) {
          if (
            lcsIdx < lcs.length &&
            origIdx === lcs[lcsIdx].index1 &&
            modIdx === lcs[lcsIdx].index2
          ) {
            diff.push({
              type: "unchanged",
              value: origLines[origIdx],
              origLine: origIdx + 1,
              modLine: modIdx + 1
            });
            origIdx++;
            modIdx++;
            lcsIdx++;
          } else if (lcsIdx < lcs.length && origIdx < lcs[lcsIdx].index1) {
            diff.push({ type: "removed", value: origLines[origIdx], origLine: origIdx + 1 });
            origIdx++;
          } else if (lcsIdx < lcs.length && modIdx < lcs[lcsIdx].index2) {
            diff.push({ type: "added", value: modLines[modIdx], modLine: modIdx + 1 });
            modIdx++;
          } else if (origIdx < origLines.length) {
            diff.push({ type: "removed", value: origLines[origIdx], origLine: origIdx + 1 });
            origIdx++;
          } else {
            diff.push({ type: "added", value: modLines[modIdx], modLine: modIdx + 1 });
            modIdx++;
          }
        }

        return diff;
      }

      function createDiffLine(text, className) {
        var div = document.createElement("div");
        div.className = "diff-line " + className;
        div.textContent = text;
        return div;
      }

      function renderUnifiedDiff(diff, options, container) {
        var wrapper = document.createElement("div");
        wrapper.className = "diff-view";

        var addedCount = 0;
        var removedCount = 0;

        diff.forEach(function (item) {
          var lineNum = "";
          if (options.showLineNumbers) {
            if (item.type === "unchanged") {
              lineNum = item.origLine + "/" + item.modLine + ": ";
            } else if (item.type === "removed") {
              lineNum = item.origLine + "/-: ";
            } else {
              lineNum = "-/" + item.modLine + ": ";
            }
          }

          var prefix = "";
          if (item.type === "added") {
            prefix = "+ ";
            addedCount++;
          } else if (item.type === "removed") {
            prefix = "- ";
            removedCount++;
          } else {
            prefix = "  ";
          }

          wrapper.appendChild(createDiffLine(lineNum + prefix + item.value, item.type));
        });

        container.textContent = "";
        container.appendChild(wrapper);
        return { added: addedCount, removed: removedCount };
      }

      function renderSideBySideDiff(diff, options, container) {
        var wrapper = document.createElement("div");
        wrapper.className = "side-by-side";

        var leftPanel = document.createElement("div");
        leftPanel.className = "side-panel";
        var leftTitle = document.createElement("h4");
        leftTitle.textContent = "原始协议";
        leftPanel.appendChild(leftTitle);

        var rightPanel = document.createElement("div");
        rightPanel.className = "side-panel";
        var rightTitle = document.createElement("h4");
        rightTitle.textContent = "修改后协议";
        rightPanel.appendChild(rightTitle);

        var addedCount = 0;
        var removedCount = 0;

        diff.forEach(function (item) {
          var lineNum = "";

          if (item.type === "unchanged") {
            if (options.showLineNumbers) {
              lineNum = item.origLine + ": ";
            }
            leftPanel.appendChild(createDiffLine(lineNum + item.value, "unchanged"));
            if (options.showLineNumbers) {
              lineNum = item.modLine + ": ";
            }
            rightPanel.appendChild(createDiffLine(lineNum + item.value, "unchanged"));
          } else if (item.type === "removed") {
            removedCount++;
            if (options.showLineNumbers) {
              lineNum = item.origLine + ": ";
            }
            leftPanel.appendChild(createDiffLine(lineNum + item.value, "removed"));
            var emptyDiv = document.createElement("div");
            emptyDiv.className = "diff-line";
            emptyDiv.style.opacity = "0.3";
            emptyDiv.textContent = " ";
            rightPanel.appendChild(emptyDiv);
          } else {
            addedCount++;
            var emptyDiv = document.createElement("div");
            emptyDiv.className = "diff-line";
            emptyDiv.style.opacity = "0.3";
            emptyDiv.textContent = " ";
            leftPanel.appendChild(emptyDiv);
            if (options.showLineNumbers) {
              lineNum = item.modLine + ": ";
            }
            rightPanel.appendChild(createDiffLine(lineNum + item.value, "added"));
          }
        });

        wrapper.appendChild(leftPanel);
        wrapper.appendChild(rightPanel);

        container.textContent = "";
        container.appendChild(wrapper);
        return { added: addedCount, removed: removedCount };
      }

      function compareDocuments() {
        var original = document.getElementById("originalText").value;
        var modified = document.getElementById("modifiedText").value;

        if (!original.trim()) {
          showStatus("请输入原始协议内容", "error");
          return;
        }

        if (!modified.trim()) {
          showStatus("请输入修改后的协议内容", "error");
          return;
        }

        var options = getOptions();
        var diff = computeDiff(original, modified, options);
        var container = document.getElementById("diffOutput");

        var result;
        if (options.sideBySide) {
          result = renderSideBySideDiff(diff, options, container);
        } else {
          result = renderUnifiedDiff(diff, options, container);
        }

        document.getElementById("addedCount").textContent = "+" + result.added + " 行新增";
        document.getElementById("removedCount").textContent = "-" + result.removed + " 行删除";
        document.getElementById("changedCount").textContent =
          "~" + Math.min(result.added, result.removed) + " 行可能修改";

        document.getElementById("statsSection").style.display = "flex";
        document.getElementById("resultSection").style.display = "block";

        saveToStorage();
        showStatus("对比完成", "success");
      }

      function swapDocuments() {
        var original = document.getElementById("originalText");
        var modified = document.getElementById("modifiedText");
        var temp = original.value;
        original.value = modified.value;
        modified.value = temp;
        showStatus("文档已交换", "success");
      }

      function copyDiff() {
        var original = document.getElementById("originalText").value;
        var modified = document.getElementById("modifiedText").value;

        if (!original.trim() || !modified.trim()) {
          showStatus("请先进行对比", "error");
          return;
        }

        var options = getOptions();
        var diff = computeDiff(original, modified, options);

        var report = "协议对比报告\n";
        report += "生成时间: " + new Date().toLocaleString() + "\n";
        report += "==========================================\n\n";

        var added = 0,
          removed = 0;
        diff.forEach(function (item) {
          if (item.type === "added") added++;
          if (item.type === "removed") removed++;
        });

        report += "统计: +" + added + " 行新增, -" + removed + " 行删除\n\n";
        report += "详细差异:\n";
        report += "------------------------------------------\n";

        diff.forEach(function (item) {
          var prefix = "";
          if (item.type === "added") prefix = "+ ";
          else if (item.type === "removed") prefix = "- ";
          else prefix = "  ";
          report += prefix + item.value + "\n";
        });

        navigator.clipboard
          .writeText(report)
          .then(function () {
            showStatus("差异报告已复制到剪贴板", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function pasteOriginal() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("originalText").value = text;
            showStatus("已粘贴到原始协议", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      }

      function pasteModified() {
        navigator.clipboard
          .readText()
          .then(function (text) {
            document.getElementById("modifiedText").value = text;
            showStatus("已粘贴到修改后协议", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      }

      function clearOriginal() {
        document.getElementById("originalText").value = "";
        showStatus("已清空原始协议", "success");
      }

      function clearModified() {
        document.getElementById("modifiedText").value = "";
        showStatus("已清空修改后协议", "success");
      }

      function clearAll() {
        document.getElementById("originalText").value = "";
        document.getElementById("modifiedText").value = "";
        document.getElementById("diffOutput").textContent = "";
        document.getElementById("statsSection").style.display = "none";
        document.getElementById("resultSection").style.display = "none";
        localStorage.removeItem(STORAGE_SLOT);
        showStatus("已清空全部", "success");
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function saveToStorage() {
        try {
          var data = {
            original: document.getElementById("originalText").value,
            modified: document.getElementById("modifiedText").value,
            options: getOptions()
          };
          localStorage.setItem(STORAGE_SLOT, JSON.stringify(data));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(STORAGE_SLOT);
          if (saved) {
            var data = JSON.parse(saved);
            if (data.original) document.getElementById("originalText").value = data.original;
            if (data.modified) document.getElementById("modifiedText").value = data.modified;
            if (data.options) {
              document.getElementById("ignoreWhitespace").checked = !!data.options.ignoreWhitespace;
              document.getElementById("ignoreCase").checked = !!data.options.ignoreCase;
              document.getElementById("showLineNumbers").checked =
                data.options.showLineNumbers !== false;
              document.getElementById("sideBySide").checked = !!data.options.sideBySide;
            }
          }
        } catch (e) {}
      }

      // Auto-save on input
      document.querySelectorAll('textarea, input[type="checkbox"]').forEach(function (el) {
        el.addEventListener("change", saveToStorage);
        el.addEventListener("input", saveToStorage);
      });

      // Theme toggle
      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      // Initialize
      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        loadFromStorage();
      })();
    
