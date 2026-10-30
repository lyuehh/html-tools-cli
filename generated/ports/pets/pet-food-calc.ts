// @ts-nocheck
// Generated from tools/pets/pet-food-calc.html
// Source SHA-256: ecc71dcf7643112e7979c7df2e73345898b8f03aaf54b3f0fefec51dd0089c60
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let petType = "dog";

      // RER (Resting Energy Requirement) = 70 × (body weight in kg)^0.75
      // DER (Daily Energy Requirement) = RER × activity factor

      const factors = {
        dog: {
          puppy: { low: 2.0, moderate: 2.5, high: 3.0 },
          adult: { low: 1.4, moderate: 1.6, high: 2.0 },
          senior: { low: 1.2, moderate: 1.4, high: 1.6 }
        },
        cat: {
          puppy: { low: 2.0, moderate: 2.5, high: 3.0 },
          adult: { low: 1.2, moderate: 1.4, high: 1.6 },
          senior: { low: 1.0, moderate: 1.2, high: 1.4 }
        }
      };

      const conditionFactors = {
        underweight: 1.2,
        normal: 1.0,
        overweight: 0.8
      };

      function setPetType(type) {
        petType = type;
        document.querySelectorAll(".pet-btn").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelector(`.pet-btn:nth-child(${type === "dog" ? 1 : 2})`)
          .classList.add("active");
        calculate();
      }

      function calculate() {
        const weight = parseFloat(document.getElementById("weight").value) || 5;
        const age = document.getElementById("age").value;
        const activity = document.getElementById("activity").value;
        const condition = document.getElementById("condition").value;
        const calories = parseFloat(document.getElementById("calories").value) || 350;

        // Calculate RER
        const rer = 70 * Math.pow(weight, 0.75);

        // Get activity factor
        const activityFactor = factors[petType][age][activity];

        // Get condition factor
        const conditionFactor = conditionFactors[condition];

        // Calculate DER
        const der = rer * activityFactor * conditionFactor;

        // Calculate daily food amount
        const dailyAmount = Math.round((der / calories) * 100);

        // Update display
        document.getElementById("dailyAmount").textContent = dailyAmount;
        document.getElementById("caloriesNeeded").textContent =
          `每日所需热量: ${Math.round(der)} kcal`;
        document.getElementById("resultIcon").textContent = petType === "dog" ? "🐕" : "🐱";

        // Update schedule
        renderSchedule(dailyAmount, age);

        // Update tips
        generateTips(weight, age, activity, condition, dailyAmount);
      }

      function renderSchedule(dailyAmount, age) {
        const grid = document.getElementById("scheduleGrid");

        if (age === "puppy") {
          // 3 meals for puppies
          const perMeal = Math.round(dailyAmount / 3);
          grid.innerHTML = `
          <div class="schedule-item">
            <div class="schedule-time">早餐 7:00</div>
            <div class="schedule-amount">${perMeal}g</div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">午餐 12:00</div>
            <div class="schedule-amount">${perMeal}g</div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">晚餐 18:00</div>
            <div class="schedule-amount">${perMeal}g</div>
          </div>
        `;
        } else {
          // 2 meals for adults and seniors
          const perMeal = Math.round(dailyAmount / 2);
          grid.innerHTML = `
          <div class="schedule-item">
            <div class="schedule-time">早餐 8:00</div>
            <div class="schedule-amount">${perMeal}g</div>
          </div>
          <div class="schedule-item" style="grid-column:span 2">
            <div class="schedule-time">晚餐 18:00</div>
            <div class="schedule-amount">${perMeal}g</div>
          </div>
        `;
        }
      }

      function generateTips(weight, age, activity, condition, amount) {
        const tips = [];
        const icon = petType === "dog" ? "🐕" : "🐱";

        if (age === "puppy") {
          tips.push(`${icon} 幼年期建议分3餐喂食，少量多餐更易消化`);
          tips.push("📈 幼年期是发育关键期，可适当增加蛋白质摄入");
        } else if (age === "senior") {
          tips.push(`${icon} 老年期代谢减慢，注意控制体重`);
          tips.push("🏥 建议定期体检，关注关节和肾脏健康");
        }

        if (condition === "overweight") {
          tips.push("⚖️ 减重期间建议增加运动，缓慢减少食量");
          tips.push("🥗 可选择低脂配方粮食");
        } else if (condition === "underweight") {
          tips.push("💪 增重期间可适当增加喂食次数");
          tips.push("🥩 选择高蛋白高热量的优质粮食");
        }

        if (activity === "high") {
          tips.push("🏃 运动量大的宠物需要更多蛋白质和能量");
        }

        tips.push("💧 保证充足的清洁饮水");
        tips.push("⏰ 固定喂食时间有助于消化规律");

        document.getElementById("tips").innerHTML = tips.join("<br>");
      }

      // Initialize
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
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
