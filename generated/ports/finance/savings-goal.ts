// @ts-nocheck
// Generated from tools/finance/savings-goal.html
// Source SHA-256: ec48838c785a52ec177d8cb83c0cd257ba6cd9e150ab29f3c6b6ab9259951e8e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const goalAmount = parseFloat(document.getElementById("goalAmount").value) || 0;
        const months = parseInt(document.getElementById("months").value) || 1;
        const currentSavings = parseFloat(document.getElementById("currentSavings").value) || 0;
        const returnRate = (parseFloat(document.getElementById("returnRate").value) || 0) / 100;

        const remaining = Math.max(0, goalAmount - currentSavings);

        // 计算每月需储蓄（考虑复利）
        let monthlyRequired;
        if (returnRate > 0) {
          const monthlyRate = returnRate / 12;
          // 先计算现有储蓄的增长
          const futureValueOfCurrent = currentSavings * Math.pow(1 + monthlyRate, months);
          const stillNeeded = goalAmount - futureValueOfCurrent;

          if (stillNeeded <= 0) {
            monthlyRequired = 0;
          } else {
            // PMT 公式
            monthlyRequired = (stillNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
          }
        } else {
          monthlyRequired = remaining / months;
        }

        monthlyRequired = Math.max(0, monthlyRequired);

        // 计算预计利息收益
        let totalContribution = currentSavings + monthlyRequired * months;
        let finalAmount;
        if (returnRate > 0) {
          const monthlyRate = returnRate / 12;
          finalAmount = currentSavings * Math.pow(1 + monthlyRate, months);
          if (monthlyRequired > 0) {
            finalAmount +=
              monthlyRequired * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
          }
        } else {
          finalAmount = totalContribution;
        }
        const interestEarned = finalAmount - totalContribution;

        // 进度百分比
        const progress = goalAmount > 0 ? (currentSavings / goalAmount) * 100 : 0;

        // 目标日期
        const targetDate = new Date();
        targetDate.setMonth(targetDate.getMonth() + months);

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        document.getElementById("monthlyRequired").textContent = fmt(monthlyRequired);
        document.getElementById("targetDate").textContent =
          "预计 " + targetDate.getFullYear() + "年" + (targetDate.getMonth() + 1) + "月达成目标";

        document.getElementById("currentAmount").textContent = fmt(currentSavings);
        document.getElementById("goalAmountDisplay").textContent = fmt(goalAmount);
        document.getElementById("progressFill").style.width = Math.min(100, progress) + "%";
        document.getElementById("progressFill").textContent = progress.toFixed(1) + "%";

        document.getElementById("remaining").textContent = fmt(remaining);
        document.getElementById("interestEarned").textContent = fmt(interestEarned);
        document.getElementById("weeklyRequired").textContent = fmt(monthlyRequired / 4.33);
        document.getElementById("dailyRequired").textContent = fmt(monthlyRequired / 30);

        // 生成里程碑
        generateMilestones(goalAmount, currentSavings, monthlyRequired, months, returnRate);
      }

      function generateMilestones(goal, current, monthly, totalMonths, rate) {
        const container = document.getElementById("milestones");
        container.textContent = "";

        const milestones = [25, 50, 75, 100];
        const monthlyRate = rate / 12;

        milestones.forEach((percent) => {
          const targetAmount = goal * (percent / 100);
          if (targetAmount <= current) {
            // 已达成
            const div = createMilestone(
              "✓",
              percent + "% - " + formatMoney(targetAmount),
              "已达成",
              true
            );
            container.appendChild(div);
          } else {
            // 计算达成时间
            let months = 0;
            let accumulated = current;

            while (accumulated < targetAmount && months < totalMonths + 120) {
              months++;
              accumulated = accumulated * (1 + monthlyRate) + monthly;
            }

            const date = new Date();
            date.setMonth(date.getMonth() + months);
            const dateStr = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";

            const div = createMilestone(
              percent + "%",
              formatMoney(targetAmount),
              months <= totalMonths ? dateStr : "需延长计划"
            );
            container.appendChild(div);
          }
        });
      }

      function createMilestone(icon, title, date, completed) {
        const div = document.createElement("div");
        div.className = "milestone";
        if (completed) div.style.opacity = "0.6";

        const iconDiv = document.createElement("div");
        iconDiv.className = "milestone-icon";
        iconDiv.textContent = icon;
        if (completed) iconDiv.style.background = "#10b981";

        const infoDiv = document.createElement("div");
        infoDiv.className = "milestone-info";

        const titleDiv = document.createElement("div");
        titleDiv.className = "milestone-title";
        titleDiv.textContent = title;

        const dateDiv = document.createElement("div");
        dateDiv.className = "milestone-date";
        dateDiv.textContent = date;

        infoDiv.appendChild(titleDiv);
        infoDiv.appendChild(dateDiv);
        div.appendChild(iconDiv);
        div.appendChild(infoDiv);

        return div;
      }

      function formatMoney(n) {
        return (
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        );
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
    
