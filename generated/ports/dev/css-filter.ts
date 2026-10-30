// @ts-nocheck
// Generated from tools/dev/css-filter.html
// Source SHA-256: 886d55c793a4b53a9fa1f50ac00828c8d23e13a09c91438c2d58d8f9f64aede3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const presets = {
        vintage: {
          blur: 0,
          brightness: 110,
          contrast: 85,
          grayscale: 20,
          hueRotate: 0,
          invert: 0,
          opacity: 100,
          saturate: 80,
          sepia: 30
        },
        noir: {
          blur: 0,
          brightness: 100,
          contrast: 120,
          grayscale: 100,
          hueRotate: 0,
          invert: 0,
          opacity: 100,
          saturate: 0,
          sepia: 0
        },
        warm: {
          blur: 0,
          brightness: 105,
          contrast: 100,
          grayscale: 0,
          hueRotate: 20,
          invert: 0,
          opacity: 100,
          saturate: 120,
          sepia: 20
        },
        cold: {
          blur: 0,
          brightness: 100,
          contrast: 100,
          grayscale: 0,
          hueRotate: 180,
          invert: 0,
          opacity: 100,
          saturate: 80,
          sepia: 0
        },
        dramatic: {
          blur: 0,
          brightness: 90,
          contrast: 150,
          grayscale: 0,
          hueRotate: 0,
          invert: 0,
          opacity: 100,
          saturate: 130,
          sepia: 0
        },
        fade: {
          blur: 0,
          brightness: 120,
          contrast: 80,
          grayscale: 0,
          hueRotate: 0,
          invert: 0,
          opacity: 90,
          saturate: 70,
          sepia: 10
        },
        vivid: {
          blur: 0,
          brightness: 110,
          contrast: 120,
          grayscale: 0,
          hueRotate: 0,
          invert: 0,
          opacity: 100,
          saturate: 180,
          sepia: 0
        },
        dreamy: {
          blur: 2,
          brightness: 110,
          contrast: 90,
          grayscale: 0,
          hueRotate: 0,
          invert: 0,
          opacity: 100,
          saturate: 90,
          sepia: 15
        }
      };

      const defaults = {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
        shadowX: 0,
        shadowY: 0,
        shadowBlur: 0,
        shadowColor: "#000000"
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function updateFilter() {
        const blur = document.getElementById("blur").value;
        const brightness = document.getElementById("brightness").value;
        const contrast = document.getElementById("contrast").value;
        const grayscale = document.getElementById("grayscale").value;
        const hueRotate = document.getElementById("hueRotate").value;
        const invert = document.getElementById("invert").value;
        const opacity = document.getElementById("opacity").value;
        const saturate = document.getElementById("saturate").value;
        const sepia = document.getElementById("sepia").value;
        const shadowX = document.getElementById("shadowX").value;
        const shadowY = document.getElementById("shadowY").value;
        const shadowBlur = document.getElementById("shadowBlur").value;
        const shadowColor = document.getElementById("shadowColor").value;

        // Update labels
        document.getElementById("blurValue").textContent = blur + "px";
        document.getElementById("brightnessValue").textContent = brightness + "%";
        document.getElementById("contrastValue").textContent = contrast + "%";
        document.getElementById("grayscaleValue").textContent = grayscale + "%";
        document.getElementById("hueRotateValue").textContent = hueRotate + "deg";
        document.getElementById("invertValue").textContent = invert + "%";
        document.getElementById("opacityValue").textContent = opacity + "%";
        document.getElementById("saturateValue").textContent = saturate + "%";
        document.getElementById("sepiaValue").textContent = sepia + "%";

        // Build filter string
        const filters = [];
        if (blur != 0) filters.push(`blur(${blur}px)`);
        if (brightness != 100) filters.push(`brightness(${brightness}%)`);
        if (contrast != 100) filters.push(`contrast(${contrast}%)`);
        if (grayscale != 0) filters.push(`grayscale(${grayscale}%)`);
        if (hueRotate != 0) filters.push(`hue-rotate(${hueRotate}deg)`);
        if (invert != 0) filters.push(`invert(${invert}%)`);
        if (opacity != 100) filters.push(`opacity(${opacity}%)`);
        if (saturate != 100) filters.push(`saturate(${saturate}%)`);
        if (sepia != 0) filters.push(`sepia(${sepia}%)`);
        if (shadowX != 0 || shadowY != 0 || shadowBlur != 0) {
          filters.push(`drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor})`);
        }

        const filterValue = filters.length > 0 ? filters.join(" ") : "none";

        // Apply to preview elements
        document.getElementById("previewImage").style.filter = filterValue;
        document.getElementById("previewText").style.filter = filterValue;
        document.getElementById("previewBox").style.filter = filterValue;
        document.getElementById("filteredImage").style.filter = filterValue;

        // Update code output
        document.getElementById("codeOutput").textContent = `filter: ${filterValue};`;
      }

      window.resetAll = function () {
        Object.keys(defaults).forEach((key) => {
          const el = document.getElementById(key);
          if (el) el.value = defaults[key];
        });
        updateFilter();
      };

      window.applyPreset = function (name) {
        const preset = presets[name];
        Object.keys(preset).forEach((key) => {
          const el = document.getElementById(key);
          if (el) el.value = preset[key];
        });
        // Reset shadow
        document.getElementById("shadowX").value = 0;
        document.getElementById("shadowY").value = 0;
        document.getElementById("shadowBlur").value = 0;
        updateFilter();
      };

      function setPreviewType(type) {
        document.getElementById("previewImage").style.display = type === "image" ? "block" : "none";
        document.getElementById("previewText").style.display = type === "text" ? "block" : "none";
        document.getElementById("previewBox").style.display = type === "box" ? "block" : "none";

        document
          .querySelectorAll(".preview-tabs button")
          .forEach((btn) => btn.classList.remove("active"));
        document
          .querySelector(`.preview-tabs button[onclick="setPreviewType('${type}')"]`)
          .classList.add("active");
      }

      window.setBg = function (className) {
        const container = document.getElementById("previewContainer");
        container.className = "preview-container " + className;
      };

      function handleUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const src = e.target.result;
            document.getElementById("previewImage").src = src;
            document.getElementById("originalImage").src = src;
            document.getElementById("filteredImage").src = src;
            setPreviewType("image");
          };
          reader.readAsDataURL(file);
        }
      }

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code);
        showToast("已复制到剪贴板");
      };

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Drag and drop
      const uploadZone = document.querySelector(".upload-zone");
      uploadZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "var(--primary-color)";
      });
      uploadZone.addEventListener("dragleave", () => {
        uploadZone.style.borderColor = "";
      });
      uploadZone.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = "";
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          document.getElementById("fileInput").files = e.dataTransfer.files;
          handleUpload({ target: { files: [file] } });
        }
      });

      // Init
      updateFilter();
    
