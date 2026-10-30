// @ts-nocheck
// Generated from tools/calculator/mortgage-calculator.html
// Source SHA-256: 993d6c303cdb3516929a998d3e64f7db426c3d1de3db93e36098eddca170cf35
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let method = "equal"; // equal: 等额本息, principal: 等额本金

      window.syncInput = function (name, value) {
        document.getElementById(name).value = value;
      };

      // Sync range with input
      ["principal", "years", "rate"].forEach((name) => {
        document.getElementById(name).addEventListener("input", function () {
          document.getElementById(name + "Range").value = this.value;
        });
      });

      window.setMethod = function (m) {
        method = m;
        document.querySelectorAll(".method-btn").forEach((btn) => btn.classList.remove("active"));
        document.querySelector(`.method-btn[onclick="setMethod('${m}')"]`).classList.add("active");
      };

      function formatMoney(num) {
        return (
          "¥" + num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        );
      }

      window.calculate = function () {
        const principal = parseFloat(document.getElementById("principal").value);
        const years = parseInt(document.getElementById("years").value);
        const annualRate = parseFloat(document.getElementById("rate").value) / 100;

        const months = years * 12;
        const monthlyRate = annualRate / 12;

        let schedule = [];
        let totalInterest = 0;
        let monthlyPayment;

        if (method === "equal") {
          // 等额本息
          monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

          let remaining = principal;
          for (let i = 1; i <= months; i++) {
            const interest = remaining * monthlyRate;
            const principalPart = monthlyPayment - interest;
            remaining -= principalPart;
            totalInterest += interest;

            schedule.push({
              month: i,
              payment: monthlyPayment,
              principal: principalPart,
              interest: interest,
              remaining: Math.max(0, remaining)
            });
          }

          document.getElementById("monthlyPayment").textContent = formatMoney(monthlyPayment);
          document.getElementById("monthlyNote").textContent = "每月还款金额固定";
        } else {
          // 等额本金
          const monthlyPrincipal = principal / months;
          let remaining = principal;

          for (let i = 1; i <= months; i++) {
            const interest = remaining * monthlyRate;
            const payment = monthlyPrincipal + interest;
            remaining -= monthlyPrincipal;
            totalInterest += interest;

            schedule.push({
              month: i,
              payment: payment,
              principal: monthlyPrincipal,
              interest: interest,
              remaining: Math.max(0, remaining)
            });
          }

          const firstPayment = schedule[0].payment;
          const lastPayment = schedule[schedule.length - 1].payment;
          document.getElementById("monthlyPayment").textContent = formatMoney(firstPayment);
          document.getElementById("monthlyNote").textContent =
            `首月${formatMoney(firstPayment)}，末月${formatMoney(lastPayment)}`;
        }

        const totalPayment = principal + totalInterest;

        document.getElementById("totalPrincipal").textContent = formatMoney(principal);
        document.getElementById("totalInterest").textContent = formatMoney(totalInterest);
        document.getElementById("totalPayment").textContent = formatMoney(totalPayment);

        // Update chart
        const principalPercent = ((principal / totalPayment) * 100).toFixed(1);
        const interestPercent = ((totalInterest / totalPayment) * 100).toFixed(1);
        document.getElementById("chartBar").innerHTML = `
                <div class="chart-bar-principal" style="width: ${principalPercent}%" title="本金 ${principalPercent}%"></div>
                <div class="chart-bar-interest" style="width: ${interestPercent}%" title="利息 ${interestPercent}%"></div>
            `;

        // Render schedule
        renderSchedule(schedule);
      };

      function renderSchedule(schedule) {
        document.getElementById("scheduleSection").style.display = "block";

        const tbody = document.getElementById("scheduleBody");
        tbody.innerHTML = schedule
          .map(
            (row) => `
                <tr>
                    <td>第${row.month}期</td>
                    <td>${formatMoney(row.payment)}</td>
                    <td>${formatMoney(row.principal)}</td>
                    <td>${formatMoney(row.interest)}</td>
                    <td>${formatMoney(row.remaining)}</td>
                </tr>
            `
          )
          .join("");
      }

      window.toggleSchedule = function () {
        const section = document.getElementById("scheduleSection");
        const btn = section.querySelector(".toggle-btn");
        const table = section.querySelector(".schedule-table");

        if (table.style.display === "none") {
          table.style.display = "block";
          btn.textContent = "收起";
        } else {
          table.style.display = "none";
          btn.textContent = "展开";
        }
      };

      // Initial calculation
      calculate();
    
