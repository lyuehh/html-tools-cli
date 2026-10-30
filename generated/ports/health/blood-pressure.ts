// @ts-nocheck
// Generated from tools/health/blood-pressure.html
// Source SHA-256: 6ff3b6265e83625d1bbb091affec50e48d2b9ae404a44435172bad09446c969d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Constants & Data
      // ============================================
      const LS_KEY = "bp_history";
      let history = [];

      const categories = [
        {
          name: "理想血压",
          sysMax: 120,
          diaMax: 80,
          class: "category-optimal",
          color: "#22c55e",
          desc: "血压非常健康，继续保持良好的生活习惯"
        },
        {
          name: "正常血压",
          sysMax: 130,
          diaMax: 80,
          class: "category-normal",
          color: "#3b82f6",
          desc: "血压处于正常范围，注意定期监测"
        },
        {
          name: "血压偏高",
          sysMax: 140,
          diaMax: 90,
          class: "category-elevated",
          color: "#eab308",
          desc: "血压略高于正常，建议调整生活方式"
        },
        {
          name: "高血压1级",
          sysMax: 160,
          diaMax: 100,
          class: "category-high1",
          color: "#f97316",
          desc: "轻度高血压，建议就医咨询并改善生活方式"
        },
        {
          name: "高血压2级",
          sysMax: 180,
          diaMax: 110,
          class: "category-high2",
          color: "#ef4444",
          desc: "中度高血压，需要医疗干预和药物治疗"
        },
        {
          name: "高血压危象",
          sysMax: 999,
          diaMax: 999,
          class: "category-crisis",
          color: "#991b1b",
          desc: "血压严重升高，请立即就医！"
        }
      ];

      // ============================================
      // History Management
      // ============================================
      function loadHistory() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          history = JSON.parse(saved);
        }
        renderHistory();
      }

      function saveHistory() {
        localStorage.setItem(LS_KEY, JSON.stringify(history));
      }

      function getCategory(systolic, diastolic) {
        for (const cat of categories) {
          if (systolic < cat.sysMax && diastolic < cat.diaMax) {
            return cat;
          }
        }
        return categories[categories.length - 1];
      }

      // ============================================
      // Analysis & Visualization
      // ============================================
      function analyze() {
        const systolic = parseInt(document.getElementById("systolic").value) || 120;
        const diastolic = parseInt(document.getElementById("diastolic").value) || 80;

        const category = getCategory(systolic, diastolic);

        const hero = document.getElementById("resultHero");
        hero.className = "result-hero " + category.class;
        document.getElementById("categoryName").textContent = category.name;
        document.getElementById("categoryDesc").textContent = category.desc;

        updateChart(systolic, diastolic);
        renderTips(category);
      }

      function updateChart(systolic, diastolic) {
        const marker = document.getElementById("bpMarker");

        const xPercent = Math.min(100, Math.max(0, ((systolic - 60) / 140) * 100));
        const yPercent = Math.min(100, Math.max(0, 100 - ((diastolic - 40) / 90) * 100));

        marker.style.left = xPercent + "%";
        marker.style.top = yPercent + "%";

        const zones = document.getElementById("bpZones");
        zones.textContent = "";

        const zoneData = [
          { sysMin: 60, sysMax: 120, diaMin: 40, diaMax: 80, color: "#22c55e" },
          { sysMin: 120, sysMax: 130, diaMin: 40, diaMax: 80, color: "#3b82f6" },
          { sysMin: 130, sysMax: 140, diaMin: 80, diaMax: 90, color: "#eab308" },
          { sysMin: 140, sysMax: 160, diaMin: 90, diaMax: 100, color: "#f97316" },
          { sysMin: 160, sysMax: 200, diaMin: 100, diaMax: 130, color: "#ef4444" }
        ];

        zoneData.forEach((zone) => {
          const div = document.createElement("div");
          div.className = "bp-zone";
          div.style.background = zone.color;
          div.style.left = ((zone.sysMin - 60) / 140) * 100 + "%";
          div.style.right = 100 - ((zone.sysMax - 60) / 140) * 100 + "%";
          div.style.top = 100 - ((zone.diaMax - 40) / 90) * 100 + "%";
          div.style.bottom = ((zone.diaMin - 40) / 90) * 100 + "%";
          zones.appendChild(div);
        });
      }

      // ============================================
      // Recording Functions
      // ============================================
      function saveReading() {
        const systolic = parseInt(document.getElementById("systolic").value) || 120;
        const diastolic = parseInt(document.getElementById("diastolic").value) || 80;
        const pulse = document.getElementById("pulse").value;

        const reading = {
          systolic,
          diastolic,
          pulse: pulse ? parseInt(pulse) : null,
          time: new Date().toISOString(),
          category: getCategory(systolic, diastolic).name
        };

        history.unshift(reading);
        if (history.length > 100) history.pop();

        saveHistory();
        renderHistory();
      }

      function deleteReading(index) {
        history.splice(index, 1);
        saveHistory();
        renderHistory();
      }

      function clearHistory() {
        if (confirm("确定要清除所有历史记录吗？")) {
          history = [];
          saveHistory();
          renderHistory();
        }
      }

      function renderHistory() {
        const container = document.getElementById("history");
        container.textContent = "";

        document.getElementById("recordCount").textContent = history.length + " 条记录";

        if (history.length === 0) {
          const div = document.createElement("div");
          div.className = "empty-state";
          div.textContent = "暂无记录";
          container.appendChild(div);
          return;
        }

        history.slice(0, 20).forEach((reading, index) => {
          const div = document.createElement("div");
          div.className = "history-item";

          const left = document.createElement("div");
          left.className = "history-left";

          const readingDiv = document.createElement("div");
          readingDiv.className = "reading";
          readingDiv.textContent =
            reading.systolic +
            "/" +
            reading.diastolic +
            " mmHg" +
            (reading.pulse ? " · " + reading.pulse + " bpm" : "");

          const timeDiv = document.createElement("div");
          timeDiv.className = "time";
          timeDiv.textContent = new Date(reading.time).toLocaleString("zh-CN");

          left.appendChild(readingDiv);
          left.appendChild(timeDiv);

          const right = document.createElement("div");
          right.className = "history-right";

          const categorySpan = document.createElement("span");
          categorySpan.className = "category";
          const cat = categories.find((c) => c.name === reading.category);
          categorySpan.style.background = cat ? cat.color : "#666";
          categorySpan.textContent = reading.category;

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = () => deleteReading(index);

          right.appendChild(categorySpan);
          right.appendChild(deleteBtn);

          div.appendChild(left);
          div.appendChild(right);
          container.appendChild(div);
        });
      }

      function renderTips(category) {
        const container = document.getElementById("tips");
        container.textContent = "";

        let tips = [];

        if (category.name === "理想血压" || category.name === "正常血压") {
          tips = [
            { title: "保持健康", text: "继续保持均衡饮食、适量运动和充足睡眠的良好生活习惯" },
            { title: "定期监测", text: "建议每月测量1-2次血压，关注变化趋势" }
          ];
        } else if (category.name === "血压偏高") {
          tips = [
            { title: "控制饮食", text: "减少盐分摄入（每天不超过6克），多吃蔬果，控制体重" },
            { title: "规律运动", text: "每周进行150分钟中等强度有氧运动，如快走、游泳" },
            { title: "戒烟限酒", text: "戒烟并限制酒精摄入，减轻心血管负担" }
          ];
        } else {
          tips = [
            { title: "及时就医", text: "建议尽快就医，在医生指导下进行治疗" },
            { title: "规律服药", text: "如已确诊高血压，请遵医嘱规律服药，不要自行停药" },
            { title: "监测血压", text: "每天早晚各测量一次血压，记录数据供医生参考" },
            { title: "生活调整", text: "低盐饮食、适量运动、控制体重、保持情绪稳定" }
          ];
        }

        tips.forEach((tip) => {
          const div = document.createElement("div");
          div.className = "tip";

          const title = document.createElement("div");
          title.className = "tip-title";
          title.textContent = tip.title;

          const text = document.createElement("div");
          text.className = "tip-text";
          text.textContent = tip.text;

          div.appendChild(title);
          div.appendChild(text);
          container.appendChild(div);
        });
      }

      // ============================================
      // Theme Management
      // ============================================
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      loadHistory();
      analyze();
    
