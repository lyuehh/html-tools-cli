// @ts-nocheck
// Generated from tools/business/roi.html
// Source SHA-256: cee892afe4c127ce70d9883a65a973fc95b8ae5f7d4393064fa566fd13c1d9e6
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
        var initialInvestment = parseFloat(document.getElementById("initialInvestment").value) || 0;
        var investmentPeriod = parseInt(document.getElementById("investmentPeriod").value) || 1;
        var totalReturn = parseFloat(document.getElementById("totalReturn").value) || 0;
        var annualReturn = parseFloat(document.getElementById("annualReturn").value) || 0;

        var netProfit = totalReturn - initialInvestment;
        var roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;
        var annualRoi = roi / investmentPeriod;
        var paybackPeriod = annualReturn > 0 ? initialInvestment / annualReturn : 0;
        var multiple = initialInvestment > 0 ? totalReturn / initialInvestment : 0;

        document.getElementById("resultSection").classList.remove("hidden");

        var roiEl = document.getElementById("roi");
        roiEl.textContent = roi.toFixed(2) + "%";

        var netProfitEl = document.getElementById("netProfit");
        netProfitEl.textContent = formatMoney(netProfit);
        netProfitEl.className = "result-value " + (netProfit >= 0 ? "green" : "red");

        var annualRoiEl = document.getElementById("annualRoi");
        annualRoiEl.textContent = annualRoi.toFixed(2) + "%";
        annualRoiEl.className =
          "result-value " + (annualRoi >= 10 ? "green" : annualRoi >= 0 ? "" : "red");

        document.getElementById("paybackPeriod").textContent = paybackPeriod.toFixed(1) + "年";
        document.getElementById("multiple").textContent = multiple.toFixed(2) + "x";
      }

      calculate();
    
