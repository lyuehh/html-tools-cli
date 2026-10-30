// @ts-nocheck
// Generated from tools/calculator/discount-calculator.html
// Source SHA-256: 2c9d1caa779e5d5e121275b909bceaaef9592d9338f6d37b575fd527ad376d56
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentDiscount = 70;

      function formatDiscount(discount) {
        return Number((discount / 10).toFixed(2)).toString();
      }

      function setDiscount(discount) {
        currentDiscount = discount;
        document.querySelectorAll(".discount-btn").forEach((btn) => {
          const isActive = Number(btn.dataset.discount) === discount;
          btn.classList.toggle("active", isActive);
          btn.setAttribute("aria-pressed", String(isActive));
        });
        document.getElementById("customDiscount").value = "";
        calculate();
      }

      function customDiscountChange() {
        const input = document.getElementById("customDiscount");
        const custom = parseFloat(input.value);
        const isValid = Number.isFinite(custom) && custom > 0 && custom <= 100;
        input.setAttribute("aria-invalid", String(input.value !== "" && !isValid));
        document.getElementById("customDiscountError").textContent =
          input.value !== "" && !isValid ? "请输入大于 0 且不超过 100 的折扣率" : "";
        if (isValid) {
          currentDiscount = custom;
          document.querySelectorAll(".discount-btn").forEach((btn) => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
          });
          calculate();
        }
      }

      function calculate() {
        const originalInput = document.getElementById("originalPrice");
        const parsedOriginal = parseFloat(originalInput.value);
        const isValidOriginal =
          originalInput.value === "" || (Number.isFinite(parsedOriginal) && parsedOriginal >= 0);
        originalInput.setAttribute("aria-invalid", String(!isValidOriginal));
        document.getElementById("originalPriceError").textContent = isValidOriginal
          ? ""
          : "请输入大于或等于 0 的原价";
        if (!isValidOriginal) return;

        const original = originalInput.value === "" ? 0 : parsedOriginal;
        const discountRate = currentDiscount / 100;
        const final = original * discountRate;
        const saved = original - final;

        document.getElementById("origPrice").textContent = "¥" + original.toFixed(2);
        document.getElementById("discountRate").textContent = currentDiscount + "%";
        document.getElementById("finalPrice").textContent = "¥" + final.toFixed(2);
        document.getElementById("savedAmount").textContent = "节省 ¥" + saved.toFixed(2);
        document.getElementById("actualDiscount").textContent = formatDiscount(currentDiscount);
        document.getElementById("savedPercent").textContent = 100 - currentDiscount;

        // Compare list
        const discounts = [95, 90, 85, 80, 75, 70, 60, 50];
        const compareList = document.getElementById("compareList");
        compareList.innerHTML = discounts
          .map((d) => {
            const price = (original * d) / 100;
            const save = original - price;
            return `<div class="compare-item" style="${d === currentDiscount ? "background: #fff0f8; border-radius: 8px; padding: 10px;" : ""}">
                    <span>${formatDiscount(d)}折 (省${100 - d}%)</span>
                    <span>¥${price.toFixed(2)} <small style="color: #e67e22;">(省¥${save.toFixed(2)})</small></span>
                </div>`;
          })
          .join("");
      }

      calculate();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
