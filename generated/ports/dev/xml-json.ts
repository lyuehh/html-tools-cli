// @ts-nocheck
// Generated from tools/dev/xml-json.html
// Source SHA-256: 8eb7215cdbbf3d74624afab74a7462dab26cfffe74d8c71d0409bb423cedf754
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const prettyPrintEl = document.getElementById("prettyPrint");
      const indentEl = document.getElementById("indent");
      const includeDeclarationEl = document.getElementById("includeDeclaration");

      const LS_KEY = "xml_json_input_v1";

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

      // 获取缩进
      function getIndent() {
        const val = indentEl.value;
        if (val === "tab") return "\t";
        return parseInt(val, 10);
      }

      function getIndentStr(level) {
        const indent = getIndent();
        if (indent === "\t") {
          return "\t".repeat(level);
        }
        return " ".repeat(indent * level);
      }

      // XML → JSON
      function xmlToJson() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(text, "text/xml");

          // Check for parse errors
          const parseError = xmlDoc.querySelector("parsererror");
          if (parseError) {
            throw new Error("XML 解析错误: " + parseError.textContent);
          }

          const obj = xmlNodeToObj(xmlDoc.documentElement);
          const result = {};
          result[xmlDoc.documentElement.tagName] = obj;

          const indent = prettyPrintEl.checked ? getIndent() : 0;
          outputEl.value = JSON.stringify(result, null, indent);
          showStatus("XML → JSON 转换成功", "success");
        } catch (e) {
          showStatus(e.message || "XML 解析错误", "error");
        }
      }

      // XML node to JS object
      function xmlNodeToObj(node) {
        // Text node
        if (node.nodeType === Node.TEXT_NODE) {
          return node.nodeValue.trim();
        }

        const obj = {};

        // Attributes
        if (node.attributes && node.attributes.length > 0) {
          obj["@attributes"] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            obj["@attributes"][attr.name] = attr.value;
          }
        }

        // Child nodes
        if (node.hasChildNodes()) {
          const children = node.childNodes;

          // Check if only text content
          if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
            const textContent = children[0].nodeValue.trim();
            if (obj["@attributes"]) {
              obj["#text"] = textContent;
            } else {
              return textContent;
            }
          } else {
            for (let i = 0; i < children.length; i++) {
              const child = children[i];

              if (child.nodeType === Node.TEXT_NODE) {
                const text = child.nodeValue.trim();
                if (text) {
                  obj["#text"] = text;
                }
                continue;
              }

              if (child.nodeType === Node.ELEMENT_NODE) {
                const childName = child.tagName;
                const childObj = xmlNodeToObj(child);

                if (obj[childName] !== undefined) {
                  // Convert to array if multiple same-name children
                  if (!Array.isArray(obj[childName])) {
                    obj[childName] = [obj[childName]];
                  }
                  obj[childName].push(childObj);
                } else {
                  obj[childName] = childObj;
                }
              }
            }
          }
        }

        // Return empty object for empty elements
        if (Object.keys(obj).length === 0) {
          return "";
        }

        return obj;
      }

      // JSON → XML
      function jsonToXml() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入内容", "error");
          return;
        }

        try {
          const obj = JSON.parse(text);
          const pretty = prettyPrintEl.checked;
          let xml = "";

          if (includeDeclarationEl.checked) {
            xml = '<?xml version="1.0" encoding="UTF-8"?>' + (pretty ? "\n" : "");
          }

          xml += objToXml(obj, 0, pretty);
          outputEl.value = xml;
          showStatus("JSON → XML 转换成功", "success");
        } catch (e) {
          showStatus("JSON 解析错误: " + e.message, "error");
        }
      }

      // JS object to XML
      function objToXml(obj, level, pretty) {
        let xml = "";
        const newline = pretty ? "\n" : "";
        const indent = pretty ? getIndentStr(level) : "";

        for (const key in obj) {
          if (!obj.hasOwnProperty(key)) continue;

          const value = obj[key];

          if (key === "@attributes" || key === "#text") continue;

          if (Array.isArray(value)) {
            for (const item of value) {
              xml += formatElement(key, item, level, pretty);
            }
          } else {
            xml += formatElement(key, value, level, pretty);
          }
        }

        return xml;
      }

      function formatElement(tagName, value, level, pretty) {
        const newline = pretty ? "\n" : "";
        const indent = pretty ? getIndentStr(level) : "";

        let xml = indent + "<" + escapeXml(tagName);

        // Add attributes
        if (value && typeof value === "object" && value["@attributes"]) {
          for (const attrName in value["@attributes"]) {
            xml +=
              " " + escapeXml(attrName) + '="' + escapeXml(value["@attributes"][attrName]) + '"';
          }
        }

        if (value === null || value === undefined || value === "") {
          xml += "/>" + newline;
        } else if (typeof value === "object") {
          const hasTextContent = value["#text"] !== undefined;
          const hasChildren = Object.keys(value).some((k) => k !== "@attributes" && k !== "#text");

          if (hasChildren) {
            xml += ">" + newline;
            xml += objToXml(value, level + 1, pretty);
            if (hasTextContent) {
              xml +=
                (pretty ? getIndentStr(level + 1) : "") +
                escapeXml(String(value["#text"])) +
                newline;
            }
            xml += indent + "</" + escapeXml(tagName) + ">" + newline;
          } else if (hasTextContent) {
            xml +=
              ">" + escapeXml(String(value["#text"])) + "</" + escapeXml(tagName) + ">" + newline;
          } else {
            xml += "/>" + newline;
          }
        } else {
          xml += ">" + escapeXml(String(value)) + "</" + escapeXml(tagName) + ">" + newline;
        }

        return xml;
      }

      function escapeXml(str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Event bindings
      document.getElementById("btnPaste").addEventListener("click", async function () {
        try {
          const text = await navigator.clipboard.readText();
          inputEl.value = text;
          saveToStorage();
          saveToUrl();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      });

      document.getElementById("btnXmlToJson").addEventListener("click", xmlToJson);
      document.getElementById("btnJsonToXml").addEventListener("click", jsonToXml);

      document.getElementById("btnCopy").addEventListener("click", async function () {
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
      });

      document.getElementById("btnShare").addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        inputEl.value = "";
        outputEl.value = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      });

      inputEl.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      // Initialize
      if (!loadFromUrl()) {
        loadFromStorage();
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
