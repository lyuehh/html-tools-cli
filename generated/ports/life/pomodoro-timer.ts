// @ts-nocheck
// Generated from tools/life/pomodoro-timer.html
// Source SHA-256: d9a03479ef8d431dfe62e304641aefc9996895ae11cbdd268f49fa999a6183c2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let mode = "work";
      let isRunning = false;
      let timeLeft = 25 * 60;
      let totalSeconds = 25 * 60;
      let interval = null;
      let completedPomodoros = 0;
      let totalMinutes = 0;
      const modes = {
        work: { time: 25, label: "专注工作", color: "#e74c3c" },
        shortBreak: { time: 5, label: "短休息", color: "#27ae60" },
        longBreak: { time: 15, label: "长休息", color: "#3498db" }
      };
      function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        document.getElementById("time").textContent =
          `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        const progress = (1 - timeLeft / totalSeconds) * 691.15;
        document.getElementById("progress").style.strokeDashoffset = progress;
        document.title = `${mins}:${secs.toString().padStart(2, "0")} - 番茄钟`;
      }
      function setMode(newMode) {
        mode = newMode;
        document.querySelectorAll(".mode-tab").forEach((tab, i) => {
          tab.classList.toggle("active", ["work", "shortBreak", "longBreak"][i] === newMode);
        });
        document.getElementById("progress").style.stroke = modes[mode].color;
        document.getElementById("modeLabel").textContent = modes[mode].label;
        reset();
      }
      function updateSettings() {
        modes.work.time = parseInt(document.getElementById("workTime").value) || 25;
        modes.shortBreak.time = parseInt(document.getElementById("shortBreakTime").value) || 5;
        modes.longBreak.time = parseInt(document.getElementById("longBreakTime").value) || 15;
        reset();
      }
      function toggle() {
        isRunning = !isRunning;
        document.getElementById("playBtn").textContent = isRunning ? "⏸" : "▶";
        if (isRunning) {
          interval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
              clearInterval(interval);
              isRunning = false;
              document.getElementById("playBtn").textContent = "▶";
              if (mode === "work") {
                completedPomodoros++;
                totalMinutes += modes.work.time;
                document.getElementById("completedCount").textContent = completedPomodoros;
                document.getElementById("totalTime").textContent = totalMinutes;
                new Audio(
                  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleT0APYq95cmrYiQMXKvI9NChaCA="
                )
                  .play()
                  .catch(() => {});
              }
              alert(mode === "work" ? "工作时间结束，休息一下吧！" : "休息结束，开始工作！");
            }
          }, 1000);
        } else {
          clearInterval(interval);
        }
      }
      function reset() {
        clearInterval(interval);
        isRunning = false;
        document.getElementById("playBtn").textContent = "▶";
        timeLeft = modes[mode].time * 60;
        totalSeconds = timeLeft;
        updateDisplay();
      }
      function skip() {
        const nextMode =
          mode === "work" ? (completedPomodoros % 4 === 3 ? "longBreak" : "shortBreak") : "work";
        setMode(nextMode);
      }
      updateDisplay();
    
