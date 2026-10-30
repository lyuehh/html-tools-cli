// @ts-nocheck
// Generated from tools/food/recipe-converter.html
// Source SHA-256: dac3e874da3c9799c9556372a37351b9c8f7cdabbf96cf41ac3e9f6ec8605bf6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalServings = 4;
      let targetServings = 4;
      let ingredients = [
        { id: 1, name: "鸡蛋", amount: 4, unit: "个" },
        { id: 2, name: "面粉", amount: 200, unit: "g" },
        { id: 3, name: "牛奶", amount: 250, unit: "ml" },
        { id: 4, name: "白糖", amount: 50, unit: "g" },
        { id: 5, name: "黄油", amount: 30, unit: "g" }
      ];

      function parseAmount(str) {
        // Extract number and unit from string like "200g" or "2个"
        const match = str.match(/^([\d.]+)\s*(.*)$/);
        if (match) {
          return { amount: parseFloat(match[1]), unit: match[2] || "" };
        }
        return { amount: parseFloat(str) || 0, unit: "" };
      }

      function formatAmount(amount, unit) {
        // Round to 1 decimal place, remove .0 if whole number
        const rounded = Math.round(amount * 10) / 10;
        const formatted = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1);
        return formatted + (unit ? unit : "");
      }

      function changeServings(delta) {
        targetServings = Math.max(1, targetServings + delta);
        render();
      }

      function setServings(num) {
        targetServings = num;
        render();
      }

      function addIngredient() {
        const name = document.getElementById("ingredientName").value.trim();
        const amountStr = document.getElementById("ingredientAmount").value.trim();

        if (!name || !amountStr) {
          alert("请填写食材名称和数量");
          return;
        }

        const parsed = parseAmount(amountStr);
        ingredients.push({
          id: Date.now(),
          name,
          amount: parsed.amount,
          unit: parsed.unit
        });

        document.getElementById("ingredientName").value = "";
        document.getElementById("ingredientAmount").value = "";
        render();
      }

      function deleteIngredient(id) {
        ingredients = ingredients.filter((i) => i.id !== id);
        render();
      }

      function render() {
        document.getElementById("originalServings").textContent = originalServings;
        document.getElementById("targetServings").textContent = targetServings;

        const scaleFactor = targetServings / originalServings;
        document.getElementById("scaleInfo").innerHTML = `
        缩放比例: <span class="scale-factor">${scaleFactor.toFixed(2)}x</span>
      `;

        const list = document.getElementById("ingredientsList");
        if (ingredients.length === 0) {
          list.innerHTML = `
          <div style="text-align:center;padding:2rem;color:var(--text-muted)">
            <div style="font-size:2rem;margin-bottom:.5rem">🥘</div>
            <div>还没有添加食材</div>
            <div style="font-size:.85rem;margin-top:.25rem">使用下方输入框添加食材</div>
          </div>
        `;
          return;
        }

        list.innerHTML = ingredients
          .map((ing) => {
            const original = formatAmount(ing.amount, ing.unit);
            const converted = formatAmount(ing.amount * scaleFactor, ing.unit);

            return `
          <div class="ingredient-item">
            <div class="ingredient-name">
              ${ing.name}
              <button class="delete-btn" onclick="deleteIngredient(${ing.id})" title="删除">×</button>
            </div>
            <div class="ingredient-original">${original}</div>
            <div class="ingredient-converted">${converted}</div>
          </div>
        `;
          })
          .join("");
      }

      // Initialize
      render();

      // Handle Enter key
      document.getElementById("ingredientAmount").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addIngredient();
      });

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
    
