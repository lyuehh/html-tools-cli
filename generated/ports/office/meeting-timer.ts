// @ts-nocheck
// Generated from tools/office/meeting-timer.html
// Source SHA-256: c9a00146e89a563eff77ddf643e5866f001454bf6619d1fd9067a48da8a18edc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let timer = null;
      let totalSeconds = 0;
      let remainingSeconds = 0;

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

      function updateDisplay() {
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
        const display = document.getElementById("timerDisplay");
        display.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

        if (remainingSeconds <= 60 && remainingSeconds > 0) {
          display.classList.add("warning");
        } else {
          display.classList.remove("warning");
        }
      }

      function startTimer() {
        if (!timer) {
          const m = parseInt(document.getElementById("minutes").value) || 0;
          const s = parseInt(document.getElementById("seconds").value) || 0;
          totalSeconds = m * 60 + s;
          if (remainingSeconds === 0) remainingSeconds = totalSeconds;

          if (remainingSeconds <= 0) return;

          document.getElementById("startBtn").style.display = "none";
          document.getElementById("stopBtn").style.display = "block";

          timer = setInterval(() => {
            remainingSeconds--;
            updateDisplay();

            if (remainingSeconds <= 0) {
              stopTimer();
              playAlert();
            }
          }, 1000);
        }
      }

      function stopTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
          document.getElementById("startBtn").style.display = "block";
          document.getElementById("stopBtn").style.display = "none";
        }
      }

      function resetTimer() {
        stopTimer();
        remainingSeconds = 0;
        document.getElementById("timerDisplay").textContent = "00:00";
        document.getElementById("timerDisplay").classList.remove("warning");
      }

      function setTime(m, s) {
        resetTimer();
        document.getElementById("minutes").value = m;
        document.getElementById("seconds").value = s;
        remainingSeconds = m * 60 + s;
        updateDisplay();
      }

      function playAlert() {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("⏱️ 会议时间到！", { body: "计时器已结束" });
        }
        alert("⏱️ 会议时间到！");
      }

      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }
    
