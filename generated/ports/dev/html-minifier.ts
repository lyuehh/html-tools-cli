// @ts-nocheck
// Generated from tools/dev/html-minifier.html
// Source SHA-256: 7540dcd670104a09d455182c7d79df7e45955e68bf7a76f095d49c4bf6dedf16
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      function minifyHTML() {
        let html = document.getElementById("input").value;
        const originalSize = new Blob([html]).size;

        const removeComments = document.getElementById("removeComments").checked;
        const collapseWhitespace = document.getElementById("collapseWhitespace").checked;
        const removeEmptyAttrs = document.getElementById("removeEmptyAttrs").checked;

        if (removeComments) {
          html = html.replace(/<!--[\s\S]*?-->/g, "");
        }

        if (collapseWhitespace) {
          html = html
            .replace(/\s+/g, " ")
            .replace(/>\s+</g, "><")
            .replace(/\s+>/g, ">")
            .replace(/<\s+/g, "<")
            .trim();
        }

        if (removeEmptyAttrs) {
          html = html.replace(/\s+(class|id|style|title|alt)=""/gi, "");
        }

        document.getElementById("output").value = html;

        const compressedSize = new Blob([html]).size;
        const ratio = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : 0;

        document.getElementById("originalSize").textContent = formatSize(originalSize);
        document.getElementById("compressedSize").textContent = formatSize(compressedSize);
        document.getElementById("compressionRatio").textContent = ratio + "%";
      }

      function beautifyHTML() {
        let html = document.getElementById("input").value;
        const originalSize = new Blob([html]).size;

        // Simple beautifier
        let result = "";
        let indent = 0;
        const indentStr = "  ";

        // Normalize whitespace
        html = html.replace(/>\s+</g, ">\n<").replace(/\s+/g, " ").trim();

        const lines = html.split("\n");

        for (let line of lines) {
          line = line.trim();
          if (!line) continue;

          // Check if closing tag
          if (line.match(/^<\/\w/)) {
            indent = Math.max(0, indent - 1);
          }

          result += indentStr.repeat(indent) + line + "\n";

          // Check if opening tag (not self-closing)
          if (
            line.match(/^<\w[^>]*[^\/]>$/) &&
            !line.match(/^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i)
          ) {
            indent++;
          }

          // Handle self-closing and void tags
          if (
            line.match(
              /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)[^>]*>/i
            )
          ) {
            // Don't change indent
          }
        }

        document.getElementById("output").value = result.trim();

        const compressedSize = new Blob([result]).size;
        document.getElementById("originalSize").textContent = formatSize(originalSize);
        document.getElementById("compressedSize").textContent = formatSize(compressedSize);
        document.getElementById("compressionRatio").textContent = "-";
      }

      function copyOutput() {
        const output = document.getElementById("output").value;
        if (output) {
          navigator.clipboard.writeText(output);
        }
      }

      function clearAll() {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("originalSize").textContent = "0 B";
        document.getElementById("compressedSize").textContent = "0 B";
        document.getElementById("compressionRatio").textContent = "0%";
      }

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
