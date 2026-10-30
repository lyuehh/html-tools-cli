// @ts-nocheck
// Generated from tools/social-media/follower-growth.html
// Source SHA-256: 882c95aab4592ff93e03da49b98cc2e4cb9fe47c88cb44513ba5baa424ae7a9e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const currentFollowersEl = document.getElementById("currentFollowers");
      const lastWeekFollowersEl = document.getElementById("lastWeekFollowers");
      const lastMonthFollowersEl = document.getElementById("lastMonthFollowers");
      const growthModelEl = document.getElementById("growthModel");
      const resultsSectionEl = document.getElementById("resultsSection");
      const predictionCardsEl = document.getElementById("predictionCards");
      const chartEl = document.getElementById("chart");
      const tipsListEl = document.getElementById("tipsList");

      const LS_KEY = "follower_growth_v1";

      function predict() {
        const current = parseInt(currentFollowersEl.value, 10) || 0;
        const lastWeek = parseInt(lastWeekFollowersEl.value, 10) || 0;
        const lastMonth = parseInt(lastMonthFollowersEl.value, 10) || 0;
        const model = growthModelEl.value;

        if (current === 0 || lastWeek === 0) {
          alert("请输入当前粉丝数和上周粉丝数");
          return;
        }

        // Calculate growth rates
        const weeklyGrowth = current - lastWeek;
        const weeklyGrowthRate = (weeklyGrowth / lastWeek) * 100;

        let monthlyGrowthRate;
        if (lastMonth > 0) {
          monthlyGrowthRate = ((current - lastMonth) / lastMonth) * 100;
        } else {
          monthlyGrowthRate = weeklyGrowthRate * 4;
        }

        // Predict future followers
        const predictions = calculatePredictions(current, weeklyGrowthRate, model);

        displayPredictions(predictions, current, weeklyGrowthRate);
        displayChart(predictions, current);
        displayTips(weeklyGrowthRate);

        resultsSectionEl.style.display = "block";
        saveToStorage();
      }

      function calculatePredictions(current, weeklyRate, model) {
        const predictions = [];
        const periods = [
          { label: "1周后", weeks: 1 },
          { label: "1月后", weeks: 4 },
          { label: "3月后", weeks: 12 },
          { label: "6月后", weeks: 26 },
          { label: "1年后", weeks: 52 }
        ];

        for (const period of periods) {
          let predicted;
          const weeks = period.weeks;

          if (model === "linear") {
            const weeklyGain = current * (weeklyRate / 100);
            predicted = current + weeklyGain * weeks;
          } else if (model === "compound") {
            predicted = current * Math.pow(1 + weeklyRate / 100, weeks);
          } else {
            // Conservative: reduce growth rate over time
            const decayFactor = Math.pow(0.98, weeks);
            const adjustedRate = weeklyRate * decayFactor;
            predicted = current * Math.pow(1 + adjustedRate / 100, weeks);
          }

          predictions.push({
            label: period.label,
            value: Math.round(predicted),
            growth: Math.round(predicted - current)
          });
        }

        return predictions;
      }

      function displayPredictions(predictions, current, weeklyRate) {
        predictionCardsEl.textContent = "";

        // Add current card
        const currentCard = document.createElement("div");
        currentCard.className = "prediction-card highlight";

        const currentPeriod = document.createElement("div");
        currentPeriod.className = "prediction-period";
        currentPeriod.textContent = "当前";

        const currentValue = document.createElement("div");
        currentValue.className = "prediction-value";
        currentValue.textContent = formatNumber(current);

        const currentGrowth = document.createElement("div");
        currentGrowth.className = "prediction-growth";
        currentGrowth.textContent = "周增长率: " + weeklyRate.toFixed(1) + "%";

        currentCard.appendChild(currentPeriod);
        currentCard.appendChild(currentValue);
        currentCard.appendChild(currentGrowth);
        predictionCardsEl.appendChild(currentCard);

        // Add prediction cards
        for (const pred of predictions) {
          const card = document.createElement("div");
          card.className = "prediction-card";

          const period = document.createElement("div");
          period.className = "prediction-period";
          period.textContent = pred.label;

          const value = document.createElement("div");
          value.className = "prediction-value";
          value.textContent = formatNumber(pred.value);

          const growth = document.createElement("div");
          growth.className = "prediction-growth";
          growth.textContent = "+" + formatNumber(pred.growth);

          card.appendChild(period);
          card.appendChild(value);
          card.appendChild(growth);
          predictionCardsEl.appendChild(card);
        }
      }

      function displayChart(predictions, current) {
        chartEl.textContent = "";

        const allValues = [current].concat(
          predictions.map(function (p) {
            return p.value;
          })
        );
        const maxValue = Math.max.apply(null, allValues);
        const labels = ["现在", "1周", "1月", "3月", "6月", "1年"];

        for (let i = 0; i < allValues.length; i++) {
          const container = document.createElement("div");
          container.className = "chart-bar-container";

          const bar = document.createElement("div");
          bar.className = "chart-bar" + (i === 0 ? " current" : "");
          const height = (allValues[i] / maxValue) * 160;
          bar.style.height = height + "px";

          const barValue = document.createElement("div");
          barValue.className = "chart-bar-value";
          barValue.textContent = formatNumber(allValues[i]);
          bar.appendChild(barValue);

          const label = document.createElement("div");
          label.className = "chart-label";
          label.textContent = labels[i];

          container.appendChild(bar);
          container.appendChild(label);
          chartEl.appendChild(container);
        }
      }

      function displayTips(weeklyRate) {
        tipsListEl.textContent = "";

        const tips = [];

        if (weeklyRate < 1) {
          tips.push("增长率偏低，建议增加发布频率和互动");
          tips.push("尝试与其他创作者合作扩大曝光");
          tips.push("分析高表现内容，复制成功模式");
        } else if (weeklyRate < 3) {
          tips.push("保持当前节奏，继续优化内容质量");
          tips.push("尝试不同的内容形式（视频/图文/直播）");
          tips.push("关注热门话题，及时参与讨论");
        } else {
          tips.push("增长势头良好，注意内容质量不要下降");
          tips.push("考虑建立粉丝社群增加粘性");
          tips.push("可以尝试付费推广加速增长");
        }

        tips.push("定期分析数据，了解粉丝画像");
        tips.push("保持与粉丝的互动，回复评论和私信");

        for (const tip of tips) {
          const li = document.createElement("li");
          li.textContent = tip;
          tipsListEl.appendChild(li);
        }
      }

      function formatNumber(num) {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
      }

      function saveToStorage() {
        const data = {
          current: currentFollowersEl.value,
          lastWeek: lastWeekFollowersEl.value,
          lastMonth: lastMonthFollowersEl.value,
          model: growthModelEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.current) currentFollowersEl.value = data.current;
            if (data.lastWeek) lastWeekFollowersEl.value = data.lastWeek;
            if (data.lastMonth) lastMonthFollowersEl.value = data.lastMonth;
            if (data.model) growthModelEl.value = data.model;
          }
        } catch (e) {}
      }

      document.getElementById("btnPredict").addEventListener("click", predict);

      document.getElementById("btnClear").addEventListener("click", function () {
        currentFollowersEl.value = "";
        lastWeekFollowersEl.value = "";
        lastMonthFollowersEl.value = "";
        resultsSectionEl.style.display = "none";
        localStorage.removeItem(LS_KEY);
      });

      loadFromStorage();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "light" ? "☀️" : "🌙";
        }
      })();
    
