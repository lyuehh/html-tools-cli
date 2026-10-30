// @ts-nocheck
// Generated from tools/office/expense-report.html
// Source SHA-256: 3c1768a281ac5b1424e8ebcb5504e4124e287201525f542853fb42c75553f89d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "expense_report_data_v1";
      var CATEGORIES = {
        travel: { name: "差旅", color: "var(--cat-travel)" },
        meals: { name: "餐饮", color: "var(--cat-meals)" },
        supplies: { name: "办公用品", color: "var(--cat-supplies)" },
        transport: { name: "交通", color: "var(--cat-transport)" },
        lodging: { name: "住宿", color: "var(--cat-lodging)" },
        other: { name: "其他", color: "var(--cat-other)" }
      };

      var expenses = [];

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            expenses = JSON.parse(saved);
          }
        } catch (e) {
          expenses = [];
        }
      }

      function saveToStorage() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(expenses));
        } catch (e) {}
      }

      function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      }

      function formatCurrency(amount) {
        return amount.toLocaleString("zh-CN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }

      function addExpense() {
        var dateEl = document.getElementById("expenseDate");
        var categoryEl = document.getElementById("expenseCategory");
        var descEl = document.getElementById("expenseDesc");
        var amountEl = document.getElementById("expenseAmount");

        var date = dateEl.value;
        var category = categoryEl.value;
        var description = descEl.value.trim();
        var amount = parseFloat(amountEl.value);

        if (!date) {
          showToast("请选择日期");
          dateEl.focus();
          return;
        }
        if (!description) {
          showToast("请输入描述");
          descEl.focus();
          return;
        }
        if (isNaN(amount) || amount <= 0) {
          showToast("请输入有效金额");
          amountEl.focus();
          return;
        }

        var expense = {
          id: generateId(),
          date: date,
          category: category,
          description: description,
          amount: amount
        };

        expenses.push(expense);
        expenses.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        saveToStorage();
        render();

        descEl.value = "";
        amountEl.value = "";
        descEl.focus();

        showToast("费用已添加");
      }

      function deleteExpense(id) {
        var index = -1;
        for (var i = 0; i < expenses.length; i++) {
          if (expenses[i].id === id) {
            index = i;
            break;
          }
        }
        if (index !== -1) {
          expenses.splice(index, 1);
          saveToStorage();
          render();
          showToast("已删除");
        }
      }

      function clearAll() {
        if (expenses.length === 0) {
          showToast("没有可清空的数据");
          return;
        }
        if (!confirm("确定要清空所有费用记录吗？此操作不可恢复。")) {
          return;
        }
        expenses = [];
        saveToStorage();
        render();
        showToast("已清空全部数据");
      }

      function exportCSV() {
        if (expenses.length === 0) {
          showToast("没有可导出的数据");
          return;
        }

        var headers = ["日期", "分类", "描述", "金额"];
        var rows = [];
        for (var i = 0; i < expenses.length; i++) {
          var e = expenses[i];
          var catName = CATEGORIES[e.category] ? CATEGORIES[e.category].name : e.category;
          var desc = '"' + e.description.replace(/"/g, '""') + '"';
          rows.push([e.date, catName, desc, e.amount.toFixed(2)].join(","));
        }

        var total = 0;
        for (var j = 0; j < expenses.length; j++) {
          total += expenses[j].amount;
        }
        rows.push(["", "", "总计", total.toFixed(2)].join(","));

        var csv = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n");

        var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        var now = new Date();
        var filename =
          "费用报销单_" +
          now.getFullYear() +
          String(now.getMonth() + 1).padStart(2, "0") +
          String(now.getDate()).padStart(2, "0") +
          ".csv";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("CSV 已导出");
      }

      function render() {
        renderTable();
        renderSummary();
      }

      function createDeleteButton(expenseId) {
        var btn = document.createElement("button");
        btn.className = "btn btn-icon btn-danger";
        btn.title = "删除";
        btn.onclick = function () {
          deleteExpense(expenseId);
        };
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "18");
        line1.setAttribute("y1", "6");
        line1.setAttribute("x2", "6");
        line1.setAttribute("y2", "18");
        var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "6");
        line2.setAttribute("y1", "6");
        line2.setAttribute("x2", "18");
        line2.setAttribute("y2", "18");
        svg.appendChild(line1);
        svg.appendChild(line2);
        btn.appendChild(svg);
        return btn;
      }

      function renderTable() {
        var tbody = document.getElementById("expenseTableBody");
        tbody.textContent = "";

        if (expenses.length === 0) {
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          td.colSpan = 5;
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          var iconDiv = document.createElement("div");
          iconDiv.className = "empty-state-icon";
          iconDiv.textContent = "📋";
          var pEl = document.createElement("p");
          pEl.textContent = "暂无费用记录，请添加第一笔费用";
          emptyDiv.appendChild(iconDiv);
          emptyDiv.appendChild(pEl);
          td.appendChild(emptyDiv);
          tr.appendChild(td);
          tbody.appendChild(tr);
          return;
        }

        for (var i = 0; i < expenses.length; i++) {
          var e = expenses[i];
          var row = document.createElement("tr");

          var dateTd = document.createElement("td");
          dateTd.textContent = e.date;

          var catTd = document.createElement("td");
          var badge = document.createElement("span");
          badge.className = "category-badge " + e.category;
          badge.textContent = CATEGORIES[e.category] ? CATEGORIES[e.category].name : e.category;
          catTd.appendChild(badge);

          var descTd = document.createElement("td");
          descTd.textContent = e.description;

          var amountTd = document.createElement("td");
          amountTd.className = "amount";
          amountTd.textContent = "¥" + formatCurrency(e.amount);

          var actionsTd = document.createElement("td");
          actionsTd.className = "actions";
          actionsTd.appendChild(createDeleteButton(e.id));

          row.appendChild(dateTd);
          row.appendChild(catTd);
          row.appendChild(descTd);
          row.appendChild(amountTd);
          row.appendChild(actionsTd);

          tbody.appendChild(row);
        }
      }

      function renderSummary() {
        var total = 0;
        for (var i = 0; i < expenses.length; i++) {
          total += expenses[i].amount;
        }
        document.getElementById("totalAmount").textContent = formatCurrency(total);

        var breakdown = {};
        for (var cat in CATEGORIES) {
          breakdown[cat] = 0;
        }
        for (var j = 0; j < expenses.length; j++) {
          var e = expenses[j];
          if (breakdown[e.category] !== undefined) {
            breakdown[e.category] += e.amount;
          } else {
            breakdown.other += e.amount;
          }
        }

        var container = document.getElementById("categoryBreakdown");
        container.textContent = "";

        for (var c in breakdown) {
          if (breakdown[c] > 0) {
            var item = document.createElement("div");
            item.className = "breakdown-item";

            var catDiv = document.createElement("div");
            catDiv.className = "breakdown-category";

            var dot = document.createElement("span");
            dot.className = "breakdown-dot";
            dot.style.background = CATEGORIES[c].color;

            var nameSpan = document.createTextNode(CATEGORIES[c].name);

            catDiv.appendChild(dot);
            catDiv.appendChild(nameSpan);

            var valueDiv = document.createElement("div");
            valueDiv.className = "breakdown-value";
            valueDiv.textContent = "¥" + formatCurrency(breakdown[c]);

            item.appendChild(catDiv);
            item.appendChild(valueDiv);
            container.appendChild(item);
          }
        }
      }

      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

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

      function initDateInput() {
        var dateEl = document.getElementById("expenseDate");
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, "0");
        var dd = String(today.getDate()).padStart(2, "0");
        dateEl.value = yyyy + "-" + mm + "-" + dd;
      }

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          addExpense();
        }
      });

      initTheme();
      initDateInput();
      loadFromStorage();
      render();
    
