// @ts-nocheck
// Generated from tools/design/aurora-generator.html
// Source SHA-256: eec02d91eb846bd448be8e746ef73e4b1824b4e22c7bd2debd2ca43de5b20bdd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Elements
      const b1 = document.getElementById("blob-1");
      const b2 = document.getElementById("blob-2");
      const b3 = document.getElementById("blob-3");
      const b4 = document.getElementById("blob-4");
      const previewBg = document.getElementById("preview-bg");

      const inputs = {
        c1: document.getElementById("color-1"),
        c2: document.getElementById("color-2"),
        c3: document.getElementById("color-3"),
        c4: document.getElementById("color-4"),
        bg: document.getElementById("color-bg"),
        blur: document.getElementById("blur-slider"),
        opacity: document.getElementById("opacity-slider"),
        speed: document.getElementById("speed-slider")
      };

      const displays = {
        bg: document.getElementById("val-bg"),
        blur: document.getElementById("val-blur"),
        opacity: document.getElementById("val-opacity"),
        speed: document.getElementById("val-speed")
      };

      const cssOutput = document.getElementById("css-code");
      const copyBtn = document.getElementById("copy-btn");

      // Default animation durations (seconds)
      const baseDurations = [10, 14, 12, 16];

      function updateAurora() {
        const c1 = inputs.c1.value;
        const c2 = inputs.c2.value;
        const c3 = inputs.c3.value;
        const c4 = inputs.c4.value;
        const bg = inputs.bg.value;
        const blur = inputs.blur.value;
        const op = inputs.opacity.value;
        const speed = parseFloat(inputs.speed.value);

        // Update UI displays
        displays.bg.textContent = bg;
        displays.blur.textContent = blur + "px";
        displays.opacity.textContent = op;
        displays.speed.textContent = speed + "x";

        // Apply styles to preview
        previewBg.style.backgroundColor = bg;

        b1.style.backgroundColor = c1;
        b2.style.backgroundColor = c2;
        b3.style.backgroundColor = c3;
        b4.style.backgroundColor = c4;

        [b1, b2, b3, b4].forEach((b) => {
          b.style.filter = `blur(${blur}px)`;
          b.style.opacity = op;
        });

        if (speed === 0) {
          [b1, b2, b3, b4].forEach((b) => (b.style.animationPlayState = "paused"));
        } else {
          [b1, b2, b3, b4].forEach((b) => (b.style.animationPlayState = "running"));
          b1.style.animationDuration = `${baseDurations[0] / speed}s`;
          b2.style.animationDuration = `${baseDurations[1] / speed}s`;
          b3.style.animationDuration = `${baseDurations[2] / speed}s`;
          b4.style.animationDuration = `${baseDurations[3] / speed}s`;
        }

        generateCSS(c1, c2, c3, c4, bg, blur, op, speed);
      }

      function generateCSS(c1, c2, c3, c4, bg, blur, op, speed) {
        const dur1 = speed > 0 ? (baseDurations[0] / speed).toFixed(1) : 0;
        const dur2 = speed > 0 ? (baseDurations[1] / speed).toFixed(1) : 0;
        const dur3 = speed > 0 ? (baseDurations[2] / speed).toFixed(1) : 0;
        const dur4 = speed > 0 ? (baseDurations[3] / speed).toFixed(1) : 0;

        const code = `.aurora-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${bg};
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  filter: blur(${blur}px);
  opacity: ${op};
  border-radius: 50%;
  animation: aurora-float infinite alternate ease-in-out;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.blob-1 {
  top: -10%; left: -10%; width: 50%; height: 50%;
  background-color: ${c1};
  animation-duration: ${dur1}s;
}
.blob-2 {
  top: 40%; left: -20%; width: 60%; height: 60%;
  background-color: ${c2};
  animation-duration: ${dur2}s;
  animation-delay: -2s;
}
.blob-3 {
  top: -20%; right: -10%; width: 55%; height: 55%;
  background-color: ${c3};
  animation-duration: ${dur3}s;
  animation-delay: -5s;
}
.blob-4 {
  bottom: -20%; right: -20%; width: 65%; height: 65%;
  background-color: ${c4};
  animation-duration: ${dur4}s;
  animation-delay: -8s;
}

@keyframes aurora-float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}`;
        cssOutput.textContent = code;
      }

      function setCopyStatus(text, color) {
        const origText = copyBtn.textContent;
        copyBtn.textContent = text;
        copyBtn.style.backgroundColor = color;
        setTimeout(() => {
          copyBtn.textContent = origText;
          copyBtn.style.backgroundColor = "";
        }, 2000);
      }

      function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          return navigator.clipboard.writeText(text);
        }

        return Promise.reject(new Error("Clipboard API unavailable"));
      }

      // Event Listeners
      Object.values(inputs).forEach((input) => {
        input.addEventListener("input", updateAurora);
      });

      copyBtn.addEventListener("click", () => {
        copyToClipboard(cssOutput.textContent)
          .then(() => setCopyStatus("Copied!", "var(--accent-green)"))
          .catch(() => setCopyStatus("Copy failed", "var(--accent-red)"));
      });

      // Initial render
      updateAurora();
    
