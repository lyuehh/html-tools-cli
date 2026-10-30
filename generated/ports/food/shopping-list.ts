// @ts-nocheck
// Generated from tools/food/shopping-list.html
// Source SHA-256: 0184a163feef442eba79d4560800410b12364adce44f246aadd8f06d4a1c47b8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const categories = {
        produce: { name: "蔬果", icon: "🥬" },
        meat: { name: "肉类", icon: "🥩" },
        dairy: { name: "乳制品", icon: "🥛" },
        bakery: { name: "烘焙", icon: "🍞" },
        pantry: { name: "杂货", icon: "🏪" },
        household: { name: "日用品", icon: "🧹" }
      };

      let items = JSON.parse(localStorage.getItem("shoppingList") || "[]");
      let currentFilter = "all";

      function saveItems() {
        localStorage.setItem("shoppingList", JSON.stringify(items));
      }

      function handleKeyPress(e) {
        if (e.key === "Enter") addItem();
      }

      function addItem() {
        const input = document.getElementById("itemInput");
        const name = input.value.trim();
        if (!name) return;

        const category = guessCategory(name);
        items.push({ id: Date.now(), name: name, category: category, checked: false });
        input.value = "";
        saveItems();
        renderList();
      }

      function quickAdd(name, category) {
        items.push({ id: Date.now(), name: name, category: category, checked: false });
        saveItems();
        renderList();
      }

      function guessCategory(name) {
        const keywords = {
          produce: [
            "菜",
            "果",
            "蔬",
            "瓜",
            "萝卜",
            "白菜",
            "青菜",
            "苹果",
            "香蕉",
            "橙",
            "葱",
            "姜",
            "蒜"
          ],
          meat: ["肉", "鸡", "鱼", "虾", "牛", "猪", "羊", "排骨", "鸭"],
          dairy: ["奶", "蛋", "酸奶", "芝士", "黄油", "奶酪"],
          bakery: ["面包", "蛋糕", "饼干", "糕点"],
          pantry: ["米", "面", "油", "盐", "酱", "醋", "糖", "调料", "酱油", "醋"],
          household: ["纸", "洗", "清洁", "垃圾袋", "保鲜", "洗衣", "牙"]
        };

        for (var cat in keywords) {
          if (keywords.hasOwnProperty(cat)) {
            for (var i = 0; i < keywords[cat].length; i++) {
              if (name.includes(keywords[cat][i])) return cat;
            }
          }
        }
        return "pantry";
      }

      function toggleItem(id) {
        items = items.map(function (item) {
          if (item.id === id) item.checked = !item.checked;
          return item;
        });
        saveItems();
        renderList();
      }

      function deleteItem(id) {
        items = items.filter(function (item) {
          return item.id !== id;
        });
        saveItems();
        renderList();
      }

      function filterCategory(cat) {
        currentFilter = cat;
        document.querySelectorAll(".filter-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.cat === cat);
        });
        renderList();
      }

      function clearChecked() {
        items = items.filter(function (item) {
          return !item.checked;
        });
        saveItems();
        renderList();
      }

      function copyList() {
        const unchecked = items.filter(function (item) {
          return !item.checked;
        });
        let text = "购物清单\n" + "=".repeat(20) + "\n";

        for (var cat in categories) {
          if (categories.hasOwnProperty(cat)) {
            const catItems = unchecked.filter(function (item) {
              return item.category === cat;
            });
            if (catItems.length > 0) {
              text += "\n" + categories[cat].icon + " " + categories[cat].name + "\n";
              catItems.forEach(function (item) {
                text += "  - " + item.name + "\n";
              });
            }
          }
        }

        navigator.clipboard.writeText(text).then(function () {
          alert("已复制到剪贴板");
        });
      }

      function renderList() {
        const list = document.getElementById("shoppingList");
        while (list.firstChild) list.removeChild(list.firstChild);

        const filtered =
          currentFilter === "all"
            ? items
            : items.filter(function (item) {
                return item.category === currentFilter;
              });

        const grouped = {};
        filtered.forEach(function (item) {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });

        for (var cat in categories) {
          if (categories.hasOwnProperty(cat) && grouped[cat] && grouped[cat].length > 0) {
            const section = document.createElement("div");
            section.className = "category-section";

            const header = document.createElement("div");
            header.className = "category-header";
            const h3 = document.createElement("h3");
            h3.textContent = categories[cat].icon + " " + categories[cat].name;
            const count = document.createElement("span");
            count.className = "count";
            count.textContent = grouped[cat].length;
            header.appendChild(h3);
            header.appendChild(count);

            const itemList = document.createElement("div");
            itemList.className = "item-list";

            grouped[cat].forEach(function (item) {
              const itemEl = document.createElement("div");
              itemEl.className = "shopping-item" + (item.checked ? " checked" : "");

              const checkbox = document.createElement("div");
              checkbox.className = "item-checkbox" + (item.checked ? " checked" : "");
              checkbox.addEventListener("click", function () {
                toggleItem(item.id);
              });

              const name = document.createElement("span");
              name.className = "item-name";
              name.textContent = item.name;

              const deleteBtn = document.createElement("button");
              deleteBtn.className = "item-delete";
              deleteBtn.textContent = "×";
              deleteBtn.addEventListener("click", function () {
                deleteItem(item.id);
              });

              itemEl.appendChild(checkbox);
              itemEl.appendChild(name);
              itemEl.appendChild(deleteBtn);
              itemList.appendChild(itemEl);
            });

            section.appendChild(header);
            section.appendChild(itemList);
            list.appendChild(section);
          }
        }

        const total = items.length;
        const checked = items.filter(function (item) {
          return item.checked;
        }).length;
        document.getElementById("progressText").textContent = checked + " / " + total + " 已完成";
        document.getElementById("progressFill").style.width =
          (total > 0 ? (checked / total) * 100 : 0) + "%";
      }

      renderList();

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
    
