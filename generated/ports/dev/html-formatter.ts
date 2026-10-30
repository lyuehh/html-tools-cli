// @ts-nocheck
// Generated from tools/dev/html-formatter.html
// Source SHA-256: a957d392a61b1c8cdf1815024ea8446e9c118dc1b6031a11610eb6bf402372c0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const inputStatsEl = document.getElementById("inputStats");
      const outputStatsEl = document.getElementById("outputStats");
      const ratioEl = document.getElementById("ratio");
      const indentTypeEl = document.getElementById("indentType");
      const indentSizeEl = document.getElementById("indentSize");
      const wrapAttributesEl = document.getElementById("wrapAttributes");
      const preserveNewlinesEl = document.getElementById("preserveNewlines");

      const LS_KEY = "html_formatter_v1";

      // HTML 格式化函数
      window.formatHtml = function (html, options) {
        const indentChar = options.indentChar || "  ";
        const wrapAttributes = options.wrapAttributes || false;
        const preserveNewlines = options.preserveNewlines !== false;

        // 移除多余空白但保留必要的结构
        html = html.replace(/>\s+</g, "><");

        // 自闭合标签
        const voidTags = [
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr"
        ];

        // 不格式化内容的标签
        const preformattedTags = ["pre", "code", "script", "style", "textarea"];

        let result = "";
        let indent = 0;
        let inPreformatted = false;
        let preformattedTag = "";

        // 解析 HTML
        const tagRegex =
          /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^>]*)?)\s*\/?>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|[^<]+/gi;

        let match;
        while ((match = tagRegex.exec(html)) !== null) {
          const fullMatch = match[0];
          const tagName = match[1] ? match[1].toLowerCase() : null;
          const attrs = match[2] || "";

          // 处理注释
          if (fullMatch.startsWith("<!--")) {
            result += indentChar.repeat(indent) + fullMatch + "\n";
            continue;
          }

          // 处理 DOCTYPE
          if (fullMatch.startsWith("<!DOCTYPE")) {
            result += fullMatch + "\n";
            continue;
          }

          // 处理文本节点
          if (!tagName) {
            const text = fullMatch.trim();
            if (text) {
              if (inPreformatted) {
                result += fullMatch;
              } else {
                result += indentChar.repeat(indent) + text + "\n";
              }
            } else if (preserveNewlines && fullMatch.includes("\n")) {
              result += "\n";
            }
            continue;
          }

          // 检查是否在预格式化标签内
          if (inPreformatted) {
            result += fullMatch;
            if (fullMatch.startsWith("</") && tagName === preformattedTag) {
              inPreformatted = false;
              preformattedTag = "";
              result += "\n";
            }
            continue;
          }

          // 检查是否进入预格式化标签
          if (preformattedTags.includes(tagName) && !fullMatch.startsWith("</")) {
            result += indentChar.repeat(indent) + fullMatch;
            if (!fullMatch.endsWith("/>")) {
              inPreformatted = true;
              preformattedTag = tagName;
            } else {
              result += "\n";
            }
            continue;
          }

          // 处理闭合标签
          if (fullMatch.startsWith("</")) {
            indent = Math.max(0, indent - 1);
            result += indentChar.repeat(indent) + fullMatch + "\n";
            continue;
          }

          // 处理开始标签
          let formattedTag = "<" + tagName;

          // 处理属性
          if (attrs.trim()) {
            const attrRegex =
              /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
            const attrList = [];
            let attrMatch;
            while ((attrMatch = attrRegex.exec(attrs)) !== null) {
              const attrName = attrMatch[1];
              const attrValue = attrMatch[2] || attrMatch[3] || attrMatch[4];
              if (attrValue !== undefined) {
                attrList.push(attrName + '="' + attrValue + '"');
              } else {
                attrList.push(attrName);
              }
            }

            if (wrapAttributes && attrList.length > 1) {
              formattedTag +=
                "\n" +
                attrList
                  .map(function (a) {
                    return indentChar.repeat(indent + 1) + a;
                  })
                  .join("\n");
            } else {
              formattedTag += " " + attrList.join(" ");
            }
          }

          // 检查是否自闭合
          if (voidTags.includes(tagName) || fullMatch.endsWith("/>")) {
            formattedTag += fullMatch.endsWith("/>") ? " />" : ">";
            result += indentChar.repeat(indent) + formattedTag + "\n";
          } else {
            formattedTag += ">";
            result += indentChar.repeat(indent) + formattedTag + "\n";
            indent++;
          }
        }

        // 清理多余空行
        result = result.replace(/\n{3,}/g, "\n\n");

        return result.trim();
      };

      // HTML 压缩函数
      function minifyHtml(html) {
        // 保存 pre, script, style, textarea 内容
        const preserved = [];
        const preserveTags = ["pre", "script", "style", "textarea"];

        preserveTags.forEach(function (tag) {
          const regex = new RegExp("(<" + tag + "[^>]*>)([\\s\\S]*?)(<\\/" + tag + ">)", "gi");
          html = html.replace(regex, function (match, open, content, close) {
            preserved.push({ open: open, content: content, close: close });
            return "__PRESERVED_" + (preserved.length - 1) + "__";
          });
        });

        // 移除注释 (保留条件注释)
        html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");

        // 移除多余空白
        html = html.replace(/\s+/g, " ");

        // 移除标签之间的空白
        html = html.replace(/>\s+</g, "><");

        // 移除标签内的多余空白
        html = html.replace(/\s+>/g, ">");
        html = html.replace(/<\s+/g, "<");

        // 移除属性值周围的多余空白
        html = html.replace(/\s*=\s*/g, "=");

        // 恢复保存的内容
        preserved.forEach(function (item, index) {
          html = html.replace("__PRESERVED_" + index + "__", item.open + item.content + item.close);
        });

        return html.trim();
      }

      function getIndentChar() {
        const type = indentTypeEl.value;
        const size = parseInt(indentSizeEl.value, 10) || 2;
        return type === "tab" ? "\t" : " ".repeat(size);
      }

      function format() {
        const html = inputEl.value;
        if (!html.trim()) {
          showStatus("请输入 HTML 代码", "error");
          return;
        }

        try {
          const formatted = formatHtml(html, {
            indentChar: getIndentChar(),
            wrapAttributes: wrapAttributesEl.checked,
            preserveNewlines: preserveNewlinesEl.checked
          });
          outputEl.value = formatted;
          updateStats();
          showStatus("格式化成功", "success");
        } catch (e) {
          showStatus("格式化失败: " + e.message, "error");
        }
      }

      function minify() {
        const html = inputEl.value;
        if (!html.trim()) {
          showStatus("请输入 HTML 代码", "error");
          return;
        }

        try {
          const minified = minifyHtml(html);
          outputEl.value = minified;
          updateStats();
          showStatus("压缩成功", "success");
        } catch (e) {
          showStatus("压缩失败: " + e.message, "error");
        }
      }

      function updateStats() {
        const inputLen = inputEl.value.length;
        const outputLen = outputEl.value.length;
        inputStatsEl.textContent = "输入: " + inputLen.toLocaleString() + " 字符";
        outputStatsEl.textContent = "输出: " + outputLen.toLocaleString() + " 字符";

        if (outputLen && inputLen) {
          const ratio = ((outputLen / inputLen) * 100).toFixed(1);
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
        } catch (e) {
          // 忽略编码错误
        }
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

      // 事件绑定
      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
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
    
