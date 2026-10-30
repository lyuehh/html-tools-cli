// @ts-nocheck
// Generated from tools/media/svg-render.html
// Source SHA-256: ce49341cc33832b99872dc0dfb2bd7b618ced7d1c54931fb884592fde1d64c44
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      const svgInput = document.getElementById("svgInput");
      const preview = document.getElementById("preview");
      const previewContainer = document.getElementById("previewContainer");
      const exportWidth = document.getElementById("exportWidth");
      const exportHeight = document.getElementById("exportHeight");
      const exportFormat = document.getElementById("exportFormat");
      const bgColor = document.getElementById("bgColor");
      const transparentBg = document.getElementById("transparentBg");
      const showCheckerboard = document.getElementById("showCheckerboard");
      const jpegQuality = document.getElementById("jpegQuality");
      const svgInfo = document.getElementById("svgInfo");
      const originalSize = document.getElementById("originalSize");
      const exportSize = document.getElementById("exportSize");
      const canvas = document.getElementById("exportCanvas") || document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // ============================================
      // SVG Examples
      // ============================================
      const examples = {
        circle: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#00d4aa"/>
  <circle cx="100" cy="100" r="50" fill="#3b82f6"/>
  <circle cx="100" cy="100" r="20" fill="#ef4444"/>
</svg>`,
        gradient: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00d4aa"/>
      <stop offset="100%" style="stop-color:#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#grad)" rx="20"/>
</svg>`,
        star: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <polygon
    points="100,10 40,198 190,78 10,78 160,198"
    fill="#f59e0b"
    stroke="#00d4aa"
    stroke-width="3"/>
</svg>`,
        text: `<svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00d4aa"/>
      <stop offset="100%" style="stop-color:#ef4444"/>
    </linearGradient>
  </defs>
  <text x="150" y="60"
    font-family="Arial, sans-serif"
    font-size="40"
    font-weight="bold"
    fill="url(#textGrad)"
    text-anchor="middle">
    SVG Text
  </text>
</svg>`,
        pattern: `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="4" fill="#00d4aa"/>
    </pattern>
  </defs>
  <rect width="200" height="200" fill="url(#dots)"/>
  <rect x="50" y="50" width="100" height="100" fill="#3b82f6" opacity="0.8" rx="10"/>
</svg>`
      };

      // ============================================
      // Load Example
      // ============================================
      window.loadExample = function (name) {
        if (examples[name]) {
          svgInput.value = examples[name];
          renderSVG();
          saveState();
        }
      };

      // ============================================
      // Error Handling
      // ============================================
      function showError(message) {
        preview.textContent = "";
        const errorDiv = document.createElement("div");
        errorDiv.style.color = "var(--color-error)";
        errorDiv.style.padding = "var(--space-4)";
        errorDiv.style.textAlign = "center";
        errorDiv.style.fontSize = "0.9375rem";
        errorDiv.textContent = message;
        preview.appendChild(errorDiv);
        svgInfo.style.display = "none";
      }

      // ============================================
      // Render SVG
      // ============================================
      function renderSVG() {
        const svg = svgInput.value.trim();
        if (!svg) {
          showError("请输入 SVG 代码");
          return;
        }

        try {
          // Sanitize SVG with DOMPurify
          const cleanSvg = DOMPurify.sanitize(svg, {
            USE_PROFILES: { svg: true, svgFilters: true },
            ADD_TAGS: ["use"],
            ADD_ATTR: ["xlink:href", "xmlns:xlink"]
          });

          // Validate SVG
          const parser = new DOMParser();
          const doc = parser.parseFromString(cleanSvg, "image/svg+xml");
          const errorNode = doc.querySelector("parsererror");

          if (errorNode) {
            showError("SVG 解析错误: " + errorNode.textContent.substring(0, 100));
            return;
          }

          const svgElement = doc.querySelector("svg");
          if (!svgElement) {
            showError("未找到有效的 SVG 元素");
            return;
          }

          // Get dimensions
          let width = svgElement.getAttribute("width");
          let height = svgElement.getAttribute("height");
          const viewBox = svgElement.getAttribute("viewBox");

          if (viewBox && (!width || !height)) {
            const parts = viewBox.split(/\s+|,/);
            if (parts.length === 4) {
              width = width || parts[2];
              height = height || parts[3];
            }
          }

          width = parseFloat(width) || 100;
          height = parseFloat(height) || 100;

          // Update suggested export size
          if (exportWidth.value == 512 && exportHeight.value == 512) {
            const scale = Math.min(512 / width, 512 / height);
            exportWidth.value = Math.round(width * scale);
            exportHeight.value = Math.round(height * scale);
          }

          // Display info
          originalSize.textContent = width + " x " + height;
          exportSize.textContent = exportWidth.value + " x " + exportHeight.value;
          svgInfo.style.display = "block";

          // Preview
          preview.textContent = "";
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = cleanSvg;
          const previewSvg = tempDiv.firstElementChild;
          if (previewSvg) {
            previewSvg.style.maxWidth = "100%";
            previewSvg.style.maxHeight = "300px";
            preview.appendChild(previewSvg);
          }
        } catch (e) {
          showError("渲染错误: " + e.message);
        }
      }

      // ============================================
      // Generate Image Data
      // ============================================
      async function generateImageData() {
        const svg = svgInput.value.trim();
        if (!svg) {
          throw new Error("请输入 SVG 代码");
        }

        const width = parseInt(exportWidth.value) || 512;
        const height = parseInt(exportHeight.value) || 512;
        const format = exportFormat.value;
        const isTransparent = transparentBg.checked && format !== "jpeg";
        const quality = parseInt(jpegQuality.value) / 100;

        // Prepare SVG
        let svgData = DOMPurify.sanitize(svg, {
          USE_PROFILES: { svg: true, svgFilters: true },
          ADD_TAGS: ["use"],
          ADD_ATTR: ["xlink:href", "xmlns:xlink"]
        });

        if (!svgData.includes("xmlns")) {
          svgData = svgData.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        }

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Clear and set background
        if (!isTransparent) {
          ctx.fillStyle = bgColor.value;
          ctx.fillRect(0, 0, width, height);
        } else {
          ctx.clearRect(0, 0, width, height);
        }

        // Create image
        return new Promise((resolve, reject) => {
          const img = new Image();
          const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
          const url = URL.createObjectURL(blob);

          img.onload = function () {
            const scale = Math.min(width / img.width, height / img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const x = (width - scaledWidth) / 2;
            const y = (height - scaledHeight) / 2;

            ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
            URL.revokeObjectURL(url);

            const mimeType =
              format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
            const dataUrl = canvas.toDataURL(mimeType, quality);
            resolve(dataUrl);
          };

          img.onerror = function () {
            URL.revokeObjectURL(url);
            reject(new Error("SVG 加载失败"));
          };

          img.src = url;
        });
      }

      // ============================================
      // Download Image
      // ============================================
      window.downloadImage = async function () {
        try {
          const dataUrl = await generateImageData();
          const format = exportFormat.value;
          const link = document.createElement("a");
          link.download = "svg-export." + format;
          link.href = dataUrl;
          link.click();
        } catch (e) {
          alert("导出失败: " + e.message);
        }
      };

      // ============================================
      // Copy to Clipboard
      // ============================================
      window.copyToClipboard = async function () {
        try {
          const dataUrl = await generateImageData();
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
          alert("已复制到剪贴板");
        } catch (e) {
          alert("复制失败: " + e.message);
        }
      };

      // ============================================
      // Clear Input
      // ============================================
      window.clearInput = function () {
        svgInput.value = "";
        preview.textContent = "";
        svgInfo.style.display = "none";
        saveState();
      };

      // ============================================
      // Event Listeners
      // ============================================
      showCheckerboard.addEventListener("change", function () {
        previewContainer.classList.toggle("checkerboard", showCheckerboard.checked);
      });

      exportFormat.addEventListener("change", function () {
        const format = exportFormat.value;
        if (format === "jpeg") {
          transparentBg.checked = false;
          transparentBg.disabled = true;
        } else {
          transparentBg.disabled = false;
        }
      });

      // ============================================
      // State Persistence
      // ============================================
      function saveState() {
        const state = {
          svg: svgInput.value,
          width: exportWidth.value,
          height: exportHeight.value,
          format: exportFormat.value,
          bg: bgColor.value,
          transparent: transparentBg.checked,
          quality: jpegQuality.value
        };
        try {
          const hash = btoa(encodeURIComponent(JSON.stringify(state)));
          history.replaceState(null, "", "#" + hash);
        } catch (e) {
          console.error("保存状态失败:", e);
        }
      }

      function loadState() {
        const hash = window.location.hash.slice(1);
        if (hash) {
          try {
            const state = JSON.parse(decodeURIComponent(atob(hash)));
            if (state.svg) svgInput.value = state.svg;
            if (state.width) exportWidth.value = state.width;
            if (state.height) exportHeight.value = state.height;
            if (state.format) exportFormat.value = state.format;
            if (state.bg) bgColor.value = state.bg;
            if (state.transparent !== undefined) transparentBg.checked = state.transparent;
            if (state.quality) jpegQuality.value = state.quality;
            renderSVG();
          } catch (e) {
            console.error("加载状态失败:", e);
          }
        }
      }

      // Auto render and save on input
      var renderTimeout;
      svgInput.addEventListener("input", function () {
        clearTimeout(renderTimeout);
        renderTimeout = setTimeout(function () {
          renderSVG();
          saveState();
        }, 300);
      });

      // Save on settings change
      [exportWidth, exportHeight, exportFormat, bgColor, transparentBg, jpegQuality].forEach(
        function (el) {
          el.addEventListener("change", function () {
            exportSize.textContent = exportWidth.value + " x " + exportHeight.value;
            saveState();
          });
        }
      );

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadState();
      previewContainer.classList.add("checkerboard");
    
