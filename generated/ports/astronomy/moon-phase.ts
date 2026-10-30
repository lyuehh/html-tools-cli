// @ts-nocheck
// Generated from tools/astronomy/moon-phase.html
// Source SHA-256: f3ce69a6b7d9305ef3748e6f7732b30c1b91ab3730d823d877f9464fe457a2d9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Known new moon reference: 2000-01-06 18:14 UTC
      const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z");
      const LUNAR_CYCLE = 29.530588853; // Average lunar cycle in days

      function getMoonPhase(date) {
        const diff = date - KNOWN_NEW_MOON;
        const days = diff / (1000 * 60 * 60 * 24);
        const phase = ((days % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
        return phase;
      }

      function getPhaseName(phase) {
        if (phase < 1.84566) return { name: "新月", emoji: "🌑", desc: "New Moon" };
        if (phase < 5.53699) return { name: "娥眉月", emoji: "🌒", desc: "Waxing Crescent" };
        if (phase < 9.22831) return { name: "上弦月", emoji: "🌓", desc: "First Quarter" };
        if (phase < 12.91963) return { name: "盈凸月", emoji: "🌔", desc: "Waxing Gibbous" };
        if (phase < 16.61096) return { name: "满月", emoji: "🌕", desc: "Full Moon" };
        if (phase < 20.30228) return { name: "亏凸月", emoji: "🌖", desc: "Waning Gibbous" };
        if (phase < 23.99361) return { name: "下弦月", emoji: "🌗", desc: "Last Quarter" };
        if (phase < 27.68493) return { name: "残月", emoji: "🌘", desc: "Waning Crescent" };
        return { name: "新月", emoji: "🌑", desc: "New Moon" };
      }

      function getIllumination(phase) {
        // Calculate percentage of moon illuminated
        let illum;
        if (phase < LUNAR_CYCLE / 2) {
          illum = phase / (LUNAR_CYCLE / 2);
        } else {
          illum = 2 - phase / (LUNAR_CYCLE / 2);
        }
        return Math.round(illum * 100);
      }

      function getMoonShadow(phase) {
        // Calculate shadow position and direction
        const progress = phase / LUNAR_CYCLE;

        if (progress < 0.25) {
          // New moon to first quarter (waxing, shadow on right)
          const percent = (progress / 0.25) * 100;
          return { left: `${100 - percent}%`, width: `${100 - percent}%`, right: "auto" };
        } else if (progress < 0.5) {
          // First quarter to full moon (waxing, shadow on right shrinking)
          const percent = ((progress - 0.25) / 0.25) * 100;
          return { right: "0", width: `${100 - percent}%`, left: "auto" };
        } else if (progress < 0.75) {
          // Full moon to last quarter (waning, shadow on left)
          const percent = ((progress - 0.5) / 0.25) * 100;
          return { left: "0", width: `${percent}%`, right: "auto" };
        } else {
          // Last quarter to new moon (waning, shadow on left growing)
          const percent = ((progress - 0.75) / 0.25) * 100;
          return { right: `${100 - percent}%`, width: `${100 - percent}%`, left: "auto" };
        }
      }

      function findNextPhase(startDate, targetPhase) {
        let date = new Date(startDate);
        date.setDate(date.getDate() + 1);

        for (let i = 0; i < 60; i++) {
          const phase = getMoonPhase(date);
          if (Math.abs(phase - targetPhase) < 0.5) {
            return date;
          }
          date.setDate(date.getDate() + 1);
        }
        return null;
      }

      function getMonthlyPhases(year, month) {
        const phases = [];
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);

        const keyPhases = [
          { phase: 0, name: "新月", emoji: "🌑" },
          { phase: 7.38, name: "上弦月", emoji: "🌓" },
          { phase: 14.76, name: "满月", emoji: "🌕" },
          { phase: 22.15, name: "下弦月", emoji: "🌗" }
        ];

        let currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() - 5);

        while (currentDate <= endDate) {
          const moonPhase = getMoonPhase(currentDate);

          for (const kp of keyPhases) {
            if (Math.abs(moonPhase - kp.phase) < 0.5) {
              if (currentDate >= startDate && currentDate <= endDate) {
                phases.push({
                  date: new Date(currentDate),
                  name: kp.name,
                  emoji: kp.emoji
                });
              }
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        return phases.sort((a, b) => a.date - b.date);
      }

      function calculate() {
        const dateInput = document.getElementById("dateInput").value;
        const date = dateInput ? new Date(dateInput + "T12:00:00") : new Date();

        const phase = getMoonPhase(date);
        const phaseInfo = getPhaseName(phase);
        const illumination = getIllumination(phase);
        const shadow = getMoonShadow(phase);

        // Update display
        document.getElementById("moonName").textContent = phaseInfo.name;
        document.getElementById("moonDate").textContent = date.toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        document.getElementById("moonIllumination").textContent = illumination + "%";
        document.getElementById("moonAge").textContent = `月龄: ${phase.toFixed(1)} 天`;

        // Update moon shadow
        const moonShadow = document.getElementById("moonShadow");
        Object.assign(moonShadow.style, shadow);

        // Find next full and new moon
        const nextFull = findNextPhase(date, 14.76);
        const nextNew = findNextPhase(date, 0);

        if (nextFull) {
          const days = Math.round((nextFull - date) / (1000 * 60 * 60 * 24));
          document.getElementById("nextFullMoon").textContent =
            days === 0 ? "今天" : `${days} 天后`;
        }

        if (nextNew) {
          const days = Math.round((nextNew - date) / (1000 * 60 * 60 * 24));
          document.getElementById("nextNewMoon").textContent = days === 0 ? "今天" : `${days} 天后`;
        }

        // Show monthly phases
        const monthlyPhases = getMonthlyPhases(date.getFullYear(), date.getMonth());
        const phasesList = document.getElementById("phasesList");
        phasesList.innerHTML = monthlyPhases
          .map(
            (p) => `
        <div class="phase-item">
          <span class="phase-emoji">${p.emoji}</span>
          <div class="phase-info">
            <div class="phase-name">${p.name}</div>
            <div class="phase-date">${p.date.toLocaleDateString("zh-CN", { month: "long", day: "numeric" })}</div>
          </div>
        </div>
      `
          )
          .join("");
      }

      function setToday() {
        const today = new Date();
        document.getElementById("dateInput").value = today.toISOString().split("T")[0];
        calculate();
      }

      // Initialize
      setToday();

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
    
