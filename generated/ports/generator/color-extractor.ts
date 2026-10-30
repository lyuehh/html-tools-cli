// @ts-nocheck
// Generated from tools/generator/color-extractor.html
// Source SHA-256: 3a6dc600f2584a8c18f5d06e862bc8ab32ce56b023a4b0d67261da928312df81
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

      let state = {
        imageData: null,
        colors: [],
        colorCount: 6,
        algorithm: "quantize",
        pickedColor: null
      };

      const uploadArea = document.getElementById("uploadArea");
      const imageUpload = document.getElementById("imageUpload");
      const previewImage = document.getElementById("previewImage");
      const hiddenCanvas =
        document.getElementById("hiddenCanvas") || document.createElement("canvas");
      const ctx = hiddenCanvas.getContext("2d");

      // Upload handling
      uploadArea.addEventListener("click", (e) => {
        if (e.target === previewImage) return;
        imageUpload.click();
      });

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

      previewImage.addEventListener("click", (e) => {
        if (!state.imageData) return;

        const rect = previewImage.getBoundingClientRect();
        const scaleX = hiddenCanvas.width / rect.width;
        const scaleY = hiddenCanvas.height / rect.height;
        const x = Math.floor((e.clientX - rect.left) * scaleX);
        const y = Math.floor((e.clientY - rect.top) * scaleY);

        const index = (y * hiddenCanvas.width + x) * 4;
        const r = state.imageData.data[index];
        const g = state.imageData.data[index + 1];
        const b = state.imageData.data[index + 2];

        state.pickedColor = { r, g, b };
        showPickedColor();
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            // Show preview
            previewImage.src = e.target.result;
            previewImage.style.display = "block";
            uploadArea.classList.add("has-image");
            uploadArea.querySelector(".upload-icon").style.display = "none";
            uploadArea.querySelector("p").style.display = "none";
            uploadArea.querySelectorAll("small").forEach((s) => (s.style.display = "none"));

            // Draw to hidden canvas for processing
            const maxSize = 200; // Downsample for performance
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
            hiddenCanvas.width = w;
            hiddenCanvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            state.imageData = ctx.getImageData(0, 0, w, h);

            extractColors();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      document.getElementById("colorCount").addEventListener("input", (e) => {
        state.colorCount = parseInt(e.target.value);
        document.getElementById("colorCountValue").textContent = e.target.value;
        if (state.imageData) extractColors();
      });

      document.querySelectorAll(".algo-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".algo-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.algorithm = btn.dataset.algo;
          if (state.imageData) extractColors();
        });
      });

      function extractColors() {
        if (!state.imageData) return;

        const pixels = [];
        const data = state.imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          pixels.push([data[i], data[i + 1], data[i + 2]]);
        }

        switch (state.algorithm) {
          case "quantize":
            state.colors = quantizeColors(pixels, state.colorCount);
            break;
          case "kmeans":
            state.colors = kmeansColors(pixels, state.colorCount);
            break;
          case "median":
            state.colors = medianCutColors(pixels, state.colorCount);
            break;
          case "dominant":
            state.colors = dominantColors(pixels, state.colorCount);
            break;
        }

        renderPalette();
      }

      function quantizeColors(pixels, count) {
        const colorMap = {};
        const quantize = 32;

        pixels.forEach(([r, g, b]) => {
          const qr = Math.floor(r / quantize) * quantize;
          const qg = Math.floor(g / quantize) * quantize;
          const qb = Math.floor(b / quantize) * quantize;
          const key = qr + "," + qg + "," + qb;
          colorMap[key] = (colorMap[key] || 0) + 1;
        });

        const sorted = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, count);

        return sorted.map(([key, freq]) => {
          const [r, g, b] = key.split(",").map(Number);
          return { r, g, b, frequency: freq / pixels.length };
        });
      }

      function kmeansColors(pixels, count) {
        let centroids = [];
        for (let i = 0; i < count; i++) {
          centroids.push(pixels[Math.floor(Math.random() * pixels.length)].slice());
        }

        for (let iter = 0; iter < 20; iter++) {
          const clusters = Array(count)
            .fill(null)
            .map(() => []);

          pixels.forEach((pixel) => {
            let minDist = Infinity;
            let closestIdx = 0;

            centroids.forEach((centroid, idx) => {
              const dist = Math.sqrt(
                (pixel[0] - centroid[0]) ** 2 +
                  (pixel[1] - centroid[1]) ** 2 +
                  (pixel[2] - centroid[2]) ** 2
              );
              if (dist < minDist) {
                minDist = dist;
                closestIdx = idx;
              }
            });

            clusters[closestIdx].push(pixel);
          });

          centroids = clusters.map((cluster, i) => {
            if (cluster.length === 0) return centroids[i];
            const sum = cluster.reduce(
              (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
              [0, 0, 0]
            );
            return [sum[0] / cluster.length, sum[1] / cluster.length, sum[2] / cluster.length];
          });
        }

        return centroids.map((c) => ({
          r: Math.round(c[0]),
          g: Math.round(c[1]),
          b: Math.round(c[2]),
          frequency: 1 / count
        }));
      }

      function medianCutColors(pixels, count) {
        function splitBox(box) {
          const ranges = [0, 1, 2].map((i) => {
            const values = box.map((p) => p[i]);
            return Math.max(...values) - Math.min(...values);
          });

          const maxRange = Math.max(...ranges);
          const splitChannel = ranges.indexOf(maxRange);

          box.sort((a, b) => a[splitChannel] - b[splitChannel]);
          const mid = Math.floor(box.length / 2);
          return [box.slice(0, mid), box.slice(mid)];
        }

        let boxes = [pixels.slice()];

        while (boxes.length < count) {
          boxes.sort((a, b) => b.length - a.length);
          const largest = boxes.shift();
          const [box1, box2] = splitBox(largest);
          boxes.push(box1, box2);
        }

        return boxes.map((box) => {
          const avg = box.reduce(
            (acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]],
            [0, 0, 0]
          );
          return {
            r: Math.round(avg[0] / box.length),
            g: Math.round(avg[1] / box.length),
            b: Math.round(avg[2] / box.length),
            frequency: box.length / pixels.length
          };
        });
      }

      function dominantColors(pixels, count) {
        const colorMap = {};

        pixels.forEach(([r, g, b]) => {
          const key = r + "," + g + "," + b;
          colorMap[key] = (colorMap[key] || 0) + 1;
        });

        const sorted = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, count * 10);

        // Cluster similar colors
        const result = [];
        sorted.forEach(([key, freq]) => {
          const [r, g, b] = key.split(",").map(Number);
          let found = false;

          for (const color of result) {
            const dist = Math.sqrt((r - color.r) ** 2 + (g - color.g) ** 2 + (b - color.b) ** 2);
            if (dist < 50) {
              found = true;
              break;
            }
          }

          if (!found && result.length < count) {
            result.push({ r, g, b, frequency: freq / pixels.length });
          }
        });

        return result;
      }

      function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
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
        }

        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
      }

      function getLuminance(r, g, b) {
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }

      function renderPalette() {
        const container = document.getElementById("colorPalette");
        container.textContent = "";

        state.colors.forEach((color) => {
          const hex = rgbToHex(color.r, color.g, color.b);
          const isLight = getLuminance(color.r, color.g, color.b) > 0.5;

          const div = document.createElement("div");
          div.className = "palette-color";
          div.style.background = isLight ? "#f5f5f5" : "#2a2a2a";

          const swatch = document.createElement("div");
          swatch.className = "color-swatch";
          swatch.style.background = hex;

          const info = document.createElement("div");
          info.className = "color-info";

          const hexDiv = document.createElement("div");
          hexDiv.className = "color-hex";
          hexDiv.textContent = hex;
          hexDiv.style.color = isLight ? "#333" : "#fff";

          const rgbDiv = document.createElement("div");
          rgbDiv.className = "color-rgb";
          rgbDiv.textContent = "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
          rgbDiv.style.color = isLight ? "#666" : "#aaa";

          const percentDiv = document.createElement("div");
          percentDiv.className = "color-percentage";
          percentDiv.textContent = (color.frequency * 100).toFixed(1) + "%";
          percentDiv.style.color = isLight ? "#999" : "#777";

          info.appendChild(hexDiv);
          info.appendChild(rgbDiv);
          info.appendChild(percentDiv);

          div.appendChild(swatch);
          div.appendChild(info);

          div.addEventListener("click", () => {
            navigator.clipboard.writeText(hex).then(() => {
              alert("颜色 " + hex + " 已复制！");
            });
          });

          container.appendChild(div);
        });
      }

      function showPickedColor() {
        const container = document.getElementById("pickedColor");
        container.classList.add("show");

        const { r, g, b } = state.pickedColor;
        const hex = rgbToHex(r, g, b);

        document.getElementById("pickedSwatch").style.background = hex;
        document.getElementById("pickedHex").textContent = hex;
        document.getElementById("pickedRgb").textContent = "rgb(" + r + ", " + g + ", " + b + ")";
      }

      window.copyPickedColor = function (format) {
        if (!state.pickedColor) return;

        const { r, g, b } = state.pickedColor;
        let value;

        switch (format) {
          case "hex":
            value = rgbToHex(r, g, b);
            break;
          case "rgb":
            value = "rgb(" + r + ", " + g + ", " + b + ")";
            break;
          case "hsl":
            const hsl = rgbToHsl(r, g, b);
            value = "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
            break;
        }

        navigator.clipboard.writeText(value).then(() => {
          alert("已复制: " + value);
        });
      };

      window.exportPalette = function (format) {
        if (state.colors.length === 0) {
          alert("请先上传图片并提取颜色");
          return;
        }

        let content;

        switch (format) {
          case "css":
            content = ":root {\n";
            state.colors.forEach((c, i) => {
              content += "    --color-" + (i + 1) + ": " + rgbToHex(c.r, c.g, c.b) + ";\n";
            });
            content += "}";
            break;
          case "scss":
            content = "";
            state.colors.forEach((c, i) => {
              content += "$color-" + (i + 1) + ": " + rgbToHex(c.r, c.g, c.b) + ";\n";
            });
            break;
          case "json":
            content = JSON.stringify(
              state.colors.map((c) => ({
                hex: rgbToHex(c.r, c.g, c.b),
                rgb: { r: c.r, g: c.g, b: c.b },
                frequency: c.frequency
              })),
              null,
              2
            );
            break;
          case "ase":
            alert("ASE 格式导出暂不支持");
            return;
        }

        navigator.clipboard.writeText(content).then(() => {
          alert(format.toUpperCase() + " 格式已复制到剪贴板！");
        });
      };

      window.downloadPaletteImage = function () {
        if (state.colors.length === 0) {
          alert("请先上传图片并提取颜色");
          return;
        }

        const canvas = document.createElement("canvas");
        const width = 800;
        const height = 200;
        canvas.width = width;
        canvas.height = height;
        const c = canvas.getContext("2d");

        const colorWidth = width / state.colors.length;

        state.colors.forEach((color, i) => {
          c.fillStyle = rgbToHex(color.r, color.g, color.b);
          c.fillRect(i * colorWidth, 0, colorWidth, height * 0.7);

          // Text
          const isLight = getLuminance(color.r, color.g, color.b) > 0.5;
          c.fillStyle = isLight ? "#333" : "#fff";
          c.font = "bold 14px sans-serif";
          c.textAlign = "center";
          c.fillText(
            rgbToHex(color.r, color.g, color.b),
            i * colorWidth + colorWidth / 2,
            height * 0.7 - 10
          );
        });

        // Bottom info bar
        c.fillStyle = "#fff";
        c.fillRect(0, height * 0.7, width, height * 0.3);
        c.fillStyle = "#333";
        c.font = "12px sans-serif";
        c.textAlign = "center";
        c.fillText("调色板提取器 - " + state.colors.length + " 种颜色", width / 2, height * 0.85);

        const link = document.createElement("a");
        link.download = "palette.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Initialize
      renderPalette();
    
