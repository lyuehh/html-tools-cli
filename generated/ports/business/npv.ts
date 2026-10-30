// @ts-nocheck
// Generated from tools/business/npv.html
// Source SHA-256: 85ef401627bb69e3de42e12969cc426ca1cee11ca9baa9cc268915a6c7d59690
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

      function updateYearLabels() {
        var items = document.getElementById("cashflowList").children;
        for (var i = 0; i < items.length; i++) {
          items[i].querySelector(".year").textContent = "第" + (i + 1) + "年";
        }
      }

      function addCashflow() {
        var list = document.getElementById("cashflowList");
        var yearNum = list.children.length + 1;

        var item = document.createElement("div");
        item.className = "cashflow-item";

        var yearSpan = document.createElement("span");
        yearSpan.className = "year";
        yearSpan.textContent = "第" + yearNum + "年";

        var input = document.createElement("input");
        input.type = "number";
        input.placeholder = "现金流入";
        input.value = "0";

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.onclick = function () {
          deleteCashflow(deleteBtn);
        };

        item.appendChild(yearSpan);
        item.appendChild(input);
        item.appendChild(deleteBtn);
        list.appendChild(item);
      }

      function deleteCashflow(btn) {
        var list = document.getElementById("cashflowList");
        if (list.children.length > 1) {
          btn.parentElement.remove();
          updateYearLabels();
        }
      }

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(0) + "元";
      }

      function calculateNPV(cashflows, rate, initial) {
        var npv = -initial;
        for (var i = 0; i < cashflows.length; i++) {
          npv += cashflows[i] / Math.pow(1 + rate, i + 1);
        }
        return npv;
      }

      function calculateIRR(cashflows, initial) {
        var low = -0.99;
        var high = 10;
        var mid;

        for (var i = 0; i < 100; i++) {
          mid = (low + high) / 2;
          var npv = calculateNPV(cashflows, mid, initial);
          if (Math.abs(npv) < 0.01) break;
          if (npv > 0) {
            low = mid;
          } else {
            high = mid;
          }
        }
        return mid;
      }

      function calculate() {
        var initialInvestment = parseFloat(document.getElementById("initialInvestment").value) || 0;
        var discountRate = parseFloat(document.getElementById("discountRate").value) / 100 || 0.1;

        var cashflows = [];
        var items = document.getElementById("cashflowList").children;
        for (var i = 0; i < items.length; i++) {
          var cf = parseFloat(items[i].querySelector("input").value) || 0;
          cashflows.push(cf);
        }

        var npv = calculateNPV(cashflows, discountRate, initialInvestment);
        var irr = calculateIRR(cashflows, initialInvestment);
        var totalCashflow = cashflows.reduce(function (a, b) {
          return a + b;
        }, 0);
        var pi = initialInvestment > 0 ? (npv + initialInvestment) / initialInvestment : 0;

        // 静态回收期
        var cumulative = 0;
        var paybackPeriod = cashflows.length;
        for (var j = 0; j < cashflows.length; j++) {
          cumulative += cashflows[j];
          if (cumulative >= initialInvestment) {
            paybackPeriod = j + 1 - (cumulative - initialInvestment) / cashflows[j];
            break;
          }
        }

        document.getElementById("resultSection").classList.remove("hidden");

        var npvHighlight = document.getElementById("npvHighlight");
        npvHighlight.className = "highlight " + (npv >= 0 ? "positive" : "negative");
        document.getElementById("npv").textContent = formatMoney(npv);

        var irrEl = document.getElementById("irr");
        irrEl.textContent = (irr * 100).toFixed(2) + "%";
        irrEl.className = "result-value " + (irr > discountRate ? "green" : "red");

        var piEl = document.getElementById("pi");
        piEl.textContent = pi.toFixed(2);
        piEl.className = "result-value " + (pi >= 1 ? "green" : "red");

        document.getElementById("payback").textContent = paybackPeriod.toFixed(1) + "年";
        document.getElementById("totalCashflow").textContent = formatMoney(totalCashflow);

        var decision = document.getElementById("decision");
        var decisionIcon = document.getElementById("decisionIcon");
        var decisionText = document.getElementById("decisionText");

        if (npv >= 0) {
          decision.className = "decision accept";
          decisionIcon.textContent = "✅";
          decisionText.textContent = "建议投资：NPV为正，项目可行";
        } else {
          decision.className = "decision reject";
          decisionIcon.textContent = "❌";
          decisionText.textContent = "不建议投资：NPV为负，项目不可行";
        }
      }

      calculate();
    
