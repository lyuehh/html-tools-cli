// @ts-nocheck
// Generated from tools/dev/css-animation.html
// Source SHA-256: f610e172e9c3e81afb78ab927bfdc103c8c1020b0952cd61903aaa6695080b15
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let keyframes = [
        { percent: 0, css: "transform: translateY(0);" },
        { percent: 50, css: "transform: translateY(-20px);" },
        { percent: 100, css: "transform: translateY(0);" }
      ];
      let isPlaying = true;

      const presets = {
        bounce: [
          { percent: 0, css: "transform: translateY(0);" },
          { percent: 50, css: "transform: translateY(-30px);" },
          { percent: 100, css: "transform: translateY(0);" }
        ],
        shake: [
          { percent: 0, css: "transform: translateX(0);" },
          { percent: 25, css: "transform: translateX(-10px);" },
          { percent: 50, css: "transform: translateX(10px);" },
          { percent: 75, css: "transform: translateX(-10px);" },
          { percent: 100, css: "transform: translateX(0);" }
        ],
        pulse: [
          { percent: 0, css: "transform: scale(1);" },
          { percent: 50, css: "transform: scale(1.1);" },
          { percent: 100, css: "transform: scale(1);" }
        ],
        spin: [
          { percent: 0, css: "transform: rotate(0deg);" },
          { percent: 100, css: "transform: rotate(360deg);" }
        ],
        fade: [
          { percent: 0, css: "opacity: 1;" },
          { percent: 50, css: "opacity: 0.3;" },
          { percent: 100, css: "opacity: 1;" }
        ],
        slide: [
          { percent: 0, css: "transform: translateX(-50px); opacity: 0;" },
          { percent: 100, css: "transform: translateX(0); opacity: 1;" }
        ],
        flip: [
          { percent: 0, css: "transform: perspective(400px) rotateY(0);" },
          { percent: 100, css: "transform: perspective(400px) rotateY(360deg);" }
        ],
        swing: [
          { percent: 0, css: "transform: rotate(0deg);" },
          { percent: 20, css: "transform: rotate(15deg);" },
          { percent: 40, css: "transform: rotate(-10deg);" },
          { percent: 60, css: "transform: rotate(5deg);" },
          { percent: 80, css: "transform: rotate(-5deg);" },
          { percent: 100, css: "transform: rotate(0deg);" }
        ]
      };

      function applyPreset(name) {
        keyframes = JSON.parse(JSON.stringify(presets[name]));
        renderKeyframes();
        update();
      }

      function renderKeyframes() {
        const container = document.getElementById("keyframesList");
        container.innerHTML = keyframes
          .map(
            (kf, i) => `
                <div class="keyframe">
                    <div class="keyframe-header">
                        <span><input type="number" value="${kf.percent}" min="0" max="100" onchange="updateKeyframe(${i}, 'percent', this.value)" aria-label="数字输入框" placeholder="请输入数字输入框">%</span>
                        ${keyframes.length > 2 ? `<button class="btn btn-sm" style="background:#e74c3c" onclick="removeKeyframe(${i})" aria-label="×">×</button>` : ""}
                    </div>
                    <textarea oninput="updateKeyframe(${i}, 'css', this.value)">${kf.css}</textarea>
                </div>
            `
          )
          .join("");
      }

      function updateKeyframe(index, prop, value) {
        keyframes[index][prop] = prop === "percent" ? parseInt(value) : value;
        update();
      }

      function addKeyframe() {
        const lastPercent = keyframes[keyframes.length - 1].percent;
        keyframes.push({ percent: Math.min(lastPercent + 25, 100), css: "transform: none;" });
        keyframes.sort((a, b) => a.percent - b.percent);
        renderKeyframes();
        update();
      }

      function removeKeyframe(index) {
        if (keyframes.length > 2) {
          keyframes.splice(index, 1);
          renderKeyframes();
          update();
        }
      }

      function update() {
        const name = document.getElementById("animationName").value;
        const duration = document.getElementById("duration").value;
        const delay = document.getElementById("delay").value;
        const timing = document.getElementById("timing").value;
        const iteration = document.getElementById("iteration").value;
        const direction = document.getElementById("direction").value;
        const fillMode = document.getElementById("fillMode").value;

        const keyframeCSS = keyframes.map((kf) => `  ${kf.percent}% { ${kf.css} }`).join("\n");

        const css = `@keyframes ${name} {\n${keyframeCSS}\n}\n\n.element {\n  animation: ${name} ${duration} ${timing} ${delay} ${iteration} ${direction} ${fillMode};\n}`;

        document.getElementById("output").textContent = css;

        // Apply to preview
        const style = document.createElement("style");
        style.textContent = `@keyframes ${name} {\n${keyframeCSS}\n}`;
        document.head.querySelectorAll("style[data-animation]").forEach((s) => s.remove());
        style.dataset.animation = "true";
        document.head.appendChild(style);

        const preview = document.getElementById("preview");
        preview.style.animation = isPlaying
          ? `${name} ${duration} ${timing} ${delay} ${iteration} ${direction} ${fillMode}`
          : "none";
      }

      function toggleAnimation() {
        isPlaying = !isPlaying;
        update();
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        alert("已复制到剪贴板!");
      }

      renderKeyframes();
      update();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
