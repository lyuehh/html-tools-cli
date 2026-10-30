// @ts-nocheck
// Generated from tools/time/stopwatch.html
// Source SHA-256: 7b28ff9d2cf160e7a72e6f98ecf52bd1ba51400481a01c4c98b9fb2d8cfd95f1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const display = document.getElementById("display");
      const btnStart = document.getElementById("btnStart");
      const btnLap = document.getElementById("btnLap");
      const btnReset = document.getElementById("btnReset");
      const lapsSection = document.getElementById("lapsSection");
      const lapList = document.getElementById("lapList");

      let startTime = 0;
      let elapsedTime = 0;
      let timerInterval = null;
      let isRunning = false;
      let laps = [];
      let lastLapTime = 0;

      function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        const hh = String(hours).padStart(2, "0");
        const mm = String(minutes).padStart(2, "0");
        const ss = String(seconds).padStart(2, "0");
        const mmm = String(milliseconds).padStart(3, "0");

        return hh + ":" + mm + ":" + ss + '<span class="ms">.' + mmm + "</span>";
      }

      function formatLapTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        const mm = String(minutes).padStart(2, "0");
        const ss = String(seconds).padStart(2, "0");
        const mmm = String(milliseconds).padStart(3, "0");

        return mm + ":" + ss + "." + mmm;
      }

      function updateDisplay() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        display.innerHTML = formatTime(elapsedTime);
      }

      function start() {
        if (!isRunning) {
          startTime = Date.now() - elapsedTime;
          timerInterval = setInterval(updateDisplay, 10);
          isRunning = true;
          btnStart.textContent = "暂停";
          btnStart.className = "btn-stop";
          btnLap.disabled = false;
        } else {
          clearInterval(timerInterval);
          isRunning = false;
          btnStart.textContent = "继续";
          btnStart.className = "btn-start";
        }
      }

      function lap() {
        if (isRunning) {
          const lapTime = elapsedTime - lastLapTime;
          laps.push({
            total: elapsedTime,
            diff: lapTime
          });
          lastLapTime = elapsedTime;
          renderLaps();
        }
      }

      function reset() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lastLapTime = 0;
        laps = [];
        display.innerHTML = formatTime(0);
        btnStart.textContent = "开始";
        btnStart.className = "btn-start";
        btnLap.disabled = true;
        lapsSection.style.display = "none";
        lapList.innerHTML = "";
      }

      function renderLaps() {
        if (laps.length === 0) {
          lapsSection.style.display = "none";
          return;
        }

        lapsSection.style.display = "block";

        // Find best and worst lap times
        let bestIndex = 0;
        let worstIndex = 0;
        let bestTime = laps[0].diff;
        let worstTime = laps[0].diff;

        laps.forEach(function (lap, index) {
          if (lap.diff < bestTime) {
            bestTime = lap.diff;
            bestIndex = index;
          }
          if (lap.diff > worstTime) {
            worstTime = lap.diff;
            worstIndex = index;
          }
        });

        let html = "";
        for (let i = laps.length - 1; i >= 0; i--) {
          const lap = laps[i];
          let className = "lap-item";
          if (laps.length > 2) {
            if (i === bestIndex) className += " best";
            if (i === worstIndex) className += " worst";
          }

          html +=
            '<div class="' +
            className +
            '">' +
            '<span class="lap-num">计次 ' +
            (i + 1) +
            "</span>" +
            '<span class="lap-diff">+' +
            formatLapTime(lap.diff) +
            "</span>" +
            '<span class="lap-time">' +
            formatLapTime(lap.total) +
            "</span>" +
            "</div>";
        }

        lapList.innerHTML = html;
      }

      btnStart.addEventListener("click", start);
      btnLap.addEventListener("click", lap);
      btnReset.addEventListener("click", reset);

      // Keyboard shortcuts
      document.addEventListener("keydown", function (e) {
        if (e.code === "Space") {
          e.preventDefault();
          start();
        } else if (e.code === "KeyL" && isRunning) {
          lap();
        } else if (e.code === "KeyR") {
          reset();
        }
      });

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
