// @ts-nocheck
// Generated from tools/food/nutrition-calculator.html
// Source SHA-256: 2e51f6daab4ea35b3666611304b1657289a25e39a30cea31db9e7dbc3d9a62b8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const presets = {
        rice: { name: "米饭", cal: 116, carb: 25.6, protein: 2.6, fat: 0.3 },
        bread: { name: "面包", cal: 266, carb: 49, protein: 8.8, fat: 3.2 },
        egg: { name: "鸡蛋", cal: 144, carb: 1.5, protein: 12.8, fat: 9.9 },
        chicken: { name: "鸡胸肉", cal: 133, carb: 0, protein: 29.6, fat: 1.2 },
        beef: { name: "牛肉", cal: 125, carb: 0, protein: 22.3, fat: 4.2 },
        milk: { name: "牛奶", cal: 54, carb: 3.4, protein: 3, fat: 3.2 },
        apple: { name: "苹果", cal: 52, carb: 13.8, protein: 0.3, fat: 0.2 },
        banana: { name: "香蕉", cal: 89, carb: 23, protein: 1.1, fat: 0.3 }
      };

      function createFoodItem(name, weight, cal, carb, protein, fat) {
        const item = document.createElement("div");
        item.className = "form-row food-item";
        if (carb !== undefined) item.dataset.carb = carb;
        if (protein !== undefined) item.dataset.protein = protein;
        if (fat !== undefined) item.dataset.fat = fat;

        const nameGroup = document.createElement("div");
        nameGroup.className = "form-group";
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "食物名称";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "food-name";
        nameInput.placeholder = "输入食物";
        nameInput.value = name || "";
        nameInput.addEventListener("input", calculate);
        nameGroup.appendChild(nameLabel);
        nameGroup.appendChild(nameInput);

        const weightGroup = document.createElement("div");
        weightGroup.className = "form-group";
        const weightLabel = document.createElement("label");
        weightLabel.textContent = "重量(克)";
        const weightInput = document.createElement("input");
        weightInput.type = "number";
        weightInput.className = "food-weight";
        weightInput.value = weight || 100;
        weightInput.addEventListener("input", calculate);
        weightGroup.appendChild(weightLabel);
        weightGroup.appendChild(weightInput);

        const calGroup = document.createElement("div");
        calGroup.className = "form-group";
        const calLabel = document.createElement("label");
        calLabel.textContent = "热量/100g";
        const calInput = document.createElement("input");
        calInput.type = "number";
        calInput.className = "food-cal";
        calInput.placeholder = "kcal";
        calInput.value = cal || "";
        calInput.addEventListener("input", calculate);
        calGroup.appendChild(calLabel);
        calGroup.appendChild(calInput);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          item.remove();
          calculate();
        });

        item.appendChild(nameGroup);
        item.appendChild(weightGroup);
        item.appendChild(calGroup);
        item.appendChild(removeBtn);

        return item;
      }

      function addPreset(type) {
        const preset = presets[type];
        const list = document.getElementById("foodList");
        list.appendChild(
          createFoodItem(preset.name, 100, preset.cal, preset.carb, preset.protein, preset.fat)
        );
        calculate();
      }

      function addFood() {
        const list = document.getElementById("foodList");
        list.appendChild(createFoodItem("", 100, ""));
      }

      function calculate() {
        const items = document.querySelectorAll(".food-item");
        let totalCal = 0,
          totalCarb = 0,
          totalProtein = 0,
          totalFat = 0;

        items.forEach(function (item) {
          const weight = parseFloat(item.querySelector(".food-weight").value) || 0;
          const cal = parseFloat(item.querySelector(".food-cal").value) || 0;
          const ratio = weight / 100;

          totalCal += cal * ratio;

          if (item.dataset.carb) {
            totalCarb += parseFloat(item.dataset.carb) * ratio;
            totalProtein += parseFloat(item.dataset.protein) * ratio;
            totalFat += parseFloat(item.dataset.fat) * ratio;
          }
        });

        document.getElementById("totalCal").textContent = Math.round(totalCal);
        document.getElementById("totalCarb").textContent = totalCarb.toFixed(1) + "g";
        document.getElementById("totalProtein").textContent = totalProtein.toFixed(1) + "g";
        document.getElementById("totalFat").textContent = totalFat.toFixed(1) + "g";

        const totalMacro = totalCarb * 4 + totalProtein * 4 + totalFat * 9;
        if (totalMacro > 0) {
          const carbP = (((totalCarb * 4) / totalMacro) * 100).toFixed(0);
          const proteinP = (((totalProtein * 4) / totalMacro) * 100).toFixed(0);
          const fatP = (((totalFat * 9) / totalMacro) * 100).toFixed(0);

          document.getElementById("carbPercent").textContent = carbP + "%";
          document.getElementById("proteinPercent").textContent = proteinP + "%";
          document.getElementById("fatPercent").textContent = fatP + "%";

          document.getElementById("carbBar").style.width = carbP + "%";
          document.getElementById("proteinBar").style.width = proteinP + "%";
          document.getElementById("fatBar").style.width = fatP + "%";
        }
      }

      addFood();
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
    
