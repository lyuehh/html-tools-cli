// @ts-nocheck
// Generated from tools/converter/angle-converter.html
// Source SHA-256: f68909d05eaf311a99b9f40c51a3b0148345c385ac1821ba69a25e89d27183b5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function convert() {
        const deg = parseFloat(document.getElementById("degrees").value) || 0;
        document.getElementById("radians").textContent = ((deg * Math.PI) / 180).toFixed(6);
        document.getElementById("gradians").textContent = ((deg * 10) / 9).toFixed(4);
        document.getElementById("turns").textContent = (deg / 360).toFixed(6);
        document.getElementById("minutes").textContent = (deg * 60).toFixed(2);
        document.getElementById("seconds").textContent = (deg * 3600).toFixed(2);
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
    
