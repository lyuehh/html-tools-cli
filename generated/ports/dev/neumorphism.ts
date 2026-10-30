// @ts-nocheck
// Generated from tools/dev/neumorphism.html
// Source SHA-256: 6cda456c0c313a55c7a6249f71d335fb7b00ebde3d595ab1811593c609b025bf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentShape = "flat";

      const colorPresets = [
        "#e0e5ec",
        "#f0f0f3",
        "#d1d9e6",
        "#c8d0e7",
        "#1a1a2e",
        "#16213e",
        "#0f3460",
        "#252525",
        "#f5e6ca",
        "#e8d5b5",
        "#c9b896",
        "#d4a574",
        "#b8d4e3",
        "#a8c5d6",
        "#7eb3c9",
        "#5a9bb8"
      ];

      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("themeIcon").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("themeIcon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      function initColorPresets() {
        const container = document.getElementById("colorPresets");
        colorPresets.forEach((color) => {
          const item = document.createElement("div");
          item.className = "preset-item";
          item.style.background = color;
          item.onclick = () => setColor(color);
          container.appendChild(item);
        });
      }

      window.setColor = function (color) {
        document.getElementById("bgColor").value = color;
        document.getElementById("bgColorText").value = color;
        updatePreview();
      };

      window.updateFromColorPicker = function () {
        const color = document.getElementById("bgColor").value;
        document.getElementById("bgColorText").value = color;
        updatePreview();
      };

      window.updateFromText = function () {
        const color = document.getElementById("bgColorText").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
          document.getElementById("bgColor").value = color;
          updatePreview();
        }
      };

      window.setShape = function (shape) {
        currentShape = shape;
        document.querySelectorAll(".shape-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.shape === shape);
        });
        updatePreview();
      };

      function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null;
      }

      function adjustBrightness(hex, percent) {
        const rgb = hexToRgb(hex);
        if (!rgb) return hex;

        const adjust = (value) => {
          const adjusted = Math.round(value + (255 - value) * (percent / 100));
          return Math.min(255, Math.max(0, adjusted));
        };

        if (percent > 0) {
          return `rgb(${adjust(rgb.r)}, ${adjust(rgb.g)}, ${adjust(rgb.b)})`;
        } else {
          const darken = (value) => Math.round(value * (1 + percent / 100));
          return `rgb(${Math.max(0, darken(rgb.r))}, ${Math.max(0, darken(rgb.g))}, ${Math.max(0, darken(rgb.b))})`;
        }
      }

      window.updatePreview = function () {
        const bgColor = document.getElementById("bgColor").value;
        const size = document.getElementById("size").value;
        const radius = document.getElementById("radius").value;
        const distance = document.getElementById("distance").value;
        const intensity = document.getElementById("intensity").value;
        const blur = document.getElementById("blur").value;

        // Update display values
        document.getElementById("sizeValue").textContent = size + "px";
        document.getElementById("radiusValue").textContent = radius + "px";
        document.getElementById("distanceValue").textContent = distance + "px";
        document.getElementById("intensityValue").textContent = intensity + "%";
        document.getElementById("blurValue").textContent = blur + "px";

        // Calculate shadow colors
        const lightColor = adjustBrightness(bgColor, intensity);
        const darkColor = adjustBrightness(bgColor, -intensity);

        // Build shadow based on shape
        let boxShadow, background;
        const d = parseInt(distance);
        const b = parseInt(blur);

        switch (currentShape) {
          case "flat":
            boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
            background = bgColor;
            break;
          case "concave":
            boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
            background = `linear-gradient(145deg, ${adjustBrightness(bgColor, -5)}, ${adjustBrightness(bgColor, 5)})`;
            break;
          case "convex":
            boxShadow = `${d}px ${d}px ${b}px ${darkColor}, -${d}px -${d}px ${b}px ${lightColor}`;
            background = `linear-gradient(145deg, ${adjustBrightness(bgColor, 5)}, ${adjustBrightness(bgColor, -5)})`;
            break;
          case "pressed":
            boxShadow = `inset ${d}px ${d}px ${b}px ${darkColor}, inset -${d}px -${d}px ${b}px ${lightColor}`;
            background = bgColor;
            break;
        }

        // Apply styles
        const container = document.getElementById("previewContainer");
        const element = document.getElementById("neumorphicElement");

        container.style.background = bgColor;
        element.style.width = size + "px";
        element.style.height = size + "px";
        element.style.borderRadius = radius + "px";
        element.style.background = background;
        element.style.boxShadow = boxShadow;
        element.style.color = isLightColor(bgColor) ? "#333" : "#fff";

        // Update code
        updateCode(bgColor, size, radius, background, boxShadow);
      };

      function isLightColor(hex) {
        const rgb = hexToRgb(hex);
        if (!rgb) return true;
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness > 128;
      }

      function updateCode(bgColor, size, radius, background, boxShadow) {
        const code = `.neumorphic {
    width: ${size}px;
    height: ${size}px;
    border-radius: ${radius}px;
    background: ${background};
    box-shadow: ${boxShadow};
}

/* 父容器背景色 */
.container {
    background: ${bgColor};
}`;

        document.getElementById("codeContent").textContent = code;
      }

      window.copyCode = function () {
        const code = document.getElementById("codeContent").textContent;
        navigator.clipboard.writeText(code).then(() => {
          showToast();
        });
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      initTheme();
      initColorPresets();
      updatePreview();
    
