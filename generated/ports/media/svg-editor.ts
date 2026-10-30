// @ts-nocheck
// Generated from tools/media/svg-editor.html
// Source SHA-256: 73cb0ad525decdcc575aeff50baf8b30f5582d4a10d1d73d1eff0876e260706e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      // Templates
      const templates = [
        {
          name: "圆形",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/></svg>'
        },
        {
          name: "矩形",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="8" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/></svg>'
        },
        {
          name: "三角形",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,10 90,90 10,90" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/></svg>'
        },
        {
          name: "星形",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/></svg>'
        },
        {
          name: "心形",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 88 C20 60 5 40 20 25 C35 10 50 25 50 25 C50 25 65 10 80 25 C95 40 80 60 50 88Z" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/></svg>'
        },
        {
          name: "箭头",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 50 L70 50 L70 30 L95 50 L70 70 L70 50" fill="#3b82f6" stroke="#1e40af" stroke-width="2"/></svg>'
        },
        {
          name: "勾选",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 50 L40 70 L80 30" fill="none" stroke="#22c55e" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        },
        {
          name: "加号",
          svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 20 V80 M20 50 H80" fill="none" stroke="#3b82f6" stroke-width="8" stroke-linecap="round"/></svg>'
        }
      ];

      const editor = document.getElementById("svgEditor");
      const preview = document.getElementById("svgPreview");
      const previewInfo = document.getElementById("previewInfo");

      function renderTemplates() {
        const grid = document.getElementById("templatesGrid");
        grid.innerHTML = templates
          .map(
            (t, i) => `
                <div class="template-item" onclick="loadTemplate(${i})" title="${t.name}">
                    ${t.svg}
                </div>
            `
          )
          .join("");
      }

      window.loadTemplate = function (index) {
        editor.value = formatSvgCode(templates[index].svg);
        updatePreview();
      };

      function formatSvgCode(svg) {
        // Simple formatting
        return svg
          .replace(/></g, ">\n<")
          .replace(/(\w+)="([^"]*)" /g, '$1="$2"\n  ')
          .trim();
      }

      window.updatePreview = function () {
        const svgCode = editor.value.trim();
        if (!svgCode) {
          preview.innerHTML = '<div class="error-msg">请输入 SVG 代码</div>';
          previewInfo.textContent = "尺寸: - × -";
          return;
        }

        try {
          // Parse and validate SVG
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgCode, "image/svg+xml");
          const errorNode = doc.querySelector("parsererror");

          if (errorNode) {
            preview.innerHTML = '<div class="error-msg">SVG 语法错误</div>';
            return;
          }

          const svgElement = doc.querySelector("svg");
          if (!svgElement) {
            preview.innerHTML = '<div class="error-msg">未找到 SVG 元素</div>';
            return;
          }

          // Display preview
          preview.innerHTML = svgCode;
          const renderedSvg = preview.querySelector("svg");
          if (renderedSvg) {
            renderedSvg.style.maxWidth = "100%";
            renderedSvg.style.maxHeight = "100%";

            // Get dimensions
            const viewBox = renderedSvg.getAttribute("viewBox");
            const width =
              renderedSvg.getAttribute("width") || (viewBox ? viewBox.split(" ")[2] : "-");
            const height =
              renderedSvg.getAttribute("height") || (viewBox ? viewBox.split(" ")[3] : "-");
            previewInfo.textContent = `尺寸: ${width} × ${height}`;
          }
        } catch (e) {
          preview.innerHTML = `<div class="error-msg">错误: ${e.message}</div>`;
        }
      };

      window.updateColors = function () {
        const fill = document.getElementById("fillColor").value;
        const stroke = document.getElementById("strokeColor").value;
        const strokeWidth = document.getElementById("strokeWidth").value;

        let svg = editor.value;
        svg = svg.replace(/fill="[^"]*"/g, `fill="${fill}"`);
        svg = svg.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
        svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);

        editor.value = svg;
        updatePreview();
      };

      window.formatSvg = function () {
        editor.value = formatSvgCode(editor.value);
      };

      window.copySvg = function () {
        navigator.clipboard.writeText(editor.value);
        alert("已复制 SVG 代码");
      };

      window.downloadSvg = function () {
        const blob = new Blob([editor.value], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "image.svg";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.downloadPng = function () {
        const svgElement = preview.querySelector("svg");
        if (!svgElement) {
          alert("没有可下载的 SVG");
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();

        img.onload = function () {
          canvas.width = img.width || 200;
          canvas.height = img.height || 200;
          ctx.drawImage(img, 0, 0);

          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/png");
          a.download = "image.png";
          a.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
      };

      window.setBg = function (type) {
        const area = document.getElementById("previewArea");
        area.className = "preview-area bg-" + type;

        document.querySelectorAll(".preview-bg-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.classList.contains(type));
        });
      };

      // Event listener
      editor.addEventListener("input", updatePreview);

      // Initialize
      renderTemplates();
      loadTemplate(0);
    
