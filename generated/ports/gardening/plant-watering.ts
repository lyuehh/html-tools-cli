// @ts-nocheck
// Generated from tools/gardening/plant-watering.html
// Source SHA-256: f86c9186a88737675f697e95cf4c2b7dbecd9c3a3ca69f1587a3f038bf9d37e3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let plants = JSON.parse(localStorage.getItem("plant_watering") || "[]");

      function showForm() {
        document.getElementById("addForm").classList.add("show");
        document.getElementById("plantName").focus();
      }

      function hideForm() {
        document.getElementById("addForm").classList.remove("show");
        document.getElementById("plantName").value = "";
        document.getElementById("plantType").value = "";
        document.getElementById("waterInterval").value = "3";
      }

      function addPlant() {
        const name = document.getElementById("plantName").value.trim();
        const type = document.getElementById("plantType").value;
        const interval = parseInt(document.getElementById("waterInterval").value);

        if (!name || !type) {
          alert("请填写植物名称和类型");
          return;
        }

        plants.push({
          id: Date.now(),
          name,
          type,
          interval,
          lastWatered: new Date().toISOString(),
          history: [new Date().toISOString()]
        });

        localStorage.setItem("plant_watering", JSON.stringify(plants));
        hideForm();
        render();
      }

      function waterPlant(id) {
        const plant = plants.find((p) => p.id === id);
        if (plant) {
          plant.lastWatered = new Date().toISOString();
          plant.history.push(plant.lastWatered);
          localStorage.setItem("plant_watering", JSON.stringify(plants));
          render();
        }
      }

      function deletePlant(id) {
        if (confirm("确定要删除这个植物吗？")) {
          plants = plants.filter((p) => p.id !== id);
          localStorage.setItem("plant_watering", JSON.stringify(plants));
          render();
        }
      }

      function getDaysUntilWater(plant) {
        const lastWatered = new Date(plant.lastWatered);
        const nextWater = new Date(lastWatered);
        nextWater.setDate(nextWater.getDate() + plant.interval);

        const now = new Date();
        const diffMs = nextWater - now;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        return diffDays;
      }

      function getStatus(daysUntil) {
        if (daysUntil < 0) return { class: "overdue", text: "需要浇水", icon: "🚨" };
        if (daysUntil === 0) return { class: "soon", text: "今天浇水", icon: "⏰" };
        if (daysUntil === 1) return { class: "soon", text: "明天浇水", icon: "📅" };
        return { class: "ok", text: `${daysUntil}天后浇水`, icon: "✅" };
      }

      function formatDate(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "今天";
        if (diffDays === 1) return "昨天";
        if (diffDays < 7) return `${diffDays}天前`;

        return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
      }

      function render() {
        const list = document.getElementById("plantsList");

        if (plants.length === 0) {
          list.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">🪴</div>
            <div>还没有添加植物</div>
            <div style="font-size:.85rem;margin-top:.25rem">点击下方按钮开始管理你的植物</div>
          </div>
        `;
          return;
        }

        // Sort plants by days until water (overdue first)
        const sortedPlants = [...plants].sort((a, b) => {
          return getDaysUntilWater(a) - getDaysUntilWater(b);
        });

        list.innerHTML = sortedPlants
          .map((plant) => {
            const daysUntil = getDaysUntilWater(plant);
            const status = getStatus(daysUntil);
            const lastWatered = formatDate(plant.lastWatered);
            const nextWater = new Date(plant.lastWatered);
            nextWater.setDate(nextWater.getDate() + plant.interval);

            return `
          <div class="plant-card ${status.class}">
            <div class="plant-header">
              <div class="plant-info">
                <div class="plant-name">${plant.name}</div>
                <div class="plant-type">${plant.type}</div>
                <span class="status-badge ${status.class}">${status.icon} ${status.text}</span>
              </div>
              <div class="plant-actions">
                <button class="action-btn" onclick="deletePlant(${plant.id})" title="删除">🗑️</button>
              </div>
            </div>
            <div class="plant-details">
              <div class="detail-item">
                <div class="detail-label">上次浇水</div>
                <div class="detail-value">${lastWatered}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">下次浇水</div>
                <div class="detail-value">${nextWater.toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">浇水间隔</div>
                <div class="detail-value">${plant.interval} 天</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">浇水次数</div>
                <div class="detail-value">${plant.history.length} 次</div>
              </div>
            </div>
            <button class="water-btn ${daysUntil > 1 ? "" : "watered"}" onclick="waterPlant(${plant.id})">
              ${daysUntil <= 0 ? "💧 立即浇水" : "💧 已浇水"}
            </button>
          </div>
        `;
          })
          .join("");
      }

      // Check for overdue plants on load
      function checkOverdue() {
        const overduePlants = plants.filter((p) => getDaysUntilWater(p) < 0);
        if (overduePlants.length > 0 && Notification.permission === "granted") {
          new Notification("植物需要浇水 🌱", {
            body: `${overduePlants.length} 个植物需要浇水了！`,
            icon: "🌱"
          });
        }
      }

      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }

      // Initialize
      render();
      checkOverdue();

      // Handle Enter key
      document.getElementById("plantName").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addPlant();
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
    
