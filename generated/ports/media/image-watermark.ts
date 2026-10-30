// @ts-nocheck
// Generated from tools/media/image-watermark.html
// Source SHA-256: 7313ffd5a6ab427da76f5bbcf6460894ea858338b977c490e6f5efb0439d959f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const canvasContainer = document.getElementById("canvasContainer");
      const canvas = document.getElementById("previewCanvas");
      const ctx = canvas.getContext("2d");

      let originalImage = null;
      let watermarkImage = null;
      let currentTab = "text";
      let position = "c";

      // Upload handlers
      uploadArea.addEventListener("click", () => fileInput.click());
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
      uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("dragover"));
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) loadImage(e.target.files[0]);
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage = new Image();
          originalImage.onload = () => {
            uploadArea.classList.add("hidden");
            canvasContainer.classList.add("visible");
            document.getElementById("downloadBtn").disabled = false;
            renderCanvas();
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // Watermark image
      document.getElementById("watermarkImageInput").addEventListener("change", (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            watermarkImage = new Image();
            watermarkImage.onload = () => {
              const preview = document.getElementById("watermarkPreview");
              while (preview.firstChild) preview.removeChild(preview.firstChild);
              const img = document.createElement("img");
              img.src = ev.target.result;
              preview.appendChild(img);
              renderCanvas();
            };
            watermarkImage.src = ev.target.result;
          };
          reader.readAsDataURL(e.target.files[0]);
        }
      });

      // Tabs
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(btn.dataset.tab + "Tab").classList.add("active");
          currentTab = btn.dataset.tab;
          renderCanvas();
        });
      });

      // Position
      document.querySelectorAll(".pos-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".pos-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          position = btn.dataset.pos;
          renderCanvas();
        });
      });

      // Range inputs
      const ranges = [
        { id: "fontSize", suffix: "px" },
        { id: "strokeWidth", suffix: "px" },
        { id: "opacity", suffix: "%", multiplier: 100 },
        { id: "rotation", suffix: "°" },
        { id: "watermarkScale", suffix: "%" }
      ];

      ranges.forEach(({ id, suffix, multiplier = 1 }) => {
        const input = document.getElementById(id);
        const display = document.getElementById(id + "Value");
        input.addEventListener("input", () => {
          display.textContent = Math.round(input.value * multiplier) + suffix;
          renderCanvas();
        });
      });

      // Other inputs
      ["watermarkText", "fontFamily", "textColor", "strokeColor", "tileMode"].forEach((id) => {
        document.getElementById(id).addEventListener("input", renderCanvas);
        document.getElementById(id).addEventListener("change", renderCanvas);
      });

      function renderCanvas() {
        if (!originalImage) return;

        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        ctx.drawImage(originalImage, 0, 0);

        const opacity = parseFloat(document.getElementById("opacity").value);
        const rotation = parseInt(document.getElementById("rotation").value);
        const isTile = document.getElementById("tileMode").checked;

        ctx.globalAlpha = opacity;

        if (currentTab === "text") {
          renderTextWatermark(rotation, isTile);
        } else {
          renderImageWatermark(rotation, isTile);
        }

        ctx.globalAlpha = 1;
      }

      function renderTextWatermark(rotation, isTile) {
        const text = document.getElementById("watermarkText").value || "Watermark";
        const font = document.getElementById("fontFamily").value;
        const size = parseInt(document.getElementById("fontSize").value);
        const color = document.getElementById("textColor").value;
        const strokeColor = document.getElementById("strokeColor").value;
        const strokeWidth = parseInt(document.getElementById("strokeWidth").value);

        ctx.font = `${size}px ${font}`;
        ctx.fillStyle = color;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = size;

        if (isTile) {
          const spacing = Math.max(textWidth, textHeight) * 1.5;
          for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
            for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate((rotation * Math.PI) / 180);
              if (strokeWidth > 0) ctx.strokeText(text, 0, 0);
              ctx.fillText(text, 0, 0);
              ctx.restore();
            }
          }
        } else {
          const pos = getPosition(textWidth, textHeight);
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.rotate((rotation * Math.PI) / 180);
          if (strokeWidth > 0) ctx.strokeText(text, 0, 0);
          ctx.fillText(text, 0, 0);
          ctx.restore();
        }
      }

      function renderImageWatermark(rotation, isTile) {
        if (!watermarkImage) return;

        const scale = parseInt(document.getElementById("watermarkScale").value) / 100;
        const wmWidth = canvas.width * scale;
        const wmHeight = (watermarkImage.height / watermarkImage.width) * wmWidth;

        if (isTile) {
          const spacing = Math.max(wmWidth, wmHeight) * 1.2;
          for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
            for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
              ctx.save();
              ctx.translate(x, y);
              ctx.rotate((rotation * Math.PI) / 180);
              ctx.drawImage(watermarkImage, -wmWidth / 2, -wmHeight / 2, wmWidth, wmHeight);
              ctx.restore();
            }
          }
        } else {
          const pos = getPosition(wmWidth, wmHeight);
          ctx.save();
          ctx.translate(pos.x, pos.y);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(watermarkImage, -wmWidth / 2, -wmHeight / 2, wmWidth, wmHeight);
          ctx.restore();
        }
      }

      function getPosition(width, height) {
        const padding = 20;
        const positions = {
          nw: { x: padding + width / 2, y: padding + height / 2 },
          n: { x: canvas.width / 2, y: padding + height / 2 },
          ne: { x: canvas.width - padding - width / 2, y: padding + height / 2 },
          w: { x: padding + width / 2, y: canvas.height / 2 },
          c: { x: canvas.width / 2, y: canvas.height / 2 },
          e: { x: canvas.width - padding - width / 2, y: canvas.height / 2 },
          sw: { x: padding + width / 2, y: canvas.height - padding - height / 2 },
          s: { x: canvas.width / 2, y: canvas.height - padding - height / 2 },
          se: { x: canvas.width - padding - width / 2, y: canvas.height - padding - height / 2 }
        };
        return positions[position];
      }

      // Reset
      document.getElementById("resetBtn").addEventListener("click", () => {
        originalImage = null;
        uploadArea.classList.remove("hidden");
        canvasContainer.classList.remove("visible");
        document.getElementById("downloadBtn").disabled = true;
        fileInput.value = "";
      });

      // Download
      document.getElementById("downloadBtn").addEventListener("click", () => {
        if (!originalImage) return;

        const link = document.createElement("a");
        link.download = "watermarked_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });

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
    
