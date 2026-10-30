// @ts-nocheck
// Generated from tools/office/meeting-cost-calculator.html
// Source SHA-256: d573058ace37b87969ba5c871d805fe4ac8c8a34d6a388bdfef38d6c95901237
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let participants = [
        { id: 1, name: "产品经理", hourlySalary: 200 },
        { id: 2, name: "开发工程师", hourlySalary: 180 },
        { id: 3, name: "设计师", hourlySalary: 150 }
      ];

      let timer = null;
      let seconds = 0;
      let isRunning = false;

      function addParticipant() {
        participants.push({
          id: Date.now(),
          name: "新参会者",
          hourlySalary: 150
        });
        render();
      }

      function removeParticipant(id) {
        if (participants.length <= 1) {
          alert("至少需要1位参会者");
          return;
        }
        participants = participants.filter((p) => p.id !== id);
        render();
      }

      function updateParticipant(id, field, value) {
        const participant = participants.find((p) => p.id === id);
        if (participant) {
          participant[field] = field === "hourlySalary" ? parseFloat(value) || 0 : value;
          calculateCost();
          updateStats();
        }
      }

      function render() {
        const container = document.getElementById("participantsList");

        container.innerHTML = participants
          .map(
            (p) => `
        <div class="participant-row">
          <input type="text" value="${p.name}" onchange="updateParticipant(${p.id}, 'name', this.value)" placeholder="姓名/职位">
          <input type="number" value="${p.hourlySalary}" onchange="updateParticipant(${p.id}, 'hourlySalary', this.value)" placeholder="时薪" min="0" step="10" style="max-width:120px">
          <button onclick="removeParticipant(${p.id})">×</button>
        </div>
      `
          )
          .join("");

        updateStats();
        calculateCost();
      }

      function updateStats() {
        document.getElementById("participantCount").textContent = participants.length;

        const avgSalary =
          participants.reduce((sum, p) => sum + p.hourlySalary, 0) / participants.length;
        document.getElementById("avgSalary").textContent = "¥" + avgSalary.toFixed(0);

        const totalHourlyCost = participants.reduce((sum, p) => sum + p.hourlySalary, 0);
        const costPerMin = totalHourlyCost / 60;
        document.getElementById("costPerMinute").textContent = "¥" + costPerMin.toFixed(2);
      }

      function startTimer() {
        if (isRunning) return;
        isRunning = true;
        document.getElementById("startBtn").textContent = "进行中...";

        timer = setInterval(() => {
          seconds++;
          updateTimerDisplay();
          calculateCost();
        }, 1000);
      }

      function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
        document.getElementById("startBtn").textContent = "继续";
      }

      function resetTimer() {
        pauseTimer();
        seconds = 0;
        updateTimerDisplay();
        calculateCost();
        document.getElementById("startBtn").textContent = "开始会议";
      }

      function updateTimerDisplay() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        document.getElementById("timerValue").textContent =
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      }

      function calculateCost() {
        const totalHourlyCost = participants.reduce((sum, p) => sum + p.hourlySalary, 0);
        const hours = seconds / 3600;
        const cost = totalHourlyCost * hours;

        document.getElementById("costValue").textContent = "¥" + cost.toFixed(2);
      }

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
    
