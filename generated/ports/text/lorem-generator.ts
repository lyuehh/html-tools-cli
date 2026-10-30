// @ts-nocheck
// Generated from tools/text/lorem-generator.html
// Source SHA-256: bd4c6dd46417567b7a7e5549e5bf9d584c31bc1fa3b45d34d38cabe74577d0ab
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
        "laborum"
      ];
      function randomWord() {
        return words[Math.floor(Math.random() * words.length)];
      }
      function generateSentence() {
        const len = 8 + Math.floor(Math.random() * 10);
        let s = randomWord();
        s = s.charAt(0).toUpperCase() + s.slice(1);
        for (let i = 1; i < len; i++) s += " " + randomWord();
        return s + ".";
      }
      function generateParagraph() {
        const len = 4 + Math.floor(Math.random() * 4);
        return Array(len).fill().map(generateSentence).join(" ");
      }
      function generate() {
        const type = document.getElementById("type").value;
        const count = parseInt(document.getElementById("count").value) || 1;
        let result = "";
        if (type === "words") result = Array(count).fill().map(randomWord).join(" ");
        else if (type === "sentences") result = Array(count).fill().map(generateSentence).join(" ");
        else result = Array(count).fill().map(generateParagraph).join("\n\n");
        document.getElementById("output").textContent = result;
      }
      function copy() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
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
    
