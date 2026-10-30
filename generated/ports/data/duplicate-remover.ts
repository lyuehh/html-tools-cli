// @ts-nocheck
// Generated from tools/data/duplicate-remover.html
// Source SHA-256: 8342a04ac54fbe93390bfd184ab715c35adace84344d06ba495c02ebb06837f1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const statsEl = document.getElementById("stats");
      const caseSensitiveEl = document.getElementById("caseSensitive");
      const keepOptionEl = document.getElementById("keepOption");
      const trimWhitespaceEl = document.getElementById("trimWhitespace");
      const ignoreEmptyEl = document.getElementById("ignoreEmpty");
      const LS_KEY = "duplicate_remover_input_v1";

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

      function removeDuplicates() {
        const text = inputEl.value;
        if (!text.trim()) {
          showStatus("请输入文本", "error");
          return;
        }

        const caseSensitive = caseSensitiveEl.checked;
        const keepFirst = keepOptionEl.value === "first";
        const trimWs = trimWhitespaceEl.checked;
        const ignoreEmpty = ignoreEmptyEl.checked;

        let lines = text.split("\n");
        const totalLines = lines.length;

        if (trimWs) {
          lines = lines.map((line) => line.trim());
        }

        const seen = new Map();
        const result = [];

        if (keepFirst) {
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (ignoreEmpty && line === "") continue;
            const key = caseSensitive ? line : line.toLowerCase();
            if (!seen.has(key)) {
              seen.set(key, true);
              result.push(line);
            }
          }
        } else {
          for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            if (ignoreEmpty && line === "") continue;
            const key = caseSensitive ? line : line.toLowerCase();
            if (!seen.has(key)) {
              seen.set(key, true);
              result.unshift(line);
            }
          }
        }

        outputEl.value = result.join("\n");

        const nonEmptyTotal = ignoreEmpty ? lines.filter((l) => l !== "").length : totalLines;
        const uniqueCount = result.length;
        const duplicateCount = nonEmptyTotal - uniqueCount;

        document.getElementById("statTotal").textContent = nonEmptyTotal;
        document.getElementById("statUnique").textContent = uniqueCount;
        document.getElementById("statDuplicates").textContent = duplicateCount;
        statsEl.classList.add("show");

        showStatus("去重完成，移除 " + duplicateCount + " 个重复项", "success");
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

      document.getElementById("btnRemove").onclick = removeDuplicates;

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
        const blob = new Blob([outputEl.value], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "unique_items.txt";
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
        statsEl.classList.remove("show");
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          removeDuplicates();
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
    
