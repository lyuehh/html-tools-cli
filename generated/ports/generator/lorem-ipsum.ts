// @ts-nocheck
// Generated from tools/generator/lorem-ipsum.html
// Source SHA-256: eeec0d85cbaf2648b29af24c7e2e3cfd640274153cc2317727c43f9bf70530c8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const words = {
        latin: [
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
          "proin",
          "nibh",
          "nisl",
          "condimentum",
          "venenatis",
          "a",
          "scelerisque",
          "mauris",
          "vitae",
          "nunc"
        ],
        chinese: [
          "这是",
          "一段",
          "中文",
          "假文",
          "用于",
          "测试",
          "排版",
          "效果",
          "设计师",
          "经常",
          "使用",
          "占位",
          "文本",
          "来",
          "展示",
          "页面",
          "布局",
          "和",
          "字体",
          "样式",
          "这些",
          "文字",
          "没有",
          "实际",
          "意义",
          "只是",
          "填充",
          "空白",
          "区域",
          "方便",
          "预览",
          "整体",
          "视觉",
          "呈现",
          "内容",
          "可以",
          "根据",
          "需要",
          "调整",
          "长度",
          "创意",
          "无限",
          "可能",
          "探索",
          "更多",
          "精彩",
          "世界",
          "等你"
        ],
        hipster: [
          "artisan",
          "authentic",
          "sustainable",
          "craft",
          "organic",
          "local",
          "vintage",
          "handmade",
          "ethical",
          "vegan",
          "gluten-free",
          "aesthetic",
          "minimalist",
          "curated",
          "bespoke",
          "farm-to-table",
          "cold-pressed",
          "small-batch",
          "slow",
          "mindful",
          "conscious",
          "eco-friendly",
          "fair-trade",
          "biodegradable",
          "upcycled",
          "reclaimed",
          "natural",
          "raw",
          "unprocessed",
          "artisanal",
          "heritage",
          "tradition",
          "passion",
          "story",
          "journey",
          "experience",
          "lifestyle",
          "wellness",
          "balance",
          "harmony",
          "zen"
        ]
      };

      let currentType = "latin";

      function setType(type) {
        currentType = type;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        event.target.classList.add("active");
        generate();
      }

      function getRandomWord() {
        const list = words[currentType];
        return list[Math.floor(Math.random() * list.length)];
      }

      function generateSentence(wordCount) {
        const count = wordCount || Math.floor(Math.random() * 10) + 5;
        let sentence = [];
        for (let i = 0; i < count; i++) {
          sentence.push(getRandomWord());
        }
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        return (
          sentence.join(currentType === "chinese" ? "" : " ") +
          (currentType === "chinese" ? "。" : ".")
        );
      }

      function generateParagraph(sentenceCount) {
        const count = sentenceCount || Math.floor(Math.random() * 4) + 3;
        let sentences = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        return sentences.join(" ");
      }

      function generate() {
        const unit = document.getElementById("unit").value;
        const count = parseInt(document.getElementById("count").value) || 1;
        const startLorem = document.getElementById("startLorem").checked;
        const addPTags = document.getElementById("addPTags").checked;

        let result = [];

        switch (unit) {
          case "paragraphs":
            for (let i = 0; i < count; i++) {
              let para = generateParagraph();
              if (i === 0 && startLorem && currentType === "latin") {
                para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + para;
              }
              result.push(addPTags ? `<p>${para}</p>` : para);
            }
            break;

          case "sentences":
            for (let i = 0; i < count; i++) {
              let sentence = generateSentence();
              if (i === 0 && startLorem && currentType === "latin") {
                sentence = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
              }
              result.push(sentence);
            }
            break;

          case "words":
            for (let i = 0; i < count; i++) {
              if (i === 0 && startLorem && currentType === "latin") {
                result.push("Lorem");
              } else if (i === 1 && startLorem && currentType === "latin") {
                result.push("ipsum");
              } else {
                result.push(getRandomWord());
              }
            }
            break;
        }

        const output =
          unit === "words"
            ? result.join(currentType === "chinese" ? "" : " ")
            : result.join("\n\n");
        document.getElementById("output").textContent = output;

        // Stats
        const text = output.replace(/<[^>]*>/g, "");
        const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
        const sentences = text.split(/[.。!?]+/).filter((s) => s.trim()).length;
        const wordCount =
          currentType === "chinese"
            ? text.replace(/\s/g, "").length
            : text.split(/\s+/).filter((w) => w).length;

        document.getElementById("statParagraphs").textContent = paragraphs;
        document.getElementById("statSentences").textContent = sentences;
        document.getElementById("statWords").textContent = wordCount;
        document.getElementById("statChars").textContent = text.length;
      }

      function copyText() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
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
    
