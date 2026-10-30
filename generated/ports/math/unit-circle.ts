// @ts-nocheck
// Generated from tools/math/unit-circle.html
// Source SHA-256: 7ea207bd9813405d3d017327bdd48dace96088b7a3ff13f2b25d417e42f2e177
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const R = 120;

      function formatRadian(deg) {
        const fractions = {
          0: "0",
          30: "π/6",
          45: "π/4",
          60: "π/3",
          90: "π/2",
          120: "2π/3",
          135: "3π/4",
          150: "5π/6",
          180: "π",
          210: "7π/6",
          225: "5π/4",
          240: "4π/3",
          270: "3π/2",
          300: "5π/3",
          315: "7π/4",
          330: "11π/6",
          360: "2π"
        };
        if (fractions[deg]) return fractions[deg];
        return ((deg * Math.PI) / 180).toFixed(3);
      }

      function updateAngle(deg) {
        deg = parseFloat(deg) || 0;
        if (deg < 0) deg = 0;
        if (deg > 360) deg = 360;

        document.getElementById("angleSlider").value = deg;
        document.getElementById("angleInput").value = deg;

        const rad = (deg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        const tan = Math.tan(rad);

        const x = R * cos;
        const y = -R * sin; // SVG y is inverted

        // Update lines
        document.getElementById("cosLine").setAttribute("x2", x);
        document.getElementById("sinLine").setAttribute("x1", x);
        document.getElementById("sinLine").setAttribute("x2", x);
        document.getElementById("sinLine").setAttribute("y2", y);
        document.getElementById("radiusLine").setAttribute("x2", x);
        document.getElementById("radiusLine").setAttribute("y2", y);
        document.getElementById("point").setAttribute("cx", x);
        document.getElementById("point").setAttribute("cy", y);

        // Tan line (from point to x-axis at x=R)
        if (Math.abs(cos) > 0.01) {
          const tanY = -R * tan;
          const tanLine = document.getElementById("tanLine");
          if (Math.abs(tanY) < 300) {
            tanLine.setAttribute("x1", R);
            tanLine.setAttribute("y1", 0);
            tanLine.setAttribute("x2", R);
            tanLine.setAttribute("y2", tanY);
            tanLine.style.display = "block";
          } else {
            tanLine.style.display = "none";
          }
        } else {
          document.getElementById("tanLine").style.display = "none";
        }

        // Angle arc
        const arcRad = 30;
        const largeArc = deg > 180 ? 1 : 0;
        const arcX = arcRad * Math.cos(rad);
        const arcY = -arcRad * Math.sin(rad);
        document
          .getElementById("angleArc")
          .setAttribute("d", `M ${arcRad} 0 A ${arcRad} ${arcRad} 0 ${largeArc} 0 ${arcX} ${arcY}`);

        // Coordinate text
        const textX = x * 1.15;
        const textY = y * 1.15 - 5;
        document.getElementById("coordText").setAttribute("x", textX);
        document.getElementById("coordText").setAttribute("y", textY);
        document.getElementById("coordText").textContent = `(${cos.toFixed(2)}, ${sin.toFixed(2)})`;

        // Update values
        document.getElementById("radianDisplay").textContent = formatRadian(deg);
        document.getElementById("sinValue").textContent = sin.toFixed(4);
        document.getElementById("cosValue").textContent = cos.toFixed(4);
        document.getElementById("tanValue").textContent =
          Math.abs(tan) < 1000 ? tan.toFixed(4) : "∞";
      }

      function setAngle(deg) {
        updateAngle(deg);
      }

      updateAngle(45);

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
    
