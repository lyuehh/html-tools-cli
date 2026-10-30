// @ts-nocheck
// Generated from tools/crypto/ico-calculator.html
// Source SHA-256: 5507c564d9bbe1986df500ff7d32dce6e997e29d58468f4b9d40c5778c784649
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2);
      }

      function calculate() {
        var investment = parseFloat(document.getElementById("investment").value) || 0;
        var icoPrice = parseFloat(document.getElementById("icoPrice").value) || 0.01;
        var listPrice = parseFloat(document.getElementById("listPrice").value) || 0;
        var currentPrice = parseFloat(document.getElementById("currentPrice").value) || 0;

        var tokenAmount = investment / icoPrice;
        var listValue = tokenAmount * listPrice;
        var currentValue = tokenAmount * currentPrice;
        var totalProfit = currentValue - investment;
        var listGain = ((listPrice - icoPrice) / icoPrice) * 100;
        var totalGain = ((currentPrice - icoPrice) / icoPrice) * 100;
        var roi = (totalProfit / investment) * 100;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("totalProfit").textContent =
          "+" + formatMoney(totalProfit) + " USDT";
        document.getElementById("tokenAmount").textContent = tokenAmount.toLocaleString("en-US", {
          maximumFractionDigits: 0
        });
        document.getElementById("listValue").textContent = formatMoney(listValue) + " USDT";
        document.getElementById("currentValue").textContent = formatMoney(currentValue) + " USDT";
        document.getElementById("listGain").textContent = "+" + listGain.toFixed(0) + "%";
        document.getElementById("totalGain").textContent = "+" + totalGain.toFixed(0) + "%";
        document.getElementById("roi").textContent = "+" + roi.toFixed(0) + "%";
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
    
