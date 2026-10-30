// @ts-nocheck
// Generated from tools/office/meeting-scheduler.html
// Source SHA-256: 7d1a6d79e4ff3d25cbd72b1d667a9c90866f9a24a388c35ef332e66099c9debb
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let participants = [];

      // Initialize hour buttons
      function initHourButtons() {
        const container = document.getElementById("availabilitySelect");
        container.innerHTML = "";
        for (let h = 0; h < 24; h++) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "hour-btn";
          btn.textContent = h.toString().padStart(2, "0") + ":00";
          btn.dataset.hour = h;
          // Default working hours selected
          if (h >= 9 && h < 18) {
            btn.classList.add("selected");
          }
          btn.onclick = function () {
            this.classList.toggle("selected");
          };
          container.appendChild(btn);
        }
      }

      function getSelectedHours() {
        const buttons = document.querySelectorAll("#availabilitySelect .hour-btn.selected");
        return Array.from(buttons).map((b) => parseInt(b.dataset.hour));
      }

      function addParticipant() {
        const name = document.getElementById("participantName").value.trim();
        const timezone = parseInt(document.getElementById("participantTimezone").value);
        const hours = getSelectedHours();

        if (!name) {
          alert("请输入姓名");
          return;
        }

        if (hours.length === 0) {
          alert("请选择至少一个可用时间段");
          return;
        }

        participants.push({
          name,
          timezone,
          hours
        });

        document.getElementById("participantName").value = "";
        renderParticipants();
        updateGrid();
      }

      function removeParticipant(index) {
        participants.splice(index, 1);
        renderParticipants();
        updateGrid();
      }

      function renderParticipants() {
        const container = document.getElementById("participantsList");
        container.innerHTML = "";

        participants.forEach((p, index) => {
          const div = document.createElement("div");
          div.className = "participant";
          div.innerHTML = `
          <span class="participant-name">${p.name}</span>
          <span class="participant-timezone">UTC${p.timezone >= 0 ? "+" : ""}${p.timezone}</span>
          <button class="delete-btn" onclick="removeParticipant(${index})">×</button>
        `;
          container.appendChild(div);
        });
      }

      function convertToUTC(localHour, timezone) {
        let utc = localHour - timezone;
        if (utc < 0) utc += 24;
        if (utc >= 24) utc -= 24;
        return utc;
      }

      function convertFromUTC(utcHour, timezone) {
        let local = utcHour + timezone;
        if (local < 0) local += 24;
        if (local >= 24) local -= 24;
        return local;
      }

      function updateGrid() {
        if (participants.length === 0) {
          document.getElementById("resultsCard").style.display = "none";
          return;
        }

        document.getElementById("resultsCard").style.display = "block";

        const container = document.getElementById("timeGrid");
        container.innerHTML = "";

        // Header row
        let headerRow = '<div class="time-row">';
        headerRow += '<div class="time-cell header">UTC</div>';
        for (let h = 0; h < 24; h++) {
          headerRow += `<div class="time-cell header">${h.toString().padStart(2, "0")}</div>`;
        }
        headerRow += "</div>";
        container.innerHTML += headerRow;

        // Calculate overlap
        const overlap = new Array(24).fill(true);

        participants.forEach((p) => {
          const utcHours = p.hours.map((h) => convertToUTC(h, p.timezone));

          let row = '<div class="time-row">';
          row += `<div class="time-cell name">${p.name}</div>`;

          for (let h = 0; h < 24; h++) {
            const isAvailable = utcHours.includes(h);
            if (!isAvailable) overlap[h] = false;
            row += `<div class="time-cell ${isAvailable ? "available" : "busy"}"></div>`;
          }
          row += "</div>";
          container.innerHTML += row;
        });

        // Overlap row
        let overlapRow = '<div class="time-row">';
        overlapRow +=
          '<div class="time-cell name" style="color:var(--color-accent-cyan)">共同可用</div>';
        const overlapHours = [];
        for (let h = 0; h < 24; h++) {
          if (overlap[h] && participants.length > 0) {
            overlapHours.push(h);
          }
          overlapRow += `<div class="time-cell ${overlap[h] && participants.length > 0 ? "overlap" : ""}"></div>`;
        }
        overlapRow += "</div>";
        container.innerHTML += overlapRow;

        // Find and display recommended time
        if (overlapHours.length > 0) {
          document.getElementById("resultBox").style.display = "block";
          // Convert first overlap hour to Beijing time
          const beijingHour = convertFromUTC(overlapHours[0], 8);
          const endHour =
            overlapHours.length > 1
              ? convertFromUTC(overlapHours[overlapHours.length - 1], 8)
              : beijingHour;
          document.getElementById("recommendedTime").textContent =
            `${beijingHour.toString().padStart(2, "0")}:00 - ${((endHour + 1) % 24).toString().padStart(2, "0")}:00`;
        } else {
          document.getElementById("resultBox").style.display = "none";
        }
      }

      // Initialize
      initHourButtons();

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
    
