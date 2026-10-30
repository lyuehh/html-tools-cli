// @ts-nocheck
// Generated from tools/text/text-similarity.html
// Source SHA-256: 4d8c8c12539cd7b0939290c72ecb3774339c27afb2fea0b436d6ae444385e697
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      // 初始化主题
      function initTheme() {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 分词（简单按字符和空格分词）
      function tokenize(text) {
        return text
          .toLowerCase()
          .split(/[\s\n\r\t]+/)
          .filter((w) => w.length > 0);
      }

      // 字符级分词
      window.charTokenize = function (text) {
        return text.split("");
      };

      // 词频统计
      function getTermFrequency(tokens) {
        const tf = {};
        tokens.forEach((token) => {
          tf[token] = (tf[token] || 0) + 1;
        });
        return tf;
      }

      // 余弦相似度
      function cosineSimilarity(textA, textB) {
        const tokensA = tokenize(textA);
        const tokensB = tokenize(textB);

        if (tokensA.length === 0 && tokensB.length === 0) return 1;
        if (tokensA.length === 0 || tokensB.length === 0) return 0;

        const tfA = getTermFrequency(tokensA);
        const tfB = getTermFrequency(tokensB);

        const allTerms = new Set([...Object.keys(tfA), ...Object.keys(tfB)]);

        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        allTerms.forEach((term) => {
          const a = tfA[term] || 0;
          const b = tfB[term] || 0;
          dotProduct += a * b;
          normA += a * a;
          normB += b * b;
        });

        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
      }

      // Jaccard 相似度
      function jaccardSimilarity(textA, textB) {
        const tokensA = new Set(tokenize(textA));
        const tokensB = new Set(tokenize(textB));

        if (tokensA.size === 0 && tokensB.size === 0) return 1;
        if (tokensA.size === 0 || tokensB.size === 0) return 0;

        const intersection = new Set([...tokensA].filter((x) => tokensB.has(x)));
        const union = new Set([...tokensA, ...tokensB]);

        return intersection.size / union.size;
      }

      // 编辑距离（Levenshtein）
      function levenshteinDistance(strA, strB) {
        const m = strA.length;
        const n = strB.length;

        if (m === 0) return n;
        if (n === 0) return m;

        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const cost = strA[i - 1] === strB[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1, // 删除
              dp[i][j - 1] + 1, // 插入
              dp[i - 1][j - 1] + cost // 替换
            );
          }
        }

        return dp[m][n];
      }

      // 最长公共子序列
      function lcsLength(strA, strB) {
        const m = strA.length;
        const n = strB.length;

        if (m === 0 || n === 0) return 0;

        const dp = Array(m + 1)
          .fill(null)
          .map(() => Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (strA[i - 1] === strB[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }

        return dp[m][n];
      }

      // 简单差异对比
      function simpleDiff(textA, textB) {
        const wordsA = textA.split(/(\s+)/);
        const wordsB = textB.split(/(\s+)/);

        const result = [];
        let i = 0,
          j = 0;

        while (i < wordsA.length || j < wordsB.length) {
          if (i >= wordsA.length) {
            result.push({ type: "add", text: wordsB[j] });
            j++;
          } else if (j >= wordsB.length) {
            result.push({ type: "del", text: wordsA[i] });
            i++;
          } else if (wordsA[i] === wordsB[j]) {
            result.push({ type: "same", text: wordsA[i] });
            i++;
            j++;
          } else {
            // 简单处理：先删后加
            result.push({ type: "del", text: wordsA[i] });
            result.push({ type: "add", text: wordsB[j] });
            i++;
            j++;
          }
        }

        return result;
      }

      // 计算所有相似度
      window.calculate = function () {
        const textA = document.getElementById("textA").value;
        const textB = document.getElementById("textB").value;

        if (!textA.trim() && !textB.trim()) {
          alert("请输入文本");
          return;
        }

        // 余弦相似度
        const cosine = cosineSimilarity(textA, textB);
        document.getElementById("cosineSim").textContent = (cosine * 100).toFixed(1) + "%";
        document.getElementById("cosineBar").style.width = cosine * 100 + "%";

        // Jaccard 相似度
        const jaccard = jaccardSimilarity(textA, textB);
        document.getElementById("jaccardSim").textContent = (jaccard * 100).toFixed(1) + "%";
        document.getElementById("jaccardBar").style.width = jaccard * 100 + "%";

        // 编辑距离
        const editDist = levenshteinDistance(textA, textB);
        const maxLen = Math.max(textA.length, textB.length);
        const editSim = maxLen > 0 ? 1 - editDist / maxLen : 1;
        document.getElementById("editDist").textContent = editDist;
        document.getElementById("editDistPercent").textContent =
          "相似度: " + (editSim * 100).toFixed(1) + "%";

        // LCS
        const lcs = lcsLength(textA, textB);
        const lcsSim = maxLen > 0 ? lcs / maxLen : 1;
        document.getElementById("lcsSim").textContent = (lcsSim * 100).toFixed(1) + "%";
        document.getElementById("lcsBar").style.width = lcsSim * 100 + "%";

        // 统计信息
        const statsGrid = document.getElementById("statsGrid");
        statsGrid.textContent = "";

        const stats = [
          ["文本A字符数", textA.length],
          ["文本B字符数", textB.length],
          ["文本A词数", tokenize(textA).length],
          ["文本B词数", tokenize(textB).length],
          ["LCS长度", lcs],
          ["编辑操作数", editDist]
        ];

        stats.forEach(([label, value]) => {
          const div = document.createElement("div");
          div.className = "stat-item";

          const labelSpan = document.createElement("span");
          labelSpan.textContent = label;

          const valueStrong = document.createElement("strong");
          valueStrong.textContent = value;

          div.appendChild(labelSpan);
          div.appendChild(valueStrong);
          statsGrid.appendChild(div);
        });

        // 差异对比
        const diffView = document.getElementById("diffView");
        diffView.textContent = "";

        const diff = simpleDiff(textA, textB);
        diff.forEach((item) => {
          const span = document.createElement("span");
          if (item.type === "add") {
            span.className = "diff-add";
          } else if (item.type === "del") {
            span.className = "diff-del";
          }
          span.textContent = item.text;
          diffView.appendChild(span);
        });
      };

      // 交换文本
      window.swapTexts = function () {
        const textA = document.getElementById("textA");
        const textB = document.getElementById("textB");
        const temp = textA.value;
        textA.value = textB.value;
        textB.value = temp;
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("textA").value = "";
        document.getElementById("textB").value = "";
        document.getElementById("cosineSim").textContent = "-";
        document.getElementById("jaccardSim").textContent = "-";
        document.getElementById("editDist").textContent = "-";
        document.getElementById("editDistPercent").textContent = "";
        document.getElementById("lcsSim").textContent = "-";
        document.getElementById("cosineBar").style.width = "0";
        document.getElementById("jaccardBar").style.width = "0";
        document.getElementById("lcsBar").style.width = "0";
        document.getElementById("statsGrid").textContent = "";
        document.getElementById("diffView").textContent = "计算后显示差异";
      };

      // 加载示例
      window.loadExample = function () {
        document.getElementById("textA").value = "今天天气很好，适合出去散步。阳光明媚，微风习习。";
        document.getElementById("textB").value = "今天天气不错，适合外出散步。阳光灿烂，微风轻拂。";
      };

      // 初始化
      document.addEventListener("DOMContentLoaded", initTheme);
    
