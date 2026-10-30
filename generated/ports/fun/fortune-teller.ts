// @ts-nocheck
// Generated from tools/fun/fortune-teller.html
// Source SHA-256: cefeeb04938873cc5f30026fc4f279dc2e923c22e3d3bad18e4398407156d6a1
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      (function () {
        "use strict";

        const FORTUNE_DATA = {
          levels: [
            { name: "大吉", class: "great", icon: "🌟", weight: 10 },
            { name: "中吉", class: "good", icon: "✨", weight: 25 },
            { name: "小吉", class: "good", icon: "🍀", weight: 30 },
            { name: "平", class: "normal", icon: "☯️", weight: 25 },
            { name: "小凶", class: "bad", icon: "🌙", weight: 10 }
          ],
          messages: {
            great: [
              "今日运势极佳，万事顺遂，贵人相助。",
              "星光璀璨照前程，一切努力皆有回报。",
              "好运爆棚的一天，把握机会勇往直前！",
              "今日宜大胆行动，成功就在眼前。"
            ],
            good: [
              "今日运势良好，保持积极心态。",
              "稳中求进，小事顺利，大事可期。",
              "今日适合学习新技能，会有意外收获。",
              "人际关系和谐，适合社交活动。"
            ],
            normal: [
              "今日运势平稳，宜静不宜动。",
              "平凡的一天也有小确幸等着你。",
              "保持平常心，顺其自然最好。",
              "今日适合整理思绪，为未来做准备。"
            ],
            bad: [
              "今日宜低调行事，避免冲突。",
              "小心驶得万年船，谨慎为上。",
              "逆境中蕴藏机遇，保持乐观。",
              "今日不宜冒险，稳扎稳打最重要。"
            ]
          },
          goodThings: [
            "写代码",
            "学习",
            "运动",
            "阅读",
            "冥想",
            "早起",
            "喝咖啡",
            "听音乐",
            "散步",
            "整理",
            "创作",
            "沟通",
            "规划",
            "复盘",
            "尝试新事物",
            "帮助他人"
          ],
          badThings: [
            "熬夜",
            "拖延",
            "冲动消费",
            "争吵",
            "过度劳累",
            "跳过测试",
            "忽略文档",
            "敷衍了事",
            "钻牛角尖"
          ],
          luckyColors: [
            { name: "蓝色", emoji: "💙" },
            { name: "绿色", emoji: "💚" },
            { name: "紫色", emoji: "💜" },
            { name: "金色", emoji: "💛" },
            { name: "白色", emoji: "🤍" },
            { name: "橙色", emoji: "🧡" }
          ],
          luckyNumbers: ["1", "3", "5", "7", "8", "9", "11", "13", "21", "42"],
          luckyDirections: ["东", "南", "西", "北", "东南", "西南", "东北", "西北"]
        };

        // DOM Elements
        const fortuneDate = document.getElementById("fortuneDate");
        const fortuneIcon = document.getElementById("fortuneIcon");
        const fortuneLevel = document.getElementById("fortuneLevel");
        const fortuneMessage = document.getElementById("fortuneMessage");
        const fortuneDetails = document.getElementById("fortuneDetails");
        const goodThing = document.getElementById("goodThing");
        const badThing = document.getElementById("badThing");
        const luckyItems = document.getElementById("luckyItems");
        const drawBtn = document.getElementById("drawBtn");
        const countdown = document.getElementById("countdown");
        const shareSection = document.getElementById("shareSection");
        const shareBtn = document.getElementById("shareBtn");
        const historySection = document.getElementById("historySection");
        const historyList = document.getElementById("historyList");

        function getDateString(date = new Date()) {
          return date.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
          });
        }

        function getTodayKey() {
          const d = new Date();
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }

        function seededRandom(seed) {
          const x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        }

        function pickRandom(arr, seed) {
          return arr[Math.floor(seededRandom(seed) * arr.length)];
        }

        function pickWeighted(items, seed) {
          const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
          let random = seededRandom(seed) * totalWeight;

          for (const item of items) {
            random -= item.weight;
            if (random <= 0) return item;
          }
          return items[items.length - 1];
        }

        function generateFortune(dateKey) {
          // Use date as seed for reproducible results
          const seed = dateKey.split("-").reduce((a, b) => a + parseInt(b), 0);

          const level = pickWeighted(FORTUNE_DATA.levels, seed);
          const messageType =
            level.class === "great"
              ? "great"
              : level.class === "good"
                ? "good"
                : level.class === "normal"
                  ? "normal"
                  : "bad";

          const message = pickRandom(FORTUNE_DATA.messages[messageType], seed + 1);
          const good = pickRandom(FORTUNE_DATA.goodThings, seed + 2);
          const bad = pickRandom(FORTUNE_DATA.badThings, seed + 3);
          const color = pickRandom(FORTUNE_DATA.luckyColors, seed + 4);
          const number = pickRandom(FORTUNE_DATA.luckyNumbers, seed + 5);
          const direction = pickRandom(FORTUNE_DATA.luckyDirections, seed + 6);

          return {
            level,
            message,
            good,
            bad,
            luckyColor: color,
            luckyNumber: number,
            luckyDirection: direction,
            date: dateKey
          };
        }

        function displayFortune(fortune) {
          fortuneIcon.textContent = fortune.level.icon;
          fortuneLevel.textContent = fortune.level.name;
          fortuneLevel.className = `fortune-level ${fortune.level.class}`;
          fortuneMessage.textContent = fortune.message;

          goodThing.textContent = fortune.good;
          badThing.textContent = fortune.bad;
          fortuneDetails.style.display = "grid";

          luckyItems.innerHTML = "";
          const items = [
            { emoji: fortune.luckyColor.emoji, text: `幸运色: ${fortune.luckyColor.name}` },
            { emoji: "🔢", text: `幸运数: ${fortune.luckyNumber}` },
            { emoji: "🧭", text: `幸运方位: ${fortune.luckyDirection}` }
          ];
          items.forEach((item) => {
            const div = document.createElement("div");
            div.className = "lucky-item";
            const span = document.createElement("span");
            span.textContent = item.emoji;
            div.appendChild(span);
            div.appendChild(document.createTextNode(item.text));
            luckyItems.appendChild(div);
          });
          luckyItems.style.display = "flex";

          shareSection.style.display = "block";
          drawBtn.textContent = "今日已求签";
          drawBtn.disabled = true;
        }

        function saveFortune(fortune) {
          const history = JSON.parse(localStorage.getItem("fortuneHistory") || "[]");

          // Check if already exists
          if (history.some((h) => h.date === fortune.date)) return;

          history.unshift({
            date: fortune.date,
            level: fortune.level.name,
            levelClass: fortune.level.class
          });

          // Keep last 7 days
          localStorage.setItem("fortuneHistory", JSON.stringify(history.slice(0, 7)));
          localStorage.setItem("lastFortune", JSON.stringify(fortune));
          localStorage.setItem("lastFortuneDate", fortune.date);
        }

        function loadHistory() {
          let history = [];
          try {
            history = JSON.parse(localStorage.getItem("fortuneHistory") || "[]");
          } catch (e) {
            localStorage.removeItem("fortuneHistory");
          }

          if (history.length === 0) {
            historySection.style.display = "none";
            return;
          }

          historySection.style.display = "block";
          historyList.innerHTML = "";
          history.forEach((h) => {
            const div = document.createElement("div");
            div.className = "history-item";
            const dateSpan = document.createElement("span");
            dateSpan.className = "history-date";
            dateSpan.textContent = h.date || "";
            const levelSpan = document.createElement("span");
            levelSpan.className = "history-level " + (h.levelClass || "");
            levelSpan.textContent = h.level || "";
            div.appendChild(dateSpan);
            div.appendChild(levelSpan);
            historyList.appendChild(div);
          });
        }

        function checkTodayFortune() {
          const todayKey = getTodayKey();
          const lastDate = localStorage.getItem("lastFortuneDate");

          if (lastDate === todayKey) {
            const fortune = JSON.parse(localStorage.getItem("lastFortune"));
            displayFortune(fortune);
            updateCountdown();
          }
        }

        function updateCountdown() {
          const now = new Date();
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0);

          const diff = tomorrow - now;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          countdown.textContent = `距离下次求签: ${hours}小时${minutes}分钟`;
          countdown.style.display = "block";
        }

        function drawFortune() {
          const todayKey = getTodayKey();

          // Animation
          fortuneIcon.classList.add("shaking");
          drawBtn.disabled = true;
          drawBtn.textContent = "求签中...";

          setTimeout(() => {
            fortuneIcon.classList.remove("shaking");

            const fortune = generateFortune(todayKey);
            displayFortune(fortune);
            saveFortune(fortune);
            loadHistory();
            updateCountdown();
          }, 1000);
        }

        function copyShareText() {
          const lastFortune = JSON.parse(localStorage.getItem("lastFortune"));
          if (!lastFortune) return;

          const text = `🔮 今日运势 - ${lastFortune.level.name}

${lastFortune.message}

✅ 宜: ${lastFortune.good}
❌ 忌: ${lastFortune.bad}
${lastFortune.luckyColor.emoji} 幸运色: ${lastFortune.luckyColor.name}
🔢 幸运数: ${lastFortune.luckyNumber}
🧭 幸运方位: ${lastFortune.luckyDirection}

— 来自 WebUtils 今日运势`;

          navigator.clipboard.writeText(text).then(() => {
            shareBtn.textContent = "已复制!";
            setTimeout(() => {
              shareBtn.textContent = "复制分享文案";
            }, 2000);
          });
        }

        // Event Listeners
        drawBtn.addEventListener("click", drawFortune);
        shareBtn.addEventListener("click", copyShareText);

        // Initialize
        fortuneDate.textContent = getDateString();
        checkTodayFortune();
        loadHistory();
      })();

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
    
