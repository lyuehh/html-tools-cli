// @ts-nocheck
// Generated from tools/media/pdf-compress.html
// Source SHA-256: eaaae3d16c32f3bbfc7584bdde9c4a78377a5ccd2a41e68c6aaf3be3efe4adb5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 设置 PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      let currentFile = null;
      let currentPdfBytes = null;
      let compressedPdfBytes = null;
      let selectedLevel = "medium";
      let pageCount = 0;

      // DOM 元素
      const uploadZone = document.getElementById("uploadZone");
      const fileInput = document.getElementById("fileInput");
      const fileInfo = document.getElementById("fileInfo");
      const fileName = document.getElementById("fileName");
      const fileSize = document.getElementById("fileSize");
      const pageCountEl = document.getElementById("pageCount");
      const removeFileBtn = document.getElementById("removeFile");
      const compressBtn = document.getElementById("compressBtn");
      const progressSection = document.getElementById("progressSection");
      const progressFill = document.getElementById("progressFill");
      const progressText = document.getElementById("progressText");
      const errorBox = document.getElementById("errorBox");
      const errorMessage = document.getElementById("errorMessage");
      const resultSection = document.getElementById("resultSection");
      const originalSizeEl = document.getElementById("originalSize");
      const compressedSizeEl = document.getElementById("compressedSize");
      const savedPercentEl = document.getElementById("savedPercent");

      // 上传区域事件
      uploadZone.addEventListener("click", () => fileInput.click());

      uploadZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadZone.classList.add("dragover");
      });

      uploadZone.addEventListener("dragleave", () => {
        uploadZone.classList.remove("dragover");
      });

      uploadZone.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadZone.classList.remove("dragover");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFile(files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          handleFile(e.target.files[0]);
        }
      });

      removeFileBtn.addEventListener("click", resetState);

      // 处理文件
      async function handleFile(file) {
        if (!file.type.includes("pdf")) {
          alert("请上传 PDF 文件");
          return;
        }

        if (file.size > 50 * 1024 * 1024) {
          alert("文件大小不能超过 50MB");
          return;
        }

        currentFile = file;

        // 读取文件
        const arrayBuffer = await file.arrayBuffer();
        currentPdfBytes = new Uint8Array(arrayBuffer);

        // 获取页数
        try {
          const pdf = await pdfjsLib.getDocument({ data: currentPdfBytes }).promise;
          pageCount = pdf.numPages;
        } catch (err) {
          console.error("读取 PDF 失败:", err);
          alert("无法读取 PDF 文件，请确保文件未损坏");
          return;
        }

        // 更新 UI
        fileName.textContent = escapeHtml(file.name);
        fileSize.textContent = formatSize(file.size);
        pageCountEl.textContent = `${pageCount} 页`;

        uploadZone.style.display = "none";
        fileInfo.classList.add("show");
        resultSection.classList.remove("show");
        progressSection.classList.remove("show");
        errorBox.style.display = "none";
      }

      // 选择压缩级别
      function selectLevel(level) {
        selectedLevel = level;
        document.querySelectorAll(".option-card").forEach((card) => {
          card.classList.remove("selected");
          if (card.dataset.level === level) {
            card.classList.add("selected");
          }
        });
      }

      // 压缩 PDF
      async function compressPDF() {
        if (!currentPdfBytes) return;

        compressBtn.disabled = true;
        progressSection.classList.add("show");
        resultSection.classList.remove("show");
        errorBox.style.display = "none";

        try {
          updateProgress(10, "正在加载 PDF...");

          // 加载 PDF
          const pdfDoc = await PDFLib.PDFDocument.load(currentPdfBytes, {
            ignoreEncryption: true
          });

          updateProgress(30, "正在优化文档结构...");

          // 根据压缩级别设置参数
          const compressionSettings = {
            high: { removeMetadata: false, flattenForms: false },
            medium: { removeMetadata: true, flattenForms: false },
            low: { removeMetadata: true, flattenForms: true }
          };

          const settings = compressionSettings[selectedLevel];

          // 移除元数据
          if (settings.removeMetadata) {
            pdfDoc.setTitle("");
            pdfDoc.setAuthor("");
            pdfDoc.setSubject("");
            pdfDoc.setKeywords([]);
            pdfDoc.setProducer("");
            pdfDoc.setCreator("");
          }

          updateProgress(60, "正在压缩...");

          // 保存优化后的 PDF
          compressedPdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
            objectsPerTick: 50
          });

          updateProgress(90, "正在生成结果...");

          // 显示结果
          const originalSize = currentPdfBytes.length;
          const compressedSize = compressedPdfBytes.length;
          const savedBytes = originalSize - compressedSize;
          const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

          originalSizeEl.textContent = formatSize(originalSize);
          compressedSizeEl.textContent = formatSize(compressedSize);
          savedPercentEl.textContent = savedPercent > 0 ? `${savedPercent}%` : "0%";

          updateProgress(100, "完成！");

          setTimeout(() => {
            progressSection.classList.remove("show");
            resultSection.classList.add("show");
          }, 500);
        } catch (err) {
          errorMessage.textContent = "压缩失败: " + err.message;
          errorBox.style.display = "block";
          progressSection.classList.remove("show");
        } finally {
          compressBtn.disabled = false;
        }
      }

      // 下载压缩后的 PDF
      function downloadCompressed() {
        if (!compressedPdfBytes) return;

        const blob = new Blob([compressedPdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        const originalName = currentFile.name.replace(/\.pdf$/i, "");
        link.href = url;
        link.download = `${originalName}_compressed.pdf`;
        link.click();

        URL.revokeObjectURL(url);
      }

      // 更新进度
      function updateProgress(percent, text) {
        progressFill.style.width = `${percent}%`;
        progressText.textContent = text;
      }

      // 重置状态
      function resetState() {
        currentFile = null;
        currentPdfBytes = null;
        compressedPdfBytes = null;
        pageCount = 0;

        uploadZone.style.display = "block";
        fileInfo.classList.remove("show");
        resultSection.classList.remove("show");
        progressSection.classList.remove("show");
        errorBox.style.display = "none";
        fileInput.value = "";
      }

      // 格式化文件大小
      function formatSize(bytes) {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
      }

      // HTML 转义
      function escapeHtml(str) {
        return String(str).replace(
          /[&<>"']/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
        );
      }

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
    
