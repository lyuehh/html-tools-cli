// @ts-nocheck
// Generated from tools/crypto/profit-loss.html
// Source SHA-256: 78beabfc4cc483a041757aefe1b8a3ade0912c784610647dbeb57cbd6a048d3f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        return num.toFixed(2) + " USDT";
      }

      function calculate() {
        var buyPrice = parseFloat(document.getElementById("buyPrice").value) || 0;
        var buyAmount = parseFloat(document.getElementById("buyAmount").value) || 0;
        var buyFeeRate = parseFloat(document.getElementById("buyFeeRate").value) / 100 || 0;
        var sellPrice = parseFloat(document.getElementById("sellPrice").value) || 0;
        var sellFeeRate = parseFloat(document.getElementById("sellFeeRate").value) / 100 || 0;

        var buyCost = buyPrice * buyAmount;
        var buyFee = buyCost * buyFeeRate;
        var totalBuyCost = buyCost + buyFee;

        var sellRevenue = sellPrice * buyAmount;
        var sellFee = sellRevenue * sellFeeRate;
        var netSellRevenue = sellRevenue - sellFee;

        var profitLoss = netSellRevenue - totalBuyCost;
        var profitPct = totalBuyCost > 0 ? (profitLoss / totalBuyCost) * 100 : 0;
        var totalFee = buyFee + sellFee;

        document.getElementById("resultSection").classList.remove("hidden");

        var highlight = document.getElementById("plHighlight");
        highlight.className = "highlight " + (profitLoss >= 0 ? "profit" : "loss");

        document.getElementById("profitLoss").textContent =
          (profitLoss >= 0 ? "+" : "") + formatMoney(profitLoss);
        document.getElementById("profitPct").textContent =
          "收益率: " + (profitLoss >= 0 ? "+" : "") + profitPct.toFixed(2) + "%";

        document.getElementById("buyCost").textContent = formatMoney(buyCost);
        document.getElementById("buyFee").textContent = formatMoney(buyFee);
        document.getElementById("sellRevenue").textContent = formatMoney(sellRevenue);
        document.getElementById("sellFee").textContent = formatMoney(sellFee);
        document.getElementById("totalFee").textContent = formatMoney(totalFee);
        document.getElementById("netReturn").textContent = profitPct.toFixed(2) + "%";
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
    
