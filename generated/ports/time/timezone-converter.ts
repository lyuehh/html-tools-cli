// @ts-nocheck
// Generated from tools/time/timezone-converter.html
// Source SHA-256: 25956e6a4614d14faec4199a5cf77bfd52c5b4270de76bc86876c86627634f6e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputTime = document.getElementById("inputTime");
      var sourceTimezone = document.getElementById("sourceTimezone");
      var addTimezoneSelect = document.getElementById("addTimezoneSelect");
      var timezoneGrid = document.getElementById("timezoneGrid");

      // 常用时区列表
      var timezones = [
        { id: "Pacific/Honolulu", name: "檀香山", offset: -10 },
        { id: "America/Anchorage", name: "安克雷奇", offset: -9 },
        { id: "America/Los_Angeles", name: "洛杉矶", offset: -8 },
        { id: "America/Denver", name: "丹佛", offset: -7 },
        { id: "America/Chicago", name: "芝加哥", offset: -6 },
        { id: "America/New_York", name: "纽约", offset: -5 },
        { id: "America/Sao_Paulo", name: "圣保罗", offset: -3 },
        { id: "Atlantic/Reykjavik", name: "雷克雅未克", offset: 0 },
        { id: "Europe/London", name: "伦敦", offset: 0 },
        { id: "Europe/Paris", name: "巴黎", offset: 1 },
        { id: "Europe/Berlin", name: "柏林", offset: 1 },
        { id: "Europe/Moscow", name: "莫斯科", offset: 3 },
        { id: "Asia/Dubai", name: "迪拜", offset: 4 },
        { id: "Asia/Kolkata", name: "孟买", offset: 5.5 },
        { id: "Asia/Bangkok", name: "曼谷", offset: 7 },
        { id: "Asia/Singapore", name: "新加坡", offset: 8 },
        { id: "Asia/Shanghai", name: "北京/上海", offset: 8 },
        { id: "Asia/Hong_Kong", name: "香港", offset: 8 },
        { id: "Asia/Taipei", name: "台北", offset: 8 },
        { id: "Asia/Tokyo", name: "东京", offset: 9 },
        { id: "Asia/Seoul", name: "首尔", offset: 9 },
        { id: "Australia/Sydney", name: "悉尼", offset: 11 },
        { id: "Pacific/Auckland", name: "奥克兰", offset: 13 },
        { id: "UTC", name: "UTC", offset: 0 }
      ];

      // 用户选择的时区
      var selectedTimezones = ["Asia/Shanghai", "America/New_York", "Europe/London", "Asia/Tokyo"];

      // 初始化时区选择器
      function initTimezoneSelectors() {
        // 清空选择器
        sourceTimezone.textContent = "";
        addTimezoneSelect.textContent = "";

        timezones.forEach(function (tz) {
          var sign = tz.offset >= 0 ? "+" : "";
          var text = tz.name + " (UTC" + sign + tz.offset + ")";

          var option1 = document.createElement("option");
          option1.value = tz.id;
          option1.textContent = text;
          sourceTimezone.appendChild(option1);

          var option2 = document.createElement("option");
          option2.value = tz.id;
          option2.textContent = text;
          addTimezoneSelect.appendChild(option2);
        });

        // 默认选择本地时区
        var localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var matchingTz = timezones.find(function (tz) {
          return tz.id === localTz;
        });
        if (matchingTz) {
          sourceTimezone.value = matchingTz.id;
        } else {
          sourceTimezone.value = "Asia/Shanghai";
        }
      }

      // 使用当前时间
      function useNow() {
        var now = new Date();
        var year = now.getFullYear();
        var month = String(now.getMonth() + 1).padStart(2, "0");
        var day = String(now.getDate()).padStart(2, "0");
        var hours = String(now.getHours()).padStart(2, "0");
        var minutes = String(now.getMinutes()).padStart(2, "0");
        inputTime.value = year + "-" + month + "-" + day + "T" + hours + ":" + minutes;
        convertTime();
      }

      // 获取时区信息
      function getTimezoneInfo(tzId) {
        return (
          timezones.find(function (tz) {
            return tz.id === tzId;
          }) || { id: tzId, name: tzId, offset: 0 }
        );
      }

      // 格式化时间
      function formatTime(date, tzId) {
        try {
          return date.toLocaleTimeString("zh-CN", {
            timeZone: tzId,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          });
        } catch (e) {
          return "--:--:--";
        }
      }

      // 格式化日期
      function formatDate(date, tzId) {
        try {
          return date.toLocaleDateString("zh-CN", {
            timeZone: tzId,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short"
          });
        } catch (e) {
          return "----/--/--";
        }
      }

      // 获取时区偏移字符串
      function getOffsetString(tzId) {
        try {
          var now = new Date();
          var formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: tzId,
            timeZoneName: "shortOffset"
          });
          var parts = formatter.formatToParts(now);
          var tzPart = parts.find(function (p) {
            return p.type === "timeZoneName";
          });
          return tzPart ? tzPart.value : "";
        } catch (e) {
          return "";
        }
      }

      // 计算日期差异
      function getDayDiff(date, sourceTz, targetTz) {
        try {
          var sourceDate = new Date(date.toLocaleString("en-US", { timeZone: sourceTz }));
          var targetDate = new Date(date.toLocaleString("en-US", { timeZone: targetTz }));
          var sourceDayStart = new Date(
            sourceDate.getFullYear(),
            sourceDate.getMonth(),
            sourceDate.getDate()
          );
          var targetDayStart = new Date(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate()
          );
          var diff = Math.round((targetDayStart - sourceDayStart) / (1000 * 60 * 60 * 24));
          return diff;
        } catch (e) {
          return 0;
        }
      }

      // 转换时间
      function convertTime() {
        var timeValue = inputTime.value;
        if (!timeValue) {
          useNow();
          return;
        }

        var sourceTz = sourceTimezone.value;

        // 创建日期对象
        var localDate = new Date(timeValue);

        // 渲染时区列表
        renderTimezones(localDate, sourceTz);
        saveState();
      }

      // 渲染时区列表
      function renderTimezones(date, sourceTz) {
        timezoneGrid.textContent = "";

        selectedTimezones.forEach(function (tzId) {
          var tzInfo = getTimezoneInfo(tzId);
          var dayDiff = getDayDiff(date, sourceTz, tzId);

          var card = document.createElement("div");
          card.className = "timezone-card" + (tzId === sourceTz ? " highlight" : "");

          var infoDiv = document.createElement("div");
          infoDiv.className = "tz-info";

          var nameSpan = document.createElement("span");
          nameSpan.className = "tz-name";
          nameSpan.textContent = tzInfo.name;

          var offsetSpan = document.createElement("span");
          offsetSpan.className = "tz-offset";
          offsetSpan.textContent = tzId + " " + getOffsetString(tzId);

          infoDiv.appendChild(nameSpan);
          infoDiv.appendChild(offsetSpan);

          var timeDiv = document.createElement("div");
          timeDiv.style.flex = "1";

          var timeSpan = document.createElement("div");
          timeSpan.className = "tz-time-value";
          timeSpan.textContent = formatTime(date, tzId);

          if (dayDiff !== 0) {
            var diffSpan = document.createElement("span");
            diffSpan.className = "tz-day-diff " + (dayDiff > 0 ? "next" : "prev");
            diffSpan.textContent = dayDiff > 0 ? "+" + dayDiff + "天" : dayDiff + "天";
            timeSpan.appendChild(diffSpan);
          }

          var dateSpan = document.createElement("div");
          dateSpan.className = "tz-date";
          dateSpan.textContent = formatDate(date, tzId);

          timeDiv.appendChild(timeSpan);
          timeDiv.appendChild(dateSpan);

          var removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            removeTimezone(tzId);
          };

          card.appendChild(infoDiv);
          card.appendChild(timeDiv);
          card.appendChild(removeBtn);

          timezoneGrid.appendChild(card);
        });
      }

      // 添加时区
      window.addTimezone = function () {
        var tzId = addTimezoneSelect.value;
        if (selectedTimezones.indexOf(tzId) === -1) {
          selectedTimezones.push(tzId);
          convertTime();
        }
      };

      // 快速添加时区
      window.addQuickZone = function (tzId) {
        if (selectedTimezones.indexOf(tzId) === -1) {
          selectedTimezones.push(tzId);
          convertTime();
        }
      };

      // 移除时区
      function removeTimezone(tzId) {
        selectedTimezones = selectedTimezones.filter(function (tz) {
          return tz !== tzId;
        });
        convertTime();
      }

      // 更新当前时间显示
      function updateCurrentTime() {
        var now = new Date();
        document.getElementById("currentTime").textContent = now.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
      }

      // URL 状态持久化
      function saveState() {
        var state = {
          time: inputTime.value,
          source: sourceTimezone.value,
          zones: selectedTimezones
        };
        try {
          var hash = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + hash);
        } catch (e) {
          console.error("保存状态失败:", e);
        }
      }

      function loadState() {
        var hash = window.location.hash.slice(1);
        if (hash) {
          try {
            var state = JSON.parse(decodeURIComponent(atob(hash)));
            if (state.time) inputTime.value = state.time;
            if (state.source) sourceTimezone.value = state.source;
            if (state.zones && state.zones.length > 0) selectedTimezones = state.zones;
            convertTime();
          } catch (e) {
            console.error("加载状态失败:", e);
            useNow();
          }
        } else {
          useNow();
        }
      }

      // 输入变化时转换
      inputTime.addEventListener("change", convertTime);
      sourceTimezone.addEventListener("change", convertTime);

      // 初始化
      initTimezoneSelectors();
      loadState();
      updateCurrentTime();
      setInterval(updateCurrentTime, 1000);

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      initTheme();
    
