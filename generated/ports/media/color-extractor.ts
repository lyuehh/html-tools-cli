// @ts-nocheck
// Generated from tools/media/color-extractor.html
// Source SHA-256: 06a187e965bebb9a1ceb52e1ab5a7900a04a54a67fae881f43d40616b0202165
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      let extractedColors = [];
      let colorCount = 6;
      let imageData = null;

      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const mainContent = document.getElementById("mainContent");
      const previewImg = document.getElementById("previewImg");
      const canvas = document.getElementById("canvas") || document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Drag and drop
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
          processImage(file);
        }
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) processImage(file);
      });

      function processImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
          previewImg.onload = () => {
            mainContent.classList.add("active");
            uploadArea.style.display = "none";
            extractColors();
          };
        };
        reader.readAsDataURL(file);
      }

      function extractColors() {
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;
        ctx.drawImage(previewImg, 0, 0);
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Simple color quantization using k-means-like approach
        const pixels = [];
        const data = imageData.data;
        const step = Math.max(1, Math.floor(data.length / 4 / 10000)); // Sample pixels

        for (let i = 0; i < data.length; i += 4 * step) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a > 128) {
            // Skip transparent pixels
            pixels.push([r, g, b]);
          }
        }

        // Simple quantization: group similar colors
        extractedColors = quantizeColors(pixels, colorCount);
        renderPalette();
      }

      function quantizeColors(pixels, count) {
        if (pixels.length === 0) return [];

        // Initialize centroids randomly
        const centroids = [];
        const available = [...new Map(pixels.map(pixel => [pixel.join(","), pixel])).values()];
        while (centroids.length < count && available.length) {
          const index = Math.floor(Math.random() * available.length);
          centroids.push([...available.splice(index, 1)[0]]);
        }

        // K-means iterations
        for (let iter = 0; iter < 10; iter++) {
          const clusters = centroids.map(() => []);

          // Assign pixels to nearest centroid
          for (const pixel of pixels) {
            let minDist = Infinity;
            let minIdx = 0;
            for (let i = 0; i < centroids.length; i++) {
              const dist = colorDistance(pixel, centroids[i]);
              if (dist < minDist) {
                minDist = dist;
                minIdx = i;
              }
            }
            clusters[minIdx].push(pixel);
          }

          // Update centroids
          for (let i = 0; i < centroids.length; i++) {
            if (clusters[i].length > 0) {
              centroids[i] = [
                Math.round(clusters[i].reduce((s, p) => s + p[0], 0) / clusters[i].length),
                Math.round(clusters[i].reduce((s, p) => s + p[1], 0) / clusters[i].length),
                Math.round(clusters[i].reduce((s, p) => s + p[2], 0) / clusters[i].length)
              ];
            }
          }
        }

        // Calculate percentages
        const clusters = centroids.map(() => 0);
        for (const pixel of pixels) {
          let minDist = Infinity;
          let minIdx = 0;
          for (let i = 0; i < centroids.length; i++) {
            const dist = colorDistance(pixel, centroids[i]);
            if (dist < minDist) {
              minDist = dist;
              minIdx = i;
            }
          }
          clusters[minIdx]++;
        }

        return centroids
          .map((c, i) => ({
            rgb: c,
            hex: rgbToHex(c[0], c[1], c[2]),
            percent: Math.round((clusters[i] / pixels.length) * 100)
          }))
          .sort((a, b) => b.percent - a.percent);
      }

      function colorDistance(c1, c2) {
        return Math.sqrt(
          Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2) + Math.pow(c1[2] - c2[2], 2)
        );
      }

      function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
      }

      function renderPalette() {
        const grid = document.getElementById("paletteGrid");
        grid.innerHTML = extractedColors
          .map(
            (color, i) => `
                <div class="color-card" onclick="copyColor('${color.hex}')">
                    <div class="color-swatch" style="background: ${color.hex}"></div>
                    <div class="color-info">
                        <div class="color-hex">${color.hex.toUpperCase()}</div>
                        <div class="color-rgb">rgb(${color.rgb.join(", ")})</div>
                    </div>
                    <span class="color-percent">${color.percent}%</span>
                </div>
            `
          )
          .join("");
      }

      window.setColorCount = function (count) {
        colorCount = count;
        document.querySelectorAll(".count-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.textContent === count + " 色");
        });
        if (imageData) extractColors();
      };

      // Pick color from image
      previewImg.addEventListener("click", (e) => {
        const rect = previewImg.getBoundingClientRect();
        const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
        const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

        document.getElementById("pickedSwatch").style.background = hex;
        document.getElementById("pickedHex").textContent = hex.toUpperCase();
        document.getElementById("pickedRgb").textContent = rgb;
        document.getElementById("pickedColor").classList.add("active");
      });

      window.copyColor = function (text) {
        navigator.clipboard.writeText(text);
        showToast("已复制: " + text);
      };

      window.copyAllColors = function () {
        const colors = extractedColors.map((c) => c.hex.toUpperCase()).join("\n");
        navigator.clipboard.writeText(colors);
        showToast("已复制所有颜色");
      };

      window.exportCSS = function () {
        const css = `:root {\n${extractedColors
          .map((c, i) => `  --color-${i + 1}: ${c.hex};`)
          .join("\n")}\n}`;
        navigator.clipboard.writeText(css);
        showToast("已复制 CSS 变量");
      };

      window.exportJSON = function () {
        const json = JSON.stringify(
          extractedColors.map((c) => ({
            hex: c.hex,
            rgb: c.rgb,
            percent: c.percent
          })),
          null,
          2
        );
        navigator.clipboard.writeText(json);
        showToast("已复制 JSON");
      };

      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }
    
