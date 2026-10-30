// @ts-nocheck
// Generated from tools/health/menstrual-cycle.html
// Source SHA-256: d115378cc8ff49268fa7c6fd9669035d207d8e6d0aaf661bd7e377b091ee0254
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "menstrual_data";
      let data = { periods: [], cycleLength: 28, periodLength: 5 };
      let viewMonth = new Date();

      function loadData() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          data = JSON.parse(saved);
        }
        document.getElementById("periodLength").value = data.periodLength || 5;
      }

      function saveData() {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function addPeriod() {
        const dateInput = document.getElementById("periodDate").value;
        const length = parseInt(document.getElementById("periodLength").value) || 5;

        if (!dateInput) {
          alert("请选择日期");
          return;
        }

        const exists = data.periods.find((p) => p.date === dateInput);
        if (exists) {
          alert("该日期已记录");
          return;
        }

        data.periods.push({ date: dateInput, length: length });
        data.periods.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.periodLength = length;

        if (data.periods.length >= 2) {
          const cycles = [];
          for (let i = 0; i < data.periods.length - 1; i++) {
            const diff =
              (new Date(data.periods[i].date) - new Date(data.periods[i + 1].date)) /
              (1000 * 60 * 60 * 24);
            if (diff > 0 && diff < 60) cycles.push(diff);
          }
          if (cycles.length > 0) {
            data.cycleLength = Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length);
          }
        }

        saveData();
        render();
      }

      function deletePeriod(date) {
        data.periods = data.periods.filter((p) => p.date !== date);
        saveData();
        render();
      }

      function clearData() {
        if (confirm("确定要清除所有数据吗？")) {
          data = { periods: [], cycleLength: 28, periodLength: 5 };
          saveData();
          render();
        }
      }

      function changeMonth(delta) {
        viewMonth.setMonth(viewMonth.getMonth() + delta);
        renderCalendar();
      }

      function formatDate(date) {
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      }

      function render() {
        renderPredictions();
        renderCalendar();
        renderHistory();
        renderPhases();
      }

      function renderPredictions() {
        if (data.periods.length === 0) {
          document.getElementById("nextPeriod").textContent = "-";
          document.getElementById("countdown").textContent = "请记录月经开始日期";
          document.getElementById("avgCycle").textContent = "-";
          document.getElementById("avgLength").textContent = "-";
          return;
        }

        const lastPeriod = new Date(data.periods[0].date);
        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(nextPeriod.getDate() + data.cycleLength);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysUntil = Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24));

        document.getElementById("nextPeriod").textContent = formatDate(nextPeriod);
        document.getElementById("countdown").textContent =
          daysUntil > 0
            ? "还有 " + daysUntil + " 天"
            : daysUntil === 0
              ? "今天"
              : "已延迟 " + Math.abs(daysUntil) + " 天";
        document.getElementById("avgCycle").textContent = data.cycleLength + "天";

        const avgLength = data.periods.reduce((a, b) => a + b.length, 0) / data.periods.length;
        document.getElementById("avgLength").textContent = Math.round(avgLength) + "天";
      }

      function renderCalendar() {
        const container = document.getElementById("calendarDays");
        container.textContent = "";

        const year = viewMonth.getFullYear();
        const month = viewMonth.getMonth();
        document.getElementById("currentMonth").textContent = year + "年" + (month + 1) + "月";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // 计算标记日期
        const periodDays = new Set();
        const fertileDays = new Set();
        const ovulationDays = new Set();

        if (data.periods.length > 0) {
          const lastPeriod = new Date(data.periods[0].date);

          // 标记实际经期
          data.periods.forEach((p) => {
            const start = new Date(p.date);
            for (let i = 0; i < p.length; i++) {
              const d = new Date(start);
              d.setDate(d.getDate() + i);
              periodDays.add(d.toISOString().split("T")[0]);
            }
          });

          // 预测下次经期和排卵
          for (let cycle = 0; cycle < 3; cycle++) {
            const nextPeriodStart = new Date(lastPeriod);
            nextPeriodStart.setDate(nextPeriodStart.getDate() + data.cycleLength * (cycle + 1));

            for (let i = 0; i < data.periodLength; i++) {
              const d = new Date(nextPeriodStart);
              d.setDate(d.getDate() + i);
              periodDays.add(d.toISOString().split("T")[0]);
            }

            // 排卵日（下次月经前14天）
            const ovulation = new Date(nextPeriodStart);
            ovulation.setDate(ovulation.getDate() - 14);
            ovulationDays.add(ovulation.toISOString().split("T")[0]);

            // 易孕期（排卵前5天到排卵后1天）
            for (let i = -5; i <= 1; i++) {
              const d = new Date(ovulation);
              d.setDate(d.getDate() + i);
              if (i !== 0) fertileDays.add(d.toISOString().split("T")[0]);
            }
          }
        }

        // 空白天
        for (let i = 0; i < firstDay; i++) {
          const div = document.createElement("div");
          div.className = "calendar-day empty";
          container.appendChild(div);
        }

        // 日期
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const dateStr = date.toISOString().split("T")[0];
          const div = document.createElement("div");
          div.className = "calendar-day";
          div.textContent = day;

          if (date.toDateString() === today.toDateString()) {
            div.classList.add("today");
          }
          if (periodDays.has(dateStr)) {
            div.classList.add("period");
          } else if (ovulationDays.has(dateStr)) {
            div.classList.add("ovulation");
          } else if (fertileDays.has(dateStr)) {
            div.classList.add("fertile");
          }

          container.appendChild(div);
        }
      }

      function renderHistory() {
        const container = document.getElementById("history");
        container.textContent = "";

        if (data.periods.length === 0) {
          const div = document.createElement("div");
          div.style.cssText = "text-align: center; color: var(--text-secondary); padding: 20px;";
          div.textContent = "暂无记录";
          container.appendChild(div);
          return;
        }

        data.periods.slice(0, 6).forEach((p, i) => {
          const div = document.createElement("div");
          div.className = "history-item";

          const left = document.createElement("div");
          const dateDiv = document.createElement("div");
          dateDiv.className = "date";
          dateDiv.textContent = p.date + " (" + p.length + "天)";

          const cycleDiv = document.createElement("div");
          cycleDiv.className = "cycle";
          if (i < data.periods.length - 1) {
            const diff = Math.round(
              (new Date(p.date) - new Date(data.periods[i + 1].date)) / (1000 * 60 * 60 * 24)
            );
            cycleDiv.textContent = "周期: " + diff + "天";
          }
          left.appendChild(dateDiv);
          left.appendChild(cycleDiv);

          const deleteBtn = document.createElement("span");
          deleteBtn.className = "delete";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = () => deletePeriod(p.date);

          div.appendChild(left);
          div.appendChild(deleteBtn);
          container.appendChild(div);
        });
      }

      function renderPhases() {
        const container = document.getElementById("phases");
        container.textContent = "";

        if (data.periods.length === 0) return;

        const lastPeriod = new Date(data.periods[0].date);
        const today = new Date();
        const dayInCycle =
          Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24)) % data.cycleLength;

        const phases = [
          {
            name: "月经期",
            class: "menstrual",
            start: 0,
            end: data.periodLength - 1,
            desc: "子宫内膜脱落，注意保暖休息"
          },
          {
            name: "卵泡期",
            class: "follicular",
            start: data.periodLength,
            end: data.cycleLength - 17,
            desc: "卵泡发育，精力逐渐充沛"
          },
          {
            name: "排卵期",
            class: "ovulation",
            start: data.cycleLength - 16,
            end: data.cycleLength - 12,
            desc: "排卵发生，易孕期"
          },
          {
            name: "黄体期",
            class: "luteal",
            start: data.cycleLength - 11,
            end: data.cycleLength - 1,
            desc: "黄体形成，可能出现经前综合征"
          }
        ];

        phases.forEach((phase) => {
          const div = document.createElement("div");
          div.className = "phase " + phase.class;
          if (dayInCycle >= phase.start && dayInCycle <= phase.end) {
            div.style.border = "2px solid white";
          } else {
            div.style.opacity = "0.6";
          }

          const nameDiv = document.createElement("div");
          nameDiv.className = "name";
          nameDiv.textContent =
            phase.name + (dayInCycle >= phase.start && dayInCycle <= phase.end ? " (当前)" : "");

          const datesDiv = document.createElement("div");
          datesDiv.className = "dates";
          datesDiv.textContent = "第" + (phase.start + 1) + "-" + (phase.end + 1) + "天";

          const descDiv = document.createElement("div");
          descDiv.className = "desc";
          descDiv.textContent = phase.desc;

          div.appendChild(nameDiv);
          div.appendChild(datesDiv);
          div.appendChild(descDiv);
          container.appendChild(div);
        });
      }

      // 初始化
      document.getElementById("periodDate").value = new Date().toISOString().split("T")[0];
      loadData();
      render();

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
    
