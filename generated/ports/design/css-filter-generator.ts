// @ts-nocheck
// Generated from tools/design/css-filter-generator.html
// Source SHA-256: ee8f15f43369308417f19e7f37590243fefa548fee79f6c58dd24f7d622938f6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const filteredImg = document.getElementById("filteredImg");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");

      const filters = [
        "blur",
        "brightness",
        "contrast",
        "grayscale",
        "hueRotate",
        "invert",
        "opacity",
        "saturate",
        "sepia"
      ];
      const defaults = {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0
      };

      function updateFilter() {
        const values = {};
        filters.forEach((f) => (values[f] = document.getElementById(f).value));

        document.getElementById("blurVal").textContent = values.blur + "px";
        document.getElementById("brightnessVal").textContent = values.brightness + "%";
        document.getElementById("contrastVal").textContent = values.contrast + "%";
        document.getElementById("grayscaleVal").textContent = values.grayscale + "%";
        document.getElementById("hueRotateVal").textContent = values.hueRotate + "deg";
        document.getElementById("invertVal").textContent = values.invert + "%";
        document.getElementById("opacityVal").textContent = values.opacity + "%";
        document.getElementById("saturateVal").textContent = values.saturate + "%";
        document.getElementById("sepiaVal").textContent = values.sepia + "%";

        const filterParts = [];
        if (values.blur != 0) filterParts.push(`blur(${values.blur}px)`);
        if (values.brightness != 100) filterParts.push(`brightness(${values.brightness}%)`);
        if (values.contrast != 100) filterParts.push(`contrast(${values.contrast}%)`);
        if (values.grayscale != 0) filterParts.push(`grayscale(${values.grayscale}%)`);
        if (values.hueRotate != 0) filterParts.push(`hue-rotate(${values.hueRotate}deg)`);
        if (values.invert != 0) filterParts.push(`invert(${values.invert}%)`);
        if (values.opacity != 100) filterParts.push(`opacity(${values.opacity}%)`);
        if (values.saturate != 100) filterParts.push(`saturate(${values.saturate}%)`);
        if (values.sepia != 0) filterParts.push(`sepia(${values.sepia}%)`);

        const filterCSS = filterParts.length ? filterParts.join(" ") : "none";
        filteredImg.style.filter = filterCSS;
        outputEl.value = `filter: ${filterCSS};`;
      }

      function applyPreset(name) {
        const presets = {
          none: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            grayscale: 0,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 100,
            sepia: 0
          },
          grayscale: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            grayscale: 100,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 100,
            sepia: 0
          },
          sepia: {
            blur: 0,
            brightness: 100,
            contrast: 100,
            grayscale: 0,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 100,
            sepia: 100
          },
          vintage: {
            blur: 0,
            brightness: 110,
            contrast: 90,
            grayscale: 20,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 80,
            sepia: 30
          },
          vivid: {
            blur: 0,
            brightness: 105,
            contrast: 120,
            grayscale: 0,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 150,
            sepia: 0
          },
          dramatic: {
            blur: 0,
            brightness: 90,
            contrast: 150,
            grayscale: 10,
            hueRotate: 0,
            invert: 0,
            opacity: 100,
            saturate: 120,
            sepia: 0
          }
        };
        const p = presets[name];
        filters.forEach((f) => (document.getElementById(f).value = p[f]));
        updateFilter();
      }

      function resetFilter() {
        applyPreset("none");
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      updateFilter();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
