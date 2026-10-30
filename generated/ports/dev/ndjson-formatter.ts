// @ts-nocheck
// Generated from tools/dev/ndjson-formatter.html
// Source SHA-256: ae887f0f851ccb144b32e68ec26e28bb513101feee3d77a15675c644828c27e0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputEl = document.getElementById("input");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var resultArea = document.getElementById("resultArea");
      var indentEl = document.getElementById("indent");
      var skipEmptyEl = document.getElementById("skipEmpty");
      var showValidEl = document.getElementById("showValid");
      var errorBadge = document.getElementById("errorBadge");
      var LS_KEY = "ndjson_formatter_input_v1";

      function getIndent() {
        var val = indentEl.value;
        return val === "tab" ? "\t" : parseInt(val, 10);
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, inputEl.value);
        } catch (e) {
          // ignore quota errors
        }
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) inputEl.value = saved;
        } catch (e) {
          // ignore
        }
      }

      function parseLines(mode) {
        var raw = inputEl.value;
        if (!raw.trim()) {
          showStatus("请输入 NDJSON/JSONL 内容", "error");
          return;
        }

        var lines = raw.split("\n");
        var indent = getIndent();
        var skipEmpty = skipEmptyEl.checked;
        var showValid = showValidEl.checked;

        var totalLines = 0;
        var validCount = 0;
        var errorCount = 0;
        var skippedCount = 0;
        var outputLines = [];

        var fragment = document.createDocumentFragment();

        lines.forEach(function (line, idx) {
          var trimmed = line.trim();
          if (trimmed === "") {
            if (skipEmpty) {
              skippedCount++;
              return;
            }
          }
          totalLines++;

          var lineNum = idx + 1;
          var wrapper = document.createElement("div");

          if (trimmed === "") {
            wrapper.className = "result-line";
            var numEl = document.createElement("div");
            numEl.className = "line-num";
            numEl.textContent = lineNum;
            var contentEl = document.createElement("div");
            contentEl.className = "line-content";
            contentEl.textContent = "";
            wrapper.appendChild(numEl);
            wrapper.appendChild(contentEl);
            fragment.appendChild(wrapper);
            outputLines.push("");
            return;
          }

          try {
            var parsed = JSON.parse(trimmed);
            var output;
            if (mode === "format") {
              output = JSON.stringify(parsed, null, indent);
            } else if (mode === "minify") {
              output = JSON.stringify(parsed);
            } else {
              output = trimmed;
            }

            wrapper.className = "result-line" + (showValid ? " line-valid" : "");
            var numEl2 = document.createElement("div");
            numEl2.className = "line-num";
            numEl2.textContent = lineNum;
            var contentEl2 = document.createElement("div");
            contentEl2.className = "line-content";
            contentEl2.textContent = output;
            wrapper.appendChild(numEl2);
            wrapper.appendChild(contentEl2);
            fragment.appendChild(wrapper);

            outputLines.push(output);
            validCount++;
          } catch (e) {
            wrapper.className = "result-line line-error";
            var numEl3 = document.createElement("div");
            numEl3.className = "line-num";
            numEl3.textContent = lineNum;
            var contentEl3 = document.createElement("div");
            contentEl3.className = "line-content";
            contentEl3.textContent = trimmed;
            var errEl = document.createElement("div");
            errEl.className = "line-error-msg";
            errEl.textContent = "Error: " + e.message;
            wrapper.appendChild(numEl3);
            wrapper.appendChild(contentEl3);
            wrapper.appendChild(errEl);
            fragment.appendChild(wrapper);

            outputLines.push(trimmed);
            errorCount++;
          }
        });

        resultArea.innerHTML = "";
        if (fragment.childNodes.length === 0) {
          resultArea.innerHTML = '<div class="empty-state">所有行均为空行（已跳过）</div>';
        } else {
          var linesContainer = document.createElement("div");
          linesContainer.className = "result-lines";
          linesContainer.appendChild(fragment);
          resultArea.appendChild(linesContainer);
        }

        resultArea.dataset.output = outputLines.join("\n");

        document.getElementById("statTotal").textContent = totalLines;
        document.getElementById("statValid").textContent = validCount;
        document.getElementById("statErrors").textContent = errorCount;
        document.getElementById("statSkipped").textContent = skippedCount;
        document.getElementById("statSize").textContent = formatSize(new Blob([raw]).size);
        statsEl.classList.add("show");

        if (errorCount === 0) {
          errorBadge.textContent = "";
          showStatus("解析完成：" + validCount + " 行有效", "success");
        } else {
          errorBadge.textContent = errorCount + " 个错误";
          showStatus("发现 " + errorCount + " 行错误，" + validCount + " 行有效", "error");
        }
      }

      document.getElementById("btnPaste").onclick = function () {
        navigator.clipboard
          .readText()
          .then(function (text) {
            inputEl.value = text;
            saveToStorage();
            showStatus("已粘贴", "success");
          })
          .catch(function () {
            showStatus("无法访问剪贴板", "error");
          });
      };

      document.getElementById("btnParse").onclick = function () {
        parseLines("raw");
      };

      document.getElementById("btnFormat").onclick = function () {
        parseLines("format");
      };

      document.getElementById("btnMinify").onclick = function () {
        parseLines("minify");
      };

      document.getElementById("btnCopy").onclick = function () {
        var output = resultArea.dataset.output;
        if (!output) {
          showStatus("没有可复制的结果", "error");
          return;
        }
        navigator.clipboard
          .writeText(output)
          .then(function () {
            showStatus("已复制结果", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      };

      document.getElementById("btnCopyInput").onclick = function () {
        if (!inputEl.value) {
          showStatus("输入为空", "error");
          return;
        }
        navigator.clipboard
          .writeText(inputEl.value)
          .then(function () {
            showStatus("已复制输入", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        resultArea.innerHTML =
          '<div class="empty-state">粘贴 NDJSON/JSONL 内容后点击「解析 / 校验」</div>';
        resultArea.dataset.output = "";
        errorBadge.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        statsEl.classList.remove("show");
        try {
          localStorage.removeItem(LS_KEY);
        } catch (e) {
          // ignore
        }
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          parseLines("raw");
        }
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadFromStorage();
    
