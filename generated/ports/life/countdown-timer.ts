// @ts-nocheck
// Generated from tools/life/countdown-timer.html
// Source SHA-256: f14a2ea09d2c6eaebfd90f5b75e8102d76b68902d4584a4aade80a5ce7ce8a9a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let timer = null;
      let remaining = 0;
      let total = 0;
      let isPaused = false;

      function formatTime(secs) {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }

      function updateDisplay() {
        document.getElementById("timeDisplay").textContent = formatTime(remaining);
        const progress = total > 0 ? ((total - remaining) / total) * 100 : 0;
        document.getElementById("progressFill").style.width = progress + "%";
      }

      function startTimer() {
        if (timer && !isPaused) return;

        if (!isPaused) {
          const h = parseInt(document.getElementById("hours").value) || 0;
          const m = parseInt(document.getElementById("minutes").value) || 0;
          const s = parseInt(document.getElementById("seconds").value) || 0;
          total = h * 3600 + m * 60 + s;
          remaining = total;
        }

        if (remaining <= 0) return;

        isPaused = false;
        document.getElementById("timeInputs").style.opacity = "0.5";
        document.getElementById("timeInputs").style.pointerEvents = "none";
        document.getElementById("startBtn").disabled = true;
        document.getElementById("pauseBtn").disabled = false;
        document.getElementById("statusLabel").textContent = "倒计时中...";
        document.getElementById("display").classList.remove("finished");

        timer = setInterval(() => {
          remaining--;
          updateDisplay();

          if (remaining <= 0) {
            clearInterval(timer);
            timer = null;
            onFinished();
          }
        }, 1000);
      }

      function pauseTimer() {
        if (!timer) return;

        clearInterval(timer);
        timer = null;
        isPaused = true;

        document.getElementById("startBtn").disabled = false;
        document.getElementById("startBtn").textContent = "继续";
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("statusLabel").textContent = "已暂停";
      }

      function resetTimer() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }

        remaining = 0;
        total = 0;
        isPaused = false;

        document.getElementById("timeDisplay").textContent = "00:00:00";
        document.getElementById("progressFill").style.width = "0%";
        document.getElementById("timeInputs").style.opacity = "1";
        document.getElementById("timeInputs").style.pointerEvents = "auto";
        document.getElementById("startBtn").disabled = false;
        document.getElementById("startBtn").textContent = "开始";
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("statusLabel").textContent = "设置时间开始倒计时";
        document.getElementById("display").classList.remove("finished");

        document.title = "倒计时器 - WebUtils";
      }

      function onFinished() {
        document.getElementById("display").classList.add("finished");
        document.getElementById("statusLabel").textContent = "时间到！";
        document.getElementById("startBtn").disabled = false;
        document.getElementById("startBtn").textContent = "开始";
        document.getElementById("pauseBtn").disabled = true;
        document.getElementById("timeInputs").style.opacity = "1";
        document.getElementById("timeInputs").style.pointerEvents = "auto";

        document.title = "⏰ 时间到！";

        // Try to play sound and show notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("倒计时结束", { body: "时间到！", icon: "⏰" });
        }

        // Vibrate if supported
        if ("vibrate" in navigator) {
          navigator.vibrate([200, 100, 200, 100, 200]);
        }
      }

      function setPreset(minutes, seconds) {
        document.getElementById("hours").value = Math.floor(minutes / 60);
        document.getElementById("minutes").value = minutes % 60;
        document.getElementById("seconds").value = seconds;
      }

      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }

      // Update title with remaining time
      setInterval(() => {
        if (timer && remaining > 0) {
          document.title = `${formatTime(remaining)} - 倒计时`;
        }
      }, 1000);

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
    
