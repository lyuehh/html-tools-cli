// @ts-nocheck
// Generated from tools/media/image-compare.html
// Source SHA-256: 8c91d41246c411072bafab89a0ed522110994e0a062aa4c6476cb7b40cad6339
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      // DOM Elements
      const beforeZone = document.getElementById("beforeZone");
      const afterZone = document.getElementById("afterZone");
      const beforeInput = document.getElementById("beforeInput");
      const afterInput = document.getElementById("afterInput");
      const compareContainer = document.getElementById("compareContainer");
      const sideBySideContainer = document.getElementById("sideBySideContainer");
      const compareWrapper = document.getElementById("compareWrapper");
      const compareBefore = document.getElementById("compareBefore");
      const compareSlider = document.getElementById("compareSlider");
      const beforeImage = document.getElementById("beforeImage");
      const afterImage = document.getElementById("afterImage");
      const sideBySideBefore = document.getElementById("sideBySideBefore");
      const sideBySideAfter = document.getElementById("sideBySideAfter");
      const emptyState = document.getElementById("emptyState");
      const opacitySlider = document.getElementById("opacitySlider");
      const opacityValue = document.getElementById("opacityValue");
      const opacityControl = document.getElementById("opacityControl");
      const zoomSlider = document.getElementById("zoomSlider");
      const zoomValue = document.getElementById("zoomValue");
      const downloadBtn = document.getElementById("downloadBtn");
      const swapBtn = document.getElementById("swapBtn");
      const resetBtn = document.getElementById("resetBtn");

      // State
      let beforeSrc = null;
      let afterSrc = null;
      let currentMode = "vertical";
      let sliderPosition = 50;
      let isDragging = false;

      // Setup upload zones
      [
        { zone: beforeZone, input: beforeInput, type: "before" },
        { zone: afterZone, input: afterInput, type: "after" }
      ].forEach(({ zone, input, type }) => {
        zone.addEventListener("click", (e) => {
          if (!e.target.classList.contains("remove-btn")) {
            input.click();
          }
        });
        zone.addEventListener("dragover", (e) => {
          e.preventDefault();
          zone.classList.add("dragover");
        });
        zone.addEventListener("dragleave", () => {
          zone.classList.remove("dragover");
        });
        zone.addEventListener("drop", (e) => {
          e.preventDefault();
          zone.classList.remove("dragover");
          if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0], type);
          }
        });
        input.addEventListener("change", (e) => {
          if (e.target.files.length > 0) {
            handleFile(e.target.files[0], type);
          }
        });
      });

      // Mode buttons
      document.querySelectorAll(".mode-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          setMode(btn.dataset.mode);
        });
      });

      // Opacity slider
      opacitySlider.addEventListener("input", () => {
        opacityValue.textContent = opacitySlider.value;
        if (currentMode === "blend") {
          compareBefore.style.opacity = opacitySlider.value / 100;
        }
      });

      // Zoom slider
      zoomSlider.addEventListener("input", updateZoom);

      // Buttons
      downloadBtn.addEventListener("click", downloadCompare);
      swapBtn.addEventListener("click", swapImages);
      resetBtn.addEventListener("click", resetAll);

      // Slider interaction
      compareSlider.addEventListener("mousedown", startDrag);
      compareSlider.addEventListener("touchstart", startDrag, { passive: false });
      document.addEventListener("mousemove", drag);
      document.addEventListener("touchmove", drag, { passive: false });
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);

      // Click on compare container to move slider
      compareWrapper.addEventListener("click", (e) => {
        if (e.target === compareSlider || compareSlider.contains(e.target)) return;
        const rect = compareWrapper.getBoundingClientRect();
        if (currentMode === "vertical") {
          sliderPosition = ((e.clientX - rect.left) / rect.width) * 100;
        } else if (currentMode === "horizontal") {
          sliderPosition = ((e.clientY - rect.top) / rect.height) * 100;
        }
        updateSlider();
      });

      function handleFile(file, type) {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target.result;
          const zone = type === "before" ? beforeZone : afterZone;

          // Update preview
          let preview = zone.querySelector(".preview");
          if (!preview) {
            preview = document.createElement("img");
            preview.className = "preview";
            zone.appendChild(preview);

            // Hide text
            const p = zone.querySelector("p");
            if (p) p.style.display = "none";
          }
          preview.src = src;
          zone.classList.add("has-image");

          if (type === "before") {
            beforeSrc = src;
          } else {
            afterSrc = src;
          }

          updateCompare();
        };
        reader.readAsDataURL(file);
      }

      window.removeImage = function (type, event) {
        event.stopPropagation();
        const zone = type === "before" ? beforeZone : afterZone;
        const input = type === "before" ? beforeInput : afterInput;

        const preview = zone.querySelector(".preview");
        if (preview) preview.remove();

        const p = zone.querySelector("p");
        if (p) p.style.display = "";

        zone.classList.remove("has-image");
        input.value = "";

        if (type === "before") {
          beforeSrc = null;
        } else {
          afterSrc = null;
        }

        updateCompare();
      };

      function updateCompare() {
        const hasImages = beforeSrc && afterSrc;

        if (hasImages) {
          beforeImage.src = beforeSrc;
          afterImage.src = afterSrc;
          sideBySideBefore.src = beforeSrc;
          sideBySideAfter.src = afterSrc;

          emptyState.style.display = "none";
          setMode(currentMode);
        } else {
          compareContainer.classList.remove("visible");
          sideBySideContainer.classList.remove("visible");
          emptyState.style.display = "block";
        }

        downloadBtn.disabled = !hasImages;
        swapBtn.disabled = !hasImages;
      }

      window.setMode = function (mode) {
        currentMode = mode;

        compareContainer.classList.remove("vertical", "horizontal", "blend", "visible");
        sideBySideContainer.classList.remove("visible");
        opacityControl.style.display = "none";

        if (!beforeSrc || !afterSrc) return;

        if (mode === "side-by-side") {
          sideBySideContainer.classList.add("visible");
        } else {
          compareContainer.classList.add(mode, "visible");

          if (mode === "blend") {
            compareBefore.style.clipPath = "none";
            compareBefore.style.opacity = opacitySlider.value / 100;
            opacityControl.style.display = "block";
          } else {
            compareBefore.style.opacity = 1;
            updateSlider();
          }
        }
      };

      function startDrag(e) {
        e.preventDefault();
        isDragging = true;
      }

      function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        const rect = compareWrapper.getBoundingClientRect();
        let clientX, clientY;

        if (e.touches) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        if (currentMode === "vertical") {
          sliderPosition = ((clientX - rect.left) / rect.width) * 100;
        } else if (currentMode === "horizontal") {
          sliderPosition = ((clientY - rect.top) / rect.height) * 100;
        }

        sliderPosition = Math.max(0, Math.min(100, sliderPosition));
        updateSlider();
      }

      function stopDrag() {
        isDragging = false;
      }

      function updateSlider() {
        if (currentMode === "vertical") {
          compareSlider.style.left = sliderPosition + "%";
          compareSlider.style.top = "0";
          compareSlider.style.width = "4px";
          compareSlider.style.height = "100%";
          compareBefore.style.clipPath = "inset(0 " + (100 - sliderPosition) + "% 0 0)";
        } else if (currentMode === "horizontal") {
          compareSlider.style.top = sliderPosition + "%";
          compareSlider.style.left = "0";
          compareSlider.style.width = "100%";
          compareSlider.style.height = "4px";
          compareBefore.style.clipPath = "inset(0 0 " + (100 - sliderPosition) + "% 0)";
        }
      }

      function updateZoom() {
        const zoom = zoomSlider.value;
        zoomValue.textContent = zoom + "%";
        compareContainer.style.transform = "scale(" + zoom / 100 + ")";
        compareContainer.style.transformOrigin = "center top";
        sideBySideContainer.style.transform = "scale(" + zoom / 100 + ")";
        sideBySideContainer.style.transformOrigin = "center top";
      }

      window.adjustZoom = function (delta) {
        const newValue = Math.max(50, Math.min(200, parseInt(zoomSlider.value) + delta));
        zoomSlider.value = newValue;
        updateZoom();
      };

      function swapImages() {
        const temp = beforeSrc;
        beforeSrc = afterSrc;
        afterSrc = temp;

        // Update previews
        const beforePreview = beforeZone.querySelector(".preview");
        const afterPreview = afterZone.querySelector(".preview");
        if (beforePreview && afterPreview) {
          beforePreview.src = beforeSrc;
          afterPreview.src = afterSrc;
        }

        updateCompare();
      }

      function resetAll() {
        beforeSrc = null;
        afterSrc = null;

        [beforeZone, afterZone].forEach((zone) => {
          const preview = zone.querySelector(".preview");
          if (preview) preview.remove();
          const p = zone.querySelector("p");
          if (p) p.style.display = "";
          zone.classList.remove("has-image");
        });

        beforeInput.value = "";
        afterInput.value = "";
        sliderPosition = 50;
        zoomSlider.value = 100;
        opacitySlider.value = 50;

        updateCompare();
        updateZoom();
      }

      window.resetAll = resetAll;

      function downloadCompare() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const beforeImg = new Image();
        const afterImg = new Image();

        beforeImg.onload = () => {
          afterImg.onload = () => {
            const width = Math.max(beforeImg.width, afterImg.width);
            const height = Math.max(beforeImg.height, afterImg.height);

            if (currentMode === "side-by-side") {
              canvas.width = width * 2 + 4;
              canvas.height = height;

              ctx.fillStyle = "#333";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(beforeImg, 0, 0, width, height);
              ctx.drawImage(afterImg, width + 4, 0, width, height);
            } else if (currentMode === "blend") {
              canvas.width = width;
              canvas.height = height;

              ctx.drawImage(afterImg, 0, 0, width, height);
              ctx.globalAlpha = opacitySlider.value / 100;
              ctx.drawImage(beforeImg, 0, 0, width, height);
            } else {
              canvas.width = width;
              canvas.height = height;

              // Draw after image
              ctx.drawImage(afterImg, 0, 0, width, height);

              // Clip and draw before image
              ctx.save();
              ctx.beginPath();
              if (currentMode === "vertical") {
                ctx.rect(0, 0, (width * sliderPosition) / 100, height);
              } else {
                ctx.rect(0, 0, width, (height * sliderPosition) / 100);
              }
              ctx.clip();
              ctx.drawImage(beforeImg, 0, 0, width, height);
              ctx.restore();

              // Draw slider line
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.beginPath();
              if (currentMode === "vertical") {
                const x = (width * sliderPosition) / 100;
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
              } else {
                const y = (height * sliderPosition) / 100;
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
              }
              ctx.stroke();
            }

            // Add labels
            ctx.globalAlpha = 1;
            ctx.font = "bold 16px sans-serif";
            ctx.fillStyle = "rgba(0,0,0,0.7)";

            if (currentMode === "side-by-side") {
              ctx.fillRect(10, 10, 60, 24);
              ctx.fillRect(width + 14, 10, 50, 24);
              ctx.fillStyle = "white";
              ctx.fillText("Before", 16, 27);
              ctx.fillText("After", width + 20, 27);
            } else {
              ctx.fillRect(10, 10, 60, 24);
              ctx.fillRect(canvas.width - 60, 10, 50, 24);
              ctx.fillStyle = "white";
              ctx.fillText("Before", 16, 27);
              ctx.fillText("After", canvas.width - 54, 27);
            }

            const link = document.createElement("a");
            link.download = "compare_" + Date.now() + ".png";
            link.href = canvas.toDataURL("image/png");
            link.click();
          };
          afterImg.src = afterSrc;
        };
        beforeImg.src = beforeSrc;
      }

      // Initialize
      updateSlider();
    
