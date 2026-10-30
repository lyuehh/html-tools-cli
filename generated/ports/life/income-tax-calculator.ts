// @ts-nocheck
// Generated from tools/life/income-tax-calculator.html
// Source SHA-256: 5fede62edc4df0d03b85e4414879e4dc0f46d69b0a17342b432d529ed4a25875
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let calcType = "salary";

      // 税率表
      const TAX_BRACKETS = [
        { max: 36000, rate: 0.03, deduction: 0 },
        { max: 144000, rate: 0.1, deduction: 2520 },
        { max: 300000, rate: 0.2, deduction: 16920 },
        { max: 420000, rate: 0.25, deduction: 31920 },
        { max: 660000, rate: 0.3, deduction: 52920 },
        { max: 960000, rate: 0.35, deduction: 85920 },
        { max: Infinity, rate: 0.45, deduction: 181920 }
      ];

      // 年终奖税率表（月换算）
      const BONUS_TAX_BRACKETS = [
        { max: 3000, rate: 0.03, deduction: 0 },
        { max: 12000, rate: 0.1, deduction: 210 },
        { max: 25000, rate: 0.2, deduction: 1410 },
        { max: 35000, rate: 0.25, deduction: 2660 },
        { max: 55000, rate: 0.3, deduction: 4410 },
        { max: 80000, rate: 0.35, deduction: 7160 },
        { max: Infinity, rate: 0.45, deduction: 15160 }
      ];

      /**
       * 设置计算类型
       */
      window.setCalcType = function (type) {
        calcType = type;

        document.querySelectorAll(".tab").forEach((tab, index) => {
          tab.classList.toggle(
            "active",
            (type === "salary" && index === 0) ||
              (type === "bonus" && index === 1) ||
              (type === "annual" && index === 2)
          );
        });

        document.getElementById("salaryPanel").style.display = type === "salary" ? "block" : "none";
        document.getElementById("bonusPanel").style.display = type === "bonus" ? "block" : "none";
        document.getElementById("annualPanel").style.display = type === "annual" ? "block" : "none";

        document.getElementById("resultCard").style.display = "none";
      };

      /**
       * 切换专项扣除
       */
      window.toggleDeduction = function (el) {
        el.classList.toggle("active");
      };

      /**
       * 计算年度个税
       */
      function calculateAnnualTax(taxableIncome) {
        if (taxableIncome <= 0) return { tax: 0, rate: 0, level: 0 };

        for (let i = 0; i < TAX_BRACKETS.length; i++) {
          if (taxableIncome <= TAX_BRACKETS[i].max) {
            return {
              tax: taxableIncome * TAX_BRACKETS[i].rate - TAX_BRACKETS[i].deduction,
              rate: TAX_BRACKETS[i].rate,
              level: i + 1
            };
          }
        }
        return { tax: 0, rate: 0, level: 0 };
      }

      /**
       * 计算年终奖个税（单独计税）
       */
      function calculateBonusTax(bonus) {
        if (bonus <= 0) return { tax: 0, rate: 0 };

        const monthly = bonus / 12;

        for (const bracket of BONUS_TAX_BRACKETS) {
          if (monthly <= bracket.max) {
            return {
              tax: bonus * bracket.rate - bracket.deduction,
              rate: bracket.rate
            };
          }
        }
        return { tax: 0, rate: 0 };
      }

      /**
       * 主计算函数
       */
      window.calculate = function () {
        if (calcType === "salary") {
          calculateSalary();
        } else if (calcType === "bonus") {
          calculateBonus();
        } else {
          calculateAnnual();
        }
      };

      /**
       * 计算工资薪金
       */
      function calculateSalary() {
        const monthlySalary = parseFloat(document.getElementById("monthlySalary").value) || 0;
        const socialInsurance = parseFloat(document.getElementById("socialInsurance").value) || 0;

        // 计算专项附加扣除
        let specialDeduction = 0;
        document.querySelectorAll(".deduction-item.active").forEach((item) => {
          const input = item.querySelector("input");
          specialDeduction += parseFloat(input.value) || 0;
        });

        // 年度计算
        const annualSalary = monthlySalary * 12;
        const annualInsurance = socialInsurance * 12;
        const annualSpecial = specialDeduction * 12;
        const basicDeduction = 60000; // 年度基本扣除

        // 应纳税所得额
        const taxableIncome = Math.max(
          0,
          annualSalary - annualInsurance - annualSpecial - basicDeduction
        );

        // 计算年度税额
        const taxResult = calculateAnnualTax(taxableIncome);
        const annualTax = taxResult.tax;
        const monthlyTax = annualTax / 12;

        // 税后收入
        const afterTaxMonthly = monthlySalary - socialInsurance - monthlyTax;
        const afterTaxAnnual = afterTaxMonthly * 12;

        displaySalaryResult({
          monthlySalary,
          socialInsurance,
          specialDeduction,
          taxableIncome,
          annualTax,
          monthlyTax,
          afterTaxMonthly,
          afterTaxAnnual,
          taxRate: taxResult.rate,
          taxLevel: taxResult.level
        });
      }

      /**
       * 计算年终奖
       */
      function calculateBonus() {
        const bonus = parseFloat(document.getElementById("bonusAmount").value) || 0;
        const taxResult = calculateBonusTax(bonus);
        const afterTax = bonus - taxResult.tax;

        displayBonusResult({
          bonus,
          tax: taxResult.tax,
          rate: taxResult.rate,
          afterTax
        });
      }

      /**
       * 计算年度汇算
       */
      function calculateAnnual() {
        const annualSalary = parseFloat(document.getElementById("annualSalary").value) || 0;
        const annualInsurance = parseFloat(document.getElementById("annualInsurance").value) || 0;
        const annualDeduction = parseFloat(document.getElementById("annualDeduction").value) || 0;
        const prepaidTax = parseFloat(document.getElementById("prepaidTax").value) || 0;

        const basicDeduction = 60000;
        const taxableIncome = Math.max(
          0,
          annualSalary - annualInsurance - annualDeduction - basicDeduction
        );
        const taxResult = calculateAnnualTax(taxableIncome);

        const shouldPay = taxResult.tax;
        const diff = shouldPay - prepaidTax;

        displayAnnualResult({
          annualSalary,
          annualInsurance,
          annualDeduction,
          taxableIncome,
          shouldPay,
          prepaidTax,
          diff,
          taxRate: taxResult.rate,
          taxLevel: taxResult.level
        });
      }

      /**
       * 显示工资结果
       */
      function displaySalaryResult(data) {
        const resultCard = document.getElementById("resultCard");

        document.getElementById("resultHero").innerHTML = `
                <div class="label">每月应缴个税</div>
                <div class="value">¥ ${formatMoney(data.monthlyTax)}</div>
                <div class="sub">税后月收入约 ¥${formatMoney(data.afterTaxMonthly)}</div>
            `;

        document.getElementById("resultGrid").innerHTML = `
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.monthlySalary)}</div>
                    <div class="label">税前月薪</div>
                </div>
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.socialInsurance)}</div>
                    <div class="label">五险一金</div>
                </div>
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.specialDeduction)}</div>
                    <div class="label">专项附加扣除</div>
                </div>
                <div class="result-item">
                    <div class="value green">¥${formatMoney(data.afterTaxMonthly)}</div>
                    <div class="label">税后月收入</div>
                </div>
            `;

        document.getElementById("taxBreakdown").innerHTML = `
                <div class="title">📝 计算明细</div>
                <table class="breakdown-table">
                    <tr><td>年度收入</td><td>¥${formatMoney(data.monthlySalary * 12)}</td></tr>
                    <tr><td>- 年度五险一金</td><td>¥${formatMoney(data.socialInsurance * 12)}</td></tr>
                    <tr><td>- 年度专项附加扣除</td><td>¥${formatMoney(data.specialDeduction * 12)}</td></tr>
                    <tr><td>- 基本扣除（6万）</td><td>¥60,000.00</td></tr>
                    <tr><td><strong>年度应纳税所得额</strong></td><td class="highlight">¥${formatMoney(data.taxableIncome)}</td></tr>
                    <tr><td>适用税率</td><td>${(data.taxRate * 100).toFixed(0)}%</td></tr>
                    <tr><td><strong>年度应纳个税</strong></td><td class="highlight">¥${formatMoney(data.annualTax)}</td></tr>
                    <tr><td><strong>月均个税</strong></td><td class="highlight">¥${formatMoney(data.monthlyTax)}</td></tr>
                </table>
            `;

        // 高亮对应税率档
        highlightTaxLevel(data.taxLevel);

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 显示年终奖结果
       */
      function displayBonusResult(data) {
        const resultCard = document.getElementById("resultCard");

        document.getElementById("resultHero").innerHTML = `
                <div class="label">年终奖应缴个税</div>
                <div class="value">¥ ${formatMoney(data.tax)}</div>
                <div class="sub">税后到手约 ¥${formatMoney(data.afterTax)}</div>
            `;

        document.getElementById("resultGrid").innerHTML = `
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.bonus)}</div>
                    <div class="label">年终奖金额</div>
                </div>
                <div class="result-item">
                    <div class="value">${(data.rate * 100).toFixed(0)}%</div>
                    <div class="label">适用税率</div>
                </div>
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.tax)}</div>
                    <div class="label">应缴个税</div>
                </div>
                <div class="result-item">
                    <div class="value green">¥${formatMoney(data.afterTax)}</div>
                    <div class="label">税后金额</div>
                </div>
            `;

        document.getElementById("taxBreakdown").innerHTML = `
                <div class="title">📝 计算明细（单独计税）</div>
                <table class="breakdown-table">
                    <tr><td>年终奖金额</td><td>¥${formatMoney(data.bonus)}</td></tr>
                    <tr><td>÷ 12个月</td><td>¥${formatMoney(data.bonus / 12)}</td></tr>
                    <tr><td>适用税率</td><td>${(data.rate * 100).toFixed(0)}%</td></tr>
                    <tr><td><strong>应纳税额</strong></td><td class="highlight">¥${formatMoney(data.tax)}</td></tr>
                </table>
            `;

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 显示年度汇算结果
       */
      function displayAnnualResult(data) {
        const resultCard = document.getElementById("resultCard");

        const action = data.diff > 0 ? "需补缴" : data.diff < 0 ? "可退税" : "无需补退";
        const actionClass = data.diff > 0 ? "" : "green";

        document.getElementById("resultHero").innerHTML = `
                <div class="label">${action}</div>
                <div class="value" style="color: ${data.diff > 0 ? "var(--accent-cyan)" : "var(--accent-green)"}">¥ ${formatMoney(Math.abs(data.diff))}</div>
                <div class="sub">年度应纳税额 ¥${formatMoney(data.shouldPay)}</div>
            `;

        document.getElementById("resultGrid").innerHTML = `
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.annualSalary)}</div>
                    <div class="label">年度总收入</div>
                </div>
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.taxableIncome)}</div>
                    <div class="label">应纳税所得额</div>
                </div>
                <div class="result-item">
                    <div class="value">¥${formatMoney(data.shouldPay)}</div>
                    <div class="label">应纳税额</div>
                </div>
                <div class="result-item">
                    <div class="value ${actionClass}">¥${formatMoney(Math.abs(data.diff))}</div>
                    <div class="label">${action}</div>
                </div>
            `;

        document.getElementById("taxBreakdown").innerHTML = `
                <div class="title">📝 汇算明细</div>
                <table class="breakdown-table">
                    <tr><td>年度收入</td><td>¥${formatMoney(data.annualSalary)}</td></tr>
                    <tr><td>- 年度五险一金</td><td>¥${formatMoney(data.annualInsurance)}</td></tr>
                    <tr><td>- 专项附加扣除</td><td>¥${formatMoney(data.annualDeduction)}</td></tr>
                    <tr><td>- 基本扣除</td><td>¥60,000.00</td></tr>
                    <tr><td><strong>应纳税所得额</strong></td><td class="highlight">¥${formatMoney(data.taxableIncome)}</td></tr>
                    <tr><td>适用税率</td><td>${(data.taxRate * 100).toFixed(0)}%</td></tr>
                    <tr><td><strong>应纳税额</strong></td><td>¥${formatMoney(data.shouldPay)}</td></tr>
                    <tr><td>已预缴税额</td><td>¥${formatMoney(data.prepaidTax)}</td></tr>
                    <tr><td><strong>${action}</strong></td><td class="highlight">¥${formatMoney(Math.abs(data.diff))}</td></tr>
                </table>
            `;

        highlightTaxLevel(data.taxLevel);

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 高亮税率档位
       */
      function highlightTaxLevel(level) {
        document.querySelectorAll(".rate-row").forEach((row, index) => {
          row.classList.toggle("active", index === level - 1);
        });
      }

      /**
       * 格式化金额
       */
      function formatMoney(num) {
        return num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      /**
       * 主题切换
       */
      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      // 初始化
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
