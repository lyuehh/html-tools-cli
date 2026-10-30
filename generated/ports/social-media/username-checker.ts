// @ts-nocheck
// Generated from tools/social-media/username-checker.html
// Source SHA-256: 2758ab29c5d49d0d8c5e46e68906ca79c645363a4290e0ece7952e5acdb7ce10
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const usernameEl = document.getElementById("username");
      const platformGridEl = document.getElementById("platformGrid");
      const statusEl = document.getElementById("status");
      const btnCheckEl = document.getElementById("btnCheck");

      const LS_KEY = "username_checker_v1";

      const platforms = [
        {
          id: "twitter",
          name: "Twitter/X",
          icon: "𝕏",
          urlTemplate: "https://twitter.com/{username}"
        },
        {
          id: "instagram",
          name: "Instagram",
          icon: "📷",
          urlTemplate: "https://instagram.com/{username}"
        },
        { id: "tiktok", name: "TikTok", icon: "🎵", urlTemplate: "https://tiktok.com/@{username}" },
        {
          id: "youtube",
          name: "YouTube",
          icon: "▶️",
          urlTemplate: "https://youtube.com/@{username}"
        },
        { id: "github", name: "GitHub", icon: "🐙", urlTemplate: "https://github.com/{username}" },
        {
          id: "linkedin",
          name: "LinkedIn",
          icon: "💼",
          urlTemplate: "https://linkedin.com/in/{username}"
        },
        { id: "weibo", name: "微博", icon: "🔴", urlTemplate: "https://weibo.com/{username}" },
        { id: "xiaohongshu", name: "小红书", icon: "📕", urlTemplate: "#" }
      ];

      function validateUsername(username) {
        const rules = {
          length: username.length >= 3 && username.length <= 20,
          start: /^[a-zA-Z]/.test(username),
          chars: /^[a-zA-Z0-9_]+$/.test(username),
          end: !username.endsWith("_")
        };

        updateRuleDisplay("ruleLength", rules.length);
        updateRuleDisplay("ruleStart", rules.start);
        updateRuleDisplay("ruleChars", rules.chars);
        updateRuleDisplay("ruleEnd", rules.end);

        return rules.length && rules.start && rules.chars && rules.end;
      }

      function updateRuleDisplay(ruleId, isValid) {
        const rule = document.getElementById(ruleId);
        rule.className = "rule " + (isValid ? "valid" : "invalid");
        const icon = rule.querySelector(".rule-icon");
        icon.textContent = isValid ? "✓" : "✗";
      }

      function resetRules() {
        const ruleIds = ["ruleLength", "ruleStart", "ruleChars", "ruleEnd"];
        for (const id of ruleIds) {
          const rule = document.getElementById(id);
          rule.className = "rule";
          rule.querySelector(".rule-icon").textContent = "?";
        }
      }

      function checkUsername() {
        const username = usernameEl.value.trim().toLowerCase();

        if (!username) {
          showStatus("请输入用户名", "error");
          return;
        }

        if (!validateUsername(username)) {
          showStatus("用户名格式不正确", "error");
          return;
        }

        btnCheckEl.disabled = true;
        showStatus("正在检查...", "");

        renderPlatforms(username, true);

        // Simulate async checking
        let checked = 0;
        for (const platform of platforms) {
          const delay = 300 + Math.random() * 700;
          setTimeout(function () {
            updatePlatformStatus(platform.id, username);
            checked++;
            if (checked === platforms.length) {
              btnCheckEl.disabled = false;
              showStatus("检查完成", "success");
              saveToStorage();
            }
          }, delay);
        }
      }

      function renderPlatforms(username, checking) {
        platformGridEl.textContent = "";

        for (const platform of platforms) {
          const card = document.createElement("div");
          card.className = "platform-card" + (checking ? " checking" : "");
          card.id = "card-" + platform.id;

          const icon = document.createElement("div");
          icon.className = "platform-icon " + platform.id;
          icon.textContent = platform.icon;

          const info = document.createElement("div");
          info.className = "platform-info";

          const name = document.createElement("div");
          name.className = "platform-name";
          name.textContent = platform.name;

          const status = document.createElement("div");
          status.className = "platform-status checking checking-animation";
          status.id = "status-" + platform.id;
          status.textContent = "检查中...";

          info.appendChild(name);
          info.appendChild(status);

          const link = document.createElement("a");
          link.className = "platform-link";
          link.textContent = "访问";
          link.href = platform.urlTemplate.replace("{username}", username);
          link.target = "_blank";
          link.rel = "noreferrer";

          card.appendChild(icon);
          card.appendChild(info);
          card.appendChild(link);
          platformGridEl.appendChild(card);
        }
      }

      function updatePlatformStatus(platformId, username) {
        const statusEl = document.getElementById("status-" + platformId);
        const card = document.getElementById("card-" + platformId);

        if (!statusEl || !card) return;

        card.classList.remove("checking");
        statusEl.classList.remove("checking-animation");

        // Simulate availability based on username hash
        const hash = simpleHash(username + platformId);
        const isAvailable = hash % 100 > 40; // 60% chance available

        statusEl.className = "platform-status " + (isAvailable ? "available" : "taken");
        statusEl.textContent = isAvailable ? "✓ 可能可用" : "✗ 可能已被占用";
      }

      function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
        return Math.abs(hash);
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, usernameEl.value);
      }

      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          usernameEl.value = saved;
        }
      }

      btnCheckEl.addEventListener("click", checkUsername);

      usernameEl.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          checkUsername();
        }
      });

      usernameEl.addEventListener("input", function () {
        const username = usernameEl.value.trim();
        if (username) {
          validateUsername(username);
        } else {
          resetRules();
        }
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
    
