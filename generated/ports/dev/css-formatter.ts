// @ts-nocheck
// Generated from tools/dev/css-formatter.html
// Source SHA-256: 9f5afab8daadd103d144ed6363265198e00963d5863c002d7afe2cff81e827ed
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const indentEl = document.getElementById("indent");
      const LS_KEY = "css_formatter_input_v1";

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
          const encoded = btoa(encodeURIComponent(inputEl.value));
          history.replaceState(null, "", "#" + encoded);
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
        return val === "tab" ? "\t" : " ".repeat(parseInt(val, 10));
      }

      function formatCSS(css) {
        const indent = getIndent();
        let formatted = css.trim();

        // Add newlines and indentation
        formatted = formatted.replace(/\{/g, " {\n");
        formatted = formatted.replace(/\}/g, "\n}\n");
        formatted = formatted.replace(/;/g, ";\n");
        formatted = formatted.replace(/,/g, ",\n");

        // Clean up multiple newlines
        formatted = formatted.replace(/\n+/g, "\n");

        // Add indentation
        const lines = formatted.split("\n");
        let level = 0;
        const result = [];

        lines.forEach(function (line) {
          line = line.trim();
          if (!line) return;

          if (line.includes("}")) level = Math.max(0, level - 1);
          result.push(indent.repeat(level) + line);
          if (line.includes("{")) level++;
        });

        return result.join("\n");
      }

      function minify() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 CSS", "error");
          return;
        }

        let minified = text
          .replace(/\/\*[\s\S]*?\*\//g, "")
          .replace(/\s+/g, " ")
          .replace(/\s*{\s*/g, "{")
          .replace(/\s*}\s*/g, "}")
          .replace(/\s*:\s*/g, ":")
          .replace(/\s*;\s*/g, ";")
          .replace(/\s*,\s*/g, ",")
          .trim();

        outputEl.value = minified;
        showStatus("压缩成功 -" + (text.length - minified.length) + " 字符", "success");
      }

      function format() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 CSS", "error");
          return;
        }

        try {
          const output = formatCSS(text);
          outputEl.value = output;
          showStatus("格式化成功", "success");
        } catch (e) {
          showStatus("格式化失败", "error");
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
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
        statusEl.textContent = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      if (!loadFromUrl()) loadFromStorage();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
