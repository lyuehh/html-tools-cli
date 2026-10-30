// @ts-nocheck
// Generated from tools/dev/unicode-lookup.html
// Source SHA-256: 084c397d2efcc446a6bce64c8bcdb6a2118e48d4e0a01a5ffb1f2487d6869505
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function parseInput(str) {
        str = str.trim();
        if (str.match(/^U\+[0-9A-Fa-f]+$/i)) {
          return parseInt(str.slice(2), 16);
        }
        if (str.match(/^0x[0-9A-Fa-f]+$/i)) {
          return parseInt(str.slice(2), 16);
        }
        if (str.match(/^[0-9]+$/)) {
          return parseInt(str, 10);
        }
        if (str.length === 1) {
          return str.codePointAt(0);
        }
        return null;
      }

      function getCharInfo(codePoint) {
        if (codePoint === null || codePoint < 0 || codePoint > 0x10ffff) return null;

        var char = String.fromCodePoint(codePoint);
        var hex = codePoint.toString(16).toUpperCase().padStart(4, "0");

        var utf8 = [];
        if (codePoint < 0x80) {
          utf8.push(codePoint);
        } else if (codePoint < 0x800) {
          utf8.push(0xc0 | (codePoint >> 6));
          utf8.push(0x80 | (codePoint & 0x3f));
        } else if (codePoint < 0x10000) {
          utf8.push(0xe0 | (codePoint >> 12));
          utf8.push(0x80 | ((codePoint >> 6) & 0x3f));
          utf8.push(0x80 | (codePoint & 0x3f));
        } else {
          utf8.push(0xf0 | (codePoint >> 18));
          utf8.push(0x80 | ((codePoint >> 12) & 0x3f));
          utf8.push(0x80 | ((codePoint >> 6) & 0x3f));
          utf8.push(0x80 | (codePoint & 0x3f));
        }

        var utf16 = [];
        if (codePoint < 0x10000) {
          utf16.push(codePoint);
        } else {
          var offset = codePoint - 0x10000;
          utf16.push(0xd800 + (offset >> 10));
          utf16.push(0xdc00 + (offset & 0x3ff));
        }

        return {
          char: char,
          codePoint: codePoint,
          hex: "U+" + hex,
          decimal: codePoint.toString(),
          utf8Hex: utf8
            .map(function (b) {
              return b.toString(16).toUpperCase().padStart(2, "0");
            })
            .join(" "),
          utf8Bytes: utf8.length + " bytes",
          utf16Hex: utf16
            .map(function (u) {
              return u.toString(16).toUpperCase().padStart(4, "0");
            })
            .join(" "),
          htmlEntity: "&#" + codePoint + ";",
          htmlHex: "&#x" + hex + ";",
          cssEscape: "\\" + hex,
          jsEscape:
            codePoint < 0x10000 ? "\\u" + hex : "\\u{" + codePoint.toString(16).toUpperCase() + "}"
        };
      }

      window.lookup = function () {
        var input = document.getElementById("input").value;
        var results = document.getElementById("results");
        while (results.firstChild) results.removeChild(results.firstChild);

        var chars = [];
        var lines = input.split(/[\n,]/);
        lines.forEach(function (line) {
          line = line.trim();
          if (!line) return;
          var cp = parseInput(line);
          if (cp !== null) {
            chars.push(cp);
          } else {
            for (var i = 0; i < line.length;) {
              var cp2 = line.codePointAt(i);
              chars.push(cp2);
              i += cp2 > 0xffff ? 2 : 1;
            }
          }
        });

        chars.slice(0, 100).forEach(function (cp) {
          var info = getCharInfo(cp);
          if (!info) return;

          var card = document.createElement("div");
          card.className = "char-card";
          card.onclick = function () {
            showDetail(cp);
          };

          var charSpan = document.createElement("div");
          charSpan.className = "char";
          charSpan.textContent = info.char;
          card.appendChild(charSpan);

          var codeSpan = document.createElement("div");
          codeSpan.className = "code";
          codeSpan.textContent = info.hex;
          card.appendChild(codeSpan);

          results.appendChild(card);
        });

        if (chars.length > 0) {
          showDetail(chars[0]);
        }
      };

      function showDetail(codePoint) {
        var info = getCharInfo(codePoint);
        if (!info) return;

        document.getElementById("detailChar").textContent = info.char;
        document.getElementById("detailName").textContent = info.hex;
        document.getElementById("detailPanel").className = "detail-panel active";

        var grid = document.getElementById("detailGrid");
        while (grid.firstChild) grid.removeChild(grid.firstChild);

        var items = [
          { label: "Unicode 码点", value: info.hex },
          { label: "十进制", value: info.decimal },
          { label: "UTF-8", value: info.utf8Hex + " (" + info.utf8Bytes + ")" },
          { label: "UTF-16", value: info.utf16Hex },
          { label: "HTML 实体 (十进制)", value: info.htmlEntity },
          { label: "HTML 实体 (十六进制)", value: info.htmlHex },
          { label: "CSS 转义", value: info.cssEscape },
          { label: "JavaScript 转义", value: info.jsEscape }
        ];

        items.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "detail-item";

          var label = document.createElement("label");
          label.textContent = item.label;
          div.appendChild(label);

          var valueDiv = document.createElement("div");
          valueDiv.className = "value";
          valueDiv.textContent = item.value;

          var copyBtn = document.createElement("button");
          copyBtn.className = "btn btn-success copy-btn";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function (e) {
            e.stopPropagation();
            navigator.clipboard.writeText(item.value).then(function () {
              copyBtn.textContent = "已复制";
              setTimeout(function () {
                copyBtn.textContent = "复制";
              }, 1000);
            });
          };
          valueDiv.appendChild(copyBtn);

          div.appendChild(valueDiv);
          grid.appendChild(div);
        });
      }

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
    
