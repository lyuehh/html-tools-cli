// @ts-nocheck
// Generated from tools/data/json-flattener.html
// Source SHA-256: 8544bc033e1d59836e02bafdbdf7ec4d078e13c9905c91feed521afcb5840e81
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const errorDetailEl = document.getElementById("errorDetail");
      const statsEl = document.getElementById("stats");
      const delimiterEl = document.getElementById("delimiter");
      const arrayFormatEl = document.getElementById("arrayFormat");
      const indentEl = document.getElementById("indent");
      const LS_KEY = "json_flattener_input_v1";

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

      function getIndent() {
        const val = indentEl.value;
        return val === "tab" ? "\t" : parseInt(val, 10);
      }

      function getMaxDepth(obj, depth) {
        depth = depth || 0;
        if (obj === null || typeof obj !== "object") {
          return depth;
        }
        let maxDepth = depth;
        if (Array.isArray(obj)) {
          for (let i = 0; i < obj.length; i++) {
            maxDepth = Math.max(maxDepth, getMaxDepth(obj[i], depth + 1));
          }
        } else {
          const keys = Object.keys(obj);
          for (let i = 0; i < keys.length; i++) {
            maxDepth = Math.max(maxDepth, getMaxDepth(obj[keys[i]], depth + 1));
          }
        }
        return maxDepth;
      }

      function flattenObject(obj, delimiter, arrayFormat, prefix) {
        prefix = prefix || "";
        const result = {};

        function recurse(current, currentKey) {
          if (current === null || typeof current !== "object") {
            result[currentKey] = current;
            return;
          }

          if (Array.isArray(current)) {
            if (current.length === 0) {
              result[currentKey] = [];
              return;
            }
            for (let i = 0; i < current.length; i++) {
              let newKey;
              if (arrayFormat === "bracket") {
                newKey = currentKey + "[" + i + "]";
              } else {
                newKey = currentKey ? currentKey + delimiter + i : String(i);
              }
              recurse(current[i], newKey);
            }
          } else {
            const keys = Object.keys(current);
            if (keys.length === 0) {
              result[currentKey] = {};
              return;
            }
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const newKey = currentKey ? currentKey + delimiter + key : key;
              recurse(current[key], newKey);
            }
          }
        }

        recurse(obj, prefix);
        return result;
      }

      function flatten() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }

        try {
          const obj = JSON.parse(text);
          const delimiter = delimiterEl.value || ".";
          const arrayFormat = arrayFormatEl.value;

          const originalDepth = getMaxDepth(obj);
          const flattened = flattenObject(obj, delimiter, arrayFormat, "");
          const keyCount = Object.keys(flattened).length;

          const output = JSON.stringify(flattened, null, getIndent());
          outputEl.value = output;

          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          errorDetailEl.textContent = "";

          document.getElementById("statKeys").textContent = keyCount;
          document.getElementById("statDepth").textContent = originalDepth;
          statsEl.classList.add("show");

          showStatus("扁平化完成", "success");
        } catch (e) {
          inputEl.classList.add("error");
          errorDetailEl.textContent = e.message;
          errorDetailEl.classList.add("show");
          statsEl.classList.remove("show");
          showStatus("JSON 解析失败", "error");
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

      document.getElementById("btnFlatten").onclick = flatten;

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

      document.getElementById("btnDownload").onclick = function () {
        if (!outputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        const blob = new Blob([outputEl.value], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "flattened.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("已下载", "success");
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
        errorDetailEl.textContent = "";
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
        errorDetailEl.textContent = "";
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          flatten();
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
    
