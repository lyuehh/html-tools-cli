// @ts-nocheck
// Generated from tools/text/upside-down-text.html
// Source SHA-256: a0b05cd5ed667434ed3c1097bd12cbfbf65f94d1b5db90a243c951880e4e54ad
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        // 上下翻转字符映射
        const flipMap = {
          a: "ɐ",
          b: "q",
          c: "ɔ",
          d: "p",
          e: "ǝ",
          f: "ɟ",
          g: "ƃ",
          h: "ɥ",
          i: "ᴉ",
          j: "ɾ",
          k: "ʞ",
          l: "l",
          m: "ɯ",
          n: "u",
          o: "o",
          p: "d",
          q: "b",
          r: "ɹ",
          s: "s",
          t: "ʇ",
          u: "n",
          v: "ʌ",
          w: "ʍ",
          x: "x",
          y: "ʎ",
          z: "z",
          A: "∀",
          B: "q",
          C: "Ɔ",
          D: "p",
          E: "Ǝ",
          F: "Ⅎ",
          G: "⅁",
          H: "H",
          I: "I",
          J: "ſ",
          K: "ʞ",
          L: "˥",
          M: "W",
          N: "N",
          O: "O",
          P: "Ԁ",
          Q: "Q",
          R: "ɹ",
          S: "S",
          T: "⊥",
          U: "∩",
          V: "Λ",
          W: "M",
          X: "X",
          Y: "⅄",
          Z: "Z",
          0: "0",
          1: "Ɩ",
          2: "ᄅ",
          3: "Ɛ",
          4: "ㄣ",
          5: "ϛ",
          6: "9",
          7: "ㄥ",
          8: "8",
          9: "6",
          ".": "˙",
          ",": "'",
          "'": ",",
          '"': "„",
          "`": ",",
          "?": "¿",
          "!": "¡",
          "[": "]",
          "]": "[",
          "(": ")",
          ")": "(",
          "{": "}",
          "}": "{",
          "<": ">",
          ">": "<",
          "&": "⅋",
          _: "‾",
          ";": "؛",
          "/": "\\",
          "\\": "/"
        };

        // 镜像字符映射
        const mirrorMap = {
          a: "ɒ",
          b: "d",
          c: "ɔ",
          d: "b",
          e: "ɘ",
          f: "ʇ",
          g: "ǫ",
          h: "ʜ",
          i: "i",
          j: "ꞁ",
          k: "ʞ",
          l: "l",
          m: "m",
          n: "ᴎ",
          o: "o",
          p: "q",
          q: "p",
          r: "ɿ",
          s: "ꙅ",
          t: "ƚ",
          u: "u",
          v: "v",
          w: "w",
          x: "x",
          y: "ʏ",
          z: "ꙃ",
          A: "A",
          B: "ᙠ",
          C: "Ɔ",
          D: "ᗡ",
          E: "Ǝ",
          F: "ꟻ",
          G: "Ә",
          H: "H",
          I: "I",
          J: "Ꮭ",
          K: "ꓘ",
          L: "⅃",
          M: "M",
          N: "Ͷ",
          O: "O",
          P: "ꟼ",
          Q: "Ọ",
          R: "Я",
          S: "Ꙅ",
          T: "T",
          U: "U",
          V: "V",
          W: "W",
          X: "X",
          Y: "Y",
          Z: "Ꙃ",
          1: "߁",
          2: "ς",
          3: "Ɛ",
          4: "߂",
          5: "ट",
          6: "9",
          7: "٢",
          9: "6",
          "?": "⸮",
          "(": ")",
          ")": "(",
          "[": "]",
          "]": "[",
          "{": "}",
          "}": "{",
          "<": ">",
          ">": "<",
          "/": "\\",
          "\\": "/"
        };

        let currentMode = "flip";

        function flipText(text) {
          let result = "";
          for (const char of text) {
            result += flipMap[char] || char;
          }
          return result.split("").reverse().join("");
        }

        function mirrorText(text) {
          let result = "";
          for (const char of text) {
            result += mirrorMap[char] || char;
          }
          return result.split("").reverse().join("");
        }

        function bothText(text) {
          let result = "";
          for (const char of text) {
            result += flipMap[char] || char;
          }
          return result;
        }

        function convertText() {
          const input = document.getElementById("inputText").value;
          let output = "";

          switch (currentMode) {
            case "flip":
              output = flipText(input);
              break;
            case "reverse":
              output = mirrorText(input);
              break;
            case "both":
              output = bothText(input);
              break;
          }

          document.getElementById("outputText").value = output;
          document.getElementById("previewText").textContent = output || "ʇxǝʇ uʍop ǝpᴉsdn";
        }

        function setMode(mode) {
          currentMode = mode;
          document.querySelectorAll(".mode-btn").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.mode === mode) {
              btn.classList.add("active");
            }
          });
          convertText();
        }

        function loadSample() {
          document.getElementById("inputText").value = "Hello World! 你好世界";
          convertText();
        }

        function clearInput() {
          document.getElementById("inputText").value = "";
          document.getElementById("outputText").value = "";
          document.getElementById("previewText").textContent = "ʇxǝʇ uʍop ǝpᴉsdn";
        }

        function copyOutput() {
          const output = document.getElementById("outputText").value;
          if (!output) return;

          navigator.clipboard.writeText(output).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "已复制!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1500);
          });
        }

        function buildCharTable() {
          const table = document.getElementById("charTable");
          const showChars = "abcdefghijklmnopqrstuvwxyz".split("");

          table.innerHTML = "";
          showChars.forEach((char) => {
            const div = document.createElement("div");
            div.className = "char-item";
            const original = document.createElement("span");
            original.className = "original";
            original.textContent = char;
            const arrow = document.createElement("span");
            arrow.className = "arrow";
            arrow.textContent = "→";
            const flipped = document.createElement("span");
            flipped.className = "flipped";
            flipped.textContent = flipMap[char] || char;
            div.appendChild(original);
            div.appendChild(arrow);
            div.appendChild(flipped);
            table.appendChild(div);
          });
        }

        // 事件绑定
        document.getElementById("inputText").addEventListener("input", convertText);

        // 暴露全局函数
        window.setMode = setMode;
        window.loadSample = loadSample;
        window.clearInput = clearInput;
        window.copyOutput = copyOutput;

        // 初始化
        buildCharTable();
      })();

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
    
