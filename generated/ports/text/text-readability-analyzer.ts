// @ts-nocheck
// Generated from tools/text/text-readability-analyzer.html
// Source SHA-256: 78d75074c4ffabf2e3e08dccd9b8b1f3c2912f98fbe5aad7bc43221b984d6462
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var inputTextEl = document.getElementById("inputText");
      var resultsPanelEl = document.getElementById("resultsPanel");
      var resultsPlaceholderEl = document.getElementById("resultsPlaceholder");
      var statusEl = document.getElementById("statusEl");
      var wordCountLabelEl = document.getElementById("wordCountLabel");
      var LS_KEY = "readability_input_v1";

      var SAMPLE_TEXT =
        "The quick brown fox jumps over the lazy dog. Reading is a complex cognitive process " +
        "that involves decoding symbols to derive meaning. Skilled readers can process text " +
        "automatically, allowing them to focus on comprehension rather than individual words. " +
        "Research shows that readability affects how easily readers understand and retain information. " +
        "Sentences with fewer syllables and shorter lengths tend to score higher on readability scales. " +
        "The Flesch Reading Ease score, developed by Rudolf Flesch in 1948, remains one of the most " +
        "widely used readability formulas today. It considers both average sentence length and the " +
        "average number of syllables per word. Higher scores indicate material that is easier to read. " +
        "A score of 70 or above is considered easy to read by most adults, while scores below 30 " +
        "indicate very difficult text suitable for university graduates and professionals.";

      function countSyllables(word) {
        word = word.toLowerCase().replace(/[^a-z]/g, "");
        if (!word) return 0;
        if (word.length <= 3) return 1;
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        word = word.replace(/^y/, "");
        var matches = word.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
      }

      function tokenize(text) {
        var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        sentences = sentences.filter(function (s) {
          return s.trim().length > 0;
        });
        var words = text.match(/\b[a-zA-Z'-]+\b/g) || [];
        words = words.filter(function (w) {
          return w.replace(/['-]/g, "").length > 0;
        });
        return { sentences: sentences, words: words };
      }

      function getPolysyllableCount(words) {
        return words.filter(function (w) {
          return countSyllables(w) >= 3;
        }).length;
      }

      function getTotalSyllables(words) {
        return words.reduce(function (sum, w) {
          return sum + countSyllables(w);
        }, 0);
      }

      function calcFleschReadingEase(asl, asw) {
        return 206.835 - 1.015 * asl - 84.6 * asw;
      }

      function calcFleschKincaidGrade(asl, asw) {
        return 0.39 * asl + 11.8 * asw - 15.59;
      }

      function calcGunningFog(asl, polyRatio) {
        return 0.4 * (asl + 100 * polyRatio);
      }

      function calcSMOG(polySyllableCount, sentenceCount) {
        if (sentenceCount < 3) return null;
        return 3.1291 + 1.043 * Math.sqrt(polySyllableCount * (30 / sentenceCount));
      }

      function calcColemanLiau(chars, words, sentences) {
        var L = (chars / words) * 100;
        var S = (sentences / words) * 100;
        return 0.0588 * L - 0.296 * S - 15.8;
      }

      function calcAutomatedReadability(chars, words, sentences) {
        return 4.71 * (chars / words) + 0.5 * (words / sentences) - 21.43;
      }

      function gradeLabel(grade) {
        if (grade === null || isNaN(grade)) return "N/A";
        grade = Math.max(1, Math.round(grade));
        if (grade <= 5) return "小学 (Grade " + grade + ")";
        if (grade <= 8) return "初中 (Grade " + grade + ")";
        if (grade <= 12) return "高中 (Grade " + grade + ")";
        if (grade <= 16) return "大学 (Grade " + grade + ")";
        return "研究生+ (Grade " + grade + ")";
      }

      function fleschLabel(score) {
        if (score >= 90) return "极易 (90-100)";
        if (score >= 80) return "很容易 (80-90)";
        if (score >= 70) return "容易 (70-80)";
        if (score >= 60) return "标准 (60-70)";
        if (score >= 50) return "稍难 (50-60)";
        if (score >= 30) return "难 (30-50)";
        return "极难 (<30)";
      }

      function scoreClass(grade) {
        if (grade === null || isNaN(grade)) return "";
        grade = parseFloat(grade);
        if (grade <= 8) return "good";
        if (grade <= 12) return "warn";
        return "bad";
      }

      function flescheScoreClass(score) {
        if (score >= 60) return "good";
        if (score >= 30) return "warn";
        return "bad";
      }

      function fmt(num, decimals) {
        if (num === null || num === undefined || isNaN(num)) return "N/A";
        return Number(num).toFixed(decimals === undefined ? 1 : decimals);
      }

      function makeGradeBar(label, pct, display) {
        return (
          '<div class="grade-bar-row">' +
          '<div class="grade-bar-label">' +
          label +
          "</div>" +
          '<div class="grade-bar-track">' +
          '<div class="grade-bar-fill" style="width:' +
          pct.toFixed(1) +
          '%"></div>' +
          "</div>" +
          '<div class="grade-bar-num">' +
          display +
          "</div>" +
          "</div>"
        );
      }

      function analyze() {
        var text = inputTextEl.value.trim();
        if (!text) {
          showStatus("请输入文本", "error");
          return;
        }

        var tokens = tokenize(text);
        var words = tokens.words;
        var sentences = tokens.sentences;

        if (words.length < 10) {
          showStatus("文本太短，建议至少 10 个单词", "error");
          return;
        }

        var wordCount = words.length;
        var sentenceCount = sentences.length;
        var charCount = text.replace(/[^a-zA-Z]/g, "").length;
        var syllableCount = getTotalSyllables(words);
        var polySyllableCount = getPolysyllableCount(words);

        var asl = wordCount / sentenceCount;
        var asw = syllableCount / wordCount;
        var polyRatio = polySyllableCount / wordCount;

        var fre = calcFleschReadingEase(asl, asw);
        var fk = calcFleschKincaidGrade(asl, asw);
        var fog = calcGunningFog(asl, polyRatio);
        var smog = calcSMOG(polySyllableCount, sentenceCount);
        var cli = calcColemanLiau(charCount, wordCount, sentenceCount);
        var ari = calcAutomatedReadability(charCount, wordCount, sentenceCount);

        var gradeValues = [fk, fog, cli, ari];
        if (smog !== null) gradeValues.push(smog);
        var avgGrade =
          gradeValues
            .filter(function (v) {
              return !isNaN(v);
            })
            .reduce(function (a, b) {
              return a + b;
            }, 0) /
          gradeValues.filter(function (v) {
            return !isNaN(v);
          }).length;

        resultsPlaceholderEl.style.display = "none";

        var scoreCardsHtml =
          '<div class="score-cards">' +
          '<div class="score-card ' +
          flescheScoreClass(fre) +
          '">' +
          '<div class="score-card-name">Flesch Reading Ease</div>' +
          '<div class="score-card-value">' +
          fmt(fre, 1) +
          "</div>" +
          '<div class="score-card-label">' +
          fleschLabel(fre) +
          "</div>" +
          "</div>" +
          '<div class="score-card ' +
          scoreClass(fk) +
          '">' +
          '<div class="score-card-name">Flesch-Kincaid Grade</div>' +
          '<div class="score-card-value">' +
          fmt(fk, 1) +
          "</div>" +
          '<div class="score-card-label">' +
          gradeLabel(fk) +
          "</div>" +
          "</div>" +
          '<div class="score-card ' +
          scoreClass(fog) +
          '">' +
          '<div class="score-card-name">Gunning Fog Index</div>' +
          '<div class="score-card-value">' +
          fmt(fog, 1) +
          "</div>" +
          '<div class="score-card-label">' +
          gradeLabel(fog) +
          "</div>" +
          "</div>" +
          '<div class="score-card ' +
          scoreClass(smog) +
          '">' +
          '<div class="score-card-name">SMOG Index</div>' +
          '<div class="score-card-value">' +
          (smog !== null ? fmt(smog, 1) : "N/A") +
          "</div>" +
          '<div class="score-card-label">' +
          (smog !== null ? gradeLabel(smog) : "需 3+ 句") +
          "</div>" +
          "</div>" +
          '<div class="score-card ' +
          scoreClass(cli) +
          '">' +
          '<div class="score-card-name">Coleman-Liau Index</div>' +
          '<div class="score-card-value">' +
          fmt(cli, 1) +
          "</div>" +
          '<div class="score-card-label">' +
          gradeLabel(cli) +
          "</div>" +
          "</div>" +
          '<div class="score-card ' +
          scoreClass(ari) +
          '">' +
          '<div class="score-card-name">Automated Readability</div>' +
          '<div class="score-card-value">' +
          fmt(ari, 1) +
          "</div>" +
          '<div class="score-card-label">' +
          gradeLabel(ari) +
          "</div>" +
          "</div>" +
          "</div>";

        var statsHtml =
          '<div class="stats-section">' +
          '<div class="stats-section-title">基础统计</div>' +
          '<div class="stats-grid">' +
          '<div class="stat-row"><div class="stat-row-value">' +
          wordCount +
          '</div><div class="stat-row-label">单词数</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          sentenceCount +
          '</div><div class="stat-row-label">句子数</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          syllableCount +
          '</div><div class="stat-row-label">音节数</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          fmt(asl, 1) +
          '</div><div class="stat-row-label">平均句长(词)</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          fmt(asw, 2) +
          '</div><div class="stat-row-label">平均音节/词</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          polySyllableCount +
          '</div><div class="stat-row-label">多音节词</div></div>' +
          "</div>" +
          "</div>";

        var gradeBarHtml =
          '<div class="grade-bar-section">' +
          '<div class="grade-bar-title">各指标对比（年级/易读分）</div>' +
          makeGradeBar("Flesch Ease", Math.min(100, Math.max(0, fre)), fmt(fre, 1)) +
          makeGradeBar("FK Grade", Math.min(100, Math.max(0, fk) * 5), fmt(fk, 1)) +
          makeGradeBar("Gunning Fog", Math.min(100, Math.max(0, fog) * 5), fmt(fog, 1)) +
          makeGradeBar(
            "SMOG",
            smog !== null ? Math.min(100, Math.max(0, smog) * 5) : 0,
            smog !== null ? fmt(smog, 1) : "N/A"
          ) +
          makeGradeBar("Coleman-Liau", Math.min(100, Math.max(0, cli) * 5), fmt(cli, 1)) +
          makeGradeBar("ARI", Math.min(100, Math.max(0, ari) * 5), fmt(ari, 1)) +
          "</div>";

        var avgHtml =
          '<div class="stats-section">' +
          '<div class="stats-section-title">综合评估</div>' +
          '<div class="stats-grid">' +
          '<div class="stat-row"><div class="stat-row-value" style="color:var(--color-accent-primary)">' +
          fmt(avgGrade, 1) +
          '</div><div class="stat-row-label">平均年级水平</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          gradeLabel(avgGrade) +
          '</div><div class="stat-row-label">阅读年级</div></div>' +
          '<div class="stat-row"><div class="stat-row-value">' +
          fmt(fre, 0) +
          "/100" +
          '</div><div class="stat-row-label">易读性评分</div></div>' +
          "</div>" +
          "</div>";

        resultsPanelEl.innerHTML = scoreCardsHtml + gradeBarHtml + statsHtml + avgHtml;

        showStatus(
          "分析完成 · " +
            wordCount +
            " 词 · " +
            sentenceCount +
            " 句 · 年级水平 " +
            fmt(avgGrade, 1),
          "success"
        );
        localStorage.setItem(LS_KEY, inputTextEl.value);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function updateWordCount() {
        var text = inputTextEl.value.trim();
        if (!text) {
          wordCountLabelEl.textContent = "";
          return;
        }
        var words = text.match(/\b[a-zA-Z'-]+\b/g) || [];
        wordCountLabelEl.textContent = words.length + " 词";
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          inputTextEl.value = text;
          updateWordCount();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnAnalyze").onclick = analyze;

      document.getElementById("btnSample").onclick = function () {
        inputTextEl.value = SAMPLE_TEXT;
        updateWordCount();
        analyze();
      };

      document.getElementById("btnClear").onclick = function () {
        inputTextEl.value = "";
        resultsPanelEl.innerHTML = "";
        resultsPanelEl.appendChild(resultsPlaceholderEl);
        resultsPlaceholderEl.style.display = "";
        wordCountLabelEl.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      };

      document.getElementById("btnCopyReport").onclick = async function () {
        var text = inputTextEl.value.trim();
        if (!text) {
          showStatus("请先输入并分析文本", "error");
          return;
        }
        var tokens = tokenize(text);
        var words = tokens.words;
        var sentences = tokens.sentences;
        if (words.length < 10) {
          showStatus("文本太短", "error");
          return;
        }
        var wordCount = words.length;
        var sentenceCount = sentences.length;
        var syllableCount = getTotalSyllables(words);
        var polySyllableCount = getPolysyllableCount(words);
        var charCount = text.replace(/[^a-zA-Z]/g, "").length;
        var asl = wordCount / sentenceCount;
        var asw = syllableCount / wordCount;
        var polyRatio = polySyllableCount / wordCount;
        var fre = calcFleschReadingEase(asl, asw);
        var fk = calcFleschKincaidGrade(asl, asw);
        var fog = calcGunningFog(asl, polyRatio);
        var smog = calcSMOG(polySyllableCount, sentenceCount);
        var cli = calcColemanLiau(charCount, wordCount, sentenceCount);
        var ari = calcAutomatedReadability(charCount, wordCount, sentenceCount);

        var report =
          "=== Readability Report ===\n" +
          "Words: " +
          wordCount +
          "\n" +
          "Sentences: " +
          sentenceCount +
          "\n" +
          "Syllables: " +
          syllableCount +
          "\n" +
          "Avg Sentence Length: " +
          fmt(asl, 1) +
          " words\n" +
          "Avg Syllables/Word: " +
          fmt(asw, 2) +
          "\n" +
          "Polysyllable Words: " +
          polySyllableCount +
          "\n\n" +
          "Flesch Reading Ease: " +
          fmt(fre, 1) +
          " (" +
          fleschLabel(fre) +
          ")\n" +
          "Flesch-Kincaid Grade: " +
          fmt(fk, 1) +
          "\n" +
          "Gunning Fog Index: " +
          fmt(fog, 1) +
          "\n" +
          "SMOG Index: " +
          (smog !== null ? fmt(smog, 1) : "N/A") +
          "\n" +
          "Coleman-Liau Index: " +
          fmt(cli, 1) +
          "\n" +
          "Automated Readability: " +
          fmt(ari, 1) +
          "\n";

        try {
          await navigator.clipboard.writeText(report);
          showStatus("报告已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      inputTextEl.addEventListener("input", function () {
        updateWordCount();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          analyze();
        }
      });

      (function () {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          inputTextEl.value = saved;
          updateWordCount();
        }
      })();

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
