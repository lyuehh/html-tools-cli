// @ts-nocheck
// Generated from tools/extractor/text-extractor.html
// Source SHA-256: 3b6178580cf6e26df19207aebc7b467ed1273c20a072628801fbff447484acd6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const patterns = {
        IPv4地址:
          /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
        邮箱地址: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        URL: /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g,
        "手机号(中国)": /1[3-9]\d{9}/g,
        MAC地址: /(?:[0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}/g,
        UUID: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
        域名: /(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}/g
      };
      window.extract = function () {
        const text = document.getElementById("input").value;
        let html = "";
        for (const [name, regex] of Object.entries(patterns)) {
          const matches = [...new Set(text.match(regex) || [])];
          html +=
            '<div class="result-section"><div class="header-row"><span class="label">' +
            name +
            '</span><span class="count">' +
            matches.length +
            "</span></div>";
          if (matches.length) {
            html +=
              '<div class="items">' +
              matches
                .map(
                  (m) =>
                    '<span class="item" onclick="navigator.clipboard.writeText(\'' +
                    m.replace(/'/g, "\\'") +
                    "')\">" +
                    m +
                    "</span>"
                )
                .join("") +
              "</div>";
          } else {
            html += '<div class="empty">未找到</div>';
          }
          html += "</div>";
        }
        document.getElementById("results").innerHTML = html;
      };
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
    
