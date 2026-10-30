// @ts-nocheck
// Generated from tools/media/pdf-split.html
// Source SHA-256: af0a9884c4f796a0615fd6997f2a949c177fa6ffb2380df8cad1791e06a7b125
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      class PDFSplitter {
        constructor() {
          this.pdfData = null;
          this.pdfDoc = null;
          this.pageCount = 0;
          this.selectedPages = new Set();
          this.mode = "select";
          this.init();
        }

        init() {
          this.uploadZone = document.getElementById("uploadZone");
          this.fileInput = document.getElementById("fileInput");
          this.fileInfoBar = document.getElementById("fileInfoBar");
          this.pageGrid = document.getElementById("pageGrid");
          this.splitBtn = document.getElementById("splitBtn");
          this.progressOverlay = document.getElementById("progressOverlay");
          this.progressBar = document.getElementById("progressBar");
          this.progressText = document.getElementById("progressText");

          this.bindEvents();
        }

        bindEvents() {
          this.uploadZone.addEventListener("click", () => this.fileInput.click());
          this.uploadZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            this.uploadZone.classList.add("dragover");
          });
          this.uploadZone.addEventListener("dragleave", () => {
            this.uploadZone.classList.remove("dragover");
          });
          this.uploadZone.addEventListener("drop", (e) => {
            e.preventDefault();
            this.uploadZone.classList.remove("dragover");
            if (e.dataTransfer.files[0]?.type === "application/pdf") {
              this.loadFile(e.dataTransfer.files[0]);
            }
          });
          this.fileInput.addEventListener("change", (e) => {
            if (e.target.files[0]) this.loadFile(e.target.files[0]);
          });

          // Mode tabs
          document.querySelectorAll(".split-mode-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
              document
                .querySelectorAll(".split-mode-tab")
                .forEach((t) => t.classList.remove("active"));
              tab.classList.add("active");
              this.mode = tab.dataset.mode;
              document.querySelectorAll(".mode-content").forEach((c) => (c.style.display = "none"));
              document.getElementById(
                `mode${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)}`
              ).style.display = "block";
              this.updateStats();
            });
          });

          // Range input
          document.getElementById("rangeInput").addEventListener("input", () => this.updateStats());
          document
            .getElementById("everyNInput")
            .addEventListener("input", () => this.updateStats());

          this.splitBtn.addEventListener("click", () => this.splitPDF());

          document.addEventListener("dragover", (e) => e.preventDefault());
          document.addEventListener("drop", (e) => e.preventDefault());
        }

        async loadFile(file) {
          try {
            this.fileName = file.name;
            this.fileSize = file.size;
            this.pdfData = await file.arrayBuffer();
            this.pdfDoc = await pdfjsLib.getDocument({ data: this.pdfData }).promise;
            this.pageCount = this.pdfDoc.numPages;
            this.selectedPages.clear();

            // Update UI
            this.uploadZone.classList.add("hidden");
            this.fileInfoBar.classList.add("active");
            document.getElementById("fileName").textContent = this.fileName;
            document.getElementById("fileMeta").textContent =
              `${this.pageCount}页 · ${this.formatSize(this.fileSize)}`;
            document.getElementById("pageCount").textContent = `(${this.pageCount}页)`;

            await this.renderPages();
            this.updateStats();
            this.splitBtn.disabled = false;
          } catch (error) {
            console.error("Error loading PDF:", error);
            this.showToast("加载PDF失败: " + error.message, "error");
          }
        }

        async renderPages() {
          this.pageGrid.innerHTML = "";

          for (let i = 1; i <= this.pageCount; i++) {
            const pageItem = document.createElement("div");
            pageItem.className = "page-item";
            pageItem.dataset.page = i;
            pageItem.innerHTML = `
            <canvas></canvas>
            <div class="page-number">第 ${i} 页</div>
            <div class="page-check">✓</div>
          `;

            pageItem.addEventListener("click", () => this.togglePage(i));
            this.pageGrid.appendChild(pageItem);

            // Render thumbnail
            this.renderThumbnail(i, pageItem.querySelector("canvas"));
          }
        }

        async renderThumbnail(pageNum, canvas) {
          try {
            const page = await this.pdfDoc.getPage(pageNum);
            const scale = 0.5;
            const viewport = page.getViewport({ scale });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: canvas.getContext("2d"),
              viewport: viewport
            }).promise;
          } catch (error) {
            console.error("Error rendering thumbnail:", error);
          }
        }

        togglePage(pageNum) {
          if (this.mode !== "select") return;

          const pageItem = this.pageGrid.querySelector(`[data-page="${pageNum}"]`);
          if (this.selectedPages.has(pageNum)) {
            this.selectedPages.delete(pageNum);
            pageItem.classList.remove("selected");
          } else {
            this.selectedPages.add(pageNum);
            pageItem.classList.add("selected");
          }
          this.updateStats();
        }

        selectAll() {
          for (let i = 1; i <= this.pageCount; i++) {
            this.selectedPages.add(i);
          }
          this.updatePageSelection();
        }

        selectNone() {
          this.selectedPages.clear();
          this.updatePageSelection();
        }

        selectOdd() {
          this.selectedPages.clear();
          for (let i = 1; i <= this.pageCount; i += 2) {
            this.selectedPages.add(i);
          }
          this.updatePageSelection();
        }

        selectEven() {
          this.selectedPages.clear();
          for (let i = 2; i <= this.pageCount; i += 2) {
            this.selectedPages.add(i);
          }
          this.updatePageSelection();
        }

        selectFirst5() {
          this.selectedPages.clear();
          for (let i = 1; i <= Math.min(5, this.pageCount); i++) {
            this.selectedPages.add(i);
          }
          this.updatePageSelection();
        }

        selectLast5() {
          this.selectedPages.clear();
          for (let i = Math.max(1, this.pageCount - 4); i <= this.pageCount; i++) {
            this.selectedPages.add(i);
          }
          this.updatePageSelection();
        }

        updatePageSelection() {
          this.pageGrid.querySelectorAll(".page-item").forEach((item) => {
            const pageNum = parseInt(item.dataset.page);
            item.classList.toggle("selected", this.selectedPages.has(pageNum));
          });
          this.updateStats();
        }

        parseRange(rangeStr) {
          const pages = new Set();
          if (!rangeStr.trim()) return pages;

          const parts = rangeStr.split(",");
          for (const part of parts) {
            const trimmed = part.trim();
            if (trimmed.includes("-")) {
              const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim()));
              if (!isNaN(start) && !isNaN(end)) {
                for (let i = Math.max(1, start); i <= Math.min(this.pageCount, end); i++) {
                  pages.add(i);
                }
              }
            } else {
              const num = parseInt(trimmed);
              if (!isNaN(num) && num >= 1 && num <= this.pageCount) {
                pages.add(num);
              }
            }
          }
          return pages;
        }

        getSelectedPages() {
          if (this.mode === "select") {
            return Array.from(this.selectedPages).sort((a, b) => a - b);
          } else if (this.mode === "range") {
            return Array.from(this.parseRange(document.getElementById("rangeInput").value)).sort(
              (a, b) => a - b
            );
          }
          return [];
        }

        getOutputCount() {
          if (this.mode === "every") {
            const n = parseInt(document.getElementById("everyNInput").value) || 1;
            return Math.ceil(this.pageCount / n);
          }
          return 1;
        }

        updateStats() {
          document.getElementById("statTotal").textContent = this.pageCount || "-";

          if (this.mode === "every") {
            const n = parseInt(document.getElementById("everyNInput").value) || 1;
            document.getElementById("statSelected").textContent = this.pageCount || "-";
            document.getElementById("statOutput").textContent = `${this.getOutputCount()} 个文件`;
          } else {
            const selected = this.getSelectedPages();
            document.getElementById("statSelected").textContent = selected.length || "-";
            document.getElementById("statOutput").textContent =
              selected.length > 0 ? "1 个文件" : "-";
          }
        }

        async splitPDF() {
          if (!this.pdfData) {
            this.showToast("请先上传PDF文件", "error");
            return;
          }

          this.showProgress(true);
          this.updateProgress(0, "正在准备...");

          try {
            const srcPdf = await PDFLib.PDFDocument.load(this.pdfData);

            if (this.mode === "every") {
              await this.splitEveryN(srcPdf);
            } else {
              await this.splitBySelection(srcPdf);
            }

            this.showProgress(false);
            this.showToast("拆分完成！", "success");
          } catch (error) {
            console.error("Split error:", error);
            this.showProgress(false);
            this.showToast("拆分失败: " + error.message, "error");
          }
        }

        async splitBySelection(srcPdf) {
          const selectedPages = this.getSelectedPages();
          if (selectedPages.length === 0) {
            throw new Error("请选择要提取的页面");
          }

          this.updateProgress(10, "正在创建新PDF...");
          const newPdf = await PDFLib.PDFDocument.create();
          const totalPages = selectedPages.length;

          for (let i = 0; i < totalPages; i++) {
            const pageNum = selectedPages[i];
            this.updateProgress(
              10 + (i / totalPages) * 80,
              `正在处理第 ${pageNum} 页 (${i + 1}/${totalPages})`
            );

            const [copiedPage] = await newPdf.copyPages(srcPdf, [pageNum - 1]);
            newPdf.addPage(copiedPage);
          }

          this.updateProgress(95, "正在生成文件...");
          const pdfBytes = await newPdf.save();
          this.downloadPdf(pdfBytes, `split_pages_${selectedPages.join("-")}.pdf`);
          this.updateProgress(100, "完成！");
        }

        async splitEveryN(srcPdf) {
          const n = parseInt(document.getElementById("everyNInput").value) || 1;
          const totalFiles = Math.ceil(this.pageCount / n);

          for (let fileIdx = 0; fileIdx < totalFiles; fileIdx++) {
            const startPage = fileIdx * n;
            const endPage = Math.min(startPage + n, this.pageCount);

            this.updateProgress(
              (fileIdx / totalFiles) * 90,
              `正在生成文件 ${fileIdx + 1}/${totalFiles}...`
            );

            const newPdf = await PDFLib.PDFDocument.create();
            for (let i = startPage; i < endPage; i++) {
              const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
              newPdf.addPage(copiedPage);
            }

            const pdfBytes = await newPdf.save();
            this.downloadPdf(
              pdfBytes,
              `split_${fileIdx + 1}_pages_${startPage + 1}-${endPage}.pdf`
            );

            // Small delay between downloads
            await new Promise((resolve) => setTimeout(resolve, 300));
          }

          this.updateProgress(100, "完成！");
        }

        downloadPdf(bytes, filename) {
          const blob = new Blob([bytes], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
          URL.revokeObjectURL(url);
        }

        reset() {
          this.pdfData = null;
          this.pdfDoc = null;
          this.pageCount = 0;
          this.selectedPages.clear();

          this.uploadZone.classList.remove("hidden");
          this.fileInfoBar.classList.remove("active");
          this.pageGrid.innerHTML = `
          <div class="empty-state">
            <div class="icon">📄</div>
            <p>请先上传PDF文件</p>
          </div>
        `;
          document.getElementById("pageCount").textContent = "";
          this.splitBtn.disabled = true;
          this.fileInput.value = "";
          this.updateStats();
        }

        formatSize(bytes) {
          if (bytes < 1024) return bytes + " B";
          if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
          return (bytes / 1024 / 1024).toFixed(2) + " MB";
        }

        showProgress(show) {
          this.progressOverlay.classList.toggle("active", show);
          if (!show) {
            this.progressBar.style.width = "0%";
          }
        }

        updateProgress(percent, text) {
          this.progressBar.style.width = percent + "%";
          this.progressText.textContent = text;
        }

        showToast(message, type = "success") {
          const toast = document.getElementById("toast");
          toast.className = `toast ${type}`;
          toast.querySelector(".toast-icon").textContent = type === "success" ? "✓" : "✕";
          toast.querySelector(".toast-message").textContent = message;
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 3000);
        }
      }

      const splitter = new PDFSplitter();

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
    
