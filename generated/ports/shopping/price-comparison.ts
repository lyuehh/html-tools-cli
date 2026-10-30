// @ts-nocheck
// Generated from tools/shopping/price-comparison.html
// Source SHA-256: ac9f24bf19d67c46990265bb195d975bfe9f8f29e05c8ac9ec1c0f8176080bf2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_price_comparison_v1";
      let items = [];

      function loadItems() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          items = saved ? JSON.parse(saved) : [];
        } catch (e) {
          items = [];
        }
        renderItems();
      }

      function saveItems() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }

      function handleEnter(event) {
        if (event.key === "Enter") {
          addItem();
        }
      }

      function addItem() {
        const name = document.getElementById("itemName").value.trim();
        const originalPrice = parseFloat(document.getElementById("originalPrice").value) || 0;
        const discount = parseFloat(document.getElementById("discount").value) || 0;
        const shipping = parseFloat(document.getElementById("shipping").value) || 0;

        if (!name || originalPrice <= 0) {
          alert("请输入商品名称和原价");
          return;
        }

        const discountAmount = originalPrice * (discount / 100);
        const finalPrice = originalPrice - discountAmount + shipping;

        items.push({
          id: Date.now(),
          name,
          originalPrice,
          discount,
          discountAmount,
          shipping,
          finalPrice
        });

        // Clear inputs
        document.getElementById("itemName").value = "";
        document.getElementById("originalPrice").value = "";
        document.getElementById("discount").value = "0";
        document.getElementById("shipping").value = "0";

        saveItems();
        renderItems();
      }

      function deleteItem(id) {
        items = items.filter((item) => item.id !== id);
        saveItems();
        renderItems();
      }

      function renderItems() {
        const container = document.getElementById("itemsGrid");

        if (items.length === 0) {
          container.innerHTML = `
          <div class="empty-state">
            <div class="icon">📦</div>
            <div>还没有添加商品<br>开始添加商品进行价格对比吧！</div>
          </div>
        `;
          document.getElementById("summary").style.display = "none";
          return;
        }

        // Find best deal (lowest final price)
        const bestDeal = items.reduce((best, item) =>
          item.finalPrice < best.finalPrice ? item : best
        );

        container.innerHTML = items
          .map((item) => {
            const isBest = item.id === bestDeal.id;
            const savingsPercent = ((item.discountAmount / item.originalPrice) * 100).toFixed(0);

            return `
          <div class="item-card ${isBest ? "best" : ""}">
            <button class="item-delete" onclick="deleteItem(${item.id})">×</button>
            <div class="item-name">${item.name}</div>
            <div class="item-details">
              <div class="detail-row">
                <span class="detail-label">原价</span>
                <span class="detail-value">¥${item.originalPrice.toFixed(2)}</span>
              </div>
              ${
                item.discount > 0
                  ? `
                <div class="detail-row">
                  <span class="detail-label">折扣 (${item.discount}%)</span>
                  <span class="detail-value savings">-¥${item.discountAmount.toFixed(2)}</span>
                </div>
              `
                  : ""
              }
              ${
                item.shipping > 0
                  ? `
                <div class="detail-row">
                  <span class="detail-label">运费</span>
                  <span class="detail-value">+¥${item.shipping.toFixed(2)}</span>
                </div>
              `
                  : ""
              }
              <hr style="border:1px solid var(--border-subtle);margin:.5rem 0">
              <div class="detail-row">
                <span class="detail-label">实付金额</span>
                <span class="detail-value final-price">¥${item.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        `;
          })
          .join("");

        // Update summary
        updateSummary();
      }

      function updateSummary() {
        if (items.length === 0) {
          document.getElementById("summary").style.display = "none";
          return;
        }

        document.getElementById("summary").style.display = "block";

        const totalItems = items.length;
        const avgPrice = items.reduce((sum, item) => sum + item.finalPrice, 0) / totalItems;
        const maxSavings = Math.max(...items.map((item) => item.discountAmount));
        const bestDeal = items.reduce((best, item) =>
          item.finalPrice < best.finalPrice ? item : best
        );

        document.getElementById("totalItems").textContent = totalItems;
        document.getElementById("avgPrice").textContent = "¥" + avgPrice.toFixed(2);
        document.getElementById("maxSavings").textContent = "¥" + maxSavings.toFixed(2);
        document.getElementById("bestDeal").textContent = bestDeal.name;
      }

      // Initialize
      loadItems();

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
    
