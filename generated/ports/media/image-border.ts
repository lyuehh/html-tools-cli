// @ts-nocheck
// Generated from tools/media/image-border.html
// Source SHA-256: b2a56c115a9ce52d58535b5866b9ac79f542447b8052402723a00ba29b0d6bfc
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let borderStyle = "solid";
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

      window.setStyle = function (style) {
        borderStyle = style;
        document.querySelectorAll(".style-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.style === style);
        });
        updatePreview();
      };

      window.setColor = function (color) {
        document.getElementById("borderColor").value = color;
        updatePreview();
      };

      window.updatePreview = function () {
        if (!originalImage) return;

        const borderWidth = parseInt(document.getElementById("borderWidth").value);
        const borderColor = document.getElementById("borderColor").value;
        const borderRadius = parseInt(document.getElementById("borderRadius").value);

        document.getElementById("borderWidthValue").textContent = borderWidth + "px";
        document.getElementById("borderRadiusValue").textContent = borderRadius + "px";

        let padding = borderWidth;
        let bottomPadding = borderWidth;

        if (borderStyle === "polaroid") {
          bottomPadding = borderWidth * 3;
        } else if (borderStyle === "film") {
          padding = borderWidth * 1.5;
        }

        canvas.width = originalImage.width + padding * 2;
        canvas.height = originalImage.height + padding + bottomPadding;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw border based on style
        if (borderStyle === "solid") {
          drawRoundedRect(0, 0, canvas.width, canvas.height, borderRadius, borderColor);
          ctx.drawImage(originalImage, padding, padding);
        } else if (borderStyle === "double") {
          drawRoundedRect(0, 0, canvas.width, canvas.height, borderRadius, borderColor);
          const innerGap = 4;
          ctx.fillStyle = "#333";
          drawRoundedRect(
            innerGap,
            innerGap,
            canvas.width - innerGap * 2,
            canvas.height - innerGap * 2,
            borderRadius,
            "#333"
          );
          drawRoundedRect(
            innerGap * 2,
            innerGap * 2,
            canvas.width - innerGap * 4,
            canvas.height - innerGap * 4,
            borderRadius,
            borderColor
          );
          ctx.drawImage(originalImage, padding, padding);
        } else if (borderStyle === "shadow") {
          ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 10;
          ctx.fillStyle = borderColor;
          ctx.fillRect(
            padding / 2,
            padding / 2,
            originalImage.width + padding,
            originalImage.height + padding
          );
          ctx.shadowColor = "transparent";
          ctx.drawImage(originalImage, padding, padding);
        } else if (borderStyle === "polaroid") {
          ctx.fillStyle = borderColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(originalImage, padding, padding);
        } else if (borderStyle === "film") {
          ctx.fillStyle = "#1a1a1a";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          // Film holes
          const holeSize = 10;
          const holeGap = 20;
          ctx.fillStyle = "#fff";
          for (let y = holeGap; y < canvas.height - holeGap; y += holeGap) {
            ctx.beginPath();
            ctx.arc(holeSize, y, holeSize / 2, 0, Math.PI * 2);
            ctx.arc(canvas.width - holeSize, y, holeSize / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.drawImage(originalImage, padding, padding);
        }
      };

      function drawRoundedRect(x, y, w, h, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
      }

      window.download = function () {
        const link = document.createElement("a");
        link.download = "bordered_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
