// @ts-nocheck
// Generated from tools/dev/css-filter-generator.html
// Source SHA-256: abddf9fb266b780beee7641dff5ac87514695d0864db1e640dcdde3b75cb0aee
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const filters = {
        brightness: { default: 100, unit: "%", css: "brightness" },
        contrast: { default: 100, unit: "%", css: "contrast" },
        saturate: { default: 100, unit: "%", css: "saturate" },
        grayscale: { default: 0, unit: "%", css: "grayscale" },
        sepia: { default: 0, unit: "%", css: "sepia" },
        hueRotate: { default: 0, unit: "deg", css: "hue-rotate" },
        invert: { default: 0, unit: "%", css: "invert" },
        blur: { default: 0, unit: "px", css: "blur" },
        opacity: { default: 100, unit: "%", css: "opacity" }
      };

      const presets = {
        none: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 0,
          sepia: 0,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        grayscale: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 100,
          sepia: 0,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        sepia: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 0,
          sepia: 100,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        vintage: {
          brightness: 110,
          contrast: 85,
          saturate: 75,
          grayscale: 0,
          sepia: 30,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        cold: {
          brightness: 100,
          contrast: 100,
          saturate: 80,
          grayscale: 0,
          sepia: 0,
          hueRotate: 180,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        warm: {
          brightness: 105,
          contrast: 100,
          saturate: 120,
          grayscale: 0,
          sepia: 20,
          hueRotate: 350,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        dramatic: {
          brightness: 90,
          contrast: 150,
          saturate: 130,
          grayscale: 0,
          sepia: 0,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        blur: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 0,
          sepia: 0,
          hueRotate: 0,
          invert: 0,
          blur: 5,
          opacity: 100
        },
        sharp: {
          brightness: 100,
          contrast: 130,
          saturate: 110,
          grayscale: 0,
          sepia: 0,
          hueRotate: 0,
          invert: 0,
          blur: 0,
          opacity: 100
        },
        invert: {
          brightness: 100,
          contrast: 100,
          saturate: 100,
          grayscale: 0,
          sepia: 0,
          hueRotate: 0,
          invert: 100,
          blur: 0,
          opacity: 100
        }
      };

      function updateFilter() {
        const filterParts = [];

        Object.keys(filters).forEach((key) => {
          const input = document.getElementById(key);
          const value = parseFloat(input.value);
          const config = filters[key];
          const valueDisplay = document.getElementById(key + "Value");

          valueDisplay.textContent = value + config.unit;

          if (value !== config.default) {
            if (config.unit === "%") {
              filterParts.push(config.css + "(" + value + "%)");
            } else {
              filterParts.push(config.css + "(" + value + config.unit + ")");
            }
          }
        });

        // 处理阴影
        const shadowEnabled = document.getElementById("shadowEnabled").checked;
        if (shadowEnabled) {
          const color = document.getElementById("shadowColor").value;
          const x = document.getElementById("shadowX").value;
          const y = document.getElementById("shadowY").value;
          const blur = document.getElementById("shadowBlur").value;
          filterParts.push("drop-shadow(" + x + "px " + y + "px " + blur + "px " + color + ")");
          document.getElementById("shadowValue").textContent = x + "px " + y + "px " + blur + "px";
        } else {
          document.getElementById("shadowValue").textContent = "off";
        }

        const filterValue = filterParts.length > 0 ? filterParts.join(" ") : "none";

        document.getElementById("previewImage").style.filter = filterValue;
        document.getElementById("cssOutput").textContent = "filter: " + filterValue + ";";
      }

      window.applyPreset = function (name) {
        const preset = presets[name];
        if (!preset) return;

        Object.keys(preset).forEach((key) => {
          const input = document.getElementById(key);
          if (input) input.value = preset[key];
        });

        document.getElementById("shadowEnabled").checked = false;
        updateFilter();
      };

      window.resetFilters = function () {
        applyPreset("none");
      };

      window.randomFilters = function () {
        document.getElementById("brightness").value = Math.floor(Math.random() * 150) + 50;
        document.getElementById("contrast").value = Math.floor(Math.random() * 150) + 50;
        document.getElementById("saturate").value = Math.floor(Math.random() * 200);
        document.getElementById("grayscale").value = Math.floor(Math.random() * 50);
        document.getElementById("sepia").value = Math.floor(Math.random() * 50);
        document.getElementById("hueRotate").value = Math.floor(Math.random() * 360);
        document.getElementById("invert").value =
          Math.random() > 0.8 ? Math.floor(Math.random() * 100) : 0;
        document.getElementById("blur").value =
          Math.random() > 0.7 ? (Math.random() * 5).toFixed(1) : 0;
        document.getElementById("opacity").value = Math.floor(Math.random() * 30) + 70;
        updateFilter();
      };

      window.loadImage = function (url) {
        if (url) {
          document.getElementById("previewImage").src = url;
        }
      };

      window.loadLocalImage = function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            document.getElementById("previewImage").src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      };

      window.toggleCompare = function () {
        const container = document.getElementById("compareContainer");
        const isCompare = document.getElementById("compareMode").checked;

        if (isCompare) {
          const currentSrc = document.getElementById("previewImage").src;
          const currentFilter = document.getElementById("previewImage").style.filter;

          container.innerHTML = "";
          const grid = document.createElement("div");
          grid.className = "compare-container";

          // 原图
          const origDiv = document.createElement("div");
          const origPreview = document.createElement("div");
          origPreview.className = "preview-container";
          const origImg = document.createElement("img");
          origImg.className = "preview-image";
          origImg.src = currentSrc;
          origImg.style.filter = "none";
          origPreview.appendChild(origImg);
          const origLabel = document.createElement("div");
          origLabel.className = "compare-label";
          origLabel.textContent = "原图";
          origDiv.appendChild(origPreview);
          origDiv.appendChild(origLabel);

          // 效果图
          const effectDiv = document.createElement("div");
          const effectPreview = document.createElement("div");
          effectPreview.className = "preview-container";
          const effectImg = document.createElement("img");
          effectImg.id = "previewImage";
          effectImg.className = "preview-image";
          effectImg.src = currentSrc;
          effectImg.style.filter = currentFilter;
          effectPreview.appendChild(effectImg);
          const effectLabel = document.createElement("div");
          effectLabel.className = "compare-label";
          effectLabel.textContent = "效果";
          effectDiv.appendChild(effectPreview);
          effectDiv.appendChild(effectLabel);

          grid.appendChild(origDiv);
          grid.appendChild(effectDiv);
          container.appendChild(grid);
        } else {
          const currentSrc = document.getElementById("previewImage").src;
          const currentFilter = document.getElementById("previewImage").style.filter;

          container.innerHTML = "";
          const preview = document.createElement("div");
          preview.className = "preview-container";
          const img = document.createElement("img");
          img.id = "previewImage";
          img.className = "preview-image";
          img.src = currentSrc;
          img.style.filter = currentFilter;
          preview.appendChild(img);
          container.appendChild(preview);
        }
      };

      window.copyCSS = function () {
        const css = document.getElementById("cssOutput").textContent;
        navigator.clipboard.writeText(css).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = "复制"), 1500);
        });
      };

      // 拖放支持
      const imageUrl = document.getElementById("imageUrl");
      imageUrl.addEventListener("dragover", (e) => {
        e.preventDefault();
        imageUrl.style.borderColor = "var(--pico-primary)";
      });
      imageUrl.addEventListener("dragleave", () => {
        imageUrl.style.borderColor = "";
      });
      imageUrl.addEventListener("drop", (e) => {
        e.preventDefault();
        imageUrl.style.borderColor = "";
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            document.getElementById("previewImage").src = evt.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });

      // 初始化
      updateFilter();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
