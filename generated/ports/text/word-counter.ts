// @ts-nocheck
// Generated from tools/text/word-counter.html
// Source SHA-256: 8dc0ede94557931b03a89d19761332077aa7291a227ec1cd40abc36678958796
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        var textEl = document.getElementById("text");
        var statusEl = document.getElementById("status");
        var statusTimer;

        var els = {
          chars: document.getElementById("chars"),
          charsNoSpace: document.getElementById("charsNoSpace"),
          words: document.getElementById("words"),
          cjk: document.getElementById("cjk"),
          lines: document.getElementById("lines"),
          paragraphs: document.getElementById("paragraphs"),
          sentences: document.getElementById("sentences"),
          readTime: document.getElementById("readTime")
        };

        function count() {
          var text = textEl.value;
          var trimmed = text.trim();
          var cjkMatches = text.match(/[一-鿿㐀-䶿]/g);
          var cjk = cjkMatches ? cjkMatches.length : 0;
          var latinWords = trimmed ? (trimmed.match(/[A-Za-z0-9]+/g) || []).length : 0;
          var words = cjk + latinWords;
          var sentences = trimmed ? (trimmed.match(/[.!?。！？…]+/g) || []).length : 0;
          var paragraphs = trimmed
            ? trimmed.split(/\n{2,}/).filter(function (p) {
                return p.trim();
              }).length
            : 0;
          // 阅读速度：中文 ~300 字/分，英文 ~200 词/分
          var minutes = cjk / 300 + latinWords / 200;

          els.chars.textContent = text.length;
          els.charsNoSpace.textContent = text.replace(/\s/g, "").length;
          els.words.textContent = words;
          els.cjk.textContent = cjk;
          els.lines.textContent = text ? text.split("\n").length : 0;
          els.paragraphs.textContent = paragraphs;
          els.sentences.textContent = sentences;
          els.readTime.textContent = minutes < 1 && minutes > 0 ? "<1′" : Math.round(minutes) + "′";
        }

        function flash(msg) {
          statusEl.textContent = msg;
          clearTimeout(statusTimer);
          statusTimer = setTimeout(function () {
            statusEl.textContent = "";
          }, 2200);
        }

        textEl.addEventListener("input", count);

        document.getElementById("btnClear").addEventListener("click", function () {
          textEl.value = "";
          count();
          textEl.focus();
        });

        document.getElementById("btnCopy").addEventListener("click", function () {
          var summary =
            "字数统计结果\n" +
            "字符：" +
            els.chars.textContent +
            "\n" +
            "字符(无空格)：" +
            els.charsNoSpace.textContent +
            "\n" +
            "词数：" +
            els.words.textContent +
            "\n" +
            "汉字：" +
            els.cjk.textContent +
            "\n" +
            "行数：" +
            els.lines.textContent +
            "\n" +
            "段落：" +
            els.paragraphs.textContent +
            "\n" +
            "句子：" +
            els.sentences.textContent +
            "\n" +
            "阅读时间：" +
            els.readTime.textContent;
          navigator.clipboard.writeText(summary).then(
            function () {
              flash("✓ 统计结果已复制到剪贴板");
            },
            function () {
              flash("复制失败，请手动选择");
            }
          );
        });

        count();
      })();
    
