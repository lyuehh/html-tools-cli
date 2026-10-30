// @ts-nocheck
// Generated from tools/dev/svg-path-editor.html
// Source SHA-256: 7de264a39fe35bd27d0a626f2e74799a0882f5f6ad89caf01f6c576fe8f6015c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var currentTool = "move";
      var pathData = [];
      var activePoint = null;
      var svgCanvas = null;

      // Theme management
      function initTheme() {
        var savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);
      }

      window.toggleTheme = function () {
        var currentTheme = document.documentElement.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      };

      function updateThemeIcon(theme) {
        document.getElementById("theme-icon").textContent =
          theme === "light" ? "\u{1F319}" : "\u2600";
      }

      window.setTool = function (tool) {
        currentTool = tool;
        document.querySelectorAll(".tool-btn").forEach(function (btn) {
          btn.classList.remove("active");
        });
        document.getElementById("tool-" + tool).classList.add("active");
      };

      window.loadPreset = function (preset) {
        var presets = {
          line: [
            { type: "M", x: 100, y: 200 },
            { type: "L", x: 500, y: 200 }
          ],
          curve: [
            { type: "M", x: 50, y: 200 },
            { type: "C", x1: 150, y1: 50, x2: 350, y2: 350, x: 500, y: 200 }
          ],
          heart: [
            { type: "M", x: 300, y: 350 },
            { type: "C", x1: 100, y1: 250, x2: 100, y2: 100, x: 300, y: 150 },
            { type: "C", x1: 500, y1: 100, x2: 500, y2: 250, x: 300, y: 350 },
            { type: "Z" }
          ],
          star: [
            { type: "M", x: 300, y: 50 },
            { type: "L", x: 350, y: 150 },
            { type: "L", x: 450, y: 150 },
            { type: "L", x: 380, y: 220 },
            { type: "L", x: 410, y: 330 },
            { type: "L", x: 300, y: 270 },
            { type: "L", x: 190, y: 330 },
            { type: "L", x: 220, y: 220 },
            { type: "L", x: 150, y: 150 },
            { type: "L", x: 250, y: 150 },
            { type: "Z" }
          ],
          wave: [
            { type: "M", x: 50, y: 200 },
            { type: "Q", x1: 150, y1: 100, x: 200, y: 200 },
            { type: "Q", x1: 250, y1: 300, x: 300, y: 200 },
            { type: "Q", x1: 350, y1: 100, x: 400, y: 200 },
            { type: "Q", x1: 450, y1: 300, x: 500, y: 200 }
          ]
        };

        if (presets[preset]) {
          pathData = JSON.parse(JSON.stringify(presets[preset]));
          render();
        }
      };

      function getMousePos(e) {
        var svg = document.getElementById("svg-canvas");
        var rect = svg.getBoundingClientRect();
        var scaleX = 600 / rect.width;
        var scaleY = 400 / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY
        };
      }

      function handleCanvasClick(e) {
        if (currentTool !== "add") return;

        var pos = getMousePos(e);

        if (pathData.length === 0) {
          pathData.push({ type: "M", x: pos.x, y: pos.y });
        } else {
          pathData.push({ type: "L", x: pos.x, y: pos.y });
        }

        render();
      }

      function handlePointClick(e, index, pointType) {
        e.stopPropagation();

        if (currentTool === "delete") {
          if (pointType === "main" && pathData.length > 1) {
            pathData.splice(index, 1);
            if (index === 0 && pathData.length > 0) {
              pathData[0].type = "M";
            }
            render();
          }
        }
      }

      function startDrag(e, index, pointType) {
        if (currentTool !== "move") return;

        e.stopPropagation();
        activePoint = { index: index, type: pointType };

        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
      }

      function drag(e) {
        if (!activePoint) return;

        var pos = getMousePos(e);
        var point = pathData[activePoint.index];

        if (activePoint.type === "main") {
          point.x = Math.round(pos.x);
          point.y = Math.round(pos.y);
        } else if (activePoint.type === "c1") {
          point.x1 = Math.round(pos.x);
          point.y1 = Math.round(pos.y);
        } else if (activePoint.type === "c2") {
          point.x2 = Math.round(pos.x);
          point.y2 = Math.round(pos.y);
        }

        render();
      }

      function stopDrag() {
        activePoint = null;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
      }

      function buildPathString() {
        return pathData
          .map(function (p) {
            switch (p.type) {
              case "M":
                return "M " + p.x + " " + p.y;
              case "L":
                return "L " + p.x + " " + p.y;
              case "C":
                return "C " + p.x1 + " " + p.y1 + " " + p.x2 + " " + p.y2 + " " + p.x + " " + p.y;
              case "Q":
                return "Q " + p.x1 + " " + p.y1 + " " + p.x + " " + p.y;
              case "Z":
                return "Z";
              default:
                return "";
            }
          })
          .join(" ");
      }

      function render() {
        var pathStr = buildPathString();
        document.getElementById("main-path").setAttribute("d", pathStr);
        document.getElementById("path-input").value = pathStr;

        // Render points
        var pointsG = document.getElementById("points");
        var linesG = document.getElementById("control-lines");
        pointsG.textContent = "";
        linesG.textContent = "";

        pathData.forEach(function (point, index) {
          if (point.type === "Z") return;

          // Main point
          var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          circle.setAttribute("cx", point.x);
          circle.setAttribute("cy", point.y);
          circle.setAttribute("r", 8);
          circle.setAttribute("class", "point");
          circle.onmousedown = function (e) {
            startDrag(e, index, "main");
          };
          circle.onclick = function (e) {
            handlePointClick(e, index, "main");
          };
          pointsG.appendChild(circle);

          // Control points for curves
          if (point.type === "C") {
            // Control point 1
            var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            var prevPoint = pathData[index - 1];
            if (prevPoint && prevPoint.type !== "Z") {
              line1.setAttribute("x1", prevPoint.x);
              line1.setAttribute("y1", prevPoint.y);
              line1.setAttribute("x2", point.x1);
              line1.setAttribute("y2", point.y1);
              line1.setAttribute("class", "control-line");
              linesG.appendChild(line1);
            }

            var cp1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cp1.setAttribute("cx", point.x1);
            cp1.setAttribute("cy", point.y1);
            cp1.setAttribute("r", 6);
            cp1.setAttribute("class", "control-point");
            cp1.onmousedown = function (e) {
              startDrag(e, index, "c1");
            };
            pointsG.appendChild(cp1);

            // Control point 2
            var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("x1", point.x);
            line2.setAttribute("y1", point.y);
            line2.setAttribute("x2", point.x2);
            line2.setAttribute("y2", point.y2);
            line2.setAttribute("class", "control-line");
            linesG.appendChild(line2);

            var cp2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cp2.setAttribute("cx", point.x2);
            cp2.setAttribute("cy", point.y2);
            cp2.setAttribute("r", 6);
            cp2.setAttribute("class", "control-point");
            cp2.onmousedown = function (e) {
              startDrag(e, index, "c2");
            };
            pointsG.appendChild(cp2);
          }

          if (point.type === "Q") {
            var prevPoint = pathData[index - 1];
            if (prevPoint && prevPoint.type !== "Z") {
              var line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
              line1.setAttribute("x1", prevPoint.x);
              line1.setAttribute("y1", prevPoint.y);
              line1.setAttribute("x2", point.x1);
              line1.setAttribute("y2", point.y1);
              line1.setAttribute("class", "control-line");
              linesG.appendChild(line1);
            }

            var line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("x1", point.x1);
            line2.setAttribute("y1", point.y1);
            line2.setAttribute("x2", point.x);
            line2.setAttribute("y2", point.y);
            line2.setAttribute("class", "control-line");
            linesG.appendChild(line2);

            var cp1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            cp1.setAttribute("cx", point.x1);
            cp1.setAttribute("cy", point.y1);
            cp1.setAttribute("r", 6);
            cp1.setAttribute("class", "control-point");
            cp1.onmousedown = function (e) {
              startDrag(e, index, "c1");
            };
            pointsG.appendChild(cp1);
          }
        });

        updateStyle();
        updateCodeOutput();
      }

      function updateStyle() {
        var path = document.getElementById("main-path");
        var strokeColor = document.getElementById("stroke-color").value;
        var fillColor = document.getElementById("fill-color").value;
        var fillEnabled = document.getElementById("fill-enabled").checked;
        var strokeWidth = document.getElementById("stroke-width").value;

        document.getElementById("stroke-width-value").textContent = strokeWidth;
        document.getElementById("stroke-color-hex").value = strokeColor;
        document.getElementById("fill-color-hex").value = fillColor;

        path.style.stroke = strokeColor;
        path.style.strokeWidth = strokeWidth + "px";
        path.style.fill = fillEnabled ? fillColor : "none";

        document.documentElement.style.setProperty("--path-color", strokeColor);

        updateCodeOutput();
      }

      window.syncStrokeColor = function () {
        var hex = document.getElementById("stroke-color-hex").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          document.getElementById("stroke-color").value = hex;
          updateStyle();
        }
      };

      window.syncFillColor = function () {
        var hex = document.getElementById("fill-color-hex").value;
        if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
          document.getElementById("fill-color").value = hex;
          updateStyle();
        }
      };

      window.parsePathInput = function () {
        // Simple parser for basic path commands
        var input = document.getElementById("path-input").value.trim();
        if (!input) return;

        // Update path directly without parsing
        document.getElementById("main-path").setAttribute("d", input);
        updateCodeOutput();
      };

      window.clearCanvas = function () {
        pathData = [];
        render();
      };

      window.closePath = function () {
        if (pathData.length > 0) {
          var hasZ = pathData.some(function (p) {
            return p.type === "Z";
          });
          if (!hasZ) {
            pathData.push({ type: "Z" });
            render();
          }
        }
      };

      function updateCodeOutput() {
        var pathStr = document.getElementById("main-path").getAttribute("d") || "";
        var strokeColor = document.getElementById("stroke-color").value;
        var fillColor = document.getElementById("fill-color").value;
        var fillEnabled = document.getElementById("fill-enabled").checked;
        var strokeWidth = document.getElementById("stroke-width").value;

        var svgCode =
          '<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">\n' +
          '  <path d="' +
          pathStr +
          '"\n' +
          '        fill="' +
          (fillEnabled ? fillColor : "none") +
          '"\n' +
          '        stroke="' +
          strokeColor +
          '"\n' +
          '        stroke-width="' +
          strokeWidth +
          '"/>\n' +
          "</svg>";

        document.getElementById("code-output").textContent = svgCode;
      }

      window.copyCode = function () {
        var codeOutput = document.getElementById("code-output");
        var text = codeOutput.textContent;

        navigator.clipboard.writeText(text).then(function () {
          var btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "复制代码";
            btn.classList.remove("copied");
          }, 2000);
        });
      };

      // Initialize
      initTheme();
      document.getElementById("svg-canvas").addEventListener("click", handleCanvasClick);
      loadPreset("curve");
    
