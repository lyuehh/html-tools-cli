// @ts-nocheck
// Generated from tools/realestate/lpr-calc.html
// Source SHA-256: e4d183baebf278e1372e214c23ab2599ec7b5694f32f78901d10638390a7060f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + "元";
      }

      function calcMonthlyPayment(principal, monthlyRate, months, type) {
        if (type === "equal") {
          if (monthlyRate === 0) return principal / months;
          return (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
          );
        } else {
          return principal / months + principal * monthlyRate;
        }
      }

      function calcRemainingPrincipal(principal, monthlyRate, totalMonths, paidMonths, type) {
        if (paidMonths >= totalMonths) return 0;

        if (type === "equal") {
          var monthlyPayment = calcMonthlyPayment(principal, monthlyRate, totalMonths, type);
          var remaining = principal;
          for (var i = 0; i < paidMonths; i++) {
            var interest = remaining * monthlyRate;
            var principalPart = monthlyPayment - interest;
            remaining -= principalPart;
          }
          return Math.max(0, remaining);
        } else {
          var monthlyPrincipal = principal / totalMonths;
          return principal - monthlyPrincipal * paidMonths;
        }
      }

      function calcRemainingInterest(remainingPrincipal, monthlyRate, remainingMonths, type) {
        if (type === "equal") {
          var monthlyPayment = calcMonthlyPayment(
            remainingPrincipal,
            monthlyRate,
            remainingMonths,
            type
          );
          return monthlyPayment * remainingMonths - remainingPrincipal;
        } else {
          var totalInterest = 0;
          var principal = remainingPrincipal;
          var monthlyPrincipal = remainingPrincipal / remainingMonths;
          for (var i = 0; i < remainingMonths; i++) {
            totalInterest += principal * monthlyRate;
            principal -= monthlyPrincipal;
          }
          return totalInterest;
        }
      }

      function calculate() {
        var principal = parseFloat(document.getElementById("principal").value) * 10000 || 0;
        var loanYears = parseInt(document.getElementById("loanYears").value) || 30;
        var paidMonths = parseInt(document.getElementById("paidMonths").value) || 0;
        var paymentType = document.getElementById("paymentType").value;
        var oldRate = parseFloat(document.getElementById("oldRate").value) / 100 || 0.049;
        var newLpr = parseFloat(document.getElementById("newLpr").value) / 100 || 0.036;
        var bpAdd = parseFloat(document.getElementById("bpAdd").value) / 10000 || 0;

        var newRate = newLpr + bpAdd;
        var totalMonths = loanYears * 12;
        var remainingMonths = totalMonths - paidMonths;

        if (remainingMonths <= 0) {
          alert("已还期数超过贷款期限！");
          return;
        }

        var oldMonthlyRate = oldRate / 12;
        var newMonthlyRate = newRate / 12;

        // 计算剩余本金
        var remainingPrincipal = calcRemainingPrincipal(
          principal,
          oldMonthlyRate,
          totalMonths,
          paidMonths,
          paymentType
        );

        // 调整前
        var oldMonthly = calcMonthlyPayment(
          remainingPrincipal,
          oldMonthlyRate,
          remainingMonths,
          paymentType
        );
        var oldInterest = calcRemainingInterest(
          remainingPrincipal,
          oldMonthlyRate,
          remainingMonths,
          paymentType
        );
        var oldTotal = remainingPrincipal + oldInterest;

        // 调整后
        var newMonthly = calcMonthlyPayment(
          remainingPrincipal,
          newMonthlyRate,
          remainingMonths,
          paymentType
        );
        var newInterest = calcRemainingInterest(
          remainingPrincipal,
          newMonthlyRate,
          remainingMonths,
          paymentType
        );
        var newTotal = remainingPrincipal + newInterest;

        // 节省
        var savingsMonthly = oldMonthly - newMonthly;
        var savingsYearly = savingsMonthly * 12;
        var savingsTotal = oldTotal - newTotal;

        // 显示结果
        document.getElementById("resultSection").classList.remove("hidden");

        var changeEl = document.getElementById("monthlyChange");
        if (savingsMonthly > 0) {
          changeEl.textContent = "每月减少 " + formatMoney(savingsMonthly);
          changeEl.parentElement.style.background =
            "linear-gradient(135deg, var(--accent-green), #059669)";
        } else if (savingsMonthly < 0) {
          changeEl.textContent = "每月增加 " + formatMoney(-savingsMonthly);
          changeEl.parentElement.style.background =
            "linear-gradient(135deg, var(--accent-red), #dc2626)";
        } else {
          changeEl.textContent = "月供不变";
        }

        document.getElementById("oldRateDisplay").textContent = (oldRate * 100).toFixed(2) + "%";
        document.getElementById("oldMonthly").textContent = formatMoney(oldMonthly);
        document.getElementById("oldInterest").textContent = formatMoney(oldInterest);
        document.getElementById("oldTotal").textContent = formatMoney(oldTotal);

        document.getElementById("newRateDisplay").textContent = (newRate * 100).toFixed(2) + "%";
        document.getElementById("newMonthly").textContent = formatMoney(newMonthly);
        document.getElementById("newInterest").textContent = formatMoney(newInterest);
        document.getElementById("newTotal").textContent = formatMoney(newTotal);

        document.getElementById("savingsMonthly").textContent =
          (savingsMonthly >= 0 ? "" : "-") + formatMoney(Math.abs(savingsMonthly));
        document.getElementById("savingsYearly").textContent =
          (savingsYearly >= 0 ? "" : "-") + formatMoney(Math.abs(savingsYearly));
        document.getElementById("savingsTotal").textContent =
          (savingsTotal >= 0 ? "" : "-") + formatMoney(Math.abs(savingsTotal));

        var greenColor = "var(--accent-green)";
        var redColor = "var(--accent-red)";
        document.getElementById("savingsMonthly").style.color =
          savingsMonthly >= 0 ? greenColor : redColor;
        document.getElementById("savingsYearly").style.color =
          savingsYearly >= 0 ? greenColor : redColor;
        document.getElementById("savingsTotal").style.color =
          savingsTotal >= 0 ? greenColor : redColor;
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
    
