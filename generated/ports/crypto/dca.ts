// @ts-nocheck
// Generated from tools/crypto/dca.html
// Source SHA-256: b031b6ce4592f61eb193466f556ce11aacca03ba8f6a396ccc06d06a4b713d9b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + " USDT";
      }

      function generatePrices(start, end, periods, mode) {
        var prices = [];
        for (var i = 0; i < periods; i++) {
          var progress = i / (periods - 1);
          var basePrice;

          if (mode === "linear") {
            basePrice = start + (end - start) * progress;
          } else if (mode === "random") {
            var trend = start + (end - start) * progress;
            var volatility = (Math.random() - 0.5) * 0.2 * trend;
            basePrice = trend + volatility;
          } else {
            var trend = start + (end - start) * progress;
            var volatility = (Math.random() - 0.5) * 0.5 * trend;
            basePrice = trend + volatility;
          }

          prices.push(Math.max(basePrice, 1));
        }
        return prices;
      }

      function calculate() {
        var investAmount = parseFloat(document.getElementById("investAmount").value) || 0;
        var periods = parseInt(document.getElementById("periods").value) || 1;
        var feeRate = parseFloat(document.getElementById("feeRate").value) / 100 || 0;
        var startPrice = parseFloat(document.getElementById("startPrice").value) || 1;
        var endPrice = parseFloat(document.getElementById("endPrice").value) || 1;
        var priceMode = document.getElementById("priceMode").value;

        var prices = generatePrices(startPrice, endPrice, periods, priceMode);

        var totalInvested = 0;
        var totalFees = 0;
        var totalCoins = 0;

        for (var i = 0; i < periods; i++) {
          var fee = investAmount * feeRate;
          var netInvest = investAmount - fee;
          var coins = netInvest / prices[i];

          totalInvested += investAmount;
          totalFees += fee;
          totalCoins += coins;
        }

        var avgCost = (totalInvested - totalFees) / totalCoins;
        var currentValue = totalCoins * endPrice;
        var profitLoss = currentValue - totalInvested;
        var returnRate = (profitLoss / totalInvested) * 100;

        // 一次性买入对比
        var lumpSumCoins = (totalInvested * (1 - feeRate)) / startPrice;
        var lumpSumValue = lumpSumCoins * endPrice;
        var lumpSumReturn = ((lumpSumValue - totalInvested) / totalInvested) * 100;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("currentValue").textContent = formatMoney(currentValue);
        document.getElementById("totalInvested").textContent = formatMoney(totalInvested);
        document.getElementById("totalFees").textContent = formatMoney(totalFees);
        document.getElementById("totalCoins").textContent = totalCoins.toFixed(6);
        document.getElementById("avgCost").textContent = avgCost.toFixed(2) + " USDT";

        var plEl = document.getElementById("profitLoss");
        plEl.textContent = (profitLoss >= 0 ? "+" : "") + formatMoney(profitLoss);
        plEl.className = "result-value " + (profitLoss >= 0 ? "green" : "red");

        var rrEl = document.getElementById("returnRate");
        rrEl.textContent = (returnRate >= 0 ? "+" : "") + returnRate.toFixed(2) + "%";
        rrEl.className = "result-value " + (returnRate >= 0 ? "green" : "red");

        var lsEl = document.getElementById("lumpSumReturn");
        lsEl.textContent = (lumpSumReturn >= 0 ? "+" : "") + lumpSumReturn.toFixed(2) + "%";
        lsEl.className = "result-value " + (lumpSumReturn >= 0 ? "green" : "red");

        var diff = returnRate - lumpSumReturn;
        var dvlEl = document.getElementById("dcaVsLump");
        dvlEl.textContent =
          (diff >= 0 ? "定投领先 +" : "一次性领先 ") + Math.abs(diff).toFixed(2) + "%";
        dvlEl.className = "result-value " + (diff >= 0 ? "green" : "red");
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
    
