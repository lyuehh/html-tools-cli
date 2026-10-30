// @ts-nocheck
// Generated from tools/health/water-tracker.html
// Source SHA-256: 7c2b289907b9aa9b12fe1626940fdf02d7fca650a4ce884c9293f0cd41f02ec5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const TARGET = 2000; // ml
      let todayData = loadTodayData();

      function loadTodayData() {
        const saved = localStorage.getItem("water_tracker");
        if (!saved) return { date: getToday(), records: [], total: 0 };

        const data = JSON.parse(saved);
        if (data.date !== getToday()) {
          // New day, reset
          return { date: getToday(), records: [], total: 0 };
        }

        return data;
      }

      function saveTodayData() {
        localStorage.setItem("water_tracker", JSON.stringify(todayData));
      }

      function getToday() {
        return new Date().toISOString().split("T")[0];
      }

      function addWater(amount) {
        todayData.records.push({
          time: new Date().toISOString(),
          amount
        });
        todayData.total += amount;

        saveTodayData();
        render();

        // Check if goal reached
        if (todayData.total >= TARGET && todayData.total - amount < TARGET) {
          setTimeout(() => {
            alert("🎉 恭喜！今日饮水目标已达成！");
          }, 500);
        }
      }

      function addCustom() {
        const input = document.getElementById("customAmount");
        const amount = parseInt(input.value);

        if (!amount || amount <= 0) {
          alert("请输入有效的毫升数");
          return;
        }

        addWater(amount);
        input.value = "";
      }

      function deleteRecord(index) {
        const record = todayData.records[index];
        todayData.total -= record.amount;
        todayData.records.splice(index, 1);

        saveTodayData();
        render();
      }

      function clearHistory() {
        if (confirm("确定要清空今日所有记录吗？")) {
          todayData.records = [];
          todayData.total = 0;
          saveTodayData();
          render();
        }
      }

      function formatTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
      }

      function render() {
        // Update progress
        document.getElementById("currentAmount").textContent = todayData.total + " ml";
        document.getElementById("targetAmount").textContent = TARGET;

        const percent = Math.min(100, Math.round((todayData.total / TARGET) * 100));
        const progressBar = document.getElementById("progressBar");
        progressBar.style.width = percent + "%";
        document.getElementById("progressPercent").textContent = percent + "%";

        // Update card style if goal reached
        const progressCard = document.getElementById("progressCard");
        if (todayData.total >= TARGET) {
          progressCard.classList.add("goal-reached");
        } else {
          progressCard.classList.remove("goal-reached");
        }

        // Update history
        const historyList = document.getElementById("historyList");
        if (todayData.records.length === 0) {
          historyList.innerHTML = '<div class="empty-history">今天还没有喝水记录</div>';
          return;
        }

        historyList.innerHTML = todayData.records
          .map(
            (record, index) => `
        <div class="history-item">
          <span class="history-time">${formatTime(record.time)}</span>
          <span class="history-amount">+${record.amount} ml</span>
          <button class="history-delete" onclick="deleteRecord(${index})">×</button>
        </div>
      `
          )
          .reverse()
          .join("");
      }

      // Initialize
      render();

      // Handle Enter key
      document.getElementById("customAmount").addEventListener("keypress", (e) => {
        if (e.key === "Enter") addCustom();
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
    
