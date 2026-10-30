// @ts-nocheck
// Generated from tools/generator/noise-texture.html
// Source SHA-256: cdbb3b1ead871c5dafc47e3d5287b907a27205f5b1b058d2aa7927fcf2abf80e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
      });

      // Elements
      const canvas = document.getElementById("noiseCanvas");
      const ctx = canvas.getContext("2d");
      const fgColor = document.getElementById("fgColor");
      const fgColorText = document.getElementById("fgColorText");
      const bgColor = document.getElementById("bgColor");
      const bgColorText = document.getElementById("bgColorText");
      const intensity = document.getElementById("intensity");
      const density = document.getElementById("density");
      const grainSize = document.getElementById("grainSize");
      const scale = document.getElementById("scale");
      const monochrome = document.getElementById("monochrome");
      const seamless = document.getElementById("seamless");

      let currentNoiseType = "random";

      // Noise type selection
      document.querySelectorAll(".noise-type").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".noise-type").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentNoiseType = btn.dataset.type;
          generateNoise();
        });
      });

      // Size presets
      document.querySelectorAll(".size-preset").forEach((btn) => {
        btn.addEventListener("click", () => {
          const size = parseInt(btn.dataset.size);
          canvas.width = size;
          canvas.height = size;
          generateNoise();
        });
      });

      // Sync color inputs
      function syncColorInputs(colorInput, textInput) {
        colorInput.addEventListener("input", () => {
          textInput.value = colorInput.value;
          generateNoise();
        });
        textInput.addEventListener("input", () => {
          if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
            colorInput.value = textInput.value;
            generateNoise();
          }
        });
      }

      syncColorInputs(fgColor, fgColorText);
      syncColorInputs(bgColor, bgColorText);

      // Update range values
      const rangeInputs = [
        { input: intensity, display: "intensityValue" },
        { input: density, display: "densityValue" },
        { input: grainSize, display: "grainSizeValue" },
        { input: scale, display: "scaleValue" }
      ];

      rangeInputs.forEach(({ input, display }) => {
        input.addEventListener("input", () => {
          document.getElementById(display).textContent = input.value;
          generateNoise();
        });
      });

      monochrome.addEventListener("change", generateNoise);
      seamless.addEventListener("change", generateNoise);

      // Parse color
      function parseColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      // Perlin noise implementation
      function createPerlinNoise() {
        const perm = [];
        for (let i = 0; i < 256; i++) perm[i] = i;
        for (let i = 255; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [perm[i], perm[j]] = [perm[j], perm[i]];
        }
        for (let i = 0; i < 256; i++) perm[256 + i] = perm[i];

        function fade(t) {
          return t * t * t * (t * (t * 6 - 15) + 10);
        }
        function lerp(a, b, t) {
          return a + t * (b - a);
        }
        function grad(hash, x, y) {
          const h = hash & 3;
          const u = h < 2 ? x : y;
          const v = h < 2 ? y : x;
          return (h & 1 ? -u : u) + (h & 2 ? -v : v);
        }

        return function (x, y) {
          const X = Math.floor(x) & 255;
          const Y = Math.floor(y) & 255;
          x -= Math.floor(x);
          y -= Math.floor(y);
          const u = fade(x);
          const v = fade(y);
          const A = perm[X] + Y;
          const B = perm[X + 1] + Y;
          return lerp(
            lerp(grad(perm[A], x, y), grad(perm[B], x - 1, y), u),
            lerp(grad(perm[A + 1], x, y - 1), grad(perm[B + 1], x - 1, y - 1), u),
            v
          );
        };
      }

      // Generate noise
      function generateNoise() {
        const width = canvas.width;
        const height = canvas.height;
        const intensityVal = parseInt(intensity.value) / 100;
        const densityVal = parseInt(density.value) / 100;
        const grainSizeVal = parseInt(grainSize.value);
        const scaleVal = parseInt(scale.value);
        const isMonochrome = monochrome.checked;
        const isSeamless = seamless.checked;

        const fg = parseColor(fgColor.value);
        const bg = parseColor(bgColor.value);

        const imageData = ctx.createImageData(width, height);
        const data = imageData.data;

        const perlin = createPerlinNoise();

        for (let y = 0; y < height; y += grainSizeVal) {
          for (let x = 0; x < width; x += grainSizeVal) {
            let noiseValue = 0;

            // Calculate seamless coordinates if needed
            let nx = x / scaleVal;
            let ny = y / scaleVal;

            if (isSeamless) {
              const sx = x / width;
              const sy = y / height;
              nx = (Math.cos(sx * Math.PI * 2) * scaleVal) / 100;
              ny = (Math.sin(sy * Math.PI * 2) * scaleVal) / 100;
            }

            switch (currentNoiseType) {
              case "random":
                noiseValue = Math.random() < densityVal ? Math.random() : 0;
                break;
              case "perlin":
                noiseValue = (perlin(nx, ny) + 1) / 2;
                break;
              case "grain":
                const base = Math.random();
                noiseValue = base * base * densityVal;
                break;
              case "static":
                noiseValue = Math.random() < densityVal ? (Math.random() > 0.5 ? 1 : 0) : 0.5;
                break;
              case "clouds":
                let cloud = 0;
                let amp = 1;
                let freq = 1;
                for (let i = 0; i < 4; i++) {
                  cloud += perlin(nx * freq, ny * freq) * amp;
                  amp *= 0.5;
                  freq *= 2;
                }
                noiseValue = (cloud + 1) / 2;
                break;
              case "marble":
                const marble = perlin(nx, ny) * 10;
                noiseValue = (Math.sin(nx + marble) + 1) / 2;
                break;
            }

            noiseValue = Math.max(0, Math.min(1, noiseValue * intensityVal));

            let r, g, b;
            if (isMonochrome) {
              r = Math.round(bg.r + (fg.r - bg.r) * noiseValue);
              g = Math.round(bg.g + (fg.g - bg.g) * noiseValue);
              b = Math.round(bg.b + (fg.b - bg.b) * noiseValue);
            } else {
              r = Math.round(Math.random() * 255 * noiseValue);
              g = Math.round(Math.random() * 255 * noiseValue);
              b = Math.round(Math.random() * 255 * noiseValue);
            }

            // Fill grain size area
            for (let dy = 0; dy < grainSizeVal && y + dy < height; dy++) {
              for (let dx = 0; dx < grainSizeVal && x + dx < width; dx++) {
                const idx = ((y + dy) * width + (x + dx)) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
                data[idx + 3] = 255;
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // Random generation
      document.getElementById("randomBtn").addEventListener("click", () => {
        const randomColor = () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        const noiseTypes = ["random", "perlin", "grain", "static", "clouds", "marble"];

        if (Math.random() > 0.5) {
          fgColor.value = randomColor();
          fgColorText.value = fgColor.value;
          bgColor.value = randomColor();
          bgColorText.value = bgColor.value;
        } else {
          fgColor.value = "#000000";
          fgColorText.value = fgColor.value;
          bgColor.value = "#ffffff";
          bgColorText.value = bgColor.value;
        }

        intensity.value = Math.floor(Math.random() * 80) + 20;
        document.getElementById("intensityValue").textContent = intensity.value;

        density.value = Math.floor(Math.random() * 80) + 20;
        document.getElementById("densityValue").textContent = density.value;

        scale.value = Math.floor(Math.random() * 150) + 20;
        document.getElementById("scaleValue").textContent = scale.value;

        currentNoiseType = noiseTypes[Math.floor(Math.random() * noiseTypes.length)];
        document.querySelectorAll(".noise-type").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.type === currentNoiseType);
        });

        generateNoise();
      });

      // Generate button
      document.getElementById("generateBtn").addEventListener("click", generateNoise);

      // Download PNG
      document.getElementById("downloadPng").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "noise-texture.png";
        a.click();
      });

      // Download JPG
      document.getElementById("downloadJpg").addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/jpeg", 0.9);
        a.download = "noise-texture.jpg";
        a.click();
      });

      // Initial generation
      generateNoise();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
