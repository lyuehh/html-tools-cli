// @ts-nocheck
// Generated from tools/design/css-button-generator.html
// Source SHA-256: 70e8ef6b0d9347454543ff8d1af2e6f26c3683049d3cff0c1595113931b77115
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function updateButton() {
        const btn = document.getElementById("previewBtn");
        const text = document.getElementById("btnText").value;
        const bgColor = document.getElementById("bgColor").value;
        const textColor = document.getElementById("textColor").value;
        const borderColor = document.getElementById("borderColor").value;
        const fontSize = document.getElementById("fontSize").value;
        const paddingX = document.getElementById("paddingX").value;
        const paddingY = document.getElementById("paddingY").value;
        const radius = document.getElementById("radius").value;
        const borderWidth = document.getElementById("borderWidth").value;
        const fontWeight = document.getElementById("fontWeight").value;

        document.getElementById("fontSizeVal").textContent = fontSize + "px";
        document.getElementById("paddingXVal").textContent = paddingX + "px";
        document.getElementById("paddingYVal").textContent = paddingY + "px";
        document.getElementById("radiusVal").textContent = radius + "px";
        document.getElementById("borderWidthVal").textContent = borderWidth + "px";

        btn.textContent = text;
        btn.style.background = bgColor;
        btn.style.color = textColor;
        btn.style.border = `${borderWidth}px solid ${borderColor}`;
        btn.style.fontSize = fontSize + "px";
        btn.style.padding = `${paddingY}px ${paddingX}px`;
        btn.style.borderRadius = radius + "px";
        btn.style.fontWeight = fontWeight;

        const css = `.button {
  background: ${bgColor};
  color: ${textColor};
  border: ${borderWidth}px solid ${borderColor};
  padding: ${paddingY}px ${paddingX}px;
  border-radius: ${radius}px;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}`;

        document.getElementById("output").value = css;
      }

      function applyPreset(preset) {
        const presets = {
          primary: { bg: "#0d6efd", text: "#ffffff", border: "#0d6efd", radius: 6, borderWidth: 0 },
          outline: { bg: "#ffffff", text: "#0d6efd", border: "#0d6efd", radius: 6, borderWidth: 2 },
          gradient: {
            bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            text: "#ffffff",
            border: "transparent",
            radius: 8,
            borderWidth: 0
          },
          rounded: {
            bg: "#10b981",
            text: "#ffffff",
            border: "#10b981",
            radius: 50,
            borderWidth: 0
          },
          shadow: { bg: "#6366f1", text: "#ffffff", border: "#6366f1", radius: 8, borderWidth: 0 },
          minimal: { bg: "#f8f9fa", text: "#212529", border: "#dee2e6", radius: 4, borderWidth: 1 }
        };

        const p = presets[preset];
        document.getElementById("bgColor").value = p.bg.startsWith("#") ? p.bg : "#667eea";
        document.getElementById("textColor").value = p.text;
        document.getElementById("borderColor").value = p.border.startsWith("#")
          ? p.border
          : "#667eea";
        document.getElementById("radius").value = p.radius;
        document.getElementById("borderWidth").value = p.borderWidth;

        if (preset === "gradient") {
          document.getElementById("previewBtn").style.background = p.bg;
        }

        updateButton();
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").value);
      }

      updateButton();

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
    
