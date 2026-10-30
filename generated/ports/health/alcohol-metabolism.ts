// @ts-nocheck
// Generated from tools/health/alcohol-metabolism.html
// Source SHA-256: 3114f356edda4c44076c1e8d011d1213199ba6a02e28f53e5e777cc21247596c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // State Management
      // ============================================
      let gender = "male";
      let stomach = "full";
      let drinks = [{ type: "beer", amount: 330 }];

      const drinkTypes = {
        beer: { name: "啤酒", abv: 5, unit: "ml" },
        wine: { name: "红酒", abv: 12, unit: "ml" },
        baijiu: { name: "白酒", abv: 52, unit: "ml" },
        whisky: { name: "威士忌", abv: 40, unit: "ml" },
        cocktail: { name: "鸡尾酒", abv: 15, unit: "ml" },
        sake: { name: "清酒", abv: 15, unit: "ml" }
      };

      // ============================================
      // Radio Button Handlers
      // ============================================
      function setGender(g) {
        gender = g;
        document.querySelectorAll(".input-group:nth-of-type(1) .radio-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.value === g);
        });
        calculate();
      }

      function setStomach(s) {
        stomach = s;
        document.querySelectorAll(".input-group:nth-of-type(4) .radio-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.value === s);
        });
        calculate();
      }

      // ============================================
      // Drink Management
      // ============================================
      function renderDrinks() {
        const container = document.getElementById("drinks");
        container.textContent = "";

        drinks.forEach((drink, index) => {
          const div = document.createElement("div");
          div.className = "drink-item";

          const select = document.createElement("select");
          select.onchange = (e) => {
            drinks[index].type = e.target.value;
            calculate();
          };
          Object.entries(drinkTypes).forEach(([key, val]) => {
            const option = document.createElement("option");
            option.value = key;
            option.textContent = val.name + " (" + val.abv + "%)";
            option.selected = key === drink.type;
            select.appendChild(option);
          });

          const input = document.createElement("input");
          input.type = "number";
          input.value = drink.amount;
          input.min = 0;
          input.placeholder = "ml";
          input.oninput = (e) => {
            drinks[index].amount = parseFloat(e.target.value) || 0;
            calculate();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "btn-danger";
          removeBtn.textContent = "×";
          removeBtn.onclick = () => {
            drinks.splice(index, 1);
            if (drinks.length === 0) drinks.push({ type: "beer", amount: 0 });
            renderDrinks();
            calculate();
          };

          div.appendChild(select);
          div.appendChild(input);
          div.appendChild(removeBtn);
          container.appendChild(div);
        });
      }

      function addDrink() {
        drinks.push({ type: "beer", amount: 330 });
        renderDrinks();
        calculate();
      }

      // ============================================
      // Calculation
      // ============================================
      function calculate() {
        const weight = parseFloat(document.getElementById("weight").value) || 70;
        const startTimeStr = document.getElementById("startTime").value;

        // 计算总酒精摄入量（克）
        let totalAlcohol = 0;
        drinks.forEach((drink) => {
          const drinkInfo = drinkTypes[drink.type];
          totalAlcohol += drink.amount * (drinkInfo.abv / 100) * 0.789;
        });

        // Widmark公式计算BAC
        const r = gender === "male" ? 0.68 : 0.55;
        const absorptionFactor = stomach === "empty" ? 1.2 : 1.0;
        const peakBAC = (totalAlcohol / (weight * 1000 * r)) * 100 * absorptionFactor;

        // 代谢率
        const metabolismRate = 0.015;
        const absorptionTime = stomach === "empty" ? 0.5 : 1;

        // 计算当前BAC
        const now = new Date();
        const [startHour, startMin] = startTimeStr.split(":").map(Number);
        const startTime = new Date();
        startTime.setHours(startHour, startMin, 0, 0);

        let hoursPassed = (now - startTime) / (1000 * 60 * 60);
        if (hoursPassed < 0) hoursPassed += 24;

        let currentBAC;
        if (hoursPassed < absorptionTime) {
          currentBAC = peakBAC * (hoursPassed / absorptionTime);
        } else {
          const metabolized = (hoursPassed - absorptionTime) * metabolismRate;
          currentBAC = Math.max(0, peakBAC - metabolized);
        }

        const standardDrinks = totalAlcohol / 14;
        const soberHours = peakBAC / metabolismRate + absorptionTime;
        const soberTime = new Date(startTime.getTime() + soberHours * 60 * 60 * 1000);

        const driveBAC = 0.02;
        const driveHours = Math.max(0, (peakBAC - driveBAC) / metabolismRate + absorptionTime);
        const driveTime = new Date(startTime.getTime() + driveHours * 60 * 60 * 1000);

        // 更新显示
        document.getElementById("bac").textContent = currentBAC.toFixed(3);
        document.getElementById("totalAlcohol").textContent = totalAlcohol.toFixed(1) + " g";
        document.getElementById("standardDrinks").textContent = standardDrinks.toFixed(1) + " 杯";
        document.getElementById("peakBAC").textContent = peakBAC.toFixed(3) + "%";
        document.getElementById("soberTime").textContent =
          totalAlcohol > 0 ? formatTime(soberTime) : "-";
        document.getElementById("driveTime").textContent =
          totalAlcohol > 0 ? formatTime(driveTime) : "-";

        // 状态显示
        const hero = document.getElementById("resultHero");
        const status = document.getElementById("status");

        if (currentBAC < 0.02) {
          hero.className = "result-hero safe";
          status.textContent = totalAlcohol > 0 ? "轻微影响" : "未饮酒";
        } else if (currentBAC < 0.08) {
          hero.className = "result-hero caution";
          status.textContent = "饮酒状态 - 禁止驾驶";
        } else {
          hero.className = "result-hero danger";
          status.textContent = "醉酒状态 - 严禁驾驶";
        }

        renderTimeline(startTime, peakBAC, absorptionTime, metabolismRate);
      }

      function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const nextDay = date.getDate() !== new Date().getDate();
        return hours + ":" + minutes + (nextDay ? " (次日)" : "");
      }

      function renderTimeline(startTime, peakBAC, absorptionTime, metabolismRate) {
        const container = document.getElementById("timeline");
        container.textContent = "";

        if (peakBAC <= 0) {
          const div = document.createElement("div");
          div.style.cssText =
            "text-align: center; color: var(--text-muted); padding: var(--space-5);";
          div.textContent = "请添加饮酒记录";
          container.appendChild(div);
          return;
        }

        const now = new Date();
        const events = [
          { time: startTime, bac: 0, desc: "开始饮酒" },
          {
            time: new Date(startTime.getTime() + absorptionTime * 60 * 60 * 1000),
            bac: peakBAC,
            desc: "血液酒精浓度达到峰值"
          }
        ];

        const keyPoints = [0.08, 0.05, 0.02, 0];
        keyPoints.forEach((targetBAC) => {
          if (peakBAC > targetBAC) {
            const hours = (peakBAC - targetBAC) / metabolismRate + absorptionTime;
            const time = new Date(startTime.getTime() + hours * 60 * 60 * 1000);
            let desc = "";
            if (targetBAC === 0.08) desc = "低于醉驾标准";
            else if (targetBAC === 0.05) desc = "轻度影响";
            else if (targetBAC === 0.02) desc = "低于酒驾标准，可驾驶";
            else desc = "完全清醒";
            events.push({ time, bac: targetBAC, desc });
          }
        });

        events.sort((a, b) => a.time - b.time);

        events.forEach((event) => {
          const div = document.createElement("div");
          div.className = "timeline-item";
          if (event.time <= now) div.classList.add("passed");

          const timeDiv = document.createElement("div");
          timeDiv.className = "timeline-time";
          timeDiv.textContent = formatTime(event.time);

          const descDiv = document.createElement("div");
          descDiv.className = "timeline-desc";
          descDiv.textContent = event.desc;

          const bacDiv = document.createElement("div");
          bacDiv.className = "timeline-bac";
          bacDiv.textContent = "BAC: " + event.bac.toFixed(3) + "%";

          div.appendChild(timeDiv);
          div.appendChild(descDiv);
          div.appendChild(bacDiv);
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
      renderDrinks();
      calculate();
    
