// @ts-nocheck
// Generated from tools/food/fermentation-timer.html
// Source SHA-256: 2ae74beed78ed988e3f2556995e383551a73671e0d1be217cb92dc4ef2474799
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const presets = {
        bread: {
          name: "面包一发",
          hours: 1,
          minutes: 30,
          tips: "温度影响发酵速度很大。25°C约60-90分钟，30°C约45-60分钟。面团涨到2倍大即可。用手指戳洞，不回弹说明发酵完成。"
        },
        bread2: {
          name: "面包二发",
          hours: 0,
          minutes: 40,
          tips: "二发时间通常是一发的一半。整形后放入烤盘，盖上保鲜膜。涨到1.5-2倍大即可进烤箱。"
        },
        yogurt: {
          name: "酸奶",
          hours: 10,
          minutes: 0,
          tips: "最佳发酵温度42-45°C。时间越长酸度越高。8小时口感温和，12小时更酸浓。发酵后冷藏可增加浓稠度。"
        },
        sourdough: {
          name: "酵种",
          hours: 6,
          minutes: 0,
          tips: "室温发酵4-8小时，体积涨到2-3倍。气泡丰富、香气浓郁时使用最佳。可冷藏保存，使用前回温激活。"
        },
        kimchi: {
          name: "泡菜",
          hours: 48,
          minutes: 0,
          tips: "室温发酵1-2天启动乳酸菌，然后转冷藏慢发酵。夏天发酵快，冬天慢。3-5天即可食用，一周后风味最佳。"
        },
        kombucha: {
          name: "康普茶",
          hours: 168,
          minutes: 0,
          tips: "一发7-14天，取决于温度和口味偏好。PH降到3.5以下即可。二发加果汁2-3天增加气泡。注意保持无菌操作。"
        }
      };

      let totalSeconds = 5400;
      let remainingSeconds = 5400;
      let timerInterval = null;
      let isRunning = false;
      let currentPreset = "bread";
      let history = JSON.parse(localStorage.getItem("fermentHistory") || "[]");

      function selectPreset(type) {
        currentPreset = type;
        const preset = presets[type];

        document.querySelectorAll(".preset-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.type === type);
        });

        document.getElementById("days").value = Math.floor(preset.hours / 24);
        document.getElementById("hours").value = preset.hours % 24;
        document.getElementById("minutes").value = preset.minutes;
        document.getElementById("timerLabel").textContent = preset.name;
        document.getElementById("tips").textContent = preset.tips;

        updateCustomTime();
      }

      function updateCustomTime() {
        const days = parseInt(document.getElementById("days").value) || 0;
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;

        totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60;
        remainingSeconds = totalSeconds;
        updateDisplay();
      }

      function updateTemp() {
        const temp = document.getElementById("tempSlider").value;
        document.getElementById("tempValue").textContent = temp + "°C";

        const baseFactor = 1;
        const factor = 1 + (temp - 25) * 0.05;
        const adjusted = Math.round(totalSeconds / factor);
        remainingSeconds = adjusted;
        updateDisplay();
      }

      function formatTime(seconds) {
        const d = Math.floor(seconds / 86400);
        const h = Math.floor((seconds % 86400) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (d > 0) {
          return (
            d +
            "天 " +
            String(h).padStart(2, "0") +
            ":" +
            String(m).padStart(2, "0") +
            ":" +
            String(s).padStart(2, "0")
          );
        }
        return (
          String(h).padStart(2, "0") +
          ":" +
          String(m).padStart(2, "0") +
          ":" +
          String(s).padStart(2, "0")
        );
      }

      function updateDisplay() {
        document.getElementById("timerDisplay").textContent = formatTime(remainingSeconds);

        const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 1;
        const circumference = 2 * Math.PI * 90;
        const offset = circumference * (1 - progress);
        document.getElementById("progressCircle").style.strokeDashoffset = offset;
      }

      function toggleTimer() {
        if (isRunning) {
          clearInterval(timerInterval);
          isRunning = false;
          document.getElementById("startBtn").textContent = "继续";
        } else {
          isRunning = true;
          document.getElementById("startBtn").textContent = "暂停";
          timerInterval = setInterval(function () {
            if (remainingSeconds > 0) {
              remainingSeconds--;
              updateDisplay();
            } else {
              clearInterval(timerInterval);
              isRunning = false;
              document.getElementById("startBtn").textContent = "开始";
              notifyComplete();
            }
          }, 1000);
        }
      }

      function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        remainingSeconds = totalSeconds;
        document.getElementById("startBtn").textContent = "开始";
        updateDisplay();
      }

      function notifyComplete() {
        const preset = presets[currentPreset] || { name: "自定义" };

        history.unshift({
          name: preset.name,
          time: formatTime(totalSeconds),
          date: new Date().toLocaleString("zh-CN")
        });

        if (history.length > 10) history.pop();
        localStorage.setItem("fermentHistory", JSON.stringify(history));
        renderHistory();

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("发酵完成！", { body: preset.name + " 发酵计时结束" });
        }
        alert("发酵完成！");
      }

      function renderHistory() {
        const list = document.getElementById("historyList");
        while (list.firstChild) list.removeChild(list.firstChild);

        if (history.length === 0) {
          const empty = document.createElement("div");
          empty.style.cssText = "color: var(--text-secondary); text-align: center; padding: 20px;";
          empty.textContent = "暂无记录";
          list.appendChild(empty);
          return;
        }

        history.forEach(function (item) {
          const div = document.createElement("div");
          div.className = "history-item";

          const info = document.createElement("div");
          info.className = "info";
          const name = document.createElement("div");
          name.className = "name";
          name.textContent = item.name;
          const time = document.createElement("div");
          time.className = "time";
          time.textContent = item.time;
          info.appendChild(name);
          info.appendChild(time);

          const status = document.createElement("div");
          status.className = "status";
          status.textContent = item.date;

          div.appendChild(info);
          div.appendChild(status);
          list.appendChild(div);
        });
      }

      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
      }

      selectPreset("bread");
      renderHistory();

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
    
