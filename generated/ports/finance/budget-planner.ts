// @ts-nocheck
// Generated from tools/finance/budget-planner.html
// Source SHA-256: 427479c94c3457fff246162e77f10cc4606065ecbe3af031f784ebe08dce75ef
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const categories = {
        housing: { name: "住房", color: "#ef4444" },
        utilities: { name: "水电", color: "#f97316" },
        phone: { name: "通讯", color: "#f59e0b" },
        transport: { name: "交通", color: "#eab308" },
        insurance: { name: "保险", color: "#84cc16" },
        food: { name: "餐饮", color: "#22c55e" },
        daily: { name: "日用", color: "#14b8a6" },
        shopping: { name: "购物", color: "#06b6d4" },
        entertainment: { name: "娱乐", color: "#3b82f6" },
        health: { name: "医疗", color: "#8b5cf6" }
      };

      function calculate() {
        // 计算收入
        const incomes = ["salary", "side", "invest", "other"];
        let totalIncome = 0;
        incomes.forEach((id) => {
          totalIncome += parseFloat(document.getElementById("income_" + id).value) || 0;
        });

        // 计算支出
        const expenses = {};
        let totalExpense = 0;
        Object.keys(categories).forEach((key) => {
          const value = parseFloat(document.getElementById("expense_" + key).value) || 0;
          expenses[key] = value;
          totalExpense += value;
        });

        // 计算储蓄
        const savings = ["regular", "fund", "education", "emergency"];
        let totalSaving = 0;
        savings.forEach((id) => {
          totalSaving += parseFloat(document.getElementById("saving_" + id).value) || 0;
        });

        const balance = totalIncome - totalExpense - totalSaving;

        const fmt = (n) => "¥" + n.toLocaleString("zh-CN");

        document.getElementById("totalIncome").textContent = fmt(totalIncome);
        document.getElementById("totalExpense").textContent = fmt(totalExpense);

        const balanceEl = document.getElementById("balance");
        balanceEl.textContent = fmt(balance);
        balanceEl.style.color = balance >= 0 ? "var(--accent-cyan)" : "var(--accent-red)";

        // 渲染支出占比条
        const barContainer = document.getElementById("expenseBar");
        barContainer.textContent = "";

        const legendContainer = document.getElementById("legend");
        legendContainer.textContent = "";

        if (totalIncome > 0) {
          Object.keys(categories).forEach((key) => {
            const percentage = (expenses[key] / totalIncome) * 100;
            if (percentage > 0) {
              const segment = document.createElement("div");
              segment.className = "progress-segment";
              segment.style.width = percentage + "%";
              segment.style.backgroundColor = categories[key].color;
              if (percentage > 5) {
                segment.textContent = Math.round(percentage) + "%";
              }
              barContainer.appendChild(segment);

              const legendItem = document.createElement("div");
              legendItem.className = "legend-item";

              const dot = document.createElement("div");
              dot.className = "legend-dot";
              dot.style.backgroundColor = categories[key].color;

              const text = document.createElement("span");
              text.textContent = categories[key].name + " " + fmt(expenses[key]);

              legendItem.appendChild(dot);
              legendItem.appendChild(text);
              legendContainer.appendChild(legendItem);
            }
          });
        }

        // 生成建议
        generateAdvice(totalIncome, totalExpense, totalSaving, balance, expenses);
      }

      function generateAdvice(income, expense, saving, balance, expenses) {
        const container = document.getElementById("advice");
        container.textContent = "";

        const savingRate = income > 0 ? (saving / income) * 100 : 0;
        const expenseRate = income > 0 ? (expense / income) * 100 : 0;
        const housingRate = income > 0 ? (expenses.housing / income) * 100 : 0;

        const advices = [];

        // 储蓄率建议
        if (savingRate >= 30) {
          advices.push({
            type: "good",
            title: "储蓄率优秀",
            text:
              "您的储蓄率达到" +
              savingRate.toFixed(1) +
              "%，财务状况非常健康！建议继续保持，并考虑多元化投资。"
          });
        } else if (savingRate >= 20) {
          advices.push({
            type: "good",
            title: "储蓄率良好",
            text: "您的储蓄率为" + savingRate.toFixed(1) + "%，达到了基本的财务安全线。"
          });
        } else if (savingRate >= 10) {
          advices.push({
            type: "warn",
            title: "储蓄率偏低",
            text: "您的储蓄率仅为" + savingRate.toFixed(1) + "%，建议提高到20%以上以应对突发情况。"
          });
        } else {
          advices.push({
            type: "bad",
            title: "储蓄率过低",
            text:
              "您的储蓄率只有" +
              savingRate.toFixed(1) +
              "%，存在较大财务风险，建议尽快调整支出结构。"
          });
        }

        // 住房支出建议
        if (housingRate > 40) {
          advices.push({
            type: "bad",
            title: "住房支出过高",
            text:
              "住房支出占收入的" +
              housingRate.toFixed(1) +
              "%，超过40%的警戒线，会严重影响生活质量。"
          });
        } else if (housingRate > 30) {
          advices.push({
            type: "warn",
            title: "住房压力较大",
            text: "住房支出占收入的" + housingRate.toFixed(1) + "%，建议控制在30%以内。"
          });
        }

        // 结余建议
        if (balance < 0) {
          advices.push({
            type: "bad",
            title: "入不敷出",
            text:
              "当前支出超过收入" + Math.abs(balance).toLocaleString() + "元，请立即调整支出计划！"
          });
        }

        advices.forEach((advice) => {
          const div = document.createElement("div");
          div.className = "advice " + advice.type;

          const title = document.createElement("div");
          title.className = "advice-title";
          title.textContent = advice.title;

          const text = document.createElement("div");
          text.className = "advice-text";
          text.textContent = advice.text;

          div.appendChild(title);
          div.appendChild(text);
          container.appendChild(div);
        });
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
    
