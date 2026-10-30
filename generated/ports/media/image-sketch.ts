// @ts-nocheck
// Generated from tools/media/image-sketch.html
// Source SHA-256: b06660d776e9169ace596798c7e9ac5014fe185257194084def8efbe2b5ff750
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let currentStyle = "pencil";
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
            applyEffect();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.setStyle = function (style) {
        currentStyle = style;
        document.querySelectorAll(".style-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.style === style);
        });
        applyEffect();
      };

      window.applyEffect = function () {
        if (!originalImage) return;

        const intensity = parseInt(document.getElementById("intensity").value);
        const contrast = parseInt(document.getElementById("contrast").value);

        document.getElementById("intensityValue").textContent = intensity;
        document.getElementById("contrastValue").textContent = contrast + "%";

        document.getElementById("loading").classList.remove("hidden");

        setTimeout(() => {
          canvas.width = originalImage.width;
          canvas.height = originalImage.height;

          ctx.drawImage(originalImage, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          // Convert to grayscale first
          for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = data[i + 1] = data[i + 2] = gray;
          }

          ctx.putImageData(imageData, 0, 0);

          // Apply style-specific effects
          switch (currentStyle) {
            case "pencil":
              applyPencilEffect(intensity, contrast);
              break;
            case "charcoal":
              applyCharcoalEffect(intensity, contrast);
              break;
            case "outline":
              applyOutlineEffect(intensity, contrast);
              break;
            case "crosshatch":
              applyCrosshatchEffect(intensity, contrast);
              break;
          }

          document.getElementById("loading").classList.add("hidden");
        }, 50);
      };

      function applyPencilEffect(intensity, contrast) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Invert
        const inverted = new Uint8ClampedArray(data.length);
        for (let i = 0; i < data.length; i += 4) {
          inverted[i] = 255 - data[i];
          inverted[i + 1] = 255 - data[i + 1];
          inverted[i + 2] = 255 - data[i + 2];
          inverted[i + 3] = 255;
        }

        // Apply gaussian blur to inverted
        const blurRadius = Math.max(1, Math.floor(intensity / 10));
        const blurred = gaussianBlur(inverted, canvas.width, canvas.height, blurRadius);

        // Color dodge blend
        for (let i = 0; i < data.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            const base = data[i + c];
            const blend = blurred[i + c];
            data[i + c] = blend === 255 ? 255 : Math.min(255, (base * 256) / (256 - blend));
          }

          // Apply contrast
          const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          for (let c = 0; c < 3; c++) {
            data[i + c] = Math.max(0, Math.min(255, factor * (data[i + c] - 128) + 128));
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      function applyCharcoalEffect(intensity, contrast) {
        applyPencilEffect(intensity, contrast);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Add noise for texture
        const noiseAmount = (intensity / 100) * 30;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseAmount;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }

        // Darken
        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] * 0.85;
          data[i + 1] = data[i + 1] * 0.85;
          data[i + 2] = data[i + 2] * 0.85;
        }

        ctx.putImageData(imageData, 0, 0);
      }

      function applyOutlineEffect(intensity, contrast) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        // Sobel edge detection
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

        const output = new Uint8ClampedArray(data.length);

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            let gx = 0,
              gy = 0;

            for (let ky = -1; ky <= 1; ky++) {
              for (let kx = -1; kx <= 1; kx++) {
                const idx = ((y + ky) * width + (x + kx)) * 4;
                const kidx = (ky + 1) * 3 + (kx + 1);
                gx += data[idx] * sobelX[kidx];
                gy += data[idx] * sobelY[kidx];
              }
            }

            let magnitude = Math.sqrt(gx * gx + gy * gy);
            magnitude = magnitude * (intensity / 50);

            const idx = (y * width + x) * 4;
            const edge = 255 - Math.min(255, magnitude);
            output[idx] = output[idx + 1] = output[idx + 2] = edge;
            output[idx + 3] = 255;
          }
        }

        // Apply contrast
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        for (let i = 0; i < output.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            output[i + c] = Math.max(0, Math.min(255, factor * (output[i + c] - 128) + 128));
          }
        }

        ctx.putImageData(new ImageData(output, width, height), 0, 0);
      }

      function applyCrosshatchEffect(intensity, contrast) {
        applyOutlineEffect(intensity, contrast);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Add crosshatch pattern based on darkness
        const spacing = Math.max(3, 10 - intensity / 15);

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            const brightness = data[idx];

            if (brightness < 200) {
              const density = (200 - brightness) / 200;
              if (
                (x + y) % spacing < (density * spacing) / 2 ||
                (x - y + canvas.height) % spacing < (density * spacing) / 2
              ) {
                data[idx] = data[idx + 1] = data[idx + 2] = Math.max(0, brightness - 50);
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      function gaussianBlur(data, width, height, radius) {
        const output = new Uint8ClampedArray(data.length);
        const kernel = createGaussianKernel(radius);
        const kSize = radius * 2 + 1;

        // Horizontal pass
        const temp = new Uint8ClampedArray(data.length);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0,
              g = 0,
              b = 0,
              sum = 0;
            for (let k = -radius; k <= radius; k++) {
              const px = Math.max(0, Math.min(width - 1, x + k));
              const idx = (y * width + px) * 4;
              const weight = kernel[k + radius];
              r += data[idx] * weight;
              g += data[idx + 1] * weight;
              b += data[idx + 2] * weight;
              sum += weight;
            }
            const idx = (y * width + x) * 4;
            temp[idx] = r / sum;
            temp[idx + 1] = g / sum;
            temp[idx + 2] = b / sum;
            temp[idx + 3] = 255;
          }
        }

        // Vertical pass
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0,
              g = 0,
              b = 0,
              sum = 0;
            for (let k = -radius; k <= radius; k++) {
              const py = Math.max(0, Math.min(height - 1, y + k));
              const idx = (py * width + x) * 4;
              const weight = kernel[k + radius];
              r += temp[idx] * weight;
              g += temp[idx + 1] * weight;
              b += temp[idx + 2] * weight;
              sum += weight;
            }
            const idx = (y * width + x) * 4;
            output[idx] = r / sum;
            output[idx + 1] = g / sum;
            output[idx + 2] = b / sum;
            output[idx + 3] = 255;
          }
        }

        return output;
      }

      function createGaussianKernel(radius) {
        const kernel = [];
        const sigma = radius / 3;
        for (let i = -radius; i <= radius; i++) {
          kernel.push(Math.exp(-(i * i) / (2 * sigma * sigma)));
        }
        return kernel;
      }

      window.download = function () {
        const link = document.createElement("a");
        link.download = "sketch_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
