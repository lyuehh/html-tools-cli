// @ts-nocheck
// Generated from tools/dev/color-blindness.html
// Source SHA-256: 75f0e06acfcfa466eabb01800b9a7568a8e43e2e70e30a07aeb1e84df8caf52b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const fgColorInput = document.getElementById("fgColor");
      const bgColorInput = document.getElementById("bgColor");
      const fgHexInput = document.getElementById("fgHex");
      const bgHexInput = document.getElementById("bgHex");
      const uploadArea = document.getElementById("uploadArea");
      const imageInput = document.getElementById("imageInput");
      const simGrid = document.getElementById("simGrid");

      let currentImage = null;

      // Color blindness simulation matrices
      const colorBlindnessTypes = [
        {
          name: "正常视觉",
          type: "normal",
          percentage: "92%",
          matrix: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
          ]
        },
        {
          name: "红色盲 (Protanopia)",
          type: "protanopia",
          percentage: "~1%",
          matrix: [
            [0.567, 0.433, 0],
            [0.558, 0.442, 0],
            [0, 0.242, 0.758]
          ]
        },
        {
          name: "绿色盲 (Deuteranopia)",
          type: "deuteranopia",
          percentage: "~6%",
          matrix: [
            [0.625, 0.375, 0],
            [0.7, 0.3, 0],
            [0, 0.3, 0.7]
          ]
        },
        {
          name: "蓝色盲 (Tritanopia)",
          type: "tritanopia",
          percentage: "~0.01%",
          matrix: [
            [0.95, 0.05, 0],
            [0, 0.433, 0.567],
            [0, 0.475, 0.525]
          ]
        },
        {
          name: "红色弱 (Protanomaly)",
          type: "protanomaly",
          percentage: "~1%",
          matrix: [
            [0.817, 0.183, 0],
            [0.333, 0.667, 0],
            [0, 0.125, 0.875]
          ]
        },
        {
          name: "绿色弱 (Deuteranomaly)",
          type: "deuteranomaly",
          percentage: "~5%",
          matrix: [
            [0.8, 0.2, 0],
            [0.258, 0.742, 0],
            [0, 0.142, 0.858]
          ]
        },
        {
          name: "全色盲 (Achromatopsia)",
          type: "achromatopsia",
          percentage: "~0.003%",
          matrix: [
            [0.299, 0.587, 0.114],
            [0.299, 0.587, 0.114],
            [0.299, 0.587, 0.114]
          ]
        }
      ];

      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null;
      }

      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map(function (x) {
              const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        );
      }

      function applyColorBlindness(rgb, matrix) {
        const r = rgb.r * matrix[0][0] + rgb.g * matrix[0][1] + rgb.b * matrix[0][2];
        const g = rgb.r * matrix[1][0] + rgb.g * matrix[1][1] + rgb.b * matrix[1][2];
        const b = rgb.r * matrix[2][0] + rgb.g * matrix[2][1] + rgb.b * matrix[2][2];
        return { r: r, g: g, b: b };
      }

      function getContrastColor(hex) {
        const rgb = hexToRgb(hex);
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        return luminance > 0.5 ? "#000000" : "#ffffff";
      }

      function renderSimulations() {
        const fgRgb = hexToRgb(fgColorInput.value);
        const bgRgb = hexToRgb(bgColorInput.value);

        let html = "";

        colorBlindnessTypes.forEach(function (type) {
          const simFg = applyColorBlindness(fgRgb, type.matrix);
          const simBg = applyColorBlindness(bgRgb, type.matrix);
          const fgHex = rgbToHex(simFg.r, simFg.g, simFg.b);
          const bgHex = rgbToHex(simBg.r, simBg.g, simBg.b);

          html +=
            '<div class="sim-card">' +
            '<div class="sim-header">' +
            "<h4>" +
            type.name +
            "</h4>" +
            '<span class="percentage">人群占比: ' +
            type.percentage +
            "</span>" +
            "</div>";

          if (currentImage) {
            html += '<canvas class="image-preview" data-type="' + type.type + '"></canvas>';
          } else {
            html +=
              '<div class="sim-preview">' +
              '<div class="color-half" style="background: ' +
              fgHex +
              "; color: " +
              getContrastColor(fgHex) +
              ';">前景<br>' +
              fgHex +
              "</div>" +
              '<div class="color-half" style="background: ' +
              bgHex +
              "; color: " +
              getContrastColor(bgHex) +
              ';">背景<br>' +
              bgHex +
              "</div>" +
              "</div>";
          }

          html += "</div>";
        });

        simGrid.innerHTML = html;

        if (currentImage) {
          renderImageSimulations();
        }
      }

      function renderImageSimulations() {
        colorBlindnessTypes.forEach(function (type) {
          const canvas = document.querySelector('canvas[data-type="' + type.type + '"]');
          if (!canvas) return;

          const ctx = canvas.getContext("2d");

          // Set canvas size
          const maxWidth = canvas.parentElement.clientWidth;
          const scale = Math.min(1, maxWidth / currentImage.width);
          canvas.width = currentImage.width * scale;
          canvas.height = currentImage.height * scale;

          // Draw original image
          ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

          // Apply color blindness filter
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const rgb = { r: data[i], g: data[i + 1], b: data[i + 2] };
            const result = applyColorBlindness(rgb, type.matrix);
            data[i] = Math.round(result.r);
            data[i + 1] = Math.round(result.g);
            data[i + 2] = Math.round(result.b);
          }

          ctx.putImageData(imageData, 0, 0);
        });
      }

      // Event listeners
      fgColorInput.addEventListener("input", function () {
        fgHexInput.value = fgColorInput.value;
        renderSimulations();
      });

      bgColorInput.addEventListener("input", function () {
        bgHexInput.value = bgColorInput.value;
        renderSimulations();
      });

      fgHexInput.addEventListener("input", function () {
        if (/^#[0-9A-Fa-f]{6}$/.test(fgHexInput.value)) {
          fgColorInput.value = fgHexInput.value;
          renderSimulations();
        }
      });

      bgHexInput.addEventListener("input", function () {
        if (/^#[0-9A-Fa-f]{6}$/.test(bgHexInput.value)) {
          bgColorInput.value = bgHexInput.value;
          renderSimulations();
        }
      });

      // Image upload
      uploadArea.addEventListener("click", function () {
        imageInput.click();
      });

      uploadArea.addEventListener("dragover", function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = "var(--accent-cyan)";
      });

      uploadArea.addEventListener("dragleave", function () {
        uploadArea.style.borderColor = "";
      });

      uploadArea.addEventListener("drop", function (e) {
        e.preventDefault();
        uploadArea.style.borderColor = "";
        const file = e.dataTransfer.files[0];
        if (file) loadImage(file);
      });

      imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];
        if (file) loadImage(file);
      });

      window.loadImage = function (file) {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            currentImage = img;
            uploadArea.innerHTML =
              '<span>✅ 已加载图片 (点击更换)</span><input type="file" id="imageInput" accept="image/*" />';
            document.getElementById("imageInput").addEventListener("change", function () {
              const file = this.files[0];
              if (file) loadImage(file);
            });
            renderSimulations();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();

      // Initialize
      renderSimulations();
    
