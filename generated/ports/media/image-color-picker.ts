// @ts-nocheck
// Generated from tools/media/image-color-picker.html
// Source SHA-256: 5dea4c65001a177bfb8b346ef1e06cb068ad6a30470b2525092de776b16db5f1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;

      window.toggleTheme = function () {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        themeToggle.textContent = newTheme === "light" ? "🌙 暗色模式" : "☀️ 亮色模式";
        localStorage.setItem("theme", newTheme);
      };

      themeToggle.addEventListener("click", toggleTheme);

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
        themeToggle.textContent = savedTheme === "light" ? "🌙 暗色模式" : "☀️ 亮色模式";
      }

      // 状态
      const canvas = document.getElementById("mainCanvas");
      const ctx = canvas.getContext("2d");
      const magnifier = document.getElementById("magnifier");
      const magnifierCanvas = document.getElementById("magnifierCanvas");
      const magnifierCtx = magnifierCanvas.getContext("2d");

      let imageLoaded = false;
      let colorHistory = JSON.parse(localStorage.getItem("colorHistory") || "[]");
      let currentColor = { r: 255, g: 255, b: 255 };
      let palette = [];

      // 初始化放大镜画布
      magnifierCanvas.width = 120;
      magnifierCanvas.height = 120;

      // 渲染历史
      renderHistory();

      // 文件上传
      const dropZone = document.getElementById("dropZone");
      const fileInput = document.getElementById("fileInput");

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
        if (e.dataTransfer.files[0]) {
          loadImage(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) {
          loadImage(e.target.files[0]);
        }
      });

      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const maxWidth = 800;
            const scale = img.width > maxWidth ? maxWidth / img.width : 1;
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            document.getElementById("placeholder").style.display = "none";
            document.getElementById("canvasContainer").style.display = "inline-block";

            imageLoaded = true;
            document.getElementById("extractPaletteBtn").disabled = false;
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // 画布事件
      canvas.addEventListener("mousemove", (e) => {
        if (!imageLoaded) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        // 获取颜色
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        updateCurrentColor(pixel[0], pixel[1], pixel[2]);

        // 显示放大镜
        magnifier.style.display = "block";
        magnifier.style.left = e.clientX - rect.left - 60 + "px";
        magnifier.style.top = e.clientY - rect.top - 130 + "px";

        // 绘制放大镜内容
        const zoom = 8;
        const size = 15;
        magnifierCtx.imageSmoothingEnabled = false;
        magnifierCtx.drawImage(canvas, x - size / 2, y - size / 2, size, size, 0, 0, 120, 120);
      });

      canvas.addEventListener("mouseleave", () => {
        magnifier.style.display = "none";
      });

      canvas.addEventListener("click", (e) => {
        if (!imageLoaded) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        const pixel = ctx.getImageData(x, y, 1, 1).data;
        addToHistory(pixel[0], pixel[1], pixel[2]);
      });

      function updateCurrentColor(r, g, b) {
        currentColor = { r, g, b };

        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);

        document.getElementById("colorSwatch").style.background = hex;
        document.getElementById("hexValue").textContent = hex;
        document.getElementById("rgbValue").textContent = `rgb(${r}, ${g}, ${b})`;
        document.getElementById("hslValue").textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }

      function addToHistory(r, g, b) {
        const hex = rgbToHex(r, g, b);

        // 避免重复
        if (!colorHistory.includes(hex)) {
          colorHistory.unshift(hex);
          if (colorHistory.length > 20) {
            colorHistory.pop();
          }
          localStorage.setItem("colorHistory", JSON.stringify(colorHistory));
          renderHistory();
        }
      }

      function renderHistory() {
        const list = document.getElementById("historyList");
        list.textContent = "";

        colorHistory.forEach((hex) => {
          const item = document.createElement("div");
          item.className = "history-item";
          item.style.background = hex;
          item.title = hex;
          item.addEventListener("click", () => {
            const rgb = hexToRgb(hex);
            updateCurrentColor(rgb.r, rgb.g, rgb.b);
          });
          list.appendChild(item);
        });
      }

      // 清空历史
      document.getElementById("clearHistoryBtn").addEventListener("click", () => {
        colorHistory = [];
        localStorage.setItem("colorHistory", "[]");
        renderHistory();
      });

      // 复制颜色
      window.copyColor = function (type) {
        let text = "";
        const { r, g, b } = currentColor;

        switch (type) {
          case "hex":
            text = rgbToHex(r, g, b);
            break;
          case "rgb":
            text = `rgb(${r}, ${g}, ${b})`;
            break;
          case "hsl":
            const hsl = rgbToHsl(r, g, b);
            text = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            break;
        }

        navigator.clipboard.writeText(text).then(() => {
          alert("已复制: " + text);
        });
      };

      // 颜色转换函数
      function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
      }

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

      // 提取主色调
      document.getElementById("extractPaletteBtn").addEventListener("click", () => {
        if (!imageLoaded) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        palette = extractPalette(imageData.data, 10);
        renderPalette();
        document.getElementById("exportPaletteBtn").disabled = false;
      });

      function extractPalette(data, colorCount) {
        // 简单的颜色量化算法
        const colors = {};
        const step = 4; // 采样步长

        for (let i = 0; i < data.length; i += 4 * step) {
          const r = Math.round(data[i] / 32) * 32;
          const g = Math.round(data[i + 1] / 32) * 32;
          const b = Math.round(data[i + 2] / 32) * 32;
          const key = `${r},${g},${b}`;
          colors[key] = (colors[key] || 0) + 1;
        }

        // 排序并取前 N 个
        const sorted = Object.entries(colors)
          .sort((a, b) => b[1] - a[1])
          .slice(0, colorCount)
          .map(([key]) => {
            const [r, g, b] = key.split(",").map(Number);
            return { r, g, b, hex: rgbToHex(r, g, b) };
          });

        return sorted;
      }

      function renderPalette() {
        const grid = document.getElementById("paletteGrid");
        grid.textContent = "";

        palette.forEach((color) => {
          const item = document.createElement("div");
          item.className = "palette-color";
          item.style.background = color.hex;
          item.title = color.hex;

          const label = document.createElement("span");
          label.textContent = color.hex;
          item.appendChild(label);

          item.addEventListener("click", () => {
            updateCurrentColor(color.r, color.g, color.b);
            addToHistory(color.r, color.g, color.b);
          });

          grid.appendChild(item);
        });
      }

      // 导出调色板
      document.getElementById("exportPaletteBtn").addEventListener("click", () => {
        if (palette.length === 0) return;

        // 生成调色板图片
        const paletteCanvas = document.createElement("canvas");
        const pctx = paletteCanvas.getContext("2d");
        const size = 100;
        paletteCanvas.width = size * Math.min(palette.length, 5);
        paletteCanvas.height = size * Math.ceil(palette.length / 5);

        palette.forEach((color, i) => {
          const x = (i % 5) * size;
          const y = Math.floor(i / 5) * size;
          pctx.fillStyle = color.hex;
          pctx.fillRect(x, y, size, size);

          // 添加文字
          pctx.fillStyle = color.r + color.g + color.b > 384 ? "#000" : "#fff";
          pctx.font = "12px monospace";
          pctx.textAlign = "center";
          pctx.fillText(color.hex, x + size / 2, y + size / 2 + 4);
        });

        const link = document.createElement("a");
        link.download = `palette-${Date.now()}.png`;
        link.href = paletteCanvas.toDataURL("image/png");
        link.click();
      });
    
