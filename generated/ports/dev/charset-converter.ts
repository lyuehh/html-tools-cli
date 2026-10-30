// @ts-nocheck
// Generated from tools/dev/charset-converter.html
// Source SHA-256: 56f0955283f41563e5c9d2a975a9b1497aafbe9ae5f16ccad0eaba6a3a171a86
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function textToUtf8Bytes(text) {
        return new TextEncoder().encode(text);
      }

      function utf8BytesToHex(bytes) {
        return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0").toUpperCase());
      }

      function convert() {
        const input = document.getElementById("input").value;
        const format = document.getElementById("outputFormat").value;
        let output = "";

        const chars = [...input];
        const utf8Bytes = textToUtf8Bytes(input);

        switch (format) {
          case "hex":
            output = utf8BytesToHex(utf8Bytes).join(" ");
            break;
          case "decimal":
            output = Array.from(utf8Bytes).join(" ");
            break;
          case "binary":
            output = Array.from(utf8Bytes)
              .map((b) => b.toString(2).padStart(8, "0"))
              .join(" ");
            break;
          case "octal":
            output = Array.from(utf8Bytes)
              .map((b) => b.toString(8).padStart(3, "0"))
              .join(" ");
            break;
          case "utf8":
            output = utf8BytesToHex(utf8Bytes)
              .map((h) => "\\x" + h)
              .join("");
            break;
          case "utf16":
            output = chars
              .map((c) => {
                const code = c.charCodeAt(0);
                return "\\u" + code.toString(16).padStart(4, "0").toUpperCase();
              })
              .join("");
            break;
          case "codepoint":
            output = chars
              .map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"))
              .join(" ");
            break;
          case "escape-js":
            output = chars
              .map((c) => {
                const cp = c.codePointAt(0);
                if (cp < 128 && /[\w\s]/.test(c)) return c;
                if (cp > 0xffff) return "\\u{" + cp.toString(16).toUpperCase() + "}";
                return "\\u" + cp.toString(16).padStart(4, "0").toUpperCase();
              })
              .join("");
            break;
          case "escape-url":
            output = encodeURIComponent(input);
            break;
          case "escape-html":
            output = chars.map((c) => "&#" + c.codePointAt(0) + ";").join("");
            break;
        }

        document.getElementById("output").value = output;
        updateInfo(input, utf8Bytes, chars);
        updateHexDisplay(utf8Bytes);
        updateCharTable(chars);
      }

      function updateInfo(input, utf8Bytes, chars) {
        document.getElementById("charCount").textContent = chars.length;
        document.getElementById("byteCount").textContent = utf8Bytes.length;
        document.getElementById("utf16Count").textContent = input.length;
        document.getElementById("codepointCount").textContent = chars.length;
      }

      function updateHexDisplay(bytes) {
        const hexBytes = Array.from(bytes)
          .map((b) => `<span class="byte">${b.toString(16).padStart(2, "0").toUpperCase()}</span>`)
          .join("");
        document.getElementById("hexBytes").innerHTML = hexBytes;
      }

      function updateCharTable(chars) {
        const tbody = document.getElementById("charTable");
        const rows = chars
          .slice(0, 20)
          .map((c) => {
            const cp = c.codePointAt(0);
            const utf8 = utf8BytesToHex(textToUtf8Bytes(c)).join(" ");
            const utf16 =
              c.length === 2
                ? c.charCodeAt(0).toString(16).toUpperCase() +
                  " " +
                  c.charCodeAt(1).toString(16).toUpperCase()
                : c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");
            const name = getCharName(cp);
            return `<tr>
                    <td><code>${c === " " ? "␣" : c}</code></td>
                    <td>U+${cp.toString(16).toUpperCase().padStart(4, "0")}</td>
                    <td><code>${utf8}</code></td>
                    <td><code>${utf16}</code></td>
                    <td>${name}</td>
                </tr>`;
          })
          .join("");
        tbody.innerHTML =
          rows + (chars.length > 20 ? '<tr><td colspan="5">... 更多字符省略</td></tr>' : "");
      }

      function getCharName(cp) {
        if (cp >= 0x4e00 && cp <= 0x9fff) return "CJK 统一汉字";
        if (cp >= 0x3040 && cp <= 0x309f) return "平假名";
        if (cp >= 0x30a0 && cp <= 0x30ff) return "片假名";
        if (cp >= 0xac00 && cp <= 0xd7af) return "韩文音节";
        if (cp >= 0x0400 && cp <= 0x04ff) return "西里尔字母";
        if (cp >= 0x0600 && cp <= 0x06ff) return "阿拉伯字母";
        if (cp >= 0x0041 && cp <= 0x005a) return "拉丁大写字母";
        if (cp >= 0x0061 && cp <= 0x007a) return "拉丁小写字母";
        if (cp >= 0x0030 && cp <= 0x0039) return "数字";
        if (cp === 0x0020) return "空格";
        if (cp === 0x000a) return "换行符";
        if (cp >= 0x1f600 && cp <= 0x1f64f) return "Emoji 表情";
        if (cp >= 0x1f300 && cp <= 0x1f5ff) return "Emoji 符号";
        return "其他字符";
      }

      window.copyResult = function () {
        navigator.clipboard.writeText(document.getElementById("output").value);
        event.target.textContent = "✓ 已复制";
        setTimeout(() => (event.target.textContent = "📋 复制"), 2000);
      };

      window.swap = function () {
        const output = document.getElementById("output").value;
        document.getElementById("input").value = output;
        convert();
      };

      // Event listeners
      document.getElementById("input").addEventListener("input", convert);
      document.getElementById("outputFormat").addEventListener("change", convert);

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
      document.getElementById("themeToggle").onclick = () => {
        const next =
          document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      };

      // Initialize
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
    
