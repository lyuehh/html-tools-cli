// @ts-nocheck
// Generated from tools/fun/stopwatch.html
// Source SHA-256: 04b10241341f0e8ccef22e394e8117ee794cec5fb8e99e7462d8258411fe07fa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let startTime = 0,
        elapsedTime = 0,
        interval = null,
        isRunning = false;
      let laps = [],
        lapStartTime = 0;

      function formatTime(ms) {
        const h = Math.floor(ms / 3600000);
        const m = Math.floor((ms % 3600000) / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        const cs = Math.floor((ms % 1000) / 10);
        return {
          main:
            (h > 0 ? h.toString().padStart(2, "0") + ":" : "") +
            m.toString().padStart(2, "0") +
            ":" +
            s.toString().padStart(2, "0"),
          ms: "." + cs.toString().padStart(2, "0")
        };
      }

      function updateDisplay() {
        const time = formatTime(elapsedTime);
        document.getElementById("display").textContent = time.main;
        document.getElementById("displayMs").textContent = time.ms;
      }

      function start() {
        if (!isRunning) {
          isRunning = true;
          startTime = Date.now() - elapsedTime;
          if (lapStartTime === 0) lapStartTime = startTime;
          interval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
          }, 10);
          document.getElementById("startBtn").textContent = "暂停";
          document.getElementById("startBtn").className = "btn btn-pause";
          document.getElementById("lapBtn").disabled = false;
        } else {
          isRunning = false;
          clearInterval(interval);
          document.getElementById("startBtn").textContent = "继续";
          document.getElementById("startBtn").className = "btn btn-start";
        }
      }

      function lap() {
        if (!isRunning) return;
        const lapTime = elapsedTime;
        const diff = lapTime - (laps.length > 0 ? laps[laps.length - 1].total : 0);
        laps.push({ total: lapTime, diff: diff });
        renderLaps();
      }

      function reset() {
        isRunning = false;
        clearInterval(interval);
        elapsedTime = 0;
        lapStartTime = 0;
        laps = [];
        updateDisplay();
        document.getElementById("laps").innerHTML = "";
        document.getElementById("startBtn").textContent = "开始";
        document.getElementById("startBtn").className = "btn btn-start";
        document.getElementById("lapBtn").disabled = true;
      }

      function renderLaps() {
        if (laps.length === 0) return;
        const diffs = laps.map((l) => l.diff);
        const minDiff = Math.min(...diffs);
        const maxDiff = Math.max(...diffs);

        document.getElementById("laps").innerHTML = laps
          .map((lap, i) => {
            const time = formatTime(lap.total);
            const diffTime = formatTime(lap.diff);
            let cls = "";
            if (laps.length > 2) {
              if (lap.diff === minDiff) cls = "lap-best";
              else if (lap.diff === maxDiff) cls = "lap-worst";
            }
            return `<div class="lap-item ${cls}">
                    <span class="lap-number">计次 ${i + 1}</span>
                    <span class="lap-diff">+${diffTime.main}${diffTime.ms}</span>
                    <span class="lap-time">${time.main}${time.ms}</span>
                </div>`;
          })
          .reverse()
          .join("");
      }

      updateDisplay();

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
    
