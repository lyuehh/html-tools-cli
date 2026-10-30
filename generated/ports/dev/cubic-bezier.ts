// @ts-nocheck
// Generated from tools/dev/cubic-bezier.html
// Source SHA-256: febc82675ecad703b0cabf49112cf0603632b41463b7e95463dd8ecdac11a8bd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var canvas = document.getElementById("bezierCanvas");
      var ctx = canvas.getContext("2d");
      var x1Input = document.getElementById("x1");
      var y1Input = document.getElementById("y1");
      var x2Input = document.getElementById("x2");
      var y2Input = document.getElementById("y2");
      var codeOutput = document.getElementById("codeOutput");
      var statusEl = document.getElementById("status");
      var previewBall = document.getElementById("previewBall");
      var currentBall = document.getElementById("currentBall");

      var padding = 30;
      var size = 200;
      var dragging = null;

      var controlPoints = {
        p1: { x: 0.25, y: 0.1 },
        p2: { x: 0.25, y: 1 }
      };

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

      function draw() {
        var isDark = document.documentElement.getAttribute("data-theme") === "dark";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景网格
        ctx.strokeStyle = isDark ? "#2a2a3a" : "#e9ecef";
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

        // 边框
        ctx.strokeStyle = isDark ? "#4a4a5a" : "#adb5bd";
        ctx.lineWidth = 2;
        ctx.strokeRect(padding, padding, size, size);

        // 对角线参考（linear）
        ctx.strokeStyle = isDark ? "#4a4a5a" : "#ced4da";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.lineTo(toCanvasX(1), toCanvasY(1));
        ctx.stroke();
        ctx.setLineDash([]);

        // 控制线
        ctx.strokeStyle = isDark ? "#6c757d" : "#adb5bd";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.lineTo(toCanvasX(controlPoints.p1.x), toCanvasY(controlPoints.p1.y));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toCanvasX(1), toCanvasY(1));
        ctx.lineTo(toCanvasX(controlPoints.p2.x), toCanvasY(controlPoints.p2.y));
        ctx.stroke();

        // 贝塞尔曲线
        ctx.strokeStyle = "#0d6efd";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(0));
        ctx.bezierCurveTo(
          toCanvasX(controlPoints.p1.x),
          toCanvasY(controlPoints.p1.y),
          toCanvasX(controlPoints.p2.x),
          toCanvasY(controlPoints.p2.y),
          toCanvasX(1),
          toCanvasY(1)
        );
        ctx.stroke();

        // 端点
        ctx.fillStyle = isDark ? "#4a4a5a" : "#6c757d";
        ctx.beginPath();
        ctx.arc(toCanvasX(0), toCanvasY(0), 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(toCanvasX(1), toCanvasY(1), 5, 0, Math.PI * 2);
        ctx.fill();

        // 控制点
        ctx.fillStyle = "#dc3545";
        ctx.beginPath();
        ctx.arc(toCanvasX(controlPoints.p1.x), toCanvasY(controlPoints.p1.y), 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#198754";
        ctx.beginPath();
        ctx.arc(toCanvasX(controlPoints.p2.x), toCanvasY(controlPoints.p2.y), 8, 0, Math.PI * 2);
        ctx.fill();
      }

      function updateInputs() {
        x1Input.value = controlPoints.p1.x.toFixed(2);
        y1Input.value = controlPoints.p1.y.toFixed(2);
        x2Input.value = controlPoints.p2.x.toFixed(2);
        y2Input.value = controlPoints.p2.y.toFixed(2);
      }

      function updateCode() {
        var bezier =
          "cubic-bezier(" +
          controlPoints.p1.x.toFixed(2) +
          ", " +
          controlPoints.p1.y.toFixed(2) +
          ", " +
          controlPoints.p2.x.toFixed(2) +
          ", " +
          controlPoints.p2.y.toFixed(2) +
          ")";

        codeOutput.textContent =
          "transition-timing-function: " +
          bezier +
          ";\n" +
          "animation-timing-function: " +
          bezier +
          ";";

        previewBall.style.transitionTimingFunction = bezier;
        currentBall.style.transitionTimingFunction = bezier;

        updatePresetButtons();
        saveToUrl();
      }

      function updatePresetButtons() {
        var current = [
          controlPoints.p1.x.toFixed(2),
          controlPoints.p1.y.toFixed(2),
          controlPoints.p2.x.toFixed(2),
          controlPoints.p2.y.toFixed(2)
        ].join(",");

        document.querySelectorAll(".preset-btn").forEach(function (btn) {
          var values = btn.dataset.values
            .split(",")
            .map(function (v) {
              return parseFloat(v).toFixed(2);
            })
            .join(",");
          btn.classList.toggle("active", values === current);
        });
      }

      function getMousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }

      function hitTest(pos, point) {
        var px = toCanvasX(point.x);
        var py = toCanvasY(point.y);
        var dx = pos.x - px;
        var dy = pos.y - py;
        return Math.sqrt(dx * dx + dy * dy) < 15;
      }

      canvas.addEventListener("mousedown", function (e) {
        var pos = getMousePos(e);
        if (hitTest(pos, controlPoints.p1)) {
          dragging = "p1";
        } else if (hitTest(pos, controlPoints.p2)) {
          dragging = "p2";
        }
      });

      canvas.addEventListener("mousemove", function (e) {
        if (!dragging) return;

        var pos = getMousePos(e);
        var x = Math.max(0, Math.min(1, fromCanvasX(pos.x)));
        var y = Math.max(-0.5, Math.min(1.5, fromCanvasY(pos.y)));

        controlPoints[dragging].x = x;
        controlPoints[dragging].y = y;

        draw();
        updateInputs();
        updateCode();
      });

      canvas.addEventListener("mouseup", function () {
        dragging = null;
      });

      canvas.addEventListener("mouseleave", function () {
        dragging = null;
      });

      // Touch support
      canvas.addEventListener("touchstart", function (e) {
        e.preventDefault();
        var touch = e.touches[0];
        var pos = {
          x: touch.clientX - canvas.getBoundingClientRect().left,
          y: touch.clientY - canvas.getBoundingClientRect().top
        };
        if (hitTest(pos, controlPoints.p1)) {
          dragging = "p1";
        } else if (hitTest(pos, controlPoints.p2)) {
          dragging = "p2";
        }
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

        controlPoints[dragging].x = x;
        controlPoints[dragging].y = y;

        draw();
        updateInputs();
        updateCode();
      });

      canvas.addEventListener("touchend", function () {
        dragging = null;
      });

      // Input events
      [x1Input, y1Input, x2Input, y2Input].forEach(function (input) {
        input.addEventListener("input", function () {
          controlPoints.p1.x = Math.max(0, Math.min(1, parseFloat(x1Input.value) || 0));
          controlPoints.p1.y = parseFloat(y1Input.value) || 0;
          controlPoints.p2.x = Math.max(0, Math.min(1, parseFloat(x2Input.value) || 0));
          controlPoints.p2.y = parseFloat(y2Input.value) || 0;

          draw();
          updateCode();
        });
      });

      // Preset buttons
      document.querySelectorAll(".preset-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var values = btn.dataset.values.split(",").map(parseFloat);
          controlPoints.p1.x = values[0];
          controlPoints.p1.y = values[1];
          controlPoints.p2.x = values[2];
          controlPoints.p2.y = values[3];

          draw();
          updateInputs();
          updateCode();
        });
      });

      // Play animation
      document.getElementById("btnPlay").addEventListener("click", function () {
        previewBall.classList.remove("animate");
        currentBall.classList.remove("animate");
        document.querySelectorAll("[data-compare]").forEach(function (ball) {
          ball.classList.remove("animate");
        });

        // Force reflow
        void previewBall.offsetWidth;

        previewBall.classList.add("animate");
        currentBall.classList.add("animate");
        document.querySelectorAll("[data-compare]").forEach(function (ball) {
          ball.classList.add("animate");
        });

        setTimeout(function () {
          previewBall.classList.remove("animate");
          currentBall.classList.remove("animate");
          document.querySelectorAll("[data-compare]").forEach(function (ball) {
            ball.classList.remove("animate");
          });
        }, 1500);
      });

      // Copy code
      document.getElementById("btnCopy").addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(codeOutput.textContent);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      // Share link
      document.getElementById("btnShare").addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      // Reset
      document.getElementById("btnReset").addEventListener("click", function () {
        controlPoints.p1 = { x: 0.25, y: 0.1 };
        controlPoints.p2 = { x: 0.25, y: 1 };
        draw();
        updateInputs();
        updateCode();
        showStatus("已重置为 ease", "success");
      });

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // URL state
      function saveToUrl() {
        var state = {
          p1: controlPoints.p1,
          p2: controlPoints.p2
        };
        try {
          history.replaceState(null, "", "#" + btoa(JSON.stringify(state)));
        } catch (e) {
          // ignore
        }
      }

      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var state = JSON.parse(atob(hash));
          if (state.p1 && state.p2) {
            controlPoints.p1 = state.p1;
            controlPoints.p2 = state.p2;
            return true;
          }
        } catch (e) {
          // ignore
        }
        return false;
      };

      // Theme
      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
        draw();
      };

      // Init
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }

        loadFromUrl();
        draw();
        updateInputs();
        updateCode();
      })();
    
