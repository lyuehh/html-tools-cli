// @ts-nocheck
// Generated from tools/finance/budget-tracker.html
// Source SHA-256: fd4fcb5951ab9e03550f10bbd4ac3f08003f888457555b479b153df65e8d3c2f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_budget_v1";

      // HTML escape function to prevent XSS
      function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }
      let transactions = [];

      function loadTransactions() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          transactions = saved ? JSON.parse(saved) : [];
        } catch (e) {
          transactions = [];
        }
        render();
      }

      function saveTransactions() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      }

      function handleEnter(event) {
        if (event.key === "Enter") {
          addTransaction();
        }
      }

      function addTransaction() {
        const description = document.getElementById("description").value.trim();
        const amount = parseFloat(document.getElementById("amount").value);
        const type = document.getElementById("type").value;
        const category = document.getElementById("category").value;

        if (!description || !amount || amount <= 0) {
          alert("请输入描述和金额");
          return;
        }

        transactions.unshift({
          id: Date.now(),
          description,
          amount,
          type,
          category,
          date: new Date().toISOString()
        });

        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";

        saveTransactions();
        render();
      }

      function deleteTransaction(id) {
        if (!confirm("确定要删除这条记录吗？")) return;
        transactions = transactions.filter((t) => t.id !== id);
        saveTransactions();
        render();
      }

      function render() {
        const container = document.getElementById("transactionsList");

        if (transactions.length === 0) {
          container.innerHTML = '<div class="empty-state">暂无交易记录</div>';
          updateSummary();
          return;
        }

        container.innerHTML = transactions
          .map(
            (t) => `
        <div class="transaction-item ${t.type}">
          <div class="transaction-info">
            <div class="transaction-desc">${escapeHtml(t.description)}</div>
            <div class="transaction-meta">
              ${t.category} · ${new Date(t.date).toLocaleDateString("zh-CN")}
            </div>
          </div>
          <div class="transaction-amount">
            ${t.type === "income" ? "+" : "-"}¥${t.amount.toFixed(2)}
          </div>
          <button class="transaction-delete" onclick="deleteTransaction(${t.id})">×</button>
        </div>
      `
          )
          .join("");

        updateSummary();
      }

      function updateSummary() {
        const income = transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expense;

        document.getElementById("totalIncome").textContent = "¥" + income.toFixed(2);
        document.getElementById("totalExpense").textContent = "¥" + expense.toFixed(2);
        document.getElementById("balance").textContent = "¥" + balance.toFixed(2);
      }

      // Initialize
      loadTransactions();

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
    
