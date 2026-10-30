// @ts-nocheck
// Generated from tools/media/image-text.html
// Source SHA-256: 301177f9ee995ff46010c327f8751d5106c27fb688308a1d440b3bddd41b383e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let position = "middle-center";
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
            updatePreview();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.setPosition = function (pos) {
        position = pos;
        document.querySelectorAll(".pos-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.pos === pos);
        });
        updatePreview();
      };

      window.updatePreview = function () {
        if (!originalImage) return;

        const text = document.getElementById("textContent").value;
        const fontFamily = document.getElementById("fontFamily").value;
        const fontSize = parseInt(document.getElementById("fontSize").value);
        const fontColor = document.getElementById("fontColor").value;
        const strokeWidth = parseInt(document.getElementById("strokeWidth").value);
        const strokeColor = document.getElementById("strokeColor").value;
        const opacity = parseInt(document.getElementById("opacity").value) / 100;
        const offsetX = parseInt(document.getElementById("offsetX").value) || 0;
        const offsetY = parseInt(document.getElementById("offsetY").value) || 0;

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;

        // Draw image
        ctx.drawImage(originalImage, 0, 0);

        // Setup text style
        ctx.font = `${fontSize}px "${fontFamily}"`;
        ctx.globalAlpha = opacity;

        // Calculate text position
        const lines = text.split("\n");
        const lineHeight = fontSize * 1.2;
        const textHeight = lines.length * lineHeight;

        let maxWidth = 0;
        lines.forEach((line) => {
          const width = ctx.measureText(line).width;
          if (width > maxWidth) maxWidth = width;
        });

        let x, y;
        const padding = 20;

        // Horizontal position
        if (position.includes("left")) {
          x = padding;
          ctx.textAlign = "left";
        } else if (position.includes("right")) {
          x = canvas.width - padding;
          ctx.textAlign = "right";
        } else {
          x = canvas.width / 2;
          ctx.textAlign = "center";
        }

        // Vertical position
        if (position.includes("top")) {
          y = padding + fontSize;
        } else if (position.includes("bottom")) {
          y = canvas.height - padding - textHeight + fontSize;
        } else {
          y = (canvas.height - textHeight) / 2 + fontSize;
        }

        x += offsetX;
        y += offsetY;

        // Draw text
        lines.forEach((line, i) => {
          const ly = y + i * lineHeight;

          if (strokeWidth > 0) {
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = strokeWidth;
            ctx.strokeText(line, x, ly);
          }

          ctx.fillStyle = fontColor;
          ctx.fillText(line, x, ly);
        });

        ctx.globalAlpha = 1;
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = "image_with_text.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
