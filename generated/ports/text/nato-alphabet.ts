// @ts-nocheck
// Generated from tools/text/nato-alphabet.html
// Source SHA-256: 5e03cac3535c44b6d2cadc97de82fd48ccd3f0cf56ab3722b3def29b0c6674f2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var natoAlphabet = {
        A: "Alpha",
        B: "Bravo",
        C: "Charlie",
        D: "Delta",
        E: "Echo",
        F: "Foxtrot",
        G: "Golf",
        H: "Hotel",
        I: "India",
        J: "Juliet",
        K: "Kilo",
        L: "Lima",
        M: "Mike",
        N: "November",
        O: "Oscar",
        P: "Papa",
        Q: "Quebec",
        R: "Romeo",
        S: "Sierra",
        T: "Tango",
        U: "Uniform",
        V: "Victor",
        W: "Whiskey",
        X: "X-ray",
        Y: "Yankee",
        Z: "Zulu",
        0: "Zero",
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine"
      };

      var inputEl = document.getElementById("input");
      var resultEl = document.getElementById("result");
      var refGridEl = document.getElementById("refGrid");
      var statusEl = document.getElementById("status");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function renderReference() {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
        letters.forEach(function (letter) {
          var item = document.createElement("div");
          item.className = "ref-item";

          var letterSpan = document.createElement("span");
          letterSpan.className = "letter";
          letterSpan.textContent = letter;

          var wordSpan = document.createElement("span");
          wordSpan.className = "word";
          wordSpan.textContent = natoAlphabet[letter];

          item.appendChild(letterSpan);
          item.appendChild(wordSpan);
          refGridEl.appendChild(item);
        });
      }

      function convert() {
        var text = inputEl.value.toUpperCase();

        while (resultEl.firstChild) {
          resultEl.removeChild(resultEl.firstChild);
        }

        if (!text) {
          var placeholder = document.createElement("span");
          placeholder.style.color = "var(--text-muted)";
          placeholder.textContent = "在上方输入文字...";
          resultEl.appendChild(placeholder);
          return;
        }

        var chars = text.split("");
        chars.forEach(function (char) {
          var word = natoAlphabet[char];
          if (word) {
            var span = document.createElement("span");
            span.className = "nato-word";

            var charSpan = document.createElement("span");
            charSpan.className = "char";
            charSpan.textContent = char;

            span.appendChild(charSpan);
            span.appendChild(document.createTextNode(word));
            resultEl.appendChild(span);
          } else if (char === " ") {
            var space = document.createElement("span");
            space.className = "nato-word";
            space.style.background = "transparent";
            space.style.border = "none";
            space.textContent = "(空格)";
            space.style.color = "var(--text-muted)";
            resultEl.appendChild(space);
          }
        });
      }

      function getResultText() {
        var text = inputEl.value.toUpperCase();
        var words = [];
        text.split("").forEach(function (char) {
          var word = natoAlphabet[char];
          if (word) {
            words.push(word);
          } else if (char === " ") {
            words.push("(space)");
          }
        });
        return words.join(" - ");
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          inputEl.value = await navigator.clipboard.readText();
          convert();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnCopy").onclick = async function () {
        var result = getResultText();
        if (result) {
          await navigator.clipboard.writeText(result);
          showStatus("已复制", "success");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        inputEl.value = "";
        convert();
        showStatus("已清空", "success");
      };

      inputEl.addEventListener("input", convert);
      renderReference();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
