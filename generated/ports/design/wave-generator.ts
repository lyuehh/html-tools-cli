// @ts-nocheck
// Generated from tools/design/wave-generator.html
// Source SHA-256: ccd192b9234650b0b5083f72e560373df4f44dba314d755e9eb7c3ab6abe3b14
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const previewEl = document.getElementById("preview");
      const outputEl = document.getElementById("svgOutput");
      const statusEl = document.getElementById("status");

      function generateWavePath(width, height, waves, amplitude, direction) {
        const points = [];
        const segments = waves * 2;
        const segmentWidth = width / segments;

        for (let i = 0; i <= segments; i++) {
          const x = i * segmentWidth;
          const y = i % 2 === 0 ? height - amplitude : height - amplitude * 2;
          points.push({ x, y });
        }

        // 生成平滑曲线
        let path = `M 0 ${height}`;
        path += ` L 0 ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          const midX = (p0.x + p1.x) / 2;
          path += ` Q ${p0.x + segmentWidth / 4} ${p0.y} ${midX} ${(p0.y + p1.y) / 2}`;
        }

        path += ` L ${width} ${height}`;
        path += " Z";

        return path;
      }

      function updateWave() {
        const color = document.getElementById("waveColor").value;
        const bgColor = document.getElementById("bgColor").value;
        const height = parseInt(document.getElementById("height").value);
        const waves = parseInt(document.getElementById("waves").value);
        const amplitude = parseInt(document.getElementById("amplitude").value);
        const direction = document.getElementById("direction").value;

        document.getElementById("heightVal").textContent = height;
        document.getElementById("wavesVal").textContent = waves;
        document.getElementById("amplitudeVal").textContent = amplitude;

        const width = 1440;
        const path = generateWavePath(width, height, waves, amplitude, direction);

        const transform =
          direction === "top" ? `transform="scale(1,-1) translate(0,-${height})"` : "";

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
  <path d="${path}" fill="${color}" ${transform}/>
</svg>`;

        previewEl.innerHTML = svg;
        previewEl.style.background = `linear-gradient(180deg, ${color} 0%, ${color} 50%, ${bgColor} 50%)`;
        outputEl.value = svg;
      }

      function applyPreset(name) {
        switch (name) {
          case "gentle":
            document.getElementById("waves").value = 2;
            document.getElementById("amplitude").value = 20;
            document.getElementById("height").value = 80;
            break;
          case "sharp":
            document.getElementById("waves").value = 4;
            document.getElementById("amplitude").value = 50;
            document.getElementById("height").value = 120;
            break;
          case "multi":
            document.getElementById("waves").value = 3;
            document.getElementById("amplitude").value = 40;
            document.getElementById("height").value = 150;
            break;
          case "random":
            document.getElementById("waves").value = Math.floor(Math.random() * 4) + 1;
            document.getElementById("amplitude").value = Math.floor(Math.random() * 50) + 20;
            document.getElementById("height").value = Math.floor(Math.random() * 100) + 80;
            document.getElementById("waveColor").value =
              "#" +
              Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0");
            break;
        }
        updateWave();
      }

      function copySVG() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      function downloadSVG() {
        const blob = new Blob([outputEl.value], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wave.svg";
        a.click();
        URL.revokeObjectURL(url);
        statusEl.textContent = "下载已开始";
        setTimeout(() => (statusEl.textContent = ""), 2000);
      }

      updateWave();

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
    
