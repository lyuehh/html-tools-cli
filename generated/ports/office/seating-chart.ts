// @ts-nocheck
// Generated from tools/office/seating-chart.html
// Source SHA-256: 2d04ac9ed045d78a7312aa6ae348c41a0cd778d7f3b373c843278efd7d3d6184
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "seating_chart_data_v1";
      var tables = [];
      var tableIdCounter = 0;
      var currentSeat = null;

      // Initialize
      function init() {
        loadTheme();
        loadFromStorage();
        renderTables();
        updateStats();

        // Add input listeners for auto-save
        document
          .getElementById("eventName")
          .addEventListener("input", debounce(saveToStorage, 500));
      }

      // Add table
      function addTable() {
        var name = document.getElementById("tableName").value.trim();
        var type = document.getElementById("tableType").value;
        var seatCount = parseInt(document.getElementById("seatCount").value) || 8;

        if (!name) {
          name = "桌 " + (tables.length + 1);
        }

        if (seatCount < 2) seatCount = 2;
        if (seatCount > 20) seatCount = 20;

        var seats = [];
        for (var i = 0; i < seatCount; i++) {
          seats.push({
            number: i + 1,
            name: ""
          });
        }

        tables.push({
          id: ++tableIdCounter,
          name: name,
          type: type,
          seats: seats
        });

        // Reset inputs
        document.getElementById("tableName").value = "";
        document.getElementById("seatCount").value = "8";

        renderTables();
        updateStats();
        saveToStorage();
        showToast("已添加 " + name);
      }

      // Remove table
      function removeTable(id) {
        if (!confirm("确定要删除这张桌子吗？")) return;

        tables = tables.filter(function (t) {
          return t.id !== id;
        });
        renderTables();
        updateStats();
        saveToStorage();
        showToast("已删除");
      }

      // Render tables
      function renderTables() {
        var container = document.getElementById("tablesContainer");
        container.textContent = "";

        if (tables.length === 0) {
          var placeholder = document.createElement("div");
          placeholder.style.textAlign = "center";
          placeholder.style.color = "var(--color-text-muted)";
          placeholder.style.padding = "60px 0";
          placeholder.textContent = '点击"添加桌子"开始创建座位图';
          container.appendChild(placeholder);
          return;
        }

        for (var i = 0; i < tables.length; i++) {
          var tableEl = createTableElement(tables[i]);
          container.appendChild(tableEl);
        }
      }

      // Create table element
      function createTableElement(table) {
        var group = document.createElement("div");
        group.className = "table-group";

        var label = document.createElement("div");
        label.className = "table-label";
        label.textContent = table.name;
        group.appendChild(label);

        var shape = document.createElement("div");
        shape.className = "table-shape";

        if (table.type === "round") {
          shape.appendChild(createRoundTable(table));
        } else {
          shape.appendChild(createRectTable(table));
        }

        group.appendChild(shape);

        // Remove button
        var removeBtn = document.createElement("button");
        removeBtn.className = "btn-remove-table no-print";
        removeBtn.textContent = "删除桌子";
        removeBtn.addEventListener("click", function () {
          removeTable(table.id);
        });
        group.appendChild(removeBtn);

        return group;
      }

      // Create round table
      function createRoundTable(table) {
        var tableEl = document.createElement("div");
        tableEl.className = "table-round";

        var seatCount = table.seats.length;
        var radius = 100; // px from center
        var angleStep = (2 * Math.PI) / seatCount;

        for (var i = 0; i < seatCount; i++) {
          var angle = angleStep * i - Math.PI / 2; // Start from top
          var x = 100 + radius * Math.cos(angle);
          var y = 100 + radius * Math.sin(angle);

          var seat = createSeatElement(table, i);
          seat.style.left = x + "px";
          seat.style.top = y + "px";
          tableEl.appendChild(seat);
        }

        return tableEl;
      }

      // Create rectangle table
      function createRectTable(table) {
        var wrapper = document.createElement("div");
        wrapper.className = "table-rect";

        var seatCount = table.seats.length;
        var seatsPerSide = Math.ceil(seatCount / 2);

        // Top row
        var topRow = document.createElement("div");
        topRow.className = "table-seats-row";
        for (var i = 0; i < seatsPerSide && i < seatCount; i++) {
          topRow.appendChild(createSeatElement(table, i));
        }
        wrapper.appendChild(topRow);

        // Table body
        var body = document.createElement("div");
        body.className = "table-rect-body";
        wrapper.appendChild(body);

        // Bottom row
        var bottomRow = document.createElement("div");
        bottomRow.className = "table-seats-row";
        for (var i = seatsPerSide; i < seatCount; i++) {
          bottomRow.appendChild(createSeatElement(table, i));
        }
        wrapper.appendChild(bottomRow);

        return wrapper;
      }

      // Create seat element
      function createSeatElement(table, seatIndex) {
        var seatData = table.seats[seatIndex];
        var seat = document.createElement("div");
        seat.className = "seat" + (seatData.name ? " occupied" : "");

        var number = document.createElement("div");
        number.className = "seat-number";
        number.textContent = seatData.number;
        seat.appendChild(number);

        var name = document.createElement("div");
        name.className = "seat-name";
        name.textContent = seatData.name || "空";
        seat.appendChild(name);

        seat.addEventListener("click", function () {
          openSeatModal(table.id, seatIndex);
        });

        return seat;
      }

      // Open seat modal
      function openSeatModal(tableId, seatIndex) {
        currentSeat = { tableId: tableId, seatIndex: seatIndex };

        // Find current name
        var table = tables.find(function (t) {
          return t.id === tableId;
        });
        var currentName = table.seats[seatIndex].name;

        document.getElementById("seatPersonName").value = currentName;
        document.getElementById("seatModal").classList.add("show");
        document.getElementById("seatPersonName").focus();
      }

      // Close modal
      function closeModal() {
        document.getElementById("seatModal").classList.remove("show");
        currentSeat = null;
      }

      // Assign seat
      function assignSeat() {
        if (!currentSeat) return;

        var name = document.getElementById("seatPersonName").value.trim();
        var table = tables.find(function (t) {
          return t.id === currentSeat.tableId;
        });

        if (table) {
          table.seats[currentSeat.seatIndex].name = name;
          renderTables();
          updateStats();
          saveToStorage();
        }

        closeModal();
      }

      // Clear seat
      function clearSeat() {
        document.getElementById("seatPersonName").value = "";
        assignSeat();
      }

      // Update stats
      function updateStats() {
        var totalSeats = 0;
        var assignedSeats = 0;

        for (var i = 0; i < tables.length; i++) {
          var seats = tables[i].seats;
          totalSeats += seats.length;
          for (var j = 0; j < seats.length; j++) {
            if (seats[j].name) assignedSeats++;
          }
        }

        document.getElementById("tableCount").textContent = tables.length;
        document.getElementById("totalSeats").textContent = totalSeats;
        document.getElementById("assignedSeats").textContent = assignedSeats;
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

      // Print chart
      function printChart() {
        var eventName = document.getElementById("eventName").value || "座位安排";
        document.getElementById("printEventName").textContent = eventName;
        window.print();
      }

      // Clear all
      function clearAll() {
        if (!confirm("确定要清空所有内容吗？")) return;

        document.getElementById("eventName").value = "";
        tables = [];
        tableIdCounter = 0;

        renderTables();
        updateStats();

        localStorage.removeItem(LS_KEY);

        showToast("已清空");
      }

      // Save to localStorage
      function saveToStorage() {
        var data = {
          eventName: document.getElementById("eventName").value,
          tables: tables,
          tableIdCounter: tableIdCounter
        };

        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      // Load from localStorage
      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (!saved) return;

        try {
          var data = JSON.parse(saved);

          document.getElementById("eventName").value = data.eventName || "";
          tables = data.tables || [];
          tableIdCounter = data.tableIdCounter || 0;
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

      // Handle Enter key in modal
      document.getElementById("seatPersonName").addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          assignSeat();
        }
      });

      // Initialize on load
      init();
    
