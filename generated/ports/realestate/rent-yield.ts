// @ts-nocheck
// Generated from tools/realestate/rent-yield.html
// Source SHA-256: 85b8298482002c2e35f23c0f7d83d57d3dc79b715eb8de91632d44f0fce68e2f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatMoney(num) {
        return (
          num.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + "元"
        );
      }

      function calculate() {
        const housePrice = parseFloat(document.getElementById("housePrice").value) * 10000;
        const monthlyRent = parseFloat(document.getElementById("monthlyRent").value);
        const propertyFee = parseFloat(document.getElementById("propertyFee").value);
        const maintenanceFee = parseFloat(document.getElementById("maintenanceFee").value);
        const vacancyMonths = parseFloat(document.getElementById("vacancyMonths").value);
        const agencyRate = parseFloat(document.getElementById("agencyRate").value) / 100;

        if (!housePrice || housePrice <= 0 || !monthlyRent || monthlyRent <= 0) {
          return;
        }

        // 计算
        const yearlyGrossRent = monthlyRent * 12;
        const vacancyLoss = monthlyRent * vacancyMonths;
        const effectiveRent = yearlyGrossRent - vacancyLoss;
        const agencyFee = effectiveRent * agencyRate;
        const totalExpenses = propertyFee + maintenanceFee + agencyFee;
        const netRent = effectiveRent - totalExpenses;

        const grossYield = (yearlyGrossRent / housePrice) * 100;
        const netYield = (netRent / housePrice) * 100;
        const rentToPrice = housePrice / monthlyRent;
        const paybackYears = netRent > 0 ? housePrice / netRent : Infinity;

        // 显示结果
        document.getElementById("result").style.display = "block";

        document.getElementById("grossYield").textContent = grossYield.toFixed(2) + "%";

        const netYieldEl = document.getElementById("netYield");
        netYieldEl.textContent = netYield.toFixed(2) + "%";
        if (netYield >= 4) {
          netYieldEl.className = "result-value green";
        } else if (netYield >= 3) {
          netYieldEl.className = "result-value cyan";
        } else if (netYield >= 2) {
          netYieldEl.className = "result-value yellow";
        } else {
          netYieldEl.className = "result-value red";
        }

        document.getElementById("rentToPrice").textContent = "1:" + Math.round(rentToPrice);
        document.getElementById("paybackYears").textContent =
          paybackYears < 100 ? paybackYears.toFixed(1) + "年" : "> 100年";

        // 收益明细
        document.getElementById("grossIncome").textContent = formatMoney(yearlyGrossRent);
        document.getElementById("vacancyLoss").textContent = "-" + formatMoney(vacancyLoss);
        document.getElementById("propertyFeeOut").textContent = "-" + formatMoney(propertyFee);
        document.getElementById("maintenanceFeeOut").textContent =
          "-" + formatMoney(maintenanceFee);
        document.getElementById("agencyFeeOut").textContent = "-" + formatMoney(agencyFee);
        document.getElementById("netIncome").textContent = formatMoney(netRent);

        // 评级
        updateRating(netYield);
      }

      function updateRating(yieldRate) {
        const bar = document.getElementById("ratingBar");
        const badge = document.getElementById("gradeBadge");
        const text = document.getElementById("gradeText");

        let grade, gradeClass, gradeText, barWidth, barColor;

        if (yieldRate >= 5) {
          grade = "A+";
          gradeClass = "grade-A";
          gradeText = "极佳投资机会，回报率显著高于市场平均水平";
          barWidth = 100;
          barColor = "var(--accent-green)";
        } else if (yieldRate >= 4) {
          grade = "A";
          gradeClass = "grade-A";
          gradeText = "优秀的投资回报，值得考虑";
          barWidth = 85;
          barColor = "var(--accent-green)";
        } else if (yieldRate >= 3) {
          grade = "B";
          gradeClass = "grade-B";
          gradeText = "良好的投资回报，接近或超过银行理财收益";
          barWidth = 65;
          barColor = "var(--color-accent-cyan)";
        } else if (yieldRate >= 2) {
          grade = "C";
          gradeClass = "grade-C";
          gradeText = "一般回报水平，需结合房产增值潜力综合考虑";
          barWidth = 45;
          barColor = "var(--accent-yellow)";
        } else if (yieldRate >= 1) {
          grade = "D";
          gradeClass = "grade-D";
          gradeText = "回报率较低，主要依赖房产增值获利";
          barWidth = 25;
          barColor = "var(--accent-orange)";
        } else {
          grade = "F";
          gradeClass = "grade-F";
          gradeText = "回报率过低，纯投资角度不建议";
          barWidth = 10;
          barColor = "var(--accent-red)";
        }

        bar.style.width = barWidth + "%";
        bar.style.background = barColor;
        badge.textContent = grade;
        badge.className = "grade-badge " + gradeClass;
        text.textContent = gradeText;
      }

      function clearAll() {
        document.getElementById("housePrice").value = "";
        document.getElementById("monthlyRent").value = "";
        document.getElementById("propertyFee").value = "3600";
        document.getElementById("maintenanceFee").value = "2000";
        document.getElementById("vacancyMonths").value = "0.5";
        document.getElementById("agencyRate").value = "5";
        document.getElementById("result").style.display = "none";
      }

      function toggleTheme() {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      }

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
        calculate();
      })();
    
