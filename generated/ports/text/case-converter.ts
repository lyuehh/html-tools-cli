// @ts-nocheck
// Generated from tools/text/case-converter.html
// Source SHA-256: a176707662a17dba1d0571b96c21218281cffe76e7652dbe05a7ce25cf49f86d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const inputEl = document.getElementById("input");
      const statusEl = document.getElementById("status");
      const LS_KEY = "case_converter_v1";

      // ============================================
      // Case Conversion Functions
      // ============================================
      function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
        });
      }

      function toSentenceCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      function toCamelCase(str) {
        return str
          .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
          })
          .replace(/^[A-Z]/, function (chr) {
            return chr.toLowerCase();
          });
      }

      function toPascalCase(str) {
        return str
          .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
          })
          .replace(/^[a-z]/, function (chr) {
            return chr.toUpperCase();
          });
      }

      function toSnakeCase(str) {
        return str
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .replace(/[\s-]+/g, "_")
          .toLowerCase();
      }

      function toKebabCase(str) {
        return str
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .replace(/[\s_]+/g, "-")
          .toLowerCase();
      }

      function toConstantCase(str) {
        return toSnakeCase(str).toUpperCase();
      }

      // ============================================
      // Conversion Handler
      // ============================================
      function convert(mode) {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }

        let result;
        switch (mode) {
          case "upper":
            result = text.toUpperCase();
            break;
          case "lower":
            result = text.toLowerCase();
            break;
          case "title":
            result = toTitleCase(text);
            break;
          case "sentence":
            result = toSentenceCase(text);
            break;
          case "camel":
            result = toCamelCase(text);
            break;
          case "pascal":
            result = toPascalCase(text);
            break;
          case "snake":
            result = toSnakeCase(text);
            break;
          case "kebab":
            result = toKebabCase(text);
            break;
          case "constant":
            result = toConstantCase(text);
            break;
          default:
            result = text;
        }

        inputEl.value = result;
        saveToStorage();
        showStatus("转换成功", "success");
      }

      // ============================================
      // Status Messages
      // ============================================
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // ============================================
      // Storage Management
      // ============================================
      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) inputEl.value = saved;
      }

      // ============================================
      // Event Handlers
      // ============================================
      document.querySelectorAll(".convert-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const mode = btn.getAttribute("data-mode");
          convert(mode);
        });
      });

      document.getElementById("btnCopy").onclick = async function () {
        if (!inputEl.value) {
          showStatus("没有内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(inputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        statusEl.textContent = "";
        localStorage.removeItem(LS_KEY);
      };

      inputEl.addEventListener("input", saveToStorage);

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
      window.toggleTheme = toggleTheme;
      initTheme();
      loadFromStorage();
    
