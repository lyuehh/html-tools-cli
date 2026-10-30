// @ts-nocheck
// Generated from tools/calculator/time-calc.html
// Source SHA-256: 21d8675104b8d4b106e73f4e1f744b9af7b8a38450a623c9bfd4f21240694f13
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeToggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeToggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      window.showTab = function (tabId) {
        document.querySelectorAll(".tab-content").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
        document.getElementById(tabId).classList.add("active");
        event.target.classList.add("active");
      };

      function setNow() {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
        document.getElementById("startDateTime").value = localISOTime;
      }

      window.calcDateTime = function () {
        const startStr = document.getElementById("startDateTime").value;
        if (!startStr) {
          alert("请选择起始日期时间");
          return;
        }

        const start = new Date(startStr);
        const op = document.querySelector('input[name="dtOp"]:checked').value;
        const mult = op === "add" ? 1 : -1;

        const years = parseInt(document.getElementById("addYears").value) || 0;
        const months = parseInt(document.getElementById("addMonths").value) || 0;
        const days = parseInt(document.getElementById("addDays").value) || 0;
        const hours = parseInt(document.getElementById("addHours").value) || 0;
        const minutes = parseInt(document.getElementById("addMinutes").value) || 0;
        const seconds = parseInt(document.getElementById("addSeconds").value) || 0;

        const result = new Date(start);
        result.setFullYear(result.getFullYear() + mult * years);
        result.setMonth(result.getMonth() + mult * months);
        result.setDate(result.getDate() + mult * days);
        result.setHours(result.getHours() + mult * hours);
        result.setMinutes(result.getMinutes() + mult * minutes);
        result.setSeconds(result.getSeconds() + mult * seconds);

        const formatted =
          result.getFullYear() +
          "年" +
          (result.getMonth() + 1) +
          "月" +
          result.getDate() +
          "日 " +
          result.getHours().toString().padStart(2, "0") +
          ":" +
          result.getMinutes().toString().padStart(2, "0") +
          ":" +
          result.getSeconds().toString().padStart(2, "0");

        document.getElementById("dtResult").textContent = formatted;
        document.getElementById("dtResultWeekday").textContent = "星期" + weekdays[result.getDay()];
      };

      function convertDuration() {
        const value = parseFloat(document.getElementById("durationValue").value) || 0;
        const unit = document.getElementById("durationUnit").value;

        let seconds;
        switch (unit) {
          case "seconds":
            seconds = value;
            break;
          case "minutes":
            seconds = value * 60;
            break;
          case "hours":
            seconds = value * 3600;
            break;
          case "days":
            seconds = value * 86400;
            break;
          case "weeks":
            seconds = value * 604800;
            break;
        }

        document.getElementById("resSec").textContent = seconds.toLocaleString();
        document.getElementById("resMin").textContent = (seconds / 60).toFixed(2);
        document.getElementById("resHour").textContent = (seconds / 3600).toFixed(4);
        document.getElementById("resDay").textContent = (seconds / 86400).toFixed(4);
        document.getElementById("resWeek").textContent = (seconds / 604800).toFixed(4);

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        document.getElementById("resFormatted").textContent =
          h + ":" + m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
      }

      window.calcDiff = function () {
        const startStr = document.getElementById("diffStart").value;
        const endStr = document.getElementById("diffEnd").value;
        if (!startStr || !endStr) {
          alert("请选择开始和结束日期");
          return;
        }

        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffMs = Math.abs(end - start);
        const diffDays = Math.floor(diffMs / 86400000);

        document.getElementById("diffResult").textContent = diffDays + " 天";
        document.getElementById("diffDays").textContent = diffDays;
        document.getElementById("diffWeeks").textContent = (diffDays / 7).toFixed(2);
        document.getElementById("diffMonths").textContent = (diffDays / 30.44).toFixed(2);
        document.getElementById("diffYears").textContent = (diffDays / 365.25).toFixed(4);
        document.getElementById("diffHours").textContent = Math.floor(diffMs / 3600000);
        document.getElementById("diffMinutes").textContent = Math.floor(diffMs / 60000);

        // Detailed breakdown
        let years = 0,
          months = 0,
          days = diffDays;
        years = Math.floor(days / 365);
        days %= 365;
        months = Math.floor(days / 30);
        days %= 30;
        document.getElementById("diffDetail").textContent =
          "约 " + years + " 年 " + months + " 个月 " + days + " 天";
      };

      window.calcWorkday = function () {
        const startStr = document.getElementById("workdayStart").value;
        if (!startStr) {
          alert("请选择起始日期");
          return;
        }

        const start = new Date(startStr);
        const op = document.querySelector('input[name="workdayOp"]:checked').value;

        if (op === "add") {
          const count = parseInt(document.getElementById("workdayCount").value) || 0;
          let current = new Date(start);
          let added = 0;
          let weekendDays = 0;

          while (added < count) {
            current.setDate(current.getDate() + 1);
            const day = current.getDay();
            if (day !== 0 && day !== 6) {
              added++;
            } else {
              weekendDays++;
            }
          }

          const formatted =
            current.getFullYear() +
            "年" +
            (current.getMonth() + 1) +
            "月" +
            current.getDate() +
            "日";
          document.getElementById("workdayResult").textContent =
            formatted + " (星期" + weekdays[current.getDay()] + ")";
          document.getElementById("workdays").textContent = count;
          document.getElementById("weekends").textContent = weekendDays;
          document.getElementById("totalDays").textContent = count + weekendDays;
        } else {
          const endStr = document.getElementById("workdayEnd").value;
          if (!endStr) {
            alert("请选择结束日期");
            return;
          }

          const end = new Date(endStr);
          let current = new Date(start);
          let workdays = 0;
          let weekendDays = 0;

          while (current <= end) {
            const day = current.getDay();
            if (day !== 0 && day !== 6) {
              workdays++;
            } else {
              weekendDays++;
            }
            current.setDate(current.getDate() + 1);
          }

          document.getElementById("workdayResult").textContent = workdays + " 个工作日";
          document.getElementById("workdays").textContent = workdays;
          document.getElementById("weekends").textContent = weekendDays;
          document.getElementById("totalDays").textContent = workdays + weekendDays;
        }
      };

      document.querySelectorAll('input[name="workdayOp"]').forEach((radio) => {
        radio.addEventListener("change", function () {
          document.getElementById("workdayAddSection").style.display =
            this.value === "add" ? "block" : "none";
          document.getElementById("workdayCountSection").style.display =
            this.value === "count" ? "block" : "none";
        });
      });

      loadTheme();
      setNow();
      const today = new Date().toISOString().split("T")[0];
      document.getElementById("diffStart").value = today;
      document.getElementById("diffEnd").value = today;
      document.getElementById("workdayStart").value = today;
      document.getElementById("workdayEnd").value = today;
      convertDuration();
    
