// @ts-nocheck
// Generated from tools/design/font-preview.html
// Source SHA-256: d059da715f2a95542ec22d367b08c01aa94605901446709ac5562c5018751869
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const fonts = [
        { name: "System UI", family: "system-ui, -apple-system, sans-serif", type: "系统" },
        { name: "Arial", family: "Arial, sans-serif", type: "西文" },
        { name: "Helvetica", family: "Helvetica, Arial, sans-serif", type: "西文" },
        { name: "Georgia", family: "Georgia, serif", type: "衬线" },
        { name: "Times New Roman", family: '"Times New Roman", Times, serif', type: "衬线" },
        { name: "Courier New", family: '"Courier New", monospace', type: "等宽" },
        { name: "Monaco", family: "Monaco, monospace", type: "等宽" },
        { name: "Consolas", family: "Consolas, monospace", type: "等宽" },
        { name: "Verdana", family: "Verdana, sans-serif", type: "西文" },
        { name: "Trebuchet MS", family: '"Trebuchet MS", sans-serif', type: "西文" },
        { name: "Comic Sans MS", family: '"Comic Sans MS", cursive', type: "手写" },
        { name: "Impact", family: "Impact, sans-serif", type: "装饰" },
        { name: "PingFang SC", family: '"PingFang SC", sans-serif', type: "中文" },
        { name: "Microsoft YaHei", family: '"Microsoft YaHei", sans-serif', type: "中文" },
        { name: "SimSun", family: "SimSun, serif", type: "中文" },
        { name: "SimHei", family: "SimHei, sans-serif", type: "中文" },
        { name: "STHeiti", family: "STHeiti, sans-serif", type: "中文" },
        { name: "Noto Sans SC", family: '"Noto Sans SC", sans-serif', type: "中文" }
      ];

      let selectedFont = fonts[0];
      const previewArea = document.getElementById("previewArea");
      const fontListEl = document.getElementById("fontList");

      function renderFontList() {
        fontListEl.innerHTML = "";
        fonts.forEach((font, index) => {
          const div = document.createElement("div");
          div.className = "font-item" + (font === selectedFont ? " active" : "");
          div.innerHTML = `
          <div class="font-item-header">
            <span class="font-item-name">${font.name}</span>
            <span class="font-item-type">${font.type}</span>
          </div>
          <div class="font-item-preview" style="font-family: ${font.family}">${document.getElementById("previewText").value.slice(0, 40) || "Preview Text 预览文字"}</div>
        `;
          div.onclick = () => selectFont(font);
          fontListEl.appendChild(div);
        });
      }

      function selectFont(font) {
        selectedFont = font;
        updatePreview();
        renderFontList();
      }

      function updatePreview() {
        const text =
          document.getElementById("previewText").value ||
          "The quick brown fox jumps over the lazy dog.";
        const size = document.getElementById("fontSize").value;
        document.getElementById("fontSizeVal").textContent = size + "px";

        previewArea.style.fontFamily = selectedFont.family;
        previewArea.style.fontSize = size + "px";
        previewArea.textContent = text;

        // 更新字体列表预览
        document.querySelectorAll(".font-item-preview").forEach((el) => {
          el.textContent = text.slice(0, 40) || "Preview Text 预览文字";
        });
      }

      function addCustomFont() {
        const customFontName = document.getElementById("customFont").value.trim();
        if (customFontName && !fonts.find((f) => f.name === customFontName)) {
          const newFont = { name: customFontName, family: customFontName, type: "自定义" };
          fonts.unshift(newFont);
          selectedFont = newFont;
          renderFontList();
          updatePreview();
        }
      }

      renderFontList();
      updatePreview();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
