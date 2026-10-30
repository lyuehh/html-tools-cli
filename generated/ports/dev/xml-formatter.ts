// @ts-nocheck
// Generated from tools/dev/xml-formatter.html
// Source SHA-256: 352192f5493ff32563c37e36decb1d6e72cb66db2e126d928f0ab497ad6ad95b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const indentEl = document.getElementById("indent");
      const LS_KEY = "xml_formatter_input_v1";

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

      function formatXML(xml) {
        const indent = getIndent();
        let formatted = "";
        let level = 0;
        const tokens = xml.split(/(<[^>]+>)/g).filter(function (token) {
          return token.trim().length > 0;
        });

        tokens.forEach(function (token) {
          if (token.match(/^<\/\w/)) {
            level = Math.max(0, level - 1);
          }

          if (token.match(/^<\w[^>]*[^\/]>$/)) {
            formatted += indent.repeat(level) + token + "\n";
            level++;
          } else if (token.match(/^<\/\w/)) {
            formatted += indent.repeat(level) + token + "\n";
          } else if (token.match(/^<\w[^>]*\/>/)) {
            formatted += indent.repeat(level) + token + "\n";
          } else if (token.match(/^</)) {
            formatted += indent.repeat(level) + token + "\n";
          } else {
            const trimmed = token.trim();
            if (trimmed) {
              formatted += indent.repeat(level) + trimmed + "\n";
            }
          }
        });

        return formatted.trim();
      }

      function minifyXML(xml) {
        return xml
          .replace(/>\s+</g, "><")
          .replace(/\n/g, "")
          .replace(/\s{2,}/g, " ")
          .trim();
      }

      function validateXML(xml) {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(xml, "application/xml");
          const errors = doc.getElementsByTagName("parsererror");

          if (errors.length > 0) {
            const errorText = errors[0].textContent;
            return { valid: false, error: errorText };
          }

          return { valid: true };
        } catch (e) {
          return { valid: false, error: e.message };
        }
      }

      function format() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 XML", "error");
          return;
        }

        try {
          const output = formatXML(text);
          outputEl.value = output;
          showStatus("格式化成功", "success");
        } catch (e) {
          showStatus("格式化失败: " + e.message, "error");
        }
      }

      function minify() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 XML", "error");
          return;
        }

        try {
          const minified = minifyXML(text);
          outputEl.value = minified;
          showStatus("压缩成功 -" + (text.length - minified.length) + " 字符", "success");
        } catch (e) {
          showStatus("压缩失败: " + e.message, "error");
        }
      }

      window.validate = function () {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 XML", "error");
          return;
        }

        const result = validateXML(text);
        if (result.valid) {
          showStatus("XML 格式正确", "success");
        } else {
          showStatus("XML 格式错误: " + result.error, "error");
        }
      };

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
      document.getElementById("btnValidate").onclick = validate;

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
    
