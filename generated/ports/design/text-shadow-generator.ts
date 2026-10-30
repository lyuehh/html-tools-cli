// @ts-nocheck
// Generated from tools/design/text-shadow-generator.html
// Source SHA-256: 9423463e77d492501ca7ab74ddbfd229003e2d4017da5b10b3dcca44c55a90c6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      function updatePreview() {
        const text = document.getElementById("textInput").value || "文字阴影";
        const textColor = document.getElementById("textColor").value;
        const shadowColor = document.getElementById("shadowColor").value;
        const hOffset = document.getElementById("hOffset").value;
        const vOffset = document.getElementById("vOffset").value;
        const blur = document.getElementById("blur").value;
        const opacity = document.getElementById("opacity").value / 100;

        document.getElementById("hOffsetVal").textContent = hOffset + "px";
        document.getElementById("vOffsetVal").textContent = vOffset + "px";
        document.getElementById("blurVal").textContent = blur + "px";
        document.getElementById("opacityVal").textContent = opacity.toFixed(2);

        const rgba = hexToRgba(shadowColor, opacity);
        const shadow = `${hOffset}px ${vOffset}px ${blur}px ${rgba}`;

        const preview = document.getElementById("previewText");
        preview.textContent = text;
        preview.style.color = textColor;
        preview.style.textShadow = shadow;

        document.getElementById("output").value = `color: ${textColor};\ntext-shadow: ${shadow};`;
      }

      function applyPreset(name) {
        const presets = {
          simple: { h: 2, v: 2, blur: 4, opacity: 50, shadowColor: "#000000" },
          glow: { h: 0, v: 0, blur: 20, opacity: 80, shadowColor: "#00f5d4" },
          neon: { h: 0, v: 0, blur: 10, opacity: 100, shadowColor: "#ff00ff" },
          retro: { h: 4, v: 4, blur: 0, opacity: 100, shadowColor: "#ff6b6b" },
          outline: { h: 1, v: 1, blur: 0, opacity: 100, shadowColor: "#000000" }
        };

        const p = presets[name];
        document.getElementById("hOffset").value = p.h;
        document.getElementById("vOffset").value = p.v;
        document.getElementById("blur").value = p.blur;
        document.getElementById("opacity").value = p.opacity;
        document.getElementById("shadowColor").value = p.shadowColor;
        updatePreview();
      }

      function copyCSS() {
        const css = document.getElementById("output").value;
        navigator.clipboard.writeText(css);
      }

      updatePreview();

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
    
