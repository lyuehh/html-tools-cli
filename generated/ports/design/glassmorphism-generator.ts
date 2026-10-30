// @ts-nocheck
// Generated from tools/design/glassmorphism-generator.html
// Source SHA-256: c7948892185cfb7cf1865ad4b2370409aed0b52717b608d59f747660fcb79fc8
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      function updateGlass() {
        const opacity = document.getElementById("opacity").value / 100;
        const blur = document.getElementById("blur").value;
        const borderOpacity = document.getElementById("borderOpacity").value / 100;
        const radius = document.getElementById("radius").value;
        const bgColor = document.getElementById("bgColor").value;
        const borderColor = document.getElementById("borderColor").value;

        document.getElementById("opacityVal").textContent = opacity.toFixed(2);
        document.getElementById("blurVal").textContent = blur + "px";
        document.getElementById("borderOpacityVal").textContent = borderOpacity.toFixed(2);
        document.getElementById("radiusVal").textContent = radius + "px";

        const bgRgba = hexToRgba(bgColor, opacity);
        const borderRgba = hexToRgba(borderColor, borderOpacity);

        const glassCard = document.getElementById("glassCard");
        glassCard.style.background = bgRgba;
        glassCard.style.backdropFilter = `blur(${blur}px)`;
        glassCard.style.webkitBackdropFilter = `blur(${blur}px)`;
        glassCard.style.borderRadius = `${radius}px`;
        glassCard.style.border = `1px solid ${borderRgba}`;
        glassCard.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.37)";

        const css = `/* Glassmorphism Effect */
background: ${bgRgba};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: ${radius}px;
border: 1px solid ${borderRgba};
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`;

        document.getElementById("output").value = css;
      }

      function copyCSS() {
        const css = document.getElementById("output").value;
        navigator.clipboard.writeText(css);
      }

      updateGlass();

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
    
