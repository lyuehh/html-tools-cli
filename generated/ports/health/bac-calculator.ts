// @ts-nocheck
// Generated from tools/health/bac-calculator.html
// Source SHA-256: a47ca1127b459b926a5640999bfc00c693efd900faa272dd4e1decb11e2ceccd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // State
      // ============================================
      var gender = "male";
      var stomach = "full";

      var drinkTypes = {
        beer: { abv: 5, defaultAmount: 330 },
        wine: { abv: 12, defaultAmount: 150 },
        baijiu: { abv: 52, defaultAmount: 50 },
        whisky: { abv: 40, defaultAmount: 30 },
        cocktail: { abv: 15, defaultAmount: 200 },
        custom: { abv: 5, defaultAmount: 100 }
      };

      var effects = [
        { bac: 0, title: "清醒状态", text: "无酒精影响", cls: "safe" },
        {
          bac: 0.02,
          title: "轻微影响",
          text: "放松感，轻微判断力下降，已达饮酒驾驶标准",
          cls: "mild"
        },
        { bac: 0.05, title: "兴奋期", text: "抑制解除，判断力下降，反应时间延长", cls: "mild" },
        {
          bac: 0.08,
          title: "醉酒状态",
          text: "肌肉协调能力下降，自控力降低，已达醉驾标准",
          cls: "moderate"
        },
        { bac: 0.15, title: "严重醉酒", text: "平衡感丧失，情绪不稳，可能呕吐", cls: "severe" },
        { bac: 0.25, title: "极度危险", text: "意识混乱，可能昏迷，需要医疗救助", cls: "severe" },
        { bac: 0.35, title: "生命危险", text: "可能导致昏迷或死亡，需紧急救治", cls: "severe" }
      ];

      // ============================================
      // Input Handlers
      // ============================================
      function setGender(g) {
        gender = g;
        document.querySelectorAll("#genderGroup .radio-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.value === g);
        });
        calculate();
      }

      function setStomach(s) {
        stomach = s;
        document.querySelectorAll("#stomachGroup .radio-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.value === s);
        });
        calculate();
      }

      function updateDrinkInfo() {
        var type = document.getElementById("drinkType").value;
        var drink = drinkTypes[type];

        document.getElementById("amount").value = drink.defaultAmount;
        document.getElementById("customAbvGroup").style.display =
          type === "custom" ? "block" : "none";

        calculate();
      }

      function addQuickDrink(type, amount) {
        document.getElementById("drinkType").value = type;
        document.getElementById("amount").value = amount;
        document.getElementById("customAbvGroup").style.display = "none";
        calculate();
      }

      // ============================================
      // Calculation
      // ============================================
      function calculate() {
        var weight = parseFloat(document.getElementById("weight").value) || 70;
        var hours = parseFloat(document.getElementById("hours").value) || 0;
        var amount = parseFloat(document.getElementById("amount").value) || 0;
        var type = document.getElementById("drinkType").value;

        var abv;
        if (type === "custom") {
          abv = parseFloat(document.getElementById("customAbv").value) || 5;
        } else {
          abv = drinkTypes[type].abv;
        }

        var alcoholGrams = amount * (abv / 100) * 0.789;

        var r = gender === "male" ? 0.68 : 0.55;
        var absorptionFactor = stomach === "empty" ? 1.2 : 1.0;
        var peakBac = (alcoholGrams / (weight * 1000 * r)) * 100 * absorptionFactor;
        var metabolismRate = 0.015;
        var metabolized = hours * metabolismRate;
        var currentBac = Math.max(0, peakBac - metabolized);
        var standardDrinks = alcoholGrams / 14;
        var soberHours = peakBac > 0 ? peakBac / metabolismRate : 0;
        var driveHours = peakBac > 0.02 ? (peakBac - 0.02) / metabolismRate : 0;

        document.getElementById("bacValue").textContent = currentBac.toFixed(3);
        document.getElementById("alcoholGrams").textContent = alcoholGrams.toFixed(1) + " g";
        document.getElementById("standardDrinks").textContent = standardDrinks.toFixed(1) + " 杯";
        document.getElementById("peakBac").textContent = peakBac.toFixed(3) + "%";
        document.getElementById("currentBac").textContent = currentBac.toFixed(3) + "%";
        document.getElementById("soberTime").textContent =
          soberHours > hours ? (soberHours - hours).toFixed(1) + " 小时" : "已清醒";
        document.getElementById("driveTime").textContent =
          driveHours > hours
            ? (driveHours - hours).toFixed(1) + " 小时"
            : currentBac < 0.02
              ? "可驾驶"
              : "0 小时";

        var hero = document.getElementById("resultHero");
        var statusText = document.getElementById("statusText");

        if (currentBac < 0.02) {
          hero.className = "result-hero safe";
          statusText.textContent = "安全范围";
        } else if (currentBac < 0.08) {
          hero.className = "result-hero caution";
          statusText.textContent = "饮酒驾驶 - 违法";
        } else if (currentBac < 0.15) {
          hero.className = "result-hero danger";
          statusText.textContent = "醉酒驾驶 - 严重违法";
        } else {
          hero.className = "result-hero critical";
          statusText.textContent = "危险状态 - 需要医疗";
        }

        var fillPercent = Math.min(100, (currentBac / 0.3) * 100);
        document.getElementById("bacFill").style.width = fillPercent + "%";

        renderEffects(currentBac);
      }

      function renderEffects(bac) {
        var container = document.getElementById("effects");
        container.textContent = "";

        var applicableEffects = [];
        for (var i = effects.length - 1; i >= 0; i--) {
          if (bac >= effects[i].bac) {
            applicableEffects = effects.slice(0, i + 1);
            break;
          }
        }

        if (applicableEffects.length === 0) {
          applicableEffects = [effects[0]];
        }

        applicableEffects
          .slice(-3)
          .reverse()
          .forEach(function (effect) {
            var div = document.createElement("div");
            div.className = "effect-item " + effect.cls;

            var title = document.createElement("div");
            title.className = "effect-title";
            title.textContent = "BAC " + effect.bac.toFixed(2) + "%+ - " + effect.title;

            var text = document.createElement("div");
            text.className = "effect-text";
            text.textContent = effect.text;

            div.appendChild(title);
            div.appendChild(text);
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
    
