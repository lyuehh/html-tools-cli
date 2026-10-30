// @ts-nocheck
// Generated from tools/text/text-diff.html
// Source SHA-256: 47dfc15e6ede56e94e8e664aeeb9c4294e5e70f271f9c384550d25e20aeda995
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function setStatus(text, active) {
        document.getElementById("statusText").textContent = text;
        document.getElementById("statusDot").classList.toggle("active", !!active);
      }

      function compareTexts() {
        var text1 = document.getElementById("text1").value;
        var text2 = document.getElementById("text2").value;
        var resultEl = document.getElementById("result");

        if (!text1 && !text2) {
          resultEl.innerHTML = '<pre class="diff-unchanged">请输入要对比的文本...</pre>';
          setStatus("就绪");
          return;
        }

        var diffMode = document.querySelector('input[name="diffMode"]:checked').value;
        var diff;

        setStatus("对比中...", true);

        setTimeout(function () {
          switch (diffMode) {
            case "line":
              diff = Diff.diffLines(text1, text2);
              break;
            case "word":
              diff = Diff.diffWords(text1, text2);
              break;
            case "char":
              diff = Diff.diffChars(text1, text2);
              break;
          }

          var html = "<pre>";
          var addedCount = 0,
            removedCount = 0,
            unchangedCount = 0;

          diff.forEach(function (part) {
            var lines = part.value.split("\n");
            lines.forEach(function (line, i) {
              if (i === lines.length - 1 && line === "") return;
              var className = "diff-unchanged";
              var prefix = "  ";
              if (part.added) {
                className = "diff-added";
                prefix = "+ ";
                addedCount++;
              } else if (part.removed) {
                className = "diff-removed";
                prefix = "- ";
                removedCount++;
              } else {
                unchangedCount++;
              }
              html +=
                '<div class="diff-line ' + className + '">' + escapeHtml(prefix + line) + "</div>";
            });
          });

          html += "</pre>";
          resultEl.innerHTML = html;
          setStatus(
            "对比完成: " +
              addedCount +
              " 处新增, " +
              removedCount +
              " 处删除, " +
              unchangedCount +
              " 处不变",
            false
          );
        }, 100);
      }

      function clearAll() {
        document.getElementById("text1").value = "";
        document.getElementById("text2").value = "";
        document.getElementById("result").innerHTML =
          '<pre class="diff-unchanged">点击"对比"按钮查看文本差异...</pre>';
        setStatus("已清空");
      }

      function swapTexts() {
        var text1 = document.getElementById("text1");
        var text2 = document.getElementById("text2");
        var temp = text1.value;
        text1.value = text2.value;
        text2.value = temp;
        setStatus("已交换文本");
      }

      function copyResult() {
        var text = document.getElementById("result").textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            setStatus("已复制到剪贴板", true);
            setTimeout(function () {
              setStatus("就绪");
            }, 2000);
          })
          .catch(function () {
            setStatus("复制失败");
          });
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      // Auto-compare on mode change
      document.querySelectorAll('input[name="diffMode"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
          var text1 = document.getElementById("text1").value;
          var text2 = document.getElementById("text2").value;
          if (text1 || text2) compareTexts();
        });
      });

      // Theme
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
    
