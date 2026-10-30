// @ts-nocheck
// Generated from tools/converter/unix-timestamp.html
// Source SHA-256: 68909067ba8b8f5e616d6a8a8562cd3837a0e80fdfd2b6a9284fb0aaee7c8264
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateCurrent() {
        document.getElementById("currentTs").textContent = Math.floor(Date.now() / 1000);
      }
      setInterval(updateCurrent, 1000);
      updateCurrent();
      function tsToDate() {
        const ts = document.getElementById("tsInput").value;
        if (!ts) {
          document.getElementById("dateResult").textContent = "-";
          return;
        }
        const date = new Date(ts * 1000);
        document.getElementById("dateResult").textContent =
          date.toLocaleString("zh-CN") + "\n" + date.toISOString();
      }
      function dateToTs() {
        const date = document.getElementById("dateInput").value;
        if (!date) {
          document.getElementById("tsResult").textContent = "-";
          return;
        }
        const ts = Math.floor(new Date(date).getTime() / 1000);
        document.getElementById("tsResult").textContent = "秒: " + ts + "\n毫秒: " + ts * 1000;
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
    
