// @ts-nocheck
// Generated from tools/design/neumorphism-generator.html
// Source SHA-256: 98b1a706b9e92083f04cd46002d0a6ca068268cf26a3916a62a2ccf6f1d7ee53
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentShape = "flat";

      function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
      }

      function adjustBrightness(hex, percent) {
        const rgb = hexToRgb(hex);
        const adjust = (val) => Math.min(255, Math.max(0, Math.round(val + 255 * percent)));
        return `rgb(${adjust(rgb.r)}, ${adjust(rgb.g)}, ${adjust(rgb.b)})`;
      }

      function setShape(shape) {
        currentShape = shape;
        document.querySelectorAll(".shape-btn").forEach((btn) => btn.classList.remove("active"));
        document
          .getElementById("btn" + shape.charAt(0).toUpperCase() + shape.slice(1))
          .classList.add("active");
        updateNeu();
      }

      function updateNeu() {
        const bgColor = document.getElementById("bgColor").value;
        const blur = document.getElementById("blur").value;
        const distance = document.getElementById("distance").value;
        const intensity = document.getElementById("intensity").value / 100;
        const radius = document.getElementById("radius").value;

        document.getElementById("blurVal").textContent = blur + "px";
        document.getElementById("distanceVal").textContent = distance + "px";
        document.getElementById("intensityVal").textContent = intensity.toFixed(2);
        document.getElementById("radiusVal").textContent = radius + "px";

        const lightShadow = adjustBrightness(bgColor, intensity);
        const darkShadow = adjustBrightness(bgColor, -intensity);

        const neuElement = document.getElementById("neuElement");
        const previewArea = document.getElementById("previewArea");

        previewArea.style.background = bgColor;
        neuElement.style.background = bgColor;
        neuElement.style.borderRadius = radius + "px";

        let boxShadow,
          gradient = "";

        switch (currentShape) {
          case "flat":
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
            break;
          case "concave":
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
            gradient = `linear-gradient(145deg, ${darkShadow}, ${lightShadow})`;
            break;
          case "convex":
            boxShadow = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
            gradient = `linear-gradient(145deg, ${lightShadow}, ${darkShadow})`;
            break;
          case "pressed":
            boxShadow = `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`;
            break;
        }

        neuElement.style.boxShadow = boxShadow;
        neuElement.style.background = gradient || bgColor;

        let css = `background: ${gradient || bgColor};\nborder-radius: ${radius}px;\nbox-shadow: ${boxShadow};`;
        document.getElementById("output").value = css;
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      updateNeu();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);

        if (next === "dark") {
          document.getElementById("bgColor").value = "#2d3436";
        } else {
          document.getElementById("bgColor").value = "#e0e5ec";
        }
        updateNeu();
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
