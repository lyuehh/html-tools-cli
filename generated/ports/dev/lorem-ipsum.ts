// @ts-nocheck
// Generated from tools/dev/lorem-ipsum.html
// Source SHA-256: 7bea9a9479005141a65fcbf808feaea1e8ded916260ec4f437f90d68350559f5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const words = [
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
        "laborum",
        "at",
        "vero",
        "eos",
        "accusamus",
        "iusto",
        "odio",
        "dignissimos",
        "ducimus",
        "blanditiis",
        "praesentium",
        "voluptatum",
        "deleniti",
        "atque",
        "corrupti",
        "quos",
        "dolores",
        "quas",
        "molestias",
        "excepturi",
        "obcaecati",
        "cupiditate",
        "provident",
        "similique",
        "mollitia",
        "animi",
        "ratione",
        "voluptatem"
      ];

      function randomWord() {
        return words[Math.floor(Math.random() * words.length)];
      }

      function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

      function generateSentence(startWithLorem, index) {
        const length = Math.floor(Math.random() * 10) + 6;
        const sentence = [];

        if (startWithLorem && index === 0) {
          sentence.push("Lorem", "ipsum", "dolor", "sit", "amet");
          for (let i = 5; i < length; i++) {
            sentence.push(randomWord());
          }
        } else {
          for (let i = 0; i < length; i++) {
            sentence.push(randomWord());
          }
        }

        // 偶尔添加逗号
        if (length > 6 && Math.random() > 0.6) {
          const commaPos = Math.floor(length / 2) + Math.floor(Math.random() * 3);
          sentence[commaPos] = sentence[commaPos] + ",";
        }

        sentence[0] = capitalize(sentence[0]);
        return sentence.join(" ") + ".";
      }

      function generateParagraph(startWithLorem, index) {
        const sentenceCount = Math.floor(Math.random() * 4) + 4;
        const sentences = [];

        for (let i = 0; i < sentenceCount; i++) {
          sentences.push(generateSentence(startWithLorem && index === 0, i));
        }

        return sentences.join(" ");
      }

      function generate() {
        const type = document.getElementById("type").value;
        const count = parseInt(document.getElementById("count").value) || 1;
        const startWithLorem = document.getElementById("startWithLorem").checked;

        let result = "";

        if (type === "words") {
          const wordList = [];
          if (startWithLorem) {
            wordList.push("Lorem", "ipsum", "dolor", "sit", "amet");
            for (let i = 5; i < count; i++) {
              wordList.push(randomWord());
            }
          } else {
            for (let i = 0; i < count; i++) {
              wordList.push(randomWord());
            }
          }
          result = wordList.join(" ");
        } else if (type === "sentences") {
          const sentences = [];
          for (let i = 0; i < count; i++) {
            sentences.push(generateSentence(startWithLorem, i));
          }
          result = sentences.join(" ");
        } else {
          const paragraphs = [];
          for (let i = 0; i < count; i++) {
            paragraphs.push(generateParagraph(startWithLorem, i));
          }
          result = paragraphs.join("\n\n");
        }

        document.getElementById("output").value = result;

        // 统计
        const wordCount = result.split(/\s+/).length;
        const charCount = result.length;
        document.getElementById("stats").textContent = `${wordCount} 个单词, ${charCount} 个字符`;
      }

      function copyText() {
        const text = document.getElementById("output").value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
          document.getElementById("status").textContent = "已复制到剪贴板";
          setTimeout(() => (document.getElementById("status").textContent = ""), 2000);
        });
      }

      generate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
