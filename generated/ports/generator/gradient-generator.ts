// @ts-nocheck
// Generated from tools/generator/gradient-generator.html
// Source SHA-256: 3f3b07acd3c6298513a779f8aacfa453d65184bdfba9f0df80d7383bdb461c24
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let gradientType = "linear";
      let colorStops = [
        { color: "#6366f1", position: 0 },
        { color: "#a855f7", position: 100 }
      ];

      const presets = [
        ["#667eea", "#764ba2"],
        ["#f093fb", "#f5576c"],
        ["#4facfe", "#00f2fe"],
        ["#43e97b", "#38f9d7"],
        ["#fa709a", "#fee140"],
        ["#a8edea", "#fed6e3"],
        ["#d299c2", "#fef9d7"],
        ["#89f7fe", "#66a6ff"]
      ];

      window.toggleTheme = function () {
        const t =
          document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      window.setType = function (type) {
        gradientType = type;
        document.querySelectorAll(".type-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        document.getElementById("angleSection").style.display =
          type === "radial" ? "none" : "block";
        updateGradient();
      };

      function renderColorStops() {
        const container = document.getElementById("colorStops");
        container.innerHTML = colorStops
          .map(
            (stop, i) => `
                <div class="color-stop">
                    <input type="color" value="${stop.color}" onchange="updateColor(${i}, this.value)" aria-label="颜色选择器">
                    <input type="range" min="0" max="100" value="${stop.position}" oninput="updatePosition(${i}, this.value)">
                    <span class="position">${stop.position}%</span>
                    ${colorStops.length > 2 ? `<button class="remove-btn" onclick="removeColorStop(${i})" aria-label="×">×</button>` : ""}
                </div>
            `
          )
          .join("");
      }

      window.updateColor = function (index, color) {
        colorStops[index].color = color;
        updateGradient();
      };

      window.updatePosition = function (index, position) {
        colorStops[index].position = parseInt(position);
        renderColorStops();
        updateGradient();
      };

      window.addColorStop = function () {
        const lastColor = colorStops[colorStops.length - 1];
        colorStops.push({
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
          position: Math.min(100, lastColor.position + 20)
        });
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

      function updateGradient() {
        const angle = document.getElementById("angle").value;
        document.getElementById("angleValue").textContent = angle + "°";

        const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
        const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");

        let gradient;
        switch (gradientType) {
          case "linear":
            gradient = `linear-gradient(${angle}deg, ${stopsStr})`;
            break;
          case "radial":
            gradient = `radial-gradient(circle, ${stopsStr})`;
            break;
          case "conic":
            gradient = `conic-gradient(from ${angle}deg, ${stopsStr})`;
            break;
        }

        document.getElementById("preview").style.background = gradient;
        document.getElementById("codeOutput").textContent = `background: ${gradient};`;
      }

      function renderPresets() {
        const container = document.getElementById("presets");
        container.innerHTML = presets
          .map(
            (p, i) => `
                <div class="preset" style="background: linear-gradient(135deg, ${p[0]}, ${p[1]})" onclick="applyPreset(${i})"></div>
            `
          )
          .join("");
      }

      window.applyPreset = function (index) {
        const preset = presets[index];
        colorStops = [
          { color: preset[0], position: 0 },
          { color: preset[1], position: 100 }
        ];
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
        document.getElementById("angle").value = Math.floor(Math.random() * 360);
        renderColorStops();
        updateGradient();
      };

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code);
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      };

      renderColorStops();
      renderPresets();
      updateGradient();
    
