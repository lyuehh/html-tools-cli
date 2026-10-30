// @ts-nocheck
// Generated from tools/realestate/property-roi.html
// Source SHA-256: 078333a28f9192683d5e6abdf5f2604c0108d9f6df86f201a25f12d84935e625
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculate() {
        var purchasePrice = parseFloat(document.getElementById("purchasePrice").value) * 10000 || 0;
        var downPayment = parseFloat(document.getElementById("downPayment").value) * 10000 || 0;
        var loanRate = parseFloat(document.getElementById("loanRate").value) / 100 || 0.042;
        var loanYears = parseInt(document.getElementById("loanYears").value) || 30;
        var renovationCost =
          parseFloat(document.getElementById("renovationCost").value) * 10000 || 0;
        var otherCost = parseFloat(document.getElementById("otherCost").value) * 10000 || 0;
        var monthlyRent = parseFloat(document.getElementById("monthlyRent").value) || 0;
        var vacancyRate = parseFloat(document.getElementById("vacancyRate").value) / 100 || 0.05;
        var maintenanceCost = parseFloat(document.getElementById("maintenanceCost").value) || 0;
        var propertyFee = parseFloat(document.getElementById("propertyFee").value) || 0;
        var appreciationRate =
          parseFloat(document.getElementById("appreciationRate").value) / 100 || 0.03;
        var holdingYears = parseInt(document.getElementById("holdingYears").value) || 10;

        var loanAmount = purchasePrice - downPayment;
        var monthlyRate = loanRate / 12;
        var totalMonths = loanYears * 12;
        var holdingMonths = holdingYears * 12;

        var monthlyPayment = 0;
        if (loanAmount > 0 && monthlyRate > 0) {
          monthlyPayment =
            (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        }

        var totalCost = downPayment + renovationCost + otherCost;

        var annualGrossRent = monthlyRent * 12 * (1 - vacancyRate);
        var annualCosts = maintenanceCost + propertyFee * 12;
        var annualNetRent = annualGrossRent - annualCosts;
        var totalNetRentalIncome = annualNetRent * holdingYears;

        var futureValue = purchasePrice * Math.pow(1 + appreciationRate, holdingYears);
        var appreciation = futureValue - purchasePrice;

        var totalMortgagePayments = monthlyPayment * Math.min(holdingMonths, totalMonths);
        var remainingPrincipal = 0;
        var principal = loanAmount;
        for (var i = 0; i < Math.min(holdingMonths, totalMonths); i++) {
          var interest = principal * monthlyRate;
          var principalPart = monthlyPayment - interest;
          principal -= principalPart;
        }
        remainingPrincipal = Math.max(0, principal);
        var paidPrincipal = loanAmount - remainingPrincipal;
        var totalInterest = totalMortgagePayments - paidPrincipal;

        var netProfit = totalNetRentalIncome + appreciation - totalInterest;

        var totalROI = ((netProfit / totalCost) * 100) / holdingYears;

        var rentalYield = (annualNetRent / purchasePrice) * 100;

        var capitalGainRate = ((appreciation / purchasePrice) * 100) / holdingYears;

        var annualCashFlow = annualNetRent - monthlyPayment * 12;
        var cashOnCashReturn = (annualCashFlow / totalCost) * 100;

        var leverageRatio = purchasePrice / totalCost;

        var paybackPeriod = totalCost / annualNetRent;

        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("totalROI").textContent = totalROI.toFixed(2) + "%";
        document.getElementById("totalCost").textContent = formatMoney(totalCost);
        document.getElementById("netRentalIncome").textContent =
          "+" + formatMoney(totalNetRentalIncome);
        document.getElementById("appreciation").textContent = "+" + formatMoney(appreciation);
        document.getElementById("totalInterest").textContent = "-" + formatMoney(totalInterest);

        var netProfitEl = document.getElementById("netProfit");
        netProfitEl.textContent = formatMoney(netProfit);
        netProfitEl.className = "result-value " + (netProfit >= 0 ? "green" : "red");

        document.getElementById("paybackPeriod").textContent = paybackPeriod.toFixed(1) + "年";
        document.getElementById("rentalYield").textContent = rentalYield.toFixed(2) + "%";
        document.getElementById("capitalGainRate").textContent = capitalGainRate.toFixed(2) + "%";
        document.getElementById("cashOnCashReturn").textContent = cashOnCashReturn.toFixed(2) + "%";
        document.getElementById("leverageRatio").textContent = leverageRatio.toFixed(2) + "x";

        var timeline = document.getElementById("timeline");
        while (timeline.firstChild) {
          timeline.removeChild(timeline.firstChild);
        }
        var cumulativeRent = 0;
        var cumulativeInterest = 0;
        var principalTrack = loanAmount;

        for (var year = 1; year <= Math.min(holdingYears, 10); year++) {
          cumulativeRent += annualNetRent;
          var yearInterest = 0;
          for (var m = 0; m < 12; m++) {
            yearInterest += principalTrack * monthlyRate;
            principalTrack -= monthlyPayment - principalTrack * monthlyRate;
          }
          cumulativeInterest += yearInterest;
          var yearAppreciation = purchasePrice * (Math.pow(1 + appreciationRate, year) - 1);
          var yearNetProfit = cumulativeRent + yearAppreciation - cumulativeInterest;

          var item = document.createElement("div");
          item.className = "timeline-item";
          var yearLabel = document.createElement("span");
          yearLabel.textContent = "第" + year + "年";
          var yearValue = document.createElement("span");
          yearValue.textContent = "累计净收益: " + formatMoney(yearNetProfit);
          yearValue.style.color = yearNetProfit >= 0 ? "var(--accent-green)" : "var(--accent-red)";
          item.appendChild(yearLabel);
          item.appendChild(yearValue);
          timeline.appendChild(item);
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
    
