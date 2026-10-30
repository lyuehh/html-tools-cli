// @ts-nocheck
// Generated from tools/office/work-hours.html
// Source SHA-256: c8ff78c2264341266f68c52cd13cddf47ec7aab180399470e7bb32b4508c524a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let records = JSON.parse(localStorage.getItem("work_records") || "[]");

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

        document
          .querySelector(`.tab:nth-child(${tab === "calc" ? 1 : tab === "records" ? 2 : 3})`)
          .classList.add("active");
        document.getElementById(tab + "Tab").classList.add("active");

        if (tab === "records") renderRecords();
        if (tab === "salary") calculateSalary();
      }

      function setQuickTime(start, end) {
        document.getElementById("startTime").value = start;
        document.getElementById("endTime").value = end;
        calculateHours();
      }

      function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      }

      function calculateHours() {
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const lunchBreak = parseFloat(document.getElementById("lunchBreak").value) || 0;
        const standardHours = parseFloat(document.getElementById("standardHours").value) || 8;

        let startMinutes = timeToMinutes(startTime);
        let endMinutes = timeToMinutes(endTime);

        // Handle overnight work
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60;
        }

        const totalMinutes = endMinutes - startMinutes - lunchBreak * 60;
        const totalHours = totalMinutes / 60;
        const overtime = Math.max(0, totalHours - standardHours);

        document.getElementById("totalHours").textContent = totalHours.toFixed(1) + " 小时";
        document.getElementById("overtimeHours").textContent = overtime.toFixed(1) + " 小时";

        const statusEl = document.getElementById("workStatus");
        if (overtime > 0) {
          statusEl.textContent = "加班中";
          statusEl.style.color = "var(--accent-orange)";
        } else if (totalHours < standardHours) {
          statusEl.textContent = "工时不足";
          statusEl.style.color = "var(--color-accent-cyan)";
        } else {
          statusEl.textContent = "正常";
          statusEl.style.color = "var(--accent-green)";
        }

        return { totalHours, overtime };
      }

      function saveRecord() {
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const { totalHours, overtime } = calculateHours();

        const today = new Date().toISOString().split("T")[0];

        // Check if record for today already exists
        const existingIndex = records.findIndex((r) => r.date === today);
        if (existingIndex >= 0) {
          if (!confirm("今日已有记录，是否覆盖？")) return;
          records[existingIndex] = { date: today, startTime, endTime, totalHours, overtime };
        } else {
          records.push({ date: today, startTime, endTime, totalHours, overtime });
        }

        records.sort((a, b) => b.date.localeCompare(a.date));
        localStorage.setItem("work_records", JSON.stringify(records));
        alert("打卡记录已保存！");
      }

      function deleteRecord(index) {
        records.splice(index, 1);
        localStorage.setItem("work_records", JSON.stringify(records));
        renderRecords();
      }

      function clearRecords() {
        if (confirm("确定要清空所有打卡记录吗？")) {
          records = [];
          localStorage.removeItem("work_records");
          renderRecords();
        }
      }

      function renderRecords() {
        const list = document.getElementById("recordsList");
        const summary = document.getElementById("weeklySummary");

        if (records.length === 0) {
          list.innerHTML = '<div class="empty-state">暂无打卡记录</div>';
          summary.style.display = "none";
          return;
        }

        list.innerHTML = records
          .slice(0, 14)
          .map((r, i) => {
            const date = new Date(r.date);
            const weekday = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
            return `
          <div class="record-item">
            <span class="record-date">${r.date.slice(5)}<br>周${weekday}</span>
            <span class="record-times">${r.startTime} - ${r.endTime}</span>
            <span class="record-hours ${r.overtime > 0 ? "overtime" : ""}">${r.totalHours.toFixed(1)}h</span>
            <button class="delete-btn" onclick="deleteRecord(${i})" aria-label="×">×</button>
          </div>
        `;
          })
          .join("");

        // Calculate weekly summary (last 7 days)
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekRecords = records.filter((r) => new Date(r.date) >= weekAgo);

        if (weekRecords.length > 0) {
          const totalHours = weekRecords.reduce((sum, r) => sum + r.totalHours, 0);
          const totalOvertime = weekRecords.reduce((sum, r) => sum + r.overtime, 0);

          document.getElementById("weeklyTotal").textContent = totalHours.toFixed(1) + " 小时";
          document.getElementById("weeklyOvertime").textContent =
            totalOvertime.toFixed(1) + " 小时";
          document.getElementById("dailyAverage").textContent =
            (totalHours / weekRecords.length).toFixed(1) + " 小时";
          summary.style.display = "block";
        } else {
          summary.style.display = "none";
        }
      }

      function calculateSalary() {
        const monthly = parseFloat(document.getElementById("monthlySalary").value) || 0;
        const workDays = parseFloat(document.getElementById("workDays").value) || 22;
        const dailyHours = parseFloat(document.getElementById("dailyHours").value) || 8;
        const overtimeRate = parseFloat(document.getElementById("overtimeRate").value) || 1.5;

        const daily = monthly / workDays;
        const hourly = daily / dailyHours;
        const overtimeHourly = hourly * overtimeRate;
        const minute = hourly / 60;

        document.getElementById("dailySalary").textContent = "¥" + daily.toFixed(2);
        document.getElementById("hourlySalary").textContent = "¥" + hourly.toFixed(2);
        document.getElementById("overtimeSalary").textContent = "¥" + overtimeHourly.toFixed(2);
        document.getElementById("minuteSalary").textContent = "¥" + minute.toFixed(2);
      }

      // Initialize
      calculateHours();
      calculateSalary();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
