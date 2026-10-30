// @ts-nocheck
// Generated from tools/office/work-log.html
// Source SHA-256: 25c0e36906e2f89c9749eccf74e4b6ae383aa9a60eadeb2a5c48fa196385a60a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "work_log_data_v1";

      const dateInput = document.getElementById("dateInput");
      const entryForm = document.getElementById("entryForm");
      const entryTime = document.getElementById("entryTime");
      const entryDesc = document.getElementById("entryDesc");
      const entryDuration = document.getElementById("entryDuration");
      const entriesBody = document.getElementById("entriesBody");
      const emptyState = document.getElementById("emptyState");
      const totalHoursEl = document.getElementById("totalHours");
      const entryCountEl = document.getElementById("entryCount");
      const statusEl = document.getElementById("status");

      let allData = {};
      let currentDate = "";

      function formatDate(date) {
        return date.toISOString().split("T")[0];
      }

      function formatDisplayDate(dateStr) {
        const d = new Date(dateStr);
        const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return dateStr + " " + weekdays[d.getDay()];
      }

      function loadData() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            allData = JSON.parse(saved);
          }
        } catch (e) {
          allData = {};
        }
      }

      function saveData() {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(allData));
        } catch (e) {
          showStatus("保存失败", "error");
        }
      }

      function getEntriesForDate(dateStr) {
        return allData[dateStr] || [];
      }

      function setEntriesForDate(dateStr, entries) {
        if (entries.length === 0) {
          delete allData[dateStr];
        } else {
          allData[dateStr] = entries;
        }
        saveData();
      }

      function createDeleteIcon() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

      function renderEntries() {
        const entries = getEntriesForDate(currentDate);
        entriesBody.textContent = "";

        if (entries.length === 0) {
          emptyState.style.display = "flex";
          entriesBody.parentElement.querySelector("thead").style.display = "none";
        } else {
          emptyState.style.display = "none";
          entriesBody.parentElement.querySelector("thead").style.display = "";

          entries
            .sort(function (a, b) {
              return a.time.localeCompare(b.time);
            })
            .forEach(function (entry, index) {
              const tr = document.createElement("tr");

              const tdTime = document.createElement("td");
              tdTime.className = "time-col";
              tdTime.textContent = entry.time;

              const tdDesc = document.createElement("td");
              tdDesc.textContent = entry.description;

              const tdDuration = document.createElement("td");
              tdDuration.className = "duration-col";
              tdDuration.textContent = entry.duration + "h";

              const tdAction = document.createElement("td");
              tdAction.className = "action-col";

              const deleteBtn = document.createElement("button");
              deleteBtn.className = "delete-btn";
              deleteBtn.setAttribute("data-index", index);
              deleteBtn.setAttribute("aria-label", "删除");
              deleteBtn.appendChild(createDeleteIcon());

              tdAction.appendChild(deleteBtn);

              tr.appendChild(tdTime);
              tr.appendChild(tdDesc);
              tr.appendChild(tdDuration);
              tr.appendChild(tdAction);

              entriesBody.appendChild(tr);
            });
        }

        updateSummary(entries);
      }

      function updateSummary(entries) {
        const totalHours = entries.reduce(function (sum, e) {
          return sum + e.duration;
        }, 0);
        totalHoursEl.textContent = totalHours.toFixed(2);
        entryCountEl.textContent = entries.length;
      }

      function addEntry(time, description, duration) {
        const entries = getEntriesForDate(currentDate);
        entries.push({
          id: Date.now(),
          time: time,
          description: description,
          duration: parseFloat(duration)
        });
        setEntriesForDate(currentDate, entries);
        renderEntries();
        showStatus("已添加", "success");
      }

      function deleteEntry(index) {
        const entries = getEntriesForDate(currentDate);
        entries.sort(function (a, b) {
          return a.time.localeCompare(b.time);
        });
        entries.splice(index, 1);
        setEntriesForDate(currentDate, entries);
        renderEntries();
        showStatus("已删除", "success");
      }

      function clearDay() {
        if (!confirm("确定清空 " + currentDate + " 的所有记录吗？")) return;
        setEntriesForDate(currentDate, []);
        renderEntries();
        showStatus("已清空", "success");
      }

      function exportDay() {
        const entries = getEntriesForDate(currentDate);
        if (entries.length === 0) {
          showStatus("没有记录可导出", "error");
          return;
        }

        const sorted = entries.slice().sort(function (a, b) {
          return a.time.localeCompare(b.time);
        });
        const totalHours = sorted.reduce(function (sum, e) {
          return sum + e.duration;
        }, 0);

        let text = "# 工作日志 - " + formatDisplayDate(currentDate) + "\n\n";
        text += "| 时间 | 内容 | 时长 |\n";
        text += "|------|------|------|\n";
        sorted.forEach(function (entry) {
          text += "| " + entry.time + " | " + entry.description + " | " + entry.duration + "h |\n";
        });
        text += "\n**总计:** " + totalHours.toFixed(2) + " 小时，" + sorted.length + " 条记录\n";

        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制到剪贴板 (Markdown 格式)", "success");
          })
          .catch(function () {
            const blob = new Blob([text], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "work-log-" + currentDate + ".md";
            a.click();
            URL.revokeObjectURL(url);
            showStatus("已下载", "success");
          });
      }

      function setDate(dateStr) {
        currentDate = dateStr;
        dateInput.value = dateStr;
        renderEntries();
      }

      function changeDate(delta) {
        const d = new Date(currentDate);
        d.setDate(d.getDate() + delta);
        setDate(formatDate(d));
      }

      function goToToday() {
        setDate(formatDate(new Date()));
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
        setTimeout(function () {
          statusEl.textContent = "";
          statusEl.className = "status";
        }, 2000);
      }

      function setDefaultTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(Math.floor(now.getMinutes() / 15) * 15).padStart(2, "0");
        entryTime.value = hours + ":" + minutes;
      }

      // Event Listeners
      entryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addEntry(entryTime.value, entryDesc.value.trim(), entryDuration.value);
        entryDesc.value = "";
        setDefaultTime();
        entryDesc.focus();
      });

      entriesBody.addEventListener("click", function (e) {
        const btn = e.target.closest(".delete-btn");
        if (btn) {
          const index = parseInt(btn.dataset.index, 10);
          deleteEntry(index);
        }
      });

      dateInput.addEventListener("change", function () {
        setDate(dateInput.value);
      });

      document.getElementById("prevDay").addEventListener("click", function () {
        changeDate(-1);
      });
      document.getElementById("nextDay").addEventListener("click", function () {
        changeDate(1);
      });
      document.getElementById("todayBtn").addEventListener("click", goToToday);
      document.getElementById("exportBtn").addEventListener("click", exportDay);
      document.getElementById("clearDayBtn").addEventListener("click", clearDay);

      // Keyboard shortcuts
      document.addEventListener("keydown", function (e) {
        if (e.target.tagName === "INPUT") return;
        if (e.key === "ArrowLeft") {
          changeDate(-1);
        } else if (e.key === "ArrowRight") {
          changeDate(1);
        } else if (e.key === "t" || e.key === "T") {
          goToToday();
        }
      });

      // Theme
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

      // Initialize
      initTheme();
      loadData();
      setDate(formatDate(new Date()));
      setDefaultTime();
    
