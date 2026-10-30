// @ts-nocheck
// Generated from tools/media/image-resizer.html
// Source SHA-256: 121c70bec24edd8631f093138da0eb6e7453b0d45814c60465e5c601bf249931
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let originalWidth = 0,
        originalHeight = 0;

      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");

      ["dragenter", "dragover"].forEach((e) =>
        uploadArea.addEventListener(e, () => uploadArea.classList.add("active"))
      );
      ["dragleave", "drop"].forEach((e) =>
        uploadArea.addEventListener(e, () => uploadArea.classList.remove("active"))
      );
      uploadArea.addEventListener("dragover", (e) => e.preventDefault());
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
      });
      fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return alert("请选择图片文件");
        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage = new Image();
          originalImage.onload = () => {
            originalWidth = originalImage.width;
            originalHeight = originalImage.height;
            document.getElementById("preview").src = e.target.result;
            document.getElementById("previewContainer").classList.add("show");
            document.getElementById("info").style.display = "block";
            document.getElementById("originalSize").textContent =
              `${originalWidth} × ${originalHeight}`;
            document.getElementById("width").value = originalWidth;
            document.getElementById("height").value = originalHeight;
            document.getElementById("downloadBtn").disabled = false;
            updateNewSize();
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function updateNewSize() {
        if (!originalImage) return;
        let w = parseInt(document.getElementById("width").value) || originalWidth;
        let h = parseInt(document.getElementById("height").value) || originalHeight;
        const scale = parseInt(document.getElementById("scale").value) || 100;
        w = Math.round((w * scale) / 100);
        h = Math.round((h * scale) / 100);
        document.getElementById("newSize").textContent = `${w} × ${h}`;
      }

      document.getElementById("width").addEventListener("input", function () {
        if (document.getElementById("keepRatio").checked && originalImage) {
          const ratio = originalHeight / originalWidth;
          document.getElementById("height").value = Math.round(this.value * ratio);
        }
        updateNewSize();
      });

      document.getElementById("height").addEventListener("input", function () {
        if (document.getElementById("keepRatio").checked && originalImage) {
          const ratio = originalWidth / originalHeight;
          document.getElementById("width").value = Math.round(this.value * ratio);
        }
        updateNewSize();
      });

      document.getElementById("scale").addEventListener("input", updateNewSize);

      function download() {
        if (!originalImage) return;
        let w = parseInt(document.getElementById("width").value) || originalWidth;
        let h = parseInt(document.getElementById("height").value) || originalHeight;
        const scale = parseInt(document.getElementById("scale").value) || 100;
        const format = document.getElementById("format").value;
        w = Math.round((w * scale) / 100);
        h = Math.round((h * scale) / 100);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(originalImage, 0, 0, w, h);

        const link = document.createElement("a");
        link.download = `resized_${w}x${h}.${format.split("/")[1]}`;
        link.href = canvas.toDataURL(format, 0.9);
        link.click();
      }
    
