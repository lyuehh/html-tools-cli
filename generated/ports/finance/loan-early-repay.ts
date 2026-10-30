// @ts-nocheck
// Generated from tools/finance/loan-early-repay.html
// Source SHA-256: 9a12a4a3e3e7dede15d53bfd1599cb148b2a27b38cab14c733e609a842bce476
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let repayMethod = "equal_payment";
      let earlyOption = "reduce_years";

      function setMethod(method) {
        repayMethod = method;
        document
          .querySelectorAll(".method-selector")[0]
          .querySelectorAll(".method-btn")
          .forEach((btn, i) => {
            btn.classList.toggle(
              "active",
              (method === "equal_payment" && i === 0) || (method === "equal_principal" && i === 1)
            );
          });
        calculate();
      }

      function setOption(option) {
        earlyOption = option;
        document
          .querySelectorAll(".method-selector")[1]
          .querySelectorAll(".method-btn")
          .forEach((btn, i) => {
            btn.classList.toggle(
              "active",
              (option === "reduce_years" && i === 0) || (option === "reduce_payment" && i === 1)
            );
          });
        calculate();
      }

      function calculateEqualPayment(principal, rate, months) {
        const monthlyRate = rate / 12;
        const payment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
        return payment;
      }

      function getRemainingPrincipal(loanAmount, rate, totalMonths, paidMonths, method) {
        const monthlyRate = rate / 12;

        if (method === "equal_payment") {
          const payment = calculateEqualPayment(loanAmount, rate, totalMonths);
          let remaining = loanAmount;

          for (let i = 0; i < paidMonths; i++) {
            const interest = remaining * monthlyRate;
            const principalPaid = payment - interest;
            remaining -= principalPaid;
          }

          return remaining;
        } else {
          const monthlyPrincipal = loanAmount / totalMonths;
          return loanAmount - monthlyPrincipal * paidMonths;
        }
      }

      function calculateTotalInterest(principal, rate, months, method) {
        const monthlyRate = rate / 12;
        let totalInterest = 0;

        if (method === "equal_payment") {
          const payment = calculateEqualPayment(principal, rate, months);
          totalInterest = payment * months - principal;
        } else {
          const monthlyPrincipal = principal / months;
          let remaining = principal;

          for (let i = 0; i < months; i++) {
            totalInterest += remaining * monthlyRate;
            remaining -= monthlyPrincipal;
          }
        }

        return totalInterest;
      }

      function calculate() {
        const loanAmount = parseFloat(document.getElementById("loanAmount").value) * 10000 || 0;
        const loanYears = parseInt(document.getElementById("loanYears").value) || 0;
        const rate = parseFloat(document.getElementById("rate").value) / 100 || 0;
        const paidMonths = parseInt(document.getElementById("paidMonths").value) || 0;
        const earlyAmount = parseFloat(document.getElementById("earlyAmount").value) * 10000 || 0;

        const totalMonths = loanYears * 12;
        const remainingMonths = totalMonths - paidMonths;

        // Before early repayment
        const remainingPrincipal = getRemainingPrincipal(
          loanAmount,
          rate,
          totalMonths,
          paidMonths,
          repayMethod
        );
        const oldInterest = calculateTotalInterest(
          remainingPrincipal,
          rate,
          remainingMonths,
          repayMethod
        );
        const oldPayment =
          repayMethod === "equal_payment"
            ? calculateEqualPayment(loanAmount, rate, totalMonths)
            : remainingPrincipal / remainingMonths + (remainingPrincipal * rate) / 12;

        // After early repayment
        const newPrincipal = Math.max(0, remainingPrincipal - earlyAmount);

        let newMonths, newPayment, newInterest;

        if (earlyOption === "reduce_years") {
          // Keep payment same, reduce years
          newPayment = oldPayment;
          // Calculate new months needed
          if (repayMethod === "equal_payment") {
            const monthlyRate = rate / 12;
            newMonths = Math.ceil(
              Math.log(newPayment / (newPayment - newPrincipal * monthlyRate)) /
                Math.log(1 + monthlyRate)
            );
          } else {
            const monthlyPrincipal = newPrincipal / remainingMonths;
            newMonths = Math.ceil(newPrincipal / (oldPayment - (newPrincipal * rate) / 12 / 2));
          }
          newMonths = Math.min(newMonths, remainingMonths);
        } else {
          // Keep years same, reduce payment
          newMonths = remainingMonths;
          newPayment =
            repayMethod === "equal_payment"
              ? calculateEqualPayment(newPrincipal, rate, newMonths)
              : newPrincipal / newMonths + (newPrincipal * rate) / 12;
        }

        newInterest = calculateTotalInterest(newPrincipal, rate, newMonths, repayMethod);

        const savings = oldInterest - newInterest;

        // Update display
        document.getElementById("totalSavings").textContent =
          "¥" + Math.round(savings).toLocaleString();

        document.getElementById("oldPayment").textContent =
          "¥" + Math.round(oldPayment).toLocaleString();
        document.getElementById("oldMonths").textContent = remainingMonths + "月";
        document.getElementById("oldPrincipal").textContent =
          "¥" + Math.round(remainingPrincipal).toLocaleString();
        document.getElementById("oldInterest").textContent =
          "¥" + Math.round(oldInterest).toLocaleString();

        document.getElementById("newPayment").textContent =
          "¥" + Math.round(newPayment).toLocaleString();
        document.getElementById("newMonths").textContent = newMonths + "月";
        document.getElementById("newPrincipal").textContent =
          "¥" + Math.round(newPrincipal).toLocaleString();
        document.getElementById("newInterest").textContent =
          "¥" + Math.round(newInterest).toLocaleString();

        // Generate tips
        generateTips(savings, earlyAmount, newMonths, remainingMonths, newPayment, oldPayment);
      }

      function generateTips(savings, earlyAmount, newMonths, oldMonths, newPayment, oldPayment) {
        const tips = [];

        tips.push(
          `💰 提前还款 ${(earlyAmount / 10000).toFixed(0)} 万元，节省利息 ${(savings / 10000).toFixed(1)} 万元`
        );

        if (earlyOption === "reduce_years") {
          const reducedMonths = oldMonths - newMonths;
          const years = Math.floor(reducedMonths / 12);
          const months = reducedMonths % 12;
          tips.push(
            `⏰ 提前 ${years > 0 ? years + "年" : ""}${months > 0 ? months + "个月" : ""} 还清贷款`
          );
        } else {
          const reduction = oldPayment - newPayment;
          tips.push(`📉 月供减少 ${Math.round(reduction).toLocaleString()} 元，减轻还款压力`);
        }

        tips.push("📋 提前还款可能需要支付违约金，建议咨询银行");
        tips.push("💡 如有更高收益投资机会，可考虑不提前还款");

        document.getElementById("tips").innerHTML = tips.join("<br>");
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
    
