// @ts-nocheck
// Generated from tools/design/css-grid-generator.html
// Source SHA-256: 80ef05da44ae97b1e63a676d575fa24e057141d9e26d065f2a5541e5b458a74f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const containerEl = document.getElementById("gridContainer");
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

      function getTemplateValue(type, count) {
        switch (type) {
          case "equal":
            return `repeat(${count}, 1fr)`;
          case "auto":
            return `repeat(${count}, auto)`;
          case "minmax":
            return `repeat(auto-fit, minmax(150px, 1fr))`;
          case "custom":
            return `repeat(${count}, 1fr)`;
          default:
            return `repeat(${count}, 1fr)`;
        }
      }

      function updateGrid() {
        const cols = parseInt(document.getElementById("columns").value) || 3;
        const rows = parseInt(document.getElementById("rows").value) || 3;
        const colGap = document.getElementById("colGap").value;
        const rowGap = document.getElementById("rowGap").value;
        const colType = document.getElementById("colTemplate").value;
        const rowType = document.getElementById("rowTemplate").value;

        const colTemplate = getTemplateValue(colType, cols);
        const rowTemplate = getTemplateValue(rowType, rows);

        containerEl.style.display = "grid";
        containerEl.style.gridTemplateColumns = colTemplate;
        containerEl.style.gridTemplateRows = rowTemplate;
        containerEl.style.columnGap = colGap + "px";
        containerEl.style.rowGap = rowGap + "px";

        const itemCount = cols * rows;
        containerEl.innerHTML = "";
        for (let i = 0; i < itemCount; i++) {
          const item = document.createElement("div");
          item.className = "grid-item";
          item.style.background = colors[i % colors.length];
          item.textContent = i + 1;
          item.style.minHeight = "80px";
          containerEl.appendChild(item);
        }

        const css = `.container {
  display: grid;
  grid-template-columns: ${colTemplate};
  grid-template-rows: ${rowTemplate};
  column-gap: ${colGap}px;
  row-gap: ${rowGap}px;
}`;
        outputEl.value = css;
      }

      function applyPreset(name) {
        switch (name) {
          case "equal3":
            document.getElementById("columns").value = 3;
            document.getElementById("rows").value = 2;
            document.getElementById("colTemplate").value = "equal";
            break;
          case "equal4":
            document.getElementById("columns").value = 4;
            document.getElementById("rows").value = 2;
            document.getElementById("colTemplate").value = "equal";
            break;
          case "sidebar":
            document.getElementById("columns").value = 2;
            document.getElementById("rows").value = 1;
            document.getElementById("colTemplate").value = "custom";
            break;
          case "holy":
            document.getElementById("columns").value = 3;
            document.getElementById("rows").value = 3;
            document.getElementById("colTemplate").value = "custom";
            break;
          case "masonry":
            document.getElementById("columns").value = 4;
            document.getElementById("rows").value = 3;
            document.getElementById("colTemplate").value = "minmax";
            break;
        }
        updateGrid();
      }

      function resetGrid() {
        document.getElementById("columns").value = 3;
        document.getElementById("rows").value = 3;
        document.getElementById("colGap").value = 16;
        document.getElementById("rowGap").value = 16;
        document.getElementById("colTemplate").value = "equal";
        document.getElementById("rowTemplate").value = "equal";
        updateGrid();
      }

      function copyCSS() {
        navigator.clipboard.writeText(outputEl.value).then(() => {
          statusEl.textContent = "已复制到剪贴板";
          setTimeout(() => (statusEl.textContent = ""), 2000);
        });
      }

      updateGrid();

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
    
