// @ts-nocheck
// Generated from tools/food/serving-size.html
// Source SHA-256: 103af6a653dd9d0c3452acecae2b5df33e24e52c7aa130d546fdcc908a604f13
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const baseAmounts = {
        casual: {
          protein: [
            { name: "肉类", base: 150, unit: "克/人" },
            { name: "鱼/海鲜", base: 120, unit: "克/人" }
          ],
          sides: [
            { name: "沙拉", base: 80, unit: "克/人" },
            { name: "熟蔬菜", base: 100, unit: "克/人" }
          ],
          starch: [
            { name: "米饭", base: 80, unit: "克/人" },
            { name: "面包", base: 60, unit: "克/人" }
          ],
          drinks: [
            { name: "饮料", base: 300, unit: "毫升/人" },
            { name: "水", base: 200, unit: "毫升/人" }
          ]
        },
        dinner: {
          protein: [
            { name: "主菜肉类", base: 200, unit: "克/人" },
            { name: "前菜", base: 80, unit: "克/人" }
          ],
          sides: [
            { name: "配菜", base: 120, unit: "克/人" },
            { name: "沙拉", base: 60, unit: "克/人" }
          ],
          starch: [
            { name: "主食", base: 100, unit: "克/人" },
            { name: "面包", base: 40, unit: "克/人" }
          ],
          drinks: [
            { name: "葡萄酒", base: 250, unit: "毫升/人" },
            { name: "水/饮料", base: 300, unit: "毫升/人" }
          ]
        },
        bbq: {
          protein: [
            { name: "牛肉", base: 200, unit: "克/人" },
            { name: "鸡肉", base: 150, unit: "克/人" },
            { name: "香肠", base: 100, unit: "克/人" }
          ],
          sides: [
            { name: "沙拉", base: 100, unit: "克/人" },
            { name: "烤蔬菜", base: 80, unit: "克/人" }
          ],
          starch: [
            { name: "面包/馒头", base: 80, unit: "克/人" },
            { name: "玉米", base: 1, unit: "根/人" }
          ],
          drinks: [
            { name: "啤酒", base: 500, unit: "毫升/人" },
            { name: "软饮/水", base: 400, unit: "毫升/人" }
          ]
        },
        buffet: {
          protein: [
            { name: "荤菜(多种)", base: 180, unit: "克/人" },
            { name: "海鲜", base: 100, unit: "克/人" }
          ],
          sides: [
            { name: "蔬菜/沙拉", base: 150, unit: "克/人" },
            { name: "凉菜", base: 80, unit: "克/人" }
          ],
          starch: [
            { name: "主食(多种)", base: 120, unit: "克/人" },
            { name: "点心", base: 60, unit: "克/人" }
          ],
          drinks: [
            { name: "各类饮品", base: 400, unit: "毫升/人" },
            { name: "茶/咖啡", base: 200, unit: "毫升/人" }
          ]
        }
      };

      let guests = 10;
      let currentEvent = "casual";

      function setEvent(event) {
        currentEvent = event;
        document.querySelectorAll(".tab-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.event === event);
        });
        calculate();
      }

      function changeGuests(delta) {
        guests = Math.max(1, guests + delta);
        document.getElementById("guestCount").textContent = guests;
        calculate();
      }

      function calculate() {
        const duration = parseInt(document.getElementById("duration").value);
        const data = baseAmounts[currentEvent];

        let multiplier = 1;
        const durationMultiplier = 1 + (duration - 2) * 0.15;

        document.querySelectorAll(".check-item").forEach(function (item) {
          const checkbox = item.querySelector("input");
          item.classList.toggle("active", checkbox.checked);

          if (checkbox.checked) {
            const factor = item.dataset.factor;
            if (factor === "appetite") multiplier *= 1.2;
            if (factor === "kids") multiplier *= 0.85;
            if (factor === "elderly") multiplier *= 0.9;
            if (factor === "alcohol") multiplier *= 0.9;
          }
        });

        multiplier *= durationMultiplier;

        renderGrid("proteinGrid", data.protein, multiplier);
        renderGrid("sidesGrid", data.sides, multiplier);
        renderGrid("starchGrid", data.starch, multiplier);
        renderGrid("drinksGrid", data.drinks, multiplier);

        document.getElementById("totalEstimate").textContent =
          "基于" + guests + "位客人，" + duration + "小时聚餐";
      }

      function renderGrid(gridId, items, multiplier) {
        const grid = document.getElementById(gridId);
        while (grid.firstChild) grid.removeChild(grid.firstChild);

        items.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "food-item";

          const name = document.createElement("div");
          name.className = "name";
          name.textContent = item.name;

          const total = Math.round(item.base * guests * multiplier);
          const amount = document.createElement("div");
          amount.className = "amount";

          if (item.unit.includes("毫升")) {
            if (total >= 1000) {
              amount.textContent = (total / 1000).toFixed(1) + " 升";
            } else {
              amount.textContent = total + " 毫升";
            }
          } else if (item.unit.includes("克")) {
            if (total >= 1000) {
              amount.textContent = (total / 1000).toFixed(1) + " 公斤";
            } else {
              amount.textContent = total + " 克";
            }
          } else {
            amount.textContent = total + " " + item.unit.split("/")[0];
          }

          const unit = document.createElement("div");
          unit.className = "unit";
          unit.textContent = "约 " + item.base + " " + item.unit;

          div.appendChild(name);
          div.appendChild(amount);
          div.appendChild(unit);
          grid.appendChild(div);
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
    
