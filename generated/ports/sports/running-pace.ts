// @ts-nocheck
// Generated from tools/sports/running-pace.html
// Source SHA-256: 20382f18d7d84181da5fc93fd51c8d9815184b022900b3c8ec4ed21c9555fe8c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function switchTab(tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".card").forEach((c) => c.classList.add("hidden"));
        event.target.classList.add("active");
        document.getElementById(tab + "Tab").classList.remove("hidden");
      }

      document.getElementById("paceDistance").addEventListener("change", function () {
        document
          .getElementById("customDistanceGroup")
          .classList.toggle("hidden", this.value !== "custom");
      });

      function formatPace(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.round(seconds % 60);
        return `${mins}'${secs.toString().padStart(2, "0")}"`;
      }

      function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.round(totalSeconds % 60);
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }

      function calculatePace() {
        let distance = parseFloat(document.getElementById("paceDistance").value);
        if (document.getElementById("paceDistance").value === "custom") {
          distance = parseFloat(document.getElementById("customDistance").value);
        }

        const hours = parseInt(document.getElementById("paceHours").value) || 0;
        const minutes = parseInt(document.getElementById("paceMinutes").value) || 0;
        const seconds = parseInt(document.getElementById("paceSeconds").value) || 0;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;

        if (distance <= 0 || totalSeconds <= 0) {
          alert("请输入有效的距离和时间");
          return;
        }

        const paceSeconds = totalSeconds / distance;
        document.getElementById("paceValue").textContent = formatPace(paceSeconds);
        document.getElementById("paceResult").style.display = "block";
      }

      function predictTimes() {
        const knownDist = parseFloat(document.getElementById("knownDistance").value);
        const hours = parseInt(document.getElementById("knownHours").value) || 0;
        const minutes = parseInt(document.getElementById("knownMinutes").value) || 0;
        const seconds = parseInt(document.getElementById("knownSeconds").value) || 0;
        const knownTime = hours * 3600 + minutes * 60 + seconds;

        if (knownTime <= 0) {
          alert("请输入有效的时间");
          return;
        }

        // Riegel formula: T2 = T1 * (D2/D1)^1.06
        const distances = [
          { name: "5K", km: 5 },
          { name: "10K", km: 10 },
          { name: "半马", km: 21.0975 },
          { name: "全马", km: 42.195 }
        ];

        const predictions = document.getElementById("predictions");
        predictions.innerHTML = "";

        distances.forEach((d) => {
          const predictedTime = knownTime * Math.pow(d.km / knownDist, 1.06);
          const card = document.createElement("div");
          card.className = "prediction-card";
          card.innerHTML = `
          <div class="prediction-distance">${d.name}</div>
          <div class="prediction-time">${formatTime(predictedTime)}</div>
        `;
          predictions.appendChild(card);
        });
      }

      function calculateZones() {
        const mins = parseInt(document.getElementById("zoneMinutes").value) || 0;
        const secs = parseInt(document.getElementById("zoneSeconds").value) || 0;
        const racePace = mins * 60 + secs;

        if (racePace <= 0) {
          alert("请输入有效的配速");
          return;
        }

        const zones = [
          { name: "轻松跑 (Easy)", factor: [1.2, 1.35], class: "zone-easy" },
          { name: "节奏跑 (Tempo)", factor: [1.05, 1.12], class: "zone-tempo" },
          { name: "乳酸门槛 (Threshold)", factor: [0.98, 1.05], class: "zone-threshold" },
          { name: "间歇训练 (Interval)", factor: [0.88, 0.95], class: "zone-interval" }
        ];

        const zonesContainer = document.getElementById("paceZones");
        zonesContainer.innerHTML = "";

        zones.forEach((zone) => {
          const minPace = racePace * zone.factor[0];
          const maxPace = racePace * zone.factor[1];
          const div = document.createElement("div");
          div.className = `zone ${zone.class}`;
          div.innerHTML = `
          <span class="zone-name">${zone.name}</span>
          <span class="zone-pace">${formatPace(minPace)} - ${formatPace(maxPace)}</span>
        `;
          zonesContainer.appendChild(div);
        });
      }

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
    
