// @ts-nocheck
// Generated from tools/social/split-bill.html
// Source SHA-256: 4a5326cbbc7528578e68a2253a51ced3402303c712485be82309633c04d39633
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const avatarColors = [
        "#4d9fff",
        "#00f5d4",
        "#ff9f43",
        "#00d26a",
        "#ff6b6b",
        "#a55eea",
        "#ffd93d",
        "#26de81"
      ];
      const defaultNames = ["小明", "小红", "小刚", "小丽", "小强", "小芳", "小军", "小花"];
      const emojis = ["😀", "😊", "🤩", "😎", "🥳", "😄", "🤗", "😋"];

      let people = [
        { id: 1, name: "小明", paid: 300, emoji: "😀", color: avatarColors[0] },
        { id: 2, name: "小红", paid: 200, emoji: "😊", color: avatarColors[1] },
        { id: 3, name: "小刚", paid: 0, emoji: "🤩", color: avatarColors[2] },
        { id: 4, name: "小丽", paid: 0, emoji: "😎", color: avatarColors[3] }
      ];
      let nextId = 5;

      function render() {
        const list = document.getElementById("peopleList");
        list.innerHTML = people
          .map(
            (person, index) => `
        <div class="person-item" data-id="${person.id}">
          <div class="person-avatar" style="background:${person.color}">${person.emoji}</div>
          <input type="text" class="person-name" value="${person.name}"
            onchange="updatePerson(${person.id}, 'name', this.value)">
          <input type="number" class="person-paid" value="${person.paid}" min="0" step="0.01" placeholder="已付"
            oninput="updatePerson(${person.id}, 'paid', parseFloat(this.value) || 0)">
          <button class="delete-btn" onclick="removePerson(${person.id})" title="删除">×</button>
        </div>
      `
          )
          .join("");
        calculate();
      }

      function addPerson() {
        const colorIndex = people.length % avatarColors.length;
        const emojiIndex = people.length % emojis.length;
        const nameIndex = people.length % defaultNames.length;
        people.push({
          id: nextId++,
          name: defaultNames[nameIndex] + (Math.floor(people.length / defaultNames.length) || ""),
          paid: 0,
          emoji: emojis[emojiIndex],
          color: avatarColors[colorIndex]
        });
        render();
      }

      function removePerson(id) {
        if (people.length <= 2) {
          alert("至少需要2人参与分账");
          return;
        }
        people = people.filter((p) => p.id !== id);
        render();
      }

      function updatePerson(id, field, value) {
        const person = people.find((p) => p.id === id);
        if (person) {
          person[field] = value;
          calculate();
        }
      }

      function calculate() {
        const totalBill = parseFloat(document.getElementById("totalBill").value) || 0;
        const numPeople = people.length;
        const avgShare = totalBill / numPeople;

        // Update summary
        document.getElementById("summaryTotal").textContent = "¥" + totalBill.toFixed(2);
        document.getElementById("summaryPeople").textContent = numPeople + "人";
        document.getElementById("summaryAvg").textContent = "¥" + avgShare.toFixed(2);

        // Calculate balances
        const balances = people.map((p) => ({
          ...p,
          balance: p.paid - avgShare
        }));

        // Render balance bars
        const maxBalance = Math.max(...balances.map((b) => Math.abs(b.balance)), 1);
        const balanceHtml = balances
          .map((b) => {
            const percent = (Math.abs(b.balance) / maxBalance) * 50;
            const isPositive = b.balance >= 0;
            return `
          <div class="balance-item">
            <div class="person-avatar" style="background:${b.color};width:28px;height:28px;font-size:.9rem">${b.emoji}</div>
            <span class="balance-name">${b.name}</span>
            <div class="balance-bar">
              <div class="balance-center"></div>
              <div class="balance-fill ${isPositive ? "positive" : "negative"}"
                style="width:${percent}%"></div>
            </div>
            <span class="balance-value ${isPositive ? "positive" : "negative"}">
              ${isPositive ? "+" : ""}${b.balance.toFixed(2)}
            </span>
          </div>
        `;
          })
          .join("");
        document.getElementById("balanceList").innerHTML = balanceHtml;

        // Calculate settlements (minimize transactions)
        const settlements = calculateSettlements(balances);

        if (settlements.length === 0) {
          document.getElementById("resultList").innerHTML =
            '<div class="empty-state">✅ 账目已平，无需转账</div>';
        } else {
          const resultHtml = settlements
            .map(
              (s) => `
          <div class="result-item">
            <div class="result-names">
              <span style="color:${s.from.color}">${s.from.emoji} ${s.from.name}</span>
              <span class="result-arrow">→</span>
              <span style="color:${s.to.color}">${s.to.emoji} ${s.to.name}</span>
            </div>
            <span class="result-amount pay">¥${s.amount.toFixed(2)}</span>
          </div>
        `
            )
            .join("");
          document.getElementById("resultList").innerHTML = resultHtml;
        }
      }

      function calculateSettlements(balances) {
        // Separate debtors and creditors
        const debtors = balances
          .filter((b) => b.balance < -0.01)
          .map((b) => ({ ...b, amount: -b.balance }));
        const creditors = balances
          .filter((b) => b.balance > 0.01)
          .map((b) => ({ ...b, amount: b.balance }));

        const settlements = [];

        // Greedy algorithm to minimize transactions
        debtors.sort((a, b) => b.amount - a.amount);
        creditors.sort((a, b) => b.amount - a.amount);

        let i = 0,
          j = 0;
        while (i < debtors.length && j < creditors.length) {
          const debtor = debtors[i];
          const creditor = creditors[j];
          const amount = Math.min(debtor.amount, creditor.amount);

          if (amount > 0.01) {
            settlements.push({
              from: debtor,
              to: creditor,
              amount: amount
            });
          }

          debtor.amount -= amount;
          creditor.amount -= amount;

          if (debtor.amount < 0.01) i++;
          if (creditor.amount < 0.01) j++;
        }

        return settlements;
      }

      // Initialize
      render();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
