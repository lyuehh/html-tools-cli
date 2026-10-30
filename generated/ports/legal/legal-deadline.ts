// @ts-nocheck
// Generated from tools/legal/legal-deadline.html
// Source SHA-256: 1e60f9fb4dfb80787e3c871966bd6eee689e765284ec7e471239fbca9abf9111
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "legal_deadline_v1";

      var presets = {
        limitation_3y: { value: 3, unit: "year", name: "普通诉讼时效（3年）" },
        limitation_1y: { value: 1, unit: "year", name: "特殊诉讼时效（1年）" },
        limitation_20y: { value: 20, unit: "year", name: "最长保护期（20年）" },
        appeal_civil: { value: 15, unit: "day", name: "民事上诉期（15天）" },
        defense_civil: { value: 15, unit: "day", name: "民事答辩期（15天）" },
        enforcement: { value: 2, unit: "year", name: "申请强制执行（2年）" },
        appeal_criminal: { value: 10, unit: "day", name: "刑事上诉期（10天）" },
        appeal_admin: { value: 15, unit: "day", name: "行政上诉期（15天）" },
        admin_sue: { value: 6, unit: "month", name: "行政诉讼起诉期（6个月）" },
        admin_review: { value: 60, unit: "day", name: "行政复议申请期（60天）" },
        arbitration_labor: { value: 1, unit: "year", name: "劳动仲裁时效（1年）" },
        arbitration_commercial: { value: 3, unit: "year", name: "商事仲裁时效" },
        contract_7d: { value: 7, unit: "day", name: "7天冷静期" },
        contract_30d: { value: 30, unit: "day", name: "30天通知期" },
        contract_90d: { value: 90, unit: "day", name: "90天试用期" }
      };

      function updatePeriod() {
        var type = document.getElementById("deadlineType").value;
        if (type !== "custom" && presets[type]) {
          var preset = presets[type];
          document.getElementById("periodValue").value = preset.value;
          document.getElementById("periodUnit").value = preset.unit;
        }
      }

      function selectPreset(type) {
        document.getElementById("deadlineType").value = type;
        updatePeriod();
        if (document.getElementById("startDate").value) {
          calculate();
        }
      }

      function setToday() {
        document.getElementById("startDate").value = new Date().toISOString().split("T")[0];
      }

      function calculate() {
        var startDateStr = document.getElementById("startDate").value;
        var periodValue = parseInt(document.getElementById("periodValue").value, 10);
        var periodUnit = document.getElementById("periodUnit").value;
        var excludeHolidays = document.getElementById("excludeHolidays").checked;

        if (!startDateStr) {
          showStatus("请选择起算日期", "error");
          return;
        }

        if (!periodValue || periodValue < 1) {
          showStatus("请输入有效的期限数值", "error");
          return;
        }

        var startDate = new Date(startDateStr);
        var endDate = new Date(startDate);

        // Calculate end date
        switch (periodUnit) {
          case "day":
            endDate.setDate(endDate.getDate() + periodValue);
            break;
          case "month":
            endDate.setMonth(endDate.getMonth() + periodValue);
            break;
          case "year":
            endDate.setFullYear(endDate.getFullYear() + periodValue);
            break;
        }

        // Check for holidays (simplified - just weekends)
        if (excludeHolidays) {
          while (endDate.getDay() === 0 || endDate.getDay() === 6) {
            endDate.setDate(endDate.getDate() + 1);
          }
        }

        // Calculate remaining days
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var diff = endDate.getTime() - today.getTime();
        var remainingDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

        // Display results
        var resultCard = document.getElementById("resultCard");
        var resultDate = document.getElementById("resultDate");
        var resultCountdown = document.getElementById("resultCountdown");

        resultCard.style.display = "block";

        var dateStr =
          endDate.getFullYear() + "年" + (endDate.getMonth() + 1) + "月" + endDate.getDate() + "日";
        resultDate.textContent = dateStr;

        resultDate.className = "result-date";
        resultCountdown.className = "result-countdown";

        if (remainingDays < 0) {
          resultDate.classList.add("expired");
          resultCountdown.textContent = "已过期 " + Math.abs(remainingDays) + " 天";
          resultCountdown.classList.add("urgent");
        } else if (remainingDays <= 7) {
          resultDate.classList.add("warning");
          resultCountdown.textContent = "剩余 " + remainingDays + " 天（紧急）";
          resultCountdown.classList.add("urgent");
        } else if (remainingDays <= 30) {
          resultDate.classList.add("warning");
          resultCountdown.textContent = "剩余 " + remainingDays + " 天";
        } else {
          resultDate.classList.add("safe");
          resultCountdown.textContent = "剩余 " + remainingDays + " 天";
        }

        // Info details
        document.getElementById("infoStartDate").textContent = formatDate(startDate);
        document.getElementById("infoPeriod").textContent =
          periodValue + " " + getUnitName(periodUnit);
        document.getElementById("infoEndDate").textContent = formatDate(endDate);

        var remainingText;
        if (remainingDays < 0) {
          remainingText = "已过期 " + Math.abs(remainingDays) + " 天";
        } else if (remainingDays === 0) {
          remainingText = "今天到期";
        } else {
          remainingText = remainingDays + " 天";
        }
        document.getElementById("infoRemaining").textContent = remainingText;

        saveToStorage();
        showStatus("计算完成", "success");
      }

      function formatDate(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      }

      function getUnitName(unit) {
        var names = {
          day: "天",
          month: "个月",
          year: "年"
        };
        return names[unit] || unit;
      }

      function clearForm() {
        document.getElementById("startDate").value = "";
        document.getElementById("deadlineType").value = "custom";
        document.getElementById("periodValue").value = "15";
        document.getElementById("periodUnit").value = "day";
        document.getElementById("resultCard").style.display = "none";
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      }

      function saveToStorage() {
        try {
          var data = {
            startDate: document.getElementById("startDate").value,
            deadlineType: document.getElementById("deadlineType").value,
            periodValue: document.getElementById("periodValue").value,
            periodUnit: document.getElementById("periodUnit").value,
            excludeHolidays: document.getElementById("excludeHolidays").checked
          };
          localStorage.setItem(LS_KEY, JSON.stringify(data));
        } catch (e) {}
      }

      function loadFromStorage() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var data = JSON.parse(saved);
            if (data.startDate) document.getElementById("startDate").value = data.startDate;
            if (data.deadlineType)
              document.getElementById("deadlineType").value = data.deadlineType;
            if (data.periodValue) document.getElementById("periodValue").value = data.periodValue;
            if (data.periodUnit) document.getElementById("periodUnit").value = data.periodUnit;
            if (data.excludeHolidays !== undefined)
              document.getElementById("excludeHolidays").checked = data.excludeHolidays;
          }
        } catch (e) {}
      }

      function showStatus(msg, type) {
        var el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      function toggleTheme() {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }

      (function () {
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = savedTheme === "dark" ? "🌙" : "☀️";
        }
        loadFromStorage();
      })();
    
