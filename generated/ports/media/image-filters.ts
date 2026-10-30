// @ts-nocheck
// Generated from tools/media/image-filters.html
// Source SHA-256: b474559628fad7a6dab88e0929475b3eadc26bf45e44c9e5e1f605f3431459f8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;

      function setTheme(dark) {
        html.setAttribute("data-theme", dark ? "dark" : "light");
        themeToggle.textContent = dark ? "☀️ 亮色模式" : "🌙 暗色模式";
        localStorage.setItem("theme", dark ? "dark" : "light");
      }

      themeToggle.addEventListener("click", () => {
        setTheme(html.getAttribute("data-theme") !== "dark");
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme(true);
      }

      // Image handling
      const canvas = document.getElementById("imageCanvas");
      const ctx = canvas.getContext("2d");
      const originalCanvas = document.getElementById("originalCanvas");
      const originalCtx = originalCanvas.getContext("2d");
      const fileInput = document.getElementById("fileInput");
      const dropZone = document.getElementById("dropZone");
      const placeholder = document.getElementById("placeholder");
      const compareSlider = document.getElementById("compareSlider");

      let originalImage = null;
      let originalImageData = null;
      let isComparing = false;

      // Control elements
      const controls = [
        "brightness",
        "contrast",
        "saturation",
        "temperature",
        "hue",
        "blur",
        "sharpen",
        "vignette"
      ];

      controls.forEach((control) => {
        const input = document.getElementById(control);
        const valueDisplay = document.getElementById(control + "Value");
        input.addEventListener("input", () => {
          valueDisplay.textContent = input.value;
          applyFilters();
        });
      });

      // File handling
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) loadImage(e.target.files[0]);
      });

      dropZone.addEventListener("click", () => fileInput.click());
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            originalImage = img;

            const maxWidth = document.getElementById("canvasContainer").clientWidth - 20;
            const maxHeight = 600;

            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
              const ratio = maxWidth / width;
              width = maxWidth;
              height = height * ratio;
            }
            if (height > maxHeight) {
              const ratio = maxHeight / height;
              height = maxHeight;
              width = width * ratio;
            }

            canvas.width = width;
            canvas.height = height;
            originalCanvas.width = width;
            originalCanvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);
            originalCtx.drawImage(img, 0, 0, width, height);
            originalImageData = ctx.getImageData(0, 0, width, height);

            canvas.style.display = "block";
            placeholder.style.display = "none";

            document.getElementById("compareBtn").disabled = false;
            document.getElementById("resetBtn").disabled = false;
            document.getElementById("downloadBtn").disabled = false;

            resetFilters();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      function applyFilters() {
        if (!originalImageData) return;

        const imageData = new ImageData(
          new Uint8ClampedArray(originalImageData.data),
          originalImageData.width,
          originalImageData.height
        );

        const brightness = parseInt(document.getElementById("brightness").value);
        const contrast = parseInt(document.getElementById("contrast").value);
        const saturation = parseInt(document.getElementById("saturation").value);
        const temperature = parseInt(document.getElementById("temperature").value);
        const hue = parseInt(document.getElementById("hue").value);
        const sharpen = parseInt(document.getElementById("sharpen").value);
        const vignette = parseInt(document.getElementById("vignette").value);

        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;

        // Apply pixel-level adjustments
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Brightness
          r += brightness * 2.55;
          g += brightness * 2.55;
          b += brightness * 2.55;

          // Contrast
          const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          r = factor * (r - 128) + 128;
          g = factor * (g - 128) + 128;
          b = factor * (b - 128) + 128;

          // Temperature
          r += temperature * 0.5;
          b -= temperature * 0.5;

          // Saturation
          const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
          const satFactor = 1 + saturation / 100;
          r = gray + satFactor * (r - gray);
          g = gray + satFactor * (g - gray);
          b = gray + satFactor * (b - gray);

          // Hue rotation
          if (hue !== 0) {
            const hsl = rgbToHsl(r, g, b);
            hsl.h = (hsl.h + hue) % 360;
            const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;
          }

          // Vignette
          if (vignette > 0) {
            const px = (i / 4) % width;
            const py = Math.floor(i / 4 / width);
            const cx = width / 2;
            const cy = height / 2;
            const maxDist = Math.sqrt(cx * cx + cy * cy);
            const dist = Math.sqrt((px - cx) * (px - cx) + (py - cy) * (py - cy));
            const vignetteFactor = 1 - (dist / maxDist) * (vignette / 100);
            r *= vignetteFactor;
            g *= vignetteFactor;
            b *= vignetteFactor;
          }

          data[i] = Math.max(0, Math.min(255, r));
          data[i + 1] = Math.max(0, Math.min(255, g));
          data[i + 2] = Math.max(0, Math.min(255, b));
        }

        // Sharpen using convolution
        if (sharpen > 0) {
          const sharpened = sharpenImage(imageData, sharpen / 100);
          ctx.putImageData(sharpened, 0, 0);
        } else {
          ctx.putImageData(imageData, 0, 0);
        }

        // Apply CSS blur
        const blurValue = document.getElementById("blur").value;
        canvas.style.filter = blurValue > 0 ? "blur(" + blurValue + "px)" : "none";
      }

      function sharpenImage(imageData, amount) {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const output = new ImageData(width, height);
        const outputData = output.data;

        const kernel = [0, -amount, 0, -amount, 1 + 4 * amount, -amount, 0, -amount, 0];

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            for (let c = 0; c < 3; c++) {
              let sum = 0;
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const idx = ((y + ky) * width + (x + kx)) * 4 + c;
                  sum += data[idx] * kernel[(ky + 1) * 3 + (kx + 1)];
                }
              }
              outputData[(y * width + x) * 4 + c] = Math.max(0, Math.min(255, sum));
            }
            outputData[(y * width + x) * 4 + 3] = data[(y * width + x) * 4 + 3];
          }
        }

        return output;
      }

      function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        let h,
          s,
          l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
          h *= 360;
        }
        return { h, s, l };
      }

      function hslToRgb(h, s, l) {
        h /= 360;
        let r, g, b;

        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
      }

      // Presets
      const presets = {
        original: {
          brightness: 0,
          contrast: 0,
          saturation: 0,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 0
        },
        vintage: {
          brightness: 5,
          contrast: -10,
          saturation: -30,
          temperature: 20,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 30
        },
        lomo: {
          brightness: 0,
          contrast: 30,
          saturation: 30,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 20,
          vignette: 50
        },
        blackwhite: {
          brightness: 0,
          contrast: 10,
          saturation: -100,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 10,
          vignette: 0
        },
        sepia: {
          brightness: 10,
          contrast: 0,
          saturation: -50,
          temperature: 40,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 20
        },
        cool: {
          brightness: 0,
          contrast: 5,
          saturation: 10,
          temperature: -30,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 0
        },
        warm: {
          brightness: 5,
          contrast: 5,
          saturation: 10,
          temperature: 30,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 0
        },
        dramatic: {
          brightness: -10,
          contrast: 40,
          saturation: -20,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 30,
          vignette: 40
        },
        fade: {
          brightness: 20,
          contrast: -20,
          saturation: -30,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 0,
          vignette: 0
        },
        vivid: {
          brightness: 5,
          contrast: 20,
          saturation: 50,
          temperature: 0,
          hue: 0,
          blur: 0,
          sharpen: 20,
          vignette: 0
        }
      };

      window.applyPreset = function (name) {
        const preset = presets[name];
        controls.forEach((control) => {
          const input = document.getElementById(control);
          const valueDisplay = document.getElementById(control + "Value");
          input.value = preset[control];
          valueDisplay.textContent = preset[control];
        });
        applyFilters();
      };

      window.resetFilters = function () {
        applyPreset("original");
      };

      // Compare functionality
      window.toggleCompare = function () {
        isComparing = !isComparing;
        const btn = document.getElementById("compareBtn");

        if (isComparing) {
          btn.textContent = "👁️ 隐藏对比";
          originalCanvas.style.display = "block";
          compareSlider.classList.remove("hidden");
          updateComparePosition(50);
        } else {
          btn.textContent = "👁️ 对比原图";
          originalCanvas.style.display = "none";
          compareSlider.classList.add("hidden");
        }
      };

      function updateComparePosition(percent) {
        compareSlider.style.left = percent + "%";
        originalCanvas.style.clipPath = "inset(0 " + (100 - percent) + "% 0 0)";
      }

      // Compare slider drag
      let isDragging = false;
      const canvasContainer = document.getElementById("canvasContainer");

      canvasContainer.addEventListener("mousedown", (e) => {
        if (isComparing) {
          isDragging = true;
          updateSliderFromEvent(e);
        }
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging && isComparing) {
          updateSliderFromEvent(e);
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });

      function updateSliderFromEvent(e) {
        const rect = canvasContainer.getBoundingClientRect();
        let percent = ((e.clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        updateComparePosition(percent);
      }

      // Download
      window.downloadImage = function () {
        const link = document.createElement("a");
        link.download = "filtered-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
