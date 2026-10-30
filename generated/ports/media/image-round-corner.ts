// @ts-nocheck
// Generated from tools/media/image-round-corner.html
// Source SHA-256: 8486b912ed625047aa02ab05ca9d088e53f6d41a32733fe12ce52bd11d4b904c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
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
            document.getElementById("radius").max =
              Math.min(originalImage.width, originalImage.height) / 2;
            updatePreview();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.setRadius = function (r) {
        document.getElementById("radius").value = r;
        document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        updatePreview();
      };

      window.setCircle = function () {
        const r = Math.min(originalImage.width, originalImage.height) / 2;
        document.getElementById("radius").value = r;
        document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        updatePreview();
      };

      window.updatePreview = function () {
        if (!originalImage) return;

        const radius = parseInt(document.getElementById("radius").value);
        const transparent = document.getElementById("transparent").checked;
        const bgColor = document.getElementById("bgColor").value;

        document.getElementById("radiusValue").textContent = radius + "px";

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!transparent) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw rounded rectangle path
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(canvas.width - radius, 0);
        ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
        ctx.lineTo(canvas.width, canvas.height - radius);
        ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
        ctx.lineTo(radius, canvas.height);
        ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();

        ctx.clip();
        ctx.drawImage(originalImage, 0, 0);
      };

      window.download = function () {
        const transparent = document.getElementById("transparent").checked;
        const link = document.createElement("a");
        link.download = "rounded_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
