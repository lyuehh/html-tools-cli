// @ts-nocheck
// Generated from tools/travel/trip-budget.html
// Source SHA-256: 8377cfe061818a6017ea3200ac5aab7e35f462087de477bdf55b45d3ab040351
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "trip_budget_v1";

      var categoryNames = {
        flights: "✈️ 机票",
        hotel: "🏨 住宿",
        food: "🍜 餐饮",
        transport: "🚗 交通",
        activities: "🎭 活动",
        shopping: "🛍️ 购物",
        other: "📦 其他"
      };

      var categoryIcons = {
        flights: "✈️",
        hotel: "🏨",
        food: "🍜",
        transport: "🚗",
        activities: "🎭",
        shopping: "🛍️",
        other: "📦"
      };

      var state = {
        budget: 0,
        expenses: []
      };

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            state = JSON.parse(saved);
          }
        } catch (e) {
          console.error("Failed to load from storage:", e);
        }
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(state));
        } catch (e) {
          console.error("Failed to save to storage:", e);
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          if (data && typeof data.budget === "number" && Array.isArray(data.expenses)) {
            state = data;
            saveToStorage();
            return true;
          }
        } catch (e) {
          console.error("Failed to load from URL:", e);
        }
        return false;
      }

      function saveToUrl() {
        try {
          var data = btoa(encodeURIComponent(JSON.stringify(state)));
          if (data.length < 2000) {
            history.replaceState(null, "", "#" + data);
          }
        } catch (e) {
          console.error("Failed to save to URL:", e);
        }
      }

      function formatCurrency(amount) {
        return (
          "¥" +
          amount.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
        );
      }

      function calculateTotals() {
        var totals = {
          flights: 0,
          hotel: 0,
          food: 0,
          transport: 0,
          activities: 0,
          shopping: 0,
          other: 0
        };

        var total = 0;
        state.expenses.forEach(function (expense) {
          totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
          total += expense.amount;
        });

        return { totals: totals, total: total };
      }

      function updateUI() {
        var budgetInput = document.getElementById("totalBudget");
        budgetInput.value = state.budget || "";

        var calc = calculateTotals();
        var spent = calc.total;
        var remaining = state.budget - spent;
        var percentage = state.budget > 0 ? Math.min((spent / state.budget) * 100, 100) : 0;

        document.getElementById("totalSpent").textContent = formatCurrency(spent);

        var remainingEl = document.getElementById("remaining");
        remainingEl.textContent = formatCurrency(remaining);
        if (remaining < 0) {
          remainingEl.classList.add("over");
        } else {
          remainingEl.classList.remove("over");
        }

        document.getElementById("percentage").textContent = percentage.toFixed(1) + "%";

        var progressFill = document.getElementById("progressFill");
        var actualPercentage = state.budget > 0 ? (spent / state.budget) * 100 : 0;
        progressFill.style.width = Math.min(actualPercentage, 100) + "%";
        progressFill.classList.remove("warning", "danger");
        if (actualPercentage >= 100) {
          progressFill.classList.add("danger");
        } else if (actualPercentage >= 80) {
          progressFill.classList.add("warning");
        }

        document.getElementById("progressSpent").textContent = formatCurrency(spent);
        document.getElementById("progressTotal").textContent = "/ " + formatCurrency(state.budget);

        Object.keys(calc.totals).forEach(function (cat) {
          var item = document.querySelector(
            '.category-item[data-category="' + cat + '"] .category-amount'
          );
          if (item) {
            item.textContent = formatCurrency(calc.totals[cat]);
          }
        });

        renderExpenses();
      }

      function renderExpenses() {
        var container = document.getElementById("expenseItems");
        var countEl = document.getElementById("expenseCount");

        countEl.textContent = state.expenses.length + " 笔";

        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        if (state.expenses.length === 0) {
          var emptyState = document.createElement("div");
          emptyState.className = "empty-state";
          var emptyIcon = document.createElement("div");
          emptyIcon.className = "empty-state-icon";
          emptyIcon.textContent = "📝";
          var emptyText = document.createElement("div");
          emptyText.className = "empty-state-text";
          emptyText.textContent = "还没有消费记录，添加第一笔吧";
          emptyState.appendChild(emptyIcon);
          emptyState.appendChild(emptyText);
          container.appendChild(emptyState);
          return;
        }

        var sorted = state.expenses.slice().reverse();
        sorted.forEach(function (expense, idx) {
          var realIdx = state.expenses.length - 1 - idx;

          var item = document.createElement("div");
          item.className = "expense-item";
          item.setAttribute("data-category", expense.category);

          var icon = document.createElement("div");
          icon.className = "expense-icon";
          icon.textContent = categoryIcons[expense.category];

          var details = document.createElement("div");
          details.className = "expense-details";

          var desc = document.createElement("div");
          desc.className = "expense-description";
          desc.textContent = expense.description;

          var cat = document.createElement("div");
          cat.className = "expense-category";
          cat.textContent = categoryNames[expense.category];

          details.appendChild(desc);
          details.appendChild(cat);

          var amount = document.createElement("div");
          amount.className = "expense-amount";
          amount.textContent = formatCurrency(expense.amount);

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn-delete";
          deleteBtn.setAttribute("aria-label", "删除");
          deleteBtn.setAttribute("data-index", realIdx);
          deleteBtn.addEventListener("click", function () {
            deleteExpense(parseInt(this.getAttribute("data-index"), 10));
          });

          var deleteSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          deleteSvg.setAttribute("viewBox", "0 0 24 24");
          deleteSvg.setAttribute("fill", "none");
          deleteSvg.setAttribute("stroke", "currentColor");
          deleteSvg.setAttribute("stroke-width", "2");
          deleteSvg.setAttribute("stroke-linecap", "round");
          deleteSvg.setAttribute("stroke-linejoin", "round");

          var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
          polyline.setAttribute("points", "3 6 5 6 21 6");

          var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute(
            "d",
            "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          );

          deleteSvg.appendChild(polyline);
          deleteSvg.appendChild(path);
          deleteBtn.appendChild(deleteSvg);

          item.appendChild(icon);
          item.appendChild(details);
          item.appendChild(amount);
          item.appendChild(deleteBtn);

          container.appendChild(item);
        });
      }

      function addExpense(description, amount, category) {
        state.expenses.push({
          id: Date.now(),
          description: description,
          amount: amount,
          category: category,
          createdAt: new Date().toISOString()
        });
        saveToStorage();
        saveToUrl();
        updateUI();
      }

      function deleteExpense(index) {
        if (index >= 0 && index < state.expenses.length) {
          state.expenses.splice(index, 1);
          saveToStorage();
          saveToUrl();
          updateUI();
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有数据吗？此操作不可恢复。")) {
          state = { budget: 0, expenses: [] };
          saveToStorage();
          history.replaceState(null, "", location.pathname);
          updateUI();
        }
      }

      document.getElementById("totalBudget").addEventListener("input", function (e) {
        state.budget = parseFloat(e.target.value) || 0;
        saveToStorage();
        saveToUrl();
        updateUI();
      });

      document.getElementById("expenseForm").addEventListener("submit", function (e) {
        e.preventDefault();
        var descEl = document.getElementById("description");
        var amountEl = document.getElementById("amount");
        var categoryEl = document.getElementById("category");

        var description = descEl.value.trim();
        var amount = parseFloat(amountEl.value);
        var category = categoryEl.value;

        if (description && amount > 0 && category) {
          addExpense(description, amount, category);
          descEl.value = "";
          amountEl.value = "";
          descEl.focus();
        }
      });

      document.getElementById("btnShare").addEventListener("click", function () {
        saveToUrl();
        navigator.clipboard
          .writeText(location.href)
          .then(function () {
            alert("链接已复制到剪贴板");
          })
          .catch(function () {
            alert("复制失败，请手动复制地址栏链接");
          });
      });

      document.getElementById("btnClear").addEventListener("click", clearAll);

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
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();
      if (!loadFromUrl()) {
        loadFromStorage();
      }
      updateUI();
    
