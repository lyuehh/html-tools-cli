// @ts-nocheck
// Generated from tools/social-media/hashtag-generator.html
// Source SHA-256: e7befd2251152c12e1a3a000a2d6e4286d3d274ec039a7e84bcc63a57957aa43
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const keywordsEl = document.getElementById("keywords");
      const platformEl = document.getElementById("platform");
      const countEl = document.getElementById("count");
      const languageEl = document.getElementById("language");
      const hashtagsContainerEl = document.getElementById("hashtagsContainer");
      const allHashtagsEl = document.getElementById("allHashtags");
      const statusEl = document.getElementById("status");

      const LS_KEY = "hashtag_generator_v1";

      const hashtagDatabase = {
        travel: {
          en: [
            "travel",
            "wanderlust",
            "travelgram",
            "instatravel",
            "travelphotography",
            "explore",
            "adventure",
            "vacation",
            "trip",
            "traveling",
            "traveler",
            "traveltheworld",
            "travelblogger",
            "traveladdict",
            "travelholic"
          ],
          zh: [
            "旅行",
            "旅游",
            "度假",
            "出行",
            "自由行",
            "穷游",
            "背包客",
            "旅行日记",
            "旅行分享",
            "环游世界",
            "打卡",
            "网红景点",
            "旅拍",
            "风景",
            "目的地"
          ]
        },
        food: {
          en: [
            "food",
            "foodie",
            "foodporn",
            "foodphotography",
            "instafood",
            "yummy",
            "delicious",
            "foodstagram",
            "foodlover",
            "cooking",
            "homemade",
            "recipe",
            "foodblogger",
            "eatlocal",
            "foodgasm"
          ],
          zh: [
            "美食",
            "吃货",
            "干饭人",
            "美食分享",
            "美食探店",
            "私房菜",
            "下午茶",
            "甜品",
            "烘焙",
            "火锅",
            "烧烤",
            "网红店",
            "打卡美食",
            "好吃到哭",
            "减肥什么的明天再说"
          ]
        },
        photography: {
          en: [
            "photography",
            "photo",
            "photooftheday",
            "photographer",
            "instagood",
            "picoftheday",
            "portrait",
            "landscape",
            "nature",
            "art",
            "streetphotography",
            "ig_captures",
            "visualsoflife",
            "shoot",
            "camera"
          ],
          zh: [
            "摄影",
            "拍照",
            "写真",
            "人像",
            "风光摄影",
            "街拍",
            "相机",
            "镜头",
            "光影",
            "构图",
            "后期",
            "摄影师",
            "手机摄影",
            "日系",
            "胶片"
          ]
        },
        fashion: {
          en: [
            "fashion",
            "style",
            "ootd",
            "fashionblogger",
            "outfit",
            "streetstyle",
            "fashionista",
            "instafashion",
            "lookbook",
            "stylish",
            "whatiwore",
            "fashionstyle",
            "trendy",
            "fashionweek",
            "designer"
          ],
          zh: [
            "穿搭",
            "时尚",
            "潮流",
            "搭配",
            "今日穿搭",
            "街拍",
            "穿搭分享",
            "时装",
            "潮牌",
            "复古",
            "日系穿搭",
            "韩系",
            "小众",
            "ootd",
            "显瘦穿搭"
          ]
        },
        fitness: {
          en: [
            "fitness",
            "gym",
            "workout",
            "fitnessmotivation",
            "fit",
            "training",
            "health",
            "healthy",
            "bodybuilding",
            "fitfam",
            "exercise",
            "muscle",
            "gains",
            "lifestyle",
            "motivation"
          ],
          zh: [
            "健身",
            "减肥",
            "运动",
            "健身打卡",
            "马甲线",
            "腹肌",
            "增肌",
            "塑形",
            "跑步",
            "瑜伽",
            "有氧",
            "撸铁",
            "健身日记",
            "自律",
            "蜜桃臀"
          ]
        },
        beauty: {
          en: [
            "beauty",
            "makeup",
            "skincare",
            "beautyblogger",
            "cosmetics",
            "makeupartist",
            "beautytips",
            "glam",
            "lipstick",
            "eyeshadow",
            "makeuptutorial",
            "skincareroutine",
            "glow",
            "naturalmakeup",
            "beautyhacks"
          ],
          zh: [
            "美妆",
            "护肤",
            "化妆",
            "妆容",
            "口红",
            "眼影",
            "粉底",
            "素颜",
            "变美",
            "种草",
            "拔草",
            "好物分享",
            "平价替代",
            "妆容教程",
            "空瓶记"
          ]
        },
        tech: {
          en: [
            "tech",
            "technology",
            "gadgets",
            "innovation",
            "coding",
            "developer",
            "programming",
            "software",
            "ai",
            "smartphone",
            "digital",
            "startup",
            "geek",
            "techie",
            "apps"
          ],
          zh: [
            "科技",
            "数码",
            "智能",
            "编程",
            "开发者",
            "极客",
            "手机",
            "电脑",
            "数码好物",
            "科技圈",
            "测评",
            "开箱",
            "效率工具",
            "黑科技",
            "AI"
          ]
        },
        life: {
          en: [
            "life",
            "lifestyle",
            "daily",
            "mood",
            "happy",
            "love",
            "instagood",
            "photooftheday",
            "beautiful",
            "picoftheday",
            "instadaily",
            "me",
            "selfie",
            "friends",
            "smile"
          ],
          zh: [
            "生活",
            "日常",
            "记录生活",
            "生活方式",
            "慢生活",
            "小确幸",
            "仪式感",
            "治愈",
            "心情",
            "随手拍",
            "碎碎念",
            "岁月静好",
            "简单生活",
            "独居",
            "宅家"
          ]
        }
      };

      function detectCategory(keywords) {
        const keywordLower = keywords.toLowerCase();
        const categories = [];

        const categoryMap = {
          travel: ["travel", "trip", "vacation", "旅行", "旅游", "度假", "出行", "景点"],
          food: ["food", "eat", "cook", "recipe", "美食", "吃", "餐", "烹饪", "甜品", "火锅"],
          photography: ["photo", "camera", "shoot", "摄影", "拍照", "镜头", "相机"],
          fashion: ["fashion", "style", "outfit", "clothes", "穿搭", "时尚", "潮流", "衣服"],
          fitness: [
            "fitness",
            "gym",
            "workout",
            "exercise",
            "健身",
            "运动",
            "减肥",
            "跑步",
            "瑜伽"
          ],
          beauty: ["beauty", "makeup", "skincare", "cosmetic", "美妆", "护肤", "化妆", "口红"],
          tech: [
            "tech",
            "code",
            "programming",
            "app",
            "digital",
            "科技",
            "数码",
            "编程",
            "手机",
            "电脑"
          ],
          life: ["life", "daily", "lifestyle", "生活", "日常", "心情", "记录"]
        };

        for (const [cat, triggers] of Object.entries(categoryMap)) {
          for (const trigger of triggers) {
            if (keywordLower.includes(trigger)) {
              if (!categories.includes(cat)) {
                categories.push(cat);
              }
            }
          }
        }

        return categories.length > 0 ? categories : ["life"];
      }

      function generateHashtags() {
        const keywords = keywordsEl.value.trim();
        if (!keywords) {
          showStatus("请输入关键词", "error");
          return;
        }

        const platform = platformEl.value;
        const count = parseInt(countEl.value, 10);
        const language = languageEl.value;

        const categories = detectCategory(keywords);
        const generatedTags = new Set();

        // Add keyword-based hashtags
        const keywordList = keywords.split(/[,，\s]+/).filter(Boolean);
        for (const kw of keywordList) {
          const cleanKw = kw.replace(/[#＃]/g, "").trim();
          if (cleanKw) {
            generatedTags.add("#" + cleanKw);
          }
        }

        // Add category-based hashtags
        for (const cat of categories) {
          const catData = hashtagDatabase[cat];
          if (catData) {
            if (language === "english" || language === "mixed") {
              for (const tag of catData.en) {
                generatedTags.add("#" + tag);
              }
            }
            if (language === "chinese" || language === "mixed") {
              for (const tag of catData.zh) {
                generatedTags.add("#" + tag);
              }
            }
          }
        }

        // Platform-specific tags
        const platformTags = {
          instagram: ["#instagram", "#instagood", "#instadaily", "#igdaily"],
          twitter: ["#TwitterTips", "#Tweet"],
          tiktok: ["#fyp", "#foryou", "#foryoupage", "#viral", "#trending", "#tiktok"],
          weibo: ["#微博", "#热门"],
          xiaohongshu: ["#小红书", "#笔记灵感", "#我的日常"]
        };

        if (platformTags[platform]) {
          for (const tag of platformTags[platform]) {
            generatedTags.add(tag);
          }
        }

        // Convert to array and limit
        let tagsArray = Array.from(generatedTags);
        tagsArray = shuffleArray(tagsArray).slice(0, count);

        displayHashtags(tagsArray);
        saveToStorage();
        showStatus("已生成 " + tagsArray.length + " 个标签", "success");
      }

      function shuffleArray(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
        return arr;
      }

      function displayHashtags(tags) {
        hashtagsContainerEl.textContent = "";

        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          const span = document.createElement("span");
          span.className = "hashtag" + (i < 5 ? " popular" : "");
          span.textContent = tag;
          span.addEventListener("click", function () {
            copyToClipboard(tag);
          });
          hashtagsContainerEl.appendChild(span);
        }

        allHashtagsEl.value = tags.join(" ");
      }

      function copyToClipboard(text) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制: " + text, "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          keywords: keywordsEl.value,
          platform: platformEl.value,
          count: countEl.value,
          language: languageEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.keywords) keywordsEl.value = data.keywords;
            if (data.platform) platformEl.value = data.platform;
            if (data.count) countEl.value = data.count;
            if (data.language) languageEl.value = data.language;
          }
        } catch (e) {}
      }

      function loadFromUrl() {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          keywordsEl.value = decodeURIComponent(atob(hash));
          return true;
        } catch (e) {
          return false;
        }
      }

      function saveToUrl() {
        try {
          if (keywordsEl.value.length > 500) return;
          const encoded = btoa(encodeURIComponent(keywordsEl.value));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {}
      }

      document.getElementById("btnGenerate").addEventListener("click", generateHashtags);

      document.getElementById("btnCopy").addEventListener("click", function () {
        const text = allHashtagsEl.value;
        if (!text) {
          showStatus("没有标签可复制", "error");
          return;
        }
        copyToClipboard(text);
      });

      document.getElementById("btnShare").addEventListener("click", function () {
        saveToUrl();
        navigator.clipboard
          .writeText(location.href)
          .then(function () {
            showStatus("链接已复制", "success");
          })
          .catch(function () {
            showStatus("复制失败", "error");
          });
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        keywordsEl.value = "";
        hashtagsContainerEl.textContent = "";
        allHashtagsEl.value = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
      });

      keywordsEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          generateHashtags();
        }
      });

      if (!loadFromUrl()) {
        loadFromStorage();
      }

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
    
