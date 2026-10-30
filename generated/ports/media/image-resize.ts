// @ts-nocheck
// Generated from tools/media/image-resize.html
// Source SHA-256: 5a7cdf0ea73cf526966c15e61dbc9f8b9df5633b02f1d9650632e35475b34c40
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Elements
      // ============================================
      var uploadZone = document.getElementById("uploadZone");
      var fileInput = document.getElementById("fileInput");
      var quality = document.getElementById("quality");
      var qualityValue = document.getElementById("qualityValue");
      var maxWidth = document.getElementById("maxWidth");
      var maxHeight = document.getElementById("maxHeight");
      var keepRatio = document.getElementById("keepRatio");
      var comparison = document.getElementById("comparison");
      var originalPreview = document.getElementById("originalPreview");
      var compressedPreview = document.getElementById("compressedPreview");
      var canvas = document.getElementById("outputCanvas") || document.createElement("canvas");
      var ctx = canvas.getContext("2d");

      var currentFile = null;
      var currentFormat = "jpeg";
      var compressedDataUrl = null;

      // ============================================
      // Format Button Handler
      // ============================================
      document.querySelectorAll(".format-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".format-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentFormat = btn.dataset.format;
          if (currentFile) {
            processImage();
          }
        });
      });

      // ============================================
      // Quality Slider Handler
      // ============================================
      quality.addEventListener("input", function () {
        qualityValue.textContent = quality.value + "%";
      });

      quality.addEventListener("change", function () {
        if (currentFile) {
          processImage();
        }
      });

      // ============================================
      // Dimensions Change Handler
      // ============================================
      [maxWidth, maxHeight].forEach(function (el) {
        el.addEventListener("change", function () {
          if (currentFile) {
            processImage();
          }
        });
      });

      // ============================================
      // Drag & Drop Handlers
      // ============================================
      uploadZone.addEventListener("dragover", function (e) {
        e.preventDefault();
        uploadZone.classList.add("dragover");
      });

      uploadZone.addEventListener("dragleave", function () {
        uploadZone.classList.remove("dragover");
      });

      uploadZone.addEventListener("drop", function (e) {
        e.preventDefault();
        uploadZone.classList.remove("dragover");
        var files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
          handleFile(files[0]);
        }
      });

      // ============================================
      // File Input Handler
      // ============================================
      fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
          handleFile(fileInput.files[0]);
        }
      });

      // ============================================
      // File Handling
      // ============================================
      function handleFile(file) {
        currentFile = file;

        var reader = new FileReader();
        reader.onload = function (e) {
          originalPreview.src = e.target.result;
          processImage();
        };
        reader.readAsDataURL(file);
      }

      // ============================================
      // Utility Functions
      // ============================================
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      // ============================================
      // Image Processing
      // ============================================
      window.processImage = function () {
        if (!currentFile) {
          alert("请先选择图片");
          return;
        }

        var img = new Image();
        img.onload = function () {
          var originalWidth = img.width;
          var originalHeight = img.height;
          var targetWidth = parseInt(maxWidth.value) || originalWidth;
          var targetHeight = parseInt(maxHeight.value) || originalHeight;

          // 保持比例
          if (keepRatio.checked) {
            var ratioW = targetWidth / originalWidth;
            var ratioH = targetHeight / originalHeight;
            var ratio = Math.min(ratioW, ratioH, 1); // 不放大
            targetWidth = Math.round(originalWidth * ratio);
            targetHeight = Math.round(originalHeight * ratio);
          } else {
            targetWidth = Math.min(targetWidth, originalWidth);
            targetHeight = Math.min(targetHeight, originalHeight);
          }

          // 设置 canvas
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // 绘制
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // 压缩
          var mimeType =
            currentFormat === "jpeg"
              ? "image/jpeg"
              : currentFormat === "webp"
                ? "image/webp"
                : "image/png";
          var qualityVal = currentFormat === "png" ? undefined : parseInt(quality.value) / 100;

          compressedDataUrl = canvas.toDataURL(mimeType, qualityVal);
          compressedPreview.src = compressedDataUrl;

          // 计算大小
          var originalSize = currentFile.size;
          var compressedSize = Math.round((compressedDataUrl.length - 22) * 0.75); // base64 估算

          // 更新统计
          document.getElementById("originalSizeStat").textContent = formatSize(originalSize);
          document.getElementById("compressedSizeStat").textContent = formatSize(compressedSize);

          var saved = originalSize - compressedSize;
          var savedPercent = ((saved / originalSize) * 100).toFixed(1);
          var savedEl = document.getElementById("savedStat");
          savedEl.textContent =
            (saved > 0 ? "-" : "+") +
            formatSize(Math.abs(saved)) +
            " (" +
            Math.abs(savedPercent) +
            "%)";
          savedEl.className = "stat-value " + (saved > 0 ? "positive" : "negative");

          var ratio = (originalSize / compressedSize).toFixed(2);
          document.getElementById("ratioStat").textContent = ratio + "x";

          // 更新信息
          document.getElementById("originalInfo").textContent =
            originalWidth + " x " + originalHeight;
          document.getElementById("compressedInfo").textContent =
            targetWidth + " x " + targetHeight;

          // 显示对比
          comparison.classList.add("show");
        };

        img.src = originalPreview.src;
      };

      // ============================================
      // Download Handler
      // ============================================
      window.downloadCompressed = function () {
        if (!compressedDataUrl) {
          alert("请先压缩图片");
          return;
        }

        var ext = currentFormat === "jpeg" ? "jpg" : currentFormat;
        var originalName = currentFile ? currentFile.name.replace(/\.[^.]+$/, "") : "image";

        var link = document.createElement("a");
        link.download = originalName + "-compressed." + ext;
        link.href = compressedDataUrl;
        link.click();
      };

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      window.toggleTheme = toggleTheme;

      // ============================================
      // Initialize
      // ============================================
      initTheme();
    
