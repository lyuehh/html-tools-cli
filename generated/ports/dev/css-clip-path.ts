// @ts-nocheck
// Generated from tools/dev/css-clip-path.html
// Source SHA-256: eed61e087798bd2d58c7067d55993b8ffe7364544e8fa6efb655d052a3d188cb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentShape = "polygon";
      let polygonPoints = [
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 }
      ];
      let currentTab = "color";
      let draggingPoint = null;

      const presets = [
        { name: "Triangle", path: "polygon(50% 0%, 0% 100%, 100% 100%)" },
        { name: "Diamond", path: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
        { name: "Pentagon", path: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
        { name: "Hexagon", path: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
        {
          name: "Star",
          path: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
        },
        {
          name: "Arrow Right",
          path: "polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)"
        },
        {
          name: "Arrow Left",
          path: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)"
        },
        {
          name: "Cross",
          path: "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)"
        },
        {
          name: "Heart",
          path: "polygon(50% 15%, 61% 0%, 80% 0%, 100% 20%, 100% 40%, 50% 100%, 0% 40%, 0% 20%, 20% 0%, 39% 0%)"
        },
        { name: "Parallelogram", path: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" },
        { name: "Trapezoid", path: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" },
        {
          name: "Bevel",
          path: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
        }
      ];

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      window.selectShape = function (shape) {
        currentShape = shape;
        document.querySelectorAll(".shape-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.shape === shape);
        });

        document.getElementById("circleControls").style.display =
          shape === "circle" ? "block" : "none";
        document.getElementById("ellipseControls").style.display =
          shape === "ellipse" ? "block" : "none";
        document.getElementById("insetControls").style.display =
          shape === "inset" ? "block" : "none";
        document.getElementById("polygonControls").style.display =
          shape === "polygon" ? "block" : "none";

        updateShape();
      };

      function updateShape() {
        let clipPath = "";

        switch (currentShape) {
          case "circle":
            const r = document.getElementById("circleRadius").value;
            const cx = document.getElementById("circleCx").value;
            const cy = document.getElementById("circleCy").value;
            document.getElementById("circleRadiusVal").textContent = r + "%";
            document.getElementById("circleCxVal").textContent = cx + "%";
            document.getElementById("circleCyVal").textContent = cy + "%";
            clipPath = `circle(${r}% at ${cx}% ${cy}%)`;
            break;

          case "ellipse":
            const rx = document.getElementById("ellipseRx").value;
            const ry = document.getElementById("ellipseRy").value;
            const ecx = document.getElementById("ellipseCx").value;
            const ecy = document.getElementById("ellipseCy").value;
            document.getElementById("ellipseRxVal").textContent = rx + "%";
            document.getElementById("ellipseRyVal").textContent = ry + "%";
            document.getElementById("ellipseCxVal").textContent = ecx + "%";
            document.getElementById("ellipseCyVal").textContent = ecy + "%";
            clipPath = `ellipse(${rx}% ${ry}% at ${ecx}% ${ecy}%)`;
            break;

          case "inset":
            const top = document.getElementById("insetTop").value;
            const right = document.getElementById("insetRight").value;
            const bottom = document.getElementById("insetBottom").value;
            const left = document.getElementById("insetLeft").value;
            const radius = document.getElementById("insetRadius").value;
            document.getElementById("insetTopVal").textContent = top + "%";
            document.getElementById("insetRightVal").textContent = right + "%";
            document.getElementById("insetBottomVal").textContent = bottom + "%";
            document.getElementById("insetLeftVal").textContent = left + "%";
            document.getElementById("insetRadiusVal").textContent = radius + "px";
            clipPath = `inset(${top}% ${right}% ${bottom}% ${left}% round ${radius}px)`;
            break;

          case "polygon":
            const points = polygonPoints.map((p) => `${p.x}% ${p.y}%`).join(", ");
            clipPath = `polygon(${points})`;
            renderPolygonPoints();
            break;
        }

        document.getElementById("previewShape").style.clipPath = clipPath;
        document.getElementById("previewImage").style.clipPath = clipPath;
        document.getElementById("codeOutput").textContent = `clip-path: ${clipPath};`;
      }

      function updatePolygonSides() {
        const sides = parseInt(document.getElementById("polygonSides").value);
        document.getElementById("polygonSidesVal").textContent = sides;

        polygonPoints = [];
        for (let i = 0; i < sides; i++) {
          const angle = (((i * 360) / sides - 90) * Math.PI) / 180;
          const x = 50 + 50 * Math.cos(angle);
          const y = 50 + 50 * Math.sin(angle);
          polygonPoints.push({ x: Math.round(x), y: Math.round(y) });
        }

        updateShape();
      }

      function renderPolygonPoints() {
        const editor = document.getElementById("polygonEditor");
        editor.innerHTML = "";

        polygonPoints.forEach((point, index) => {
          const el = document.createElement("div");
          el.className = "polygon-point";
          el.style.left = point.x + "%";
          el.style.top = point.y + "%";
          el.dataset.index = index;

          el.addEventListener("mousedown", startDrag);
          el.addEventListener("touchstart", startDrag, { passive: false });

          editor.appendChild(el);
        });
      }

      function startDrag(e) {
        e.preventDefault();
        draggingPoint = parseInt(e.target.dataset.index);
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", stopDrag);
        document.addEventListener("touchmove", drag, { passive: false });
        document.addEventListener("touchend", stopDrag);
      }

      function drag(e) {
        if (draggingPoint === null) return;
        e.preventDefault();

        const editor = document.getElementById("polygonEditor");
        const rect = editor.getBoundingClientRect();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        let x = ((clientX - rect.left) / rect.width) * 100;
        let y = ((clientY - rect.top) / rect.height) * 100;

        x = Math.max(0, Math.min(100, x));
        y = Math.max(0, Math.min(100, y));

        polygonPoints[draggingPoint] = { x: Math.round(x), y: Math.round(y) };
        updateShape();
      }

      function stopDrag() {
        draggingPoint = null;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("touchend", stopDrag);
      }

      window.switchTab = function (tab) {
        currentTab = tab;
        document.querySelectorAll(".tab").forEach((t) => {
          t.classList.toggle("active", t.dataset.tab === tab);
        });
        document.getElementById("colorTab").style.display = tab === "color" ? "block" : "none";
        document.getElementById("imageTab").style.display = tab === "image" ? "block" : "none";
      };

      window.loadImage = function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            document.getElementById("previewImage").style.backgroundImage =
              `url(${event.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      };

      function renderPresets() {
        const grid = document.getElementById("presetGrid");
        grid.innerHTML = presets
          .map(
            (preset, i) =>
              `<div class="preset-item" style="clip-path: ${preset.path};" onclick="applyPreset(${i})" title="${preset.name}"></div>`
          )
          .join("");
      }

      window.applyPreset = function (index) {
        const preset = presets[index];
        currentShape = "polygon";

        document.querySelectorAll(".shape-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.shape === "polygon");
        });

        document.getElementById("circleControls").style.display = "none";
        document.getElementById("ellipseControls").style.display = "none";
        document.getElementById("insetControls").style.display = "none";
        document.getElementById("polygonControls").style.display = "block";

        // Parse polygon points from preset
        const match = preset.path.match(/polygon\(([^)]+)\)/);
        if (match) {
          const pointsStr = match[1];
          polygonPoints = pointsStr.split(",").map((p) => {
            const [x, y] = p
              .trim()
              .split(/\s+/)
              .map((v) => parseFloat(v));
            return { x, y };
          });
          document.getElementById("polygonSides").value = polygonPoints.length;
          document.getElementById("polygonSidesVal").textContent = polygonPoints.length;
        }

        updateShape();
      };

      window.copyCode = function () {
        const code = document.getElementById("codeOutput").textContent;
        navigator.clipboard.writeText(code);
        alert("已复制到剪贴板");
      };

      window.resetShape = function () {
        switch (currentShape) {
          case "circle":
            document.getElementById("circleRadius").value = 50;
            document.getElementById("circleCx").value = 50;
            document.getElementById("circleCy").value = 50;
            break;
          case "ellipse":
            document.getElementById("ellipseRx").value = 50;
            document.getElementById("ellipseRy").value = 35;
            document.getElementById("ellipseCx").value = 50;
            document.getElementById("ellipseCy").value = 50;
            break;
          case "inset":
            document.getElementById("insetTop").value = 10;
            document.getElementById("insetRight").value = 10;
            document.getElementById("insetBottom").value = 10;
            document.getElementById("insetLeft").value = 10;
            document.getElementById("insetRadius").value = 10;
            break;
          case "polygon":
            document.getElementById("polygonSides").value = 4;
            updatePolygonSides();
            return;
        }
        updateShape();
      };

      // Initialize
      renderPresets();
      updateShape();
    
