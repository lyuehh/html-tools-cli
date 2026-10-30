// @ts-nocheck
// Generated from tools/time/work-hours.html
// Source SHA-256: 09c0a28c69f38b3c5bdbff749125b0437f36b7e839666025d2cc146ad727a826
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var startTimeEl = document.getElementById("startTime");
      var endTimeEl = document.getElementById("endTime");
      var breakTimeEl = document.getElementById("breakTime");
      var monthlySalaryEl = document.getElementById("monthlySalary");
      var workDaysEl = document.getElementById("workDays");
      var overtimeRateEl = document.getElementById("overtimeRate");
      var weekDaysEl = document.getElementById("weekDays");
      var LS_KEY = "work_hours_v1";

      var STANDARD_HOURS = 8;

      function timeToMinutes(timeStr) {
        var parts = timeStr.split(":");
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }

      function formatDuration(minutes) {
        var h = Math.floor(Math.abs(minutes) / 60);
        var m = Math.abs(minutes) % 60;
        return h + " 小时 " + m + " 分钟";
      }

      function formatHours(minutes) {
        return (minutes / 60).toFixed(1) + " h";
      }

      window.calculate = function () {
        var startMinutes = timeToMinutes(startTimeEl.value);
        var endMinutes = timeToMinutes(endTimeEl.value);
        var breakMinutes = parseInt(breakTimeEl.value) || 0;

        // Handle overnight shifts
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60;
        }

        var totalMinutes = endMinutes - startMinutes;
        var netMinutes = totalMinutes - breakMinutes;
        var overtimeMinutes = Math.max(0, netMinutes - STANDARD_HOURS * 60);

        // Display results
        document.getElementById("totalHours").textContent = formatDuration(totalMinutes);
        document.getElementById("netHours").textContent = formatDuration(netMinutes);

        var overtimeEl = document.getElementById("overtimeHours");
        overtimeEl.textContent = formatDuration(overtimeMinutes);
        overtimeEl.className = "result-value" + (overtimeMinutes > 0 ? " warning" : "");

        // Overtime warning
        var warningEl = document.getElementById("overtimeWarning");
        if (overtimeMinutes > 180) {
          warningEl.style.display = "block";
          warningEl.textContent = "注意：今日加班超过 3 小时，请注意休息！";
        } else if (netMinutes > 12 * 60) {
          warningEl.style.display = "block";
          warningEl.textContent = "警告：工作时间超过 12 小时，严重影响健康！";
        } else {
          warningEl.style.display = "none";
        }

        // Salary calculation
        var monthlySalary = parseFloat(monthlySalaryEl.value) || 0;
        var workDays = parseInt(workDaysEl.value) || 22;
        var overtimeRate = parseFloat(overtimeRateEl.value) || 1.5;

        var dailySalary = monthlySalary / workDays;
        var hourlySalary = dailySalary / STANDARD_HOURS;
        var overtimePay = (overtimeMinutes / 60) * hourlySalary * overtimeRate;
        var totalDailyPay = dailySalary + overtimePay;

        document.getElementById("dailySalary").textContent = "¥" + dailySalary.toFixed(2);
        document.getElementById("hourlySalary").textContent = "¥" + hourlySalary.toFixed(2);
        document.getElementById("overtimePay").textContent = "¥" + overtimePay.toFixed(2);
        document.getElementById("totalDailyPay").textContent = "¥" + totalDailyPay.toFixed(2);

        // Weekly/Monthly stats
        var weekDays = parseInt(weekDaysEl.value) || 5;
        var weeklyNetMinutes = netMinutes * weekDays;
        var monthlyNetMinutes = netMinutes * workDays;
        var weeklyOvertimeMinutes = overtimeMinutes * weekDays;
        var monthlyOvertimeMinutes = overtimeMinutes * workDays;

        document.getElementById("weeklyHours").textContent = formatHours(weeklyNetMinutes);
        document.getElementById("monthlyHours").textContent = formatHours(monthlyNetMinutes);
        document.getElementById("weeklyOvertime").textContent = formatHours(weeklyOvertimeMinutes);
        document.getElementById("monthlyOvertime").textContent =
          formatHours(monthlyOvertimeMinutes);

        // Save settings
        saveToStorage();
      };

      function saveToStorage() {
        var data = {
          startTime: startTimeEl.value,
          endTime: endTimeEl.value,
          breakTime: breakTimeEl.value,
          monthlySalary: monthlySalaryEl.value,
          workDays: workDaysEl.value,
          overtimeRate: overtimeRateEl.value,
          weekDays: weekDaysEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            startTimeEl.value = data.startTime || "09:00";
            endTimeEl.value = data.endTime || "18:00";
            breakTimeEl.value = data.breakTime || "60";
            monthlySalaryEl.value = data.monthlySalary || "10000";
            workDaysEl.value = data.workDays || "22";
            overtimeRateEl.value = data.overtimeRate || "1.5";
            weekDaysEl.value = data.weekDays || "5";
          }
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Preset buttons
      document.querySelectorAll(".preset-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".preset-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");

          startTimeEl.value = btn.getAttribute("data-start");
          endTimeEl.value = btn.getAttribute("data-end");
          breakTimeEl.value = btn.getAttribute("data-break");
          calculate();
        });
      });

      // Event listeners
      [
        startTimeEl,
        endTimeEl,
        breakTimeEl,
        monthlySalaryEl,
        workDaysEl,
        overtimeRateEl,
        weekDaysEl
      ].forEach(function (el) {
        el.addEventListener("input", calculate);
        el.addEventListener("change", calculate);
      });

      // Initialize
      loadFromStorage();
      calculate();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
