// @ts-nocheck
// Generated from tools/design/gradient-generator.html
// Source SHA-256: f340a0556aba59d00088e48ce7e83fa18773389fe40abfd723cbcdce51d33f93
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let colorStops = [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ];

      const presets = [
        ["#667eea", "#764ba2"],
        ["#f093fb", "#f5576c"],
        ["#4facfe", "#00f2fe"],
        ["#43e97b", "#38f9d7"],
        ["#fa709a", "#fee140"],
        ["#a8edea", "#fed6e3"],
        ["#ff9a9e", "#fecfef"],
        ["#ffecd2", "#fcb69f"]
      ];

      const presetEl = document.getElementById("presets");
      const previewEl = document.getElementById("preview");
      const stopsEl = document.getElementById("colorStops");
      const typeEl = document.getElementById("gradientType");
      const angleEl = document.getElementById("angle");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");

      function renderPresets() {
        presetEl.innerHTML = "";
        presets.forEach((p, i) => {
          const div = document.createElement("div");
          div.className = "preset";
          div.style.background = `linear-gradient(90deg, ${p[0]}, ${p[1]})`;
          div.onclick = () => {
            colorStops = p.map((c, j) => ({ color: c, position: j === 0 ? 0 : 100 }));
            render();
          };
          presetEl.appendChild(div);
        });
      }

      function renderColorStops() {
        stopsEl.innerHTML = "";
        colorStops.forEach((stop, i) => {
          const div = document.createElement("div");
          div.className = "color-stop";
          div.innerHTML = `
          <input type="color" value="${stop.color}" onchange="updateStop(${i}, 'color', this.value)" aria-label="颜色选择器">
          <input type="number" value="${stop.position}" min="0" max="100" style="width:70px" onchange="updateStop(${i}, 'position', this.value)" aria-label="数字输入框" placeholder="请输入数字输入框"> %
          ${colorStops.length > 2 ? `<button class="btn danger" onclick="removeStop(${i})" aria-label="×">×</button>` : ""}
        `;
          stopsEl.appendChild(div);
        });
      }

      function updateStop(index, key, value) {
        colorStops[index][key] = key === "position" ? parseInt(value) : value;
        updatePreview();
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
        render();
      }

      function removeStop(index) {
        if (colorStops.length > 2) {
          colorStops.splice(index, 1);
          render();
        }
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
        angleEl.value = Math.floor(Math.random() * 360);
        render();
      }

      function generateCSS() {
        const type = typeEl.value;
        const angle = angleEl.value;
        const stops = colorStops.map((s) => `${s.color} ${s.position}%`).join(", ");

        if (type === "linear") {
          return `linear-gradient(${angle}deg, ${stops})`;
        } else if (type === "radial") {
          return `radial-gradient(circle, ${stops})`;
        } else {
          return `conic-gradient(from ${angle}deg, ${stops})`;
        }
      }

      function updatePreview() {
        const css = generateCSS();
        previewEl.style.background = css;
        outputEl.value = `background: ${css};`;
      }

      function render() {
        renderColorStops();
        updatePreview();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      typeEl.addEventListener("change", updatePreview);
      angleEl.addEventListener("input", updatePreview);

      renderPresets();
      render();

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
    
