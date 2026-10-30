// @ts-nocheck
// Generated from tools/text/lorem-ipsum.html
// Source SHA-256: 9f891658585f9d39ea0ee65e784e4004777e9437924cd140d80c86de77e517b4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const latinWords = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "sed",
        "do",
        "eiusmod",
        "tempor",
        "incididunt",
        "ut",
        "labore",
        "et",
        "dolore",
        "magna",
        "aliqua",
        "enim",
        "ad",
        "minim",
        "veniam",
        "quis",
        "nostrud",
        "exercitation",
        "ullamco",
        "laboris",
        "nisi",
        "aliquip",
        "ex",
        "ea",
        "commodo",
        "consequat",
        "duis",
        "aute",
        "irure",
        "in",
        "reprehenderit",
        "voluptate",
        "velit",
        "esse",
        "cillum",
        "fugiat",
        "nulla",
        "pariatur",
        "excepteur",
        "sint",
        "occaecat",
        "cupidatat",
        "non",
        "proident",
        "sunt",
        "culpa",
        "qui",
        "officia",
        "deserunt",
        "mollit",
        "anim",
        "id",
        "est",
        "laborum"
      ];
      const chineseWords = [
        "天地",
        "玄黄",
        "宇宙",
        "洪荒",
        "日月",
        "盈昃",
        "辰宿",
        "列张",
        "寒来",
        "暑往",
        "秋收",
        "冬藏",
        "闰余",
        "成岁",
        "律吕",
        "调阳",
        "云腾",
        "致雨",
        "露结",
        "为霜",
        "金生",
        "丽水",
        "玉出",
        "昆冈",
        "剑号",
        "巨阙",
        "珠称",
        "夜光",
        "果珍",
        "李柰",
        "菜重",
        "芥姜",
        "海咸",
        "河淡",
        "鳞潜",
        "羽翔",
        "龙师",
        "火帝",
        "鸟官",
        "人皇",
        "始制",
        "文字",
        "乃服",
        "衣裳",
        "推位",
        "让国",
        "有虞",
        "陶唐",
        "吊民",
        "伐罪",
        "周发",
        "殷汤",
        "坐朝",
        "问道",
        "垂拱",
        "平章"
      ];
      function getWords(lang) {
        return lang === "chinese"
          ? chineseWords
          : lang === "mixed"
            ? [...latinWords, ...chineseWords]
            : latinWords;
      }
      function randomWord(words) {
        return words[Math.floor(Math.random() * words.length)];
      }
      function generateSentence(words, minWords = 8, maxWords = 15) {
        const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
        let sentence = Array.from({ length: len }, () => randomWord(words)).join(" ");
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        return sentence + (Math.random() > 0.2 ? "." : Math.random() > 0.5 ? "!" : "?");
      }
      function generateParagraph(words, minSentences = 4, maxSentences = 8) {
        const len = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
        return Array.from({ length: len }, () => generateSentence(words)).join(" ");
      }
      function generate() {
        const type = document.getElementById("type").value;
        const count = parseInt(document.getElementById("count").value) || 1;
        const lang = document.getElementById("lang").value;
        const words = getWords(lang);
        let result = [];
        if (type === "paragraphs") {
          for (let i = 0; i < count; i++) result.push("<p>" + generateParagraph(words) + "</p>");
        } else if (type === "sentences") {
          for (let i = 0; i < count; i++) result.push(generateSentence(words));
          result = ["<p>" + result.join(" ") + "</p>"];
        } else {
          result = [
            "<p>" + Array.from({ length: count }, () => randomWord(words)).join(" ") + "</p>"
          ];
        }
        const output = result.join("");
        document.getElementById("output").innerHTML = output;
        const text = document.getElementById("output").textContent;
        document.getElementById("charCount").textContent = text.length;
        document.getElementById("wordCount").textContent = text
          .split(/\s+/)
          .filter((w) => w).length;
        document.getElementById("paraCount").textContent = result.length;
      }
      function copyText() {
        const text = document.getElementById("output").textContent;
        navigator.clipboard.writeText(text);
        alert("已复制到剪贴板!");
      }
      generate();

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
    
