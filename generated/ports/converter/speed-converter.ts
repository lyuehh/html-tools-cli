// @ts-nocheck
// Generated from tools/converter/speed-converter.html
// Source SHA-256: e9dd5f979efa8b2cc80150598463764b0c028518010b985c18a696b43eb4cdc2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const kmh = parseFloat(document.getElementById("kmh").value) || 0;
        document.getElementById("ms").textContent = (kmh / 3.6).toFixed(2);
        document.getElementById("mph").textContent = (kmh * 0.621371).toFixed(2);
        document.getElementById("knot").textContent = (kmh * 0.539957).toFixed(2);
        document.getElementById("mach").textContent = (kmh / 1234.8).toFixed(4);
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
    
