// @ts-nocheck
// Generated from tools/text/text-repeat.html
// Source SHA-256: 556d47db8361730c3eacf9159eb6a6b68cbac01ed7512cea978694c6304d1b4b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      document.getElementById("separator").addEventListener("change", function () {
        document.getElementById("customSepGroup").style.display =
          this.value === "custom" ? "block" : "none";
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const theme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };

      (function () {
        const theme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", theme);
      })();

      function repeatText() {
        const input = document.getElementById("input").value;
        const count = parseInt(document.getElementById("count").value) || 1;
        const sepSelect = document.getElementById("separator").value;
        const separator =
          sepSelect === "custom"
            ? document.getElementById("customSep").value
            : sepSelect.replace(/\\n/g, "\n");

        const result = Array(Math.min(count, 10000)).fill(input).join(separator);
        document.getElementById("output").value = result;

        document.getElementById("totalChars").textContent = result.length.toLocaleString();
        document.getElementById("totalLines").textContent = (result.match(/\n/g) || []).length + 1;
        document.getElementById("totalSize").textContent = formatSize(new Blob([result]).size);
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      window.copyResult = function () {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output);
          const toast = document.getElementById("toast");
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2000);
        }
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("totalChars").textContent = "0";
        document.getElementById("totalLines").textContent = "0";
        document.getElementById("totalSize").textContent = "0 B";
      };

      repeatText();
    
