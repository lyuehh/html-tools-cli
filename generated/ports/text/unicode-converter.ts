// @ts-nocheck
// Generated from tools/text/unicode-converter.html
// Source SHA-256: 1a110d822c12554584c90195945865b28fe1dc7f31a76025ca8b341953bcca7f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        let text = document.getElementById("input").value;
        // 尝试解码Unicode转义
        text = text.replace(/\\u([0-9a-fA-F]{4})/g, (m, code) =>
          String.fromCharCode(parseInt(code, 16))
        );
        text = text.replace(/&#x([0-9a-fA-F]+);/g, (m, code) =>
          String.fromCodePoint(parseInt(code, 16))
        );
        text = text.replace(/&#(\d+);/g, (m, code) => String.fromCodePoint(parseInt(code, 10)));

        const chars = [...text];
        let unicodeEscape = "",
          htmlEntity = "",
          hexCodes = [],
          decCodes = [];

        for (const char of chars) {
          const code = char.codePointAt(0);
          if (code > 0xffff) {
            const high = Math.floor((code - 0x10000) / 0x400) + 0xd800;
            const low = ((code - 0x10000) % 0x400) + 0xdc00;
            unicodeEscape += `\\u${high.toString(16).toUpperCase().padStart(4, "0")}\\u${low.toString(16).toUpperCase().padStart(4, "0")}`;
          } else {
            unicodeEscape += `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
          }
          htmlEntity += `&#x${code.toString(16).toUpperCase()};`;
          hexCodes.push(`0x${code.toString(16).toUpperCase()}`);
          decCodes.push(code);
        }

        document.getElementById("unicodeEscape").innerHTML =
          unicodeEscape +
          '<button class="copy-btn" onclick="copy(\'unicodeEscape\')">复制</button>';
        document.getElementById("htmlEntity").innerHTML =
          htmlEntity + '<button class="copy-btn" onclick="copy(\'htmlEntity\')">复制</button>';
        document.getElementById("hexCodes").innerHTML =
          hexCodes.join(" ") +
          '<button class="copy-btn" onclick="copy(\'hexCodes\')">复制</button>';
        document.getElementById("decCodes").innerHTML =
          decCodes.join(" ") +
          '<button class="copy-btn" onclick="copy(\'decCodes\')">复制</button>';

        document.getElementById("charGrid").innerHTML = chars
          .map((char) => {
            const code = char.codePointAt(0);
            return `<div class="char-item"><div class="char-display">${char}</div><div class="char-code">U+${code.toString(16).toUpperCase().padStart(4, "0")}</div></div>`;
          })
          .join("");
      }
      function copy(id) {
        const el = document.getElementById(id);
        const text = el.textContent.replace("复制", "").trim();
        navigator.clipboard.writeText(text);
      }
      document.getElementById("input").addEventListener("input", convert);
      convert();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
