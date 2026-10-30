// @ts-nocheck
// Generated from tools/dev/url-codec.html
// Source SHA-256: e8fc623636335d3d2c15bb0b463739fa4047331959db742371161400f527fb26
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      var inputEl = document.getElementById("input");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");
      var parsedTable = document.getElementById("parsedTable");

      var LS_KEY = "url_codec_input_v1";

      // ============================================
      // Utility Functions
      // ============================================
      function getMode() {
        return document.querySelector('input[name="mode"]:checked').value;
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

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
        } catch (e) {
          // Silent fail
        }
      }

      // ============================================
      // localStorage
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
      // Encoding/Decoding Functions
      // ============================================
      function encode() {
        var text = inputEl.value;
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          var mode = getMode();
          var encoded = mode === "component" ? encodeURIComponent(text) : encodeURI(text);
          outputEl.value = encoded;
          showStatus("编码成功", "success");
        } catch (e) {
          showStatus("编码失败: " + e.message, "error");
        }
      }

      window.decode = function () {
        var text = inputEl.value;
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          var mode = getMode();
          var decoded = mode === "component" ? decodeURIComponent(text) : decodeURI(text);
          outputEl.value = decoded;
          showStatus("解码成功", "success");
        } catch (e) {
          showStatus("解码失败: 无效的编码字符串", "error");
        }
      };

      // ============================================
      // URL Parsing
      // ============================================
      function parseUrl() {
        var text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 URL", "error");
          return;
        }

        try {
          var url = new URL(text);
          document.getElementById("urlProtocol").textContent = url.protocol;
          document.getElementById("urlHost").textContent = url.hostname;
          document.getElementById("urlPort").textContent = url.port || "(default)";
          document.getElementById("urlPath").textContent = url.pathname;
          document.getElementById("urlSearch").textContent = url.search || "(none)";
          document.getElementById("urlHash").textContent = url.hash || "(none)";
          parsedTable.style.display = "table";
          showStatus("URL 解析成功", "success");
        } catch (e) {
          parsedTable.style.display = "none";
          showStatus("无效的 URL 格式", "error");
        }
      }

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

      document.getElementById("btnEncode").onclick = encode;
      document.getElementById("btnDecode").onclick = decode;
      document.getElementById("btnParse").onclick = parseUrl;

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
        parsedTable.style.display = "none";
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
    
