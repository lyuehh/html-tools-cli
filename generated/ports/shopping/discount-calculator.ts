// @ts-nocheck
// Generated from tools/shopping/discount-calculator.html
// Source SHA-256: cbae421fb04777bbe46f75c1b934658cb7affe3575a02b2ecda864900d68194b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function setDiscount(percent) {
        document.getElementById("discountPercent").value = percent;
        updateActiveBtn();
        calculate();
      }

      function updateActiveBtn() {
        const currentPercent = parseFloat(document.getElementById("discountPercent").value);
        document.querySelectorAll(".discount-btn").forEach((btn) => {
          btn.classList.remove("active");
        });

        // Highlight matching button
        const buttons = document.querySelectorAll(".discount-btn");
        const discounts = [10, 20, 30, 40, 50, 60, 70, 75, 80, 90];
        const index = discounts.indexOf(currentPercent);
        if (index !== -1 && buttons[index]) {
          buttons[index].classList.add("active");
        }
      }

      function calculate() {
        const original = parseFloat(document.getElementById("originalPrice").value) || 0;
        const discountPercent = parseFloat(document.getElementById("discountPercent").value) || 0;

        const discountAmount = original * (discountPercent / 100);
        const finalPrice = original - discountAmount;

        // Calculate actual discount (like 8折 for 20% off)
        const actualDiscount = 10 - discountPercent / 10;

        document.getElementById("displayOriginal").textContent = "¥" + original.toFixed(2);
        document.getElementById("displayDiscount").textContent =
          discountPercent.toFixed(1) + "% (" + actualDiscount.toFixed(1) + "折)";
        document.getElementById("displaySaved").textContent = "-¥" + discountAmount.toFixed(2);
        document.getElementById("displayFinal").textContent = "¥" + finalPrice.toFixed(2);
      }

      // Initialize
      calculate();

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
    
