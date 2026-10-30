// @ts-nocheck
// Generated from tools/generator/mesh-gradient.html
// Source SHA-256: d14a5fef56029fb52da9cb2096f652d4fb7960d346ffe846b2062edd804a0695
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 预设配色方案
      const presets = [
        { colors: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3"], bg: "#ffffff" },
        { colors: ["#667eea", "#764ba2", "#f093fb"], bg: "#1a1a2e" },
        { colors: ["#11998e", "#38ef7d", "#00b4db"], bg: "#0f0f1a" },
        { colors: ["#fc466b", "#3f5efb", "#9400d3"], bg: "#000000" },
        { colors: ["#f12711", "#f5af19", "#f7971e"], bg: "#fff5e6" },
        { colors: ["#00c6ff", "#0072ff", "#7f00ff"], bg: "#e8f4f8" },
        { colors: ["#ff0844", "#ffb199", "#ff6b95"], bg: "#fff0f5" },
        { colors: ["#8ec5fc", "#e0c3fc", "#d5aaff"], bg: "#f5f5ff" }
      ];

      // 状态
      let colorPoints = [
        { color: "#667eea", x: 20, y: 30 },
        { color: "#764ba2", x: 80, y: 20 },
        { color: "#f093fb", x: 50, y: 80 }
      ];
      let currentTab = "css";
      let isAnimating = false;
      let animationId = null;

      // 初始化
      function init() {
        initPresets();
        renderColorPoints();
        updatePreview();
        bindEvents();
      }

      // 初始化预设
      function initPresets() {
        const grid = document.getElementById("presetGrid");
        presets.forEach((preset, index) => {
          const item = document.createElement("div");
          item.className = "preset-item";
          item.style.background = generateMeshGradientCSS(preset.colors, preset.bg, 40);
          item.addEventListener("click", () => {
            colorPoints = preset.colors.map((color, i) => ({
              color,
              x: 20 + (i % 2) * 60 + Math.random() * 20,
              y: 20 + Math.floor(i / 2) * 60 + Math.random() * 20
            }));
            document.getElementById("bgColor").value = preset.bg;
            renderColorPoints();
            updatePreview();
          });
          grid.appendChild(item);
        });
      }

      // 生成CSS渐变
      function generateMeshGradientCSS(colors, bgColor, blur) {
        if (!colors || colors.length === 0) {
          colors = colorPoints.map((p) => p.color);
        }

        const gradients = colorPoints.map((point, i) => {
          const size = 50 + blur;
          return `radial-gradient(at ${point.x}% ${point.y}%, ${point.color} 0px, transparent ${size}%)`;
        });

        return `${bgColor || document.getElementById("bgColor").value} ${gradients.join(", ")}`;
      }

      // 渲染颜色点
      function renderColorPoints() {
        const container = document.getElementById("colorPoints");
        container.replaceChildren();

        colorPoints.forEach((point, index) => {
          const div = document.createElement("div");
          div.className = "color-point";

          const colorInput = document.createElement("input");
          colorInput.type = "color";
          colorInput.value = point.color;
          colorInput.addEventListener("input", (e) => {
            colorPoints[index].color = e.target.value;
            updatePreview();
          });

          const posDiv = document.createElement("div");
          posDiv.className = "color-point-pos";

          const xInput = document.createElement("input");
          xInput.type = "number";
          xInput.value = Math.round(point.x);
          xInput.min = 0;
          xInput.max = 100;
          xInput.placeholder = "X%";
          xInput.addEventListener("input", (e) => {
            colorPoints[index].x = parseFloat(e.target.value) || 0;
            updatePreview();
          });

          const yInput = document.createElement("input");
          yInput.type = "number";
          yInput.value = Math.round(point.y);
          yInput.min = 0;
          yInput.max = 100;
          yInput.placeholder = "Y%";
          yInput.addEventListener("input", (e) => {
            colorPoints[index].y = parseFloat(e.target.value) || 0;
            updatePreview();
          });

          posDiv.appendChild(xInput);
          posDiv.appendChild(yInput);

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "outline";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => {
            if (colorPoints.length > 2) {
              colorPoints.splice(index, 1);
              renderColorPoints();
              updatePreview();
            } else {
              alert("至少需要2个颜色点");
            }
          });

          div.appendChild(colorInput);
          div.appendChild(posDiv);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });
      }

      // 更新预览
      window.updatePreview = function () {
        const blur = document.getElementById("blur").value;
        const bgColor = document.getElementById("bgColor").value;
        const preview = document.getElementById("gradientPreview");

        preview.style.background = generateMeshGradientCSS(null, bgColor, parseInt(blur));
        updateCode();
      };

      // 更新代码输出
      function updateCode() {
        const blur = document.getElementById("blur").value;
        const bgColor = document.getElementById("bgColor").value;
        const output = document.getElementById("codeOutput");

        if (currentTab === "css") {
          const css = `background: ${generateMeshGradientCSS(null, bgColor, parseInt(blur))};`;
          output.textContent = css;
        } else {
          output.textContent = generateSVG();
        }
      }

      // 生成SVG
      function generateSVG() {
        const width = document.getElementById("exportWidth").value;
        const height = document.getElementById("exportHeight").value;
        const blur = document.getElementById("blur").value;
        const bgColor = document.getElementById("bgColor").value;
        const blurAmount = (parseInt(blur) / 100) * Math.min(width, height) * 0.3;

        let defs = "<defs>";
        let circles = "";

        colorPoints.forEach((point, i) => {
          const cx = (point.x / 100) * width;
          const cy = (point.y / 100) * height;
          const r = Math.min(width, height) * 0.4;

          defs += `
        <radialGradient id="grad${i}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${point.color}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${point.color}" stop-opacity="0"/>
        </radialGradient>`;

          circles += `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#grad${i})"/>`;
        });

        defs += `
        <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}"/>
        </filter>
    </defs>`;

        return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    ${defs}
    <rect width="100%" height="100%" fill="${bgColor}"/>
    <g filter="url(#blur)">${circles}
    </g>
</svg>`;
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

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        }

        // 模糊度
        document.getElementById("blur").addEventListener("input", (e) => {
          document.getElementById("blurValue").textContent = e.target.value;
          updatePreview();
        });

        // 背景色
        document.getElementById("bgColor").addEventListener("input", updatePreview);

        // 添加颜色点
        document.getElementById("addColorBtn").addEventListener("click", () => {
          if (colorPoints.length < 8) {
            const randomColor =
              "#" +
              Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0");
            colorPoints.push({
              color: randomColor,
              x: 20 + Math.random() * 60,
              y: 20 + Math.random() * 60
            });
            renderColorPoints();
            updatePreview();
          } else {
            alert("最多支持8个颜色点");
          }
        });

        // 随机生成
        document.getElementById("randomBtn").addEventListener("click", () => {
          const numPoints = 3 + Math.floor(Math.random() * 3);
          colorPoints = [];
          for (let i = 0; i < numPoints; i++) {
            colorPoints.push({
              color:
                "#" +
                Math.floor(Math.random() * 16777215)
                  .toString(16)
                  .padStart(6, "0"),
              x: 10 + Math.random() * 80,
              y: 10 + Math.random() * 80
            });
          }
          renderColorPoints();
          updatePreview();
        });

        // 动画效果
        document.getElementById("animateBtn").addEventListener("click", () => {
          isAnimating = !isAnimating;
          const btn = document.getElementById("animateBtn");

          if (isAnimating) {
            btn.textContent = "停止动画";
            animateGradient();
          } else {
            btn.textContent = "动画效果";
            if (animationId) {
              cancelAnimationFrame(animationId);
            }
          }
        });

        // Tab切换
        document.getElementById("cssTab").addEventListener("click", () => {
          currentTab = "css";
          document.getElementById("cssTab").classList.add("active");
          document.getElementById("svgTab").classList.remove("active");
          updateCode();
        });

        document.getElementById("svgTab").addEventListener("click", () => {
          currentTab = "svg";
          document.getElementById("svgTab").classList.add("active");
          document.getElementById("cssTab").classList.remove("active");
          updateCode();
        });

        // 复制代码
        document.getElementById("copyCodeBtn").addEventListener("click", () => {
          const code = document.getElementById("codeOutput").textContent;
          navigator.clipboard.writeText(code).then(() => {
            alert("代码已复制到剪贴板");
          });
        });

        // 下载PNG
        document.getElementById("downloadPngBtn").addEventListener("click", downloadPNG);

        // 下载SVG
        document.getElementById("downloadSvgBtn").addEventListener("click", () => {
          const svg = generateSVG();
          const blob = new Blob([svg], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mesh-gradient.svg";
          a.click();
          URL.revokeObjectURL(url);
        });
      }

      // 动画
      function animateGradient() {
        if (!isAnimating) return;

        colorPoints.forEach((point) => {
          point.x += (Math.random() - 0.5) * 2;
          point.y += (Math.random() - 0.5) * 2;
          point.x = Math.max(5, Math.min(95, point.x));
          point.y = Math.max(5, Math.min(95, point.y));
        });

        updatePreview();
        animationId = requestAnimationFrame(animateGradient);
      }

      // 下载PNG
      window.downloadPNG = function () {
        const width = parseInt(document.getElementById("exportWidth").value);
        const height = parseInt(document.getElementById("exportHeight").value);
        const svg = generateSVG();

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        const img = new Image();
        const svgBlob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0, width, height);
          URL.revokeObjectURL(url);

          const pngUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = "mesh-gradient.png";
          a.click();
        };
        img.src = url;
      };

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
    
