// @ts-nocheck
// Generated from tools/dev/json-yaml.html
// Source SHA-256: 4fe1cb16638db72347f05ccce8c28e162c8fc68b6c225034fa8d176bbca2c377
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      var inputEl = document.getElementById("input");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");
      var prettyPrintEl = document.getElementById("prettyPrint");
      var indentEl = document.getElementById("indent");

      var LS_KEY = "json_yaml_input_v1";

      // ============================================
      // URL State Management
      // ============================================
      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
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
          var encoded = btoa(encodeURIComponent(inputEl.value));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {}
      }

      // ============================================
      // Local Storage
      // ============================================
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputEl.value = saved;
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      // ============================================
      // Utility Functions
      // ============================================
      function getIndent() {
        var val = indentEl.value;
        if (val === "tab") return "\t";
        return parseInt(val, 10);
      }

      window.detectFormat = function (text) {
        var trimmed = text.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          try {
            JSON.parse(trimmed);
            return "json";
          } catch (e) {}
        }

        return "yaml";
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // ============================================
      // Conversion Functions
      // ============================================
      function jsonToYaml() {
        var text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          var obj = JSON.parse(text);
          var yamlStr = jsyaml.dump(obj, {
            indent: 2,
            lineWidth: -1,
            noRefs: true
          });
          outputEl.value = yamlStr;
          showStatus("JSON → YAML 转换成功", "success");
        } catch (e) {
          showStatus("JSON 解析错误: " + e.message, "error");
        }
      }

      window.yamlToJson = function () {
        var text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          var obj = jsyaml.load(text);
          var indent = prettyPrintEl.checked ? getIndent() : 0;
          var jsonStr = JSON.stringify(obj, null, indent);
          outputEl.value = jsonStr;
          showStatus("YAML → JSON 转换成功", "success");
        } catch (e) {
          showStatus("YAML 解析错误: " + e.message, "error");
        }
      };

      // ============================================
      // Event Handlers
      // ============================================
      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnJsonToYaml").onclick = jsonToYaml;
      document.getElementById("btnYamlToJson").onclick = window.yamlToJson;

      document.getElementById("btnCopy").onclick = async function () {
        if (!outputEl.value) {
          showStatus("没有可复制的内容", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(outputEl.value);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      window.toggleTheme = toggleTheme;

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      if (!loadFromUrl()) {
        loadFromStorage();
      }
    
