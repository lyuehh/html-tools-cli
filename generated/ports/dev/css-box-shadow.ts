// @ts-nocheck
// Generated from tools/dev/css-box-shadow.html
// Source SHA-256: 9ecf6dcfcd0fd0f5168d10d2c20b8534807fd53c387daf2042cfad7d29ab88e9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let shadowLayers = [];
      let currentLayer = 0;

      function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${opacity})`;
      }

      function getCurrentShadow() {
        const x = document.getElementById("offsetX").value;
        const y = document.getElementById("offsetY").value;
        const blur = document.getElementById("blur").value;
        const spread = document.getElementById("spread").value;
        const color = document.getElementById("color").value;
        const opacity = document.getElementById("opacity").value / 100;
        const inset = document.getElementById("inset").checked;

        return {
          x,
          y,
          blur,
          spread,
          color,
          opacity,
          inset,
          css: `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`
        };
      }

      function updateShadow() {
        document.getElementById("offsetXVal").textContent =
          document.getElementById("offsetX").value + "px";
        document.getElementById("offsetYVal").textContent =
          document.getElementById("offsetY").value + "px";
        document.getElementById("blurVal").textContent =
          document.getElementById("blur").value + "px";
        document.getElementById("spreadVal").textContent =
          document.getElementById("spread").value + "px";
        document.getElementById("opacityVal").textContent =
          document.getElementById("opacity").value + "%";

        const current = getCurrentShadow();
        if (shadowLayers.length > 0) {
          shadowLayers[currentLayer] = current;
        }

        const allShadows =
          shadowLayers.length > 0 ? shadowLayers.map((l) => l.css).join(", ") : current.css;

        document.getElementById("preview").style.boxShadow = allShadows;
        document.getElementById("output").textContent = `box-shadow: ${allShadows};`;

        renderLayers();
      }

      function addLayer() {
        shadowLayers.push(getCurrentShadow());
        currentLayer = shadowLayers.length - 1;
        renderLayers();
      }

      function removeLayer(index) {
        shadowLayers.splice(index, 1);
        if (currentLayer >= shadowLayers.length)
          currentLayer = Math.max(0, shadowLayers.length - 1);
        updateShadow();
      }

      function selectLayer(index) {
        currentLayer = index;
        const layer = shadowLayers[index];
        document.getElementById("offsetX").value = layer.x;
        document.getElementById("offsetY").value = layer.y;
        document.getElementById("blur").value = layer.blur;
        document.getElementById("spread").value = layer.spread;
        document.getElementById("color").value = layer.color;
        document.getElementById("opacity").value = layer.opacity * 100;
        document.getElementById("inset").checked = layer.inset;
        updateShadow();
      }

      function renderLayers() {
        const container = document.getElementById("layers");
        container.innerHTML = shadowLayers
          .map(
            (layer, i) => `
                <div class="layer" style="${i === currentLayer ? "border: 2px solid #4f46e5;" : ""}">
                    <span onclick="selectLayer(${i})" style="cursor: pointer;">层 ${i + 1}: ${layer.css.substring(0, 30)}...</span>
                    <button class="btn btn-sm btn-danger" onclick="removeLayer(${i})" aria-label="×">×</button>
                </div>
            `
          )
          .join("");
      }

      function copyCSS() {
        const css = document.getElementById("output").textContent;
        navigator.clipboard.writeText(css);
        alert("已复制到剪贴板!");
      }

      updateShadow();

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
    
