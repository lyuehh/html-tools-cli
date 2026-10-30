// @ts-nocheck
// Generated from tools/time/timestamp.html
// Source SHA-256: 01b5fce27f6e71414009e7dcf61eb019130c7d760768cece0cbdd0ff48d360e6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      var tsInputEl = document.getElementById("tsInput");
      var tsUnitEl = document.getElementById("tsUnit");
      var tsStatusEl = document.getElementById("tsStatus");
      var tsResultEl = document.getElementById("tsResult");
      var dateInputEl = document.getElementById("dateInput");
      var dateStatusEl = document.getElementById("dateStatus");
      var dateResultEl = document.getElementById("dateResult");

      // ============================================
      // Current Time Update
      // ============================================
      function updateCurrentTime() {
        var now = Date.now();
        document.getElementById("currentTimestamp").textContent = now;
        document.getElementById("currentDate").textContent = formatDate(new Date());
      }

      // ============================================
      // Date Formatters
      // ============================================
      function formatDate(date) {
        return date.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
      }

      function formatUtc(date) {
        return (
          date.toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "UTC"
          }) + " UTC"
        );
      }

      function relativeTime(date) {
        var now = Date.now();
        var diff = date.getTime() - now;
        var absDiff = Math.abs(diff);
        var isFuture = diff > 0;

        var seconds = Math.floor(absDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 30);
        var years = Math.floor(days / 365);

        var result;
        if (years > 0) {
          result = years + " 年";
        } else if (months > 0) {
          result = months + " 个月";
        } else if (days > 0) {
          result = days + " 天";
        } else if (hours > 0) {
          result = hours + " 小时";
        } else if (minutes > 0) {
          result = minutes + " 分钟";
        } else {
          result = seconds + " 秒";
        }

        return isFuture ? result + "后" : result + "前";
      }

      // ============================================
      // Conversion Functions
      // ============================================
      function convertTimestamp() {
        var input = tsInputEl.value.trim();
        if (!input) {
          showStatus(tsStatusEl, "请输入时间戳", "error");
          tsResultEl.style.display = "none";
          return;
        }

        var ts = parseInt(input, 10);
        if (isNaN(ts)) {
          showStatus(tsStatusEl, "无效的时间戳", "error");
          tsResultEl.style.display = "none";
          return;
        }

        // 转为毫秒
        if (tsUnitEl.value === "s") {
          ts = ts * 1000;
        }

        var date = new Date(ts);
        if (isNaN(date.getTime())) {
          showStatus(tsStatusEl, "无效的时间戳", "error");
          tsResultEl.style.display = "none";
          return;
        }

        document.getElementById("resultLocal").textContent = formatDate(date);
        document.getElementById("resultUtc").textContent = formatUtc(date);
        document.getElementById("resultIso").textContent = date.toISOString();
        document.getElementById("resultRelative").textContent = relativeTime(date);

        tsResultEl.style.display = "table";
        showStatus(tsStatusEl, "转换成功", "success");
      }

      function convertDate() {
        var input = dateInputEl.value;
        if (!input) {
          showStatus(dateStatusEl, "请选择日期时间", "error");
          dateResultEl.style.display = "none";
          return;
        }

        var date = new Date(input);
        if (isNaN(date.getTime())) {
          showStatus(dateStatusEl, "无效的日期", "error");
          dateResultEl.style.display = "none";
          return;
        }

        var ms = date.getTime();
        var s = Math.floor(ms / 1000);

        document.getElementById("resultSeconds").textContent = s;
        document.getElementById("resultMillis").textContent = ms;

        dateResultEl.style.display = "table";
        showStatus(dateStatusEl, "转换成功", "success");
      }

      function showStatus(el, msg, type) {
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      // ============================================
      // Timezone Info
      // ============================================
      function showTimezone() {
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var offset = new Date().getTimezoneOffset();
        var offsetHours = Math.abs(Math.floor(offset / 60));
        var offsetMins = Math.abs(offset % 60);
        var sign = offset <= 0 ? "+" : "-";
        var offsetStr =
          "UTC" +
          sign +
          String(offsetHours).padStart(2, "0") +
          ":" +
          String(offsetMins).padStart(2, "0");

        document.getElementById("timezone").textContent = tz;
        document.getElementById("utcOffset").textContent = offsetStr;
      }

      function setNowToDateInput() {
        var now = new Date();
        var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        dateInputEl.value = local.toISOString().slice(0, 19);
      }

      // ============================================
      // Event Handlers
      // ============================================
      document.getElementById("btnNow").onclick = function () {
        tsInputEl.value = Date.now();
        tsUnitEl.value = "ms";
        convertTimestamp();
      };

      document.getElementById("btnConvertTs").onclick = convertTimestamp;

      tsInputEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") convertTimestamp();
      });

      document.getElementById("btnNowDate").onclick = function () {
        setNowToDateInput();
        convertDate();
      };

      document.getElementById("btnConvertDate").onclick = convertDate;

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      updateCurrentTime();
      setInterval(updateCurrentTime, 1000);
      showTimezone();
      setNowToDateInput();
    
