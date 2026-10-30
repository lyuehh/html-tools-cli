// @ts-nocheck
// Generated from tools/generator/meme-maker.html
// Source SHA-256: 85591675a837cb227ebe850df1169d7287f238a50fe7011cb87b895adf9e38ca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme management
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      // Canvas setup
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      let state = {
        image: null,
        topText: "",
        bottomText: "当我看到代码能运行时",
        textColor: "#ffffff",
        strokeColor: "#000000",
        fontSize: 48,
        strokeWidth: 4,
        font: "Impact",
        filter: "none",
        template: "bottom-only"
      };

      const fonts = {
        impact: "Impact, Haettenschweiler, sans-serif",
        comic: "Comic Sans MS, cursive",
        bold: "Arial Black, sans-serif",
        handwriting: "Brush Script MT, cursive"
      };

      // Upload handling
      const uploadArea = document.getElementById("uploadArea");
      const imageUpload = document.getElementById("imageUpload");

      uploadArea.addEventListener("click", () => imageUpload.click());

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
          loadImage(file);
        }
      });

      imageUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) loadImage(file);
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            state.image = img;
            // Resize canvas to fit image
            const maxSize = 800;
            let w = img.width;
            let h = img.height;
            if (w > maxSize || h > maxSize) {
              if (w > h) {
                h = (h / w) * maxSize;
                w = maxSize;
              } else {
                w = (w / h) * maxSize;
                h = maxSize;
              }
            }
            canvas.width = w;
            canvas.height = h;
            render();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // Event listeners
      document.getElementById("topText").addEventListener("input", (e) => {
        state.topText = e.target.value;
        render();
      });

      document.getElementById("bottomText").addEventListener("input", (e) => {
        state.bottomText = e.target.value;
        render();
      });

      document.getElementById("textColor").addEventListener("input", (e) => {
        state.textColor = e.target.value;
        render();
      });

      document.getElementById("strokeColor").addEventListener("input", (e) => {
        state.strokeColor = e.target.value;
        render();
      });

      document.getElementById("fontSize").addEventListener("input", (e) => {
        state.fontSize = parseInt(e.target.value);
        document.getElementById("fontSizeValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("strokeWidth").addEventListener("input", (e) => {
        state.strokeWidth = parseInt(e.target.value);
        document.getElementById("strokeWidthValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("imageFilter").addEventListener("change", (e) => {
        state.filter = e.target.value;
        render();
      });

      document.querySelectorAll(".template-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".template-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.template = btn.dataset.template;

          // Set default texts based on template
          if (state.template === "top-only") {
            document.getElementById("bottomText").value = "";
            state.bottomText = "";
          } else if (state.template === "bottom-only") {
            document.getElementById("topText").value = "";
            state.topText = "";
          }
          render();
        });
      });

      document.querySelectorAll(".effect-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".effect-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.font = fonts[btn.dataset.effect];
          render();
        });
      });

      function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background if no image
        if (!state.image) {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, "#667eea");
          gradient.addColorStop(1, "#764ba2");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Placeholder text
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.font = "24px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("上传图片开始制作", canvas.width / 2, canvas.height / 2);
        } else {
          // Apply filter
          switch (state.filter) {
            case "grayscale":
              ctx.filter = "grayscale(100%)";
              break;
            case "sepia":
              ctx.filter = "sepia(100%)";
              break;
            case "saturate":
              ctx.filter = "saturate(200%)";
              break;
            case "contrast":
              ctx.filter = "contrast(150%)";
              break;
            case "brightness":
              ctx.filter = "brightness(130%)";
              break;
            case "blur":
              ctx.filter = "blur(2px)";
              break;
            default:
              ctx.filter = "none";
          }

          ctx.drawImage(state.image, 0, 0, canvas.width, canvas.height);
          ctx.filter = "none";
        }

        // Draw text
        ctx.font = `bold ${state.fontSize}px ${state.font}`;
        ctx.fillStyle = state.textColor;
        ctx.strokeStyle = state.strokeColor;
        ctx.lineWidth = state.strokeWidth;
        ctx.textAlign = "center";
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;

        // Helper function for wrapped text
        function drawText(text, y, isTop) {
          if (!text) return;

          const maxWidth = canvas.width * 0.9;
          const words = text.split("");
          let line = "";
          const lines = [];

          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
              lines.push(line);
              line = words[n];
            } else {
              line = testLine;
            }
          }
          lines.push(line);

          const lineHeight = state.fontSize * 1.2;
          let startY = y;

          if (!isTop) {
            startY = y - (lines.length - 1) * lineHeight;
          }

          lines.forEach((l, i) => {
            const currentY = startY + i * lineHeight;
            if (state.strokeWidth > 0) {
              ctx.strokeText(l, canvas.width / 2, currentY);
            }
            ctx.fillText(l, canvas.width / 2, currentY);
          });
        }

        // Draw based on template
        ctx.textBaseline = "top";
        if (state.template !== "bottom-only" && state.template !== "center") {
          drawText(state.topText, state.fontSize * 0.5, true);
        }

        ctx.textBaseline = "bottom";
        if (state.template !== "top-only" && state.template !== "center") {
          drawText(state.bottomText, canvas.height - state.fontSize * 0.3, false);
        }

        if (state.template === "center") {
          ctx.textBaseline = "middle";
          drawText(state.topText || state.bottomText, canvas.height / 2, true);
        }

        // Speech bubble for speech template
        if (state.template === "speech" && (state.topText || state.bottomText)) {
          ctx.save();
          const text = state.topText || state.bottomText;
          const metrics = ctx.measureText(text);
          const bubbleWidth = Math.min(metrics.width + 40, canvas.width * 0.8);
          const bubbleHeight = state.fontSize * 2;
          const bubbleX = (canvas.width - bubbleWidth) / 2;
          const bubbleY = 20;

          // Draw bubble
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
          ctx.fill();

          // Draw tail
          ctx.beginPath();
          ctx.moveTo(bubbleX + bubbleWidth * 0.3, bubbleY + bubbleHeight);
          ctx.lineTo(bubbleX + bubbleWidth * 0.2, bubbleY + bubbleHeight + 20);
          ctx.lineTo(bubbleX + bubbleWidth * 0.5, bubbleY + bubbleHeight);
          ctx.fill();

          // Draw text in bubble
          ctx.fillStyle = "#333";
          ctx.strokeStyle = "transparent";
          ctx.textBaseline = "middle";
          ctx.fillText(text, canvas.width / 2, bubbleY + bubbleHeight / 2);
          ctx.restore();
        }
      }

      window.downloadMeme = function () {
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.resetMeme = function () {
        state.image = null;
        state.topText = "";
        state.bottomText = "";
        document.getElementById("topText").value = "";
        document.getElementById("bottomText").value = "";
        canvas.width = 600;
        canvas.height = 600;
        render();
      };

      // Initial render
      render();
    
