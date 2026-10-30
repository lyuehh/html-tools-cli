// @ts-nocheck
// Generated from tools/generator/stamp-maker.html
// Source SHA-256: 58e7fd9d26e282a95cd39adefa9af474294fb667b5cd5249ccefe4bd59a9e547
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

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      let state = {
        type: "circle",
        mainText: "科技创新有限公司",
        centerText: "公章",
        bottomText: "",
        star: "star",
        color: "#c0392b",
        size: 280,
        borderWidth: 5,
        rough: true,
        transparent: false
      };

      // Event listeners
      document.querySelectorAll(".type-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.type = btn.dataset.type;

          // Set default texts based on type
          switch (state.type) {
            case "personal":
              state.mainText = "张三";
              state.centerText = "印";
              document.getElementById("mainText").value = "张三";
              document.getElementById("centerText").value = "印";
              break;
            case "date":
              state.centerText = new Date().toLocaleDateString("zh-CN");
              document.getElementById("centerText").value = state.centerText;
              break;
            case "contract":
              state.centerText = "合同专用章";
              document.getElementById("centerText").value = "合同专用章";
              break;
          }
          render();
        });
      });

      document.querySelectorAll(".star-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".star-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.star = btn.dataset.star;
          render();
        });
      });

      document.querySelectorAll(".color-preset").forEach((el) => {
        el.addEventListener("click", () => {
          state.color = el.dataset.color;
          document.getElementById("stampColor").value = el.dataset.color;
          render();
        });
      });

      document.querySelectorAll(".effect-toggle").forEach((el) => {
        el.addEventListener("click", () => {
          el.classList.toggle("active");
          state[el.dataset.effect] = el.classList.contains("active");
          render();
        });
      });

      document.getElementById("mainText").addEventListener("input", (e) => {
        state.mainText = e.target.value;
        render();
      });

      document.getElementById("centerText").addEventListener("input", (e) => {
        state.centerText = e.target.value;
        render();
      });

      document.getElementById("bottomText").addEventListener("input", (e) => {
        state.bottomText = e.target.value;
        render();
      });

      document.getElementById("stampColor").addEventListener("input", (e) => {
        state.color = e.target.value;
        render();
      });

      document.getElementById("stampSize").addEventListener("input", (e) => {
        state.size = parseInt(e.target.value);
        document.getElementById("stampSizeValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("borderWidth").addEventListener("input", (e) => {
        state.borderWidth = parseInt(e.target.value);
        document.getElementById("borderWidthValue").textContent = e.target.value + "px";
        render();
      });

      function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = (Math.PI / 2) * 3;
        const step = Math.PI / spikes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
          rot += step;
          ctx.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
      }

      function drawTextOnArc(text, cx, cy, radius, startAngle, endAngle) {
        const chars = text.split("");
        const angleStep = (endAngle - startAngle) / (chars.length + 1);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        chars.forEach((char, i) => {
          const angle = startAngle + angleStep * (i + 1);
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(char, 0, 0);
          ctx.restore();
        });
      }

      function addRoughEffect() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 0) {
            // Add random transparency
            if (Math.random() > 0.85) {
              data[i + 3] = Math.floor(data[i + 3] * (0.3 + Math.random() * 0.7));
            }
            // Add slight color variation
            const variation = Math.floor(Math.random() * 30 - 15);
            data[i] = Math.min(255, Math.max(0, data[i] + variation));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + variation));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + variation));
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      function render() {
        const size = state.size;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = size / 2 - state.borderWidth;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = state.color;
        ctx.strokeStyle = state.color;
        ctx.lineWidth = state.borderWidth;

        // Draw based on type
        switch (state.type) {
          case "circle":
          case "date":
          case "contract":
            drawCircleStamp(cx, cy, radius);
            break;
          case "oval":
            drawOvalStamp(cx, cy, radius);
            break;
          case "square":
            drawSquareStamp(cx, cy, radius);
            break;
          case "personal":
            drawPersonalStamp(cx, cy, radius);
            break;
        }

        // Apply rough effect
        if (state.rough) {
          addRoughEffect();
        }
      }

      function drawCircleStamp(cx, cy, radius) {
        // Outer circle
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(cx, cy, radius - state.borderWidth - 3, 0, Math.PI * 2);
        ctx.stroke();

        // Main text on arc
        const fontSize = Math.floor(radius / 6);
        ctx.font = "bold " + fontSize + "px SimSun, serif";
        drawTextOnArc(state.mainText, cx, cy, radius - fontSize, Math.PI * 0.2, Math.PI * 1.8);

        // Center star or shape
        if (state.star === "star") {
          drawStar(cx, cy, 5, radius * 0.25, radius * 0.1);
        } else if (state.star === "circle") {
          ctx.beginPath();
          ctx.arc(cx, cy, radius * 0.15, 0, Math.PI * 2);
          ctx.fill();
        } else if (state.star === "diamond") {
          ctx.beginPath();
          ctx.moveTo(cx, cy - radius * 0.2);
          ctx.lineTo(cx + radius * 0.15, cy);
          ctx.lineTo(cx, cy + radius * 0.2);
          ctx.lineTo(cx - radius * 0.15, cy);
          ctx.closePath();
          ctx.fill();
        }

        // Center text
        if (state.centerText && state.star !== "none") {
          ctx.font = "bold " + Math.floor(fontSize * 0.8) + "px SimSun, serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(state.centerText, cx, cy + radius * 0.45);
        } else if (state.centerText) {
          ctx.font = "bold " + Math.floor(fontSize * 1.2) + "px SimSun, serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(state.centerText, cx, cy);
        }

        // Bottom text
        if (state.bottomText) {
          ctx.font = fontSize * 0.6 + "px SimSun, serif";
          drawTextOnArc(state.bottomText, cx, cy, radius - fontSize, Math.PI * 1.2, Math.PI * 1.8);
        }
      }

      function drawOvalStamp(cx, cy, radius) {
        const rx = radius;
        const ry = radius * 0.6;

        // Outer oval
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Inner oval
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          rx - state.borderWidth - 3,
          ry - state.borderWidth - 3,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        // Center text
        const fontSize = Math.floor(ry / 2);
        ctx.font = "bold " + fontSize + "px SimSun, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lines = [];
        if (state.mainText) lines.push(state.mainText);
        if (state.centerText) lines.push(state.centerText);

        lines.forEach((line, i) => {
          const y = cy + (i - (lines.length - 1) / 2) * (fontSize + 5);
          ctx.fillText(line, cx, y);
        });
      }

      function drawSquareStamp(cx, cy, radius) {
        const size = radius * 1.6;
        const x = cx - size / 2;
        const y = cy - size / 2;

        // Outer square
        ctx.strokeRect(x, y, size, size);

        // Inner square
        const innerOffset = state.borderWidth + 3;
        ctx.strokeRect(
          x + innerOffset,
          y + innerOffset,
          size - innerOffset * 2,
          size - innerOffset * 2
        );

        // Text
        const chars = (state.mainText + state.centerText).split("");
        const gridSize = Math.ceil(Math.sqrt(chars.length));
        const cellSize = (size - innerOffset * 4) / gridSize;
        const fontSize = Math.floor(cellSize * 0.8);

        ctx.font = "bold " + fontSize + "px SimSun, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        chars.forEach((char, i) => {
          const col = i % gridSize;
          const row = Math.floor(i / gridSize);
          const charX = x + innerOffset * 2 + cellSize / 2 + col * cellSize;
          const charY = y + innerOffset * 2 + cellSize / 2 + row * cellSize;
          ctx.fillText(char, charX, charY);
        });
      }

      function drawPersonalStamp(cx, cy, radius) {
        const size = radius * 1.2;

        // Simple square
        ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);

        // Name vertically
        const chars = state.mainText.split("");
        const fontSize = size / (chars.length + 1);
        ctx.font = "bold " + fontSize + "px SimSun, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        chars.forEach((char, i) => {
          ctx.fillText(char, cx, cy - size / 2 + fontSize + i * fontSize);
        });

        // Add "印" if set
        if (state.centerText) {
          ctx.font = "bold " + fontSize * 0.8 + "px SimSun, serif";
          ctx.fillText(state.centerText, cx, cy + size / 2 - fontSize * 0.5);
        }
      }

      window.downloadStamp = function () {
        // Create a clean version for download
        const downloadCanvas = document.createElement("canvas");
        downloadCanvas.width = state.size;
        downloadCanvas.height = state.size;
        const downloadCtx = downloadCanvas.getContext("2d");

        // Draw stamp centered on smaller canvas
        downloadCtx.drawImage(
          canvas,
          (canvas.width - state.size) / 2,
          (canvas.height - state.size) / 2,
          state.size,
          state.size,
          0,
          0,
          state.size,
          state.size
        );

        const link = document.createElement("a");
        link.download = "stamp-" + state.mainText + ".png";
        link.href = downloadCanvas.toDataURL("image/png");
        link.click();
      };

      // Initialize
      render();
    
