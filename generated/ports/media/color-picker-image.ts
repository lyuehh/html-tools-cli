// @ts-nocheck
// Generated from tools/media/color-picker-image.html
// Source SHA-256: c565ba2242400a1135faea0b4202dcb434cb258ea3dfbce0fa353eada4e0a7b5
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

      // Initialize theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme(true);
      }

      // Canvas and image handling
      const canvas = document.getElementById("imageCanvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const fileInput = document.getElementById("fileInput");
      const dropZone = document.getElementById("dropZone");
      const placeholder = document.getElementById("placeholder");
      const zoomControls = document.getElementById("zoomControls");
      const magnifier = document.getElementById("magnifier");
      const magnifierCanvas = document.getElementById("magnifierCanvas");
      const magnifierCtx = magnifierCanvas.getContext("2d");

      let originalImage = null;
      let scale = 1;
      let colorHistory = JSON.parse(localStorage.getItem("colorHistory") || "[]");

      // File input
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) loadImage(e.target.files[0]);
      });

      // Drag and drop
      dropZone.addEventListener("click", () => fileInput.click());
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
      });
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
            scale = 1;
            drawImage();
            canvas.style.display = "block";
            placeholder.style.display = "none";
            zoomControls.style.display = "flex";
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      function drawImage() {
        if (!originalImage) return;
        const maxWidth = document.getElementById("canvasContainer").clientWidth - 20;
        const maxHeight = 600;

        let width = originalImage.width * scale;
        let height = originalImage.height * scale;

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
        ctx.drawImage(originalImage, 0, 0, width, height);
      }

      window.zoomCanvas = function (factor, reset = false) {
        if (reset) {
          scale = 1;
        } else {
          scale *= factor;
          scale = Math.max(0.1, Math.min(5, scale));
        }
        drawImage();
      };

      // Color picking
      canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
        const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const color = {
          r: pixel[0],
          g: pixel[1],
          b: pixel[2]
        };

        updateColorDisplay(color);
        addToHistory(color);
      });

      // Magnifier
      canvas.addEventListener("mousemove", (e) => {
        if (!document.getElementById("magnifierToggle").checked) {
          magnifier.style.display = "none";
          return;
        }

        magnifier.style.display = "block";
        magnifier.style.left = e.clientX + 20 + "px";
        magnifier.style.top = e.clientY - 75 + "px";

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
        const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));

        // Draw magnified area
        const zoomFactor = 8;
        const sourceSize = Math.floor(150 / zoomFactor);

        magnifierCtx.imageSmoothingEnabled = false;
        magnifierCtx.clearRect(0, 0, 150, 150);
        magnifierCtx.drawImage(
          canvas,
          x - sourceSize / 2,
          y - sourceSize / 2,
          sourceSize,
          sourceSize,
          0,
          0,
          150,
          150
        );
      });

      canvas.addEventListener("mouseleave", () => {
        magnifier.style.display = "none";
      });

      function updateColorDisplay(color) {
        const hex = rgbToHex(color.r, color.g, color.b);
        const hsl = rgbToHsl(color.r, color.g, color.b);

        document.getElementById("colorBox").style.background = hex;
        document.getElementById("hexValue").value = hex;
        document.getElementById("rgbValue").value =
          "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
        document.getElementById("hslValue").value =
          "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
      }

      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
        );
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

        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }

      window.copyColor = function (type) {
        const input = document.getElementById(type + "Value");
        navigator.clipboard.writeText(input.value).then(() => {
          const btn = input.nextElementSibling;
          const original = btn.textContent;
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = original), 1000);
        });
      };

      function addToHistory(color) {
        const hex = rgbToHex(color.r, color.g, color.b);
        // Remove duplicate
        colorHistory = colorHistory.filter((c) => c !== hex);
        colorHistory.unshift(hex);
        // Keep only last 20 colors
        colorHistory = colorHistory.slice(0, 20);
        localStorage.setItem("colorHistory", JSON.stringify(colorHistory));
        renderHistory();
      }

      function renderHistory() {
        const container = document.getElementById("colorHistory");
        container.replaceChildren();
        colorHistory.forEach((hex) => {
          const div = document.createElement("div");
          div.className = "history-color";
          div.style.background = hex;
          div.title = hex;
          div.addEventListener("click", () => selectHistoryColor(hex));
          container.appendChild(div);
        });
      }

      window.selectHistoryColor = function (hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        updateColorDisplay({ r, g, b });
      };

      window.clearHistory = function () {
        colorHistory = [];
        localStorage.removeItem("colorHistory");
        renderHistory();
      };

      // Initialize
      renderHistory();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
