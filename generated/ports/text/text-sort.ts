// @ts-nocheck
// Generated from tools/text/text-sort.html
// Source SHA-256: 0dcbdc6dc19b7c4cd527a9110bb6b161e6f478bb22df5495a18ed06a2db22b1e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const inputCountEl = document.getElementById("inputCount");
      const outputCountEl = document.getElementById("outputCount");
      const sortTypeEl = document.getElementById("sortType");
      const LS_KEY = "text_sort_v1";

      function updateInputCount() {
        const lines = inputEl.value ? inputEl.value.split("\n").length : 0;
        inputCountEl.textContent = lines + " 行";
      }

      function updateOutputCount() {
        const lines = outputEl.value ? outputEl.value.split("\n").length : 0;
        outputCountEl.textContent = lines + " 行";
      }

      function extractNumber(str) {
        const match = str.match(/-?\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
      }

      function sortLines() {
        const text = inputEl.value;
        if (!text.trim()) {
          showStatus("请输入文本", "error");
          return;
        }

        const sortType = sortTypeEl.value;
        const ignoreCase = document.getElementById("ignoreCase").checked;
        const trimLines = document.getElementById("trimLines").checked;
        const ignoreEmpty = document.getElementById("ignoreEmpty").checked;

        let lines = text.split("\n");

        // Process lines
        if (trimLines) {
          lines = lines.map(function (line) {
            return line.trim();
          });
        }

        if (ignoreEmpty) {
          lines = lines.filter(function (line) {
            return line !== "";
          });
        }

        // Sort based on type
        switch (sortType) {
          case "alpha":
            lines.sort(function (a, b) {
              const va = ignoreCase ? a.toLowerCase() : a;
              const vb = ignoreCase ? b.toLowerCase() : b;
              return va.localeCompare(vb, "zh-CN");
            });
            break;

          case "alpha-desc":
            lines.sort(function (a, b) {
              const va = ignoreCase ? a.toLowerCase() : a;
              const vb = ignoreCase ? b.toLowerCase() : b;
              return vb.localeCompare(va, "zh-CN");
            });
            break;

          case "numeric":
            lines.sort(function (a, b) {
              return extractNumber(a) - extractNumber(b);
            });
            break;

          case "numeric-desc":
            lines.sort(function (a, b) {
              return extractNumber(b) - extractNumber(a);
            });
            break;

          case "length":
            lines.sort(function (a, b) {
              return a.length - b.length;
            });
            break;

          case "length-desc":
            lines.sort(function (a, b) {
              return b.length - a.length;
            });
            break;

          case "random":
            for (let i = lines.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = lines[i];
              lines[i] = lines[j];
              lines[j] = temp;
            }
            break;

          case "reverse":
            lines.reverse();
            break;
        }

        outputEl.value = lines.join("\n");
        updateOutputCount();
        saveToStorage();

        const sortNames = {
          alpha: "字母顺序",
          "alpha-desc": "字母倒序",
          numeric: "数字顺序",
          "numeric-desc": "数字倒序",
          length: "长度升序",
          "length-desc": "长度降序",
          random: "随机排序",
          reverse: "反转顺序"
        };
        showStatus("已按 " + sortNames[sortType] + " 排序，共 " + lines.length + " 行", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          input: inputEl.value,
          sortType: sortTypeEl.value,
          ignoreCase: document.getElementById("ignoreCase").checked,
          trimLines: document.getElementById("trimLines").checked,
          ignoreEmpty: document.getElementById("ignoreEmpty").checked
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            inputEl.value = data.input || "";
            sortTypeEl.value = data.sortType || "alpha";
            document.getElementById("ignoreCase").checked = data.ignoreCase === true;
            document.getElementById("trimLines").checked = data.trimLines !== false;
            document.getElementById("ignoreEmpty").checked = data.ignoreEmpty !== false;
            updateInputCount();
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      document.getElementById("btnSort").onclick = sortLines;

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
        updateInputCount();
        updateOutputCount();
        localStorage.removeItem(LS_KEY);
      };

      inputEl.addEventListener("input", function () {
        updateInputCount();
        saveToStorage();
      });

      sortTypeEl.addEventListener("change", saveToStorage);
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
    
