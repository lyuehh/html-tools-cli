// @ts-nocheck
// Generated from tools/finance/tax-calculator.html
// Source SHA-256: b262ebb45d09766e67d9569b3d4499ce5dea98a08c00ed60a959704c5b8fc958
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 2024年个税税率表（月度）
      const taxBrackets = [
        { min: 0, max: 3000, rate: 3, deduction: 0 },
        { min: 3000, max: 12000, rate: 10, deduction: 210 },
        { min: 12000, max: 25000, rate: 20, deduction: 1410 },
        { min: 25000, max: 35000, rate: 25, deduction: 2660 },
        { min: 35000, max: 55000, rate: 30, deduction: 4410 },
        { min: 55000, max: 80000, rate: 35, deduction: 7160 },
        { min: 80000, max: Infinity, rate: 45, deduction: 15160 }
      ];

      const threshold = 5000; // 起征点

      function calculate() {
        const salary = parseFloat(document.getElementById("salary").value) || 0;
        const insurance = parseFloat(document.getElementById("insurance").value) || 0;
        const deductions = parseFloat(document.getElementById("deductions").value) || 0;

        // 应纳税所得额 = 税前工资 - 起征点 - 五险一金 - 专项附加扣除
        const taxableIncome = Math.max(0, salary - threshold - insurance - deductions);

        // 查找适用税率
        let tax = 0;
        let currentRate = 0;
        let currentBracketIndex = 0;

        for (let i = 0; i < taxBrackets.length; i++) {
          const bracket = taxBrackets[i];
          if (taxableIncome > bracket.min) {
            currentRate = bracket.rate;
            currentBracketIndex = i;
            if (taxableIncome <= bracket.max) {
              tax = (taxableIncome * bracket.rate) / 100 - bracket.deduction;
              break;
            }
          }
        }

        tax = Math.max(0, tax);
        const netSalary = salary - insurance - tax;

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        document.getElementById("taxAmount").textContent = fmt(tax);
        document.getElementById("grossSalary").textContent = fmt(salary);
        document.getElementById("insuranceDisplay").textContent = fmt(insurance);
        document.getElementById("deductionsDisplay").textContent = fmt(deductions);
        document.getElementById("taxableIncome").textContent = fmt(taxableIncome);
        document.getElementById("taxRate").textContent = currentRate + "%";
        document.getElementById("netSalary").textContent = fmt(netSalary);

        // 渲染税率表
        renderTaxBrackets(currentBracketIndex);
      }

      function renderTaxBrackets(activeIndex) {
        const container = document.getElementById("taxBrackets");
        container.textContent = "";

        taxBrackets.forEach((bracket, index) => {
          const div = document.createElement("div");
          div.className = "tax-bracket" + (index === activeIndex ? " active" : "");

          const rateDiv = document.createElement("div");
          rateDiv.className = "rate";
          rateDiv.textContent = bracket.rate + "% 税率";

          const rangeDiv = document.createElement("div");
          rangeDiv.className = "range";
          const maxText = bracket.max === Infinity ? "以上" : " - ¥" + bracket.max.toLocaleString();
          rangeDiv.textContent =
            "¥" + bracket.min.toLocaleString() + maxText + "，速算扣除数: ¥" + bracket.deduction;

          div.appendChild(rateDiv);
          div.appendChild(rangeDiv);
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
    
