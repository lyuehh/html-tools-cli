// @ts-nocheck
// Generated from tools/text/text-frequency.html
// Source SHA-256: 4ce64c351caa184ee166c75391a7ae4f629d47e14147bd93c64ddd095973e3ca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 全局存储分析结果
      let analysisResult = [];

      // 常用停用词
      const stopWords = new Set([
        "的",
        "了",
        "是",
        "在",
        "我",
        "有",
        "和",
        "就",
        "不",
        "人",
        "都",
        "一",
        "一个",
        "上",
        "也",
        "很",
        "到",
        "说",
        "要",
        "去",
        "你",
        "会",
        "着",
        "没有",
        "看",
        "好",
        "自己",
        "这",
        "那",
        "里",
        "他",
        "她",
        "它",
        "the",
        "a",
        "an",
        "is",
        "are",
        "was",
        "were",
        "be",
        "been",
        "being",
        "have",
        "has",
        "had",
        "do",
        "does",
        "did",
        "will",
        "would",
        "could",
        "should",
        "may",
        "might",
        "must",
        "can",
        "this",
        "that",
        "these",
        "those",
        "i",
        "you",
        "he",
        "she",
        "it",
        "we",
        "they",
        "and",
        "or",
        "but",
        "if",
        "because",
        "as",
        "of",
        "at",
        "by",
        "for",
        "with",
        "about",
        "to",
        "from",
        "in",
        "on",
        "not",
        "no",
        "so",
        "what",
        "which",
        "who"
      ]);

      // 更新字符计数
      document.getElementById("input-text").addEventListener("input", function () {
        document.getElementById("char-count").textContent = this.value.length;
      });

      // 分词函数（简单实现）
      function segmentText(text, mode) {
        const ignoreCase = document.getElementById("ignoreCase").checked;
        const ignorePunct = document.getElementById("ignorePunct").checked;
        const ignoreNumbers = document.getElementById("ignoreNumbers").checked;

        if (ignoreCase) {
          text = text.toLowerCase();
        }

        if (ignorePunct) {
          text = text.replace(
            /[，。！？、；：""''（）【】《》\.\,\!\?\;\:\"\'\(\)\[\]\<\>\-\_\+\=\*\/\\@#$%^&~`]/g,
            " "
          );
        }

        if (ignoreNumbers) {
          text = text.replace(/[0-9０-９]/g, "");
        }

        let words = [];

        if (mode === "char") {
          // 单字分析
          words = text.split("").filter((c) => c.trim());
        } else if (mode === "sentence") {
          // 句子分析
          words = text.split(/[。！？\.\!\?]/).filter((s) => s.trim());
        } else {
          // 词语分析 - 简单的中英文混合分词
          // 英文按空格分词，中文按2-4字分词
          const englishWords = text.match(/[a-zA-Z]+/g) || [];
          const chineseText = text.replace(/[a-zA-Z]+/g, "");

          // 简单的中文分词（基于常用词长度）
          const chineseChars = chineseText.match(/[\u4e00-\u9fff]+/g) || [];
          const chineseWords = [];

          chineseChars.forEach((segment) => {
            // 简单策略：优先2字词，其次单字
            for (let i = 0; i < segment.length; i++) {
              if (i + 1 < segment.length) {
                chineseWords.push(segment.substring(i, i + 2));
                i++; // 跳过下一个字符
              } else {
                chineseWords.push(segment[i]);
              }
            }
          });

          words = [...englishWords, ...chineseWords];
        }

        return words.filter((w) => w && w.trim());
      }

      // 分析函数
      window.analyze = function () {
        const text = document.getElementById("input-text").value;
        const mode = document.getElementById("analyzeMode").value;
        const displayCount = document.getElementById("displayCount").value;

        if (!text.trim()) {
          alert("请输入要分析的文本");
          return;
        }

        // 分词
        const words = segmentText(text, mode);

        // 统计词频
        const freqMap = new Map();
        words.forEach((word) => {
          freqMap.set(word, (freqMap.get(word) || 0) + 1);
        });

        // 排序
        analysisResult = Array.from(freqMap.entries()).sort((a, b) => b[1] - a[1]);

        // 统计数据
        const totalChars = text.length;
        const totalWords = words.length;
        const uniqueWords = analysisResult.length;
        const avgLength = totalWords > 0 ? (words.join("").length / totalWords).toFixed(1) : 0;
        const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
        const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;

        // 更新统计卡片
        document.getElementById("total-chars").textContent = totalChars;
        document.getElementById("total-words").textContent = totalWords;
        document.getElementById("unique-words").textContent = uniqueWords;
        document.getElementById("avg-length").textContent = avgLength;
        document.getElementById("chinese-chars").textContent = chineseChars;
        document.getElementById("english-words").textContent = englishWords;

        // 显示结果
        const limit = displayCount === "all" ? analysisResult.length : parseInt(displayCount);
        displayFreqList(analysisResult.slice(0, limit));
        displayWordCloud(analysisResult.slice(0, 50));
      };

      // 显示词频列表
      function displayFreqList(data) {
        const container = document.getElementById("freq-list");
        container.textContent = "";

        if (data.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.style.textAlign = "center";
          p.textContent = "没有分析结果";
          container.appendChild(p);
          return;
        }

        const maxCount = data[0][1];

        data.forEach(([word, count], index) => {
          const item = document.createElement("div");
          item.className = "freq-item";

          const rank = document.createElement("span");
          rank.className = "freq-rank";
          rank.textContent = index + 1;

          const wordSpan = document.createElement("span");
          wordSpan.className = "freq-word";
          wordSpan.textContent = word;

          const countSpan = document.createElement("span");
          countSpan.className = "freq-count";
          countSpan.textContent = count;

          const bar = document.createElement("div");
          bar.className = "freq-bar";

          const barInner = document.createElement("div");
          barInner.className = "freq-bar-inner";
          barInner.style.width = (count / maxCount) * 100 + "%";

          bar.appendChild(barInner);

          item.appendChild(rank);
          item.appendChild(wordSpan);
          item.appendChild(countSpan);
          item.appendChild(bar);

          container.appendChild(item);
        });
      }

      // 显示词云
      function displayWordCloud(data) {
        const container = document.getElementById("word-cloud");
        container.textContent = "";

        if (data.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.textContent = "词云将显示在这里";
          container.appendChild(p);
          return;
        }

        const maxCount = data[0][1];
        const minSize = 12;
        const maxSize = 36;

        // 颜色数组
        const colors = [
          "#e74c3c",
          "#3498db",
          "#2ecc71",
          "#f39c12",
          "#9b59b6",
          "#1abc9c",
          "#e67e22",
          "#34495e",
          "#16a085",
          "#c0392b"
        ];

        data.forEach(([word, count], index) => {
          const span = document.createElement("span");
          span.className = "cloud-word";
          span.textContent = word;

          // 根据频率计算字体大小
          const ratio = count / maxCount;
          const size = minSize + (maxSize - minSize) * Math.sqrt(ratio);
          span.style.fontSize = size + "px";

          // 随机颜色
          span.style.color = colors[index % colors.length];

          // 设置标题显示频次
          span.title = word + ": " + count + "次";

          container.appendChild(span);
        });
      }

      // 导出CSV
      window.exportCSV = function () {
        if (analysisResult.length === 0) {
          alert("请先进行分析");
          return;
        }

        let csv = "\uFEFF词语,频次\n"; // BOM for Excel
        analysisResult.forEach(([word, count]) => {
          csv += '"' + word.replace(/"/g, '""') + '",' + count + "\n";
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "word-frequency.csv";
        a.click();

        URL.revokeObjectURL(url);
      };

      // 复制词频列表
      window.copyFreqList = function () {
        if (analysisResult.length === 0) {
          alert("请先进行分析");
          return;
        }

        const displayCount = document.getElementById("displayCount").value;
        const limit = displayCount === "all" ? analysisResult.length : parseInt(displayCount);

        let text = "排名\t词语\t频次\n";
        analysisResult.slice(0, limit).forEach(([word, count], index) => {
          text += index + 1 + "\t" + word + "\t" + count + "\n";
        });

        navigator.clipboard.writeText(text).then(() => {
          const btn = event.target;
          const originalText = btn.textContent;
          btn.textContent = "已复制";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1500);
        });
      };

      // 清空输入
      window.clearInput = function () {
        document.getElementById("input-text").value = "";
        document.getElementById("char-count").textContent = "0";
        analysisResult = [];

        // 重置统计
        document.getElementById("total-chars").textContent = "0";
        document.getElementById("total-words").textContent = "0";
        document.getElementById("unique-words").textContent = "0";
        document.getElementById("avg-length").textContent = "0";
        document.getElementById("chinese-chars").textContent = "0";
        document.getElementById("english-words").textContent = "0";

        // 重置结果
        document.getElementById("freq-list").textContent = "";
        const p1 = document.createElement("p");
        p1.style.color = "var(--pico-muted-color)";
        p1.style.textAlign = "center";
        p1.textContent = "分析结果将显示在这里";
        document.getElementById("freq-list").appendChild(p1);

        document.getElementById("word-cloud").textContent = "";
        const p2 = document.createElement("p");
        p2.style.color = "var(--pico-muted-color)";
        p2.textContent = "词云将显示在这里";
        document.getElementById("word-cloud").appendChild(p2);
      };

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 初始化主题
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();
    
