// @ts-nocheck
// Generated from tools/realestate/rent-vs-buy.html
// Source SHA-256: 987765e7fa8a9d16ad9019436639749a1840f69f94beae3fb12ce40360f03695
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (num >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function analyze() {
        var monthlyRent = parseFloat(document.getElementById("monthlyRent").value) || 0;
        var housePrice = parseFloat(document.getElementById("housePrice").value) * 10000 || 0;
        var downPaymentRatio =
          parseFloat(document.getElementById("downPaymentRatio").value) / 100 || 0.3;
        var loanRate = parseFloat(document.getElementById("loanRate").value) / 100 || 0.042;
        var loanYears = parseInt(document.getElementById("loanYears").value) || 30;
        var analysisYears = parseInt(document.getElementById("analysisYears").value) || 10;
        var houseGrowthRate =
          parseFloat(document.getElementById("houseGrowthRate").value) / 100 || 0.03;
        var rentGrowthRate =
          parseFloat(document.getElementById("rentGrowthRate").value) / 100 || 0.03;
        var investmentRate =
          parseFloat(document.getElementById("investmentRate").value) / 100 || 0.05;

        var downPayment = housePrice * downPaymentRatio;
        var loanAmount = housePrice - downPayment;
        var monthlyRate = loanRate / 12;
        var totalMonths = loanYears * 12;
        var analysisMonths = analysisYears * 12;

        // 计算月供（等额本息）
        var monthlyPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);

        // 租房方案计算
        var totalRent = 0;
        var currentRent = monthlyRent;
        for (var i = 0; i < analysisMonths; i++) {
          if (i > 0 && i % 12 === 0) {
            currentRent *= 1 + rentGrowthRate;
          }
          totalRent += currentRent;
        }

        // 首付如果用于投资的收益
        var investmentGain = downPayment * (Math.pow(1 + investmentRate, analysisYears) - 1);
        var rentNetWorth = downPayment + investmentGain - totalRent;

        // 买房方案计算
        var totalMortgage = monthlyPayment * analysisMonths;
        var futureHouseValue = housePrice * Math.pow(1 + houseGrowthRate, analysisYears);

        // 计算剩余贷款本金
        var remainingLoan = 0;
        var principal = loanAmount;
        for (var j = 0; j < analysisMonths && j < totalMonths; j++) {
          var interest = principal * monthlyRate;
          var principalPart = monthlyPayment - interest;
          principal -= principalPart;
        }
        remainingLoan = Math.max(0, principal);

        var buyNetWorth = futureHouseValue - remainingLoan - downPayment - totalMortgage;

        // 显示结果
        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("totalRent").textContent = formatMoney(totalRent);
        document.getElementById("investmentGain").textContent = "+" + formatMoney(investmentGain);
        document.getElementById("rentNetWorth").textContent = formatMoney(rentNetWorth);

        document.getElementById("downPayment").textContent = formatMoney(downPayment);
        document.getElementById("totalMortgage").textContent = formatMoney(totalMortgage);
        document.getElementById("futureHouseValue").textContent = formatMoney(futureHouseValue);
        document.getElementById("remainingLoan").textContent = formatMoney(remainingLoan);
        document.getElementById("buyNetWorth").textContent = formatMoney(buyNetWorth);

        // 推荐建议
        var rec = document.getElementById("recommendation");
        var recIcon = document.getElementById("recIcon");
        var recText = document.getElementById("recText");
        var recReason = document.getElementById("recReason");

        var diff = buyNetWorth - rentNetWorth;

        if (diff > 0) {
          rec.className = "recommendation buy";
          recIcon.textContent = "🏠";
          recText.textContent = "建议买房";
          recReason.textContent = analysisYears + "年后，买房比租房净资产多 " + formatMoney(diff);
        } else {
          rec.className = "recommendation rent";
          recIcon.textContent = "🏢";
          recText.textContent = "建议租房";
          recReason.textContent = analysisYears + "年后，租房比买房净资产多 " + formatMoney(-diff);
        }

        document.getElementById("analysisNote").textContent =
          "本分析基于以下假设：" +
          analysisYears +
          "年分析期内，房价年均增长" +
          (houseGrowthRate * 100).toFixed(1) +
          "%，" +
          "租金年均增长" +
          (rentGrowthRate * 100).toFixed(1) +
          "%，" +
          "闲置资金投资年化收益" +
          (investmentRate * 100).toFixed(1) +
          "%。" +
          "实际情况可能因市场变化而不同，请综合考虑个人需求和风险偏好做出决策。";
      }

      // 初始计算
      analyze();

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
    
