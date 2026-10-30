// @ts-nocheck
// Generated from tools/office/timesheet.html
// Source SHA-256: cd227fe21a29904d4b0bd1f053d54b54926fa06b34fa225f0aa14b0a4877f380
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Constants
      // ============================================
      var LS_KEY = "webutils_timesheet";
      var entries = [];

      // ============================================
      // Elements
      // ============================================
      var projectInput = document.getElementById("projectInput");
      var dateInput = document.getElementById("dateInput");
      var startInput = document.getElementById("startInput");
      var endInput = document.getElementById("endInput");
      var statusEl = document.getElementById("status");
      var entriesBody = document.getElementById("entriesBody");

      // ============================================
      // Utility Functions
      // ============================================
      function formatDate(dateStr) {
        var d = new Date(dateStr);
        return d.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          weekday: "short"
        });
      }

      function calculateHours(start, end) {
        var startParts = start.split(":");
        var endParts = end.split(":");
        var startMins = parseInt(startParts[0], 10) * 60 + parseInt(startParts[1], 10);
        var endMins = parseInt(endParts[0], 10) * 60 + parseInt(endParts[1], 10);
        var diffMins = endMins - startMins;
        if (diffMins < 0) {
          diffMins += 24 * 60; // Handle overnight
        }
        return (diffMins / 60).toFixed(2);
      }

      function getWeekStart(date) {
        var d = new Date(date);
        var day = d.getDay();
        var diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        if (type === "success") {
          setTimeout(function () {
            statusEl.textContent = "";
            statusEl.className = "status";
          }, 2000);
        }
      }

      // ============================================
      // Data Management
      // ============================================
      function loadEntries() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            entries = JSON.parse(saved);
          }
        } catch (e) {
          entries = [];
        }
      }

      function saveEntries() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(entries));
        } catch (e) {
          console.error("Failed to save entries:", e);
        }
      }

      function addEntry() {
        var project = projectInput.value.trim();
        var date = dateInput.value;
        var start = startInput.value;
        var end = endInput.value;

        if (!project) {
          showStatus("请输入项目/任务名称", "error");
          return;
        }
        if (!date) {
          showStatus("请选择日期", "error");
          return;
        }
        if (!start) {
          showStatus("请选择开始时间", "error");
          return;
        }
        if (!end) {
          showStatus("请选择结束时间", "error");
          return;
        }

        var hours = calculateHours(start, end);

        var entry = {
          id: Date.now(),
          project: project,
          date: date,
          start: start,
          end: end,
          hours: parseFloat(hours)
        };

        entries.push(entry);
        entries.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });

        saveEntries();
        renderEntries();
        updateSummary();

        // Clear inputs
        projectInput.value = "";
        startInput.value = "";
        endInput.value = "";

        showStatus("记录已添加", "success");
      }

      function deleteEntry(id) {
        entries = entries.filter(function (e) {
          return e.id !== id;
        });
        saveEntries();
        renderEntries();
        updateSummary();
      }

      function clearAll() {
        if (confirm("确定要清除所有记录吗？此操作不可恢复。")) {
          entries = [];
          saveEntries();
          renderEntries();
          updateSummary();
          showStatus("所有记录已清除", "success");
        }
      }

      // ============================================
      // Render Functions
      // ============================================
      function renderEntries() {
        // Clear existing content
        while (entriesBody.firstChild) {
          entriesBody.removeChild(entriesBody.firstChild);
        }

        if (entries.length === 0) {
          var emptyRow = document.createElement("tr");
          var emptyCell = document.createElement("td");
          emptyCell.colSpan = 6;
          emptyCell.className = "empty-state";
          emptyCell.textContent = "暂无记录";
          emptyRow.appendChild(emptyCell);
          entriesBody.appendChild(emptyRow);
          return;
        }

        entries.forEach(function (e) {
          var row = document.createElement("tr");

          var dateCell = document.createElement("td");
          dateCell.textContent = formatDate(e.date);
          row.appendChild(dateCell);

          var projectCell = document.createElement("td");
          projectCell.textContent = e.project;
          row.appendChild(projectCell);

          var startCell = document.createElement("td");
          startCell.textContent = e.start;
          row.appendChild(startCell);

          var endCell = document.createElement("td");
          endCell.textContent = e.end;
          row.appendChild(endCell);

          var hoursCell = document.createElement("td");
          hoursCell.className = "hours";
          hoursCell.textContent = e.hours.toFixed(2) + " h";
          row.appendChild(hoursCell);

          var actionCell = document.createElement("td");
          var deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = (function (id) {
            return function () {
              deleteEntry(id);
            };
          })(e.id);
          actionCell.appendChild(deleteBtn);
          row.appendChild(actionCell);

          entriesBody.appendChild(row);
        });
      }

      function updateSummary() {
        var today = new Date();
        var weekStart = getWeekStart(today);
        var weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        var daySums = [0, 0, 0, 0, 0, 0, 0]; // Mon-Sun (index 0-6)

        entries.forEach(function (e) {
          var d = new Date(e.date);
          if (d >= weekStart && d <= weekEnd) {
            var dayIndex = d.getDay();
            // Convert Sunday (0) to index 6, others shift by -1
            dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            daySums[dayIndex] += e.hours;
          }
        });

        var dayIds = ["sumMon", "sumTue", "sumWed", "sumThu", "sumFri", "sumSat", "sumSun"];
        var total = 0;

        dayIds.forEach(function (id, index) {
          document.getElementById(id).textContent = daySums[index].toFixed(1);
          total += daySums[index];
        });

        document.getElementById("sumTotal").textContent = total.toFixed(1);
      }

      // ============================================
      // Export Function
      // ============================================
      function exportCSV() {
        if (entries.length === 0) {
          showStatus("没有可导出的记录", "error");
          return;
        }

        var headers = ["日期", "项目/任务", "开始时间", "结束时间", "工时(小时)"];
        var rows = entries.map(function (e) {
          return [
            e.date,
            '"' + e.project.replace(/"/g, '""') + '"',
            e.start,
            e.end,
            e.hours.toFixed(2)
          ];
        });

        var csvContent = [headers.join(",")]
          .concat(
            rows.map(function (r) {
              return r.join(",");
            })
          )
          .join("\n");

        // Add BOM for Excel compatibility
        var bom = "\uFEFF";
        var blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8" });
        var url = URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.href = url;
        a.download = "timesheet_" + new Date().toISOString().slice(0, 10) + ".csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showStatus("CSV 已导出", "success");
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Event Listeners
      // ============================================
      document.getElementById("btnAdd").onclick = addEntry;
      document.getElementById("btnClear").onclick = clearAll;
      document.getElementById("btnExport").onclick = exportCSV;

      // Enter key to add entry
      [projectInput, startInput, endInput].forEach(function (input) {
        input.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            addEntry();
          }
        });
      });

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadEntries();

      // Set default date to today
      dateInput.value = new Date().toISOString().slice(0, 10);

      renderEntries();
      updateSummary();
    
