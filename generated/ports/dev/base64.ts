// @ts-nocheck
// Generated from tools/dev/base64.html
// Source SHA-256: 6a8288f851fb02e6e46d8f478b84db80f4140b11d5f26ae6da7ffe6d1bf86a5e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const fileInput = document.getElementById("fileInput");
      const fileNameEl = document.getElementById("fileName");

      const LS_KEY = "base64_input_v1";

      // URL state
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
          const encoded = btoa(encodeURIComponent(inputEl.value));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {}
      }

      // localStorage
      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputEl.value = saved;
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      function bytesToBase64(bytes) {
        const chunkSize = 0x8000;
        let binary = "";
        for (let offset = 0; offset < bytes.length; offset += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
        }
        return btoa(binary);
      }

      function base64ToText(base64) {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
        return new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
      }

      // 编码
      function encode() {
        const text = inputEl.value;
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          const encoded = bytesToBase64(new TextEncoder().encode(text));
          outputEl.value = encoded;
          showStatus("编码成功，长度: " + encoded.length, "success");
        } catch (e) {
          showStatus("编码失败: " + e.message, "error");
        }
      }

      // 解码
      window.decode = function () {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          const decoded = base64ToText(text);
          outputEl.value = decoded;
          showStatus("解码成功", "success");
        } catch (e) {
          showStatus("解码失败: 无效的 Base64 字符串", "error");
        }
      };

      // 文件编码
      function encodeFile(file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          outputEl.value = base64;
          showStatus("文件编码成功，大小: " + formatSize(base64.length), "success");
        };
        reader.onerror = () => {
          showStatus("文件读取失败", "error");
        };
        reader.readAsDataURL(file);
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

      // 事件绑定
      document.getElementById("btnPaste").onclick = async () => {
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

      document.getElementById("btnEncode").onclick = encode;
      document.getElementById("btnDecode").onclick = window.decode;

      document.getElementById("btnCopy").onclick = async () => {
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

      document.getElementById("btnShare").onclick = async () => {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = () => {
        inputEl.value = "";
        outputEl.value = "";
        fileNameEl.textContent = "";
        fileInput.value = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      };

      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          fileNameEl.textContent = file.name + " (" + formatSize(file.size) + ")";
          encodeFile(file);
        }
      };

      inputEl.addEventListener("input", () => {
        saveToStorage();
        saveToUrl();
      });

      // 初始化
      if (!loadFromUrl()) {
        loadFromStorage();
      }

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

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
