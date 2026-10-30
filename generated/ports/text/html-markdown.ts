// @ts-nocheck
// Generated from tools/text/html-markdown.html
// Source SHA-256: 638f9a980caede83a93e7e4646bdc5aa8945a19d095834c667494e94391e5839
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const inputLabel = document.getElementById("inputLabel");
      const outputLabel = document.getElementById("outputLabel");
      const inputCount = document.getElementById("inputCount");
      const outputCount = document.getElementById("outputCount");
      const statusEl = document.getElementById("status");
      const modeBtns = document.querySelectorAll(".mode-btn");

      const LS_KEY = "html_markdown_v1";
      let currentMode = "html2md";

      // HTML to Markdown converter
      function htmlToMarkdown(html) {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return nodeToMarkdown(doc.body).trim();
      }

      function nodeToMarkdown(node) {
        let result = "";

        for (const child of node.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            result += child.textContent;
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            const tag = child.tagName.toLowerCase();
            const inner = nodeToMarkdown(child);

            switch (tag) {
              case "h1":
                result += "\n# " + inner.trim() + "\n\n";
                break;
              case "h2":
                result += "\n## " + inner.trim() + "\n\n";
                break;
              case "h3":
                result += "\n### " + inner.trim() + "\n\n";
                break;
              case "h4":
                result += "\n#### " + inner.trim() + "\n\n";
                break;
              case "h5":
                result += "\n##### " + inner.trim() + "\n\n";
                break;
              case "h6":
                result += "\n###### " + inner.trim() + "\n\n";
                break;
              case "p":
                result += inner.trim() + "\n\n";
                break;
              case "br":
                result += "  \n";
                break;
              case "hr":
                result += "\n---\n\n";
                break;
              case "strong":
              case "b":
                result += "**" + inner + "**";
                break;
              case "em":
              case "i":
                result += "*" + inner + "*";
                break;
              case "del":
              case "s":
                result += "~~" + inner + "~~";
                break;
              case "code":
                if (child.parentElement && child.parentElement.tagName.toLowerCase() === "pre") {
                  result += inner;
                } else {
                  result += "`" + inner + "`";
                }
                break;
              case "pre":
                result += "\n```\n" + inner.trim() + "\n```\n\n";
                break;
              case "blockquote":
                result +=
                  "\n" +
                  inner
                    .trim()
                    .split("\n")
                    .map(function (line) {
                      return "> " + line;
                    })
                    .join("\n") +
                  "\n\n";
                break;
              case "a":
                var href = child.getAttribute("href") || "";
                result += "[" + inner + "](" + href + ")";
                break;
              case "img":
                var src = child.getAttribute("src") || "";
                var alt = child.getAttribute("alt") || "";
                result += "![" + alt + "](" + src + ")";
                break;
              case "ul":
                result += "\n" + convertList(child, false) + "\n";
                break;
              case "ol":
                result += "\n" + convertList(child, true) + "\n";
                break;
              case "li":
                result += inner;
                break;
              case "table":
                result += "\n" + convertTable(child) + "\n";
                break;
              case "div":
              case "span":
              case "article":
              case "section":
              case "main":
              case "header":
              case "footer":
              case "nav":
                result += inner;
                break;
              default:
                result += inner;
            }
          }
        }

        return result;
      }

      function convertList(listNode, ordered) {
        let result = "";
        let index = 1;

        for (const li of listNode.children) {
          if (li.tagName.toLowerCase() === "li") {
            const prefix = ordered ? index + ". " : "- ";
            const content = nodeToMarkdown(li).trim();
            result += prefix + content + "\n";
            index++;
          }
        }

        return result;
      }

      function convertTable(tableNode) {
        const rows = tableNode.querySelectorAll("tr");
        if (rows.length === 0) return "";

        let result = "";
        let headerDone = false;

        rows.forEach(function (row, rowIndex) {
          const cells = row.querySelectorAll("th, td");
          const cellContents = Array.from(cells).map(function (cell) {
            return nodeToMarkdown(cell).trim().replace(/\|/g, "\\|");
          });

          result += "| " + cellContents.join(" | ") + " |\n";

          if (!headerDone && (row.querySelector("th") || rowIndex === 0)) {
            result +=
              "| " +
              cellContents
                .map(function () {
                  return "---";
                })
                .join(" | ") +
              " |\n";
            headerDone = true;
          }
        });

        return result;
      }

      // Markdown to HTML converter
      function markdownToHtml(md) {
        marked.setOptions({
          breaks: true,
          gfm: true
        });
        const rawHtml = marked.parse(md);
        return DOMPurify.sanitize(rawHtml);
      }

      function convert() {
        const input = inputEl.value;
        if (!input.trim()) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          let output;
          if (currentMode === "html2md") {
            output = htmlToMarkdown(input);
          } else {
            output = markdownToHtml(input);
          }
          outputEl.value = output;
          updateCounts();
          saveToStorage();
          showStatus("转换成功", "success");
        } catch (e) {
          showStatus("转换失败: " + e.message, "error");
        }
      }

      function updateCounts() {
        inputCount.textContent = inputEl.value.length + " 字符";
        outputCount.textContent = outputEl.value.length + " 字符";
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + type;
        setTimeout(function () {
          statusEl.className = "status";
        }, 3000);
      }

      function saveToStorage() {
        localStorage.setItem(
          LS_KEY,
          JSON.stringify({
            mode: currentMode,
            input: inputEl.value,
            output: outputEl.value
          })
        );
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            currentMode = data.mode || "html2md";
            inputEl.value = data.input || "";
            outputEl.value = data.output || "";
            updateMode();
            updateCounts();
          } catch (e) {
            // ignore
          }
        }
      }

      function updateMode() {
        modeBtns.forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.mode === currentMode);
        });

        if (currentMode === "html2md") {
          inputLabel.textContent = "HTML 输入";
          outputLabel.textContent = "Markdown 输出";
          inputEl.placeholder = "在此输入 HTML 代码...";
          outputEl.placeholder = "转换结果将显示在这里...";
        } else {
          inputLabel.textContent = "Markdown 输入";
          outputLabel.textContent = "HTML 输出";
          inputEl.placeholder = "在此输入 Markdown 内容...";
          outputEl.placeholder = "转换结果将显示在这里...";
        }
      }

      // Event listeners
      modeBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentMode = btn.dataset.mode;
          updateMode();
          saveToStorage();
        });
      });

      inputEl.addEventListener("input", function () {
        updateCounts();
        saveToStorage();
      });

      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          updateCounts();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("粘贴失败", "error");
        }
      };

      document.getElementById("btnConvert").onclick = convert;

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

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        outputEl.value = "";
        updateCounts();
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      };

      // Theme toggle
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

      // Initialize
      loadFromStorage();
      updateCounts();
    
