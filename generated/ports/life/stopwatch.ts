// @ts-nocheck
// Generated from tools/life/stopwatch.html
// Source SHA-256: 56b6fffcc93c2e9ba232f3ca915b3160ae413f034df420854062283b8bf5a1e0
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let startTime = 0;
      let elapsedTime = 0;
      let timerInterval = null;
      let isRunning = false;
      let laps = [];
      let lastLapTime = 0;

      function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);

        return {
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
          milliseconds: milliseconds.toString().padStart(2, "0")
        };
      }

      function updateDisplay() {
        const time = formatTime(elapsedTime);
        document.getElementById("minutes").textContent = time.minutes;
        document.getElementById("seconds").textContent = time.seconds;
        document.getElementById("milliseconds").textContent = time.milliseconds;
      }

      function startStop() {
        if (isRunning) {
          // Stop
          clearInterval(timerInterval);
          isRunning = false;
          document.getElementById("startBtn").textContent = "继续";
          document.getElementById("startBtn").className = "btn success";
          document.getElementById("lapBtn").disabled = true;
        } else {
          // Start
          startTime = Date.now() - elapsedTime;
          timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
          }, 10);
          isRunning = true;
          document.getElementById("startBtn").textContent = "停止";
          document.getElementById("startBtn").className = "btn danger";
          document.getElementById("lapBtn").disabled = false;
        }
      }

      function recordLap() {
        if (!isRunning) return;

        const lapTime = elapsedTime - lastLapTime;
        lastLapTime = elapsedTime;

        laps.unshift({
          number: laps.length + 1,
          total: elapsedTime,
          lap: lapTime
        });

        renderLaps();
      }

      function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lastLapTime = 0;
        laps = [];

        updateDisplay();
        renderLaps();

        document.getElementById("startBtn").textContent = "开始";
        document.getElementById("startBtn").className = "btn primary";
        document.getElementById("lapBtn").disabled = true;
      }

      function renderLaps() {
        const container = document.getElementById("lapsList");
        document.getElementById("lapCount").textContent = `${laps.length} 圈`;

        if (laps.length === 0) {
          container.innerHTML = '<div class="empty">按分圈按钮记录时间</div>';
          return;
        }

        // Find best and worst lap
        const lapTimes = laps.map((l) => l.lap);
        const bestLap = Math.min(...lapTimes);
        const worstLap = Math.max(...lapTimes);

        container.innerHTML = laps
          .map((lap, i) => {
            const time = formatTime(lap.total);
            const lapTimeFormatted = formatTime(lap.lap);
            const lapNumber = laps.length - i;

            let className = "lap-item";
            if (laps.length > 2) {
              if (lap.lap === bestLap) className += " best";
              else if (lap.lap === worstLap) className += " worst";
            }

            return `
          <div class="${className}">
            <span class="number">#${lapNumber}</span>
            <span class="time">${time.minutes}:${time.seconds}.${time.milliseconds}</span>
            <span class="diff">+${lapTimeFormatted.minutes}:${lapTimeFormatted.seconds}.${lapTimeFormatted.milliseconds}</span>
          </div>
        `;
          })
          .join("");
      }

      // Keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          e.preventDefault();
          startStop();
        } else if (e.code === "KeyL" && isRunning) {
          recordLap();
        } else if (e.code === "KeyR") {
          reset();
        }
      });

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
    
