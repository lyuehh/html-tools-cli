// @ts-nocheck
// Generated from tools/generator/signature-gen.html
// Source SHA-256: c78a8fcc36bde1f720e1feb8a1b6edac599d964eb1895776b890d3e53124292a
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

      // Signature fonts
      const fonts = [
        { id: "cursive", label: "草书", family: "cursive" },
        { id: "brush", label: "毛笔", family: "Brush Script MT, cursive" },
        { id: "elegant", label: "优雅", family: "Georgia, serif" },
        { id: "modern", label: "现代", family: "Segoe Script, cursive" },
        { id: "classic", label: "经典", family: "Times New Roman, serif" },
        { id: "artistic", label: "艺术", family: "Lucida Handwriting, cursive" }
      ];

      const presets = [
        { style: "simple", label: "简约风格" },
        { style: "elegant", label: "优雅风格" },
        { style: "bold", label: "粗犷风格" },
        { style: "artistic", label: "艺术风格" }
      ];

      const signatureCanvas = document.getElementById("signatureCanvas");
      const signatureCtx = signatureCanvas.getContext("2d");
      const drawCanvas = document.getElementById("drawCanvas");
      const drawCtx = drawCanvas.getContext("2d");

      let state = {
        text: "张三",
        font: "cursive",
        fontSize: 60,
        textColor: "#1a1a2e",
        bgColor: "#ffffff",
        transparentBg: false,
        rotation: -5,
        currentTab: "text"
      };

      let drawState = {
        isDrawing: false,
        color: "#1a1a2e",
        brushSize: 3,
        bgColor: "#ffffff",
        transparentBg: false,
        history: [],
        historyIndex: -1
      };

      function initUI() {
        // Font grid
        const fontGrid = document.getElementById("fontGrid");
        fonts.forEach((f) => {
          const btn = document.createElement("button");
          btn.className = "font-btn" + (f.id === state.font ? " active" : "");
          btn.textContent = f.label;
          btn.style.fontFamily = f.family;
          btn.addEventListener("click", () => {
            document.querySelectorAll(".font-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            state.font = f.id;
            render();
          });
          fontGrid.appendChild(btn);
        });

        // Presets
        const presetsEl = document.getElementById("presetSignatures");
        presets.forEach((p) => {
          const div = document.createElement("div");
          div.className = "preset-sig";
          div.textContent = p.label;
          div.addEventListener("click", () => applyPreset(p.style));
          presetsEl.appendChild(div);
        });
      }

      // Tab management
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(btn.dataset.tab + "-tab").classList.add("active");

          state.currentTab = btn.dataset.tab;

          if (btn.dataset.tab === "text") {
            signatureCanvas.style.display = "block";
            drawCanvas.style.display = "none";
            render();
          } else {
            signatureCanvas.style.display = "none";
            drawCanvas.style.display = "block";
            initDrawCanvas();
          }
        });
      });

      // Text signature controls
      document.getElementById("signatureText").addEventListener("input", (e) => {
        state.text = e.target.value || "签名";
        render();
      });

      document.getElementById("fontSize").addEventListener("input", (e) => {
        state.fontSize = parseInt(e.target.value);
        document.getElementById("fontSizeValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("textColor").addEventListener("input", (e) => {
        state.textColor = e.target.value;
        render();
      });

      document.getElementById("bgColor").addEventListener("input", (e) => {
        state.bgColor = e.target.value;
        render();
      });

      document.getElementById("transparentBg").addEventListener("change", (e) => {
        state.transparentBg = e.target.checked;
        render();
      });

      document.getElementById("rotation").addEventListener("input", (e) => {
        state.rotation = parseInt(e.target.value);
        document.getElementById("rotationValue").textContent = e.target.value + "°";
        render();
      });

      // Draw controls
      document.getElementById("drawColor").addEventListener("input", (e) => {
        drawState.color = e.target.value;
      });

      document.getElementById("brushSize").addEventListener("input", (e) => {
        drawState.brushSize = parseInt(e.target.value);
        document.getElementById("brushSizeValue").textContent = e.target.value + "px";
      });

      document.getElementById("drawBgColor").addEventListener("input", (e) => {
        drawState.bgColor = e.target.value;
        initDrawCanvas();
      });

      document.getElementById("drawTransparentBg").addEventListener("change", (e) => {
        drawState.transparentBg = e.target.checked;
        initDrawCanvas();
      });

      window.applyPreset = function (style) {
        switch (style) {
          case "simple":
            state.font = "cursive";
            state.fontSize = 50;
            state.rotation = 0;
            state.textColor = "#333333";
            break;
          case "elegant":
            state.font = "brush";
            state.fontSize = 70;
            state.rotation = -10;
            state.textColor = "#1a1a2e";
            break;
          case "bold":
            state.font = "artistic";
            state.fontSize = 80;
            state.rotation = 5;
            state.textColor = "#000000";
            break;
          case "artistic":
            state.font = "elegant";
            state.fontSize = 60;
            state.rotation = -15;
            state.textColor = "#2c3e50";
            break;
        }

        document.getElementById("fontSize").value = state.fontSize;
        document.getElementById("fontSizeValue").textContent = state.fontSize + "px";
        document.getElementById("rotation").value = state.rotation;
        document.getElementById("rotationValue").textContent = state.rotation + "°";
        document.getElementById("textColor").value = state.textColor;

        document.querySelectorAll(".font-btn").forEach((btn, i) => {
          btn.classList.toggle("active", fonts[i].id === state.font);
        });

        render();
      };

      function render() {
        const ctx = signatureCtx;
        const w = signatureCanvas.width;
        const h = signatureCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Background
        if (!state.transparentBg) {
          ctx.fillStyle = state.bgColor;
          ctx.fillRect(0, 0, w, h);
        }

        // Get font family
        const fontFamily = fonts.find((f) => f.id === state.font).family;

        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.rotate((state.rotation * Math.PI) / 180);

        // Draw signature
        ctx.font = state.fontSize + "px " + fontFamily;
        ctx.fillStyle = state.textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Add slight variation for handwritten look
        const text = state.text;
        let x = -ctx.measureText(text).width / 2;

        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const charWidth = ctx.measureText(char).width;
          const yOffset = Math.sin(i * 0.5) * 3;
          const rotOffset = Math.sin(i * 0.3) * 2;

          ctx.save();
          ctx.translate(x + charWidth / 2, yOffset);
          ctx.rotate((rotOffset * Math.PI) / 180);
          ctx.fillText(char, 0, 0);
          ctx.restore();

          x += charWidth;
        }

        // Add underline flourish
        ctx.beginPath();
        ctx.strokeStyle = state.textColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;

        const textWidth = ctx.measureText(text).width;
        ctx.moveTo(-textWidth / 2 - 20, state.fontSize / 2 + 10);
        ctx.quadraticCurveTo(0, state.fontSize / 2 + 20, textWidth / 2 + 30, state.fontSize / 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.restore();
      }

      // Drawing functionality
      function initDrawCanvas() {
        if (!drawState.transparentBg) {
          drawCtx.fillStyle = drawState.bgColor;
          drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
        } else {
          drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        }
        saveDrawHistory();
      }

      function saveDrawHistory() {
        drawState.historyIndex++;
        drawState.history = drawState.history.slice(0, drawState.historyIndex);
        drawState.history.push(drawCtx.getImageData(0, 0, drawCanvas.width, drawCanvas.height));
      }

      window.undoDrawCanvas = function () {
        if (drawState.historyIndex > 0) {
          drawState.historyIndex--;
          drawCtx.putImageData(drawState.history[drawState.historyIndex], 0, 0);
        }
      };

      window.clearDrawCanvas = function () {
        initDrawCanvas();
      };

      let lastX = 0,
        lastY = 0;

      function startDrawing(e) {
        drawState.isDrawing = true;
        const rect = drawCanvas.getBoundingClientRect();
        lastX = (e.clientX || e.touches[0].clientX) - rect.left;
        lastY = (e.clientY || e.touches[0].clientY) - rect.top;
      }

      function draw(e) {
        if (!drawState.isDrawing) return;
        e.preventDefault();

        const rect = drawCanvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;

        drawCtx.beginPath();
        drawCtx.strokeStyle = drawState.color;
        drawCtx.lineWidth = drawState.brushSize;
        drawCtx.lineCap = "round";
        drawCtx.lineJoin = "round";

        drawCtx.moveTo(lastX, lastY);
        drawCtx.lineTo(x, y);
        drawCtx.stroke();

        lastX = x;
        lastY = y;
      }

      function stopDrawing() {
        if (drawState.isDrawing) {
          drawState.isDrawing = false;
          saveDrawHistory();
        }
      }

      drawCanvas.addEventListener("mousedown", startDrawing);
      drawCanvas.addEventListener("mousemove", draw);
      drawCanvas.addEventListener("mouseup", stopDrawing);
      drawCanvas.addEventListener("mouseout", stopDrawing);

      drawCanvas.addEventListener("touchstart", startDrawing);
      drawCanvas.addEventListener("touchmove", draw);
      drawCanvas.addEventListener("touchend", stopDrawing);

      window.downloadSignature = function () {
        const canvas = state.currentTab === "text" ? signatureCanvas : drawCanvas;
        const link = document.createElement("a");
        link.download = "signature.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.downloadSVG = function () {
        if (state.currentTab === "draw") {
          alert("手写签名暂不支持 SVG 导出");
          return;
        }

        const fontFamily = fonts.find((f) => f.id === state.font).family;
        const svg =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          signatureCanvas.width +
          '" height="' +
          signatureCanvas.height +
          '">' +
          (state.transparentBg
            ? ""
            : '<rect width="100%" height="100%" fill="' + state.bgColor + '"/>') +
          '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
          'font-family="' +
          fontFamily +
          '" font-size="' +
          state.fontSize +
          '" ' +
          'fill="' +
          state.textColor +
          '" transform="rotate(' +
          state.rotation +
          ' 300 100)">' +
          state.text +
          "</text></svg>";

        const blob = new Blob([svg], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = "signature.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
      };

      // Initialize
      initUI();
      render();
      initDrawCanvas();
    
