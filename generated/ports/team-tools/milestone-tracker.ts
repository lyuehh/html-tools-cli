// @ts-nocheck
// Generated from tools/team-tools/milestone-tracker.html
// Source SHA-256: b11c3ec0cfb2dfd3582f8cd565b5ec962302d9c32f03cf86ef85501f6aae1e54
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "milestone-tracker-data";
      var milestones = [];
      var currentFilter = "all";

      function init() {
        var savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromUrl() || loadFromStorage();
        renderMilestones();
        updateStats();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function toggleAddForm() {
        var form = document.getElementById("addForm");
        form.classList.toggle("show");
        if (form.classList.contains("show")) {
          document.getElementById("newDueDate").valueAsDate = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          );
        }
      }

      function addMilestone() {
        var title = document.getElementById("newTitle").value.trim();
        var description = document.getElementById("newDescription").value.trim();
        var dueDate = document.getElementById("newDueDate").value;
        var owner = document.getElementById("newOwner").value.trim();

        if (!title || !dueDate) {
          showToast("请填写名称和截止日期");
          return;
        }

        milestones.push({
          id: generateId(),
          title: title,
          description: description,
          dueDate: dueDate,
          owner: owner,
          progress: 0,
          status: "pending",
          createdAt: new Date().toISOString()
        });

        document.getElementById("newTitle").value = "";
        document.getElementById("newDescription").value = "";
        document.getElementById("newOwner").value = "";
        toggleAddForm();

        sortMilestones();
        renderMilestones();
        updateStats();
        saveToStorage();
        showToast("里程碑已添加");
      }

      function removeMilestone(id) {
        if (confirm("确定要删除这个里程碑吗？")) {
          milestones = milestones.filter(function (m) {
            return m.id !== id;
          });
          renderMilestones();
          updateStats();
          saveToStorage();
        }
      }

      function updateMilestoneProgress(id, progress) {
        var milestone = milestones.find(function (m) {
          return m.id === id;
        });
        if (milestone) {
          milestone.progress = parseInt(progress);
          if (milestone.progress >= 100) {
            milestone.status = "completed";
            milestone.completedAt = new Date().toISOString();
          } else if (milestone.progress > 0) {
            milestone.status = "in-progress";
          } else {
            milestone.status = "pending";
          }
          renderMilestones();
          updateStats();
          saveToStorage();
        }
      }

      function toggleMilestoneStatus(id) {
        var milestone = milestones.find(function (m) {
          return m.id === id;
        });
        if (milestone) {
          if (milestone.status === "completed") {
            milestone.status = "pending";
            milestone.progress = 0;
            milestone.completedAt = null;
          } else {
            milestone.status = "completed";
            milestone.progress = 100;
            milestone.completedAt = new Date().toISOString();
          }
          renderMilestones();
          updateStats();
          saveToStorage();
        }
      }

      function getMilestoneStatus(milestone) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var dueDate = new Date(milestone.dueDate);
        dueDate.setHours(0, 0, 0, 0);

        if (milestone.status === "completed") return "completed";
        if (dueDate < today) return "overdue";
        if (milestone.progress > 0) return "in-progress";

        var daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        if (daysUntil <= 7) return "upcoming";
        return "pending";
      }

      function setFilter(filter, btn) {
        currentFilter = filter;
        document.querySelectorAll(".filter-tab").forEach(function (tab) {
          tab.classList.remove("active");
        });
        btn.classList.add("active");
        renderMilestones();
      }

      function sortMilestones() {
        milestones.sort(function (a, b) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      }

      function renderMilestones() {
        var container = document.getElementById("timeline");
        container.textContent = "";

        var filtered = milestones.filter(function (m) {
          var status = getMilestoneStatus(m);
          if (currentFilter === "all") return true;
          return status === currentFilter;
        });

        if (filtered.length === 0) {
          var empty = document.createElement("div");
          empty.className = "empty-state";
          empty.textContent =
            currentFilter === "all" ? "还没有里程碑，点击上方按钮添加" : "没有符合条件的里程碑";
          container.appendChild(empty);
          return;
        }

        filtered.forEach(function (milestone) {
          var status = getMilestoneStatus(milestone);
          var div = document.createElement("div");
          div.className = "milestone-item " + status;

          var header = document.createElement("div");
          header.className = "milestone-header";

          var titleDiv = document.createElement("div");
          var title = document.createElement("div");
          title.className = "milestone-title";
          title.textContent = milestone.title;
          titleDiv.appendChild(title);

          var badge = document.createElement("span");
          badge.className = "status-badge status-" + status;
          var statusLabels = {
            completed: "已完成",
            "in-progress": "进行中",
            overdue: "已逾期",
            upcoming: "即将到期",
            pending: "待开始"
          };
          badge.textContent = statusLabels[status];
          titleDiv.appendChild(badge);

          var dateDiv = document.createElement("div");
          var dateSpan = document.createElement("div");
          dateSpan.className = "milestone-date";
          dateSpan.textContent = "📅 " + milestone.dueDate;
          dateDiv.appendChild(dateSpan);

          var today = new Date();
          today.setHours(0, 0, 0, 0);
          var dueDate = new Date(milestone.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          var daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

          if (status !== "completed") {
            var countdown = document.createElement("div");
            countdown.className = "countdown" + (daysUntil < 0 || daysUntil <= 3 ? " urgent" : "");
            if (daysUntil < 0) {
              countdown.textContent = "逾期 " + Math.abs(daysUntil) + " 天";
            } else if (daysUntil === 0) {
              countdown.textContent = "今天到期";
            } else {
              countdown.textContent = "剩余 " + daysUntil + " 天";
            }
            dateDiv.appendChild(countdown);
          }

          header.appendChild(titleDiv);
          header.appendChild(dateDiv);
          div.appendChild(header);

          if (milestone.description) {
            var desc = document.createElement("div");
            desc.className = "milestone-description";
            desc.textContent = milestone.description;
            div.appendChild(desc);
          }

          if (milestone.owner) {
            var ownerDiv = document.createElement("div");
            ownerDiv.style.fontSize = "13px";
            ownerDiv.style.opacity = "0.7";
            ownerDiv.textContent = "👤 负责人: " + milestone.owner;
            div.appendChild(ownerDiv);
          }

          var progressDiv = document.createElement("div");
          progressDiv.className = "milestone-progress";

          var bar = document.createElement("div");
          bar.className = "progress-bar";
          var fill = document.createElement("div");
          fill.className = "progress-fill";
          fill.style.width = milestone.progress + "%";
          bar.appendChild(fill);
          progressDiv.appendChild(bar);

          var progressText = document.createElement("div");
          progressText.className = "progress-text";

          var progressLabel = document.createElement("span");
          progressLabel.textContent = "进度: " + milestone.progress + "%";

          var progressInput = document.createElement("input");
          progressInput.type = "range";
          progressInput.min = "0";
          progressInput.max = "100";
          progressInput.value = milestone.progress;
          progressInput.style.width = "100px";
          progressInput.onchange = function () {
            updateMilestoneProgress(milestone.id, progressInput.value);
          };

          progressText.appendChild(progressLabel);
          progressText.appendChild(progressInput);
          progressDiv.appendChild(progressText);
          div.appendChild(progressDiv);

          var actions = document.createElement("div");
          actions.className = "milestone-actions";

          var completeBtn = document.createElement("button");
          completeBtn.className = "btn btn-secondary";
          completeBtn.style.padding = "6px 12px";
          completeBtn.style.fontSize = "12px";
          completeBtn.textContent = status === "completed" ? "↩️ 标记未完成" : "✅ 标记完成";
          completeBtn.onclick = function () {
            toggleMilestoneStatus(milestone.id);
          };

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = function () {
            removeMilestone(milestone.id);
          };

          actions.appendChild(completeBtn);
          actions.appendChild(deleteBtn);
          div.appendChild(actions);

          container.appendChild(div);
        });
      }

      function updateStats() {
        var total = milestones.length;
        var completed = 0;
        var inProgress = 0;
        var overdue = 0;

        milestones.forEach(function (m) {
          var status = getMilestoneStatus(m);
          if (status === "completed") completed++;
          else if (status === "in-progress") inProgress++;
          else if (status === "overdue") overdue++;
        });

        document.getElementById("totalMilestones").textContent = total;
        document.getElementById("completedCount").textContent = completed;
        document.getElementById("inProgressCount").textContent = inProgress;
        document.getElementById("overdueCount").textContent = overdue;

        var deadline = document.getElementById("projectDeadline").value;
        if (deadline) {
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          var endDate = new Date(deadline);
          endDate.setHours(0, 0, 0, 0);
          var daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
          document.getElementById("daysRemaining").textContent =
            daysRemaining >= 0 ? daysRemaining : "已过期";
        }

        var overallBar = document.getElementById("overallBar");
        overallBar.textContent = "";

        if (total > 0) {
          var completedWidth = (completed / total) * 100;
          var inProgressWidth = (inProgress / total) * 100;
          var overdueWidth = (overdue / total) * 100;

          if (completedWidth > 0) {
            var seg1 = document.createElement("div");
            seg1.className = "overall-segment completed";
            seg1.style.width = completedWidth + "%";
            overallBar.appendChild(seg1);
          }
          if (inProgressWidth > 0) {
            var seg2 = document.createElement("div");
            seg2.className = "overall-segment in-progress";
            seg2.style.width = inProgressWidth + "%";
            overallBar.appendChild(seg2);
          }
          if (overdueWidth > 0) {
            var seg3 = document.createElement("div");
            seg3.className = "overall-segment overdue";
            seg3.style.width = overdueWidth + "%";
            overallBar.appendChild(seg3);
          }
        }
      }

      function exportReport() {
        var projectName = document.getElementById("projectName").value || "项目";
        var lines = [];
        lines.push("# " + projectName + " - 里程碑报告");
        lines.push("");
        lines.push("生成时间: " + new Date().toLocaleString());
        lines.push("");
        lines.push("## 概览");
        lines.push("- 总里程碑: " + milestones.length);
        lines.push("- 已完成: " + document.getElementById("completedCount").textContent);
        lines.push("- 进行中: " + document.getElementById("inProgressCount").textContent);
        lines.push("- 已逾期: " + document.getElementById("overdueCount").textContent);
        lines.push("");
        lines.push("## 详细列表");
        lines.push("");
        lines.push("| 里程碑 | 截止日期 | 状态 | 进度 | 负责人 |");
        lines.push("|--------|----------|------|------|--------|");

        milestones.forEach(function (m) {
          var status = getMilestoneStatus(m);
          var statusLabels = {
            completed: "已完成",
            "in-progress": "进行中",
            overdue: "已逾期",
            upcoming: "即将到期",
            pending: "待开始"
          };
          lines.push(
            "| " +
              m.title +
              " | " +
              m.dueDate +
              " | " +
              statusLabels[status] +
              " | " +
              m.progress +
              "% | " +
              (m.owner || "-") +
              " |"
          );
        });

        var content = lines.join("\n");
        var blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = projectName + "_里程碑报告.md";
        a.click();
        URL.revokeObjectURL(url);
      }

      function shareLink() {
        var data = {
          projectName: document.getElementById("projectName").value,
          projectDeadline: document.getElementById("projectDeadline").value,
          milestones: milestones
        };

        try {
          var encoded = btoa(encodeURIComponent(JSON.stringify(data)));
          var url = location.origin + location.pathname + "#" + encoded;
          navigator.clipboard.writeText(url);
          showToast("分享链接已复制");
        } catch (e) {
          showToast("生成链接失败");
        }
      }

      function clearAll() {
        if (confirm("确定要清空所有数据吗？")) {
          milestones = [];
          document.getElementById("projectName").value = "";
          document.getElementById("projectDeadline").value = "";
          renderMilestones();
          updateStats();
          saveToStorage();
          showToast("已清空");
        }
      }

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          document.getElementById("projectName").value = data.projectName || "";
          document.getElementById("projectDeadline").value = data.projectDeadline || "";
          if (data.milestones) milestones = data.milestones;
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToStorage() {
        var data = {
          projectName: document.getElementById("projectName").value,
          projectDeadline: document.getElementById("projectDeadline").value,
          milestones: milestones
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            document.getElementById("projectName").value = data.projectName || "";
            document.getElementById("projectDeadline").value = data.projectDeadline || "";
            if (data.milestones) milestones = data.milestones;
          } catch (e) {
            console.error("Failed to load from storage");
          }
        }
      }

      function showToast(message) {
        var toast = document.createElement("div");
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--accent-color);color:#000;padding:12px 24px;border-radius:8px;z-index:1000;font-size:14px;";
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      window.toggleTheme = function () {
        var body = document.body;
        var currentTheme = body.getAttribute("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      init();
    
