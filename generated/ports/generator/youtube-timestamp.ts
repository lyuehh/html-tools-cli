// @ts-nocheck
// Generated from tools/generator/youtube-timestamp.html
// Source SHA-256: 06f355959de4a7e3aa885d6b9db3a2bd03942397f7128d9a65cf13699579c51b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        const videoUrlInput = document.getElementById("videoUrl");
        const hoursInput = document.getElementById("hours");
        const minutesInput = document.getElementById("minutes");
        const secondsInput = document.getElementById("seconds");
        const outputUrl = document.getElementById("outputUrl");
        const timeDisplay = document.getElementById("timeDisplay");
        const secondsDisplay = document.getElementById("secondsDisplay");
        const previewSection = document.getElementById("previewSection");
        const videoPreview = document.getElementById("videoPreview");

        function extractVideoId(url) {
          if (!url) return null;

          // 如果已经是视频 ID 格式
          if (/^[\w-]{11}$/.test(url.trim())) {
            return url.trim();
          }

          const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
            /youtube\.com\/watch\?.*v=([^&\n?#]+)/
          ];

          for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
          }

          return null;
        }

        function getTotalSeconds() {
          const h = parseInt(hoursInput.value) || 0;
          const m = parseInt(minutesInput.value) || 0;
          const s = parseInt(secondsInput.value) || 0;
          return h * 3600 + m * 60 + s;
        }

        function formatTime(totalSeconds) {
          const h = Math.floor(totalSeconds / 3600);
          const m = Math.floor((totalSeconds % 3600) / 60);
          const s = totalSeconds % 60;
          return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        }

        function setTime(totalSeconds) {
          const h = Math.floor(totalSeconds / 3600);
          const m = Math.floor((totalSeconds % 3600) / 60);
          const s = totalSeconds % 60;

          hoursInput.value = h;
          minutesInput.value = m;
          secondsInput.value = s;

          generateUrl();
        }

        function generateUrl() {
          const videoId = extractVideoId(videoUrlInput.value);
          const totalSeconds = getTotalSeconds();

          // 更新时间显示
          timeDisplay.textContent = formatTime(totalSeconds);
          secondsDisplay.textContent = `= ${totalSeconds} 秒`;

          if (!videoId) {
            outputUrl.value = "";
            previewSection.style.display = "none";
            return;
          }

          // 生成链接
          let url = `https://www.youtube.com/watch?v=${videoId}`;
          if (totalSeconds > 0) {
            url += `&t=${totalSeconds}s`;
          }
          outputUrl.value = url;

          // 更新预览
          updatePreview(videoId, totalSeconds);
        }

        function updatePreview(videoId, startTime) {
          previewSection.style.display = "block";

          let embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
          if (startTime > 0) {
            embedUrl += `&start=${startTime}`;
          }

          videoPreview.innerHTML = "";
          const iframe = document.createElement("iframe");
          iframe.src = embedUrl;
          iframe.allowFullscreen = true;
          videoPreview.appendChild(iframe);
        }

        function openYouTube() {
          const url = outputUrl.value;
          if (!url) {
            alert("请先输入 YouTube 视频链接");
            return;
          }
          window.open(url, "_blank");
        }

        function copyUrl() {
          const url = outputUrl.value;
          if (!url) {
            alert("请先输入 YouTube 视频链接");
            return;
          }

          navigator.clipboard.writeText(url).then(() => {
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = "已复制!";
            setTimeout(() => {
              btn.textContent = originalText;
            }, 1500);
          });
        }

        // 输入验证
        function validateTimeInput(input, max) {
          input.addEventListener("input", () => {
            let value = parseInt(input.value) || 0;
            if (value < 0) value = 0;
            if (value > max) value = max;
            input.value = value;
            generateUrl();
          });
        }

        // 绑定事件
        videoUrlInput.addEventListener("input", generateUrl);
        validateTimeInput(hoursInput, 99);
        validateTimeInput(minutesInput, 59);
        validateTimeInput(secondsInput, 59);

        // 暴露全局函数
        window.setTime = setTime;
        window.openYouTube = openYouTube;
        window.copyUrl = copyUrl;
      })();

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
    
