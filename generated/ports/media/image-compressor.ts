// @ts-nocheck
// Generated from tools/media/image-compressor.html
// Source SHA-256: edceda6ceeb78c3edc0793bcebdaeb3d6fb45fb7a8ae49676181aa49ebef9bbc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalFile = null;
      let originalImage = new Image();
      let compressedBlob = null;

      // ============================================
      // Drag and Drop
      // ============================================
      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      uploadArea.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", () => handleFile(fileInput.files[0]));
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
      uploadArea.addEventListener("dragleave", () => {
        uploadArea.classList.remove("dragover");
      });
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          handleFile(file);
        }
      });

      // ============================================
      // File Handling
      // ============================================
      function handleFile(file) {
        if (!file) return;
        originalFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage.onload = () => {
            document.getElementById("originalImage").src = e.target.result;
            document.getElementById("originalSize").textContent = formatSize(file.size);
            document.getElementById("originalWidth").textContent = originalImage.width;
            document.getElementById("originalHeight").textContent = originalImage.height;
            document.getElementById("originalFormat").textContent = file.type
              .split("/")[1]
              .toUpperCase();

            document.getElementById("controlsCard").style.display = "block";
            document.getElementById("previewArea").style.display = "grid";
            document.getElementById("savingsCard").style.display = "block";
            document.getElementById("actionsCard").style.display = "flex";
            document.getElementById("uploadArea").style.display = "none";

            compress();
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      // ============================================
      // Quality Update
      // ============================================
      function updateQuality() {
        const quality = document.getElementById("quality").value;
        document.getElementById("qualityValue").textContent = quality + "%";
        compress();
      }

      // ============================================
      // Image Compression
      // ============================================
      function compress() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const quality = document.getElementById("quality").value / 100;
        const format = document.getElementById("format").value;
        const maxSize = parseInt(document.getElementById("maxSize").value);

        let width = originalImage.width;
        let height = originalImage.height;

        if (maxSize > 0 && (width > maxSize || height > maxSize)) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(originalImage, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            compressedBlob = blob;
            const url = URL.createObjectURL(blob);
            document.getElementById("compressedImage").src = url;
            document.getElementById("compressedSize").textContent = formatSize(blob.size);
            document.getElementById("compressedWidth").textContent = width;
            document.getElementById("compressedHeight").textContent = height;
            document.getElementById("compressedFormat").textContent = format
              .split("/")[1]
              .toUpperCase();

            const savings = ((1 - blob.size / originalFile.size) * 100).toFixed(1);
            document.getElementById("savingsValue").textContent = savings + "%";
          },
          format,
          quality
        );
      }

      // ============================================
      // Utilities
      // ============================================
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      function download() {
        if (!compressedBlob) return;
        const format = document.getElementById("format").value;
        const ext = format.split("/")[1];
        const link = document.createElement("a");
        link.href = URL.createObjectURL(compressedBlob);
        link.download = `compressed-${Date.now()}.${ext}`;
        link.click();
      }

      function reset() {
        originalFile = null;
        compressedBlob = null;
        document.getElementById("fileInput").value = "";
        document.getElementById("controlsCard").style.display = "none";
        document.getElementById("previewArea").style.display = "none";
        document.getElementById("savingsCard").style.display = "none";
        document.getElementById("actionsCard").style.display = "none";
        document.getElementById("uploadArea").style.display = "block";
      }

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
    
