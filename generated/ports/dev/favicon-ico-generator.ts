// @ts-nocheck
// Generated from tools/dev/favicon-ico-generator.html
// Source SHA-256: 39a721e623ad906b57bed35e61abe895d9921e45cea02adbd69c89c85c2f3312
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var PNG_SIZES = [
        { size: 16, label: "16×16", use: "favicon" },
        { size: 32, label: "32×32", use: "favicon" },
        { size: 48, label: "48×48", use: "favicon" },
        { size: 57, label: "57×57", use: "apple-touch" },
        { size: 72, label: "72×72", use: "apple-touch" },
        { size: 96, label: "96×96", use: "favicon" },
        { size: 114, label: "114×114", use: "apple-touch" },
        { size: 120, label: "120×120", use: "apple-touch" },
        { size: 144, label: "144×144", use: "PWA" },
        { size: 152, label: "152×152", use: "apple-touch" },
        { size: 180, label: "180×180", use: "apple-touch" },
        { size: 192, label: "192×192", use: "PWA" },
        { size: 512, label: "512×512", use: "PWA" }
      ];

      var ICO_SIZES = [16, 32, 48];

      var sourceImage = null;

      var dropZoneEl = document.getElementById("dropZone");
      var fileInputEl = document.getElementById("fileInput");
      var previewSectionEl = document.getElementById("previewSection");
      var sourceImgEl = document.getElementById("sourceImg");
      var sourceNameEl = document.getElementById("sourceName");
      var sourceMetaEl = document.getElementById("sourceMeta");
      var sizesGridEl = document.getElementById("sizesGrid");
      var htmlSnippetEl = document.getElementById("htmlSnippet");
      var statusBarEl = document.getElementById("statusBar");
      var icoStatusEl = document.getElementById("icoStatus");

      function showStatus(msg, type) {
        statusBarEl.textContent = msg;
        statusBarEl.className = "status " + (type || "");
      }

      function setIcoStatus(msg, type) {
        icoStatusEl.textContent = msg;
        icoStatusEl.className = "status " + (type || "");
      }

      function drawToCanvas(img, size) {
        var canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        return canvas;
      }

      function canvasToPngBlob(canvas) {
        return new Promise(function (resolve) {
          canvas.toBlob(resolve, "image/png");
        });
      }

      async function buildIco(img, sizes) {
        var pngBlobs = [];
        var i;
        for (i = 0; i < sizes.length; i++) {
          var canvas = drawToCanvas(img, sizes[i]);
          var blob = await canvasToPngBlob(canvas);
          pngBlobs.push(blob);
        }

        var pngBuffers = await Promise.all(
          pngBlobs.map(function (b) {
            return b.arrayBuffer();
          })
        );

        var headerSize = 6;
        var dirEntrySize = 16;
        var dirSize = dirEntrySize * sizes.length;
        var totalImageSize = pngBuffers.reduce(function (s, b) {
          return s + b.byteLength;
        }, 0);
        var totalSize = headerSize + dirSize + totalImageSize;

        var buf = new ArrayBuffer(totalSize);
        var view = new DataView(buf);

        view.setUint16(0, 0, true);
        view.setUint16(2, 1, true);
        view.setUint16(4, sizes.length, true);

        var dataOffset = headerSize + dirSize;
        var j;
        for (j = 0; j < sizes.length; j++) {
          var dirOff = headerSize + j * dirEntrySize;
          var sz = sizes[j];
          view.setUint8(dirOff, sz >= 256 ? 0 : sz);
          view.setUint8(dirOff + 1, sz >= 256 ? 0 : sz);
          view.setUint8(dirOff + 2, 0);
          view.setUint8(dirOff + 3, 0);
          view.setUint16(dirOff + 4, 1, true);
          view.setUint16(dirOff + 6, 32, true);
          view.setUint32(dirOff + 8, pngBuffers[j].byteLength, true);
          view.setUint32(dirOff + 12, dataOffset, true);
          dataOffset += pngBuffers[j].byteLength;
        }

        var uint8 = new Uint8Array(buf);
        var writeOffset = headerSize + dirSize;
        var k;
        for (k = 0; k < pngBuffers.length; k++) {
          uint8.set(new Uint8Array(pngBuffers[k]), writeOffset);
          writeOffset += pngBuffers[k].byteLength;
        }

        return new Blob([buf], { type: "image/x-icon" });
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
        }, 5000);
      }

      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
      }

      function renderSizesGrid(img) {
        sizesGridEl.innerHTML = "";
        PNG_SIZES.forEach(function (cfg) {
          var fullCanvas = drawToCanvas(img, cfg.size);
          var card = document.createElement("div");
          card.className = "size-card";

          var wrap = document.createElement("div");
          wrap.className = "size-canvas-wrap";
          var previewSize = Math.min(cfg.size, 64);
          wrap.style.width = previewSize + "px";
          wrap.style.height = previewSize + "px";

          var previewCanvas = drawToCanvas(img, previewSize);
          wrap.appendChild(previewCanvas);

          var labelEl = document.createElement("div");
          labelEl.className = "size-label";
          labelEl.textContent = cfg.label;

          var badgeEl = document.createElement("div");
          badgeEl.className = "size-badge";
          badgeEl.textContent = cfg.use;

          var dlBtn = document.createElement("button");
          dlBtn.className = "btn";
          dlBtn.textContent = "下载";
          (function (fc, label) {
            dlBtn.addEventListener("click", function () {
              fc.toBlob(function (blob) {
                downloadBlob(blob, "favicon-" + label.replace("×", "x") + ".png");
              }, "image/png");
            });
          })(fullCanvas, cfg.label);

          card.appendChild(wrap);
          card.appendChild(labelEl);
          card.appendChild(badgeEl);
          card.appendChild(dlBtn);
          sizesGridEl.appendChild(card);
        });
      }

      function renderHtmlSnippet() {
        var lines = [
          "<!-- 标准 favicon -->",
          '<link rel="icon" type="image/x-icon" href="/favicon.ico">',
          '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
          '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
          "",
          "<!-- Apple Touch Icon -->",
          '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
          "",
          "<!-- PWA manifest -->",
          '<link rel="manifest" href="/site.webmanifest">',
          "",
          "<!-- manifest.json icons 字段参考 -->",
          '<!-- { "icons": [',
          '  { "src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },',
          '  { "src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png" }',
          "] } -->"
        ];
        htmlSnippetEl.textContent = lines.join("\n");
      }

      function processImage(file) {
        if (!file) return;
        var allowed = ["image/png", "image/svg+xml", "image/jpeg", "image/webp"];
        if (!allowed.includes(file.type)) {
          showStatus("仅支持 PNG / SVG / JPEG / WebP 格式", "error");
          return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.onload = function () {
            sourceImage = img;
            sourceImgEl.src = e.target.result;
            sourceNameEl.textContent = file.name;
            sourceMetaEl.textContent =
              img.naturalWidth + "×" + img.naturalHeight + " · " + formatSize(file.size);
            dropZoneEl.style.display = "none";
            previewSectionEl.classList.add("show");
            renderSizesGrid(img);
            renderHtmlSnippet();
            showStatus("图片加载成功，可下载各格式文件", "success");
          };
          img.onerror = function () {
            showStatus("图片加载失败，请重试", "error");
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      fileInputEl.addEventListener("change", function () {
        if (fileInputEl.files && fileInputEl.files[0]) {
          processImage(fileInputEl.files[0]);
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
        if (e.dataTransfer.files[0]) processImage(e.dataTransfer.files[0]);
      });

      document.getElementById("btnReset").addEventListener("click", function () {
        sourceImage = null;
        sourceImgEl.src = "";
        fileInputEl.value = "";
        sizesGridEl.innerHTML = "";
        htmlSnippetEl.textContent = "";
        previewSectionEl.classList.remove("show");
        dropZoneEl.style.display = "";
        statusBarEl.textContent = "";
        statusBarEl.className = "status";
        icoStatusEl.textContent = "";
        icoStatusEl.className = "status";
      });

      document.getElementById("btnDownloadIco").addEventListener("click", async function () {
        if (!sourceImage) return;
        setIcoStatus("生成中...", "");
        try {
          var blob = await buildIco(sourceImage, ICO_SIZES);
          downloadBlob(blob, "favicon.ico");
          setIcoStatus("favicon.ico 已下载", "success");
        } catch (err) {
          setIcoStatus("生成失败: " + err.message, "error");
        }
      });

      document.getElementById("btnCopyHtml").addEventListener("click", async function () {
        var text = htmlSnippetEl.textContent;
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          showStatus("HTML 代码已复制", "success");
        } catch (e) {
          showStatus("复制失败，请手动选中复制", "error");
        }
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
    
