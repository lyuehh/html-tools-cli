// @ts-nocheck
// Generated from tools/parenting/baby-sleep-tracker.html
// Source SHA-256: f9ef90aebc609f2c91559f6e2f1a15577f20b2ebf6ef8f98eafe0cd190cfae97
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_baby_sleep_v1";
      let sleeps = [];
      let currentStart = null;
      let timerInterval = null;

      function loadData() {
        try {
          sleeps = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
          const saved = localStorage.getItem(STORAGE_KEY + "_current");
          if (saved) currentStart = new Date(saved);
        } catch (e) {
          sleeps = [];
        }
        render();
        if (currentStart) startTimer();
      }

      function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sleeps));
        if (currentStart) {
          localStorage.setItem(STORAGE_KEY + "_current", currentStart.toISOString());
        } else {
          localStorage.removeItem(STORAGE_KEY + "_current");
        }
      }

      function toggleSleep() {
        if (currentStart) {
          endSleep();
        } else {
          startSleep();
        }
      }

      function startSleep() {
        currentStart = new Date();
        saveData();
        document.getElementById("statusText").textContent = "结束睡眠";
        document.getElementById("statusIcon").textContent = "😴";
        startTimer();
      }

      function endSleep() {
        if (!currentStart) return;
        const end = new Date();
        const duration = Math.floor((end - currentStart) / 60000); // minutes

        sleeps.unshift({
          start: currentStart.toISOString(),
          end: end.toISOString(),
          duration: duration
        });

        currentStart = null;
        stopTimer();
        saveData();
        render();

        document.getElementById("statusText").textContent = "开始睡眠";
        document.getElementById("statusIcon").textContent = "💤";
        document.getElementById("currentDuration").textContent = "00:00";
      }

      function startTimer() {
        stopTimer();
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
      }

      function stopTimer() {
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }

      function updateTimer() {
        if (!currentStart) return;
        const now = new Date();
        const diff = Math.floor((now - currentStart) / 1000); // seconds
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        document.getElementById("currentDuration").textContent =
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      }

      function formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}小时${mins}分` : `${mins}分钟`;
      }

      function render() {
        const today = new Date().toDateString();
        const todaySleeps = sleeps.filter((s) => new Date(s.start).toDateString() === today);
        const totalMinutes = todaySleeps.reduce((sum, s) => sum + s.duration, 0);

        document.getElementById("totalToday").textContent = formatDuration(totalMinutes);
        document.getElementById("countToday").textContent = todaySleeps.length;

        const list = document.getElementById("historyList");
        if (sleeps.length === 0) {
          list.innerHTML = '<div class="empty-state">还没有记录</div>';
          return;
        }

        list.innerHTML = sleeps
          .slice(0, 10)
          .map(
            (s) => `
        <div class="sleep-item">
          <div>
            <div class="sleep-time">${new Date(s.start).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</div>
          </div>
          <div class="sleep-duration">${formatDuration(s.duration)}</div>
        </div>
      `
          )
          .join("");
      }

      loadData();

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
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
