// @ts-nocheck
// Generated from tools/parenting/growth-tracker.html
// Source SHA-256: 7f1da5532cacbb038c7e594513dc09a8a55f128b1256b998d61438f4b6e20263
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const STORAGE_KEY = "html_tools_growth_tracker_v1";
      let records = [];

      // Simplified WHO percentile approximation (for demonstration)
      // In production, use actual WHO growth charts data
      function estimatePercentile(value, gender, ageMonths, type) {
        // This is a simplified approximation - real WHO charts should be used
        // Using rough averages for demonstration
        let p50, p3, p97;

        if (type === "height") {
          // Rough height estimates (cm)
          if (gender === "male") {
            p50 = 75 + ageMonths * 0.8;
            p3 = p50 - 6;
            p97 = p50 + 6;
          } else {
            p50 = 74 + ageMonths * 0.75;
            p3 = p50 - 6;
            p97 = p50 + 6;
          }
        } else {
          // Rough weight estimates (kg)
          if (gender === "male") {
            p50 = 9 + ageMonths * 0.15;
            p3 = p50 - 2;
            p97 = p50 + 3;
          } else {
            p50 = 8.5 + ageMonths * 0.14;
            p3 = p50 - 2;
            p97 = p50 + 3;
          }
        }

        if (value < p3) return "P3";
        if (value > p97) return "P97";

        const percentile = 3 + ((value - p3) / (p97 - p3)) * 94;
        return "P" + Math.round(percentile);
      }

      function calculate() {
        const gender = document.getElementById("gender").value;
        const ageMonths = parseFloat(document.getElementById("ageMonths").value);
        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);

        if (!ageMonths || !height || !weight) {
          alert("请填写完整信息");
          return;
        }

        if (ageMonths < 0 || ageMonths > 240) {
          alert("年龄范围：0-240个月（0-20岁）");
          return;
        }

        const heightP = estimatePercentile(height, gender, ageMonths, "height");
        const weightP = estimatePercentile(weight, gender, ageMonths, "weight");

        document.getElementById("heightPercentile").textContent = heightP;
        document.getElementById("weightPercentile").textContent = weightP;
        document.getElementById("resultCard").classList.add("show");

        // Save record
        records.unshift({
          id: Date.now(),
          date: new Date().toISOString(),
          gender,
          ageMonths,
          height,
          weight,
          heightP,
          weightP
        });

        saveData();
        renderHistory();
      }

      function deleteRecord(id) {
        if (!confirm("确定要删除这条记录吗？")) return;
        records = records.filter((r) => r.id !== id);
        saveData();
        renderHistory();
      }

      function renderHistory() {
        const container = document.getElementById("historyList");

        if (records.length === 0) {
          container.innerHTML = '<div class="empty-state">暂无记录</div>';
          return;
        }

        container.innerHTML = records
          .map(
            (r) => `
        <div class="history-item">
          <div class="history-date">${new Date(r.date).toLocaleDateString("zh-CN")}</div>
          <div class="history-data">
            ${r.ageMonths}个月 ·
            ${r.height}cm (${r.heightP}) ·
            ${r.weight}kg (${r.weightP})
          </div>
          <button class="history-delete" onclick="deleteRecord(${r.id})">×</button>
        </div>
      `
          )
          .join("");
      }

      function loadData() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          records = saved ? JSON.parse(saved) : [];
        } catch (e) {
          records = [];
        }
        renderHistory();
      }

      function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      }

      // Initialize
      loadData();

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
    
