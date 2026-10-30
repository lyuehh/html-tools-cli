// @ts-nocheck
// Generated from tools/dev/glassmorphism.html
// Source SHA-256: d8969c5c90862c3637da2bd571518b2b00406744a55b524d42679509eb2031e2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Background Presets
      const bgPresets = [
        { name: "紫罗兰", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { name: "日落", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { name: "海洋", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { name: "森林", gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" },
        { name: "火焰", gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)" },
        { name: "夜空", gradient: "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)" },
        { name: "玫瑰", gradient: "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)" },
        { name: "薄荷", gradient: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" },
        { name: "深空", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
        { name: "极光", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
        { name: "晨曦", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
        { name: "深渊", gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }
      ];

      let currentBgIndex = 0;

      // Initialize
      document.addEventListener("DOMContentLoaded", function () {
        initTheme();
        initBgPresets();
        updateGlass();
      });

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        }
      }

      window.toggleTheme = function () {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      // Background Presets
      function initBgPresets() {
        const container = document.getElementById("bgPresets");
        bgPresets.forEach((preset, index) => {
          const btn = document.createElement("button");
          btn.className = "bg-preset" + (index === 0 ? " active" : "");
          btn.style.background = preset.gradient;
          btn.title = preset.name;
          btn.onclick = () => selectBgPreset(index);
          container.appendChild(btn);
        });
      }

      function selectBgPreset(index) {
        currentBgIndex = index;
        document.querySelectorAll(".bg-preset").forEach((btn, i) => {
          btn.classList.toggle("active", i === index);
        });
        document.getElementById("previewContainer").style.background = bgPresets[index].gradient;
      }

      // Color sync
      window.syncBgColor = function () {
        const text = document.getElementById("bgColorText").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
          document.getElementById("bgColor").value = text;
          updateGlass();
        }
      };

      window.syncBorderColor = function () {
        const text = document.getElementById("borderColorText").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(text)) {
          document.getElementById("borderColor").value = text;
          updateGlass();
        }
      };

      // Helper: hex to rgba
      function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      // Update glass effect
      function updateGlass() {
        const blur = document.getElementById("blurRange").value;
        const opacity = document.getElementById("opacityRange").value / 100;
        const bgColor = document.getElementById("bgColor").value;
        const borderWidth = document.getElementById("borderWidthRange").value;
        const borderOpacity = document.getElementById("borderOpacityRange").value / 100;
        const borderColor = document.getElementById("borderColor").value;
        const radius = document.getElementById("radiusRange").value;
        const shadowEnabled = document.getElementById("shadowToggle").checked;
        const shadowX = document.getElementById("shadowXRange").value;
        const shadowY = document.getElementById("shadowYRange").value;
        const shadowBlur = document.getElementById("shadowBlurRange").value;
        const shadowSpread = document.getElementById("shadowSpreadRange").value;
        const shadowOpacity = document.getElementById("shadowOpacityRange").value / 100;

        // Update display values
        document.getElementById("blurValue").textContent = blur + "px";
        document.getElementById("opacityValue").textContent = opacity.toFixed(2);
        document.getElementById("borderWidthValue").textContent = borderWidth + "px";
        document.getElementById("borderOpacityValue").textContent = borderOpacity.toFixed(2);
        document.getElementById("radiusValue").textContent = radius + "px";
        document.getElementById("shadowXValue").textContent = shadowX + "px";
        document.getElementById("shadowYValue").textContent = shadowY + "px";
        document.getElementById("shadowBlurValue").textContent = shadowBlur + "px";
        document.getElementById("shadowSpreadValue").textContent = shadowSpread + "px";
        document.getElementById("shadowOpacityValue").textContent = shadowOpacity.toFixed(2);

        // Sync color text inputs
        document.getElementById("bgColorText").value = bgColor;
        document.getElementById("borderColorText").value = borderColor;

        // Calculate RGBA values
        const bgRgba = hexToRgba(bgColor, opacity);
        const borderRgba = hexToRgba(borderColor, borderOpacity);
        const shadowRgba = `rgba(31, 38, 135, ${shadowOpacity})`;

        // Apply to glass card
        const card = document.getElementById("glassCard");
        card.style.background = bgRgba;
        card.style.backdropFilter = `blur(${blur}px)`;
        card.style.webkitBackdropFilter = `blur(${blur}px)`;
        card.style.borderRadius = `${radius}px`;
        card.style.border = `${borderWidth}px solid ${borderRgba}`;

        if (shadowEnabled) {
          card.style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowRgba}`;
        } else {
          card.style.boxShadow = "none";
        }

        // Generate CSS code
        generateCode(
          blur,
          bgRgba,
          borderWidth,
          borderRgba,
          radius,
          shadowEnabled,
          shadowX,
          shadowY,
          shadowBlur,
          shadowSpread,
          shadowRgba
        );
      }

      // Generate CSS code
      function generateCode(
        blur,
        bgRgba,
        borderWidth,
        borderRgba,
        radius,
        shadowEnabled,
        shadowX,
        shadowY,
        shadowBlur,
        shadowSpread,
        shadowRgba
      ) {
        let css = `.glass {
    /* 背景 */
    background: ${bgRgba};
    
    /* 毛玻璃效果 */
    backdrop-filter: blur(${blur}px);
    -webkit-backdrop-filter: blur(${blur}px);
    
    /* 圆角 */
    border-radius: ${radius}px;
    
    /* 边框 */
    border: ${borderWidth}px solid ${borderRgba};`;

        if (shadowEnabled) {
          css += `
    
    /* 阴影 */
    box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowRgba};`;
        }

        css += `
}`;

        document.getElementById("codeOutput").textContent = css;
      }

      // Copy code
      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = "复制"), 2000);
        });
      };

      // Reset to default
      window.resetToDefault = function () {
        document.getElementById("blurRange").value = 10;
        document.getElementById("opacityRange").value = 25;
        document.getElementById("bgColor").value = "#ffffff";
        document.getElementById("borderWidthRange").value = 1;
        document.getElementById("borderOpacityRange").value = 18;
        document.getElementById("borderColor").value = "#ffffff";
        document.getElementById("radiusRange").value = 16;
        document.getElementById("shadowToggle").checked = true;
        document.getElementById("shadowXRange").value = 0;
        document.getElementById("shadowYRange").value = 8;
        document.getElementById("shadowBlurRange").value = 32;
        document.getElementById("shadowSpreadRange").value = 0;
        document.getElementById("shadowOpacityRange").value = 37;

        selectBgPreset(0);
        updateGlass();
      };
    
