// @ts-nocheck
// Generated from tools/media/image-mosaic.html
// Source SHA-256: 8a22d7fa1ebdda925a95b2a84155951eb0572341ed73e954c5b08c56d8d3c108
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let originalImageData = null;
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      let isDrawing = false;
      let scale = 1;

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
          originalImage = new Image();
          originalImage.onload = () => {
            const maxWidth = 800;
            scale = Math.min(1, maxWidth / originalImage.width);
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            ctx.drawImage(originalImage, 0, 0);
            originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            document.getElementById("editSection").classList.remove("hidden");
            setupDrawing();
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.updateValue = function () {
        document.getElementById("blockSizeValue").textContent =
          document.getElementById("blockSize").value + "px";
        document.getElementById("brushSizeValue").textContent =
          document.getElementById("brushSize").value + "px";
      };

      function setupDrawing() {
        const container = document.getElementById("canvasContainer");

        canvas.addEventListener("mousedown", (e) => {
          isDrawing = true;
          applyMosaic(e);
        });

        canvas.addEventListener("mousemove", (e) => {
          if (!isDrawing) return;
          applyMosaic(e);
        });

        canvas.addEventListener("mouseup", () => (isDrawing = false));
        canvas.addEventListener("mouseleave", () => (isDrawing = false));

        // Touch support
        canvas.addEventListener("touchstart", (e) => {
          e.preventDefault();
          isDrawing = true;
          applyMosaic(e.touches[0]);
        });

        canvas.addEventListener("touchmove", (e) => {
          e.preventDefault();
          if (!isDrawing) return;
          applyMosaic(e.touches[0]);
        });

        canvas.addEventListener("touchend", () => (isDrawing = false));
      }

      function applyMosaic(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const blockSize = parseInt(document.getElementById("blockSize").value);
        const brushSize =
          parseInt(document.getElementById("brushSize").value) * Math.max(scaleX, scaleY);

        // Get current image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply mosaic in brush area
        const startX = Math.max(0, Math.floor((x - brushSize) / blockSize) * blockSize);
        const startY = Math.max(0, Math.floor((y - brushSize) / blockSize) * blockSize);
        const endX = Math.min(canvas.width, x + brushSize);
        const endY = Math.min(canvas.height, y + brushSize);

        for (let by = startY; by < endY; by += blockSize) {
          for (let bx = startX; bx < endX; bx += blockSize) {
            // Check if block center is within brush radius
            const centerX = bx + blockSize / 2;
            const centerY = by + blockSize / 2;
            const dist = Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2);

            if (dist <= brushSize) {
              // Get average color of block from original image
              let r = 0,
                g = 0,
                b = 0,
                count = 0;

              for (let py = by; py < Math.min(by + blockSize, canvas.height); py++) {
                for (let px = bx; px < Math.min(bx + blockSize, canvas.width); px++) {
                  const idx = (py * canvas.width + px) * 4;
                  r += originalImageData.data[idx];
                  g += originalImageData.data[idx + 1];
                  b += originalImageData.data[idx + 2];
                  count++;
                }
              }

              r = Math.round(r / count);
              g = Math.round(g / count);
              b = Math.round(b / count);

              // Fill block with average color
              for (let py = by; py < Math.min(by + blockSize, canvas.height); py++) {
                for (let px = bx; px < Math.min(bx + blockSize, canvas.width); px++) {
                  const idx = (py * canvas.width + px) * 4;
                  data[idx] = r;
                  data[idx + 1] = g;
                  data[idx + 2] = b;
                }
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      window.resetImage = function () {
        if (originalImage) {
          ctx.drawImage(originalImage, 0, 0);
        }
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = "mosaic_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
