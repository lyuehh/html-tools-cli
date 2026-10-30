// @ts-nocheck
// Generated from tools/dev/unicode-converter.html
// Source SHA-256: 92754b21ac424e146a2e0a85f6826dce269b169ab68befa0e9ed870dd4bb6487
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const textInput = document.getElementById("textInput");
      const encodeOutput = document.getElementById("encodeOutput");
      const unicodeInput = document.getElementById("unicodeInput");
      const decodeOutput = document.getElementById("decodeOutput");
      const charTable = document.getElementById("charTable");

      textInput.addEventListener("input", updateCharTable);

      function toUnicodeEscape() {
        const text = textInput.value;
        const result = Array.from(text)
          .map((c) => {
            const code = c.codePointAt(0);
            if (code > 0xffff) {
              return "\\u{" + code.toString(16).toUpperCase() + "}";
            }
            return "\\u" + code.toString(16).toUpperCase().padStart(4, "0");
          })
          .join("");
        encodeOutput.textContent = result;
      }

      window.toHtmlEntity = function () {
        const text = textInput.value;
        const result = Array.from(text)
          .map((c) => {
            return "&#x" + c.codePointAt(0).toString(16).toUpperCase() + ";";
          })
          .join("");
        encodeOutput.textContent = result;
      };

      window.toCodePoints = function () {
        const text = textInput.value;
        const result = Array.from(text)
          .map((c) => {
            return "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
          })
          .join(" ");
        encodeOutput.textContent = result;
      };

      window.toUtf8Hex = function () {
        const text = textInput.value;
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);
        const result = Array.from(bytes)
          .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
          .join(" ");
        encodeOutput.textContent = result;
      };

      window.fromUnicode = function () {
        let text = unicodeInput.value;
        // Handle \uXXXX and \u{XXXXX}
        text = text.replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) =>
          String.fromCodePoint(parseInt(hex, 16))
        );
        text = text.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        );
        // Handle &#xXXXX; and &#NNNN;
        text = text.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) =>
          String.fromCodePoint(parseInt(hex, 16))
        );
        text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
        // Handle U+XXXX
        text = text.replace(/U\+([0-9a-fA-F]+)/gi, (_, hex) =>
          String.fromCodePoint(parseInt(hex, 16))
        );
        decodeOutput.textContent = text;
      };

      function updateCharTable() {
        const text = textInput.value;
        const chars = Array.from(text).slice(0, 20); // Limit to 20 chars
        charTable.innerHTML = chars
          .map((c) => {
            const code = c.codePointAt(0);
            return `<div class="char-item">
          <div class="char-display">${c}</div>
          <div class="char-info">U+${code.toString(16).toUpperCase().padStart(4, "0")}<br>${code}</div>
        </div>`;
          })
          .join("");
      }

      updateCharTable();
      toUnicodeEscape();

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
    
