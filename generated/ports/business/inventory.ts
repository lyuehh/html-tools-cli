// @ts-nocheck
// Generated from tools/business/inventory.html
// Source SHA-256: bacfb54400a5150af2207b9cacfd8d275bbf1158d29e36e976d77b44281d85f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.body.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculate() {
        var cogs = parseFloat(document.getElementById("cogs").value) || 0;
        var openingInventory = parseFloat(document.getElementById("openingInventory").value) || 0;
        var closingInventory = parseFloat(document.getElementById("closingInventory").value) || 0;
        var period = parseInt(document.getElementById("period").value) || 365;

        var avgInventory = (openingInventory + closingInventory) / 2;
        var turnoverRate = avgInventory > 0 ? cogs / avgInventory : 0;
        var turnoverDays = turnoverRate > 0 ? period / turnoverRate : 0;
        var dailySales = cogs / period;
        var daysOfSupply = dailySales > 0 ? closingInventory / dailySales : 0;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("turnoverRate").textContent = turnoverRate.toFixed(2) + "次";
        document.getElementById("avgInventory").textContent = formatMoney(avgInventory);
        document.getElementById("turnoverDays").textContent = turnoverDays.toFixed(1) + "天";
        document.getElementById("dailySales").textContent = formatMoney(dailySales);
        document.getElementById("daysOfSupply").textContent = daysOfSupply.toFixed(1) + "天";

        var assessment = document.getElementById("assessment");
        var assessmentIcon = document.getElementById("assessmentIcon");
        var assessmentText = document.getElementById("assessmentText");

        if (turnoverRate >= 12) {
          assessment.className = "assessment good";
          assessmentIcon.textContent = "🚀";
          assessmentText.textContent = "优秀：库存周转快，资金利用效率高";
        } else if (turnoverRate >= 6) {
          assessment.className = "assessment good";
          assessmentIcon.textContent = "✅";
          assessmentText.textContent = "良好：库存周转正常，建议持续优化";
        } else if (turnoverRate >= 3) {
          assessment.className = "assessment warning";
          assessmentIcon.textContent = "⚠️";
          assessmentText.textContent = "一般：库存周转偏慢，建议优化采购和销售策略";
        } else {
          assessment.className = "assessment bad";
          assessmentIcon.textContent = "❌";
          assessmentText.textContent = "较差：库存积压严重，需要及时处理滞销品";
        }
      }

      calculate();
    
