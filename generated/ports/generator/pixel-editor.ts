// @ts-nocheck
// Generated from tools/generator/pixel-editor.html
// Source SHA-256: 6feaadd9e9784e238d6e19c01c807285cc570642b7ac9350d17abdc99f535ad9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme management
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      // Color palette
      const paletteColors = [
        "#000000",
        "#1D2B53",
        "#7E2553",
        "#008751",
        "#AB5236",
        "#5F574F",
        "#C2C3C7",
        "#FFF1E8",
        "#FF004D",
        "#FFA300",
        "#FFEC27",
        "#00E436",
        "#29ADFF",
        "#83769C",
        "#FF77A8",
        "#FFCCAA",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#00FFFF",
        "#FF00FF",
        "#808080"
      ];

      const paletteEl = document.getElementById("palette");
      paletteColors.forEach((color) => {
        const el = document.createElement("div");
        el.className = "palette-color";
        el.style.background = color;
        el.addEventListener("click", () => {
          state.primaryColor = color;
          document.getElementById("primaryColor").style.background = color;
          document.getElementById("colorPicker").value = color;
        });
        el.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          state.secondaryColor = color;
          document.getElementById("secondaryColor").style.background = color;
        });
        paletteEl.appendChild(el);
      });

      // Canvas setup
      const canvas = document.getElementById("pixelCanvas");
      const ctx = canvas.getContext("2d");
      const previewCanvas = document.getElementById("previewCanvas");
      const previewCtx = previewCanvas.getContext("2d");

      let state = {
        gridSize: 16,
        zoom: 16,
        primaryColor: "#000000",
        secondaryColor: "#ffffff",
        tool: "pencil",
        brushSize: 1,
        showGrid: true,
        pixels: [],
        history: [],
        historyIndex: -1,
        isDrawing: false,
        startX: 0,
        startY: 0
      };

      function initCanvas() {
        const size = state.gridSize;
        canvas.width = size * state.zoom;
        canvas.height = size * state.zoom;
        previewCanvas.width = size;
        previewCanvas.height = size;

        state.pixels = [];
        for (let y = 0; y < size; y++) {
          state.pixels[y] = [];
          for (let x = 0; x < size; x++) {
            state.pixels[y][x] = null;
          }
        }

        state.history = [];
        state.historyIndex = -1;
        saveHistory();
        render();
      }

      function render() {
        const size = state.gridSize;
        const cellSize = state.zoom;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw pixels
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            if (state.pixels[y][x]) {
              ctx.fillStyle = state.pixels[y][x];
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
          }
        }

        // Draw grid
        if (state.showGrid && state.zoom >= 4) {
          ctx.strokeStyle = "rgba(128, 128, 128, 0.3)";
          ctx.lineWidth = 1;

          for (let i = 0; i <= size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
          }
        }

        // Update preview
        previewCtx.clearRect(0, 0, size, size);
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            if (state.pixels[y][x]) {
              previewCtx.fillStyle = state.pixels[y][x];
              previewCtx.fillRect(x, y, 1, 1);
            }
          }
        }
      }

      function getPixelCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / state.zoom);
        const y = Math.floor((e.clientY - rect.top) / state.zoom);
        return {
          x: Math.max(0, Math.min(x, state.gridSize - 1)),
          y: Math.max(0, Math.min(y, state.gridSize - 1))
        };
      }

      function setPixel(x, y, color) {
        if (x >= 0 && x < state.gridSize && y >= 0 && y < state.gridSize) {
          const brushSize = state.brushSize;
          const offset = Math.floor(brushSize / 2);

          for (let dy = 0; dy < brushSize; dy++) {
            for (let dx = 0; dx < brushSize; dx++) {
              const px = x - offset + dx;
              const py = y - offset + dy;
              if (px >= 0 && px < state.gridSize && py >= 0 && py < state.gridSize) {
                state.pixels[py][px] = color;
              }
            }
          }
        }
      }

      function floodFill(x, y, targetColor, fillColor) {
        if (targetColor === fillColor) return;
        const stack = [[x, y]];

        while (stack.length > 0) {
          const [cx, cy] = stack.pop();
          if (cx < 0 || cx >= state.gridSize || cy < 0 || cy >= state.gridSize) continue;
          if (state.pixels[cy][cx] !== targetColor) continue;

          state.pixels[cy][cx] = fillColor;
          stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
        }
      }

      function drawLine(x0, y0, x1, y1, color) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = x0 < x1 ? 1 : -1;
        const sy = y0 < y1 ? 1 : -1;
        let err = dx - dy;

        while (true) {
          setPixel(x0, y0, color);
          if (x0 === x1 && y0 === y1) break;
          const e2 = 2 * err;
          if (e2 > -dy) {
            err -= dy;
            x0 += sx;
          }
          if (e2 < dx) {
            err += dx;
            y0 += sy;
          }
        }
      }

      function drawRect(x0, y0, x1, y1, color) {
        const minX = Math.min(x0, x1);
        const maxX = Math.max(x0, x1);
        const minY = Math.min(y0, y1);
        const maxY = Math.max(y0, y1);

        for (let x = minX; x <= maxX; x++) {
          setPixel(x, minY, color);
          setPixel(x, maxY, color);
        }
        for (let y = minY; y <= maxY; y++) {
          setPixel(minX, y, color);
          setPixel(maxX, y, color);
        }
      }

      function drawCircle(x0, y0, x1, y1, color) {
        const radius = Math.floor(Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2));
        let x = radius;
        let y = 0;
        let err = 0;

        while (x >= y) {
          setPixel(x0 + x, y0 + y, color);
          setPixel(x0 + y, y0 + x, color);
          setPixel(x0 - y, y0 + x, color);
          setPixel(x0 - x, y0 + y, color);
          setPixel(x0 - x, y0 - y, color);
          setPixel(x0 - y, y0 - x, color);
          setPixel(x0 + y, y0 - x, color);
          setPixel(x0 + x, y0 - y, color);

          y++;
          err += 1 + 2 * y;
          if (2 * (err - x) + 1 > 0) {
            x--;
            err += 1 - 2 * x;
          }
        }
      }

      function saveHistory() {
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(JSON.parse(JSON.stringify(state.pixels)));
        state.historyIndex++;
        if (state.history.length > 50) {
          state.history.shift();
          state.historyIndex--;
        }
      }

      function undo() {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          state.pixels = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
          render();
        }
      }

      function redo() {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          state.pixels = JSON.parse(JSON.stringify(state.history[state.historyIndex]));
          render();
        }
      }

      // Event listeners
      canvas.addEventListener("mousedown", (e) => {
        state.isDrawing = true;
        const { x, y } = getPixelCoords(e);
        state.startX = x;
        state.startY = y;
        const color = e.button === 2 ? state.secondaryColor : state.primaryColor;

        switch (state.tool) {
          case "pencil":
            setPixel(x, y, color);
            render();
            break;
          case "eraser":
            setPixel(x, y, null);
            render();
            break;
          case "fill":
            const targetColor = state.pixels[y][x];
            floodFill(x, y, targetColor, color);
            saveHistory();
            render();
            break;
          case "picker":
            if (state.pixels[y][x]) {
              state.primaryColor = state.pixels[y][x];
              document.getElementById("primaryColor").style.background = state.primaryColor;
              document.getElementById("colorPicker").value = state.primaryColor;
            }
            break;
        }
      });

      canvas.addEventListener("mousemove", (e) => {
        if (!state.isDrawing) return;
        const { x, y } = getPixelCoords(e);
        const color = e.buttons === 2 ? state.secondaryColor : state.primaryColor;

        if (state.tool === "pencil") {
          setPixel(x, y, color);
          render();
        } else if (state.tool === "eraser") {
          setPixel(x, y, null);
          render();
        }
      });

      canvas.addEventListener("mouseup", (e) => {
        if (!state.isDrawing) return;
        state.isDrawing = false;
        const { x, y } = getPixelCoords(e);
        const color = e.button === 2 ? state.secondaryColor : state.primaryColor;

        switch (state.tool) {
          case "line":
            drawLine(state.startX, state.startY, x, y, color);
            break;
          case "rect":
            drawRect(state.startX, state.startY, x, y, color);
            break;
          case "circle":
            drawCircle(state.startX, state.startY, x, y, color);
            break;
        }

        if (["pencil", "eraser", "line", "rect", "circle"].includes(state.tool)) {
          saveHistory();
        }
        render();
      });

      canvas.addEventListener("contextmenu", (e) => e.preventDefault());

      document.querySelectorAll(".tool-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tool-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.tool = btn.dataset.tool;
        });
      });

      document.querySelectorAll(".size-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.gridSize = parseInt(btn.dataset.size);
          initCanvas();
        });
      });

      document.getElementById("colorPicker").addEventListener("input", (e) => {
        state.primaryColor = e.target.value;
        document.getElementById("primaryColor").style.background = e.target.value;
      });

      document.getElementById("brushSize").addEventListener("input", (e) => {
        state.brushSize = parseInt(e.target.value);
        document.getElementById("brushSizeLabel").textContent = e.target.value + " 像素";
      });

      document.getElementById("showGrid").addEventListener("change", (e) => {
        state.showGrid = e.target.checked;
        render();
      });

      window.swapColors = function () {
        const temp = state.primaryColor;
        state.primaryColor = state.secondaryColor;
        state.secondaryColor = temp;
        document.getElementById("primaryColor").style.background = state.primaryColor;
        document.getElementById("secondaryColor").style.background = state.secondaryColor;
        document.getElementById("colorPicker").value = state.primaryColor;
      };

      window.zoomIn = function () {
        if (state.zoom < 32) {
          state.zoom *= 2;
          document.getElementById("zoomLevel").textContent = state.zoom + "x";
          canvas.width = state.gridSize * state.zoom;
          canvas.height = state.gridSize * state.zoom;
          render();
        }
      };

      window.zoomOut = function () {
        if (state.zoom > 2) {
          state.zoom /= 2;
          document.getElementById("zoomLevel").textContent = state.zoom + "x";
          canvas.width = state.gridSize * state.zoom;
          canvas.height = state.gridSize * state.zoom;
          render();
        }
      };

      window.clearCanvas = function () {
        for (let y = 0; y < state.gridSize; y++) {
          for (let x = 0; x < state.gridSize; x++) {
            state.pixels[y][x] = null;
          }
        }
        saveHistory();
        render();
      };

      window.downloadImage = function () {
        // Create a clean export canvas
        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = state.gridSize;
        exportCanvas.height = state.gridSize;
        const exportCtx = exportCanvas.getContext("2d");

        for (let y = 0; y < state.gridSize; y++) {
          for (let x = 0; x < state.gridSize; x++) {
            if (state.pixels[y][x]) {
              exportCtx.fillStyle = state.pixels[y][x];
              exportCtx.fillRect(x, y, 1, 1);
            }
          }
        }

        const link = document.createElement("a");
        link.download = `pixel-art-${state.gridSize}x${state.gridSize}.png`;
        link.href = exportCanvas.toDataURL("image/png");
        link.click();
      };

      // Keyboard shortcuts
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "z") {
          e.preventDefault();
          undo();
        } else if (e.ctrlKey && e.key === "y") {
          e.preventDefault();
          redo();
        }
      });

      // Initialize
      initCanvas();
    
