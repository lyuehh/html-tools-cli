// @ts-nocheck
// Generated from tools/social/event-countdown.html
// Source SHA-256: 1a95ff6c0d953c20dd4a6181864a2d7521957d3bb551e48033dbb8b1d87e5197
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let events = JSON.parse(localStorage.getItem("countdown_events") || "[]");

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      document.getElementById("eventDate").value = tomorrow.toISOString().split("T")[0];

      function showForm() {
        document.getElementById("addForm").classList.add("show");
        document.getElementById("eventName").focus();
      }

      function hideForm() {
        document.getElementById("addForm").classList.remove("show");
        document.getElementById("eventName").value = "";
      }

      function addEvent() {
        const name = document.getElementById("eventName").value.trim();
        const date = document.getElementById("eventDate").value;
        const time = document.getElementById("eventTime").value || "00:00";

        if (!name || !date) {
          alert("请填写活动名称和日期");
          return;
        }

        events.push({
          id: Date.now(),
          name,
          datetime: `${date}T${time}:00`
        });

        // Sort by date
        events.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        localStorage.setItem("countdown_events", JSON.stringify(events));
        hideForm();
        render();
      }

      function deleteEvent(id) {
        if (confirm("确定要删除这个倒计时吗？")) {
          events = events.filter((e) => e.id !== id);
          localStorage.setItem("countdown_events", JSON.stringify(events));
          render();
        }
      }

      function formatDate(datetime) {
        const date = new Date(datetime);
        return date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long"
        });
      }

      function getCountdown(datetime) {
        const now = new Date();
        const target = new Date(datetime);
        const diff = target - now;

        if (diff <= 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds, past: false };
      }

      function render() {
        const list = document.getElementById("eventsList");

        if (events.length === 0) {
          list.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📅</div>
            <div>还没有倒计时</div>
            <div style="font-size:.85rem;margin-top:.25rem">点击下方按钮添加一个吧</div>
          </div>
        `;
          return;
        }

        list.innerHTML = events
          .map((e) => {
            const cd = getCountdown(e.datetime);
            return `
          <div class="event-card ${cd.past ? "past" : ""}" data-id="${e.id}">
            <div class="event-header">
              <div>
                <div class="event-title">${e.name}</div>
                <div class="event-date">${formatDate(e.datetime)}</div>
              </div>
              <button class="event-delete" onclick="deleteEvent(${e.id})">🗑️</button>
            </div>
            <div class="countdown">
              <div class="countdown-item">
                <div class="countdown-value" data-type="days">${cd.days}</div>
                <div class="countdown-label">天</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value" data-type="hours">${String(cd.hours).padStart(2, "0")}</div>
                <div class="countdown-label">时</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value" data-type="minutes">${String(cd.minutes).padStart(2, "0")}</div>
                <div class="countdown-label">分</div>
              </div>
              <div class="countdown-item">
                <div class="countdown-value" data-type="seconds">${String(cd.seconds).padStart(2, "0")}</div>
                <div class="countdown-label">秒</div>
              </div>
            </div>
            ${cd.past ? '<div class="event-status">已经过去啦 🎉</div>' : ""}
          </div>
        `;
          })
          .join("");
      }

      function updateCountdowns() {
        events.forEach((e) => {
          const card = document.querySelector(`.event-card[data-id="${e.id}"]`);
          if (!card) return;

          const cd = getCountdown(e.datetime);

          card.querySelector('[data-type="days"]').textContent = cd.days;
          card.querySelector('[data-type="hours"]').textContent = String(cd.hours).padStart(2, "0");
          card.querySelector('[data-type="minutes"]').textContent = String(cd.minutes).padStart(
            2,
            "0"
          );
          card.querySelector('[data-type="seconds"]').textContent = String(cd.seconds).padStart(
            2,
            "0"
          );

          if (cd.past && !card.classList.contains("past")) {
            card.classList.add("past");
            const countdown = card.querySelector(".countdown");
            if (!card.querySelector(".event-status")) {
              countdown.insertAdjacentHTML(
                "afterend",
                '<div class="event-status">已经过去啦 🎉</div>'
              );
            }
          }
        });
      }

      // Initialize
      render();
      setInterval(updateCountdowns, 1000);

      // Handle Enter key
      document.getElementById("eventName").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addEvent();
      });

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
    
