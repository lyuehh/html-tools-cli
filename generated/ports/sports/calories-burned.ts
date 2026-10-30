// @ts-nocheck
// Generated from tools/sports/calories-burned.html
// Source SHA-256: 8f218c3e19a70e1672ee995bcc24c7c3dc339796100e291dc513f8231ae3e175
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // MET values for various exercises
      const exercises = [
        { id: "walking", name: "散步", icon: "🚶", met: 3.5 },
        { id: "jogging", name: "慢跑", icon: "🏃", met: 7.0 },
        { id: "running", name: "快跑", icon: "🏃‍♂️", met: 11.5 },
        { id: "cycling", name: "骑行", icon: "🚴", met: 7.5 },
        { id: "swimming", name: "游泳", icon: "🏊", met: 8.0 },
        { id: "yoga", name: "瑜伽", icon: "🧘", met: 3.0 },
        { id: "dancing", name: "跳舞", icon: "💃", met: 5.5 },
        { id: "hiking", name: "徒步", icon: "🥾", met: 6.0 },
        { id: "basketball", name: "篮球", icon: "🏀", met: 8.0 },
        { id: "soccer", name: "足球", icon: "⚽", met: 10.0 },
        { id: "tennis", name: "网球", icon: "🎾", met: 7.3 },
        { id: "badminton", name: "羽毛球", icon: "🏸", met: 5.5 },
        { id: "tabletennis", name: "乒乓球", icon: "🏓", met: 4.0 },
        { id: "gym", name: "器械健身", icon: "🏋️", met: 6.0 },
        { id: "aerobics", name: "有氧操", icon: "🤸", met: 6.5 },
        { id: "jump-rope", name: "跳绳", icon: "⏭️", met: 12.0 },
        { id: "climbing", name: "攀岩", icon: "🧗", met: 8.0 },
        { id: "rowing", name: "划船", icon: "🚣", met: 7.0 },
        { id: "skiing", name: "滑雪", icon: "⛷️", met: 7.0 },
        { id: "housework", name: "家务", icon: "🧹", met: 3.5 }
      ];

      const foodEquivalents = [
        { name: "米饭", icon: "🍚", calories: 116 }, // per 100g
        { name: "可乐", icon: "🥤", calories: 43 }, // per 100ml, typical can 330ml
        { name: "汉堡", icon: "🍔", calories: 295 },
        { name: "薯条", icon: "🍟", calories: 312 },
        { name: "冰淇淋", icon: "🍦", calories: 207 },
        { name: "巧克力", icon: "🍫", calories: 546 }
      ];

      let selectedExercise = null;
      let history = JSON.parse(localStorage.getItem("exercise_history") || "[]");

      function renderExercises() {
        const grid = document.getElementById("exerciseGrid");
        grid.innerHTML = exercises
          .map(
            (e) => `
        <button class="exercise-btn ${selectedExercise === e.id ? "active" : ""}"
          onclick="selectExercise('${e.id}')">
          <span class="exercise-icon">${e.icon}</span>
          ${e.name}
        </button>
      `
          )
          .join("");
      }

      function selectExercise(id) {
        selectedExercise = id;
        renderExercises();
        calculate();
      }

      function calculate() {
        const weight = parseFloat(document.getElementById("weight").value) || 65;
        const duration = parseFloat(document.getElementById("duration").value) || 30;

        if (!selectedExercise) {
          document.getElementById("caloriesValue").textContent = "0";
          document.getElementById("resultLabel").textContent = "选择运动类型开始计算";
          renderEquivalents(0);
          return;
        }

        const exercise = exercises.find((e) => e.id === selectedExercise);
        // Calories = MET × weight(kg) × time(hours)
        const calories = Math.round(exercise.met * weight * (duration / 60));

        document.getElementById("resultIcon").textContent = exercise.icon;
        document.getElementById("caloriesValue").textContent = calories;
        document.getElementById("resultLabel").textContent = `${exercise.name} ${duration}分钟`;

        renderEquivalents(calories);
      }

      function renderEquivalents(calories) {
        const grid = document.getElementById("equivalentsGrid");

        if (calories === 0) {
          grid.innerHTML = foodEquivalents
            .map(
              (f) => `
          <div class="equivalent-item">
            <div class="equivalent-icon">${f.icon}</div>
            <div class="equivalent-value">--</div>
            <div class="equivalent-name">${f.name}</div>
          </div>
        `
            )
            .join("");
          return;
        }

        grid.innerHTML = foodEquivalents
          .map((f) => {
            let amount;
            if (f.name === "米饭") {
              amount = ((calories / f.calories) * 100).toFixed(0) + "g";
            } else if (f.name === "可乐") {
              const cans = calories / (f.calories * 3.3);
              amount = cans.toFixed(1) + "罐";
            } else {
              const portions = calories / f.calories;
              amount = portions.toFixed(1) + "份";
            }
            return `
          <div class="equivalent-item">
            <div class="equivalent-icon">${f.icon}</div>
            <div class="equivalent-value">${amount}</div>
            <div class="equivalent-name">${f.name}</div>
          </div>
        `;
          })
          .join("");
      }

      function addToHistory() {
        if (!selectedExercise) return;

        const weight = parseFloat(document.getElementById("weight").value) || 65;
        const duration = parseFloat(document.getElementById("duration").value) || 30;
        const exercise = exercises.find((e) => e.id === selectedExercise);
        const calories = Math.round(exercise.met * weight * (duration / 60));

        history.push({
          exercise: exercise.name,
          icon: exercise.icon,
          duration: duration,
          calories: calories,
          time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
        });

        localStorage.setItem("exercise_history", JSON.stringify(history));
        renderHistory();
      }

      function renderHistory() {
        const list = document.getElementById("historyList");

        if (history.length === 0) {
          list.innerHTML = '<div class="empty-history">暂无运动记录</div>';
          document.getElementById("totalCalories").textContent = "0";
          return;
        }

        list.innerHTML = history
          .map(
            (h, index) => `
        <div class="history-item">
          <div class="history-exercise">
            <span>${h.icon}</span>
            <span>${h.exercise} ${h.duration}分钟</span>
            <span style="color:var(--text-muted)">${h.time}</span>
          </div>
          <span class="history-calories">${h.calories} kcal</span>
        </div>
      `
          )
          .join("");

        const total = history.reduce((sum, h) => sum + h.calories, 0);
        document.getElementById("totalCalories").textContent = total;
      }

      function clearHistory() {
        if (confirm("确定要清空所有运动记录吗？")) {
          history = [];
          localStorage.removeItem("exercise_history");
          renderHistory();
        }
      }

      // Initialize
      renderExercises();
      renderEquivalents(0);
      renderHistory();

      // Add click listener to result card for adding to history
      document.querySelector(".result-card").addEventListener("click", function (e) {
        if (selectedExercise && e.target.closest(".result-main")) {
          addToHistory();
        }
      });

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
    
