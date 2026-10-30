// @ts-nocheck
// Generated from tools/dev/json-minify.html
// Source SHA-256: e47543438d84bb03a3228723c8d84675062c486395d9aa44edc9a9d68ac385eb
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
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        const errorMsg = document.getElementById("errorMsg");

        input.classList.remove("error");
        errorMsg.classList.remove("show");

        const text = input.value.trim();
        if (!text) {
          output.value = "";
          updateStats(0, 0);
          return;
        }

        try {
          const parsed = JSON.parse(text);
          const minified = JSON.stringify(parsed);
          output.value = minified;

          const originalSize = new Blob([text]).size;
          const compressedSize = new Blob([minified]).size;
          updateStats(originalSize, compressedSize);

          document.getElementById("inputSize").textContent = formatSize(originalSize);
          document.getElementById("outputSize").textContent = formatSize(compressedSize);
        } catch (e) {
          input.classList.add("error");
          errorMsg.textContent = "❌ JSON 解析错误: " + e.message;
          errorMsg.classList.add("show");
          output.value = "";
        }
      }

      window.beautify = function () {
        const input = document.getElementById("input");
        const errorMsg = document.getElementById("errorMsg");

        input.classList.remove("error");
        errorMsg.classList.remove("show");

        try {
          const parsed = JSON.parse(input.value);
          input.value = JSON.stringify(parsed, null, 2);
          minify();
        } catch (e) {
          input.classList.add("error");
          errorMsg.textContent = "❌ JSON 解析错误: " + e.message;
          errorMsg.classList.add("show");
        }
      };

      function updateStats(original, compressed) {
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

      window.swapTexts = function () {
        const input = document.getElementById("input");
        const output = document.getElementById("output");
        input.value = output.value;
        minify();
      };

      window.clearAll = function () {
        document.getElementById("input").value = "";
        document.getElementById("output").value = "";
        document.getElementById("errorMsg").classList.remove("show");
        document.getElementById("input").classList.remove("error");
        updateStats(0, 0);
        document.getElementById("inputSize").textContent = "0 B";
        document.getElementById("outputSize").textContent = "0 B";
      };

      minify();
    
