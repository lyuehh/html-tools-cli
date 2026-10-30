// @ts-nocheck
// Generated from tools/business/profit-margin.html
// Source SHA-256: 53bdff7bec147a661ead6c58f3cdc3882dbdf20e3fe057c053ed7dc97861c162
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
        return num.toFixed(2) + "元";
      }

      function getMarginColor(margin) {
        if (margin >= 20) return "green";
        if (margin >= 10) return "orange";
        return "red";
      }

      function calculate() {
        var revenue = parseFloat(document.getElementById("revenue").value) || 0;
        var cogs = parseFloat(document.getElementById("cogs").value) || 0;
        var adminExpense = parseFloat(document.getElementById("adminExpense").value) || 0;
        var salesExpense = parseFloat(document.getElementById("salesExpense").value) || 0;
        var financeExpense = parseFloat(document.getElementById("financeExpense").value) || 0;
        var tax = parseFloat(document.getElementById("tax").value) || 0;

        var grossProfit = revenue - cogs;
        var grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        var operatingExpenses = adminExpense + salesExpense + financeExpense;
        var operatingProfit = grossProfit - operatingExpenses;
        var operatingMargin = revenue > 0 ? (operatingProfit / revenue) * 100 : 0;
        var netProfit = operatingProfit - tax;
        var netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

        document.getElementById("resultSection").classList.remove("hidden");

        var grossProfitEl = document.getElementById("grossProfit");
        grossProfitEl.textContent = formatMoney(grossProfit);
        grossProfitEl.className = "result-value " + (grossProfit >= 0 ? "green" : "red");

        var grossMarginEl = document.getElementById("grossMargin");
        grossMarginEl.textContent = grossMargin.toFixed(2) + "%";
        grossMarginEl.className = "result-value " + getMarginColor(grossMargin);

        var operatingProfitEl = document.getElementById("operatingProfit");
        operatingProfitEl.textContent = formatMoney(operatingProfit);
        operatingProfitEl.className = "result-value " + (operatingProfit >= 0 ? "green" : "red");

        var operatingMarginEl = document.getElementById("operatingMargin");
        operatingMarginEl.textContent = operatingMargin.toFixed(2) + "%";
        operatingMarginEl.className = "result-value " + getMarginColor(operatingMargin);

        var netProfitEl = document.getElementById("netProfit");
        netProfitEl.textContent = formatMoney(netProfit);
        netProfitEl.className = "result-value " + (netProfit >= 0 ? "green" : "red");

        var netMarginEl = document.getElementById("netMargin");
        netMarginEl.textContent = netMargin.toFixed(2) + "%";
        netMarginEl.className = "result-value " + getMarginColor(netMargin);

        // 更新仪表盘
        var gaugeRotation = (Math.min(Math.max(netMargin, -10), 30) / 40) * 180 - 90;
        document.getElementById("gaugeFill").style.transform = "rotate(" + gaugeRotation + "deg)";
        document.getElementById("gaugeValue").textContent = netMargin.toFixed(1) + "%";
      }

      calculate();
    
