// @ts-nocheck
// Generated from tools/text/word-frequency.html
// Source SHA-256: d1c2697ac4e821f8540c12047e14ef82c282788acd1f224229509396744f151c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let wordFreq = [];

      function analyze() {
        const text = document.getElementById("textInput").value;
        const caseSensitive = document.getElementById("caseSensitive").checked;
        const ignoreNumbers = document.getElementById("ignoreNumbers").checked;
        const ignoreShort = document.getElementById("ignoreShort").checked;
        const sortBy = document.getElementById("sortBy").value;

        // Basic stats
        document.getElementById("charCount").textContent = text.length;
        document.getElementById("sentenceCount").textContent =
          (text.match(/[.!?。！？]/g) || []).length || (text.length > 0 ? 1 : 0);

        // Tokenize - handle both Chinese and English
        let words = [];

        // Chinese characters
        const chineseWords = text.match(/[\u4e00-\u9fa5]+/g) || [];
        // Split Chinese into words (simple 2-gram for demonstration)
        chineseWords.forEach((phrase) => {
          if (phrase.length <= 4) {
            words.push(phrase);
          } else {
            // Split into 2-character words
            for (let i = 0; i < phrase.length - 1; i++) {
              words.push(phrase.substring(i, i + 2));
            }
          }
        });

        // English words
        const englishWords = text.match(/[a-zA-Z]+/g) || [];
        words = words.concat(englishWords);

        // Numbers
        if (!ignoreNumbers) {
          const numbers = text.match(/\d+/g) || [];
          words = words.concat(numbers);
        }

        // Process options
        if (!caseSensitive) {
          words = words.map((w) => w.toLowerCase());
        }

        if (ignoreShort) {
          words = words.filter((w) => w.length > 1);
        }

        document.getElementById("wordCount").textContent = words.length;

        // Count frequency
        const freq = {};
        words.forEach((word) => {
          freq[word] = (freq[word] || 0) + 1;
        });

        wordFreq = Object.entries(freq).map(([word, count]) => ({ word, count }));

        // Sort
        if (sortBy === "count") {
          wordFreq.sort((a, b) => b.count - a.count);
        } else if (sortBy === "alpha") {
          wordFreq.sort((a, b) => a.word.localeCompare(b.word));
        } else {
          wordFreq.sort((a, b) => b.word.length - a.word.length);
        }

        document.getElementById("uniqueCount").textContent = wordFreq.length;

        renderList();
        renderCloud();
      }

      function renderList() {
        const maxCount = wordFreq.length > 0 ? wordFreq[0].count : 1;
        const list = document.getElementById("wordList");
        list.innerHTML = wordFreq
          .slice(0, 100)
          .map(
            ({ word, count }) => `
                <div class="word-item">
                    <span class="word-text">${escapeHtml(word)}</span>
                    <div class="word-count">
                        <div class="word-bar">
                            <div class="word-bar-fill" style="width: ${(count / maxCount) * 100}%"></div>
                        </div>
                        <span class="word-num">${count}</span>
                    </div>
                </div>
            `
          )
          .join("");
      }

      function renderCloud() {
        const cloud = document.getElementById("wordCloud");
        const maxCount = wordFreq.length > 0 ? Math.max(...wordFreq.map((w) => w.count)) : 1;
        const colors = [
          "#4f46e5",
          "#7c3aed",
          "#db2777",
          "#dc2626",
          "#ea580c",
          "#16a34a",
          "#0891b2"
        ];

        cloud.innerHTML = wordFreq
          .slice(0, 50)
          .map(({ word, count }) => {
            const size = 12 + (count / maxCount) * 24;
            const color = colors[Math.floor(Math.random() * colors.length)];
            return `<span class="cloud-word" style="font-size: ${size}px; background: ${color};">${escapeHtml(word)} (${count})</span>`;
          })
          .join("");
      }

      function showTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("listView").style.display = tab === "list" ? "block" : "none";
        document.getElementById("cloudView").style.display = tab === "cloud" ? "block" : "none";
      }

      function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      function copyResults() {
        const text = wordFreq.map(({ word, count }) => `${word}: ${count}`).join("\n");
        navigator.clipboard.writeText(text);
        alert("已复制到剪贴板!");
      }

      function downloadCSV() {
        const csv =
          "Word,Count\n" + wordFreq.map(({ word, count }) => `"${word}",${count}`).join("\n");
        const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "word-frequency.csv";
        link.click();
      }

      analyze();

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
    
