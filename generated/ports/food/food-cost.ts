// @ts-nocheck
// Generated from tools/food/food-cost.html
// Source SHA-256: fd081d1d4a73e71e088fd0442cbaaae7c8838329804401144d93a5fb7a366943
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function createIngredientRow(name, quantity, unit, unitPrice) {
        const row = document.createElement("div");
        row.className = "form-row ingredient-row";

        const nameGroup = document.createElement("div");
        nameGroup.className = "form-group";
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "食材名称";
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.className = "ingredient-name";
        nameInput.placeholder = "如：鸡胸肉";
        nameInput.value = name || "";
        nameInput.addEventListener("input", calculate);
        nameGroup.appendChild(nameLabel);
        nameGroup.appendChild(nameInput);

        const qtyGroup = document.createElement("div");
        qtyGroup.className = "form-group";
        const qtyLabel = document.createElement("label");
        qtyLabel.textContent = "用量";
        const qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.className = "ingredient-qty";
        qtyInput.placeholder = "100";
        qtyInput.value = quantity || "";
        qtyInput.addEventListener("input", calculate);
        qtyGroup.appendChild(qtyLabel);
        qtyGroup.appendChild(qtyInput);

        const unitGroup = document.createElement("div");
        unitGroup.className = "form-group";
        const unitLabel = document.createElement("label");
        unitLabel.textContent = "单位";
        const unitInput = document.createElement("input");
        unitInput.type = "text";
        unitInput.className = "ingredient-unit";
        unitInput.placeholder = "克";
        unitInput.value = unit || "";
        unitInput.addEventListener("input", calculate);
        unitGroup.appendChild(unitLabel);
        unitGroup.appendChild(unitInput);

        const priceGroup = document.createElement("div");
        priceGroup.className = "form-group";
        const priceLabel = document.createElement("label");
        priceLabel.textContent = "单价(¥)";
        const priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.className = "ingredient-price";
        priceInput.placeholder = "0.05";
        priceInput.step = "0.01";
        priceInput.value = unitPrice || "";
        priceInput.addEventListener("input", calculate);
        priceGroup.appendChild(priceLabel);
        priceGroup.appendChild(priceInput);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          row.remove();
          calculate();
        });

        row.appendChild(nameGroup);
        row.appendChild(qtyGroup);
        row.appendChild(unitGroup);
        row.appendChild(priceGroup);
        row.appendChild(removeBtn);

        return row;
      }

      function initIngredients() {
        const list = document.getElementById("ingredientList");
        list.appendChild(createIngredientRow("鸡胸肉", 200, "克", 0.025));
        list.appendChild(createIngredientRow("西兰花", 150, "克", 0.012));
        list.appendChild(createIngredientRow("橄榄油", 15, "毫升", 0.08));
        calculate();
      }

      function addIngredient() {
        const list = document.getElementById("ingredientList");
        list.appendChild(createIngredientRow("", "", "", ""));
      }

      function calculate() {
        const rows = document.querySelectorAll(".ingredient-row");
        let totalCost = 0;
        const breakdown = [];

        rows.forEach(function (row) {
          const name = row.querySelector(".ingredient-name").value;
          const qty = parseFloat(row.querySelector(".ingredient-qty").value) || 0;
          const unit = row.querySelector(".ingredient-unit").value;
          const price = parseFloat(row.querySelector(".ingredient-price").value) || 0;
          const cost = qty * price;
          totalCost += cost;

          if (name && cost > 0) {
            breakdown.push({ name: name, qty: qty, unit: unit, cost: cost });
          }
        });

        const servings = parseInt(document.getElementById("servings").value) || 1;
        const targetCostRate = parseFloat(document.getElementById("targetCostRate").value) || 30;
        const sellingPrice = parseFloat(document.getElementById("sellingPrice").value) || 0;

        const costPerServing = totalCost / servings;
        const suggestedPrice = costPerServing / (targetCostRate / 100);

        let actualCostRate = 0;
        let profitPerServing = 0;
        let profitMargin = 0;

        if (sellingPrice > 0) {
          actualCostRate = (costPerServing / sellingPrice) * 100;
          profitPerServing = sellingPrice - costPerServing;
          profitMargin = (profitPerServing / sellingPrice) * 100;
        }

        document.getElementById("totalCost").textContent = "¥" + totalCost.toFixed(2);
        document.getElementById("costPerServing").textContent = "¥" + costPerServing.toFixed(2);
        document.getElementById("suggestedPrice").textContent = "¥" + suggestedPrice.toFixed(2);
        document.getElementById("actualCostRate").textContent = actualCostRate.toFixed(1) + "%";
        document.getElementById("profitPerServing").textContent = "¥" + profitPerServing.toFixed(2);
        document.getElementById("profitMargin").textContent = profitMargin.toFixed(1) + "%";

        const breakdownEl = document.getElementById("costBreakdown");
        while (breakdownEl.firstChild) breakdownEl.removeChild(breakdownEl.firstChild);

        breakdown.sort(function (a, b) {
          return b.cost - a.cost;
        });

        breakdown.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "breakdown-item";

          const nameSpan = document.createElement("span");
          nameSpan.textContent = item.name + " (" + item.qty + item.unit + ")";

          const costSpan = document.createElement("span");
          costSpan.style.fontWeight = "600";
          const percent = totalCost > 0 ? ((item.cost / totalCost) * 100).toFixed(1) : 0;
          costSpan.textContent = "¥" + item.cost.toFixed(2) + " (" + percent + "%)";

          div.appendChild(nameSpan);
          div.appendChild(costSpan);
          breakdownEl.appendChild(div);
        });
      }

      initIngredients();

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
    
