// @ts-nocheck
// Generated from tools/dev/css-flexbox.html
// Source SHA-256: c7a65cab73cb7fa99c51ea10d906b5258a14677486b4f9c0cf120fe849e3ab1e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let itemProps = [{}, {}, {}];
      let itemCount = 3;

      function update() {
        const container = document.getElementById("flexContainer");
        container.style.flexDirection = document.getElementById("flexDirection").value;
        container.style.flexWrap = document.getElementById("flexWrap").value;
        container.style.justifyContent = document.getElementById("justifyContent").value;
        container.style.alignItems = document.getElementById("alignItems").value;
        container.style.alignContent = document.getElementById("alignContent").value;
        container.style.gap = document.getElementById("gap").value;

        generateOutput();
      }

      function updateItem() {
        const idx = parseInt(document.getElementById("selectedItem").value);
        const items = document.querySelectorAll(".flex-item");
        if (items[idx]) {
          const item = items[idx];
          const grow = document.getElementById("flexGrow").value;
          const shrink = document.getElementById("flexShrink").value;
          const order = document.getElementById("order").value;
          const alignSelf = document.getElementById("alignSelf").value;

          item.style.flexGrow = grow;
          item.style.flexShrink = shrink;
          item.style.order = order;
          item.style.alignSelf = alignSelf;

          itemProps[idx] = { grow, shrink, order, alignSelf };
        }
        generateOutput();
      }

      function selectItem() {
        const idx = parseInt(document.getElementById("selectedItem").value);
        const props = itemProps[idx] || {};
        document.getElementById("flexGrow").value = props.grow || 0;
        document.getElementById("flexShrink").value = props.shrink || 1;
        document.getElementById("order").value = props.order || 0;
        document.getElementById("alignSelf").value = props.alignSelf || "auto";

        document.querySelectorAll(".flex-item").forEach((item, i) => {
          item.style.outline = i === idx ? "3px solid yellow" : "none";
        });
      }

      function addItem() {
        itemCount++;
        const container = document.getElementById("flexContainer");
        const item = document.createElement("div");
        item.className = "flex-item";
        item.textContent = itemCount;
        container.appendChild(item);
        itemProps.push({});
        updateItemSelect();
        generateOutput();
      }

      function removeItem() {
        const container = document.getElementById("flexContainer");
        const items = container.querySelectorAll(".flex-item");
        if (items.length > 1) {
          items[items.length - 1].remove();
          itemProps.pop();
          updateItemSelect();
          generateOutput();
        }
      }

      function updateItemSelect() {
        const select = document.getElementById("selectedItem");
        const items = document.querySelectorAll(".flex-item");
        select.innerHTML = "";
        items.forEach((_, i) => {
          const opt = document.createElement("option");
          opt.value = i;
          opt.textContent = `项目 ${i + 1}`;
          select.appendChild(opt);
        });
      }

      function generateOutput() {
        const containerCSS = `.container {
  display: flex;
  flex-direction: ${document.getElementById("flexDirection").value};
  flex-wrap: ${document.getElementById("flexWrap").value};
  justify-content: ${document.getElementById("justifyContent").value};
  align-items: ${document.getElementById("alignItems").value};
  align-content: ${document.getElementById("alignContent").value};
  gap: ${document.getElementById("gap").value};
}`;

        let itemCSS = "";
        itemProps.forEach((props, i) => {
          if (
            props.grow ||
            props.shrink !== "1" ||
            props.order ||
            (props.alignSelf && props.alignSelf !== "auto")
          ) {
            itemCSS += `\n\n.item-${i + 1} {`;
            if (props.grow) itemCSS += `\n  flex-grow: ${props.grow};`;
            if (props.shrink && props.shrink !== "1")
              itemCSS += `\n  flex-shrink: ${props.shrink};`;
            if (props.order) itemCSS += `\n  order: ${props.order};`;
            if (props.alignSelf && props.alignSelf !== "auto")
              itemCSS += `\n  align-self: ${props.alignSelf};`;
            itemCSS += "\n}";
          }
        });

        document.getElementById("output").textContent = containerCSS + itemCSS;
      }

      function copyCSS() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        alert("已复制到剪贴板!");
      }

      update();

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
    
