// @ts-nocheck
// Generated from tools/dev/json-typescript.html
// Source SHA-256: 2a635413afa9d9d7144aec6826c40ad42eadb432d4d61b126cb58204fb528fe7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const outputEl = document.getElementById("output");
      const statusEl = document.getElementById("status");
      const typeNameEl = document.getElementById("typeName");
      const exportTypeEl = document.getElementById("exportType");
      const optionalPropsEl = document.getElementById("optionalProps");
      const LS_KEY = "json_typescript_input_v1";

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

      function inferType(value, path = "") {
        if (value === null) return "null";
        if (Array.isArray(value)) {
          if (value.length === 0) return "any[]";
          const firstType = inferType(value[0], path + "[0]");
          let sameType = true;
          for (let i = 1; i < value.length; i++) {
            if (inferType(value[i], path + "[" + i + "]") !== firstType) {
              sameType = false;
              break;
            }
          }
          return sameType ? firstType + "[]" : "any[]";
        }
        if (typeof value === "object") {
          return "object";
        }
        return typeof value;
      }

      function generateTypeDefinition(obj, name, level = 0) {
        const exportType = exportTypeEl.value;
        const optionalMode = optionalPropsEl.value;
        const indent = "  ".repeat(level);
        const nextIndent = "  ".repeat(level + 1);

        let result = "";

        if (level === 0) {
          result += exportType === "interface" ? "interface " : "type ";
          result += name + " = {\n";
        }

        for (const [key, value] of Object.entries(obj)) {
          const propName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          const isOptional =
            optionalMode === "all" ||
            (optionalMode === "auto" && value === null) ||
            value === undefined;
          const optionalMark = isOptional ? "?" : "";
          const type = inferType(value, key);

          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            result += nextIndent + propName + optionalMark + ": {\n";
            result += generateTypeDefinition(value, "", level + 2);
            result += nextIndent + "};\n";
          } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object") {
            const arrayType = inferType(value[0], key + "[0]");
            if (arrayType === "object") {
              result += nextIndent + propName + optionalMark + ": Array<{\n";
              result += generateTypeDefinition(value[0], "", level + 3);
              result += nextIndent + "  " + "}>;\n";
            } else {
              result += nextIndent + propName + optionalMark + ": " + type + ";\n";
            }
          } else {
            result += nextIndent + propName + optionalMark + ": " + type + ";\n";
          }
        }

        if (level === 0) {
          result += "}";
          if (exportType === "type") {
            result += ";";
          }
        }

        return result;
      }

      window.generate = function () {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入 JSON 数据", "error");
          return;
        }

        try {
          const json = JSON.parse(text);
          const typeName = typeNameEl.value || "MyType";
          const typeDef = generateTypeDefinition(json, typeName);
          outputEl.value = typeDef;
          showStatus("类型定义生成成功", "success");
        } catch (e) {
          showStatus("JSON 解析失败: " + e.message, "error");
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

      document.getElementById("btnGenerate").onclick = generate;

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
    
