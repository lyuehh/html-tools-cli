// @ts-nocheck
// Generated from tools/media/image-collage.html
// Source SHA-256: bf0e5ade3df808949e25081217bd97a2e6cadfba950282a577dfc68ca403ec40
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let images = [];
      let direction = "vertical";
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      const dropZone = document.getElementById("dropZone");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
      });

      function handleFiles(files) {
        Array.from(files).forEach((file) => {
          if (!file.type.startsWith("image/")) return;
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              images.push({ img, name: file.name });
              updateImageList();
              if (images.length >= 2) {
                document.getElementById("editSection").classList.remove("hidden");
                generatePreview();
              }
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }

      function updateImageList() {
        const list = document.getElementById("imageList");
        list.innerHTML = images
          .map(
            (item, i) => `
                <div class="image-item" draggable="true" data-index="${i}">
                    <img src="${item.img.src}" alt="">
                    <button class="remove" onclick="removeImage(${i})" aria-label="×">×</button>
                    <span class="order">${i + 1}</span>
                </div>
            `
          )
          .join("");

        // Add drag and drop reordering
        list.querySelectorAll(".image-item").forEach((item) => {
          item.addEventListener("dragstart", handleDragStart);
          item.addEventListener("dragover", handleDragOver);
          item.addEventListener("drop", handleDrop);
        });
      }

      let dragIndex = null;
      function handleDragStart(e) {
        dragIndex = parseInt(e.target.closest(".image-item").dataset.index);
      }
      function handleDragOver(e) {
        e.preventDefault();
      }
      function handleDrop(e) {
        e.preventDefault();
        const dropIndex = parseInt(e.target.closest(".image-item").dataset.index);
        if (dragIndex !== null && dragIndex !== dropIndex) {
          const [item] = images.splice(dragIndex, 1);
          images.splice(dropIndex, 0, item);
          updateImageList();
          generatePreview();
        }
      }

      window.removeImage = function (index) {
        images.splice(index, 1);
        updateImageList();
        if (images.length < 2) {
          document.getElementById("editSection").classList.add("hidden");
        } else {
          generatePreview();
        }
      };

      window.setDirection = function (dir) {
        direction = dir;
        document.querySelectorAll(".direction-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.dir === dir);
        });
        generatePreview();
      };

      function generatePreview() {
        if (images.length < 2) return;

        const gap = parseInt(document.getElementById("gap").value) || 0;
        const bgColor = document.getElementById("bgColor").value;
        const outputWidth = parseInt(document.getElementById("outputWidth").value) || 0;

        let totalWidth, totalHeight;

        if (direction === "vertical") {
          const maxWidth = outputWidth || Math.max(...images.map((i) => i.img.width));
          totalWidth = maxWidth;
          totalHeight =
            images.reduce((sum, item) => {
              const scale = maxWidth / item.img.width;
              return sum + item.img.height * scale;
            }, 0) +
            gap * (images.length - 1);
        } else {
          const maxHeight = Math.max(...images.map((i) => i.img.height));
          totalHeight = maxHeight;
          totalWidth =
            images.reduce((sum, item) => {
              const scale = maxHeight / item.img.height;
              return sum + item.img.width * scale;
            }, 0) +
            gap * (images.length - 1);
        }

        canvas.width = totalWidth;
        canvas.height = totalHeight;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalWidth, totalHeight);

        let offset = 0;
        images.forEach((item) => {
          if (direction === "vertical") {
            const scale = totalWidth / item.img.width;
            const h = item.img.height * scale;
            ctx.drawImage(item.img, 0, offset, totalWidth, h);
            offset += h + gap;
          } else {
            const maxHeight = totalHeight;
            const scale = maxHeight / item.img.height;
            const w = item.img.width * scale;
            ctx.drawImage(item.img, offset, 0, w, maxHeight);
            offset += w + gap;
          }
        });
      }

      window.download = function () {
        const link = document.createElement("a");
        link.download = "collage.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
