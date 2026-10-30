// @ts-nocheck
// Generated from tools/media/image-split.html
// Source SHA-256: ba9c41e7e8301fabfeeee1625c95b90b462722bd5997e768e9f26f384e23210e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
      let cols = 3,
        rows = 3;
      let splitImages = [];

      const dropZone = document.getElementById("dropZone");
      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });
      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        handleFile(e.dataTransfer.files[0]);
      });

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage = new Image();
          originalImage.onload = () => {
            document.getElementById("preview").src = originalImage.src;
            document.getElementById("editSection").classList.remove("hidden");
            document.getElementById("resultSection").classList.add("hidden");
            updateGridOverlay();
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      window.setGrid = function (c, r) {
        cols = c;
        rows = r;
        document.querySelectorAll(".grid-btn").forEach((btn) => {
          btn.classList.toggle(
            "active",
            parseInt(btn.dataset.cols) === c && parseInt(btn.dataset.rows) === r
          );
        });
        updateGridOverlay();
      };

      function updateGridOverlay() {
        const overlay = document.getElementById("gridOverlay");
        overlay.innerHTML = "";

        // Horizontal lines
        for (let i = 1; i < rows; i++) {
          const line = document.createElement("div");
          line.className = "grid-line horizontal";
          line.style.top = (i * 100) / rows + "%";
          overlay.appendChild(line);
        }

        // Vertical lines
        for (let i = 1; i < cols; i++) {
          const line = document.createElement("div");
          line.className = "grid-line vertical";
          line.style.left = (i * 100) / cols + "%";
          overlay.appendChild(line);
        }
      }

      window.splitImage = function () {
        if (!originalImage) return;

        splitImages = [];
        const pieceWidth = originalImage.width / cols;
        const pieceHeight = originalImage.height / rows;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const canvas = document.createElement("canvas");
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(
              originalImage,
              c * pieceWidth,
              r * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );

            splitImages.push({
              dataUrl: canvas.toDataURL("image/png"),
              index: r * cols + c + 1
            });
          }
        }

        displayResults();
      };

      function displayResults() {
        const grid = document.getElementById("resultGrid");
        grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

        grid.innerHTML = splitImages
          .map(
            (item) => `
                <div class="result-item">
                    <img src="${item.dataUrl}" alt="Piece ${item.index}">
                    <div class="info">第 ${item.index} 块</div>
                </div>
            `
          )
          .join("");

        document.getElementById("resultSection").classList.remove("hidden");
      }

      window.downloadAll = function () {
        splitImages.forEach((item, i) => {
          setTimeout(() => {
            const link = document.createElement("a");
            link.download = `split_${item.index}.png`;
            link.href = item.dataUrl;
            link.click();
          }, i * 200);
        });
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
