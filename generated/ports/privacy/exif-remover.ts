// @ts-nocheck
// Generated from tools/privacy/exif-remover.html
// Source SHA-256: dbbf6375fe507bcea60b3eb9ff78274bc078e4b84cab50f4ec45f317f28241b7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const themeToggle = document.getElementById("themeToggle");
      const dropZone = document.getElementById("dropZone");
      const fileInput = document.getElementById("fileInput");
      const imageList = document.getElementById("imageList");
      const toolbar = document.getElementById("toolbar");
      const qualityInput = document.getElementById("quality");
      const qualityValue = document.getElementById("qualityValue");
      const totalCountEl = document.getElementById("totalCount");
      const processedCountEl = document.getElementById("processedCount");

      let images = [];

      // 主题切换
      function initTheme() {
        const savedTheme = localStorage.getItem("exif-remover-theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeButton(savedTheme);
      }

      function updateThemeButton(theme) {
        themeToggle.textContent = theme === "dark" ? "浅色模式" : "深色模式";
      }

      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("exif-remover-theme", newTheme);
        updateThemeButton(newTheme);
      });

      // 质量滑块
      qualityInput.addEventListener("input", () => {
        qualityValue.textContent = qualityInput.value + "%";
      });

      // 拖拽处理
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
        fileInput.value = "";
      });

      // 处理文件
      function handleFiles(files) {
        const validFiles = Array.from(files).filter(
          (f) => f.type === "image/jpeg" || f.type === "image/png" || f.type === "image/webp"
        );

        if (validFiles.length === 0) {
          alert("请选择有效的图片文件（JPG、PNG 或 WebP）");
          return;
        }

        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = {
              id: Date.now() + Math.random(),
              name: file.name,
              type: file.type,
              size: file.size,
              originalData: e.target.result,
              cleanData: null,
              hasExif: checkHasExif(e.target.result),
              processed: false
            };
            images.push(img);
            renderImages();
            updateStats();
          };
          reader.readAsDataURL(file);
        });
      }

      // 简单检测是否有 EXIF（检查 JPEG APP1 标记）
      function checkHasExif(dataUrl) {
        // 对于 JPEG，检查是否包含 EXIF 标记
        if (dataUrl.includes("data:image/jpeg")) {
          // 简单检查：大部分带有 EXIF 的图片都会有这些标记
          // 这是一个简化的检测方法
          return true; // 假设 JPEG 都可能有 EXIF
        }
        return false;
      }

      // 渲染图片列表
      function renderImages() {
        if (images.length === 0) {
          imageList.innerHTML =
            '<div class="empty-state"><p>暂无图片，请拖拽或点击上方区域添加</p></div>';
          toolbar.style.display = "none";
          return;
        }

        toolbar.style.display = "flex";
        imageList.innerHTML = images
          .map(
            (img) => `
                <div class="image-card" data-id="${img.id}">
                    <img class="image-preview" src="${img.cleanData || img.originalData}" alt="${img.name}">
                    <div class="image-info">
                        <div class="image-name" title="${img.name}">${img.name}</div>
                        <div class="image-meta">
                            ${formatSize(img.size)} | ${img.type.split("/")[1].toUpperCase()}
                        </div>
                        <span class="exif-status ${img.processed ? "removed" : img.hasExif ? "has-exif" : "no-exif"}">
                            ${img.processed ? "EXIF 已移除" : img.hasExif ? "可能含有 EXIF" : "无 EXIF"}
                        </span>
                        <div class="image-actions">
                            <button class="secondary" onclick="removeExif('${img.id}')">移除 EXIF</button>
                            <button class="outline" onclick="downloadImage('${img.id}')">下载</button>
                            <button class="outline" onclick="removeImage('${img.id}')">删除</button>
                        </div>
                    </div>
                </div>
            `
          )
          .join("");
      }

      // 格式化文件大小
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      // 移除单个图片的 EXIF
      function removeExif(id) {
        const img = images.find((i) => i.id == id);
        if (!img) return;

        const quality = parseInt(qualityInput.value) / 100;

        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0);

          // 根据原始类型输出
          let outputType = img.type;
          let outputQuality = quality;

          // PNG 不支持质量参数
          if (outputType === "image/png") {
            img.cleanData = canvas.toDataURL("image/png");
          } else {
            img.cleanData = canvas.toDataURL(outputType, outputQuality);
          }

          img.processed = true;
          img.hasExif = false;

          // 更新大小
          const base64Length = img.cleanData.split(",")[1].length;
          img.cleanSize = Math.round((base64Length * 3) / 4);

          renderImages();
          updateStats();
        };
        image.src = img.originalData;
      }

      // 移除所有 EXIF
      window.removeAllExif = function () {
        images.forEach((img) => {
          if (!img.processed) {
            removeExif(img.id);
          }
        });
      };

      // 下载单个图片
      window.downloadImage = function (id) {
        const img = images.find((i) => i.id == id);
        if (!img) return;

        const data = img.cleanData || img.originalData;
        const a = document.createElement("a");
        a.href = data;

        // 生成新文件名
        const nameParts = img.name.split(".");
        const ext = nameParts.pop();
        const baseName = nameParts.join(".");
        a.download = img.processed ? `${baseName}_no_exif.${ext}` : img.name;

        a.click();
      };

      // 下载所有图片
      window.downloadAll = function () {
        images.forEach((img, index) => {
          setTimeout(() => {
            downloadImage(img.id);
          }, index * 200);
        });
      };

      // 删除单个图片
      window.removeImage = function (id) {
        images = images.filter((i) => i.id != id);
        renderImages();
        updateStats();
      };

      // 清空所有
      window.clearAll = function () {
        if (images.length === 0) return;
        if (confirm("确定要清空所有图片吗？")) {
          images = [];
          renderImages();
          updateStats();
        }
      };

      // 更新统计
      function updateStats() {
        totalCountEl.textContent = images.length;
        processedCountEl.textContent = images.filter((i) => i.processed).length;
      }

      // 初始化
      initTheme();

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
    
