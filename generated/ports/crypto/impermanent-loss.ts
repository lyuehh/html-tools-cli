// @ts-nocheck
// Generated from tools/crypto/impermanent-loss.html
// Source SHA-256: 69b8ad31df7cfed51154171e4b6bf8d64c2a06e1e24cb63a4c7bac83b35623ae
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        return num.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " USDT";
      }

      function calculate() {
        var priceA1 = parseFloat(document.getElementById("priceA1").value) || 1;
        var priceB1 = parseFloat(document.getElementById("priceB1").value) || 1;
        var priceA2 = parseFloat(document.getElementById("priceA2").value) || 1;
        var priceB2 = parseFloat(document.getElementById("priceB2").value) || 1;
        var totalValue = parseFloat(document.getElementById("totalValue").value) || 0;

        // 初始持仓（50/50）
        var valueA = totalValue / 2;
        var valueB = totalValue / 2;
        var amountA = valueA / priceA1;
        var amountB = valueB / priceB1;

        // HODL价值
        var hodlValue = amountA * priceA2 + amountB * priceB2;

        // 价格比率变化
        var r1 = priceA1 / priceB1;
        var r2 = priceA2 / priceB2;
        var priceRatio = r2 / r1;

        // LP价值计算（恒定乘积公式）
        var k = amountA * amountB;
        var newAmountA = Math.sqrt(k / priceRatio) * Math.sqrt(priceRatio);
        var newAmountB = Math.sqrt(k * priceRatio) / Math.sqrt(priceRatio);

        // 简化计算：LP价值 = 2 * sqrt(HODL_A * HODL_B)
        var lpValue = 2 * Math.sqrt(amountA * priceA2 * (amountB * priceB2));

        // 无常损失
        var ilAmount = hodlValue - lpValue;
        var ilPercent = (ilAmount / hodlValue) * 100;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("ilPercent").textContent = ilPercent.toFixed(2) + "%";
        document.getElementById("lpValue").textContent = formatMoney(lpValue);
        document.getElementById("hodlValue").textContent = formatMoney(hodlValue);
        document.getElementById("ilAmount").textContent = formatMoney(ilAmount);
        document.getElementById("priceRatio").textContent = priceRatio.toFixed(2) + "x";
      }

      calculate();

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
    
