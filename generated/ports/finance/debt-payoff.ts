// @ts-nocheck
// Generated from tools/finance/debt-payoff.html
// Source SHA-256: d365ba6948acb0f4bf41c7511f5ce72f989539ea7a72880729ce14cf196ab4a1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let debts = [
        { id: 1, name: "信用卡A", balance: 15000, rate: 18.25, minPayment: 500 },
        { id: 2, name: "信用卡B", balance: 8000, rate: 15.6, minPayment: 300 },
        { id: 3, name: "消费贷", balance: 30000, rate: 9.0, minPayment: 1000 }
      ];
      let nextId = 4;
      let strategy = "avalanche";

      function renderDebts() {
        const container = document.getElementById("debtList");
        container.textContent = "";

        debts.forEach((debt) => {
          const div = document.createElement("div");
          div.className = "debt-item";

          const header = document.createElement("div");
          header.className = "debt-header";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = debt.name;
          nameInput.style.cssText =
            "background: transparent; border: none; color: var(--text-primary); font-weight: 600; font-size: 1rem;";
          nameInput.oninput = function () {
            debt.name = this.value;
            calculate();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeDebt(debt.id);
          };

          header.appendChild(nameInput);
          header.appendChild(removeBtn);

          const fields = document.createElement("div");
          fields.className = "debt-fields";

          const balanceField = createField("余额 (元)", debt.balance, function (v) {
            debt.balance = v;
            calculate();
          });
          const rateField = createField("年利率 (%)", debt.rate, function (v) {
            debt.rate = v;
            calculate();
          });
          const minField = createField("最低还款 (元)", debt.minPayment, function (v) {
            debt.minPayment = v;
            calculate();
          });

          fields.appendChild(balanceField);
          fields.appendChild(rateField);
          fields.appendChild(minField);

          div.appendChild(header);
          div.appendChild(fields);
          container.appendChild(div);
        });
      }

      function createField(label, value, onChange) {
        const div = document.createElement("div");
        div.className = "field";

        const labelEl = document.createElement("label");
        labelEl.textContent = label;

        const input = document.createElement("input");
        input.type = "number";
        input.value = value;
        input.oninput = function () {
          onChange(parseFloat(this.value) || 0);
        };

        div.appendChild(labelEl);
        div.appendChild(input);
        return div;
      }

      function addDebt() {
        debts.push({ id: nextId++, name: "新债务", balance: 10000, rate: 10, minPayment: 500 });
        renderDebts();
        calculate();
      }

      function removeDebt(id) {
        debts = debts.filter((d) => d.id !== id);
        renderDebts();
        calculate();
      }

      function setStrategy(s) {
        strategy = s;
        document.querySelectorAll(".strategy-tab").forEach((t) => t.classList.remove("active"));
        document.querySelector('[data-strategy="' + s + '"]').classList.add("active");
        calculate();
      }

      function calculate() {
        const monthlyBudget = parseFloat(document.getElementById("monthlyBudget").value) || 0;

        // 复制债务数据进行模拟
        let simDebts = debts.map((d) => ({ ...d }));

        // 按策略排序
        if (strategy === "avalanche") {
          simDebts.sort((a, b) => b.rate - a.rate); // 高利率优先
        } else {
          simDebts.sort((a, b) => a.balance - b.balance); // 小余额优先
        }

        const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
        let totalInterest = 0;
        let month = 0;
        const timeline = [];

        while (simDebts.some((d) => d.balance > 0) && month < 360) {
          month++;
          let remaining = monthlyBudget;
          const monthEvents = [];

          // 先付最低还款
          simDebts.forEach((d) => {
            if (d.balance > 0) {
              const monthlyInterest = d.balance * (d.rate / 100 / 12);
              totalInterest += monthlyInterest;
              d.balance += monthlyInterest;

              const payment = Math.min(d.minPayment, d.balance, remaining);
              d.balance -= payment;
              remaining -= payment;
            }
          });

          // 剩余预算用于优先债务
          for (const d of simDebts) {
            if (d.balance > 0 && remaining > 0) {
              const extra = Math.min(d.balance, remaining);
              d.balance -= extra;
              remaining -= extra;

              if (d.balance <= 0.01) {
                d.balance = 0;
                monthEvents.push({ name: d.name, type: "paid" });
              }
            }
          }

          if (monthEvents.length > 0) {
            timeline.push({ month, events: monthEvents });
          }
        }

        const fmt = (n) =>
          "¥" + n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        document.getElementById("totalDebt").textContent = fmt(totalDebt);
        document.getElementById("totalInterest").textContent = fmt(totalInterest);
        document.getElementById("monthsToPayoff").textContent = month + "个月";

        const payoffDate = new Date();
        payoffDate.setMonth(payoffDate.getMonth() + month);
        document.getElementById("payoffDate").textContent =
          payoffDate.getFullYear() + "年" + (payoffDate.getMonth() + 1) + "月";

        // 渲染时间线
        const timelineContainer = document.getElementById("timeline");
        timelineContainer.textContent = "";

        if (timeline.length === 0) {
          const div = document.createElement("div");
          div.style.cssText = "text-align: center; color: var(--text-secondary); padding: 20px;";
          div.textContent = "暂无还款计划";
          timelineContainer.appendChild(div);
        } else {
          timeline.forEach((item) => {
            const div = document.createElement("div");
            div.className = "timeline-item";

            const monthDiv = document.createElement("div");
            monthDiv.className = "timeline-month";
            monthDiv.textContent = "第" + item.month + "月";

            const contentDiv = document.createElement("div");
            contentDiv.className = "timeline-content";

            item.events.forEach((event) => {
              const eventDiv = document.createElement("div");
              eventDiv.className = "timeline-debt paid-off";
              eventDiv.textContent = "✓ " + event.name + " 还清！";
              contentDiv.appendChild(eventDiv);
            });

            div.appendChild(monthDiv);
            div.appendChild(contentDiv);
            timelineContainer.appendChild(div);
          });
        }
      }

      renderDebts();
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
    
