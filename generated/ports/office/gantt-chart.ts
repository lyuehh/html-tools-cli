// @ts-nocheck
// Generated from tools/office/gantt-chart.html
// Source SHA-256: 75da280d0f4228aff4350c3dff5dfa72e9e8ef0d526684fa4bd885d03f7d4bfe
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "gantt_chart_data_v1";
      const COLORS = [
        "#00d4aa",
        "#8b5cf6",
        "#3b82f6",
        "#f59e0b",
        "#ef4444",
        "#ec4899",
        "#14b8a6",
        "#f97316"
      ];
      let colorIndex = 0;

      let projectData = {
        name: "",
        tasks: []
      };

      const projectNameInput = document.getElementById("projectName");
      const taskNameInput = document.getElementById("taskName");
      const startDateInput = document.getElementById("startDate");
      const endDateInput = document.getElementById("endDate");
      const taskColorInput = document.getElementById("taskColor");
      const scaleSelect = document.getElementById("scaleSelect");
      const ganttContainer = document.getElementById("ganttContainer");
      const ganttWrapper = document.getElementById("ganttWrapper");
      const emptyState = document.getElementById("emptyState");
      const statusEl = document.getElementById("status");
      const taskCountEl = document.getElementById("taskCount");

      const MONTHS = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ];

      function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      }

      function getNextColor() {
        const color = COLORS[colorIndex % COLORS.length];
        colorIndex++;
        return color;
      }

      function parseDate(dateStr) {
        return new Date(dateStr + "T00:00:00");
      }

      function formatDate(date) {
        return date.toISOString().split("T")[0];
      }

      function getDaysBetween(start, end) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round((end - start) / oneDay) + 1;
      }

      function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

      function isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6;
      }

      function getTimelineRange() {
        if (projectData.tasks.length === 0) return null;

        let minDate = parseDate(projectData.tasks[0].startDate);
        let maxDate = parseDate(projectData.tasks[0].endDate);

        projectData.tasks.forEach(function (task) {
          const start = parseDate(task.startDate);
          const end = parseDate(task.endDate);
          if (start < minDate) minDate = start;
          if (end > maxDate) maxDate = end;
        });

        minDate = addDays(minDate, -2);
        maxDate = addDays(maxDate, 2);

        return { start: minDate, end: maxDate };
      }

      function createDeleteIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "14");
        svg.setAttribute("height", "14");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");

        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", "18");
        line1.setAttribute("y1", "6");
        line1.setAttribute("x2", "6");
        line1.setAttribute("y2", "18");

        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", "6");
        line2.setAttribute("y1", "6");
        line2.setAttribute("x2", "18");
        line2.setAttribute("y2", "18");

        svg.appendChild(line1);
        svg.appendChild(line2);
        return svg;
      }

      function renderGantt() {
        if (projectData.tasks.length === 0) {
          emptyState.style.display = "flex";
          ganttWrapper.style.display = "none";
          taskCountEl.textContent = "共 0 个任务";
          return;
        }

        emptyState.style.display = "none";
        ganttWrapper.style.display = "flex";
        taskCountEl.textContent = "共 " + projectData.tasks.length + " 个任务";

        const range = getTimelineRange();
        const scale = scaleSelect.value;
        const cellWidth = scale === "week" ? 100 : 40;
        const totalDays = getDaysBetween(range.start, range.end);

        let dates = [];
        for (let i = 0; i < totalDays; i++) {
          dates.push(addDays(range.start, i));
        }

        let weeks = [];
        if (scale === "week") {
          let currentWeek = null;
          dates.forEach(function (date) {
            const weekStart = new Date(date);
            weekStart.setDate(date.getDate() - date.getDay());
            const weekKey = formatDate(weekStart);
            if (!currentWeek || currentWeek.key !== weekKey) {
              currentWeek = { key: weekKey, start: weekStart, dates: [] };
              weeks.push(currentWeek);
            }
            currentWeek.dates.push(date);
          });
        }

        // Clear previous content
        while (ganttWrapper.firstChild) {
          ganttWrapper.removeChild(ganttWrapper.firstChild);
        }

        // Build task list
        const taskList = document.createElement("div");
        taskList.className = "task-list";

        const taskListHeader = document.createElement("div");
        taskListHeader.className = "task-list-header";
        taskListHeader.textContent = "任务";
        taskList.appendChild(taskListHeader);

        projectData.tasks.forEach(function (task) {
          const taskItem = document.createElement("div");
          taskItem.className = "task-item";
          taskItem.dataset.id = task.id;

          const taskName = document.createElement("span");
          taskName.className = "task-name";
          taskName.textContent = task.name;
          taskName.title = task.name;

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "task-delete";
          deleteBtn.title = "删除任务";
          deleteBtn.appendChild(createDeleteIcon());
          deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
          });

          taskItem.appendChild(taskName);
          taskItem.appendChild(deleteBtn);
          taskList.appendChild(taskItem);
        });

        // Build timeline
        const timeline = document.createElement("div");
        timeline.className = "timeline";

        const timelineHeader = document.createElement("div");
        timelineHeader.className = "timeline-header";

        if (scale === "week") {
          weeks.forEach(function (week) {
            const cell = document.createElement("div");
            cell.className = "timeline-cell";
            cell.style.minWidth = cellWidth + "px";

            const weekNum = Math.ceil(
              (week.start.getDate() +
                new Date(week.start.getFullYear(), week.start.getMonth(), 1).getDay()) /
                7
            );

            const daySpan = document.createElement("span");
            daySpan.className = "day";
            daySpan.textContent = "第" + weekNum + "周";

            const monthSpan = document.createElement("span");
            monthSpan.className = "month";
            monthSpan.textContent = MONTHS[week.start.getMonth()];

            cell.appendChild(daySpan);
            cell.appendChild(monthSpan);
            timelineHeader.appendChild(cell);
          });
        } else {
          dates.forEach(function (date) {
            const cell = document.createElement("div");
            cell.className = "timeline-cell" + (isWeekend(date) ? " weekend" : "");
            cell.style.minWidth = cellWidth + "px";

            const daySpan = document.createElement("span");
            daySpan.className = "day";
            daySpan.textContent = date.getDate();

            const monthSpan = document.createElement("span");
            monthSpan.className = "month";
            monthSpan.textContent = MONTHS[date.getMonth()];

            cell.appendChild(daySpan);
            cell.appendChild(monthSpan);
            timelineHeader.appendChild(cell);
          });
        }

        timeline.appendChild(timelineHeader);

        // Timeline rows container
        const rowsContainer = document.createElement("div");
        rowsContainer.style.position = "relative";

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        projectData.tasks.forEach(function (task) {
          const row = document.createElement("div");
          row.className = "timeline-row";

          if (scale === "week") {
            weeks.forEach(function () {
              const cell = document.createElement("div");
              cell.className = "timeline-row-cell";
              cell.style.minWidth = cellWidth + "px";
              row.appendChild(cell);
            });

            const taskStart = parseDate(task.startDate);
            const taskEnd = parseDate(task.endDate);
            let barStart = 0;
            let barWidth = 0;

            weeks.forEach(function (week, index) {
              const weekEnd = addDays(week.start, 6);
              if (taskStart <= weekEnd && taskEnd >= week.start) {
                if (barWidth === 0) barStart = index * cellWidth;
                barWidth += cellWidth;
              }
            });

            const taskBar = document.createElement("div");
            taskBar.className = "task-bar";
            taskBar.style.left = barStart + "px";
            taskBar.style.width = barWidth + "px";
            taskBar.style.background = task.color;
            taskBar.title = task.name + ": " + task.startDate + " - " + task.endDate;
            taskBar.textContent = task.name;
            row.appendChild(taskBar);
          } else {
            dates.forEach(function (date) {
              const cell = document.createElement("div");
              cell.className = "timeline-row-cell" + (isWeekend(date) ? " weekend" : "");
              cell.style.minWidth = cellWidth + "px";
              row.appendChild(cell);
            });

            const taskStart = parseDate(task.startDate);
            const taskEnd = parseDate(task.endDate);
            const startDiff = getDaysBetween(range.start, taskStart) - 1;
            const duration = getDaysBetween(taskStart, taskEnd);
            const barStart = startDiff * cellWidth;
            const barWidth = duration * cellWidth;

            const taskBar = document.createElement("div");
            taskBar.className = "task-bar";
            taskBar.style.left = barStart + "px";
            taskBar.style.width = barWidth + "px";
            taskBar.style.background = task.color;
            taskBar.title = task.name + ": " + task.startDate + " - " + task.endDate;
            taskBar.textContent = task.name;
            row.appendChild(taskBar);
          }

          rowsContainer.appendChild(row);
        });

        // Today marker for day view
        if (scale === "day" && today >= range.start && today <= range.end) {
          const todayOffset = getDaysBetween(range.start, today) - 1;
          const markerLeft = todayOffset * cellWidth + cellWidth / 2;

          const marker = document.createElement("div");
          marker.className = "today-marker";
          marker.style.left = markerLeft + "px";
          rowsContainer.appendChild(marker);
        }

        timeline.appendChild(rowsContainer);
        ganttWrapper.appendChild(taskList);
        ganttWrapper.appendChild(timeline);
      }

      function addTask() {
        const name = taskNameInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const color = taskColorInput.value;

        if (!name) {
          showStatus("请输入任务名称", "error");
          taskNameInput.focus();
          return;
        }

        if (!startDate || !endDate) {
          showStatus("请选择日期", "error");
          return;
        }

        if (parseDate(startDate) > parseDate(endDate)) {
          showStatus("结束日期必须晚于开始日期", "error");
          return;
        }

        const task = {
          id: generateId(),
          name: name,
          startDate: startDate,
          endDate: endDate,
          color: color
        };

        projectData.tasks.push(task);
        saveToStorage();
        renderGantt();

        taskNameInput.value = "";
        taskColorInput.value = getNextColor();
        showStatus("任务已添加", "success");
      }

      function deleteTask(id) {
        projectData.tasks = projectData.tasks.filter(function (t) {
          return t.id !== id;
        });
        saveToStorage();
        renderGantt();
        showStatus("任务已删除", "success");
      }

      function clearAll() {
        if (projectData.tasks.length > 0 && !confirm("确定要清空所有任务吗？")) {
          return;
        }
        projectData = { name: "", tasks: [] };
        projectNameInput.value = "";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        renderGantt();
        showStatus("已清空", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        if (type === "success") {
          setTimeout(function () {
            statusEl.textContent = "";
            statusEl.className = "status";
          }, 2000);
        }
      }

      function saveToStorage() {
        projectData.name = projectNameInput.value.trim();
        localStorage.setItem(LS_KEY, JSON.stringify(projectData));
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          try {
            projectData = JSON.parse(saved);
            projectNameInput.value = projectData.name || "";
          } catch (e) {
            projectData = { name: "", tasks: [] };
          }
        }
      }

      function saveToUrl() {
        try {
          const data = JSON.stringify(projectData);
          if (data.length > 4000) return;
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(data)));
        } catch (e) {
          // Ignore errors
        }
      }

      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          const data = JSON.parse(decodeURIComponent(atob(hash)));
          projectData = data;
          projectNameInput.value = projectData.name || "";
          return true;
        } catch (e) {
          return false;
        }
      };

      function exportAsImage() {
        showStatus("正在生成图片...", "");

        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const range = getTimelineRange();
          if (!range) {
            showStatus("没有任务可导出", "error");
            return;
          }

          const scale = scaleSelect.value;
          const cellWidth = scale === "week" ? 100 : 40;
          const totalDays = getDaysBetween(range.start, range.end);
          const taskListWidth = 200;
          const headerHeight = 60;
          const rowHeight = 40;
          const titleHeight = projectData.name ? 50 : 0;

          let timelineCols = totalDays;
          if (scale === "week") {
            const weekSet = new Set();
            for (let i = 0; i < totalDays; i++) {
              const date = addDays(range.start, i);
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              weekSet.add(formatDate(weekStart));
            }
            timelineCols = weekSet.size;
          }

          const timelineWidth = timelineCols * cellWidth;
          const canvasWidth = taskListWidth + timelineWidth;
          const canvasHeight = titleHeight + headerHeight + projectData.tasks.length * rowHeight;

          canvas.width = canvasWidth * 2;
          canvas.height = canvasHeight * 2;
          ctx.scale(2, 2);

          const isDark = document.documentElement.getAttribute("data-theme") !== "light";
          ctx.fillStyle = isDark ? "#0a0a0f" : "#f8fafc";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          if (projectData.name) {
            ctx.fillStyle = isDark ? "#f5f5f7" : "#0f172a";
            ctx.font = "bold 18px Inter, sans-serif";
            ctx.fillText(projectData.name, 16, 32);
          }

          const offsetY = titleHeight;

          ctx.fillStyle = isDark ? "#242430" : "#f1f5f9";
          ctx.fillRect(0, offsetY, taskListWidth, headerHeight);
          ctx.fillStyle = isDark ? "#71717a" : "#94a3b8";
          ctx.font = "600 11px JetBrains Mono, monospace";
          ctx.fillText("任务", 16, offsetY + 35);

          ctx.fillStyle = isDark ? "#242430" : "#f1f5f9";
          ctx.fillRect(taskListWidth, offsetY, timelineWidth, headerHeight);

          if (scale === "week") {
            const weeks = [];
            for (let i = 0; i < totalDays; i++) {
              const date = addDays(range.start, i);
              const weekStart = new Date(date);
              weekStart.setDate(date.getDate() - date.getDay());
              const weekKey = formatDate(weekStart);
              if (!weeks.length || weeks[weeks.length - 1].key !== weekKey) {
                weeks.push({ key: weekKey, start: weekStart });
              }
            }

            weeks.forEach(function (week, index) {
              const x = taskListWidth + index * cellWidth;
              const weekNum = Math.ceil(
                (week.start.getDate() +
                  new Date(week.start.getFullYear(), week.start.getMonth(), 1).getDay()) /
                  7
              );

              ctx.fillStyle = isDark ? "#a1a1aa" : "#475569";
              ctx.font = "600 11px JetBrains Mono, monospace";
              ctx.fillText("第" + weekNum + "周", x + 10, offsetY + 30);
              ctx.fillStyle = isDark ? "#71717a" : "#94a3b8";
              ctx.font = "10px JetBrains Mono, monospace";
              ctx.fillText(MONTHS[week.start.getMonth()], x + 10, offsetY + 45);

              ctx.strokeStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
              ctx.beginPath();
              ctx.moveTo(x, offsetY);
              ctx.lineTo(x, canvasHeight);
              ctx.stroke();
            });
          } else {
            for (let i = 0; i < totalDays; i++) {
              const date = addDays(range.start, i);
              const x = taskListWidth + i * cellWidth;
              const weekend = isWeekend(date);

              if (weekend) {
                ctx.fillStyle = isDark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.05)";
                ctx.fillRect(x, offsetY, cellWidth, canvasHeight - offsetY);
              }

              ctx.fillStyle = isDark ? "#a1a1aa" : "#475569";
              ctx.font = "600 11px JetBrains Mono, monospace";
              ctx.fillText(date.getDate().toString(), x + 12, offsetY + 30);
              ctx.fillStyle = isDark ? "#71717a" : "#94a3b8";
              ctx.font = "10px JetBrains Mono, monospace";
              ctx.fillText(MONTHS[date.getMonth()], x + 8, offsetY + 45);

              ctx.strokeStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
              ctx.beginPath();
              ctx.moveTo(x, offsetY);
              ctx.lineTo(x, canvasHeight);
              ctx.stroke();
            }
          }

          projectData.tasks.forEach(function (task, index) {
            const y = offsetY + headerHeight + index * rowHeight;

            ctx.fillStyle = isDark ? "#f5f5f7" : "#0f172a";
            ctx.font = "14px Inter, sans-serif";
            const displayName =
              task.name.length > 20 ? task.name.substring(0, 20) + "..." : task.name;
            ctx.fillText(displayName, 16, y + 25);

            ctx.strokeStyle = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
            ctx.beginPath();
            ctx.moveTo(0, y + rowHeight);
            ctx.lineTo(canvasWidth, y + rowHeight);
            ctx.stroke();

            const taskStart = parseDate(task.startDate);
            const taskEnd = parseDate(task.endDate);
            let barStart, barWidth;

            if (scale === "week") {
              const weeks = [];
              for (let i = 0; i < totalDays; i++) {
                const date = addDays(range.start, i);
                const weekStart = new Date(date);
                weekStart.setDate(date.getDate() - date.getDay());
                const weekKey = formatDate(weekStart);
                if (!weeks.length || weeks[weeks.length - 1].key !== weekKey) {
                  weeks.push({ key: weekKey, start: weekStart });
                }
              }

              barStart = 0;
              barWidth = 0;
              weeks.forEach(function (week, idx) {
                const weekEnd = addDays(week.start, 6);
                if (taskStart <= weekEnd && taskEnd >= week.start) {
                  if (barWidth === 0) barStart = idx * cellWidth;
                  barWidth += cellWidth;
                }
              });
            } else {
              const startDiff = getDaysBetween(range.start, taskStart) - 1;
              const duration = getDaysBetween(taskStart, taskEnd);
              barStart = startDiff * cellWidth;
              barWidth = duration * cellWidth;
            }

            ctx.fillStyle = task.color;
            ctx.beginPath();
            ctx.roundRect(taskListWidth + barStart, y + 6, barWidth, 28, 4);
            ctx.fill();

            ctx.fillStyle = "#fff";
            ctx.font = "500 12px Inter, sans-serif";
            const barText =
              task.name.length > barWidth / 8
                ? task.name.substring(0, Math.floor(barWidth / 8)) + "..."
                : task.name;
            ctx.fillText(barText, taskListWidth + barStart + 8, y + 24);
          });

          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
          ctx.beginPath();
          ctx.moveTo(taskListWidth, offsetY);
          ctx.lineTo(taskListWidth, canvasHeight);
          ctx.stroke();

          const link = document.createElement("a");
          const fileName = projectData.name ? projectData.name + "-gantt.png" : "gantt-chart.png";
          link.download = fileName;
          link.href = canvas.toDataURL("image/png");
          link.click();

          showStatus("图片已导出", "success");
        } catch (e) {
          showStatus("导出失败: " + e.message, "error");
        }
      }

      function shareUrl() {
        saveToUrl();
        navigator.clipboard
          .writeText(location.href)
          .then(function () {
            showStatus("链接已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      document.getElementById("btnAddTask").addEventListener("click", addTask);
      document.getElementById("btnExport").addEventListener("click", exportAsImage);
      document.getElementById("btnPrint").addEventListener("click", function () {
        window.print();
      });
      document.getElementById("btnShare").addEventListener("click", shareUrl);
      document.getElementById("btnClear").addEventListener("click", clearAll);

      projectNameInput.addEventListener("input", function () {
        saveToStorage();
        saveToUrl();
      });

      scaleSelect.addEventListener("change", renderGantt);

      taskNameInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") addTask();
      });

      const today = new Date();
      startDateInput.value = formatDate(today);
      endDateInput.value = formatDate(addDays(today, 7));
      taskColorInput.value = getNextColor();

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
        if (!localStorage.getItem("theme")) {
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        }
      });

      initTheme();
      if (!loadFromUrl()) loadFromStorage();
      renderGantt();
    
