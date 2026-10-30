// @ts-nocheck
// Generated from tools/media/svg-to-png.html
// Source SHA-256: 2b25d19a66cb599a3957f13531cb5e69b4a5469d45fe36009d60d0f6fcb77170
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentSvg = null;
      let originalWidth = 0;
      let originalHeight = 0;
      let pngDataUrl = null;

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      // Tab switching
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById("tab-" + tab.dataset.tab).classList.add("active");
        });
      });

      // File upload
      const uploadZone = document.getElementById("uploadZone");
      const fileInput = document.getElementById("fileInput");

      uploadZone.addEventListener("click", () => fileInput.click());

      uploadZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadZone.classList.add("dragover");
      });

      uploadZone.addEventListener("dragleave", () => {
        uploadZone.classList.remove("dragover");
      });

      uploadZone.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadZone.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file && file.type === "image/svg+xml") {
          loadSvgFile(file);
        } else {
          showError("请上传 SVG 文件");
        }
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          loadSvgFile(file);
        }
      });

      function loadSvgFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          loadSvgContent(e.target.result);
        };
        reader.readAsText(file);
      }

      window.loadFromCode = function () {
        const code = document.getElementById("svgCode").value.trim();
        if (!code) {
          showError("请输入 SVG 代码");
          return;
        }
        loadSvgContent(code);
      };

      window.loadFromUrl = function () {
        const url = document.getElementById("svgUrl").value.trim();
        if (!url) {
          showError("请输入 SVG URL");
          return;
        }

        fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error("无法加载 URL");
            return response.text();
          })
          .then((svgContent) => {
            loadSvgContent(svgContent);
          })
          .catch((err) => {
            showError("加载失败: " + err.message);
          });
      };

      function loadSvgContent(svgContent) {
        hideMessages();

        // Validate SVG
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgContent, "image/svg+xml");
        const errorNode = doc.querySelector("parsererror");

        if (errorNode) {
          showError("无效的 SVG 格式");
          return;
        }

        const svgElement = doc.querySelector("svg");
        if (!svgElement) {
          showError("未找到 SVG 元素");
          return;
        }

        currentSvg = svgContent;

        // Get original dimensions
        let width = svgElement.getAttribute("width");
        let height = svgElement.getAttribute("height");
        const viewBox = svgElement.getAttribute("viewBox");

        if (viewBox && (!width || !height)) {
          const vb = viewBox.split(/\s+|,/).map(Number);
          width = width || vb[2];
          height = height || vb[3];
        }

        originalWidth = parseFloat(width) || 100;
        originalHeight = parseFloat(height) || 100;

        document.getElementById("originalSize").textContent =
          `原始尺寸: ${originalWidth}×${originalHeight}`;

        // Set output dimensions if keep ratio
        if (document.getElementById("keepRatio").checked) {
          document.getElementById("outputWidth").value = originalWidth;
          document.getElementById("outputHeight").value = originalHeight;
        }

        updateOutputSize();

        // Show preview
        const previewContainer = document.getElementById("previewContainer");
        previewContainer.innerHTML = svgContent;

        // Enable buttons
        document.getElementById("convertBtn").disabled = false;

        showSuccess("SVG 加载成功!");
      }

      function updateOutputSize() {
        const width = document.getElementById("outputWidth").value;
        const height = document.getElementById("outputHeight").value;
        document.getElementById("outputSize").textContent = `输出尺寸: ${width}×${height}`;
      }

      // Keep ratio handling
      document.getElementById("outputWidth").addEventListener("input", () => {
        if (document.getElementById("keepRatio").checked && originalWidth > 0) {
          const ratio = originalHeight / originalWidth;
          const newHeight = Math.round(document.getElementById("outputWidth").value * ratio);
          document.getElementById("outputHeight").value = newHeight;
        }
        updateOutputSize();
      });

      document.getElementById("outputHeight").addEventListener("input", () => {
        if (document.getElementById("keepRatio").checked && originalHeight > 0) {
          const ratio = originalWidth / originalHeight;
          const newWidth = Math.round(document.getElementById("outputHeight").value * ratio);
          document.getElementById("outputWidth").value = newWidth;
        }
        updateOutputSize();
      });

      // Scale slider
      document.getElementById("scaleSlider").addEventListener("input", (e) => {
        const scale = parseFloat(e.target.value);
        document.getElementById("scaleValue").textContent = scale.toFixed(1) + "x";

        if (originalWidth > 0 && originalHeight > 0) {
          document.getElementById("outputWidth").value = Math.round(originalWidth * scale);
          document.getElementById("outputHeight").value = Math.round(originalHeight * scale);
          updateOutputSize();
        }
      });

      window.setPreset = function (width, height) {
        document.getElementById("outputWidth").value = width;
        document.getElementById("outputHeight").value = height;
        document.getElementById("keepRatio").checked = width === height;
        updateOutputSize();

        // Update scale slider
        if (originalWidth > 0) {
          const scale = width / originalWidth;
          document.getElementById("scaleSlider").value = Math.min(4, Math.max(0.1, scale));
          document.getElementById("scaleValue").textContent = scale.toFixed(1) + "x";
        }
      };

      window.convertToPng = function () {
        if (!currentSvg) {
          showError("请先加载 SVG");
          return;
        }

        hideMessages();

        const canvas = document.getElementById("hiddenCanvas");
        const ctx = canvas.getContext("2d");
        const width = parseInt(document.getElementById("outputWidth").value);
        const height = parseInt(document.getElementById("outputHeight").value);

        canvas.width = width;
        canvas.height = height;

        // Clear canvas
        if (document.getElementById("transparentBg").checked) {
          ctx.clearRect(0, 0, width, height);
        } else {
          ctx.fillStyle = document.getElementById("bgColor").value;
          ctx.fillRect(0, 0, width, height);
        }

        // Create image from SVG
        const img = new Image();
        const svgBlob = new Blob([currentSvg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);

          pngDataUrl = canvas.toDataURL("image/png");

          // Update preview with PNG
          const previewContainer = document.getElementById("previewContainer");
          previewContainer.innerHTML = `<img src="${pngDataUrl}" alt="PNG Preview">`;

          document.getElementById("downloadBtn").disabled = false;
          showSuccess(`PNG 转换成功! 尺寸: ${width}×${height}px`);
        };

        img.onerror = () => {
          URL.revokeObjectURL(url);
          showError("SVG 转换失败，请检查 SVG 格式");
        };

        img.src = url;
      };

      window.downloadPng = function () {
        if (!pngDataUrl) {
          showError("请先转换为 PNG");
          return;
        }

        const link = document.createElement("a");
        link.download = "converted-image.png";
        link.href = pngDataUrl;
        link.click();

        showSuccess("PNG 下载已开始");
      };

      window.copyToClipboard = async function () {
        if (!pngDataUrl) {
          showError("请先转换为 PNG");
          return;
        }

        try {
          const response = await fetch(pngDataUrl);
          const blob = await response.blob();
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showSuccess("PNG 已复制到剪贴板");
        } catch (err) {
          showError("复制失败: " + err.message);
        }
      };

      function showError(message) {
        const el = document.getElementById("errorMessage");
        el.textContent = message;
        el.style.display = "block";
        document.getElementById("successMessage").style.display = "none";
      }

      function showSuccess(message) {
        const el = document.getElementById("successMessage");
        el.textContent = message;
        el.style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
      }

      function hideMessages() {
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("successMessage").style.display = "none";
      }

      // Initialize
      updateOutputSize();
    
