// @ts-nocheck
// Generated from tools/realestate/prepayment.html
// Source SHA-256: c2053d0ed7e48b04480829d488064037fe338ff347a18d23f4e4971afe74a436
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        let mode = "reduce-term"; // reduce-term: 缩短年限, reduce-payment: 减少月供

        const $ = (id) => document.getElementById(id);

        // 格式化金额（万元）
        function formatWan(value) {
          return (
            "¥" +
            value.toLocaleString("zh-CN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) +
            "万"
          );
        }

        // 格式化金额（元）
        function formatYuan(value) {
          return (
            "¥" +
            value.toLocaleString("zh-CN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          );
        }

        // 等额本息计算详情
        function calcEqualPaymentDetail(principal, totalMonths, monthlyRate, paidMonths) {
          if (monthlyRate === 0) {
            const monthly = principal / totalMonths;
            return {
              monthlyPayment: monthly,
              paidPrincipal: monthly * paidMonths,
              paidInterest: 0,
              remainingPrincipal: principal - monthly * paidMonths,
              totalInterest: 0
            };
          }

          const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

          let remaining = principal;
          let paidPrincipal = 0;
          let paidInterest = 0;
          let totalInterest = 0;

          for (let i = 1; i <= totalMonths; i++) {
            const interest = remaining * monthlyRate;
            const principalPart = monthlyPayment - interest;

            if (i <= paidMonths) {
              paidPrincipal += principalPart;
              paidInterest += interest;
            }
            totalInterest += interest;
            remaining -= principalPart;
          }

          return {
            monthlyPayment,
            paidPrincipal,
            paidInterest,
            remainingPrincipal: principal - paidPrincipal,
            totalInterest
          };
        }

        // 等额本金计算详情
        function calcEqualPrincipalDetail(principal, totalMonths, monthlyRate, paidMonths) {
          const monthlyPrincipal = principal / totalMonths;
          let remaining = principal;
          let paidPrincipal = 0;
          let paidInterest = 0;
          let totalInterest = 0;
          let firstMonthPayment = 0;

          for (let i = 1; i <= totalMonths; i++) {
            const interest = remaining * monthlyRate;
            const payment = monthlyPrincipal + interest;

            if (i === 1) firstMonthPayment = payment;

            if (i <= paidMonths) {
              paidPrincipal += monthlyPrincipal;
              paidInterest += interest;
            }
            totalInterest += interest;
            remaining -= monthlyPrincipal;
          }

          return {
            monthlyPayment: firstMonthPayment,
            paidPrincipal,
            paidInterest,
            remainingPrincipal: principal - paidPrincipal,
            totalInterest
          };
        }

        // 计算新还款计划
        function calcNewPlan(newPrincipal, monthlyRate, oldMonthlyPayment, mode, loanType) {
          if (newPrincipal <= 0) {
            return { newMonths: 0, newMonthlyPayment: 0, newTotalInterest: 0 };
          }

          if (monthlyRate === 0) {
            if (mode === "reduce-term") {
              const newMonths = Math.ceil(newPrincipal / oldMonthlyPayment);
              return { newMonths, newMonthlyPayment: oldMonthlyPayment, newTotalInterest: 0 };
            } else {
              // 使用原剩余期数
              return { newMonths: 0, newMonthlyPayment: 0, newTotalInterest: 0 };
            }
          }

          if (loanType === "equal-payment") {
            if (mode === "reduce-term") {
              // 缩短年限：保持月供不变，计算新期数
              // 公式: n = -ln(1 - P*r/M) / ln(1+r)
              const temp = 1 - (newPrincipal * monthlyRate) / oldMonthlyPayment;
              if (temp <= 0) {
                return { newMonths: 0, newMonthlyPayment: oldMonthlyPayment, newTotalInterest: 0 };
              }
              const newMonths = Math.ceil(-Math.log(temp) / Math.log(1 + monthlyRate));
              const newTotalInterest = oldMonthlyPayment * newMonths - newPrincipal;
              return { newMonths, newMonthlyPayment: oldMonthlyPayment, newTotalInterest };
            } else {
              // 减少月供：保持期数不变，计算新月供
              // 需要获取剩余期数
              return { newMonths: 0, newMonthlyPayment: 0, newTotalInterest: 0 };
            }
          } else {
            // 等额本金
            if (mode === "reduce-term") {
              const newMonths = Math.ceil(
                newPrincipal / (oldMonthlyPayment - newPrincipal * monthlyRate)
              );
              let totalInterest = 0;
              let remaining = newPrincipal;
              const monthlyPrincipal = newPrincipal / newMonths;
              for (let i = 0; i < newMonths; i++) {
                totalInterest += remaining * monthlyRate;
                remaining -= monthlyPrincipal;
              }
              return {
                newMonths,
                newMonthlyPayment: monthlyPrincipal + newPrincipal * monthlyRate,
                newTotalInterest: totalInterest
              };
            } else {
              return { newMonths: 0, newMonthlyPayment: 0, newTotalInterest: 0 };
            }
          }
        }

        // 主计算函数
        function calculate() {
          const loanAmount = parseFloat($("loanAmount").value) * 10000 || 0;
          const totalYears = parseInt($("totalYears").value) || 30;
          const annualRate = parseFloat($("rate").value) / 100 || 0;
          const loanType = $("loanType").value;
          const paidMonths = parseInt($("paidMonths").value) || 0;
          const prepayAmount = parseFloat($("prepayAmount").value) * 10000 || 0;

          const totalMonths = totalYears * 12;
          const monthlyRate = annualRate / 12;
          const remainMonths = totalMonths - paidMonths;

          // 计算当前状态
          let detail;
          if (loanType === "equal-payment") {
            detail = calcEqualPaymentDetail(loanAmount, totalMonths, monthlyRate, paidMonths);
          } else {
            detail = calcEqualPrincipalDetail(loanAmount, totalMonths, monthlyRate, paidMonths);
          }

          // 更新当前状态显示
          $("originalMonthly").textContent = formatYuan(detail.monthlyPayment);
          $("paidPrincipal").textContent = formatWan(detail.paidPrincipal / 10000);
          $("paidInterest").textContent = formatWan(detail.paidInterest / 10000);
          $("remainingPrincipal").textContent = formatWan(detail.remainingPrincipal / 10000);

          // 提前还款后的新本金
          const newPrincipal = Math.max(0, detail.remainingPrincipal - prepayAmount);

          // 计算不提前还款的剩余利息
          let remainingInterestWithout = detail.totalInterest - detail.paidInterest;

          // 计算提前还款后的新计划
          let newMonths, newMonthlyPayment, newTotalInterest;

          if (newPrincipal <= 0) {
            // 一次性还清
            newMonths = 0;
            newMonthlyPayment = 0;
            newTotalInterest = 0;
          } else if (mode === "reduce-term") {
            // 缩短年限模式
            if (loanType === "equal-payment") {
              if (monthlyRate > 0) {
                const temp = 1 - (newPrincipal * monthlyRate) / detail.monthlyPayment;
                if (temp > 0) {
                  newMonths = Math.ceil(-Math.log(temp) / Math.log(1 + monthlyRate));
                  newMonthlyPayment = detail.monthlyPayment;
                  newTotalInterest = detail.monthlyPayment * newMonths - newPrincipal;
                } else {
                  newMonths = remainMonths;
                  newMonthlyPayment = detail.monthlyPayment;
                  newTotalInterest = remainingInterestWithout;
                }
              } else {
                newMonths = Math.ceil(newPrincipal / detail.monthlyPayment);
                newMonthlyPayment = detail.monthlyPayment;
                newTotalInterest = 0;
              }
            } else {
              // 等额本金 - 缩短年限
              const oldMonthlyPrincipal = loanAmount / totalMonths;
              newMonths = Math.ceil(newPrincipal / oldMonthlyPrincipal);
              newMonthlyPayment = oldMonthlyPrincipal + newPrincipal * monthlyRate;
              newTotalInterest = 0;
              let remaining = newPrincipal;
              for (let i = 0; i < newMonths; i++) {
                newTotalInterest += remaining * monthlyRate;
                remaining -= oldMonthlyPrincipal;
              }
            }
          } else {
            // 减少月供模式
            newMonths = remainMonths;
            if (loanType === "equal-payment") {
              if (monthlyRate > 0 && newMonths > 0) {
                newMonthlyPayment =
                  (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, newMonths)) /
                  (Math.pow(1 + monthlyRate, newMonths) - 1);
              } else {
                newMonthlyPayment = newMonths > 0 ? newPrincipal / newMonths : 0;
              }
              newTotalInterest = newMonthlyPayment * newMonths - newPrincipal;
            } else {
              // 等额本金 - 减少月供
              const newMonthlyPrincipal = newPrincipal / newMonths;
              newMonthlyPayment = newMonthlyPrincipal + newPrincipal * monthlyRate;
              newTotalInterest = 0;
              let remaining = newPrincipal;
              for (let i = 0; i < newMonths; i++) {
                newTotalInterest += remaining * monthlyRate;
                remaining -= newMonthlyPrincipal;
              }
            }
          }

          // 节省的利息 = 不提前还款的剩余利息 - 提前还款后的总利息
          const savedInterest = Math.max(0, remainingInterestWithout - newTotalInterest);

          // 更新结果显示
          $("savedInterest").textContent = formatWan(savedInterest / 10000);
          $("oldRemainMonths").textContent = remainMonths + " 期";
          $("newRemainMonths").textContent = newMonths + " 期";
          $("oldMonthly").textContent = formatYuan(detail.monthlyPayment);
          $("newMonthly").textContent = formatYuan(newMonthlyPayment);

          // 总利息对比
          $("totalInterestWithout").textContent = formatWan(detail.totalInterest / 10000);
          $("totalInterestWith").textContent = formatWan(
            (detail.paidInterest + newTotalInterest) / 10000
          );

          // 更新提示
          updateTip(savedInterest, prepayAmount, mode);
        }

        // 更新提示信息
        function updateTip(saved, prepay, mode) {
          const tipBox = $("tipBox");
          const savedPercent = prepay > 0 ? ((saved / prepay) * 100).toFixed(1) : 0;

          if (mode === "reduce-term") {
            tipBox.textContent =
              "缩短年限模式：保持月供不变，减少还款期数。每提前还款1万元约节省利息 " +
              (prepay > 0 ? ((saved / prepay) * 10000).toFixed(0) : 0) +
              " 元。";
          } else {
            tipBox.textContent =
              "减少月供模式：保持还款期数不变，降低每月还款额。适合希望减轻月供压力的情况。";
          }
        }

        // 切换模式
        function switchMode(newMode) {
          mode = newMode;

          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelector('[data-mode="' + newMode + '"]').classList.add("active");

          calculate();
        }

        // 事件绑定
        function bindEvents() {
          // Tab 切换
          document.querySelectorAll(".tab").forEach((tab) => {
            tab.addEventListener("click", function () {
              switchMode(this.dataset.mode);
            });
          });

          // 输入框变化
          ["loanAmount", "totalYears", "rate", "loanType", "paidMonths", "prepayAmount"].forEach(
            (id) => {
              $(id).addEventListener("input", calculate);
              $(id).addEventListener("change", calculate);
            }
          );

          // 快捷按钮
          document.querySelectorAll(".quick-btn[data-loan]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("loanAmount").value = this.dataset.loan;
              calculate();
            });
          });

          document.querySelectorAll(".quick-btn[data-paid]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("paidMonths").value = this.dataset.paid;
              calculate();
            });
          });

          document.querySelectorAll(".quick-btn[data-prepay]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("prepayAmount").value = this.dataset.prepay;
              calculate();
            });
          });
        }

        // 初始化
        bindEvents();
        calculate();
      })();

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
    
