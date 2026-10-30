// @ts-nocheck
// Generated from tools/business/roi-calculator.html
// Source SHA-256: dc5bd52cfe0d9eff32555d76316d656e623a9d8d7f675711337c87fd61896fb1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const initialInvestment =
          parseFloat(document.getElementById("initialInvestment").value) || 0;
        const finalReturn = parseFloat(document.getElementById("finalReturn").value) || 0;
        const years = parseFloat(document.getElementById("years").value) || 1;

        // ROI = (Final Return - Initial Investment) / Initial Investment * 100%
        const netProfit = finalReturn - initialInvestment;
        const roi = initialInvestment > 0 ? (netProfit / initialInvestment) * 100 : 0;

        // Annualized Return = ((Final / Initial) ^ (1 / years) - 1) * 100%
        const annualizedReturn =
          initialInvestment > 0 && finalReturn > 0
            ? (Math.pow(finalReturn / initialInvestment, 1 / years) - 1) * 100
            : 0;

        // Payback Period (simplified)
        const paybackPeriod = roi > 0 ? initialInvestment / (netProfit / years) : 0;

        // Profit Margin
        const profitMargin = finalReturn > 0 ? (netProfit / finalReturn) * 100 : 0;

        // Update ROI display
        const roiResult = document.getElementById("roiResult");
        const roiValue = document.getElementById("roiValue");
        const roiDescription = document.getElementById("roiDescription");

        roiValue.textContent = roi.toFixed(2) + "%";

        if (roi > 0) {
          roiResult.className = "roi-result positive";
          roiValue.className = "roi-value positive";
          roiDescription.textContent =
            roi >= 100
              ? "优秀投资！回报翻倍"
              : roi >= 50
                ? "良好投资回报"
                : roi >= 20
                  ? "正常投资回报"
                  : "投资略有收益";
        } else if (roi < 0) {
          roiResult.className = "roi-result negative";
          roiValue.className = "roi-value negative";
          roiDescription.textContent = "投资亏损";
        } else {
          roiResult.className = "roi-result";
          roiValue.className = "roi-value";
          roiDescription.textContent = "投资保本";
        }

        // Update metrics
        document.getElementById("netProfit").textContent =
          "¥" + netProfit.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById("annualizedReturn").textContent = annualizedReturn.toFixed(2) + "%";
        document.getElementById("paybackPeriod").textContent =
          paybackPeriod > 0 ? paybackPeriod.toFixed(1) + "年" : "N/A";
        document.getElementById("profitMargin").textContent = profitMargin.toFixed(2) + "%";
      }

      // Initialize
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
