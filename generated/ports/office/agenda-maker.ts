// @ts-nocheck
// Generated from tools/office/agenda-maker.html
// Source SHA-256: 3ad0f034bb03f7bef0b8c07fd2a246906b54f3a5aab0697a0f3143350efa0c0f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "agenda_maker_data_v1";

      const meetingTitleEl = document.getElementById("meetingTitle");
      const meetingDateEl = document.getElementById("meetingDate");
      const meetingTimeEl = document.getElementById("meetingTime");
      const meetingLocationEl = document.getElementById("meetingLocation");
      const attendeeInputEl = document.getElementById("attendeeInput");
      const attendeesContainerEl = document.getElementById("attendeesContainer");
      const agendaTopicEl = document.getElementById("agendaTopic");
      const agendaDurationEl = document.getElementById("agendaDuration");
      const agendaListEl = document.getElementById("agendaList");
      const timeSummaryEl = document.getElementById("timeSummary");
      const totalDurationEl = document.getElementById("totalDuration");
      const endTimeEl = document.getElementById("endTime");
      const statusEl = document.getElementById("status");

      let attendees = [];
      let agendaItems = [];

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        if (msg) {
          setTimeout(function () {
            if (statusEl.textContent === msg) {
              statusEl.textContent = "";
              statusEl.className = "status";
            }
          }, 3000);
        }
      }

      function saveToStorage() {
        const data = {
          title: meetingTitleEl.value,
          date: meetingDateEl.value,
          time: meetingTimeEl.value,
          location: meetingLocationEl.value,
          attendees: attendees,
          agendaItems: agendaItems
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            const data = JSON.parse(saved);
            meetingTitleEl.value = data.title || "";
            meetingDateEl.value = data.date || "";
            meetingTimeEl.value = data.time || "";
            meetingLocationEl.value = data.location || "";
            attendees = data.attendees || [];
            agendaItems = data.agendaItems || [];
            renderAttendees();
            renderAgendaItems();
            updateTimeSummary();
          } catch (e) {
            console.error("Failed to load from storage:", e);
          }
        }
      }

      function renderAttendees() {
        attendeesContainerEl.textContent = "";
        attendees.forEach(function (name, index) {
          const tag = document.createElement("span");
          tag.className = "tag";

          const nameSpan = document.createElement("span");
          nameSpan.textContent = name;
          tag.appendChild(nameSpan);

          const removeBtn = document.createElement("button");
          removeBtn.className = "tag-remove";
          removeBtn.setAttribute("data-index", index);
          removeBtn.setAttribute("aria-label", "移除");
          removeBtn.textContent = "\u00d7";
          tag.appendChild(removeBtn);

          attendeesContainerEl.appendChild(tag);
        });
      }

      function addAttendee() {
        const name = attendeeInputEl.value.trim();
        if (!name) return;
        if (attendees.includes(name)) {
          showStatus("该人员已添加", "error");
          return;
        }
        attendees.push(name);
        attendeeInputEl.value = "";
        renderAttendees();
        saveToStorage();
        showStatus("已添加: " + name, "success");
      }

      function removeAttendee(index) {
        const name = attendees[index];
        attendees.splice(index, 1);
        renderAttendees();
        saveToStorage();
        showStatus("已移除: " + name, "success");
      }

      function renderAgendaItems() {
        agendaListEl.textContent = "";
        if (agendaItems.length === 0) {
          timeSummaryEl.style.display = "none";
          return;
        }
        timeSummaryEl.style.display = "flex";

        let cumulativeTime = 0;
        const startTime = meetingTimeEl.value;

        agendaItems.forEach(function (item, index) {
          const div = document.createElement("div");
          div.className = "agenda-item";

          let timeRange = "";
          if (startTime) {
            const startMinutes = parseTime(startTime);
            const itemStart = startMinutes + cumulativeTime;
            const itemEnd = itemStart + item.duration;
            timeRange = formatTime(itemStart) + " - " + formatTime(itemEnd);
          } else {
            timeRange = item.duration + " 分钟";
          }
          cumulativeTime += item.duration;

          const numberSpan = document.createElement("span");
          numberSpan.className = "agenda-item-number";
          numberSpan.textContent = index + 1 + ".";
          div.appendChild(numberSpan);

          const contentDiv = document.createElement("div");
          contentDiv.className = "agenda-item-content";

          const topicSpan = document.createElement("span");
          topicSpan.className = "agenda-item-topic";
          topicSpan.textContent = item.topic;
          contentDiv.appendChild(topicSpan);

          const timeSpan = document.createElement("span");
          timeSpan.className = "agenda-item-time";
          timeSpan.textContent = timeRange;
          contentDiv.appendChild(timeSpan);

          div.appendChild(contentDiv);

          const actionsDiv = document.createElement("div");
          actionsDiv.className = "agenda-item-actions";

          const upBtn = document.createElement("button");
          upBtn.className = "btn";
          upBtn.setAttribute("data-action", "up");
          upBtn.setAttribute("data-index", index);
          upBtn.setAttribute("title", "上移");
          upBtn.textContent = "\u2191";
          if (index === 0) upBtn.disabled = true;
          actionsDiv.appendChild(upBtn);

          const downBtn = document.createElement("button");
          downBtn.className = "btn";
          downBtn.setAttribute("data-action", "down");
          downBtn.setAttribute("data-index", index);
          downBtn.setAttribute("title", "下移");
          downBtn.textContent = "\u2193";
          if (index === agendaItems.length - 1) downBtn.disabled = true;
          actionsDiv.appendChild(downBtn);

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "btn";
          deleteBtn.setAttribute("data-action", "delete");
          deleteBtn.setAttribute("data-index", index);
          deleteBtn.setAttribute("title", "删除");
          deleteBtn.textContent = "\u00d7";
          actionsDiv.appendChild(deleteBtn);

          div.appendChild(actionsDiv);
          agendaListEl.appendChild(div);
        });
      }

      function addAgendaItem() {
        const topic = agendaTopicEl.value.trim();
        const duration = parseInt(agendaDurationEl.value, 10);
        if (!topic) {
          showStatus("请输入议题", "error");
          return;
        }
        if (!duration || duration < 1) {
          showStatus("请输入有效时长", "error");
          return;
        }
        agendaItems.push({ topic: topic, duration: duration });
        agendaTopicEl.value = "";
        agendaDurationEl.value = "15";
        renderAgendaItems();
        updateTimeSummary();
        saveToStorage();
        showStatus("已添加议题", "success");
      }

      function moveAgendaItem(index, direction) {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= agendaItems.length) return;
        const temp = agendaItems[index];
        agendaItems[index] = agendaItems[newIndex];
        agendaItems[newIndex] = temp;
        renderAgendaItems();
        updateTimeSummary();
        saveToStorage();
      }

      function deleteAgendaItem(index) {
        agendaItems.splice(index, 1);
        renderAgendaItems();
        updateTimeSummary();
        saveToStorage();
        showStatus("已删除议题", "success");
      }

      function updateTimeSummary() {
        if (agendaItems.length === 0) {
          totalDurationEl.textContent = "0";
          endTimeEl.textContent = "--:--";
          return;
        }
        const total = agendaItems.reduce(function (sum, item) {
          return sum + item.duration;
        }, 0);
        totalDurationEl.textContent = total;

        const startTime = meetingTimeEl.value;
        if (startTime) {
          const startMinutes = parseTime(startTime);
          const endMinutes = startMinutes + total;
          endTimeEl.textContent = formatTime(endMinutes);
        } else {
          endTimeEl.textContent = "--:--";
        }
      }

      function parseTime(timeStr) {
        const parts = timeStr.split(":");
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }

      function formatTime(minutes) {
        const hours = Math.floor(minutes / 60) % 24;
        const mins = minutes % 60;
        return (hours < 10 ? "0" : "") + hours + ":" + (mins < 10 ? "0" : "") + mins;
      }

      function formatDateChinese(dateStr) {
        if (!dateStr) return "";
        const parts = dateStr.split("-");
        return parts[0] + "年" + parseInt(parts[1], 10) + "月" + parseInt(parts[2], 10) + "日";
      }

      function generateTextAgenda() {
        const lines = [];
        const title = meetingTitleEl.value.trim() || "会议议程";
        lines.push(title);
        lines.push("=".repeat(title.length * 2));
        lines.push("");

        if (meetingDateEl.value) {
          lines.push("日期: " + formatDateChinese(meetingDateEl.value));
        }
        if (meetingTimeEl.value) {
          const total = agendaItems.reduce(function (sum, item) {
            return sum + item.duration;
          }, 0);
          const startMinutes = parseTime(meetingTimeEl.value);
          const endMinutes = startMinutes + total;
          lines.push("时间: " + meetingTimeEl.value + " - " + formatTime(endMinutes));
        }
        if (meetingLocationEl.value.trim()) {
          lines.push("地点: " + meetingLocationEl.value.trim());
        }
        lines.push("");

        if (attendees.length > 0) {
          lines.push("与会人员:");
          lines.push(attendees.join(", "));
          lines.push("");
        }

        if (agendaItems.length > 0) {
          lines.push("议程:");
          lines.push("-".repeat(40));

          let cumulativeTime = 0;
          const startTime = meetingTimeEl.value;

          agendaItems.forEach(function (item, index) {
            let timeStr = "";
            if (startTime) {
              const startMinutes = parseTime(startTime);
              const itemStart = startMinutes + cumulativeTime;
              const itemEnd = itemStart + item.duration;
              timeStr = " [" + formatTime(itemStart) + "-" + formatTime(itemEnd) + "]";
            } else {
              timeStr = " (" + item.duration + "分钟)";
            }
            cumulativeTime += item.duration;
            lines.push(index + 1 + ". " + item.topic + timeStr);
          });
        }

        return lines.join("\n");
      }

      document.getElementById("btnAddAttendee").onclick = addAttendee;
      attendeeInputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          addAttendee();
        }
      });

      attendeesContainerEl.addEventListener("click", function (e) {
        if (e.target.classList.contains("tag-remove")) {
          const index = parseInt(e.target.dataset.index, 10);
          removeAttendee(index);
        }
      });

      document.getElementById("btnAddAgenda").onclick = addAgendaItem;
      agendaTopicEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          addAgendaItem();
        }
      });

      agendaListEl.addEventListener("click", function (e) {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);
        if (action === "up") {
          moveAgendaItem(index, "up");
        } else if (action === "down") {
          moveAgendaItem(index, "down");
        } else if (action === "delete") {
          deleteAgendaItem(index);
        }
      });

      meetingTitleEl.addEventListener("input", saveToStorage);
      meetingDateEl.addEventListener("change", saveToStorage);
      meetingTimeEl.addEventListener("change", function () {
        renderAgendaItems();
        updateTimeSummary();
        saveToStorage();
      });
      meetingLocationEl.addEventListener("input", saveToStorage);

      document.getElementById("btnPrint").onclick = function () {
        window.print();
      };

      document.getElementById("btnCopy").onclick = async function () {
        const text = generateTextAgenda();
        if (!text.trim()) {
          showStatus("没有内容可复制", "error");
          return;
        }
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        meetingTitleEl.value = "";
        meetingDateEl.value = "";
        meetingTimeEl.value = "";
        meetingLocationEl.value = "";
        attendees = [];
        agendaItems = [];
        renderAttendees();
        renderAgendaItems();
        updateTimeSummary();
        localStorage.removeItem(LS_KEY);
        showStatus("已清空", "success");
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadFromStorage();

      if (!meetingDateEl.value) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        meetingDateEl.value = year + "-" + month + "-" + day;
      }
    
