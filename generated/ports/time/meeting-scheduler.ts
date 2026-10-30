// @ts-nocheck
// Generated from tools/time/meeting-scheduler.html
// Source SHA-256: 84ab13d2beafcf350fb3ff1d9af784d02d5f0bdaa1df2298302ebaf2f4e5a161
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 常用时区列表
      const timezones = [
        { value: "Asia/Shanghai", label: "中国 - 北京/上海 (UTC+8)" },
        { value: "Asia/Hong_Kong", label: "中国 - 香港 (UTC+8)" },
        { value: "Asia/Taipei", label: "中国 - 台北 (UTC+8)" },
        { value: "Asia/Tokyo", label: "日本 - 东京 (UTC+9)" },
        { value: "Asia/Seoul", label: "韩国 - 首尔 (UTC+9)" },
        { value: "Asia/Singapore", label: "新加坡 (UTC+8)" },
        { value: "Asia/Bangkok", label: "泰国 - 曼谷 (UTC+7)" },
        { value: "Asia/Dubai", label: "阿联酋 - 迪拜 (UTC+4)" },
        { value: "Asia/Kolkata", label: "印度 - 孟买 (UTC+5:30)" },
        { value: "Europe/London", label: "英国 - 伦敦 (UTC+0/+1)" },
        { value: "Europe/Paris", label: "法国 - 巴黎 (UTC+1/+2)" },
        { value: "Europe/Berlin", label: "德国 - 柏林 (UTC+1/+2)" },
        { value: "Europe/Moscow", label: "俄罗斯 - 莫斯科 (UTC+3)" },
        { value: "America/New_York", label: "美国 - 纽约 (UTC-5/-4)" },
        { value: "America/Chicago", label: "美国 - 芝加哥 (UTC-6/-5)" },
        { value: "America/Denver", label: "美国 - 丹佛 (UTC-7/-6)" },
        { value: "America/Los_Angeles", label: "美国 - 洛杉矶 (UTC-8/-7)" },
        { value: "America/Sao_Paulo", label: "巴西 - 圣保罗 (UTC-3)" },
        { value: "Australia/Sydney", label: "澳大利亚 - 悉尼 (UTC+10/+11)" },
        { value: "Australia/Melbourne", label: "澳大利亚 - 墨尔本 (UTC+10/+11)" },
        { value: "Pacific/Auckland", label: "新西兰 - 奥克兰 (UTC+12/+13)" }
      ];

      // 状态
      let participants = [];
      let selectedHour = null;
      let baseDate = new Date();
      baseDate.setHours(0, 0, 0, 0);

      // 初始化时区选择器
      function initTimezoneSelect() {
        const select = document.getElementById("participantTimezone");
        timezones.forEach((tz) => {
          const option = document.createElement("option");
          option.value = tz.value;
          option.textContent = tz.label;
          select.appendChild(option);
        });

        // 默认选择用户当前时区
        try {
          const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezones.find((t) => t.value === userTz)) {
            select.value = userTz;
          }
        } catch (e) {}
      }

      // 添加参与者
      function addParticipant(name, timezone) {
        if (!name) {
          alert("请输入参与者名称");
          return;
        }

        participants.push({ name, timezone });
        renderParticipants();
        renderTimeGrid();

        document.getElementById("participantName").value = "";
      }

      // 渲染参与者列表
      function renderParticipants() {
        const container = document.getElementById("participantsList");
        container.replaceChildren();

        if (participants.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.textContent = "请添加会议参与者";
          container.appendChild(p);
          return;
        }

        participants.forEach((p, index) => {
          const item = document.createElement("div");
          item.className = "participant-item";

          const nameSpan = document.createElement("span");
          nameSpan.className = "participant-name";
          nameSpan.textContent = p.name;

          const tzSpan = document.createElement("span");
          tzSpan.className = "participant-timezone";
          tzSpan.textContent = p.timezone;

          const localSpan = document.createElement("span");
          localSpan.className = "participant-local";
          const now = new Date();
          localSpan.textContent = "当前: " + formatTimeInZone(now, p.timezone);

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "outline";
          deleteBtn.style.padding = "0.25rem 0.5rem";
          deleteBtn.textContent = "删除";
          deleteBtn.addEventListener("click", function () {
            participants.splice(index, 1);
            renderParticipants();
            renderTimeGrid();
          });

          item.appendChild(nameSpan);
          item.appendChild(tzSpan);
          item.appendChild(localSpan);
          item.appendChild(deleteBtn);
          container.appendChild(item);
        });
      }

      // 格式化时区时间
      function formatTimeInZone(date, timezone) {
        return date.toLocaleTimeString("zh-CN", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });
      }

      // 获取时区的小时
      function getHourInZone(date, timezone) {
        const str = date.toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "numeric",
          hour12: false
        });
        return parseInt(str);
      }

      // 获取时间分类
      function getTimeCategory(hour) {
        if (hour >= 9 && hour < 18) return "good";
        if ((hour >= 7 && hour < 9) || (hour >= 18 && hour < 21)) return "ok";
        if ((hour >= 21 && hour < 23) || (hour >= 6 && hour < 7)) return "bad";
        return "night";
      }

      // 获取所有参与者中最差的时间分类
      function getWorstCategory(categories) {
        const priority = { night: 0, bad: 1, ok: 2, good: 3 };
        let worst = "good";
        categories.forEach((cat) => {
          if (priority[cat] < priority[worst]) {
            worst = cat;
          }
        });
        return worst;
      }

      // 渲染时间网格
      function renderTimeGrid() {
        const container = document.getElementById("timeGrid");
        container.replaceChildren();

        if (participants.length === 0) {
          const p = document.createElement("p");
          p.style.color = "var(--pico-muted-color)";
          p.style.textAlign = "center";
          p.style.padding = "2rem";
          p.textContent = "添加参与者后将显示时间网格";
          container.appendChild(p);
          return;
        }

        // 设置网格列数
        container.style.gridTemplateColumns = "150px repeat(24, 1fr)";

        // 表头
        const headerRow = document.createElement("div");
        headerRow.className = "grid-header";

        const cornerCell = document.createElement("div");
        cornerCell.className = "grid-cell header-cell";
        cornerCell.textContent = "参与者";
        container.appendChild(cornerCell);

        for (let h = 0; h < 24; h++) {
          const cell = document.createElement("div");
          cell.className = "grid-cell header-cell";
          cell.textContent = h.toString().padStart(2, "0") + ":00";
          container.appendChild(cell);
        }

        // 每个参与者的行
        participants.forEach((p, pIndex) => {
          const nameCell = document.createElement("div");
          nameCell.className = "grid-cell name-cell";
          nameCell.textContent = p.name;
          container.appendChild(nameCell);

          for (let h = 0; h < 24; h++) {
            // 基准时间（第一个参与者的时区）
            const baseTime = new Date(baseDate);
            baseTime.setHours(h);

            // 转换到当前参与者的时区
            const localHour = getHourInZone(baseTime, p.timezone);
            const category = getTimeCategory(localHour);

            const cell = document.createElement("div");
            cell.className = "grid-cell time-cell " + category;
            cell.textContent = localHour.toString().padStart(2, "0");
            cell.dataset.hour = h;
            cell.dataset.participant = pIndex;

            if (h === selectedHour) {
              cell.classList.add("selected");
            }

            cell.addEventListener("click", function () {
              selectTime(h);
            });

            container.appendChild(cell);
          }
        });

        // 综合评分行
        const summaryCell = document.createElement("div");
        summaryCell.className = "grid-cell name-cell";
        summaryCell.textContent = "综合评价";
        summaryCell.style.fontStyle = "italic";
        container.appendChild(summaryCell);

        for (let h = 0; h < 24; h++) {
          const baseTime = new Date(baseDate);
          baseTime.setHours(h);

          const categories = participants.map((p) => {
            const localHour = getHourInZone(baseTime, p.timezone);
            return getTimeCategory(localHour);
          });

          const worst = getWorstCategory(categories);

          const cell = document.createElement("div");
          cell.className = "grid-cell time-cell " + worst;
          cell.style.fontWeight = "bold";

          const symbols = { good: "★", ok: "◐", bad: "○", night: "●" };
          cell.textContent = symbols[worst];

          cell.dataset.hour = h;
          cell.addEventListener("click", function () {
            selectTime(h);
          });

          if (h === selectedHour) {
            cell.classList.add("selected");
          }

          container.appendChild(cell);
        }
      }

      // 选择时间
      function selectTime(hour) {
        selectedHour = hour;

        // 更新选中状态
        document.querySelectorAll(".time-cell").forEach((cell) => {
          if (parseInt(cell.dataset.hour) === hour) {
            cell.classList.add("selected");
          } else {
            cell.classList.remove("selected");
          }
        });

        // 显示结果
        showResult(hour);
      }

      // 显示结果
      function showResult(hour) {
        const section = document.getElementById("resultSection");
        section.style.display = "block";

        const baseTime = new Date(baseDate);
        baseTime.setHours(hour);

        // 第一个参与者的时区作为基准
        const baseTz = participants[0]?.timezone || "Asia/Shanghai";

        document.getElementById("selectedTime").textContent =
          hour.toString().padStart(2, "0") + ":00 (" + baseTz + ")";

        const breakdown = document.getElementById("timeBreakdown");
        breakdown.replaceChildren();

        participants.forEach((p) => {
          const item = document.createElement("div");
          item.className = "breakdown-item";

          const localTime = new Date(baseTime);
          const localHour = getHourInZone(localTime, p.timezone);
          const category = getTimeCategory(localHour);

          const nameDiv = document.createElement("div");
          nameDiv.className = "breakdown-name";
          nameDiv.textContent = p.name;

          const timeDiv = document.createElement("div");
          timeDiv.className = "breakdown-time";
          timeDiv.textContent = localHour.toString().padStart(2, "0") + ":00";

          const dateDiv = document.createElement("div");
          dateDiv.className = "breakdown-date";
          dateDiv.textContent = localTime.toLocaleDateString("zh-CN", {
            timeZone: p.timezone,
            weekday: "long"
          });

          const statusDiv = document.createElement("div");
          statusDiv.style.marginTop = "0.5rem";
          statusDiv.style.fontSize = "0.85rem";

          const statusMap = {
            good: "✓ 工作时间",
            ok: "○ 可接受",
            bad: "△ 不推荐",
            night: "✗ 夜间"
          };
          statusDiv.textContent = statusMap[category];

          item.appendChild(nameDiv);
          item.appendChild(timeDiv);
          item.appendChild(dateDiv);
          item.appendChild(statusDiv);
          breakdown.appendChild(item);
        });
      }

      // 复制结果
      window.copyResult = function () {
        if (selectedHour === null) {
          alert("请先选择会议时间");
          return;
        }

        const baseTime = new Date(baseDate);
        baseTime.setHours(selectedHour);

        let text = "会议时间安排:\n\n";

        participants.forEach((p) => {
          const localHour = getHourInZone(baseTime, p.timezone);
          text +=
            p.name + ": " + localHour.toString().padStart(2, "0") + ":00 (" + p.timezone + ")\n";
        });

        navigator.clipboard.writeText(text).then(function () {
          alert("已复制到剪贴板");
        });
      };

      // 添加到日历
      function addToCalendar() {
        if (selectedHour === null) {
          alert("请先选择会议时间");
          return;
        }

        const startTime = new Date(baseDate);
        startTime.setHours(selectedHour);

        const endTime = new Date(startTime);
        endTime.setHours(startTime.getHours() + 1);

        const formatDate = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

        const title = encodeURIComponent("跨时区会议");
        const details = encodeURIComponent("参与者: " + participants.map((p) => p.name).join(", "));

        const url =
          "https://calendar.google.com/calendar/render?action=TEMPLATE" +
          "&text=" +
          title +
          "&dates=" +
          formatDate(startTime) +
          "/" +
          formatDate(endTime) +
          "&details=" +
          details;

        window.open(url, "_blank");
      }

      // 主题切换
      document.getElementById("themeToggle").addEventListener("click", function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      });

      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // 事件绑定
      document.getElementById("addParticipantBtn").addEventListener("click", function () {
        const name = document.getElementById("participantName").value.trim();
        const timezone = document.getElementById("participantTimezone").value;
        addParticipant(name, timezone);
      });

      document.getElementById("participantName").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          const name = this.value.trim();
          const timezone = document.getElementById("participantTimezone").value;
          addParticipant(name, timezone);
        }
      });

      document.querySelectorAll(".quick-tz").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const tz = this.dataset.tz;
          const name = this.dataset.name;
          addParticipant(name, tz);
        });
      });

      document.getElementById("updateGridBtn").addEventListener("click", renderTimeGrid);
      document.getElementById("copyResultBtn").addEventListener("click", copyResult);
      document.getElementById("addToCalendarBtn").addEventListener("click", addToCalendar);

      // 初始化
      initTimezoneSelect();
      renderParticipants();
      renderTimeGrid();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }
    
