// @ts-nocheck
// Generated from tools/office/receipt-maker.html
// Source SHA-256: 9e33cb8d94925693582563876ce144755047a99a3b772cdf2c74962953993869
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "receipt_maker_data_v1";
      let items = [];

      // DOM elements
      const storeNameEl = document.getElementById("storeName");
      const storeAddressEl = document.getElementById("storeAddress");
      const receiptNoEl = document.getElementById("receiptNo");
      const receiptDateEl = document.getElementById("receiptDate");
      const receiptTimeEl = document.getElementById("receiptTime");
      const cashierEl = document.getElementById("cashier");
      const enableTaxEl = document.getElementById("enableTax");
      const taxRateEl = document.getElementById("taxRate");
      const paymentMethodEl = document.getElementById("paymentMethod");
      const amountPaidEl = document.getElementById("amountPaid");
      const itemsListEl = document.getElementById("itemsList");
      const statusEl = document.getElementById("status");

      // Generate receipt number
      function generateReceiptNo() {
        const now = new Date();
        const dateStr =
          now.getFullYear().toString().slice(-2) +
          String(now.getMonth() + 1).padStart(2, "0") +
          String(now.getDate()).padStart(2, "0");
        const rand = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
        return "RCP" + dateStr + rand;
      }

      // Initialize date and time
      function initDateTime() {
        const now = new Date();
        receiptDateEl.value = now.toISOString().split("T")[0];
        receiptTimeEl.value = now.toTimeString().slice(0, 5);
      }

      // Add item
      function addItem(name, qty, price) {
        name = name || "";
        qty = qty || 1;
        price = price || 0;
        const id = Date.now() + Math.random();
        items.push({ id: id, name: name, qty: qty, price: price });
        renderItems();
        saveToStorage();
      }

      // Remove item
      function removeItem(id) {
        items = items.filter(function (item) {
          return item.id !== id;
        });
        renderItems();
        updatePreview();
        saveToStorage();
      }

      // Update item
      function updateItem(id, field, value) {
        var item = items.find(function (i) {
          return i.id === id;
        });
        if (item) {
          if (field === "qty" || field === "price") {
            item[field] = parseFloat(value) || 0;
          } else {
            item[field] = value;
          }
          renderItems();
          updatePreview();
          saveToStorage();
        }
      }

      // Create item row element
      function createItemRow(item) {
        var total = (item.qty * item.price).toFixed(2);
        var row = document.createElement("div");
        row.className = "item-row";

        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = item.name;
        nameInput.placeholder = "商品名称";
        nameInput.addEventListener("input", function () {
          updateItem(item.id, "name", this.value);
        });

        var qtyInput = document.createElement("input");
        qtyInput.type = "number";
        qtyInput.value = item.qty;
        qtyInput.min = "1";
        qtyInput.step = "1";
        qtyInput.addEventListener("input", function () {
          updateItem(item.id, "qty", this.value);
        });

        var priceInput = document.createElement("input");
        priceInput.type = "number";
        priceInput.value = item.price;
        priceInput.min = "0";
        priceInput.step = "0.01";
        priceInput.addEventListener("input", function () {
          updateItem(item.id, "price", this.value);
        });

        var totalSpan = document.createElement("span");
        totalSpan.className = "item-total";
        totalSpan.textContent = "¥" + total;

        var removeBtn = document.createElement("button");
        removeBtn.className = "btn btn-remove";
        removeBtn.textContent = "×";
        removeBtn.title = "删除";
        removeBtn.addEventListener("click", function () {
          removeItem(item.id);
        });

        row.appendChild(nameInput);
        row.appendChild(qtyInput);
        row.appendChild(priceInput);
        row.appendChild(totalSpan);
        row.appendChild(removeBtn);

        return row;
      }

      // Render items list
      function renderItems() {
        itemsListEl.textContent = "";
        items.forEach(function (item) {
          itemsListEl.appendChild(createItemRow(item));
        });
      }

      // Calculate totals
      function calculateTotals() {
        var subtotal = items.reduce(function (sum, item) {
          return sum + item.qty * item.price;
        }, 0);
        var taxEnabled = enableTaxEl.checked;
        var taxRate = parseFloat(taxRateEl.value) || 0;
        var tax = taxEnabled ? subtotal * (taxRate / 100) : 0;
        var total = subtotal + tax;
        return {
          subtotal: subtotal,
          tax: tax,
          total: total,
          taxRate: taxRate,
          taxEnabled: taxEnabled
        };
      }

      // Create preview item line
      function createPreviewItemLine(item) {
        var total = (item.qty * item.price).toFixed(2);
        var line = document.createElement("div");
        line.className = "item-line";

        var nameSpan = document.createElement("span");
        nameSpan.className = "item-name";
        nameSpan.textContent = item.name || "-";

        var qtySpan = document.createElement("span");
        qtySpan.className = "item-qty";
        qtySpan.textContent = "x" + item.qty;

        var priceSpan = document.createElement("span");
        priceSpan.className = "item-price";
        priceSpan.textContent = "¥" + total;

        line.appendChild(nameSpan);
        line.appendChild(qtySpan);
        line.appendChild(priceSpan);

        return line;
      }

      // Update preview
      function updatePreview() {
        // Store info
        document.getElementById("previewStoreName").textContent = storeNameEl.value || "商家名称";
        document.getElementById("previewStoreAddress").textContent =
          storeAddressEl.value || "商家地址";

        // Receipt info
        document.getElementById("previewReceiptNo").textContent = receiptNoEl.value || "-";
        document.getElementById("previewDate").textContent = receiptDateEl.value || "-";
        document.getElementById("previewTime").textContent = receiptTimeEl.value || "-";

        var cashierRow = document.getElementById("previewCashierRow");
        if (cashierEl.value) {
          cashierRow.style.display = "flex";
          document.getElementById("previewCashier").textContent = cashierEl.value;
        } else {
          cashierRow.style.display = "none";
        }

        // Items
        var previewItems = document.getElementById("previewItems");
        previewItems.textContent = "";
        items.forEach(function (item) {
          if (item.name || item.price > 0) {
            previewItems.appendChild(createPreviewItemLine(item));
          }
        });

        // Totals
        var totals = calculateTotals();
        document.getElementById("previewSubtotal").textContent = "¥" + totals.subtotal.toFixed(2);

        var taxRow = document.getElementById("previewTaxRow");
        if (totals.taxEnabled) {
          taxRow.style.display = "flex";
          document.getElementById("previewTaxRate").textContent = totals.taxRate;
          document.getElementById("previewTax").textContent = "¥" + totals.tax.toFixed(2);
        } else {
          taxRow.style.display = "none";
        }

        document.getElementById("previewTotal").textContent = "¥" + totals.total.toFixed(2);

        // Payment
        var paymentLabels = {
          cash: "现金",
          card: "银行卡",
          wechat: "微信支付",
          alipay: "支付宝",
          other: "其他"
        };
        document.getElementById("previewPayment").textContent =
          paymentLabels[paymentMethodEl.value] || "现金";

        // Amount paid and change
        var paidRow = document.getElementById("previewPaidRow");
        var changeRow = document.getElementById("previewChangeRow");
        var amountPaid = parseFloat(amountPaidEl.value) || 0;

        if (amountPaid > 0) {
          paidRow.style.display = "flex";
          document.getElementById("previewPaid").textContent = "¥" + amountPaid.toFixed(2);

          if (amountPaid >= totals.total) {
            changeRow.style.display = "flex";
            document.getElementById("previewChange").textContent =
              "¥" + (amountPaid - totals.total).toFixed(2);
          } else {
            changeRow.style.display = "none";
          }
        } else {
          paidRow.style.display = "none";
          changeRow.style.display = "none";
        }
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          storeName: storeNameEl.value,
          storeAddress: storeAddressEl.value,
          receiptNo: receiptNoEl.value,
          receiptDate: receiptDateEl.value,
          receiptTime: receiptTimeEl.value,
          cashier: cashierEl.value,
          enableTax: enableTaxEl.checked,
          taxRate: taxRateEl.value,
          paymentMethod: paymentMethodEl.value,
          amountPaid: amountPaidEl.value,
          items: items
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            storeNameEl.value = data.storeName || "";
            storeAddressEl.value = data.storeAddress || "";
            receiptNoEl.value = data.receiptNo || generateReceiptNo();
            receiptDateEl.value = data.receiptDate || "";
            receiptTimeEl.value = data.receiptTime || "";
            cashierEl.value = data.cashier || "";
            enableTaxEl.checked = data.enableTax || false;
            taxRateEl.value = data.taxRate || "6";
            taxRateEl.disabled = !enableTaxEl.checked;
            paymentMethodEl.value = data.paymentMethod || "cash";
            amountPaidEl.value = data.amountPaid || "";
            items = data.items || [];
            renderItems();
            updatePreview();
            return true;
          } catch (e) {
            return false;
          }
        }
        return false;
      }

      // Clear all
      function clearAll() {
        storeNameEl.value = "";
        storeAddressEl.value = "";
        receiptNoEl.value = generateReceiptNo();
        initDateTime();
        cashierEl.value = "";
        enableTaxEl.checked = false;
        taxRateEl.value = "6";
        taxRateEl.disabled = true;
        paymentMethodEl.value = "cash";
        amountPaidEl.value = "";
        items = [];
        renderItems();
        updatePreview();
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      // Print
      function printReceipt() {
        window.print();
      }

      // Show status
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        setTimeout(function () {
          statusEl.textContent = "";
          statusEl.className = "status";
        }, 2000);
      }

      // Theme toggle
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

      // Event listeners
      document.getElementById("btnPrint").addEventListener("click", printReceipt);
      document.getElementById("btnClear").addEventListener("click", clearAll);
      document.getElementById("btnAddItem").addEventListener("click", function () {
        addItem();
      });

      enableTaxEl.addEventListener("change", function () {
        taxRateEl.disabled = !this.checked;
        updatePreview();
        saveToStorage();
      });

      // Input listeners for auto-update
      [
        storeNameEl,
        storeAddressEl,
        receiptDateEl,
        receiptTimeEl,
        cashierEl,
        taxRateEl,
        paymentMethodEl,
        amountPaidEl
      ].forEach(function (el) {
        el.addEventListener("input", function () {
          updatePreview();
          saveToStorage();
        });
      });

      // Initialize
      initTheme();
      if (!loadFromStorage()) {
        receiptNoEl.value = generateReceiptNo();
        initDateTime();
        addItem();
      }
      updatePreview();
    
