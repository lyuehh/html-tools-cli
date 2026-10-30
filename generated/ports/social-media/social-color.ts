// @ts-nocheck
// Generated from tools/social-media/social-color.html
// Source SHA-256: 50aefe78c5a241685b59ac9c1d2061f13674fc78757ba5b1a9cb9aadfac1d52b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const searchEl = document.getElementById("search");
      const platformsGridEl = document.getElementById("platformsGrid");
      const copiedToastEl = document.getElementById("copiedToast");

      const platforms = [
        {
          name: "Twitter/X",
          icon: "𝕏",
          desc: "社交网络",
          colors: [
            { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
            { name: "Blue (Legacy)", hex: "#1DA1F2", rgb: "29, 161, 242" }
          ]
        },
        {
          name: "Facebook",
          icon: "f",
          desc: "社交网络",
          colors: [
            { name: "Primary Blue", hex: "#1877F2", rgb: "24, 119, 242" },
            { name: "Messenger Blue", hex: "#0084FF", rgb: "0, 132, 255" }
          ]
        },
        {
          name: "Instagram",
          icon: "📷",
          desc: "图片分享",
          colors: [
            { name: "Gradient Start", hex: "#833AB4", rgb: "131, 58, 180" },
            { name: "Gradient Middle", hex: "#FD1D1D", rgb: "253, 29, 29" },
            { name: "Gradient End", hex: "#FCAF45", rgb: "252, 175, 69" },
            { name: "Purple", hex: "#C13584", rgb: "193, 53, 132" }
          ]
        },
        {
          name: "TikTok",
          icon: "♪",
          desc: "短视频",
          colors: [
            { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
            { name: "Cyan", hex: "#25F4EE", rgb: "37, 244, 238" },
            { name: "Red", hex: "#FE2C55", rgb: "254, 44, 85" }
          ]
        },
        {
          name: "YouTube",
          icon: "▶",
          desc: "视频平台",
          colors: [
            { name: "Red", hex: "#FF0000", rgb: "255, 0, 0" },
            { name: "Almost Black", hex: "#282828", rgb: "40, 40, 40" }
          ]
        },
        {
          name: "LinkedIn",
          icon: "in",
          desc: "职业社交",
          colors: [
            { name: "Primary Blue", hex: "#0A66C2", rgb: "10, 102, 194" },
            { name: "Darker Blue", hex: "#004182", rgb: "0, 65, 130" }
          ]
        },
        {
          name: "WhatsApp",
          icon: "📱",
          desc: "即时通讯",
          colors: [
            { name: "Light Green", hex: "#25D366", rgb: "37, 211, 102" },
            { name: "Dark Green", hex: "#128C7E", rgb: "18, 140, 126" },
            { name: "Teal", hex: "#075E54", rgb: "7, 94, 84" }
          ]
        },
        {
          name: "Telegram",
          icon: "✈",
          desc: "即时通讯",
          colors: [
            { name: "Blue", hex: "#0088CC", rgb: "0, 136, 204" },
            { name: "Light Blue", hex: "#229ED9", rgb: "34, 158, 217" }
          ]
        },
        {
          name: "Discord",
          icon: "🎮",
          desc: "社群平台",
          colors: [
            { name: "Blurple", hex: "#5865F2", rgb: "88, 101, 242" },
            { name: "Green", hex: "#57F287", rgb: "87, 242, 135" },
            { name: "Yellow", hex: "#FEE75C", rgb: "254, 231, 92" },
            { name: "Fuchsia", hex: "#EB459E", rgb: "235, 69, 158" },
            { name: "Red", hex: "#ED4245", rgb: "237, 66, 69" }
          ]
        },
        {
          name: "Snapchat",
          icon: "👻",
          desc: "图片通讯",
          colors: [{ name: "Yellow", hex: "#FFFC00", rgb: "255, 252, 0" }]
        },
        {
          name: "Pinterest",
          icon: "P",
          desc: "图片分享",
          colors: [{ name: "Red", hex: "#E60023", rgb: "230, 0, 35" }]
        },
        {
          name: "Reddit",
          icon: "🤖",
          desc: "社群论坛",
          colors: [{ name: "Orange Red", hex: "#FF4500", rgb: "255, 69, 0" }]
        },
        {
          name: "Twitch",
          icon: "🎬",
          desc: "直播平台",
          colors: [{ name: "Purple", hex: "#9146FF", rgb: "145, 70, 255" }]
        },
        {
          name: "Spotify",
          icon: "🎵",
          desc: "音乐平台",
          colors: [
            { name: "Green", hex: "#1DB954", rgb: "29, 185, 84" },
            { name: "Black", hex: "#191414", rgb: "25, 20, 20" }
          ]
        },
        {
          name: "Slack",
          icon: "#",
          desc: "团队协作",
          colors: [
            { name: "Aubergine", hex: "#4A154B", rgb: "74, 21, 75" },
            { name: "Blue", hex: "#36C5F0", rgb: "54, 197, 240" },
            { name: "Green", hex: "#2EB67D", rgb: "46, 182, 125" },
            { name: "Yellow", hex: "#ECB22E", rgb: "236, 178, 46" },
            { name: "Red", hex: "#E01E5A", rgb: "224, 30, 90" }
          ]
        },
        {
          name: "微博",
          icon: "微",
          desc: "社交媒体",
          colors: [
            { name: "Red", hex: "#E6162D", rgb: "230, 22, 45" },
            { name: "Orange", hex: "#FF8200", rgb: "255, 130, 0" }
          ]
        },
        {
          name: "微信",
          icon: "微",
          desc: "即时通讯",
          colors: [{ name: "Green", hex: "#07C160", rgb: "7, 193, 96" }]
        },
        {
          name: "小红书",
          icon: "📕",
          desc: "生活分享",
          colors: [{ name: "Red", hex: "#FE2C55", rgb: "254, 44, 85" }]
        },
        {
          name: "抖音",
          icon: "🎵",
          desc: "短视频",
          colors: [
            { name: "Black", hex: "#010101", rgb: "1, 1, 1" },
            { name: "Cyan", hex: "#25F4EE", rgb: "37, 244, 238" },
            { name: "Red", hex: "#FE2C55", rgb: "254, 44, 85" }
          ]
        },
        {
          name: "B站",
          icon: "B",
          desc: "视频平台",
          colors: [
            { name: "Blue", hex: "#00A1D6", rgb: "0, 161, 214" },
            { name: "Pink", hex: "#FB7299", rgb: "251, 114, 153" }
          ]
        },
        {
          name: "GitHub",
          icon: "🐙",
          desc: "代码托管",
          colors: [
            { name: "Black", hex: "#24292E", rgb: "36, 41, 46" },
            { name: "White", hex: "#FAFBFC", rgb: "250, 251, 252" }
          ]
        },
        {
          name: "Dribbble",
          icon: "🏀",
          desc: "设计社区",
          colors: [{ name: "Pink", hex: "#EA4C89", rgb: "234, 76, 137" }]
        },
        {
          name: "Behance",
          icon: "Bē",
          desc: "设计社区",
          colors: [{ name: "Blue", hex: "#1769FF", rgb: "23, 105, 255" }]
        },
        {
          name: "Medium",
          icon: "M",
          desc: "博客平台",
          colors: [
            { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
            { name: "Green", hex: "#00AB6C", rgb: "0, 171, 108" }
          ]
        },
        {
          name: "Threads",
          icon: "@",
          desc: "文字社交",
          colors: [{ name: "Black", hex: "#000000", rgb: "0, 0, 0" }]
        },
        {
          name: "Mastodon",
          icon: "🐘",
          desc: "去中心化社交",
          colors: [{ name: "Purple", hex: "#6364FF", rgb: "99, 100, 255" }]
        }
      ];

      function renderPlatforms(filteredPlatforms) {
        platformsGridEl.textContent = "";

        if (filteredPlatforms.length === 0) {
          const noResults = document.createElement("div");
          noResults.className = "no-results";
          noResults.textContent = "未找到匹配的平台";
          platformsGridEl.appendChild(noResults);
          return;
        }

        for (const platform of filteredPlatforms) {
          const card = document.createElement("div");
          card.className = "platform-card";

          const header = document.createElement("div");
          header.className = "platform-header";

          const logo = document.createElement("div");
          logo.className = "platform-logo";
          logo.style.background = platform.colors[0].hex;
          logo.textContent = platform.icon;

          const info = document.createElement("div");
          info.className = "platform-info";

          const name = document.createElement("div");
          name.className = "platform-name";
          name.textContent = platform.name;

          const desc = document.createElement("div");
          desc.className = "platform-desc";
          desc.textContent = platform.desc;

          info.appendChild(name);
          info.appendChild(desc);
          header.appendChild(logo);
          header.appendChild(info);

          const colorList = document.createElement("div");
          colorList.className = "color-list";

          for (const color of platform.colors) {
            const colorItem = document.createElement("div");
            colorItem.className = "color-item";

            const swatch = document.createElement("div");
            swatch.className = "color-swatch";
            swatch.style.background = color.hex;

            const colorInfo = document.createElement("div");
            colorInfo.className = "color-info";

            const colorName = document.createElement("div");
            colorName.className = "color-name";
            colorName.textContent = color.name;

            const colorValues = document.createElement("div");
            colorValues.className = "color-values";

            const hexValue = document.createElement("span");
            hexValue.className = "color-value";
            hexValue.textContent = color.hex;

            const rgbValue = document.createElement("span");
            rgbValue.className = "color-value";
            rgbValue.textContent = "RGB(" + color.rgb + ")";

            colorValues.appendChild(hexValue);
            colorValues.appendChild(rgbValue);
            colorInfo.appendChild(colorName);
            colorInfo.appendChild(colorValues);

            const copyBtn = document.createElement("button");
            copyBtn.className = "color-copy";
            copyBtn.textContent = "复制";
            copyBtn.addEventListener("click", function (e) {
              e.stopPropagation();
              copyToClipboard(color.hex);
            });

            colorItem.appendChild(swatch);
            colorItem.appendChild(colorInfo);
            colorItem.appendChild(copyBtn);

            colorItem.addEventListener("click", function () {
              copyToClipboard(color.hex);
            });

            colorList.appendChild(colorItem);
          }

          card.appendChild(header);
          card.appendChild(colorList);
          platformsGridEl.appendChild(card);
        }
      }

      function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
          showToast();
        });
      }

      function showToast() {
        copiedToastEl.textContent = "已复制!";
        copiedToastEl.classList.add("show");
        setTimeout(function () {
          copiedToastEl.classList.remove("show");
        }, 1500);
      }

      function filterPlatforms(query) {
        if (!query) {
          return platforms;
        }

        const queryLower = query.toLowerCase();
        return platforms.filter(function (p) {
          return (
            p.name.toLowerCase().includes(queryLower) || p.desc.toLowerCase().includes(queryLower)
          );
        });
      }

      searchEl.addEventListener("input", function () {
        const filtered = filterPlatforms(searchEl.value.trim());
        renderPlatforms(filtered);
      });

      renderPlatforms(platforms);

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
    
