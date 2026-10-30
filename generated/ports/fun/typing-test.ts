// @ts-nocheck
// Generated from tools/fun/typing-test.html
// Source SHA-256: 9c4b3b1f97d72be0f49ce9dd034eb0373ac527f88b8f762bd4d2d6dc34ccfaaa
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const originalText =
        "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";
      let startTime = null,
        timer = null;
      function checkTyping() {
        const input = document.getElementById("input").value;
        if (!startTime) {
          startTime = Date.now();
          timer = setInterval(updateStats, 100);
        }
        let html = "";
        for (let i = 0; i < originalText.length; i++) {
          if (i < input.length) {
            html +=
              '<span class="' +
              (input[i] === originalText[i] ? "correct" : "incorrect") +
              '">' +
              originalText[i] +
              "</span>";
          } else {
            html += originalText[i];
          }
        }
        document.getElementById("text").innerHTML = html;
        if (input.length >= originalText.length) {
          clearInterval(timer);
        }
      }
      function updateStats() {
        const input = document.getElementById("input").value;
        const elapsed = (Date.now() - startTime) / 1000;
        document.getElementById("time").textContent = Math.floor(elapsed);
        const words = input.trim().split(/\s+/).length;
        document.getElementById("wpm").textContent = Math.round((words / elapsed) * 60) || 0;
        let correct = 0;
        for (let i = 0; i < input.length; i++) {
          if (input[i] === originalText[i]) correct++;
        }
        document.getElementById("accuracy").textContent = input.length
          ? Math.round((correct / input.length) * 100)
          : 100;
      }
      function reset() {
        document.getElementById("input").value = "";
        document.getElementById("text").textContent = originalText;
        startTime = null;
        clearInterval(timer);
        document.getElementById("wpm").textContent = "0";
        document.getElementById("accuracy").textContent = "100";
        document.getElementById("time").textContent = "0";
      }

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
    
