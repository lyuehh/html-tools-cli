// @ts-nocheck
// Generated from tools/media/svg-placeholder.html
// Source SHA-256: 5a931c493731f841aecf0ffe3a43894856496392542b21fc9221740d9fa31d16
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const elements = {
        width: document.getElementById("width"),
        height: document.getElementById("height"),
        bgColor: document.getElementById("bgColor"),
        bgColorPicker: document.getElementById("bgColorPicker"),
        textColor: document.getElementById("textColor"),
        textColorPicker: document.getElementById("textColorPicker"),
        text: document.getElementById("text"),
        fontSize: document.getElementById("fontSize"),
        preview: document.getElementById("preview"),
        output: document.getElementById("output"),
        copyBtn: document.getElementById("copyBtn"),
        downloadSvg: document.getElementById("downloadSvg"),
        downloadPng: document.getElementById("downloadPng"),
        presetBtns: document.querySelectorAll(".preset-btn"),
        tabs: document.querySelectorAll(".tab")
      };

      let currentTab = "datauri";
      let currentSvg = "";

      function generateSvg() {
        const width = parseInt(elements.width.value) || 400;
        const height = parseInt(elements.height.value) || 300;
        const bgColor = elements.bgColor.value || "#cccccc";
        const textColor = elements.textColor.value || "#666666";
        const text = elements.text.value || `${width}×${height}`;
        let fontSize = parseInt(elements.fontSize.value) || 0;

        // Auto calculate font size if not specified
        if (fontSize === 0) {
          fontSize = Math.min(width, height) / 8;
          fontSize = Math.max(12, Math.min(fontSize, 72));
        }

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect fill="${bgColor}" width="${width}" height="${height}"/>
  <text fill="${textColor}" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" dominant-baseline="middle" x="${width / 2}" y="${height / 2}">${escapeHtml(text)}</text>
</svg>`;

        currentSvg = svg;
        return svg;
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      function getSvgDataUri(svg) {
        return "data:image/svg+xml," + encodeURIComponent(svg);
      }

      window.updatePreview = function () {
        const svg = generateSvg();
        const dataUri = getSvgDataUri(svg);
        elements.preview.src = dataUri;
        updateOutput();
      };

      function updateOutput() {
        const svg = currentSvg;
        const dataUri = getSvgDataUri(svg);

        switch (currentTab) {
          case "datauri":
            elements.output.textContent = dataUri;
            break;
          case "svg":
            elements.output.textContent = svg;
            break;
          case "img":
            elements.output.textContent = `<img src="${dataUri}" alt="placeholder">`;
            break;
        }
      }

      // Color picker sync
      elements.bgColorPicker.addEventListener("input", () => {
        elements.bgColor.value = elements.bgColorPicker.value;
        updatePreview();
      });

      elements.bgColor.addEventListener("input", () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(elements.bgColor.value)) {
          elements.bgColorPicker.value = elements.bgColor.value;
        }
        updatePreview();
      });

      elements.textColorPicker.addEventListener("input", () => {
        elements.textColor.value = elements.textColorPicker.value;
        updatePreview();
      });

      elements.textColor.addEventListener("input", () => {
        if (/^#[0-9A-Fa-f]{6}$/.test(elements.textColor.value)) {
          elements.textColorPicker.value = elements.textColor.value;
        }
        updatePreview();
      });

      // Input listeners
      ["width", "height", "text", "fontSize"].forEach((id) => {
        elements[id].addEventListener("input", updatePreview);
      });

      // Preset buttons
      elements.presetBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          elements.width.value = btn.dataset.width;
          elements.height.value = btn.dataset.height;
          updatePreview();
        });
      });

      // Tab switching
      elements.tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          elements.tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          currentTab = tab.dataset.tab;
          updateOutput();
        });
      });

      // Copy button
      elements.copyBtn.addEventListener("click", async () => {
        const text = elements.output.textContent;
        try {
          await navigator.clipboard.writeText(text);
          elements.copyBtn.textContent = "已复制";
          elements.copyBtn.classList.add("copied");
          setTimeout(() => {
            elements.copyBtn.textContent = "复制";
            elements.copyBtn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Copy failed:", err);
        }
      });

      // Download SVG
      elements.downloadSvg.addEventListener("click", () => {
        const blob = new Blob([currentSvg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `placeholder-${elements.width.value}x${elements.height.value}.svg`;
        a.click();
        URL.revokeObjectURL(url);
      });

      // Download PNG
      elements.downloadPng.addEventListener("click", () => {
        const width = parseInt(elements.width.value) || 400;
        const height = parseInt(elements.height.value) || 300;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = `placeholder-${width}x${height}.png`;
          a.click();
        };
        img.src = getSvgDataUri(currentSvg);
      });

      // Initialize
      updatePreview();

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
    
