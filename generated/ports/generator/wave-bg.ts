// @ts-nocheck
// Generated from tools/generator/wave-bg.html
// Source SHA-256: 6cbfa35f2f6dc6e9cfb90d031fd531aaa5958eb519c2b2881f108ee4290dface
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      const themeToggle = document.getElementById("themeToggle");
      themeToggle.addEventListener("click", () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
      });

      // Elements
      const colorStart = document.getElementById("colorStart");
      const colorStartText = document.getElementById("colorStartText");
      const colorEnd = document.getElementById("colorEnd");
      const colorEndText = document.getElementById("colorEndText");
      const bgColor = document.getElementById("bgColor");
      const bgColorText = document.getElementById("bgColorText");
      const amplitude = document.getElementById("amplitude");
      const frequency = document.getElementById("frequency");
      const layers = document.getElementById("layers");
      const waveHeight = document.getElementById("waveHeight");
      const wavePosition = document.getElementById("wavePosition");

      // Sync color inputs
      function syncColorInputs(colorInput, textInput) {
        colorInput.addEventListener("input", () => {
          textInput.value = colorInput.value;
          generateWave();
        });
        textInput.addEventListener("input", () => {
          if (/^#[0-9A-Fa-f]{6}$/.test(textInput.value)) {
            colorInput.value = textInput.value;
            generateWave();
          }
        });
      }

      syncColorInputs(colorStart, colorStartText);
      syncColorInputs(colorEnd, colorEndText);
      syncColorInputs(bgColor, bgColorText);

      // Update range values
      const rangeInputs = [
        { input: amplitude, display: "amplitudeValue" },
        { input: frequency, display: "frequencyValue" },
        { input: layers, display: "layersValue" },
        { input: waveHeight, display: "heightValue" }
      ];

      rangeInputs.forEach(({ input, display }) => {
        input.addEventListener("input", () => {
          document.getElementById(display).textContent = input.value;
          generateWave();
        });
      });

      wavePosition.addEventListener("change", generateWave);

      // Generate wave path
      function generateWavePath(width, height, amp, freq, offset, position) {
        const points = [];
        const baseY =
          position === "bottom" ? height - parseInt(waveHeight.value) : parseInt(waveHeight.value);

        for (let x = 0; x <= width; x += 10) {
          const y = baseY + Math.sin((x / width) * Math.PI * freq + offset) * amp;
          points.push(`${x},${y}`);
        }

        if (position === "bottom") {
          return (
            `M0,${height} L0,${points[0].split(",")[1]} ` +
            points.map((p) => `L${p}`).join(" ") +
            ` L${width},${height} Z`
          );
        } else {
          return (
            `M0,0 L0,${points[0].split(",")[1]} ` +
            points.map((p) => `L${p}`).join(" ") +
            ` L${width},0 Z`
          );
        }
      }

      // Generate wave
      function generateWave() {
        const svg = document.getElementById("wavePreview");
        const width = 1200;
        const height = 400;
        const amp = parseInt(amplitude.value);
        const freq = parseFloat(frequency.value);
        const layerCount = parseInt(layers.value);
        const position = wavePosition.value;

        // Update gradient
        document.getElementById("gradientStart").setAttribute("stop-color", colorStart.value);
        document.getElementById("gradientEnd").setAttribute("stop-color", colorEnd.value);

        // Update background
        document.getElementById("bgRect").setAttribute("fill", bgColor.value);

        // Remove existing wave paths
        const existingWaves = svg.querySelectorAll(".wave-path");
        existingWaves.forEach((w) => w.remove());

        // Generate wave layers
        for (let i = 0; i < layerCount; i++) {
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.classList.add("wave-path");
          const opacity = 1 - i * 0.2;
          const layerAmp = amp * (1 - i * 0.15);
          const offset = i * 0.5;

          path.setAttribute("d", generateWavePath(width, height, layerAmp, freq, offset, position));
          path.setAttribute("fill", "url(#waveGradient)");
          path.setAttribute("opacity", opacity);
          svg.appendChild(path);
        }

        // Remove old wave paths
        document.getElementById("wave1").setAttribute("d", "");
        document.getElementById("wave2").setAttribute("d", "");
        document.getElementById("wave3").setAttribute("d", "");
      }

      // Random generation
      document.getElementById("randomBtn").addEventListener("click", () => {
        const randomColor = () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");

        colorStart.value = randomColor();
        colorStartText.value = colorStart.value;
        colorEnd.value = randomColor();
        colorEndText.value = colorEnd.value;

        amplitude.value = Math.floor(Math.random() * 100) + 30;
        document.getElementById("amplitudeValue").textContent = amplitude.value;

        frequency.value = (Math.random() * 5 + 1).toFixed(1);
        document.getElementById("frequencyValue").textContent = frequency.value;

        generateWave();
      });

      // Generate button
      document.getElementById("generateBtn").addEventListener("click", generateWave);

      // Download SVG
      document.getElementById("downloadSvg").addEventListener("click", () => {
        const svg = document.getElementById("wavePreview");
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wave-background.svg";
        a.click();
        URL.revokeObjectURL(url);
      });

      // Download PNG
      document.getElementById("downloadPng").addEventListener("click", () => {
        const svg = document.getElementById("wavePreview");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 400;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = "wave-background.png";
          a.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      });

      // Copy SVG code
      document.getElementById("copyCode").addEventListener("click", () => {
        const svg = document.getElementById("wavePreview");
        const svgData = new XMLSerializer().serializeToString(svg);
        navigator.clipboard.writeText(svgData).then(() => {
          alert("SVG 代码已复制到剪贴板");
        });
      });

      // Initial generation
      generateWave();

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
    
