// @ts-nocheck
// Generated from tools/dev/xpath-tester.html
// Source SHA-256: aa3573cf11d1bd7b0ff1c1889e0301628f8085cdaeba6fb5e57da0d07eb8a30c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.setExample = function (xpath) {
        document.getElementById("xpath").value = xpath;
        evaluate();
      };

      function evaluate() {
        const xpath = document.getElementById("xpath").value.trim();
        const xmlContent = document.getElementById("xmlContent").value;
        const resultList = document.getElementById("resultList");
        const resultCount = document.getElementById("resultCount");

        if (!xpath || !xmlContent) {
          resultList.innerHTML =
            '<div class="result-item error">请输入XPath表达式和XML/HTML内容</div>';
          resultCount.textContent = "0 个";
          return;
        }

        try {
          // Parse XML/HTML
          const parser = new DOMParser();
          let doc;

          // Try parsing as XML first
          doc = parser.parseFromString(xmlContent, "text/xml");

          // Check for parse errors
          const parseError = doc.querySelector("parsererror");
          if (parseError) {
            // Try as HTML
            doc = parser.parseFromString(xmlContent, "text/html");
          }

          // Evaluate XPath
          const results = [];
          const xpathResult = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);

          let node;
          switch (xpathResult.resultType) {
            case XPathResult.NUMBER_TYPE:
              results.push({ type: "number", value: xpathResult.numberValue });
              break;
            case XPathResult.STRING_TYPE:
              results.push({ type: "string", value: xpathResult.stringValue });
              break;
            case XPathResult.BOOLEAN_TYPE:
              results.push({ type: "boolean", value: xpathResult.booleanValue });
              break;
            default:
              while ((node = xpathResult.iterateNext()) !== null) {
                let value, path;

                if (node.nodeType === Node.ATTRIBUTE_NODE) {
                  value = node.value;
                  path = `@${node.name}`;
                } else if (node.nodeType === Node.TEXT_NODE) {
                  value = node.textContent.trim();
                  path = "text()";
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                  value = node.outerHTML || serializeElement(node);
                  path = getElementPath(node);
                } else {
                  value = node.textContent;
                  path = node.nodeName;
                }

                if (value) {
                  results.push({ type: "node", value, path });
                }
              }
          }

          resultCount.textContent = `${results.length} 个`;

          if (results.length === 0) {
            resultList.innerHTML =
              '<div class="result-item" style="color: var(--color-text-secondary);">未找到匹配结果</div>';
          } else {
            resultList.innerHTML = results
              .map(
                (r, i) => `
                        <div class="result-item" onclick="copyResult(this)">
                            ${r.path ? `<div class="path">[${i + 1}] ${r.path}</div>` : ""}
                            ${escapeHtml(String(r.value))}
                        </div>
                    `
              )
              .join("");
          }
        } catch (e) {
          resultList.innerHTML = `<div class="result-item error">错误: ${escapeHtml(e.message)}</div>`;
          resultCount.textContent = "错误";
        }
      }

      function getElementPath(element) {
        const parts = [];
        while (element && element.nodeType === Node.ELEMENT_NODE) {
          let selector = element.nodeName.toLowerCase();
          if (element.id) {
            selector += `#${element.id}`;
          } else if (element.className) {
            selector += `.${element.className.split(" ")[0]}`;
          }
          parts.unshift(selector);
          element = element.parentNode;
        }
        return parts.join(" > ");
      }

      function serializeElement(element) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(element);
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      window.copyResult = function (element) {
        const text = element.textContent;
        navigator.clipboard.writeText(text);
        showToast();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Auto-evaluate on Enter
      document.getElementById("xpath").addEventListener("keypress", (e) => {
        if (e.key === "Enter") evaluate();
      });

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
