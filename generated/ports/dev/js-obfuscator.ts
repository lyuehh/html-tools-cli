// @ts-nocheck
// Generated from tools/dev/js-obfuscator.html
// Source SHA-256: e567d86f05c5539ecdf19bd03b38ceeff66a07132f6ddea744a5d7c91fbb86bd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateStats() {
        const input = document.getElementById("inputCode").value;
        const output = document.getElementById("outputCode").value;
        document.getElementById("inputStats").textContent = `${input.length} 字符`;
        document.getElementById("outputStats").textContent = `${output.length} 字符`;
      }

      window.obfuscate = function () {
        const code = document.getElementById("inputCode").value;
        if (!code.trim()) {
          alert("请输入要混淆的代码");
          return;
        }

        const options = {
          renameVars: document.getElementById("renameVars").checked,
          stringEncode: document.getElementById("stringEncode").checked,
          deadCode: document.getElementById("deadCode").checked,
          controlFlow: document.getElementById("controlFlow").checked,
          hexNumbers: document.getElementById("hexNumbers").checked,
          unicodeEscape: document.getElementById("unicodeEscape").checked
        };

        try {
          const obfuscated = simpleObfuscate(code, options);
          document.getElementById("outputCode").value = obfuscated;
          updateStats();
        } catch (e) {
          alert("混淆失败: " + e.message);
        }
      };

      function simpleObfuscate(code, options) {
        let result = code;

        // Variable name mapping
        const varMap = new Map();
        let varCounter = 0;

        function getObfuscatedName() {
          const chars = "_$";
          const base = "abcdefghijklmnopqrstuvwxyz";
          let name = chars[varCounter % 2];
          let num = Math.floor(varCounter / 2);
          while (num >= 0) {
            name += base[num % 26];
            num = Math.floor(num / 26) - 1;
          }
          varCounter++;
          return name;
        }

        // Rename variables
        if (options.renameVars) {
          // Find variable declarations
          const varPattern = /\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
          const funcPattern = /\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
          const paramPattern = /\(([^)]*)\)/g;

          let match;

          // Collect variable names
          while ((match = varPattern.exec(code)) !== null) {
            if (!varMap.has(match[2])) {
              varMap.set(match[2], getObfuscatedName());
            }
          }

          // Collect function names
          const funcMatches = code.matchAll(/\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
          for (const m of funcMatches) {
            if (
              !varMap.has(m[1]) &&
              ![
                "console",
                "window",
                "document",
                "Math",
                "Array",
                "Object",
                "String",
                "Number",
                "Boolean",
                "Date",
                "JSON",
                "parseInt",
                "parseFloat",
                "setTimeout",
                "setInterval"
              ].includes(m[1])
            ) {
              varMap.set(m[1], getObfuscatedName());
            }
          }

          // Replace variable names
          varMap.forEach((newName, oldName) => {
            const regex = new RegExp(`\\b${oldName}\\b`, "g");
            result = result.replace(regex, newName);
          });
        }

        // String encoding
        if (options.stringEncode) {
          result = result.replace(/"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g, (match) => {
            const str = match.slice(1, -1);
            const encoded = Array.from(str)
              .map((c) => {
                if (options.unicodeEscape && c.charCodeAt(0) > 127) {
                  return "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0");
                }
                return "\\x" + c.charCodeAt(0).toString(16).padStart(2, "0");
              })
              .join("");
            return '"' + encoded + '"';
          });
        }

        // Number to hex
        if (options.hexNumbers) {
          result = result.replace(/\b(\d+)\b/g, (match, num) => {
            const n = parseInt(num);
            if (n > 9 && n < 1000000) {
              return "0x" + n.toString(16);
            }
            return match;
          });
        }

        // Insert dead code
        if (options.deadCode) {
          const deadCodeSnippets = [
            "if(false){console.log(Math.random());}",
            "var _0x" + Math.random().toString(16).slice(2, 8) + "=null;",
            "(function(){return;})();"
          ];

          const lines = result.split("\n");
          const newLines = [];
          lines.forEach((line, i) => {
            newLines.push(line);
            if (i % 3 === 0 && line.trim() && !line.trim().startsWith("//")) {
              newLines.push(deadCodeSnippets[i % deadCodeSnippets.length]);
            }
          });
          result = newLines.join("\n");
        }

        // Control flow flattening (simplified)
        if (options.controlFlow) {
          // Wrap in IIFE
          result = "(function(){" + result + "})();";
        }

        // Minify (remove extra whitespace)
        result = result
          .replace(/\/\/.*$/gm, "") // Remove single-line comments
          .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
          .replace(/\s+/g, " ") // Collapse whitespace
          .replace(/\s*([{};,:])\s*/g, "$1") // Remove space around punctuation
          .replace(/\s*([+\-*/%=<>!&|^~?])\s*/g, "$1") // Remove space around operators
          .trim();

        return result;
      }

      window.clearAll = function () {
        document.getElementById("inputCode").value = "";
        document.getElementById("outputCode").value = "";
        updateStats();
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputCode").value;
        if (!output) {
          alert("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(output);
        showToast();
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputCode").value;
        if (!output) {
          alert("没有可下载的内容");
          return;
        }
        const blob = new Blob([output], { type: "text/javascript" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "obfuscated.js";
        link.click();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      updateStats();

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
