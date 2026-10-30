// @ts-nocheck
// Generated from tools/generator/pattern-generator.html
// Source SHA-256: 9d48ba78cee02e196c70b98161e4b878243dc2c13b2194b9b516c68632ee90af
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const patterns = {
        stripes: (c1, c2, s) =>
          `repeating-linear-gradient(45deg, ${c1}, ${c1} ${s / 4}px, ${c2} ${s / 4}px, ${c2} ${s / 2}px)`,
        stripesH: (c1, c2, s) =>
          `repeating-linear-gradient(0deg, ${c1}, ${c1} ${s / 2}px, ${c2} ${s / 2}px, ${c2} ${s}px)`,
        stripesV: (c1, c2, s) =>
          `repeating-linear-gradient(90deg, ${c1}, ${c1} ${s / 2}px, ${c2} ${s / 2}px, ${c2} ${s}px)`,
        checker: (c1, c2, s) =>
          `repeating-conic-gradient(${c1} 0% 25%, ${c2} 0% 50%) 50% / ${s}px ${s}px`,
        dots: (c1, c2, s) => `radial-gradient(circle, ${c1} ${s / 6}px, ${c2} ${s / 6}px)`,
        grid: (c1, c2, s) =>
          `linear-gradient(${c1} 1px, transparent 1px), linear-gradient(90deg, ${c1} 1px, ${c2} 1px)`,
        zigzag: (c1, c2, s) =>
          `linear-gradient(135deg, ${c1} 25%, transparent 25%) -${s / 2}px 0, linear-gradient(225deg, ${c1} 25%, transparent 25%) -${s / 2}px 0, linear-gradient(315deg, ${c1} 25%, transparent 25%), linear-gradient(45deg, ${c1} 25%, ${c2} 25%)`,
        triangles: (c1, c2, s) => `linear-gradient(45deg, ${c1} 50%, ${c2} 50%)`,
        waves: (c1, c2, s) =>
          `radial-gradient(circle at 100% 50%, transparent 20%, ${c1} 21%, ${c1} 34%, transparent 35%, transparent), radial-gradient(circle at 0% 50%, transparent 20%, ${c1} 21%, ${c1} 34%, transparent 35%, transparent) 0 ${s / 2}px`,
        honeycomb: (c1, c2, s) =>
          `radial-gradient(circle farthest-side at 0% 50%, ${c2} 23.5%, transparent 0) ${s / 1.4}px ${s}px, radial-gradient(circle farthest-side at 0% 50%, ${c1} 24%, transparent 0) ${s / 1.2}px ${s}px, linear-gradient(${c2} 14%, transparent 0, transparent 85%, ${c2} 0) 0 0, linear-gradient(150deg, ${c2} 24%, ${c1} 0, ${c1} 26%, transparent 0, transparent 74%, ${c1} 0, ${c1} 76%, ${c2} 0) 0 0, linear-gradient(30deg, ${c2} 24%, ${c1} 0, ${c1} 26%, transparent 0, transparent 74%, ${c1} 0, ${c1} 76%, ${c2} 0) 0 0, linear-gradient(90deg, ${c1} 2%, ${c2} 0, ${c2} 98%, ${c1} 0%) 0 0`,
        carbon: (c1, c2, s) =>
          `linear-gradient(27deg, ${c2} 5px, transparent 5px) 0 5px, linear-gradient(207deg, ${c2} 5px, transparent 5px) 10px 0px, linear-gradient(27deg, ${c1} 5px, transparent 5px) 0px 10px, linear-gradient(207deg, ${c1} 5px, transparent 5px) 10px 5px, linear-gradient(90deg, ${c2} 10px, transparent 10px), linear-gradient(${c1} 25%, ${c2} 25%, ${c2} 50%, transparent 50%, transparent 75%, ${c1} 75%, ${c1})`,
        polka: (c1, c2, s) =>
          `radial-gradient(${c1} ${s / 5}px, transparent ${s / 5}px), radial-gradient(${c1} ${s / 5}px, ${c2} ${s / 5}px)`,
        diamond: (c1, c2, s) =>
          `linear-gradient(45deg, ${c1} 25%, transparent 25%, transparent 75%, ${c1} 75%), linear-gradient(45deg, ${c1} 25%, ${c2} 25%, ${c2} 75%, ${c1} 75%)`,
        cross: (c1, c2, s) =>
          `radial-gradient(circle, transparent 20%, ${c2} 20%, ${c2} 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, ${c2} 20%, ${c2} 80%, transparent 80%, transparent) ${s / 2}px ${s / 2}px, linear-gradient(${c1} ${s / 10}px, transparent ${s / 10}px) 0 -${s / 20}px, linear-gradient(90deg, ${c1} ${s / 10}px, ${c2} ${s / 10}px) -${s / 20}px 0`,
        weave: (c1, c2, s) =>
          `linear-gradient(135deg, ${c2} 22%, ${c1} 22%, ${c1} 24%, transparent 24%, transparent 67%, ${c1} 67%, ${c1} 69%, ${c2} 69%), linear-gradient(225deg, ${c2} 22%, ${c1} 22%, ${c1} 24%, transparent 24%, transparent 67%, ${c1} 67%, ${c1} 69%, ${c2} 69%)`
      };

      const patternSizes = {
        stripes: (s) => `${s}px ${s}px`,
        stripesH: (s) => `${s}px ${s}px`,
        stripesV: (s) => `${s}px ${s}px`,
        checker: (s) => `${s}px ${s}px`,
        dots: (s) => `${s}px ${s}px`,
        grid: (s) => `${s}px ${s}px`,
        zigzag: (s) => `${s}px ${s}px`,
        triangles: (s) => `${s}px ${s}px`,
        waves: (s) => `${s}px ${s}px`,
        honeycomb: (s) => `${s * 2.8}px ${s * 2}px`,
        carbon: (s) => `${s}px ${s}px`,
        polka: (s) => `${s}px ${s}px`,
        diamond: (s) => `${s}px ${s}px`,
        cross: (s) => `${s}px ${s}px`,
        weave: (s) => `${s}px ${s}px`
      };

      let currentPattern = "stripes";

      function init() {
        const container = document.getElementById("patterns");
        Object.keys(patterns).forEach((name) => {
          const btn = document.createElement("div");
          btn.className = "pattern-btn" + (name === currentPattern ? " active" : "");
          btn.dataset.pattern = name;
          btn.style.background = patterns[name]("#00d9ff", "#16213e", 10);
          btn.style.backgroundSize = patternSizes[name](10);
          btn.onclick = () => selectPattern(name);
          container.appendChild(btn);
        });
        update();
      }

      function selectPattern(name) {
        currentPattern = name;
        document.querySelectorAll(".pattern-btn").forEach((el) => {
          el.classList.toggle("active", el.dataset.pattern === name);
        });
        update();
      }

      function update() {
        const size = parseInt(document.getElementById("size").value);
        const color1 = document.getElementById("color1").value;
        const color2 = document.getElementById("color2").value;
        const opacity = document.getElementById("opacity").value / 100;

        document.getElementById("sizeVal").textContent = size + "px";
        document.getElementById("opacityVal").textContent =
          document.getElementById("opacity").value + "%";

        const c1 = hexToRgba(color1, opacity);
        const c2 = hexToRgba(color2, opacity);

        const bg = patterns[currentPattern](c1, c2, size);
        const bgSize = patternSizes[currentPattern](size);

        const preview = document.getElementById("preview");
        preview.style.background = bg;
        preview.style.backgroundSize = bgSize;

        const css = `background: ${bg};\nbackground-size: ${bgSize};`;
        document.getElementById("cssOutput").textContent = css;
      }

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("cssOutput").textContent);
        alert("CSS已复制!");
      }

      function downloadPattern() {
        const size = parseInt(document.getElementById("size").value);
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = size * 10;
        canvas.height = size * 10;

        // Draw pattern to canvas
        const preview = document.getElementById("preview");
        const computedStyle = window.getComputedStyle(preview);

        const tempDiv = document.createElement("div");
        tempDiv.style.cssText = `width: ${canvas.width}px; height: ${canvas.height}px; position: fixed; left: -9999px;`;
        tempDiv.style.background = computedStyle.background;
        tempDiv.style.backgroundSize = computedStyle.backgroundSize;
        document.body.appendChild(tempDiv);

        html2canvas(tempDiv)
          .then((c) => {
            document.body.removeChild(tempDiv);
            const link = document.createElement("a");
            link.download = `pattern-${currentPattern}.png`;
            link.href = c.toDataURL();
            link.click();
          })
          .catch(() => {
            // Fallback: just use solid color
            ctx.fillStyle = document.getElementById("color2").value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const link = document.createElement("a");
            link.download = `pattern-${currentPattern}.png`;
            link.href = canvas.toDataURL();
            link.click();
          });
      }

      function randomPattern() {
        const names = Object.keys(patterns);
        currentPattern = names[Math.floor(Math.random() * names.length)];
        document.getElementById("color1").value =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        document.getElementById("color2").value =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        document.getElementById("size").value = 10 + Math.floor(Math.random() * 40);

        document.querySelectorAll(".pattern-btn").forEach((el) => {
          el.classList.toggle("active", el.dataset.pattern === currentPattern);
        });
        update();
      }

      init();

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
    
