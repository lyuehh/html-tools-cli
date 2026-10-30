// @ts-nocheck
// Generated from tools/text/text-stats.html
// Source SHA-256: 615565a5cbe2b74576336548a1308a6cf2a8c35a5ff6d2db56a46ca015149790
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const inputEl = document.getElementById("input");
      const statsGridEl = document.getElementById("statsGrid");
      const wordFrequencyEl = document.getElementById("wordFrequency");
      const readTimeEl = document.getElementById("readTime");
      const avgSentenceEl = document.getElementById("avgSentence");
      const readabilityEl = document.getElementById("readability");
      const readabilityGradeEl = document.getElementById("readabilityGrade");
      const statusEl = document.getElementById("status");

      function countChineseChars(text) {
        // Match Chinese characters (including punctuation)
        const chineseRegex = /[\u4e00-\u9fff]/g;
        const matches = text.match(chineseRegex);
        return matches ? matches.length : 0;
      }

      function countEnglishWords(text) {
        // Match English words
        const englishRegex = /\b[a-zA-Z]+(?:'[a-zA-Z]+)?\b/g;
        const matches = text.match(englishRegex);
        return matches ? matches.length : 0;
      }

      function getWordFrequency(text, limit = 10) {
        // Split by Chinese characters and English words
        const words = text.toLowerCase().match(/[\u4e00-\u9fff]|[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || [];
        const frequency = {};

        words.forEach(function (word) {
          if (word.length > 1 || (word.charCodeAt(0) >= 19968 && word.charCodeAt(0) <= 40959)) {
            frequency[word] = (frequency[word] || 0) + 1;
          }
        });

        // Sort by frequency
        const sorted = Object.entries(frequency).sort(function (a, b) {
          return b[1] - a[1];
        });

        return sorted.slice(0, limit);
      }

      function calculateReadability(text) {
        const sentences = text.split(/[。！？.!?]/).filter((s) => s.trim().length > 0);
        const words = text.match(/[\u4e00-\u9fff]|[a-zA-Z]+(?:'[a-zA-Z]+)?/g) || [];

        if (sentences.length === 0 || words.length === 0) {
          return { score: 0, grade: "N/A", avgWordsPerSentence: 0 };
        }

        const avgWordsPerSentence = words.length / sentences.length;
        let score;

        // Simple readability formula for mixed Chinese/English text
        if (countChineseChars(text) > words.length * 0.5) {
          // Chinese dominant text
          score = 100 - avgWordsPerSentence * 1.5;
        } else {
          // English dominant text
          const syllables = words.reduce((count, word) => {
            return count + Math.max(1, Math.floor(word.length / 3));
          }, 0);
          score =
            206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length);
        }

        score = Math.max(0, Math.min(100, score));

        let grade;
        if (score >= 90) grade = "非常易读";
        else if (score >= 80) grade = "易读";
        else if (score >= 70) grade = "中等";
        else if (score >= 60) grade = "较难";
        else grade = "难读";

        return {
          score: Math.round(score * 10) / 10,
          grade: grade,
          avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10
        };
      }

      function analyzeText() {
        const text = inputEl.value.trim();
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }

        // Basic statistics
        const chineseChars = countChineseChars(text);
        const englishWords = countEnglishWords(text);
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s/g, "").length;
        const lines = text.split("\n").length;
        const sentences = text.split(/[。！？.!?]/).filter((s) => s.trim().length > 0).length;
        const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0).length;

        // Word frequency
        const wordFreq = getWordFrequency(text, 10);

        // Readability
        const readability = calculateReadability(text);
        const readingTime = Math.ceil(characters / 800); // 800 chars per minute

        // Update stats grid
        const stats = [
          { label: "总字符数", value: characters.toLocaleString() },
          { label: "非空字符数", value: charactersNoSpaces.toLocaleString() },
          { label: "中文字符", value: chineseChars.toLocaleString() },
          { label: "英文单词", value: englishWords.toLocaleString() },
          { label: "行数", value: lines.toLocaleString() },
          { label: "段落数", value: paragraphs.toLocaleString() },
          { label: "句子数", value: sentences.toLocaleString() }
        ];

        statsGridEl.innerHTML = "";
        stats.forEach(function (stat) {
          const card = document.createElement("div");
          card.className = "stat-card";
          card.innerHTML =
            '<div class="stat-value">' +
            stat.value +
            "</div>" +
            '<div class="stat-label">' +
            stat.label +
            "</div>";
          statsGridEl.appendChild(card);
        });

        // Update word frequency
        wordFrequencyEl.innerHTML = "";
        wordFreq.forEach(function ([word, count]) {
          const item = document.createElement("div");
          item.className = "frequency-item";
          item.innerHTML =
            '<span class="frequency-word">' +
            word +
            "</span>" +
            '<span class="frequency-count">' +
            count +
            " 次</span>";
          wordFrequencyEl.appendChild(item);
        });

        // Update readability metrics
        readTimeEl.textContent = readingTime + " 分钟";
        avgSentenceEl.textContent = readability.avgWordsPerSentence + " 词";
        readabilityEl.textContent = readability.score;
        readabilityGradeEl.textContent = readability.grade;

        showStatus("分析完成", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function copyStats() {
        const text = inputEl.value;
        if (!text) {
          showStatus("没有文本内容", "error");
          return;
        }

        const stats = [
          "文本统计报告",
          "============",
          "总字符数: " + text.length,
          "非空字符数: " + text.replace(/\s/g, "").length,
          "中文字符: " + countChineseChars(text),
          "英文单词: " + countEnglishWords(text),
          "行数: " + text.split("\n").length,
          "段落数: " + text.split("\n\n").filter((p) => p.trim().length > 0).length,
          "句子数: " + text.split(/[。！？.!?]/).filter((s) => s.trim().length > 0).length,
          "",
          "生成时间: " + new Date().toLocaleString()
        ].join("\n");

        try {
          navigator.clipboard.writeText(stats);
          showStatus("统计已复制", "success");
        } catch (e) {
          showStatus("复制失败");
        }
      }

      window.clearAll = function () {
        inputEl.value = "";
        statsGridEl.innerHTML = "";
        wordFrequencyEl.innerHTML = "";
        readTimeEl.textContent = "0 分钟";
        avgSentenceEl.textContent = "0 词";
        readabilityEl.textContent = "0";
        readabilityGradeEl.textContent = "-";
        statusEl.textContent = "";
      };

      document.getElementById("btnAnalyze").onclick = analyzeText;
      document.getElementById("btnCopy").onclick = copyStats;
      document.getElementById("btnClear").onclick = clearAll;

      // Auto-analyze on input (with debounce)
      let analyzeTimeout;
      inputEl.addEventListener("input", function () {
        clearTimeout(analyzeTimeout);
        analyzeTimeout = setTimeout(analyzeText, 500);
      });

      // Initial analysis if there's text
      if (inputEl.value.trim()) {
        analyzeText();
      }

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
    
