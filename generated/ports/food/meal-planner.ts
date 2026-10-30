// @ts-nocheck
// Generated from tools/food/meal-planner.html
// Source SHA-256: b35e966a4c926dd7c6c7d7eea0fc87e1e0fadc13bd1e9f88bf6e1223cec67172
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const meals = ["breakfast", "lunch", "dinner"];
      const mealLabels = { breakfast: "早餐", lunch: "午餐", dinner: "晚餐" };

      const suggestions = {
        breakfast: ["牛奶麦片", "鸡蛋吐司", "豆浆油条", "小米粥", "三明治", "水果沙拉"],
        lunch: ["红烧肉", "番茄炒蛋", "宫保鸡丁", "麻婆豆腐", "清炒时蔬", "牛肉面"],
        dinner: ["清蒸鱼", "蔬菜沙拉", "煎牛排", "火锅", "饺子", "炒饭"]
      };

      let weekOffset = 0;
      let currentEdit = null;
      let planData = JSON.parse(localStorage.getItem("mealPlan") || "{}");

      function getWeekDates(offset) {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);

        const dates = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date(monday);
          date.setDate(monday.getDate() + i);
          dates.push(date);
        }
        return dates;
      }

      function formatDate(date) {
        return date.getMonth() + 1 + "/" + date.getDate();
      }

      function getDateKey(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      }

      function isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
      }

      function changeWeek(delta) {
        weekOffset += delta;
        renderPlanner();
      }

      function renderPlanner() {
        const dates = getWeekDates(weekOffset);
        const grid = document.getElementById("plannerGrid");
        while (grid.firstChild) grid.removeChild(grid.firstChild);

        const startDate = formatDate(dates[0]);
        const endDate = formatDate(dates[6]);
        document.getElementById("weekTitle").textContent = startDate + " - " + endDate;

        let plannedCount = 0;
        const uniqueSet = new Set();

        dates.forEach(function (date, dayIndex) {
          const column = document.createElement("div");
          column.className = "day-column";

          const header = document.createElement("div");
          header.className = "day-header" + (isToday(date) ? " today" : "");
          const dayName = document.createElement("div");
          dayName.className = "day-name";
          dayName.textContent = days[dayIndex];
          const dayDate = document.createElement("div");
          dayDate.className = "day-date";
          dayDate.textContent = formatDate(date);
          header.appendChild(dayName);
          header.appendChild(dayDate);
          column.appendChild(header);

          const dateKey = getDateKey(date);

          meals.forEach(function (meal) {
            const slot = document.createElement("div");
            slot.className = "meal-slot";

            const label = document.createElement("div");
            label.className = "meal-label";
            label.textContent = mealLabels[meal];

            const content = document.createElement("div");
            content.className = "meal-content";

            const mealKey = dateKey + "-" + meal;
            const mealValue = planData[mealKey] || "";

            if (mealValue) {
              content.textContent = mealValue;
              plannedCount++;
              uniqueSet.add(mealValue);
            } else {
              content.className += " empty";
              content.textContent = "点击添加";
            }

            content.addEventListener("click", function () {
              openModal(dateKey, meal, days[dayIndex], mealLabels[meal]);
            });

            slot.appendChild(label);
            slot.appendChild(content);
            column.appendChild(slot);
          });

          grid.appendChild(column);
        });

        document.getElementById("plannedMeals").textContent = plannedCount;
        document.getElementById("uniqueMeals").textContent = uniqueSet.size;
        document.getElementById("completionRate").textContent =
          Math.round((plannedCount / 21) * 100) + "%";
      }

      function openModal(dateKey, meal, dayName, mealLabel) {
        currentEdit = { dateKey: dateKey, meal: meal };
        document.getElementById("modalTitle").textContent = dayName + " " + mealLabel;
        document.getElementById("mealInput").value = planData[dateKey + "-" + meal] || "";

        const suggestionsEl = document.getElementById("suggestions");
        while (suggestionsEl.firstChild) suggestionsEl.removeChild(suggestionsEl.firstChild);

        suggestions[meal].forEach(function (sug) {
          const btn = document.createElement("button");
          btn.className = "suggestion-btn";
          btn.textContent = sug;
          btn.addEventListener("click", function () {
            document.getElementById("mealInput").value = sug;
          });
          suggestionsEl.appendChild(btn);
        });

        document.getElementById("mealModal").classList.add("show");
        document.getElementById("mealInput").focus();
      }

      function closeModal() {
        document.getElementById("mealModal").classList.remove("show");
        currentEdit = null;
      }

      function saveMeal() {
        if (!currentEdit) return;
        const value = document.getElementById("mealInput").value.trim();
        const key = currentEdit.dateKey + "-" + currentEdit.meal;

        if (value) {
          planData[key] = value;
        } else {
          delete planData[key];
        }

        localStorage.setItem("mealPlan", JSON.stringify(planData));
        closeModal();
        renderPlanner();
      }

      function deleteMeal() {
        if (!currentEdit) return;
        const key = currentEdit.dateKey + "-" + currentEdit.meal;
        delete planData[key];
        localStorage.setItem("mealPlan", JSON.stringify(planData));
        closeModal();
        renderPlanner();
      }

      function copyText(text) {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
          return Promise.reject(new Error("Clipboard API unavailable"));
        }
        return navigator.clipboard.writeText(text);
      }

      function exportPlan() {
        const dates = getWeekDates(weekOffset);
        let text = "周餐计划 (" + formatDate(dates[0]) + " - " + formatDate(dates[6]) + ")\n";
        text += "=".repeat(30) + "\n\n";

        dates.forEach(function (date, dayIndex) {
          text += days[dayIndex] + " (" + formatDate(date) + ")\n";
          const dateKey = getDateKey(date);
          meals.forEach(function (meal) {
            const value = planData[dateKey + "-" + meal] || "未规划";
            text += "  " + mealLabels[meal] + ": " + value + "\n";
          });
          text += "\n";
        });

        copyText(text)
          .then(function () {
            alert("已复制到剪贴板");
          })
          .catch(function () {
            alert("复制失败，请手动复制计划内容");
          });
      }

      function generateShopping() {
        const dates = getWeekDates(weekOffset);
        const mealsList = [];

        dates.forEach(function (date) {
          const dateKey = getDateKey(date);
          meals.forEach(function (meal) {
            const value = planData[dateKey + "-" + meal];
            if (value) mealsList.push(value);
          });
        });

        let text = "本周菜单\n" + "=".repeat(20) + "\n\n";
        const unique = Array.from(new Set(mealsList));
        unique.forEach(function (m) {
          text += "- " + m + "\n";
        });

        copyText(text)
          .then(function () {
            alert("菜单已复制，可用于生成购物清单");
          })
          .catch(function () {
            alert("复制失败，请手动复制菜单内容");
          });
      }

      function clearWeek() {
        if (!confirm("确定清空本周所有餐食规划吗？")) return;
        const dates = getWeekDates(weekOffset);
        dates.forEach(function (date) {
          const dateKey = getDateKey(date);
          meals.forEach(function (meal) {
            delete planData[dateKey + "-" + meal];
          });
        });
        localStorage.setItem("mealPlan", JSON.stringify(planData));
        renderPlanner();
      }

      document.getElementById("mealModal")?.addEventListener("click", function (e) {
        if (e.target === this) closeModal();
      });

      document.getElementById("mealInput")?.addEventListener("keypress", function (e) {
        if (e.key === "Enter") saveMeal();
      });

      renderPlanner();

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
    
