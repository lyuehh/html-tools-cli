// @ts-nocheck
// Generated from tools/dev/css-animation-generator.html
// Source SHA-256: 98e984698fe2b41f7cf638d3ae098204627a364f508953b3d8ee34d5b209f140
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      let keyframes = [
        { percent: 0, transform: "translateY(0)", opacity: "1" },
        { percent: 50, transform: "translateY(-30px)", opacity: "1" },
        { percent: 100, transform: "translateY(0)", opacity: "1" }
      ];

      const presets = {
        bounce: [
          { percent: 0, transform: "translateY(0)" },
          { percent: 50, transform: "translateY(-30px)" },
          { percent: 100, transform: "translateY(0)" }
        ],
        shake: [
          { percent: 0, transform: "translateX(0)" },
          { percent: 25, transform: "translateX(-10px)" },
          { percent: 50, transform: "translateX(10px)" },
          { percent: 75, transform: "translateX(-10px)" },
          { percent: 100, transform: "translateX(0)" }
        ],
        pulse: [
          { percent: 0, transform: "scale(1)", opacity: "1" },
          { percent: 50, transform: "scale(1.1)", opacity: "0.8" },
          { percent: 100, transform: "scale(1)", opacity: "1" }
        ],
        rotate: [
          { percent: 0, transform: "rotate(0deg)" },
          { percent: 100, transform: "rotate(360deg)" }
        ],
        fade: [
          { percent: 0, opacity: "0" },
          { percent: 50, opacity: "1" },
          { percent: 100, opacity: "0" }
        ],
        slide: [
          { percent: 0, transform: "translateX(-100px)", opacity: "0" },
          { percent: 100, transform: "translateX(0)", opacity: "1" }
        ],
        flip: [
          { percent: 0, transform: "perspective(400px) rotateY(0)" },
          { percent: 100, transform: "perspective(400px) rotateY(360deg)" }
        ],
        swing: [
          { percent: 0, transform: "rotate(0deg)" },
          { percent: 20, transform: "rotate(15deg)" },
          { percent: 40, transform: "rotate(-10deg)" },
          { percent: 60, transform: "rotate(5deg)" },
          { percent: 80, transform: "rotate(-5deg)" },
          { percent: 100, transform: "rotate(0deg)" }
        ]
      };

      window.loadPreset = function (name) {
        keyframes = JSON.parse(JSON.stringify(presets[name]));
        document.querySelectorAll(".preset-btn").forEach((btn) => btn.classList.remove("active"));
        event.target.classList.add("active");
        renderKeyframes();
        updateAnimation();
      };

      function renderKeyframes() {
        const list = document.getElementById("keyframeList");
        list.innerHTML = keyframes
          .map(
            (kf, i) => `
                <div class="keyframe-item">
                    <div class="keyframe-percent">${kf.percent}%</div>
                    <div class="keyframe-props">
                        <input type="text" placeholder="transform" value="${kf.transform || ""}" 
                               oninput="updateKeyframe(${i}, 'transform', this.value)">
                        <input type="text" placeholder="opacity" value="${kf.opacity || ""}" 
                               oninput="updateKeyframe(${i}, 'opacity', this.value)">
                    </div>
                    ${keyframes.length > 2 ? `<button class="btn btn-danger" onclick="removeKeyframe(${i})">×</button>` : ""}
                </div>
            `
          )
          .join("");

        renderTimeline();
      }

      function renderTimeline() {
        const timeline = document.getElementById("timeline");
        const markers = keyframes
          .map(
            (kf) =>
              `<div class="timeline-marker" style="left: calc(20px + ${kf.percent}% * (100% - 40px) / 100)"></div>`
          )
          .join("");
        timeline.innerHTML = `<div class="timeline-track"></div>${markers}`;
      }

      window.updateKeyframe = function (index, prop, value) {
        if (value) {
          keyframes[index][prop] = value;
        } else {
          delete keyframes[index][prop];
        }
        updateAnimation();
      };

      window.addKeyframe = function () {
        const lastPercent = keyframes[keyframes.length - 1].percent;
        const newPercent = Math.min(lastPercent + 10, 100);
        if (!keyframes.find((kf) => kf.percent === newPercent)) {
          keyframes.push({ percent: newPercent, transform: "" });
          keyframes.sort((a, b) => a.percent - b.percent);
          renderKeyframes();
          updateAnimation();
        }
      };

      window.removeKeyframe = function (index) {
        if (keyframes.length > 2) {
          keyframes.splice(index, 1);
          renderKeyframes();
          updateAnimation();
        }
      };

      function updateAnimation() {
        const name = document.getElementById("animName").value || "myAnimation";
        const duration = document.getElementById("duration").value;
        const delay = document.getElementById("delay").value;
        const easing = document.getElementById("easing").value;
        const iteration = document.getElementById("iteration").value;
        const direction = document.getElementById("direction").value;
        const fillMode = document.getElementById("fillMode").value;

        document.getElementById("durationVal").textContent = duration + "s";
        document.getElementById("delayVal").textContent = delay + "s";

        // Generate keyframes CSS
        const keyframesCss = keyframes
          .map((kf) => {
            const props = [];
            if (kf.transform) props.push(`transform: ${kf.transform}`);
            if (kf.opacity) props.push(`opacity: ${kf.opacity}`);
            return `  ${kf.percent}% { ${props.join("; ")}; }`;
          })
          .join("\n");

        const css = `@keyframes ${name} {
${keyframesCss}
}

.animated-element {
  animation-name: ${name};
  animation-duration: ${duration}s;
  animation-delay: ${delay}s;
  animation-timing-function: ${easing};
  animation-iteration-count: ${iteration};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
}`;

        document.getElementById("codeOutput").textContent = css;

        // Apply to preview
        let styleEl = document.getElementById("dynamicStyle");
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = "dynamicStyle";
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = `@keyframes previewAnim {
${keyframesCss}
}
#previewBox {
  animation: previewAnim ${duration}s ${easing} ${delay}s ${iteration} ${direction} ${fillMode};
}`;
      }

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code);
        alert("已复制到剪贴板");
      };

      window.resetAnimation = function () {
        const box = document.getElementById("previewBox");
        box.style.animation = "none";
        box.offsetHeight; // Trigger reflow
        box.style.animation = "";
      };

      renderKeyframes();
      updateAnimation();
    
