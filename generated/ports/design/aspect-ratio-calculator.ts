// @ts-nocheck
// Generated from tools/design/aspect-ratio-calculator.html
// Source SHA-256: 0322bc46ba3f9ed0a0ad63f11ff80b6468614313de0476ee000e9fa83ea20a27
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function gcd(a, b) {
        a = Math.abs(Math.round(a));
        b = Math.abs(Math.round(b));
        while (b) {
          [a, b] = [b, a % b];
        }
        return a;
      }

      function calculateRatio() {
        const width = parseInt(document.getElementById("width").value) || 1;
        const height = parseInt(document.getElementById("height").value) || 1;

        const g = gcd(width, height);
        const ratioW = width / g;
        const ratioH = height / g;
        const decimal = (width / height).toFixed(4);

        document.getElementById("ratio").textContent = `${ratioW}:${ratioH}`;
        document.getElementById("decimal").textContent = `比值: ${decimal}`;

        // Update preview
        const maxWidth = 200;
        const maxHeight = 150;
        let previewW, previewH;

        if (width / height > maxWidth / maxHeight) {
          previewW = maxWidth;
          previewH = (maxWidth * height) / width;
        } else {
          previewH = maxHeight;
          previewW = (maxHeight * width) / height;
        }

        const preview = document.getElementById("previewBox");
        preview.style.width = previewW + "px";
        preview.style.height = previewH + "px";
        preview.textContent = `${width}×${height}`;
      }

      function setPreset(w, h) {
        // Set to a common resolution with this ratio
        const resolutions = {
          "1:1": [1080, 1080],
          "4:3": [1600, 1200],
          "3:2": [1920, 1280],
          "16:9": [1920, 1080],
          "16:10": [1920, 1200],
          "21:9": [2560, 1080],
          "9:16": [1080, 1920],
          "2:3": [1280, 1920]
        };

        const key = `${w}:${h}`;
        if (resolutions[key]) {
          document.getElementById("width").value = resolutions[key][0];
          document.getElementById("height").value = resolutions[key][1];
        } else {
          document.getElementById("width").value = w * 100;
          document.getElementById("height").value = h * 100;
        }
        calculateRatio();
      }

      function convertSize(mode) {
        const width = parseInt(document.getElementById("width").value) || 1;
        const height = parseInt(document.getElementById("height").value) || 1;
        const ratio = width / height;

        let result = "";

        if (mode === "width") {
          const targetW = parseInt(document.getElementById("targetWidth").value);
          if (targetW) {
            const targetH = Math.round(targetW / ratio);
            result = `宽度 ${targetW}px 对应高度: ${targetH}px`;
            document.getElementById("targetHeight").value = "";
          }
        } else {
          const targetH = parseInt(document.getElementById("targetHeight").value);
          if (targetH) {
            const targetW = Math.round(targetH * ratio);
            result = `高度 ${targetH}px 对应宽度: ${targetW}px`;
            document.getElementById("targetWidth").value = "";
          }
        }

        document.getElementById("convertResult").textContent = result;
      }

      calculateRatio();

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
    
