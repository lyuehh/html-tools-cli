// @ts-nocheck
// Generated from tools/social-media/bio-generator.html
// Source SHA-256: ca9d64e9cb98389ec8d08340ae7dbdb474dd4077b6eba6218896eae8a8dfc9d7
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const nameEl = document.getElementById("name");
      const professionEl = document.getElementById("profession");
      const locationEl = document.getElementById("location");
      const styleEl = document.getElementById("style");
      const platformEl = document.getElementById("platform");
      const languageEl = document.getElementById("language");
      const interestsInputEl = document.getElementById("interestsInput");
      const interestFieldEl = document.getElementById("interestField");
      const biosContainerEl = document.getElementById("biosContainer");
      const statusEl = document.getElementById("status");

      const LS_KEY = "bio_generator_v1";

      let interests = [];

      const bioTemplates = {
        professional: {
          chinese: [
            "{profession} | {location}",
            "{profession}，专注于{interest}领域",
            "{location}｜{profession}｜{interest}爱好者",
            "一名{profession}，在{location}追逐梦想",
            "{profession} · {interest} · 终身学习者"
          ],
          english: [
            "{profession} | {location}",
            "{profession} passionate about {interest}",
            "{location}-based {profession}",
            "{profession} | {interest} enthusiast",
            "Professional {profession} · {location}"
          ]
        },
        casual: {
          chinese: [
            "就是一个普通的{profession}",
            "{location}人｜{interest}使我快乐",
            "白天是{profession}，晚上是{interest}",
            "一边{profession}，一边{interest}",
            "{location}｜喜欢{interest}的{profession}"
          ],
          english: [
            "Just a {profession} who loves {interest}",
            "{location} | {interest} lover",
            "{profession} by day, {interest} by night",
            "Living in {location}, loving {interest}",
            "Your friendly neighborhood {profession}"
          ]
        },
        creative: {
          chinese: [
            "✨ {profession} × {interest}",
            "🌟 {location}的{interest}收藏家",
            "在{location}做{profession}的第N年...",
            "{profession} | {interest} | 和一只猫",
            "📍{location} // 正在{interest}"
          ],
          english: [
            "✨ {profession} × {interest} enthusiast",
            "🌟 Making magic as a {profession}",
            "📍 {location} | Creating stuff",
            "{interest} addict | {profession}",
            "Half {profession}, half {interest} nerd"
          ]
        },
        minimal: {
          chinese: [
            "{profession}",
            "{location} · {profession}",
            "{interest}",
            "{profession} | {location}",
            "{interest} · {location}"
          ],
          english: [
            "{profession}",
            "{location}",
            "{profession} · {location}",
            "{interest}",
            "{location} · {interest}"
          ]
        },
        funny: {
          chinese: [
            "专业{profession}，业余{interest}选手",
            "靠{profession}养活{interest}",
            "{location}最会{interest}的{profession}（自封的）",
            "一个被{profession}耽误的{interest}天才",
            "白天假装是{profession}，晚上真心爱{interest}"
          ],
          english: [
            "Professional {profession}, amateur {interest} champion",
            "{profession} by accident, {interest} by choice",
            "Probably {interest}ing right now",
            "{location}'s okayest {profession}",
            "Will {interest} for food"
          ]
        },
        inspiring: {
          chinese: [
            "追梦{profession}，永不止步",
            "每一天都在{interest}中成长",
            "{location}追光者 | {profession}",
            "用{interest}点亮生活",
            "做最好的{profession}，遇见更好的自己"
          ],
          english: [
            "Chasing dreams as a {profession}",
            "Growing through {interest} every day",
            "Believer in {interest} | {profession}",
            "Making {location} better, one day at a time",
            "{profession} on a mission"
          ]
        }
      };

      function addInterest(value) {
        const trimmed = value.trim();
        if (trimmed && !interests.includes(trimmed)) {
          interests.push(trimmed);
          renderInterests();
        }
      }

      function removeInterest(index) {
        interests.splice(index, 1);
        renderInterests();
      }

      function renderInterests() {
        const tags = interestsInputEl.querySelectorAll(".interest-tag");
        for (const tag of tags) {
          tag.remove();
        }

        for (let i = 0; i < interests.length; i++) {
          const tag = document.createElement("span");
          tag.className = "interest-tag";

          const text = document.createTextNode(interests[i]);
          tag.appendChild(text);

          const removeBtn = document.createElement("span");
          removeBtn.className = "interest-tag-remove";
          removeBtn.textContent = "×";
          removeBtn.addEventListener("click", function () {
            removeInterest(i);
          });

          tag.appendChild(removeBtn);
          interestsInputEl.insertBefore(tag, interestFieldEl);
        }
      }

      interestFieldEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          addInterest(interestFieldEl.value);
          interestFieldEl.value = "";
        }
      });

      interestsInputEl.addEventListener("click", function () {
        interestFieldEl.focus();
      });

      function generateBios() {
        const profession = professionEl.value.trim() || "创作者";
        const location = locationEl.value.trim() || "地球";
        const style = styleEl.value;
        const language = languageEl.value;
        const interest =
          interests.length > 0 ? interests[Math.floor(Math.random() * interests.length)] : "生活";

        const templates = bioTemplates[style];
        if (!templates) {
          showStatus("请选择风格", "error");
          return;
        }

        let templateList;
        if (language === "chinese") {
          templateList = templates.chinese;
        } else if (language === "english") {
          templateList = templates.english;
        } else {
          templateList = templates.chinese.concat(templates.english);
        }

        const bios = [];
        const shuffled = templateList.slice().sort(function () {
          return 0.5 - Math.random();
        });

        for (let i = 0; i < Math.min(5, shuffled.length); i++) {
          let bio = shuffled[i];
          bio = bio.replace(/{profession}/g, profession);
          bio = bio.replace(/{location}/g, location);
          bio = bio.replace(/{interest}/g, interest);
          bio = bio.replace(/{name}/g, nameEl.value.trim() || "我");
          bios.push(bio);
        }

        displayBios(bios);
        saveToStorage();
        showStatus("已生成 " + bios.length + " 条简介", "success");
      }

      function displayBios(bios) {
        biosContainerEl.textContent = "";

        for (const bio of bios) {
          const card = document.createElement("div");
          card.className = "bio-card";

          const text = document.createElement("div");
          text.className = "bio-text";
          text.textContent = bio;

          const meta = document.createElement("div");
          meta.className = "bio-meta";

          const length = document.createElement("span");
          length.className = "bio-length";
          length.textContent = bio.length + " 字符";

          const actions = document.createElement("div");
          actions.className = "bio-actions";

          const copyBtn = document.createElement("button");
          copyBtn.className = "bio-action";
          copyBtn.textContent = "复制";
          copyBtn.addEventListener("click", function () {
            copyToClipboard(bio);
          });

          actions.appendChild(copyBtn);
          meta.appendChild(length);
          meta.appendChild(actions);

          card.appendChild(text);
          card.appendChild(meta);
          biosContainerEl.appendChild(card);
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
          name: nameEl.value,
          profession: professionEl.value,
          location: locationEl.value,
          style: styleEl.value,
          platform: platformEl.value,
          language: languageEl.value,
          interests: interests
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.name) nameEl.value = data.name;
            if (data.profession) professionEl.value = data.profession;
            if (data.location) locationEl.value = data.location;
            if (data.style) styleEl.value = data.style;
            if (data.platform) platformEl.value = data.platform;
            if (data.language) languageEl.value = data.language;
            if (data.interests) {
              interests = data.interests;
              renderInterests();
            }
          }
        } catch (e) {}
      }

      document.getElementById("btnGenerate").addEventListener("click", generateBios);

      document.getElementById("btnClear").addEventListener("click", function () {
        nameEl.value = "";
        professionEl.value = "";
        locationEl.value = "";
        interests = [];
        renderInterests();
        biosContainerEl.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
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
    
