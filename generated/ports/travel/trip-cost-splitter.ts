// @ts-nocheck
// Generated from tools/travel/trip-cost-splitter.html
// Source SHA-256: c8d679b75f74508326895d2d5f0753c530fdf1f16ede1cec614eef06554cc6c2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "trip_cost_splitter_v1";
      var travelers = [];
      var expenses = [];

      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") document.body.setAttribute("data-theme", "light");
      })();

      function saveData() {
        localStorage.setItem(LS_KEY, JSON.stringify({ travelers: travelers, expenses: expenses }));
      }
      function loadData() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            travelers = data.travelers || [];
            expenses = data.expenses || [];
          }
        } catch (e) {
          console.error("加载数据失败:", e);
        }
      }
      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          travelers = data.travelers || [];
          expenses = data.expenses || [];
          saveData();
          return true;
        } catch (e) {
          return false;
        }
      }
      function saveToUrl() {
        try {
          var data = JSON.stringify({ travelers: travelers, expenses: expenses });
          if (data.length > 2000) return;
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(data)));
        } catch (e) {}
      }

      function addTraveler() {
        var input = document.getElementById("travelerName");
        var name = input.value.trim();
        if (!name) {
          showToast("请输入旅行者姓名", "error");
          return;
        }
        if (travelers.indexOf(name) > -1) {
          showToast("该旅行者已存在", "error");
          return;
        }
        travelers.push(name);
        input.value = "";
        saveData();
        saveToUrl();
        renderAll();
        showToast("已添加旅行者: " + name);
      }
      function deleteTraveler(index) {
        var name = travelers[index];
        var hasExpenses = expenses.some(function (e) {
          return e.payer === name;
        });
        if (hasExpenses) {
          showToast("该旅行者有费用记录，请先删除相关费用", "error");
          return;
        }
        travelers.splice(index, 1);
        saveData();
        saveToUrl();
        renderAll();
        showToast("已删除旅行者: " + name);
      }
      function addExpense() {
        var descInput = document.getElementById("expenseDesc");
        var amountInput = document.getElementById("expenseAmount");
        var payerSelect = document.getElementById("expensePayer");
        var desc = descInput.value.trim();
        var amount = parseFloat(amountInput.value);
        var payer = payerSelect.value;
        if (!desc) {
          showToast("请输入费用描述", "error");
          return;
        }
        if (!amount || amount <= 0) {
          showToast("请输入有效金额", "error");
          return;
        }
        if (!payer) {
          showToast("请选择付款人", "error");
          return;
        }
        expenses.push({ id: Date.now(), desc: desc, amount: amount, payer: payer });
        descInput.value = "";
        amountInput.value = "";
        payerSelect.value = "";
        saveData();
        saveToUrl();
        renderAll();
        showToast("已添加费用: " + desc);
      }
      function deleteExpense(id) {
        var index = -1;
        for (var i = 0; i < expenses.length; i++) {
          if (expenses[i].id === id) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          var expense = expenses[index];
          expenses.splice(index, 1);
          saveData();
          saveToUrl();
          renderAll();
          showToast("已删除费用: " + expense.desc);
        }
      }

      function calculateSettlement() {
        if (travelers.length === 0 || expenses.length === 0) {
          return { total: 0, perPerson: 0, balances: {}, settlements: [] };
        }
        var total = 0;
        for (var i = 0; i < expenses.length; i++) total += expenses[i].amount;
        var perPerson = total / travelers.length;
        var balances = {};
        for (var i = 0; i < travelers.length; i++) {
          var t = travelers[i];
          var paid = 0;
          for (var j = 0; j < expenses.length; j++) {
            if (expenses[j].payer === t) paid += expenses[j].amount;
          }
          balances[t] = { paid: paid, shouldPay: perPerson, balance: paid - perPerson };
        }
        var settlements = [];
        var debtors = [],
          creditors = [];
        for (var name in balances) {
          var data = balances[name];
          if (data.balance < -0.01) debtors.push({ name: name, amount: -data.balance });
          else if (data.balance > 0.01) creditors.push({ name: name, amount: data.balance });
        }
        debtors.sort(function (a, b) {
          return b.amount - a.amount;
        });
        creditors.sort(function (a, b) {
          return b.amount - a.amount;
        });
        var i = 0,
          j = 0;
        while (i < debtors.length && j < creditors.length) {
          var debtor = debtors[i],
            creditor = creditors[j];
          var amount = Math.min(debtor.amount, creditor.amount);
          if (amount > 0.01) {
            settlements.push({
              from: debtor.name,
              to: creditor.name,
              amount: Math.round(amount * 100) / 100
            });
          }
          debtor.amount -= amount;
          creditor.amount -= amount;
          if (debtor.amount < 0.01) i++;
          if (creditor.amount < 0.01) j++;
        }
        return { total: total, perPerson: perPerson, balances: balances, settlements: settlements };
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function renderTravelerList() {
        var container = document.getElementById("travelerList");
        document.getElementById("travelerCount").textContent = travelers.length;
        if (travelers.length === 0) {
          container.innerHTML =
            '<div class="empty-state"><div class="icon">👤</div><div>还没有添加旅行者</div></div>';
          return;
        }
        var html = "";
        for (var i = 0; i < travelers.length; i++) {
          html +=
            '<div class="list-item"><div><div class="name">' +
            escapeHtml(travelers[i]) +
            "</div></div>" +
            '<button class="btn btn-danger btn-icon" onclick="deleteTraveler(' +
            i +
            ')" title="删除">×</button></div>';
        }
        container.innerHTML = html;
      }
      function renderExpenseList() {
        var container = document.getElementById("expenseList");
        document.getElementById("expenseCount").textContent = expenses.length;
        if (expenses.length === 0) {
          container.innerHTML =
            '<div class="empty-state"><div class="icon">📋</div><div>还没有添加费用</div></div>';
          return;
        }
        var html = "";
        for (var i = 0; i < expenses.length; i++) {
          var e = expenses[i];
          html +=
            '<div class="list-item"><div><div class="name">' +
            escapeHtml(e.desc) +
            "</div>" +
            '<div class="details">' +
            escapeHtml(e.payer) +
            " 付款</div></div>" +
            '<div style="display: flex; align-items: center; gap: 12px;">' +
            '<span class="amount">¥' +
            e.amount.toFixed(2) +
            "</span>" +
            '<button class="btn btn-danger btn-icon" onclick="deleteExpense(' +
            e.id +
            ')" title="删除">×</button></div></div>';
        }
        container.innerHTML = html;
      }
      function renderPayerSelect() {
        var select = document.getElementById("expensePayer");
        var currentValue = select.value;
        var html = '<option value="">谁付的钱</option>';
        for (var i = 0; i < travelers.length; i++) {
          html +=
            '<option value="' +
            escapeHtml(travelers[i]) +
            '">' +
            escapeHtml(travelers[i]) +
            "</option>";
        }
        select.innerHTML = html;
        if (travelers.indexOf(currentValue) > -1) select.value = currentValue;
      }
      function renderSummary() {
        var result = calculateSettlement();
        document.getElementById("totalAmount").textContent = "¥" + result.total.toFixed(2);
        document.getElementById("perPersonAmount").textContent = "¥" + result.perPerson.toFixed(2);
        document.getElementById("participantCount").textContent = travelers.length;
        var settlementContainer = document.getElementById("settlementList");
        if (result.settlements.length === 0) {
          var emptyMsg =
            travelers.length === 0 || expenses.length === 0
              ? "添加旅行者和费用后自动计算"
              : "无需结算，费用已平衡";
          settlementContainer.innerHTML =
            '<div class="empty-state" style="padding: 20px"><div>' + emptyMsg + "</div></div>";
        } else {
          var html = "";
          for (var i = 0; i < result.settlements.length; i++) {
            var s = result.settlements[i];
            html +=
              '<div class="settlement-item"><span class="from">' +
              escapeHtml(s.from) +
              "</span>" +
              '<span class="arrow">→</span><span class="to">' +
              escapeHtml(s.to) +
              "</span>" +
              '<span class="amount">¥' +
              s.amount.toFixed(2) +
              "</span></div>";
          }
          settlementContainer.innerHTML = html;
        }
        var balanceContainer = document.getElementById("balanceList");
        var balanceKeys = Object.keys(result.balances);
        if (balanceKeys.length > 0) {
          var html =
            '<div class="section-title" style="margin-top: 16px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">👤 个人明细</div>';
          for (var i = 0; i < balanceKeys.length; i++) {
            var name = balanceKeys[i],
              data = result.balances[name];
            var balanceClass = data.balance >= 0 ? "positive" : "negative";
            var balanceSign = data.balance >= 0 ? "+" : "";
            html +=
              '<div class="balance-item"><div><div class="name">' +
              escapeHtml(name) +
              "</div>" +
              '<div class="paid">已付 ¥' +
              data.paid.toFixed(2) +
              " / 应付 ¥" +
              data.shouldPay.toFixed(2) +
              "</div></div>" +
              '<div class="balance ' +
              balanceClass +
              '">' +
              balanceSign +
              "¥" +
              data.balance.toFixed(2) +
              "</div></div>";
          }
          balanceContainer.innerHTML = html;
        } else {
          balanceContainer.innerHTML = "";
        }
      }
      function renderAll() {
        renderTravelerList();
        renderExpenseList();
        renderPayerSelect();
        renderSummary();
      }

      function copySettlement() {
        var result = calculateSettlement();
        if (travelers.length === 0 || expenses.length === 0) {
          showToast("没有可复制的内容", "error");
          return;
        }
        var text = "【旅行费用分摊】\n\n";
        text += "参与人: " + travelers.join("、") + "\n";
        text += "总费用: ¥" + result.total.toFixed(2) + "\n";
        text += "人均: ¥" + result.perPerson.toFixed(2) + "\n\n";
        text += "费用明细:\n";
        for (var i = 0; i < expenses.length; i++) {
          var e = expenses[i];
          text += "- " + e.desc + ": ¥" + e.amount.toFixed(2) + " (" + e.payer + "付)\n";
        }
        text += "\n结算方案:\n";
        if (result.settlements.length === 0) {
          text += "无需结算，费用已平衡\n";
        } else {
          for (var i = 0; i < result.settlements.length; i++) {
            var s = result.settlements[i];
            text += "- " + s.from + " → " + s.to + ": ¥" + s.amount.toFixed(2) + "\n";
          }
        }
        navigator.clipboard.writeText(text).then(function () {
          showToast("已复制到剪贴板");
        });
      }
      function shareData() {
        if (travelers.length === 0) {
          showToast("没有可分享的内容", "error");
          return;
        }
        saveToUrl();
        navigator.clipboard.writeText(location.href).then(function () {
          showToast("链接已复制到剪贴板");
        });
      }
      function clearAll() {
        if (travelers.length === 0 && expenses.length === 0) {
          showToast("已经是空的了");
          return;
        }
        if (!confirm("确定要清空所有数据吗？")) return;
        travelers = [];
        expenses = [];
        saveData();
        history.replaceState(null, "", location.pathname);
        renderAll();
        showToast("已清空全部数据");
      }
      function showToast(msg, type) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.className = "toast" + (type === "error" ? " error" : "");
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      if (!loadFromUrl()) loadData();
      renderAll();
    
