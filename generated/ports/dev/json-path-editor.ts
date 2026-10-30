// @ts-nocheck
// Generated from tools/dev/json-path-editor.html
// Source SHA-256: 1332418e2d9cd8f6918a997decf4e3db242c4dfc3551c1cc40623cf127ec9042
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let jsonData = null;
      let currentPath = "";

      // Theme toggle
      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      (function () {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }
      })();

      window.parseJson = function () {
        const editor = document.getElementById("jsonEditor");
        const messageEl = document.getElementById("parseMessage");

        try {
          jsonData = JSON.parse(editor.value);
          messageEl.innerHTML = '<div class="success-message">✅ JSON 解析成功</div>';
          renderTree();
          generateSamplePaths();
          setTimeout(() => (messageEl.innerHTML = ""), 2000);
        } catch (e) {
          messageEl.innerHTML = `<div class="error-message">❌ JSON 解析失败: ${e.message}</div>`;
          jsonData = null;
        }
      };

      window.formatJson = function () {
        const editor = document.getElementById("jsonEditor");
        try {
          const data = JSON.parse(editor.value);
          editor.value = JSON.stringify(data, null, 2);
        } catch (e) {
          alert("JSON 格式错误，无法格式化");
        }
      };

      window.copyJson = function () {
        const editor = document.getElementById("jsonEditor");
        navigator.clipboard.writeText(editor.value);
        alert("已复制到剪贴板");
      };

      window.loadSample = function () {
        const sample = {
          user: {
            name: "张三",
            age: 28,
            email: "zhangsan@example.com",
            address: {
              city: "北京",
              district: "朝阳区",
              street: "建国路88号"
            },
            hobbies: ["编程", "阅读", "游泳"],
            isActive: true
          },
          orders: [
            { id: 1001, product: "笔记本电脑", price: 5999 },
            { id: 1002, product: "无线鼠标", price: 129 },
            { id: 1003, product: "机械键盘", price: 499 }
          ],
          metadata: {
            version: "1.0",
            lastUpdated: null
          }
        };
        document.getElementById("jsonEditor").value = JSON.stringify(sample, null, 2);
        parseJson();
      };

      function getValueByPath(obj, path) {
        if (!path) return obj;
        const parts = path
          .replace(/\[(\d+)\]/g, ".$1")
          .split(".")
          .filter((p) => p);
        let current = obj;
        for (const part of parts) {
          if (current === null || current === undefined) return undefined;
          current = current[part];
        }
        return current;
      }

      function setValueByPath(obj, path, value) {
        const parts = path
          .replace(/\[(\d+)\]/g, ".$1")
          .split(".")
          .filter((p) => p);
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      }

      function deleteByPath(obj, path) {
        const parts = path
          .replace(/\[(\d+)\]/g, ".$1")
          .split(".")
          .filter((p) => p);
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        const lastKey = parts[parts.length - 1];
        if (Array.isArray(current)) {
          current.splice(parseInt(lastKey), 1);
        } else {
          delete current[lastKey];
        }
      }

      function queryPath() {
        if (!jsonData) {
          alert("请先解析 JSON");
          return;
        }

        const path = document.getElementById("pathInput").value.trim();
        currentPath = path;

        try {
          const result = getValueByPath(jsonData, path);
          const resultBox = document.getElementById("resultBox");

          if (result === undefined) {
            resultBox.textContent = "路径不存在";
            resultBox.style.color = "var(--warning-color)";
          } else {
            resultBox.textContent =
              typeof result === "object" ? JSON.stringify(result, null, 2) : String(result);
            resultBox.style.color = "";
          }

          updateBreadcrumb(path);
          highlightTreeNode(path);
        } catch (e) {
          document.getElementById("resultBox").textContent = "查询错误: " + e.message;
        }
      }

      function updateBreadcrumb(path) {
        const container = document.getElementById("pathBreadcrumb");
        if (!path) {
          container.innerHTML =
            '<span class="breadcrumb-item" onclick="navigateToPath(\'\')">root</span>';
          return;
        }

        const parts = path
          .replace(/\[(\d+)\]/g, ".$1")
          .split(".")
          .filter((p) => p);
        let html = '<span class="breadcrumb-item" onclick="navigateToPath(\'\')">root</span>';
        let currentPath = "";

        parts.forEach((part, i) => {
          currentPath += (i > 0 ? "." : "") + part;
          const displayPart = /^\d+$/.test(part) ? `[${part}]` : part;
          html += '<span class="breadcrumb-separator">›</span>';
          html += `<span class="breadcrumb-item" onclick="navigateToPath('${currentPath}')">${displayPart}</span>`;
        });

        container.innerHTML = html;
      }

      window.navigateToPath = function (path) {
        document.getElementById("pathInput").value = path;
        queryPath();
      };

      function generateSamplePaths() {
        if (!jsonData) return;

        const paths = [];
        function traverse(obj, path = "") {
          if (paths.length >= 10) return;

          if (typeof obj === "object" && obj !== null) {
            if (Array.isArray(obj)) {
              if (obj.length > 0) {
                const newPath = path + "[0]";
                paths.push(newPath);
                traverse(obj[0], newPath);
              }
            } else {
              for (const key of Object.keys(obj)) {
                const newPath = path ? `${path}.${key}` : key;
                paths.push(newPath);
                if (paths.length < 10) {
                  traverse(obj[key], newPath);
                }
              }
            }
          }
        }

        traverse(jsonData);

        const container = document.getElementById("samplePaths");
        container.innerHTML =
          '<span style="font-size: 12px; opacity: 0.6; margin-right: 8px;">示例路径:</span>' +
          paths
            .slice(0, 8)
            .map((p) => `<span class="sample-path" onclick="navigateToPath('${p}')">${p}</span>`)
            .join("");
      }

      function renderTree() {
        const container = document.getElementById("treeContainer");
        if (!jsonData) {
          container.innerHTML = '<p style="opacity: 0.5;">解析 JSON 后显示树形结构</p>';
          return;
        }

        container.innerHTML = renderNode(jsonData, "", true);
      }

      function renderNode(data, path, isRoot = false) {
        const type = data === null ? "null" : Array.isArray(data) ? "array" : typeof data;

        if (type === "object" || type === "array") {
          const isArray = type === "array";
          const entries = isArray ? data.map((v, i) => [i, v]) : Object.entries(data);
          const count = entries.length;
          const id = "node_" + path.replace(/[.\[\]]/g, "_");

          let html = `<div class="tree-node ${isRoot ? "tree-node-root" : ""}">`;
          html += `<span class="tree-toggle" onclick="toggleNode('${id}')">▼</span>`;
          html += `<span class="tree-bracket">${isArray ? "[" : "{"}</span>`;
          html += `<span class="tree-count">${count} items</span>`;
          html += `<div id="${id}">`;

          entries.forEach(([key, value], index) => {
            const newPath = isArray ? `${path}[${key}]` : path ? `${path}.${key}` : key;
            const displayKey = isArray ? `[${key}]` : key;

            html += '<div class="tree-node">';
            html += `<span class="tree-key" data-path="${newPath}" onclick="selectNode('${newPath}')">${displayKey}</span>`;
            html += ": ";
            html += renderNode(value, newPath);
            html += "</div>";
          });

          html += "</div>";
          html += `<span class="tree-bracket">${isArray ? "]" : "}"}</span>`;
          html += "</div>";

          return html;
        } else {
          let valueClass = type;
          let displayValue = data;

          if (type === "string") {
            displayValue = `"${data}"`;
          } else if (type === "null") {
            displayValue = "null";
          }

          return `<span class="tree-value ${valueClass}">${escapeHtml(String(displayValue))}</span>`;
        }
      }

      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      };

      window.toggleNode = function (id) {
        const node = document.getElementById(id);
        const toggle = node.previousElementSibling.previousElementSibling;
        if (node.style.display === "none") {
          node.style.display = "";
          toggle.textContent = "▼";
        } else {
          node.style.display = "none";
          toggle.textContent = "▶";
        }
      };

      window.selectNode = function (path) {
        document.getElementById("pathInput").value = path;
        queryPath();
      };

      function highlightTreeNode(path) {
        document.querySelectorAll(".tree-key").forEach((el) => {
          el.classList.remove("selected");
          if (el.dataset.path === path) {
            el.classList.add("selected");
          }
        });
      }

      window.editValue = function () {
        if (!jsonData || !currentPath) {
          alert("请先选择一个路径");
          return;
        }

        const value = getValueByPath(jsonData, currentPath);
        if (value === undefined) {
          alert("路径不存在");
          return;
        }

        document.getElementById("editPath").value = currentPath;

        const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
        document.getElementById("editType").value = type;

        const valueInput = document.getElementById("editValue");
        if (type === "object" || type === "array") {
          valueInput.value = JSON.stringify(value, null, 2);
        } else if (type === "null") {
          valueInput.value = "";
        } else {
          valueInput.value = value;
        }

        updateEditInput();
        document.getElementById("editModal").classList.add("active");
      };

      function updateEditInput() {
        const type = document.getElementById("editType").value;
        const container = document.getElementById("editValueContainer");

        if (type === "null") {
          container.style.display = "none";
        } else if (type === "boolean") {
          container.innerHTML = `
                    <label style="display: block; margin-bottom: 5px; font-size: 13px; opacity: 0.8;">值</label>
                    <select class="type-select" id="editValue">
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                `;
        } else {
          container.style.display = "";
          if (
            !document.getElementById("editValue") ||
            document.getElementById("editValue").tagName === "SELECT"
          ) {
            container.innerHTML = `
                        <label style="display: block; margin-bottom: 5px; font-size: 13px; opacity: 0.8;">值</label>
                        <input type="text" class="modal-input" id="editValue">
                    `;
          }
        }
      }

      window.closeModal = function () {
        document.getElementById("editModal").classList.remove("active");
      };

      window.saveEdit = function () {
        const path = document.getElementById("editPath").value;
        const type = document.getElementById("editType").value;
        const valueInput = document.getElementById("editValue");

        let newValue;

        try {
          switch (type) {
            case "string":
              newValue = valueInput.value;
              break;
            case "number":
              newValue = parseFloat(valueInput.value);
              if (isNaN(newValue)) throw new Error("无效的数字");
              break;
            case "boolean":
              newValue = valueInput.value === "true";
              break;
            case "null":
              newValue = null;
              break;
            case "object":
            case "array":
              newValue = JSON.parse(valueInput.value);
              break;
          }

          setValueByPath(jsonData, path, newValue);
          document.getElementById("jsonEditor").value = JSON.stringify(jsonData, null, 2);
          renderTree();
          queryPath();
          closeModal();
        } catch (e) {
          alert("保存失败: " + e.message);
        }
      };

      window.deleteValue = function () {
        if (!jsonData || !currentPath) {
          alert("请先选择一个路径");
          return;
        }

        if (!confirm(`确定要删除路径 "${currentPath}" 吗？`)) return;

        try {
          deleteByPath(jsonData, currentPath);
          document.getElementById("jsonEditor").value = JSON.stringify(jsonData, null, 2);
          renderTree();
          generateSamplePaths();
          document.getElementById("pathInput").value = "";
          document.getElementById("resultBox").textContent = "已删除";
          updateBreadcrumb("");
          currentPath = "";
        } catch (e) {
          alert("删除失败: " + e.message);
        }
      };

      window.copyResult = function () {
        const result = document.getElementById("resultBox").textContent;
        navigator.clipboard.writeText(result);
        alert("已复制到剪贴板");
      };

      // Initialize
      parseJson();
    
