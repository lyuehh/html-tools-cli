// @ts-nocheck
// Generated from tools/media/image-filter.html
// Source SHA-256: 2eb62b69ecf7a262bf4520ce7e3ce6197114eff6eefd8c8806e201f44131074a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let originalImage = null;
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
        handleFile(e.dataTransfer.files[0]);
      });

      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          applyPreset(btn.dataset.filter);
        });
      });

      function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          originalImage = new Image();
          originalImage.onload = () => {
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            applyFilter();
            document.getElementById("editSection").classList.remove("hidden");
          };
          originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      const presets = {
        none: { brightness: 100, contrast: 100, saturate: 100, hue: 0, blur: 0, opacity: 100 },
        grayscale: { brightness: 100, contrast: 100, saturate: 0, hue: 0, blur: 0, opacity: 100 },
        sepia: { brightness: 100, contrast: 90, saturate: 50, hue: 30, blur: 0, opacity: 100 },
        warm: { brightness: 105, contrast: 105, saturate: 110, hue: 10, blur: 0, opacity: 100 },
        cold: { brightness: 100, contrast: 105, saturate: 90, hue: 200, blur: 0, opacity: 100 },
        vintage: { brightness: 110, contrast: 85, saturate: 70, hue: 20, blur: 0, opacity: 95 },
        dramatic: { brightness: 90, contrast: 150, saturate: 120, hue: 0, blur: 0, opacity: 100 },
        fade: { brightness: 110, contrast: 80, saturate: 80, hue: 0, blur: 0, opacity: 90 },
        vivid: { brightness: 105, contrast: 120, saturate: 150, hue: 0, blur: 0, opacity: 100 },
        invert: { brightness: 100, contrast: 100, saturate: 100, hue: 180, blur: 0, opacity: 100 }
      };

      window.applyPreset = function (name) {
        const p = presets[name];
        document.getElementById("brightness").value = p.brightness;
        document.getElementById("contrast").value = p.contrast;
        document.getElementById("saturate").value = p.saturate;
        document.getElementById("hue").value = p.hue;
        document.getElementById("blur").value = p.blur;
        document.getElementById("opacity").value = p.opacity;
        applyFilter();
      };

      function applyFilter() {
        if (!originalImage) return;

        const brightness = document.getElementById("brightness").value;
        const contrast = document.getElementById("contrast").value;
        const saturate = document.getElementById("saturate").value;
        const hue = document.getElementById("hue").value;
        const blur = document.getElementById("blur").value;
        const opacity = document.getElementById("opacity").value;

        document.getElementById("brightnessValue").textContent = brightness + "%";
        document.getElementById("contrastValue").textContent = contrast + "%";
        document.getElementById("saturateValue").textContent = saturate + "%";
        document.getElementById("hueValue").textContent = hue + "°";
        document.getElementById("blurValue").textContent = blur + "px";
        document.getElementById("opacityValue").textContent = opacity + "%";

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hue}deg) blur(${blur}px) opacity(${opacity}%)`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0);
      }

      window.resetFilters = function () {
        applyPreset("none");
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        document.querySelector('[data-filter="none"]').classList.add("active");
      };

      window.download = function () {
        const link = document.createElement("a");
        link.download = "filtered_image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
