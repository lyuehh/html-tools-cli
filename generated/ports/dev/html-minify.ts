// @ts-nocheck
// Generated from tools/dev/html-minify.html
// Source SHA-256: 86f014b3ddcb3f008328ad3760b7e721f113cd9286835d8b37d0b8e7df6b2b9f
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
        let html = document.getElementById("input").value;
        const removeComments = document.getElementById("removeComments").checked;
        const removeWhitespace = document.getElementById("removeWhitespace").checked;
        const removeNewlines = document.getElementById("removeNewlines").checked;
        const removeQuotes = document.getElementById("removeQuotes").checked;

        const originalSize = new Blob([html]).size;

        if (removeComments) {
          // Remove HTML comments (except conditional comments)
          html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, "");
        }

        if (removeWhitespace) {
          // Remove whitespace between tags
          html = html.replace(/>\s+</g, "><");
          // Collapse multiple spaces
          html = html.replace(/\s{2,}/g, " ");
        }

        if (removeNewlines) {
          // Remove newlines (except in pre/script/style/textarea)
          html = html.replace(/\n/g, "");
        }

        if (removeQuotes) {
          // Remove optional quotes from attributes (simple cases)
          html = html.replace(/=["']([a-zA-Z0-9_-]+)["']/g, "=$1");
        }

        // Trim
        html = html.trim();

        document.getElementById("output").value = html;

        const compressedSize = new Blob([html]).size;
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
    
