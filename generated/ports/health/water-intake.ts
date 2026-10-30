// @ts-nocheck
// Generated from tools/health/water-intake.html
// Source SHA-256: 2e2855de0fce4d82198f38926f7e97628916847a2a4a81ad8c4dbb9e18491c53
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "water_tracker";
      let dailyTarget = 2000;
      let currentIntake = 0;

      function loadTracker() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          const today = new Date().toDateString();
          if (data.date === today) {
            currentIntake = data.intake || 0;
          }
        }
        updateTracker();
      }

      function saveTracker() {
        const data = {
          date: new Date().toDateString(),
          intake: currentIntake
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function addWater(amount) {
        currentIntake += amount;
        saveTracker();
        updateTracker();
      }

      function resetTracker() {
        currentIntake = 0;
        saveTracker();
        updateTracker();
      }

      function updateTracker() {
        const percent = Math.min(100, (currentIntake / dailyTarget) * 100);
        document.getElementById("trackerFill").style.width = percent + "%";
        document.getElementById("trackerText").textContent =
          currentIntake + " / " + dailyTarget + " ml";
      }

      function calculate() {
        const weight = parseFloat(document.getElementById("weight").value) || 65;
        const activityFactor = parseFloat(document.getElementById("activity").value) || 1.4;
        const climateFactor = parseFloat(document.getElementById("climate").value) || 1;
        const specialAdd = parseFloat(document.getElementById("special").value) || 0;

        // 基础需求: 30ml/kg体重
        const baseWater = Math.round(weight * 30);

        // 运动补充
        const activityWater = Math.round(baseWater * (activityFactor - 1));

        // 气候调整
        const climateWater = Math.round(baseWater * (climateFactor - 1));

        // 总量
        const totalWater = baseWater + activityWater + climateWater + specialAdd;
        dailyTarget = totalWater;

        // 杯数 (250ml/杯)
        const glasses = Math.ceil(totalWater / 250);

        document.getElementById("totalWater").textContent = totalWater.toLocaleString();
        document.getElementById("glassCount").textContent = "约 " + glasses + " 杯 (250ml/杯)";
        document.getElementById("baseWater").textContent = baseWater + " ml";
        document.getElementById("activityWater").textContent = "+" + activityWater + " ml";
        document.getElementById("climateWater").textContent = "+" + climateWater + " ml";
        document.getElementById("specialWater").textContent = "+" + specialAdd + " ml";

        // 可视化水杯
        renderWaterVisual(glasses);

        // 时间表
        renderSchedule(totalWater);

        updateTracker();
      }

      function renderWaterVisual(glasses) {
        const container = document.getElementById("waterVisual");
        container.textContent = "";

        const displayGlasses = Math.min(glasses, 12);
        for (let i = 0; i < displayGlasses; i++) {
          const glass = document.createElement("div");
          glass.className = "glass";
          glass.style.setProperty("--fill", "80%");
          container.appendChild(glass);
        }

        if (glasses > 12) {
          const more = document.createElement("span");
          more.style.cssText =
            "display: flex; align-items: center; font-size: 0.9rem; opacity: 0.8;";
          more.textContent = "+" + (glasses - 12);
          container.appendChild(more);
        }
      }

      function renderSchedule(total) {
        const container = document.getElementById("schedule");
        container.textContent = "";

        const schedule = [
          { time: "07:00", label: "起床后", percent: 10 },
          { time: "09:00", label: "上午", percent: 12 },
          { time: "11:00", label: "午餐前", percent: 12 },
          { time: "13:00", label: "午后", percent: 12 },
          { time: "15:00", label: "下午", percent: 14 },
          { time: "17:00", label: "晚餐前", percent: 12 },
          { time: "19:00", label: "晚间", percent: 14 },
          { time: "21:00", label: "睡前", percent: 14 }
        ];

        schedule.forEach((item) => {
          const amount = Math.round((total * item.percent) / 100);
          const div = document.createElement("div");
          div.className = "schedule-item";

          const time = document.createElement("span");
          time.className = "schedule-time";
          time.textContent = item.time;

          const text = document.createElement("span");
          text.className = "schedule-amount";
          text.textContent = item.label + " - " + amount + "ml";

          div.appendChild(time);
          div.appendChild(text);
          container.appendChild(div);
        });
      }

      loadTracker();
      calculate();

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
    
