// @ts-nocheck
// Generated from tools/lifestyle/water-intake-tracker.html
// Source SHA-256: c12bb172b49b4c22ea6c19f0becb4c077763239e244c9f2693985b685bf56ac7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_water_tracker_v1";
      const GOAL_KEY = "html_tools_water_goal_v1";

      let todayRecords = [];
      let dailyGoal = 2000;

      function getTodayKey() {
        return new Date().toLocaleDateString("zh-CN");
      }

      function loadData() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          const data = saved ? JSON.parse(saved) : {};
          todayRecords = data[getTodayKey()] || [];

          const savedGoal = localStorage.getItem(GOAL_KEY);
          dailyGoal = savedGoal ? parseInt(savedGoal) : 2000;
          document.getElementById("goalInput").value = dailyGoal;
        } catch (e) {
          todayRecords = [];
        }
        updateDisplay();
      }

      function saveData() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          const data = saved ? JSON.parse(saved) : {};
          data[getTodayKey()] = todayRecords;

          // Keep only last 30 days
          const keys = Object.keys(data);
          if (keys.length > 30) {
            keys
              .sort()
              .slice(0, -30)
              .forEach((key) => delete data[key]);
          }

          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
          console.error("Save failed", e);
        }
      }

      function updateGoal() {
        const value = parseInt(document.getElementById("goalInput").value) || 2000;
        dailyGoal = Math.max(500, Math.min(5000, value));
        document.getElementById("goalInput").value = dailyGoal;
        localStorage.setItem(GOAL_KEY, dailyGoal);
        updateDisplay();
      }

      function addWater(amount) {
        todayRecords.unshift({
          id: Date.now(),
          amount,
          time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
        });
        saveData();
        updateDisplay();
      }

      function deleteRecord(id) {
        todayRecords = todayRecords.filter((r) => r.id !== id);
        saveData();
        updateDisplay();
      }

      function resetToday() {
        if (!confirm("确定要重置今日记录吗？")) return;
        todayRecords = [];
        saveData();
        updateDisplay();
      }

      function updateDisplay() {
        const total = todayRecords.reduce((sum, r) => sum + r.amount, 0);
        const percentage = Math.min(100, (total / dailyGoal) * 100);

        document.getElementById("totalAmount").textContent = `${total} ml`;
        document.getElementById("progressBar").style.width = `${percentage}%`;
        document.getElementById("progressGoal").textContent =
          `目标：${dailyGoal} ml (${percentage.toFixed(0)}%)`;

        const container = document.getElementById("historyList");
        if (todayRecords.length === 0) {
          container.innerHTML = '<div class="empty-state">还没有记录</div>';
          return;
        }

        container.innerHTML = todayRecords
          .map(
            (r) => `
        <div class="history-item">
          <span class="history-time">${r.time}</span>
          <span class="history-amount">${r.amount} ml</span>
          <button class="history-delete" onclick="deleteRecord(${r.id})" aria-label="×">×</button>
        </div>
      `
          )
          .join("");
      }

      // Initialize
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
    
