// @ts-nocheck
// Generated from tools/media/video-thumbnail.html
// Source SHA-256: 3cf78dd6fdab2f25c0d190864ba376024ab12ae2b19214a5acccc98fede1f72e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;

      function setTheme(dark) {
        html.setAttribute("data-theme", dark ? "dark" : "light");
        themeToggle.textContent = dark ? "☀️ 亮色模式" : "🌙 暗色模式";
        localStorage.setItem("theme", dark ? "dark" : "light");
      }

      themeToggle.addEventListener("click", () => {
        setTheme(html.getAttribute("data-theme") !== "dark");
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setTheme(savedTheme === "dark");
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme(true);
      }

      // Variables
      let videoFile = null;
      let thumbnails = [];
      const video = document.getElementById("videoPlayer");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Elements
      const fileInput = document.getElementById("fileInput");
      const dropZone = document.getElementById("dropZone");
      const sizeMode = document.getElementById("sizeMode");
      const batchMode = document.getElementById("batchMode");
      const qualitySlider = document.getElementById("quality");
      const outputFormat = document.getElementById("outputFormat");

      // Event listeners
      qualitySlider.addEventListener("input", () => {
        document.getElementById("qualityValue").textContent = qualitySlider.value + "%";
      });

      sizeMode.addEventListener("change", () => {
        document
          .getElementById("customSizeGroup")
          .classList.toggle("hidden", sizeMode.value !== "custom");
      });

      batchMode.addEventListener("change", () => {
        document
          .getElementById("intervalGroup")
          .classList.toggle("hidden", batchMode.value !== "interval");
        document
          .getElementById("countGroup")
          .classList.toggle("hidden", batchMode.value !== "count");
      });

      outputFormat.addEventListener("change", () => {
        document
          .getElementById("qualityGroup")
          .classList.toggle("hidden", outputFormat.value === "png");
      });

      // File handling
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) loadVideo(e.target.files[0]);
      });

      dropZone.addEventListener("click", () => fileInput.click());
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files[0]) loadVideo(e.dataTransfer.files[0]);
      });

      function loadVideo(file) {
        videoFile = file;
        const url = URL.createObjectURL(file);
        video.src = url;

        video.onloadedmetadata = () => {
          document.getElementById("videoContainer").style.display = "block";
          document.getElementById("videoInfo").style.display = "block";
          document.getElementById("batchBtn").disabled = false;

          document.getElementById("videoName").textContent = file.name;
          document.getElementById("videoDuration").textContent = formatTime(video.duration);
          document.getElementById("videoResolution").textContent =
            video.videoWidth + "×" + video.videoHeight;
          document.getElementById("videoSize").textContent = formatFileSize(file.size);
          document.getElementById("totalTime").textContent = formatTimeMs(video.duration);

          // Set custom size defaults
          document.getElementById("customWidth").value = video.videoWidth;
          document.getElementById("customHeight").value = video.videoHeight;
        };

        video.ontimeupdate = () => {
          document.getElementById("currentTime").textContent = formatTimeMs(video.currentTime);
        };
      }

      function stepForward() {
        video.currentTime = Math.min(video.duration, video.currentTime + 1 / 30);
      }

      function stepBackward() {
        video.currentTime = Math.max(0, video.currentTime - 1 / 30);
      }

      function getOutputDimensions() {
        const mode = sizeMode.value;
        let width, height;

        switch (mode) {
          case "original":
            width = video.videoWidth;
            height = video.videoHeight;
            break;
          case "custom":
            width = parseInt(document.getElementById("customWidth").value);
            height = parseInt(document.getElementById("customHeight").value);
            if (document.getElementById("keepAspectRatio").checked) {
              const ratio = video.videoWidth / video.videoHeight;
              height = Math.round(width / ratio);
            }
            break;
          case "720p":
            width = 1280;
            height = 720;
            break;
          case "1080p":
            width = 1920;
            height = 1080;
            break;
          case "480p":
            width = 854;
            height = 480;
            break;
        }

        return { width, height };
      }

      function captureFrame() {
        if (video.readyState < 2) return;

        const dims = getOutputDimensions();
        canvas.width = dims.width;
        canvas.height = dims.height;

        ctx.drawImage(video, 0, 0, dims.width, dims.height);

        const format = outputFormat.value;
        const quality = qualitySlider.value / 100;
        const mimeType = "image/" + format;
        const dataUrl = canvas.toDataURL(mimeType, quality);

        addThumbnail(dataUrl, video.currentTime);
      }

      function addThumbnail(dataUrl, time) {
        const thumbnail = {
          id: Date.now() + Math.random(),
          dataUrl: dataUrl,
          time: time,
          selected: false
        };

        thumbnails.push(thumbnail);
        renderThumbnails();

        document.getElementById("thumbnailsContainer").style.display = "block";
      }

      function renderThumbnails() {
        const grid = document.getElementById("thumbnailsGrid");
        grid.replaceChildren();

        thumbnails.forEach((thumb, index) => {
          const item = document.createElement("div");
          item.className = "thumbnail-item" + (thumb.selected ? " selected" : "");

          const img = document.createElement("img");
          img.src = thumb.dataUrl;
          img.alt = "Thumbnail at " + formatTimeMs(thumb.time);
          img.addEventListener("click", () => toggleSelect(index));

          const info = document.createElement("div");
          info.className = "thumbnail-info";

          const timeSpan = document.createElement("span");
          timeSpan.className = "thumbnail-time";
          timeSpan.textContent = formatTimeMs(thumb.time);

          const actions = document.createElement("div");
          actions.className = "thumbnail-actions";

          const downloadBtn = document.createElement("button");
          downloadBtn.className = "outline";
          downloadBtn.textContent = "💾";
          downloadBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            downloadThumbnail(index);
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "secondary outline";
          deleteBtn.textContent = "✕";
          deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteThumbnail(index);
          });

          const seekBtn = document.createElement("button");
          seekBtn.className = "outline";
          seekBtn.textContent = "🎯";
          seekBtn.title = "跳转到此时间";
          seekBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            video.currentTime = thumb.time;
          });

          actions.appendChild(seekBtn);
          actions.appendChild(downloadBtn);
          actions.appendChild(deleteBtn);

          info.appendChild(timeSpan);
          info.appendChild(actions);

          item.appendChild(img);
          item.appendChild(info);
          grid.appendChild(item);
        });

        document.getElementById("thumbnailCount").textContent = thumbnails.length;
        document.getElementById("downloadAllBtn").disabled = thumbnails.length === 0;

        const selectedCount = thumbnails.filter((t) => t.selected).length;
        document.getElementById("downloadSelectedBtn").disabled = selectedCount === 0;
      }

      function toggleSelect(index) {
        thumbnails[index].selected = !thumbnails[index].selected;
        renderThumbnails();
      }

      function deleteThumbnail(index) {
        thumbnails.splice(index, 1);
        renderThumbnails();
      }

      function downloadThumbnail(index) {
        const thumb = thumbnails[index];
        const format = outputFormat.value;
        const link = document.createElement("a");
        link.download =
          "thumbnail_" + formatTimeMs(thumb.time).replace(/[:.]/g, "-") + "." + format;
        link.href = thumb.dataUrl;
        link.click();
      }

      window.downloadSelected = async function () {
        const selected = thumbnails.filter((t) => t.selected);
        if (selected.length === 0) return;

        if (selected.length === 1) {
          const index = thumbnails.indexOf(selected[0]);
          downloadThumbnail(index);
        } else {
          await downloadAsZip(selected);
        }
      };

      window.downloadAll = async function () {
        if (thumbnails.length === 0) return;

        if (thumbnails.length === 1) {
          downloadThumbnail(0);
        } else {
          await downloadAsZip(thumbnails);
        }
      };

      async function downloadAsZip(items) {
        const zip = new JSZip();
        const format = outputFormat.value;

        items.forEach((thumb, i) => {
          const filename =
            "thumbnail_" +
            (i + 1).toString().padStart(3, "0") +
            "_" +
            formatTimeMs(thumb.time).replace(/[:.]/g, "-") +
            "." +
            format;
          const base64 = thumb.dataUrl.split(",")[1];
          zip.file(filename, base64, { base64: true });
        });

        const blob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.download = "thumbnails.zip";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }

      function clearThumbnails() {
        thumbnails = [];
        renderThumbnails();
      }

      window.batchExtract = async function () {
        if (!video.duration) return;

        const mode = batchMode.value;
        const progressContainer = document.getElementById("progressContainer");
        const progressFill = document.getElementById("progressFill");
        const progressText = document.getElementById("progressText");

        progressContainer.style.display = "block";

        let times = [];

        if (mode === "interval") {
          const interval = parseFloat(document.getElementById("interval").value);
          for (let t = 0; t < video.duration; t += interval) {
            times.push(t);
          }
        } else if (mode === "count") {
          const count = parseInt(document.getElementById("count").value);
          const interval = video.duration / (count + 1);
          for (let i = 1; i <= count; i++) {
            times.push(i * interval);
          }
        } else if (mode === "keyframes") {
          // Simple scene change detection
          times = await detectSceneChanges();
        }

        for (let i = 0; i < times.length; i++) {
          progressFill.style.width = ((i + 1) / times.length) * 100 + "%";
          progressText.textContent = "提取中... " + (i + 1) + " / " + times.length;

          await seekAndCapture(times[i]);
        }

        progressContainer.style.display = "none";
      };

      function seekAndCapture(time) {
        return new Promise((resolve) => {
          video.currentTime = time;
          video.onseeked = () => {
            captureFrame();
            setTimeout(resolve, 50);
          };
        });
      }

      async function detectSceneChanges() {
        const times = [0];
        const sampleInterval = 0.5;
        const threshold = 30;

        let prevImageData = null;
        const smallCanvas = document.createElement("canvas");
        smallCanvas.width = 64;
        smallCanvas.height = 36;
        const smallCtx = smallCanvas.getContext("2d");

        for (let t = 0; t < video.duration; t += sampleInterval) {
          await new Promise((resolve) => {
            video.currentTime = t;
            video.onseeked = () => {
              smallCtx.drawImage(video, 0, 0, 64, 36);
              const imageData = smallCtx.getImageData(0, 0, 64, 36);

              if (prevImageData) {
                const diff = calculateDifference(prevImageData.data, imageData.data);
                if (diff > threshold) {
                  times.push(t);
                }
              }

              prevImageData = imageData;
              resolve();
            };
          });
        }

        return times.slice(0, 50); // Limit to 50 frames
      }

      function calculateDifference(data1, data2) {
        let diff = 0;
        const len = Math.min(data1.length, data2.length);

        for (let i = 0; i < len; i += 4) {
          diff += Math.abs(data1[i] - data2[i]); // R
          diff += Math.abs(data1[i + 1] - data2[i + 1]); // G
          diff += Math.abs(data1[i + 2] - data2[i + 2]); // B
        }

        return diff / (len / 4) / 3;
      }

      // Utility functions
      function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0");
      }

      function formatTimeMs(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        return (
          mins.toString().padStart(2, "0") +
          ":" +
          secs.toString().padStart(2, "0") +
          "." +
          ms.toString().padStart(3, "0")
        );
      }

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
    
