// @ts-nocheck
// Generated from tools/media/image-cropper.html
// Source SHA-256: 6c125babe351f24d35125b1c766924774f4f31b5df335f20ae44bba1c1e68b44
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let image = null,
        imageWidth = 0,
        imageHeight = 0,
        displayScale = 1;
      let cropX = 50,
        cropY = 50,
        cropW = 200,
        cropH = 200;
      let aspectRatio = null;
      let isDragging = false,
        isResizing = false,
        resizeHandle = "";
      let startX, startY, startCropX, startCropY, startCropW, startCropH;

      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const cropBox = document.getElementById("cropBox");
      const cropContainer = document.getElementById("cropContainer");

      uploadArea.addEventListener("dragover", (e) => e.preventDefault());
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      });
      fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          image = new Image();
          image.onload = () => {
            imageWidth = image.width;
            imageHeight = image.height;
            document.getElementById("cropImage").src = e.target.result;
            cropContainer.classList.add("show");
            document.getElementById("info").style.display = "block";
            document.getElementById("cropBtn").disabled = false;
            setTimeout(() => {
              const img = document.getElementById("cropImage");
              displayScale = img.width / imageWidth;
              cropW = Math.min(200, img.width - 100);
              cropH = aspectRatio ? cropW / aspectRatio : Math.min(200, img.height - 100);
              cropX = (img.width - cropW) / 2;
              cropY = (img.height - cropH) / 2;
              updateCropBox();
            }, 100);
          };
          image.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function updateCropBox() {
        cropBox.style.left = cropX + "px";
        cropBox.style.top = cropY + "px";
        cropBox.style.width = cropW + "px";
        cropBox.style.height = cropH + "px";
        const realW = Math.round(cropW / displayScale);
        const realH = Math.round(cropH / displayScale);
        document.getElementById("cropSize").textContent = `${realW} × ${realH} px`;
      }

      function setRatio(ratio) {
        aspectRatio = ratio;
        document.querySelectorAll(".preset").forEach((p) => p.classList.remove("active"));
        event.target.classList.add("active");
        if (ratio && image) {
          cropH = cropW / ratio;
          const img = document.getElementById("cropImage");
          if (cropY + cropH > img.height) cropY = img.height - cropH;
          updateCropBox();
        }
      }

      cropBox.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("crop-handle")) {
          isResizing = true;
          resizeHandle = e.target.dataset.handle;
        } else {
          isDragging = true;
        }
        startX = e.clientX;
        startY = e.clientY;
        startCropX = cropX;
        startCropY = cropY;
        startCropW = cropW;
        startCropH = cropH;
        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDragging && !isResizing) return;
        const img = document.getElementById("cropImage");
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        if (isDragging) {
          cropX = Math.max(0, Math.min(startCropX + dx, img.width - cropW));
          cropY = Math.max(0, Math.min(startCropY + dy, img.height - cropH));
        } else if (isResizing) {
          if (resizeHandle.includes("e"))
            cropW = Math.max(50, Math.min(startCropW + dx, img.width - cropX));
          if (resizeHandle.includes("w")) {
            cropW = Math.max(50, startCropW - dx);
            cropX = startCropX + startCropW - cropW;
          }
          if (resizeHandle.includes("s"))
            cropH = Math.max(50, Math.min(startCropH + dy, img.height - cropY));
          if (resizeHandle.includes("n")) {
            cropH = Math.max(50, startCropH - dy);
            cropY = startCropY + startCropH - cropH;
          }
          if (aspectRatio) cropH = cropW / aspectRatio;
        }
        updateCropBox();
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
      });

      function cropImage() {
        if (!image) return;
        const realX = Math.round(cropX / displayScale);
        const realY = Math.round(cropY / displayScale);
        const realW = Math.round(cropW / displayScale);
        const realH = Math.round(cropH / displayScale);

        const canvas = document.createElement("canvas");
        canvas.width = realW;
        canvas.height = realH;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, realX, realY, realW, realH, 0, 0, realW, realH);

        const link = document.createElement("a");
        link.download = `cropped_${realW}x${realH}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }

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
    
