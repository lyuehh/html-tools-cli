// @ts-nocheck
// Generated from tools/dev/css-gradient-generator.html
// Source SHA-256: f5b53c1a9c5a67243bd2b3d671dc72c99629622a1b0e0c96c446bbe4ae24d227
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const presets = [
        ["#667eea", "#764ba2"],
        ["#f093fb", "#f5576c"],
        ["#4facfe", "#00f2fe"],
        ["#43e97b", "#38f9d7"],
        ["#fa709a", "#fee140"],
        ["#a8edea", "#fed6e3"],
        ["#ff9a9e", "#fecfef"],
        ["#ffecd2", "#fcb69f"],
        ["#667eea", "#764ba2"],
        ["#11998e", "#38ef7d"],
        ["#fc466b", "#3f5efb"],
        ["#ee0979", "#ff6a00"]
      ];

      let colorStops = [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ];

      function init() {
        const presetsContainer = document.getElementById("presets");
        presets.forEach((colors, i) => {
          const div = document.createElement("div");
          div.className = "preset";
          div.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
          div.onclick = () => applyPreset(colors);
          presetsContainer.appendChild(div);
        });
        renderColorStops();
        updateGradient();
      }

      function applyPreset(colors) {
        colorStops = colors.map((c, i) => ({
          color: c,
          position: (i * 100) / (colors.length - 1)
        }));
        renderColorStops();
        updateGradient();
      }

      function renderColorStops() {
        const container = document.getElementById("colorStops");
        container.innerHTML = "";
        colorStops.forEach((stop, i) => {
          const div = document.createElement("div");
          div.className = "color-stop";
          div.innerHTML = `
                    <input type="color" value="${stop.color}" onchange="updateStop(${i}, 'color', this.value)" aria-label="颜色选择器">
                    <input type="number" value="${stop.position}" min="0" max="100" onchange="updateStop(${i}, 'position', this.value)" aria-label="数字输入框" placeholder="请输入数字输入框">%
                    ${colorStops.length > 2 ? `<button class="btn btn-danger btn-sm" onclick="removeStop(${i})" aria-label="×">×</button>` : ""}
                `;
          container.appendChild(div);
        });
      }

      function updateStop(index, prop, value) {
        colorStops[index][prop] = prop === "position" ? parseInt(value) : value;
        updateGradient();
      }

      function addColorStop() {
        const lastPos = colorStops[colorStops.length - 1].position;
        colorStops.push({
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
          position: Math.min(lastPos + 20, 100)
        });
        renderColorStops();
        updateGradient();
      }

      function removeStop(index) {
        if (colorStops.length > 2) {
          colorStops.splice(index, 1);
          renderColorStops();
          updateGradient();
        }
      }

      function updateGradient() {
        const type = document.getElementById("gradientType").value;
        const angle = document.getElementById("angle").value;
        document.getElementById("angleValue").textContent = angle + "°";

        const stops = colorStops.map((s) => `${s.color} ${s.position}%`).join(", ");
        let gradient;

        if (type === "linear") {
          gradient = `linear-gradient(${angle}deg, ${stops})`;
        } else if (type === "radial") {
          gradient = `radial-gradient(circle, ${stops})`;
        } else {
          gradient = `conic-gradient(from ${angle}deg, ${stops})`;
        }

        document.getElementById("preview").style.background = gradient;
        document.getElementById("output").textContent = `background: ${gradient};`;
      }

      function copyCSS() {
        const css = document.getElementById("output").textContent;
        navigator.clipboard.writeText(css);
        alert("已复制到剪贴板!");
      }

      function randomGradient() {
        const randomColor = () =>
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");
        colorStops = [
          { color: randomColor(), position: 0 },
          { color: randomColor(), position: 100 }
        ];
        if (Math.random() > 0.5) {
          colorStops.splice(1, 0, { color: randomColor(), position: 50 });
        }
        document.getElementById("angle").value = Math.floor(Math.random() * 360);
        renderColorStops();
        updateGradient();
      }

      document.getElementById("gradientType").addEventListener("change", updateGradient);
      document.getElementById("angle").addEventListener("input", updateGradient);

      init();
    
