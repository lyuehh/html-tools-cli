// @ts-nocheck
// Generated from tools/finance/investment-return.html
// Source SHA-256: d1cb829e0252f837d1f050a11f7e79fea3f66687ec3716deb843961992ea434f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const initial = parseFloat(document.getElementById("initialInvestment").value) || 0;
        const final = parseFloat(document.getElementById("finalValue").value) || 0;
        const years = parseFloat(document.getElementById("years").value) || 1;
        const dividends = parseFloat(document.getElementById("dividends").value) || 0;

        // 总收益 = 最终价值 + 分红 - 初始投资
        const capitalGain = final - initial;
        const totalProfit = capitalGain + dividends;

        // ROI = (总收益 / 初始投资) * 100%
        const roi = initial > 0 ? (totalProfit / initial) * 100 : 0;

        // 年化收益率 = ((最终价值 + 分红) / 初始投资)^(1/年数) - 1
        const totalValue = final + dividends;
        const annualizedReturn =
          initial > 0 && years > 0 ? (Math.pow(totalValue / initial, 1 / years) - 1) * 100 : 0;

        // 收益倍数
        const multiplier = initial > 0 ? totalValue / initial : 0;

        // 翻倍所需年数 (72法则)
        const doubleYears = annualizedReturn > 0 ? 72 / annualizedReturn : Infinity;

        // 平均每年收益
        const avgYearlyProfit = years > 0 ? totalProfit / years : 0;

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        const fmtPct = (n) => (n >= 0 ? "+" : "") + n.toFixed(2) + "%";

        // 更新核心指标
        const roiEl = document.getElementById("roi");
        roiEl.textContent = fmtPct(roi);
        roiEl.className = "value " + (roi >= 0 ? "profit" : "loss");

        const annualEl = document.getElementById("annualizedReturn");
        annualEl.textContent = fmtPct(annualizedReturn);
        annualEl.className = "value " + (annualizedReturn >= 0 ? "profit" : "loss");

        const profitEl = document.getElementById("totalProfit");
        profitEl.textContent = (totalProfit >= 0 ? "+" : "") + fmt(totalProfit);
        profitEl.className = "value " + (totalProfit >= 0 ? "profit" : "loss");

        document.getElementById("multiplier").textContent = multiplier.toFixed(2) + "x";

        // 更新详细信息
        document.getElementById("displayInitial").textContent = fmt(initial);
        document.getElementById("displayFinal").textContent = fmt(final);
        document.getElementById("displayDividends").textContent = fmt(dividends);
        document.getElementById("capitalGain").textContent =
          (capitalGain >= 0 ? "+" : "") + fmt(capitalGain);
        document.getElementById("displayTotalProfit").textContent =
          (totalProfit >= 0 ? "+" : "") + fmt(totalProfit);
        document.getElementById("avgYearlyProfit").textContent =
          (avgYearlyProfit >= 0 ? "+" : "") + fmt(avgYearlyProfit);
        document.getElementById("doubleYears").textContent =
          doubleYears < 100 ? doubleYears.toFixed(1) + " 年" : "-";
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
    
