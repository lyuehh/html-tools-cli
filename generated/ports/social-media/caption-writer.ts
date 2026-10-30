// @ts-nocheck
// Generated from tools/social-media/caption-writer.html
// Source SHA-256: 84fbcd4456fcd293496a43c9616326071e6eb48e606714cf87fcf47c09cd6dbf
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const topicEl = document.getElementById("topic");
      const detailsEl = document.getElementById("details");
      const platformEl = document.getElementById("platform");
      const languageEl = document.getElementById("language");
      const styleTagsEl = document.getElementById("styleTags");
      const captionsContainerEl = document.getElementById("captionsContainer");
      const statusEl = document.getElementById("status");

      const LS_KEY = "caption_writer_v1";

      let selectedStyle = "casual";

      const captionTemplates = {
        casual: {
          chinese: [
            "今天的{topic}，简单但快乐 ✨",
            "记录一下{topic}的美好瞬间~",
            "日常{topic}打卡 📍",
            "{topic}的一天，满足！",
            "又是{topic}的好日子~",
            "分享今天的{topic} 🌟",
            "{topic}中... 幸福感爆棚",
            "平平淡淡才是真，{topic}日常",
            "今日份{topic}已签收 ✓",
            "生活就是{topic}的点点滴滴"
          ],
          english: [
            "Just another {topic} day ✨",
            "{topic} vibes only",
            "Living my best {topic} life",
            "Currently: {topic} mode ON",
            "{topic} is my therapy",
            "Making memories with {topic}",
            "This is what {topic} looks like",
            "{topic} state of mind",
            "Caught in the moment of {topic}",
            "Simple pleasures: {topic}"
          ]
        },
        inspiring: {
          chinese: [
            "{topic}，是我给自己最好的礼物",
            "每一次{topic}，都是成长的印记",
            "不负时光，不负{topic}",
            "{topic}教会我：坚持就是力量",
            "从{topic}开始，遇见更好的自己",
            "追逐{topic}的路上，我从不孤单",
            "{topic}的意义，在于那份热爱",
            "愿所有的{topic}，都能如愿以偿",
            "为了{topic}，值得全力以赴",
            "{topic}，让我相信一切皆有可能"
          ],
          english: [
            "{topic} is not just a goal, it is a journey",
            "Every {topic} brings me closer to my dreams",
            "Embrace the challenge of {topic}",
            "{topic} taught me that growth never stops",
            "The best time for {topic} is now",
            "Transform your {topic} into your superpower",
            "{topic}: where passion meets purpose",
            "Be fearless in the pursuit of {topic}",
            "{topic} is proof that I am capable",
            "Let {topic} be your motivation"
          ]
        },
        funny: {
          chinese: [
            "本人在{topic}方面，已经达到了菜鸟的巅峰",
            "{topic}？我以为是{topic}呢！",
            "今天的{topic}告诉我：我果然是个人才",
            "{topic}之后，我的钱包表示很受伤",
            "在{topic}的路上，我迷路了",
            "成功避开了所有正确的{topic}选项",
            "{topic}使我快乐，也使我贫穷",
            "问：{topic}怎么样？答：下次再也不了",
            "今天{topic}的心情：想开，但没完全想开",
            "{topic}本快乐，{topic}本无罪"
          ],
          english: [
            "Tried {topic}, instructions unclear",
            "My {topic} skills are still loading...",
            "{topic}? More like chaos in disguise",
            "Professional {topic} rookie here",
            "Did {topic}, regret nothing, learned nothing",
            "{topic}: expectations vs reality",
            "Warning: {topic} may cause happiness",
            "Plot twist: I actually enjoyed {topic}",
            "{topic} level: confused but optimistic",
            "Dear {topic}, we need to talk"
          ]
        },
        poetic: {
          chinese: [
            "在{topic}的时光里，与美好不期而遇",
            "{topic}如诗，岁月如歌",
            "愿以{topic}为笔，书写生命的篇章",
            "于{topic}之中，寻得一方宁静",
            "{topic}是风，是雨，是人间烟火",
            "时光温柔，{topic}亦然",
            "在{topic}的角落，藏着世间的温柔",
            "以{topic}之名，赴一场心灵之约",
            "{topic}轻轻落下，带走了所有喧嚣",
            "借一缕{topic}，温暖整个冬天"
          ],
          english: [
            "In the poetry of {topic}, I found peace",
            "{topic} whispers what words cannot say",
            "Lost in the art of {topic}",
            "Where {topic} meets the soul",
            "{topic} paints the sky of my dreams",
            "In every {topic}, there is a story untold",
            "Dancing with {topic} under moonlight",
            "{topic} is the music of silence",
            "Through {topic}, I see the universe",
            "Let {topic} be my sanctuary"
          ]
        },
        professional: {
          chinese: [
            "深度解析{topic}，带你了解行业趋势",
            "{topic}实践分享，干货满满",
            "关于{topic}，这些要点值得关注",
            "{topic}领域最新动态，速览",
            "专业视角看{topic}：机遇与挑战并存",
            "{topic}行业报告，数据说话",
            "从{topic}看未来发展方向",
            "{topic}最佳实践，经验总结",
            "深耕{topic}，持续输出价值",
            "{topic}专题：从入门到精通"
          ],
          english: [
            "Deep dive into {topic}: Key insights",
            "{topic} trends you should know about",
            "Professional take on {topic}",
            "{topic} best practices for success",
            "Industry perspective: {topic} in focus",
            "Mastering {topic}: A comprehensive guide",
            "{topic} analysis: What the data tells us",
            "Strategic approach to {topic}",
            "{topic} expertise: Lessons learned",
            "Elevating {topic} to the next level"
          ]
        },
        cute: {
          chinese: [
            "{topic}也太可爱了叭！",
            "今天的{topic}，甜度超标~",
            "被{topic}萌化了呜呜呜",
            "{topic}冲鸭！加油鸭！",
            "小小的{topic}，大大的快乐",
            "嘿嘿，{topic}使我快乐~",
            "{topic}好耶！开心！",
            "今日份{topic}已到账，请查收~",
            "{topic}星人报道！",
            "被{topic}治愈的一天~"
          ],
          english: [
            "{topic} is just too cute!",
            "Feeling fluffy about {topic} today",
            "{topic} makes my heart go uwu",
            "Tiny {topic}, big happiness",
            "Sending {topic} hugs to everyone",
            "{topic} vibes are adorable",
            "Having a {topic} moment rn",
            "So much love for {topic}!",
            "{topic} = instant serotonin",
            "Cuteness overload: {topic} edition"
          ]
        },
        mysterious: {
          chinese: [
            "{topic}的背后，藏着不为人知的秘密",
            "关于{topic}，我有话说...",
            "如果你也懂{topic}，请给我一个眼神",
            "{topic}，懂的都懂",
            "今天的{topic}，有点意思",
            "不是所有人都能理解{topic}的魅力",
            "{topic}，是我最后的倔强",
            "在{topic}的世界里，我主宰一切",
            "有些{topic}，只可意会不可言传",
            "{topic}：此处省略一万字"
          ],
          english: [
            "{topic} has its secrets",
            "The untold story of {topic}",
            "If you know, you know: {topic}",
            "{topic} speaks louder than words",
            "Some things about {topic} remain unspoken",
            "Enter the realm of {topic}",
            "{topic}: not for the faint of heart",
            "Decoding the mystery of {topic}",
            "Between the lines of {topic}",
            "{topic}. No further explanation needed."
          ]
        }
      };

      const emojisByStyle = {
        casual: ["✨", "🌟", "💫", "🎉", "🌈", "☀️", "🌸", "💕", "🎵", "📸"],
        inspiring: ["💪", "🔥", "⭐", "🌱", "🚀", "💡", "✊", "🏆", "💎", "🌅"],
        funny: ["😂", "🤣", "😅", "🙃", "😜", "🤪", "💀", "😭", "🤦", "👀"],
        poetic: ["🌙", "✨", "🍃", "🌊", "🦋", "🌸", "💫", "☁️", "🌿", "🕊️"],
        professional: ["📊", "💼", "📈", "🎯", "💡", "🔍", "📌", "✅", "🏅", "📝"],
        cute: ["💕", "🥰", "💖", "🌸", "✨", "🎀", "🧸", "🍰", "🌈", "💗"],
        mysterious: ["🌙", "✨", "🔮", "👁️", "🖤", "💫", "🌌", "⚡", "🃏", "🎭"]
      };

      function getRandomEmojis(style, count) {
        const emojis = emojisByStyle[style] || emojisByStyle.casual;
        const shuffled = emojis.slice().sort(function () {
          return 0.5 - Math.random();
        });
        return shuffled.slice(0, count).join(" ");
      }

      function generateCaptions() {
        const topic = topicEl.value.trim();
        if (!topic) {
          showStatus("请输入主题或关键词", "error");
          return;
        }

        const platform = platformEl.value;
        const language = languageEl.value;
        const details = detailsEl.value.trim();

        const templates = captionTemplates[selectedStyle];
        if (!templates) {
          showStatus("请选择文案风格", "error");
          return;
        }

        const captions = [];
        let templateList;

        if (language === "chinese") {
          templateList = templates.chinese;
        } else if (language === "english") {
          templateList = templates.english;
        } else {
          templateList = templates.chinese.concat(templates.english);
        }

        const shuffled = templateList.slice().sort(function () {
          return 0.5 - Math.random();
        });
        const selected = shuffled.slice(0, 5);

        for (const template of selected) {
          let caption = template.replace(/{topic}/g, topic);

          if (details) {
            caption += "\n\n" + details;
          }

          caption += "\n\n" + getRandomEmojis(selectedStyle, 3);

          captions.push(caption);
        }

        displayCaptions(captions);
        saveToStorage();
        showStatus("已生成 " + captions.length + " 条文案", "success");
      }

      function displayCaptions(captions) {
        captionsContainerEl.textContent = "";

        for (let i = 0; i < captions.length; i++) {
          const caption = captions[i];
          const card = document.createElement("div");
          card.className = "caption-card";

          const text = document.createElement("div");
          text.className = "caption-text";
          text.textContent = caption;

          const meta = document.createElement("div");
          meta.className = "caption-meta";

          const length = document.createElement("span");
          length.className = "caption-length";
          length.textContent = caption.length + " 字符";

          const copyBtn = document.createElement("button");
          copyBtn.className = "caption-copy";
          copyBtn.textContent = "复制";
          copyBtn.addEventListener("click", function () {
            copyToClipboard(caption);
          });

          meta.appendChild(length);
          meta.appendChild(copyBtn);

          card.appendChild(text);
          card.appendChild(meta);
          captionsContainerEl.appendChild(card);
        }
      }

      function copyToClipboard(text) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            showStatus("已复制到剪贴板", "success");
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
          topic: topicEl.value,
          details: detailsEl.value,
          platform: platformEl.value,
          language: languageEl.value,
          style: selectedStyle
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.topic) topicEl.value = data.topic;
            if (data.details) detailsEl.value = data.details;
            if (data.platform) platformEl.value = data.platform;
            if (data.language) languageEl.value = data.language;
            if (data.style) {
              selectedStyle = data.style;
              updateStyleTags();
            }
          }
        } catch (e) {}
      }

      function updateStyleTags() {
        const tags = styleTagsEl.querySelectorAll(".style-tag");
        for (const tag of tags) {
          if (tag.dataset.style === selectedStyle) {
            tag.classList.add("active");
          } else {
            tag.classList.remove("active");
          }
        }
      }

      styleTagsEl.addEventListener("click", function (e) {
        if (e.target.classList.contains("style-tag")) {
          selectedStyle = e.target.dataset.style;
          updateStyleTags();
          saveToStorage();
        }
      });

      document.getElementById("btnGenerate").addEventListener("click", generateCaptions);

      document.getElementById("btnClear").addEventListener("click", function () {
        topicEl.value = "";
        detailsEl.value = "";
        captionsContainerEl.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      });

      document.getElementById("btnShare").addEventListener("click", function () {
        try {
          const encoded = btoa(encodeURIComponent(topicEl.value));
          history.replaceState(null, "", "#" + encoded);
          navigator.clipboard.writeText(location.href).then(function () {
            showStatus("链接已复制", "success");
          });
        } catch (e) {
          showStatus("分享失败", "error");
        }
      });

      topicEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          generateCaptions();
        }
      });

      (function () {
        const hash = location.hash.slice(1);
        if (hash) {
          try {
            topicEl.value = decodeURIComponent(atob(hash));
          } catch (e) {}
        } else {
          loadFromStorage();
        }
      })();

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
    
