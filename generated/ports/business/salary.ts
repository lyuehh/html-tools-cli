// @ts-nocheck
// Generated from tools/business/salary.html
// Source SHA-256: 7973904ca3144a37e9ee84be44da1f264cafedb5ff8d6b0b8db3caac93b6819d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.body.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function formatMoney(num) {
        return num.toFixed(2) + "元";
      }

      function calculateTax(taxableIncome) {
        // 年度累计应纳税所得额对应税率（简化为月度计算）
        var monthlyTaxable = taxableIncome;
        var tax = 0;

        if (monthlyTaxable <= 0) {
          tax = 0;
        } else if (monthlyTaxable <= 3000) {
          tax = monthlyTaxable * 0.03;
        } else if (monthlyTaxable <= 12000) {
          tax = monthlyTaxable * 0.1 - 210;
        } else if (monthlyTaxable <= 25000) {
          tax = monthlyTaxable * 0.2 - 1410;
        } else if (monthlyTaxable <= 35000) {
          tax = monthlyTaxable * 0.25 - 2660;
        } else if (monthlyTaxable <= 55000) {
          tax = monthlyTaxable * 0.3 - 4410;
        } else if (monthlyTaxable <= 80000) {
          tax = monthlyTaxable * 0.35 - 7160;
        } else {
          tax = monthlyTaxable * 0.45 - 15160;
        }

        return Math.max(0, tax);
      }

      function calculate() {
        var grossSalary = parseFloat(document.getElementById("grossSalary").value) || 0;
        var socialBase = parseFloat(document.getElementById("socialBase").value) || grossSalary;
        var fundBase = parseFloat(document.getElementById("fundBase").value) || grossSalary;
        var fundRate = parseFloat(document.getElementById("fundRate").value) / 100 || 0.12;

        // 专项附加扣除
        var specialDeductions =
          (parseFloat(document.getElementById("childEducation").value) || 0) +
          (parseFloat(document.getElementById("continuingEducation").value) || 0) +
          (parseFloat(document.getElementById("housingLoan").value) || 0) +
          (parseFloat(document.getElementById("housingRent").value) || 0) +
          (parseFloat(document.getElementById("elderlySupport").value) || 0) +
          (parseFloat(document.getElementById("babycare").value) || 0);

        // 社保个人部分
        var pension = socialBase * 0.08;
        var medical = socialBase * 0.02;
        var unemployment = socialBase * 0.005;
        var socialPersonal = pension + medical + unemployment;

        // 公积金个人部分
        var fundPersonal = fundBase * fundRate;

        // 应纳税所得额
        var taxableIncome = grossSalary - socialPersonal - fundPersonal - 5000 - specialDeductions;
        var incomeTax = calculateTax(taxableIncome);

        // 实发工资
        var totalDeduction = socialPersonal + fundPersonal + incomeTax;
        var netSalary = grossSalary - totalDeduction;

        // 企业部分
        var socialCompany = socialBase * (0.16 + 0.08 + 0.005 + 0.004); // 养老16%+医疗8%+失业0.5%+工伤0.4%
        var fundCompany = fundBase * fundRate;
        var totalCost = grossSalary + socialCompany + fundCompany;

        // 显示结果
        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("netSalary").textContent = formatMoney(netSalary);
        document.getElementById("socialPersonal").textContent = formatMoney(socialPersonal);
        document.getElementById("fundPersonal").textContent = formatMoney(fundPersonal);
        document.getElementById("incomeTax").textContent = formatMoney(incomeTax);
        document.getElementById("totalDeduction").textContent = formatMoney(totalDeduction);

        document.getElementById("detailGross").textContent = formatMoney(grossSalary);
        document.getElementById("detailPension").textContent = "-" + formatMoney(pension);
        document.getElementById("detailMedical").textContent = "-" + formatMoney(medical);
        document.getElementById("detailUnemployment").textContent = "-" + formatMoney(unemployment);
        document.getElementById("detailFund").textContent = "-" + formatMoney(fundPersonal);
        document.getElementById("detailSpecial").textContent = formatMoney(specialDeductions);
        document.getElementById("detailTaxable").textContent = formatMoney(
          Math.max(0, taxableIncome)
        );
        document.getElementById("detailTax").textContent = "-" + formatMoney(incomeTax);
        document.getElementById("detailNet").textContent = formatMoney(netSalary);

        document.getElementById("socialCompany").textContent = formatMoney(socialCompany);
        document.getElementById("fundCompany").textContent = formatMoney(fundCompany);
        document.getElementById("totalCost").textContent = formatMoney(totalCost);
      }

      calculate();
    
