// @ts-nocheck
// Generated from tools/office/project-timeline.html
// Source SHA-256: af09fb84653f444031ad2c1462136d9efbc4080fb55dc6747eba0eb428f777ac
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var LS_KEY = "project_timeline_v1";
      var milestones = [];
      var projectName = "";

      function saveToStorage() {
        localStorage.setItem(
          LS_KEY,
          JSON.stringify({
            projectName: projectName,
            milestones: milestones
          })
        );
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            projectName = data.projectName || "";
            milestones = data.milestones || [];
            document.getElementById("projectName").value = projectName;
          } catch (e) {
            // ignore
          }
        }
      }

      function formatDate(dateStr) {
        if (!dateStr) return "";
        var d = new Date(dateStr);
        return (
          d.getFullYear() +
          "-" +
          String(d.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(d.getDate()).padStart(2, "0")
        );
      }

      function formatDisplayDate(dateStr) {
        if (!dateStr) return "";
        var d = new Date(dateStr);
        return d.getFullYear() + "\u5E74" + (d.getMonth() + 1) + "\u6708" + d.getDate() + "\u65E5";
      }

      window.addMilestone = function () {
        var date = document.getElementById("milestoneDate").value;
        var title = document.getElementById("milestoneTitle").value.trim();
        var desc = document.getElementById("milestoneDesc").value.trim();
        var status = document.getElementById("milestoneStatus").value;

        if (!date) {
          alert("\u8BF7\u9009\u62E9\u65E5\u671F");
          return;
        }
        if (!title) {
          alert("\u8BF7\u8F93\u5165\u6807\u9898");
          return;
        }

        milestones.push({
          id: Date.now(),
          date: date,
          title: title,
          desc: desc,
          status: status
        });

        // Sort by date
        milestones.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });

        document.getElementById("milestoneDate").value = "";
        document.getElementById("milestoneTitle").value = "";
        document.getElementById("milestoneDesc").value = "";
        document.getElementById("milestoneStatus").value = "pending";

        saveToStorage();
        renderMilestoneList();
        renderTimeline();
      };

      window.removeMilestone = function (id) {
        milestones = milestones.filter(function (m) {
          return m.id !== id;
        });
        saveToStorage();
        renderMilestoneList();
        renderTimeline();
      };

      function renderMilestoneList() {
        var container = document.getElementById("milestoneList");
        container.textContent = "";

        if (milestones.length === 0) {
          var emptyMsg = document.createElement("div");
          emptyMsg.style.color = "var(--color-text-muted)";
          emptyMsg.style.fontSize = "0.875rem";
          emptyMsg.style.textAlign = "center";
          emptyMsg.style.padding = "16px";
          emptyMsg.textContent = "\u6682\u65E0\u91CC\u7A0B\u7891";
          container.appendChild(emptyMsg);
          return;
        }

        milestones.forEach(function (milestone) {
          var item = document.createElement("div");
          item.className = "milestone-item";

          var info = document.createElement("div");
          info.className = "milestone-item-info";

          var title = document.createElement("div");
          title.className = "milestone-item-title";
          title.textContent = milestone.title;

          var date = document.createElement("div");
          date.className = "milestone-item-date";
          date.textContent = formatDate(milestone.date);

          info.appendChild(title);
          info.appendChild(date);

          if (milestone.desc) {
            var desc = document.createElement("div");
            desc.className = "milestone-item-desc";
            desc.textContent = milestone.desc;
            info.appendChild(desc);
          }

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm btn-danger";
          removeBtn.textContent = "\u5220\u9664";
          removeBtn.onclick = function () {
            removeMilestone(milestone.id);
          };

          item.appendChild(info);
          item.appendChild(removeBtn);
          container.appendChild(item);
        });
      }

      function renderTimeline() {
        var container = document.getElementById("preview");
        container.textContent = "";

        projectName = document.getElementById("projectName").value.trim();

        // Title
        var titleEl = document.createElement("div");
        titleEl.className = "timeline-title";
        titleEl.textContent = (projectName || "\u9879\u76EE") + " \u65F6\u95F4\u7EBF";
        container.appendChild(titleEl);

        if (milestones.length === 0) {
          var emptyMsg = document.createElement("div");
          emptyMsg.style.color = "#999";
          emptyMsg.style.textAlign = "center";
          emptyMsg.style.padding = "40px";
          emptyMsg.textContent =
            "\u6DFB\u52A0\u91CC\u7A0B\u7891\u4EE5\u751F\u6210\u65F6\u95F4\u7EBF";
          container.appendChild(emptyMsg);
          return;
        }

        var timeline = document.createElement("div");
        timeline.className = "timeline";

        milestones.forEach(function (milestone) {
          var item = document.createElement("div");
          item.className = "timeline-item";
          if (milestone.status === "completed") {
            item.className += " completed";
          } else if (milestone.status === "future") {
            item.className += " future";
          }

          var dot = document.createElement("div");
          dot.className = "timeline-dot";

          var content = document.createElement("div");
          content.className = "timeline-content";

          var date = document.createElement("div");
          date.className = "timeline-date";
          date.textContent = formatDisplayDate(milestone.date);

          var title = document.createElement("div");
          title.className = "timeline-item-title";
          title.textContent = milestone.title;

          content.appendChild(date);
          content.appendChild(title);

          if (milestone.desc) {
            var desc = document.createElement("div");
            desc.className = "timeline-item-desc";
            desc.textContent = milestone.desc;
            content.appendChild(desc);
          }

          item.appendChild(dot);
          item.appendChild(content);
          timeline.appendChild(item);
        });

        container.appendChild(timeline);
      }

      document.getElementById("projectName").addEventListener("input", function () {
        projectName = this.value;
        saveToStorage();
        renderTimeline();
      });

      document.getElementById("btnPrint").onclick = function () {
        window.print();
      };

      document.getElementById("btnClear").onclick = function () {
        if (confirm("\u786E\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u91CC\u7A0B\u7891\u5417\uFF1F")) {
          milestones = [];
          projectName = "";
          document.getElementById("projectName").value = "";
          localStorage.removeItem(LS_KEY);
          renderMilestoneList();
          renderTimeline();
        }
      };

      // Theme toggle
      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      // Initialize
      initTheme();
      loadFromStorage();
      renderMilestoneList();
      renderTimeline();
    
