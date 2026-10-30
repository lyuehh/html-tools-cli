// @ts-nocheck
// Generated from tools/media/text-to-image.html
// Source SHA-256: a18c264c9a3760df58b9e6a50831a8ebdc87e7fbe08a18232af7c0e14c5c4ee5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let fontStyle = "normal";

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.syncColor = function (type) {
        const colorPicker = document.getElementById(type + "Color");
        const colorText = document.getElementById(type + "ColorText");
        colorText.value = colorPicker.value;
      };

      window.syncColorPicker = function (type) {
        const colorPicker = document.getElementById(type + "Color");
        const colorText = document.getElementById(type + "ColorText");
        if (/^#[0-9A-Fa-f]{6}$/.test(colorText.value)) {
          colorPicker.value = colorText.value;
        }
      };

      window.setStyle = function (style) {
        fontStyle = style;
        updatePreview();
      };

      function setColors(textColor, bgColor) {
        document.getElementById("textColor").value = textColor;
        document.getElementById("textColorText").value = textColor;
        document.getElementById("bgColor").value = bgColor;
        document.getElementById("bgColorText").value = bgColor;
        updatePreview();
      }

      window.updatePreview = function () {
        const text = document.getElementById("textInput").value || "Hello World";
        const fontFamily = document.getElementById("fontFamily").value;
        const fontSize = parseInt(document.getElementById("fontSize").value);
        const textColor = document.getElementById("textColorText").value;
        const bgColor = document.getElementById("bgColorText").value;
        const lineHeight = parseFloat(document.getElementById("lineHeight").value);
        const padding = parseInt(document.getElementById("padding").value);
        const textAlign = document.getElementById("textAlign").value;

        // Update value displays
        document.getElementById("fontSizeValue").textContent = fontSize + "px";
        document.getElementById("lineHeightValue").textContent = lineHeight;
        document.getElementById("paddingValue").textContent = padding + "px";

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        // Set font to measure text
        const fontString = `${fontStyle} ${fontSize}px ${fontFamily}`;
        ctx.font = fontString;

        // Split text into lines
        const lines = text.split("\n");

        // Calculate dimensions
        let maxWidth = 0;
        lines.forEach((line) => {
          const metrics = ctx.measureText(line || " ");
          if (metrics.width > maxWidth) maxWidth = metrics.width;
        });

        const lineHeightPx = fontSize * lineHeight;
        const textHeight = lines.length * lineHeightPx;

        const canvasWidth = Math.ceil(maxWidth + padding * 2);
        const canvasHeight = Math.ceil(textHeight + padding * 2);

        // Set canvas size
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Draw text
        ctx.fillStyle = textColor;
        ctx.font = fontString;
        ctx.textBaseline = "top";

        lines.forEach((line, index) => {
          let x = padding;
          if (textAlign === "center") {
            x = (canvasWidth - ctx.measureText(line).width) / 2;
          } else if (textAlign === "right") {
            x = canvasWidth - ctx.measureText(line).width - padding;
          }

          const y = padding + index * lineHeightPx + (lineHeightPx - fontSize) / 2;
          ctx.fillText(line, x, y);
        });

        // Update info
        document.getElementById("sizeInfo").textContent = `${canvasWidth} × ${canvasHeight} px`;
      };

      window.downloadImage = function (format) {
        const canvas = document.getElementById("canvas");
        const link = document.createElement("a");

        if (format === "jpg") {
          link.download = "text-image.jpg";
          link.href = canvas.toDataURL("image/jpeg", 0.95);
        } else {
          link.download = "text-image.png";
          link.href = canvas.toDataURL("image/png");
        }

        link.click();
        showToast("图片已下载");
      };

      window.copyImage = async function () {
        const canvas = document.getElementById("canvas");

        try {
          const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showToast("已复制到剪贴板");
        } catch (err) {
          showToast("复制失败");
        }
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      updatePreview();
    
