// @ts-nocheck
// Generated from tools/social-media/post-scheduler.html
// Source SHA-256: 1caa4d896a3bf14abac073d8d7a4bdbc4efba5cb891cff7a4b6c0de04730f7a4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const platformEl = document.getElementById("platform");
      const audienceEl = document.getElementById("audience");
      const timezoneEl = document.getElementById("timezone");
      const timeGridEl = document.getElementById("timeGrid");
      const bestTimesEl = document.getElementById("bestTimes");
      const tipsListEl = document.getElementById("tipsList");

      const LS_KEY = "post_scheduler_v1";

      const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const timeSlots = ["6-9", "9-12", "12-14", "14-17", "17-20", "20-23", "23-6"];

      const scheduleData = {
        instagram: {
          general: {
            hot: [
              { day: 0, slot: 4 },
              { day: 0, slot: 5 },
              { day: 2, slot: 4 },
              { day: 2, slot: 5 },
              { day: 4, slot: 4 },
              { day: 4, slot: 5 },
              { day: 5, slot: 3 },
              { day: 5, slot: 4 },
              { day: 6, slot: 3 },
              { day: 6, slot: 4 }
            ],
            warm: [
              { day: 0, slot: 2 },
              { day: 1, slot: 4 },
              { day: 3, slot: 4 },
              { day: 5, slot: 2 },
              { day: 6, slot: 2 }
            ],
            bestTimes: ["周三 17:00-20:00", "周五 17:00-20:00", "周末 14:00-17:00"],
            tips: [
              "Instagram 用户在通勤时间和晚间最活跃",
              "周末下午适合发布生活方式内容",
              "避免凌晨发布，互动率较低"
            ]
          }
        },
        twitter: {
          general: {
            hot: [
              { day: 0, slot: 0 },
              { day: 0, slot: 2 },
              { day: 1, slot: 0 },
              { day: 1, slot: 2 },
              { day: 2, slot: 0 },
              { day: 2, slot: 2 },
              { day: 3, slot: 0 },
              { day: 3, slot: 2 },
              { day: 4, slot: 0 },
              { day: 4, slot: 2 }
            ],
            warm: [
              { day: 0, slot: 4 },
              { day: 1, slot: 4 },
              { day: 2, slot: 4 },
              { day: 3, slot: 4 },
              { day: 4, slot: 4 }
            ],
            bestTimes: ["工作日 8:00-9:00", "工作日 12:00-13:00", "工作日 17:00-18:00"],
            tips: [
              "Twitter/X 用户喜欢在工作间隙刷新",
              "热点话题要抢时效，越早越好",
              "周末活跃度较低，适合互动型内容"
            ]
          }
        },
        tiktok: {
          general: {
            hot: [
              { day: 0, slot: 5 },
              { day: 1, slot: 5 },
              { day: 2, slot: 5 },
              { day: 3, slot: 5 },
              { day: 4, slot: 5 },
              { day: 5, slot: 4 },
              { day: 5, slot: 5 },
              { day: 6, slot: 4 },
              { day: 6, slot: 5 }
            ],
            warm: [
              { day: 0, slot: 4 },
              { day: 1, slot: 4 },
              { day: 2, slot: 4 },
              { day: 3, slot: 4 },
              { day: 4, slot: 4 },
              { day: 5, slot: 3 },
              { day: 6, slot: 3 }
            ],
            bestTimes: ["每天 19:00-23:00", "周末 14:00-17:00", "周五晚间"],
            tips: [
              "TikTok 晚间是黄金时段",
              "周五发布有助于周末传播",
              "短视频建议提前1-2小时发布预热"
            ]
          }
        },
        weibo: {
          general: {
            hot: [
              { day: 0, slot: 2 },
              { day: 0, slot: 5 },
              { day: 1, slot: 2 },
              { day: 1, slot: 5 },
              { day: 2, slot: 2 },
              { day: 2, slot: 5 },
              { day: 3, slot: 2 },
              { day: 3, slot: 5 },
              { day: 4, slot: 2 },
              { day: 4, slot: 5 }
            ],
            warm: [
              { day: 0, slot: 0 },
              { day: 1, slot: 0 },
              { day: 5, slot: 2 },
              { day: 5, slot: 5 },
              { day: 6, slot: 2 },
              { day: 6, slot: 5 }
            ],
            bestTimes: ["工作日 12:00-14:00", "每天 20:00-22:00", "早高峰 7:00-9:00"],
            tips: ["微博用户午休和晚间最活跃", "热搜话题要把握时效性", "周末互动量相对较低"]
          }
        },
        xiaohongshu: {
          general: {
            hot: [
              { day: 0, slot: 5 },
              { day: 1, slot: 5 },
              { day: 2, slot: 5 },
              { day: 3, slot: 5 },
              { day: 4, slot: 5 },
              { day: 5, slot: 4 },
              { day: 5, slot: 5 },
              { day: 6, slot: 4 },
              { day: 6, slot: 5 }
            ],
            warm: [
              { day: 0, slot: 2 },
              { day: 1, slot: 2 },
              { day: 2, slot: 2 },
              { day: 3, slot: 2 },
              { day: 4, slot: 2 },
              { day: 5, slot: 2 },
              { day: 6, slot: 2 }
            ],
            bestTimes: ["每天 20:00-22:00", "周末 12:00-14:00", "周五晚间"],
            tips: [
              "小红书用户睡前浏览习惯强",
              "护肤美妆内容晚间效果好",
              "周末适合发布探店、出行内容"
            ]
          }
        },
        linkedin: {
          general: {
            hot: [
              { day: 1, slot: 0 },
              { day: 1, slot: 1 },
              { day: 2, slot: 0 },
              { day: 2, slot: 1 },
              { day: 3, slot: 0 },
              { day: 3, slot: 1 }
            ],
            warm: [
              { day: 0, slot: 0 },
              { day: 0, slot: 1 },
              { day: 3, slot: 0 },
              { day: 3, slot: 1 },
              { day: 4, slot: 0 }
            ],
            bestTimes: ["周二至周四 8:00-10:00", "工作日午休时间", "避开周末"],
            tips: ["LinkedIn 适合工作时间发布", "周二至周四是最佳时段", "专业内容建议上午发布"]
          }
        },
        facebook: {
          general: {
            hot: [
              { day: 2, slot: 2 },
              { day: 2, slot: 5 },
              { day: 3, slot: 2 },
              { day: 3, slot: 5 },
              { day: 4, slot: 2 },
              { day: 4, slot: 5 }
            ],
            warm: [
              { day: 0, slot: 2 },
              { day: 1, slot: 2 },
              { day: 5, slot: 3 },
              { day: 6, slot: 3 }
            ],
            bestTimes: ["周三至周五 12:00-14:00", "晚间 19:00-21:00", "周末下午"],
            tips: ["Facebook 用户中午和晚间活跃", "视频内容晚间效果更好", "周末适合家庭和生活内容"]
          }
        },
        youtube: {
          general: {
            hot: [
              { day: 3, slot: 3 },
              { day: 3, slot: 4 },
              { day: 4, slot: 3 },
              { day: 4, slot: 4 },
              { day: 5, slot: 3 },
              { day: 5, slot: 4 },
              { day: 6, slot: 2 },
              { day: 6, slot: 3 }
            ],
            warm: [
              { day: 0, slot: 4 },
              { day: 1, slot: 4 },
              { day: 2, slot: 4 },
              { day: 5, slot: 5 },
              { day: 6, slot: 4 }
            ],
            bestTimes: ["周四/周五 14:00-16:00", "周末上午", "避免周一发布"],
            tips: [
              "YouTube 建议下午发布让算法推广",
              "周四周五发布为周末观看做准备",
              "视频描述中标注章节提高观看时长"
            ]
          }
        }
      };

      function analyze() {
        const platform = platformEl.value;
        const audience = audienceEl.value;

        const data = scheduleData[platform]?.general || scheduleData.instagram.general;

        renderTimeGrid(data);
        renderBestTimes(data);
        renderTips(data);
        saveToStorage();
      }

      function renderTimeGrid(data) {
        timeGridEl.textContent = "";

        for (let d = 0; d < 7; d++) {
          const col = document.createElement("div");
          col.className = "day-column";

          const header = document.createElement("div");
          header.className = "day-header";
          header.textContent = days[d];
          col.appendChild(header);

          for (let s = 0; s < timeSlots.length; s++) {
            const slot = document.createElement("div");
            slot.className = "time-slot";

            const isHot = data.hot.some(function (h) {
              return h.day === d && h.slot === s;
            });
            const isWarm = data.warm.some(function (w) {
              return w.day === d && w.slot === s;
            });

            if (isHot) {
              slot.classList.add("hot");
            } else if (isWarm) {
              slot.classList.add("warm");
            } else {
              slot.classList.add("normal");
            }

            slot.textContent = timeSlots[s];
            col.appendChild(slot);
          }

          timeGridEl.appendChild(col);
        }
      }

      function renderBestTimes(data) {
        bestTimesEl.textContent = "";

        for (let i = 0; i < data.bestTimes.length; i++) {
          const time = data.bestTimes[i];
          const card = document.createElement("div");
          card.className = "best-time-card" + (i === 0 ? " primary" : "");

          const label = document.createElement("div");
          label.className = "best-time-label";
          label.textContent = i === 0 ? "最佳时段" : "推荐时段 " + i;

          const value = document.createElement("div");
          value.className = "best-time-value";
          value.textContent = time;

          card.appendChild(label);
          card.appendChild(value);
          bestTimesEl.appendChild(card);
        }
      }

      function renderTips(data) {
        tipsListEl.textContent = "";

        for (const tip of data.tips) {
          const li = document.createElement("li");
          li.textContent = tip;
          tipsListEl.appendChild(li);
        }
      }

      function saveToStorage() {
        const settings = {
          platform: platformEl.value,
          audience: audienceEl.value,
          timezone: timezoneEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(settings));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const settings = JSON.parse(saved);
            if (settings.platform) platformEl.value = settings.platform;
            if (settings.audience) audienceEl.value = settings.audience;
            if (settings.timezone) timezoneEl.value = settings.timezone;
          }
        } catch (e) {}
      }

      document.getElementById("btnAnalyze").addEventListener("click", analyze);

      platformEl.addEventListener("change", analyze);
      audienceEl.addEventListener("change", analyze);

      loadFromStorage();
      analyze();

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
    
