// @ts-nocheck
// Generated from tools/shopping/unit-price.html
// Source SHA-256: 00fe433c9dfd24b4c72d7f3e39d1bfc7286edc28d6d13edf9d91ebd469bf3d47
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let products = [
        { id: 1, name: "小包装", price: "", quantity: "" },
        { id: 2, name: "大包装", price: "", quantity: "" }
      ];
      let currentUnit = "g";
      let currentUnitLabel = "克";
      let nextId = 3;

      function setUnit(unit, label) {
        currentUnit = unit;
        currentUnitLabel = label;
        document.querySelectorAll(".unit-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        render();
      }

      function addProduct() {
        products.push({ id: nextId++, name: "商品" + products.length, price: "", quantity: "" });
        render();
      }

      function removeProduct(id) {
        if (products.length <= 2) {
          alert("至少需要2个商品进行比较");
          return;
        }
        products = products.filter((p) => p.id !== id);
        render();
        calculate();
      }

      function updateProduct(id, field, value) {
        const product = products.find((p) => p.id === id);
        if (product) {
          product[field] = value;
          calculate();
        }
      }

      function calculate() {
        const validProducts = products.filter(
          (p) => p.price && p.quantity && parseFloat(p.price) > 0 && parseFloat(p.quantity) > 0
        );

        if (validProducts.length < 2) {
          document.getElementById("resultCard").style.display = "none";
          // Remove best/worst classes
          document.querySelectorAll(".product-item").forEach((el) => {
            el.classList.remove("best", "worst");
          });
          return;
        }

        // Calculate unit prices
        validProducts.forEach((p) => {
          p.unitPrice = parseFloat(p.price) / parseFloat(p.quantity);
        });

        // Find best and worst
        const sorted = [...validProducts].sort((a, b) => a.unitPrice - b.unitPrice);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];

        // Update UI
        document.querySelectorAll(".product-item").forEach((el) => {
          const id = parseInt(el.dataset.id);
          el.classList.remove("best", "worst");
          if (id === best.id) el.classList.add("best");
          if (id === worst.id && worst.id !== best.id) el.classList.add("worst");
        });

        // Update unit prices display
        products.forEach((p) => {
          const el = document.querySelector(`.product-item[data-id="${p.id}"] .unit-price`);
          if (el) {
            if (p.price && p.quantity && parseFloat(p.price) > 0 && parseFloat(p.quantity) > 0) {
              const up = parseFloat(p.price) / parseFloat(p.quantity);
              el.textContent = "¥" + up.toFixed(3) + "/" + currentUnitLabel;
            } else {
              el.textContent = "--";
            }
          }
        });

        // Show result
        document.getElementById("resultCard").style.display = "block";
        document.getElementById("bestChoice").textContent = best.name;
        document.getElementById("bestDetail").textContent =
          `¥${best.unitPrice.toFixed(3)}/${currentUnitLabel}`;

        // Calculate savings
        if (worst.unitPrice > best.unitPrice) {
          const savings = (((worst.unitPrice - best.unitPrice) / worst.unitPrice) * 100).toFixed(1);
          document.getElementById("savingsBox").style.display = "block";
          document.getElementById("savingsAmount").textContent = savings + "%";
        } else {
          document.getElementById("savingsBox").style.display = "none";
        }
      }

      function render() {
        const container = document.getElementById("productsList");
        container.innerHTML = products
          .map(
            (p) => `
        <div class="product-item" data-id="${p.id}">
          <input class="product-input" type="text" value="${p.name}" placeholder="商品名称"
            onchange="updateProduct(${p.id}, 'name', this.value)">
          <input class="product-input" type="number" value="${p.price}" placeholder="价格 (元)"
            oninput="updateProduct(${p.id}, 'price', this.value)">
          <input class="product-input" type="number" value="${p.quantity}" placeholder="数量 (${currentUnitLabel})"
            oninput="updateProduct(${p.id}, 'quantity', this.value)">
          <span class="unit-price">--</span>
          <button class="delete-btn" onclick="removeProduct(${p.id})">×</button>
        </div>
      `
          )
          .join("");
        calculate();
      }

      // Initialize
      render();

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
    
