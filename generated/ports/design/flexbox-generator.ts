// @ts-nocheck
// Generated from tools/design/flexbox-generator.html
// Source SHA-256: d14c54dd417c77347e6333580eaab73903b32a895e358b6fdffc7f70553e2403
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const containerEl = document.getElementById("flexContainer");
      const outputEl = document.getElementById("cssOutput");
      const statusEl = document.getElementById("status");

      const colors = [
        "#667eea",
        "#764ba2",
        "#f093fb",
        "#f5576c",
        "#4facfe",
        "#43e97b",
        "#fa709a",
        "#fee140",
        "#a8edea",
        "#ff9a9e",
        "#ffecd2",
        "#fcb69f"
      ];

      function updatePreview() {
        const count = parseInt(document.getElementById("itemCount").value) || 4;
        const direction = document.getElementById("flexDirection").value;
        const wrap = document.getElementById("flexWrap").value;
        const justify = document.getElementById("justifyContent").value;
        const align = document.getElementById("alignItems").value;
        const alignContent = document.getElementById("alignContent").value;
        const gap = document.getElementById("gap").value;

        // 更新容器样式
        containerEl.style.display = "flex";
        containerEl.style.flexDirection = direction;
        containerEl.style.flexWrap = wrap;
        containerEl.style.justifyContent = justify;
        containerEl.style.alignItems = align;
        containerEl.style.alignContent = alignContent;
        containerEl.style.gap = gap;

        // 更新子元素
        containerEl.innerHTML = "";
        for (let i = 0; i < count; i++) {
          const item = document.createElement("div");
          item.className = "flex-item";
          item.style.background = colors[i % colors.length];
          item.textContent = i + 1;
          // 不同尺寸
          if (i % 3 === 1) item.style.padding = "30px";
          if (i % 3 === 2) item.style.padding = "40px";
          containerEl.appendChild(item);
        }

        // 生成 CSS
        const css = `.container {
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  justify-content: ${justify};
  align-items: ${align};
  align-content: ${alignContent};
  gap: ${gap};
}`;
        outputEl.value = css;
      }

      function resetFlex() {
        document.getElementById("itemCount").value = 4;
        document.getElementById("flexDirection").value = "row";
        document.getElementById("flexWrap").value = "nowrap";
        document.getElementById("justifyContent").value = "flex-start";
        document.getElementById("alignItems").value = "stretch";
        document.getElementById("alignContent").value = "normal";
        document.getElementById("gap").value = "8px";
        updatePreview();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

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
    
