// @ts-nocheck
// Generated from tools/seo/keyword-density.html
// Source SHA-256: 6b003f3ada504bc774f058d032a5a5d94594a9a52436bf035a7cc22e7bdb16a8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function analyze() {
        const text = document.getElementById("textInput").value.trim();
        const keywordsInput = document.getElementById("keywordInput").value.trim();

        if (!text) {
          document.getElementById("resultPanel").style.display = "none";
          return;
        }

        document.getElementById("resultPanel").style.display = "block";

        // 基础统计
        const chars = text.length;
        const words = text
          .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, " ")
          .split(/\s+/)
          .filter(Boolean);
        const totalWords = words.length;

        // 词频统计
        const wordFreq = {};
        words.forEach((word) => {
          const lower = word.toLowerCase();
          wordFreq[lower] = (wordFreq[lower] || 0) + 1;
        });

        const uniqueWords = Object.keys(wordFreq).length;

        // 更新统计
        document.getElementById("totalWords").textContent = totalWords;
        document.getElementById("totalChars").textContent = chars;
        document.getElementById("uniqueWords").textContent = uniqueWords;

        // 关键词分析
        const keywords = keywordsInput
          ? keywordsInput
              .split(/[,，]/)
              .map((k) => k.trim())
              .filter(Boolean)
          : [];
        let keywordResults = "";
        let totalDensity = 0;

        // 转义正则特殊字符
        function escapeRegex(str) {
          return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        if (keywords.length > 0) {
          keywords.forEach((keyword) => {
            const regex = new RegExp(escapeRegex(keyword), "gi");
            const matches = text.match(regex) || [];
            const count = matches.length;
            const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
            totalDensity += density;

            let status = "good";
            let tip = "密度适中，保持";
            if (density < 0.5) {
              status = "warning";
              tip = "密度偏低，建议增加";
            } else if (density > 3) {
              status = "bad";
              tip = "密度过高，可能被判定为堆砌";
            }

            keywordResults += `
            <div class="keyword-result">
              <div class="keyword-header">
                <span class="keyword-name">"${escapeHtml(keyword)}"</span>
                <span class="keyword-count">出现 ${count} 次</span>
              </div>
              <div class="density-bar">
                <div class="density-fill ${status}" style="width: ${Math.min(density * 20, 100)}%"></div>
              </div>
              <div class="density-info">
                <span class="density-percent">${density.toFixed(2)}%</span>
                <span class="density-tip">${tip}</span>
              </div>
            </div>
          `;
          });

          const avgDensity = totalDensity / keywords.length;
          document.getElementById("avgDensity").textContent = avgDensity.toFixed(2) + "%";
        } else {
          document.getElementById("avgDensity").textContent = "-";
          keywordResults =
            '<div class="recommendation warning">💡 输入目标关键词以分析其密度</div>';
        }

        document.getElementById("keywordResults").innerHTML = keywordResults;

        // TOP 10 高频词
        const sortedWords = Object.entries(wordFreq)
          .filter(([word]) => word.length > 1)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);

        document.getElementById("topWordsList").innerHTML = sortedWords
          .map(
            ([word, count]) =>
              `<span class="word-tag">${escapeHtml(word)} <span class="count">${count}</span></span>`
          )
          .join("");
      }

      function escapeHtml(str) {
        return String(str).replace(
          /[&<>"']/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
        );
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
    
