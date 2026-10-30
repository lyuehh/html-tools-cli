// @ts-nocheck
// Generated from tools/life/expense-tracker.html
// Source SHA-256: cc93edbac4c9001fbe953fb5ade5a360c61d0a2bcfb04c675fd846d0ecfa6c3e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      function save() {
        localStorage.setItem("transactions", JSON.stringify(transactions));
      }
      function render() {
        const income = transactions
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0);
        const expense = transactions
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0);
        const balance = income - expense;
        document.getElementById("balance").textContent = "¥" + balance.toFixed(2);
        document.getElementById("balance").className =
          "balance-amount " + (balance >= 0 ? "positive" : "negative");
        document.getElementById("totalIncome").textContent = "¥" + income.toFixed(2);
        document.getElementById("totalExpense").textContent = "¥" + expense.toFixed(2);
        document.getElementById("list").innerHTML = transactions
          .slice()
          .reverse()
          .map(
            (t, i) =>
              '<div class="item"><span>' +
              t.desc +
              '</span><span class="item-amount ' +
              t.type +
              '">' +
              (t.type === "income" ? "+" : "-") +
              "¥" +
              t.amount.toFixed(2) +
              "</span></div>"
          )
          .join("");
      }
      function addTransaction() {
        const desc = document.getElementById("desc").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;
        if (desc && amount > 0) {
          transactions.push({ desc, amount, type, date: new Date().toISOString() });
          save();
          render();
          document.getElementById("desc").value = "";
          document.getElementById("amount").value = "";
        }
      }
      render();

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
    
