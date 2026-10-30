// @ts-nocheck
// Generated from tools/dev/cron-generator.html
// Source SHA-256: 78171f7ef4bceb046a6a9e9a7774224c9789a25014aa0043f1dcca41b04eab78
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateCron() {
        const cron = ["minute", "hour", "day", "month", "weekday"]
          .map((id) => document.getElementById(id).value || "*")
          .join(" ");
        document.getElementById("cron").textContent = cron;
        describeCron(cron);
      }
      function setPreset(cron) {
        const parts = cron.split(" ");
        ["minute", "hour", "day", "month", "weekday"].forEach(
          (id, i) => (document.getElementById(id).value = parts[i])
        );
        document.getElementById("cron").textContent = cron;
        describeCron(cron);
      }
      function describeCron(cron) {
        const descs = {
          "* * * * *": "每分钟执行",
          "0 * * * *": "每小时整点执行",
          "0 0 * * *": "每天午夜执行",
          "0 0 * * 0": "每周日午夜执行",
          "0 0 1 * *": "每月1号午夜执行",
          "*/5 * * * *": "每5分钟执行",
          "0 */2 * * *": "每2小时执行",
          "0 9-17 * * 1-5": "工作日9点到17点每小时执行"
        };
        document.getElementById("desc").textContent = descs[cron] || "自定义计划";
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
    
