// @ts-nocheck
// Generated from tools/life/word-counter.html
// Source SHA-256: d24e1cbe601727a2e8c197b833cb1944381c0c01f129c0c459c2ac485e55057a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentText = "";
      let charFrequency = {};
      let currentFreqType = "all";

      function analyzeText() {
        const text = document.getElementById("textInput").value;
        currentText = text;

        // 基本统计
        const charCount = text.length;
        const charNoSpace = text.replace(/\s/g, "").length;
        const lines = text.split("\n");
        const lineCount = text ? lines.length : 0;

        // 词数统计（中文按字，英文按词）
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
        const wordCount = chineseChars + englishWords;

        // 更新主要统计
        document.getElementById("charCount").textContent = charCount.toLocaleString();
        document.getElementById("charNoSpace").textContent = charNoSpace.toLocaleString();
        document.getElementById("wordCount").textContent = wordCount.toLocaleString();
        document.getElementById("lineCount").textContent = lineCount.toLocaleString();

        // 详细统计
        const englishCount = (text.match(/[a-zA-Z]/g) || []).length;
        const numberCount = (text.match(/[0-9]/g) || []).length;
        const punctuationCount = (
          text.match(/[，。！？、；：""''（）【】《》\.\,\!\?\;\:\"\'\(\)\[\]\{\}]/g) || []
        ).length;
        const spaceCount = (text.match(/ /g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;

        // 句子数（以句号、问号、感叹号结尾）
        const sentenceCount = (text.match(/[。！？\.!\?]+/g) || []).length;

        // 段落数（非空行）
        const paragraphCount = lines.filter((line) => line.trim().length > 0).length;

        // 平均词长
        const words = text.match(/[a-zA-Z]+/g) || [];
        const avgWordLength =
          words.length > 0
            ? (words.reduce((sum, w) => sum + w.length, 0) / words.length).toFixed(1)
            : 0;

        // 最长行
        const longestLine = Math.max(...lines.map((l) => l.length), 0);

        // 字节大小
        const byteSize = new Blob([text]).size;

        document.getElementById("chineseCount").textContent = chineseChars.toLocaleString();
        document.getElementById("englishCount").textContent = englishCount.toLocaleString();
        document.getElementById("numberCount").textContent = numberCount.toLocaleString();
        document.getElementById("punctuationCount").textContent = punctuationCount.toLocaleString();
        document.getElementById("spaceCount").textContent = spaceCount.toLocaleString();
        document.getElementById("newlineCount").textContent = newlineCount.toLocaleString();
        document.getElementById("sentenceCount").textContent = sentenceCount.toLocaleString();
        document.getElementById("paragraphCount").textContent = paragraphCount.toLocaleString();
        document.getElementById("englishWordCount").textContent = englishWords.toLocaleString();
        document.getElementById("avgWordLength").textContent = avgWordLength;
        document.getElementById("longestLine").textContent = longestLine + " 字符";
        document.getElementById("byteSize").textContent = formatBytes(byteSize);

        // 阅读时间（假设中文300字/分钟，英文200词/分钟）
        const readTimeNormal = Math.ceil(chineseChars / 300 + englishWords / 200);
        const readTimeFast = Math.ceil(chineseChars / 500 + englishWords / 350);
        const speakTime = Math.ceil(chineseChars / 150 + englishWords / 120);

        document.getElementById("readTimeNormal").textContent = readTimeNormal || 0;
        document.getElementById("readTimeFast").textContent = readTimeFast || 0;
        document.getElementById("speakTime").textContent = speakTime || 0;

        // 计算字符频率
        calculateFrequency(text);
        showFrequency(currentFreqType);
      }

      function calculateFrequency(text) {
        charFrequency = {};
        for (let char of text) {
          if (char === "\n" || char === "\r") continue;
          charFrequency[char] = (charFrequency[char] || 0) + 1;
        }
      }

      function showFrequency(type) {
        currentFreqType = type;

        // 更新标签页
        document.querySelectorAll(".freq-tab").forEach((tab) => {
          tab.classList.remove("active");
          if (tab.textContent.includes(getTabName(type))) {
            tab.classList.add("active");
          }
        });

        const container = document.getElementById("frequencyList");

        if (Object.keys(charFrequency).length === 0) {
          container.innerHTML = '<div class="empty-state">输入文本后显示字符频率</div>';
          return;
        }

        // 过滤字符
        let filtered = Object.entries(charFrequency);

        switch (type) {
          case "chinese":
            filtered = filtered.filter(([char]) => /[\u4e00-\u9fa5]/.test(char));
            break;
          case "english":
            filtered = filtered.filter(([char]) => /[a-zA-Z]/.test(char));
            break;
          case "number":
            filtered = filtered.filter(([char]) => /[0-9]/.test(char));
            break;
        }

        // 排序（按频率降序）
        filtered.sort((a, b) => b[1] - a[1]);

        // 只显示前100个
        filtered = filtered.slice(0, 100);

        if (filtered.length === 0) {
          container.innerHTML = '<div class="empty-state">没有找到相关字符</div>';
          return;
        }

        container.innerHTML = filtered
          .map(
            ([char, count]) => `
                  <div class="freq-item">
                      <span class="freq-char">${char === " " ? "空格" : char}</span>
                      <span class="freq-count">${count}</span>
                  </div>
              `
          )
          .join("");
      }

      function getTabName(type) {
        const names = { all: "全部", chinese: "中文", english: "英文", number: "数字" };
        return names[type];
      }

      function formatBytes(bytes) {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      }

      function clearText() {
        document.getElementById("textInput").value = "";
        analyzeText();
      }

      function copyText() {
        const text = document.getElementById("textInput").value;
        navigator.clipboard.writeText(text).then(() => {
          alert("已复制到剪贴板");
        });
      }

      async function pasteText() {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("textInput").value = text;
          analyzeText();
        } catch (err) {
          alert("无法访问剪贴板，请手动粘贴");
        }
      }

      function removeSpaces() {
        const textarea = document.getElementById("textInput");
        textarea.value = textarea.value.replace(/ /g, "");
        analyzeText();
      }

      function removeLineBreaks() {
        const textarea = document.getElementById("textInput");
        textarea.value = textarea.value.replace(/\n/g, "");
        analyzeText();
      }

      function toUpperCase() {
        const textarea = document.getElementById("textInput");
        textarea.value = textarea.value.toUpperCase();
        analyzeText();
      }

      function toLowerCase() {
        const textarea = document.getElementById("textInput");
        textarea.value = textarea.value.toLowerCase();
        analyzeText();
      }

      // 初始化
      analyzeText();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
