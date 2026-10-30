// @ts-nocheck
// Generated from tools/health/calorie-calculator.html
// Source SHA-256: 285e915ddfc1d478c7ac085bbbd7b7b496af5cbd53e8927eafeaba88b3a0349c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // State Management
      // ============================================
      let gender = "male";
      let goal = "maintain";
      let tdeeValue = 0;
      let bmrValue = 0;

      // ============================================
      // Gender Selection
      // ============================================
      function setGender(g) {
        gender = g;
        document.querySelectorAll(".radio-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.value === g);
        });
        calculate();
      }

      // ============================================
      // Goal Selection
      // ============================================
      function setGoal(g) {
        goal = g;
        document.querySelectorAll(".goal").forEach((el) => {
          const isActive = el
            .querySelector(".name")
            .textContent.includes(g === "lose" ? "减脂" : g === "gain" ? "增肌" : "维持");
          el.classList.toggle("active", isActive);
          el.setAttribute("aria-pressed", isActive.toString());
        });
        updateMacros();
      }

      // ============================================
      // BMR & TDEE Calculation
      // ============================================
      function calculate() {
        const age = parseFloat(document.getElementById("age").value) || 25;
        const height = parseFloat(document.getElementById("height").value) || 170;
        const weight = parseFloat(document.getElementById("weight").value) || 65;
        const activity = parseFloat(document.getElementById("activity").value) || 1.55;
        const bodyFat = document.getElementById("bodyFat").value;

        // Calculate BMR
        if (bodyFat && !isNaN(parseFloat(bodyFat))) {
          // Katch-McArdle formula (requires body fat percentage)
          const leanMass = weight * (1 - parseFloat(bodyFat) / 100);
          bmrValue = 370 + 21.6 * leanMass;
        } else {
          // Mifflin-St Jeor formula
          if (gender === "male") {
            bmrValue = 10 * weight + 6.25 * height - 5 * age + 5;
          } else {
            bmrValue = 10 * weight + 6.25 * height - 5 * age - 161;
          }
        }

        tdeeValue = Math.round(bmrValue * activity);

        document.getElementById("tdee").textContent = tdeeValue.toLocaleString();
        document.getElementById("bmrNote").textContent =
          "基础代谢率: " + Math.round(bmrValue).toLocaleString() + " 千卡";

        // Goal calories
        const loseCalories = Math.round(tdeeValue - 500);
        const gainCalories = Math.round(tdeeValue + 300);

        document.getElementById("loseCalories").textContent = loseCalories.toLocaleString();
        document.getElementById("maintainCalories").textContent = tdeeValue.toLocaleString();
        document.getElementById("gainCalories").textContent = gainCalories.toLocaleString();

        updateMacros();
      }

      // ============================================
      // Macros Calculation & Display
      // ============================================
      function updateMacros() {
        let targetCalories = tdeeValue;
        let proteinPercent, carbPercent, fatPercent;

        if (goal === "lose") {
          targetCalories = tdeeValue - 500;
          proteinPercent = 35;
          carbPercent = 35;
          fatPercent = 30;
        } else if (goal === "maintain") {
          proteinPercent = 25;
          carbPercent = 50;
          fatPercent = 25;
        } else {
          targetCalories = tdeeValue + 300;
          proteinPercent = 30;
          carbPercent = 45;
          fatPercent = 25;
        }

        // Calculate grams
        const proteinCal = (targetCalories * proteinPercent) / 100;
        const carbCal = (targetCalories * carbPercent) / 100;
        const fatCal = (targetCalories * fatPercent) / 100;

        const proteinGrams = Math.round(proteinCal / 4);
        const carbGrams = Math.round(carbCal / 4);
        const fatGrams = Math.round(fatCal / 9);

        document.getElementById("targetCalories").textContent =
          Math.round(targetCalories).toLocaleString() + " 千卡";
        document.getElementById("proteinGrams").textContent =
          proteinGrams + "g (" + proteinPercent + "%)";
        document.getElementById("carbGrams").textContent = carbGrams + "g (" + carbPercent + "%)";
        document.getElementById("fatGrams").textContent = fatGrams + "g (" + fatPercent + "%)";

        // Render macro chart
        renderMacroChart(
          proteinPercent,
          carbPercent,
          fatPercent,
          proteinGrams,
          carbGrams,
          fatGrams
        );

        // Render meal plan
        renderMealPlan(targetCalories);
      }

      // ============================================
      // Macro Chart Rendering
      // ============================================
      function renderMacroChart(protein, carb, fat, pGrams, cGrams, fGrams) {
        const chart = document.getElementById("macroChart");
        chart.textContent = "";

        const segments = [
          { percent: protein, color: "#ef4444", label: "蛋白质" },
          { percent: carb, color: "#3b82f6", label: "碳水" },
          { percent: fat, color: "#fbbf24", label: "脂肪" }
        ];

        segments.forEach((seg) => {
          const div = document.createElement("div");
          div.className = "macro-segment";
          div.style.width = seg.percent + "%";
          div.style.background = seg.color;
          if (seg.percent > 5) {
            div.textContent = seg.percent + "%";
          }
          chart.appendChild(div);
        });

        const legend = document.getElementById("macroLegend");
        legend.textContent = "";

        const grams = [pGrams, cGrams, fGrams];
        segments.forEach((seg, i) => {
          const item = document.createElement("div");
          item.className = "macro-item";

          const dot = document.createElement("span");
          dot.className = "macro-dot";
          dot.style.background = seg.color;

          const value = document.createElement("span");
          value.className = "macro-value";
          value.textContent = grams[i] + "g";

          const label = document.createElement("span");
          label.className = "macro-label";
          label.textContent = seg.label;

          item.appendChild(dot);
          item.appendChild(value);
          item.appendChild(label);
          legend.appendChild(item);
        });
      }

      // ============================================
      // Meal Plan Rendering
      // ============================================
      function renderMealPlan(totalCalories) {
        const container = document.getElementById("mealPlan");
        container.textContent = "";

        const meals = [
          { name: "早餐", icon: "🌅", percent: 25, examples: "燕麦、鸡蛋、牛奶、水果" },
          { name: "午餐", icon: "☀️", percent: 35, examples: "米饭/面条、肉类、蔬菜" },
          { name: "加餐", icon: "🍎", percent: 10, examples: "坚果、酸奶、水果" },
          { name: "晚餐", icon: "🌙", percent: 30, examples: "主食、鱼/鸡肉、蔬菜" }
        ];

        meals.forEach((meal) => {
          const calories = Math.round((totalCalories * meal.percent) / 100);

          const div = document.createElement("div");
          div.className = "meal";

          const nameDiv = document.createElement("div");
          nameDiv.className = "meal-name";

          const icon = document.createElement("span");
          icon.className = "meal-icon";
          icon.textContent = meal.icon;

          const info = document.createElement("div");
          info.className = "meal-info";

          const title = document.createElement("div");
          title.className = "meal-title";
          title.textContent = meal.name;

          const examples = document.createElement("div");
          examples.className = "food-examples";
          examples.textContent = meal.examples;

          info.appendChild(title);
          info.appendChild(examples);

          nameDiv.appendChild(icon);
          nameDiv.appendChild(info);

          const caloriesDiv = document.createElement("div");
          caloriesDiv.className = "meal-calories";
          caloriesDiv.textContent = calories + " 千卡";

          div.appendChild(nameDiv);
          div.appendChild(caloriesDiv);
          container.appendChild(div);
        });
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      calculate();
    
