// @ts-nocheck
// Generated from tools/media/batch-resize.html
// Source SHA-256: 6d45b0ee4ac5577a4ebe7622bfd47e0952d1f16ee1374c59323dc4ff0e989b97
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;

      function setTheme(dark) {
        html.setAttribute("data-theme", dark ? "dark" : "light");
        themeToggle.textContent = dark ? "☀️ 亮色模式" : "🌙 暗色模式";
        localStorage.setItem("theme", dark ? "dark" : "light");
      }

      themeToggle.addEventListener("click", () => {
        setTheme(html.getAttribute("data-theme") !== "dark");
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme(true);
      }

      // Image data storage
      let images = [];
      let processedImages = [];

      // Elements
      const fileInput = document.getElementById("fileInput");
      const dropZone = document.getElementById("dropZone");
      const imageList = document.getElementById("imageList");
      const qualitySlider = document.getElementById("quality");
      const qualityValue = document.getElementById("qualityValue");
      const resizeMode = document.getElementById("resizeMode");
      const targetWidth = document.getElementById("targetWidth");
      const targetHeight = document.getElementById("targetHeight");

      // Quality slider
      qualitySlider.addEventListener("input", () => {
        qualityValue.textContent = qualitySlider.value + "%";
      });

      // Resize mode change
      resizeMode.addEventListener("change", () => {
        const mode = resizeMode.value;
        targetHeight.disabled = mode === "width" || mode === "longest" || mode === "shortest";
        targetWidth.disabled = mode === "height";

        if (mode === "percent") {
          targetWidth.placeholder = "百分比";
          targetWidth.value = "50";
          targetHeight.disabled = true;
        } else {
          targetWidth.placeholder = "宽度";
        }

        updateAllPreview();
      });

      // Size input change
      targetWidth.addEventListener("input", updateAllPreview);
      targetHeight.addEventListener("input", updateAllPreview);

      // File handling
      fileInput.addEventListener("change", (e) => {
        addImages(e.target.files);
      });

      dropZone.addEventListener("click", () => fileInput.click());
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        addImages(e.dataTransfer.files);
      });

      function addImages(files) {
        Array.from(files).forEach((file) => {
          if (!file.type.startsWith("image/")) return;

          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const imageData = {
                id: Date.now() + Math.random(),
                file: file,
                dataUrl: e.target.result,
                width: img.width,
                height: img.height,
                processed: false,
                processedDataUrl: null
              };
              images.push(imageData);
              renderImageList();
              updateStats();
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }

      window.setPresetSize = function (width, height) {
        targetWidth.value = width;
        targetHeight.value = height;
        updateAllPreview();
      };

      function calculateNewDimensions(origWidth, origHeight) {
        const mode = resizeMode.value;
        const tw = parseInt(targetWidth.value) || 800;
        const th = parseInt(targetHeight.value) || 600;
        const keepRatio = document.getElementById("keepAspectRatio").checked;
        const allowUpscale = document.getElementById("allowUpscale").checked;

        let newWidth, newHeight;

        switch (mode) {
          case "width":
            newWidth = tw;
            newHeight = keepRatio ? Math.round(origHeight * (tw / origWidth)) : origHeight;
            break;
          case "height":
            newHeight = th;
            newWidth = keepRatio ? Math.round(origWidth * (th / origHeight)) : origWidth;
            break;
          case "both":
            if (keepRatio) {
              const ratio = Math.min(tw / origWidth, th / origHeight);
              newWidth = Math.round(origWidth * ratio);
              newHeight = Math.round(origHeight * ratio);
            } else {
              newWidth = tw;
              newHeight = th;
            }
            break;
          case "percent":
            const percent = tw / 100;
            newWidth = Math.round(origWidth * percent);
            newHeight = Math.round(origHeight * percent);
            break;
          case "longest":
            if (origWidth >= origHeight) {
              newWidth = tw;
              newHeight = Math.round(origHeight * (tw / origWidth));
            } else {
              newHeight = tw;
              newWidth = Math.round(origWidth * (tw / origHeight));
            }
            break;
          case "shortest":
            if (origWidth <= origHeight) {
              newWidth = tw;
              newHeight = Math.round(origHeight * (tw / origWidth));
            } else {
              newHeight = tw;
              newWidth = Math.round(origWidth * (tw / origHeight));
            }
            break;
        }

        // Prevent upscaling unless allowed
        if (!allowUpscale) {
          if (newWidth > origWidth) newWidth = origWidth;
          if (newHeight > origHeight) newHeight = origHeight;

          // Recalculate to maintain aspect ratio if needed
          if (keepRatio && (newWidth !== origWidth || newHeight !== origHeight)) {
            const ratio = Math.min(newWidth / origWidth, newHeight / origHeight);
            newWidth = Math.round(origWidth * ratio);
            newHeight = Math.round(origHeight * ratio);
          }
        }

        return { width: Math.max(1, newWidth), height: Math.max(1, newHeight) };
      }

      function renderImageList() {
        if (images.length === 0) {
          imageList.replaceChildren();
          const emptyDiv = document.createElement("div");
          emptyDiv.className = "empty-state";
          emptyDiv.textContent = "暂无图片，请上传图片开始处理";
          imageList.appendChild(emptyDiv);
          document.getElementById("processBtn").disabled = true;
          document.getElementById("downloadBtn").disabled = true;
          document.getElementById("stats").style.display = "none";
          return;
        }

        imageList.replaceChildren();
        document.getElementById("stats").style.display = "flex";
        document.getElementById("processBtn").disabled = false;

        images.forEach((image, index) => {
          const newDims = calculateNewDimensions(image.width, image.height);

          const item = document.createElement("div");
          item.className = "image-item";

          const img = document.createElement("img");
          img.src = image.dataUrl;
          img.alt = image.file.name;

          const info = document.createElement("div");
          info.className = "image-info";

          const filename = document.createElement("div");
          filename.className = "filename";
          filename.textContent = image.file.name;

          const dimensions = document.createElement("div");
          dimensions.className = "dimensions";
          dimensions.textContent =
            image.width + " × " + image.height + " | " + formatFileSize(image.file.size);

          info.appendChild(filename);
          info.appendChild(dimensions);

          const newDimsSpan = document.createElement("span");
          newDimsSpan.className = "new-dimensions";
          newDimsSpan.textContent = "→ " + newDims.width + " × " + newDims.height;

          const actions = document.createElement("div");
          actions.className = "image-actions";

          const removeBtn = document.createElement("button");
          removeBtn.className = "secondary outline";
          removeBtn.textContent = "✕";
          removeBtn.addEventListener("click", () => removeImage(index));

          actions.appendChild(removeBtn);

          item.appendChild(img);
          item.appendChild(info);
          item.appendChild(newDimsSpan);
          item.appendChild(actions);

          imageList.appendChild(item);
        });
      }

      function updateAllPreview() {
        renderImageList();
      }

      window.removeImage = function (index) {
        images.splice(index, 1);
        renderImageList();
        updateStats();
      };

      window.clearAll = function () {
        images = [];
        processedImages = [];
        renderImageList();
        updateStats();
      };

      function updateStats() {
        document.getElementById("totalCount").textContent = images.length;
        const totalSize = images.reduce((sum, img) => sum + img.file.size, 0);
        document.getElementById("totalOriginalSize").textContent = formatFileSize(totalSize);
        const processed = images.filter((img) => img.processed).length;
        document.getElementById("processedCount").textContent = processed;

        document.getElementById("downloadBtn").disabled = processed === 0;
      }

      window.formatFileSize = function (bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      };

      window.processAll = async function () {
        const progressBar = document.getElementById("progressBar");
        const progressFill = document.getElementById("progressFill");
        progressBar.style.display = "block";

        processedImages = [];

        for (let i = 0; i < images.length; i++) {
          const progress = ((i + 1) / images.length) * 100;
          progressFill.style.width = progress + "%";

          await processImage(images[i]);
          updateStats();
        }

        setTimeout(() => {
          progressBar.style.display = "none";
        }, 500);
      };

      function processImage(imageData) {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const newDims = calculateNewDimensions(imageData.width, imageData.height);

            const canvas = document.createElement("canvas");
            canvas.width = newDims.width;
            canvas.height = newDims.height;

            const ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, newDims.width, newDims.height);

            const format = document.querySelector('input[name="format"]:checked').value;
            const quality = parseInt(qualitySlider.value) / 100;

            let mimeType, extension;
            if (format === "original") {
              mimeType = imageData.file.type;
              extension = imageData.file.name.split(".").pop();
            } else {
              mimeType = "image/" + format;
              extension = format === "jpeg" ? "jpg" : format;
            }

            const dataUrl = canvas.toDataURL(mimeType, quality);

            imageData.processed = true;
            imageData.processedDataUrl = dataUrl;
            imageData.processedWidth = newDims.width;
            imageData.processedHeight = newDims.height;
            imageData.processedExtension = extension;

            processedImages.push(imageData);
            resolve();
          };
          img.src = imageData.dataUrl;
        });
      }

      window.downloadAll = async function () {
        const processed = images.filter((img) => img.processed);
        if (processed.length === 0) return;

        if (processed.length === 1) {
          // Single file download
          const img = processed[0];
          const link = document.createElement("a");
          const baseName = img.file.name.replace(/\.[^.]+$/, "");
          link.download = baseName + "_resized." + img.processedExtension;
          link.href = img.processedDataUrl;
          link.click();
        } else {
          // Multiple files - create zip
          const zip = new JSZip();

          processed.forEach((img, index) => {
            const baseName = img.file.name.replace(/\.[^.]+$/, "");
            const filename = baseName + "_resized." + img.processedExtension;
            const base64Data = img.processedDataUrl.split(",")[1];
            zip.file(filename, base64Data, { base64: true });
          });

          const blob = await zip.generateAsync({ type: "blob" });
          const link = document.createElement("a");
          link.download = "resized_images.zip";
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
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
    
