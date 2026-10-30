// @ts-nocheck
// Generated from tools/text/divider.html
// Source SHA-256: 8d23100e61d8e54764f89d472b0d0c26c4c9f762e2b13f35cbef44f28757d706
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        html.setAttribute("data-theme", current === "light" ? "dark" : "light");
      };

      window.applyPreset = function (char, length) {
        document.getElementById("charInput").value = char;
        document.getElementById("lengthInput").value = length;
        updatePreview();
      };

      function generateSingleLine() {
        const char = document.getElementById("charInput").value || "-";
        const length = parseInt(document.getElementById("lengthInput").value) || 50;
        const text = document.getElementById("textInput").value;
        const position = document.getElementById("textPosition").value;
        const addSpace = document.getElementById("addSpace").checked;
        const addBrackets = document.getElementById("addBrackets").checked;

        if (!text) {
          // No text, just repeat the character
          let line = "";
          const charLen = char.length;
          for (let i = 0; i < length; i++) {
            line += char[i % charLen];
          }
          return line;
        }

        // With text
        let displayText = text;
        if (addBrackets) {
          displayText = `【${displayText}】`;
        }
        if (addSpace) {
          displayText = ` ${displayText} `;
        }

        const textLen = [...displayText].reduce(
          (acc, c) => acc + (c.charCodeAt(0) > 127 ? 2 : 1),
          0
        );
        const remainingLen = Math.max(0, length - textLen);

        let leftLen, rightLen;
        if (position === "center") {
          leftLen = Math.floor(remainingLen / 2);
          rightLen = remainingLen - leftLen;
        } else if (position === "left") {
          leftLen = 2;
          rightLen = remainingLen - 2;
        } else {
          leftLen = remainingLen - 2;
          rightLen = 2;
        }

        const charLen = char.length;
        let leftPart = "";
        for (let i = 0; i < leftLen; i++) {
          leftPart += char[i % charLen];
        }
        let rightPart = "";
        for (let i = 0; i < rightLen; i++) {
          rightPart += char[i % charLen];
        }

        return leftPart + displayText + rightPart;
      }

      window.updatePreview = function () {
        const line = generateSingleLine();
        document.getElementById("preview").textContent = line;
      };

      window.generateDividers = function () {
        const repeat = parseInt(document.getElementById("repeatInput").value) || 1;
        const doubleLayer = document.getElementById("doubleLayer").checked;
        const line = generateSingleLine();

        let result = [];

        if (doubleLayer) {
          // Generate a plain line for borders
          const char = document.getElementById("charInput").value || "-";
          const length = parseInt(document.getElementById("lengthInput").value) || 50;
          let borderLine = "";
          for (let i = 0; i < length; i++) {
            borderLine += char[i % char.length];
          }

          result.push(borderLine);
          for (let i = 0; i < repeat; i++) {
            result.push(line);
          }
          result.push(borderLine);
        } else {
          for (let i = 0; i < repeat; i++) {
            result.push(line);
          }
        }

        document.getElementById("output").textContent = result.join("\n");
      };

      window.copyOutput = function () {
        const output = document.getElementById("output").textContent;
        navigator.clipboard
          .writeText(output)
          .then(() => {
            alert("已复制到剪贴板！");
          })
          .catch(() => {
            const textarea = document.createElement("textarea");
            textarea.value = output;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("已复制到剪贴板！");
          });
      };

      window.clearAll = function () {
        document.getElementById("charInput").value = "-";
        document.getElementById("lengthInput").value = "50";
        document.getElementById("repeatInput").value = "1";
        document.getElementById("textInput").value = "";
        document.getElementById("textPosition").value = "center";
        document.getElementById("addSpace").checked = false;
        document.getElementById("addBrackets").checked = false;
        document.getElementById("doubleLayer").checked = false;
        updatePreview();
        document.getElementById("output").textContent = '点击"生成分隔线"查看结果';
      };

      // Initialize
      updatePreview();
    
