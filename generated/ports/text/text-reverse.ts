// @ts-nocheck
// Generated from tools/text/text-reverse.html
// Source SHA-256: 6906e4251c3f225e333b91e86bb396a8e2029de1ce54123e4b03fb15cec353e8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentMode = "char";

      window.toggleTheme = function () {
        const html = document.documentElement;
        const theme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };

      function loadTheme() {
        const theme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.setMode = function (mode) {
        currentMode = mode;
        document.querySelectorAll(".mode-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.mode === mode);
        });
        processText();
      };

      function processText() {
        const input = document.getElementById("input").value;
        let output = "";

        switch (currentMode) {
          case "char":
            output = [...input].reverse().join("");
            break;
          case "word":
            output = input.split(/(\s+)/).reverse().join("");
            break;
          case "line":
            output = input.split("\n").reverse().join("\n");
            break;
          case "sentence":
            output = input
              .split(/([.!?。！？]+)/)
              .reduce((acc, part, i, arr) => {
                if (i % 2 === 0 && i < arr.length - 1) {
                  return [part + (arr[i + 1] || ""), ...acc];
                }
                return acc;
              }, [])
              .join(" ")
              .trim();
            break;
        }

        document.getElementById("output").value = output;
        updateStats(input);
      }

      function updateStats(text) {
        document.getElementById("charCount").textContent = text.length;
        document.getElementById("wordCount").textContent = text.trim()
          ? text.trim().split(/\s+/).length
          : 0;
        document.getElementById("lineCount").textContent = text ? text.split("\n").length : 0;
      }

      window.swapTexts = function () {
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
        updateStats(input.value);
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        updateStats("");
      };

      window.copyResult = function () {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output);
          showToast("已复制到剪贴板");
        }
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      loadTheme();
      processText();
    
