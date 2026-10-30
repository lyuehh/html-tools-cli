// @ts-nocheck
// Generated from tools/dev/hex-viewer.html
// Source SHA-256: 8410b37798f4038b8e17f51de8dd6c3885c56c290a4f1f52980aa365427d714d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const textInput = document.getElementById("textInput");
      const hexOutput = document.getElementById("hexOutput");
      let currentBytes = new Uint8Array(0);

      textInput.addEventListener("input", () => {
        const encoder = new TextEncoder();
        currentBytes = encoder.encode(textInput.value);
        renderHex();
      });

      window.loadFile = function (event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          currentBytes = new Uint8Array(e.target.result);
          textInput.value = `[文件: ${file.name}, ${currentBytes.length} 字节]`;
          renderHex();
        };
        reader.readAsArrayBuffer(file);
      };

      function renderHex() {
        if (currentBytes.length === 0) {
          hexOutput.innerHTML = '<div style="color:var(--text-muted)">Hex 输出将显示在这里</div>';
          document.getElementById("byteCount").textContent = "0";
          document.getElementById("lineCount").textContent = "0";
          return;
        }

        let html = "";
        const bytesPerLine = 16;
        const lines = Math.ceil(currentBytes.length / bytesPerLine);

        for (let i = 0; i < lines; i++) {
          const offset = i * bytesPerLine;
          const lineBytes = currentBytes.slice(offset, offset + bytesPerLine);

          html += '<div class="hex-row">';
          html += `<span class="hex-offset">${offset.toString(16).padStart(8, "0")}</span>`;
          html += '<span class="hex-bytes">';

          for (let j = 0; j < bytesPerLine; j++) {
            if (j < lineBytes.length) {
              html += `<span class="hex-byte">${lineBytes[j].toString(16).padStart(2, "0")}</span>`;
            } else {
              html += '<span class="hex-byte">  </span>';
            }
          }

          html += "</span>";
          html += '<span class="hex-ascii">';

          for (let j = 0; j < lineBytes.length; j++) {
            const byte = lineBytes[j];
            const char = byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".";
            html += char;
          }

          html += "</span></div>";
        }

        hexOutput.innerHTML = html;
        document.getElementById("byteCount").textContent = currentBytes.length.toLocaleString();
        document.getElementById("lineCount").textContent = lines;
      }

      window.clearAll = function () {
        textInput.value = "";
        currentBytes = new Uint8Array(0);
        renderHex();
      };

      window.copyHex = function () {
        const hexStr = Array.from(currentBytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join(" ");
        navigator.clipboard.writeText(hexStr);
      };

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
    
