// @ts-nocheck
// Generated from tools/data/data-cleaner.html
// Source SHA-256: 143d4fd6ecc18d27ff9262e5dddbaa1e083668706407442a17aab59ec9e57695
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const statsBarEl = document.getElementById("statsBar");
      const btnUndo = document.getElementById("btnUndo");

      const LS_KEY = "data_cleaner_input_v1";
      const undoStack = [];
      const MAX_UNDO = 20;

      // Checkbox elements
      const optRemoveEmpty = document.getElementById("optRemoveEmpty");
      const optTrimWhitespace = document.getElementById("optTrimWhitespace");
      const optRemoveDuplicates = document.getElementById("optRemoveDuplicates");
      const optRemoveSpecial = document.getElementById("optRemoveSpecial");
      const optToLowercase = document.getElementById("optToLowercase");
      const optToUppercase = document.getElementById("optToUppercase");
      const optRemoveNumbers = document.getElementById("optRemoveNumbers");
      const optRemoveExtraSpaces = document.getElementById("optRemoveExtraSpaces");
      const replaceFromEl = document.getElementById("replaceFrom");
      const replaceToEl = document.getElementById("replaceTo");

      // Mutual exclusivity for case conversion
      optToLowercase.addEventListener("change", function () {
        if (this.checked) optToUppercase.checked = false;
      });
      optToUppercase.addEventListener("change", function () {
        if (this.checked) optToLowercase.checked = false;
      });

      // URL state management
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

      function pushUndo(inputVal, outputVal) {
        undoStack.push({ input: inputVal, output: outputVal });
        if (undoStack.length > MAX_UNDO) {
          undoStack.shift();
        }
        btnUndo.disabled = false;
      }

      function cleanData() {
        const originalText = inputEl.value;
        if (!originalText.trim()) {
          showStatus("请输入数据", "error");
          return;
        }

        // Save state for undo
        pushUndo(originalText, outputEl.value);

        let text = originalText;
        let lines = text.split("\n");
        const stats = {
          originalLines: lines.length,
          originalChars: text.length,
          duplicates: 0,
          replacements: 0
        };

        // 1. Trim whitespace from each line
        if (optTrimWhitespace.checked) {
          lines = lines.map((line) => line.trim());
        }

        // 2. Remove empty lines
        if (optRemoveEmpty.checked) {
          lines = lines.filter((line) => line.length > 0);
        }

        // 3. Remove duplicates
        if (optRemoveDuplicates.checked) {
          const seen = new Set();
          const uniqueLines = [];
          for (const line of lines) {
            if (!seen.has(line)) {
              seen.add(line);
              uniqueLines.push(line);
            } else {
              stats.duplicates++;
            }
          }
          lines = uniqueLines;
        }

        // Process each line for remaining options
        lines = lines.map((line) => {
          // 4. Remove special characters (keep alphanumeric, Chinese, spaces, and common punctuation)
          if (optRemoveSpecial.checked) {
            line = line.replace(/[^\w\s\u4e00-\u9fff.,;:!?，。；：！？、""''（）【】《》\-]/g, "");
          }

          // 5. Remove numbers
          if (optRemoveNumbers.checked) {
            line = line.replace(/\d/g, "");
          }

          // 6. Remove extra spaces (multiple spaces to single)
          if (optRemoveExtraSpaces.checked) {
            line = line.replace(/\s+/g, " ").trim();
          }

          // 7. Convert case
          if (optToLowercase.checked) {
            line = line.toLowerCase();
          } else if (optToUppercase.checked) {
            line = line.toUpperCase();
          }

          return line;
        });

        // Join back to text
        text = lines.join("\n");

        // 8. Text replacement
        const searchText = replaceFromEl.value;
        if (searchText) {
          const replaceText = replaceToEl.value;
          const regex = new RegExp(escapeRegExp(searchText), "g");
          const matches = text.match(regex);
          stats.replacements = matches ? matches.length : 0;
          text = text.replace(regex, replaceText);
        }

        // Update output
        outputEl.value = text;

        // Calculate and display stats
        const cleanedLines = text.split("\n").filter((l) => l.length > 0).length;
        stats.cleanedLines = cleanedLines;
        stats.cleanedChars = text.length;
        stats.removedLines = stats.originalLines - cleanedLines;
        stats.removedChars = stats.originalChars - stats.cleanedChars;

        updateStats(stats);
        statsBarEl.style.display = "flex";

        const changes = [];
        if (stats.removedLines > 0) changes.push(`删除 ${stats.removedLines} 行`);
        if (stats.removedChars > 0) changes.push(`删除 ${stats.removedChars} 字符`);
        if (stats.duplicates > 0) changes.push(`去重 ${stats.duplicates} 行`);
        if (stats.replacements > 0) changes.push(`替换 ${stats.replacements} 处`);

        if (changes.length > 0) {
          showStatus("清洗完成: " + changes.join(", "), "success");
        } else {
          showStatus("清洗完成，无需修改", "success");
        }
      }

      function updateStats(stats) {
        document.getElementById("statOriginalLines").textContent = stats.originalLines;
        document.getElementById("statCleanedLines").textContent = stats.cleanedLines;
        document.getElementById("statRemovedLines").textContent = stats.removedLines;
        document.getElementById("statOriginalChars").textContent = formatNumber(
          stats.originalChars
        );
        document.getElementById("statCleanedChars").textContent = formatNumber(stats.cleanedChars);
        document.getElementById("statRemovedChars").textContent = formatNumber(stats.removedChars);
        document.getElementById("statDuplicates").textContent = stats.duplicates;
        document.getElementById("statReplacements").textContent = stats.replacements;
      }

      function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
      }

      function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      function undo() {
        if (undoStack.length === 0) return;
        const state = undoStack.pop();
        inputEl.value = state.input;
        outputEl.value = state.output;
        saveToStorage();
        saveToUrl();
        showStatus("已撤销", "success");
        if (undoStack.length === 0) {
          btnUndo.disabled = true;
        }
      }

      // Event listeners
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

      document.getElementById("btnClean").onclick = cleanData;
      document.getElementById("btnUndo").onclick = undo;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制", "success");
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
        outputEl.value = "";
        statsBarEl.style.display = "none";
        statusEl.textContent = "";
        statusEl.className = "status";
        undoStack.length = 0;
        btnUndo.disabled = true;
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      // Keyboard shortcut
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          cleanData();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
          if (
            document.activeElement !== inputEl &&
            document.activeElement !== replaceFromEl &&
            document.activeElement !== replaceToEl
          ) {
            e.preventDefault();
            undo();
          }
        }
      });

      // Theme toggle
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

      // Initialize
      initTheme();
      if (!loadFromUrl()) loadFromStorage();
    
