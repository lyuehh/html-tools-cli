// @ts-nocheck
// Generated from tools/team-tools/raci-chart.html
// Source SHA-256: bc1d4a872efec6244ef120c47ae1ba85ea71630864ea4b4a63fcb56abb9c5bf5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "raci-chart-data";
      const RACI_SEQUENCE = ["", "R", "A", "C", "I"];

      let tasks = [];
      let roles = [];
      let assignments = {};

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromStorage();
        loadFromUrl();

        if (tasks.length === 0) {
          tasks = [
            { id: 1, name: "需求分析" },
            { id: 2, name: "系统设计" },
            { id: 3, name: "开发实现" },
            { id: 4, name: "测试验证" }
          ];
        }
        if (roles.length === 0) {
          roles = [
            { id: 1, name: "产品经理" },
            { id: 2, name: "技术负责人" },
            { id: 3, name: "开发工程师" },
            { id: 4, name: "测试工程师" }
          ];
        }

        renderTasks();
        renderRoles();
        renderMatrix();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function addTask(name = "") {
        tasks.push({ id: generateId(), name: name });
        renderTasks();
        renderMatrix();
        saveToStorage();
      }

      function removeTask(id) {
        tasks = tasks.filter((t) => t.id !== id);
        // Clean up assignments
        Object.keys(assignments).forEach((key) => {
          if (key.startsWith(id + "-")) {
            delete assignments[key];
          }
        });
        renderTasks();
        renderMatrix();
        saveToStorage();
      }

      function renderTasks() {
        const container = document.getElementById("taskList");
        container.textContent = "";

        tasks.forEach((task) => {
          const div = document.createElement("div");
          div.className = "item-row";

          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = "任务名称";
          input.value = task.name;
          input.addEventListener("input", (e) => {
            task.name = e.target.value;
            renderMatrix();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeTask(task.id));

          div.appendChild(input);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });
      }

      function addRole(name = "") {
        roles.push({ id: generateId(), name: name });
        renderRoles();
        renderMatrix();
        saveToStorage();
      }

      function removeRole(id) {
        roles = roles.filter((r) => r.id !== id);
        // Clean up assignments
        Object.keys(assignments).forEach((key) => {
          if (key.endsWith("-" + id)) {
            delete assignments[key];
          }
        });
        renderRoles();
        renderMatrix();
        saveToStorage();
      }

      function renderRoles() {
        const container = document.getElementById("roleList");
        container.textContent = "";

        roles.forEach((role) => {
          const div = document.createElement("div");
          div.className = "item-row";

          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = "角色名称";
          input.value = role.name;
          input.addEventListener("input", (e) => {
            role.name = e.target.value;
            renderMatrix();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeRole(role.id));

          div.appendChild(input);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });
      }

      function cycleRaci(taskId, roleId) {
        const key = taskId + "-" + roleId;
        const current = assignments[key] || "";
        const currentIndex = RACI_SEQUENCE.indexOf(current);
        const nextIndex = (currentIndex + 1) % RACI_SEQUENCE.length;
        const nextValue = RACI_SEQUENCE[nextIndex];

        if (nextValue) {
          assignments[key] = nextValue;
        } else {
          delete assignments[key];
        }

        renderMatrix();
        saveToStorage();
      }

      function renderMatrix() {
        const table = document.getElementById("raciTable");
        table.textContent = "";

        if (tasks.length === 0 || roles.length === 0) {
          const row = document.createElement("tr");
          const cell = document.createElement("td");
          cell.textContent = "请先添加任务和角色";
          cell.style.padding = "20px";
          cell.style.opacity = "0.5";
          row.appendChild(cell);
          table.appendChild(row);
          validate();
          return;
        }

        // Header row
        const headerRow = document.createElement("tr");
        const emptyHeader = document.createElement("th");
        emptyHeader.textContent = "任务 / 角色";
        headerRow.appendChild(emptyHeader);

        roles.forEach((role) => {
          const th = document.createElement("th");
          th.textContent = role.name || "(未命名)";
          headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        // Task rows
        tasks.forEach((task) => {
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.className = "task-name";
          nameCell.textContent = task.name || "(未命名)";
          row.appendChild(nameCell);

          roles.forEach((role) => {
            const cell = document.createElement("td");
            cell.className = "raci-cell";

            const key = task.id + "-" + role.id;
            const value = assignments[key] || "";

            if (value) {
              const badge = document.createElement("span");
              badge.className = "raci-badge " + value.toLowerCase();
              badge.textContent = value;
              cell.appendChild(badge);
            }

            cell.addEventListener("click", () => cycleRaci(task.id, role.id));
            row.appendChild(cell);
          });

          table.appendChild(row);
        });

        validate();
      }

      function validate() {
        const container = document.getElementById("validationSection");
        container.textContent = "";

        const issues = [];
        let totalAssigned = 0;

        tasks.forEach((task) => {
          let hasR = false;
          let hasA = false;
          let aCount = 0;

          roles.forEach((role) => {
            const key = task.id + "-" + role.id;
            const value = assignments[key];
            if (value) {
              totalAssigned++;
              if (value === "R") hasR = true;
              if (value === "A") {
                hasA = true;
                aCount++;
              }
            }
          });

          const taskName = task.name || "(未命名任务)";

          if (!hasR) {
            issues.push({ type: "error", message: "「" + taskName + "」没有指定执行者 (R)" });
          }
          if (!hasA) {
            issues.push({ type: "error", message: "「" + taskName + "」没有指定负责人 (A)" });
          }
          if (aCount > 1) {
            issues.push({
              type: "warning",
              message: "「" + taskName + "」有多个负责人 (A)，建议只有一个"
            });
          }
        });

        if (issues.length === 0 && tasks.length > 0 && roles.length > 0) {
          issues.push({ type: "valid", message: "所有任务都已正确分配责任" });
        }

        issues.forEach((issue) => {
          const div = document.createElement("div");
          div.className = "validation-item " + issue.type;

          const icon = document.createElement("span");
          icon.className = "validation-icon";
          icon.textContent = issue.type === "valid" ? "✓" : issue.type === "warning" ? "⚠" : "✗";

          const text = document.createElement("span");
          text.textContent = issue.message;

          div.appendChild(icon);
          div.appendChild(text);
          container.appendChild(div);
        });

        // Update stats
        document.getElementById("totalTasks").textContent = tasks.length;
        document.getElementById("totalRoles").textContent = roles.length;
        document.getElementById("assignedCells").textContent = totalAssigned;

        const totalCells = tasks.length * roles.length;
        const rate = totalCells > 0 ? Math.round((totalAssigned / totalCells) * 100) : 0;
        document.getElementById("completionRate").textContent = rate + "%";
      }

      function exportRACI() {
        let text = "═══════════════════════════════════════\n";
        text += "         RACI 责任分配矩阵\n";
        text += "═══════════════════════════════════════\n\n";

        text += "R = 执行者 | A = 负责人 | C = 被咨询者 | I = 被通知者\n\n";

        // Find max task name length for formatting
        const maxTaskLen = Math.max(...tasks.map((t) => (t.name || "").length), 10);

        // Header
        text += "任务".padEnd(maxTaskLen + 2);
        roles.forEach((role) => {
          text += (role.name || "角色").padEnd(12);
        });
        text += "\n";
        text += "─".repeat(maxTaskLen + 2 + roles.length * 12) + "\n";

        // Rows
        tasks.forEach((task) => {
          text += (task.name || "(未命名)").padEnd(maxTaskLen + 2);
          roles.forEach((role) => {
            const key = task.id + "-" + role.id;
            const value = assignments[key] || "-";
            text += value.padEnd(12);
          });
          text += "\n";
        });

        text += "\n═══════════════════════════════════════\n";

        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      function shareRACI() {
        const data = {
          tasks: tasks,
          roles: roles,
          assignments: assignments
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
            if (data.tasks) tasks = data.tasks;
            if (data.roles) roles = data.roles;
            if (data.assignments) assignments = data.assignments;
          } catch (e) {
            console.error("Failed to load from URL:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          tasks: tasks,
          roles: roles,
          assignments: assignments
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            if (data.tasks) tasks = data.tasks;
            if (data.roles) roles = data.roles;
            if (data.assignments) assignments = data.assignments;
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有内容吗？")) {
          tasks = [{ id: generateId(), name: "" }];
          roles = [{ id: generateId(), name: "" }];
          assignments = {};
          renderTasks();
          renderRoles();
          renderMatrix();
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
    
