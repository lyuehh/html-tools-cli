// @ts-nocheck
// Generated from tools/dev/json-path-finder.html
// Source SHA-256: 117aa5125ce00e57dd2ab82729743298b9fc58868e7efe5e974624f06f14a798
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let jsonData = null;
      let selectedPath = "";

      function parseJSON() {
        const input = document.getElementById("jsonInput").value;
        const treeEl = document.getElementById("jsonTree");

        try {
          jsonData = JSON.parse(input);
          treeEl.innerHTML = renderNode(jsonData, "");

          // Stats
          document.getElementById("depth").textContent = getDepth(jsonData);
          document.getElementById("keyCount").textContent = countKeys(jsonData);
          document.getElementById("size").textContent = new Blob([input]).size;
        } catch (e) {
          treeEl.innerHTML = `<span style="color: #f85149;">JSON解析错误: ${e.message}</span>`;
        }
      }

      function renderNode(data, path, key = null) {
        const type = getType(data);
        let html = "";

        if (type === "object" || type === "array") {
          const isArray = type === "array";
          const bracket = isArray ? ["[", "]"] : ["{", "}"];
          const entries = isArray ? data.map((v, i) => [i, v]) : Object.entries(data);
          const isEmpty = entries.length === 0;

          html += `<div class="tree-node" onclick="selectNode(event, '${path}')" data-path="${path}">`;
          if (key !== null) {
            html += `<span class="tree-key">"${key}"</span>: `;
          }
          html += `<span class="tree-bracket collapsible">${bracket[0]}</span>`;
          if (isEmpty) {
            html += `<span class="tree-bracket">${bracket[1]}</span>`;
          }
          html += "</div>";

          if (!isEmpty) {
            html += '<div class="tree-children">';
            entries.forEach(([k, v], i) => {
              const newPath = isArray ? `${path}[${k}]` : path ? `${path}.${k}` : k;
              html += renderNode(v, newPath, isArray ? null : k);
              if (i < entries.length - 1) html += "";
            });
            html += `<div class="tree-node"><span class="tree-bracket">${bracket[1]}</span></div>`;
            html += "</div>";
          }
        } else {
          html += `<div class="tree-node" onclick="selectNode(event, '${path}')" data-path="${path}">`;
          if (key !== null) {
            html += `<span class="tree-key">"${key}"</span>: `;
          }
          html += formatValue(data, type);
          html += "</div>";
        }

        return html;
      }

      function getType(data) {
        if (data === null) return "null";
        if (Array.isArray(data)) return "array";
        return typeof data;
      }

      function formatValue(value, type) {
        switch (type) {
          case "string":
            return `<span class="tree-string">"${escapeHtml(value)}"</span>`;
          case "number":
            return `<span class="tree-number">${value}</span>`;
          case "boolean":
            return `<span class="tree-boolean">${value}</span>`;
          case "null":
            return `<span class="tree-null">null</span>`;
          default:
            return String(value);
        }
      }

      function escapeHtml(str) {
        return String(str)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      function selectNode(event, path) {
        event.stopPropagation();

        // Toggle collapse
        const target = event.target;
        if (target.classList.contains("collapsible")) {
          target.classList.toggle("collapsed");
          return;
        }

        // Select node
        document
          .querySelectorAll(".tree-node.selected")
          .forEach((el) => el.classList.remove("selected"));
        const node = event.currentTarget;
        node.classList.add("selected");

        selectedPath = path || "$";
        document.getElementById("currentPath").textContent = "$" + (path ? "." + path : "");

        // Show value
        const value = getValueByPath(jsonData, path);
        document.getElementById("valuePreview").style.display = "block";
        document.getElementById("selectedValue").textContent = JSON.stringify(value, null, 2);
      }

      function getValueByPath(obj, path) {
        if (!path) return obj;
        const parts = path.replace(/\[(\d+)\]/g, ".$1").split(".");
        let current = obj;
        for (const part of parts) {
          if (current === undefined || current === null) return undefined;
          current = current[part];
        }
        return current;
      }

      function copyPath() {
        const path = document.getElementById("currentPath").textContent;
        navigator.clipboard.writeText(path);
        alert("已复制: " + path);
      }

      function getDepth(obj, depth = 0) {
        if (typeof obj !== "object" || obj === null) return depth;
        const children = Array.isArray(obj) ? obj : Object.values(obj);
        if (children.length === 0) return depth;
        return Math.max(...children.map((v) => getDepth(v, depth + 1)));
      }

      function countKeys(obj) {
        if (typeof obj !== "object" || obj === null) return 0;
        const entries = Array.isArray(obj) ? obj : Object.values(obj);
        return (
          (Array.isArray(obj) ? 0 : Object.keys(obj).length) +
          entries.reduce((sum, v) => sum + countKeys(v), 0)
        );
      }

      function searchJSON() {
        const query = document.getElementById("searchInput").value.toLowerCase();
        document.querySelectorAll(".tree-node").forEach((node) => {
          node.style.background = "";
        });

        if (!query) return;

        document.querySelectorAll(".tree-node").forEach((node) => {
          if (node.textContent.toLowerCase().includes(query)) {
            node.style.background = "#9e6a03";
          }
        });
      }

      parseJSON();

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
    
