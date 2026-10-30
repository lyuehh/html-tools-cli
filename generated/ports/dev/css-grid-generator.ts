// @ts-nocheck
// Generated from tools/dev/css-grid-generator.html
// Source SHA-256: f0ff082b77bfd3705a54e9346b92432f2a44c26a2a417812cf5f3d2bf1f3e7f1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let columns = ["1fr", "1fr", "1fr"];
      let rows = ["auto", "auto"];
      let itemStyles = {};
      let selectedItem = null;

      const presets = {
        "2col": { cols: ["1fr", "1fr"], rows: ["auto"], items: 2 },
        "3col": { cols: ["1fr", "1fr", "1fr"], rows: ["auto"], items: 3 },
        holy: {
          cols: ["200px", "1fr", "200px"],
          rows: ["auto", "1fr", "auto"],
          items: 5,
          styles: { 1: { colStart: "1", colEnd: "4" }, 4: { colStart: "1", colEnd: "4" } }
        },
        sidebar: {
          cols: ["250px", "1fr"],
          rows: ["auto", "1fr"],
          items: 3,
          styles: { 1: { colStart: "1", colEnd: "3" } }
        },
        gallery: { cols: ["repeat(auto-fill, minmax(200px, 1fr))"], rows: ["auto"], items: 8 },
        dashboard: {
          cols: ["1fr", "1fr", "1fr"],
          rows: ["auto", "1fr", "1fr"],
          items: 6,
          styles: { 1: { colStart: "1", colEnd: "3" }, 4: { rowStart: "2", rowEnd: "4" } }
        }
      };

      function renderTracks() {
        const colContainer = document.getElementById("colTracks");
        const rowContainer = document.getElementById("rowTracks");

        colContainer.textContent = "";
        rowContainer.textContent = "";

        columns.forEach((val, i) => {
          const item = createTrackItem(val, "col", i);
          colContainer.appendChild(item);
        });

        rows.forEach((val, i) => {
          const item = createTrackItem(val, "row", i);
          rowContainer.appendChild(item);
        });
      }

      function createTrackItem(value, type, index) {
        const item = document.createElement("div");
        item.className = "track-item";

        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.onchange = function () {
          if (type === "col") columns[index] = this.value;
          else rows[index] = this.value;
          updateGrid();
        };

        const removeBtn = document.createElement("button");
        removeBtn.className = "outline";
        removeBtn.textContent = "×";
        removeBtn.onclick = function () {
          if (type === "col" && columns.length > 1) {
            columns.splice(index, 1);
          } else if (type === "row" && rows.length > 1) {
            rows.splice(index, 1);
          }
          renderTracks();
          updateGrid();
        };

        item.appendChild(input);
        item.appendChild(removeBtn);
        return item;
      }

      window.addTrack = function (type) {
        if (type === "col") columns.push("1fr");
        else rows.push("auto");
        renderTracks();
        updateGrid();
      };

      function updateGrid() {
        const preview = document.getElementById("gridPreview");
        const colGap = document.getElementById("columnGap").value;
        const rowGap = document.getElementById("rowGap").value;
        const justifyItems = document.getElementById("justifyItems").value;
        const alignItems = document.getElementById("alignItems").value;

        preview.style.display = "grid";
        preview.style.gridTemplateColumns = columns.join(" ");
        preview.style.gridTemplateRows = rows.join(" ");
        preview.style.columnGap = colGap;
        preview.style.rowGap = rowGap;
        preview.style.justifyItems = justifyItems;
        preview.style.alignItems = alignItems;

        // 应用子项样式
        Array.from(preview.children).forEach((child, i) => {
          const num = i + 1;
          const style = itemStyles[num] || {};
          child.style.gridColumnStart = style.colStart || "";
          child.style.gridColumnEnd = style.colEnd || "";
          child.style.gridRowStart = style.rowStart || "";
          child.style.gridRowEnd = style.rowEnd || "";
        });

        generateCode();
      }

      function updateItemCount() {
        const count = parseInt(document.getElementById("itemCount").value) || 1;
        const preview = document.getElementById("gridPreview");

        preview.textContent = "";

        for (let i = 1; i <= count; i++) {
          const item = document.createElement("div");
          item.className = "grid-item";
          if (selectedItem === i) item.classList.add("selected");
          item.textContent = i;
          item.onclick = function () {
            selectItem(i);
          };
          preview.appendChild(item);
        }

        updateGrid();
      }

      function selectItem(num) {
        selectedItem = num;

        document.querySelectorAll(".grid-item").forEach((el, i) => {
          el.classList.toggle("selected", i + 1 === num);
        });

        const editor = document.getElementById("itemEditor");
        editor.classList.add("active");
        document.getElementById("editingItemNum").textContent = num;

        const style = itemStyles[num] || {};
        document.getElementById("itemColStart").value = style.colStart || "";
        document.getElementById("itemColEnd").value = style.colEnd || "";
        document.getElementById("itemRowStart").value = style.rowStart || "";
        document.getElementById("itemRowEnd").value = style.rowEnd || "";
      }

      window.updateItemStyle = function () {
        if (!selectedItem) return;

        itemStyles[selectedItem] = {
          colStart: document.getElementById("itemColStart").value,
          colEnd: document.getElementById("itemColEnd").value,
          rowStart: document.getElementById("itemRowStart").value,
          rowEnd: document.getElementById("itemRowEnd").value
        };

        updateGrid();
      };

      window.resetItemStyle = function () {
        if (!selectedItem) return;
        delete itemStyles[selectedItem];
        document.getElementById("itemColStart").value = "";
        document.getElementById("itemColEnd").value = "";
        document.getElementById("itemRowStart").value = "";
        document.getElementById("itemRowEnd").value = "";
        updateGrid();
      };

      function closeItemEditor() {
        selectedItem = null;
        document.querySelectorAll(".grid-item").forEach((el) => el.classList.remove("selected"));
        document.getElementById("itemEditor").classList.remove("active");
      }

      function generateCode() {
        const colGap = document.getElementById("columnGap").value;
        const rowGap = document.getElementById("rowGap").value;
        const justifyItems = document.getElementById("justifyItems").value;
        const alignItems = document.getElementById("alignItems").value;

        let css = ".container {\n";
        css += "  display: grid;\n";
        css += "  grid-template-columns: " + columns.join(" ") + ";\n";
        css += "  grid-template-rows: " + rows.join(" ") + ";\n";
        if (colGap !== "0" && colGap !== "0px") css += "  column-gap: " + colGap + ";\n";
        if (rowGap !== "0" && rowGap !== "0px") css += "  row-gap: " + rowGap + ";\n";
        if (justifyItems !== "stretch") css += "  justify-items: " + justifyItems + ";\n";
        if (alignItems !== "stretch") css += "  align-items: " + alignItems + ";\n";
        css += "}\n";

        // 子项样式
        Object.keys(itemStyles).forEach((num) => {
          const style = itemStyles[num];
          if (style.colStart || style.colEnd || style.rowStart || style.rowEnd) {
            css += "\n.item-" + num + " {\n";
            if (style.colStart && style.colEnd) {
              css += "  grid-column: " + style.colStart + " / " + style.colEnd + ";\n";
            } else {
              if (style.colStart) css += "  grid-column-start: " + style.colStart + ";\n";
              if (style.colEnd) css += "  grid-column-end: " + style.colEnd + ";\n";
            }
            if (style.rowStart && style.rowEnd) {
              css += "  grid-row: " + style.rowStart + " / " + style.rowEnd + ";\n";
            } else {
              if (style.rowStart) css += "  grid-row-start: " + style.rowStart + ";\n";
              if (style.rowEnd) css += "  grid-row-end: " + style.rowEnd + ";\n";
            }
            css += "}\n";
          }
        });

        document.getElementById("cssCode").textContent = css;
      }

      window.copyCode = function () {
        const code = document.getElementById("cssCode").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = document.querySelector(".copy-btn");
          btn.textContent = "已复制!";
          setTimeout(() => (btn.textContent = "复制"), 1500);
        });
      };

      window.applyPreset = function (name) {
        const preset = presets[name];
        if (!preset) return;

        columns = [...preset.cols];
        rows = [...preset.rows];
        itemStyles = preset.styles ? JSON.parse(JSON.stringify(preset.styles)) : {};
        document.getElementById("itemCount").value = preset.items;

        closeItemEditor();
        renderTracks();
        updateItemCount();
      };

      // 主题切换
      const themeToggle = document.getElementById("themeToggle");
      const html = document.documentElement;
      const savedTheme = localStorage.getItem("theme") || "light";
      html.setAttribute("data-theme", savedTheme);

      themeToggle.addEventListener("click", function () {
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      });

      // 初始化
      renderTracks();
      updateItemCount();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
