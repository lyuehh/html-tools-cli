// @ts-nocheck
// Generated from tools/media/image-stitcher.html
// Source SHA-256: 2186d02b64aab7a5ec506dfddc9a556627600965a47e090f86693b3fd2b3b71f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 图片数据
      let images = [];
      let canvas = null;
      let draggedItem = null;

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        initDropZone();
      });

      // 主题切换
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        }
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      // 初始化拖放区域
      function initDropZone() {
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
          handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener("change", (e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        });
      }

      // 处理文件
      function handleFiles(files) {
        Array.from(files).forEach((file) => {
          if (!file.type.startsWith("image/")) return;

          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              images.push({
                id: Date.now() + Math.random(),
                name: file.name,
                width: img.width,
                height: img.height,
                size: file.size,
                element: img,
                dataUrl: e.target.result
              });
              renderImageList();
              updatePreview();
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }

      // 渲染图片列表
      function renderImageList() {
        const list = document.getElementById("imageList");
        list.innerHTML = images
          .map(
            (img, index) => `
                <div class="image-item" draggable="true" data-index="${index}">
                    <img src="${img.dataUrl}" alt="${img.name}">
                    <div class="info">
                        <div class="name">${img.name}</div>
                        <div class="size">${img.width}×${img.height} · ${formatSize(img.size)}</div>
                    </div>
                    <button class="remove" onclick="removeImage(${index})">×</button>
                </div>
            `
          )
          .join("");

        // 添加拖拽排序
        list.querySelectorAll(".image-item").forEach((item) => {
          item.addEventListener("dragstart", handleDragStart);
          item.addEventListener("dragover", handleDragOver);
          item.addEventListener("drop", handleDrop);
          item.addEventListener("dragend", handleDragEnd);
        });
      }

      // 拖拽排序处理
      function handleDragStart(e) {
        draggedItem = this;
        this.classList.add("dragging");
      }

      function handleDragOver(e) {
        e.preventDefault();
      }

      function handleDrop(e) {
        e.preventDefault();
        if (this !== draggedItem) {
          const fromIndex = parseInt(draggedItem.dataset.index);
          const toIndex = parseInt(this.dataset.index);
          const [moved] = images.splice(fromIndex, 1);
          images.splice(toIndex, 0, moved);
          renderImageList();
          updatePreview();
        }
      }

      function handleDragEnd() {
        this.classList.remove("dragging");
        draggedItem = null;
      }

      // 删除图片
      window.removeImage = function (index) {
        images.splice(index, 1);
        renderImageList();
        updatePreview();
      };

      // 清空全部
      window.clearAll = function () {
        images = [];
        renderImageList();
        document.getElementById("previewArea").innerHTML = `
                <div class="preview-placeholder">
                    <div class="icon">🖼️</div>
                    <p>添加图片后预览拼接效果</p>
                </div>
            `;
        document.getElementById("stats").style.display = "none";
      };

      // 更新预览
      window.updatePreview = function () {
        if (images.length === 0) {
          clearAll();
          return;
        }

        const direction = document.querySelector('input[name="direction"]:checked').value;
        const spacing = parseInt(document.getElementById("spacing").value);
        const bgColor = document.getElementById("bgColor").value;
        const transparent = document.getElementById("transparent").checked;
        const resize = document.querySelector('input[name="resize"]:checked').value;
        const gridCols = parseInt(document.getElementById("gridCols").value);

        // 显示/隐藏网格选项
        document.getElementById("gridOptions").style.display =
          direction === "grid" ? "block" : "none";

        // 计算统一尺寸
        let targetWidth, targetHeight;
        if (resize === "width") {
          targetWidth = Math.min(...images.map((img) => img.width));
        } else if (resize === "height") {
          targetHeight = Math.min(...images.map((img) => img.height));
        }

        // 计算每张图片的绘制尺寸
        const drawSizes = images.map((img) => {
          let w = img.width;
          let h = img.height;
          if (resize === "width" && targetWidth) {
            h = (h / w) * targetWidth;
            w = targetWidth;
          } else if (resize === "height" && targetHeight) {
            w = (w / h) * targetHeight;
            h = targetHeight;
          }
          return { width: Math.round(w), height: Math.round(h) };
        });

        // 计算画布尺寸
        let canvasWidth, canvasHeight;

        if (direction === "horizontal") {
          canvasWidth =
            drawSizes.reduce((sum, s) => sum + s.width, 0) + spacing * (images.length - 1);
          canvasHeight = Math.max(...drawSizes.map((s) => s.height));
        } else if (direction === "vertical") {
          canvasWidth = Math.max(...drawSizes.map((s) => s.width));
          canvasHeight =
            drawSizes.reduce((sum, s) => sum + s.height, 0) + spacing * (images.length - 1);
        } else {
          // 网格布局
          const rows = Math.ceil(images.length / gridCols);
          const maxWidthPerCol = [];
          const maxHeightPerRow = [];

          for (let i = 0; i < images.length; i++) {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            maxWidthPerCol[col] = Math.max(maxWidthPerCol[col] || 0, drawSizes[i].width);
            maxHeightPerRow[row] = Math.max(maxHeightPerRow[row] || 0, drawSizes[i].height);
          }

          canvasWidth = maxWidthPerCol.reduce((a, b) => a + b, 0) + spacing * (gridCols - 1);
          canvasHeight = maxHeightPerRow.reduce((a, b) => a + b, 0) + spacing * (rows - 1);
        }

        // 创建画布
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");

        // 填充背景
        if (!transparent) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        // 绘制图片
        let x = 0,
          y = 0;

        if (direction === "horizontal") {
          images.forEach((img, i) => {
            const yOffset = Math.floor((canvasHeight - drawSizes[i].height) / 2);
            ctx.drawImage(img.element, x, yOffset, drawSizes[i].width, drawSizes[i].height);
            x += drawSizes[i].width + spacing;
          });
        } else if (direction === "vertical") {
          images.forEach((img, i) => {
            const xOffset = Math.floor((canvasWidth - drawSizes[i].width) / 2);
            ctx.drawImage(img.element, xOffset, y, drawSizes[i].width, drawSizes[i].height);
            y += drawSizes[i].height + spacing;
          });
        } else {
          // 网格布局
          const rows = Math.ceil(images.length / gridCols);
          const maxWidthPerCol = [];
          const maxHeightPerRow = [];

          for (let i = 0; i < images.length; i++) {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            maxWidthPerCol[col] = Math.max(maxWidthPerCol[col] || 0, drawSizes[i].width);
            maxHeightPerRow[row] = Math.max(maxHeightPerRow[row] || 0, drawSizes[i].height);
          }

          images.forEach((img, i) => {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);

            let posX = 0;
            for (let c = 0; c < col; c++) {
              posX += maxWidthPerCol[c] + spacing;
            }
            posX += Math.floor((maxWidthPerCol[col] - drawSizes[i].width) / 2);

            let posY = 0;
            for (let r = 0; r < row; r++) {
              posY += maxHeightPerRow[r] + spacing;
            }
            posY += Math.floor((maxHeightPerRow[row] - drawSizes[i].height) / 2);

            ctx.drawImage(img.element, posX, posY, drawSizes[i].width, drawSizes[i].height);
          });
        }

        // 显示预览
        const previewArea = document.getElementById("previewArea");
        previewArea.innerHTML = "";
        previewArea.appendChild(canvas);

        // 更新统计
        document.getElementById("stats").style.display = "grid";
        document.getElementById("statCount").textContent = images.length;
        document.getElementById("statSize").textContent = `${canvasWidth} × ${canvasHeight}`;

        // 预估文件大小
        const format = document.getElementById("outputFormat").value;
        const quality = parseInt(document.getElementById("quality").value) / 100;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              document.getElementById("statFileSize").textContent = formatSize(blob.size);
            }
          },
          `image/${format}`,
          quality
        );
      };

      // 下载图片
      window.downloadImage = function () {
        if (!canvas) {
          showToast("请先添加图片");
          return;
        }

        const format = document.getElementById("outputFormat").value;
        const quality = parseInt(document.getElementById("quality").value) / 100;
        const transparent = document.getElementById("transparent").checked;

        let mimeType = `image/${format}`;
        if (transparent && format === "jpeg") {
          mimeType = "image/png";
        }

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `stitched-image.${format === "jpeg" ? "jpg" : format}`;
            a.click();
            URL.revokeObjectURL(url);
            showToast("图片已下载");
          },
          mimeType,
          quality
        );
      };

      // 复制到剪贴板
      window.copyToClipboard = async function () {
        if (!canvas) {
          showToast("请先添加图片");
          return;
        }

        try {
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showToast("已复制到剪贴板");
        } catch (err) {
          showToast("复制失败: " + err.message);
        }
      };

      // 格式化文件大小
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      // Toast 提示
      function showToast(message) {
        const existing = document.querySelector(".toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 2500);
      }

      // 监听格式变化
      document.getElementById("outputFormat").addEventListener("change", function () {
        document.getElementById("qualityGroup").style.display =
          this.value === "png" ? "none" : "block";
      });
    
