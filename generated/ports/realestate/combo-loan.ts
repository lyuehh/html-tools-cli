// @ts-nocheck
// Generated from tools/realestate/combo-loan.html
// Source SHA-256: 7d6da4139fd85e19f04fbd27ad7483c2150245b9ea63559162a84debbbf95f13
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        let loanType = "equal-payment";

        const $ = (id) => document.getElementById(id);

        // 格式化金额
        function formatMoney(value) {
          return (
            "¥" +
            value.toLocaleString("zh-CN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          );
        }

        function formatWan(value) {
          return (
            "¥" +
            (value / 10000).toLocaleString("zh-CN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }) +
            "万"
          );
        }

        // 等额本息计算
        function calcEqualPayment(principal, months, monthlyRate) {
          if (principal === 0 || months === 0) {
            return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
          }

          if (monthlyRate === 0) {
            return {
              monthlyPayment: principal / months,
              totalPayment: principal,
              totalInterest: 0
            };
          }

          const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
          const totalPayment = monthlyPayment * months;
          const totalInterest = totalPayment - principal;

          return { monthlyPayment, totalPayment, totalInterest };
        }

        // 等额本金计算
        function calcEqualPrincipal(principal, months, monthlyRate) {
          if (principal === 0 || months === 0) {
            return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
          }

          const monthlyPrincipal = principal / months;
          let totalInterest = 0;
          let remaining = principal;

          for (let i = 0; i < months; i++) {
            totalInterest += remaining * monthlyRate;
            remaining -= monthlyPrincipal;
          }

          const firstMonthPayment = monthlyPrincipal + principal * monthlyRate;

          return {
            monthlyPayment: firstMonthPayment,
            totalPayment: principal + totalInterest,
            totalInterest: totalInterest
          };
        }

        // 绘制饼图
        function drawPieChart(
          commercialPrincipal,
          commercialInterest,
          fundPrincipal,
          fundInterest
        ) {
          const canvas = $("pieChart");
          const ctx = canvas.getContext("2d");
          const total = commercialPrincipal + commercialInterest + fundPrincipal + fundInterest;

          canvas.width = 160;
          canvas.height = 160;
          const cx = 80,
            cy = 80,
            radius = 65;

          ctx.clearRect(0, 0, 160, 160);

          if (total === 0) return;

          const segments = [
            { value: commercialPrincipal, color: "#6366f1" },
            { value: commercialInterest, color: "#818cf8" },
            { value: fundPrincipal, color: "#10b981" },
            { value: fundInterest, color: "#6ee7b7" }
          ];

          let startAngle = -Math.PI / 2;

          segments.forEach((seg) => {
            if (seg.value > 0) {
              const angle = (seg.value / total) * Math.PI * 2;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
              ctx.closePath();
              ctx.fillStyle = seg.color;
              ctx.fill();
              startAngle += angle;
            }
          });

          // 中心圆孔
          ctx.beginPath();
          ctx.arc(cx, cy, 30, 0, Math.PI * 2);
          ctx.fillStyle =
            getComputedStyle(document.body).getPropertyValue("--card").trim() || "#12121a";
          ctx.fill();
        }

        // 主计算函数
        function calculate() {
          const commercialAmount = parseFloat($("commercialAmount").value) * 10000 || 0;
          const commercialYears = parseInt($("commercialYears").value) || 0;
          const commercialRate = parseFloat($("commercialRate").value) / 100 || 0;

          const fundAmount = parseFloat($("fundAmount").value) * 10000 || 0;
          const fundYears = parseInt($("fundYears").value) || 0;
          const fundRate = parseFloat($("fundRate").value) / 100 || 0;

          const commercialMonths = commercialYears * 12;
          const fundMonths = fundYears * 12;
          const commercialMonthlyRate = commercialRate / 12;
          const fundMonthlyRate = fundRate / 12;

          let commercialResult, fundResult;

          if (loanType === "equal-payment") {
            commercialResult = calcEqualPayment(
              commercialAmount,
              commercialMonths,
              commercialMonthlyRate
            );
            fundResult = calcEqualPayment(fundAmount, fundMonths, fundMonthlyRate);
            $("monthlyNote").textContent = "每月固定还款";
          } else {
            commercialResult = calcEqualPrincipal(
              commercialAmount,
              commercialMonths,
              commercialMonthlyRate
            );
            fundResult = calcEqualPrincipal(fundAmount, fundMonths, fundMonthlyRate);
            $("monthlyNote").textContent = "首月月供（逐月递减）";
          }

          const totalMonthly = commercialResult.monthlyPayment + fundResult.monthlyPayment;
          const totalLoan = commercialAmount + fundAmount;
          const totalPayment = commercialResult.totalPayment + fundResult.totalPayment;
          const totalInterest = commercialResult.totalInterest + fundResult.totalInterest;

          // 更新显示
          $("totalMonthly").textContent = formatMoney(totalMonthly);
          $("commercialMonthly").textContent = formatMoney(commercialResult.monthlyPayment);
          $("fundMonthly").textContent = formatMoney(fundResult.monthlyPayment);

          $("totalLoan").textContent = formatWan(totalLoan);
          $("totalPayment").textContent = formatWan(totalPayment);
          $("totalInterest").textContent = formatWan(totalInterest);
          $("commercialInterest").textContent = formatWan(commercialResult.totalInterest);
          $("fundInterest").textContent = formatWan(fundResult.totalInterest);

          // 更新图例
          $("legendCommercialPrincipal").textContent = formatWan(commercialAmount);
          $("legendCommercialInterest").textContent = formatWan(commercialResult.totalInterest);
          $("legendFundPrincipal").textContent = formatWan(fundAmount);
          $("legendFundInterest").textContent = formatWan(fundResult.totalInterest);

          // 绘制饼图
          drawPieChart(
            commercialAmount,
            commercialResult.totalInterest,
            fundAmount,
            fundResult.totalInterest
          );
        }

        // 事件绑定
        function bindEvents() {
          // 输入框变化
          const inputs = [
            "commercialAmount",
            "commercialYears",
            "commercialRate",
            "fundAmount",
            "fundYears",
            "fundRate"
          ];
          inputs.forEach((id) => {
            $(id).addEventListener("input", calculate);
          });

          // 还款方式切换
          document.querySelectorAll(".toggle-btn").forEach((btn) => {
            btn.addEventListener("click", function () {
              document.querySelectorAll(".toggle-btn").forEach((b) => b.classList.remove("active"));
              this.classList.add("active");
              loanType = this.dataset.type;
              calculate();
            });
          });

          // 快捷按钮
          document.querySelectorAll(".quick-btn[data-field]").forEach((btn) => {
            btn.addEventListener("click", function () {
              const field = this.dataset.field;
              const value = this.dataset.value;
              $(field).value = value;
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
    
