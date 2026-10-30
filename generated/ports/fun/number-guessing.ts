// @ts-nocheck
// Generated from tools/fun/number-guessing.html
// Source SHA-256: 577ebfa37fc5807467719a2e54f5c8b2381c182a67057efe977be95a07660752
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let target, attempts;
      function newGame() {
        target = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        document.getElementById("attempts").textContent = "0";
        document.getElementById("hint").textContent = "开始猜测吧!";
        document.getElementById("hint").className = "hint";
        document.getElementById("guess").value = "";
      }
      function checkGuess() {
        const guess = parseInt(document.getElementById("guess").value);
        if (isNaN(guess) || guess < 1 || guess > 100) {
          document.getElementById("hint").textContent = "请输入1-100的数字";
          return;
        }
        attempts++;
        document.getElementById("attempts").textContent = attempts;
        const hint = document.getElementById("hint");
        if (guess === target) {
          hint.textContent = "🎉 正确! 用了 " + attempts + " 次";
          hint.className = "hint win";
        } else if (guess > target) {
          hint.textContent = "太大了! 往小猜";
          hint.className = "hint high";
        } else {
          hint.textContent = "太小了! 往大猜";
          hint.className = "hint low";
        }
      }
      document.getElementById("guess").onkeypress = (e) => {
        if (e.key === "Enter") checkGuess();
      };
      newGame();

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
    
