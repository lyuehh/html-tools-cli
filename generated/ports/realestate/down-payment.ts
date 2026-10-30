// @ts-nocheck
// Generated from tools/realestate/down-payment.html
// Source SHA-256: 3706355992862e2d47f1c0ca3cd4917a0ed7206d921c31d324c77dc2e15def20
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        let mode = "calc-amount"; // calc-amount: 计算首付金额, calc-ratio: 反推首付比例

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

        // 计算等额本息月供
        function calcMonthlyPayment(principal, months, monthlyRate) {
          if (monthlyRate === 0 || months === 0) {
            return principal / (months || 1);
          }
          return (
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1)
          );
        }

        // 主计算函数
        function calculate() {
          const housePrice = parseFloat($("housePrice").value) || 0; // 万元
          const years = parseInt($("years").value) || 30;
          const annualRate = parseFloat($("rate").value) / 100 || 0;
          const months = years * 12;
          const monthlyRate = annualRate / 12;

          let downPayment, downPaymentRate, loanAmount;

          if (mode === "calc-amount") {
            // 根据比例计算首付金额
            downPaymentRate = parseFloat($("downPaymentRate").value) / 100 || 0;
            downPayment = housePrice * downPaymentRate;
            loanAmount = housePrice - downPayment;

            $("heroLabel").textContent = "需支付首付";
            $("heroValue").textContent = formatWan(downPayment);
            $("heroNote").textContent = "占房价 " + (downPaymentRate * 100).toFixed(0) + "%";
          } else {
            // 根据首付金额反推比例
            downPayment = parseFloat($("downPaymentAmount").value) || 0; // 万元
            downPaymentRate = housePrice > 0 ? downPayment / housePrice : 0;
            loanAmount = housePrice - downPayment;

            $("heroLabel").textContent = "首付比例";
            $("heroValue").textContent = (downPaymentRate * 100).toFixed(1) + "%";
            $("heroNote").textContent = "首付 " + formatWan(downPayment);
          }

          // 更新进度条
          const progressPercent = Math.min(100, Math.max(0, downPaymentRate * 100));
          $("progressFill").style.width = progressPercent + "%";
          $("progressText").textContent = "首付 " + progressPercent.toFixed(0) + "%";

          // 更新结果
          $("resultDownPayment").textContent = formatWan(downPayment);
          $("resultLoan").textContent = formatWan(loanAmount);
          $("resultTotal").textContent = formatWan(housePrice);

          // 计算月供预估
          const loanAmountYuan = loanAmount * 10000;
          const monthlyPayment = calcMonthlyPayment(loanAmountYuan, months, monthlyRate);
          const totalPayment = monthlyPayment * months;
          const totalInterest = totalPayment - loanAmountYuan;

          $("monthlyPayment").textContent = formatYuan(monthlyPayment);
          $("totalPayment").textContent = formatWan(totalPayment / 10000);
          $("totalInterest").textContent = formatWan(totalInterest / 10000);

          // 更新提示
          updateTip(downPaymentRate);
        }

        // 更新提示信息
        function updateTip(rate) {
          const tipBox = $("tipBox");
          if (rate < 0.2) {
            tipBox.textContent =
              "提示：首付比例较低，部分地区可能不满足贷款条件。建议首付至少20%以上。";
            tipBox.style.borderColor = "#ef4444";
            tipBox.style.color = "#ef4444";
            tipBox.style.background = "rgba(239, 68, 68, 0.1)";
          } else if (rate >= 0.2 && rate < 0.3) {
            tipBox.textContent = "提示：20%-30%首付通常适用于首套房，具体政策请咨询当地银行。";
            tipBox.style.borderColor = "#f59e0b";
            tipBox.style.color = "#f59e0b";
            tipBox.style.background = "rgba(245, 158, 11, 0.1)";
          } else if (rate >= 0.3 && rate < 0.5) {
            tipBox.textContent = "提示：30%-50%首付是比较常见的首付区间，贷款审批通过率较高。";
            tipBox.style.borderColor = "#10b981";
            tipBox.style.color = "#10b981";
            tipBox.style.background = "rgba(16, 185, 129, 0.1)";
          } else {
            tipBox.textContent = "提示：首付比例较高，贷款金额较少，月供压力会明显降低。";
            tipBox.style.borderColor = "#6366f1";
            tipBox.style.color = "#6366f1";
            tipBox.style.background = "rgba(99, 102, 241, 0.1)";
          }
        }

        // 切换模式
        function switchMode(newMode) {
          mode = newMode;

          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelector('[data-mode="' + newMode + '"]').classList.add("active");

          if (newMode === "calc-amount") {
            $("ratioGroup").style.display = "block";
            $("amountGroup").style.display = "none";
          } else {
            $("ratioGroup").style.display = "none";
            $("amountGroup").style.display = "block";
          }

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
          ["housePrice", "downPaymentRate", "downPaymentAmount", "years", "rate"].forEach((id) => {
            $(id).addEventListener("input", calculate);
          });

          // 快捷按钮 - 房价
          document.querySelectorAll(".quick-btn[data-price]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("housePrice").value = this.dataset.price;
              calculate();
            });
          });

          // 快捷按钮 - 首付比例
          document.querySelectorAll(".quick-btn[data-down]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("downPaymentRate").value = this.dataset.down;
              calculate();
            });
          });

          // 快捷按钮 - 首付金额
          document.querySelectorAll(".quick-btn[data-amount]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("downPaymentAmount").value = this.dataset.amount;
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
    
