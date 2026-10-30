// @ts-nocheck
// Generated from tools/team-tools/sprint-planner.html
// Source SHA-256: 6788e60677c4ad548d222a2129bc514882d1937b98deee22c418e62c402fad86
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "sprint-planner-data";

      let teamMembers = [];
      let backlogItems = [];
      let velocityRecords = [];

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        const today = new Date();
        document.getElementById("startDate").value = today.toISOString().split("T")[0];
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 14);
        document.getElementById("endDate").value = endDate.toISOString().split("T")[0];

        loadFromStorage();
        loadFromUrl();

        if (teamMembers.length === 0) {
          addTeamMember("成员1", 10, 80);
        }
        if (backlogItems.length === 0) {
          addBacklogItem();
        }
        if (velocityRecords.length === 0) {
          addVelocityRecord();
        }

        document.querySelectorAll("input").forEach((el) => {
          el.addEventListener("input", () => {
            updateStats();
            saveToStorage();
          });
        });
      }

      function addTeamMember(name = "", capacity = 10, availability = 100) {
        teamMembers.push({
          id: Date.now(),
          name: name,
          capacity: capacity,
          availability: availability
        });
        renderTeamMembers();
        updateStats();
        saveToStorage();
      }

      function removeTeamMember(id) {
        teamMembers = teamMembers.filter((m) => m.id !== id);
        renderTeamMembers();
        updateStats();
        saveToStorage();
      }

      function renderTeamMembers() {
        const container = document.getElementById("teamMembers");
        container.textContent = "";

        teamMembers.forEach((member) => {
          const div = document.createElement("div");
          div.className = "team-member";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.placeholder = "成员姓名";
          nameInput.value = member.name;
          nameInput.addEventListener("input", (e) => {
            member.name = e.target.value;
            saveToStorage();
          });

          const capacityInput = document.createElement("input");
          capacityInput.type = "number";
          capacityInput.min = "0";
          capacityInput.placeholder = "点数";
          capacityInput.value = member.capacity;
          capacityInput.addEventListener("input", (e) => {
            member.capacity = parseInt(e.target.value) || 0;
            updateStats();
            saveToStorage();
          });

          const availInput = document.createElement("input");
          availInput.type = "number";
          availInput.min = "0";
          availInput.max = "100";
          availInput.placeholder = "%";
          availInput.value = member.availability;
          availInput.addEventListener("input", (e) => {
            member.availability = parseInt(e.target.value) || 0;
            updateStats();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeTeamMember(member.id));

          div.appendChild(nameInput);
          div.appendChild(capacityInput);
          div.appendChild(availInput);
          div.appendChild(deleteBtn);

          container.appendChild(div);
        });
      }

      function addVelocityRecord(value = 0) {
        velocityRecords.push({
          id: Date.now(),
          value: value
        });
        renderVelocityRecords();
        updateStats();
        saveToStorage();
      }

      function removeVelocityRecord(id) {
        velocityRecords = velocityRecords.filter((r) => r.id !== id);
        renderVelocityRecords();
        updateStats();
        saveToStorage();
      }

      function renderVelocityRecords() {
        const container = document.getElementById("velocityInputs");
        container.textContent = "";

        velocityRecords.forEach((record, index) => {
          const div = document.createElement("div");
          div.style.cssText = "display:flex;gap:10px;margin-bottom:8px;align-items:center;";

          const label = document.createElement("span");
          label.style.cssText = "font-size:12px;opacity:0.7;width:70px;";
          label.textContent = "Sprint " + (index + 1);

          const input = document.createElement("input");
          input.type = "number";
          input.min = "0";
          input.style.cssText =
            "flex:1;padding:8px;background:var(--bg-input);border:1px solid var(--border-subtle);border-radius:6px;color:var(--text-color);";
          input.value = record.value;
          input.addEventListener("input", (e) => {
            record.value = parseInt(e.target.value) || 0;
            updateStats();
            renderVelocityChart();
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeVelocityRecord(record.id));

          div.appendChild(label);
          div.appendChild(input);
          div.appendChild(deleteBtn);

          container.appendChild(div);
        });

        renderVelocityChart();
      }

      function renderVelocityChart() {
        const container = document.getElementById("velocityChart");
        container.textContent = "";

        if (velocityRecords.length === 0) return;

        const maxValue = Math.max(...velocityRecords.map((r) => r.value), 1);

        velocityRecords.forEach((record, index) => {
          const bar = document.createElement("div");
          bar.className = "velocity-bar";
          const height = (record.value / maxValue) * 100;
          bar.style.height = height + "%";

          const label = document.createElement("span");
          label.textContent = "S" + (index + 1);
          bar.appendChild(label);

          container.appendChild(bar);
        });
      }

      function addBacklogItem(title = "", points = 0, priority = "medium") {
        backlogItems.push({
          id: Date.now(),
          title: title,
          points: points,
          priority: priority,
          inSprint: false
        });
        renderBacklogItems();
        updateStats();
        saveToStorage();
      }

      function removeBacklogItem(id) {
        backlogItems = backlogItems.filter((item) => item.id !== id);
        renderBacklogItems();
        updateStats();
        saveToStorage();
      }

      function renderBacklogItems() {
        const container = document.getElementById("backlogItems");
        container.textContent = "";

        backlogItems.forEach((item) => {
          const div = document.createElement("div");
          div.className = "backlog-item";
          if (item.inSprint) div.classList.add("in-sprint");

          const checkWrapper = document.createElement("div");
          checkWrapper.className = "checkbox-wrapper";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = item.inSprint;
          checkbox.addEventListener("change", (e) => {
            item.inSprint = e.target.checked;
            renderBacklogItems();
            updateStats();
            saveToStorage();
          });

          const titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.placeholder = "用户故事标题";
          titleInput.value = item.title;
          titleInput.style.flex = "1";
          titleInput.addEventListener("input", (e) => {
            item.title = e.target.value;
            saveToStorage();
          });

          checkWrapper.appendChild(checkbox);
          checkWrapper.appendChild(titleInput);

          const pointsInput = document.createElement("input");
          pointsInput.type = "number";
          pointsInput.min = "0";
          pointsInput.placeholder = "点数";
          pointsInput.value = item.points;
          pointsInput.addEventListener("input", (e) => {
            item.points = parseInt(e.target.value) || 0;
            updateStats();
            saveToStorage();
          });

          const prioritySelect = document.createElement("select");
          ["high", "medium", "low"].forEach((p) => {
            const option = document.createElement("option");
            option.value = p;
            option.textContent = p === "high" ? "高" : p === "medium" ? "中" : "低";
            if (p === item.priority) option.selected = true;
            prioritySelect.appendChild(option);
          });
          prioritySelect.addEventListener("change", (e) => {
            item.priority = e.target.value;
            saveToStorage();
          });

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.addEventListener("click", () => removeBacklogItem(item.id));

          div.appendChild(checkWrapper);
          div.appendChild(pointsInput);
          div.appendChild(prioritySelect);
          div.appendChild(deleteBtn);

          container.appendChild(div);
        });
      }

      function updateStats() {
        const totalCapacity = teamMembers.reduce((sum, m) => {
          return sum + (m.capacity * m.availability) / 100;
        }, 0);

        const plannedPoints = backlogItems
          .filter((item) => item.inSprint)
          .reduce((sum, item) => sum + item.points, 0);

        const avgVelocity =
          velocityRecords.length > 0
            ? velocityRecords.reduce((sum, r) => sum + r.value, 0) / velocityRecords.length
            : 0;

        const startDate = new Date(document.getElementById("startDate").value);
        const endDate = new Date(document.getElementById("endDate").value);
        const sprintDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        document.getElementById("totalCapacity").textContent = Math.round(totalCapacity);
        document.getElementById("plannedPoints").textContent = plannedPoints;
        document.getElementById("avgVelocity").textContent = Math.round(avgVelocity);
        document.getElementById("sprintDays").textContent = sprintDays > 0 ? sprintDays : 0;

        const capacityPercent = totalCapacity > 0 ? (plannedPoints / totalCapacity) * 100 : 0;
        document.getElementById("capacityPercent").textContent = Math.round(capacityPercent);

        const progressBar = document.getElementById("capacityProgress");
        progressBar.style.width = Math.min(capacityPercent, 100) + "%";
        progressBar.classList.remove("warning", "danger");
        if (capacityPercent > 100) {
          progressBar.classList.add("danger");
        } else if (capacityPercent > 80) {
          progressBar.classList.add("warning");
        }
      }

      function exportPlan() {
        const sprintName = document.getElementById("sprintName").value || "Sprint";
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;
        const sprintGoal = document.getElementById("sprintGoal").value;

        let text = "═══════════════════════════════════════\n";
        text += "        " + sprintName + " 规划\n";
        text += "═══════════════════════════════════════\n\n";

        text += "📅 周期：" + startDate + " ~ " + endDate + "\n";
        if (sprintGoal) text += "🎯 目标：" + sprintGoal + "\n";
        text += "\n";

        text += "───────────────────────────────────────\n";
        text += "             团队容量\n";
        text += "───────────────────────────────────────\n";
        teamMembers.forEach((m) => {
          const effectiveCapacity = Math.round((m.capacity * m.availability) / 100);
          text +=
            "• " +
            (m.name || "成员") +
            ": " +
            effectiveCapacity +
            " 点 (" +
            m.availability +
            "% 可用)\n";
        });
        text += "\n";

        text += "───────────────────────────────────────\n";
        text += "             冲刺内容\n";
        text += "───────────────────────────────────────\n";
        const sprintItems = backlogItems.filter((item) => item.inSprint);
        if (sprintItems.length > 0) {
          sprintItems.forEach((item, i) => {
            const priorityLabel =
              item.priority === "high" ? "[高]" : item.priority === "medium" ? "[中]" : "[低]";
            text +=
              i +
              1 +
              ". " +
              (item.title || "用户故事") +
              " - " +
              item.points +
              "点 " +
              priorityLabel +
              "\n";
          });
        } else {
          text += "(无计划项目)\n";
        }
        text += "\n";

        const totalCapacity = teamMembers.reduce(
          (sum, m) => sum + (m.capacity * m.availability) / 100,
          0
        );
        const plannedPoints = sprintItems.reduce((sum, item) => sum + item.points, 0);

        text += "───────────────────────────────────────\n";
        text += "总容量: " + Math.round(totalCapacity) + " 点\n";
        text += "计划点数: " + plannedPoints + " 点\n";
        text +=
          "使用率: " +
          Math.round(totalCapacity > 0 ? (plannedPoints / totalCapacity) * 100 : 0) +
          "%\n";
        text += "═══════════════════════════════════════\n";

        navigator.clipboard.writeText(text).then(() => {
          showToast("已复制到剪贴板");
        });
      }

      function sharePlan() {
        const data = {
          sprintName: document.getElementById("sprintName").value,
          startDate: document.getElementById("startDate").value,
          endDate: document.getElementById("endDate").value,
          sprintGoal: document.getElementById("sprintGoal").value,
          teamMembers: teamMembers,
          backlogItems: backlogItems,
          velocityRecords: velocityRecords
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
            document.getElementById("sprintName").value = data.sprintName || "";
            document.getElementById("startDate").value = data.startDate || "";
            document.getElementById("endDate").value = data.endDate || "";
            document.getElementById("sprintGoal").value = data.sprintGoal || "";
            if (data.teamMembers) teamMembers = data.teamMembers;
            if (data.backlogItems) backlogItems = data.backlogItems;
            if (data.velocityRecords) velocityRecords = data.velocityRecords;
            renderTeamMembers();
            renderBacklogItems();
            renderVelocityRecords();
            updateStats();
          } catch (e) {
            console.error("Failed to load from URL:", e);
          }
        }
      }

      function saveToStorage() {
        const data = {
          sprintName: document.getElementById("sprintName").value,
          startDate: document.getElementById("startDate").value,
          endDate: document.getElementById("endDate").value,
          sprintGoal: document.getElementById("sprintGoal").value,
          teamMembers: teamMembers,
          backlogItems: backlogItems,
          velocityRecords: velocityRecords
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            document.getElementById("sprintName").value = data.sprintName || "";
            if (data.startDate) document.getElementById("startDate").value = data.startDate;
            if (data.endDate) document.getElementById("endDate").value = data.endDate;
            document.getElementById("sprintGoal").value = data.sprintGoal || "";
            if (data.teamMembers) teamMembers = data.teamMembers;
            if (data.backlogItems) backlogItems = data.backlogItems;
            if (data.velocityRecords) velocityRecords = data.velocityRecords;
            renderTeamMembers();
            renderBacklogItems();
            renderVelocityRecords();
            updateStats();
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有内容吗？")) {
          document.getElementById("sprintName").value = "";
          document.getElementById("sprintGoal").value = "";
          teamMembers = [];
          backlogItems = [];
          velocityRecords = [];
          addTeamMember("成员1", 10, 80);
          addBacklogItem();
          addVelocityRecord();
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
    
