// @ts-nocheck
// Generated from tools/media/image-rotate.html
// Source SHA-256: 47095d4f08cdeacee5794ec66f3f5cb217941444689cd40af5df917cfdd08dbc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let currentAngle = 0;
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

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
            currentAngle = 0;
            document.getElementById("angle").value = 0;
            document.getElementById("angleValue").textContent = "0°";
            applyRotation();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.rotate = function (deg) {
        currentAngle = (currentAngle + deg) % 360;
        document.getElementById("angle").value = currentAngle;
        document.getElementById("angleValue").textContent = currentAngle + "°";
        applyRotation();
      };

      window.updateAngle = function () {
        currentAngle = parseInt(document.getElementById("angle").value);
        document.getElementById("angleValue").textContent = currentAngle + "°";
        applyRotation();
      };

      function applyRotation() {
        if (!originalImage) return;

        const angle = (currentAngle * Math.PI) / 180;
        const bgColor = document.getElementById("bgColor").value;
        const transparent = document.getElementById("transparent").checked;

        // Calculate new canvas size
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        const newWidth = Math.ceil(originalImage.width * cos + originalImage.height * sin);
        const newHeight = Math.ceil(originalImage.width * sin + originalImage.height * cos);

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Clear and fill background
        ctx.clearRect(0, 0, newWidth, newHeight);
        if (!transparent) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, newWidth, newHeight);
        }

        // Rotate and draw
        ctx.save();
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(angle);
        ctx.drawImage(originalImage, -originalImage.width / 2, -originalImage.height / 2);
        ctx.restore();

        // Update info
        document.getElementById("sizeInfo").textContent =
          `原始尺寸: ${originalImage.width}×${originalImage.height} | 旋转后: ${newWidth}×${newHeight}`;
      }

      window.resetRotation = function () {
        currentAngle = 0;
        document.getElementById("angle").value = 0;
        document.getElementById("angleValue").textContent = "0°";
        applyRotation();
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = "rotated_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
