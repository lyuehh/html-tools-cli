// @ts-nocheck
// Generated from tools/text/placeholder-text.html
// Source SHA-256: c459051621620a83eb79dc7719bf5011968d015a176c520990346c8c6f3dbc15
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Data sources
      const data = {
        lorem: {
          words: [
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
            "vivamus",
            "lacus",
            "vel",
            "augue",
            "laoreet",
            "rutrum",
            "faucibus",
            "auctor",
            "dui",
            "proin",
            "massa",
            "cursus",
            "turpis",
            "habitant",
            "morbi",
            "tristique",
            "senectus",
            "netus",
            "malesuada",
            "fames",
            "egestas",
            "integer",
            "pretium",
            "semper",
            "mauris",
            "bibendum"
          ],
          startPhrase: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        chinese: {
          words: [
            "我们",
            "可以",
            "通过",
            "不同",
            "方式",
            "实现",
            "目标",
            "科技",
            "发展",
            "创新",
            "思维",
            "解决",
            "问题",
            "提高",
            "效率",
            "优化",
            "体验",
            "用户",
            "界面",
            "设计",
            "简洁",
            "美观",
            "功能",
            "强大",
            "性能",
            "卓越",
            "稳定",
            "可靠",
            "安全",
            "便捷",
            "快速",
            "响应",
            "智能",
            "自动",
            "处理",
            "数据",
            "分析",
            "报告",
            "管理",
            "系统",
            "平台",
            "服务",
            "支持",
            "帮助",
            "文档",
            "教程",
            "学习",
            "成长",
            "进步",
            "未来",
            "世界",
            "生活",
            "工作",
            "娱乐",
            "休闲",
            "健康",
            "快乐",
            "幸福",
            "美好"
          ],
          punctuation: ["，", "。", "；", "！", "？"]
        },
        poetry: [
          "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
          "白日依山尽，黄河入海流。欲穷千里目，更上一层楼。",
          "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。",
          "红豆生南国，春来发几枝。愿君多采撷，此物最相思。",
          "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。",
          "锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。",
          "离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。",
          "两个黄鹂鸣翠柳，一行白鹭上青天。窗含西岭千秋雪，门泊东吴万里船。",
          "大漠孤烟直，长河落日圆。萧关逢候骑，都护在燕然。",
          "空山不见人，但闻人语响。返景入深林，复照青苔上。",
          "明月几时有，把酒问青天。不知天上宫阙，今夕是何年。",
          "大江东去，浪淘尽，千古风流人物。",
          "落霞与孤鹜齐飞，秋水共长天一色。",
          "海内存知己，天涯若比邻。",
          "会当凌绝顶，一览众山小。"
        ],
        pangrams: {
          en: [
            "The quick brown fox jumps over the lazy dog.",
            "Pack my box with five dozen liquor jugs.",
            "How vexingly quick daft zebras jump!",
            "The five boxing wizards jump quickly.",
            "Sphinx of black quartz, judge my vow."
          ],
          zh: ["我能吞下玻璃而不伤身体。", "天地玄黄，宇宙洪荒。", "视野无限广，窗外有蓝天。"]
        }
      };

      let currentType = "lorem";

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // Type selection
      document.querySelectorAll(".type-card").forEach((card) => {
        card.addEventListener("click", () => {
          document.querySelectorAll(".type-card").forEach((c) => c.classList.remove("active"));
          card.classList.add("active");
          currentType = card.dataset.type;
        });
      });

      // Preset
      window.applyPreset = function (amount, unit) {
        document.getElementById("amount").value = amount;
        document.getElementById("unit").value = unit;
        generate();
      };

      // Generate text
      window.generate = function () {
        const unit = document.getElementById("unit").value;
        const amount = parseInt(document.getElementById("amount").value) || 1;
        const format = document.getElementById("format").value;

        let result = "";

        switch (currentType) {
          case "lorem":
            result = generateLorem(unit, amount);
            break;
          case "chinese":
            result = generateChinese(unit, amount);
            break;
          case "poetry":
            result = generatePoetry(amount);
            break;
          case "pangram":
            result = generatePangram(amount);
            break;
          case "random":
            result = generateRandom(unit, amount);
            break;
        }

        // Apply format
        result = applyFormat(result, format, unit);

        document.getElementById("output").value = result;
        updateStats(result);
      };

      function generateLorem(unit, amount) {
        const words = data.lorem.words;
        let result = [];

        switch (unit) {
          case "paragraphs":
            for (let i = 0; i < amount; i++) {
              let para = i === 0 ? data.lorem.startPhrase + " " : "";
              const sentenceCount = 4 + Math.floor(Math.random() * 4);
              for (let j = 0; j < sentenceCount; j++) {
                para += generateLoremSentence(words);
              }
              result.push(para.trim());
            }
            return result.join("\n\n");
          case "sentences":
            for (let i = 0; i < amount; i++) {
              result.push(generateLoremSentence(words));
            }
            return result.join(" ");
          case "words":
            for (let i = 0; i < amount; i++) {
              result.push(words[Math.floor(Math.random() * words.length)]);
            }
            return result.join(" ");
          case "characters":
            let text = "";
            while (text.length < amount) {
              text += words[Math.floor(Math.random() * words.length)] + " ";
            }
            return text.substring(0, amount);
        }
      }

      function generateLoremSentence(words) {
        const length = 8 + Math.floor(Math.random() * 10);
        let sentence = [];
        for (let i = 0; i < length; i++) {
          sentence.push(words[Math.floor(Math.random() * words.length)]);
        }
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        return sentence.join(" ") + ". ";
      }

      function generateChinese(unit, amount) {
        const words = data.chinese.words;
        const punct = data.chinese.punctuation;
        let result = [];

        switch (unit) {
          case "paragraphs":
            for (let i = 0; i < amount; i++) {
              let para = "";
              const sentenceCount = 3 + Math.floor(Math.random() * 4);
              for (let j = 0; j < sentenceCount; j++) {
                para += generateChineseSentence(words, punct);
              }
              result.push(para);
            }
            return result.join("\n\n");
          case "sentences":
            for (let i = 0; i < amount; i++) {
              result.push(generateChineseSentence(words, punct));
            }
            return result.join("");
          case "words":
            for (let i = 0; i < amount; i++) {
              result.push(words[Math.floor(Math.random() * words.length)]);
            }
            return result.join("");
          case "characters":
            let text = "";
            while (text.length < amount) {
              text += words[Math.floor(Math.random() * words.length)];
            }
            return text.substring(0, amount);
        }
      }

      function generateChineseSentence(words, punct) {
        const length = 4 + Math.floor(Math.random() * 6);
        let sentence = "";
        for (let i = 0; i < length; i++) {
          sentence += words[Math.floor(Math.random() * words.length)];
          if (i < length - 1 && Math.random() > 0.7) {
            sentence += "，";
          }
        }
        return sentence + punct[Math.floor(Math.random() * 2)];
      }

      function generatePoetry(amount) {
        let result = [];
        const poems = [...data.poetry];
        for (let i = 0; i < Math.min(amount, poems.length); i++) {
          const idx = Math.floor(Math.random() * poems.length);
          result.push(poems.splice(idx, 1)[0]);
        }
        return result.join("\n\n");
      }

      function generatePangram(amount) {
        let result = [];
        const allPangrams = [...data.pangrams.en, ...data.pangrams.zh];
        for (let i = 0; i < amount; i++) {
          result.push(allPangrams[Math.floor(Math.random() * allPangrams.length)]);
        }
        return result.join("\n");
      }

      window.generateRandom = function (unit, amount) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        switch (unit) {
          case "characters":
            let result = "";
            for (let i = 0; i < amount; i++) {
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
          case "words":
            let words = [];
            for (let i = 0; i < amount; i++) {
              let word = "";
              const len = 3 + Math.floor(Math.random() * 8);
              for (let j = 0; j < len; j++) {
                word += chars.charAt(Math.floor(Math.random() * 52));
              }
              words.push(word);
            }
            return words.join(" ");
          case "sentences":
            let sentences = [];
            for (let i = 0; i < amount; i++) {
              let words2 = [];
              const wordCount = 5 + Math.floor(Math.random() * 10);
              for (let j = 0; j < wordCount; j++) {
                let word = "";
                const len = 3 + Math.floor(Math.random() * 6);
                for (let k = 0; k < len; k++) {
                  word += chars.charAt(Math.floor(Math.random() * 52));
                }
                words2.push(word.toLowerCase());
              }
              words2[0] = words2[0].charAt(0).toUpperCase() + words2[0].slice(1);
              sentences.push(words2.join(" ") + ".");
            }
            return sentences.join(" ");
          case "paragraphs":
            let paras = [];
            for (let i = 0; i < amount; i++) {
              let sentences2 = [];
              const sentCount = 3 + Math.floor(Math.random() * 4);
              for (let j = 0; j < sentCount; j++) {
                let words3 = [];
                const wordCount2 = 5 + Math.floor(Math.random() * 10);
                for (let k = 0; k < wordCount2; k++) {
                  let word = "";
                  const len = 3 + Math.floor(Math.random() * 6);
                  for (let l = 0; l < len; l++) {
                    word += chars.charAt(Math.floor(Math.random() * 52));
                  }
                  words3.push(word.toLowerCase());
                }
                words3[0] = words3[0].charAt(0).toUpperCase() + words3[0].slice(1);
                sentences2.push(words3.join(" ") + ".");
              }
              paras.push(sentences2.join(" "));
            }
            return paras.join("\n\n");
        }
      };

      function applyFormat(text, format, unit) {
        if (format === "plain") return text;

        const parts = unit === "paragraphs" ? text.split("\n\n") : [text];

        switch (format) {
          case "html-p":
            return parts.map((p) => `<p>${p}</p>`).join("\n");
          case "html-li":
            return "<ul>\n" + parts.map((p) => `  <li>${p}</li>`).join("\n") + "\n</ul>";
          case "html-div":
            return parts.map((p) => `<div>${p}</div>`).join("\n");
          default:
            return text;
        }
      }

      function updateStats(text) {
        document.getElementById("charCount").textContent = text.length;
        document.getElementById("wordCount").textContent = text.trim()
          ? text.trim().split(/\s+/).length
          : 0;
        document.getElementById("paraCount").textContent = text.trim()
          ? text.split(/\n\n+/).filter((p) => p.trim()).length
          : 0;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output");
        if (!output.value) {
          showToast("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(output.value).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const output = document.getElementById("output").value;
        if (!output) {
          showToast("没有可下载的内容");
          return;
        }
        const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "placeholder-text.txt";
        a.click();
        URL.revokeObjectURL(url);
        showToast("文件已下载");
      };

      window.clearOutput = function () {
        document.getElementById("output").value = "";
        updateStats("");
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Generate initial content
      generate();
    
