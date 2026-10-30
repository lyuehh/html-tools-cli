// @ts-nocheck
// Generated from tools/dev/css-sprites.html
// Source SHA-256: 8262f7062ff9f289332ebfaa727cd613a5c808400ddf00ab914ce3697c13feca
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      let images = [];
      let spriteCanvas = null;
      let spriteData = [];

      // File input handling
      document.getElementById("fileInput").addEventListener("change", handleFiles);

      // Drag and drop
      const uploadSection = document.getElementById("uploadSection");
      uploadSection.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadSection.classList.add("dragover");
      });
      uploadSection.addEventListener("dragleave", () => {
        uploadSection.classList.remove("dragover");
      });
      uploadSection.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadSection.classList.remove("dragover");
        handleFiles({ target: { files: e.dataTransfer.files } });
      });

      function handleFiles(e) {
        const files = Array.from(e.target.files).filter((f) => f.type.startsWith("image/"));

        files.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              images.push({
                name: file.name.replace(/\.[^/.]+$/, ""),
                img: img,
                width: img.width,
                height: img.height
              });
              renderImages();
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }

      function renderImages() {
        const section = document.getElementById("imagesSection");
        const grid = document.getElementById("imagesGrid");
        const count = document.getElementById("imageCount");

        if (images.length === 0) {
          section.style.display = "none";
          return;
        }

        section.style.display = "block";
        count.textContent = images.length;

        grid.innerHTML = images
          .map(
            (img, i) => `
                <div class="image-item">
                    <button class="image-remove" onclick="removeImage(${i})" aria-label="×">×</button>
                    <img src="${img.img.src}" alt="${img.name}">
                    <div class="image-name">${img.name}</div>
                </div>
            `
          )
          .join("");
      }

      window.removeImage = function (index) {
        images.splice(index, 1);
        renderImages();
      };

      window.clearImages = function () {
        images = [];
        renderImages();
        document.getElementById("outputSection").classList.remove("visible");
      };

      window.generateSprite = function () {
        if (images.length === 0) {
          alert("请先添加图片");
          return;
        }

        const layout = document.getElementById("layout").value;
        const padding = parseInt(document.getElementById("padding").value) || 0;
        const prefix = document.getElementById("prefix").value || "sprite";
        const format = document.getElementById("format").value;

        spriteData = [];
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        if (layout === "horizontal") {
          // Horizontal layout
          let totalWidth = images.reduce((sum, img) => sum + img.width + padding, -padding);
          let maxHeight = Math.max(...images.map((img) => img.height));

          canvas.width = totalWidth;
          canvas.height = maxHeight;

          let x = 0;
          images.forEach((img, i) => {
            ctx.drawImage(img.img, x, 0);
            spriteData.push({
              name: img.name,
              x: x,
              y: 0,
              width: img.width,
              height: img.height
            });
            x += img.width + padding;
          });
        } else if (layout === "vertical") {
          // Vertical layout
          let maxWidth = Math.max(...images.map((img) => img.width));
          let totalHeight = images.reduce((sum, img) => sum + img.height + padding, -padding);

          canvas.width = maxWidth;
          canvas.height = totalHeight;

          let y = 0;
          images.forEach((img, i) => {
            ctx.drawImage(img.img, 0, y);
            spriteData.push({
              name: img.name,
              x: 0,
              y: y,
              width: img.width,
              height: img.height
            });
            y += img.height + padding;
          });
        } else {
          // Packed layout (simple row-based packing)
          const maxWidth = 512;
          let rows = [];
          let currentRow = { images: [], width: 0, height: 0 };

          images.forEach((img) => {
            if (currentRow.width + img.width + padding > maxWidth && currentRow.images.length > 0) {
              rows.push(currentRow);
              currentRow = { images: [], width: 0, height: 0 };
            }
            currentRow.images.push(img);
            currentRow.width += img.width + padding;
            currentRow.height = Math.max(currentRow.height, img.height);
          });
          if (currentRow.images.length > 0) rows.push(currentRow);

          let totalWidth = Math.max(...rows.map((r) => r.width - padding));
          let totalHeight = rows.reduce((sum, r) => sum + r.height + padding, -padding);

          canvas.width = totalWidth;
          canvas.height = totalHeight;

          let y = 0;
          rows.forEach((row) => {
            let x = 0;
            row.images.forEach((img) => {
              ctx.drawImage(img.img, x, y);
              spriteData.push({
                name: img.name,
                x: x,
                y: y,
                width: img.width,
                height: img.height
              });
              x += img.width + padding;
            });
            y += row.height + padding;
          });
        }

        spriteCanvas = canvas;

        // Show output
        const outputSection = document.getElementById("outputSection");
        outputSection.classList.add("visible");

        // Preview
        document.getElementById("spritePreview").innerHTML =
          `<img src="${canvas.toDataURL("image/" + format)}">`;

        // Generate CSS
        let css = `.${prefix} {\n  background-image: url('sprite.${format}');\n  background-repeat: no-repeat;\n}\n\n`;
        spriteData.forEach((item) => {
          const className = item.name.replace(/[^a-zA-Z0-9_-]/g, "-");
          css += `.${prefix}-${className} {\n`;
          css += `  width: ${item.width}px;\n`;
          css += `  height: ${item.height}px;\n`;
          css += `  background-position: -${item.x}px -${item.y}px;\n`;
          css += "}\n\n";
        });
        document.getElementById("cssCode").textContent = css;

        // Generate HTML
        let html = "<!-- 使用示例 -->\n";
        spriteData.forEach((item) => {
          const className = item.name.replace(/[^a-zA-Z0-9_-]/g, "-");
          html += `<span class="${prefix} ${prefix}-${className}"></span>\n`;
        });
        document.getElementById("htmlCode").textContent = html;

        // Switch to preview tab
        switchTab("preview");
      };

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

        document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`).classList.add("active");
        document.getElementById(tab + "Tab").classList.add("active");
      };

      window.downloadSprite = function () {
        if (!spriteCanvas) return;

        const format = document.getElementById("format").value;
        const link = document.createElement("a");
        link.download = `sprite.${format}`;
        link.href = spriteCanvas.toDataURL("image/" + format);
        link.click();
      };

      window.copyCSS = function () {
        navigator.clipboard.writeText(document.getElementById("cssCode").textContent);
        alert("CSS代码已复制");
      };

      window.copyHTML = function () {
        navigator.clipboard.writeText(document.getElementById("htmlCode").textContent);
        alert("HTML代码已复制");
      };
    
