// @ts-nocheck
// Generated from tools/converter/data-url-converter.html
// Source SHA-256: 61b3b4022e36a92a4c7b80fbe57c365fdb16c3108edafbbf75c45044e47f3d1f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentFile = null;
      let currentDataUrl = null;
      let decodedBlob = null;
      let decodedMime = null;

      // 标签切换
      window.switchTab = function (tab) {
        document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((content) => content.classList.remove("active"));
        document.querySelector('.tabs button[onclick*="' + tab + '"]').classList.add("active");
        document.getElementById(tab + "Tab").classList.add("active");
      };

      // 文件处理
      const dropZone = document.getElementById("dropZone");
      const fileInput = document.getElementById("fileInput");

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
        handleFile(e.dataTransfer.files[0]);
      });

      fileInput.addEventListener("change", (e) => {
        handleFile(e.target.files[0]);
      });

      function handleFile(file) {
        if (!file) return;
        currentFile = file;

        const reader = new FileReader();
        reader.onload = function (e) {
          currentDataUrl = e.target.result;
          updateOutput();
          showFileInfo(file);
          showPreview(file, currentDataUrl);
        };
        reader.readAsDataURL(file);
      }

      function showFileInfo(file) {
        document.getElementById("fileInfo").style.display = "grid";
        document.getElementById("fileName").textContent =
          file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;
        document.getElementById("fileName").title = file.name;
        document.getElementById("fileSize").textContent = formatSize(file.size);
        document.getElementById("mimeType").textContent = file.type || "unknown";
      }

      function showPreview(file, dataUrl) {
        const preview = document.getElementById("previewArea");
        preview.style.display = "flex";
        preview.textContent = "";

        if (file.type.startsWith("image/")) {
          const img = document.createElement("img");
          img.src = dataUrl;
          preview.appendChild(img);
        } else if (file.type.startsWith("audio/")) {
          const audio = document.createElement("audio");
          audio.src = dataUrl;
          audio.controls = true;
          preview.appendChild(audio);
        } else if (file.type.startsWith("video/")) {
          const video = document.createElement("video");
          video.src = dataUrl;
          video.controls = true;
          video.style.maxWidth = "100%";
          video.style.maxHeight = "300px";
          preview.appendChild(video);
        } else {
          preview.textContent = "预览不可用 (" + (file.type || "未知类型") + ")";
        }
      }

      function updateOutput() {
        if (!currentDataUrl) return;

        const format = document.getElementById("outputFormat").value;
        const wrapLines = document.getElementById("wrapLines").checked;
        let output = "";

        switch (format) {
          case "dataurl":
            output = currentDataUrl;
            break;
          case "base64":
            output = currentDataUrl.split(",")[1] || "";
            break;
          case "css":
            output = 'background-image: url("' + currentDataUrl + '");';
            break;
          case "html-img":
            output = '<img src="' + currentDataUrl + '" alt="image">';
            break;
          case "markdown":
            output = "![image](" + currentDataUrl + ")";
            break;
        }

        if (wrapLines && (format === "dataurl" || format === "base64")) {
          output = output.match(/.{1,76}/g).join("\n");
        }

        document.getElementById("encodeOutput").value = output;
        document.getElementById("encodedSize").textContent = formatSize(output.length);
      }

      document.getElementById("outputFormat").addEventListener("change", updateOutput);
      document.getElementById("wrapLines").addEventListener("change", updateOutput);

      window.copyOutput = function (id) {
        const textarea = document.getElementById(id);
        navigator.clipboard.writeText(textarea.value).then(() => {
          const btn = textarea.nextElementSibling;
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = "复制"), 1500);
        });
      };

      window.clearEncode = function () {
        currentFile = null;
        currentDataUrl = null;
        document.getElementById("fileInput").value = "";
        document.getElementById("encodeOutput").value = "";
        document.getElementById("fileInfo").style.display = "none";
        document.getElementById("previewArea").style.display = "none";
      };

      window.downloadAsFile = function () {
        const output = document.getElementById("encodeOutput").value;
        if (!output) return;

        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data-url.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 解码功能
      window.decodeDataUrl = function () {
        const input = document.getElementById("decodeInput").value.trim();
        const errorDiv = document.getElementById("decodeError");
        const resultDiv = document.getElementById("decodeResult");

        errorDiv.textContent = "";
        resultDiv.style.display = "none";

        if (!input) {
          errorDiv.textContent = "请输入 Data URL 或 Base64 编码";
          return;
        }

        try {
          let base64Data, mimeType;

          // 检测是否为完整的 Data URL
          if (input.startsWith("data:")) {
            const match = input.match(/^data:([^;,]+)?(?:;base64)?,(.*)$/);
            if (!match) throw new Error("无效的 Data URL 格式");
            mimeType = match[1] || "application/octet-stream";
            base64Data = match[2];
          } else {
            // 假设是纯 Base64
            base64Data = input.replace(/\s/g, "");
            mimeType = document.getElementById("decodeMime").value || "application/octet-stream";
          }

          // 解码 Base64
          const binaryStr = atob(base64Data);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
          }

          decodedBlob = new Blob([bytes], { type: mimeType });
          decodedMime = mimeType;

          // 显示结果
          document.getElementById("decodeMimeType").textContent = mimeType;
          document.getElementById("decodeSize").textContent = formatSize(decodedBlob.size);
          resultDiv.style.display = "block";

          // 预览
          const preview = document.getElementById("decodePreview");
          preview.textContent = "";
          const blobUrl = URL.createObjectURL(decodedBlob);

          if (mimeType.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = blobUrl;
            preview.appendChild(img);
          } else if (mimeType.startsWith("audio/")) {
            const audio = document.createElement("audio");
            audio.src = blobUrl;
            audio.controls = true;
            preview.appendChild(audio);
          } else if (mimeType.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = blobUrl;
            video.controls = true;
            video.style.maxWidth = "100%";
            preview.appendChild(video);
          } else if (mimeType.startsWith("text/") || mimeType === "application/json") {
            const reader = new FileReader();
            reader.onload = function (e) {
              const pre = document.createElement("pre");
              pre.style.textAlign = "left";
              pre.style.maxHeight = "200px";
              pre.style.overflow = "auto";
              pre.style.padding = "1rem";
              pre.style.background = "var(--pico-card-background-color)";
              pre.style.borderRadius = "4px";
              pre.textContent =
                e.target.result.slice(0, 5000) +
                (e.target.result.length > 5000 ? "\n...(truncated)" : "");
              preview.appendChild(pre);
            };
            reader.readAsText(decodedBlob);
          } else {
            preview.textContent = "预览不可用 (" + mimeType + ")";
          }
        } catch (e) {
          errorDiv.textContent = "解码失败: " + e.message;
        }
      };

      window.downloadDecoded = function () {
        if (!decodedBlob) return;

        const ext = getExtension(decodedMime);
        const url = URL.createObjectURL(decodedBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "decoded" + ext;
        a.click();
        URL.revokeObjectURL(url);
      };

      window.clearDecode = function () {
        decodedBlob = null;
        decodedMime = null;
        document.getElementById("decodeInput").value = "";
        document.getElementById("decodeResult").style.display = "none";
        document.getElementById("decodeError").textContent = "";
      };

      function getExtension(mime) {
        const map = {
          "image/png": ".png",
          "image/jpeg": ".jpg",
          "image/gif": ".gif",
          "image/webp": ".webp",
          "image/svg+xml": ".svg",
          "application/pdf": ".pdf",
          "text/plain": ".txt",
          "text/html": ".html",
          "text/css": ".css",
          "application/json": ".json",
          "audio/mpeg": ".mp3",
          "audio/wav": ".wav",
          "video/mp4": ".mp4",
          "video/webm": ".webm"
        };
        return map[mime] || ".bin";
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
        return (bytes / 1024 / 1024).toFixed(2) + " MB";
      }

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
