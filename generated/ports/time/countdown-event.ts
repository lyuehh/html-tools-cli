// @ts-nocheck
// Generated from tools/time/countdown-event.html
// Source SHA-256: 7ae798bc6a4b63216150c8d0aa7fe56c9579af79219ee753647330c0782063ce
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const icons = [
        "🎂",
        "💕",
        "🎓",
        "✈️",
        "🏠",
        "💍",
        "👶",
        "🎉",
        "🏆",
        "📅",
        "💼",
        "🎄",
        "🌸",
        "🎃",
        "❤️",
        "⭐"
      ];
      const colors = [
        "#ec4899",
        "#f43f5e",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#14b8a6",
        "#3b82f6",
        "#8b5cf6"
      ];
      let events = [],
        selectedIcon = "🎂",
        selectedColor = "#ec4899";
      const $ = (id) => document.getElementById(id);
      function init() {
        loadData();
        renderIconPicker();
        renderColorPicker();
        render();
        setupEvents();
        loadTheme();
        setInterval(render, 60000);
      }
      window.loadData = function () {
        events = JSON.parse(localStorage.getItem("countdownEvents") || "[]");
      };
      window.saveData = function () {
        localStorage.setItem("countdownEvents", JSON.stringify(events));
      };
      function genId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
      }
      function renderIconPicker() {
        if (!$("iconPicker")) return;
        $("iconPicker").innerHTML = icons
          .map(
            (i) =>
              '<div class="icon-option ' +
              (i === selectedIcon ? "selected" : "") +
              '" data-icon="' +
              i +
              '">' +
              i +
              "</div>"
          )
          .join("");
      }
      function renderColorPicker() {
        if (!$("colorPicker")) return;
        $("colorPicker").innerHTML = colors
          .map(
            (c) =>
              '<div class="color-option ' +
              (c === selectedColor ? "selected" : "") +
              '" data-color="' +
              c +
              '" style="background:' +
              c +
              '"></div>'
          )
          .join("");
      }
      function getCountdown(dateStr, repeat) {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        let target = new Date(dateStr);
        target.setHours(0, 0, 0, 0);
        if (repeat === "yearly") {
          target.setFullYear(now.getFullYear());
          if (target < now) target.setFullYear(now.getFullYear() + 1);
        }
        const diff = Math.floor((target - now) / (1000 * 60 * 60 * 24));
        return { days: diff, isPast: diff < 0, isToday: diff === 0 };
      }
      function render() {
        if (!$("eventsGrid")) return;
        if (!events.length) {
          $("eventsGrid").innerHTML =
            '<div class="empty-state"><div class="icon">📅</div><p>还没有添加纪念日</p><p>点击"添加纪念日"开始记录重要日期</p></div>';
          return;
        }
        const sorted = [...events].sort((a, b) => {
          const ca = getCountdown(a.date, a.repeat),
            cb = getCountdown(b.date, b.repeat);
          if (ca.isToday && !cb.isToday) return -1;
          if (!ca.isToday && cb.isToday) return 1;
          return Math.abs(ca.days) - Math.abs(cb.days);
        });
        $("eventsGrid").innerHTML = sorted
          .map((e) => {
            const c = getCountdown(e.date, e.repeat);
            let countdownText, labelText;
            if (c.isToday) {
              countdownText = "今天";
              labelText = "就是今天！";
            } else if (c.days > 0) {
              countdownText = c.days;
              labelText = "天后";
            } else {
              countdownText = Math.abs(c.days);
              labelText = "天前";
            }
            return (
              '<div class="event-card" style="--event-color:' +
              e.color +
              '"><div class="icon">' +
              e.icon +
              '</div><div class="name">' +
              e.name +
              (e.repeat ? '<span class="repeat-badge">每年</span>' : "") +
              '</div><div class="date">' +
              e.date +
              '</div><div class="countdown ' +
              (c.isPast ? "past" : "") +
              '">' +
              countdownText +
              '</div><div class="countdown-label">' +
              labelText +
              '</div><div class="actions"><button onclick="editEvent(\'' +
              e.id +
              '\')" class="outline" aria-label="编辑">编辑</button><button onclick="deleteEvent(\'' +
              e.id +
              '\')" class="outline secondary" aria-label="删除">删除</button></div></div>'
            );
          })
          .join("");
      }
      function setupEvents() {
        if (!$("addEventBtn") || !$("eventForm") || !$("eventModal")) return;
        $("addEventBtn").onclick = () => {
          $("modalTitle").textContent = "添加纪念日";
          $("eventForm").reset();
          $("eventId").value = "";
          selectedIcon = "🎂";
          selectedColor = "#ec4899";
          renderIconPicker();
          renderColorPicker();
          $("eventModal").classList.add("show");
        };
        $("eventForm").onsubmit = (ev) => {
          ev.preventDefault();
          const id = $("eventId").value;
          const e = {
            id: id || genId(),
            name: $("eventName").value,
            date: $("eventDate").value,
            repeat: $("eventRepeat").value,
            icon: selectedIcon,
            color: selectedColor
          };
          if (id) {
            const i = events.findIndex((x) => x.id === id);
            if (i !== -1) events[i] = e;
          } else events.push(e);
          saveData();
          render();
          $("eventModal").classList.remove("show");
        };
        $("cancelBtn").onclick = () => $("eventModal").classList.remove("show");
        $("iconPicker").onclick = (ev) => {
          const o = ev.target.closest(".icon-option");
          if (o) {
            selectedIcon = o.dataset.icon;
            renderIconPicker();
          }
        };
        $("colorPicker").onclick = (ev) => {
          const o = ev.target.closest(".color-option");
          if (o) {
            selectedColor = o.dataset.color;
            renderColorPicker();
          }
        };
        $("themeToggle").onclick = toggleTheme;
        $("eventModal").onclick = (ev) => {
          if (ev.target.id === "eventModal") $("eventModal").classList.remove("show");
        };
      }
      window.editEvent = (id) => {
        const e = events.find((x) => x.id === id);
        if (!e) return;
        $("modalTitle").textContent = "编辑纪念日";
        $("eventId").value = id;
        $("eventName").value = e.name;
        $("eventDate").value = e.date;
        $("eventRepeat").value = e.repeat || "";
        selectedIcon = e.icon;
        selectedColor = e.color;
        renderIconPicker();
        renderColorPicker();
        $("eventModal").classList.add("show");
      };
      window.deleteEvent = (id) => {
        if (confirm("确定删除?")) {
          events = events.filter((e) => e.id !== id);
          saveData();
          render();
        }
      };
      function loadTheme() {
        const t = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", t);
        $("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
        $("themeToggle").textContent = n === "dark" ? "☀️" : "🌙";
      };
      init();
    
