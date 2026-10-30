// @ts-nocheck
// Generated from tools/text/whitespace-cleaner.html
// Source SHA-256: 1f01aa5f15c6ddffea616f3c024c53f4d5a4bb7e967aaead142a73a5b0fae99c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const inputInfoEl = document.getElementById("inputInfo");
      const outputInfoEl = document.getElementById("outputInfo");
      const statOriginalEl = document.getElementById("statOriginal");
      const statCleanedEl = document.getElementById("statCleaned");
      const statReducedEl = document.getElementById("statReduced");
      const LS_KEY = "whitespace_cleaner_v1";

      // Unicode whitespace characters
      const UNICODE_SPACES = /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;
      const INVISIBLE_CHARS = /[\u200B-\u200D\uFEFF\u2060\u00AD\u034F\u061C\u17B4\u17B5\u180E]/g;
      const CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

      function updateInputInfo() {
        inputInfoEl.textContent = inputEl.value.length + " 字符";
      }

      function updateOutputInfo() {
        outputInfoEl.textContent = outputEl.value.length + " 字符";
      }

      function updateStats(original, cleaned) {
        statOriginalEl.textContent = original;
        statCleanedEl.textContent = cleaned;
        statReducedEl.textContent = original - cleaned;
      }

      const cleaners = {
        "trim-lines": function (text) {
          return text
            .split("\n")
            .map(function (line) {
              return line.trim();
            })
            .join("\n");
        },

        "collapse-spaces": function (text) {
          return text.replace(/[^\S\n]+/g, " ");
        },

        "remove-empty-lines": function (text) {
          return text
            .split("\n")
            .filter(function (line) {
              return line.trim() !== "";
            })
            .join("\n");
        },

        "collapse-empty-lines": function (text) {
          return text.replace(/\n{3,}/g, "\n\n");
        },

        "remove-all-spaces": function (text) {
          return text.replace(/[^\S\n]/g, "");
        },

        "tabs-to-spaces": function (text) {
          return text.replace(/\t/g, "    ");
        },

        "spaces-to-tabs": function (text) {
          return text.replace(/ {4}/g, "\t");
        },

        "normalize-unicode": function (text) {
          return text.replace(UNICODE_SPACES, " ");
        },

        "remove-invisible": function (text) {
          return text.replace(INVISIBLE_CHARS, "").replace(CONTROL_CHARS, "");
        },

        "clean-all": function (text) {
          // Apply common cleanings
          let result = text;
          result = result.replace(UNICODE_SPACES, " ");
          result = result.replace(INVISIBLE_CHARS, "");
          result = result.replace(CONTROL_CHARS, "");
          result = result
            .split("\n")
            .map(function (line) {
              return line.trim();
            })
            .join("\n");
          result = result.replace(/[^\S\n]+/g, " ");
          result = result.replace(/\n{3,}/g, "\n\n");
          return result;
        }
      };

      const modeNames = {
        "trim-lines": "去除行首尾空白",
        "collapse-spaces": "合并多余空格",
        "remove-empty-lines": "删除空行",
        "collapse-empty-lines": "合并连续空行",
        "remove-all-spaces": "删除所有空格",
        "tabs-to-spaces": "Tab 转空格",
        "spaces-to-tabs": "空格转 Tab",
        "normalize-unicode": "规范化 Unicode 空格",
        "remove-invisible": "删除不可见字符",
        "clean-all": "一键全部清理"
      };

      function clean(mode) {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }

        const cleaner = cleaners[mode];
        if (!cleaner) return;

        const originalLen = text.length;
        const result = cleaner(text);
        const cleanedLen = result.length;

        outputEl.value = result;
        updateOutputInfo();
        updateStats(originalLen, cleanedLen);
        saveToStorage();

        showStatus(
          modeNames[mode] + " 完成，减少了 " + (originalLen - cleanedLen) + " 个字符",
          "success"
        );
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputEl.value = saved;
          updateInputInfo();
        }
      }

      // Bind clean buttons
      document.querySelectorAll(".clean-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const mode = btn.getAttribute("data-mode");
          clean(mode);
        });
      });

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnSwap").onclick = function () {
        const temp = inputEl.value;
        inputEl.value = outputEl.value;
        outputEl.value = temp;
        updateInputInfo();
        updateOutputInfo();
        saveToStorage();
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        statusEl.textContent = "";
        updateInputInfo();
        updateOutputInfo();
        updateStats(0, 0);
        localStorage.removeItem(LS_KEY);
      };

      inputEl.addEventListener("input", function () {
        updateInputInfo();
        saveToStorage();
      });

      loadFromStorage();

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
    
