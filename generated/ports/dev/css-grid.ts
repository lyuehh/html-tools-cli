// @ts-nocheck
// Generated from tools/dev/css-grid.html
// Source SHA-256: d44511fb79b8ba17099a7576944292c60a49c68631dfd9b9446653a19e6ed45f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let itemCount = 9;
      let itemProps = {};

      function init() {
        const container = document.getElementById("gridContainer");
        for (let i = 1; i <= itemCount; i++) {
          const item = document.createElement("div");
          item.className = "grid-item";
          item.textContent = i;
          item.dataset.index = i;
          item.onclick = () => {
            document.getElementById("selectedItem").value = i;
            selectItem();
          };
          container.appendChild(item);
        }
        updateItemSelect();
        update();
      }

      function update() {
        const container = document.getElementById("gridContainer");
        container.style.gridTemplateColumns = document.getElementById("columns").value;
        container.style.gridTemplateRows = document.getElementById("rows").value;
        container.style.gap = document.getElementById("gap").value;
        container.style.justifyItems = document.getElementById("justifyItems").value;
        container.style.alignItems = document.getElementById("alignItems").value;
        container.style.justifyContent = document.getElementById("justifyContent").value;
        container.style.alignContent = document.getElementById("alignContent").value;
        generateOutput();
      }

      function updateItem() {
        const idx = document.getElementById("selectedItem").value;
        const items = document.querySelectorAll(".grid-item");
        const item = Array.from(items).find((i) => i.dataset.index == idx);
        if (item) {
          const col = document.getElementById("gridColumn").value;
          const row = document.getElementById("gridRow").value;
          item.style.gridColumn = col;
          item.style.gridRow = row;
          itemProps[idx] = { col, row };
        }
        generateOutput();
      }

      function selectItem() {
        const idx = document.getElementById("selectedItem").value;
        const props = itemProps[idx] || {};
        document.getElementById("gridColumn").value = props.col || "auto";
        document.getElementById("gridRow").value = props.row || "auto";

        document.querySelectorAll(".grid-item").forEach((item) => {
          item.style.outline = item.dataset.index == idx ? "3px solid yellow" : "none";
        });
      }

      function addItem() {
        itemCount++;
        const container = document.getElementById("gridContainer");
        const item = document.createElement("div");
        item.className = "grid-item";
        item.textContent = itemCount;
        item.dataset.index = itemCount;
        item.onclick = () => {
          document.getElementById("selectedItem").value = itemCount;
          selectItem();
        };
        container.appendChild(item);
        updateItemSelect();
        generateOutput();
      }

      function removeItem() {
        const container = document.getElementById("gridContainer");
        const items = container.querySelectorAll(".grid-item");
        if (items.length > 1) {
          items[items.length - 1].remove();
          updateItemSelect();
          generateOutput();
        }
      }

      function updateItemSelect() {
        const select = document.getElementById("selectedItem");
        const items = document.querySelectorAll(".grid-item");
        select.innerHTML = "";
        items.forEach((item) => {
          const opt = document.createElement("option");
          opt.value = item.dataset.index;
          opt.textContent = `项目 ${item.dataset.index}`;
          select.appendChild(opt);
        });
      }

      function applyTemplate(name) {
        const templates = {
          "3x3": { cols: "1fr 1fr 1fr", rows: "1fr 1fr 1fr", items: 9 },
          "holy-grail": {
            cols: "200px 1fr 200px",
            rows: "auto 1fr auto",
            items: 5,
            props: { 1: { col: "1 / -1" }, 4: { col: "1 / -1" } }
          },
          sidebar: { cols: "250px 1fr", rows: "1fr", items: 2 },
          gallery: { cols: "repeat(auto-fill, minmax(150px, 1fr))", rows: "auto", items: 6 },
          dashboard: {
            cols: "repeat(4, 1fr)",
            rows: "repeat(3, 1fr)",
            items: 6,
            props: { 1: { col: "1 / 3", row: "1 / 3" }, 2: { col: "3 / 5" } }
          }
        };

        const t = templates[name];
        document.getElementById("columns").value = t.cols;
        document.getElementById("rows").value = t.rows;

        const container = document.getElementById("gridContainer");
        container.innerHTML = "";
        itemProps = t.props || {};
        itemCount = t.items;

        for (let i = 1; i <= t.items; i++) {
          const item = document.createElement("div");
          item.className = "grid-item";
          item.textContent = i;
          item.dataset.index = i;
          if (itemProps[i]) {
            if (itemProps[i].col) item.style.gridColumn = itemProps[i].col;
            if (itemProps[i].row) item.style.gridRow = itemProps[i].row;
          }
          item.onclick = () => {
            document.getElementById("selectedItem").value = i;
            selectItem();
          };
          container.appendChild(item);
        }

        updateItemSelect();
        update();
      }

      function generateOutput() {
        let css = `.grid-container {
  display: grid;
  grid-template-columns: ${document.getElementById("columns").value};
  grid-template-rows: ${document.getElementById("rows").value};
  gap: ${document.getElementById("gap").value};
  justify-items: ${document.getElementById("justifyItems").value};
  align-items: ${document.getElementById("alignItems").value};
  justify-content: ${document.getElementById("justifyContent").value};
  align-content: ${document.getElementById("alignContent").value};
}`;

        Object.entries(itemProps).forEach(([idx, props]) => {
          if ((props.col && props.col !== "auto") || (props.row && props.row !== "auto")) {
            css += `\n\n.item-${idx} {`;
            if (props.col && props.col !== "auto") css += `\n  grid-column: ${props.col};`;
            if (props.row && props.row !== "auto") css += `\n  grid-row: ${props.row};`;
            css += "\n}";
          }
        });

        document.getElementById("output").textContent = css;
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        alert("已复制到剪贴板!");
      }

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
    
