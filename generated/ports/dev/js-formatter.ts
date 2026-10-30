// @ts-nocheck
// Generated from tools/dev/js-formatter.html
// Source SHA-256: 0742d3421903242d4a70c6a560f9216da41d1ea3f0848127282e8b98870b937c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputEl = document.getElementById("input");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");
      var inputStatsEl = document.getElementById("inputStats");
      var outputStatsEl = document.getElementById("outputStats");
      var ratioEl = document.getElementById("ratio");
      var indentTypeEl = document.getElementById("indentType");
      var indentSizeEl = document.getElementById("indentSize");
      var useSemicolonEl = document.getElementById("useSemicolon");
      var useSingleQuoteEl = document.getElementById("useSingleQuote");

      var LS_KEY = "js_formatter_v1";

      function getOptions() {
        var useTab = indentTypeEl.value === "tab";
        var indentSize = parseInt(indentSizeEl.value, 10) || 2;
        return {
          indent_size: useTab ? 1 : indentSize,
          indent_char: useTab ? "\t" : " ",
          indent_with_tabs: useTab,
          preserve_newlines: true,
          max_preserve_newlines: 2,
          jslint_happy: false,
          space_after_anon_function: true,
          brace_style: "collapse",
          keep_array_indentation: false,
          space_before_conditional: true,
          unescape_strings: false,
          wrap_line_length: 0,
          e4x: false,
          end_with_newline: false,
          comma_first: false
        };
      }

      function format() {
        var code = inputEl.value;
        if (!code.trim()) {
          showStatus("请输入 JavaScript 代码", "error");
          return;
        }

        try {
          if (typeof js_beautify === "undefined") {
            showStatus("格式化库加载中，请稍后重试", "error");
            return;
          }

          var formatted = js_beautify(code, getOptions());

          // 处理分号选项
          if (!useSemicolonEl.checked) {
            formatted = formatted.replace(/;(\s*[\n\r])/g, "$1");
            formatted = formatted.replace(/;$/gm, "");
          }

          // 处理引号选项
          if (useSingleQuoteEl.checked) {
            // 简单替换双引号为单引号（不处理字符串内的转义）
            formatted = formatted.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, function (match, content) {
              if (content.includes("'")) return match;
              return "'" + content + "'";
            });
          }

          outputEl.value = formatted;
          updateStats();
          showStatus("格式化成功", "success");
        } catch (e) {
          showStatus("格式化失败: " + e.message, "error");
        }
      }

      async function minify() {
        var code = inputEl.value;
        if (!code.trim()) {
          showStatus("请输入 JavaScript 代码", "error");
          return;
        }

        // 检查 Terser 是否加载
        if (typeof Terser === "undefined") {
          showStatus("压缩库加载中，请稍后重试", "error");
          return;
        }

        try {
          var result = await Terser.minify(code, {
            compress: {
              dead_code: true,
              drop_console: false,
              drop_debugger: true
            },
            mangle: true,
            format: {
              comments: false
            }
          });

          if (result.error) {
            throw result.error;
          }

          outputEl.value = result.code;
          updateStats();
          showStatus("压缩成功", "success");
        } catch (e) {
          showStatus("压缩失败: " + e.message, "error");
        }
      }

      function updateStats() {
        var inputLen = inputEl.value.length;
        var outputLen = outputEl.value.length;
        inputStatsEl.textContent = "输入: " + inputLen.toLocaleString() + " 字符";
        outputStatsEl.textContent = "输出: " + outputLen.toLocaleString() + " 字符";

        if (outputLen && inputLen) {
          var ratio = ((outputLen / inputLen) * 100).toFixed(1);
          ratioEl.textContent = "比例: " + ratio + "%";
        } else {
          ratioEl.textContent = "";
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // URL state
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
          // 忽略编码错误
        }
      }

      // localStorage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputEl.value = saved;
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, inputEl.value);
      }

      // 事件绑定
      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          updateStats();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnFormat").onclick = format;
      document.getElementById("btnMinify").onclick = minify;

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
        updateStats();
        showStatus("已清空", "success");
      };

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
        updateStats();
      });

      // 初始化
      if (!loadFromUrl()) {
        loadFromStorage();
      }
      updateStats();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      };
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
