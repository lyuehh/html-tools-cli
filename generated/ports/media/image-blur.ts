// @ts-nocheck
// Generated from tools/media/image-blur.html
// Source SHA-256: 7ee44ee75cc3b82d7e251a7595a95866a3ac4abaa1d31a1911cfece1960275e9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let blurMode = "full";
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const modeTips = {
        full: "💡 整体模糊：对整张图片应用均匀的模糊效果",
        background: "💡 背景模糊：保持中心清晰，边缘模糊（适合头像）",
        radial: "💡 径向模糊：中心清晰，向外逐渐模糊"
      };

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
            updatePreview();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.setMode = function (mode) {
        blurMode = mode;
        document.querySelectorAll(".mode-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.mode === mode);
        });
        document.getElementById("modeTip").textContent = modeTips[mode];
        document.getElementById("radiusControl").style.display =
          mode === "radial" || mode === "background" ? "block" : "none";
        updatePreview();
      };

      window.updatePreview = function () {
        if (!originalImage) return;

        const blurAmount = parseInt(document.getElementById("blurAmount").value);
        const clearRadius = parseInt(document.getElementById("clearRadius").value);

        document.getElementById("blurValue").textContent = blurAmount + "px";
        document.getElementById("radiusValue").textContent = clearRadius + "%";

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        if (blurMode === "full") {
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(originalImage, 0, 0);
          ctx.filter = "none";
        } else if (blurMode === "background" || blurMode === "radial") {
          // Draw blurred background
          ctx.filter = `blur(${blurAmount}px)`;
          ctx.drawImage(originalImage, 0, 0);
          ctx.filter = "none";

          // Create radial gradient mask
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = Math.min(canvas.width, canvas.height) * (clearRadius / 100);

          // Create temporary canvas for clear center
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          const tempCtx = tempCanvas.getContext("2d");
          tempCtx.drawImage(originalImage, 0, 0);

          // Apply radial gradient mask
          ctx.globalCompositeOperation = "destination-out";
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          gradient.addColorStop(0, "rgba(0,0,0,1)");
          gradient.addColorStop(0.7, "rgba(0,0,0,0.8)");
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.globalCompositeOperation = "destination-over";
          ctx.drawImage(tempCanvas, 0, 0);
          ctx.globalCompositeOperation = "source-over";
        }
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = "blurred_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
