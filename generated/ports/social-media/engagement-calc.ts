// @ts-nocheck
// Generated from tools/social-media/engagement-calc.html
// Source SHA-256: 23f813f86d749e8d923c1a2318c7f62fb1775905a031d2047289fd3c5346853b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const followersEl = document.getElementById("followers");
      const likesEl = document.getElementById("likes");
      const commentsEl = document.getElementById("comments");
      const sharesEl = document.getElementById("shares");
      const savesEl = document.getElementById("saves");
      const viewsEl = document.getElementById("views");
      const resultCardsEl = document.getElementById("resultCards");
      const resultsSectionEl = document.getElementById("resultsSection");
      const ratingFillEl = document.getElementById("ratingFill");
      const ratingMessageEl = document.getElementById("ratingMessage");

      const LS_KEY = "engagement_calc_v1";

      function calculate() {
        const followers = parseInt(followersEl.value, 10) || 0;
        const likes = parseInt(likesEl.value, 10) || 0;
        const comments = parseInt(commentsEl.value, 10) || 0;
        const shares = parseInt(sharesEl.value, 10) || 0;
        const saves = parseInt(savesEl.value, 10) || 0;
        const views = parseInt(viewsEl.value, 10) || 0;

        if (followers === 0) {
          alert("请输入粉丝数");
          return;
        }

        const totalEngagement = likes + comments + shares + saves;
        const engagementRate = (totalEngagement / followers) * 100;
        const viewEngagementRate = views > 0 ? (totalEngagement / views) * 100 : 0;
        const avgEngagementPerFollower = totalEngagement / followers;

        displayResults({
          engagementRate: engagementRate,
          viewEngagementRate: viewEngagementRate,
          totalEngagement: totalEngagement,
          avgPerFollower: avgEngagementPerFollower,
          likes: likes,
          comments: comments,
          shares: shares,
          saves: saves,
          followers: followers,
          views: views
        });

        saveToStorage();
      }

      function displayResults(data) {
        resultCardsEl.textContent = "";
        resultsSectionEl.style.display = "block";

        const cards = [
          {
            value: data.engagementRate.toFixed(2) + "%",
            label: "总互动率",
            desc: "基于粉丝数",
            primary: true
          },
          {
            value: data.totalEngagement.toLocaleString(),
            label: "总互动数",
            desc: "点赞+评论+分享+收藏"
          },
          {
            value: data.viewEngagementRate > 0 ? data.viewEngagementRate.toFixed(2) + "%" : "N/A",
            label: "浏览互动率",
            desc: "基于浏览量"
          },
          {
            value: ((data.likes / data.followers) * 100).toFixed(2) + "%",
            label: "点赞率",
            desc: data.likes.toLocaleString() + " 个点赞"
          },
          {
            value: ((data.comments / data.followers) * 100).toFixed(3) + "%",
            label: "评论率",
            desc: data.comments.toLocaleString() + " 条评论"
          },
          {
            value: ((data.shares / data.followers) * 100).toFixed(3) + "%",
            label: "分享率",
            desc: data.shares.toLocaleString() + " 次分享"
          }
        ];

        for (const card of cards) {
          const cardEl = document.createElement("div");
          cardEl.className = "result-card" + (card.primary ? " primary" : "");

          const value = document.createElement("div");
          value.className = "result-value";
          value.textContent = card.value;

          const label = document.createElement("div");
          label.className = "result-label";
          label.textContent = card.label;

          const desc = document.createElement("div");
          desc.className = "result-desc";
          desc.textContent = card.desc;

          cardEl.appendChild(value);
          cardEl.appendChild(label);
          cardEl.appendChild(desc);
          resultCardsEl.appendChild(cardEl);
        }

        // Update rating
        updateRating(data.engagementRate);
      }

      function updateRating(rate) {
        let fillClass, fillWidth, message;

        if (rate >= 6) {
          fillClass = "excellent";
          fillWidth = 100;
          message = "太棒了！你的互动率非常出色，内容表现优秀。继续保持这种高质量的内容创作！";
        } else if (rate >= 3) {
          fillClass = "good";
          fillWidth = 75;
          message = "不错！你的互动率处于良好水平。可以尝试更多互动型内容来进一步提升。";
        } else if (rate >= 1) {
          fillClass = "average";
          fillWidth = 50;
          message = "互动率处于平均水平。建议优化发布时间、增加互动引导、尝试不同内容形式。";
        } else {
          fillClass = "low";
          fillWidth = Math.max(10, rate * 50);
          message = "互动率偏低。建议检查内容与受众匹配度，增加互动话题，优化发布策略。";
        }

        ratingFillEl.className = "rating-fill " + fillClass;
        ratingFillEl.style.width = fillWidth + "%";
        ratingMessageEl.textContent = message;
      }

      function saveToStorage() {
        const data = {
          followers: followersEl.value,
          likes: likesEl.value,
          comments: commentsEl.value,
          shares: sharesEl.value,
          saves: savesEl.value,
          views: viewsEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.followers) followersEl.value = data.followers;
            if (data.likes) likesEl.value = data.likes;
            if (data.comments) commentsEl.value = data.comments;
            if (data.shares) sharesEl.value = data.shares;
            if (data.saves) savesEl.value = data.saves;
            if (data.views) viewsEl.value = data.views;
          }
        } catch (e) {}
      }

      document.getElementById("btnCalculate").addEventListener("click", calculate);

      document.getElementById("btnClear").addEventListener("click", function () {
        followersEl.value = "";
        likesEl.value = "";
        commentsEl.value = "";
        sharesEl.value = "";
        savesEl.value = "";
        viewsEl.value = "";
        resultsSectionEl.style.display = "none";
        localStorage.removeItem(LS_KEY);
      });

      // Auto-calculate on input
      const inputs = [followersEl, likesEl, commentsEl, sharesEl, savesEl, viewsEl];
      for (const input of inputs) {
        input.addEventListener("input", function () {
          if (followersEl.value && (likesEl.value || commentsEl.value || sharesEl.value)) {
            calculate();
          }
        });
      }

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
    
