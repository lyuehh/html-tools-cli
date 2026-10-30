// @ts-nocheck
// Generated from tools/crypto/liquidation.html
// Source SHA-256: b925e74205e310d91587c974203738583bcbeeddc4f017b2ea176b8659c69a9b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + " USDT";
      }

      function calculate() {
        var margin = parseFloat(document.getElementById("margin").value) || 0;
        var entryPrice = parseFloat(document.getElementById("entryPrice").value) || 1;
        var leverage = parseFloat(document.getElementById("leverage").value) || 1;
        var direction = document.getElementById("direction").value;
        var maintenanceRate =
          parseFloat(document.getElementById("maintenanceRate").value) / 100 || 0.005;

        var positionValue = margin * leverage;
        var positionSize = positionValue / entryPrice;

        var liquidationPrice;
        if (direction === "long") {
          liquidationPrice = entryPrice * (1 - (1 - maintenanceRate) / leverage);
        } else {
          liquidationPrice = entryPrice * (1 + (1 - maintenanceRate) / leverage);
        }

        var distanceToLiq = Math.abs((entryPrice - liquidationPrice) / entryPrice) * 100;
        var maxLoss = margin * (1 - maintenanceRate);

        // 止损价位计算
        var stopLoss10, stopLoss20, stopLoss50;
        if (direction === "long") {
          stopLoss10 = entryPrice * (1 - 0.1 / leverage);
          stopLoss20 = entryPrice * (1 - 0.2 / leverage);
          stopLoss50 = entryPrice * (1 - 0.5 / leverage);
        } else {
          stopLoss10 = entryPrice * (1 + 0.1 / leverage);
          stopLoss20 = entryPrice * (1 + 0.2 / leverage);
          stopLoss50 = entryPrice * (1 + 0.5 / leverage);
        }

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("liquidationPrice").textContent =
          liquidationPrice.toFixed(2) + " USDT";
        document.getElementById("positionValue").textContent = formatMoney(positionValue);
        document.getElementById("distanceToLiq").textContent = distanceToLiq.toFixed(2) + "%";
        document.getElementById("maxLoss").textContent = formatMoney(maxLoss);
        document.getElementById("effectiveLeverage").textContent = leverage + "x";

        document.getElementById("stopLoss10").textContent = stopLoss10.toFixed(2) + " USDT";
        document.getElementById("stopLoss20").textContent = stopLoss20.toFixed(2) + " USDT";
        document.getElementById("stopLoss50").textContent = stopLoss50.toFixed(2) + " USDT";

        // 价格条
        var range, safeWidth, dangerWidth, markerPos;
        if (direction === "long") {
          range = entryPrice * 0.3;
          safeWidth = ((entryPrice - liquidationPrice) / range) * 100;
          markerPos = 50;
          document.getElementById("labelLiq").textContent = "爆仓: " + liquidationPrice.toFixed(0);
          document.getElementById("labelMax").textContent = "";
        } else {
          range = entryPrice * 0.3;
          safeWidth = ((liquidationPrice - entryPrice) / range) * 100;
          markerPos = 50;
          document.getElementById("labelLiq").textContent = "";
          document.getElementById("labelMax").textContent = "爆仓: " + liquidationPrice.toFixed(0);
        }

        document.getElementById("priceSafe").style.width = Math.min(safeWidth, 100) + "%";
        document.getElementById("priceMarker").style.left = markerPos + "%";
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
    
