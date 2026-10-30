// @ts-nocheck
// Generated from tools/calculator/aspect-ratio-calculator.html
// Source SHA-256: bf7dce39ef8a4180d6aa435422fb4819cba24c298e1835ad3435fb72a72c689d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      function gcd(a, b) {
        a = Math.abs(Math.round(a));
        b = Math.abs(Math.round(b));
        while (b) {
          [a, b] = [b, a % b];
        }
        return a;
      }

      window.calculate = function () {
        const width = parseFloat(document.getElementById("width").value) || 1;
        const height = parseFloat(document.getElementById("height").value) || 1;

        const divisor = gcd(width, height);
        const ratioW = width / divisor;
        const ratioH = height / divisor;
        const decimal = (width / height).toFixed(3);

        document.getElementById("ratioValue").textContent = `${ratioW}:${ratioH}`;
        document.getElementById("ratioDecimal").textContent = `≈ ${decimal} (宽÷高)`;

        // Update preview
        const maxSize = 160;
        let previewW, previewH;
        if (width >= height) {
          previewW = maxSize;
          previewH = (maxSize * height) / width;
        } else {
          previewH = maxSize;
          previewW = (maxSize * width) / height;
        }
        const preview = document.getElementById("previewBox");
        preview.style.width = previewW + "px";
        preview.style.height = previewH + "px";
        preview.textContent = `${ratioW}:${ratioH}`;

        // Update calculations
        calcFromWidth();
        calcFromHeight();
      };

      window.setPreset = function (w, h) {
        document.getElementById("width").value = w;
        document.getElementById("height").value = h;
        calculate();
      };

      window.setRatio = function (w, h) {
        const baseWidth = 1920;
        const baseHeight = Math.round((baseWidth * h) / w);
        setPreset(baseWidth, baseHeight);
      };

      function calcFromWidth() {
        const width = parseFloat(document.getElementById("width").value) || 1;
        const height = parseFloat(document.getElementById("height").value) || 1;
        const calcWidth = parseFloat(document.getElementById("calcWidth").value) || 0;
        const result = Math.round((calcWidth * height) / width);
        document.getElementById("calcHeightResult").textContent = result;
      }

      function calcFromHeight() {
        const width = parseFloat(document.getElementById("width").value) || 1;
        const height = parseFloat(document.getElementById("height").value) || 1;
        const calcHeight = parseFloat(document.getElementById("calcHeight").value) || 0;
        const result = Math.round((calcHeight * width) / height);
        document.getElementById("calcWidthResult").textContent = result;
      }

      calculate();
    
