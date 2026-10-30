// @ts-nocheck
// Generated from tools/team-tools/task-breakdown.html
// Source SHA-256: cde4657721f9c2e7ede2eb2a506e82d0c59438b8e1ce9dc2754be37f8e3ed3cd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "wbs-data";
      let wbsData = [];

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromStorage();
        loadFromUrl();

        if (wbsData.length === 0) {
          wbsData = [{ id: 1, name: "项目启动", hours: 0, children: [] }];
        }

        renderWBS();

        document.getElementById("projectName").addEventListener("input", () => {
          updatePreview();
          saveToStorage();
        });
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function addTopLevel() {
        wbsData.push({
          id: generateId(),
          name: "",
          hours: 0,
          children: []
        });
        renderWBS();
        saveToStorage();
      }

      function addChild(parentId) {
        function findAndAdd(items) {
          for (let item of items) {
            if (item.id === parentId) {
              item.children.push({
                id: generateId(),
                name: "",
                hours: 0,
                children: []
              });
              return true;
            }
            if (item.children && findAndAdd(item.children)) {
              return true;
            }
          }
          return false;
        }
        findAndAdd(wbsData);
        renderWBS();
        saveToStorage();
      }

      function deleteItem(id) {
        function findAndDelete(items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
              items.splice(i, 1);
              return true;
            }
            if (items[i].children && findAndDelete(items[i].children)) {
              return true;
            }
          }
          return false;
        }
        findAndDelete(wbsData);
        renderWBS();
        saveToStorage();
      }

      function updateItem(id, field, value) {
        function findAndUpdate(items) {
          for (let item of items) {
            if (item.id === id) {
              item[field] = value;
              return true;
            }
            if (item.children && findAndUpdate(item.children)) {
              return true;
            }
          }
          return false;
        }
        findAndUpdate(wbsData);
        updateStats();
        updatePreview();
        saveToStorage();
      }

      function renderWBS() {
        const container = document.getElementById("wbsTree");
        container.textContent = "";

        function renderItems(items, level, prefix) {
          items.forEach((item, index) => {
            const code = prefix ? prefix + "." + (index + 1) : String(index + 1);
            const div = document.createElement("div");
            div.className = "wbs-item";

            const node = document.createElement("div");
            node.className = "wbs-node level-" + Math.min(level, 4);

            const codeSpan = document.createElement("span");
            codeSpan.className = "wbs-code";
            codeSpan.textContent = code;

            const nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.className = "wbs-input";
            nameInput.placeholder = "任务名称";
            nameInput.value = item.name;
            nameInput.addEventListener("input", (e) => {
              updateItem(item.id, "name", e.target.value);
            });

            const hoursInput = document.createElement("input");
            hoursInput.type = "number";
            hoursInput.className = "wbs-hours";
            hoursInput.placeholder = "工时";
            hoursInput.min = "0";
            hoursInput.value = item.hours || "";
            hoursInput.addEventListener("input", (e) => {
              updateItem(item.id, "hours", parseFloat(e.target.value) || 0);
            });

            const actions = document.createElement("div");
            actions.className = "wbs-actions";

            if (level < 4) {
              const addBtn = document.createElement("button");
              addBtn.className = "wbs-btn";
              addBtn.textContent = "+";
              addBtn.title = "添加子任务";
              addBtn.addEventListener("click", () => addChild(item.id));
              actions.appendChild(addBtn);
            }

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "wbs-btn delete";
            deleteBtn.textContent = "×";
            deleteBtn.title = "删除";
            deleteBtn.addEventListener("click", () => {
              if (confirm("确定删除此任务及其子任务？")) {
                deleteItem(item.id);
              }
            });
            actions.appendChild(deleteBtn);

            node.appendChild(codeSpan);
            node.appendChild(nameInput);
            node.appendChild(hoursInput);
            node.appendChild(actions);

            div.appendChild(node);
            container.appendChild(div);

            if (item.children && item.children.length > 0) {
              renderItems(item.children, level + 1, code);
            }
          });
        }

        renderItems(wbsData, 1, "");
        updateStats();
        updatePreview();
      }

      function calculateStats() {
        let totalTasks = 0;
        let totalHours = 0;
        let maxDepth = 0;

        function traverse(items, depth) {
          items.forEach((item) => {
            totalTasks++;
            totalHours += item.hours || 0;
            maxDepth = Math.max(maxDepth, depth);
            if (item.children && item.children.length > 0) {
              traverse(item.children, depth + 1);
            }
          });
        }

        traverse(wbsData, 1);

        return { totalTasks, totalHours, maxDepth };
      }

      function updateStats() {
        const stats = calculateStats();
        document.getElementById("totalTasks").textContent = stats.totalTasks;
        document.getElementById("totalHours").textContent = stats.totalHours;
        document.getElementById("totalDays").textContent = Math.ceil(stats.totalHours / 8);
        document.getElementById("maxDepth").textContent = stats.maxDepth;
      }

      function generateWBSText() {
        const projectName = document.getElementById("projectName").value || "项目";
        let text = "═══════════════════════════════════════\n";
        text += "     " + projectName + " - WBS 工作分解结构\n";
        text += "═══════════════════════════════════════\n\n";

        function renderText(items, prefix, indent) {
          items.forEach((item, index) => {
            const code = prefix ? prefix + "." + (index + 1) : String(index + 1);
            const hours = item.hours ? " (" + item.hours + "h)" : "";
            text += indent + code + " " + (item.name || "(未命名)") + hours + "\n";
            if (item.children && item.children.length > 0) {
              renderText(item.children, code, indent + "  ");
            }
          });
        }

        renderText(wbsData, "", "");

        const stats = calculateStats();
        text += "\n───────────────────────────────────────\n";
        text += "总任务数: " + stats.totalTasks + "\n";
        text += "总工时: " + stats.totalHours + " 小时\n";
        text += "预计天数: " + Math.ceil(stats.totalHours / 8) + " 天 (按8小时/天计算)\n";
        text += "═══════════════════════════════════════\n";

        return text;
      }

      function updatePreview() {
        document.getElementById("preview").textContent = generateWBSText();
      }

      function copyWBS() {
        navigator.clipboard.writeText(generateWBSText()).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      function downloadWBS() {
        const projectName = document.getElementById("projectName").value || "WBS";
        const blob = new Blob([generateWBSText()], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = projectName + "-WBS.txt";
        a.click();
        URL.revokeObjectURL(url);
      }

      function shareWBS() {
        const data = {
          projectName: document.getElementById("projectName").value,
          wbsData: wbsData
        };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        const url = window.location.href.split("#")[0] + "#" + encoded;
        navigator.clipboard.writeText(url).then(() => {
          showToast("分享链接已复制");
        });
      }

      function loadFromUrl() {
        const hash = window.location.hash.slice(1);
        if (hash) {
          try {
            const data = JSON.parse(decodeURIComponent(atob(hash)));
            document.getElementById("projectName").value = data.projectName || "";
            if (data.wbsData) wbsData = data.wbsData;
            renderWBS();
          } catch (e) {
            console.error("Failed to load from URL:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          projectName: document.getElementById("projectName").value,
          wbsData: wbsData
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            document.getElementById("projectName").value = data.projectName || "";
            if (data.wbsData) wbsData = data.wbsData;
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有内容吗？")) {
          document.getElementById("projectName").value = "";
          wbsData = [{ id: generateId(), name: "项目启动", hours: 0, children: [] }];
          renderWBS();
          localStorage.removeItem(LS_KEY);
          window.location.hash = "";
        }
      }

      function showToast(message) {
        const toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      }

      window.toggleTheme = function () {
        const body = document.body;
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
