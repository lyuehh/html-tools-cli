// @ts-nocheck
// Generated from tools/photography/golden-hour.html
// Source SHA-256: 584606bbd304d71e5dcc1e5d9d197074900d8b1ff91ca066286608a1439cdcde
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Simplified sun position calculator (approximate)
      function getSunTimes(lat, lng, date) {
        const J2000 = 2451545.0;
        const deg2rad = Math.PI / 180;

        // Convert date to Julian date
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        const a = Math.floor((14 - m) / 12);
        const y2 = y + 4800 - a;
        const m2 = m + 12 * a - 3;

        const jd =
          d +
          Math.floor((153 * m2 + 2) / 5) +
          365 * y2 +
          Math.floor(y2 / 4) -
          Math.floor(y2 / 100) +
          Math.floor(y2 / 400) -
          32045;

        const n = jd - J2000;
        const meanAnomaly = (357.5291 + 0.98560028 * n) % 360;
        const center =
          1.9148 * Math.sin(meanAnomaly * deg2rad) + 0.02 * Math.sin(2 * meanAnomaly * deg2rad);
        const eclipticLongitude = (meanAnomaly + center + 180 + 102.9372) % 360;

        // Solar noon
        const solarNoon = 12 - lng / 15;

        // Hour angle for sunrise/sunset (approximate)
        const hourAngle = Math.acos(
          -Math.tan(lat * deg2rad) *
            Math.tan(23.44 * deg2rad * Math.sin(eclipticLongitude * deg2rad))
        );
        const hourAngleDeg = hourAngle / deg2rad / 15;

        const sunrise = solarNoon - hourAngleDeg;
        const sunset = solarNoon + hourAngleDeg;

        // Calculate golden hour and blue hour times
        const times = {
          blueHourStart: sunrise - 0.5, // 30 min before sunrise
          blueHourEnd: sunrise + 0.17, // 10 min after sunrise
          goldenHourStart: sunrise,
          goldenHourEnd: sunrise + 1, // 1 hour after sunrise
          sunrise: sunrise,
          sunset: sunset,
          goldenHourEvening: sunset - 1, // 1 hour before sunset
          sunsetEnd: sunset,
          blueHourEvening: sunset + 0.17, // 10 min after sunset
          blueHourEveningEnd: sunset + 0.5 // 30 min after sunset
        };

        return times;
      }

      function formatTime(decimalHours) {
        let hours = Math.floor(decimalHours);
        let minutes = Math.round((decimalHours - hours) * 60);

        if (minutes === 60) {
          hours += 1;
          minutes = 0;
        }

        if (hours >= 24) hours -= 24;
        if (hours < 0) hours += 24;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      }

      function calculate() {
        const lat = parseFloat(document.getElementById("latitude").value);
        const lng = parseFloat(document.getElementById("longitude").value);
        const dateStr = document.getElementById("date").value;
        const date = dateStr ? new Date(dateStr) : new Date();

        if (isNaN(lat) || isNaN(lng)) {
          alert("请输入有效的经纬度");
          return;
        }

        const times = getSunTimes(lat, lng, date);

        const timeline = [
          {
            icon: "🌌",
            name: "晨曦蓝调时刻",
            desc: "拍摄城市夜景的最佳时段",
            time: `${formatTime(times.blueHourStart)} - ${formatTime(times.blueHourEnd)}`,
            class: "blue"
          },
          {
            icon: "🌅",
            name: "日出",
            desc: "太阳升起的时刻",
            time: formatTime(times.sunrise),
            class: "sunrise"
          },
          {
            icon: "✨",
            name: "晨间黄金时刻",
            desc: "柔和温暖的光线",
            time: `${formatTime(times.goldenHourStart)} - ${formatTime(times.goldenHourEnd)}`,
            class: "golden"
          },
          {
            icon: "🌆",
            name: "傍晚黄金时刻",
            desc: "一天中最佳摄影时段",
            time: `${formatTime(times.goldenHourEvening)} - ${formatTime(times.sunset)}`,
            class: "golden"
          },
          {
            icon: "🌇",
            name: "日落",
            desc: "太阳落下的时刻",
            time: formatTime(times.sunset),
            class: "sunset"
          },
          {
            icon: "🌃",
            name: "黄昏蓝调时刻",
            desc: "拍摄都市夜景的黄金时段",
            time: `${formatTime(times.blueHourEvening)} - ${formatTime(times.blueHourEveningEnd)}`,
            class: "blue"
          }
        ];

        const container = document.getElementById("timeline");
        container.innerHTML = timeline
          .map(
            (item) => `
        <div class="timeline-item ${item.class}">
          <div class="timeline-label">
            <div class="timeline-icon">${item.icon}</div>
            <div>
              <div class="timeline-name">${item.name}</div>
              <div class="timeline-desc">${item.desc}</div>
            </div>
          </div>
          <div class="timeline-time">${item.time}</div>
        </div>
      `
          )
          .join("");
      }

      // Initialize with today's date
      document.getElementById("date").value = new Date().toISOString().split("T")[0];
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
