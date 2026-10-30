// @ts-nocheck
// Generated from tools/media/image-crop.html
// Source SHA-256: f6137619280d970ffdf2f957b70fca0c028a174f045195264b8f470e875c1988
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const cropContainer = document.getElementById("cropContainer");
      const sourceImage = document.getElementById("sourceImage");
      const cropBox = document.getElementById("cropBox");
      const cropInfo = document.getElementById("cropInfo");
      const imageInfo = document.getElementById("imageInfo");
      const controlsCard = document.getElementById("controlsCard");
      const previewSection = document.getElementById("previewSection");
      const previewCanvas = document.getElementById("previewCanvas");
      const ctx = previewCanvas.getContext("2d");

      let originalImage = null;
      let imageScale = 1;
      let aspectRatio = null;
      let isDragging = false;
      let isResizing = false;
      let currentHandle = null;
      let startX, startY, startLeft, startTop, startWidth, startHeight;

      // Upload handlers
      uploadArea.addEventListener("click", () => fileInput.click());
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
      uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("dragover"));
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        if (e.dataTransfer.files[0]) {
          loadImage(e.dataTransfer.files[0]);
        }
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          loadImage(e.target.files[0]);
        }
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage = new Image();
          originalImage.onload = () => {
            sourceImage.src = e.target.result;
            sourceImage.onload = () => {
              initCropArea();
              document.getElementById("originalSize").textContent =
                `${originalImage.width} × ${originalImage.height}`;
              document.getElementById("fileSize").textContent = formatFileSize(file.size);
              imageInfo.style.display = "flex";
              controlsCard.style.display = "block";
              cropContainer.classList.add("visible");
              previewSection.classList.add("visible");
            };
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      function initCropArea() {
        const rect = sourceImage.getBoundingClientRect();
        const containerRect = cropContainer.getBoundingClientRect();

        imageScale = originalImage.width / sourceImage.width;

        const offsetX = (containerRect.width - rect.width) / 2;
        const offsetY = (containerRect.height - rect.height) / 2;

        const size = Math.min(rect.width, rect.height) * 0.8;
        const left = offsetX + (rect.width - size) / 2;
        const top = offsetY + (rect.height - size) / 2;

        setCropBox(left, top, size, size);
      }

      function setCropBox(left, top, width, height) {
        const rect = sourceImage.getBoundingClientRect();
        const containerRect = cropContainer.getBoundingClientRect();
        const offsetX = (containerRect.width - rect.width) / 2;
        const offsetY = (containerRect.height - rect.height) / 2;

        // Constrain to image bounds
        left = Math.max(offsetX, Math.min(left, offsetX + rect.width - width));
        top = Math.max(offsetY, Math.min(top, offsetY + rect.height - height));
        width = Math.min(width, offsetX + rect.width - left);
        height = Math.min(height, offsetY + rect.height - top);

        cropBox.style.left = left + "px";
        cropBox.style.top = top + "px";
        cropBox.style.width = width + "px";
        cropBox.style.height = height + "px";

        updateCropInfo();
        updatePreview();
      }

      function getCropValues() {
        const rect = sourceImage.getBoundingClientRect();
        const containerRect = cropContainer.getBoundingClientRect();
        const offsetX = (containerRect.width - rect.width) / 2;
        const offsetY = (containerRect.height - rect.height) / 2;

        const boxRect = cropBox.getBoundingClientRect();
        const relLeft = boxRect.left - containerRect.left - offsetX;
        const relTop = boxRect.top - containerRect.top - offsetY;

        return {
          x: Math.round(relLeft * imageScale),
          y: Math.round(relTop * imageScale),
          width: Math.round(boxRect.width * imageScale),
          height: Math.round(boxRect.height * imageScale)
        };
      }

      function updateCropInfo() {
        const values = getCropValues();
        cropInfo.textContent = `${values.width} × ${values.height}`;
        document.getElementById("cropX").value = values.x;
        document.getElementById("cropY").value = values.y;
        document.getElementById("cropW").value = values.width;
        document.getElementById("cropH").value = values.height;
        document.getElementById("cropSize").textContent = `${values.width} × ${values.height}`;
      }

      window.updatePreview = function () {
        if (!originalImage) return;
        const values = getCropValues();

        previewCanvas.width = values.width;
        previewCanvas.height = values.height;

        ctx.drawImage(
          originalImage,
          values.x,
          values.y,
          values.width,
          values.height,
          0,
          0,
          values.width,
          values.height
        );
      };

      // Crop box dragging
      cropBox.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("crop-handle")) {
          isResizing = true;
          currentHandle = e.target.dataset.handle;
        } else {
          isDragging = true;
        }

        startX = e.clientX;
        startY = e.clientY;
        startLeft = cropBox.offsetLeft;
        startTop = cropBox.offsetTop;
        startWidth = cropBox.offsetWidth;
        startHeight = cropBox.offsetHeight;

        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging && !isResizing) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (isDragging) {
          setCropBox(startLeft + dx, startTop + dy, startWidth, startHeight);
        } else if (isResizing) {
          let newLeft = startLeft;
          let newTop = startTop;
          let newWidth = startWidth;
          let newHeight = startHeight;

          if (currentHandle.includes("e")) newWidth = startWidth + dx;
          if (currentHandle.includes("w")) {
            newWidth = startWidth - dx;
            newLeft = startLeft + dx;
          }
          if (currentHandle.includes("s")) newHeight = startHeight + dy;
          if (currentHandle.includes("n")) {
            newHeight = startHeight - dy;
            newTop = startTop + dy;
          }

          if (aspectRatio) {
            if (currentHandle.includes("e") || currentHandle.includes("w")) {
              newHeight = newWidth / aspectRatio;
            } else {
              newWidth = newHeight * aspectRatio;
            }
          }

          if (newWidth > 20 && newHeight > 20) {
            setCropBox(newLeft, newTop, newWidth, newHeight);
          }
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
        currentHandle = null;
      });

      // Presets
      document.getElementById("presets").addEventListener("click", (e) => {
        if (!e.target.classList.contains("preset-btn")) return;

        document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");

        const ratio = e.target.dataset.ratio;
        if (ratio === "free") {
          aspectRatio = null;
        } else {
          const [w, h] = ratio.split(":").map(Number);
          aspectRatio = w / h;

          // Adjust current crop box to match ratio
          const rect = cropBox.getBoundingClientRect();
          let newWidth = rect.width;
          let newHeight = rect.width / aspectRatio;

          if (newHeight > sourceImage.getBoundingClientRect().height * 0.9) {
            newHeight = sourceImage.getBoundingClientRect().height * 0.9;
            newWidth = newHeight * aspectRatio;
          }

          setCropBox(cropBox.offsetLeft, cropBox.offsetTop, newWidth, newHeight);
        }
      });

      // Manual input
      ["cropX", "cropY", "cropW", "cropH"].forEach((id) => {
        document.getElementById(id).addEventListener("change", () => {
          const x = parseInt(document.getElementById("cropX").value) || 0;
          const y = parseInt(document.getElementById("cropY").value) || 0;
          const w = parseInt(document.getElementById("cropW").value) || 100;
          const h = parseInt(document.getElementById("cropH").value) || 100;

          const rect = sourceImage.getBoundingClientRect();
          const containerRect = cropContainer.getBoundingClientRect();
          const offsetX = (containerRect.width - rect.width) / 2;
          const offsetY = (containerRect.height - rect.height) / 2;

          setCropBox(
            offsetX + x / imageScale,
            offsetY + y / imageScale,
            w / imageScale,
            h / imageScale
          );
        });
      });

      // Reset
      document.getElementById("resetBtn").addEventListener("click", initCropArea);

      // Crop and download
      document.getElementById("cropBtn").addEventListener("click", () => {
        if (!originalImage) return;

        const values = getCropValues();
        const canvas = document.createElement("canvas");
        canvas.width = values.width;
        canvas.height = values.height;
        const tempCtx = canvas.getContext("2d");

        tempCtx.drawImage(
          originalImage,
          values.x,
          values.y,
          values.width,
          values.height,
          0,
          0,
          values.width,
          values.height
        );

        const format = document.getElementById("outputFormat").value;
        const quality = parseFloat(document.getElementById("quality").value);

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            const ext = format.split("/")[1];
            a.download = `cropped_${values.width}x${values.height}.${ext}`;
            a.click();
            URL.revokeObjectURL(url);
          },
          format,
          quality
        );
      });

      window.formatFileSize = function (bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      };

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
