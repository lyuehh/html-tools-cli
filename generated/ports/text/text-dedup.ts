// @ts-nocheck
// Generated from tools/text/text-dedup.html
// Source SHA-256: 29c91a66fe09e769ff405a003db4d8a026f5c7a59e600bf3e41e0c622e32dc43
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const inputCountEl = document.getElementById("inputCount");
      const outputCountEl = document.getElementById("outputCount");
      const statOriginalEl = document.getElementById("statOriginal");
      const statUniqueEl = document.getElementById("statUnique");
      const statRemovedEl = document.getElementById("statRemoved");
      const LS_KEY = "text_dedup_v1";

      function updateInputCount() {
        const lines = inputEl.value ? inputEl.value.split("\n").length : 0;
        inputCountEl.textContent = lines + " 行";
      }

      function updateOutputCount() {
        const lines = outputEl.value ? outputEl.value.split("\n").length : 0;
        outputCountEl.textContent = lines + " 行";
      }

      function dedup() {
        const text = inputEl.value;
        if (!text.trim()) {
          showStatus("请输入文本", "error");
          return;
        }

        const trimLines = document.getElementById("trimLines").checked;
        const ignoreCase = document.getElementById("ignoreCase").checked;
        const ignoreEmpty = document.getElementById("ignoreEmpty").checked;
        const keepOrder = document.getElementById("keepOrder").checked;

        let lines = text.split("\n");
        const originalCount = lines.length;

        // Process lines
        if (trimLines) {
          lines = lines.map(function (line) {
            return line.trim();
          });
        }

        // Remove duplicates
        const seen = new Set();
        const unique = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          if (ignoreEmpty && line === "") {
            continue;
          }

          const key = ignoreCase ? line.toLowerCase() : line;

          if (!seen.has(key)) {
            seen.add(key);
            unique.push(line);
          }
        }

        // Sort if not keeping order
        let result = unique;
        if (!keepOrder) {
          result = unique.slice().sort(function (a, b) {
            return a.localeCompare(b, "zh-CN");
          });
        }

        outputEl.value = result.join("\n");

        // Update stats
        const uniqueCount = result.length;
        const removedCount = originalCount - uniqueCount;

        statOriginalEl.textContent = originalCount;
        statUniqueEl.textContent = uniqueCount;
        statRemovedEl.textContent = removedCount;

        updateOutputCount();
        saveToStorage();
        showStatus("去重完成，移除了 " + removedCount + " 行重复内容", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          input: inputEl.value,
          trimLines: document.getElementById("trimLines").checked,
          ignoreCase: document.getElementById("ignoreCase").checked,
          ignoreEmpty: document.getElementById("ignoreEmpty").checked,
          keepOrder: document.getElementById("keepOrder").checked
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            inputEl.value = data.input || "";
            document.getElementById("trimLines").checked = data.trimLines !== false;
            document.getElementById("ignoreCase").checked = data.ignoreCase === true;
            document.getElementById("ignoreEmpty").checked = data.ignoreEmpty !== false;
            document.getElementById("keepOrder").checked = data.keepOrder !== false;
            updateInputCount();
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      document.getElementById("btnDedup").onclick = dedup;

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
        updateInputCount();
        updateOutputCount();
        saveToStorage();
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        statusEl.textContent = "";
        statOriginalEl.textContent = "0";
        statUniqueEl.textContent = "0";
        statRemovedEl.textContent = "0";
        updateInputCount();
        updateOutputCount();
        localStorage.removeItem(LS_KEY);
      };

      inputEl.addEventListener("input", function () {
        updateInputCount();
        saveToStorage();
      });

      // Checkbox changes
      document.querySelectorAll('.option-group input[type="checkbox"]').forEach(function (cb) {
        cb.addEventListener("change", saveToStorage);
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
    
