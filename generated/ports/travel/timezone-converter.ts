// @ts-nocheck
// Generated from tools/travel/timezone-converter.html
// Source SHA-256: 23b03a6d1fbd3005859dcc89df353a660d4a645c03c308841b6dab5d0cd01e3b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute("data-theme") !== "light";
        body.setAttribute("data-theme", isDark ? "light" : "dark");
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "light") document.body.setAttribute("data-theme", "light");
      })();

      function updateLocalTime() {
        const now = new Date();
        document.getElementById("localTime").textContent = now.toLocaleTimeString("zh-CN", {
          hour12: false
        });
        document.getElementById("localDate").textContent = now.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        });
      }

      function convertTime() {
        const fromTime = document.getElementById("fromTime").value;
        if (!fromTime) return;

        const fromTz = document.getElementById("fromTz").value;
        const toTz = document.getElementById("toTz").value;

        // 将输入时间解析为源时区的时间，然后转换到目标时区
        // 使用 Intl.DateTimeFormat 获取源时区的当前偏移量来正确解析输入时间
        const inputDate = new Date(fromTime);

        // 获取源时区和本地时区的偏移差
        const localFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timeZoneName: "shortOffset"
        });
        const fromFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: fromTz,
          timeZoneName: "shortOffset"
        });

        // 通过格式化同一时间点获取偏移信息
        const localParts = localFormatter.formatToParts(inputDate);
        const fromParts = fromFormatter.formatToParts(inputDate);

        const getOffset = (parts) => {
          const tzPart = parts.find((p) => p.type === "timeZoneName");
          if (!tzPart) return 0;
          const match = tzPart.value.match(/GMT([+-]?)(\d+)?:?(\d+)?/);
          if (!match) return 0;
          const sign = match[1] === "-" ? -1 : 1;
          const hours = parseInt(match[2] || "0", 10);
          const mins = parseInt(match[3] || "0", 10);
          return sign * (hours * 60 + mins);
        };

        const localOffset = getOffset(localParts);
        const fromOffset = getOffset(fromParts);
        const offsetDiff = (fromOffset - localOffset) * 60 * 1000;

        // 调整时间：将本地时区解析的时间调整为源时区的时间
        const adjustedDate = new Date(inputDate.getTime() - offsetDiff);

        const toTime = adjustedDate.toLocaleTimeString("zh-CN", { timeZone: toTz, hour12: false });
        const toDate = adjustedDate.toLocaleDateString("zh-CN", {
          timeZone: toTz,
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        });

        document.getElementById("toTime").textContent = toTime;
        document.getElementById("toDate").textContent = toDate;
      }

      document.getElementById("fromTime").addEventListener("change", convertTime);
      document.getElementById("fromTz").addEventListener("change", convertTime);
      document.getElementById("toTz").addEventListener("change", convertTime);

      setInterval(updateLocalTime, 1000);
      updateLocalTime();

      const now = new Date();
      document.getElementById("fromTime").value = now.toISOString().slice(0, 16);
      convertTime();
    
