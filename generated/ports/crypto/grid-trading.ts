// @ts-nocheck
// Generated from tools/crypto/grid-trading.html
// Source SHA-256: b3cda67c7246487bdbc558a8a56d0aa891a8e254fed1afbff0a1f8d696530b3f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2);
      }

      function calculate() {
        var totalFund = parseFloat(document.getElementById("totalFund").value) || 0;
        var gridType = document.getElementById("gridType").value;
        var upperPrice = parseFloat(document.getElementById("upperPrice").value) || 0;
        var lowerPrice = parseFloat(document.getElementById("lowerPrice").value) || 0;
        var gridCount = parseInt(document.getElementById("gridCount").value) || 10;
        var currentPrice = parseFloat(document.getElementById("currentPrice").value) || 0;

        if (upperPrice <= lowerPrice) {
          alert("价格上限必须大于下限");
          return;
        }

        var gridPrices = [];
        var gridSpacing, gridSpacingPercent;

        if (gridType === "arithmetic") {
          gridSpacing = (upperPrice - lowerPrice) / gridCount;
          gridSpacingPercent = (gridSpacing / ((upperPrice + lowerPrice) / 2)) * 100;
          for (var i = 0; i <= gridCount; i++) {
            gridPrices.push(lowerPrice + i * gridSpacing);
          }
        } else {
          var ratio = Math.pow(upperPrice / lowerPrice, 1 / gridCount);
          gridSpacingPercent = (ratio - 1) * 100;
          gridSpacing = 0;
          for (var j = 0; j <= gridCount; j++) {
            gridPrices.push(lowerPrice * Math.pow(ratio, j));
          }
        }

        var perGridFund = totalFund / gridCount;
        var perGridProfit = gridSpacingPercent;
        var annualReturn = (perGridProfit * 365) / 7;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("gridSpacing").textContent =
          gridType === "arithmetic"
            ? formatMoney(gridSpacing) + " USDT"
            : gridSpacingPercent.toFixed(2) + "%";
        document.getElementById("perGridFund").textContent = formatMoney(perGridFund) + " USDT";
        document.getElementById("perGridProfit").textContent = perGridProfit.toFixed(2) + "%";
        document.getElementById("annualReturn").textContent = annualReturn.toFixed(0) + "%";

        var gridVisual = document.getElementById("gridVisual");
        while (gridVisual.firstChild) {
          gridVisual.removeChild(gridVisual.firstChild);
        }

        gridPrices.reverse().forEach(function (price, idx) {
          var line = document.createElement("div");
          line.className = "grid-line";

          var isBuy = price < currentPrice;
          line.classList.add(isBuy ? "buy" : "sell");

          var label = document.createElement("span");
          label.textContent = "网格 " + (gridCount - idx + 1);

          var priceSpan = document.createElement("span");
          priceSpan.textContent = price.toFixed(2) + " USDT";

          var action = document.createElement("span");
          action.textContent = isBuy ? "买入" : "卖出";

          line.appendChild(label);
          line.appendChild(priceSpan);
          line.appendChild(action);
          gridVisual.appendChild(line);
        });
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
    
