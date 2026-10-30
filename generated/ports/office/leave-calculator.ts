// @ts-nocheck
// Generated from tools/office/leave-calculator.html
// Source SHA-256: bf701ec7be2f97273080e3a629e3e6ca21114ca13c7f954288923b217c96e4b8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // State
      // ============================================
      var holidays = [];

      // ============================================
      // Elements
      // ============================================
      var startDateInput = document.getElementById("startDate");
      var endDateInput = document.getElementById("endDate");
      var excludeWeekendsCheckbox = document.getElementById("excludeWeekends");
      var holidayInput = document.getElementById("holidayInput");
      var holidaysList = document.getElementById("holidaysList");
      var resultsCard = document.getElementById("resultsCard");

      // ============================================
      // Holiday Management
      // ============================================
      function addHoliday() {
        var dateValue = holidayInput.value;
        if (!dateValue) {
          return;
        }

        if (holidays.indexOf(dateValue) === -1) {
          holidays.push(dateValue);
          holidays.sort();
          renderHolidays();
        }

        holidayInput.value = "";
      }

      function removeHoliday(date) {
        holidays = holidays.filter(function (h) {
          return h !== date;
        });
        renderHolidays();
      }

      function renderHolidays() {
        // Clear existing content
        while (holidaysList.firstChild) {
          holidaysList.removeChild(holidaysList.firstChild);
        }

        if (holidays.length === 0) {
          var emptySpan = document.createElement("span");
          emptySpan.className = "empty-holidays";
          emptySpan.textContent = "暂无节假日";
          holidaysList.appendChild(emptySpan);
          return;
        }

        holidays.forEach(function (date) {
          var tag = document.createElement("span");
          tag.className = "holiday-tag";

          var dateText = document.createTextNode(formatDateShort(date));
          tag.appendChild(dateText);

          var removeBtn = document.createElement("span");
          removeBtn.className = "remove";
          removeBtn.textContent = "×";
          removeBtn.onclick = (function (d) {
            return function () {
              removeHoliday(d);
            };
          })(date);
          tag.appendChild(removeBtn);

          holidaysList.appendChild(tag);
        });
      }

      function formatDateShort(dateStr) {
        var d = new Date(dateStr);
        return d.getMonth() + 1 + "/" + d.getDate();
      }

      // ============================================
      // Calculation
      // ============================================
      function calculate() {
        var startStr = startDateInput.value;
        var endStr = endDateInput.value;

        if (!startStr || !endStr) {
          alert("请选择开始日期和结束日期");
          return;
        }

        var startDate = new Date(startStr);
        var endDate = new Date(endStr);

        if (startDate > endDate) {
          alert("开始日期不能晚于结束日期");
          return;
        }

        var excludeWeekends = excludeWeekendsCheckbox.checked;

        // Calculate totals
        var totalDays = 0;
        var weekendDays = 0;
        var holidayDays = 0;
        var currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          totalDays++;

          var dayOfWeek = currentDate.getDay();
          var dateStr = currentDate.toISOString().slice(0, 10);

          var isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          var isHoliday = holidays.indexOf(dateStr) !== -1;

          if (isWeekend && excludeWeekends) {
            weekendDays++;
          } else if (isHoliday && !(isWeekend && excludeWeekends)) {
            // Only count holiday if it's not already counted as weekend
            holidayDays++;
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        var workingDays = totalDays - weekendDays - holidayDays;

        // Display results
        document.getElementById("totalDays").textContent = totalDays;
        document.getElementById("weekendDays").textContent = excludeWeekends ? weekendDays : "-";
        document.getElementById("holidayDays").textContent = holidayDays;
        document.getElementById("workingDays").textContent = workingDays;

        resultsCard.style.display = "block";
      }

      function clearInputs() {
        startDateInput.value = "";
        endDateInput.value = "";
        excludeWeekendsCheckbox.checked = true;
        holidays = [];
        renderHolidays();
        resultsCard.style.display = "none";
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
      document.getElementById("btnCalculate").onclick = calculate;
      document.getElementById("btnClear").onclick = clearInputs;
      document.getElementById("btnAddHoliday").onclick = addHoliday;

      holidayInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          addHoliday();
        }
      });

      // Auto-calculate when dates change
      startDateInput.addEventListener("change", function () {
        if (startDateInput.value && endDateInput.value) {
          calculate();
        }
      });

      endDateInput.addEventListener("change", function () {
        if (startDateInput.value && endDateInput.value) {
          calculate();
        }
      });

      excludeWeekendsCheckbox.addEventListener("change", function () {
        if (startDateInput.value && endDateInput.value) {
          calculate();
        }
      });

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      renderHolidays();

      // Set default dates (today and 7 days from now)
      var today = new Date();
      startDateInput.value = today.toISOString().slice(0, 10);

      var nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      endDateInput.value = nextWeek.toISOString().slice(0, 10);
    
