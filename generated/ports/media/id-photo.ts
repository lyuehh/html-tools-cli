// @ts-nocheck
// Generated from tools/media/id-photo.html
// Source SHA-256: 477d34f59d727c7091a6e3bbb91ebcc0b3eddca74327c924a900e0202b4a687e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let sourceImage = null;
      let targetWidth = 295,
        targetHeight = 413;
      let bgColor = "#ffffff";
      let cropBox = { x: 0, y: 0, w: 100, h: 140 };
      let scale = 1;

      const sourceCanvas = document.getElementById("sourceCanvas");
      const sourceCtx = sourceCanvas.getContext("2d");
      const previewCanvas = document.getElementById("previewCanvas");
      const previewCtx = previewCanvas.getContext("2d");

      const dropZone = document.getElementById("dropZone");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        handleFile(e.dataTransfer.files[0]);
      });

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          sourceImage = new Image();
          sourceImage.onload = () => {
            initEditor();
            document.getElementById("editSection").classList.remove("hidden");
          };
          sourceImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function initEditor() {
        const maxWidth = 600;
        scale = Math.min(1, maxWidth / sourceImage.width);

        sourceCanvas.width = sourceImage.width * scale;
        sourceCanvas.height = sourceImage.height * scale;

        sourceCtx.drawImage(sourceImage, 0, 0, sourceCanvas.width, sourceCanvas.height);

        // Initialize crop box centered
        const ratio = targetWidth / targetHeight;
        cropBox.h = Math.min(sourceCanvas.height * 0.8, (sourceCanvas.width * 0.8) / ratio);
        cropBox.w = cropBox.h * ratio;
        cropBox.x = (sourceCanvas.width - cropBox.w) / 2;
        cropBox.y = (sourceCanvas.height - cropBox.h) / 2;

        setupCropInteraction();
        updatePreview();
      }

      function setupCropInteraction() {
        const wrapper = document.getElementById("canvasWrapper");
        let existingOverlay = wrapper.querySelector(".crop-overlay");
        if (existingOverlay) existingOverlay.remove();

        const overlay = document.createElement("div");
        overlay.className = "crop-overlay";
        overlay.style.cssText = "position: absolute; top: 0; left: 0; right: 0; bottom: 0;";

        const box = document.createElement("div");
        box.className = "crop-box";
        box.innerHTML = `
                <div class="crop-handle nw" data-dir="nw"></div>
                <div class="crop-handle ne" data-dir="ne"></div>
                <div class="crop-handle sw" data-dir="sw"></div>
                <div class="crop-handle se" data-dir="se"></div>
            `;
        overlay.appendChild(box);
        wrapper.appendChild(overlay);

        updateCropBoxPosition(box);

        let dragging = false,
          resizing = false,
          resizeDir = "";
        let startX, startY, startCrop;

        box.addEventListener("mousedown", (e) => {
          if (e.target.classList.contains("crop-handle")) {
            resizing = true;
            resizeDir = e.target.dataset.dir;
          } else {
            dragging = true;
          }
          startX = e.clientX;
          startY = e.clientY;
          startCrop = { ...cropBox };
          e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
          if (!dragging && !resizing) return;

          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          const ratio = targetWidth / targetHeight;

          if (dragging) {
            cropBox.x = Math.max(0, Math.min(sourceCanvas.width - cropBox.w, startCrop.x + dx));
            cropBox.y = Math.max(0, Math.min(sourceCanvas.height - cropBox.h, startCrop.y + dy));
          } else if (resizing) {
            if (resizeDir.includes("e")) {
              cropBox.w = Math.max(50, startCrop.w + dx);
              cropBox.h = cropBox.w / ratio;
            }
            if (resizeDir.includes("w")) {
              const newW = Math.max(50, startCrop.w - dx);
              cropBox.x = startCrop.x + (startCrop.w - newW);
              cropBox.w = newW;
              cropBox.h = cropBox.w / ratio;
            }
            if (resizeDir.includes("s")) {
              cropBox.h = Math.max(50, startCrop.h + dy);
              cropBox.w = cropBox.h * ratio;
            }
            if (resizeDir.includes("n")) {
              const newH = Math.max(50, startCrop.h - dy);
              cropBox.y = startCrop.y + (startCrop.h - newH);
              cropBox.h = newH;
              cropBox.w = cropBox.h * ratio;
            }

            // Constrain to canvas
            cropBox.x = Math.max(0, cropBox.x);
            cropBox.y = Math.max(0, cropBox.y);
            if (cropBox.x + cropBox.w > sourceCanvas.width)
              cropBox.w = sourceCanvas.width - cropBox.x;
            if (cropBox.y + cropBox.h > sourceCanvas.height)
              cropBox.h = sourceCanvas.height - cropBox.y;
            cropBox.h = cropBox.w / ratio;
          }

          updateCropBoxPosition(box);
          updatePreview();
        });

        document.addEventListener("mouseup", () => {
          dragging = false;
          resizing = false;
        });
      }

      function updateCropBoxPosition(box) {
        box.style.left = cropBox.x + "px";
        box.style.top = cropBox.y + "px";
        box.style.width = cropBox.w + "px";
        box.style.height = cropBox.h + "px";
      }

      window.setSize = function (w, h, btn) {
        targetWidth = w;
        targetHeight = h;
        document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("sizeInfo").textContent =
          `${btn.querySelector(".name").textContent} ${w}×${h}px`;

        if (sourceImage) {
          const ratio = w / h;
          cropBox.w = cropBox.h * ratio;
          const wrapper = document.getElementById("canvasWrapper");
          const box = wrapper.querySelector(".crop-box");
          if (box) updateCropBoxPosition(box);
          updatePreview();
        }
      };

      window.setBgColor = function (color, el) {
        bgColor = color;
        document.querySelectorAll(".bg-color").forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
        updatePreview();
      };

      window.updatePreview = function () {
        previewCanvas.width = targetWidth;
        previewCanvas.height = targetHeight;

        if (bgColor === "transparent") {
          previewCtx.clearRect(0, 0, targetWidth, targetHeight);
        } else {
          previewCtx.fillStyle = bgColor;
          previewCtx.fillRect(0, 0, targetWidth, targetHeight);
        }

        const srcX = cropBox.x / scale;
        const srcY = cropBox.y / scale;
        const srcW = cropBox.w / scale;
        const srcH = cropBox.h / scale;

        previewCtx.drawImage(sourceImage, srcX, srcY, srcW, srcH, 0, 0, targetWidth, targetHeight);
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = `id_photo_${targetWidth}x${targetHeight}.png`;
        link.href = previewCanvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
