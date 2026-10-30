// @ts-nocheck
// Generated from tools/text/text-to-binary.html
// Source SHA-256: 8e2fff0b2084314f2e57db9737fddd319dc4551d3235e593b8e608745ace6328
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "text-to-binary";

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      const examples = [
        { text: "Hello", desc: "英文" },
        { text: "你好", desc: "中文" },
        { text: "123", desc: "数字" },
        { text: "A", desc: "单字符" },
        { text: "😀", desc: "Emoji" },
        { text: "abc ABC", desc: "大小写" }
      ];

      window.setMode = function (mode) {
        currentMode = mode;
        document.querySelectorAll(".tab").forEach((tab) => {
          tab.classList.toggle("active", tab.dataset.mode === mode);
        });

        const inputLabel = document.getElementById("inputLabel");
        const outputLabel = document.getElementById("outputLabel");
        const inputText = document.getElementById("inputText");

        if (mode === "text-to-binary") {
          inputLabel.textContent = "📝 文本输入";
          outputLabel.textContent = "💻 编码输出";
          inputText.placeholder = "输入文本...";
        } else {
          inputLabel.textContent = "💻 编码输入";
          outputLabel.textContent = "📝 文本输出";
          inputText.placeholder = "输入二进制/十六进制...";
        }

        convert();
      };

      function textToBytes(text) {
        return new TextEncoder().encode(text);
      }

      function bytesToText(bytes) {
        return new TextDecoder().decode(new Uint8Array(bytes));
      }

      function formatByte(byte, format, showPrefix) {
        let result = "";
        let prefix = "";

        switch (format) {
          case "binary":
            result = byte.toString(2).padStart(8, "0");
            prefix = "0b";
            break;
          case "hex":
            result = byte.toString(16).padStart(2, "0").toUpperCase();
            prefix = "0x";
            break;
          case "octal":
            result = byte.toString(8).padStart(3, "0");
            prefix = "0o";
            break;
          case "decimal":
            result = byte.toString(10);
            prefix = "";
            break;
        }

        return showPrefix && prefix ? prefix + result : result;
      }

      function getSeparator() {
        const sep = document.getElementById("separator").value;
        switch (sep) {
          case "space":
            return " ";
          case "none":
            return "";
          case "comma":
            return ", ";
          case "newline":
            return "\n";
          default:
            return " ";
        }
      }

      function parseInput(input, format) {
        // Clean input
        input = input.trim();
        if (!input) return [];

        // Detect and handle different formats
        let parts;

        // Try to split by common separators
        if (input.includes(",")) {
          parts = input
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s);
        } else if (input.includes("\n")) {
          parts = input
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => s);
        } else if (input.includes(" ")) {
          parts = input.split(/\s+/).filter((s) => s);
        } else {
          // No separator - try to detect format
          if (format === "binary" || /^[01]+$/.test(input)) {
            // Split into 8-bit chunks
            parts = input.match(/.{1,8}/g) || [];
          } else if (format === "hex" || /^[0-9A-Fa-f]+$/.test(input.replace(/0x/gi, ""))) {
            // Split into 2-char chunks
            const cleaned = input.replace(/0x/gi, "");
            parts = cleaned.match(/.{1,2}/g) || [];
          } else {
            parts = [input];
          }
        }

        return parts
          .map((part) => {
            // Remove prefixes
            part = part.replace(/^0[bBxXoO]/, "");

            let radix;
            if (format === "binary" || /^[01]+$/.test(part)) {
              radix = 2;
            } else if (format === "octal") {
              radix = 8;
            } else if (format === "hex" || /^[0-9A-Fa-f]+$/.test(part)) {
              radix = 16;
            } else {
              radix = 10;
            }

            return parseInt(part, radix);
          })
          .filter((n) => !isNaN(n) && n >= 0 && n <= 255);
      }

      function convert() {
        const input = document.getElementById("inputText").value;
        const format = document.getElementById("outputFormat").value;
        const showPrefix = document.getElementById("showPrefix").checked;
        const separator = getSeparator();

        document.getElementById("inputCount").textContent = input.length + " 字符";

        let output = "";

        try {
          if (currentMode === "text-to-binary") {
            const bytes = textToBytes(input);
            output = Array.from(bytes)
              .map((b) => formatByte(b, format, showPrefix))
              .join(separator);
          } else {
            const bytes = parseInput(input, format);
            if (bytes.length > 0) {
              output = bytesToText(bytes);
            }
          }
        } catch (e) {
          output = "转换错误: " + e.message;
        }

        document.getElementById("outputText").value = output;
        document.getElementById("outputCount").textContent = output.length + " 字符";
      }

      window.swap = function () {
        const inputText = document.getElementById("inputText");
        const outputText = document.getElementById("outputText");

        const temp = inputText.value;
        inputText.value = outputText.value;

        // Toggle mode
        setMode(currentMode === "text-to-binary" ? "binary-to-text" : "text-to-binary");
      };

      window.clearInput = function () {
        document.getElementById("inputText").value = "";
        convert();
      };

      window.pasteInput = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("inputText").value = text;
          convert();
        } catch (e) {
          alert("无法访问剪贴板");
        }
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputText").value;
        navigator.clipboard.writeText(output);
        alert("已复制到剪贴板");
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputText").value;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

      function renderExamples() {
        const grid = document.getElementById("examplesGrid");
        grid.innerHTML = examples
          .map((ex) => {
            const bytes = textToBytes(ex.text);
            const binary = Array.from(bytes)
              .map((b) => b.toString(2).padStart(8, "0"))
              .join(" ");
            return `
                    <div class="example-item" onclick="loadExample('${ex.text}')">
                        <div class="example-text">${ex.text} <small>(${ex.desc})</small></div>
                        <div class="example-binary">${binary}</div>
                    </div>
                `;
          })
          .join("");
      }

      window.loadExample = function (text) {
        setMode("text-to-binary");
        document.getElementById("inputText").value = text;
        convert();
      };

      // Initialize
      renderExamples();
      convert();
    
