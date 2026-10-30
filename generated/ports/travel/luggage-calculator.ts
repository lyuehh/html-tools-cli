// @ts-nocheck
// Generated from tools/travel/luggage-calculator.html
// Source SHA-256: 997165d9a764752a7a5e35dd27a7ab71c5614b13c4c0ab86b900f02114eb18aa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "luggage_calculator_v1";

      // State
      var items = [];
      var limit = 23;

      // DOM Elements
      var airlineSelect = document.getElementById("airlineSelect");
      var customLimitGroup = document.getElementById("customLimitGroup");
      var customLimitInput = document.getElementById("customLimit");
      var limitBadge = document.getElementById("limitBadge");
      var itemNameInput = document.getElementById("itemName");
      var itemWeightInput = document.getElementById("itemWeight");
      var itemsList = document.getElementById("itemsList");
      var itemCount = document.getElementById("itemCount");
      var warningBanner = document.getElementById("warningBanner");
      var overweightAmount = document.getElementById("overweightAmount");
      var progressFill = document.getElementById("progressFill");
      var progressLimit = document.getElementById("progressLimit");
      var summaryLimit = document.getElementById("summaryLimit");
      var summaryUsed = document.getElementById("summaryUsed");
      var summaryRemaining = document.getElementById("summaryRemaining");
      var summaryTotal = document.getElementById("summaryTotal");

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Update airline limit
      function updateAirlineLimit() {
        var value = airlineSelect.value;

        if (value === "custom") {
          customLimitGroup.style.display = "block";
          limit = parseFloat(customLimitInput.value) || 23;
        } else {
          customLimitGroup.style.display = "none";
          limit = parseInt(value, 10);
        }

        limitBadge.textContent = limit + " kg";
        saveToStorage();
        updateSummary();
      }

      // Handle enter key
      function handleEnter(event) {
        if (event.key === "Enter") {
          addItem();
        }
      }

      // Add item
      function addItem() {
        var name = itemNameInput.value.trim();
        var weight = parseFloat(itemWeightInput.value);

        if (!name) {
          showToast("请输入物品名称", "error");
          itemNameInput.focus();
          return;
        }

        if (!weight || weight <= 0) {
          showToast("请输入有效的重量", "error");
          itemWeightInput.focus();
          return;
        }

        items.push({
          id: Date.now(),
          name: name,
          weight: weight
        });

        itemNameInput.value = "";
        itemWeightInput.value = "";
        itemNameInput.focus();

        saveToStorage();
        renderItems();
        updateSummary();
        showToast("已添加: " + name);
      }

      // Delete item
      function deleteItem(id) {
        var item = items.find(function (i) {
          return i.id === id;
        });
        items = items.filter(function (i) {
          return i.id !== id;
        });
        saveToStorage();
        renderItems();
        updateSummary();
        if (item) {
          showToast("已删除: " + item.name);
        }
      }

      // Clear all items
      function clearAll() {
        if (items.length === 0) {
          showToast("清单已经是空的", "error");
          return;
        }

        if (confirm("确定要清空所有物品吗？")) {
          items = [];
          saveToStorage();
          renderItems();
          updateSummary();
          showToast("已清空所有物品");
        }
      }

      // Create item row element
      function createItemRow(item) {
        var row = document.createElement("div");
        row.className = "item-row";

        var nameSpan = document.createElement("span");
        nameSpan.className = "item-name";
        nameSpan.textContent = item.name;

        var weightSpan = document.createElement("span");
        weightSpan.className = "item-weight";
        weightSpan.textContent = item.weight.toFixed(1) + " kg";

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-icon";
        deleteBtn.textContent = "×";
        deleteBtn.title = "删除";
        deleteBtn.onclick = function () {
          deleteItem(item.id);
        };

        row.appendChild(nameSpan);
        row.appendChild(weightSpan);
        row.appendChild(deleteBtn);

        return row;
      }

      // Render items list
      function renderItems() {
        // Clear the list
        while (itemsList.firstChild) {
          itemsList.removeChild(itemsList.firstChild);
        }

        if (items.length === 0) {
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.id = "emptyState";
          emptyDiv.textContent = "还没有添加物品，开始添加你的行李吧";
          itemsList.appendChild(emptyDiv);
          itemCount.textContent = "0";
          return;
        }

        itemCount.textContent = items.length;

        items.forEach(function (item) {
          itemsList.appendChild(createItemRow(item));
        });
      }

      // Update summary
      function updateSummary() {
        var totalWeight = items.reduce(function (sum, item) {
          return sum + item.weight;
        }, 0);
        var remaining = limit - totalWeight;
        var percentage = (totalWeight / limit) * 100;

        // Update progress bar
        progressFill.style.width = Math.min(percentage, 100) + "%";
        progressFill.classList.remove("warning", "over");
        if (percentage > 100) {
          progressFill.classList.add("over");
        } else if (percentage > 80) {
          progressFill.classList.add("warning");
        }

        progressLimit.textContent = limit + " kg";

        // Update summary card
        summaryLimit.textContent = limit + " kg";
        summaryUsed.textContent = totalWeight.toFixed(1) + " kg";
        summaryTotal.textContent = totalWeight.toFixed(1) + " kg";

        // Update remaining with color
        summaryRemaining.textContent = remaining.toFixed(1) + " kg";
        summaryRemaining.classList.remove("remaining-ok", "remaining-warning", "remaining-over");

        if (remaining < 0) {
          summaryRemaining.classList.add("remaining-over");
          summaryRemaining.textContent = remaining.toFixed(1) + " kg (超重!)";
        } else if (remaining < limit * 0.2) {
          summaryRemaining.classList.add("remaining-warning");
        } else {
          summaryRemaining.classList.add("remaining-ok");
        }

        // Show/hide warning banner
        if (remaining < 0) {
          warningBanner.classList.add("show");
          overweightAmount.textContent = Math.abs(remaining).toFixed(1);
        } else {
          warningBanner.classList.remove("show");
        }
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          items: items,
          limit: limit,
          airlineValue: airlineSelect.value,
          customLimit: customLimitInput.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            items = data.items || [];
            limit = data.limit || 23;

            if (data.airlineValue) {
              airlineSelect.value = data.airlineValue;
              if (data.airlineValue === "custom") {
                customLimitGroup.style.display = "block";
                customLimitInput.value = data.customLimit || 23;
              }
            }

            limitBadge.textContent = limit + " kg";
            renderItems();
            updateSummary();
          }
        } catch (e) {
          console.error("Failed to load from storage:", e);
        }
      }

      // Show toast
      function showToast(msg, type) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.remove("error");
        if (type === "error") {
          toast.classList.add("error");
        }
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize
      loadFromStorage();
    
