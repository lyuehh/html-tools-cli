// @ts-nocheck
// Generated from tools/realestate/decoration-budget.html
// Source SHA-256: ac1e90cc391d811d39338ad5c0655a84a2b1a3491e530624d36f6899e27c07ab
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var selectedLevel = "medium";

      var levelPrices = {
        simple: {
          base: 600,
          water: 80,
          electric: 60,
          wall: 50,
          floor: 100,
          ceiling: 40,
          door: 60,
          kitchen: 80,
          bathroom: 80
        },
        medium: {
          base: 1000,
          water: 120,
          electric: 100,
          wall: 80,
          floor: 180,
          ceiling: 80,
          door: 120,
          kitchen: 150,
          bathroom: 150
        },
        high: {
          base: 1500,
          water: 180,
          electric: 150,
          wall: 120,
          floor: 300,
          ceiling: 150,
          door: 200,
          kitchen: 250,
          bathroom: 250
        },
        luxury: {
          base: 2500,
          water: 280,
          electric: 220,
          wall: 200,
          floor: 500,
          ceiling: 250,
          door: 350,
          kitchen: 400,
          bathroom: 400
        }
      };

      var houseTypeMultiplier = {
        new: 1,
        used: 1.15,
        partial: 0.6
      };

      function selectLevel(level) {
        selectedLevel = level;
        var buttons = document.querySelectorAll(".level-btn");
        buttons.forEach(function (btn) {
          btn.classList.remove("active");
          if (btn.dataset.level === level) {
            btn.classList.add("active");
          }
        });
      }

      function formatMoney(num) {
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculate() {
        var area = parseFloat(document.getElementById("area").value) || 100;
        var houseType = document.getElementById("houseType").value;
        var designFee = parseFloat(document.getElementById("designFee").value) || 0;
        var furnitureBudget =
          parseFloat(document.getElementById("furnitureBudget").value) * 10000 || 0;
        var contingency = parseFloat(document.getElementById("contingency").value) / 100 || 0.1;

        var prices = levelPrices[selectedLevel];
        var multiplier = houseTypeMultiplier[houseType];

        var budgetItems = [
          { name: "水电改造", icon: "🔌", value: prices.water * area * multiplier },
          { name: "墙面工程", icon: "🧱", value: prices.wall * area * multiplier },
          { name: "地面工程", icon: "🪵", value: prices.floor * area * multiplier },
          { name: "吊顶工程", icon: "💡", value: prices.ceiling * area * multiplier },
          { name: "门窗工程", icon: "🚪", value: prices.door * area * 0.3 * multiplier },
          { name: "厨房装修", icon: "🍳", value: prices.kitchen * area * 0.15 * multiplier },
          { name: "卫浴装修", icon: "🚿", value: prices.bathroom * area * 0.1 * multiplier },
          { name: "设计费用", icon: "📐", value: designFee * area },
          { name: "家具家电", icon: "🛋️", value: furnitureBudget }
        ];

        var subtotal = budgetItems.reduce(function (sum, item) {
          return sum + item.value;
        }, 0);
        var contingencyAmount = subtotal * contingency;
        budgetItems.push({ name: "备用金", icon: "💰", value: contingencyAmount });

        var total = subtotal + contingencyAmount;

        document.getElementById("resultSection").classList.remove("hidden");
        document.getElementById("totalBudget").textContent = formatMoney(total);

        var budgetList = document.getElementById("budgetList");
        while (budgetList.firstChild) {
          budgetList.removeChild(budgetList.firstChild);
        }
        budgetItems.forEach(function (item) {
          var div = document.createElement("div");
          div.className = "budget-item";

          var nameSpan = document.createElement("span");
          nameSpan.className = "budget-name";
          nameSpan.textContent = item.icon + " " + item.name;

          var valueSpan = document.createElement("span");
          valueSpan.className = "budget-value";
          valueSpan.textContent = formatMoney(item.value);

          div.appendChild(nameSpan);
          div.appendChild(valueSpan);
          budgetList.appendChild(div);
        });

        var proportionList = document.getElementById("proportionList");
        while (proportionList.firstChild) {
          proportionList.removeChild(proportionList.firstChild);
        }
        budgetItems.forEach(function (item) {
          var percentage = (item.value / total) * 100;
          var div = document.createElement("div");
          div.className = "budget-item";

          var nameSpan = document.createElement("span");
          nameSpan.className = "budget-name";
          nameSpan.textContent = item.icon + " " + item.name;

          var barDiv = document.createElement("div");
          barDiv.className = "budget-bar";
          var fillDiv = document.createElement("div");
          fillDiv.className = "budget-fill";
          fillDiv.style.width = percentage + "%";
          barDiv.appendChild(fillDiv);

          var valueSpan = document.createElement("span");
          valueSpan.className = "budget-value";
          valueSpan.textContent = percentage.toFixed(1) + "%";

          div.appendChild(nameSpan);
          div.appendChild(barDiv);
          div.appendChild(valueSpan);
          proportionList.appendChild(div);
        });

        var tips = [];
        if (selectedLevel === "simple") {
          tips = [
            "简装注重实用性，建议选择性价比高的国产品牌",
            "水电隐蔽工程不要省，关系到居住安全",
            "可以考虑分阶段装修，后期再升级软装"
          ];
        } else if (selectedLevel === "medium") {
          tips = [
            "中档装修是性价比最高的选择",
            "建议在主材上适当投入，工艺可选中等",
            "厨卫空间可以适当增加预算，提升生活品质"
          ];
        } else if (selectedLevel === "high") {
          tips = [
            "精装修建议选择专业设计师进行整体规划",
            "可以考虑智能家居系统的预埋",
            "注重环保材料的选择，保障居住健康"
          ];
        } else {
          tips = [
            "豪装建议聘请知名设计师团队",
            "可以定制高端家具和进口主材",
            "考虑引入智能家居和全屋定制系统"
          ];
        }
        tips.push("建议保留10-15%的备用金应对突发情况");

        var tipsList = document.getElementById("tipsList");
        while (tipsList.firstChild) {
          tipsList.removeChild(tipsList.firstChild);
        }
        tips.forEach(function (tip) {
          var li = document.createElement("li");
          li.textContent = "💡 " + tip;
          tipsList.appendChild(li);
        });
      }

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
    
