// @ts-nocheck
// Generated from tools/dev/string-escape.html
// Source SHA-256: 86b522917a5f5a449bd128f5fffe6b183fabfb368e692286dac8711ba7c02d0b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function escapeStr() {
        const input = document.getElementById("input").value;
        const format = document.getElementById("format").value;
        let output = "";

        switch (format) {
          case "javascript":
            output = JSON.stringify(input);
            break;
          case "html":
            output = input
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;");
            break;
          case "url":
            output = encodeURIComponent(input);
            break;
          case "unicode":
            output = input
              .split("")
              .map((char) => {
                const code = char.charCodeAt(0);
                if (code > 127) {
                  return "\\u" + code.toString(16).padStart(4, "0");
                }
                return char;
              })
              .join("");
            break;
          case "regex":
            output = input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            break;
        }

        document.getElementById("output").value = output;
      }

      function unescapeStr() {
        const input = document.getElementById("input").value;
        const format = document.getElementById("format").value;
        let output = "";

        try {
          switch (format) {
            case "javascript":
              output = JSON.parse(input);
              break;
            case "html":
              const textarea = document.createElement("textarea");
              textarea.innerHTML = input;
              output = textarea.value;
              break;
            case "url":
              output = decodeURIComponent(input);
              break;
            case "unicode":
              output = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
                String.fromCharCode(parseInt(hex, 16))
              );
              break;
            case "regex":
              output = input.replace(/\\([.*+?^${}()|[\]\\])/g, "$1");
              break;
          }
        } catch (e) {
          output = "反转义错误: " + e.message;
        }

        document.getElementById("output").value = output;
      }

      function copyOutput() {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output);
        }
      }

      function clearAll() {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
      }

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
