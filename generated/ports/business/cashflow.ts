// @ts-nocheck
// Generated from tools/business/cashflow.html
// Source SHA-256: 863d2371e32d855dd92f8889404de17b8fc88649bc38cf4a2b126704e8436ba3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.body.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculate() {
        var openingBalance = parseFloat(document.getElementById("openingBalance").value) || 0;
        var salesIncome = parseFloat(document.getElementById("salesIncome").value) || 0;
        var otherIncome = parseFloat(document.getElementById("otherIncome").value) || 0;
        var growthRate = parseFloat(document.getElementById("growthRate").value) / 100 || 0;
        var purchaseCost = parseFloat(document.getElementById("purchaseCost").value) || 0;
        var payroll = parseFloat(document.getElementById("payroll").value) || 0;
        var rent = parseFloat(document.getElementById("rent").value) || 0;
        var utilities = parseFloat(document.getElementById("utilities").value) || 0;
        var marketing = parseFloat(document.getElementById("marketing").value) || 0;
        var otherExpense = parseFloat(document.getElementById("otherExpense").value) || 0;

        var months = 6;
        var data = [];
        var balance = openingBalance;
        var totalInflow = 0;
        var totalOutflow = 0;

        for (var i = 0; i < months; i++) {
          var growthFactor = Math.pow(1 + growthRate, i);
          var monthSales = salesIncome * growthFactor;
          var monthOther = otherIncome * growthFactor;
          var inflow = monthSales + monthOther;

          var outflow = purchaseCost + payroll + rent + utilities + marketing + otherExpense;
          var netFlow = inflow - outflow;
          balance += netFlow;

          totalInflow += inflow;
          totalOutflow += outflow;

          data.push({
            month: i + 1,
            sales: monthSales,
            otherIn: monthOther,
            inflow: inflow,
            purchase: purchaseCost,
            payroll: payroll,
            rent: rent,
            utilities: utilities,
            marketing: marketing,
            otherOut: otherExpense,
            outflow: outflow,
            netFlow: netFlow,
            balance: balance
          });
        }

        document.getElementById("resultSection").classList.remove("hidden");

        // 汇总
        document.getElementById("totalInflow").textContent = formatMoney(totalInflow);
        document.getElementById("totalOutflow").textContent = formatMoney(totalOutflow);

        var netCashflow = totalInflow - totalOutflow;
        var netEl = document.getElementById("netCashflow");
        netEl.textContent = formatMoney(netCashflow);
        netEl.className = "summary-value " + (netCashflow >= 0 ? "green" : "red");

        var endEl = document.getElementById("endingBalance");
        endEl.textContent = formatMoney(balance);
        endEl.className = "summary-value " + (balance >= 0 ? "green" : "red");

        // 表格
        var tbody = document.getElementById("tableBody");
        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }

        var rows = [
          { label: "期初余额", key: "opening", isHeader: true },
          { label: "收入", key: null, isHeader: true },
          { label: "  销售收入", key: "sales" },
          { label: "  其他收入", key: "otherIn" },
          { label: "收入合计", key: "inflow", isTotal: true },
          { label: "支出", key: null, isHeader: true },
          { label: "  采购成本", key: "purchase" },
          { label: "  工资薪酬", key: "payroll" },
          { label: "  租金", key: "rent" },
          { label: "  水电费", key: "utilities" },
          { label: "  营销费用", key: "marketing" },
          { label: "  其他支出", key: "otherOut" },
          { label: "支出合计", key: "outflow", isTotal: true },
          { label: "净现金流", key: "netFlow", isTotal: true },
          { label: "期末余额", key: "balance", isTotal: true }
        ];

        rows.forEach(function (rowDef) {
          var tr = document.createElement("tr");
          if (rowDef.isTotal) tr.className = "row-total";

          var th = document.createElement("td");
          th.className = "row-header";
          th.textContent = rowDef.label;
          tr.appendChild(th);

          for (var i = 0; i < months; i++) {
            var td = document.createElement("td");
            if (rowDef.key === "opening") {
              td.textContent = formatMoney(i === 0 ? openingBalance : data[i - 1].balance);
            } else if (rowDef.key) {
              var val = data[i][rowDef.key];
              td.textContent = formatMoney(val);
              if (rowDef.key === "netFlow" || rowDef.key === "balance") {
                td.className = val >= 0 ? "positive" : "negative";
              }
            }
            tr.appendChild(td);
          }

          tbody.appendChild(tr);
        });

        // 图表
        var chart = document.getElementById("chartContainer");
        while (chart.firstChild) {
          chart.removeChild(chart.firstChild);
        }

        var maxBalance = Math.max.apply(
          null,
          data.map(function (d) {
            return Math.abs(d.balance);
          })
        );
        var chartWidth = chart.offsetWidth;
        var barWidth = 40;
        var gap = (chartWidth - barWidth * months) / (months + 1);

        data.forEach(function (d, i) {
          var barHeight = (Math.abs(d.balance) / maxBalance) * 150;
          var bar = document.createElement("div");
          bar.className = "chart-bar";
          bar.style.height = barHeight + "px";
          bar.style.left = gap * (i + 1) + barWidth * i + "px";
          bar.style.background = d.balance >= 0 ? "var(--accent-green)" : "var(--accent-red)";
          chart.appendChild(bar);

          var label = document.createElement("div");
          label.className = "chart-label";
          label.style.left = gap * (i + 1) + barWidth * i + "px";
          label.textContent = "第" + (i + 1) + "月";
          chart.appendChild(label);
        });
      }

      calculate();
    
