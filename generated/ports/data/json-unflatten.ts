// @ts-nocheck
// Generated from tools/data/json-unflatten.html
// Source SHA-256: e49352a9bea04d703af2dbc81beff0306794c059bbf394357b904ae3512473de
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const errorDetailEl = document.getElementById("errorDetail");
      const statsEl = document.getElementById("stats");
      const delimiterEl = document.getElementById("delimiter");
      const indentEl = document.getElementById("indent");
      const detectArraysEl = document.getElementById("detectArrays");
      const LS_KEY = "json_unflatten_input_v1";

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

      function parseKey(key, delimiter) {
        const parts = [];
        let current = "";
        let i = 0;

        while (i < key.length) {
          if (key[i] === "[") {
            if (current) {
              parts.push(current);
              current = "";
            }
            let bracketContent = "";
            i++;
            while (i < key.length && key[i] !== "]") {
              bracketContent += key[i];
              i++;
            }
            parts.push(bracketContent);
            i++;
            if (key[i] === delimiter) {
              i++;
            }
          } else if (key.substring(i, i + delimiter.length) === delimiter) {
            if (current) {
              parts.push(current);
              current = "";
            }
            i += delimiter.length;
          } else {
            current += key[i];
            i++;
          }
        }

        if (current) {
          parts.push(current);
        }

        return parts;
      }

      function isArrayLike(obj) {
        if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
          return false;
        }
        const keys = Object.keys(obj);
        if (keys.length === 0) return false;

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (!/^\d+$/.test(key)) {
            return false;
          }
        }

        const indices = keys
          .map(function (k) {
            return parseInt(k, 10);
          })
          .sort(function (a, b) {
            return a - b;
          });

        for (let i = 0; i < indices.length; i++) {
          if (indices[i] !== i) {
            return false;
          }
        }

        return true;
      }

      function convertArrays(obj) {
        if (typeof obj !== "object" || obj === null) {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj.map(convertArrays);
        }

        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          obj[keys[i]] = convertArrays(obj[keys[i]]);
        }

        if (isArrayLike(obj)) {
          const arr = [];
          const sortedKeys = Object.keys(obj).sort(function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
          });
          for (let i = 0; i < sortedKeys.length; i++) {
            arr.push(obj[sortedKeys[i]]);
          }
          return arr;
        }

        return obj;
      }

      function unflattenObject(flat, delimiter, detectArrays) {
        const result = {};

        const keys = Object.keys(flat);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = flat[key];
          const parts = parseKey(key, delimiter);

          let current = result;
          for (let j = 0; j < parts.length - 1; j++) {
            const part = parts[j];
            const nextPart = parts[j + 1];
            const nextIsNumeric = /^\d+$/.test(nextPart);

            if (current[part] === undefined) {
              current[part] = nextIsNumeric && detectArrays ? {} : {};
            }
            current = current[part];
          }

          current[parts[parts.length - 1]] = value;
        }

        if (detectArrays) {
          return convertArrays(result);
        }

        return result;
      }

      function unflatten() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON", "error");
          return;
        }

        try {
          const flat = JSON.parse(text);
          const delimiter = delimiterEl.value || ".";
          const detectArrays = detectArraysEl.checked;

          if (typeof flat !== "object" || flat === null || Array.isArray(flat)) {
            throw new Error("输入必须是一个 JSON 对象");
          }

          const keyCount = Object.keys(flat).length;
          const unflattened = unflattenObject(flat, delimiter, detectArrays);
          const newDepth = getMaxDepth(unflattened);

          const output = JSON.stringify(unflattened, null, getIndent());
          outputEl.value = output;

          inputEl.classList.remove("error");
          errorDetailEl.classList.remove("show");
          errorDetailEl.textContent = "";

          document.getElementById("statKeys").textContent = keyCount;
          document.getElementById("statDepth").textContent = newDepth;
          statsEl.classList.add("show");

          showStatus("反扁平化完成", "success");
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

      document.getElementById("btnUnflatten").onclick = unflatten;

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
        a.download = "unflattened.json";
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
          unflatten();
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
    
