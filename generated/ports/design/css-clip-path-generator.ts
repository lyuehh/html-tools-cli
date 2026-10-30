// @ts-nocheck
// Generated from tools/design/css-clip-path-generator.html
// Source SHA-256: 76bef23f66bed7dd1d89bc8d249cc9cfbb7fd0c54182143e1d0ed9ae3cbdf79b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentShape = "triangle";

      const shapes = {
        triangle: () => "polygon(50% 0%, 0% 100%, 100% 100%)",
        trapezoid: () => "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        parallelogram: () => "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        rhombus: () => "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        pentagon: () => "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        hexagon: () => "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        octagon: () =>
          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        star: () =>
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        cross: () =>
          "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
        arrow: () => "polygon(40% 0%, 40% 40%, 0% 40%, 50% 100%, 100% 40%, 60% 40%, 60% 0%)",
        circle: (r) => `circle(${r || 50}% at 50% 50%)`,
        ellipse: (rx, ry) => `ellipse(${rx || 50}% ${ry || 35}% at 50% 50%)`
      };

      function setShape(shape, btn) {
        currentShape = shape;
        document.querySelectorAll(".shape-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderControls();
        updateClipPath();
      }

      function renderControls() {
        const container = document.getElementById("controlsContainer");

        if (currentShape === "circle") {
          container.innerHTML = `
          <div class="control-group">
            <label for="input------span-class--val">半径: <span class="value" id="radiusVal">50%</span></label>
              <input  type="range" id="radius" min="10" max="70" value="50" oninput="updateClipPath()" />
          </div>
        `;
        } else if (currentShape === "ellipse") {
          container.innerHTML = `
          <div class="control-group">
            <label for="input--------span-class--v">水平半径: <span class="value" id="rxVal">50%</span></label>
              <input  type="range" id="rx" min="10" max="70" value="50" oninput="updateClipPath()" />
          </div>
          <div class="control-group">
            <label for="input--------span-class--v">垂直半径: <span class="value" id="ryVal">35%</span></label>
              <input  type="range" id="ry" min="10" max="70" value="35" oninput="updateClipPath()" />
          </div>
        `;
        } else {
          container.innerHTML = "";
        }
      }

      function updateClipPath() {
        let clipPath;

        if (currentShape === "circle") {
          const r = document.getElementById("radius")?.value || 50;
          document.getElementById("radiusVal").textContent = r + "%";
          clipPath = shapes.circle(r);
        } else if (currentShape === "ellipse") {
          const rx = document.getElementById("rx")?.value || 50;
          const ry = document.getElementById("ry")?.value || 35;
          document.getElementById("rxVal").textContent = rx + "%";
          document.getElementById("ryVal").textContent = ry + "%";
          clipPath = shapes.ellipse(rx, ry);
        } else {
          clipPath = shapes[currentShape]();
        }

        document.getElementById("previewElement").style.clipPath = clipPath;
        document.getElementById("output").value = `clip-path: ${clipPath};`;
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      renderControls();
      updateClipPath();

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
    
