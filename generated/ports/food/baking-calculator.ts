// @ts-nocheck
// Generated from tools/food/baking-calculator.html
// Source SHA-256: 4bead9fcb89d66d5e1a3e056dadd466944554becb27b8f66dba7a60c99f6ab4d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const recipes = {
        bread: {
          name: "基础面包",
          ratios: { flour: 100, water: 65, yeast: 1, salt: 2, sugar: 3, oil: 3 },
          names: {
            flour: "高筋面粉",
            water: "水",
            yeast: "酵母",
            salt: "盐",
            sugar: "糖",
            oil: "油"
          },
          tips: [
            "水温: 夏天用冷水，冬天用温水(35-40°C)",
            "发酵: 一发至2倍大，约60-90分钟",
            "烘烤: 180°C预热，烤25-30分钟"
          ]
        },
        baguette: {
          name: "法棍",
          ratios: { flour: 100, water: 70, yeast: 0.5, salt: 2 },
          names: { flour: "高筋面粉", water: "水", yeast: "干酵母", salt: "盐" },
          tips: [
            "特点: 高水量、长时间发酵",
            "发酵: 冷藏发酵12-24小时风味更佳",
            "烘烤: 230°C，蒸汽烘烤20-25分钟"
          ]
        },
        brioche: {
          name: "布里欧修",
          ratios: { flour: 100, water: 10, egg: 40, butter: 50, yeast: 2, salt: 2, sugar: 15 },
          names: {
            flour: "高筋面粉",
            water: "牛奶",
            egg: "鸡蛋",
            butter: "黄油",
            yeast: "酵母",
            salt: "盐",
            sugar: "糖"
          },
          tips: ["黄油: 软化至可塑状态再加入", "揉面: 需充分揉出手套膜", "烘烤: 170°C，烤20-25分钟"]
        },
        pizza: {
          name: "披萨面团",
          ratios: { flour: 100, water: 60, yeast: 1, salt: 2, oil: 3 },
          names: { flour: "高筋面粉", water: "水", yeast: "干酵母", salt: "盐", oil: "橄榄油" },
          tips: [
            "面团: 可冷藏发酵1-3天增加风味",
            "厚度: 薄底约3mm，厚底约1cm",
            "烘烤: 最高温度，烤8-12分钟"
          ]
        },
        cake: {
          name: "海绵蛋糕",
          ratios: { flour: 100, egg: 150, sugar: 100, butter: 30 },
          names: { flour: "低筋面粉", egg: "鸡蛋", sugar: "细砂糖", butter: "黄油" },
          tips: [
            "打发: 全蛋隔水加热至38°C再打发",
            "混合: 用切拌手法，避免消泡",
            "烘烤: 170°C，烤30-35分钟"
          ]
        }
      };

      let currentRecipe = "bread";

      function setRecipe(recipe) {
        currentRecipe = recipe;
        document.querySelectorAll(".tab-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.recipe === recipe);
        });
        calculate();
      }

      function calculate() {
        const flour = parseFloat(document.getElementById("flourAmount").value) || 0;
        const recipe = recipes[currentRecipe];

        const ratioDisplay = document.getElementById("ratioDisplay");
        const ingredientList = document.getElementById("ingredientList");
        const tipsEl = document.getElementById("tips");

        while (ratioDisplay.firstChild) ratioDisplay.removeChild(ratioDisplay.firstChild);
        while (ingredientList.firstChild) ingredientList.removeChild(ingredientList.firstChild);
        while (tipsEl.firstChild) tipsEl.removeChild(tipsEl.firstChild);

        let total = 0;

        for (var key in recipe.ratios) {
          if (recipe.ratios.hasOwnProperty(key)) {
            const percent = recipe.ratios[key];
            const amount = (flour * percent) / 100;
            total += amount;

            const ratioDiv = document.createElement("div");
            ratioDiv.className = "ratio-item";

            const nameDiv = document.createElement("div");
            nameDiv.className = "name";
            nameDiv.textContent = recipe.names[key];

            const percentDiv = document.createElement("div");
            percentDiv.className = "percent";
            percentDiv.textContent = percent + "%";

            const amountDiv = document.createElement("div");
            amountDiv.className = "amount";
            amountDiv.textContent = amount.toFixed(1) + "g";

            ratioDiv.appendChild(nameDiv);
            ratioDiv.appendChild(percentDiv);
            ratioDiv.appendChild(amountDiv);
            ratioDisplay.appendChild(ratioDiv);

            const ingredientDiv = document.createElement("div");
            ingredientDiv.className = "ingredient-row";

            const ingredientName = document.createElement("span");
            ingredientName.className = "name";
            ingredientName.textContent = recipe.names[key];

            const ingredientValue = document.createElement("span");
            ingredientValue.className = "value";
            ingredientValue.textContent = amount.toFixed(1) + "g";

            ingredientDiv.appendChild(ingredientName);
            ingredientDiv.appendChild(ingredientValue);
            ingredientList.appendChild(ingredientDiv);
          }
        }

        document.getElementById("totalWeight").textContent = total.toFixed(0) + "g";

        recipe.tips.forEach(function (tip) {
          const tipLine = document.createElement("div");
          const parts = tip.split(": ");
          if (parts.length === 2) {
            const strong = document.createElement("strong");
            strong.textContent = parts[0] + ": ";
            tipLine.appendChild(strong);
            tipLine.appendChild(document.createTextNode(parts[1]));
          } else {
            tipLine.textContent = tip;
          }
          tipsEl.appendChild(tipLine);
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
    
