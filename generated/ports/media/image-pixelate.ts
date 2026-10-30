// @ts-nocheck
// Generated from tools/media/image-pixelate.html
// Source SHA-256: deb6c6349e1d4609d60c5ae73c005f2cd182d0ca16c8bf0c4fd15dbe2e1e9185
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let currentImage = null;
      let currentEffect = "pixelate";
      let isRegionMode = false;
      let isDrawing = false;
      let mask = null;

      const canvas = document.getElementById("previewCanvas");
      const ctx = canvas.getContext("2d");

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

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
        if (file && file.type.startsWith("image/")) {
          loadImage(file);
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
          const img = new Image();
          img.onload = () => {
            originalImage = img;
            currentImage = img;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.style.display = "block";
            document.getElementById("placeholder").style.display = "none";

            document.getElementById("applyBtn").disabled = false;
            document.getElementById("resetBtn").disabled = false;
            document.getElementById("downloadBtn").disabled = false;

            document.getElementById("imageInfo").classList.remove("hidden");
            document.getElementById("imageDimensions").textContent =
              `尺寸: ${img.width} × ${img.height}`;
            document.getElementById("imageSize").textContent =
              `大小: ${(file.size / 1024).toFixed(1)} KB`;

            // Initialize mask
            mask = new Uint8Array(img.width * img.height);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      window.setEffect = function (effect) {
        currentEffect = effect;
        document.querySelectorAll(".effect-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.effect === effect);
        });
      };

      window.toggleRegionMode = function () {
        isRegionMode = document.getElementById("regionMode").checked;
        document.getElementById("brushSizeControl").classList.toggle("hidden", !isRegionMode);

        if (isRegionMode) {
          canvas.style.cursor = "crosshair";
          // Reset mask
          if (mask) mask.fill(0);
        } else {
          canvas.style.cursor = "default";
        }
      };

      // Brush drawing for region mode
      canvas.addEventListener("mousedown", (e) => {
        if (!isRegionMode || !originalImage) return;
        isDrawing = true;
        draw(e);
      });

      canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing || !isRegionMode) return;
        draw(e);
      });

      canvas.addEventListener("mouseup", () => (isDrawing = false));
      canvas.addEventListener("mouseleave", () => (isDrawing = false));

      function draw(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);
        const brushSize = parseInt(document.getElementById("brushSize").value);

        // Update mask
        for (let dy = -brushSize; dy <= brushSize; dy++) {
          for (let dx = -brushSize; dx <= brushSize; dx++) {
            if (dx * dx + dy * dy <= brushSize * brushSize) {
              const px = x + dx;
              const py = y + dy;
              if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
                mask[py * canvas.width + px] = 1;
              }
            }
          }
        }

        // Show brush area visually
        ctx.fillStyle = "rgba(233, 69, 96, 0.3)";
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }

      document.getElementById("brushSize").addEventListener("input", (e) => {
        document.getElementById("brushSizeVal").textContent = e.target.value;
      });

      document.getElementById("intensity").addEventListener("input", (e) => {
        document.getElementById("intensityVal").textContent = e.target.value;
      });

      window.applyEffect = function () {
        if (!originalImage) return;

        const intensity = parseInt(document.getElementById("intensity").value);

        // Redraw original
        ctx.drawImage(originalImage, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        switch (currentEffect) {
          case "pixelate":
            pixelate(data, canvas.width, canvas.height, intensity);
            break;
          case "mosaic":
            mosaic(data, canvas.width, canvas.height, intensity);
            break;
          case "blur":
            blur(data, canvas.width, canvas.height, intensity);
            break;
          case "oil":
            oilPaint(data, canvas.width, canvas.height, Math.min(intensity, 10));
            break;
        }

        ctx.putImageData(imageData, 0, 0);
      };

      function pixelate(data, width, height, blockSize) {
        for (let y = 0; y < height; y += blockSize) {
          for (let x = 0; x < width; x += blockSize) {
            // Check if this block should be processed (region mode)
            if (isRegionMode) {
              let shouldProcess = false;
              for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
                for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
                  if (mask[(y + dy) * width + (x + dx)]) {
                    shouldProcess = true;
                    break;
                  }
                }
                if (shouldProcess) break;
              }
              if (!shouldProcess) continue;
            }

            // Get average color
            let r = 0,
              g = 0,
              b = 0,
              count = 0;
            for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                r += data[idx];
                g += data[idx + 1];
                b += data[idx + 2];
                count++;
              }
            }
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);

            // Fill block
            for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
              }
            }
          }
        }
      }

      function mosaic(data, width, height, blockSize) {
        // Similar to pixelate but with slight random variation
        for (let y = 0; y < height; y += blockSize) {
          for (let x = 0; x < width; x += blockSize) {
            if (isRegionMode) {
              let shouldProcess = false;
              for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
                for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
                  if (mask[(y + dy) * width + (x + dx)]) {
                    shouldProcess = true;
                    break;
                  }
                }
                if (shouldProcess) break;
              }
              if (!shouldProcess) continue;
            }

            // Pick random pixel from block
            const rx = Math.min(x + Math.floor(Math.random() * blockSize), width - 1);
            const ry = Math.min(y + Math.floor(Math.random() * blockSize), height - 1);
            const ridx = (ry * width + rx) * 4;
            const r = data[ridx];
            const g = data[ridx + 1];
            const b = data[ridx + 2];

            // Fill block
            for (let dy = 0; dy < blockSize && y + dy < height; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < width; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
              }
            }
          }
        }
      }

      function blur(data, width, height, radius) {
        const copy = new Uint8ClampedArray(data);
        const size = radius * 2 + 1;
        const kernel = 1 / (size * size);

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (isRegionMode && !mask[y * width + x]) continue;

            let r = 0,
              g = 0,
              b = 0;
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const px = Math.min(width - 1, Math.max(0, x + dx));
                const py = Math.min(height - 1, Math.max(0, y + dy));
                const idx = (py * width + px) * 4;
                r += copy[idx];
                g += copy[idx + 1];
                b += copy[idx + 2];
              }
            }
            const idx = (y * width + x) * 4;
            data[idx] = r * kernel;
            data[idx + 1] = g * kernel;
            data[idx + 2] = b * kernel;
          }
        }
      }

      function oilPaint(data, width, height, radius) {
        const copy = new Uint8ClampedArray(data);
        const levels = 20;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            if (isRegionMode && !mask[y * width + x]) continue;

            const intensityCount = new Array(levels).fill(0);
            const avgR = new Array(levels).fill(0);
            const avgG = new Array(levels).fill(0);
            const avgB = new Array(levels).fill(0);

            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const px = Math.min(width - 1, Math.max(0, x + dx));
                const py = Math.min(height - 1, Math.max(0, y + dy));
                const idx = (py * width + px) * 4;

                const r = copy[idx];
                const g = copy[idx + 1];
                const b = copy[idx + 2];
                const intensity = Math.floor((((r + g + b) / 3) * levels) / 256);
                const ci = Math.min(levels - 1, intensity);

                intensityCount[ci]++;
                avgR[ci] += r;
                avgG[ci] += g;
                avgB[ci] += b;
              }
            }

            let maxIndex = 0;
            let maxCount = 0;
            for (let i = 0; i < levels; i++) {
              if (intensityCount[i] > maxCount) {
                maxCount = intensityCount[i];
                maxIndex = i;
              }
            }

            const idx = (y * width + x) * 4;
            if (maxCount > 0) {
              data[idx] = avgR[maxIndex] / maxCount;
              data[idx + 1] = avgG[maxIndex] / maxCount;
              data[idx + 2] = avgB[maxIndex] / maxCount;
            }
          }
        }
      }

      window.resetImage = function () {
        if (!originalImage) return;
        ctx.drawImage(originalImage, 0, 0);
        if (mask) mask.fill(0);
      };

      window.downloadImage = function () {
        const link = document.createElement("a");
        link.download = "pixelated-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.updatePreview = function () {
        document.getElementById("intensityVal").textContent =
          document.getElementById("intensity").value;
      };
    
