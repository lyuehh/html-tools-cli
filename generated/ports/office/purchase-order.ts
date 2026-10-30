// @ts-nocheck
// Generated from tools/office/purchase-order.html
// Source SHA-256: fdd041e32200d2b3455a4359932b32bb079d3cccfa5c378bfdd3f91138838522
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "purchase_order_data_v1";
      var lineItems = [];
      var itemIdCounter = 0;

      // Initialize
      function init() {
        loadTheme();
        loadFromStorage();

        // Generate PO number if empty
        var poNoEl = document.getElementById("poNumber");
        if (!poNoEl.value) {
          poNoEl.value = generatePONumber();
        }

        // Set default dates if empty
        var today = new Date().toISOString().split("T")[0];
        var poDateEl = document.getElementById("poDate");
        if (!poDateEl.value) {
          poDateEl.value = today;
        }

        var deliveryDateEl = document.getElementById("deliveryDate");
        if (!deliveryDateEl.value) {
          var deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + 14);
          deliveryDateEl.value = deliveryDate.toISOString().split("T")[0];
        }

        // Add initial line item if none exist
        if (lineItems.length === 0) {
          addLineItem();
        } else {
          renderLineItems();
        }

        // Add input listeners for auto-save
        var inputs = document.querySelectorAll("input, textarea, select");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", debounce(saveToStorage, 500));
          inputs[i].addEventListener("change", debounce(saveToStorage, 500));
        }
      }

      // Generate unique PO number
      function generatePONumber() {
        var date = new Date();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var random = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return "PO-" + year + month + day + "-" + random;
      }

      // Add new line item
      function addLineItem() {
        var item = {
          id: ++itemIdCounter,
          description: "",
          quantity: 1,
          unit: "个",
          unitPrice: 0
        };
        lineItems.push(item);
        renderLineItems();
        saveToStorage();
      }

      // Remove line item
      function removeLineItem(id) {
        lineItems = lineItems.filter(function (item) {
          return item.id !== id;
        });
        if (lineItems.length === 0) {
          addLineItem();
        } else {
          renderLineItems();
          calculateTotals();
          saveToStorage();
        }
      }

      // Create line item row
      function createLineItemRow(item) {
        var row = document.createElement("tr");
        var amount = item.quantity * item.unitPrice;

        // Description cell
        var descCell = document.createElement("td");
        descCell.className = "desc-col";
        var descInput = document.createElement("input");
        descInput.type = "text";
        descInput.value = item.description;
        descInput.placeholder = "物品名称/规格";
        descInput.addEventListener("change", function () {
          updateLineItem(item.id, "description", this.value);
        });
        descCell.appendChild(descInput);
        row.appendChild(descCell);

        // Quantity cell
        var qtyCell = document.createElement("td");
        qtyCell.className = "num-col";
        var qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.value = item.quantity;
        qtyInput.min = "0";
        qtyInput.step = "1";
        qtyInput.addEventListener("change", function () {
          updateLineItem(item.id, "quantity", parseFloat(this.value) || 0);
        });
        qtyCell.appendChild(qtyInput);
        row.appendChild(qtyCell);

        // Unit cell
        var unitCell = document.createElement("td");
        var unitSelect = document.createElement("select");
        var units = ["个", "件", "套", "台", "箱", "包", "千克", "米", "平方米"];
        for (var i = 0; i < units.length; i++) {
          var opt = document.createElement("option");
          opt.value = units[i];
          opt.textContent = units[i];
          if (units[i] === item.unit) opt.selected = true;
          unitSelect.appendChild(opt);
        }
        unitSelect.addEventListener("change", function () {
          updateLineItem(item.id, "unit", this.value);
        });
        unitCell.appendChild(unitSelect);
        row.appendChild(unitCell);

        // Unit price cell
        var priceCell = document.createElement("td");
        priceCell.className = "num-col";
        var priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.value = item.unitPrice;
        priceInput.min = "0";
        priceInput.step = "0.01";
        priceInput.addEventListener("change", function () {
          updateLineItem(item.id, "unitPrice", parseFloat(this.value) || 0);
        });
        priceCell.appendChild(priceInput);
        row.appendChild(priceCell);

        // Amount cell
        var amountCell = document.createElement("td");
        amountCell.className = "amount-col";
        amountCell.textContent = "¥" + formatNumber(amount);
        row.appendChild(amountCell);

        // Action cell
        var actionCell = document.createElement("td");
        actionCell.className = "action-col no-print";
        var removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove";
        removeBtn.title = "删除";
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", function () {
          removeLineItem(item.id);
        });
        actionCell.appendChild(removeBtn);
        row.appendChild(actionCell);

        return row;
      }

      // Render line items
      function renderLineItems() {
        var tbody = document.getElementById("lineItemsBody");
        tbody.textContent = "";

        for (var i = 0; i < lineItems.length; i++) {
          var row = createLineItemRow(lineItems[i]);
          tbody.appendChild(row);
        }

        calculateTotals();
      }

      // Update line item
      function updateLineItem(id, field, value) {
        for (var i = 0; i < lineItems.length; i++) {
          if (lineItems[i].id === id) {
            lineItems[i][field] = value;
            break;
          }
        }
        renderLineItems();
        saveToStorage();
      }

      // Calculate totals
      function calculateTotals() {
        var subtotal = 0;
        for (var i = 0; i < lineItems.length; i++) {
          subtotal += lineItems[i].quantity * lineItems[i].unitPrice;
        }

        document.getElementById("subtotal").textContent = "¥" + formatNumber(subtotal);
        document.getElementById("total").textContent = "¥" + formatNumber(subtotal);

        saveToStorage();
      }

      // Format number
      function formatNumber(num) {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      // Debounce function
      function debounce(func, wait) {
        var timeout;
        return function () {
          var context = this;
          var args = arguments;
          var later = function () {
            clearTimeout(timeout);
            func.apply(context, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      // Print PO
      function printPO() {
        document.getElementById("printPoNo").textContent =
          "订单编号: " + document.getElementById("poNumber").value;
        document.getElementById("printPoDate").textContent =
          "日期: " + document.getElementById("poDate").value;

        window.print();
      }

      // Clear all
      function clearAll() {
        if (!confirm("确定要清空所有内容吗？")) return;

        document.getElementById("buyerName").value = "";
        document.getElementById("buyerAddress").value = "";
        document.getElementById("buyerContact").value = "";
        document.getElementById("buyerPhone").value = "";
        document.getElementById("vendorName").value = "";
        document.getElementById("vendorAddress").value = "";
        document.getElementById("vendorContact").value = "";
        document.getElementById("vendorPhone").value = "";
        document.getElementById("poNumber").value = generatePONumber();
        document.getElementById("poDate").value = new Date().toISOString().split("T")[0];
        var deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 14);
        document.getElementById("deliveryDate").value = deliveryDate.toISOString().split("T")[0];
        document.getElementById("paymentTerms").value = "预付款";
        document.getElementById("shippingAddress").value = "";
        document.getElementById("notes").value = "";

        lineItems = [];
        itemIdCounter = 0;
        addLineItem();

        localStorage.removeItem(LS_KEY);

        showToast("已清空");
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          buyerName: document.getElementById("buyerName").value,
          buyerAddress: document.getElementById("buyerAddress").value,
          buyerContact: document.getElementById("buyerContact").value,
          buyerPhone: document.getElementById("buyerPhone").value,
          vendorName: document.getElementById("vendorName").value,
          vendorAddress: document.getElementById("vendorAddress").value,
          vendorContact: document.getElementById("vendorContact").value,
          vendorPhone: document.getElementById("vendorPhone").value,
          poNumber: document.getElementById("poNumber").value,
          poDate: document.getElementById("poDate").value,
          deliveryDate: document.getElementById("deliveryDate").value,
          paymentTerms: document.getElementById("paymentTerms").value,
          shippingAddress: document.getElementById("shippingAddress").value,
          notes: document.getElementById("notes").value,
          lineItems: lineItems,
          itemIdCounter: itemIdCounter
        };

        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);

          document.getElementById("buyerName").value = data.buyerName || "";
          document.getElementById("buyerAddress").value = data.buyerAddress || "";
          document.getElementById("buyerContact").value = data.buyerContact || "";
          document.getElementById("buyerPhone").value = data.buyerPhone || "";
          document.getElementById("vendorName").value = data.vendorName || "";
          document.getElementById("vendorAddress").value = data.vendorAddress || "";
          document.getElementById("vendorContact").value = data.vendorContact || "";
          document.getElementById("vendorPhone").value = data.vendorPhone || "";
          document.getElementById("poNumber").value = data.poNumber || "";
          document.getElementById("poDate").value = data.poDate || "";
          document.getElementById("deliveryDate").value = data.deliveryDate || "";
          document.getElementById("paymentTerms").value = data.paymentTerms || "预付款";
          document.getElementById("shippingAddress").value = data.shippingAddress || "";
          document.getElementById("notes").value = data.notes || "";

          if (data.lineItems && data.lineItems.length > 0) {
            lineItems = data.lineItems;
            itemIdCounter = data.itemIdCounter || lineItems.length;
          }
        } catch (e) {
          console.error("Failed to load saved data:", e);
        }
      }

      // Theme toggle
      function toggleTheme() {
        var body = document.body;
        var isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      // Load theme
      function loadTheme() {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      }

      // Show toast
      function showToast(msg) {
        var toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Initialize on load
      init();
    
