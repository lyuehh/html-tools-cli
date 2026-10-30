// @ts-nocheck
// Generated from tools/text/text-randomizer.html
// Source SHA-256: 3dc99f9affc3e957e1165dded1829d1c5acccc593205b5dfa8b365da0bd8ef26
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function shuffle(arr) {
        var result = arr.slice();
        for (var i = result.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = result[i];
          result[i] = result[j];
          result[j] = temp;
        }
        return result;
      }

      window.randomize = function () {
        var input = document.getElementById("input").value;
        var mode = document.querySelector('input[name="mode"]:checked').value;
        var result = "";

        switch (mode) {
          case "lines":
            var lines = input.split("\n");
            result = shuffle(lines).join("\n");
            break;
          case "words":
            var words = input.split(/\s+/);
            result = shuffle(words).join(" ");
            break;
          case "chars":
            var chars = input.split("");
            result = shuffle(chars).join("");
            break;
          case "wordChars":
            var wordsArr = input.split(/(\s+)/);
            result = wordsArr
              .map(function (word) {
                if (/^\s+$/.test(word)) return word;
                return shuffle(word.split("")).join("");
              })
              .join("");
            break;
        }

        document.getElementById("output").value = result;
      };

      window.reverse = function () {
        var input = document.getElementById("input").value;
        var mode = document.querySelector('input[name="mode"]:checked').value;
        var result = "";

        switch (mode) {
          case "lines":
            result = input.split("\n").reverse().join("\n");
            break;
          case "words":
            result = input.split(/\s+/).reverse().join(" ");
            break;
          case "chars":
            result = input.split("").reverse().join("");
            break;
          case "wordChars":
            result = input
              .split(/(\s+)/)
              .map(function (word) {
                if (/^\s+$/.test(word)) return word;
                return word.split("").reverse().join("");
              })
              .join("");
            break;
        }

        document.getElementById("output").value = result;
      };

      window.copyOutput = function () {
        const target = typeof event !== "undefined" ? event.target : null;
        navigator.clipboard.writeText(document.getElementById("output").value).then(function () {
          if (!target) return;
          target.textContent = "已复制!";
          setTimeout(function () {
            target.textContent = "复制结果";
          }, 1500);
        });
      };

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
