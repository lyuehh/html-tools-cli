// @ts-nocheck
// Generated from tools/generator/progress-bar-generator.html
// Source SHA-256: 3de24065648ef66b149e7284ac3618e0588c9d1f0c98699ae38996e1e75b17e5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme toggle
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Initialize theme
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      let currentTab = "html";

      const presets = {
        default: {
          progress: 65,
          width: 400,
          height: 20,
          borderRadius: 10,
          barColor: "#00bcd4",
          bgColor: "#e0e0e0",
          gradientColor: "#4caf50",
          useGradient: false,
          showLabel: true,
          animation: "none",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 12
        },
        gradient: {
          progress: 75,
          width: 400,
          height: 24,
          borderRadius: 12,
          barColor: "#667eea",
          bgColor: "#e0e0e0",
          gradientColor: "#764ba2",
          useGradient: true,
          showLabel: true,
          animation: "none",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 12
        },
        striped: {
          progress: 60,
          width: 400,
          height: 20,
          borderRadius: 10,
          barColor: "#4caf50",
          bgColor: "#e0e0e0",
          gradientColor: "#81c784",
          useGradient: false,
          showLabel: true,
          animation: "striped",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 12
        },
        animated: {
          progress: 70,
          width: 400,
          height: 22,
          borderRadius: 11,
          barColor: "#2196f3",
          bgColor: "#e0e0e0",
          gradientColor: "#64b5f6",
          useGradient: false,
          showLabel: true,
          animation: "striped-animated",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 12
        },
        glow: {
          progress: 80,
          width: 400,
          height: 16,
          borderRadius: 8,
          barColor: "#ff4081",
          bgColor: "#424242",
          gradientColor: "#ff80ab",
          useGradient: false,
          showLabel: true,
          animation: "glow",
          animationSpeed: 1.5,
          transition: 0.3,
          labelPosition: "outside-right",
          labelColor: "#ff4081",
          labelSize: 14
        },
        rounded: {
          progress: 55,
          width: 400,
          height: 30,
          borderRadius: 15,
          barColor: "#ff9800",
          bgColor: "#e0e0e0",
          gradientColor: "#ffb74d",
          useGradient: false,
          showLabel: true,
          animation: "none",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 14
        },
        thin: {
          progress: 45,
          width: 400,
          height: 6,
          borderRadius: 3,
          barColor: "#9c27b0",
          bgColor: "#e0e0e0",
          gradientColor: "#ce93d8",
          useGradient: false,
          showLabel: true,
          animation: "none",
          animationSpeed: 1,
          transition: 0.3,
          labelPosition: "outside-right",
          labelColor: "#9c27b0",
          labelSize: 12
        },
        thick: {
          progress: 85,
          width: 400,
          height: 40,
          borderRadius: 8,
          barColor: "#f44336",
          bgColor: "#e0e0e0",
          gradientColor: "#ef5350",
          useGradient: true,
          showLabel: true,
          animation: "pulse",
          animationSpeed: 2,
          transition: 0.3,
          labelPosition: "inside",
          labelColor: "#ffffff",
          labelSize: 16
        }
      };

      window.applyPreset = function (name) {
        const preset = presets[name];
        if (!preset) return;

        document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");

        document.getElementById("progress").value = preset.progress;
        document.getElementById("width").value = preset.width;
        document.getElementById("height").value = preset.height;
        document.getElementById("borderRadius").value = preset.borderRadius;
        document.getElementById("barColor").value = preset.barColor;
        document.getElementById("bgColor").value = preset.bgColor;
        document.getElementById("gradientColor").value = preset.gradientColor;
        document.getElementById("useGradient").checked = preset.useGradient;
        document.getElementById("showLabel").checked = preset.showLabel;
        document.getElementById("animation").value = preset.animation;
        document.getElementById("animationSpeed").value = preset.animationSpeed;
        document.getElementById("transition").value = preset.transition;
        document.getElementById("labelPosition").value = preset.labelPosition;
        document.getElementById("labelColor").value = preset.labelColor;
        document.getElementById("labelSize").value = preset.labelSize;

        updatePreview();
      };

      function getSettings() {
        return {
          progress: parseInt(document.getElementById("progress").value),
          width: parseInt(document.getElementById("width").value),
          height: parseInt(document.getElementById("height").value),
          borderRadius: parseInt(document.getElementById("borderRadius").value),
          barColor: document.getElementById("barColor").value,
          bgColor: document.getElementById("bgColor").value,
          gradientColor: document.getElementById("gradientColor").value,
          useGradient: document.getElementById("useGradient").checked,
          showLabel: document.getElementById("showLabel").checked,
          animation: document.getElementById("animation").value,
          animationSpeed: parseFloat(document.getElementById("animationSpeed").value),
          transition: parseFloat(document.getElementById("transition").value),
          labelPosition: document.getElementById("labelPosition").value,
          labelColor: document.getElementById("labelColor").value,
          labelSize: parseInt(document.getElementById("labelSize").value)
        };
      }

      window.updatePreview = function () {
        const s = getSettings();

        // Update value displays
        document.getElementById("progressValue").textContent = s.progress + "%";
        document.getElementById("widthValue").textContent = s.width + "px";
        document.getElementById("heightValue").textContent = s.height + "px";
        document.getElementById("borderRadiusValue").textContent = s.borderRadius + "px";
        document.getElementById("animationSpeedValue").textContent = s.animationSpeed + "s";
        document.getElementById("transitionValue").textContent = s.transition + "s";
        document.getElementById("labelSizeValue").textContent = s.labelSize + "px";

        // Generate preview
        const container = document.getElementById("previewContainer");
        container.innerHTML = generateHTML(s);

        // Add dynamic styles
        let styleEl = document.getElementById("dynamic-styles");
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = "dynamic-styles";
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = generateCSS(s);

        // Update code output
        updateCodeOutput();
      };

      function generateHTML(s) {
        const labelHtml = s.showLabel ? `<span class="progress-label">${s.progress}%</span>` : "";

        if (s.labelPosition === "outside-top") {
          return `<div class="progress-wrapper">
    ${labelHtml}
    <div class="progress-bar">
        <div class="progress-fill" style="width: ${s.progress}%"></div>
    </div>
</div>`;
        } else if (s.labelPosition === "outside-right") {
          return `<div class="progress-wrapper">
    <div class="progress-bar">
        <div class="progress-fill" style="width: ${s.progress}%"></div>
    </div>
    ${labelHtml}
</div>`;
        } else {
          return `<div class="progress-bar">
    <div class="progress-fill" style="width: ${s.progress}%">
        ${labelHtml}
    </div>
</div>`;
        }
      }

      function generateCSS(s) {
        let css = "";

        // Wrapper styles for external labels
        if (s.labelPosition !== "inside") {
          css += `.progress-wrapper {
    display: flex;
    ${s.labelPosition === "outside-top" ? "flex-direction: column" : "align-items: center"};
    gap: 10px;
    width: ${s.width}px;
}
`;
        }

        // Progress bar container
        css += `.progress-bar {
    width: ${s.labelPosition === "inside" ? s.width + "px" : "100%"};
    height: ${s.height}px;
    background: ${s.bgColor};
    border-radius: ${s.borderRadius}px;
    overflow: hidden;
    position: relative;
}
`;

        // Progress fill
        let fillBg = s.barColor;
        if (s.useGradient) {
          fillBg = `linear-gradient(90deg, ${s.barColor}, ${s.gradientColor})`;
        }

        let animationCss = "";
        if (s.animation === "striped" || s.animation === "striped-animated") {
          fillBg = `linear-gradient(
        45deg,
        rgba(255,255,255,0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255,255,255,0.15) 50%,
        rgba(255,255,255,0.15) 75%,
        transparent 75%,
        transparent
    ), ${s.useGradient ? `linear-gradient(90deg, ${s.barColor}, ${s.gradientColor})` : s.barColor}`;
          css += `.progress-fill {
    background: ${fillBg};
    background-size: ${s.height}px ${s.height}px, 100% 100%;
}
`;
          if (s.animation === "striped-animated") {
            animationCss = `animation: progress-stripes ${s.animationSpeed}s linear infinite;`;
            css += `@keyframes progress-stripes {
    from { background-position: ${s.height}px 0, 0 0; }
    to { background-position: 0 0, 0 0; }
}
`;
          }
        } else if (s.animation === "pulse") {
          animationCss = `animation: progress-pulse ${s.animationSpeed}s ease-in-out infinite;`;
          css += `@keyframes progress-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}
`;
        } else if (s.animation === "glow") {
          animationCss = `animation: progress-glow ${s.animationSpeed}s ease-in-out infinite;`;
          css += `@keyframes progress-glow {
    0%, 100% { box-shadow: 0 0 5px ${s.barColor}, 0 0 10px ${s.barColor}; }
    50% { box-shadow: 0 0 10px ${s.barColor}, 0 0 20px ${s.barColor}, 0 0 30px ${s.barColor}; }
}
`;
        }

        if (s.animation !== "striped" && s.animation !== "striped-animated") {
          css += `.progress-fill {
    background: ${fillBg};
}
`;
        }

        css += `.progress-fill {
    height: 100%;
    border-radius: ${s.borderRadius}px;
    transition: width ${s.transition}s ease;
    display: flex;
    align-items: center;
    justify-content: ${s.labelPosition === "inside" ? "center" : "flex-end"};
    ${animationCss}
}
`;

        // Label styles
        if (s.showLabel) {
          css += `.progress-label {
    color: ${s.labelColor};
    font-size: ${s.labelSize}px;
    font-weight: 600;
    ${s.labelPosition === "inside" ? "padding: 0 8px;" : ""}
    white-space: nowrap;
}
`;
        }

        return css;
      }

      window.showTab = function (tab) {
        currentTab = tab;
        document.querySelectorAll(".code-tab").forEach((t) => t.classList.remove("active"));
        event.target.classList.add("active");
        updateCodeOutput();
      };

      function updateCodeOutput() {
        const s = getSettings();
        const codeOutput = document.getElementById("codeOutput");

        if (currentTab === "html") {
          codeOutput.textContent = generateHTML(s);
        } else if (currentTab === "css") {
          codeOutput.textContent = generateCSS(s);
        } else {
          codeOutput.textContent = `<!-- HTML -->
${generateHTML(s)}

<!-- CSS -->
<style>
${generateCSS(s)}
</style>`;
        }
      }

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "复制";
            btn.classList.remove("copied");
          }, 2000);
        });
      };

      // Initialize
      updatePreview();
    
