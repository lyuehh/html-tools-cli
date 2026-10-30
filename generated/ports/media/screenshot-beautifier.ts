// @ts-nocheck
// Generated from tools/media/screenshot-beautifier.html
// Source SHA-256: 5066bb525e747982553911ba9ee0d58ff8ab417fddbc8767df655040e9381453
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 状态
      const state = {
        image: null,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        bgColor: "#667eea",
        padding: 64,
        borderRadius: 12,
        shadow: 30,
        scale: 100,
        format: "png"
      };

      // DOM 元素
      const fileInput = document.getElementById("file-input");
      const previewContainer = document.getElementById("preview-container");
      const canvasContainer = document.getElementById("canvas-container");
      const dropHint = document.getElementById("drop-hint");
      const canvas = document.getElementById("preview-canvas");
      const ctx = canvas.getContext("2d");
      const messageEl = document.getElementById("message");

      // 控制元素
      const paddingInput = document.getElementById("padding");
      const radiusInput = document.getElementById("border-radius");
      const shadowInput = document.getElementById("shadow");
      const scaleInput = document.getElementById("scale");
      const bgColorInput = document.getElementById("bg-color");
      const formatSelect = document.getElementById("output-format");
      const gradientBtns = document.querySelectorAll(".gradient-btn");

      // 按钮
      const uploadBtn = document.getElementById("upload-btn");
      const pasteBtn = document.getElementById("paste-btn");
      const downloadBtn = document.getElementById("download-btn");
      const copyBtn = document.getElementById("copy-btn");

      // 值显示
      const paddingValue = document.getElementById("padding-value");
      const radiusValue = document.getElementById("radius-value");
      const shadowValue = document.getElementById("shadow-value");
      const scaleValue = document.getElementById("scale-value");

      // 渲染画布
      function render() {
        if (!state.image) return;

        const img = state.image;
        const scale = state.scale / 100;
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const padding = state.padding;
        const radius = state.borderRadius;
        const shadowBlur = state.shadow;

        // 设置画布大小
        canvas.width = imgWidth + padding * 2;
        canvas.height = imgHeight + padding * 2;

        // 绘制背景
        if (state.gradient.startsWith("linear-gradient")) {
          // 解析渐变
          const gradientMatch = state.gradient.match(
            /linear-gradient\((\d+)deg,\s*([#\w]+)\s*\d*%?,\s*([#\w]+)\s*\d*%?\)/
          );
          if (gradientMatch) {
            const angle = (parseInt(gradientMatch[1]) * Math.PI) / 180;
            const color1 = gradientMatch[2].trim();
            const color2 = gradientMatch[3].trim();

            const x1 = canvas.width / 2 - Math.cos(angle) * canvas.width;
            const y1 = canvas.height / 2 - Math.sin(angle) * canvas.height;
            const x2 = canvas.width / 2 + Math.cos(angle) * canvas.width;
            const y2 = canvas.height / 2 + Math.sin(angle) * canvas.height;

            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.fillStyle = gradient;
          }
        } else {
          ctx.fillStyle = state.bgColor;
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 先绘制带阴影的圆角矩形（阴影必须在 clip 之前绘制）
        if (shadowBlur > 0) {
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
          ctx.shadowBlur = shadowBlur;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = shadowBlur / 3;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          roundRect(ctx, padding, padding, imgWidth, imgHeight, radius);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // 绘制圆角矩形裁剪区域
        ctx.save();
        ctx.beginPath();
        roundRect(ctx, padding, padding, imgWidth, imgHeight, radius);
        ctx.closePath();
        ctx.clip();

        // 绘制图片
        ctx.drawImage(img, padding, padding, imgWidth, imgHeight);
        ctx.restore();
      }

      // 绘制圆角矩形
      function roundRect(ctx, x, y, width, height, radius) {
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }

      // 加载图片
      window.loadImage = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            state.image = img;
            dropHint.style.display = "none";
            canvasContainer.style.display = "block";
            previewContainer.classList.add("has-image");
            downloadBtn.disabled = false;
            copyBtn.disabled = false;
            render();
            showMessage("图片加载成功", "success");
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // 从剪贴板加载图片
      async function loadFromClipboard() {
        try {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            for (const type of item.types) {
              if (type.startsWith("image/")) {
                const blob = await item.getType(type);
                loadImage(blob);
                return;
              }
            }
          }
          showMessage("剪贴板中没有图片", "error");
        } catch (err) {
          showMessage("无法读取剪贴板: " + err.message, "error");
        }
      }

      // 下载图片
      window.downloadImage = function () {
        if (!state.image) return;

        const format = state.format;
        const mimeType =
          format === "jpeg" ? "image/jpeg" : format === "webp" ? "image/webp" : "image/png";
        const quality = format === "jpeg" ? 0.92 : 1;

        canvas.toBlob(
          (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `screenshot-beautified.${format}`;
            a.click();
            URL.revokeObjectURL(url);
            showMessage("图片已下载", "success");
          },
          mimeType,
          quality
        );
      };

      // 复制到剪贴板
      window.copyToClipboard = async function () {
        if (!state.image) return;

        try {
          canvas.toBlob(async (blob) => {
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            showMessage("已复制到剪贴板", "success");
          }, "image/png");
        } catch (err) {
          showMessage("复制失败: " + err.message, "error");
        }
      };

      // 显示消息
      function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = "message " + type;
        setTimeout(() => {
          messageEl.className = "message";
        }, 3000);
      }

      // 事件监听
      uploadBtn.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        if (e.target.files[0]) loadImage(e.target.files[0]);
      });
      pasteBtn.addEventListener("click", loadFromClipboard);
      downloadBtn.addEventListener("click", downloadImage);
      copyBtn.addEventListener("click", copyToClipboard);

      // 拖拽上传
      previewContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        previewContainer.classList.add("dragover");
      });
      previewContainer.addEventListener("dragleave", () => {
        previewContainer.classList.remove("dragover");
      });
      previewContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        previewContainer.classList.remove("dragover");
        if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]);
      });

      // 粘贴事件
      document.addEventListener("paste", (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            loadImage(item.getAsFile());
            break;
          }
        }
      });

      // 控制面板事件
      paddingInput.addEventListener("input", (e) => {
        state.padding = parseInt(e.target.value);
        paddingValue.textContent = state.padding + "px";
        render();
      });

      radiusInput.addEventListener("input", (e) => {
        state.borderRadius = parseInt(e.target.value);
        radiusValue.textContent = state.borderRadius + "px";
        render();
      });

      shadowInput.addEventListener("input", (e) => {
        state.shadow = parseInt(e.target.value);
        shadowValue.textContent = state.shadow + "%";
        render();
      });

      scaleInput.addEventListener("input", (e) => {
        state.scale = parseInt(e.target.value);
        scaleValue.textContent = state.scale + "%";
        render();
      });

      bgColorInput.addEventListener("input", (e) => {
        state.bgColor = e.target.value;
        state.gradient = "";
        gradientBtns.forEach((btn) => btn.classList.remove("active"));
        render();
      });

      formatSelect.addEventListener("change", (e) => {
        state.format = e.target.value;
      });

      // 渐变预设
      gradientBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          gradientBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.gradient = btn.dataset.gradient;
          render();
        });
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

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
