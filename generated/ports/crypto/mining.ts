// @ts-nocheck
// Generated from tools/crypto/mining.html
// Source SHA-256: e8b5e4227991ac25ce5f593b619c66c585c560e301f8d9112714099ff16e98b5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + " USDT";
      }

      function calculate() {
        var hashrate = parseFloat(document.getElementById("hashrate").value) || 0;
        var power = parseFloat(document.getElementById("power").value) || 0;
        var minerCount = parseInt(document.getElementById("minerCount").value) || 1;
        var minerCost = parseFloat(document.getElementById("minerCost").value) || 0;
        var electricityRate = parseFloat(document.getElementById("electricityRate").value) || 0;
        var poolFee = parseFloat(document.getElementById("poolFee").value) / 100 || 0;
        var coinPrice = parseFloat(document.getElementById("coinPrice").value) || 0;
        var blockReward = parseFloat(document.getElementById("blockReward").value) || 0;
        var networkHashrate = parseFloat(document.getElementById("networkHashrate").value) || 1;

        var totalHashrate = hashrate * minerCount;
        var totalPower = power * minerCount;
        var totalMinerCost = minerCost * minerCount;

        // 日产出计算（简化模型）
        var blocksPerDay = 144;
        var dailyBtcNetwork = blocksPerDay * blockReward;
        var hashrateShare = totalHashrate / 1000000 / networkHashrate;
        var dailyBtc = dailyBtcNetwork * hashrateShare;

        // 收益计算
        var dailyRevenue = dailyBtc * coinPrice;
        var dailyElectricity = ((totalPower / 1000) * 24 * electricityRate) / 7.2; // 转换为USDT
        var dailyPoolFeeAmount = dailyRevenue * poolFee;
        var dailyProfit = dailyRevenue - dailyElectricity - dailyPoolFeeAmount;

        var weeklyProfit = dailyProfit * 7;
        var monthlyProfit = dailyProfit * 30;
        var yearlyProfit = dailyProfit * 365;
        var yearlyBtc = dailyBtc * 365;

        var paybackPeriod = dailyProfit > 0 ? totalMinerCost / dailyProfit : 999999;

        document.getElementById("resultSection").classList.remove("hidden");

        var mpEl = document.getElementById("monthlyProfit");
        mpEl.textContent = formatMoney(monthlyProfit);

        document.getElementById("dailyBtc").textContent = dailyBtc.toFixed(8);
        document.getElementById("dailyRevenue").textContent = formatMoney(dailyRevenue);
        document.getElementById("dailyElectricity").textContent =
          "-" + formatMoney(dailyElectricity);
        document.getElementById("dailyPoolFee").textContent = "-" + formatMoney(dailyPoolFeeAmount);

        var dpEl = document.getElementById("dailyProfit");
        dpEl.textContent = formatMoney(dailyProfit);
        dpEl.className = "result-value " + (dailyProfit >= 0 ? "green" : "red");

        document.getElementById("paybackPeriod").textContent =
          paybackPeriod < 9999 ? Math.ceil(paybackPeriod) + "天" : "不可回本";

        document.getElementById("weeklyProfit").textContent = formatMoney(weeklyProfit);
        document.getElementById("monthlyProfitDetail").textContent = formatMoney(monthlyProfit);
        document.getElementById("yearlyProfit").textContent = formatMoney(yearlyProfit);
        document.getElementById("yearlyBtc").textContent = yearlyBtc.toFixed(6);
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
    
