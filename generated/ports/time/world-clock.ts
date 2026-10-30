// @ts-nocheck
// Generated from tools/time/world-clock.html
// Source SHA-256: f54310346d4532ddab85d762061218c50e5ab910dd676977418a323271b209f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var timezones = [
        { id: "America/New_York", name: "纽约" },
        { id: "America/Los_Angeles", name: "洛杉矶" },
        { id: "America/Chicago", name: "芝加哥" },
        { id: "Europe/London", name: "伦敦" },
        { id: "Europe/Paris", name: "巴黎" },
        { id: "Europe/Berlin", name: "柏林" },
        { id: "Europe/Moscow", name: "莫斯科" },
        { id: "Asia/Tokyo", name: "东京" },
        { id: "Asia/Shanghai", name: "上海" },
        { id: "Asia/Hong_Kong", name: "香港" },
        { id: "Asia/Singapore", name: "新加坡" },
        { id: "Asia/Seoul", name: "首尔" },
        { id: "Asia/Dubai", name: "迪拜" },
        { id: "Asia/Kolkata", name: "孟买" },
        { id: "Australia/Sydney", name: "悉尼" },
        { id: "Pacific/Auckland", name: "奥克兰" }
      ];

      var selectedZones = ["America/New_York", "Europe/London", "Asia/Tokyo"];

      function init() {
        var select = document.getElementById("tzSelect");
        timezones.forEach(function (tz) {
          var option = document.createElement("option");
          option.value = tz.id;
          option.textContent = tz.name + " (" + tz.id + ")";
          select.appendChild(option);
        });

        var saved = localStorage.getItem("worldClockZones");
        if (saved) {
          try {
            selectedZones = JSON.parse(saved);
          } catch (e) {}
        }

        renderClocks();
        updateTime();
        setInterval(updateTime, 1000);
      }

      // 获取指定时区的当前时间偏移（考虑夏令时）
      function getTimezoneOffset(tzId) {
        var now = new Date();
        var utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
        var tzDate = new Date(now.toLocaleString("en-US", { timeZone: tzId }));
        return (tzDate - utcDate) / 3600000;
      }

      function updateTime() {
        var now = new Date();
        var localOffset = -now.getTimezoneOffset() / 60;

        document.getElementById("localTime").textContent = formatTime(now);
        document.getElementById("localDate").textContent = formatDate(now);

        selectedZones.forEach(function (tzId) {
          var tz = timezones.find(function (t) {
            return t.id === tzId;
          });
          if (!tz) return;

          var timeEl = document.getElementById("time-" + tzId.replace(/\//g, "-"));
          var dateEl = document.getElementById("date-" + tzId.replace(/\//g, "-"));
          var diffEl = document.getElementById("diff-" + tzId.replace(/\//g, "-"));

          // 使用 Intl API 获取正确的时区时间（自动处理夏令时）
          if (timeEl) timeEl.textContent = formatTimeInZone(now, tzId);
          if (dateEl) dateEl.textContent = formatDateInZone(now, tzId);
          if (diffEl) {
            var tzOffset = getTimezoneOffset(tzId);
            var diff = tzOffset - localOffset;
            var diffStr = diff >= 0 ? "+" + diff : "" + diff;
            diffEl.textContent = "与本地时差: " + diffStr + " 小时";
          }
        });
      }

      function formatTimeInZone(date, tzId) {
        return date.toLocaleString("zh-CN", {
          timeZone: tzId,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
      }

      function formatDateInZone(date, tzId) {
        var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var parts = new Intl.DateTimeFormat("zh-CN", {
          timeZone: tzId,
          year: "numeric",
          month: "numeric",
          day: "numeric",
          weekday: "short"
        }).formatToParts(date);

        var year = "",
          month = "",
          day = "",
          weekday = "";
        parts.forEach(function (p) {
          if (p.type === "year") year = p.value;
          if (p.type === "month") month = p.value;
          if (p.type === "day") day = p.value;
          if (p.type === "weekday") weekday = p.value;
        });
        return year + "年" + month + "月" + day + "日 " + weekday;
      }

      function formatTime(date) {
        return (
          date.getHours().toString().padStart(2, "0") +
          ":" +
          date.getMinutes().toString().padStart(2, "0") +
          ":" +
          date.getSeconds().toString().padStart(2, "0")
        );
      }

      function formatDate(date) {
        var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        return (
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日 " +
          days[date.getDay()]
        );
      }

      function renderClocks() {
        var container = document.getElementById("clocks");
        while (container.firstChild) container.removeChild(container.firstChild);

        selectedZones.forEach(function (tzId) {
          var tz = timezones.find(function (t) {
            return t.id === tzId;
          });
          if (!tz) return;

          var card = document.createElement("div");
          card.className = "clock-card";

          var removeBtn = document.createElement("button");
          removeBtn.className = "remove";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeTimezone(tzId);
          };
          card.appendChild(removeBtn);

          var city = document.createElement("div");
          city.className = "city";
          city.textContent = tz.name;
          card.appendChild(city);

          var timezone = document.createElement("div");
          timezone.className = "timezone";
          timezone.textContent = tz.id;
          card.appendChild(timezone);

          var time = document.createElement("div");
          time.className = "time";
          time.id = "time-" + tzId.replace(/\//g, "-");
          time.textContent = "--:--:--";
          card.appendChild(time);

          var dateDiv = document.createElement("div");
          dateDiv.className = "date";
          dateDiv.id = "date-" + tzId.replace(/\//g, "-");
          card.appendChild(dateDiv);

          var diff = document.createElement("div");
          diff.className = "diff";
          diff.id = "diff-" + tzId.replace(/\//g, "-");
          card.appendChild(diff);

          container.appendChild(card);
        });

        localStorage.setItem("worldClockZones", JSON.stringify(selectedZones));
      }

      window.addTimezone = function () {
        var tzId = document.getElementById("tzSelect").value;
        if (selectedZones.indexOf(tzId) === -1) {
          selectedZones.push(tzId);
          renderClocks();
          updateTime();
        }
      };

      function removeTimezone(tzId) {
        selectedZones = selectedZones.filter(function (id) {
          return id !== tzId;
        });
        renderClocks();
      }

      init();

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
    
