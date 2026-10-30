// @ts-nocheck
// Generated from tools/calculator/discount-calc.html
// Source SHA-256: bae45ff37b6c1b578a1025a05b304feaddbb1ddd2b8df118828a529232009913
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "calcFinal";

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // 设置计算模式
      window.setMode = function (mode) {
        currentMode = mode;

        // 更新按钮状态
        document.querySelectorAll(".calc-mode button").forEach((btn, index) => {
          btn.classList.remove("active");
          if (
            (mode === "calcFinal" && index === 0) ||
            (mode === "calcDiscount" && index === 1) ||
            (mode === "calcOriginal" && index === 2)
          ) {
            btn.classList.add("active");
          }
        });

        // 显示对应输入区域
        document.querySelectorAll(".input-section").forEach((section) => {
          section.classList.remove("active");
        });
        document.getElementById("mode-" + mode).classList.add("active");

        calculate();
      };

      // 设置预设折扣
      window.setDiscount = function (discount) {
        document.getElementById("discount1").value = discount;

        document.querySelectorAll(".discount-presets button").forEach((btn) => {
          btn.classList.remove("active");
          const btnDiscount = parseInt(btn.textContent) * 10;
          if (btnDiscount === discount) {
            btn.classList.add("active");
          }
        });

        calculate();
      };

      // 计算
      window.calculate = function () {
        let original = 0,
          discount = 0,
          final = 0,
          savings = 0,
          savingsPercent = 0;

        if (currentMode === "calcFinal") {
          original = parseFloat(document.getElementById("original1").value) || 0;
          discount = parseFloat(document.getElementById("discount1").value) || 0;
          final = original * (discount / 100);

          // 更新预设按钮状态
          document.querySelectorAll(".discount-presets button").forEach((btn) => {
            btn.classList.remove("active");
            const btnDiscount = parseFloat(btn.textContent) * 10;
            if (btnDiscount === discount) {
              btn.classList.add("active");
            }
          });
        } else if (currentMode === "calcDiscount") {
          original = parseFloat(document.getElementById("original2").value) || 0;
          final = parseFloat(document.getElementById("final2").value) || 0;
          discount = original > 0 ? (final / original) * 100 : 0;
        } else if (currentMode === "calcOriginal") {
          final = parseFloat(document.getElementById("final3").value) || 0;
          discount = parseFloat(document.getElementById("discount3").value) || 0;
          original = discount > 0 ? final / (discount / 100) : 0;
        }

        savings = original - final;
        savingsPercent = original > 0 ? (savings / original) * 100 : 0;

        document.getElementById("resultOriginal").textContent = "¥" + original.toFixed(2);
        document.getElementById("resultDiscount").textContent = (discount / 10).toFixed(1) + "折";
        document.getElementById("resultFinal").textContent = "¥" + final.toFixed(2);
        document.getElementById("resultSavings").textContent = "¥" + savings.toFixed(2);
        document.getElementById("resultSavingsPercent").textContent =
          savingsPercent.toFixed(1) + "%";
      };

      // 初始计算
      calculate();
    
