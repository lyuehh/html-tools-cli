// @ts-nocheck
// Generated from tools/calculator/function-plotter.html
// Source SHA-256: fe4f99b86f220ddedb84533909c95222d6900ebcc5c3a5f288ecb4e4c7950118
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        plot();
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      const colors = [
        "#ef4444",
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
        "#84cc16"
      ];
      let functions = [{ expr: "sin(x)", color: colors[0] }];

      const canvas = document.getElementById("plotCanvas");
      const ctx = canvas.getContext("2d");

      function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth * 2;
        canvas.height = 600 * 2;
        canvas.style.height = "600px";
        plot();
      }

      function renderFunctionList() {
        const list = document.getElementById("functionList");
        list.innerHTML = functions
          .map(
            (f, i) => `
                <div class="function-item">
                    <input type="color" class="function-color" value="${f.color}" onchange="updateColor(${i}, this.value)" aria-label="颜色选择器">
                    <input type="text" class="function-input" value="${f.expr}" onchange="updateExpr(${i}, this.value)" placeholder="y = ..." aria-label="文本输入框">
                    <button class="function-remove" onclick="removeFunction(${i})" aria-label="×">×</button>
                </div>
            `
          )
          .join("");
      }

      window.addFunction = function () {
        functions.push({
          expr: "",
          color: colors[functions.length % colors.length]
        });
        renderFunctionList();
      };

      window.removeFunction = function (index) {
        functions.splice(index, 1);
        renderFunctionList();
        plot();
      };

      window.updateExpr = function (index, expr) {
        functions[index].expr = expr;
      };

      window.updateColor = function (index, color) {
        functions[index].color = color;
        plot();
      };

      window.loadPreset = function (expr) {
        if (functions.length > 0 && !functions[functions.length - 1].expr) {
          functions[functions.length - 1].expr = expr;
        } else {
          functions.push({
            expr: expr,
            color: colors[functions.length % colors.length]
          });
        }
        renderFunctionList();
        plot();
      };

      // Safe math expression parser (no eval)
      function parseMathExpr(expr, x) {
        // Tokenize
        const tokens = [];
        let i = 0;
        while (i < expr.length) {
          if (/\s/.test(expr[i])) {
            i++;
            continue;
          }
          if (/\d/.test(expr[i]) || (expr[i] === "." && /\d/.test(expr[i + 1]))) {
            let num = "";
            while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) {
              num += expr[i++];
            }
            tokens.push({ type: "num", value: parseFloat(num) });
          } else if (expr[i] === "x") {
            tokens.push({ type: "num", value: x });
            i++;
          } else if (expr.substr(i, 2) === "pi") {
            tokens.push({ type: "num", value: Math.PI });
            i += 2;
          } else if (expr[i] === "e" && !/[xp]/.test(expr[i + 1])) {
            tokens.push({ type: "num", value: Math.E });
            i++;
          } else if (expr.substr(i, 3) === "sin") {
            tokens.push({ type: "fn", value: "sin" });
            i += 3;
          } else if (expr.substr(i, 3) === "cos") {
            tokens.push({ type: "fn", value: "cos" });
            i += 3;
          } else if (expr.substr(i, 3) === "tan") {
            tokens.push({ type: "fn", value: "tan" });
            i += 3;
          } else if (expr.substr(i, 4) === "sqrt") {
            tokens.push({ type: "fn", value: "sqrt" });
            i += 4;
          } else if (expr.substr(i, 3) === "log") {
            tokens.push({ type: "fn", value: "log" });
            i += 3;
          } else if (expr.substr(i, 3) === "exp") {
            tokens.push({ type: "fn", value: "exp" });
            i += 3;
          } else if (expr.substr(i, 3) === "abs") {
            tokens.push({ type: "fn", value: "abs" });
            i += 3;
          } else if ("+-*/^()".includes(expr[i])) {
            tokens.push({ type: "op", value: expr[i] });
            i++;
          } else {
            i++; // skip unknown
          }
        }

        // Recursive descent parser
        let pos = 0;
        function peek() {
          return tokens[pos];
        }
        function consume() {
          return tokens[pos++];
        }

        function parseExpr() {
          let left = parseTerm();
          while (peek() && (peek().value === "+" || peek().value === "-")) {
            const op = consume().value;
            const right = parseTerm();
            left = op === "+" ? left + right : left - right;
          }
          return left;
        }

        function parseTerm() {
          let left = parsePower();
          while (peek() && (peek().value === "*" || peek().value === "/")) {
            const op = consume().value;
            const right = parsePower();
            left = op === "*" ? left * right : left / right;
          }
          return left;
        }

        function parsePower() {
          let left = parseUnary();
          if (peek() && peek().value === "^") {
            consume();
            const right = parsePower(); // right associative
            left = Math.pow(left, right);
          }
          return left;
        }

        function parseUnary() {
          if (peek() && peek().value === "-") {
            consume();
            return -parseUnary();
          }
          if (peek() && peek().value === "+") {
            consume();
            return parseUnary();
          }
          return parsePrimary();
        }

        function parsePrimary() {
          const t = peek();
          if (!t) return NaN;
          if (t.type === "num") {
            consume();
            return t.value;
          }
          if (t.type === "fn") {
            const fn = consume().value;
            if (!peek() || peek().value !== "(") return NaN;
            consume(); // (
            const arg = parseExpr();
            if (peek() && peek().value === ")") consume();
            const funcs = {
              sin: Math.sin,
              cos: Math.cos,
              tan: Math.tan,
              sqrt: Math.sqrt,
              log: Math.log,
              exp: Math.exp,
              abs: Math.abs
            };
            return funcs[fn] ? funcs[fn](arg) : NaN;
          }
          if (t.value === "(") {
            consume();
            const val = parseExpr();
            if (peek() && peek().value === ")") consume();
            return val;
          }
          return NaN;
        }

        return parseExpr();
      }

      function evaluateFunction(expr, x) {
        try {
          return parseMathExpr(expr.toLowerCase(), x);
        } catch {
          return NaN;
        }
      }

      function plot() {
        let xMin = parseFloat(document.getElementById("xMin").value);
        let xMax = parseFloat(document.getElementById("xMax").value);
        let yMin = parseFloat(document.getElementById("yMin").value);
        let yMax = parseFloat(document.getElementById("yMax").value);
        if (![xMin, xMax, yMin, yMax].every(Number.isFinite)) return;
        if (xMax <= xMin) xMax = xMin + 1;
        if (yMax <= yMin) yMax = yMin + 1;

        const width = canvas.width;
        const height = canvas.height;
        const isDark = document.body.getAttribute("data-theme") !== "light";

        // Clear canvas
        ctx.fillStyle = isDark ? "#1a1a25" : "#f8fafc";
        ctx.fillRect(0, 0, width, height);

        // Calculate scale
        const scaleX = width / (xMax - xMin);
        const scaleY = height / (yMax - yMin);

        // Transform functions
        const toCanvasX = (x) => (x - xMin) * scaleX;
        const toCanvasY = (y) => height - (y - yMin) * scaleY;

        // Draw grid
        ctx.strokeStyle = isDark ? "#2a2a3a" : "#e2e8f0";
        ctx.lineWidth = 1;

        // Vertical grid lines
        for (let x = Math.ceil(xMin); x <= xMax; x++) {
          ctx.beginPath();
          ctx.moveTo(toCanvasX(x), 0);
          ctx.lineTo(toCanvasX(x), height);
          ctx.stroke();
        }

        // Horizontal grid lines
        for (let y = Math.ceil(yMin); y <= yMax; y++) {
          ctx.beginPath();
          ctx.moveTo(0, toCanvasY(y));
          ctx.lineTo(width, toCanvasY(y));
          ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = isDark ? "#666" : "#94a3b8";
        ctx.lineWidth = 2;

        // X axis
        if (yMin <= 0 && yMax >= 0) {
          ctx.beginPath();
          ctx.moveTo(0, toCanvasY(0));
          ctx.lineTo(width, toCanvasY(0));
          ctx.stroke();
        }

        // Y axis
        if (xMin <= 0 && xMax >= 0) {
          ctx.beginPath();
          ctx.moveTo(toCanvasX(0), 0);
          ctx.lineTo(toCanvasX(0), height);
          ctx.stroke();
        }

        // Draw axis labels
        ctx.fillStyle = isDark ? "#888" : "#64748b";
        ctx.font = "24px sans-serif";
        ctx.textAlign = "center";

        for (let x = Math.ceil(xMin); x <= xMax; x++) {
          if (x !== 0) {
            const canvasX = toCanvasX(x);
            const canvasY = toCanvasY(0);
            if (canvasY > 30 && canvasY < height - 10) {
              ctx.fillText(x, canvasX, canvasY + 30);
            }
          }
        }

        ctx.textAlign = "right";
        for (let y = Math.ceil(yMin); y <= yMax; y++) {
          if (y !== 0) {
            const canvasX = toCanvasX(0);
            const canvasY = toCanvasY(y);
            if (canvasX > 10 && canvasX < width - 40) {
              ctx.fillText(y, canvasX - 10, canvasY + 8);
            }
          }
        }

        // Draw functions
        const step = Math.max(((xMax - xMin) / width) * 2, Number.EPSILON);

        functions.forEach((f) => {
          if (!f.expr) return;

          ctx.strokeStyle = f.color;
          ctx.lineWidth = 3;
          ctx.beginPath();

          let started = false;
          let lastY = null;

          for (let x = xMin; x <= xMax; x += step) {
            const y = evaluateFunction(f.expr, x);

            if (isNaN(y) || !isFinite(y) || y < yMin - 100 || y > yMax + 100) {
              started = false;
              lastY = null;
              continue;
            }

            // Detect discontinuity
            if (lastY !== null && Math.abs(y - lastY) > (yMax - yMin) * 0.5) {
              started = false;
            }

            const canvasX = toCanvasX(x);
            const canvasY = toCanvasY(y);

            if (!started) {
              ctx.moveTo(canvasX, canvasY);
              started = true;
            } else {
              ctx.lineTo(canvasX, canvasY);
            }

            lastY = y;
          }

          ctx.stroke();
        });

        // Draw legend
        ctx.font = "24px monospace";
        functions.forEach((f, i) => {
          if (!f.expr) return;
          ctx.fillStyle = f.color;
          ctx.fillRect(20, 20 + i * 35, 20, 20);
          ctx.fillStyle = isDark ? "#fff" : "#1e293b";
          ctx.textAlign = "left";
          ctx.fillText(`y = ${f.expr}`, 50, 37 + i * 35);
        });
      }

      window.zoomIn = function () {
        const xMin = parseFloat(document.getElementById("xMin").value);
        const xMax = parseFloat(document.getElementById("xMax").value);
        const yMin = parseFloat(document.getElementById("yMin").value);
        const yMax = parseFloat(document.getElementById("yMax").value);

        const xCenter = (xMin + xMax) / 2;
        const yCenter = (yMin + yMax) / 2;
        const xRange = (xMax - xMin) * 0.4;
        const yRange = (yMax - yMin) * 0.4;

        document.getElementById("xMin").value = xCenter - xRange;
        document.getElementById("xMax").value = xCenter + xRange;
        document.getElementById("yMin").value = yCenter - yRange;
        document.getElementById("yMax").value = yCenter + yRange;

        plot();
      };

      window.zoomOut = function () {
        const xMin = parseFloat(document.getElementById("xMin").value);
        const xMax = parseFloat(document.getElementById("xMax").value);
        const yMin = parseFloat(document.getElementById("yMin").value);
        const yMax = parseFloat(document.getElementById("yMax").value);

        const xCenter = (xMin + xMax) / 2;
        const yCenter = (yMin + yMax) / 2;
        const xRange = (xMax - xMin) * 0.75;
        const yRange = (yMax - yMin) * 0.75;

        document.getElementById("xMin").value = xCenter - xRange;
        document.getElementById("xMax").value = xCenter + xRange;
        document.getElementById("yMin").value = yCenter - yRange;
        document.getElementById("yMax").value = yCenter + yRange;

        plot();
      };

      window.resetView = function () {
        document.getElementById("xMin").value = -10;
        document.getElementById("xMax").value = 10;
        document.getElementById("yMin").value = -10;
        document.getElementById("yMax").value = 10;
        plot();
      };

      window.downloadImage = function () {
        const link = document.createElement("a");
        link.download = "function-plot.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Mouse tracking
      canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleRatio = canvas.width / rect.width;
        const canvasX = (e.clientX - rect.left) * scaleRatio;
        const canvasY = (e.clientY - rect.top) * scaleRatio;

        const xMin = parseFloat(document.getElementById("xMin").value);
        const xMax = parseFloat(document.getElementById("xMax").value);
        const yMin = parseFloat(document.getElementById("yMin").value);
        const yMax = parseFloat(document.getElementById("yMax").value);

        const x = xMin + (canvasX / canvas.width) * (xMax - xMin);
        const y = yMax - (canvasY / canvas.height) * (yMax - yMin);

        document.getElementById("coordinates").textContent =
          `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`;
      });

      // Initialize
      window.addEventListener("resize", resizeCanvas);
      renderFunctionList();
      resizeCanvas();
    
