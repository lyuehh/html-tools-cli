// @ts-nocheck
// Generated from tools/travel/time-difference.html
// Source SHA-256: 7dbfad741dd290c382361e48416058ce9814a491769acb54d4cce14643be47aa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var TIMEZONES = [
        { id: "Asia/Shanghai", name: "上海 (中国)" },
        { id: "Asia/Hong_Kong", name: "香港" },
        { id: "Asia/Tokyo", name: "东京 (日本)" },
        { id: "Asia/Seoul", name: "首尔 (韩国)" },
        { id: "Asia/Singapore", name: "新加坡" },
        { id: "Asia/Dubai", name: "迪拜 (阿联酋)" },
        { id: "Asia/Kolkata", name: "孟买 (印度)" },
        { id: "Asia/Bangkok", name: "曼谷 (泰国)" },
        { id: "Europe/London", name: "伦敦 (英国)" },
        { id: "Europe/Paris", name: "巴黎 (法国)" },
        { id: "Europe/Berlin", name: "柏林 (德国)" },
        { id: "Europe/Moscow", name: "莫斯科 (俄罗斯)" },
        { id: "America/New_York", name: "纽约 (美国东部)" },
        { id: "America/Los_Angeles", name: "洛杉矶 (美国西部)" },
        { id: "America/Chicago", name: "芝加哥 (美国中部)" },
        { id: "America/Toronto", name: "多伦多 (加拿大)" },
        { id: "America/Sao_Paulo", name: "圣保罗 (巴西)" },
        { id: "Australia/Sydney", name: "悉尼 (澳大利亚)" },
        { id: "Pacific/Auckland", name: "奥克兰 (新西兰)" },
        { id: "UTC", name: "UTC (协调世界时)" }
      ];

      var fromSelect = document.getElementById("fromTimezone");
      var toSelect = document.getElementById("toTimezone");
      var fromDatetime = document.getElementById("fromDatetime");

      function init() {
        initTheme();
        populateTimezones();
        setNow();
        fromDatetime.addEventListener("change", convert);
        fromSelect.addEventListener("change", convert);
        toSelect.addEventListener("change", convert);
      }

      function populateTimezones() {
        var localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

        TIMEZONES.forEach(function (tz) {
          var opt1 = document.createElement("option");
          opt1.value = tz.id;
          opt1.textContent = tz.name;
          fromSelect.appendChild(opt1);

          var opt2 = document.createElement("option");
          opt2.value = tz.id;
          opt2.textContent = tz.name;
          toSelect.appendChild(opt2);
        });

        // Set defaults
        fromSelect.value = localTz || "Asia/Shanghai";
        toSelect.value = "America/New_York";
      }

      function setNow() {
        var now = new Date();
        var local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        fromDatetime.value = local.toISOString().slice(0, 16);
        convert();
      }

      function convert() {
        var fromTz = fromSelect.value;
        var toTz = toSelect.value;
        var inputValue = fromDatetime.value;

        if (!inputValue) {
          document.getElementById("resultTime").textContent = "--:--";
          document.getElementById("resultDate").textContent = "选择时间进行转换";
          document.getElementById("resultDiff").textContent = "";
          return;
        }

        try {
          // Parse input as if in fromTz
          var inputDate = new Date(inputValue);

          // Get the offset difference
          var fromOffset = getTimezoneOffsetMs(fromTz, inputDate);
          var toOffset = getTimezoneOffsetMs(toTz, inputDate);
          var localOffset = inputDate.getTimezoneOffset() * 60000;

          // Convert: input is treated as fromTz, convert to toTz
          var utcTime = inputDate.getTime() + localOffset - fromOffset;
          var targetTime = new Date(utcTime + toOffset);

          // Format result
          var timeStr = targetTime.toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });

          var dateStr = targetTime.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          });

          // Calculate time difference
          var diffHours = (toOffset - fromOffset) / (1000 * 60 * 60);
          var diffEl = document.getElementById("resultDiff");
          diffEl.textContent = "";

          if (diffHours === 0) {
            diffEl.textContent = "两地时间相同";
          } else {
            var prefix = diffHours > 0 ? "目标时区比源时区快 " : "目标时区比源时区慢 ";
            diffEl.appendChild(document.createTextNode(prefix));

            var highlight = document.createElement("span");
            highlight.className = "highlight";
            highlight.textContent = Math.abs(diffHours) + " 小时";
            diffEl.appendChild(highlight);
          }

          document.getElementById("resultTime").textContent = timeStr;
          document.getElementById("resultDate").textContent = dateStr;
        } catch (e) {
          document.getElementById("resultTime").textContent = "转换错误";
          document.getElementById("resultDate").textContent = "";
          document.getElementById("resultDiff").textContent = "";
        }
      }

      function getTimezoneOffsetMs(timezone, date) {
        var utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
        var tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
        return tzDate - utcDate;
      }

      function swapTimezones() {
        var temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        convert();
      }

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

      init();
    
