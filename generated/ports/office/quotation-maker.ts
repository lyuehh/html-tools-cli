// @ts-nocheck
// Generated from tools/office/quotation-maker.html
// Source SHA-256: bd236ac08f206fe9cec2f70716d8aa892351876b8049217590ff9798ebabac5c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "quotation_maker_data_v1";
      var lineItems = [];
      var itemIdCounter = 0;

      // Initialize
      function init() {
        loadTheme();
        loadFromStorage();

        // Generate quote number if empty
        var quoteNoEl = document.getElementById("quoteNumber");
        if (!quoteNoEl.value) {
          quoteNoEl.value = generateQuoteNumber();
        }

        // Set default dates if empty
        var today = new Date().toISOString().split("T")[0];
        var quoteDateEl = document.getElementById("quoteDate");
        if (!quoteDateEl.value) {
          quoteDateEl.value = today;
        }

        var validUntilEl = document.getElementById("validUntil");
        if (!validUntilEl.value) {
          var validDate = new Date();
          validDate.setDate(validDate.getDate() + 30);
          validUntilEl.value = validDate.toISOString().split("T")[0];
        }

        // Add initial line item if none exist
        if (lineItems.length === 0) {
          addLineItem();
        } else {
          renderLineItems();
        }

        updateValidityNotice();

        // Add input listeners for auto-save
        var inputs = document.querySelectorAll("input, textarea, select");
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("input", debounce(saveToStorage, 500));
          inputs[i].addEventListener("change", function () {
            debounce(saveToStorage, 500)();
            updateValidityNotice();
          });
        }
      }

      // Generate unique quote number
      function generateQuoteNumber() {
        var date = new Date();
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, "0");
        var day = String(date.getDate()).padStart(2, "0");
        var random = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        return "QT-" + year + month + day + "-" + random;
      }

      // Update validity notice
      function updateValidityNotice() {
        var quoteDate = document.getElementById("quoteDate").value;
        var validUntil = document.getElementById("validUntil").value;
        var notice = document.getElementById("validityNotice");

        if (quoteDate && validUntil) {
          var start = new Date(quoteDate);
          var end = new Date(validUntil);
          var days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
          notice.textContent =
            "报价有效期: " + quoteDate + " 至 " + validUntil + " (" + days + "天)";
        } else {
          notice.textContent = "报价有效期: 请设置有效期";
        }
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

      // Create line item row
      function createLineItemRow(item) {
        var row = document.createElement("tr");
        var amount = item.quantity * item.unitPrice;

        // Description cell
        var descCell = document.createElement("td");
        descCell.className = "desc-col";
        var descTextarea = document.createElement("textarea");
        descTextarea.value = item.description;
        descTextarea.placeholder = "项目描述/规格说明";
        descTextarea.rows = 2;
        descTextarea.addEventListener("change", function () {
          updateLineItem(item.id, "description", this.value);
        });
        descCell.appendChild(descTextarea);
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

      // Print quote
      function printQuote() {
        document.getElementById("printQuoteNo").textContent =
          "报价单编号: " + document.getElementById("quoteNumber").value;
        document.getElementById("printQuoteDate").textContent =
          "日期: " + document.getElementById("quoteDate").value;

        var taxRateDisplay = document.getElementById("taxRateDisplay");
        taxRateDisplay.textContent = document.getElementById("taxRate").value + "%";
        taxRateDisplay.style.display = "inline";

        window.print();

        setTimeout(function () {
          taxRateDisplay.style.display = "none";
        }, 100);
      }

      // Clear all
      function clearAll() {
        if (!confirm("确定要清空所有内容吗？")) return;

        document.getElementById("companyName").value = "";
        document.getElementById("companyAddress").value = "";
        document.getElementById("companyPhone").value = "";
        document.getElementById("companyEmail").value = "";
        document.getElementById("clientName").value = "";
        document.getElementById("clientContact").value = "";
        document.getElementById("clientPhone").value = "";
        document.getElementById("clientEmail").value = "";
        document.getElementById("quoteNumber").value = generateQuoteNumber();
        document.getElementById("quoteDate").value = new Date().toISOString().split("T")[0];
        var validDate = new Date();
        validDate.setDate(validDate.getDate() + 30);
        document.getElementById("validUntil").value = validDate.toISOString().split("T")[0];
        document.getElementById("projectName").value = "";
        document.getElementById("taxRate").value = "0";
        document.getElementById("terms").value =
          "1. 付款方式：预付款50%，交货后付清余款\n2. 交货周期：收到订单后7-14个工作日\n3. 报价有效期：自报价日起30天内有效\n4. 以上报价不含运费，运费按实际发生计算\n5. 如有任何疑问，请随时联系我们";
        document.getElementById("notes").value = "";

        lineItems = [];
        itemIdCounter = 0;
        addLineItem();
        updateValidityNotice();

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
          clientContact: document.getElementById("clientContact").value,
          clientPhone: document.getElementById("clientPhone").value,
          clientEmail: document.getElementById("clientEmail").value,
          quoteNumber: document.getElementById("quoteNumber").value,
          quoteDate: document.getElementById("quoteDate").value,
          validUntil: document.getElementById("validUntil").value,
          projectName: document.getElementById("projectName").value,
          taxRate: document.getElementById("taxRate").value,
          terms: document.getElementById("terms").value,
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
          document.getElementById("clientContact").value = data.clientContact || "";
          document.getElementById("clientPhone").value = data.clientPhone || "";
          document.getElementById("clientEmail").value = data.clientEmail || "";
          document.getElementById("quoteNumber").value = data.quoteNumber || "";
          document.getElementById("quoteDate").value = data.quoteDate || "";
          document.getElementById("validUntil").value = data.validUntil || "";
          document.getElementById("projectName").value = data.projectName || "";
          document.getElementById("taxRate").value = data.taxRate || "0";
          document.getElementById("terms").value = data.terms || "";
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
    
