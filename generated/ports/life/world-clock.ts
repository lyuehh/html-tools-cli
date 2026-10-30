// @ts-nocheck
// Generated from tools/life/world-clock.html
// Source SHA-256: 0dc1dee93ddaa0b00309915cc817210832255dc84296ed76bc8867a820d084bd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "world_clock_cities";

      const cityNames = {
        "America/New_York": "🇺🇸 纽约",
        "America/Los_Angeles": "🇺🇸 洛杉矶",
        "America/Chicago": "🇺🇸 芝加哥",
        "Europe/London": "🇬🇧 伦敦",
        "Europe/Paris": "🇫🇷 巴黎",
        "Europe/Berlin": "🇩🇪 柏林",
        "Europe/Moscow": "🇷🇺 莫斯科",
        "Asia/Tokyo": "🇯🇵 东京",
        "Asia/Shanghai": "🇨🇳 上海",
        "Asia/Hong_Kong": "🇭🇰 香港",
        "Asia/Singapore": "🇸🇬 新加坡",
        "Asia/Seoul": "🇰🇷 首尔",
        "Asia/Dubai": "🇦🇪 迪拜",
        "Asia/Kolkata": "🇮🇳 孟买",
        "Australia/Sydney": "🇦🇺 悉尼",
        "Pacific/Auckland": "🇳🇿 奥克兰",
        "America/Sao_Paulo": "🇧🇷 圣保罗",
        "Africa/Cairo": "🇪🇬 开罗"
      };

      let cities = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
        "America/New_York",
        "Europe/London",
        "Asia/Tokyo"
      ];

      function formatDate(date, locale = "zh-CN") {
        return date.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        });
      }

      function formatTime(date) {
        return date.toLocaleTimeString("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });
      }

      function getTimeInTimezone(timezone) {
        const date = new Date();
        const options = {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        };
        const time = date.toLocaleTimeString("zh-CN", options);

        const dateOptions = {
          timeZone: timezone,
          year: "numeric",
          month: "short",
          day: "numeric",
          weekday: "short"
        };
        const dateStr = date.toLocaleDateString("zh-CN", dateOptions);

        // Get hour to determine day/night
        const hourOptions = { timeZone: timezone, hour: "numeric", hour12: false };
        const hour = parseInt(date.toLocaleTimeString("en-US", hourOptions));
        const isDay = hour >= 6 && hour < 18;

        // Calculate offset
        const localOffset = date.getTimezoneOffset();
        const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
        const diff = Math.round((tzDate - date) / (1000 * 60 * 60));
        const offsetStr = diff >= 0 ? `+${diff}` : `${diff}`;

        return { time, date: dateStr, isDay, offset: offsetStr };
      }

      function updateClocks() {
        // Update local time
        const now = new Date();
        document.getElementById("localTime").textContent = formatTime(now);
        document.getElementById("localDate").textContent = formatDate(now);
        document.getElementById("localTimezone").textContent =
          Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Update city clocks
        const grid = document.getElementById("clocksGrid");
        grid.innerHTML = cities
          .map((tz) => {
            const info = getTimeInTimezone(tz);
            const name = cityNames[tz] || tz;
            return `
          <div class="clock-card ${info.isDay ? "day" : "night"}">
            <button class="remove-btn" onclick="removeCity('${tz}')" aria-label="×">×</button>
            <div class="city">${name}</div>
            <div class="tz-name">${tz}</div>
            <div class="time">${info.time}</div>
            <div class="date">${info.date}</div>
            <div class="offset">与本地时差: ${info.offset} 小时</div>
          </div>
        `;
          })
          .join("");
      }

      function addCity() {
        const select = document.getElementById("citySelect");
        const tz = select.value;
        if (tz && !cities.includes(tz)) {
          cities.push(tz);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
          updateClocks();
        }
        select.value = "";
      }

      function removeCity(tz) {
        cities = cities.filter((c) => c !== tz);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
        updateClocks();
      }

      updateClocks();
      setInterval(updateClocks, 1000);

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
