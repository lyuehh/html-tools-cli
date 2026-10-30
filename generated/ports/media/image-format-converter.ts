// @ts-nocheck
// Generated from tools/media/image-format-converter.html
// Source SHA-256: 5555e48000cc78a1c8d5f42ec16cc5ad3822bd35e58a083d4ecbfcb208fbc13b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var dropZoneEl = document.getElementById("dropZone");
      var fileInputEl = document.getElementById("fileInput");
      var outputFormatEl = document.getElementById("outputFormat");
      var qualityEl = document.getElementById("quality");
      var qualityValueEl = document.getElementById("qualityValue");
      var maxWidthEl = document.getElementById("maxWidth");
      var maxHeightEl = document.getElementById("maxHeight");
      var btnConvertEl = document.getElementById("btnConvert");
      var btnDownloadAllEl = document.getElementById("btnDownloadAll");
      var statusEl = document.getElementById("status");
      var previewSectionEl = document.getElementById("previewSection");
      var previewGridEl = document.getElementById("previewGrid");

      var originalFiles = [];
      var convertedBlobs = [];

      // 检测 AVIF 支持
      function checkAVIFSupport() {
        var canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL("image/avif").indexOf("data:image/avif") === 0;
      }

      var avifSupported = checkAVIFSupport();
      if (!avifSupported) {
        document.getElementById("avifWarning").style.display = "block";
      }

      // 更新质量显示
      qualityEl.addEventListener("input", function () {
        qualityValueEl.textContent = qualityEl.value + "%";
      });

      // 拖放处理
      dropZoneEl.addEventListener("click", function () {
        fileInputEl.click();
      });

      dropZoneEl.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropZoneEl.classList.add("dragover");
      });

      dropZoneEl.addEventListener("dragleave", function () {
        dropZoneEl.classList.remove("dragover");
      });

      dropZoneEl.addEventListener("drop", function (e) {
        e.preventDefault();
        dropZoneEl.classList.remove("dragover");
        var files = Array.from(e.dataTransfer.files).filter(function (f) {
          return f.type.startsWith("image/");
        });
        if (files.length > 0) {
          handleFiles(files);
        }
      });

      fileInputEl.addEventListener("change", function () {
        var files = Array.from(fileInputEl.files).filter(function (f) {
          return f.type.startsWith("image/");
        });
        if (files.length > 0) {
          handleFiles(files);
        }
      });

      // 格式化文件大小
      function formatSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
      }

      // 处理文件
      function handleFiles(files) {
        originalFiles = files;
        convertedBlobs = [];
        previewGridEl.innerHTML = "";
        previewSectionEl.classList.remove("show");

        btnConvertEl.disabled = false;
        showStatus("已选择 " + files.length + " 个文件", "success");
      }

      // 批量转换
      function convertAll() {
        var format = outputFormatEl.value;
        var quality = parseInt(qualityEl.value, 10) / 100;
        var maxWidth = parseInt(maxWidthEl.value, 10) || 0;
        var maxHeight = parseInt(maxHeightEl.value, 10) || 0;

        // AVIF 支持检测
        if (format === "avif" && !avifSupported) {
          showStatus("您的浏览器不支持 AVIF 格式", "error");
          return;
        }

        if (originalFiles.length === 0) {
          showStatus("请先选择图片", "error");
          return;
        }

        btnConvertEl.disabled = true;
        showStatus("正在转换...", "");
        previewGridEl.innerHTML = "";
        convertedBlobs = [];

        var promises = originalFiles.map(function (file) {
          return convertImage(file, format, quality, maxWidth, maxHeight);
        });

        Promise.all(promises)
          .then(function (results) {
            convertedBlobs = results;
            previewSectionEl.classList.add("show");
            showStatus("转换完成！共 " + results.length + " 个文件", "success");
            btnConvertEl.disabled = false;
          })
          .catch(function (err) {
            showStatus("转换失败: " + err.message, "error");
            btnConvertEl.disabled = false;
          });
      }

      // 转换单个图片
      function convertImage(file, format, quality, maxWidth, maxHeight) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
              var width = img.width;
              var height = img.height;

              // 调整尺寸
              if (maxWidth > 0 || maxHeight > 0) {
                var ratio = Math.min(
                  maxWidth > 0 ? maxWidth / width : Infinity,
                  maxHeight > 0 ? maxHeight / height : Infinity,
                  1
                );
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
              }

              // 创建 Canvas
              var canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              // 导出
              var mimeType = "image/" + format;
              canvas.toBlob(
                function (blob) {
                  if (!blob) {
                    reject(new Error("转换失败: " + file.name));
                    return;
                  }

                  // 添加预览
                  addPreview(file, blob, format, width, height);
                  resolve(blob);
                },
                mimeType,
                format === "png" ? undefined : quality
              );
            };
            img.onerror = function () {
              reject(new Error("无法加载图片: " + file.name));
            };
            img.src = e.target.result;
          };
          reader.onerror = function () {
            reject(new Error("无法读取文件: " + file.name));
          };
          reader.readAsDataURL(file);
        });
      }

      // 添加预览
      function addPreview(originalFile, convertedBlob, format, width, height) {
        var item = document.createElement("div");
        item.className = "preview-item";

        var ext = format === "jpeg" ? "jpg" : format;
        var fileName = originalFile.name.replace(/\.[^.]+$/, "") + "." + ext;

        var originalSize = originalFile.size;
        var convertedSize = convertedBlob.size;
        var savedPercent = (((originalSize - convertedSize) / originalSize) * 100).toFixed(1);

        item.innerHTML =
          '<h4>转换成功 <span style="font-size: 0.75rem; font-weight: normal; color: var(--accent-green);">✓</span></h4>' +
          '<div class="file-name" title="' +
          fileName +
          '">' +
          fileName +
          "</div>" +
          '<img class="preview-img" alt="Preview" />' +
          '<div class="preview-info">' +
          "<p>尺寸: " +
          width +
          " × " +
          height +
          "</p>" +
          "<p>原始: " +
          formatSize(originalSize) +
          " → " +
          formatSize(convertedSize) +
          "</p>" +
          "<p>节省: <strong>" +
          (savedPercent > 0 ? savedPercent + "%" : "增大") +
          "</strong></p>" +
          "</div>" +
          '<div class="preview-actions">' +
          '<button class="btn-download" data-filename="' +
          fileName +
          '">下载</button>' +
          "</div>";

        var imgEl = item.querySelector(".preview-img");
        imgEl.src = URL.createObjectURL(convertedBlob);

        var btnDownload = item.querySelector(".btn-download");
        btnDownload.addEventListener("click", function () {
          downloadBlob(convertedBlob, fileName);
        });

        previewGridEl.appendChild(item);
      }

      // 下载单个文件
      function downloadBlob(blob, filename) {
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      }

      // 下载全部 (ZIP)
      function downloadAllAsZip() {
        if (convertedBlobs.length === 0) {
          showStatus("没有可下载的文件", "error");
          return;
        }

        showStatus("正在打包 ZIP...", "");
        btnDownloadAllEl.disabled = true;

        var zip = new JSZip();
        var format = outputFormatEl.value;
        var ext = format === "jpeg" ? "jpg" : format;

        convertedBlobs.forEach(function (blob, index) {
          var fileName = originalFiles[index].name.replace(/\.[^.]+$/, "") + "." + ext;
          zip.file(fileName, blob);
        });

        zip
          .generateAsync({ type: "blob" })
          .then(function (content) {
            var timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
            downloadBlob(content, "converted-images-" + timestamp + ".zip");
            showStatus("ZIP 下载完成", "success");
            btnDownloadAllEl.disabled = false;
          })
          .catch(function (err) {
            showStatus("打包失败: " + err.message, "error");
            btnDownloadAllEl.disabled = false;
          });
      }

      // 清空
      window.clearAll = function () {
        originalFiles = [];
        convertedBlobs = [];
        fileInputEl.value = "";
        previewGridEl.innerHTML = "";
        previewSectionEl.classList.remove("show");
        btnConvertEl.disabled = true;
        showStatus("已清空", "success");
      };

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // 事件绑定
      btnConvertEl.onclick = convertAll;
      btnDownloadAllEl.onclick = downloadAllAsZip;
      document.getElementById("btnClear").onclick = clearAll;

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
