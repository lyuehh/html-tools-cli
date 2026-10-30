// @ts-nocheck
// Generated from tools/finance/stock-calculator.html
// Source SHA-256: 7d9ac6552a0f4f161de89c61bd8669d0e09c9ade0b7f985f1bca5d64cf7499b7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const buyPrice = parseFloat(document.getElementById("buyPrice").value) || 0;
        const buyQty = parseFloat(document.getElementById("buyQty").value) || 0;
        const buyFeeRate = parseFloat(document.getElementById("buyFeeRate").value) / 100 || 0;
        const sellPrice = parseFloat(document.getElementById("sellPrice").value) || 0;
        const sellQty = parseFloat(document.getElementById("sellQty").value) || 0;
        const sellFeeRate = parseFloat(document.getElementById("sellFeeRate").value) / 100 || 0;
        const stampTaxRate = parseFloat(document.getElementById("stampTax").value) / 100 || 0;
        const transferFeeRate = parseFloat(document.getElementById("transferFee").value) / 100 || 0;

        // 买入成本计算
        const buyAmount = buyPrice * buyQty;
        const buyFee = Math.max(buyAmount * buyFeeRate, 5); // 最低5元
        const buyTransfer = buyAmount * transferFeeRate;
        const totalCost = buyAmount + buyFee + buyTransfer;

        // 卖出收入计算
        const sellAmount = sellPrice * sellQty;
        const sellFee = Math.max(sellAmount * sellFeeRate, 5);
        const stampTax = sellAmount * stampTaxRate;
        const sellTransfer = sellAmount * transferFeeRate;
        const totalRevenue = sellAmount - sellFee - stampTax - sellTransfer;

        // 总费用
        const totalFees = buyFee + buyTransfer + sellFee + stampTax + sellTransfer;

        // 净盈亏
        const netProfit = totalRevenue - totalCost;

        // 收益率
        const returnRate = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

        // 成本价（含手续费）
        const costPrice = buyQty > 0 ? totalCost / buyQty : 0;

        const fmt = (n) =>
          n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.getElementById("totalCost").textContent = "¥" + fmt(totalCost);
        document.getElementById("totalRevenue").textContent = "¥" + fmt(totalRevenue);
        document.getElementById("totalFees").textContent = "¥" + fmt(totalFees);

        const profitEl = document.getElementById("netProfit");
        profitEl.textContent = (netProfit >= 0 ? "+¥" : "-¥") + fmt(Math.abs(netProfit));
        profitEl.className = "result-value " + (netProfit >= 0 ? "profit" : "loss");

        const rateEl = document.getElementById("returnRate");
        rateEl.textContent = (returnRate >= 0 ? "+" : "") + returnRate.toFixed(2) + "%";
        rateEl.className = "result-value " + (returnRate >= 0 ? "profit" : "loss");

        document.getElementById("costPrice").textContent = "¥" + fmt(costPrice);
      }

      // 初始化
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
    
