// @ts-nocheck
// Generated from tools/life/mortgage-calculator.html
// Source SHA-256: cb62c590dfeb1333b259d1a8d6e6eb68e488457115f280351982cbe948cc34bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentLoanType = "commercial";
      let scheduleVisible = false;

      /**
       * 设置贷款类型
       */
      window.setLoanType = function (type) {
        currentLoanType = type;

        // 更新tab状态
        document.querySelectorAll(".tab").forEach((tab, index) => {
          tab.classList.toggle(
            "active",
            (type === "commercial" && index === 0) ||
              (type === "fund" && index === 1) ||
              (type === "combined" && index === 2)
          );
        });

        // 显示/隐藏对应的利率输入
        document.getElementById("commercialRateGroup").style.display =
          type === "commercial" ? "grid" : "none";
        document.getElementById("fundRateGroup").style.display = type === "fund" ? "grid" : "none";
        document.getElementById("combinedRateGroup").style.display =
          type === "combined" ? "grid" : "none";
      };

      /**
       * 设置预设利率
       */
      window.setRate = function (type, rate) {
        if (type === "commercial") {
          document.getElementById("commercialRate").value = rate;
          document.querySelectorAll("#commercialPresets .rate-preset").forEach((el) => {
            el.classList.toggle(
              "active",
              parseFloat(el.textContent) === rate || el.textContent.includes(rate)
            );
          });
        } else if (type === "fund") {
          document.getElementById("fundRate").value = rate;
          document.querySelectorAll("#fundPresets .rate-preset").forEach((el) => {
            el.classList.toggle("active", el.textContent.includes(rate));
          });
        }
      };

      /**
       * 等额本息计算
       * @param {number} principal - 本金（元）
       * @param {number} monthlyRate - 月利率
       * @param {number} months - 期数
       * @returns {object} 计算结果
       */
      function calculateEqualPayment(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
          const monthlyPayment = principal / months;
          return {
            monthlyPayment: monthlyPayment,
            totalPayment: principal,
            totalInterest: 0,
            schedule: Array.from({ length: months }, (_, i) => ({
              month: i + 1,
              payment: monthlyPayment,
              principal: monthlyPayment,
              interest: 0,
              remaining: principal - monthlyPayment * (i + 1)
            }))
          };
        }

        // 等额本息公式: M = P * [r(1+r)^n] / [(1+r)^n - 1]
        const monthlyPayment =
          (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

        const schedule = [];
        let remaining = principal;
        let totalInterest = 0;

        for (let i = 0; i < months; i++) {
          const interest = remaining * monthlyRate;
          const principalPart = monthlyPayment - interest;
          remaining -= principalPart;
          totalInterest += interest;

          schedule.push({
            month: i + 1,
            payment: monthlyPayment,
            principal: principalPart,
            interest: interest,
            remaining: Math.max(0, remaining)
          });
        }

        return {
          monthlyPayment: monthlyPayment,
          totalPayment: monthlyPayment * months,
          totalInterest: totalInterest,
          schedule: schedule
        };
      }

      /**
       * 等额本金计算
       * @param {number} principal - 本金（元）
       * @param {number} monthlyRate - 月利率
       * @param {number} months - 期数
       * @returns {object} 计算结果
       */
      function calculateEqualPrincipal(principal, monthlyRate, months) {
        const monthlyPrincipal = principal / months;
        const schedule = [];
        let remaining = principal;
        let totalInterest = 0;

        for (let i = 0; i < months; i++) {
          const interest = remaining * monthlyRate;
          const payment = monthlyPrincipal + interest;
          remaining -= monthlyPrincipal;
          totalInterest += interest;

          schedule.push({
            month: i + 1,
            payment: payment,
            principal: monthlyPrincipal,
            interest: interest,
            remaining: Math.max(0, remaining)
          });
        }

        return {
          firstMonthPayment: schedule[0].payment,
          lastMonthPayment: schedule[months - 1].payment,
          monthlyDecrease: monthlyPrincipal * monthlyRate,
          totalPayment: principal + totalInterest,
          totalInterest: totalInterest,
          schedule: schedule
        };
      }

      /**
       * 主计算函数
       */
      window.calculate = function () {
        const loanYears = parseInt(document.getElementById("loanYears").value);
        const months = loanYears * 12;

        let principal, monthlyRate;

        if (currentLoanType === "commercial") {
          principal = parseFloat(document.getElementById("loanAmount").value) * 10000;
          const annualRate = parseFloat(document.getElementById("commercialRate").value);
          monthlyRate = annualRate / 100 / 12;
        } else if (currentLoanType === "fund") {
          principal = parseFloat(document.getElementById("loanAmount").value) * 10000;
          const annualRate = parseFloat(document.getElementById("fundRate").value);
          monthlyRate = annualRate / 100 / 12;
        } else {
          // 组合贷款 - 分别计算
          const commercialAmount =
            parseFloat(document.getElementById("commercialAmount").value) * 10000;
          const fundAmount = parseFloat(document.getElementById("fundAmount").value) * 10000;
          const commercialRate =
            parseFloat(document.getElementById("combinedCommercialRate").value) / 100 / 12;
          const fundRate = parseFloat(document.getElementById("combinedFundRate").value) / 100 / 12;

          const commercialEqual = calculateEqualPayment(commercialAmount, commercialRate, months);
          const fundEqual = calculateEqualPayment(fundAmount, fundRate, months);
          const commercialPrincipal = calculateEqualPrincipal(
            commercialAmount,
            commercialRate,
            months
          );
          const fundPrincipal = calculateEqualPrincipal(fundAmount, fundRate, months);

          displayCombinedResult({
            equalPayment: {
              monthlyPayment: commercialEqual.monthlyPayment + fundEqual.monthlyPayment,
              totalPayment: commercialEqual.totalPayment + fundEqual.totalPayment,
              totalInterest: commercialEqual.totalInterest + fundEqual.totalInterest
            },
            equalPrincipal: {
              firstMonthPayment:
                commercialPrincipal.firstMonthPayment + fundPrincipal.firstMonthPayment,
              lastMonthPayment:
                commercialPrincipal.lastMonthPayment + fundPrincipal.lastMonthPayment,
              totalPayment: commercialPrincipal.totalPayment + fundPrincipal.totalPayment,
              totalInterest: commercialPrincipal.totalInterest + fundPrincipal.totalInterest
            },
            principal: commercialAmount + fundAmount,
            months: months
          });
          return;
        }

        const equalPayment = calculateEqualPayment(principal, monthlyRate, months);
        const equalPrincipal = calculateEqualPrincipal(principal, monthlyRate, months);

        displayResult(equalPayment, equalPrincipal, principal, months);
      };

      /**
       * 显示计算结果
       */
      function displayResult(equalPayment, equalPrincipal, principal, months) {
        const resultCard = document.getElementById("resultCard");
        const resultSummary = document.getElementById("resultSummary");
        const compareGrid = document.getElementById("compareGrid");

        // 计算节省利息
        const savedInterest = equalPayment.totalInterest - equalPrincipal.totalInterest;

        resultSummary.innerHTML = `
                <div class="summary-item">
                    <div class="summary-value">${formatMoney(principal / 10000)}万</div>
                    <div class="summary-label">贷款总额</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${months}期</div>
                    <div class="summary-label">还款期数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value highlight">${formatMoney(equalPayment.monthlyPayment)}</div>
                    <div class="summary-label">等额本息月供</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${formatMoney(savedInterest)}</div>
                    <div class="summary-label">等额本金可省利息</div>
                </div>
            `;

        compareGrid.innerHTML = `
                <div class="compare-card">
                    <div class="title">📊 等额本息</div>
                    <div class="compare-item">
                        <span class="label">月供</span>
                        <span class="value">${formatMoney(equalPayment.monthlyPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">还款总额</span>
                        <span class="value">${formatMoney(equalPayment.totalPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">支付利息</span>
                        <span class="value">${formatMoney(equalPayment.totalInterest)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">特点</span>
                        <span class="value" style="font-size: 0.85rem;">每月还款固定</span>
                    </div>
                </div>
                <div class="compare-card recommended">
                    <div class="title">📉 等额本金 <span class="badge">省利息</span></div>
                    <div class="compare-item">
                        <span class="label">首月还款</span>
                        <span class="value">${formatMoney(equalPrincipal.firstMonthPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">末月还款</span>
                        <span class="value">${formatMoney(equalPrincipal.lastMonthPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">还款总额</span>
                        <span class="value">${formatMoney(equalPrincipal.totalPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">支付利息</span>
                        <span class="value">${formatMoney(equalPrincipal.totalInterest)} 元</span>
                    </div>
                </div>
            `;

        // 生成还款明细表
        generateScheduleTable(equalPayment.schedule, equalPrincipal.schedule);

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 显示组合贷款结果
       */
      function displayCombinedResult(data) {
        const resultCard = document.getElementById("resultCard");
        const resultSummary = document.getElementById("resultSummary");
        const compareGrid = document.getElementById("compareGrid");

        const savedInterest = data.equalPayment.totalInterest - data.equalPrincipal.totalInterest;

        resultSummary.innerHTML = `
                <div class="summary-item">
                    <div class="summary-value">${formatMoney(data.principal / 10000)}万</div>
                    <div class="summary-label">贷款总额</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${data.months}期</div>
                    <div class="summary-label">还款期数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value highlight">${formatMoney(data.equalPayment.monthlyPayment)}</div>
                    <div class="summary-label">等额本息月供</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">${formatMoney(savedInterest)}</div>
                    <div class="summary-label">等额本金可省利息</div>
                </div>
            `;

        compareGrid.innerHTML = `
                <div class="compare-card">
                    <div class="title">📊 等额本息（组合）</div>
                    <div class="compare-item">
                        <span class="label">月供</span>
                        <span class="value">${formatMoney(data.equalPayment.monthlyPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">还款总额</span>
                        <span class="value">${formatMoney(data.equalPayment.totalPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">支付利息</span>
                        <span class="value">${formatMoney(data.equalPayment.totalInterest)} 元</span>
                    </div>
                </div>
                <div class="compare-card recommended">
                    <div class="title">📉 等额本金（组合）<span class="badge">省利息</span></div>
                    <div class="compare-item">
                        <span class="label">首月还款</span>
                        <span class="value">${formatMoney(data.equalPrincipal.firstMonthPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">末月还款</span>
                        <span class="value">${formatMoney(data.equalPrincipal.lastMonthPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">还款总额</span>
                        <span class="value">${formatMoney(data.equalPrincipal.totalPayment)} 元</span>
                    </div>
                    <div class="compare-item">
                        <span class="label">支付利息</span>
                        <span class="value">${formatMoney(data.equalPrincipal.totalInterest)} 元</span>
                    </div>
                </div>
            `;

        document.getElementById("scheduleTable").innerHTML =
          '<p style="padding: 1rem; text-align: center; color: var(--color-text-secondary);">组合贷款暂不提供详细还款表</p>';

        resultCard.style.display = "block";
        resultCard.scrollIntoView({ behavior: "smooth" });
      }

      /**
       * 生成还款明细表
       */
      function generateScheduleTable(equalSchedule, principalSchedule) {
        const table = document.getElementById("scheduleTable");

        let html = `
                <table>
                    <thead>
                        <tr>
                            <th>期数</th>
                            <th>等额本息月供</th>
                            <th>本金</th>
                            <th>利息</th>
                            <th>等额本金月供</th>
                            <th>本金</th>
                            <th>利息</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

        // 只显示前24期和最后几期
        const showMonths = Math.min(24, equalSchedule.length);

        for (let i = 0; i < showMonths; i++) {
          const eq = equalSchedule[i];
          const pr = principalSchedule[i];
          html += `
                    <tr>
                        <td>${eq.month}</td>
                        <td>${formatMoney(eq.payment)}</td>
                        <td>${formatMoney(eq.principal)}</td>
                        <td>${formatMoney(eq.interest)}</td>
                        <td>${formatMoney(pr.payment)}</td>
                        <td>${formatMoney(pr.principal)}</td>
                        <td>${formatMoney(pr.interest)}</td>
                    </tr>
                `;
        }

        if (equalSchedule.length > showMonths) {
          html += `
                    <tr>
                        <td colspan="7" style="text-align: center; color: var(--color-text-secondary);">... 共 ${equalSchedule.length} 期 ...</td>
                    </tr>
                `;

          // 显示最后3期
          for (let i = equalSchedule.length - 3; i < equalSchedule.length; i++) {
            const eq = equalSchedule[i];
            const pr = principalSchedule[i];
            html += `
                        <tr>
                            <td>${eq.month}</td>
                            <td>${formatMoney(eq.payment)}</td>
                            <td>${formatMoney(eq.principal)}</td>
                            <td>${formatMoney(eq.interest)}</td>
                            <td>${formatMoney(pr.payment)}</td>
                            <td>${formatMoney(pr.principal)}</td>
                            <td>${formatMoney(pr.interest)}</td>
                        </tr>
                    `;
          }
        }

        html += "</tbody></table>";
        table.innerHTML = html;
      }

      /**
       * 切换显示还款明细
       */
      window.toggleSchedule = function () {
        const table = document.getElementById("scheduleTable");
        const arrow = document.getElementById("scheduleArrow");
        scheduleVisible = !scheduleVisible;
        table.classList.toggle("show", scheduleVisible);
        arrow.textContent = scheduleVisible ? "▲" : "▼";
      };

      /**
       * 格式化金额
       */
      function formatMoney(num) {
        return num.toLocaleString("zh-CN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
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
    
