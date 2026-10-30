// @ts-nocheck
// Generated from tools/privacy/metadata-viewer.html
// Source SHA-256: 2cd68f2008808b691dce4c4663141739b6a8cb0b494b2c32537d377f2c7c6ad4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const themeToggle = document.getElementById("themeToggle");
      const dropZone = document.getElementById("dropZone");
      const fileInput = document.getElementById("fileInput");
      const resultArea = document.getElementById("resultArea");
      const privacyWarning = document.getElementById("privacyWarning");
      const filePreviewEl = document.getElementById("filePreview");
      const basicInfoEl = document.getElementById("basicInfo");
      const categoryTabsEl = document.getElementById("categoryTabs");
      const metadataContentEl = document.getElementById("metadataContent");
      const metadataCountEl = document.getElementById("metadataCount");
      const jsonViewEl = document.getElementById("jsonView");

      let currentMetadata = null;
      let currentCategory = "all";

      // 文件类型图标映射
      const fileIcons = {
        image: "🖼️",
        video: "🎬",
        audio: "🎵",
        "application/pdf": "📄",
        "application/msword": "📝",
        "application/vnd.openxmlformats-officedocument": "📝",
        text: "📃",
        "application/zip": "📦",
        "application/x-rar": "📦",
        default: "📁"
      };

      // 主题切换
      function initTheme() {
        const savedTheme = localStorage.getItem("metadata-viewer-theme") || "light";
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
        localStorage.setItem("metadata-viewer-theme", newTheme);
        updateThemeButton(newTheme);
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
        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          handleFile(e.target.files[0]);
        }
        fileInput.value = "";
      });

      // 处理文件
      function handleFile(file) {
        const metadata = {
          basic: {
            name: file.name,
            size: file.size,
            type: file.type || "unknown",
            lastModified: new Date(file.lastModified)
          },
          file: {},
          image: {},
          exif: {},
          other: {}
        };

        // 文件扩展名
        const ext = file.name.split(".").pop().toLowerCase();
        metadata.file.extension = ext;

        // 判断文件类型类别
        const typeCategory = file.type.split("/")[0];

        // 处理图片
        if (typeCategory === "image") {
          const reader = new FileReader();
          reader.onload = (e) => {
            // 显示预览
            filePreviewEl.innerHTML = `<img class="preview-image" src="${e.target.result}" alt="Preview">`;

            // 获取图片尺寸
            const img = new Image();
            img.onload = () => {
              metadata.image.width = img.naturalWidth;
              metadata.image.height = img.naturalHeight;
              metadata.image.aspectRatio = (img.naturalWidth / img.naturalHeight).toFixed(2);

              // 尝试读取 EXIF
              readImageExif(e.target.result, metadata);
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          // 非图片文件显示图标
          const icon = getFileIcon(file.type);
          filePreviewEl.innerHTML = `<div class="preview-icon">${icon}</div>`;
          displayMetadata(metadata);
        }
      }

      // 获取文件图标
      function getFileIcon(mimeType) {
        if (!mimeType) return fileIcons.default;

        const category = mimeType.split("/")[0];
        if (fileIcons[mimeType]) return fileIcons[mimeType];
        if (fileIcons[category]) return fileIcons[category];

        for (const key in fileIcons) {
          if (mimeType.startsWith(key)) return fileIcons[key];
        }

        return fileIcons.default;
      }

      // 读取图片 EXIF（简化版，使用 canvas 方式）
      function readImageExif(dataUrl, metadata) {
        // 简化的 EXIF 读取 - 只能获取基本信息
        // 完整的 EXIF 读取需要专门的库如 exif-js

        // 检查是否为 JPEG
        if (dataUrl.includes("data:image/jpeg")) {
          metadata.exif.format = "JPEG";
          metadata.exif.note = "完整 EXIF 读取需要专门的解析库";
        } else if (dataUrl.includes("data:image/png")) {
          metadata.file.format = "PNG";
          metadata.file.note = "PNG 格式通常不包含 EXIF 信息";
        }

        displayMetadata(metadata);
      }

      // 显示元数据
      function displayMetadata(metadata) {
        currentMetadata = metadata;
        resultArea.classList.remove("hidden");

        // 基本信息
        basicInfoEl.innerHTML = `
                <div class="info-item">
                    <div class="info-label">文件名</div>
                    <div class="info-value">${metadata.basic.name}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">文件大小</div>
                    <div class="info-value">${formatSize(metadata.basic.size)}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">MIME 类型</div>
                    <div class="info-value">${metadata.basic.type}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">修改时间</div>
                    <div class="info-value">${formatDate(metadata.basic.lastModified)}</div>
                </div>
                ${
                  metadata.image.width
                    ? `
                <div class="info-item">
                    <div class="info-label">图片尺寸</div>
                    <div class="info-value">${metadata.image.width} × ${metadata.image.height} px</div>
                </div>
                <div class="info-item">
                    <div class="info-label">宽高比</div>
                    <div class="info-value">${metadata.image.aspectRatio}</div>
                </div>
                `
                    : ""
                }
            `;

        // 构建分类数据
        const categories = {
          all: { label: "全部", data: {} },
          file: { label: "文件信息", data: metadata.file },
          image: { label: "图片信息", data: metadata.image },
          exif: { label: "EXIF 数据", data: metadata.exif }
        };

        // 合并所有数据到 all
        Object.assign(categories.all.data, metadata.file, metadata.image, metadata.exif);

        // 渲染分类标签
        const tabs = Object.entries(categories)
          .filter(([key, cat]) => Object.keys(cat.data).length > 0 || key === "all")
          .map(
            ([key, cat]) => `
                    <button class="category-tab ${key === currentCategory ? "active" : ""}" 
                            onclick="switchCategory('${key}')" aria-label="${cat.label}">${cat.label}</button>
                `
          )
          .join("");
        categoryTabsEl.innerHTML = tabs;

        // 渲染元数据表格
        renderMetadataTable(categories[currentCategory].data);

        // 更新计数
        const totalCount = Object.keys(categories.all.data).length;
        metadataCountEl.textContent = `${totalCount} 项`;

        // JSON 视图
        jsonViewEl.textContent = JSON.stringify(metadata, null, 2);

        // 隐私警告（如果有 GPS 数据）
        const hasGps = metadata.exif && (metadata.exif.GPSLatitude || metadata.exif.gps);
        privacyWarning.classList.toggle("hidden", !hasGps);
      }

      // 切换分类
      window.switchCategory = function (category) {
        currentCategory = category;
        if (currentMetadata) {
          displayMetadata(currentMetadata);
        }
      };

      // 渲染元数据表格
      function renderMetadataTable(data) {
        const entries = Object.entries(data).filter(
          ([k, v]) => v !== undefined && v !== null && v !== ""
        );

        if (entries.length === 0) {
          metadataContentEl.innerHTML = '<div class="empty-state">暂无数据</div>';
          return;
        }

        const rows = entries
          .map(([key, value]) => {
            let displayValue = value;
            if (typeof value === "object") {
              displayValue = JSON.stringify(value);
            }
            return `
                    <tr>
                        <th>${formatKey(key)}</th>
                        <td>${displayValue}</td>
                    </tr>
                `;
          })
          .join("");

        metadataContentEl.innerHTML = `
                <table class="metadata-table">
                    ${rows}
                </table>
            `;
      }

      // 格式化键名
      function formatKey(key) {
        return key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/_/g, " ");
      }

      // 格式化文件大小
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
      }

      // 格式化日期
      function formatDate(date) {
        return date.toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
      }

      // 复制 JSON
      window.copyJson = function () {
        if (!currentMetadata) return;
        navigator.clipboard.writeText(JSON.stringify(currentMetadata, null, 2)).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      // 下载 JSON
      window.downloadJson = function () {
        if (!currentMetadata) return;
        const content = JSON.stringify(currentMetadata, null, 2);
        const blob = new Blob([content], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${currentMetadata.basic.name}_metadata.json`;
        a.click();
        URL.revokeObjectURL(url);
      };

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
    
