// @ts-nocheck
// Generated from tools/life/habit-tracker.html
// Source SHA-256: 8630bd8577a9254a797169d27b6027a645cc615d018cfe3793cbb63a4e22b41f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const today = new Date().toISOString().split("T")[0];
      document.getElementById("date").textContent = new Date().toLocaleDateString("zh-CN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      let habits = JSON.parse(localStorage.getItem("habits") || "[]");
      function save() {
        localStorage.setItem("habits", JSON.stringify(habits));
      }
      function render() {
        document.getElementById("habits").innerHTML = habits
          .map((h, i) => {
            const done = h.completedDates && h.completedDates.includes(today);
            return (
              '<div class="habit"><div class="habit-check ' +
              (done ? "done" : "") +
              '" onclick="toggle(' +
              i +
              ')">' +
              (done ? "✓" : "") +
              '</div><span class="habit-name">' +
              h.name +
              '</span><span class="habit-streak">🔥 ' +
              (h.streak || 0) +
              '</span><button class="habit-delete" onclick="remove(' +
              i +
              ')">×</button></div>'
            );
          })
          .join("");
      }
      function addHabit() {
        const name = document.getElementById("newHabit").value.trim();
        if (name) {
          habits.push({ name, streak: 0, completedDates: [] });
          save();
          render();
          document.getElementById("newHabit").value = "";
        }
      }
      function toggle(i) {
        if (!habits[i].completedDates) habits[i].completedDates = [];
        const idx = habits[i].completedDates.indexOf(today);
        if (idx > -1) {
          habits[i].completedDates.splice(idx, 1);
          habits[i].streak = Math.max(0, (habits[i].streak || 1) - 1);
        } else {
          habits[i].completedDates.push(today);
          habits[i].streak = (habits[i].streak || 0) + 1;
        }
        save();
        render();
      }
      function remove(i) {
        habits.splice(i, 1);
        save();
        render();
      }
      document.getElementById("newHabit").onkeypress = (e) => {
        if (e.key === "Enter") addHabit();
      };
      render();

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
    
