// @ts-nocheck
// Generated from tools/dev/json-formatter.html
// Source SHA-256: 13127357f3a737b57e4df62bd5ffd145f8fd88a7c2ccbc98b6c8bc66277fc506
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const errorDetailEl = document.getElementById("errorDetail");
      const errorAnnouncementEl = document.getElementById("errorAnnouncement");
      const statsEl = document.getElementById("stats");
      const indentEl = document.getElementById("indent");
      const removeEmptyEl = document.getElementById("removeEmpty");
      const LS_KEY = "json_formatter_input_v1";

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
      function getIndent() {
        const val = indentEl.value;
        return val === "tab" ? "\t" : parseInt(val, 10);
      }

      function parseError(e, text) {
        const msg = e.message;
        const posMatch = msg.match(/position\s+(\d+)/i);
        const lineMatch = msg.match(/line\s+(\d+)/i);
        const colMatch = msg.match(/column\s+(\d+)/i);
        errorDetailEl.textContent = "";
        if (posMatch) {
          const pos = parseInt(posMatch[1], 10);
          const lines = text.slice(0, pos).split("\n");
          const line = lines.length;
          const col = lines[lines.length - 1].length + 1;
          const context = text.slice(Math.max(0, pos - 20), pos + 20);
          const p1 = document.createElement("p");
          p1.textContent = "位置: 第 " + line + " 行, 第 " + col + " 列";
          const p2 = document.createElement("p");
          p2.textContent = "上下文: ";
          const code = document.createElement("code");
          code.textContent = "..." + context + "...";
          p2.appendChild(code);
          const p3 = document.createElement("p");
          p3.textContent = "原因: " + msg;
          errorDetailEl.appendChild(p1);
          errorDetailEl.appendChild(p2);
          errorDetailEl.appendChild(p3);
        } else if (lineMatch) {
          const line = parseInt(lineMatch[1], 10);
          const col = colMatch ? parseInt(colMatch[1], 10) : 1;
          const lines = text.split("\n");
          const context = lines[line - 1] || "";
          const p1 = document.createElement("p");
          p1.textContent = "位置: 第 " + line + " 行, 第 " + col + " 列";
          const p2 = document.createElement("p");
          p2.textContent = "该行: ";
          const code = document.createElement("code");
          code.textContent = context.slice(0, 50) + (context.length > 50 ? "..." : "");
          p2.appendChild(code);
          const p3 = document.createElement("p");
          p3.textContent = "原因: " + msg;
          errorDetailEl.appendChild(p1);
          errorDetailEl.appendChild(p2);
          errorDetailEl.appendChild(p3);
        } else {
          errorDetailEl.textContent = msg;
        }
        errorAnnouncementEl.textContent = errorDetailEl.textContent;
      }

      function removeEmptyValues(obj) {
        if (Array.isArray(obj))
          return obj.map(removeEmptyValues).filter((v) => v !== null && v !== "");
        if (obj && typeof obj === "object") {
          const result = {};
          for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== "") result[key] = removeEmptyValues(value);
          }
          return result;
        }
        return obj;
      }
      function sortKeys(obj) {
        if (Array.isArray(obj)) return obj.map(sortKeys);
        if (obj && typeof obj === "object") {
          const sorted = {};
          Object.keys(obj)
            .sort()
            .forEach((key) => {
              sorted[key] = sortKeys(obj[key]);
            });
          return sorted;
        }
        return obj;
      }
      function analyzeJson(obj, depth) {
        depth = depth || 0;
        const stats = { keys: 0, arrays: 0, maxDepth: depth };
        if (Array.isArray(obj)) {
          stats.arrays = 1;
          obj.forEach(function (item) {
            const sub = analyzeJson(item, depth + 1);
            stats.keys += sub.keys;
            stats.arrays += sub.arrays;
            stats.maxDepth = Math.max(stats.maxDepth, sub.maxDepth);
          });
        } else if (obj && typeof obj === "object") {
          stats.keys = Object.keys(obj).length;
          Object.values(obj).forEach(function (value) {
            const sub = analyzeJson(value, depth + 1);
            stats.keys += sub.keys;
            stats.arrays += sub.arrays;
            stats.maxDepth = Math.max(stats.maxDepth, sub.maxDepth);
          });
        }
        return stats;
      }
      function updateStats(obj, outputText) {
        const analysis = analyzeJson(obj);
        document.getElementById("statKeys").textContent = analysis.keys;
        document.getElementById("statArrays").textContent = analysis.arrays;
        document.getElementById("statDepth").textContent = analysis.maxDepth;
        document.getElementById("statSize").textContent = formatSize(new Blob([outputText]).size);
        statsEl.classList.add("show");
      }
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function format() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }
        try {
          var obj = JSON.parse(text);
          if (removeEmptyEl.checked) obj = removeEmptyValues(obj);
          const output = JSON.stringify(obj, null, getIndent());
          outputEl.value = output;
          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          updateStats(obj, output);
          showStatus("格式化成功", "success");
        } catch (e) {
          inputEl.classList.add("error");
          parseError(e, text);
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("解析失败", "error");
        }
      }
      function minify() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }
        try {
          var obj = JSON.parse(text);
          if (removeEmptyEl.checked) obj = removeEmptyValues(obj);
          const output = JSON.stringify(obj);
          outputEl.value = output;
          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          updateStats(obj, output);
          showStatus("压缩成功 -" + (text.length - output.length) + " 字符", "success");
        } catch (e) {
          inputEl.classList.add("error");
          parseError(e, text);
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("解析失败", "error");
        }
      }
      window.validate = function () {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }
        try {
          const obj = JSON.parse(text);
          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          updateStats(obj, text);
          showStatus("JSON 有效", "success");
        } catch (e) {
          inputEl.classList.add("error");
          parseError(e, text);
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("JSON 无效", "error");
        }
      };
      function sortKeysAction() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }
        try {
          var obj = JSON.parse(text);
          obj = sortKeys(obj);
          const output = JSON.stringify(obj, null, getIndent());
          outputEl.value = output;
          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          updateStats(obj, output);
          showStatus("排序完成", "success");
        } catch (e) {
          inputEl.classList.add("error");
          parseError(e, text);
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("解析失败", "error");
        }
      }

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
      document.getElementById("btnFormat").onclick = format;
      document.getElementById("btnMinify").onclick = minify;
      document.getElementById("btnValidate").onclick = validate;
      document.getElementById("btnSortKeys").onclick = sortKeysAction;
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
        inputEl.classList.remove("error");
        errorDetailEl.classList.remove("show");
        errorAnnouncementEl.textContent = "";
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };
      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
        inputEl.classList.remove("error");
        errorDetailEl.classList.remove("show");
        errorAnnouncementEl.textContent = "";
      });
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          format();
        }
      });

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

      initTheme();
      if (!loadFromUrl()) loadFromStorage();
    
