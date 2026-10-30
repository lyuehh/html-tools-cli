// @ts-nocheck
// Generated from tools/food/wine-pairing.html
// Source SHA-256: 901db58a53fe9c5f557f20b55742b06fca237ec2f2092beca9cbd9c8c442db00
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const foods = [
        {
          id: "steak",
          name: "牛排",
          cat: "meat",
          desc: "西冷/肋眼",
          wines: [
            { name: "赤霞珠", type: "红葡萄酒 - 饱满", reason: "强单宁平衡牛肉油脂", score: 5 },
            {
              name: "马尔贝克",
              type: "红葡萄酒 - 饱满",
              reason: "果味浓郁，与烤肉完美搭配",
              score: 5
            },
            { name: "西拉", type: "红葡萄酒 - 饱满", reason: "辛香料风味增添层次", score: 4 }
          ]
        },
        {
          id: "lamb",
          name: "羊肉",
          cat: "meat",
          desc: "烤羊排/羊腿",
          wines: [
            { name: "波尔多混酿", type: "红葡萄酒 - 饱满", reason: "经典搭配，单宁柔和", score: 5 },
            { name: "巴罗洛", type: "红葡萄酒 - 饱满", reason: "高酸度平衡羊肉膻味", score: 4 },
            { name: "歌海娜", type: "红葡萄酒 - 中等", reason: "果味丰富，香料感强", score: 4 }
          ]
        },
        {
          id: "pork",
          name: "猪肉",
          cat: "meat",
          desc: "烤猪/猪排",
          wines: [
            {
              name: "黑皮诺",
              type: "红葡萄酒 - 轻盈",
              reason: "轻盈酒体不会掩盖猪肉风味",
              score: 5
            },
            { name: "雷司令", type: "白葡萄酒 - 芳香", reason: "甜度平衡猪肉的咸香", score: 4 },
            { name: "仙粉黛", type: "红葡萄酒 - 饱满", reason: "果酱风味与烤肉很配", score: 4 }
          ]
        },
        {
          id: "chicken",
          name: "鸡肉",
          cat: "meat",
          desc: "烤鸡/白切鸡",
          wines: [
            { name: "霞多丽", type: "白葡萄酒 - 饱满", reason: "奶油质感与鸡肉很搭", score: 5 },
            { name: "黑皮诺", type: "红葡萄酒 - 轻盈", reason: "轻盈红酒的好选择", score: 4 },
            { name: "长相思", type: "白葡萄酒 - 清爽", reason: "草本香气增添清新感", score: 4 }
          ]
        },
        {
          id: "salmon",
          name: "三文鱼",
          cat: "seafood",
          desc: "煎/烤/刺身",
          wines: [
            {
              name: "黑皮诺",
              type: "红葡萄酒 - 轻盈",
              reason: "三文鱼是少数能配红酒的鱼",
              score: 5
            },
            { name: "霞多丽", type: "白葡萄酒 - 饱满", reason: "橡木桶陈酿版本更佳", score: 4 },
            { name: "桃红", type: "桃红葡萄酒", reason: "清爽又有足够结构", score: 4 }
          ]
        },
        {
          id: "lobster",
          name: "龙虾",
          cat: "seafood",
          desc: "清蒸/芝士焗",
          wines: [
            { name: "勃艮第白", type: "白葡萄酒 - 饱满", reason: "顶级霞多丽配顶级海鲜", score: 5 },
            { name: "香槟", type: "起泡酒", reason: "气泡清爽，矿物感强", score: 5 },
            { name: "阿尔萨斯灰皮诺", type: "白葡萄酒 - 饱满", reason: "丰富油润的口感", score: 4 }
          ]
        },
        {
          id: "oyster",
          name: "生蚝",
          cat: "seafood",
          desc: "新鲜生吃",
          wines: [
            { name: "夏布利", type: "白葡萄酒 - 清爽", reason: "矿物感与海水味完美契合", score: 5 },
            { name: "香槟", type: "起泡酒", reason: "经典奢华搭配", score: 5 },
            { name: "慕斯卡岱", type: "白葡萄酒 - 清爽", reason: "海边产区，天然搭配", score: 4 }
          ]
        },
        {
          id: "brie",
          name: "布里奶酪",
          cat: "cheese",
          desc: "软质白霉奶酪",
          wines: [
            { name: "香槟", type: "起泡酒", reason: "气泡切割奶油质感", score: 5 },
            { name: "霞多丽", type: "白葡萄酒 - 饱满", reason: "同样的奶油风味", score: 4 },
            { name: "博若莱", type: "红葡萄酒 - 轻盈", reason: "果味清新不冲突", score: 4 }
          ]
        },
        {
          id: "parmesan",
          name: "帕玛森",
          cat: "cheese",
          desc: "硬质陈年奶酪",
          wines: [
            { name: "基安蒂", type: "红葡萄酒 - 中等", reason: "意大利经典搭配", score: 5 },
            { name: "巴罗洛", type: "红葡萄酒 - 饱满", reason: "同样浓郁陈年", score: 4 },
            { name: "普罗塞克", type: "起泡酒", reason: "清爽对比浓郁", score: 4 }
          ]
        },
        {
          id: "sushi",
          name: "寿司",
          cat: "asian",
          desc: "日式生鱼片",
          wines: [
            { name: "香槟", type: "起泡酒", reason: "矿物感与海鲜很搭", score: 5 },
            { name: "雷司令", type: "白葡萄酒 - 芳香", reason: "微甜平衡酱油的咸", score: 4 },
            { name: "桃红", type: "桃红葡萄酒", reason: "清爽多变", score: 4 }
          ]
        },
        {
          id: "dimsum",
          name: "点心",
          cat: "asian",
          desc: "港式点心",
          wines: [
            { name: "雷司令", type: "白葡萄酒 - 芳香", reason: "微甜配各种点心", score: 5 },
            { name: "灰皮诺", type: "白葡萄酒 - 清爽", reason: "清爽不抢戏", score: 4 },
            { name: "普罗塞克", type: "起泡酒", reason: "节日氛围感", score: 4 }
          ]
        },
        {
          id: "curry",
          name: "咖喱",
          cat: "asian",
          desc: "印度/泰式咖喱",
          wines: [
            { name: "琼瑶浆", type: "白葡萄酒 - 芳香", reason: "香料对香料，荔枝香", score: 5 },
            { name: "雷司令", type: "白葡萄酒 - 芳香", reason: "甜度平衡辣度", score: 5 },
            { name: "歌海娜桃红", type: "桃红葡萄酒", reason: "果味丰富清爽", score: 4 }
          ]
        },
        {
          id: "chocolate",
          name: "巧克力",
          cat: "dessert",
          desc: "黑巧克力",
          wines: [
            { name: "波特酒", type: "加强酒 - 甜", reason: "浓郁甜美的经典搭配", score: 5 },
            { name: "巴纽尔斯", type: "加强酒 - 甜", reason: "法国巧克力酒的别称", score: 5 },
            { name: "仙粉黛晚收", type: "甜红葡萄酒", reason: "浆果配可可", score: 4 }
          ]
        },
        {
          id: "fruitcake",
          name: "水果蛋糕",
          cat: "dessert",
          desc: "新鲜水果",
          wines: [
            { name: "莫斯卡托", type: "甜白葡萄酒", reason: "清甜花香很配", score: 5 },
            { name: "苏玳", type: "贵腐甜酒", reason: "顶级甜点配顶级甜酒", score: 5 },
            { name: "冰酒", type: "甜酒", reason: "浓缩果味", score: 4 }
          ]
        }
      ];

      let currentCategory = "all";
      let selectedFood = null;

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
        const grid = document.getElementById("foodGrid");
        while (grid.firstChild) grid.removeChild(grid.firstChild);

        foods
          .filter(function (food) {
            const matchCat = currentCategory === "all" || food.cat === currentCategory;
            const matchSearch =
              food.name.toLowerCase().includes(search) || food.desc.toLowerCase().includes(search);
            return matchCat && matchSearch;
          })
          .forEach(function (food) {
            const item = document.createElement("div");
            item.className = "food-item";
            if (selectedFood && selectedFood.id === food.id) item.className += " selected";

            const name = document.createElement("div");
            name.className = "name";
            name.textContent = food.name;

            const desc = document.createElement("div");
            desc.className = "desc";
            desc.textContent = food.desc;

            item.appendChild(name);
            item.appendChild(desc);
            item.addEventListener("click", function () {
              selectFood(food);
            });
            grid.appendChild(item);
          });
      }

      function selectFood(food) {
        selectedFood = food;
        renderFoods();

        const result = document.getElementById("pairingResult");
        result.style.display = "block";
        document.getElementById("selectedFood").textContent = food.name + " 的推荐配酒";

        const wineList = document.getElementById("wineList");
        while (wineList.firstChild) wineList.removeChild(wineList.firstChild);

        food.wines.forEach(function (wine) {
          const item = document.createElement("div");
          item.className = "wine-item";

          const name = document.createElement("div");
          name.className = "wine-name";
          name.textContent = wine.name;

          const type = document.createElement("div");
          type.className = "wine-type";
          type.textContent = wine.type;

          const reason = document.createElement("div");
          reason.className = "wine-reason";
          reason.textContent = wine.reason;

          const score = document.createElement("div");
          score.className = "match-score";
          for (var i = 0; i < 5; i++) {
            const dot = document.createElement("div");
            dot.className = "match-dot";
            if (i < wine.score) dot.className += " filled";
            score.appendChild(dot);
          }

          item.appendChild(name);
          item.appendChild(type);
          item.appendChild(reason);
          item.appendChild(score);
          wineList.appendChild(item);
        });

        result.scrollIntoView({ behavior: "smooth" });
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
    
