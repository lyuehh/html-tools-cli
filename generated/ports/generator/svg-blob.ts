// @ts-nocheck
// Generated from tools/generator/svg-blob.html
// Source SHA-256: e8ae33cfaabc7d08f3b3d764d1d21a5b187f64aedeb7508a40077698c30bec03
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 预设颜色
      const presetColors = [
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#14b8a6",
        "#06b6d4",
        "#3b82f6",
        "#1e293b",
        "#64748b"
      ];

      // 状态
      let currentPath = "";
      let isGradient = false;
      let currentSvgCode = "";

      // 初始化
      function init() {
        initPresetColors();
        generateBlob();
        bindEvents();
      }

      // 初始化预设颜色
      function initPresetColors() {
        const container = document.getElementById("presetColors");
        presetColors.forEach((color) => {
          const btn = document.createElement("div");
          btn.className = "preset-color";
          btn.style.backgroundColor = color;
          btn.addEventListener("click", () => {
            document.getElementById("fillColor").value = color;
            document.getElementById("fillColorText").value = color;
            generateBlob();
          });
          container.appendChild(btn);
        });
      }

      // 生成blob路径
      function generateBlobPath(complexity, randomness, size) {
        const points = [];
        const angleStep = (Math.PI * 2) / complexity;
        const radius = size / 2;
        const randomFactor = randomness / 100;

        for (let i = 0; i < complexity; i++) {
          const angle = i * angleStep;
          const randomRadius = radius * (1 - randomFactor * 0.5 + Math.random() * randomFactor);
          points.push({
            x: Math.cos(angle) * randomRadius + size / 2,
            y: Math.sin(angle) * randomRadius + size / 2
          });
        }

        // 生成平滑曲线
        let path = "M " + points[0].x.toFixed(2) + " " + points[0].y.toFixed(2);

        for (let i = 0; i < points.length; i++) {
          const p0 = points[(i - 1 + points.length) % points.length];
          const p1 = points[i];
          const p2 = points[(i + 1) % points.length];
          const p3 = points[(i + 2) % points.length];

          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          path +=
            " C " +
            cp1x.toFixed(2) +
            " " +
            cp1y.toFixed(2) +
            ", " +
            cp2x.toFixed(2) +
            " " +
            cp2y.toFixed(2) +
            ", " +
            p2.x.toFixed(2) +
            " " +
            p2.y.toFixed(2);
        }

        path += " Z";
        return path;
      }

      // 生成blob
      function generateBlob() {
        const complexity = parseInt(document.getElementById("complexity").value);
        const randomness = parseInt(document.getElementById("randomness").value);
        const size = parseInt(document.getElementById("size").value);
        const enableStroke = document.getElementById("enableStroke").checked;
        const strokeColor = document.getElementById("strokeColor").value;
        const strokeWidth = document.getElementById("strokeWidth").value;

        currentPath = generateBlobPath(complexity, randomness, size);

        const container = document.getElementById("blobContainer");
        container.replaceChildren();

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 " + size + " " + size);
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

        let fillAttr = "";

        if (isGradient) {
          const angle = parseInt(document.getElementById("gradientAngle").value);
          const startColor = document.getElementById("gradientStart").value;
          const endColor = document.getElementById("gradientEnd").value;

          const rad = (angle * Math.PI) / 180;
          const x1 = 50 - Math.cos(rad) * 50;
          const y1 = 50 - Math.sin(rad) * 50;
          const x2 = 50 + Math.cos(rad) * 50;
          const y2 = 50 + Math.sin(rad) * 50;

          const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
          const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
          gradient.setAttribute("id", "blobGradient");
          gradient.setAttribute("x1", x1.toFixed(1) + "%");
          gradient.setAttribute("y1", y1.toFixed(1) + "%");
          gradient.setAttribute("x2", x2.toFixed(1) + "%");
          gradient.setAttribute("y2", y2.toFixed(1) + "%");

          const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          stop1.setAttribute("offset", "0%");
          stop1.setAttribute("stop-color", startColor);

          const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
          stop2.setAttribute("offset", "100%");
          stop2.setAttribute("stop-color", endColor);

          gradient.appendChild(stop1);
          gradient.appendChild(stop2);
          defs.appendChild(gradient);
          svg.appendChild(defs);

          fillAttr = "url(#blobGradient)";
        } else {
          fillAttr = document.getElementById("fillColor").value;
        }

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", currentPath);
        path.setAttribute("fill", fillAttr);

        if (enableStroke) {
          path.setAttribute("stroke", strokeColor);
          path.setAttribute("stroke-width", strokeWidth);
        }

        svg.appendChild(path);
        container.appendChild(svg);

        // 生成代码字符串用于显示和导出
        updateSvgCode(size, fillAttr, enableStroke, strokeColor, strokeWidth);
      }

      function updateSvgCode(size, fillAttr, enableStroke, strokeColor, strokeWidth) {
        let defsStr = "";
        if (isGradient) {
          const angle = parseInt(document.getElementById("gradientAngle").value);
          const startColor = document.getElementById("gradientStart").value;
          const endColor = document.getElementById("gradientEnd").value;

          const rad = (angle * Math.PI) / 180;
          const x1 = 50 - Math.cos(rad) * 50;
          const y1 = 50 - Math.sin(rad) * 50;
          const x2 = 50 + Math.cos(rad) * 50;
          const y2 = 50 + Math.sin(rad) * 50;

          defsStr =
            '\n    <defs>\n        <linearGradient id="blobGradient" x1="' +
            x1.toFixed(1) +
            '%" y1="' +
            y1.toFixed(1) +
            '%" x2="' +
            x2.toFixed(1) +
            '%" y2="' +
            y2.toFixed(1) +
            '%">\n            <stop offset="0%" stop-color="' +
            startColor +
            '"/>\n            <stop offset="100%" stop-color="' +
            endColor +
            '"/>\n        </linearGradient>\n    </defs>';
        }

        let strokeStr = "";
        if (enableStroke) {
          strokeStr = ' stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '"';
        }

        currentSvgCode =
          '<svg viewBox="0 0 ' +
          size +
          " " +
          size +
          '" xmlns="http://www.w3.org/2000/svg">' +
          defsStr +
          '\n    <path d="' +
          currentPath +
          '" fill="' +
          fillAttr +
          '"' +
          strokeStr +
          "/>\n</svg>";

        document.getElementById("svgCode").textContent = currentSvgCode;
      }

      // 绑定事件
      function bindEvents() {
        // 主题切换
        document.getElementById("themeToggle").addEventListener("click", () => {
          const html = document.documentElement;
          const currentTheme = html.getAttribute("data-theme");
          const newTheme = currentTheme === "light" ? "dark" : "light";
          html.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
        });

        // 加载保存的主题
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        }

        // 滑块更新
        const sliders = [
          { id: "complexity", valueId: "complexityValue" },
          { id: "randomness", valueId: "randomnessValue" },
          { id: "size", valueId: "sizeValue" },
          { id: "gradientAngle", valueId: "gradientAngleValue" },
          { id: "strokeWidth", valueId: "strokeWidthValue" }
        ];

        sliders.forEach(function (item) {
          document.getElementById(item.id).addEventListener("input", function (e) {
            document.getElementById(item.valueId).textContent = e.target.value;
            generateBlob();
          });
        });

        // 颜色输入同步
        const colorInputs = [
          { color: "fillColor", text: "fillColorText" },
          { color: "gradientStart", text: "gradientStartText" },
          { color: "gradientEnd", text: "gradientEndText" },
          { color: "strokeColor", text: "strokeColorText" }
        ];

        colorInputs.forEach(function (item) {
          document.getElementById(item.color).addEventListener("input", function (e) {
            document.getElementById(item.text).value = e.target.value;
            generateBlob();
          });
          document.getElementById(item.text).addEventListener("input", function (e) {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
              document.getElementById(item.color).value = e.target.value;
              generateBlob();
            }
          });
        });

        // 纯色/渐变切换
        document.getElementById("solidBtn").addEventListener("click", function () {
          isGradient = false;
          document.getElementById("solidBtn").classList.add("active");
          document.getElementById("gradientBtn").classList.remove("active");
          document.getElementById("solidColorGroup").style.display = "block";
          document.getElementById("gradientColorGroup").style.display = "none";
          generateBlob();
        });

        document.getElementById("gradientBtn").addEventListener("click", function () {
          isGradient = true;
          document.getElementById("gradientBtn").classList.add("active");
          document.getElementById("solidBtn").classList.remove("active");
          document.getElementById("solidColorGroup").style.display = "none";
          document.getElementById("gradientColorGroup").style.display = "block";
          generateBlob();
        });

        // 边框开关
        document.getElementById("enableStroke").addEventListener("change", function (e) {
          document.getElementById("strokeOptions").style.display = e.target.checked
            ? "block"
            : "none";
          generateBlob();
        });

        // 重新生成
        document.getElementById("regenerateBtn").addEventListener("click", generateBlob);

        // 随机样式
        document.getElementById("randomBtn").addEventListener("click", function () {
          document.getElementById("complexity").value = Math.floor(Math.random() * 10) + 3;
          document.getElementById("randomness").value = Math.floor(Math.random() * 100);

          const randomColor = presetColors[Math.floor(Math.random() * presetColors.length)];
          document.getElementById("fillColor").value = randomColor;
          document.getElementById("fillColorText").value = randomColor;

          document.getElementById("complexityValue").textContent =
            document.getElementById("complexity").value;
          document.getElementById("randomnessValue").textContent =
            document.getElementById("randomness").value;

          generateBlob();
        });

        // 复制SVG
        document.getElementById("copySvgBtn").addEventListener("click", function () {
          navigator.clipboard.writeText(currentSvgCode).then(function () {
            alert("SVG代码已复制到剪贴板");
          });
        });

        // 下载SVG
        document.getElementById("downloadSvgBtn").addEventListener("click", function () {
          const blob = new Blob([currentSvgCode], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "blob.svg";
          a.click();
          URL.revokeObjectURL(url);
        });

        // 下载PNG
        document.getElementById("downloadPngBtn").addEventListener("click", function () {
          const size = parseInt(document.getElementById("size").value);

          const canvas = document.createElement("canvas");
          canvas.width = size * 2;
          canvas.height = size * 2;
          const ctx = canvas.getContext("2d");

          const img = new Image();
          const svgBlob = new Blob([currentSvgCode], { type: "image/svg+xml" });
          const url = URL.createObjectURL(svgBlob);

          img.onload = function () {
            ctx.drawImage(img, 0, 0, size * 2, size * 2);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = "blob.png";
            a.click();
          };
          img.src = url;
        });
      }

      // 启动
      init();

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
    
