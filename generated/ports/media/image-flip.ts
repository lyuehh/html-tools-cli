// @ts-nocheck
// Generated from tools/media/image-flip.html
// Source SHA-256: 91703906dca0ce65ffa9ffb5c64175aaf530bea5521b26acf600eba85fa3648b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let flipH = false,
        flipV = false;
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
            document.getElementById("originalPreview").src = originalImage.src;
            flipH = false;
            flipV = false;
            updateButtonStates();
            applyFlip();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.toggleFlip = function (type) {
        if (type === "horizontal") {
          flipH = !flipH;
        } else if (type === "vertical") {
          flipV = !flipV;
        } else if (type === "both") {
          if (flipH && flipV) {
            flipH = false;
            flipV = false;
          } else {
            flipH = true;
            flipV = true;
          }
        }
        updateButtonStates();
        applyFlip();
      };

      function updateButtonStates() {
        document.getElementById("flipH").classList.toggle("active", flipH && !flipV);
        document.getElementById("flipV").classList.toggle("active", flipV && !flipH);
        document.getElementById("flipBoth").classList.toggle("active", flipH && flipV);
      }

      function applyFlip() {
        if (!originalImage) return;

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        ctx.save();

        if (flipH) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        if (flipV) {
          ctx.translate(0, canvas.height);
          ctx.scale(1, -1);
        }

        ctx.drawImage(originalImage, 0, 0);
        ctx.restore();
      }

      window.download = function () {
        const link = document.createElement("a");
        link.download = "flipped_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
