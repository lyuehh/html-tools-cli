// @ts-nocheck
// Generated from tools/finance/retirement-calculator.html
// Source SHA-256: 4ffe3afde733d4a7985689f9f6446de7df7ada5ad0ccb884a31cae939e889b7f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const currentAge = parseInt(document.getElementById("currentAge").value) || 0;
        const retireAge = parseInt(document.getElementById("retireAge").value) || 60;
        const lifeExpectancy = parseInt(document.getElementById("lifeExpectancy").value) || 85;
        const currentSavings = parseFloat(document.getElementById("currentSavings").value) || 0;
        const monthlySavings = parseFloat(document.getElementById("monthlySavings").value) || 0;
        const returnRate = (parseFloat(document.getElementById("returnRate").value) || 0) / 100;
        const monthlyExpense = parseFloat(document.getElementById("monthlyExpense").value) || 0;
        const inflationRate =
          (parseFloat(document.getElementById("inflationRate").value) || 0) / 100;
        const pension = parseFloat(document.getElementById("pension").value) || 0;

        const yearsToRetire = Math.max(0, retireAge - currentAge);
        const retirementYears = Math.max(0, lifeExpectancy - retireAge);

        // 退休时的月支出（考虑通胀）
        const futureMonthlyExpense = monthlyExpense * Math.pow(1 + inflationRate, yearsToRetire);

        // 退休后每月净支出（扣除社保）
        const futurePension = pension * Math.pow(1 + inflationRate * 0.5, yearsToRetire); // 假设养老金增长为通胀的一半
        const netMonthlyExpense = Math.max(0, futureMonthlyExpense - futurePension);

        // 退休所需总资金（简化计算：净支出 × 月数，实际应考虑退休后的投资收益）
        const monthsInRetirement = retirementYears * 12;
        const targetAmount = netMonthlyExpense * monthsInRetirement;

        // 预计退休时积累的资金
        const monthlyRate = returnRate / 12;
        const totalMonths = yearsToRetire * 12;

        let projectedSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
        if (monthlyRate > 0) {
          projectedSavings +=
            monthlySavings * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        } else {
          projectedSavings += monthlySavings * totalMonths;
        }

        // 缺口/盈余
        const gap = projectedSavings - targetAmount;

        // 进度百分比
        const progressPercent =
          targetAmount > 0 ? Math.min(100, (projectedSavings / targetAmount) * 100) : 0;

        // 建议储蓄金额
        let suggestedSavings = monthlySavings;
        if (gap < 0 && totalMonths > 0 && monthlyRate > 0) {
          const shortfall = -gap;
          const currentFV = currentSavings * Math.pow(1 + monthlyRate, totalMonths);
          const neededFromSavings = targetAmount - currentFV;
          suggestedSavings =
            neededFromSavings / ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
        }

        const fmt = (n) =>
          "¥" +
          Math.abs(n).toLocaleString("zh-CN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });

        document.getElementById("targetAmount").textContent = fmt(targetAmount);
        document.getElementById("yearsToRetire").textContent = yearsToRetire + " 年";
        document.getElementById("projectedSavings").textContent = fmt(projectedSavings);

        const gapEl = document.getElementById("gap");
        gapEl.textContent = (gap >= 0 ? "+" : "-") + fmt(gap);
        gapEl.style.color = gap >= 0 ? "#10b981" : "#ef4444";

        document.getElementById("progressPercent").textContent = progressPercent.toFixed(1) + "%";
        document.getElementById("progressFill").style.width = progressPercent + "%";

        document.getElementById("futureExpense").textContent = fmt(futureMonthlyExpense);
        document.getElementById("netExpense").textContent = fmt(netMonthlyExpense);
        document.getElementById("retirementYears").textContent = retirementYears + " 年";
        document.getElementById("suggestedSavings").textContent = fmt(
          Math.max(0, suggestedSavings)
        );

        // 状态提示
        const statusEl = document.getElementById("status");
        if (gap >= 0) {
          statusEl.className = "status good";
          statusEl.textContent =
            "恭喜！按当前储蓄计划，您可以实现退休目标，还有 " + fmt(gap) + " 的盈余。";
        } else if (progressPercent >= 70) {
          statusEl.className = "status warn";
          statusEl.textContent =
            "接近目标！还有 " + fmt(-gap) + " 的缺口，建议适当增加储蓄或延后退休年龄。";
        } else {
          statusEl.className = "status bad";
          statusEl.textContent =
            "需要调整！目前存在 " +
            fmt(-gap) +
            " 的资金缺口，建议将月储蓄提高到 " +
            fmt(suggestedSavings) +
            "。";
        }
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
    
