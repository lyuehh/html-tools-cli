// @ts-nocheck
// Generated from tools/travel/world-clock.html
// Source SHA-256: 353182d7fdc6badca70fdf256748a2b53d0d5cb67ae7ab71428f055cbef769f2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Timezone Data
      // ============================================
      var TIMEZONES = [
        { id: "Asia/Shanghai", city: "上海", country: "中国" },
        { id: "Asia/Hong_Kong", city: "香港", country: "中国" },
        { id: "Asia/Taipei", city: "台北", country: "中国台湾" },
        { id: "Asia/Tokyo", city: "东京", country: "日本" },
        { id: "Asia/Seoul", city: "首尔", country: "韩国" },
        { id: "Asia/Singapore", city: "新加坡", country: "新加坡" },
        { id: "Asia/Dubai", city: "迪拜", country: "阿联酋" },
        { id: "Asia/Kolkata", city: "孟买", country: "印度" },
        { id: "Asia/Bangkok", city: "曼谷", country: "泰国" },
        { id: "Asia/Jakarta", city: "雅加达", country: "印度尼西亚" },
        { id: "Europe/London", city: "伦敦", country: "英国" },
        { id: "Europe/Paris", city: "巴黎", country: "法国" },
        { id: "Europe/Berlin", city: "柏林", country: "德国" },
        { id: "Europe/Moscow", city: "莫斯科", country: "俄罗斯" },
        { id: "Europe/Rome", city: "罗马", country: "意大利" },
        { id: "Europe/Madrid", city: "马德里", country: "西班牙" },
        { id: "Europe/Amsterdam", city: "阿姆斯特丹", country: "荷兰" },
        { id: "America/New_York", city: "纽约", country: "美国" },
        { id: "America/Los_Angeles", city: "洛杉矶", country: "美国" },
        { id: "America/Chicago", city: "芝加哥", country: "美国" },
        { id: "America/Denver", city: "丹佛", country: "美国" },
        { id: "America/Toronto", city: "多伦多", country: "加拿大" },
        { id: "America/Vancouver", city: "温哥华", country: "加拿大" },
        { id: "America/Sao_Paulo", city: "圣保罗", country: "巴西" },
        { id: "America/Mexico_City", city: "墨西哥城", country: "墨西哥" },
        { id: "Australia/Sydney", city: "悉尼", country: "澳大利亚" },
        { id: "Australia/Melbourne", city: "墨尔本", country: "澳大利亚" },
        { id: "Pacific/Auckland", city: "奥克兰", country: "新西兰" },
        { id: "Pacific/Honolulu", city: "檀香山", country: "美国" },
        { id: "Africa/Cairo", city: "开罗", country: "埃及" },
        { id: "Africa/Johannesburg", city: "约翰内斯堡", country: "南非" },
        { id: "UTC", city: "UTC", country: "协调世界时" }
      ];

      var PRESETS = {
        local: { id: Intl.DateTimeFormat().resolvedOptions().timeZone, city: "本地", country: "" },
        utc: { id: "UTC", city: "UTC", country: "协调世界时" },
        newyork: { id: "America/New_York", city: "纽约", country: "美国" },
        london: { id: "Europe/London", city: "伦敦", country: "英国" },
        tokyo: { id: "Asia/Tokyo", city: "东京", country: "日本" },
        sydney: { id: "Australia/Sydney", city: "悉尼", country: "澳大利亚" },
        dubai: { id: "Asia/Dubai", city: "迪拜", country: "阿联酋" },
        singapore: { id: "Asia/Singapore", city: "新加坡", country: "新加坡" }
      };

      var LS_KEY = "webutils_world_clocks";
      var clocks = [];
      var updateInterval;

      // ============================================
      // Initialize
      // ============================================
      function init() {
        initTheme();
        populateTimezoneSelect();
        loadClocks();
        startUpdating();
      }

      function populateTimezoneSelect() {
        var select = document.getElementById("timezoneSelect");
        TIMEZONES.forEach(function (tz) {
          var option = document.createElement("option");
          option.value = tz.id;
          option.textContent = tz.city + " (" + tz.country + ")";
          select.appendChild(option);
        });
      }

      // ============================================
      // Clock Management
      // ============================================
      function loadClocks() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            clocks = JSON.parse(saved);
          }
        } catch (e) {
          clocks = [];
        }
        renderClocks();
      }

      function saveClocks() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(clocks));
        } catch (e) {
          // Ignore storage errors
        }
      }

      function addClock(timezone, city, country) {
        // Check if already exists
        if (
          clocks.some(function (c) {
            return c.id === timezone;
          })
        ) {
          return;
        }

        clocks.push({
          id: timezone,
          city: city,
          country: country
        });
        saveClocks();
        renderClocks();
      }

      function removeClock(index) {
        clocks.splice(index, 1);
        saveClocks();
        renderClocks();
      }

      function addSelectedCity() {
        var select = document.getElementById("timezoneSelect");
        var value = select.value;
        if (!value) return;

        var tz = TIMEZONES.find(function (t) {
          return t.id === value;
        });
        if (tz) {
          addClock(tz.id, tz.city, tz.country);
        }
        select.value = "";
      }

      function addPreset(presetKey) {
        var preset = PRESETS[presetKey];
        if (preset) {
          var city = preset.city;
          var country = preset.country;

          // For local timezone, get actual city name if possible
          if (presetKey === "local") {
            var localTz = TIMEZONES.find(function (t) {
              return t.id === preset.id;
            });
            if (localTz) {
              city = localTz.city;
              country = localTz.country;
            } else {
              city = "本地";
              country = preset.id;
            }
          }

          addClock(preset.id, city, country);
        }
      }

      // ============================================
      // Rendering
      // ============================================
      function renderClocks() {
        var grid = document.getElementById("clockGrid");
        grid.textContent = "";

        if (clocks.length === 0) {
          var emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";

          var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("class", "empty-state-icon");
          svg.setAttribute("viewBox", "0 0 24 24");
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          svg.setAttribute("stroke-width", "2");

          var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", "12");
          circle.setAttribute("cy", "12");
          circle.setAttribute("r", "10");
          svg.appendChild(circle);

          var polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
          polyline.setAttribute("points", "12 6 12 12 16 14");
          svg.appendChild(polyline);

          emptyDiv.appendChild(svg);

          var p = document.createElement("p");
          p.textContent = "点击上方按钮添加城市时钟";
          emptyDiv.appendChild(p);

          grid.appendChild(emptyDiv);
          return;
        }

        clocks.forEach(function (clock, index) {
          grid.appendChild(createClockCard(clock, index));
        });

        updateAllClocks();
      }

      function createClockCard(clock, index) {
        var card = document.createElement("div");
        card.className = "clock-card";
        card.dataset.timezone = clock.id;

        // Header
        var header = document.createElement("div");
        header.className = "clock-header";

        var infoDiv = document.createElement("div");

        var cityDiv = document.createElement("div");
        cityDiv.className = "clock-city";
        cityDiv.textContent = clock.city;
        infoDiv.appendChild(cityDiv);

        var tzDiv = document.createElement("div");
        tzDiv.className = "clock-timezone";
        tzDiv.textContent = clock.country || clock.id;
        infoDiv.appendChild(tzDiv);

        header.appendChild(infoDiv);

        var removeBtn = document.createElement("button");
        removeBtn.className = "clock-remove";
        removeBtn.setAttribute("aria-label", "移除");
        removeBtn.onclick = function () {
          removeClock(index);
        };

        var removeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        removeSvg.setAttribute("viewBox", "0 0 24 24");
        removeSvg.setAttribute("width", "16");
        removeSvg.setAttribute("height", "16");
        removeSvg.setAttribute("fill", "none");
        removeSvg.setAttribute("stroke", "currentColor");
        removeSvg.setAttribute("stroke-width", "2");

        var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "18");
        line1.setAttribute("y1", "6");
        line1.setAttribute("x2", "6");
        line1.setAttribute("y2", "18");
        removeSvg.appendChild(line1);

        var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "6");
        line2.setAttribute("y1", "6");
        line2.setAttribute("x2", "18");
        line2.setAttribute("y2", "18");
        removeSvg.appendChild(line2);

        removeBtn.appendChild(removeSvg);
        header.appendChild(removeBtn);

        card.appendChild(header);

        // Time
        var timeDiv = document.createElement("div");
        timeDiv.className = "clock-time";
        timeDiv.dataset.time = "";
        card.appendChild(timeDiv);

        // Date
        var dateDiv = document.createElement("div");
        dateDiv.className = "clock-date";
        dateDiv.dataset.date = "";
        card.appendChild(dateDiv);

        // Offset
        var offsetDiv = document.createElement("div");
        offsetDiv.className = "clock-offset";
        offsetDiv.dataset.offset = "";
        card.appendChild(offsetDiv);

        return card;
      }

      function updateAllClocks() {
        var cards = document.querySelectorAll(".clock-card");
        cards.forEach(function (card) {
          var timezone = card.dataset.timezone;
          updateClockCard(card, timezone);
        });
      }

      function updateClockCard(card, timezone) {
        var now = new Date();

        try {
          // Format time
          var timeStr = now.toLocaleTimeString("zh-CN", {
            timeZone: timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          });

          // Format date
          var dateStr = now.toLocaleDateString("zh-CN", {
            timeZone: timezone,
            weekday: "short",
            month: "short",
            day: "numeric"
          });

          // Calculate offset
          var offsetStr = getTimezoneOffset(timezone);

          card.querySelector("[data-time]").textContent = timeStr;
          card.querySelector("[data-date]").textContent = dateStr;
          card.querySelector("[data-offset]").textContent = "UTC " + offsetStr;
        } catch (e) {
          card.querySelector("[data-time]").textContent = "--:--:--";
          card.querySelector("[data-date]").textContent = "无效时区";
          card.querySelector("[data-offset]").textContent = "";
        }
      }

      function getTimezoneOffset(timezone) {
        try {
          var now = new Date();
          var utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
          var tzDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
          var diffMs = tzDate - utcDate;
          var diffHrs = diffMs / (1000 * 60 * 60);
          var sign = diffHrs >= 0 ? "+" : "";
          var hours = Math.floor(Math.abs(diffHrs));
          var minutes = Math.round((Math.abs(diffHrs) - hours) * 60);

          if (minutes === 0) {
            return sign + diffHrs;
          } else {
            return (
              sign + (diffHrs >= 0 ? "" : "-") + hours + ":" + String(minutes).padStart(2, "0")
            );
          }
        } catch (e) {
          return "";
        }
      }

      function startUpdating() {
        updateAllClocks();
        updateInterval = setInterval(updateAllClocks, 1000);
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

      // Initialize on load
      init();
    
