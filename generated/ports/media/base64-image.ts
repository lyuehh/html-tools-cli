// @ts-nocheck
// Generated from tools/media/base64-image.html
// Source SHA-256: 3e0d6206382a06821ec836b5afcde6d19abf4d971e6ae89d9ca74ebaeaa8fa74
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Tab switching
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(btn.dataset.tab + "Tab").classList.add("active");
        });
      });

      // === ENCODE ===
      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const encodeResult = document.getElementById("encodeResult");
      const encodePreview = document.getElementById("encodePreview");
      const encodeOutput = document.getElementById("encodeOutput");
      const encodeInfo = document.getElementById("encodeInfo");
      const includePrefix = document.getElementById("includePrefix");

      let currentBase64 = "";
      let currentMimeType = "";

      uploadArea.addEventListener("click", () => fileInput.click());
      uploadArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadArea.classList.add("dragover");
      });
      uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("dragover"));
      uploadArea.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadArea.classList.remove("dragover");
        if (e.dataTransfer.files[0]) encodeImage(e.dataTransfer.files[0]);
      });
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) encodeImage(e.target.files[0]);
      });

      function encodeImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          currentBase64 = e.target.result;
          currentMimeType = file.type;

          encodePreview.src = currentBase64;
          updateEncodeOutput();

          const img = new Image();
          img.onload = () => {
            renderEncodeInfo(
              file.name,
              img.width,
              img.height,
              file.size,
              file.type,
              currentBase64.length
            );
          };
          img.src = currentBase64;

          encodeResult.style.display = "grid";
        };
        reader.readAsDataURL(file);
      }

      function renderEncodeInfo(name, width, height, originalSize, type, base64Length) {
        while (encodeInfo.firstChild) {
          encodeInfo.removeChild(encodeInfo.firstChild);
        }

        const items = [
          { label: "文件名", value: name },
          { label: "尺寸", value: width + " × " + height },
          { label: "原始大小", value: formatFileSize(originalSize) },
          { label: "类型", value: type },
          { label: "Base64 长度", value: base64Length.toLocaleString() + " 字符" }
        ];

        items.forEach((item) => {
          const div = document.createElement("div");
          div.className = "info-item";
          const span = document.createElement("span");
          span.textContent = item.label + "：";
          const strong = document.createElement("strong");
          strong.textContent = item.value;
          div.appendChild(span);
          div.appendChild(strong);
          encodeInfo.appendChild(div);
        });
      }

      function updateEncodeOutput() {
        if (includePrefix.checked) {
          encodeOutput.value = currentBase64;
        } else {
          encodeOutput.value = currentBase64.split(",")[1] || "";
        }
      }

      includePrefix.addEventListener("change", updateEncodeOutput);

      document.getElementById("copyBase64Btn").addEventListener("click", () => {
        navigator.clipboard.writeText(encodeOutput.value).then(() => {
          showCopyFeedback("copyBase64Btn", "已复制!");
        });
      });

      document.getElementById("copyImgTagBtn").addEventListener("click", () => {
        const tag = '<img src="' + currentBase64 + '" alt="image">';
        navigator.clipboard.writeText(tag).then(() => {
          showCopyFeedback("copyImgTagBtn", "已复制!");
        });
      });

      document.getElementById("copyCssBgBtn").addEventListener("click", () => {
        const css = "background-image: url('" + currentBase64 + "');";
        navigator.clipboard.writeText(css).then(() => {
          showCopyFeedback("copyCssBgBtn", "已复制!");
        });
      });

      function showCopyFeedback(btnId, msg) {
        const btn = document.getElementById(btnId);
        const original = btn.textContent;
        btn.textContent = msg;
        setTimeout(() => (btn.textContent = original), 2000);
      }

      // === DECODE ===
      const decodeInput = document.getElementById("decodeInput");
      const decodePreviewBox = document.getElementById("decodePreviewBox");
      const decodeInfo = document.getElementById("decodeInfo");
      const decodeActions = document.getElementById("decodeActions");
      const decodeStatus = document.getElementById("decodeStatus");
      const outputFormat = document.getElementById("outputFormat");

      let decodedDataUrl = "";

      document.getElementById("clearDecodeBtn").addEventListener("click", () => {
        decodeInput.value = "";
        resetDecodePreview();
      });

      document.getElementById("decodeBtn").addEventListener("click", function () {
        window.decodeBase64();
      });

      function resetDecodePreview() {
        while (decodePreviewBox.firstChild) {
          decodePreviewBox.removeChild(decodePreviewBox.firstChild);
        }
        const placeholder = document.createElement("span");
        placeholder.className = "placeholder";
        placeholder.textContent = "解码后的图片将显示在这里";
        decodePreviewBox.appendChild(placeholder);

        decodeInfo.style.display = "none";
        decodeActions.style.display = "none";
        decodeStatus.className = "status";
        decodedDataUrl = "";
      }

      window.decodeBase64 = function () {
        let input = decodeInput.value.trim();
        if (!input) {
          showDecodeError("请输入 Base64 编码");
          return;
        }

        // Detect format
        let mimeType = "image/png";
        const format = outputFormat.value;

        if (input.startsWith("data:")) {
          // Has Data URI prefix
          const match = input.match(/^data:(image\/[^;]+);base64,/);
          if (match) {
            mimeType = match[1];
          }
          decodedDataUrl = input;
        } else {
          // Raw Base64
          if (format === "auto") {
            // Try to detect from magic bytes
            try {
              const decoded = atob(input.substring(0, 16));
              if (decoded.startsWith("\x89PNG")) mimeType = "image/png";
              else if (decoded.startsWith("\xFF\xD8\xFF")) mimeType = "image/jpeg";
              else if (decoded.startsWith("GIF8")) mimeType = "image/gif";
              else if (decoded.startsWith("RIFF")) mimeType = "image/webp";
            } catch (e) {
              // Keep default
            }
          } else {
            mimeType = "image/" + format;
          }
          decodedDataUrl = "data:" + mimeType + ";base64," + input;
        }

        // Try to load image
        const img = new Image();
        img.onload = () => {
          while (decodePreviewBox.firstChild) {
            decodePreviewBox.removeChild(decodePreviewBox.firstChild);
          }

          const previewImg = document.createElement("img");
          previewImg.src = decodedDataUrl;
          decodePreviewBox.appendChild(previewImg);

          renderDecodeInfo(img.width, img.height, mimeType, input.length);

          decodeInfo.style.display = "flex";
          decodeActions.style.display = "flex";

          decodeStatus.className = "status success";
          decodeStatus.textContent = "解码成功!";
        };

        img.onerror = () => {
          showDecodeError("无效的图片数据，请检查 Base64 编码");
        };

        img.src = decodedDataUrl;
      };

      function renderDecodeInfo(width, height, type, base64Length) {
        while (decodeInfo.firstChild) {
          decodeInfo.removeChild(decodeInfo.firstChild);
        }

        const items = [
          { label: "尺寸", value: width + " × " + height },
          { label: "类型", value: type },
          { label: "Base64 长度", value: base64Length.toLocaleString() + " 字符" }
        ];

        items.forEach((item) => {
          const div = document.createElement("div");
          div.className = "info-item";
          const span = document.createElement("span");
          span.textContent = item.label + "：";
          const strong = document.createElement("strong");
          strong.textContent = item.value;
          div.appendChild(span);
          div.appendChild(strong);
          decodeInfo.appendChild(div);
        });
      }

      function showDecodeError(msg) {
        decodeStatus.className = "status error";
        decodeStatus.textContent = msg;
      }

      document.getElementById("downloadImageBtn").addEventListener("click", () => {
        if (!decodedDataUrl) return;

        // Extract extension from mime type
        const match = decodedDataUrl.match(/^data:image\/([^;]+);/);
        const ext = match ? match[1].replace("jpeg", "jpg") : "png";

        const link = document.createElement("a");
        link.href = decodedDataUrl;
        link.download = "decoded_image." + ext;
        link.click();
      });

      window.formatFileSize = function (bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
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

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
