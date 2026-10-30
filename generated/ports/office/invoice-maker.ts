// @ts-nocheck
// Generated from tools/office/invoice-maker.html
// Source SHA-256: 0652cdf8fa466780ffcb7abbb7c9b3879f8603707e1b2481f36a49069e47cc24
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "invoice_maker_data_v1";
      var lineItems = [];
      var itemIdCounter = 0;

      // Initialize
      function init() {
        loadTheme();
        loadFromStorage();

        // Generate invoice number if empty
        var invoiceNoEl = document.getElementById("invoiceNo");
        if (!invoiceNoEl.value) {
          invoiceNoEl.value = generateInvoiceNumber();
        }

        // Set default dates if empty
        var today = new Date().toISOString().split("T")[0];
        var invoiceDateEl = document.getElementById("invoiceDate");
        if (!invoiceDateEl.value) {
          invoiceDateEl.value = today;
        }

        var dueDateEl = document.getElementById("dueDate");
        if (!dueDateEl.value) {
          var dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          dueDateEl.value = dueDate.toISOString().split("T")[0];
        }

        // Add initial line item if none exist
        if (lineItems.length === 0) {
          addLineItem();
        } else {
          renderLineItems();
        }

        // Add input listeners for auto-save
        var inputs = document.querySelectorAll("input, textarea");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", debounce(saveToStorage, 500));
        }
      }

      // Generate unique invoice number
      function generateInvoiceNumber() {
        var date = new Date();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var random = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return "INV-" + year + month + day + "-" + random;
      }

      // Add new line item
      function addLineItem() {
        var item = {
          id: ++itemIdCounter,
          description: "",
          quantity: 1,
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

      // Create line item row using DOM methods
      function createLineItemRow(item) {
        var row = document.createElement("tr");
        var amount = item.quantity * item.unitPrice;

        // Description cell
        var descCell = document.createElement("td");
        descCell.className = "desc-col";
        var descInput = document.createElement("input");
        descInput.type = "text";
        descInput.value = item.description;
        descInput.placeholder = "项目描述";
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

        var taxRate = parseFloat(document.getElementById("taxRate").value) || 0;
        var taxAmount = subtotal * (taxRate / 100);
        var total = subtotal + taxAmount;

        document.getElementById("subtotal").textContent = "¥" + formatNumber(subtotal);
        document.getElementById("taxAmount").textContent = "¥" + formatNumber(taxAmount);
        document.getElementById("total").textContent = "¥" + formatNumber(total);

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

      // Print invoice
      function printInvoice() {
        // Update print header info
        document.getElementById("printInvoiceNo").textContent =
          "发票编号: " + document.getElementById("invoiceNo").value;
        document.getElementById("printInvoiceDate").textContent =
          "日期: " + document.getElementById("invoiceDate").value;

        // Show tax rate as text for print
        var taxRateDisplay = document.getElementById("taxRateDisplay");
        taxRateDisplay.textContent = document.getElementById("taxRate").value + "%";
        taxRateDisplay.style.display = "inline";

        window.print();

        // Hide after print
        setTimeout(function () {
          taxRateDisplay.style.display = "none";
        }, 100);
      }

      // Clear all
      function clearAll() {
        if (!confirm("确定要清空所有内容吗？")) return;

        // Clear inputs
        document.getElementById("companyName").value = "";
        document.getElementById("companyAddress").value = "";
        document.getElementById("companyPhone").value = "";
        document.getElementById("companyEmail").value = "";
        document.getElementById("clientName").value = "";
        document.getElementById("clientAddress").value = "";
        document.getElementById("invoiceNo").value = generateInvoiceNumber();
        document.getElementById("invoiceDate").value = new Date().toISOString().split("T")[0];
        var dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        document.getElementById("dueDate").value = dueDate.toISOString().split("T")[0];
        document.getElementById("taxRate").value = "0";
        document.getElementById("notes").value = "";

        // Reset line items
        lineItems = [];
        itemIdCounter = 0;
        addLineItem();

        // Clear storage
        localStorage.removeItem(LS_KEY);

        showToast("已清空");
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          companyName: document.getElementById("companyName").value,
          companyAddress: document.getElementById("companyAddress").value,
          companyPhone: document.getElementById("companyPhone").value,
          companyEmail: document.getElementById("companyEmail").value,
          clientName: document.getElementById("clientName").value,
          clientAddress: document.getElementById("clientAddress").value,
          invoiceNo: document.getElementById("invoiceNo").value,
          invoiceDate: document.getElementById("invoiceDate").value,
          dueDate: document.getElementById("dueDate").value,
          taxRate: document.getElementById("taxRate").value,
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

          document.getElementById("companyName").value = data.companyName || "";
          document.getElementById("companyAddress").value = data.companyAddress || "";
          document.getElementById("companyPhone").value = data.companyPhone || "";
          document.getElementById("companyEmail").value = data.companyEmail || "";
          document.getElementById("clientName").value = data.clientName || "";
          document.getElementById("clientAddress").value = data.clientAddress || "";
          document.getElementById("invoiceNo").value = data.invoiceNo || "";
          document.getElementById("invoiceDate").value = data.invoiceDate || "";
          document.getElementById("dueDate").value = data.dueDate || "";
          document.getElementById("taxRate").value = data.taxRate || "0";
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
    
