// @ts-nocheck
// Generated from tools/team-tools/meeting-agenda.html
// Source SHA-256: cf8f8cc0a4da3a0571a7ac8c19847db041e3e7ac9554f6f8ac8b01a5ac535cb6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "meeting-agenda-data";
      let agendaItems = [];
      let currentFormat = "markdown";

      function init() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
          document.body.setAttribute("data-theme", "light");
        }

        loadFromUrl() || loadFromStorage();

        if (agendaItems.length === 0) {
          addAgendaItem();
        }

        document.getElementById("meetingDate").valueAsDate = new Date();

        document.querySelectorAll("input").forEach(function (input) {
          input.addEventListener("input", function () {
            updatePreview();
            saveToStorage();
          });
        });

        renderAgendaItems();
        updatePreview();
      }

      function generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
      }

      function addAgendaItem(title, duration, owner, type) {
        agendaItems.push({
          id: generateId(),
          title: title || "",
          duration: duration || 10,
          owner: owner || "",
          type: type || "discussion"
        });
        renderAgendaItems();
        updatePreview();
        saveToStorage();
      }

      function removeAgendaItem(id) {
        agendaItems = agendaItems.filter(function (item) {
          return item.id !== id;
        });
        renderAgendaItems();
        updatePreview();
        saveToStorage();
      }

      function createTypeSelect(selectedType) {
        var select = document.createElement("select");
        var types = [
          { value: "discussion", label: "讨论" },
          { value: "decision", label: "决策" },
          { value: "info", label: "信息同步" },
          { value: "action", label: "行动项" },
          { value: "break", label: "休息" }
        ];
        types.forEach(function (t) {
          var option = document.createElement("option");
          option.value = t.value;
          option.textContent = t.label;
          if (t.value === selectedType) {
            option.selected = true;
          }
          select.appendChild(option);
        });
        return select;
      }

      function renderAgendaItems() {
        var container = document.getElementById("agendaList");
        container.textContent = "";

        agendaItems.forEach(function (item, index) {
          var div = document.createElement("div");
          div.className = "agenda-item";

          var number = document.createElement("div");
          number.className = "agenda-item-number";
          number.textContent = index + 1;

          var content = document.createElement("div");
          content.className = "agenda-item-content";

          var titleInput = document.createElement("input");
          titleInput.type = "text";
          titleInput.placeholder = "议程标题";
          titleInput.value = item.title;
          titleInput.addEventListener("input", function (e) {
            item.title = e.target.value;
            updatePreview();
            saveToStorage();
          });

          var row = document.createElement("div");
          row.className = "agenda-item-row";

          var durationInput = document.createElement("input");
          durationInput.type = "number";
          durationInput.placeholder = "时长(分钟)";
          durationInput.value = item.duration;
          durationInput.min = "1";
          durationInput.style.maxWidth = "100px";
          durationInput.addEventListener("input", function (e) {
            item.duration = parseInt(e.target.value) || 0;
            updateTotalTime();
            updatePreview();
            saveToStorage();
          });

          var ownerInput = document.createElement("input");
          ownerInput.type = "text";
          ownerInput.placeholder = "负责人";
          ownerInput.value = item.owner;
          ownerInput.addEventListener("input", function (e) {
            item.owner = e.target.value;
            updatePreview();
            saveToStorage();
          });

          var typeSelect = createTypeSelect(item.type);
          typeSelect.addEventListener("change", function (e) {
            item.type = e.target.value;
            updatePreview();
            saveToStorage();
          });

          var deleteBtn = document.createElement("button");
          deleteBtn.className = "btn btn-danger";
          deleteBtn.textContent = "×";
          deleteBtn.onclick = function () {
            removeAgendaItem(item.id);
          };

          row.appendChild(durationInput);
          row.appendChild(ownerInput);
          row.appendChild(typeSelect);
          row.appendChild(deleteBtn);

          content.appendChild(titleInput);
          content.appendChild(row);

          div.appendChild(number);
          div.appendChild(content);
          container.appendChild(div);
        });

        updateTotalTime();
      }

      function updateTotalTime() {
        var total = agendaItems.reduce(function (sum, item) {
          return sum + (item.duration || 0);
        }, 0);
        document.getElementById("totalTime").textContent = total;
      }

      function loadTemplate(type) {
        var templates = {
          standup: [
            { title: "昨日完成", duration: 5, type: "info" },
            { title: "今日计划", duration: 5, type: "info" },
            { title: "阻碍问题", duration: 5, type: "discussion" }
          ],
          sprint: [
            { title: "上个冲刺回顾", duration: 10, type: "info" },
            { title: "产品待办清单评审", duration: 20, type: "discussion" },
            { title: "任务评估与分配", duration: 30, type: "decision" },
            { title: "确认冲刺目标", duration: 10, type: "decision" }
          ],
          review: [
            { title: "成果演示", duration: 30, type: "info" },
            { title: "反馈收集", duration: 15, type: "discussion" },
            { title: "后续计划", duration: 10, type: "action" }
          ],
          retro: [
            { title: "做得好的地方", duration: 15, type: "discussion" },
            { title: "需要改进的地方", duration: 15, type: "discussion" },
            { title: "行动计划", duration: 15, type: "action" }
          ],
          brainstorm: [
            { title: "问题定义", duration: 10, type: "info" },
            { title: "自由讨论", duration: 30, type: "discussion" },
            { title: "想法整理", duration: 15, type: "discussion" },
            { title: "投票选择", duration: 10, type: "decision" }
          ],
          oneonone: [
            { title: "近期工作进展", duration: 15, type: "discussion" },
            { title: "遇到的挑战", duration: 10, type: "discussion" },
            { title: "职业发展", duration: 10, type: "discussion" },
            { title: "反馈与支持", duration: 10, type: "discussion" }
          ],
          kickoff: [
            { title: "项目背景介绍", duration: 15, type: "info" },
            { title: "目标与范围", duration: 15, type: "info" },
            { title: "团队角色与职责", duration: 10, type: "info" },
            { title: "时间线与里程碑", duration: 15, type: "info" },
            { title: "Q&A", duration: 15, type: "discussion" }
          ]
        };

        if (templates[type]) {
          agendaItems = templates[type].map(function (item) {
            return {
              id: generateId(),
              title: item.title,
              duration: item.duration,
              owner: "",
              type: item.type
            };
          });
          renderAgendaItems();
          updatePreview();
          saveToStorage();
          showToast("已加载模板");
        }
      }

      function getTypeLabel(type) {
        var labels = {
          discussion: "💬 讨论",
          decision: "✅ 决策",
          info: "📢 信息同步",
          action: "🎯 行动项",
          break: "☕ 休息"
        };
        return labels[type] || type;
      }

      function getMeetingInfo() {
        return {
          title: document.getElementById("meetingTitle").value || "会议议程",
          date: document.getElementById("meetingDate").value,
          time: document.getElementById("meetingTime").value,
          location: document.getElementById("meetingLocation").value,
          host: document.getElementById("meetingHost").value,
          attendees: document.getElementById("meetingAttendees").value
        };
      }

      function generateMarkdown() {
        var info = getMeetingInfo();
        var startTime = parseTime(info.time);

        var md = "# " + info.title + "\n\n";
        md += "| 项目 | 内容 |\n";
        md += "|------|------|\n";
        if (info.date) md += "| 日期 | " + info.date + " |\n";
        if (info.time) md += "| 时间 | " + info.time + " |\n";
        if (info.location) md += "| 地点 | " + info.location + " |\n";
        if (info.host) md += "| 主持人 | " + info.host + " |\n";
        if (info.attendees) md += "| 参会人员 | " + info.attendees + " |\n";

        md += "\n## 议程\n\n";
        md += "| 序号 | 时间 | 议题 | 负责人 | 类型 |\n";
        md += "|------|------|------|--------|------|\n";

        agendaItems.forEach(function (item, index) {
          var timeStr = formatTimeRange(startTime, item.duration);
          md +=
            "| " +
            (index + 1) +
            " | " +
            timeStr +
            " | " +
            (item.title || "-") +
            " | " +
            (item.owner || "-") +
            " | " +
            getTypeLabel(item.type) +
            " |\n";
          startTime += item.duration;
        });

        var totalMinutes = agendaItems.reduce(function (sum, item) {
          return sum + (item.duration || 0);
        }, 0);
        md += "\n**总时长:** " + totalMinutes + " 分钟\n";

        return md;
      }

      function generateText() {
        var info = getMeetingInfo();
        var startTime = parseTime(info.time);

        var text = "══════════════════════════════════════════════════\n";
        text += "      " + info.title + "\n";
        text += "══════════════════════════════════════════════════\n\n";

        if (info.date) text += "📅 日期: " + info.date + "\n";
        if (info.time) text += "🕐 时间: " + info.time + "\n";
        if (info.location) text += "📍 地点: " + info.location + "\n";
        if (info.host) text += "👤 主持人: " + info.host + "\n";
        if (info.attendees) text += "👥 参会人员: " + info.attendees + "\n";

        text += "\n──────────────────────────────────────────────────\n";
        text += "议程安排\n";
        text += "──────────────────────────────────────────────────\n\n";

        agendaItems.forEach(function (item, index) {
          var timeStr = formatTimeRange(startTime, item.duration);
          text += index + 1 + ". [" + timeStr + "] " + (item.title || "待定") + "\n";
          if (item.owner) text += "   负责人: " + item.owner + "\n";
          text += "   类型: " + getTypeLabel(item.type) + "\n\n";
          startTime += item.duration;
        });

        var totalMinutes = agendaItems.reduce(function (sum, item) {
          return sum + (item.duration || 0);
        }, 0);
        text += "──────────────────────────────────────────────────\n";
        text += "总时长: " + totalMinutes + " 分钟\n";

        return text;
      }

      function generateHTML() {
        var info = getMeetingInfo();
        var startTime = parseTime(info.time);

        var lines = [];
        lines.push("<!DOCTYPE html>");
        lines.push('<html lang="zh-CN">');
        lines.push("<head>");
        lines.push('<meta charset="UTF-8">');
        lines.push("<title>" + escapeHtml(info.title) + "</title>");
        lines.push(
          "<style>body{font-family:sans-serif;max-width:800px;margin:0 auto;padding:20px}h1{color:#333}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{border:1px solid #ddd;padding:12px;text-align:left}th{background:#f5f5f5}.info{margin:10px 0}</style>"
        );
        lines.push("</head>");
        lines.push("<body>");
        lines.push("<h2>" + escapeHtml(info.title) + "</h2>");

        lines.push('<div class="info">');
        if (info.date) lines.push("<p><strong>日期:</strong> " + escapeHtml(info.date) + "</p>");
        if (info.time) lines.push("<p><strong>时间:</strong> " + escapeHtml(info.time) + "</p>");
        if (info.location)
          lines.push("<p><strong>地点:</strong> " + escapeHtml(info.location) + "</p>");
        if (info.host) lines.push("<p><strong>主持人:</strong> " + escapeHtml(info.host) + "</p>");
        if (info.attendees)
          lines.push("<p><strong>参会人员:</strong> " + escapeHtml(info.attendees) + "</p>");
        lines.push("</div>");

        lines.push("<h2>议程</h2>");
        lines.push("<table>");
        lines.push("<tr><th>序号</th><th>时间</th><th>议题</th><th>负责人</th><th>类型</th></tr>");

        agendaItems.forEach(function (item, index) {
          var timeStr = formatTimeRange(startTime, item.duration);
          lines.push(
            "<tr><td>" +
              (index + 1) +
              "</td><td>" +
              escapeHtml(timeStr) +
              "</td><td>" +
              escapeHtml(item.title || "-") +
              "</td><td>" +
              escapeHtml(item.owner || "-") +
              "</td><td>" +
              escapeHtml(getTypeLabel(item.type)) +
              "</td></tr>"
          );
          startTime += item.duration;
        });

        lines.push("</table>");
        var totalMinutes = agendaItems.reduce(function (sum, item) {
          return sum + (item.duration || 0);
        }, 0);
        lines.push("<p><strong>总时长:</strong> " + totalMinutes + " 分钟</p>");
        lines.push("</body>");
        lines.push("</html>");

        return lines.join("\n");
      }

      function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
      }

      function parseTime(timeStr) {
        if (!timeStr) return 0;
        var parts = timeStr.split(":");
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }

      function formatTimeRange(startMinutes, duration) {
        var startHour = Math.floor(startMinutes / 60) % 24;
        var startMin = startMinutes % 60;
        var endMinutes = startMinutes + duration;
        var endHour = Math.floor(endMinutes / 60) % 24;
        var endMin = endMinutes % 60;

        return (
          String(startHour).padStart(2, "0") +
          ":" +
          String(startMin).padStart(2, "0") +
          "-" +
          String(endHour).padStart(2, "0") +
          ":" +
          String(endMin).padStart(2, "0")
        );
      }

      function switchTab(format, btn) {
        currentFormat = format;
        document.querySelectorAll(".tab").forEach(function (tab) {
          tab.classList.remove("active");
        });
        btn.classList.add("active");
        updatePreview();
      }

      function updatePreview() {
        var content = "";
        switch (currentFormat) {
          case "markdown":
            content = generateMarkdown();
            break;
          case "text":
            content = generateText();
            break;
          case "html":
            content = generateHTML();
            break;
        }
        document.getElementById("preview").textContent = content;
      }

      function copyToClipboard() {
        var content = document.getElementById("preview").textContent;
        navigator.clipboard
          .writeText(content)
          .then(function () {
            showToast("已复制到剪贴板");
          })
          .catch(function () {
            showToast("复制失败");
          });
      }

      function downloadFile() {
        var content = document.getElementById("preview").textContent;
        var info = getMeetingInfo();
        var extensions = { markdown: "md", text: "txt", html: "html" };
        var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = (info.title || "会议议程") + "." + extensions[currentFormat];
        a.click();
        URL.revokeObjectURL(url);
      }

      function shareLink() {
        var data = {
          title: document.getElementById("meetingTitle").value,
          date: document.getElementById("meetingDate").value,
          time: document.getElementById("meetingTime").value,
          location: document.getElementById("meetingLocation").value,
          host: document.getElementById("meetingHost").value,
          attendees: document.getElementById("meetingAttendees").value,
          items: agendaItems
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

      function loadFromUrl() {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var data = JSON.parse(decodeURIComponent(atob(hash)));
          document.getElementById("meetingTitle").value = data.title || "";
          document.getElementById("meetingDate").value = data.date || "";
          document.getElementById("meetingTime").value = data.time || "14:00";
          document.getElementById("meetingLocation").value = data.location || "";
          document.getElementById("meetingHost").value = data.host || "";
          document.getElementById("meetingAttendees").value = data.attendees || "";
          if (data.items) agendaItems = data.items;
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToStorage() {
        var data = {
          title: document.getElementById("meetingTitle").value,
          date: document.getElementById("meetingDate").value,
          time: document.getElementById("meetingTime").value,
          location: document.getElementById("meetingLocation").value,
          host: document.getElementById("meetingHost").value,
          attendees: document.getElementById("meetingAttendees").value,
          items: agendaItems
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            var data = JSON.parse(saved);
            document.getElementById("meetingTitle").value = data.title || "";
            document.getElementById("meetingDate").value = data.date || "";
            document.getElementById("meetingTime").value = data.time || "14:00";
            document.getElementById("meetingLocation").value = data.location || "";
            document.getElementById("meetingHost").value = data.host || "";
            document.getElementById("meetingAttendees").value = data.attendees || "";
            if (data.items) agendaItems = data.items;
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
    
