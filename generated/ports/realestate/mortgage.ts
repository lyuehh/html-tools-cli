// @ts-nocheck
// Generated from tools/realestate/mortgage.html
// Source SHA-256: 90ba974587daaad118ca81dd2b20a2e1ef41ede017249cb69b076b528bf97aa2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        let loanType = "equal-payment";
        let allSchedule = [];
        let showAll = false;

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

        // 等额本息计算
        function calcEqualPayment(principal, months, monthlyRate) {
          if (monthlyRate === 0) {
            const monthly = principal / months;
            return {
              monthlyPayment: monthly,
              totalPayment: principal,
              totalInterest: 0,
              schedule: Array.from({ length: months }, (_, i) => ({
                period: i + 1,
                payment: monthly,
                principal: monthly,
                interest: 0,
                remaining: principal - monthly * (i + 1)
              }))
            };
          }

          const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
          const totalPayment = monthlyPayment * months;
          const totalInterest = totalPayment - principal;

          const schedule = [];
          let remaining = principal;

          for (let i = 1; i <= months; i++) {
            const interest = remaining * monthlyRate;
            const principalPart = monthlyPayment - interest;
            remaining -= principalPart;
            schedule.push({
              period: i,
              payment: monthlyPayment,
              principal: principalPart,
              interest: interest,
              remaining: Math.max(0, remaining)
            });
          }

          return { monthlyPayment, totalPayment, totalInterest, schedule };
        }

        // 等额本金计算
        function calcEqualPrincipal(principal, months, monthlyRate) {
          const monthlyPrincipal = principal / months;
          const schedule = [];
          let remaining = principal;
          let totalInterest = 0;

          for (let i = 1; i <= months; i++) {
            const interest = remaining * monthlyRate;
            const payment = monthlyPrincipal + interest;
            remaining -= monthlyPrincipal;
            totalInterest += interest;
            schedule.push({
              period: i,
              payment: payment,
              principal: monthlyPrincipal,
              interest: interest,
              remaining: Math.max(0, remaining)
            });
          }

          return {
            monthlyPayment: schedule[0].payment,
            totalPayment: principal + totalInterest,
            totalInterest: totalInterest,
            schedule: schedule
          };
        }

        // 绘制饼图
        function drawPieChart(principal, interest) {
          const canvas = $("pieChart");
          const ctx = canvas.getContext("2d");
          const total = principal + interest;

          if (total === 0) {
            ctx.clearRect(0, 0, 180, 180);
            return;
          }

          const principalAngle = (principal / total) * Math.PI * 2;

          canvas.width = 180;
          canvas.height = 180;
          const cx = 90,
            cy = 90,
            radius = 70;

          ctx.clearRect(0, 0, 180, 180);

          // 本金部分
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + principalAngle);
          ctx.closePath();
          ctx.fillStyle = "#6366f1";
          ctx.fill();

          // 利息部分
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, -Math.PI / 2 + principalAngle, -Math.PI / 2 + Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = "#f59e0b";
          ctx.fill();

          // 中心圆孔
          ctx.beginPath();
          ctx.arc(cx, cy, 35, 0, Math.PI * 2);
          ctx.fillStyle =
            getComputedStyle(document.body).getPropertyValue("--card").trim() || "#12121a";
          ctx.fill();
        }

        // 渲染还款计划表
        function renderSchedule() {
          const tbody = $("scheduleBody");
          tbody.textContent = "";

          const displaySchedule = showAll ? allSchedule : allSchedule.slice(0, 12);

          displaySchedule.forEach((item, index) => {
            const tr = document.createElement("tr");
            if (index % 12 === 0) {
              tr.className = "highlight-row";
            }

            const cells = [
              "第" + item.period + "期",
              formatMoney(item.payment),
              formatMoney(item.principal),
              formatMoney(item.interest),
              formatMoney(item.remaining)
            ];

            cells.forEach((text) => {
              const td = document.createElement("td");
              td.textContent = text;
              tr.appendChild(td);
            });

            tbody.appendChild(tr);
          });

          const btn = $("showMoreBtn");
          if (allSchedule.length <= 12) {
            btn.style.display = "none";
          } else {
            btn.style.display = "block";
            btn.textContent = showAll
              ? "收起详细计划"
              : "显示全部 " + allSchedule.length + " 期还款计划";
          }
        }

        // 主计算函数
        function calculate() {
          const housePrice = parseFloat($("housePrice").value) * 10000 || 0;
          const downPaymentRate = parseFloat($("downPaymentRate").value) / 100 || 0;
          const years = parseInt($("years").value) || 0;
          const annualRate = parseFloat($("rate").value) / 100 || 0;

          const downPaymentAmount = housePrice * downPaymentRate;
          const loanAmount = housePrice - downPaymentAmount;
          const months = years * 12;
          const monthlyRate = annualRate / 12;

          let result;
          if (loanType === "equal-payment") {
            result = calcEqualPayment(loanAmount, months, monthlyRate);
            $("paymentNote").textContent = "每月固定还款";
          } else {
            result = calcEqualPrincipal(loanAmount, months, monthlyRate);
            $("paymentNote").textContent = "首月月供（逐月递减）";
          }

          allSchedule = result.schedule;

          $("monthlyPayment").textContent = formatMoney(result.monthlyPayment);
          $("downPayment").textContent = formatMoney(downPaymentAmount);
          $("loanAmount").textContent = formatMoney(loanAmount);
          $("totalPayment").textContent = formatMoney(result.totalPayment);
          $("totalInterest").textContent = formatMoney(result.totalInterest);

          const ratio =
            result.totalPayment > 0
              ? ((result.totalInterest / result.totalPayment) * 100).toFixed(1)
              : 0;
          $("interestRatio").textContent = ratio + "%";

          drawPieChart(loanAmount, result.totalInterest);
          renderSchedule();
        }

        // 事件绑定
        function bindEvents() {
          // Tab 切换
          document.querySelectorAll(".tab").forEach((tab) => {
            tab.addEventListener("click", function () {
              document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
              this.classList.add("active");
              loanType = this.dataset.type;
              calculate();
            });
          });

          // 输入框变化
          ["housePrice", "downPaymentRate", "years", "rate"].forEach((id) => {
            $(id).addEventListener("input", calculate);
          });

          // 快捷按钮
          document.querySelectorAll(".quick-btn[data-price]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("housePrice").value = this.dataset.price;
              calculate();
            });
          });

          document.querySelectorAll(".quick-btn[data-down]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("downPaymentRate").value = this.dataset.down;
              calculate();
            });
          });

          document.querySelectorAll(".quick-btn[data-years]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("years").value = this.dataset.years;
              calculate();
            });
          });

          document.querySelectorAll(".quick-btn[data-rate]").forEach((btn) => {
            btn.addEventListener("click", function () {
              $("rate").value = this.dataset.rate;
              calculate();
            });
          });

          // 显示更多
          $("showMoreBtn").addEventListener("click", function () {
            showAll = !showAll;
            renderSchedule();
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
    
