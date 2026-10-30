// @ts-nocheck
// Generated from tools/text/line-number.html
// Source SHA-256: 0b936e6f4efb9a1c1d73689900c21d5dce0e4701d888ce95f98a9881f9a837ae
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      function process() {
        const input = document.getElementById("input").value;
        const mode = document.getElementById("mode").value;
        const start = parseInt(document.getElementById("start").value) || 1;
        const separator = document.getElementById("separator").value.replace("\\t", "\t");
        const padding = parseInt(document.getElementById("padding").value);

        const lines = input.split("\n");
        let result;

        if (mode === "add") {
          const maxWidth = padding || String(start + lines.length - 1).length;
          result = lines
            .map((line, i) => {
              const num = String(start + i).padStart(maxWidth, "0");
              return num + separator + line;
            })
            .join("\n");
        } else {
          result = lines
            .map((line) => {
              return line.replace(/^\s*\d+[\s.:)\-|]+/, "");
            })
            .join("\n");
        }

        document.getElementById("output").value = result;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output);
          const toast = document.getElementById("toast");
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }
      };

      window.swapTexts = function () {
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
      };

      process();
    
