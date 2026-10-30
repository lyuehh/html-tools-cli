// @ts-nocheck
// Generated from tools/extractor/link-extractor.html
// Source SHA-256: 1d0b1a8f9f325f50f6bcb3f359fa8dddcb3d75eeb592c2b662238d627a7db32a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let links = [];
      // HTML 转义函数，防止 XSS
      window.escapeHtml = function (s) {
        return s
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      };
      window.extract = function () {
        const text = document.getElementById("input").value;
        const hrefPattern = /href\s*=\s*["']([^"']+)["']/gi;
        const urlPattern = /https?:\/\/[^\s<>"']+/g;
        const set = new Set();
        let m;
        while ((m = hrefPattern.exec(text)) !== null) set.add(m[1]);
        while ((m = urlPattern.exec(text)) !== null) set.add(m[0]);
        links = [...set].filter((l) => l.startsWith("http") || l.startsWith("/"));
        document.getElementById("stats").textContent = "找到 " + links.length + " 个链接";
        document.getElementById("results").innerHTML =
          links
            .map((l, i) => {
              const safe = escapeHtml(l);
              return (
                '<div class="link"><a href="' +
                safe +
                '" target="_blank" rel="noopener">' +
                safe +
                '</a><button class="copy-btn" onclick="copy(' +
                i +
                ')">复制</button></div>'
              );
            })
            .join("") || '<div style="color:var(--text-muted)">未找到链接</div>';
      };
      window.copy = function (i) {
        navigator.clipboard.writeText(links[i]);
      };
      window.copyAll = function () {
        navigator.clipboard.writeText(links.join("\n"));
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
    
