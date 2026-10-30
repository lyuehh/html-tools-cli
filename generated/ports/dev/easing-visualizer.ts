// @ts-nocheck
// Generated from tools/dev/easing-visualizer.html
// Source SHA-256: bb9f8c47d9b958ec036816199e32f15692381c99e1f8e6016b21cc8cd3571c05
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ==================== EASING PRESETS ====================
      var EASING_PRESETS = [
        // CSS Native (5)
        { id: "linear", name: "linear", category: "css", bezier: [0, 0, 1, 1] },
        { id: "ease", name: "ease", category: "css", bezier: [0.25, 0.1, 0.25, 1] },
        { id: "ease-in", name: "ease-in", category: "css", bezier: [0.42, 0, 1, 1] },
        { id: "ease-out", name: "ease-out", category: "css", bezier: [0, 0, 0.58, 1] },
        { id: "ease-in-out", name: "ease-in-out", category: "css", bezier: [0.42, 0, 0.58, 1] },

        // Sine (3)
        { id: "easeInSine", name: "easeInSine", category: "sine", bezier: [0.47, 0, 0.745, 0.715] },
        {
          id: "easeOutSine",
          name: "easeOutSine",
          category: "sine",
          bezier: [0.39, 0.575, 0.565, 1]
        },
        {
          id: "easeInOutSine",
          name: "easeInOutSine",
          category: "sine",
          bezier: [0.445, 0.05, 0.55, 0.95]
        },

        // Quad (3)
        {
          id: "easeInQuad",
          name: "easeInQuad",
          category: "quad",
          bezier: [0.55, 0.085, 0.68, 0.53]
        },
        {
          id: "easeOutQuad",
          name: "easeOutQuad",
          category: "quad",
          bezier: [0.25, 0.46, 0.45, 0.94]
        },
        {
          id: "easeInOutQuad",
          name: "easeInOutQuad",
          category: "quad",
          bezier: [0.455, 0.03, 0.515, 0.955]
        },

        // Cubic (3)
        {
          id: "easeInCubic",
          name: "easeInCubic",
          category: "cubic",
          bezier: [0.55, 0.055, 0.675, 0.19]
        },
        {
          id: "easeOutCubic",
          name: "easeOutCubic",
          category: "cubic",
          bezier: [0.215, 0.61, 0.355, 1]
        },
        {
          id: "easeInOutCubic",
          name: "easeInOutCubic",
          category: "cubic",
          bezier: [0.645, 0.045, 0.355, 1]
        },

        // Quart (3)
        {
          id: "easeInQuart",
          name: "easeInQuart",
          category: "quart",
          bezier: [0.895, 0.03, 0.685, 0.22]
        },
        {
          id: "easeOutQuart",
          name: "easeOutQuart",
          category: "quart",
          bezier: [0.165, 0.84, 0.44, 1]
        },
        {
          id: "easeInOutQuart",
          name: "easeInOutQuart",
          category: "quart",
          bezier: [0.77, 0, 0.175, 1]
        },

        // Quint (3)
        {
          id: "easeInQuint",
          name: "easeInQuint",
          category: "quint",
          bezier: [0.755, 0.05, 0.855, 0.06]
        },
        { id: "easeOutQuint", name: "easeOutQuint", category: "quint", bezier: [0.23, 1, 0.32, 1] },
        {
          id: "easeInOutQuint",
          name: "easeInOutQuint",
          category: "quint",
          bezier: [0.86, 0, 0.07, 1]
        },

        // Expo (3)
        {
          id: "easeInExpo",
          name: "easeInExpo",
          category: "expo",
          bezier: [0.95, 0.05, 0.795, 0.035]
        },
        { id: "easeOutExpo", name: "easeOutExpo", category: "expo", bezier: [0.19, 1, 0.22, 1] },
        { id: "easeInOutExpo", name: "easeInOutExpo", category: "expo", bezier: [1, 0, 0, 1] },

        // Circ (3)
        {
          id: "easeInCirc",
          name: "easeInCirc",
          category: "circ",
          bezier: [0.6, 0.04, 0.98, 0.335]
        },
        {
          id: "easeOutCirc",
          name: "easeOutCirc",
          category: "circ",
          bezier: [0.075, 0.82, 0.165, 1]
        },
        {
          id: "easeInOutCirc",
          name: "easeInOutCirc",
          category: "circ",
          bezier: [0.785, 0.135, 0.15, 0.86]
        },

        // Back (3)
        {
          id: "easeInBack",
          name: "easeInBack",
          category: "back",
          bezier: [0.6, -0.28, 0.735, 0.045]
        },
        {
          id: "easeOutBack",
          name: "easeOutBack",
          category: "back",
          bezier: [0.175, 0.885, 0.32, 1.275]
        },
        {
          id: "easeInOutBack",
          name: "easeInOutBack",
          category: "back",
          bezier: [0.68, -0.55, 0.265, 1.55]
        },

        // Elastic (3)
        {
          id: "easeInElastic",
          name: "easeInElastic",
          category: "elastic",
          bezier: [0.5, -0.5, 0.75, -0.5],
          jsOnly: true
        },
        {
          id: "easeOutElastic",
          name: "easeOutElastic",
          category: "elastic",
          bezier: [0.25, 1.5, 0.5, 1.5],
          jsOnly: true
        },
        {
          id: "easeInOutElastic",
          name: "easeInOutElastic",
          category: "elastic",
          bezier: [0.5, -0.25, 0.5, 1.25],
          jsOnly: true
        },

        // Bounce (3)
        {
          id: "easeInBounce",
          name: "easeInBounce",
          category: "bounce",
          bezier: [0.6, -0.28, 0.74, 0.05],
          jsOnly: true
        },
        {
          id: "easeOutBounce",
          name: "easeOutBounce",
          category: "bounce",
          bezier: [0.28, 0.84, 0.42, 1],
          jsOnly: true
        },
        {
          id: "easeInOutBounce",
          name: "easeInOutBounce",
          category: "bounce",
          bezier: [0.68, -0.55, 0.27, 1.55],
          jsOnly: true
        }
      ];

      // ==================== STATE ====================
      var state = {
        bezier: [0.25, 0.1, 0.25, 1],
        currentPreset: "ease",
        duration: 1,
        activeCategory: "all",
        activeExportFormat: "css",
        isLooping: false,
        loopInterval: null
      };

      // ==================== DOM ELEMENTS ====================
      var canvas = document.getElementById("easingCanvas");
      var ctx = canvas.getContext("2d");
      var presetList = document.getElementById("presetList");
      var presetCount = document.getElementById("presetCount");
      var canvasInfo = document.getElementById("canvasInfo");
      var previewBall = document.getElementById("previewBall");
      var compCurrent = document.getElementById("compCurrent");
      var codeOutput = document.getElementById("codeOutput");
      var statusEl = document.getElementById("status");
      var durationRange = document.getElementById("durationRange");
      var durationValue = document.getElementById("durationValue");
      var inputX1 = document.getElementById("inputX1");
      var inputY1 = document.getElementById("inputY1");
      var inputX2 = document.getElementById("inputX2");
      var inputY2 = document.getElementById("inputY2");

      // ==================== CANVAS RENDERING ====================
      var padding = 30;
      var size = 200;
      var dragging = null;

      function toCanvasX(x) {
        return padding + x * size;
      }
      function toCanvasY(y) {
        return padding + (1 - y) * size;
      }
      function fromCanvasX(cx) {
        return (cx - padding) / size;
      }
      function fromCanvasY(cy) {
        return 1 - (cy - padding) / size;
      }

      function drawCurve() {
        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        var x1 = state.bezier[0],
          y1 = state.bezier[1],
          x2 = state.bezier[2],
          y2 = state.bezier[3];

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = isDark ? "#2a2a3a" : "#e0e0e8";
        ctx.lineWidth = 1;
        for (var i = 0; i <= 4; i++) {
          var pos = padding + (size / 4) * i;
          ctx.beginPath();
          ctx.moveTo(pos, padding);
          ctx.lineTo(pos, padding + size);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(padding, pos);
          ctx.lineTo(padding + size, pos);
          ctx.stroke();
        }

        // Border
        ctx.strokeStyle = isDark ? "#4a4a5a" : "#b0b0c0";
        ctx.lineWidth = 2;
        ctx.strokeRect(padding, padding, size, size);

        // Linear reference (diagonal)
        ctx.strokeStyle = isDark ? "#4a4a5a" : "#c0c0d0";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.lineTo(toCanvasX(1), toCanvasY(1));
        ctx.stroke();
        ctx.setLineDash([]);

        // Control lines
        ctx.strokeStyle = isDark ? "#6a6a7a" : "#a0a0b0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.lineTo(toCanvasX(x1), toCanvasY(y1));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toCanvasX(1), toCanvasY(1));
        ctx.lineTo(toCanvasX(x2), toCanvasY(y2));
        ctx.stroke();

        // Bezier curve
        ctx.strokeStyle = "#00f5d4";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.bezierCurveTo(
          toCanvasX(x1),
          toCanvasY(y1),
          toCanvasX(x2),
          toCanvasY(y2),
          toCanvasX(1),
          toCanvasY(1)
        );
        ctx.stroke();

        // Start/End points
        ctx.fillStyle = isDark ? "#5a5a6a" : "#8080a0";
        ctx.beginPath();
        ctx.arc(toCanvasX(0), toCanvasY(0), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(toCanvasX(1), toCanvasY(1), 5, 0, Math.PI * 2);
        ctx.fill();

        // Control points
        ctx.fillStyle = "#f72585";
        ctx.beginPath();
        ctx.arc(toCanvasX(x1), toCanvasY(y1), 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#00f5d4";
        ctx.beginPath();
        ctx.arc(toCanvasX(x2), toCanvasY(y2), 8, 0, Math.PI * 2);
        ctx.fill();
      }

      function drawMiniCurve(miniCanvas, bezier) {
        var mctx = miniCanvas.getContext("2d");
        var x1 = bezier[0],
          y1 = bezier[1],
          x2 = bezier[2],
          y2 = bezier[3];
        var w = miniCanvas.width;
        var h = miniCanvas.height;
        var p = 2;
        var s = w - p * 2;

        mctx.clearRect(0, 0, w, h);

        var isDark = document.documentElement.getAttribute("data-theme") !== "light";
        mctx.strokeStyle = isDark ? "#00f5d4" : "#00c4a8";
        mctx.lineWidth = 1.5;
        mctx.beginPath();
        mctx.moveTo(p, h - p);
        mctx.bezierCurveTo(
          p + x1 * s,
          h - p - y1 * (h - p * 2),
          p + x2 * s,
          h - p - y2 * (h - p * 2),
          w - p,
          p
        );
        mctx.stroke();
      }

      // ==================== PRESET RENDERING ====================
      function renderPresets() {
        var category = state.activeCategory;
        var filtered =
          category === "all"
            ? EASING_PRESETS
            : EASING_PRESETS.filter(function (p) {
                return p.category === category;
              });

        presetCount.textContent = filtered.length;

        // Clear list safely
        while (presetList.firstChild) {
          presetList.removeChild(presetList.firstChild);
        }

        filtered.forEach(function (preset) {
          var btn = document.createElement("button");
          btn.className = "preset-item" + (state.currentPreset === preset.id ? " active" : "");
          btn.dataset.id = preset.id;

          var miniCanvas = document.createElement("canvas");
          miniCanvas.className = "preset-mini-curve";
          miniCanvas.width = 32;
          miniCanvas.height = 20;

          var nameSpan = document.createElement("span");
          nameSpan.textContent = preset.name;

          btn.appendChild(miniCanvas);
          btn.appendChild(nameSpan);

          btn.addEventListener("click", function () {
            selectPreset(preset.id);
          });
          presetList.appendChild(btn);

          drawMiniCurve(miniCanvas, preset.bezier);
        });
      }

      function selectPreset(presetId) {
        var preset = EASING_PRESETS.find(function (p) {
          return p.id === presetId;
        });
        if (!preset) return;

        state.currentPreset = presetId;
        state.bezier = preset.bezier.slice();

        updateInputs();
        drawCurve();
        updateCanvasInfo();
        updateExport();
        updatePresetButtons();
        updateAnimationTiming();
        saveToUrl();
      }

      function updatePresetButtons() {
        document.querySelectorAll(".preset-item").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.id === state.currentPreset);
        });
      }

      // ==================== INPUT HANDLING ====================
      function updateInputs() {
        inputX1.value = state.bezier[0].toFixed(2);
        inputY1.value = state.bezier[1].toFixed(2);
        inputX2.value = state.bezier[2].toFixed(2);
        inputY2.value = state.bezier[3].toFixed(2);
      }

      function handleInputChange() {
        var x1 = Math.max(0, Math.min(1, parseFloat(inputX1.value) || 0));
        var y1 = Math.max(-2, Math.min(2, parseFloat(inputY1.value) || 0));
        var x2 = Math.max(0, Math.min(1, parseFloat(inputX2.value) || 0));
        var y2 = Math.max(-2, Math.min(2, parseFloat(inputY2.value) || 0));

        state.bezier = [x1, y1, x2, y2];
        state.currentPreset = findMatchingPreset() || "custom";

        drawCurve();
        updateCanvasInfo();
        updateExport();
        updatePresetButtons();
        updateAnimationTiming();
        saveToUrl();
      }

      function findMatchingPreset() {
        var b = state.bezier;
        var found = EASING_PRESETS.find(function (p) {
          return (
            Math.abs(p.bezier[0] - b[0]) < 0.01 &&
            Math.abs(p.bezier[1] - b[1]) < 0.01 &&
            Math.abs(p.bezier[2] - b[2]) < 0.01 &&
            Math.abs(p.bezier[3] - b[3]) < 0.01
          );
        });
        return found ? found.id : null;
      }

      [inputX1, inputY1, inputX2, inputY2].forEach(function (input) {
        input.addEventListener("input", handleInputChange);
      });

      // ==================== CANVAS DRAG ====================
      function getMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }

      function hitTest(pos, pointX, pointY) {
        var px = toCanvasX(pointX);
        var py = toCanvasY(pointY);
        var dx = pos.x - px;
        var dy = pos.y - py;
        return Math.sqrt(dx * dx + dy * dy) < 15;
      }

      canvas.addEventListener("mousedown", function (e) {
        var pos = getMousePos(e);
        if (hitTest(pos, state.bezier[0], state.bezier[1])) dragging = "p1";
        else if (hitTest(pos, state.bezier[2], state.bezier[3])) dragging = "p2";
      });

      canvas.addEventListener("mousemove", function (e) {
        if (!dragging) return;
        var pos = getMousePos(e);
        var x = Math.max(0, Math.min(1, fromCanvasX(pos.x)));
        var y = Math.max(-0.5, Math.min(1.5, fromCanvasY(pos.y)));

        if (dragging === "p1") {
          state.bezier[0] = x;
          state.bezier[1] = y;
        } else {
          state.bezier[2] = x;
          state.bezier[3] = y;
        }

        state.currentPreset = findMatchingPreset() || "custom";
        drawCurve();
        updateInputs();
        updateCanvasInfo();
        updateExport();
        updatePresetButtons();
        updateAnimationTiming();
      });

      canvas.addEventListener("mouseup", function () {
        dragging = null;
        saveToUrl();
      });
      canvas.addEventListener("mouseleave", function () {
        dragging = null;
        saveToUrl();
      });

      // Touch support
      canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        var pos = {
          x: touch.clientX - canvas.getBoundingClientRect().left,
          y: touch.clientY - canvas.getBoundingClientRect().top
        };
        if (hitTest(pos, state.bezier[0], state.bezier[1])) dragging = "p1";
        else if (hitTest(pos, state.bezier[2], state.bezier[3])) dragging = "p2";
      });

      canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();
        if (!dragging) return;
        var touch = e.touches[0];
        var pos = {
          x: touch.clientX - canvas.getBoundingClientRect().left,
          y: touch.clientY - canvas.getBoundingClientRect().top
        };
        var x = Math.max(0, Math.min(1, fromCanvasX(pos.x)));
        var y = Math.max(-0.5, Math.min(1.5, fromCanvasY(pos.y)));
        if (dragging === "p1") {
          state.bezier[0] = x;
          state.bezier[1] = y;
        } else {
          state.bezier[2] = x;
          state.bezier[3] = y;
        }
        state.currentPreset = findMatchingPreset() || "custom";
        drawCurve();
        updateInputs();
        updateCanvasInfo();
        updateExport();
        updatePresetButtons();
        updateAnimationTiming();
      });

      canvas.addEventListener("touchend", function () {
        dragging = null;
        saveToUrl();
      });

      // ==================== ANIMATION ====================
      function updateCanvasInfo() {
        var b = state.bezier;
        canvasInfo.textContent =
          "cubic-bezier(" +
          b[0].toFixed(2) +
          ", " +
          b[1].toFixed(2) +
          ", " +
          b[2].toFixed(2) +
          ", " +
          b[3].toFixed(2) +
          ")";
      }

      function updateAnimationTiming() {
        var b = state.bezier;
        var timing = "cubic-bezier(" + b[0] + ", " + b[1] + ", " + b[2] + ", " + b[3] + ")";
        previewBall.style.transitionTimingFunction = timing;
        previewBall.style.transitionDuration = state.duration + "s";
        compCurrent.style.transitionTimingFunction = timing;
        compCurrent.style.transitionDuration = state.duration + "s";
      }

      function playAnimation() {
        var balls = [previewBall, compCurrent].concat(
          Array.from(document.querySelectorAll(".comparison-ball[data-easing]"))
        );

        balls.forEach(function (ball) {
          ball.classList.remove("animate");
          ball.style.transitionDuration = state.duration + "s";
        });

        void previewBall.offsetWidth; // Force reflow

        balls.forEach(function (ball) {
          ball.classList.add("animate");
        });

        setTimeout(
          function () {
            balls.forEach(function (ball) {
              ball.classList.remove("animate");
            });
          },
          state.duration * 1000 + 100
        );
      }

      document.getElementById("btnPlay").addEventListener("click", function () {
        if (state.isLooping) stopLoop();
        playAnimation();
      });

      document.getElementById("btnLoop").addEventListener("click", function () {
        if (state.isLooping) {
          stopLoop();
          this.textContent = "🔄 循环";
        } else {
          startLoop();
          this.textContent = "⏹ 停止";
        }
      });

      function startLoop() {
        state.isLooping = true;
        playAnimation();
        state.loopInterval = setInterval(playAnimation, state.duration * 1000 + 500);
      }

      function stopLoop() {
        state.isLooping = false;
        clearInterval(state.loopInterval);
      }

      durationRange.addEventListener("input", function () {
        state.duration = parseFloat(durationRange.value);
        durationValue.textContent = state.duration + "s";
        updateAnimationTiming();

        document.querySelectorAll(".comparison-ball[data-easing]").forEach(function (ball) {
          ball.style.transitionDuration = state.duration + "s";
        });

        // 如果正在循环，重启 interval 以使用新时长
        if (state.isLooping) {
          clearInterval(state.loopInterval);
          state.loopInterval = setInterval(playAnimation, state.duration * 1000 + 500);
        }
      });

      // ==================== EXPORT FORMATS ====================
      var EXPORT_FORMATTERS = {
        css: function (bezier, name) {
          var value =
            "cubic-bezier(" +
            bezier[0] +
            ", " +
            bezier[1] +
            ", " +
            bezier[2] +
            ", " +
            bezier[3] +
            ")";
          return (
            "/* " +
            (name || "Custom Easing") +
            " */\n" +
            "transition-timing-function: " +
            value +
            ";\n" +
            "animation-timing-function: " +
            value +
            ";\n\n" +
            "/* 使用示例 */\n" +
            ".element {\n" +
            "  transition: all " +
            state.duration +
            "s " +
            value +
            ";\n" +
            "}"
          );
        },

        cssVar: function (bezier, name) {
          var varName = (name || "custom").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
          return (
            ":root {\n" +
            "  --easing-" +
            varName +
            ": cubic-bezier(" +
            bezier[0] +
            ", " +
            bezier[1] +
            ", " +
            bezier[2] +
            ", " +
            bezier[3] +
            ");\n" +
            "  --duration: " +
            state.duration +
            "s;\n" +
            "}\n\n" +
            ".element {\n" +
            "  transition: all var(--duration) var(--easing-" +
            varName +
            ");\n" +
            "}"
          );
        },

        js: function (bezier, name) {
          var fnName = (name || "customEasing").replace(/[^a-zA-Z0-9]/g, "");
          return (
            "// " +
            (name || "Custom Easing") +
            " - Cubic Bezier\n" +
            "// 控制点: (" +
            bezier[0] +
            ", " +
            bezier[1] +
            "), (" +
            bezier[2] +
            ", " +
            bezier[3] +
            ")\n\n" +
            "function " +
            fnName +
            "(t) {\n" +
            "  // 简化的 cubic-bezier 实现\n" +
            "  var x1 = " +
            bezier[0] +
            ", y1 = " +
            bezier[1] +
            ", x2 = " +
            bezier[2] +
            ", y2 = " +
            bezier[3] +
            ";\n\n" +
            "  // 牛顿迭代法求解 t -> x\n" +
            "  var t2 = t;\n" +
            "  for (var i = 0; i < 8; i++) {\n" +
            "    var x = bezierX(t2) - t;\n" +
            "    if (Math.abs(x) < 0.001) break;\n" +
            "    t2 -= x / bezierXDerivative(t2);\n" +
            "  }\n" +
            "  return bezierY(t2);\n\n" +
            "  function bezierX(t) {\n" +
            "    return 3 * (1-t) * (1-t) * t * x1 + 3 * (1-t) * t * t * x2 + t * t * t;\n" +
            "  }\n" +
            "  function bezierY(t) {\n" +
            "    return 3 * (1-t) * (1-t) * t * y1 + 3 * (1-t) * t * t * y2 + t * t * t;\n" +
            "  }\n" +
            "  function bezierXDerivative(t) {\n" +
            "    return 3 * (1-t) * (1-t) * x1 + 6 * (1-t) * t * (x2 - x1) + 3 * t * t * (1 - x2);\n" +
            "  }\n" +
            "}\n\n" +
            "// 使用示例: requestAnimationFrame 动画\n" +
            "function animate(element, duration) {\n" +
            "  duration = duration || " +
            state.duration * 1000 +
            ";\n" +
            "  var start = performance.now();\n" +
            "  function frame(now) {\n" +
            "    var t = Math.min((now - start) / duration, 1);\n" +
            "    var progress = " +
            fnName +
            "(t);\n" +
            '    element.style.transform = "translateX(" + (progress * 100) + "%)";\n' +
            "    if (t < 1) requestAnimationFrame(frame);\n" +
            "  }\n" +
            "  requestAnimationFrame(frame);\n" +
            "}"
          );
        },

        animejs: function (bezier, name) {
          return (
            "// Anime.js 配置\n" +
            "// " +
            (name || "Custom Easing") +
            "\n\n" +
            "import anime from 'animejs';\n\n" +
            "anime({\n" +
            "  targets: '.element',\n" +
            "  translateX: 250,\n" +
            "  duration: " +
            state.duration * 1000 +
            ",\n" +
            "  easing: 'cubicBezier(" +
            bezier[0] +
            ", " +
            bezier[1] +
            ", " +
            bezier[2] +
            ", " +
            bezier[3] +
            ")'\n" +
            "});\n\n" +
            "// 或使用内置缓动名称 (如果匹配)\n" +
            "// easing: '" +
            (name || "easeOutQuad") +
            "'\n\n" +
            "// 批量动画\n" +
            "anime({\n" +
            "  targets: '.elements',\n" +
            "  translateX: 250,\n" +
            "  duration: " +
            state.duration * 1000 +
            ",\n" +
            "  delay: anime.stagger(100),\n" +
            "  easing: 'cubicBezier(" +
            bezier[0] +
            ", " +
            bezier[1] +
            ", " +
            bezier[2] +
            ", " +
            bezier[3] +
            ")'\n" +
            "});"
          );
        },

        gsap: function (bezier, name) {
          var easeName = (name || "customEase").replace(/[^a-zA-Z0-9]/g, "");
          return (
            "// GSAP 配置\n" +
            "// " +
            (name || "Custom Easing") +
            "\n\n" +
            "import { gsap } from 'gsap';\n" +
            "import { CustomEase } from 'gsap/CustomEase';\n\n" +
            "gsap.registerPlugin(CustomEase);\n\n" +
            "// 创建自定义缓动\n" +
            "CustomEase.create('" +
            easeName +
            "', \n" +
            "  'M0,0 C" +
            bezier[0] +
            "," +
            bezier[1] +
            " " +
            bezier[2] +
            "," +
            bezier[3] +
            " 1,1');\n\n" +
            "// 使用自定义缓动\n" +
            "gsap.to('.element', {\n" +
            "  x: 250,\n" +
            "  duration: " +
            state.duration +
            ",\n" +
            "  ease: '" +
            easeName +
            "'\n" +
            "});\n\n" +
            "// 或直接使用 cubic-bezier 字符串 (需要 CustomEase 插件)\n" +
            "gsap.to('.element', {\n" +
            "  x: 250,\n" +
            "  duration: " +
            state.duration +
            ",\n" +
            "  ease: 'M0,0 C" +
            bezier[0] +
            "," +
            bezier[1] +
            " " +
            bezier[2] +
            "," +
            bezier[3] +
            " 1,1'\n" +
            "});"
          );
        }
      };

      function updateExport() {
        var formatter = EXPORT_FORMATTERS[state.activeExportFormat];
        var preset = EASING_PRESETS.find(function (p) {
          return p.id === state.currentPreset;
        });
        var name = preset ? preset.name : null;
        codeOutput.textContent = formatter(state.bezier, name);
      }

      document.getElementById("exportTabs").addEventListener("click", function (e) {
        if (!e.target.classList.contains("export-tab")) return;

        document.querySelectorAll(".export-tab").forEach(function (t) {
          t.classList.remove("active");
        });
        e.target.classList.add("active");

        state.activeExportFormat = e.target.dataset.format;
        updateExport();
      });

      // ==================== ACTIONS ====================
      document.getElementById("btnCopy").addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(codeOutput.textContent);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      document.getElementById("btnShare").addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        setTimeout(function () {
          statusEl.textContent = "";
        }, 2000);
      }

      // ==================== CATEGORY TABS ====================
      document.getElementById("categoryTabs").addEventListener("click", function (e) {
        if (!e.target.classList.contains("category-tab")) return;

        document.querySelectorAll(".category-tab").forEach(function (t) {
          t.classList.remove("active");
        });
        e.target.classList.add("active");

        state.activeCategory = e.target.dataset.category;
        renderPresets();
      });

      // ==================== COMPARISON ====================
      document.getElementById("comparisonToggle").addEventListener("change", function (e) {
        document.getElementById("comparisonGrid").style.display = e.target.checked
          ? "grid"
          : "none";
      });

      // ==================== URL STATE ====================
      function saveToUrl() {
        var data = {
          b: state.bezier,
          p: state.currentPreset,
          d: state.duration
        };
        try {
          history.replaceState(null, "", "#" + btoa(JSON.stringify(data)));
        } catch (e) {}
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(atob(hash));
          if (data.b && Array.isArray(data.b) && data.b.length === 4) {
            // 验证所有值都是有效数字
            var isValid = data.b.every(function (v) {
              return typeof v === "number" && isFinite(v);
            });
            if (!isValid) return false;

            // 限制范围: x 值 [0,1], y 值 [-2,2] (与输入框和拖拽一致)
            state.bezier = [
              Math.max(0, Math.min(1, data.b[0])),
              Math.max(-2, Math.min(2, data.b[1])),
              Math.max(0, Math.min(1, data.b[2])),
              Math.max(-2, Math.min(2, data.b[3]))
            ];
            state.currentPreset = data.p || findMatchingPreset() || "custom";
            state.duration =
              typeof data.d === "number" && isFinite(data.d) && data.d > 0 ? data.d : 1;
            return true;
          }
        } catch (e) {}
        return false;
      }

      // ==================== THEME ====================
      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
        drawCurve();
        renderPresets();
      };

      // ==================== INIT ====================
      (function init() {
        // Load theme
        var savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
          document.querySelector(".theme-toggle").textContent =
            savedTheme === "light" ? "☀️" : "🌙";
        }

        // Load state from URL or use default
        if (!loadFromUrl()) {
          state.bezier = [0.25, 0.1, 0.25, 1];
          state.currentPreset = "ease";
        }

        // Set duration
        durationRange.value = state.duration;
        durationValue.textContent = state.duration + "s";

        // Render
        renderPresets();
        updateInputs();
        drawCurve();
        updateCanvasInfo();
        updateExport();
        updateAnimationTiming();
      })();
    
