// @ts-nocheck
// Generated from tools/productivity/reading-time.html
// Source SHA-256: a825cc3e7055ee5c6c9803dc56cff0bfaa5a0a11d9cadb7e6149823bc5656d31
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatTime(minutes) {
        if (minutes < 1) {
          return "< 1 分钟";
        } else if (minutes < 60) {
          return Math.round(minutes) + " 分钟";
        } else {
          const hours = Math.floor(minutes / 60);
          const mins = Math.round(minutes % 60);
          return `${hours} 小时 ${mins} 分钟`;
        }
      }

      function countChinese(text) {
        // Count Chinese characters
        const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
        return chineseChars ? chineseChars.length : 0;
      }

      function countEnglishWords(text) {
        // Count English words (sequences of Latin letters)
        const englishWords = text.match(/[a-zA-Z]+/g);
        return englishWords ? englishWords.length : 0;
      }

      function calculate() {
        const text = document.getElementById("textInput").value;
        const speed = parseInt(document.getElementById("speedSelect").value);

        // Character count
        const charCount = text.length;
        document.getElementById("charCount").textContent = charCount.toLocaleString();

        // Word count (Chinese chars + English words)
        const chineseCount = countChinese(text);
        const englishCount = countEnglishWords(text);
        const totalWords = chineseCount + englishCount;
        document.getElementById("wordCount").textContent = totalWords.toLocaleString();

        // Reading time calculation
        if (totalWords === 0) {
          document.getElementById("readingTime").textContent = "0 分钟";
          document.getElementById("slow").textContent = "-";
          document.getElementById("medium").textContent = "-";
          document.getElementById("fast").textContent = "-";
          document.getElementById("veryFast").textContent = "-";
          return;
        }

        const minutes = totalWords / speed;
        document.getElementById("readingTime").textContent = formatTime(minutes);

        // Different speeds
        document.getElementById("slow").textContent = formatTime(totalWords / 200);
        document.getElementById("medium").textContent = formatTime(totalWords / 300);
        document.getElementById("fast").textContent = formatTime(totalWords / 400);
        document.getElementById("veryFast").textContent = formatTime(totalWords / 500);
      }

      // Initialize
      calculate();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
