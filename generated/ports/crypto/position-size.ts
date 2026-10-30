// @ts-nocheck
// Generated from tools/crypto/position-size.html
// Source SHA-256: c889b37000d3e859dcf7e27c82daed541b8260f8ade91c42f705eddbf2819096
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + " USDT";
      }

      function calculate() {
        var totalCapital = parseFloat(document.getElementById("totalCapital").value) || 0;
        var riskPercent = parseFloat(document.getElementById("riskPercent").value) / 100 || 0.02;
        var entryPrice = parseFloat(document.getElementById("entryPrice").value) || 1;
        var stopLoss = parseFloat(document.getElementById("stopLoss").value) || 1;
        var takeProfit = parseFloat(document.getElementById("takeProfit").value) || entryPrice;

        var maxRiskAmount = totalCapital * riskPercent;
        var stopLossDistance = Math.abs(entryPrice - stopLoss);
        var stopLossPercent = (stopLossDistance / entryPrice) * 100;

        var positionSize = maxRiskAmount / stopLossDistance;
        var positionValue = positionSize * entryPrice;
        var positionPercent = (positionValue / totalCapital) * 100;

        var takeProfitDistance = Math.abs(takeProfit - entryPrice);
        var expectedProfit = positionSize * takeProfitDistance;
        var riskReward = takeProfitDistance / stopLossDistance;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("positionSize").textContent = positionSize.toFixed(6);
        document.getElementById("positionValue").textContent = formatMoney(positionValue);
        document.getElementById("maxLoss").textContent = "-" + formatMoney(maxRiskAmount);
        document.getElementById("expectedProfit").textContent = "+" + formatMoney(expectedProfit);
        document.getElementById("riskReward").textContent = "1:" + riskReward.toFixed(2);
        document.getElementById("stopLossPercent").textContent = stopLossPercent.toFixed(2) + "%";
        document.getElementById("positionPercent").textContent = positionPercent.toFixed(1) + "%";

        // 风险等级标记
        var riskLevel = Math.min((positionPercent / 50) * 100, 100);
        document.getElementById("riskMarker").style.left = riskLevel + "%";
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
    
