// @ts-nocheck
// Generated from tools/calculator/progress.html
// Source SHA-256: dd009c8bd09c9e82ffb56522276762c1d0be75582748dfafadcd5ffb805cd3be
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const today = new Date().toISOString().split("T")[0];
      document.getElementById("startDate").value = today;

      const inputs = ["total", "completed", "startDate", "targetDate"];
      inputs.forEach((id) => document.getElementById(id).addEventListener("input", calculate));

      function calculate() {
        const total = parseFloat(document.getElementById("total").value) || 0;
        const completed = parseFloat(document.getElementById("completed").value) || 0;
        const startStr = document.getElementById("startDate").value;
        const targetStr = document.getElementById("targetDate").value;

        const pct = total > 0 ? (completed / total) * 100 : 0;
        const remaining = Math.max(0, total - completed);

        document.getElementById("progressFill").style.width = Math.min(100, pct) + "%";
        document.getElementById("progressFill").textContent = pct.toFixed(1) + "%";
        document.getElementById("progressPct").textContent = pct.toFixed(2) + "%";
        document.getElementById("remaining").textContent = remaining.toLocaleString();

        if (startStr) {
          const start = new Date(startStr);
          const now = new Date();
          const daysElapsed = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24)));
          document.getElementById("daysElapsed").textContent = daysElapsed;

          const dailyRate = daysElapsed > 0 ? completed / daysElapsed : 0;
          document.getElementById("dailyRate").textContent = dailyRate.toFixed(2);

          if (dailyRate > 0 && remaining > 0) {
            const daysRemaining = Math.ceil(remaining / dailyRate);
            const estimatedEnd = new Date(now.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
            document.getElementById("daysRemaining").textContent = daysRemaining;
            document.getElementById("estimatedEnd").textContent =
              estimatedEnd.toLocaleDateString("zh-CN");
          } else if (remaining === 0) {
            document.getElementById("daysRemaining").textContent = "已完成";
            document.getElementById("estimatedEnd").textContent = "已完成";
          } else {
            document.getElementById("daysRemaining").textContent = "-";
            document.getElementById("estimatedEnd").textContent = "-";
          }
        }
      }

      window.calculate = calculate;

      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const themeToggle = document.querySelector(".theme-toggle");
          if (themeToggle) themeToggle.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
