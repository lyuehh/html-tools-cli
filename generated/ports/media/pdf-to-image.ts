// @ts-nocheck
// Generated from tools/media/pdf-to-image.html
// Source SHA-256: bf19a3968c4273403b51bcfe8792ab0f5c1271a49b4c2ec4244223b99afdfd67
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* global pdfjsLib */
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      var currentPdf = null;
      var currentFileName = "page";
      var renderedBlobs = [];

      var dropZoneEl = document.getElementById("dropZone");
      var fileInputEl = document.getElementById("fileInput");
      var selFormatEl = document.getElementById("selFormat");
      var selScaleEl = document.getElementById("selScale");
      var btnConvertEl = document.getElementById("btnConvert");
      var btnDownloadAllEl = document.getElementById("btnDownloadAll");
      var btnClearEl = document.getElementById("btnClear");
      var statusEl = document.getElementById("status");
      var pagesGridEl = document.getElementById("pagesGrid");
      var pagesHeaderEl = document.getElementById("pagesHeader");
      var pagesLabelEl = document.getElementById("pagesLabel");
      var progressWrapEl = document.getElementById("progressWrap");
      var progressFillEl = document.getElementById("progressFill");
      var progressTextEl = document.getElementById("progressText");

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function setProgress(current, total) {
        var pct = total > 0 ? Math.round((current / total) * 100) : 0;
        progressFillEl.style.width = pct + "%";
        progressTextEl.textContent = current + " / " + total;
      }

      function canvasToBlob(canvas, format) {
        return new Promise(function (resolve) {
          var mimeType = format === "jpg" ? "image/jpeg" : "image/png";
          var quality = format === "jpg" ? 0.92 : undefined;
          canvas.toBlob(
            function (blob) {
              resolve(blob);
            },
            mimeType,
            quality
          );
        });
      }

      function downloadBlob(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
          URL.revokeObjectURL(url);
        }, 1000);
      }

      function buildPageItem(pageNum, canvas, blob, format) {
        var item = document.createElement("div");
        item.className = "page-item";

        var wrap = document.createElement("div");
        wrap.className = "page-canvas-wrap";
        wrap.appendChild(canvas);

        var foot = document.createElement("div");
        foot.className = "page-footer";

        var label = document.createElement("span");
        label.className = "page-label";
        label.textContent = "第 " + pageNum + " 页";

        var dlBtn = document.createElement("button");
        dlBtn.className = "btn-dl";
        dlBtn.textContent = "下载";
        dlBtn.addEventListener("click", function () {
          var ext = format === "jpg" ? "jpg" : "png";
          downloadBlob(blob, currentFileName + "_p" + pageNum + "." + ext);
        });

        foot.appendChild(label);
        foot.appendChild(dlBtn);
        item.appendChild(wrap);
        item.appendChild(foot);
        return item;
      }

      async function loadAndRender(arrayBuffer, fileName) {
        showStatus("正在加载 PDF…", "");
        pagesGridEl.innerHTML = "";
        renderedBlobs = [];
        pagesHeaderEl.style.display = "none";
        progressWrapEl.classList.remove("show");
        btnConvertEl.disabled = true;
        btnDownloadAllEl.disabled = true;

        try {
          var uint8 = new Uint8Array(arrayBuffer);
          currentPdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
          currentFileName = fileName.replace(/\.pdf$/i, "");
          var numPages = currentPdf.numPages;
          showStatus("PDF 已加载，共 " + numPages + " 页，点击「转换全部页」开始", "success");
          btnConvertEl.disabled = false;
          pagesLabelEl.textContent = "页面预览（共 " + numPages + " 页）";
          pagesHeaderEl.style.display = "flex";
        } catch (err) {
          showStatus("PDF 加载失败: " + err.message, "error");
        }
      }

      async function convertAll() {
        if (!currentPdf) return;
        var format = selFormatEl.value;
        var scale = parseFloat(selScaleEl.value);
        var numPages = currentPdf.numPages;

        btnConvertEl.disabled = true;
        btnDownloadAllEl.disabled = true;
        pagesGridEl.innerHTML = "";
        renderedBlobs = [];
        progressWrapEl.classList.add("show");
        setProgress(0, numPages);
        showStatus("渲染中…", "");

        try {
          for (var i = 1; i <= numPages; i++) {
            var page = await currentPdf.getPage(i);
            var viewport = page.getViewport({ scale: scale });
            var canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            var ctx = canvas.getContext("2d");
            await page.render({ canvasContext: ctx, viewport: viewport }).promise;

            var blob = await canvasToBlob(canvas, format);
            renderedBlobs.push(blob);

            var thumbCanvas = document.createElement("canvas");
            var thumbScale = Math.min(1, 200 / viewport.width);
            thumbCanvas.width = Math.round(viewport.width * thumbScale);
            thumbCanvas.height = Math.round(viewport.height * thumbScale);
            var thumbCtx = thumbCanvas.getContext("2d");
            thumbCtx.drawImage(canvas, 0, 0, thumbCanvas.width, thumbCanvas.height);

            var item = buildPageItem(i, thumbCanvas, blob, format);
            pagesGridEl.appendChild(item);

            setProgress(i, numPages);
          }
          showStatus("转换完成，共 " + numPages + " 页", "success");
          btnDownloadAllEl.disabled = false;
        } catch (err) {
          showStatus("渲染失败: " + err.message, "error");
        }
        btnConvertEl.disabled = false;
      }

      function handleFile(file) {
        if (!file) return;
        if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
          showStatus("请选择 PDF 文件", "error");
          return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          loadAndRender(e.target.result, file.name);
        };
        reader.readAsArrayBuffer(file);
      }

      dropZoneEl.addEventListener("click", function () {
        fileInputEl.click();
      });
      dropZoneEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputEl.click();
        }
      });
      dropZoneEl.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZoneEl.classList.add("drag-over");
      });
      dropZoneEl.addEventListener("dragleave", function () {
        dropZoneEl.classList.remove("drag-over");
      });
      dropZoneEl.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZoneEl.classList.remove("drag-over");
        var file = e.dataTransfer.files[0];
        handleFile(file);
      });
      fileInputEl.addEventListener("change", function () {
        handleFile(fileInputEl.files[0]);
        fileInputEl.value = "";
      });

      btnConvertEl.addEventListener("click", convertAll);

      btnDownloadAllEl.addEventListener("click", function () {
        if (!renderedBlobs.length) return;
        var format = selFormatEl.value;
        var ext = format === "jpg" ? "jpg" : "png";
        renderedBlobs.forEach(function (blob, idx) {
          setTimeout(function () {
            downloadBlob(blob, currentFileName + "_p" + (idx + 1) + "." + ext);
          }, idx * 150);
        });
        showStatus("已触发下载 " + renderedBlobs.length + " 个文件", "success");
      });

      btnClearEl.addEventListener("click", function () {
        currentPdf = null;
        currentFileName = "page";
        renderedBlobs = [];
        pagesGridEl.innerHTML = "";
        pagesHeaderEl.style.display = "none";
        progressWrapEl.classList.remove("show");
        setProgress(0, 0);
        statusEl.textContent = "";
        statusEl.className = "status";
        btnConvertEl.disabled = true;
        btnDownloadAllEl.disabled = true;
        fileInputEl.value = "";
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
