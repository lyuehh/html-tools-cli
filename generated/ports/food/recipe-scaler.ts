// @ts-nocheck
// Generated from tools/food/recipe-scaler.html
// Source SHA-256: 2cfe9a11ccd18386b2d8d49f453589980e60d312f0cd449cd54526580b9fef1b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let scale = 1;

      function createIngredientItem(amount, unit, name) {
        const item = document.createElement("div");
        item.className = "ingredient-item";

        const amountInput = document.createElement("input");
        amountInput.type = "text";
        amountInput.placeholder = "数量";
        amountInput.className = "amount";
        amountInput.value = amount || "";
        amountInput.addEventListener("input", updateScaledList);

        const unitInput = document.createElement("input");
        unitInput.type = "text";
        unitInput.placeholder = "单位";
        unitInput.className = "unit";
        unitInput.value = unit || "";
        unitInput.addEventListener("input", updateScaledList);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "配料名称";
        nameInput.className = "name";
        nameInput.value = name || "";
        nameInput.addEventListener("input", updateScaledList);

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          item.remove();
          updateScaledList();
        });

        item.appendChild(amountInput);
        item.appendChild(unitInput);
        item.appendChild(nameInput);
        item.appendChild(removeBtn);

        return item;
      }

      function initIngredients() {
        const list = document.getElementById("ingredientList");
        list.appendChild(createIngredientItem("200", "克", "面粉"));
        list.appendChild(createIngredientItem("2", "个", "鸡蛋"));
        list.appendChild(createIngredientItem("50", "毫升", "牛奶"));
        updateScaledList();
      }

      function setScale(s) {
        scale = s;
        document.querySelectorAll(".scale-btn").forEach(function (btn) {
          btn.classList.toggle("active", parseFloat(btn.dataset.scale) === s);
        });
        const original = parseInt(document.getElementById("originalServings").value) || 4;
        document.getElementById("targetServings").value = Math.round(original * s);
        updateScaledList();
      }

      function updateScale() {
        const original = parseInt(document.getElementById("originalServings").value) || 4;
        document.getElementById("targetServings").value = Math.round(original * scale);
        updateScaledList();
      }

      function updateFromTarget() {
        const original = parseInt(document.getElementById("originalServings").value) || 4;
        const target = parseInt(document.getElementById("targetServings").value) || 4;
        scale = target / original;
        document.querySelectorAll(".scale-btn").forEach(function (btn) {
          btn.classList.toggle("active", parseFloat(btn.dataset.scale) === scale);
        });
        updateScaledList();
      }

      function addIngredient() {
        const list = document.getElementById("ingredientList");
        list.appendChild(createIngredientItem("", "", ""));
      }

      function updateScaledList() {
        const items = document.querySelectorAll(".ingredient-item");
        const scaledList = document.getElementById("scaledList");
        while (scaledList.firstChild) scaledList.removeChild(scaledList.firstChild);

        items.forEach(function (item) {
          const amount = parseFloat(item.querySelector(".amount").value) || 0;
          const unit = item.querySelector(".unit").value;
          const name = item.querySelector(".name").value;

          if (name) {
            const scaledAmount = amount * scale;
            const formatted =
              scaledAmount % 1 === 0
                ? scaledAmount.toString()
                : scaledAmount.toFixed(2).replace(/\.?0+$/, "");

            const div = document.createElement("div");
            div.className = "scaled-item";

            const nameSpan = document.createElement("span");
            nameSpan.textContent = name;

            const amountSpan = document.createElement("span");
            amountSpan.className = "scaled-amount";
            amountSpan.textContent = formatted + " " + unit;

            div.appendChild(nameSpan);
            div.appendChild(amountSpan);
            scaledList.appendChild(div);
          }
        });

        document.getElementById("scaleFactor").textContent =
          scale % 1 === 0 ? scale + "x" : scale.toFixed(2) + "x";
      }

      function copyScaled() {
        const items = document.querySelectorAll(".scaled-item");
        let text = "配方 (" + document.getElementById("targetServings").value + "人份)\n";
        text += "--------------------\n";
        items.forEach(function (item) {
          const name = item.querySelector("span:first-child").textContent;
          const amount = item.querySelector(".scaled-amount").textContent;
          text += name + ": " + amount + "\n";
        });
        navigator.clipboard.writeText(text).then(function () {
          alert("已复制到剪贴板");
        });
      }

      function clearAll() {
        const list = document.getElementById("ingredientList");
        while (list.firstChild) list.removeChild(list.firstChild);
        list.appendChild(createIngredientItem("", "", ""));
        updateScaledList();
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
    
