// @ts-nocheck
// Generated from tools/fun/click-counter.html
// Source SHA-256: 53eef377f962e99c04410a8fcc6742f9527f07e35c74fc826781c842ec9fb941
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let count = 0,
        startTime = null;
      document.getElementById("clickBtn").onclick = () => {
        if (!startTime) startTime = Date.now();
        count++;
        document.getElementById("count").textContent = count;
        const elapsed = (Date.now() - startTime) / 1000;
        document.getElementById("cps").textContent = (count / elapsed).toFixed(2);
      };
      function reset() {
        count = 0;
        startTime = null;
        document.getElementById("count").textContent = "0";
        document.getElementById("cps").textContent = "0.00";
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
    
