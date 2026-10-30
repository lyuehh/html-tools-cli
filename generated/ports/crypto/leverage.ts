// @ts-nocheck
// Generated from tools/crypto/leverage.html
// Source SHA-256: 839a1f02c02ba50e864b63c46ba2f65c814be56b2d32f87fb4394889c66ebe80
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var selectedLeverage = 10;

      document.getElementById("leverageSelect").addEventListener("click", function (e) {
        if (e.target.classList.contains("leverage-btn")) {
          document.querySelectorAll(".leverage-btn").forEach(function (btn) {
            btn.classList.remove("active");
          });
          e.target.classList.add("active");
          selectedLeverage = parseInt(e.target.dataset.leverage);
        }
      });

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + " USDT";
      }

      function calculate() {
        var margin = parseFloat(document.getElementById("margin").value) || 0;
        var entryPrice = parseFloat(document.getElementById("entryPrice").value) || 1;
        var direction = document.getElementById("direction").value;
        var targetPrice = parseFloat(document.getElementById("targetPrice").value) || entryPrice;

        var positionValue = margin * selectedLeverage;
        var positionSize = positionValue / entryPrice;
        var priceChangeAbs = targetPrice - entryPrice;
        var priceChangePct = (priceChangeAbs / entryPrice) * 100;

        var pnl;
        if (direction === "long") {
          pnl = positionSize * priceChangeAbs;
        } else {
          pnl = positionSize * -priceChangeAbs;
        }

        var returnRate = (pnl / margin) * 100;

        // 爆仓价格计算（假设维持保证金率5%）
        var maintenanceMarginRate = 0.05;
        var liquidationPrice;
        if (direction === "long") {
          liquidationPrice = entryPrice * (1 - (1 - maintenanceMarginRate) / selectedLeverage);
        } else {
          liquidationPrice = entryPrice * (1 + (1 - maintenanceMarginRate) / selectedLeverage);
        }

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("positionValue").textContent = formatMoney(positionValue);
        document.getElementById("positionSize").textContent = positionSize.toFixed(6);

        var pcEl = document.getElementById("priceChange");
        pcEl.textContent = (priceChangePct >= 0 ? "+" : "") + priceChangePct.toFixed(2) + "%";
        pcEl.className = "result-value " + (priceChangePct >= 0 ? "green" : "red");

        var pnlEl = document.getElementById("pnl");
        pnlEl.textContent = (pnl >= 0 ? "+" : "") + formatMoney(pnl);
        pnlEl.className = "result-value " + (pnl >= 0 ? "green" : "red");

        var rrEl = document.getElementById("returnRate");
        rrEl.textContent = (returnRate >= 0 ? "+" : "") + returnRate.toFixed(2) + "%";
        rrEl.className = "result-value " + (returnRate >= 0 ? "green" : "red");

        document.getElementById("liquidationPrice").textContent =
          liquidationPrice.toFixed(2) + " USDT";

        var riskLevel;
        if (selectedLeverage <= 3) {
          riskLevel = "低风险";
        } else if (selectedLeverage <= 10) {
          riskLevel = "中等风险";
        } else if (selectedLeverage <= 50) {
          riskLevel = "高风险";
        } else {
          riskLevel = "极高风险";
        }

        var distanceToLiq = Math.abs(((entryPrice - liquidationPrice) / entryPrice) * 100);

        document.getElementById("riskWarning").textContent =
          "当前杠杆倍数: " +
          selectedLeverage +
          "x (" +
          riskLevel +
          ")\n" +
          "距离爆仓价格仅 " +
          distanceToLiq.toFixed(2) +
          "%\n" +
          "高杠杆交易风险极大，请谨慎操作，建议设置止损。";
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
    
