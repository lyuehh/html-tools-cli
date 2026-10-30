// @ts-nocheck
// Generated from tools/travel/jet-lag-calc.html
// Source SHA-256: 552fc9c1c18b4118e4d67e71d13f2a64e23e010fa660ee85767c5a0722f4ed96
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function getTimezoneOffset(timezone) {
        const now = new Date();
        const utc = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
        const tz = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
        return (tz - utc) / (1000 * 60 * 60);
      }

      function formatTime(date, timezone) {
        return date.toLocaleTimeString("zh-CN", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
      }

      function formatDate(date, timezone) {
        return date.toLocaleDateString("zh-CN", {
          timeZone: timezone,
          weekday: "short",
          month: "short",
          day: "numeric"
        });
      }

      function calculate() {
        const fromSelect = document.getElementById("fromCity");
        const toSelect = document.getElementById("toCity");
        const fromTz = fromSelect.value;
        const toTz = toSelect.value;
        const fromName = fromSelect.options[fromSelect.selectedIndex].dataset.name;
        const toName = toSelect.options[toSelect.selectedIndex].dataset.name;

        const now = new Date();

        // Update city names
        document.getElementById("fromCityName").textContent = fromName;
        document.getElementById("toCityName").textContent = toName;

        // Update times
        document.getElementById("fromTime").textContent = formatTime(now, fromTz);
        document.getElementById("fromDate").textContent = formatDate(now, fromTz);
        document.getElementById("toTime").textContent = formatTime(now, toTz);
        document.getElementById("toDate").textContent = formatDate(now, toTz);

        // Calculate difference
        const fromOffset = getTimezoneOffset(fromTz);
        const toOffset = getTimezoneOffset(toTz);
        const diff = toOffset - fromOffset;
        const absDiff = Math.abs(diff);

        document.getElementById("timeDiff").textContent = `${absDiff} 小时`;

        if (diff > 0) {
          document.getElementById("diffDirection").textContent =
            `${toName} 比 ${fromName} 快 ${absDiff} 小时`;
        } else if (diff < 0) {
          document.getElementById("diffDirection").textContent =
            `${toName} 比 ${fromName} 慢 ${absDiff} 小时`;
        } else {
          document.getElementById("diffDirection").textContent = "两地时间相同";
        }

        // Generate tips
        generateTips(absDiff, diff);
      }

      function generateTips(hours, direction) {
        const tipsList = document.getElementById("tipsList");
        const tips = [];

        if (hours === 0) {
          tips.push({ icon: "✨", text: "两地没有时差，不需要调整！" });
        } else {
          // Adjustment days
          const adjustDays = Math.ceil(hours / 1.5);
          tips.push({
            icon: "📅",
            text: `预计需要 ${adjustDays} 天来完全适应时差`
          });

          // Sleep advice
          if (direction > 0) {
            tips.push({
              icon: "😴",
              text: "向东飞行：提前几天每晚早睡1-2小时，帮助身体提前适应"
            });
          } else {
            tips.push({
              icon: "😴",
              text: "向西飞行：提前几天每晚晚睡1-2小时，帮助身体提前适应"
            });
          }

          // Flight advice
          if (hours > 6) {
            tips.push({
              icon: "✈️",
              text: "长途飞行建议选择夜间航班，在飞机上睡觉以减轻时差反应"
            });
          }

          // Light exposure
          tips.push({
            icon: "☀️",
            text: "到达后多接触自然光，有助于调整生物钟"
          });

          // Hydration
          tips.push({
            icon: "💧",
            text: "多喝水，避免咖啡因和酒精，保持身体水分充足"
          });

          // Meal timing
          tips.push({
            icon: "🍽️",
            text: "尽快按照当地时间用餐，帮助身体适应新的作息"
          });

          if (hours > 8) {
            tips.push({
              icon: "⏰",
              text: "考虑在出发前几天开始逐步调整作息时间"
            });
          }
        }

        tipsList.innerHTML = tips
          .map(
            (tip) => `
        <div class="tip-item">
          <span class="tip-icon">${tip.icon}</span>
          <span class="tip-text">${tip.text}</span>
        </div>
      `
          )
          .join("");
      }

      function swapCities() {
        const fromSelect = document.getElementById("fromCity");
        const toSelect = document.getElementById("toCity");
        const fromValue = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = fromValue;
        calculate();
      }

      document.getElementById("fromCity").addEventListener("change", calculate);
      document.getElementById("toCity").addEventListener("change", calculate);

      // Update time every second
      setInterval(calculate, 1000);

      // Initial calculation
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
    
