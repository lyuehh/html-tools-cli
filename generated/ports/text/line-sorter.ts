// @ts-nocheck
// Generated from tools/text/line-sorter.html
// Source SHA-256: aafe3ed7752e6518ad1575b096a7c9a73cedb304ee422b66412672e603653569
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const sortMethodEl = document.getElementById("sortMethod");
      const caseSensitiveEl = document.getElementById("caseSensitive");
      const removeDuplicatesEl = document.getElementById("removeDuplicates");
      const trimLinesEl = document.getElementById("trimLines");
      const removeEmptyEl = document.getElementById("removeEmpty");
      const inputLinesEl = document.getElementById("inputLines");
      const outputLinesEl = document.getElementById("outputLines");
      const duplicatesStatEl = document.getElementById("duplicatesStat");
      const duplicatesRemovedEl = document.getElementById("duplicatesRemoved");
      const toastEl = document.getElementById("toast");

      // ============================================
      // Sort Logic
      // ============================================
      function sortLines() {
        const text = inputEl.value;
        if (!text.trim()) {
          outputEl.textContent = "";
          inputLinesEl.textContent = "0";
          outputLinesEl.textContent = "0";
          duplicatesStatEl.style.display = "none";
          return;
        }

        let lines = text.split("\n");
        inputLinesEl.textContent = lines.length;

        // Trim lines if enabled
        if (trimLinesEl.checked) {
          lines = lines.map((line) => line.trim());
        }

        // Remove empty lines if enabled
        if (removeEmptyEl.checked) {
          lines = lines.filter((line) => line.length > 0);
        }

        const beforeDedup = lines.length;

        // Remove duplicates if enabled
        if (removeDuplicatesEl.checked) {
          const seen = new Set();
          lines = lines.filter((line) => {
            const key = caseSensitiveEl.checked ? line : line.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          duplicatesStatEl.style.display = "inline";
          duplicatesRemovedEl.textContent = beforeDedup - lines.length;
        } else {
          duplicatesStatEl.style.display = "none";
        }

        // Sort based on method
        const method = sortMethodEl.value;
        const caseSensitive = caseSensitiveEl.checked;

        switch (method) {
          case "alphabetical":
            lines.sort((a, b) => {
              const aVal = caseSensitive ? a : a.toLowerCase();
              const bVal = caseSensitive ? b : b.toLowerCase();
              return aVal.localeCompare(bVal, "zh-CN");
            });
            break;

          case "alphabetical-desc":
            lines.sort((a, b) => {
              const aVal = caseSensitive ? a : a.toLowerCase();
              const bVal = caseSensitive ? b : b.toLowerCase();
              return bVal.localeCompare(aVal, "zh-CN");
            });
            break;

          case "numeric":
            lines.sort((a, b) => {
              const aNum = parseFloat(a) || 0;
              const bNum = parseFloat(b) || 0;
              return aNum - bNum;
            });
            break;

          case "numeric-desc":
            lines.sort((a, b) => {
              const aNum = parseFloat(a) || 0;
              const bNum = parseFloat(b) || 0;
              return bNum - aNum;
            });
            break;

          case "length":
            lines.sort((a, b) => a.length - b.length);
            break;

          case "length-desc":
            lines.sort((a, b) => b.length - a.length);
            break;

          case "reverse":
            lines.reverse();
            break;

          case "shuffle":
            shuffleArray(lines);
            break;
        }

        outputEl.textContent = lines.join("\n");
        outputLinesEl.textContent = lines.length;

        // Save state
        saveState();
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      // ============================================
      // Actions
      // ============================================
      async function pasteFromClipboard() {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          sortLines();
          showToast("已粘贴", "success");
        } catch (e) {
          showToast("无法访问剪贴板");
        }
      }

      function loadSample() {
        inputEl.value = `香蕉
苹果
橙子
葡萄
苹果
芒果
西瓜
草莓
葡萄
蓝莓
cherry
Apple
banana`;
        sortLines();
        showToast("已加载示例", "success");
      }

      function clearInput() {
        inputEl.value = "";
        outputEl.textContent = "";
        inputLinesEl.textContent = "0";
        outputLinesEl.textContent = "0";
        duplicatesStatEl.style.display = "none";
        localStorage.removeItem("line-sorter-state");
        showToast("已清空", "success");
      }

      async function copyOutput() {
        const text = outputEl.textContent;
        if (!text) {
          showToast("没有可复制的内容");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showToast("已复制到剪贴板", "success");
        } catch (e) {
          showToast("复制失败");
        }
      }

      function reshuffleLines() {
        if (sortMethodEl.value !== "shuffle") {
          sortMethodEl.value = "shuffle";
        }
        sortLines();
        showToast("已重新打乱", "success");
      }

      function applyToInput() {
        const text = outputEl.textContent;
        if (!text) {
          showToast("没有可应用的内容");
          return;
        }
        inputEl.value = text;
        sortLines();
        showToast("已应用为输入", "success");
      }

      // ============================================
      // Toast
      // ============================================
      function showToast(message, type = "") {
        toastEl.textContent = message;
        toastEl.className = "toast show " + type;
        setTimeout(() => {
          toastEl.className = "toast";
        }, 2000);
      }

      // ============================================
      // State Management
      // ============================================
      function saveState() {
        const state = {
          input: inputEl.value,
          sortMethod: sortMethodEl.value,
          caseSensitive: caseSensitiveEl.checked,
          removeDuplicates: removeDuplicatesEl.checked,
          trimLines: trimLinesEl.checked,
          removeEmpty: removeEmptyEl.checked
        };
        localStorage.setItem("line-sorter-state", JSON.stringify(state));
      }

      function loadState() {
        const saved = localStorage.getItem("line-sorter-state");
        if (saved) {
          try {
            const state = JSON.parse(saved);
            inputEl.value = state.input || "";
            sortMethodEl.value = state.sortMethod || "alphabetical";
            caseSensitiveEl.checked = state.caseSensitive || false;
            removeDuplicatesEl.checked = state.removeDuplicates || false;
            trimLinesEl.checked = state.trimLines !== false;
            removeEmptyEl.checked = state.removeEmpty || false;
            sortLines();
          } catch (e) {
            console.error("Failed to load state:", e);
          }
        }
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadState();
    
