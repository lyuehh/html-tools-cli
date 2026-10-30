// @ts-nocheck
// Generated from tools/media/pdf-merge.html
// Source SHA-256: 42e4d89e7691ab5103ad172b9226994cba1bab2ed7401d6f4601256ee295f5ab
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Set PDF.js worker
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      // XSS 防护
      function escapeHtml(str) {
        return String(str).replace(
          /[&<>"']/g,
          (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
        );
      }

      class PDFMerger {
        constructor() {
          this.files = [];
          this.draggedItem = null;
          this.init();
        }

        init() {
          this.uploadZone = document.getElementById("uploadZone");
          this.fileInput = document.getElementById("fileInput");
          this.fileList = document.getElementById("fileList");
          this.fileCount = document.getElementById("fileCount");
          this.mergeBtn = document.getElementById("mergeBtn");
          this.clearBtn = document.getElementById("clearBtn");
          this.progressOverlay = document.getElementById("progressOverlay");
          this.progressBar = document.getElementById("progressBar");
          this.progressText = document.getElementById("progressText");

          this.bindEvents();
        }

        bindEvents() {
          // Upload zone events
          this.uploadZone.addEventListener("click", () => this.fileInput.click());
          this.uploadZone.addEventListener("dragover", (e) => this.handleDragOver(e));
          this.uploadZone.addEventListener("dragleave", () =>
            this.uploadZone.classList.remove("dragover")
          );
          this.uploadZone.addEventListener("drop", (e) => this.handleDrop(e));
          this.fileInput.addEventListener("change", (e) => this.handleFiles(e.target.files));

          // Action buttons
          this.mergeBtn.addEventListener("click", () => this.mergePDFs());
          this.clearBtn.addEventListener("click", () => this.clearFiles());

          // Prevent default drag behavior on document
          document.addEventListener("dragover", (e) => e.preventDefault());
          document.addEventListener("drop", (e) => e.preventDefault());
        }

        handleDragOver(e) {
          e.preventDefault();
          this.uploadZone.classList.add("dragover");
        }

        handleDrop(e) {
          e.preventDefault();
          this.uploadZone.classList.remove("dragover");
          const files = Array.from(e.dataTransfer.files).filter(
            (f) => f.type === "application/pdf"
          );
          if (files.length > 0) {
            this.handleFiles(files);
          } else {
            this.showToast("请上传PDF文件", "error");
          }
        }

        async handleFiles(files) {
          for (const file of files) {
            if (file.type !== "application/pdf") {
              this.showToast(`跳过非PDF文件: ${file.name}`, "error");
              continue;
            }

            try {
              const arrayBuffer = await file.arrayBuffer();
              const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

              this.files.push({
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                pageCount: pdfDoc.numPages,
                data: arrayBuffer,
                preview: null
              });

              // Generate preview
              this.generatePreview(this.files.length - 1, pdfDoc);
            } catch (error) {
              console.error("Error loading PDF:", error);
              this.showToast(`加载失败: ${file.name}`, "error");
            }
          }

          this.renderFileList();
          this.updateStats();
          this.updateButtons();
        }

        async generatePreview(index, pdfDoc) {
          try {
            const page = await pdfDoc.getPage(1);
            const scale = 0.3;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: context,
              viewport: viewport
            }).promise;

            this.files[index].preview = canvas.toDataURL("image/jpeg", 0.7);
            this.renderFileList();
          } catch (error) {
            console.error("Error generating preview:", error);
          }
        }

        renderFileList() {
          if (this.files.length === 0) {
            this.fileList.innerHTML = `
            <div class="file-list-empty">
              <p>暂无文件，请上传PDF</p>
              <p style="margin-top: 8px;">拖拽文件可调整合并顺序</p>
            </div>
          `;
            this.fileCount.textContent = "(0个文件)";
            return;
          }

          this.fileCount.textContent = `(${this.files.length}个文件)`;
          this.fileList.innerHTML = this.files
            .map(
              (file, index) => `
          <div class="file-item" draggable="true" data-index="${index}">
            <div class="file-drag-handle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="9" cy="6" r="1.5"/>
                <circle cx="15" cy="6" r="1.5"/>
                <circle cx="9" cy="12" r="1.5"/>
                <circle cx="15" cy="12" r="1.5"/>
                <circle cx="9" cy="18" r="1.5"/>
                <circle cx="15" cy="18" r="1.5"/>
              </svg>
            </div>
            <div class="file-preview">
              ${
                file.preview
                  ? `<img src="${file.preview}" alt="Preview" style="max-width:100%;max-height:100%;">`
                  : '<span class="placeholder">📄</span>'
              }
            </div>
            <div class="file-info">
              <div class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</div>
              <div class="file-meta">${file.pageCount}页 · ${this.formatSize(file.size)}</div>
            </div>
            <div class="file-actions">
              <button class="file-action-btn" onclick="merger.moveUp(${index})" title="上移" ${index === 0 ? "disabled" : ""}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 15l-6-6-6 6"/>
                </svg>
              </button>
              <button class="file-action-btn" onclick="merger.moveDown(${index})" title="下移" ${index === this.files.length - 1 ? "disabled" : ""}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <button class="file-action-btn delete" onclick="merger.removeFile(${index})" title="删除">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        `
            )
            .join("");

          // Add drag and drop events
          this.fileList.querySelectorAll(".file-item").forEach((item) => {
            item.addEventListener("dragstart", (e) => this.handleItemDragStart(e));
            item.addEventListener("dragend", (e) => this.handleItemDragEnd(e));
            item.addEventListener("dragover", (e) => this.handleItemDragOver(e));
            item.addEventListener("drop", (e) => this.handleItemDrop(e));
          });
        }

        handleItemDragStart(e) {
          this.draggedItem = e.currentTarget;
          this.draggedItem.classList.add("dragging");
          e.dataTransfer.effectAllowed = "move";
        }

        handleItemDragEnd(e) {
          e.currentTarget.classList.remove("dragging");
          this.fileList.querySelectorAll(".file-item").forEach((item) => {
            item.classList.remove("drag-over");
          });
          this.draggedItem = null;
        }

        handleItemDragOver(e) {
          e.preventDefault();
          const item = e.currentTarget;
          if (item !== this.draggedItem) {
            item.classList.add("drag-over");
          }
        }

        handleItemDrop(e) {
          e.preventDefault();
          const dropTarget = e.currentTarget;
          dropTarget.classList.remove("drag-over");

          if (this.draggedItem && dropTarget !== this.draggedItem) {
            const fromIndex = parseInt(this.draggedItem.dataset.index);
            const toIndex = parseInt(dropTarget.dataset.index);

            const [removed] = this.files.splice(fromIndex, 1);
            this.files.splice(toIndex, 0, removed);

            this.renderFileList();
          }
        }

        moveUp(index) {
          if (index > 0) {
            [this.files[index], this.files[index - 1]] = [this.files[index - 1], this.files[index]];
            this.renderFileList();
          }
        }

        moveDown(index) {
          if (index < this.files.length - 1) {
            [this.files[index], this.files[index + 1]] = [this.files[index + 1], this.files[index]];
            this.renderFileList();
          }
        }

        removeFile(index) {
          this.files.splice(index, 1);
          this.renderFileList();
          this.updateStats();
          this.updateButtons();
        }

        clearFiles() {
          this.files = [];
          this.renderFileList();
          this.updateStats();
          this.updateButtons();
          this.showToast("已清空文件列表", "success");
        }

        updateStats() {
          const totalFiles = this.files.length;
          const totalPages = this.files.reduce((sum, f) => sum + f.pageCount, 0);
          const totalSize = this.files.reduce((sum, f) => sum + f.size, 0);

          document.getElementById("statFiles").textContent = totalFiles;
          document.getElementById("statPages").textContent = totalPages;
          document.getElementById("statSize").textContent = (totalSize / 1024 / 1024).toFixed(2);
          document.getElementById("statEstimate").textContent =
            totalSize > 0 ? this.formatSize(totalSize) : "-";
        }

        updateButtons() {
          const hasFiles = this.files.length >= 2;
          this.mergeBtn.disabled = !hasFiles;
          this.clearBtn.disabled = this.files.length === 0;
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

        async mergePDFs() {
          if (this.files.length < 2) {
            this.showToast("请至少添加2个PDF文件", "error");
            return;
          }

          this.showProgress(true);
          this.updateProgress(0, "正在准备...");

          try {
            const mergedPdf = await PDFLib.PDFDocument.create();
            const totalFiles = this.files.length;

            for (let i = 0; i < totalFiles; i++) {
              const file = this.files[i];
              this.updateProgress(
                Math.round((i / totalFiles) * 80),
                `正在处理: ${file.name} (${i + 1}/${totalFiles})`
              );

              const pdfDoc = await PDFLib.PDFDocument.load(file.data);
              const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

              for (const page of pages) {
                mergedPdf.addPage(page);
              }
            }

            this.updateProgress(90, "正在生成文件...");
            const mergedPdfBytes = await mergedPdf.save();

            this.updateProgress(100, "完成！");

            // Download
            const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `merged_${Date.now()}.pdf`;
            link.click();
            URL.revokeObjectURL(url);

            setTimeout(() => {
              this.showProgress(false);
              this.showToast("PDF合并成功！", "success");
            }, 500);
          } catch (error) {
            console.error("Merge error:", error);
            this.showProgress(false);
            this.showToast("合并失败: " + error.message, "error");
          }
        }

        showToast(message, type = "success") {
          const toast = document.getElementById("toast");
          toast.className = `toast ${type}`;
          toast.querySelector(".toast-icon").textContent = type === "success" ? "✓" : "✕";
          toast.querySelector(".toast-message").textContent = message;
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }
      }

      // Initialize
      const merger = new PDFMerger();

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
    
