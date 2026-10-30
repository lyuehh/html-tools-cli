// @ts-nocheck
// Generated from tools/office/overtime-calculator.html
// Source SHA-256: a2128ba8fa542069117923f66b43de12a8ad92518ba4529b51027d141e9a2cec
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "overtime_calculator_v2";
      let overtimeMultiplier = 1.5;

      // DOM Elements
      const hourlyRateEl = document.getElementById("hourlyRate");
      const regularHoursEl = document.getElementById("regularHours");
      const overtimeHoursEl = document.getElementById("overtimeHours");
      const weekendHoursEl = document.getElementById("weekendHours");
      const weekendMultiplierEl = document.getElementById("weekendMultiplier");
      const holidayHoursEl = document.getElementById("holidayHours");
      const holidayMultiplierEl = document.getElementById("holidayMultiplier");
      const enableWeekendEl = document.getElementById("enableWeekend");
      const enableHolidayEl = document.getElementById("enableHoliday");

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            hourlyRateEl.value = data.hourlyRate || "50";
            regularHoursEl.value = data.regularHours || "8";
            overtimeHoursEl.value = data.overtimeHours || "2";
            weekendHoursEl.value = data.weekendHours || "0";
            weekendMultiplierEl.value = data.weekendMultiplier || "2";
            holidayHoursEl.value = data.holidayHours || "0";
            holidayMultiplierEl.value = data.holidayMultiplier || "3";
            enableWeekendEl.checked = data.enableWeekend || false;
            enableHolidayEl.checked = data.enableHoliday || false;
            if (data.overtimeMultiplier) {
              setMultiplier(data.overtimeMultiplier, false);
            }
            toggleWeekend();
            toggleHoliday();
          } catch (e) {
            console.error("Failed to load saved data:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          hourlyRate: hourlyRateEl.value,
          regularHours: regularHoursEl.value,
          overtimeHours: overtimeHoursEl.value,
          overtimeMultiplier: overtimeMultiplier,
          enableWeekend: enableWeekendEl.checked,
          weekendHours: weekendHoursEl.value,
          weekendMultiplier: weekendMultiplierEl.value,
          enableHoliday: enableHolidayEl.checked,
          holidayHours: holidayHoursEl.value,
          holidayMultiplier: holidayMultiplierEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function setMultiplier(value, shouldCalculate = true) {
        overtimeMultiplier = value;
        document.querySelectorAll(".multiplier-btn").forEach(function (btn) {
          btn.classList.toggle("active", parseFloat(btn.dataset.multiplier) === value);
        });
        if (shouldCalculate) {
          calculate();
        }
      }

      function toggleWeekend() {
        const section = document.getElementById("weekendSection");
        const payRow = document.getElementById("weekendPayRow");
        if (enableWeekendEl.checked) {
          section.classList.add("visible");
          payRow.style.display = "flex";
        } else {
          section.classList.remove("visible");
          payRow.style.display = "none";
        }
        calculate();
      }

      function toggleHoliday() {
        const section = document.getElementById("holidaySection");
        const payRow = document.getElementById("holidayPayRow");
        if (enableHolidayEl.checked) {
          section.classList.add("visible");
          payRow.style.display = "flex";
        } else {
          section.classList.remove("visible");
          payRow.style.display = "none";
        }
        calculate();
      }

      function calculate() {
        const hourlyRate = parseFloat(hourlyRateEl.value) || 0;
        const regularHours = parseFloat(regularHoursEl.value) || 0;
        const overtimeHours = parseFloat(overtimeHoursEl.value) || 0;

        const weekendEnabled = enableWeekendEl.checked;
        const holidayEnabled = enableHolidayEl.checked;
        const weekendHours = weekendEnabled ? parseFloat(weekendHoursEl.value) || 0 : 0;
        const weekendMult = parseFloat(weekendMultiplierEl.value) || 2;
        const holidayHours = holidayEnabled ? parseFloat(holidayHoursEl.value) || 0 : 0;
        const holidayMult = parseFloat(holidayMultiplierEl.value) || 3;

        const regularPay = hourlyRate * regularHours;
        const overtimePay = hourlyRate * overtimeHours * overtimeMultiplier;
        const weekendPay = hourlyRate * weekendHours * weekendMult;
        const holidayPay = hourlyRate * holidayHours * holidayMult;
        const totalPay = regularPay + overtimePay + weekendPay + holidayPay;

        document.getElementById("regularPay").textContent = formatCurrency(regularPay);
        document.getElementById("overtimePay").textContent = formatCurrency(overtimePay);
        document.getElementById("weekendPay").textContent = formatCurrency(weekendPay);
        document.getElementById("holidayPay").textContent = formatCurrency(holidayPay);
        document.getElementById("totalPay").textContent = formatCurrency(totalPay);

        saveToStorage();
      }

      function formatCurrency(amount) {
        return "¥" + amount.toFixed(2);
      }

      function copyResults() {
        const hourlyRate = parseFloat(hourlyRateEl.value) || 0;
        const regularHours = parseFloat(regularHoursEl.value) || 0;
        const overtimeHours = parseFloat(overtimeHoursEl.value) || 0;
        const weekendEnabled = enableWeekendEl.checked;
        const holidayEnabled = enableHolidayEl.checked;
        const weekendHours = weekendEnabled ? parseFloat(weekendHoursEl.value) || 0 : 0;
        const weekendMult = parseFloat(weekendMultiplierEl.value) || 2;
        const holidayHours = holidayEnabled ? parseFloat(holidayHoursEl.value) || 0 : 0;
        const holidayMult = parseFloat(holidayMultiplierEl.value) || 3;

        const regularPay = hourlyRate * regularHours;
        const overtimePay = hourlyRate * overtimeHours * overtimeMultiplier;
        const weekendPay = hourlyRate * weekendHours * weekendMult;
        const holidayPay = hourlyRate * holidayHours * holidayMult;
        const totalPay = regularPay + overtimePay + weekendPay + holidayPay;

        let text = "加班费计算结果\n";
        text += "━━━━━━━━━━━━━━━━\n";
        text += "时薪: " + formatCurrency(hourlyRate) + "\n\n";
        text += "正常工时: " + regularHours + "h → " + formatCurrency(regularPay) + "\n";

        if (overtimeHours > 0) {
          text +=
            "工作日加班: " +
            overtimeHours +
            "h × " +
            overtimeMultiplier +
            "倍 → " +
            formatCurrency(overtimePay) +
            "\n";
        }

        if (weekendEnabled && weekendHours > 0) {
          text +=
            "周末加班: " +
            weekendHours +
            "h × " +
            weekendMult +
            "倍 → " +
            formatCurrency(weekendPay) +
            "\n";
        }

        if (holidayEnabled && holidayHours > 0) {
          text +=
            "节假日加班: " +
            holidayHours +
            "h × " +
            holidayMult +
            "倍 → " +
            formatCurrency(holidayPay) +
            "\n";
        }

        text += "━━━━━━━━━━━━━━━━\n";
        text += "总计: " + formatCurrency(totalPay);

        navigator.clipboard
          .writeText(text)
          .then(function () {
            showToast("已复制到剪贴板");
          })
          .catch(function () {
            showToast("复制失败，请手动复制");
          });
      }

      function clearInputs() {
        hourlyRateEl.value = "50";
        regularHoursEl.value = "8";
        overtimeHoursEl.value = "0";
        weekendHoursEl.value = "0";
        weekendMultiplierEl.value = "2";
        holidayHoursEl.value = "0";
        holidayMultiplierEl.value = "3";
        enableWeekendEl.checked = false;
        enableHolidayEl.checked = false;

        setMultiplier(1.5, false);
        toggleWeekend();
        toggleHoliday();
        calculate();

        localStorage.removeItem(LS_KEY);
        showToast("已清空所有输入");
      }

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2000);
      }

      // Add input event listeners
      document.querySelectorAll(".form-input, .form-select").forEach(function (input) {
        input.addEventListener("input", calculate);
        input.addEventListener("change", calculate);
      });

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      // Initialize
      initTheme();
      loadFromStorage();
      calculate();
    
