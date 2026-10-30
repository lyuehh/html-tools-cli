// @ts-nocheck
// Generated from tools/lifestyle/birthday-reminder.html
// Source SHA-256: f25559218f584abf60038b8204a2348c759598dbb4e12289465bb834d2b3b224
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_birthdays_v1";
      let birthdays = [];

      function loadBirthdays() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          birthdays = saved ? JSON.parse(saved) : [];
        } catch (e) {
          birthdays = [];
        }
        render();
      }

      function saveBirthdays() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(birthdays));
      }

      function handleEnter(event) {
        if (event.key === "Enter") {
          addBirthday();
        }
      }

      function addBirthday() {
        const name = document.getElementById("name").value.trim();
        const birthday = document.getElementById("birthday").value;

        if (!name || !birthday) {
          alert("请输入姓名和生日");
          return;
        }

        birthdays.push({
          id: Date.now(),
          name,
          birthday
        });

        document.getElementById("name").value = "";
        document.getElementById("birthday").value = "";

        saveBirthdays();
        render();
      }

      function deleteBirthday(id) {
        if (!confirm("确定要删除这个生日吗？")) return;
        birthdays = birthdays.filter((b) => b.id !== id);
        saveBirthdays();
        render();
      }

      function getDaysUntil(birthday) {
        const today = new Date();
        const birthDate = new Date(birthday);

        // This year's birthday
        const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        // If already passed this year, use next year
        const targetDate =
          thisYear < today
            ? new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
            : thisYear;

        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
      }

      function getAge(birthday) {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
      }

      function render() {
        const container = document.getElementById("birthdayList");
        const upcomingContainer = document.getElementById("upcomingList");
        const upcomingSection = document.getElementById("upcomingSection");

        if (birthdays.length === 0) {
          container.innerHTML = `
          <div class="empty-state">
            <div class="icon">📅</div>
            <div>还没有添加生日<br>添加亲朋好友的生日，永不错过！</div>
          </div>
        `;
          upcomingSection.style.display = "none";
          return;
        }

        // Sort birthdays by days until next occurrence
        const sortedBirthdays = [...birthdays].sort((a, b) => {
          return getDaysUntil(a.birthday) - getDaysUntil(b.birthday);
        });

        // Render upcoming birthdays (within 30 days)
        const upcoming = sortedBirthdays.filter((b) => getDaysUntil(b.birthday) <= 30);

        if (upcoming.length > 0) {
          upcomingSection.style.display = "block";
          upcomingContainer.innerHTML = upcoming
            .map((b) => {
              const daysUntil = getDaysUntil(b.birthday);
              const age = getAge(b.birthday) + 1; // Next age
              const isToday = daysUntil === 0;

              return `
            <div class="upcoming-item ${isToday ? "today" : ""}">
              <div class="upcoming-info">
                <div class="upcoming-name">${b.name}</div>
                <div class="upcoming-date">${new Date(b.birthday).toLocaleDateString("zh-CN")} · ${age} 岁</div>
              </div>
              <div class="upcoming-countdown">
                ${isToday ? "🎉 今天生日！" : `${daysUntil} 天后`}
              </div>
            </div>
          `;
            })
            .join("");
        } else {
          upcomingSection.style.display = "none";
        }

        // Render all birthdays
        container.innerHTML = sortedBirthdays
          .map((b) => {
            const daysUntil = getDaysUntil(b.birthday);
            const age = getAge(b.birthday);

            return `
          <div class="birthday-card">
            <div class="birthday-info">
              <h3>${b.name}</h3>
              <div class="birthday-date">
                ${new Date(b.birthday).toLocaleDateString("zh-CN")} ·
                ${age} 岁 ·
                ${daysUntil} 天后
              </div>
            </div>
            <div class="birthday-actions">
              <button onclick="deleteBirthday(${b.id})">删除</button>
            </div>
          </div>
        `;
          })
          .join("");
      }

      // Initialize
      loadBirthdays();

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
    
