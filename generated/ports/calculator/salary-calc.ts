// @ts-nocheck
// Generated from tools/calculator/salary-calc.html
// Source SHA-256: 1e66e9626a73983146b4618f2ed8273848b55501245c6c00cd9628c515750430
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const cityData = {
        beijing: {
          pensionBase: [6326, 35283],
          housingBase: [2420, 34435],
          medicalBase: [6326, 35283]
        },
        shanghai: {
          pensionBase: [7310, 36549],
          housingBase: [2690, 36549],
          medicalBase: [7310, 36549]
        },
        guangzhou: {
          pensionBase: [5284, 26421],
          housingBase: [2300, 41613],
          medicalBase: [5284, 26421]
        },
        shenzhen: {
          pensionBase: [2360, 27501],
          housingBase: [2360, 41190],
          medicalBase: [2360, 27501]
        },
        hangzhou: {
          pensionBase: [4812, 26541],
          housingBase: [2280, 26541],
          medicalBase: [4812, 26541]
        },
        chengdu: {
          pensionBase: [4511, 25633],
          housingBase: [2100, 32876],
          medicalBase: [4511, 25633]
        }
      };

      const taxBrackets = [
        { limit: 36000, rate: 0.03, deduction: 0 },
        { limit: 144000, rate: 0.1, deduction: 2520 },
        { limit: 300000, rate: 0.2, deduction: 16920 },
        { limit: 420000, rate: 0.25, deduction: 31920 },
        { limit: 660000, rate: 0.3, deduction: 52920 },
        { limit: 960000, rate: 0.35, deduction: 85920 },
        { limit: Infinity, rate: 0.45, deduction: 181920 }
      ];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      function formatMoney(num) {
        return (
          "¥" + num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        );
      }

      window.updateBase = function () {
        const city = document.getElementById("city").value;
        const salary = parseFloat(document.getElementById("grossSalary").value) || 0;
        if (city !== "custom" && cityData[city]) {
          document.getElementById("pensionBase").value = salary;
          document.getElementById("medicalBase").value = salary;
          document.getElementById("unemploymentBase").value = salary;
          document.getElementById("housingBase").value = salary;
        }
      };

      function calculateTax(yearlyTaxableIncome) {
        for (const bracket of taxBrackets) {
          if (yearlyTaxableIncome <= bracket.limit) {
            return yearlyTaxableIncome * bracket.rate - bracket.deduction;
          }
        }
        return 0;
      }

      window.calculate = function () {
        const grossSalary = parseFloat(document.getElementById("grossSalary").value) || 0;

        // 五险一金
        const pensionBase = parseFloat(document.getElementById("pensionBase").value) || grossSalary;
        const medicalBase = parseFloat(document.getElementById("medicalBase").value) || grossSalary;
        const unemploymentBase =
          parseFloat(document.getElementById("unemploymentBase").value) || grossSalary;
        const housingBase = parseFloat(document.getElementById("housingBase").value) || grossSalary;

        const pensionRate = parseFloat(document.getElementById("pensionRate").value) / 100;
        const medicalRate = parseFloat(document.getElementById("medicalRate").value) / 100;
        const unemploymentRate =
          parseFloat(document.getElementById("unemploymentRate").value) / 100;
        const housingRate = parseFloat(document.getElementById("housingRate").value) / 100;

        const pension = pensionBase * pensionRate;
        const medical = medicalBase * medicalRate;
        const unemployment = unemploymentBase * unemploymentRate;
        const housing = housingBase * housingRate;
        const socialTotal = pension + medical + unemployment + housing;

        // 专项附加扣除
        const childEducation = parseFloat(document.getElementById("childEducation").value) || 0;
        const continuingEducation =
          parseFloat(document.getElementById("continuingEducation").value) || 0;
        const housingLoan = parseFloat(document.getElementById("housingLoan").value) || 0;
        const housingRent = parseFloat(document.getElementById("housingRent").value) || 0;
        const elderlySupport = parseFloat(document.getElementById("elderlySupport").value) || 0;
        const babycare = parseFloat(document.getElementById("babycare").value) || 0;
        const specialDeductions =
          childEducation +
          continuingEducation +
          housingLoan +
          housingRent +
          elderlySupport +
          babycare;

        // 计算年度累计个税（模拟12个月）
        const threshold = 5000; // 起征点
        let yearlyTax = 0;
        let monthlyTaxes = [];

        for (let month = 1; month <= 12; month++) {
          const cumulativeIncome = grossSalary * month;
          const cumulativeSocial = socialTotal * month;
          const cumulativeThreshold = threshold * month;
          const cumulativeSpecial = specialDeductions * month;

          const cumulativeTaxableIncome = Math.max(
            0,
            cumulativeIncome - cumulativeSocial - cumulativeThreshold - cumulativeSpecial
          );
          const cumulativeTax = calculateTax(cumulativeTaxableIncome);
          const monthTax = cumulativeTax - yearlyTax;
          yearlyTax = cumulativeTax;
          monthlyTaxes.push(monthTax);
        }

        // 假设当前月份（使用平均月税）
        const avgMonthlyTax = yearlyTax / 12;
        const currentMonthTax = monthlyTaxes[0]; // 第一个月的税

        // 应纳税所得额
        const taxableIncome = Math.max(
          0,
          grossSalary - socialTotal - threshold - specialDeductions
        );

        // 税后工资
        const netSalary = grossSalary - socialTotal - currentMonthTax;

        // 更新显示
        document.getElementById("grossDisplay").textContent = formatMoney(grossSalary);
        document.getElementById("pensionDeduct").textContent = "-" + formatMoney(pension);
        document.getElementById("medicalDeduct").textContent = "-" + formatMoney(medical);
        document.getElementById("unemploymentDeduct").textContent = "-" + formatMoney(unemployment);
        document.getElementById("housingDeduct").textContent = "-" + formatMoney(housing);
        document.getElementById("socialTotal").textContent = "-" + formatMoney(socialTotal);
        document.getElementById("taxableIncome").textContent = formatMoney(taxableIncome);
        document.getElementById("taxDeduct").textContent = "-" + formatMoney(currentMonthTax);
        document.getElementById("netSalary").textContent = formatMoney(netSalary);

        // 年度汇总
        document.getElementById("yearlyGross").textContent = formatMoney(grossSalary * 12);
        document.getElementById("yearlySocial").textContent = "-" + formatMoney(socialTotal * 12);
        document.getElementById("yearlyTax").textContent = "-" + formatMoney(yearlyTax);
        document.getElementById("yearlyNet").textContent = formatMoney(
          grossSalary * 12 - socialTotal * 12 - yearlyTax
        );
      };

      loadTheme();
      calculate();
    
