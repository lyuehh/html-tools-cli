// @ts-nocheck
// Generated from tools/dev/gradient-generator.html
// Source SHA-256: cf63e87edaf198b370c5b35562567997950185f6e5dee817ef4621e271e4ee98
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gradientType = "linear";
      let colorStops = [
        { color: "#00d9ff", position: 0 },
        { color: "#e94560", position: 100 }
      ];

      const presetGradients = [
        ["#667eea", "#764ba2"],
        ["#f093fb", "#f5576c"],
        ["#4facfe", "#00f2fe"],
        ["#43e97b", "#38f9d7"],
        ["#fa709a", "#fee140"],
        ["#a8edea", "#fed6e3"],
        ["#ff9a9e", "#fecfef"],
        ["#ffecd2", "#fcb69f"],
        ["#a1c4fd", "#c2e9fb"],
        ["#d4fc79", "#96e6a1"],
        ["#84fab0", "#8fd3f4"],
        ["#cfd9df", "#e2ebf0"],
        ["#fbc2eb", "#a6c1ee"],
        ["#fdcbf1", "#e6dee9"],
        ["#a6c0fe", "#f68084"],
        ["#fccb90", "#d57eeb"]
      ];

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.setType = function (type) {
        gradientType = type;
        document.querySelectorAll(".type-tab").forEach((tab) => tab.classList.remove("active"));
        event.target.classList.add("active");

        document.getElementById("angleControl").style.display =
          type === "linear" || type === "conic" ? "flex" : "none";
        document.getElementById("shapeControl").style.display = type === "radial" ? "flex" : "none";
        document.getElementById("positionControl").style.display =
          type === "radial" || type === "conic" ? "flex" : "none";

        updateGradient();
      };

      function renderColorStops() {
        const container = document.getElementById("colorStops");
        container.innerHTML = colorStops
          .map(
            (stop, index) => `
                <div class="color-stop">
                    <input type="color" value="${stop.color}" onchange="updateColorStop(${index}, 'color', this.value)" aria-label="颜色选择器">
                    <input type="text" value="${stop.color}" onchange="updateColorStop(${index}, 'color', this.value)" aria-label="文本输入框" placeholder="请输入文本输入框">
                    <input type="range" min="0" max="100" value="${stop.position}" oninput="updateColorStop(${index}, 'position', this.value)">
                    <span class="position-value">${stop.position}%</span>
                    ${colorStops.length > 2 ? `<button class="remove-btn" onclick="removeColorStop(${index})" aria-label="×">×</button>` : ""}
                </div>
            `
          )
          .join("");
      }

      window.updateColorStop = function (index, prop, value) {
        if (prop === "color") {
          colorStops[index].color = value;
        } else {
          colorStops[index].position = parseInt(value);
        }
        renderColorStops();
        updateGradient();
      };

      window.addColorStop = function () {
        const lastColor = colorStops[colorStops.length - 1];
        const newPosition = Math.min(lastColor.position + 20, 100);
        colorStops.push({ color: "#ffffff", position: newPosition });
        renderColorStops();
        updateGradient();
      };

      window.removeColorStop = function (index) {
        if (colorStops.length > 2) {
          colorStops.splice(index, 1);
          renderColorStops();
          updateGradient();
        }
      };

      window.reverseColors = function () {
        colorStops.reverse();
        colorStops.forEach((stop, i) => {
          stop.position = 100 - stop.position;
        });
        colorStops.sort((a, b) => a.position - b.position);
        renderColorStops();
        updateGradient();
      };

      window.randomGradient = function () {
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
      };

      function updateGradient() {
        const angle = document.getElementById("angle").value;
        document.getElementById("angleValue").textContent = angle + "°";

        const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
        const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");

        let gradient = "";
        if (gradientType === "linear") {
          gradient = `linear-gradient(${angle}deg, ${stopsStr})`;
        } else if (gradientType === "radial") {
          const shape = document.getElementById("shape").value;
          const position = document.getElementById("position").value;
          gradient = `radial-gradient(${shape} at ${position}, ${stopsStr})`;
        } else if (gradientType === "conic") {
          const position = document.getElementById("position").value;
          gradient = `conic-gradient(from ${angle}deg at ${position}, ${stopsStr})`;
        }

        document.getElementById("preview").style.background = gradient;
        document.getElementById("codeOutput").textContent = `background: ${gradient};`;
      }

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          showToast("代码已复制");
        });
      };

      window.applyPreset = function (colors) {
        colorStops = colors.map((color, i) => ({
          color,
          position: Math.round((i * 100) / (colors.length - 1))
        }));
        renderColorStops();
        updateGradient();
      };

      function renderPresets() {
        const container = document.getElementById("presets");
        container.innerHTML = presetGradients
          .map((colors, i) => {
            const gradient = `linear-gradient(135deg, ${colors.join(", ")})`;
            return `<div class="preset" style="background: ${gradient}" onclick="applyPreset(${JSON.stringify(colors).replace(/"/g, "'")})"></div>`;
          })
          .join("");
      }

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      renderColorStops();
      renderPresets();
      updateGradient();
    
