// @ts-nocheck
// Generated from tools/dev/html-entity-encoder.html
// Source SHA-256: 7e0448e130f72d7fd3c2ea6b54b6ee2a024eebf63fde50a8d97de535fac27bbb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "encode";
      const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      const reverseEntities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&apos;": "'",
        "&nbsp;": " "
      };
      function encode(str) {
        return str.replace(/[&<>"']/g, (c) => entities[c]);
      }
      function decode(str) {
        return str.replace(
          /&(amp|lt|gt|quot|apos|nbsp|#39|#(\d+)|#x([0-9a-fA-F]+));/g,
          (match, entity, dec, hex) => {
            if (reverseEntities["&" + entity + ";"]) return reverseEntities["&" + entity + ";"];
            if (dec) return String.fromCharCode(parseInt(dec, 10));
            if (hex) return String.fromCharCode(parseInt(hex, 16));
            return match;
          }
        );
      }
      function process() {
        const input = document.getElementById("input").value;
        document.getElementById("output").value = mode === "encode" ? encode(input) : decode(input);
      }
      function setMode(m) {
        mode = m;
        document
          .querySelectorAll(".tab")
          .forEach((t, i) =>
            t.classList.toggle("active", (m === "encode" && i === 0) || (m === "decode" && i === 1))
          );
        document.getElementById("inputLabel").textContent =
          m === "encode" ? "输入文本" : "输入HTML实体";
        document.getElementById("outputLabel").textContent =
          m === "encode" ? "编码结果" : "解码结果";
        process();
      }
      function copyResult() {
        navigator.clipboard.writeText(document.getElementById("output").value);
        const btn = document.querySelector(".btn-copy");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制结果"), 1500);
      }
      document.getElementById("input").addEventListener("input", process);
      process();

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
    
