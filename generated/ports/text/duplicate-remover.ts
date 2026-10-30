// @ts-nocheck
// Generated from tools/text/duplicate-remover.html
// Source SHA-256: 149c5bda7314a1f40165051e61cd39d57d2d64bad6a329aa0dce7f257f3de187
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        const inputText = document.getElementById("inputText");
        const outputText = document.getElementById("outputText");
        const ignoreCase = document.getElementById("ignoreCase");
        const trimWhitespace = document.getElementById("trimWhitespace");
        const removeEmpty = document.getElementById("removeEmpty");
        const sortOutput = document.getElementById("sortOutput");

        function removeDuplicates() {
          const text = inputText.value;
          if (!text.trim()) {
            outputText.value = "";
            updateStats(0, 0);
            return;
          }

          let lines = text.split("\n");
          const originalCount = lines.length;

          // 处理选项
          if (trimWhitespace.checked) {
            lines = lines.map((line) => line.trim());
          }

          if (removeEmpty.checked) {
            lines = lines.filter((line) => line.length > 0);
          }

          // 去重
          const seen = new Set();
          const uniqueLines = [];

          for (const line of lines) {
            const key = ignoreCase.checked ? line.toLowerCase() : line;
            if (!seen.has(key)) {
              seen.add(key);
              uniqueLines.push(line);
            }
          }

          // 排序
          let result = uniqueLines;
          if (sortOutput.checked) {
            result = [...uniqueLines].sort((a, b) => {
              const compareA = ignoreCase.checked ? a.toLowerCase() : a;
              const compareB = ignoreCase.checked ? b.toLowerCase() : b;
              return compareA.localeCompare(compareB, "zh-CN");
            });
          }

          outputText.value = result.join("\n");
          updateStats(originalCount, result.length);
        }

        function updateStats(original, unique) {
          const removed = original - unique;
          const rate = original > 0 ? ((removed / original) * 100).toFixed(1) : 0;

          document.getElementById("originalCount").textContent = original;
          document.getElementById("uniqueCount").textContent = unique;
          document.getElementById("removedCount").textContent = removed;
          document.getElementById("duplicateRate").textContent = rate + "%";
        }

        function loadSample() {
          inputText.value = `苹果
香蕉
苹果
橙子
香蕉
葡萄
苹果
西瓜
香蕉
橙子
芒果
苹果`;
          removeDuplicates();
        }

        function clearInput() {
          inputText.value = "";
          outputText.value = "";
          updateStats(0, 0);
        }

        function copyOutput() {
          if (!outputText.value) return;

          navigator.clipboard.writeText(outputText.value).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "已复制!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1500);
          });
        }

        // 绑定事件
        inputText.addEventListener("input", removeDuplicates);
        [ignoreCase, trimWhitespace, removeEmpty, sortOutput].forEach((el) => {
          el.addEventListener("change", removeDuplicates);
        });

        // 暴露全局函数
        window.loadSample = loadSample;
        window.clearInput = clearInput;
        window.copyOutput = copyOutput;
      })();

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
    
