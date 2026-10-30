// @ts-nocheck
// Generated from tools/design/box-shadow-generator.html
// Source SHA-256: 5d8141a0a4e01a6c3a33a69c00ba09383f795aaa9a6558f4526d83cf31131eef
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const previewBox = document.getElementById("previewBox");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");

      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      function updateShadow() {
        const x = document.getElementById("offsetX").value;
        const y = document.getElementById("offsetY").value;
        const blur = document.getElementById("blur").value;
        const spread = document.getElementById("spread").value;
        const color = document.getElementById("shadowColor").value;
        const opacity = document.getElementById("opacity").value / 100;
        const inset = document.getElementById("inset").checked;

        document.getElementById("offsetXVal").textContent = x + "px";
        document.getElementById("offsetYVal").textContent = y + "px";
        document.getElementById("blurVal").textContent = blur + "px";
        document.getElementById("spreadVal").textContent = spread + "px";
        document.getElementById("opacityVal").textContent = Math.round(opacity * 100) + "%";

        const rgba = hexToRgba(color, opacity);
        const shadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;

        previewBox.style.boxShadow = shadow;
        outputEl.value = `box-shadow: ${shadow};`;
      }

      function applyPreset(name) {
        const presets = {
          soft: { x: 0, y: 10, blur: 40, spread: -10, color: "#000000", opacity: 15, inset: false },
          medium: { x: 5, y: 5, blur: 15, spread: 0, color: "#000000", opacity: 25, inset: false },
          hard: { x: 8, y: 8, blur: 0, spread: 0, color: "#000000", opacity: 30, inset: false },
          layered: {
            x: 0,
            y: 25,
            blur: 50,
            spread: -12,
            color: "#000000",
            opacity: 25,
            inset: false
          },
          inset: { x: 0, y: 4, blur: 8, spread: 0, color: "#000000", opacity: 30, inset: true },
          neon: { x: 0, y: 0, blur: 20, spread: 5, color: "#00ffff", opacity: 80, inset: false }
        };

        const p = presets[name];
        document.getElementById("offsetX").value = p.x;
        document.getElementById("offsetY").value = p.y;
        document.getElementById("blur").value = p.blur;
        document.getElementById("spread").value = p.spread;
        document.getElementById("shadowColor").value = p.color;
        document.getElementById("opacity").value = p.opacity;
        document.getElementById("inset").checked = p.inset;
        updateShadow();
      }

      function resetShadow() {
        document.getElementById("offsetX").value = 5;
        document.getElementById("offsetY").value = 5;
        document.getElementById("blur").value = 15;
        document.getElementById("spread").value = 0;
        document.getElementById("shadowColor").value = "#000000";
        document.getElementById("opacity").value = 20;
        document.getElementById("inset").checked = false;
        updateShadow();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      updateShadow();

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
    
