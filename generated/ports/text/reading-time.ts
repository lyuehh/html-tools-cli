// @ts-nocheck
// Generated from tools/text/reading-time.html
// Source SHA-256: e6ea0ac71aa130bc2fe8468347f6a14af789632fe0e856b1bbbac9ba230ff629
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const $ = (id) => document.getElementById(id);
      window.analyze = function () {
        const text = $("inputText").value;
        const speed = parseInt($("readSpeed").value) || 300;
        const speedUnit = $("speedUnit").value;
        const langType = $("langType").value;
        // Character counts
        const zhChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const enChars = (text.match(/[a-zA-Z]/g) || []).length;
        const numChars = (text.match(/[0-9]/g) || []).length;
        const punctChars = (text.match(/[，。！？、；：""''（）【】《》\.,!?;:'"()\[\]{}]/g) || [])
          .length;
        const spaces = (text.match(/\s/g) || []).length;
        const enWords = (text.match(/[a-zA-Z]+/g) || []).length;
        // Basic stats
        const totalChars = text.length;
        const lines = text.split("\n").length;
        const paras = text.split(/\n\s*\n/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);
        // Calculate reading time
        let readingMinutes = 0;
        if (langType === "zh") {
          readingMinutes = zhChars / speed;
        } else if (langType === "en") {
          readingMinutes = speedUnit === "wpm" ? enWords / speed : enChars / speed;
        } else {
          // Mixed: Chinese chars + English words
          const zhTime = zhChars / 300;
          const enTime = enWords / 200;
          readingMinutes = zhTime + enTime;
        }
        // Update UI
        $("readingTime").textContent = Math.max(1, Math.ceil(readingMinutes));
        $("charCount").textContent = totalChars;
        $("wordCount").textContent = zhChars + enWords;
        $("paraCount").textContent = paras;
        $("lineCount").textContent = lines;
        $("zhCount").textContent = zhChars;
        $("enCount").textContent = enChars;
        $("numCount").textContent = numChars;
        $("punctCount").textContent = punctChars;
        $("spaceCount").textContent = spaces;
        $("enWordCount").textContent = enWords;
      };
      $("inputText").oninput = analyze;
      $("readSpeed").oninput = analyze;
      $("speedUnit").onchange = analyze;
      $("langType").onchange = analyze;
      function loadTheme() {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", t);
        $("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
        $("themeToggle").textContent = n === "dark" ? "☀️" : "🌙";
      };
      $("themeToggle").onclick = toggleTheme;
      loadTheme();
    
