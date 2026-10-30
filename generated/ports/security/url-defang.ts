// @ts-nocheck
// Generated from tools/security/url-defang.html
// Source SHA-256: c825c757357f6a7aea1cdadd62437686d4ed4ef0e047252aad205177e1d23129
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.defang = function () {
        let t = document.getElementById("input").value;
        t = t.replace(/http/gi, "hxxp").replace(/\./g, "[.]").replace(/:\/\//g, "[://]");
        document.getElementById("output").textContent = t;
      };
      window.refang = function () {
        let t = document.getElementById("input").value;
        t = t
          .replace(/hxxp/gi, "http")
          .replace(/\[\.\]/g, ".")
          .replace(/\[:\/\/\]/g, "://");
        document.getElementById("output").textContent = t;
      };
      window.copy = function () {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
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
    
