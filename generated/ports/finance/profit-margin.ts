// @ts-nocheck
// Generated from tools/finance/profit-margin.html
// Source SHA-256: 5e3cc4c95da1f7c9d63f17394e80b820bde1785305d37114f4f3c93335fc06fc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "margin";

      function setMode(mode) {
        currentMode = mode;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelector('[data-mode="' + mode + '"]').classList.add("active");

        document.getElementById("marginSection").style.display =
          mode === "margin" ? "block" : "none";
        document.getElementById("pricingSection").style.display =
          mode === "pricing" ? "block" : "none";
        document.getElementById("breakevenSection").style.display =
          mode === "breakeven" ? "block" : "none";
      }

      function calculateMargin() {
        const revenue = parseFloat(document.getElementById("revenue").value) || 0;
        const cost = parseFloat(document.getElementById("cost").value) || 0;
        const expenses = parseFloat(document.getElementById("expenses").value) || 0;

        const grossProfit = revenue - cost;
        const netProfit = revenue - cost - expenses;

        const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
        const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        document.getElementById("grossMargin").textContent = grossMargin.toFixed(1) + "%";
        document.getElementById("netMargin").textContent = netMargin.toFixed(1) + "%";
        document.getElementById("markup").textContent = markup.toFixed(1) + "%";
        document.getElementById("grossProfit").textContent = fmt(grossProfit);
        document.getElementById("netProfit").textContent = fmt(netProfit);
      }

      function calculatePricing() {
        const unitCost = parseFloat(document.getElementById("unitCost").value) || 0;
        const targetMargin = parseFloat(document.getElementById("targetMargin").value) / 100 || 0;

        // 售价 = 成本 / (1 - 目标利润率)
        const suggestedPrice = targetMargin < 1 ? unitCost / (1 - targetMargin) : 0;
        const unitProfit = suggestedPrice - unitCost;
        const actualMarkup = unitCost > 0 ? (unitProfit / unitCost) * 100 : 0;

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.getElementById("suggestedPrice").textContent = fmt(suggestedPrice);
        document.getElementById("unitProfit").textContent = fmt(unitProfit);
        document.getElementById("actualMarkup").textContent = actualMarkup.toFixed(1) + "%";
      }

      function calculateBreakeven() {
        const fixedCost = parseFloat(document.getElementById("fixedCost").value) || 0;
        const variableCost = parseFloat(document.getElementById("variableCost").value) || 0;
        const sellingPrice = parseFloat(document.getElementById("sellingPrice").value) || 0;

        const contributionMargin = sellingPrice - variableCost;
        const contributionRatio = sellingPrice > 0 ? (contributionMargin / sellingPrice) * 100 : 0;

        const breakevenUnits =
          contributionMargin > 0 ? Math.ceil(fixedCost / contributionMargin) : 0;
        const breakevenRevenue = breakevenUnits * sellingPrice;

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        document.getElementById("breakevenUnits").textContent =
          breakevenUnits.toLocaleString() + " 件";
        document.getElementById("breakevenRevenue").textContent = fmt(breakevenRevenue);
        document.getElementById("contributionMargin").textContent = fmt(contributionMargin);
        document.getElementById("contributionRatio").textContent =
          contributionRatio.toFixed(1) + "%";
      }

      calculateMargin();
      calculatePricing();
      calculateBreakeven();

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
    
