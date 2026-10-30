// @ts-nocheck
// Generated from tools/finance/amortization-table.html
// Source SHA-256: 235398b4a945eb4e351e8ed486c1af53651bffc813552a5065ad9c51173fda7c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var amortRows = [];

      function fmt(n) {
        return n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function getInputs() {
        var amount = parseFloat(document.getElementById("loanAmount").value);
        var rate = parseFloat(document.getElementById("annualRate").value);
        var term = parseInt(document.getElementById("termMonths").value, 10);

        document.getElementById("loanAmount").classList.remove("input-error");
        document.getElementById("annualRate").classList.remove("input-error");
        document.getElementById("termMonths").classList.remove("input-error");

        if (!amount || amount <= 0) {
          document.getElementById("loanAmount").classList.add("input-error");
          showStatus("请输入有效的贷款金额", "error");
          return null;
        }
        if (!rate || rate <= 0 || rate > 100) {
          document.getElementById("annualRate").classList.add("input-error");
          showStatus("请输入有效的年利率（0.01 ~ 100）", "error");
          return null;
        }
        if (!term || term < 1 || term > 600) {
          document.getElementById("termMonths").classList.add("input-error");
          showStatus("还款期数须在 1 ~ 600 之间", "error");
          return null;
        }
        return { amount: amount, rate: rate, term: term };
      }

      function calcMonthlyPayment(principal, monthlyRate, term) {
        if (monthlyRate === 0) return principal / term;
        var factor = Math.pow(1 + monthlyRate, term);
        return (principal * monthlyRate * factor) / (factor - 1);
      }

      function buildRows(params, extraPayment, extraStart) {
        var monthlyRate = params.rate / 100 / 12;
        var basePayment = calcMonthlyPayment(params.amount, monthlyRate, params.term);
        var startDateVal = document.getElementById("startDate").value;

        var rows = [];
        var balance = params.amount;
        var period = 0;

        while (balance > 0.005 && period < params.term) {
          period++;
          var interest = balance * monthlyRate;
          var principal = Math.min(basePayment - interest, balance);
          var extra = period >= extraStart ? Math.min(extraPayment, balance - principal) : 0;
          if (extra < 0) extra = 0;

          balance = balance - principal - extra;
          if (balance < 0.005) balance = 0;

          var dateLabel = "";
          if (startDateVal) {
            var d = new Date(startDateVal + "-01");
            d.setMonth(d.getMonth() + period - 1);
            dateLabel = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
          }

          rows.push({
            period: period,
            date: dateLabel,
            payment: principal + interest + extra,
            principal: principal,
            interest: interest,
            extra: extra,
            balance: balance
          });
        }
        return { rows: rows, basePayment: basePayment };
      }

      function sumRows(rows) {
        var totalInterest = 0;
        rows.forEach(function (r) {
          totalInterest += r.interest;
        });
        return { totalInterest: totalInterest };
      }

      function renderSummary(params, rows, basePayment) {
        var totals = sumRows(rows);
        var extraPayment = Math.max(
          0,
          parseFloat(document.getElementById("extraPayment").value) || 0
        );
        var saved = 0;
        if (extraPayment > 0) {
          var baseResult = buildRows(params, 0, 1);
          var baseTotals = sumRows(baseResult.rows);
          saved = baseTotals.totalInterest - totals.totalInterest;
        }

        var cards = [
          { label: "标准月供", value: fmt(basePayment), cls: "" },
          {
            label: "总还款额",
            value: fmt(params.amount + totals.totalInterest),
            cls: ""
          },
          {
            label: "总利息",
            value: fmt(totals.totalInterest),
            cls: totals.totalInterest > params.amount ? "value-danger" : "value-warn"
          },
          { label: "实际期数", value: rows.length + " 期", cls: "" },
          {
            label: "利息/本金比",
            value: ((totals.totalInterest / params.amount) * 100).toFixed(1) + "%",
            cls: ""
          }
        ];
        if (saved > 0.01) {
          cards.push({ label: "额外还款省利息", value: fmt(saved), cls: "" });
        }

        var wrap = document.getElementById("summaryCards");
        wrap.innerHTML = "";
        cards.forEach(function (c) {
          var div = document.createElement("div");
          div.className = "summary-card";
          var lbl = document.createElement("div");
          lbl.className = "summary-card-label";
          lbl.textContent = c.label;
          var val = document.createElement("div");
          val.className = "summary-card-value" + (c.cls ? " " + c.cls : "");
          val.textContent = c.value;
          div.appendChild(lbl);
          div.appendChild(val);
          wrap.appendChild(div);
        });
        wrap.style.display = "";
      }

      function renderTable(rows) {
        var hasDate = rows.length > 0 && rows[0].date !== "";
        var hasExtra = rows.some(function (r) {
          return r.extra > 0.005;
        });

        var thead = document.getElementById("tableHead");
        var tbody = document.getElementById("tableBody");
        var tfoot = document.getElementById("tableFoot");

        var headRow = document.createElement("tr");
        var cols = ["期数"];
        if (hasDate) cols.push("日期");
        cols.push("月供(元)", "本金(元)", "利息(元)");
        if (hasExtra) cols.push("额外还款(元)");
        cols.push("剩余余额(元)");

        cols.forEach(function (c, i) {
          var th = document.createElement("th");
          th.textContent = c;
          if (i === 0) th.style.textAlign = "center";
          headRow.appendChild(th);
        });
        thead.innerHTML = "";
        thead.appendChild(headRow);

        tbody.innerHTML = "";
        var totPay = 0;
        var totPrin = 0;
        var totInt = 0;
        var totExtra = 0;

        rows.forEach(function (r) {
          var tr = document.createElement("tr");
          var cells = [{ text: r.period, cls: "" }];
          if (hasDate) cells.push({ text: r.date, cls: "" });
          cells.push(
            { text: fmt(r.payment), cls: "" },
            { text: fmt(r.principal), cls: "col-principal" },
            { text: fmt(r.interest), cls: "col-interest" }
          );
          if (hasExtra) cells.push({ text: fmt(r.extra), cls: "col-extra" });
          cells.push({ text: fmt(r.balance), cls: "" });

          cells.forEach(function (c, i) {
            var td = document.createElement("td");
            td.textContent = c.text;
            if (c.cls) td.className = c.cls;
            if (i === 0) td.style.textAlign = "center";
            tr.appendChild(td);
          });
          tbody.appendChild(tr);

          totPay += r.payment;
          totPrin += r.principal;
          totInt += r.interest;
          totExtra += r.extra;
        });

        tfoot.innerHTML = "";
        var footRow = document.createElement("tr");
        var footCells = [{ text: "合计", cls: "" }];
        if (hasDate) footCells.push({ text: "" });
        footCells.push(
          { text: fmt(totPay), cls: "" },
          { text: fmt(totPrin), cls: "col-principal" },
          { text: fmt(totInt), cls: "col-interest" }
        );
        if (hasExtra) footCells.push({ text: fmt(totExtra), cls: "col-extra" });
        footCells.push({ text: "0.00", cls: "" });

        footCells.forEach(function (c, i) {
          var td = document.createElement("td");
          td.textContent = c.text;
          if (c.cls) td.className = c.cls;
          if (i === 0) td.style.textAlign = "center";
          footRow.appendChild(td);
        });
        tfoot.appendChild(footRow);
      }

      function calculate() {
        var params = getInputs();
        if (!params) return;

        var extraPayment = Math.max(
          0,
          parseFloat(document.getElementById("extraPayment").value) || 0
        );
        var extraStart = Math.max(
          1,
          parseInt(document.getElementById("extraStart").value, 10) || 1
        );

        var result = buildRows(params, extraPayment, extraStart);
        amortRows = result.rows;

        renderSummary(params, amortRows, result.basePayment);
        renderTable(amortRows);

        document.getElementById("tableWrap").style.display = "";
        document.getElementById("emptyState").style.display = "none";

        var statsEl = document.getElementById("stats");
        var totals = sumRows(amortRows);
        document.getElementById("statMonthly").textContent = fmt(result.basePayment);
        document.getElementById("statTotalInterest").textContent = fmt(totals.totalInterest);
        document.getElementById("statActualTerm").textContent = amortRows.length;
        statsEl.classList.add("show");

        showStatus("已生成 " + amortRows.length + " 期还款明细", "success");
      }

      function reset() {
        document.getElementById("loanAmount").value = "1000000";
        document.getElementById("annualRate").value = "4.5";
        document.getElementById("termMonths").value = "360";
        document.getElementById("startDate").value = "";
        document.getElementById("extraPayment").value = "0";
        document.getElementById("extraStart").value = "1";
        ["loanAmount", "annualRate", "termMonths"].forEach(function (id) {
          document.getElementById(id).classList.remove("input-error");
        });
        document.getElementById("summaryCards").style.display = "none";
        document.getElementById("tableWrap").style.display = "none";
        document.getElementById("emptyState").style.display = "";
        document.getElementById("stats").classList.remove("show");
        document.getElementById("status").textContent = "";
        document.getElementById("status").className = "status";
        amortRows = [];
      }

      function buildCsvLines() {
        var hasDate = amortRows[0].date !== "";
        var hasExtra = amortRows.some(function (r) {
          return r.extra > 0.005;
        });
        var header = ["期数"];
        if (hasDate) header.push("日期");
        header.push("月供(元)", "本金(元)", "利息(元)");
        if (hasExtra) header.push("额外还款(元)");
        header.push("剩余余额(元)");

        var lines = [header.join(",")];
        amortRows.forEach(function (r) {
          var row = [r.period];
          if (hasDate) row.push(r.date);
          row.push(r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2));
          if (hasExtra) row.push(r.extra.toFixed(2));
          row.push(r.balance.toFixed(2));
          lines.push(row.join(","));
        });
        return lines;
      }

      function exportCsv() {
        if (!amortRows.length) {
          showStatus("请先计算", "error");
          return;
        }
        var lines = buildCsvLines();
        var bom = "﻿";
        var blob = new Blob([bom + lines.join("\r\n")], {
          type: "text/csv;charset=utf-8;"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "amortization-table.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus("CSV 已下载", "success");
      }

      function copyTable() {
        if (!amortRows.length) {
          showStatus("请先计算", "error");
          return;
        }
        var hasDate = amortRows[0].date !== "";
        var hasExtra = amortRows.some(function (r) {
          return r.extra > 0.005;
        });
        var header = ["期数"];
        if (hasDate) header.push("日期");
        header.push("月供(元)", "本金(元)", "利息(元)");
        if (hasExtra) header.push("额外还款(元)");
        header.push("剩余余额(元)");

        var lines = [header.join("\t")];
        amortRows.forEach(function (r) {
          var row = [r.period];
          if (hasDate) row.push(r.date);
          row.push(r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2));
          if (hasExtra) row.push(r.extra.toFixed(2));
          row.push(r.balance.toFixed(2));
          lines.push(row.join("\t"));
        });

        navigator.clipboard
          .writeText(lines.join("\n"))
          .then(function () {
            showStatus("表格已复制（可粘贴到 Excel）", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      document.getElementById("btnCalc").onclick = calculate;
      document.getElementById("btnReset").onclick = reset;
      document.getElementById("btnExportCsv").onclick = exportCsv;
      document.getElementById("btnCopyTable").onclick = copyTable;

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          calculate();
        }
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
