// @ts-nocheck
// Generated from tools/dev/js-minify.html
// Source SHA-256: 3fe2279acd124da199d6a99ac1807ae89a508b8bf342058149b6cfc1f5d69aa5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      function minify() {
        let code = document.getElementById("input").value;
        const removeComments = document.getElementById("removeComments").checked;
        const removeWhitespace = document.getElementById("removeWhitespace").checked;
        const removeNewlines = document.getElementById("removeNewlines").checked;
        const removeSemicolons = document.getElementById("removeSemicolons").checked;

        const originalSize = new Blob([code]).size;

        if (removeComments) {
          // Remove single-line comments (but not in strings)
          code = code.replace(/\/\/[^\n]*/g, "");
          // Remove multi-line comments
          code = code.replace(/\/\*[\s\S]*?\*\//g, "");
        }

        if (removeWhitespace) {
          // Remove extra spaces (keep single spaces)
          code = code.replace(/[ \t]+/g, " ");
          // Remove spaces around operators
          code = code.replace(/\s*([{}\[\]:;,=+\-*/<>!&|?])\s*/g, "$1");
          // Restore necessary spaces
          code = code.replace(
            /([a-zA-Z_$])(return|var|let|const|function|if|else|for|while|do|switch|case|break|continue|new|typeof|instanceof|in|of|class|extends|import|export|from|default|try|catch|finally|throw|async|await)/g,
            "$1 $2"
          );
          code = code.replace(
            /(return|var|let|const|function|if|else|for|while|do|switch|case|break|continue|new|typeof|instanceof|class|extends|import|export|from|default|try|catch|finally|throw|async|await)([a-zA-Z_$])/g,
            "$1 $2"
          );
        }

        if (removeNewlines) {
          code = code.replace(/\n+/g, "");
        }

        if (removeSemicolons) {
          // Remove trailing semicolons before closing braces
          code = code.replace(/;}/g, "}");
          // Remove double semicolons
          code = code.replace(/;;+/g, ";");
        }

        // Clean up
        code = code.trim();

        document.getElementById("output").value = code;

        const compressedSize = new Blob([code]).size;
        updateStats(originalSize, compressedSize);
      }

      function updateStats(original, compressed) {
        document.getElementById("inputSize").textContent = formatSize(original);
        document.getElementById("outputSize").textContent = formatSize(compressed);
        document.getElementById("originalSize").textContent = formatSize(original);
        document.getElementById("compressedSize").textContent = formatSize(compressed);

        const saved = original - compressed;
        document.getElementById("savedSize").textContent = formatSize(Math.max(0, saved));

        const percent = original > 0 ? ((saved / original) * 100).toFixed(1) : 0;
        document.getElementById("savedPercent").textContent = percent + "%";
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

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        updateStats(0, 0);
      };

      minify();
    
