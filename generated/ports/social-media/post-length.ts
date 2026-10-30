// @ts-nocheck
// Generated from tools/social-media/post-length.html
// Source SHA-256: e81563be9b650deb2af5a10c3ef949d9c595305df657520a33fa44457dae267e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const contentEl = document.getElementById("content");
      const charCountEl = document.getElementById("charCount");
      const wordCountEl = document.getElementById("wordCount");
      const lineCountEl = document.getElementById("lineCount");
      const emojiCountEl = document.getElementById("emojiCount");
      const platformGridEl = document.getElementById("platformGrid");

      const LS_KEY = "post_length_v1";

      const platforms = [
        { id: "twitter", name: "Twitter/X", icon: "𝕏", limit: 280, warnAt: 250 },
        { id: "threads", name: "Threads", icon: "@", limit: 500, warnAt: 450 },
        { id: "instagram", name: "Instagram", icon: "📷", limit: 2200, warnAt: 2000 },
        { id: "facebook", name: "Facebook", icon: "f", limit: 63206, warnAt: 60000 },
        { id: "linkedin", name: "LinkedIn", icon: "in", limit: 3000, warnAt: 2700 },
        { id: "tiktok", name: "TikTok", icon: "♪", limit: 2200, warnAt: 2000 },
        { id: "weibo", name: "微博", icon: "微", limit: 2000, warnAt: 1800 },
        { id: "xiaohongshu", name: "小红书", icon: "📕", limit: 1000, warnAt: 900 }
      ];

      function updateStats() {
        const text = contentEl.value;

        // Character count
        const chars = text.length;
        charCountEl.textContent = chars;

        // Word count (English words + Chinese characters)
        const words = text.trim() ? text.trim().split(/[\s]+/).length : 0;
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        wordCountEl.textContent = words + chineseChars;

        // Line count
        const lines = text ? text.split("\n").length : 0;
        lineCountEl.textContent = lines;

        // Emoji count
        const emojiRegex =
          /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
        const emojis = text.match(emojiRegex) || [];
        emojiCountEl.textContent = emojis.length;

        updatePlatforms(chars);
        saveToStorage();
      }

      function updatePlatforms(chars) {
        platformGridEl.textContent = "";

        for (const platform of platforms) {
          const card = document.createElement("div");
          card.className = "platform-card";

          let status, statusText;
          if (chars <= platform.warnAt) {
            status = "valid";
            statusText = "符合";
          } else if (chars <= platform.limit) {
            status = "warning";
            statusText = "接近上限";
          } else {
            status = "invalid";
            statusText = "超出限制";
          }

          card.classList.add(status);

          const header = document.createElement("div");
          header.className = "platform-header";

          const name = document.createElement("div");
          name.className = "platform-name";

          const icon = document.createElement("span");
          icon.className = "platform-icon " + platform.id;
          icon.textContent = platform.icon;

          const nameText = document.createTextNode(platform.name);
          name.appendChild(icon);
          name.appendChild(nameText);

          const statusBadge = document.createElement("span");
          statusBadge.className = "platform-status " + status;
          statusBadge.textContent = statusText;

          header.appendChild(name);
          header.appendChild(statusBadge);

          const progress = document.createElement("div");
          progress.className = "platform-progress";

          const progressBar = document.createElement("div");
          progressBar.className = "progress-bar";

          const progressFill = document.createElement("div");
          progressFill.className = "progress-fill " + status;
          const percent = Math.min(100, (chars / platform.limit) * 100);
          progressFill.style.width = percent + "%";

          progressBar.appendChild(progressFill);
          progress.appendChild(progressBar);

          const info = document.createElement("div");
          info.className = "platform-info";

          const current = document.createElement("span");
          current.textContent = chars + " / " + platform.limit;

          const remaining = document.createElement("span");
          const rem = platform.limit - chars;
          remaining.textContent = rem >= 0 ? "剩余 " + rem : "超出 " + Math.abs(rem);

          info.appendChild(current);
          info.appendChild(remaining);

          card.appendChild(header);
          card.appendChild(progress);
          card.appendChild(info);
          platformGridEl.appendChild(card);
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, contentEl.value);
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          contentEl.value = saved;
          updateStats();
        }
      }

      contentEl.addEventListener("input", updateStats);

      document.getElementById("btnPaste").addEventListener("click", function () {
        navigator.clipboard
          .readText()
          .then(function (text) {
            contentEl.value = text;
            updateStats();
          })
          .catch(function () {
            alert("无法访问剪贴板");
          });
      });

      document.getElementById("btnCopy").addEventListener("click", function () {
        if (contentEl.value) {
          navigator.clipboard.writeText(contentEl.value).then(function () {
            alert("已复制");
          });
        }
      });

      document.getElementById("btnClear").addEventListener("click", function () {
        contentEl.value = "";
        updateStats();
        localStorage.removeItem(LS_KEY);
      });

      loadFromStorage();
      if (!contentEl.value) {
        updateStats();
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
    
