// @ts-nocheck
// Generated from tools/food/food-storage.html
// Source SHA-256: 51c60a69bddb37451751038f8eae1be5db9fe0a491d9792c89e802adaa8a8c7a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const foods = [
        {
          name: "鸡胸肉",
          cat: "meat",
          room: "2小时",
          fridge: "1-2天",
          freezer: "9个月",
          tips: "生鸡肉不要在室温放置超过2小时。冷藏时放在冰箱最冷的位置。冷冻前分装成小份更方便。"
        },
        {
          name: "牛排",
          cat: "meat",
          room: "2小时",
          fridge: "3-5天",
          freezer: "6-12个月",
          tips: "真空包装可延长冷藏时间。解冻后当天食用最佳。"
        },
        {
          name: "猪肉",
          cat: "meat",
          room: "2小时",
          fridge: "3-5天",
          freezer: "4-6个月",
          tips: "绞肉保存时间更短，冷藏只能1-2天。"
        },
        {
          name: "羊肉",
          cat: "meat",
          room: "2小时",
          fridge: "3-5天",
          freezer: "6-9个月",
          tips: "用保鲜膜包好再套保鲜袋，防止串味。"
        },
        {
          name: "培根/火腿",
          cat: "meat",
          room: "不推荐",
          fridge: "1周(开封后)",
          freezer: "1-2个月",
          tips: "开封后尽快食用。未开封可按包装日期。"
        },
        {
          name: "三文鱼",
          cat: "seafood",
          room: "不推荐",
          fridge: "1-2天",
          freezer: "2-3个月",
          tips: "买回后立即冷藏。寿司级需-20°C冷冻24小时杀虫。"
        },
        {
          name: "虾",
          cat: "seafood",
          room: "不推荐",
          fridge: "1-2天",
          freezer: "3-6个月",
          tips: "带壳冷冻保鲜效果更好。"
        },
        {
          name: "贝类",
          cat: "seafood",
          room: "不推荐",
          fridge: "1-2天",
          freezer: "3-4个月",
          tips: "活贝类不能密封，需要透气。死贝类要丢弃。"
        },
        {
          name: "鱼类",
          cat: "seafood",
          room: "不推荐",
          fridge: "1-2天",
          freezer: "6个月",
          tips: "用冰水清洗后擦干再保存。"
        },
        {
          name: "鸡蛋",
          cat: "dairy",
          room: "1周",
          fridge: "3-5周",
          freezer: "1年(打散后)",
          tips: "冰箱门温度波动大，最好放内层。蛋壳有裂缝的尽快食用。"
        },
        {
          name: "牛奶",
          cat: "dairy",
          room: "2小时",
          fridge: "开封后1周",
          freezer: "3个月",
          tips: "开封后尽快饮用。冷冻会改变质地，适合做烘焙。"
        },
        {
          name: "酸奶",
          cat: "dairy",
          room: "不推荐",
          fridge: "1-2周",
          freezer: "1-2个月",
          tips: "开封后3-5天内食用。冷冻后口感会变。"
        },
        {
          name: "奶酪(软)",
          cat: "dairy",
          room: "不推荐",
          fridge: "1-2周",
          freezer: "不推荐",
          tips: "用蜡纸包裹，保持透气。"
        },
        {
          name: "奶酪(硬)",
          cat: "dairy",
          room: "不推荐",
          fridge: "3-4周",
          freezer: "6个月",
          tips: "帕玛森等硬奶酪可以冷冻，用于烹饪。"
        },
        {
          name: "黄油",
          cat: "dairy",
          room: "1-2天",
          fridge: "1-3个月",
          freezer: "6-9个月",
          tips: "避光保存。无盐黄油保存时间更短。"
        },
        {
          name: "苹果",
          cat: "produce",
          room: "1周",
          fridge: "4-6周",
          freezer: "8个月(切片)",
          tips: "单独存放，苹果会释放乙烯加速其他水果成熟。"
        },
        {
          name: "香蕉",
          cat: "produce",
          room: "2-5天",
          fridge: "5-7天",
          freezer: "2-3个月",
          tips: "冷藏会变黑但不影响果肉。过熟的香蕉适合做烘焙。"
        },
        {
          name: "番茄",
          cat: "produce",
          room: "3-5天",
          fridge: "1-2周",
          freezer: "2-3个月",
          tips: "未熟透的室温保存更好。冷藏会影响风味。"
        },
        {
          name: "叶菜",
          cat: "produce",
          room: "几小时",
          fridge: "3-7天",
          freezer: "不推荐",
          tips: "用厨房纸包裹吸收水分，放入保鲜袋。"
        },
        {
          name: "土豆",
          cat: "produce",
          room: "2-3周",
          fridge: "不推荐",
          freezer: "10-12个月(熟)",
          tips: "避光保存防止发芽变绿。发芽部分有毒需切除。"
        },
        {
          name: "洋葱",
          cat: "produce",
          room: "2-3个月",
          fridge: "1-2个月(切后)",
          freezer: "8个月",
          tips: "干燥通风处保存。不要和土豆放一起。"
        },
        {
          name: "大蒜",
          cat: "produce",
          room: "3-5个月",
          fridge: "不推荐",
          freezer: "不推荐",
          tips: "整头保存比剥开更久。发芽后可以种起来吃蒜苗。"
        },
        {
          name: "米",
          cat: "pantry",
          room: "6个月-1年",
          fridge: "1年",
          freezer: "无限期",
          tips: "密封容器保存，防虫防潮。糙米保存时间较短。"
        },
        {
          name: "面粉",
          cat: "pantry",
          room: "6-8个月",
          fridge: "1年",
          freezer: "2年",
          tips: "密封保存。全麦面粉更容易变质。"
        },
        {
          name: "食用油",
          cat: "pantry",
          room: "开封后6个月",
          fridge: "1年",
          freezer: "不需要",
          tips: "避光避热保存。开封后尽快用完。"
        },
        {
          name: "酱油",
          cat: "pantry",
          room: "开封后6个月",
          fridge: "2年",
          freezer: "不需要",
          tips: "开封后冷藏保存风味更佳。"
        },
        {
          name: "罐头食品",
          cat: "pantry",
          room: "2-5年",
          fridge: "开封后3-4天",
          freezer: "2-3个月",
          tips: "未开封按包装日期。开封后转移到其他容器冷藏。"
        },
        {
          name: "米饭(熟)",
          cat: "cooked",
          room: "2小时",
          fridge: "4-6天",
          freezer: "6个月",
          tips: "尽快冷却后冷藏。重新加热要彻底。"
        },
        {
          name: "汤/炖菜",
          cat: "cooked",
          room: "2小时",
          fridge: "3-4天",
          freezer: "2-3个月",
          tips: "分装成小份冷冻更方便。"
        },
        {
          name: "披萨",
          cat: "cooked",
          room: "2小时",
          fridge: "3-4天",
          freezer: "1-2个月",
          tips: "用保鲜膜包好防止变干。"
        },
        {
          name: "面包",
          cat: "cooked",
          room: "5-7天",
          fridge: "不推荐",
          freezer: "3个月",
          tips: "冷藏会加速变硬。切片后冷冻更方便取用。"
        }
      ];

      let currentCategory = "all";
      let expandedFood = null;

      function setCategory(cat) {
        currentCategory = cat;
        document.querySelectorAll(".tab-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.cat === cat);
        });
        renderFoods();
      }

      function filterFoods() {
        renderFoods();
      }

      function renderFoods() {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const list = document.getElementById("foodList");
        while (list.firstChild) list.removeChild(list.firstChild);

        foods
          .filter(function (food) {
            const matchCat = currentCategory === "all" || food.cat === currentCategory;
            const matchSearch = food.name.toLowerCase().includes(search);
            return matchCat && matchSearch;
          })
          .forEach(function (food) {
            const item = document.createElement("div");
            item.className = "food-item";
            if (expandedFood === food.name) item.className += " expanded";

            const header = document.createElement("div");
            header.className = "food-header";

            const name = document.createElement("div");
            name.className = "food-name";
            name.textContent = food.name;

            const quick = document.createElement("div");
            quick.className = "food-quick";
            quick.textContent = "❄️ " + food.fridge;

            header.appendChild(name);
            header.appendChild(quick);

            const details = document.createElement("div");
            details.className = "food-details";

            const grid = document.createElement("div");
            grid.className = "storage-grid";

            var storageTypes = [
              { icon: "🌡️", label: "室温", time: food.room },
              { icon: "❄️", label: "冷藏", time: food.fridge },
              { icon: "🧊", label: "冷冻", time: food.freezer }
            ];

            storageTypes.forEach(function (st) {
              const storageItem = document.createElement("div");
              storageItem.className = "storage-item";

              const icon = document.createElement("div");
              icon.className = "icon";
              icon.textContent = st.icon;

              const label = document.createElement("div");
              label.className = "label";
              label.textContent = st.label;

              const time = document.createElement("div");
              time.className = "time";
              time.textContent = st.time;

              storageItem.appendChild(icon);
              storageItem.appendChild(label);
              storageItem.appendChild(time);
              grid.appendChild(storageItem);
            });

            const tips = document.createElement("div");
            tips.className = "storage-tips";
            const strong = document.createElement("strong");
            strong.textContent = "保存技巧: ";
            tips.appendChild(strong);
            tips.appendChild(document.createTextNode(food.tips));

            details.appendChild(grid);
            details.appendChild(tips);

            item.appendChild(header);
            item.appendChild(details);

            item.addEventListener("click", function () {
              if (expandedFood === food.name) {
                expandedFood = null;
              } else {
                expandedFood = food.name;
              }
              renderFoods();
            });

            list.appendChild(item);
          });
      }

      renderFoods();

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
    
