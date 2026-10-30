// @ts-nocheck
// Generated from tools/business/valuation.html
// Source SHA-256: 302919c50a3dca856ebde39d2529638dec11a46795cfb2029c65033cf76da49c
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

      var industryMultiples = {
        tech: { pe: 30, ps: 5, ev: 15, pb: 4 },
        manufacturing: { pe: 15, ps: 1.5, ev: 8, pb: 2 },
        retail: { pe: 20, ps: 1, ev: 10, pb: 3 },
        service: { pe: 25, ps: 3, ev: 12, pb: 3.5 },
        finance: { pe: 12, ps: 2, ev: 6, pb: 1.5 }
      };

      var stageMultiplier = {
        early: 1.5,
        growth: 1.2,
        mature: 1,
        decline: 0.7
      };

      function formatMoney(num) {
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "亿";
        }
        return num.toFixed(0) + "万";
      }

      function calculate() {
        var revenue = parseFloat(document.getElementById("revenue").value) || 0;
        var netProfit = parseFloat(document.getElementById("netProfit").value) || 0;
        var ebitda = parseFloat(document.getElementById("ebitda").value) || 0;
        var netAssets = parseFloat(document.getElementById("netAssets").value) || 0;
        var industry = document.getElementById("industry").value;
        var stage = document.getElementById("stage").value;
        var growthRate = parseFloat(document.getElementById("growthRate").value) / 100 || 0.2;
        var discountRate = parseFloat(document.getElementById("discountRate").value) / 100 || 0.15;

        var multiples = industryMultiples[industry];
        var stageMult = stageMultiplier[stage];

        // PE估值
        var peMultiple = multiples.pe * stageMult;
        var peValuation = netProfit * peMultiple;

        // PS估值
        var psMultiple = multiples.ps * stageMult;
        var psValuation = revenue * psMultiple;

        // EV/EBITDA估值
        var evMultiple = multiples.ev * stageMult;
        var evValuation = ebitda * evMultiple;

        // PB估值
        var pbMultiple = multiples.pb * stageMult;
        var pbValuation = netAssets * pbMultiple;

        // DCF简化估值（5年预测+永续）
        var dcfValuation = 0;
        var cashFlow = netProfit;
        for (var i = 1; i <= 5; i++) {
          cashFlow *= 1 + growthRate;
          dcfValuation += cashFlow / Math.pow(1 + discountRate, i);
        }
        var terminalValue = (cashFlow * (1 + 0.03)) / (discountRate - 0.03);
        dcfValuation += terminalValue / Math.pow(1 + discountRate, 5);

        // 综合估值区间
        var valuations = [peValuation, psValuation, evValuation, pbValuation, dcfValuation].filter(
          function (v) {
            return v > 0;
          }
        );
        var minVal = Math.min.apply(null, valuations);
        var maxVal = Math.max.apply(null, valuations);

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("valuationRange").textContent =
          formatMoney(minVal) + " - " + formatMoney(maxVal);
        document.getElementById("peValuation").textContent = formatMoney(peValuation);
        document.getElementById("psValuation").textContent = formatMoney(psValuation);
        document.getElementById("evValuation").textContent = formatMoney(evValuation);
        document.getElementById("pbValuation").textContent = formatMoney(pbValuation);
        document.getElementById("dcfValuation").textContent = formatMoney(dcfValuation);
      }

      calculate();
    
