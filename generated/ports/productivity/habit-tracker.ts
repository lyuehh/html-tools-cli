// @ts-nocheck
// Generated from tools/productivity/habit-tracker.html
// Source SHA-256: f0e9261f767ac824a0c14a23d5f2282d22dcd3bd187a5726c8df61d064504da8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const defaultHabits = [
        { id: 1, name: "早起", icon: "🌅" },
        { id: 2, name: "运动", icon: "🏃" },
        { id: 3, name: "阅读", icon: "📚" },
        { id: 4, name: "喝水", icon: "💧" }
      ];

      let habits = JSON.parse(localStorage.getItem("habits_list") || "null") || defaultHabits;
      let records = JSON.parse(localStorage.getItem("habits_records") || "{}");
      let nextId = Math.max(...habits.map((h) => h.id), 0) + 1;

      const icons = ["🌅", "🏃", "📚", "💧", "🧘", "💤", "🥗", "💊", "🎯", "✍️", "🎵", "🌿"];

      function getTodayKey() {
        return new Date().toISOString().split("T")[0];
      }

      function formatDate(date) {
        const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
        return date.toLocaleDateString("zh-CN", options);
      }

      function getStreak() {
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const key = date.toISOString().split("T")[0];

          if (records[key]) {
            const dayRecord = records[key];
            const completed = habits.filter((h) => dayRecord[h.id]).length;
            if (completed === habits.length && habits.length > 0) {
              streak++;
            } else if (i > 0) {
              break;
            }
          } else if (i > 0) {
            break;
          }
        }

        return streak;
      }

      function getHabitStreak(habitId) {
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const key = date.toISOString().split("T")[0];

          if (records[key] && records[key][habitId]) {
            streak++;
          } else if (i > 0) {
            break;
          }
        }

        return streak;
      }

      function render() {
        const todayKey = getTodayKey();
        const todayRecord = records[todayKey] || {};

        document.getElementById("dateDisplay").textContent = formatDate(new Date());
        document.getElementById("streakDisplay").textContent = `🔥 连续全部完成 ${getStreak()} 天`;

        const list = document.getElementById("habitsList");
        list.innerHTML = habits
          .map((h) => {
            const isCompleted = todayRecord[h.id];
            const streak = getHabitStreak(h.id);
            return `
          <div class="habit-card ${isCompleted ? "completed" : ""}" data-id="${h.id}">
            <div class="habit-header" onclick="toggleHabit(${h.id})">
              <div class="habit-checkbox"></div>
              <div class="habit-info">
                <div class="habit-name">${h.icon || "✨"} ${h.name}</div>
                <div class="habit-streak ${streak > 0 ? "active" : ""}">
                  ${streak > 0 ? `🔥 连续 ${streak} 天` : "今日未完成"}
                </div>
              </div>
              <div class="habit-actions">
                <button class="action-btn" onclick="event.stopPropagation();deleteHabit(${h.id})" title="删除">🗑️</button>
              </div>
            </div>
          </div>
        `;
          })
          .join("");

        renderCalendar();
      }

      function toggleHabit(id) {
        const todayKey = getTodayKey();
        if (!records[todayKey]) {
          records[todayKey] = {};
        }

        records[todayKey][id] = !records[todayKey][id];
        localStorage.setItem("habits_records", JSON.stringify(records));
        render();
      }

      function showAddForm() {
        document.getElementById("addHabitForm").classList.add("show");
        document.getElementById("habitInput").focus();
      }

      function hideAddForm() {
        document.getElementById("addHabitForm").classList.remove("show");
        document.getElementById("habitInput").value = "";
      }

      function addHabit() {
        const name = document.getElementById("habitInput").value.trim();
        if (!name) return;

        const icon = icons[habits.length % icons.length];
        habits.push({ id: nextId++, name, icon });
        localStorage.setItem("habits_list", JSON.stringify(habits));
        hideAddForm();
        render();
      }

      function deleteHabit(id) {
        if (confirm("确定要删除这个习惯吗？")) {
          habits = habits.filter((h) => h.id !== id);
          localStorage.setItem("habits_list", JSON.stringify(habits));
          render();
        }
      }

      function renderCalendar() {
        const calendar = document.getElementById("calendar");
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        // Get first day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        // Day headers
        const dayNames = ["日", "一", "二", "三", "四", "五", "六"];
        let html = dayNames.map((d) => `<div class="cal-header">${d}</div>`).join("");

        // Empty cells before first day
        for (let i = 0; i < firstDay.getDay(); i++) {
          html += '<div class="cal-day"></div>';
        }

        // Days of month
        for (let day = 1; day <= lastDay.getDate(); day++) {
          const date = new Date(year, month, day);
          const key = date.toISOString().split("T")[0];
          const isToday = key === getTodayKey();

          let status = "";
          if (records[key]) {
            const completed = habits.filter((h) => records[key][h.id]).length;
            if (completed === habits.length && habits.length > 0) {
              status = "complete";
            } else if (completed > 0) {
              status = "partial";
            } else {
              status = "has-data";
            }
          }

          html += `<div class="cal-day ${status} ${isToday ? "today" : ""}">${day}</div>`;
        }

        calendar.innerHTML = html;
      }

      // Handle Enter key in input
      document.getElementById("habitInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addHabit();
      });

      // Initialize
      render();

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
    
