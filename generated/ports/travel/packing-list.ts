// @ts-nocheck
// Generated from tools/travel/packing-list.html
// Source SHA-256: 9b673763c7c4efb838f30040f0408cb230a4e072fdee9e2b29ab167a11e9b4cd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const packingData = {
        essentials: {
          name: "必备物品",
          items: ["身份证/护照", "手机及充电器", "钱包/信用卡", "钥匙", "旅行保险单"]
        },
        toiletries: {
          name: "洗漱用品",
          items: [
            "牙刷牙膏",
            "洗面奶",
            "洗发水/护发素",
            "沐浴露",
            "毛巾",
            "梳子",
            "护肤品",
            "防晒霜"
          ]
        },
        electronics: {
          name: "电子产品",
          items: ["充电宝", "数据线", "耳机", "相机", "转换插头"]
        },
        medicine: {
          name: "药品",
          items: ["感冒药", "肠胃药", "创可贴", "常用药物"]
        },
        clothing: {
          business: ["正装", "衬衫", "西裤/西裙", "皮鞋", "领带/丝巾", "内衣裤", "袜子", "睡衣"],
          leisure: ["T恤", "休闲裤", "短裤", "内衣裤", "袜子", "运动鞋", "拖鞋", "睡衣"],
          beach: ["泳衣", "沙滩裤", "防晒衣", "T恤", "短裤", "人字拖", "太阳帽", "墨镜"],
          hiking: ["速干衣", "冲锋衣", "登山裤", "登山鞋", "袜子", "帽子", "手套", "围巾"],
          winter: ["羽绒服", "毛衣", "保暖内衣", "厚裤子", "雪地靴", "帽子", "围巾", "手套"],
          city: ["休闲上衣", "牛仔裤", "外套", "舒适的鞋", "内衣裤", "袜子", "太阳镜"]
        },
        accessories: {
          business: ["笔记本电脑", "文件资料", "名片", "笔", "笔记本"],
          leisure: ["太阳镜", "帽子", "背包", "水壶"],
          beach: ["防水袋", "浮潜装备", "沙滩垫", "遮阳伞"],
          hiking: ["登山杖", "背包", "水壶", "头灯", "指南针", "帐篷", "睡袋"],
          winter: ["滑雪装备", "护目镜", "暖宝宝", "保温杯"],
          city: ["背包", "相机", "地图/导航", "雨伞"]
        }
      };

      let currentList = [];
      let checkedItems = new Set();

      function generateList() {
        const tripType = document.getElementById("tripType").value;
        const tripDays = document.getElementById("tripDays").value;
        const climate = document.getElementById("climate").value;

        currentList = [];
        checkedItems.clear();

        // Add essentials
        currentList.push({
          category: packingData.essentials.name,
          items: [...packingData.essentials.items]
        });

        // Add toiletries
        currentList.push({
          category: packingData.toiletries.name,
          items: [...packingData.toiletries.items]
        });

        // Add electronics
        currentList.push({
          category: packingData.electronics.name,
          items: [...packingData.electronics.items]
        });

        // Add medicine
        currentList.push({
          category: packingData.medicine.name,
          items: [...packingData.medicine.items]
        });

        // Add clothing based on trip type
        const clothingItems = [...packingData.clothing[tripType]];
        // Adjust quantity based on days
        if (tripDays === "8-14" || tripDays === "15+") {
          clothingItems.push("备用衣物");
        }
        // Add climate-specific items
        if (climate === "hot") {
          clothingItems.push("防晒衣", "凉鞋");
        } else if (climate === "cold") {
          clothingItems.push("保暖内衣", "厚外套");
        }
        currentList.push({ category: "衣物", items: clothingItems });

        // Add accessories based on trip type
        currentList.push({ category: "配件装备", items: [...packingData.accessories[tripType]] });

        // Add custom category
        currentList.push({ category: "自定义物品", items: [] });

        renderChecklist();
        document.getElementById("resultSection").classList.remove("hidden");
        updateStats();
      }

      function renderChecklist() {
        const container = document.getElementById("checklist");
        container.innerHTML = "";

        currentList.forEach((category, catIndex) => {
          if (category.items.length === 0 && category.category !== "自定义物品") return;

          const catDiv = document.createElement("div");
          catDiv.className = "checklist-category";
          catDiv.innerHTML = `<div class="category-title">${category.category}</div>`;

          category.items.forEach((item, itemIndex) => {
            const itemId = `${catIndex}-${itemIndex}`;
            const isChecked = checkedItems.has(itemId);

            const itemDiv = document.createElement("div");
            itemDiv.className = `checklist-item${isChecked ? " checked" : ""}`;
            itemDiv.innerHTML = `
              <input type="checkbox" ${isChecked ? "checked" : ""} onchange="toggleItem('${itemId}')">
              <span>${item}</span>
              <button class="delete-btn" onclick="deleteItem(${catIndex}, ${itemIndex})" title="删除" aria-label="×">×</button>
            `;
            catDiv.appendChild(itemDiv);
          });

          container.appendChild(catDiv);
        });
      }

      function toggleItem(itemId) {
        if (checkedItems.has(itemId)) {
          checkedItems.delete(itemId);
        } else {
          checkedItems.add(itemId);
        }
        renderChecklist();
        updateStats();
      }

      function deleteItem(catIndex, itemIndex) {
        currentList[catIndex].items.splice(itemIndex, 1);
        checkedItems.clear(); // Reset checked items to avoid index issues
        renderChecklist();
        updateStats();
      }

      function addCustomItem() {
        const input = document.getElementById("newItem");
        const value = input.value.trim();
        if (!value) return;

        // Find or create custom category
        let customCat = currentList.find((c) => c.category === "自定义物品");
        if (!customCat) {
          customCat = { category: "自定义物品", items: [] };
          currentList.push(customCat);
        }
        customCat.items.push(value);

        input.value = "";
        renderChecklist();
        updateStats();
      }

      function updateStats() {
        const totalItems = currentList.reduce((sum, cat) => sum + cat.items.length, 0);
        const packedCount = checkedItems.size;
        const percent = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("packedItems").textContent = packedCount;
        document.getElementById("progressPercent").textContent = percent + "%";
      }

      function clearAll() {
        currentList = [];
        checkedItems.clear();
        document.getElementById("resultSection").classList.add("hidden");
      }

      function exportList() {
        let text = "行李清单\n" + "=".repeat(30) + "\n\n";
        currentList.forEach((category) => {
          if (category.items.length === 0) return;
          text += `【${category.category}】\n`;
          category.items.forEach((item, index) => {
            const itemId = `${currentList.indexOf(category)}-${index}`;
            const checked = checkedItems.has(itemId) ? "✓" : "○";
            text += `${checked} ${item}\n`;
          });
          text += "\n";
        });

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "行李清单.txt";
        a.click();
        URL.revokeObjectURL(url);
      }

      function copyList() {
        let text = "行李清单\n\n";
        currentList.forEach((category) => {
          if (category.items.length === 0) return;
          text += `【${category.category}】\n`;
          category.items.forEach((item, index) => {
            const itemId = `${currentList.indexOf(category)}-${index}`;
            const checked = checkedItems.has(itemId) ? "✓" : "○";
            text += `${checked} ${item}\n`;
          });
          text += "\n";
        });

        navigator.clipboard.writeText(text).then(() => {
          alert("清单已复制到剪贴板！");
        });
      }

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
    
