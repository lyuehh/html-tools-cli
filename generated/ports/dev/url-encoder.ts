// @ts-nocheck
// Generated from tools/dev/url-encoder.html
// Source SHA-256: 93f9ae5afb2e1523d968684e8f2427b1a5a92264d01e1383c253ad0549fdf292
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function encode() {
        document.getElementById("output").value = encodeURIComponent(
          document.getElementById("input").value
        );
      }
      function decode() {
        try {
          document.getElementById("output").value = decodeURIComponent(
            document.getElementById("input").value
          );
        } catch (e) {
          document.getElementById("output").value = "解码错误: " + e.message;
        }
      }
      function copy() {
        navigator.clipboard.writeText(document.getElementById("output").value);
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
    
