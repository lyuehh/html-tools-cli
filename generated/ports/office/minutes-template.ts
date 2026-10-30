// @ts-nocheck
// Generated from tools/office/minutes-template.html
// Source SHA-256: 74ca906970240eaf8ef5348489f63306a8f292fa52170f999be2b29292732552
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "minutes_template_v1";
      var agendaItems = [];
      var actionItems = [];

      const basicFields = [
        "meetingTitle",
        "meetingDate",
        "meetingTime",
        "meetingLocation",
        "attendees"
      ];

      function getFormData() {
        var data = {};
        basicFields.forEach(function (id) {
          data[id] = document.getElementById(id).value;
        });
        data.agendaItems = agendaItems;
        data.actionItems = actionItems;
        return data;
      }

      function setFormData(data) {
        basicFields.forEach(function (id) {
          if (data[id]) document.getElementById(id).value = data[id];
        });
        if (data.agendaItems) agendaItems = data.agendaItems;
        if (data.actionItems) actionItems = data.actionItems;
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, JSON.stringify(getFormData()));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            setFormData(JSON.parse(saved));
          } catch (e) {
            // ignore
          }
        }
      }

      function formatDate(dateStr) {
        if (!dateStr) return "";
        var d = new Date(dateStr);
        return d.getFullYear() + "\u5E74" + (d.getMonth() + 1) + "\u6708" + d.getDate() + "\u65E5";
      }

      window.addAgendaItem = function () {
        agendaItems.push({ title: "", notes: "" });
        renderAgendaList();
        saveToStorage();
      };

      window.removeAgendaItem = function (index) {
        agendaItems.splice(index, 1);
        renderAgendaList();
        saveToStorage();
        updatePreview();
      };

      window.updateAgendaItem = function (index, field, value) {
        agendaItems[index][field] = value;
        saveToStorage();
        updatePreview();
      };

      function renderAgendaList() {
        var container = document.getElementById("agendaList");
        container.textContent = "";

        agendaItems.forEach(function (item, index) {
          var card = document.createElement("div");
          card.className = "item-card";

          var header = document.createElement("div");
          header.className = "item-card-header";

          var title = document.createElement("span");
          title.className = "item-card-title";
          title.textContent = "\u8BAE\u7A0B " + (index + 1);

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm btn-danger";
          removeBtn.textContent = "\u5220\u9664";
          removeBtn.onclick = function () {
            removeAgendaItem(index);
          };

          header.appendChild(title);
          header.appendChild(removeBtn);

          var titleGroup = document.createElement("div");
          titleGroup.className = "form-group";
          var titleLabel = document.createElement("label");
          titleLabel.textContent = "\u8BAE\u9898";
          var titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.value = item.title;
          titleInput.placeholder = "\u8BAE\u9898\u540D\u79F0";
          titleInput.oninput = function () {
            updateAgendaItem(index, "title", this.value);
          };
          titleGroup.appendChild(titleLabel);
          titleGroup.appendChild(titleInput);

          var notesGroup = document.createElement("div");
          notesGroup.className = "form-group";
          var notesLabel = document.createElement("label");
          notesLabel.textContent = "\u8BA8\u8BBA\u8BB0\u5F55";
          var notesInput = document.createElement("textarea");
          notesInput.value = item.notes;
          notesInput.placeholder = "\u8BA8\u8BBA\u5185\u5BB9...";
          notesInput.oninput = function () {
            updateAgendaItem(index, "notes", this.value);
          };
          notesGroup.appendChild(notesLabel);
          notesGroup.appendChild(notesInput);

          card.appendChild(header);
          card.appendChild(titleGroup);
          card.appendChild(notesGroup);
          container.appendChild(card);
        });
      }

      window.addActionItem = function () {
        actionItems.push({ task: "", assignee: "" });
        renderActionList();
        saveToStorage();
      };

      window.removeActionItem = function (index) {
        actionItems.splice(index, 1);
        renderActionList();
        saveToStorage();
        updatePreview();
      };

      window.updateActionItem = function (index, field, value) {
        actionItems[index][field] = value;
        saveToStorage();
        updatePreview();
      };

      function renderActionList() {
        var container = document.getElementById("actionList");
        container.textContent = "";

        actionItems.forEach(function (item, index) {
          var card = document.createElement("div");
          card.className = "item-card";

          var header = document.createElement("div");
          header.className = "item-card-header";

          var title = document.createElement("span");
          title.className = "item-card-title";
          title.textContent = "\u884C\u52A8\u9879 " + (index + 1);

          var removeBtn = document.createElement("button");
          removeBtn.className = "btn btn-sm btn-danger";
          removeBtn.textContent = "\u5220\u9664";
          removeBtn.onclick = function () {
            removeActionItem(index);
          };

          header.appendChild(title);
          header.appendChild(removeBtn);

          var taskGroup = document.createElement("div");
          taskGroup.className = "form-group";
          var taskLabel = document.createElement("label");
          taskLabel.textContent = "\u4EFB\u52A1";
          var taskInput = document.createElement("input");
          taskInput.type = "text";
          taskInput.value = item.task;
          taskInput.placeholder = "\u4EFB\u52A1\u63CF\u8FF0";
          taskInput.oninput = function () {
            updateActionItem(index, "task", this.value);
          };
          taskGroup.appendChild(taskLabel);
          taskGroup.appendChild(taskInput);

          var assigneeGroup = document.createElement("div");
          assigneeGroup.className = "form-group";
          var assigneeLabel = document.createElement("label");
          assigneeLabel.textContent = "\u8D1F\u8D23\u4EBA";
          var assigneeInput = document.createElement("input");
          assigneeInput.type = "text";
          assigneeInput.value = item.assignee;
          assigneeInput.placeholder = "\u8D1F\u8D23\u4EBA\u59D3\u540D";
          assigneeInput.oninput = function () {
            updateActionItem(index, "assignee", this.value);
          };
          assigneeGroup.appendChild(assigneeLabel);
          assigneeGroup.appendChild(assigneeInput);

          card.appendChild(header);
          card.appendChild(taskGroup);
          card.appendChild(assigneeGroup);
          container.appendChild(card);
        });
      }

      function updatePreview() {
        var data = getFormData();
        var preview = document.getElementById("preview");
        preview.textContent = "";

        // Title
        var titleEl = document.createElement("div");
        titleEl.className = "minutes-title";
        titleEl.textContent = data.meetingTitle || "\u4F1A\u8BAE\u7EAA\u8981";
        preview.appendChild(titleEl);

        // Meta info
        var metaEl = document.createElement("div");
        metaEl.className = "minutes-meta";

        var rows = [
          { label: "\u65E5\u671F", value: formatDate(data.meetingDate) },
          { label: "\u65F6\u95F4", value: data.meetingTime },
          { label: "\u5730\u70B9", value: data.meetingLocation },
          { label: "\u53C2\u4F1A\u4EBA", value: data.attendees }
        ];

        rows.forEach(function (row) {
          if (row.value) {
            var rowEl = document.createElement("div");
            rowEl.className = "minutes-meta-row";

            var labelEl = document.createElement("span");
            labelEl.className = "minutes-meta-label";
            labelEl.textContent = row.label + ":";

            var valueEl = document.createElement("span");
            valueEl.textContent = row.value;

            rowEl.appendChild(labelEl);
            rowEl.appendChild(valueEl);
            metaEl.appendChild(rowEl);
          }
        });

        preview.appendChild(metaEl);

        // Agenda section
        if (agendaItems.length > 0) {
          var agendaSection = document.createElement("div");
          agendaSection.className = "minutes-section";

          var agendaTitle = document.createElement("div");
          agendaTitle.className = "minutes-section-title";
          agendaTitle.textContent = "\u8BAE\u7A0B\u4E0E\u8BA8\u8BBA";
          agendaSection.appendChild(agendaTitle);

          agendaItems.forEach(function (item, index) {
            if (item.title || item.notes) {
              var itemEl = document.createElement("div");
              itemEl.className = "agenda-item";

              var itemTitle = document.createElement("div");
              itemTitle.className = "agenda-item-title";
              itemTitle.textContent =
                index + 1 + ". " + (item.title || "\u672A\u547D\u540D\u8BAE\u9898");
              itemEl.appendChild(itemTitle);

              if (item.notes) {
                var itemNotes = document.createElement("div");
                itemNotes.className = "agenda-item-notes";
                itemNotes.textContent = item.notes;
                itemEl.appendChild(itemNotes);
              }

              agendaSection.appendChild(itemEl);
            }
          });

          preview.appendChild(agendaSection);
        }

        // Action items section
        if (actionItems.length > 0) {
          var actionSection = document.createElement("div");
          actionSection.className = "minutes-section";

          var actionTitle = document.createElement("div");
          actionTitle.className = "minutes-section-title";
          actionTitle.textContent = "\u884C\u52A8\u9879";
          actionSection.appendChild(actionTitle);

          actionItems.forEach(function (item) {
            if (item.task) {
              var itemEl = document.createElement("div");
              itemEl.className = "action-item";

              var taskEl = document.createElement("div");
              taskEl.className = "action-item-task";
              taskEl.textContent = item.task;
              itemEl.appendChild(taskEl);

              if (item.assignee) {
                var assigneeEl = document.createElement("div");
                assigneeEl.className = "action-item-assignee";
                assigneeEl.textContent = "\u8D1F\u8D23\u4EBA: " + item.assignee;
                itemEl.appendChild(assigneeEl);
              }

              actionSection.appendChild(itemEl);
            }
          });

          preview.appendChild(actionSection);
        }
      }

      // Event listeners
      basicFields.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
          saveToStorage();
          updatePreview();
        });
      });

      document.getElementById("btnPrint").onclick = function () {
        window.print();
      };

      document.getElementById("btnClear").onclick = function () {
        basicFields.forEach(function (id) {
          document.getElementById(id).value = "";
        });
        document.getElementById("meetingDate").value = new Date().toISOString().split("T")[0];
        agendaItems = [];
        actionItems = [];
        renderAgendaList();
        renderActionList();
        localStorage.removeItem(LS_KEY);
        updatePreview();
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
      document.getElementById("meetingDate").value = new Date().toISOString().split("T")[0];
      loadFromStorage();
      renderAgendaList();
      renderActionList();
      updatePreview();
    
