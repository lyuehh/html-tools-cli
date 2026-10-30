// @ts-nocheck
// Generated from tools/business/cost-calc.html
// Source SHA-256: 27320c837954b641a04af2a79dbcd86e0194a31337efd75f305a5e5a62782841
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

      function addMaterial() {
        var list = document.getElementById("materialList");
        var item = document.createElement("div");
        item.className = "cost-item";

        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "材料名称";

        var priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.placeholder = "单价";
        priceInput.min = "0";

        var qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.placeholder = "用量";
        qtyInput.min = "0";
        qtyInput.step = "0.1";

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.onclick = function () {
          deleteItem(deleteBtn);
        };

        item.appendChild(nameInput);
        item.appendChild(priceInput);
        item.appendChild(qtyInput);
        item.appendChild(deleteBtn);
        list.appendChild(item);
      }

      function deleteItem(btn) {
        var list = document.getElementById("materialList");
        if (list.children.length > 1) {
          btn.parentElement.remove();
        }
      }

      function formatMoney(num) {
        if (Math.abs(num) >= 10000) {
          return (num / 10000).toFixed(2) + "万";
        }
        return num.toFixed(2) + "元";
      }

      function calculate() {
        // 材料成本
        var materialCost = 0;
        var materialItems = document.getElementById("materialList").children;
        for (var i = 0; i < materialItems.length; i++) {
          var inputs = materialItems[i].querySelectorAll("input");
          var price = parseFloat(inputs[1].value) || 0;
          var qty = parseFloat(inputs[2].value) || 0;
          materialCost += price * qty;
        }

        // 人工成本
        var laborHours = parseFloat(document.getElementById("laborHours").value) || 0;
        var laborRate = parseFloat(document.getElementById("laborRate").value) || 0;
        var laborCost = laborHours * laborRate;

        // 制造费用
        var depreciation = parseFloat(document.getElementById("depreciation").value) || 0;
        var utilities = parseFloat(document.getElementById("utilities").value) || 0;
        var rent = parseFloat(document.getElementById("rent").value) || 0;
        var otherCost = parseFloat(document.getElementById("otherCost").value) || 0;
        var overheadCost = depreciation + utilities + rent + otherCost;

        // 直接成本
        var directCost = materialCost + laborCost + overheadCost;

        // 间接费用
        var adminRate = parseFloat(document.getElementById("adminRate").value) / 100 || 0;
        var salesRate = parseFloat(document.getElementById("salesRate").value) / 100 || 0;
        var adminCost = directCost * adminRate;
        var salesCost = directCost * salesRate;

        // 总成本
        var unitCost = directCost + adminCost + salesCost;

        // 建议售价
        var profitRate = parseFloat(document.getElementById("profitRate").value) / 100 || 0.2;
        var suggestedPrice = unitCost * (1 + profitRate);

        // 批次计算
        var quantity = parseInt(document.getElementById("quantity").value) || 1;
        var totalCost = unitCost * quantity;
        var totalRevenue = suggestedPrice * quantity;
        var totalProfit = totalRevenue - totalCost;

        // 显示结果
        document.getElementById("resultSection").classList.remove("hidden");

        document.getElementById("unitCost").textContent = formatMoney(unitCost);
        document.getElementById("materialCost").textContent = formatMoney(materialCost);
        document.getElementById("laborCost").textContent = formatMoney(laborCost);
        document.getElementById("overheadCost").textContent = formatMoney(overheadCost);
        document.getElementById("adminCost").textContent = formatMoney(adminCost);
        document.getElementById("salesCost").textContent = formatMoney(salesCost);
        document.getElementById("suggestedPrice").textContent = formatMoney(suggestedPrice);
        document.getElementById("totalCost").textContent = formatMoney(totalCost);
        document.getElementById("totalRevenue").textContent = formatMoney(totalRevenue);
        document.getElementById("totalProfit").textContent = formatMoney(totalProfit);

        // 成本结构图
        var costs = [
          { name: "材料成本", value: materialCost, color: "#6366f1" },
          { name: "人工成本", value: laborCost, color: "#8b5cf6" },
          { name: "制造费用", value: overheadCost, color: "#10b981" },
          { name: "管理费用", value: adminCost, color: "#f59e0b" },
          { name: "销售费用", value: salesCost, color: "#ef4444" }
        ];

        var breakdown = document.getElementById("costBreakdown");
        while (breakdown.firstChild) {
          breakdown.removeChild(breakdown.firstChild);
        }

        costs.forEach(function (cost) {
          var percentage = unitCost > 0 ? (cost.value / unitCost) * 100 : 0;

          var row = document.createElement("div");
          row.className = "cost-row";

          var nameSpan = document.createElement("span");
          nameSpan.textContent = cost.name;

          var valueSpan = document.createElement("span");
          valueSpan.textContent = formatMoney(cost.value) + " (" + percentage.toFixed(1) + "%)";

          row.appendChild(nameSpan);
          row.appendChild(valueSpan);

          var bar = document.createElement("div");
          bar.className = "cost-bar";
          var fill = document.createElement("div");
          fill.className = "cost-bar-fill";
          fill.style.width = percentage + "%";
          fill.style.background = cost.color;
          bar.appendChild(fill);

          var container = document.createElement("div");
          container.appendChild(row);
          container.appendChild(bar);
          breakdown.appendChild(container);
        });
      }

      calculate();
    
