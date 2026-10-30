// @ts-nocheck
// Generated from tools/office/signature-pad.html
// Source SHA-256: 10545a16c4b176b819e2c0efc15775e6eafb17f752f8bb7a469ed22c484d443b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const canvas = document.getElementById("signatureCanvas");
      const ctx = canvas.getContext("2d");
      const canvasWrapper = document.getElementById("canvasWrapper");
      const penColorInput = document.getElementById("penColor");
      const penSizeInput = document.getElementById("penSize");
      const sizeValueEl = document.getElementById("sizeValue");
      const transparentBgCheckbox = document.getElementById("transparentBg");
      const btnUndo = document.getElementById("btnUndo");
      const btnClear = document.getElementById("btnClear");
      const btnSave = document.getElementById("btnSave");
      const statusEl = document.getElementById("status");
      const strokeCountEl = document.getElementById("strokeCount");

      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      let strokes = [];
      let currentStroke = [];

      const LS_KEY = "signature_pad_settings_v1";

      function loadSettings() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const settings = JSON.parse(saved);
            if (settings.penColor) penColorInput.value = settings.penColor;
            if (settings.penSize) {
              penSizeInput.value = settings.penSize;
              sizeValueEl.textContent = settings.penSize + "px";
            }
            if (settings.transparentBg !== undefined) {
              transparentBgCheckbox.checked = settings.transparentBg;
              updateCanvasBackground();
            }
          }
        } catch (e) {}
      }

      function saveSettings() {
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({
              penColor: penColorInput.value,
              penSize: penSizeInput.value,
              transparentBg: transparentBgCheckbox.checked
            })
          );
        } catch (e) {}
      }

      function initCanvas() {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = penColorInput.value;
        ctx.lineWidth = penSizeInput.value;
        clearCanvas();
      }

      function clearCanvas() {
        if (transparentBgCheckbox.checked) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      function updateCanvasBackground() {
        if (transparentBgCheckbox.checked) {
          canvasWrapper.classList.add("transparent-bg");
        } else {
          canvasWrapper.classList.remove("transparent-bg");
        }
        redrawCanvas();
        saveSettings();
      }

      function redrawCanvas() {
        clearCanvas();
        strokes.forEach(function (stroke) {
          if (stroke.length < 2) return;
          ctx.beginPath();
          ctx.strokeStyle = stroke[0].color;
          ctx.lineWidth = stroke[0].size;
          ctx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) {
            ctx.lineTo(stroke[i].x, stroke[i].y);
          }
          ctx.stroke();
        });
      }

      function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY
        };
      }

      function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        canvasWrapper.classList.add("drawing");
        const pos = getPointerPos(e);
        lastX = pos.x;
        lastY = pos.y;
        currentStroke = [
          {
            x: pos.x,
            y: pos.y,
            color: penColorInput.value,
            size: parseInt(penSizeInput.value, 10)
          }
        ];
        ctx.beginPath();
        ctx.strokeStyle = penColorInput.value;
        ctx.lineWidth = penSizeInput.value;
        ctx.moveTo(pos.x, pos.y);
      }

      function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPointerPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        currentStroke.push({
          x: pos.x,
          y: pos.y,
          color: penColorInput.value,
          size: parseInt(penSizeInput.value, 10)
        });
        lastX = pos.x;
        lastY = pos.y;
      }

      function stopDrawing() {
        if (!isDrawing) return;
        isDrawing = false;
        canvasWrapper.classList.remove("drawing");
        if (currentStroke.length > 1) {
          strokes.push(currentStroke);
          updateUI();
        }
        currentStroke = [];
      }

      function updateUI() {
        strokeCountEl.textContent = strokes.length;
        btnUndo.disabled = strokes.length === 0;
        if (strokes.length > 0) {
          statusEl.textContent = "签名完成";
          statusEl.className = "status success";
        } else {
          statusEl.textContent = "在画布上签名";
          statusEl.className = "status";
        }
      }

      function undo() {
        if (strokes.length === 0) return;
        strokes.pop();
        redrawCanvas();
        updateUI();
      }

      function clearAll() {
        strokes = [];
        clearCanvas();
        updateUI();
      }

      function saveAsPNG() {
        if (strokes.length === 0) {
          statusEl.textContent = "画布为空，请先签名";
          statusEl.className = "status";
          return;
        }

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.lineCap = "round";
        tempCtx.lineJoin = "round";

        if (!transparentBgCheckbox.checked) {
          tempCtx.fillStyle = "#ffffff";
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }

        strokes.forEach(function (stroke) {
          if (stroke.length < 2) return;
          tempCtx.beginPath();
          tempCtx.strokeStyle = stroke[0].color;
          tempCtx.lineWidth = stroke[0].size;
          tempCtx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) {
            tempCtx.lineTo(stroke[i].x, stroke[i].y);
          }
          tempCtx.stroke();
        });

        const link = document.createElement("a");
        link.download = "signature-" + Date.now() + ".png";
        link.href = tempCanvas.toDataURL("image/png");
        link.click();

        statusEl.textContent = "已保存为 PNG";
        statusEl.className = "status success";
      }

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);
      canvas.addEventListener("touchstart", startDrawing, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stopDrawing);
      canvas.addEventListener("touchcancel", stopDrawing);

      penSizeInput.addEventListener("input", function () {
        sizeValueEl.textContent = this.value + "px";
        saveSettings();
      });

      penColorInput.addEventListener("change", saveSettings);
      transparentBgCheckbox.addEventListener("change", updateCanvasBackground);
      btnUndo.addEventListener("click", undo);
      btnClear.addEventListener("click", clearAll);
      btnSave.addEventListener("click", saveAsPNG);

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
          e.preventDefault();
          undo();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          saveAsPNG();
        }
      });

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadSettings();
      initCanvas();
    
