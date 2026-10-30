// @ts-nocheck
// Generated from tools/health/sleep-calculator.html
// Source SHA-256: 89290d426d7a51bfd1e7e4bc22f415a7eb7d7369477ee55d206a45df8742bd6e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "wake";

      function setMode(m) {
        mode = m;
        document
          .querySelectorAll(".tab")
          .forEach((t) => t.classList.toggle("active", t.dataset.mode === m));

        const timeInputGroup = document.getElementById("timeInputGroup");

        if (m === "now") {
          timeInputGroup.style.display = "none";
          document.getElementById("inputTitle").textContent = "从现在开始计算";
        } else {
          timeInputGroup.style.display = "block";
          if (m === "wake") {
            document.getElementById("inputTitle").textContent = "设置起床时间";
            document.getElementById("timeLabel").textContent = "起床时间";
          } else {
            document.getElementById("inputTitle").textContent = "设置入睡时间";
            document.getElementById("timeLabel").textContent = "入睡时间";
          }
        }

        calculate();
      }

      function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
      }

      function calculate() {
        const fallAsleepTime = parseInt(document.getElementById("fallAsleepTime").value) || 14;
        const cycleLength = parseInt(document.getElementById("cycleLength").value) || 90;

        document.getElementById("cycleLengthDisplay").textContent = cycleLength + " 分钟";

        let targetTime;

        if (mode === "now") {
          targetTime = new Date();
        } else {
          const hour = parseInt(document.getElementById("hour").value) || 0;
          const minute = parseInt(document.getElementById("minute").value) || 0;
          targetTime = new Date();
          targetTime.setHours(hour, minute, 0, 0);
        }

        const times = [];

        if (mode === "wake" || mode === "now") {
          // 计算入睡时间
          document.getElementById("resultLabel").textContent = "建议入睡时间";
          document.getElementById("timesTitle").textContent = "建议入睡时间";

          if (mode === "now") {
            // 从现在开始，计算最佳起床时间
            document.getElementById("resultLabel").textContent = "建议起床时间";
            document.getElementById("timesTitle").textContent = "建议起床时间";

            const sleepStart = new Date(targetTime.getTime() + fallAsleepTime * 60 * 1000);

            for (let cycles = 6; cycles >= 3; cycles--) {
              const wakeTime = new Date(sleepStart.getTime() + cycles * cycleLength * 60 * 1000);
              const sleepHours = ((cycles * cycleLength) / 60).toFixed(1);
              times.push({
                time: wakeTime,
                cycles: cycles,
                hours: sleepHours,
                quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "fair"
              });
            }
          } else {
            // 根据起床时间计算入睡时间
            for (let cycles = 6; cycles >= 3; cycles--) {
              const sleepTime = new Date(
                targetTime.getTime() - (cycles * cycleLength + fallAsleepTime) * 60 * 1000
              );
              const sleepHours = ((cycles * cycleLength) / 60).toFixed(1);
              times.push({
                time: sleepTime,
                cycles: cycles,
                hours: sleepHours,
                quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "fair"
              });
            }
          }
        } else {
          // 根据入睡时间计算起床时间
          document.getElementById("resultLabel").textContent = "建议起床时间";
          document.getElementById("timesTitle").textContent = "建议起床时间";

          const sleepStart = new Date(targetTime.getTime() + fallAsleepTime * 60 * 1000);

          for (let cycles = 6; cycles >= 3; cycles--) {
            const wakeTime = new Date(sleepStart.getTime() + cycles * cycleLength * 60 * 1000);
            const sleepHours = ((cycles * cycleLength) / 60).toFixed(1);
            times.push({
              time: wakeTime,
              cycles: cycles,
              hours: sleepHours,
              quality: cycles >= 5 ? "optimal" : cycles >= 4 ? "good" : "fair"
            });
          }
        }

        // 显示最佳时间
        if (times.length > 0) {
          const best = times.find((t) => t.quality === "optimal") || times[0];
          document.getElementById("resultTime").textContent = formatTime(best.time);
          document.getElementById("resultNote").textContent =
            best.cycles + "个睡眠周期，约" + best.hours + "小时";
        }

        // 渲染所有建议时间
        renderSuggestedTimes(times);
      }

      function renderSuggestedTimes(times) {
        const container = document.getElementById("suggestedTimes");
        container.textContent = "";

        times.forEach((item) => {
          const div = document.createElement("div");
          div.className = "wake-time " + item.quality;

          const timeDiv = document.createElement("div");
          timeDiv.className = "time";
          timeDiv.textContent = formatTime(item.time);

          const cyclesDiv = document.createElement("div");
          cyclesDiv.className = "cycles";
          cyclesDiv.textContent = item.cycles + "个周期";

          const hoursDiv = document.createElement("div");
          hoursDiv.className = "hours";
          hoursDiv.textContent = item.hours + "小时睡眠";

          div.appendChild(timeDiv);
          div.appendChild(cyclesDiv);
          div.appendChild(hoursDiv);
          container.appendChild(div);
        });
      }

      calculate();

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
    
