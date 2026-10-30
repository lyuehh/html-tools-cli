// @ts-nocheck
// Generated from tools/design/css-animation-generator.html
// Source SHA-256: da1dd7fd3bdccb5d403bc5f2fc4a217ee128268e347772ca4807d5dc12a41a03
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const previewBox = document.getElementById("previewBox");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");
      const presetsEl = document.getElementById("presets");

      const animations = {
        bounce: {
          name: "bounce",
          keyframes: `@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
}`
        },
        pulse: {
          name: "pulse",
          keyframes: `@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`
        },
        shake: {
          name: "shake",
          keyframes: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}`
        },
        spin: {
          name: "spin",
          keyframes: `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`
        },
        fade: {
          name: "fade",
          keyframes: `@keyframes fade {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}`
        },
        slideIn: {
          name: "slideIn",
          keyframes: `@keyframes slideIn {
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}`
        },
        swing: {
          name: "swing",
          keyframes: `@keyframes swing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
}`
        },
        flip: {
          name: "flip",
          keyframes: `@keyframes flip {
  0% { transform: perspective(400px) rotateY(0); }
  100% { transform: perspective(400px) rotateY(360deg); }
}`
        }
      };

      let currentAnim = "bounce";

      function renderPresets() {
        Object.keys(animations).forEach((key) => {
          const btn = document.createElement("button");
          btn.className = "preset" + (key === currentAnim ? " active" : "");
          btn.textContent = key;
          btn.onclick = () => selectPreset(key);
          presetsEl.appendChild(btn);
        });
      }

      function selectPreset(key) {
        currentAnim = key;
        document.querySelectorAll(".preset").forEach((el) => el.classList.remove("active"));
        document
          .querySelector(`.preset:nth-child(${Object.keys(animations).indexOf(key) + 1})`)
          .classList.add("active");
        document.getElementById("animName").value = key;
        updateAnimation();
      }

      function updateAnimation() {
        const name = document.getElementById("animName").value || "myAnimation";
        const duration = document.getElementById("duration").value;
        const easing = document.getElementById("easing").value;
        const iteration = document.getElementById("iteration").value;
        const direction = document.getElementById("direction").value;
        const fillMode = document.getElementById("fillMode").value;

        const anim = animations[currentAnim];
        const animationValue = `${anim.name} ${duration} ${easing} ${iteration} ${direction} ${fillMode}`;

        // 更新预览
        previewBox.style.animation = "none";
        previewBox.offsetHeight; // 触发重绘
        previewBox.style.animation = animationValue;

        // 生成 CSS
        const css = `${anim.keyframes}

.element {
  animation: ${animationValue};
}`;
        outputEl.value = css;
      }

      function playAnimation() {
        previewBox.style.animation = "none";
        previewBox.offsetHeight;
        updateAnimation();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      renderPresets();
      updateAnimation();

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
    
