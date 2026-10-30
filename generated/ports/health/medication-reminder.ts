// @ts-nocheck
// Generated from tools/health/medication-reminder.html
// Source SHA-256: 4909df213704802883104b9e7530eaa4428173795798afc3867825f1c9ac6dd5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "medications";
      const LOG_KEY = "med_logs";
      let medications = [];
      let logs = {};
      let editIndex = -1;
      let timeSlots = ["08:00"];

      function loadData() {
        const savedMeds = localStorage.getItem(LS_KEY);
        if (savedMeds) medications = JSON.parse(savedMeds);

        const savedLogs = localStorage.getItem(LOG_KEY);
        if (savedLogs) logs = JSON.parse(savedLogs);

        // 清理过期日志（保留7天）
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 7);
        const cutoffStr = cutoff.toISOString().split("T")[0];
        Object.keys(logs).forEach((date) => {
          if (date < cutoffStr) delete logs[date];
        });
        saveData();

        render();
      }

      function saveData() {
        localStorage.setItem(LS_KEY, JSON.stringify(medications));
        localStorage.setItem(LOG_KEY, JSON.stringify(logs));
      }

      function showAddModal(index = -1) {
        editIndex = index;
        document.getElementById("modalTitle").textContent = index >= 0 ? "编辑药物" : "添加药物";

        if (index >= 0) {
          const med = medications[index];
          document.getElementById("medName").value = med.name;
          document.getElementById("medDose").value = med.dose;
          document.getElementById("medFrequency").value =
            med.times.length <= 4 ? med.times.length : "custom";
          document.getElementById("medNotes").value = med.notes || "";
          timeSlots = [...med.times];
        } else {
          document.getElementById("medName").value = "";
          document.getElementById("medDose").value = "";
          document.getElementById("medFrequency").value = "1";
          document.getElementById("medNotes").value = "";
          timeSlots = ["08:00"];
        }

        renderTimeSlots();
        document.getElementById("addModal").classList.add("show");
      }

      function hideAddModal() {
        document.getElementById("addModal").classList.remove("show");
        editIndex = -1;
      }

      function updateTimeSlots() {
        const freq = document.getElementById("medFrequency").value;
        if (freq !== "custom") {
          const count = parseInt(freq);
          const defaultTimes = {
            1: ["08:00"],
            2: ["08:00", "20:00"],
            3: ["08:00", "14:00", "20:00"],
            4: ["08:00", "12:00", "18:00", "22:00"]
          };
          timeSlots = defaultTimes[count] || ["08:00"];
          renderTimeSlots();
        }
      }

      function renderTimeSlots() {
        const container = document.getElementById("timeSlots");
        container.textContent = "";

        timeSlots.forEach((time, index) => {
          const div = document.createElement("div");
          div.className = "time-slot";

          const input = document.createElement("input");
          input.type = "time";
          input.value = time;
          input.onchange = (e) => {
            timeSlots[index] = e.target.value;
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "remove";
          removeBtn.textContent = "×";
          removeBtn.onclick = () => {
            if (timeSlots.length > 1) {
              timeSlots.splice(index, 1);
              renderTimeSlots();
            }
          };

          div.appendChild(input);
          div.appendChild(removeBtn);
          container.appendChild(div);
        });
      }

      function addTimeSlot() {
        timeSlots.push("12:00");
        document.getElementById("medFrequency").value = "custom";
        renderTimeSlots();
      }

      function saveMed() {
        const name = document.getElementById("medName").value.trim();
        const dose = document.getElementById("medDose").value.trim();
        const notes = document.getElementById("medNotes").value.trim();

        if (!name) {
          alert("请输入药物名称");
          return;
        }

        const med = {
          name,
          dose,
          times: timeSlots.sort(),
          notes,
          id: editIndex >= 0 ? medications[editIndex].id : Date.now()
        };

        if (editIndex >= 0) {
          medications[editIndex] = med;
        } else {
          medications.push(med);
        }

        saveData();
        hideAddModal();
        render();
      }

      function deleteMed(index) {
        if (confirm("确定要删除这个药物吗？")) {
          medications.splice(index, 1);
          saveData();
          render();
        }
      }

      function toggleReminder(medId, time) {
        const today = new Date().toISOString().split("T")[0];
        if (!logs[today]) logs[today] = {};

        const key = medId + "_" + time;
        logs[today][key] = !logs[today][key];

        saveData();
        render();
      }

      function render() {
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("todayDate").textContent = today;

        // 渲染药物列表
        const medList = document.getElementById("medList");
        medList.textContent = "";

        if (medications.length === 0) {
          const empty = document.createElement("div");
          empty.className = "empty-state";
          empty.textContent = '还没有添加药物，点击"添加"开始';
          medList.appendChild(empty);
        } else {
          medications.forEach((med, index) => {
            const div = document.createElement("div");
            div.className = "med-item";

            const header = document.createElement("div");
            header.className = "med-header";

            const name = document.createElement("div");
            name.className = "med-name";
            name.textContent = med.name;

            const actions = document.createElement("div");
            actions.className = "med-actions";

            const editBtn = document.createElement("button");
            editBtn.className = "secondary";
            editBtn.textContent = "编辑";
            editBtn.onclick = () => showAddModal(index);

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "danger";
            deleteBtn.textContent = "删除";
            deleteBtn.onclick = () => deleteMed(index);

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            header.appendChild(name);
            header.appendChild(actions);

            const details = document.createElement("div");
            details.className = "med-details";
            details.textContent = med.dose + (med.notes ? " · " + med.notes : "");

            const times = document.createElement("div");
            times.className = "med-times";
            med.times.forEach((time) => {
              const span = document.createElement("span");
              span.className = "med-time";
              span.textContent = time;
              times.appendChild(span);
            });

            div.appendChild(header);
            div.appendChild(details);
            div.appendChild(times);
            medList.appendChild(div);
          });
        }

        // 渲染今日提醒
        const todayReminders = document.getElementById("todayReminders");
        todayReminders.textContent = "";

        const reminders = [];
        medications.forEach((med) => {
          med.times.forEach((time) => {
            reminders.push({
              medId: med.id,
              name: med.name,
              dose: med.dose,
              time: time,
              done: logs[today] && logs[today][med.id + "_" + time]
            });
          });
        });

        reminders.sort((a, b) => a.time.localeCompare(b.time));

        if (reminders.length === 0) {
          const empty = document.createElement("div");
          empty.className = "empty-state";
          empty.textContent = "今日没有服药计划";
          todayReminders.appendChild(empty);
        } else {
          reminders.forEach((reminder) => {
            const div = document.createElement("div");
            div.className = "reminder-item" + (reminder.done ? " done" : "");

            const time = document.createElement("div");
            time.className = "reminder-time";
            time.textContent = reminder.time;

            const info = document.createElement("div");
            info.className = "reminder-info";

            const name = document.createElement("div");
            name.className = "reminder-name";
            name.textContent = reminder.name;

            const dose = document.createElement("div");
            dose.className = "reminder-dose";
            dose.textContent = reminder.dose;

            info.appendChild(name);
            info.appendChild(dose);

            const check = document.createElement("div");
            check.className = "reminder-check" + (reminder.done ? " checked" : "");
            check.textContent = reminder.done ? "✓" : "";
            check.onclick = () => toggleReminder(reminder.medId, reminder.time);

            div.appendChild(time);
            div.appendChild(info);
            div.appendChild(check);
            todayReminders.appendChild(div);
          });
        }

        // 更新统计
        document.getElementById("totalMeds").textContent = medications.length;
        document.getElementById("todayDone").textContent = reminders.filter((r) => r.done).length;
        document.getElementById("todayRemaining").textContent = reminders.filter(
          (r) => !r.done
        ).length;
      }

      loadData();

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
    
