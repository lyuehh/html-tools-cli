// @ts-nocheck
// Generated from tools/life/pomodoro.html
// Source SHA-256: 352deadd69c5bbbb8fb05bc0ffc076b1065a3dbc6e9d5360b8a08a8fc28e96fe
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const times = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
      let mode = "work",
        timeLeft = times.work,
        running = false,
        interval,
        count = 0;
      function updateDisplay() {
        const m = Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0");
        const s = (timeLeft % 60).toString().padStart(2, "0");
        document.getElementById("timer").textContent = m + ":" + s;
      }
      function toggleTimer() {
        if (running) {
          clearInterval(interval);
          running = false;
          document.getElementById("startBtn").textContent = "继续";
        } else {
          running = true;
          document.getElementById("startBtn").textContent = "暂停";
          interval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
              clearInterval(interval);
              running = false;
              if (mode === "work") {
                count++;
                document.getElementById("count").textContent = count;
              }
              new Audio(
                "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQQJQ5ri8cJsCQlMn9r72J0AC0id2P7epQYLSJ3Z/96lBgtIndj/3qUGC0id2P/epQYLSJ3Y/96lBgtIndj/3qUGC0id2P/epQ=="
              )
                .play()
                .catch(() => {});
              alert(mode === "work" ? "休息一下!" : "继续工作!");
              document.getElementById("startBtn").textContent = "开始";
            }
            updateDisplay();
          }, 1000);
        }
      }
      function resetTimer() {
        clearInterval(interval);
        running = false;
        timeLeft = times[mode];
        updateDisplay();
        document.getElementById("startBtn").textContent = "开始";
      }
      function setMode(m) {
        mode = m;
        timeLeft = times[m];
        updateDisplay();
        document.querySelectorAll(".setting").forEach((s) => s.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("mode").textContent =
          m === "work" ? "工作时间" : m === "short" ? "短休息" : "长休息";
        clearInterval(interval);
        running = false;
        document.getElementById("startBtn").textContent = "开始";
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
    
