// @ts-nocheck
// Generated from tools/business/pricing.html
// Source SHA-256: 57dc96adc513ccd6745f102d7d2c7bc6712e980730be1e9711bc05163b06a0b4
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

      var selectedStrategy = "cost";

      function selectStrategy(strategy) {
        selectedStrategy = strategy;
        var cards = document.querySelectorAll(".strategy-card");
        cards.forEach(function (card) {
          card.classList.remove("active");
          if (card.dataset.strategy === strategy) {
            card.classList.add("active");
          }
        });
      }

      function formatPrice(num) {
        return "¥" + num.toFixed(2);
      }

      function psychologicalPrice(price) {
        if (price < 10) return Math.floor(price) - 0.1 + 0.9;
        if (price < 100) return Math.floor(price / 10) * 10 + 9;
        if (price < 1000) return Math.floor(price / 100) * 100 + 99;
        return Math.floor(price / 1000) * 1000 + 999;
      }

      function calculate() {
        var unitCost = parseFloat(document.getElementById("unitCost").value) || 0;
        var targetMargin = parseFloat(document.getElementById("targetMargin").value) / 100 || 0.3;
        var competitorLow = parseFloat(document.getElementById("competitorLow").value) || 0;
        var competitorHigh = parseFloat(document.getElementById("competitorHigh").value) || 0;
        var marketAvg = parseFloat(document.getElementById("marketAvg").value) || 0;
        var customerExpect = parseFloat(document.getElementById("customerExpect").value) || 0;

        var recommendedPrice = 0;
        var analysis = "";

        switch (selectedStrategy) {
          case "cost":
            recommendedPrice = unitCost / (1 - targetMargin);
            analysis =
              "成本加成定价法以成本为基础，加上预期利润来确定价格。当前成本 " +
              formatPrice(unitCost) +
              "，目标利润率 " +
              (targetMargin * 100).toFixed(0) +
              "%，建议定价 " +
              formatPrice(recommendedPrice) +
              "。此方法简单直接，但需关注市场接受度。";
            break;
          case "competition":
            recommendedPrice = (competitorLow + competitorHigh) / 2;
            analysis =
              "竞争导向定价参考市场竞品价格。当前竞品价格区间 " +
              formatPrice(competitorLow) +
              " - " +
              formatPrice(competitorHigh) +
              "，建议定价在区间中位。可根据产品差异化程度调整，差异化高可定价偏上，同质化严重则偏下。";
            break;
          case "value":
            recommendedPrice = customerExpect * 1.1;
            analysis =
              "价值导向定价以顾客感知价值为基础。顾客心理价位 " +
              formatPrice(customerExpect) +
              "，建议略高于心理价位定价，体现产品价值。同时需要加强价值传达，让顾客认可产品值这个价。";
            break;
          case "psychological":
            recommendedPrice = psychologicalPrice(unitCost / (1 - targetMargin));
            analysis =
              '心理定价运用消费心理学原理。价格尾数为9会让顾客感觉更便宜。例如99元比100元更有吸引力。建议配合促销标语如"不到百元"等增强效果。';
            break;
        }

        // 显示结果
        document.getElementById("resultSection").classList.remove("hidden");
        document.getElementById("recommendedPrice").textContent = formatPrice(recommendedPrice);

        // 三档价格
        var lowPrice = Math.max(unitCost * 1.1, competitorLow * 0.95);
        var midPrice = recommendedPrice;
        var highPrice = Math.min(unitCost * 2, competitorHigh * 1.05);

        document.getElementById("lowPrice").textContent = formatPrice(lowPrice);
        document.getElementById("midPrice").textContent = formatPrice(midPrice);
        document.getElementById("highPrice").textContent = formatPrice(highPrice);

        var lowMarginPct = (((lowPrice - unitCost) / lowPrice) * 100).toFixed(1);
        var midMarginPct = (((midPrice - unitCost) / midPrice) * 100).toFixed(1);
        var highMarginPct = (((highPrice - unitCost) / highPrice) * 100).toFixed(1);

        document.getElementById("lowMargin").textContent = "利润率 " + lowMarginPct + "%";
        document.getElementById("midMargin").textContent = "利润率 " + midMarginPct + "%";
        document.getElementById("highMargin").textContent = "利润率 " + highMarginPct + "%";

        // 分析数据
        var actualMargin = ((recommendedPrice - unitCost) / recommendedPrice) * 100;
        var unitProfit = recommendedPrice - unitCost;
        var vsMarket = ((recommendedPrice - marketAvg) / marketAvg) * 100;

        document.getElementById("actualMargin").textContent = actualMargin.toFixed(1) + "%";
        document.getElementById("unitProfit").textContent = formatPrice(unitProfit);

        var vsMarketEl = document.getElementById("vsMarket");
        vsMarketEl.textContent = (vsMarket >= 0 ? "+" : "") + vsMarket.toFixed(1) + "%";
        vsMarketEl.style.color =
          vsMarket > 10
            ? "var(--orange)"
            : vsMarket < -10
              ? "var(--accent-green)"
              : "var(--accent-cyan)";

        var competitiveness = "";
        if (recommendedPrice < competitorLow) {
          competitiveness = "价格优势";
          document.getElementById("competitiveness").style.color = "var(--accent-green)";
        } else if (recommendedPrice > competitorHigh) {
          competitiveness = "高端定位";
          document.getElementById("competitiveness").style.color = "var(--orange)";
        } else {
          competitiveness = "中等水平";
          document.getElementById("competitiveness").style.color = "var(--accent-cyan)";
        }
        document.getElementById("competitiveness").textContent = competitiveness;

        document.getElementById("analysisText").textContent = analysis;
      }

      calculate();
    
