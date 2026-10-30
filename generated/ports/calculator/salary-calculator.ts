// @ts-nocheck
// Generated from tools/calculator/salary-calculator.html
// Source SHA-256: 996e63abfda368e65463677dbf805f7559e78432ebd8f95085dad846e39442f8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function calculate() {
        const salary = parseFloat(document.getElementById("salary").value) || 0;
        const base = parseFloat(document.getElementById("base").value) || salary;
        const fundRate = parseFloat(document.getElementById("fundRate").value);
        const deduction = parseFloat(document.getElementById("deduction").value) || 0;

        // 五险一金计算
        const pension = base * 0.08;
        const medical = base * 0.02;
        const unemployment = base * 0.005;
        const fund = base * fundRate;
        const totalInsurance = pension + medical + unemployment + fund;

        // 应税收入 = 税前工资 - 五险一金 - 起征点(5000) - 专项附加扣除
        const taxableIncome = Math.max(0, salary - totalInsurance - 5000 - deduction);

        // 个税计算（累进税率）
        let tax = 0;
        if (taxableIncome <= 3000) tax = taxableIncome * 0.03;
        else if (taxableIncome <= 12000) tax = taxableIncome * 0.1 - 210;
        else if (taxableIncome <= 25000) tax = taxableIncome * 0.2 - 1410;
        else if (taxableIncome <= 35000) tax = taxableIncome * 0.25 - 2660;
        else if (taxableIncome <= 55000) tax = taxableIncome * 0.3 - 4410;
        else if (taxableIncome <= 80000) tax = taxableIncome * 0.35 - 7160;
        else tax = taxableIncome * 0.45 - 15160;
        tax = Math.max(0, tax);

        const netSalary = salary - totalInsurance - tax;

        document.getElementById("netSalary").textContent = "¥" + netSalary.toFixed(2);
        document.getElementById("gross").textContent = "¥" + salary.toFixed(2);
        document.getElementById("pension").textContent = "-¥" + pension.toFixed(2);
        document.getElementById("medical").textContent = "-¥" + medical.toFixed(2);
        document.getElementById("unemployment").textContent = "-¥" + unemployment.toFixed(2);
        document.getElementById("fund").textContent = "-¥" + fund.toFixed(2);
        document.getElementById("tax").textContent = "-¥" + tax.toFixed(2);
        document.getElementById("net").textContent = "¥" + netSalary.toFixed(2);
      }

      document
        .querySelectorAll("input, select")
        .forEach((el) => el.addEventListener("input", calculate));
      calculate();
    
