// @ts-nocheck
// Generated from tools/productivity/timezone-meeting.html
// Source SHA-256: 54fa103795f357812a5f83e70feaa435d2f1b4a32523f73265f5e354f046e2ff
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const TIMEZONES = [
        { name: "中国 (UTC+8)", offset: 8, cities: "Beijing, Shanghai, Hong Kong" },
        { name: "日本/韩国 (UTC+9)", offset: 9, cities: "Tokyo, Seoul" },
        { name: "新加坡 (UTC+8)", offset: 8, cities: "Singapore" },
        { name: "印度 (UTC+5:30)", offset: 5.5, cities: "Mumbai, Delhi" },
        { name: "迪拜 (UTC+4)", offset: 4, cities: "Dubai" },
        { name: "莫斯科 (UTC+3)", offset: 3, cities: "Moscow" },
        { name: "英国 (UTC+0)", offset: 0, cities: "London" },
        { name: "德国/法国 (UTC+1)", offset: 1, cities: "Berlin, Paris" },
        { name: "美东 (UTC-5)", offset: -5, cities: "New York, Toronto" },
        { name: "美中 (UTC-6)", offset: -6, cities: "Chicago, Dallas" },
        { name: "美西 (UTC-8)", offset: -8, cities: "San Francisco, LA" },
        { name: "澳洲东部 (UTC+10)", offset: 10, cities: "Sydney, Melbourne" }
      ];

      let locations = [
        { id: 1, name: "北京", timezone: 8 },
        { id: 2, name: "纽约", timezone: -5 },
        { id: 3, name: "伦敦", timezone: 0 }
      ];

      function addLocation() {
        locations.push({
          id: Date.now(),
          name: "新位置",
          timezone: 8
        });
        render();
      }

      function deleteLocation(id) {
        if (locations.length <= 1) {
          alert("至少需要保留一个位置");
          return;
        }
        locations = locations.filter((l) => l.id !== id);
        render();
      }

      function updateLocation(id, field, value) {
        const location = locations.find((l) => l.id === id);
        if (location) {
          location[field] = field === "timezone" ? parseFloat(value) : value;
          renderTimeline();
        }
      }

      function getHourClass(hour) {
        if (hour >= 9 && hour < 18) return "work";
        if ((hour >= 7 && hour < 9) || (hour >= 18 && hour < 22)) return "awkward";
        return "sleep";
      }

      function render() {
        renderLocations();
        renderTimeline();
      }

      function renderLocations() {
        const container = document.getElementById("locations");
        container.innerHTML = locations
          .map(
            (loc) => `
        <div class="location-item">
          <input type="text" value="${loc.name}" onchange="updateLocation(${loc.id}, 'name', this.value)" placeholder="位置名称">
          <select onchange="updateLocation(${loc.id}, 'timezone', this.value)">
            ${TIMEZONES.map(
              (tz) => `
              <option value="${tz.offset}" ${tz.offset === loc.timezone ? "selected" : ""}>
                ${tz.name}
              </option>
            `
            ).join("")}
          </select>
          <button class="location-delete" onclick="deleteLocation(${loc.id})">×</button>
        </div>
      `
          )
          .join("");
      }

      function renderTimeline() {
        const meetingTime = document.getElementById("meetingTime").value;
        const baseTimezone = parseFloat(document.getElementById("baseTimezone").value);
        const [hours, minutes] = meetingTime.split(":").map(Number);

        const baseHour = hours;

        // Render header
        let headerHTML = '<div class="timeline-header">';
        headerHTML += '<div class="timeline-location">位置</div>';
        for (let h = 0; h < 24; h++) {
          headerHTML += `<div class="timeline-hour">${String(h).padStart(2, "0")}:00</div>`;
        }
        headerHTML += "</div>";

        // Render rows
        let rowsHTML = "";
        locations.forEach((loc) => {
          const offset = loc.timezone - baseTimezone;
          rowsHTML += '<div class="timeline-row">';
          rowsHTML += `<div class="timeline-location">${loc.name}</div>`;

          for (let h = 0; h < 24; h++) {
            let localHour = (baseHour + offset + h) % 24;
            if (localHour < 0) localHour += 24;

            const hourClass = getHourClass(Math.floor(localHour));
            const isMeeting = h === 0;
            const cellContent = isMeeting ? "🎯" : "";

            rowsHTML += `<div class="timeline-cell ${hourClass}">${cellContent}</div>`;
          }

          rowsHTML += "</div>";
        });

        document.getElementById("timelineContent").innerHTML = headerHTML + rowsHTML;
      }

      // Populate base timezone selector
      const baseTimezoneSelect = document.getElementById("baseTimezone");
      baseTimezoneSelect.innerHTML = TIMEZONES.map(
        (tz) => `
      <option value="${tz.offset}">${tz.name}</option>
    `
      ).join("");

      // Initialize
      render();

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
    
