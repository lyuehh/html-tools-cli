// @ts-nocheck
// Generated from tools/generator/placeholder-image.html
// Source SHA-256: 425dbaf7d6e6775c3afe2736667cec53b83feedd07b89d56f9089ae26c658372
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentFormat = "png";

      function setSize(w, h) {
        document.getElementById("width").value = w;
        document.getElementById("height").value = h;
        generate();
      }

      function setFormat(format) {
        currentFormat = format;
        document.querySelectorAll(".format-option").forEach((el) => {
          el.classList.toggle("active", el.dataset.format === format);
        });
        generate();
      }

      function generate() {
        const width = parseInt(document.getElementById("width").value) || 800;
        const height = parseInt(document.getElementById("height").value) || 600;
        const bgColor = document.getElementById("bgColor").value;
        const textColor = document.getElementById("textColor").value;
        const customText = document.getElementById("customText").value;

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        // Draw background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Draw text
        const text = customText || `${width} × ${height}`;
        const fontSize = Math.min(width, height) / 8;
        ctx.fillStyle = textColor;
        ctx.font = `bold ${fontSize}px -apple-system, blinkmacsystemfont, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, width / 2, height / 2);

        // Draw border
        ctx.strokeStyle = textColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);

        // Draw diagonal lines (optional decorative)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height);
        ctx.moveTo(width, 0);
        ctx.lineTo(0, height);
        ctx.strokeStyle = textColor + "40";
        ctx.lineWidth = 1;
        ctx.stroke();

        updateUrl();
      }

      function updateUrl() {
        const width = document.getElementById("width").value;
        const height = document.getElementById("height").value;
        const bgColor = document.getElementById("bgColor").value.slice(1);
        const textColor = document.getElementById("textColor").value.slice(1);
        const text = document.getElementById("customText").value;

        // Generate placeholder.com style URL
        let url = `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}`;
        if (text) url += `?text=${encodeURIComponent(text)}`;

        document.getElementById("urlBox").textContent = url;
      }

      function download() {
        const canvas = document.getElementById("canvas");
        const link = document.createElement("a");
        const width = document.getElementById("width").value;
        const height = document.getElementById("height").value;

        let mimeType = "image/png";
        let ext = "png";
        if (currentFormat === "jpeg") {
          mimeType = "image/jpeg";
          ext = "jpg";
        }
        if (currentFormat === "webp") {
          mimeType = "image/webp";
          ext = "webp";
        }

        link.download = `placeholder-${width}x${height}.${ext}`;
        link.href = canvas.toDataURL(mimeType, 0.9);
        link.click();
      }

      function copyDataUrl() {
        const canvas = document.getElementById("canvas");
        let mimeType = "image/png";
        if (currentFormat === "jpeg") mimeType = "image/jpeg";
        if (currentFormat === "webp") mimeType = "image/webp";

        const dataUrl = canvas.toDataURL(mimeType, 0.9);
        navigator.clipboard.writeText(dataUrl);
        alert("Data URL 已复制到剪贴板!");
      }

      function copyUrl() {
        const url = document.getElementById("urlBox").textContent;
        navigator.clipboard.writeText(url);
        alert("URL 已复制到剪贴板!");
      }

      generate();

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
    
