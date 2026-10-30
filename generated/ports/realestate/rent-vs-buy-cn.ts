// @ts-nocheck
// Generated from tools/realestate/rent-vs-buy-cn.html
// Source SHA-256: eb9bb4b49157cb7ee3e3cdd18897d3b5d747ede489c07db6f0f5cead0e404432
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Calculate monthly payment for equal payment method
      function calculateMonthlyPayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        if (monthlyRate === 0) return principal / months;

        const payment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
        return payment;
      }

      // Calculate compound interest
      function calculateCompoundInterest(principal, annualRate, years, monthlyDeposit = 0) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;

        // Future value of initial principal
        let futureValue = principal * Math.pow(1 + monthlyRate, months);

        // Future value of monthly deposits
        if (monthlyDeposit > 0 && monthlyRate > 0) {
          futureValue += (monthlyDeposit * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
        } else if (monthlyDeposit > 0) {
          futureValue += monthlyDeposit * months;
        }

        return futureValue;
      }

      function calculate() {
        const housePrice = parseFloat(document.getElementById("housePrice").value) * 10000;
        const monthlyRent = parseFloat(document.getElementById("monthlyRent").value);
        const downPaymentPercent = parseFloat(document.getElementById("downPayment").value);
        const loanYears = parseFloat(document.getElementById("loanYears").value);
        const interestRate = parseFloat(document.getElementById("interestRate").value);
        const compareYears = parseFloat(document.getElementById("compareYears").value);
        const houseAppreciation = parseFloat(document.getElementById("houseAppreciation").value);
        const rentIncrease = parseFloat(document.getElementById("rentIncrease").value);
        const investmentReturn = parseFloat(document.getElementById("investmentReturn").value);

        // Buy scenario
        const downPaymentAmount = (housePrice * downPaymentPercent) / 100;
        const loanAmount = housePrice - downPaymentAmount;
        const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanYears);

        // Calculate total payment over compare years
        const monthsToPay = Math.min(compareYears * 12, loanYears * 12);
        const totalPayment = downPaymentAmount + monthlyPayment * monthsToPay;

        // House value after appreciation
        const futureHouseValue = housePrice * Math.pow(1 + houseAppreciation / 100, compareYears);

        // Remaining loan
        let remainingLoan = 0;
        if (compareYears < loanYears) {
          const monthlyRate = interestRate / 100 / 12;
          const totalMonths = loanYears * 12;
          remainingLoan =
            (loanAmount *
              (Math.pow(1 + monthlyRate, totalMonths) - Math.pow(1 + monthlyRate, monthsToPay))) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        const buyNetWorth = futureHouseValue - remainingLoan;

        // Rent scenario
        let totalRent = 0;
        let currentRent = monthlyRent;
        for (let year = 0; year < compareYears; year++) {
          totalRent += currentRent * 12;
          currentRent *= 1 + rentIncrease / 100;
        }

        // Investment returns
        const downPaymentReturn = calculateCompoundInterest(
          downPaymentAmount,
          investmentReturn,
          compareYears
        );

        // Monthly savings invested (if monthly payment > rent)
        let monthlySavings = 0;
        if (monthlyPayment > monthlyRent) {
          const avgSavings =
            monthlyPayment -
            (monthlyRent + monthlyRent * Math.pow(1 + rentIncrease / 100, compareYears)) / 2;
          monthlySavings = calculateCompoundInterest(0, investmentReturn, compareYears, avgSavings);
        }

        const totalReturn = downPaymentReturn + monthlySavings;
        const rentNetWorth = totalReturn - totalRent;

        // Update UI
        document.getElementById("buyDownPayment").textContent =
          "¥" + (downPaymentAmount / 10000).toFixed(1) + "万";
        document.getElementById("buyMonthlyPayment").textContent = "¥" + monthlyPayment.toFixed(0);
        document.getElementById("buyTotalPayment").textContent =
          "¥" + (totalPayment / 10000).toFixed(1) + "万";
        document.getElementById("buyHouseValue").textContent =
          "¥" + (futureHouseValue / 10000).toFixed(1) + "万";
        document.getElementById("buyNetWorth").textContent =
          "¥" + (buyNetWorth / 10000).toFixed(1) + "万";

        document.getElementById("rentTotalRent").textContent =
          "¥" + (totalRent / 10000).toFixed(1) + "万";
        document.getElementById("rentDownPaymentReturn").textContent =
          "¥" + (downPaymentReturn / 10000).toFixed(1) + "万";
        document.getElementById("rentMonthlySavings").textContent =
          "¥" + (monthlySavings / 10000).toFixed(1) + "万";
        document.getElementById("rentTotalReturn").textContent =
          "¥" + (totalReturn / 10000).toFixed(1) + "万";
        document.getElementById("rentNetWorth").textContent =
          "¥" + (rentNetWorth / 10000).toFixed(1) + "万";

        // Determine winner
        const buyCard = document.getElementById("buyCard");
        const rentCard = document.getElementById("rentCard");
        buyCard.classList.remove("winner");
        rentCard.classList.remove("winner");

        let analysis = "";
        if (buyNetWorth > rentNetWorth) {
          buyCard.classList.add("winner");
          const advantage = ((buyNetWorth - rentNetWorth) / 10000).toFixed(1);
          analysis = `
          <div class="analysis-item">
            <span class="analysis-icon">📈</span>
            <span>买房方案在 ${compareYears} 年后净资产更高，比租房多 <strong>¥${advantage}万</strong></span>
          </div>
          <div class="analysis-item">
            <span class="analysis-icon">🏠</span>
            <span>拥有自己的房产，享受房价上涨带来的资产增值</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-icon">⚠️</span>
            <span>但需要承担较大的初期资金压力和流动性风险</span>
          </div>
        `;
        } else {
          rentCard.classList.add("winner");
          const advantage = ((rentNetWorth - buyNetWorth) / 10000).toFixed(1);
          analysis = `
          <div class="analysis-item">
            <span class="analysis-icon">💰</span>
            <span>租房方案在 ${compareYears} 年后净资产更高，比买房多 <strong>¥${advantage}万</strong></span>
          </div>
          <div class="analysis-item">
            <span class="analysis-icon">📊</span>
            <span>投资收益率（${investmentReturn}%）高于房价涨幅（${houseAppreciation}%），资金灵活性更好</span>
          </div>
          <div class="analysis-item">
            <span class="analysis-icon">⚠️</span>
            <span>但需要有较强的投资能力和自律性，租房也存在不稳定性</span>
          </div>
        `;
        }

        // Add break-even analysis
        const rentToPrice = (((monthlyRent * 12) / housePrice) * 100).toFixed(2);
        analysis += `
        <div class="analysis-item">
          <span class="analysis-icon">📉</span>
          <span>当前租售比为 ${rentToPrice}%（月租金 × 12 ÷ 房价），国际合理范围为 4-6%</span>
        </div>
      `;

        document.getElementById("analysisContent").innerHTML = analysis;
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
    
