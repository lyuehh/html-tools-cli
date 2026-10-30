// @ts-nocheck
// Generated from tools/finance/exchange-split.html
// Source SHA-256: 2101c68c922d40e797a9567b80407016a2e6a4e3eeff679cda76c9284dd9f721
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let people = [
        { id: 1, name: "小明" },
        { id: 2, name: "小红" },
        { id: 3, name: "小刚" }
      ];
      let expenses = [
        { id: 1, desc: "午餐", amount: 300, paidBy: 1 },
        { id: 2, desc: "打车", amount: 50, paidBy: 2 }
      ];
      let nextPersonId = 4;
      let nextExpenseId = 3;

      function renderPeople() {
        const container = document.getElementById("personList");
        container.textContent = "";

        people.forEach((person) => {
          const div = document.createElement("div");
          div.className = "person-item";

          const input = document.createElement("input");
          input.type = "text";
          input.value = person.name;
          input.oninput = function () {
            person.name = this.value;
            calculate();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removePerson(person.id);
          };

          div.appendChild(input);
          div.appendChild(removeBtn);
          container.appendChild(div);
        });
      }

      function renderExpenses() {
        const container = document.getElementById("expenseList");
        container.textContent = "";

        expenses.forEach((expense) => {
          const div = document.createElement("div");
          div.className = "expense-item";

          const row = document.createElement("div");
          row.className = "expense-row";

          const descInput = document.createElement("input");
          descInput.type = "text";
          descInput.value = expense.desc;
          descInput.placeholder = "支出说明";
          descInput.oninput = function () {
            expense.desc = this.value;
          };

          const amountInput = document.createElement("input");
          amountInput.type = "number";
          amountInput.value = expense.amount;
          amountInput.placeholder = "金额";
          amountInput.oninput = function () {
            expense.amount = parseFloat(this.value) || 0;
            calculate();
          };

          const paidBySelect = document.createElement("select");
          people.forEach((p) => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name + " 支付";
            option.selected = p.id === expense.paidBy;
            paidBySelect.appendChild(option);
          });
          paidBySelect.onchange = function () {
            expense.paidBy = parseInt(this.value);
            calculate();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeExpense(expense.id);
          };

          row.appendChild(descInput);
          row.appendChild(amountInput);
          row.appendChild(paidBySelect);
          row.appendChild(removeBtn);
          div.appendChild(row);
          container.appendChild(div);
        });
      }

      function addPerson() {
        people.push({ id: nextPersonId++, name: "新成员" });
        renderPeople();
        renderExpenses();
        calculate();
      }

      function removePerson(id) {
        if (people.length <= 2) return alert("至少需要2个人");
        people = people.filter((p) => p.id !== id);
        expenses = expenses.filter((e) => e.paidBy !== id);
        renderPeople();
        renderExpenses();
        calculate();
      }

      function addExpense() {
        expenses.push({ id: nextExpenseId++, desc: "", amount: 0, paidBy: people[0]?.id || 1 });
        renderExpenses();
        calculate();
      }

      function removeExpense(id) {
        expenses = expenses.filter((e) => e.id !== id);
        renderExpenses();
        calculate();
      }

      function calculate() {
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        const perPerson = people.length > 0 ? total / people.length : 0;

        document.getElementById("totalExpense").textContent = "¥" + total.toFixed(2);
        document.getElementById("perPerson").textContent = "¥" + perPerson.toFixed(2);

        // 计算每个人的收支情况
        const balances = {};
        people.forEach((p) => {
          balances[p.id] = { name: p.name, paid: 0, shouldPay: perPerson };
        });

        expenses.forEach((e) => {
          if (balances[e.paidBy]) {
            balances[e.paidBy].paid += e.amount;
          }
        });

        // 渲染个人收支
        const balanceContainer = document.getElementById("balanceList");
        balanceContainer.textContent = "";

        const maxBalance = Math.max(
          ...Object.values(balances).map((b) => Math.abs(b.paid - b.shouldPay))
        );

        Object.values(balances).forEach((b) => {
          const diff = b.paid - b.shouldPay;
          const div = document.createElement("div");
          div.className = "settlement-item";

          const nameSpan = document.createElement("span");
          nameSpan.textContent = b.name;

          const rightDiv = document.createElement("div");
          rightDiv.style.textAlign = "right";

          const statusSpan = document.createElement("div");
          statusSpan.className = diff >= 0 ? "owed" : "owes";
          statusSpan.textContent =
            diff >= 0 ? "应收 ¥" + diff.toFixed(2) : "应付 ¥" + Math.abs(diff).toFixed(2);

          const detailSpan = document.createElement("div");
          detailSpan.style.fontSize = "0.8rem";
          detailSpan.style.color = "var(--text-secondary)";
          detailSpan.textContent =
            "已付 ¥" + b.paid.toFixed(2) + " / 应付 ¥" + b.shouldPay.toFixed(2);

          rightDiv.appendChild(statusSpan);
          rightDiv.appendChild(detailSpan);
          div.appendChild(nameSpan);
          div.appendChild(rightDiv);
          balanceContainer.appendChild(div);
        });

        // 计算结算方案
        calculateSettlements(balances);
      }

      function calculateSettlements(balances) {
        const container = document.getElementById("settlementList");
        container.textContent = "";

        // 简化的结算算法
        const debtors = []; // 欠钱的人
        const creditors = []; // 被欠钱的人

        Object.entries(balances).forEach(([id, b]) => {
          const diff = b.paid - b.shouldPay;
          if (diff < -0.01) {
            debtors.push({ id, name: b.name, amount: -diff });
          } else if (diff > 0.01) {
            creditors.push({ id, name: b.name, amount: diff });
          }
        });

        // 排序
        debtors.sort((a, b) => b.amount - a.amount);
        creditors.sort((a, b) => b.amount - a.amount);

        const settlements = [];

        while (debtors.length > 0 && creditors.length > 0) {
          const debtor = debtors[0];
          const creditor = creditors[0];

          const amount = Math.min(debtor.amount, creditor.amount);

          if (amount > 0.01) {
            settlements.push({
              from: debtor.name,
              to: creditor.name,
              amount: amount
            });
          }

          debtor.amount -= amount;
          creditor.amount -= amount;

          if (debtor.amount < 0.01) debtors.shift();
          if (creditor.amount < 0.01) creditors.shift();
        }

        if (settlements.length === 0) {
          const div = document.createElement("div");
          div.style.cssText = "text-align: center; color: var(--text-secondary); padding: 20px;";
          div.textContent = "无需结算，费用已平衡";
          container.appendChild(div);
        } else {
          settlements.forEach((s) => {
            const div = document.createElement("div");
            div.className = "settlement-item";

            const text = document.createElement("span");
            text.textContent = s.from + " → " + s.to;

            const amount = document.createElement("span");
            amount.className = "settlement-arrow";
            amount.textContent = "¥" + s.amount.toFixed(2);

            div.appendChild(text);
            div.appendChild(amount);
            container.appendChild(div);
          });
        }
      }

      renderPeople();
      renderExpenses();
      calculate();

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
    
