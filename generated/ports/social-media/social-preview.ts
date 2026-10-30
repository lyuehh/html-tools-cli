// @ts-nocheck
// Generated from tools/social-media/social-preview.html
// Source SHA-256: 66487f2d81ca055cafd0e4f8b30a9f78fcb7ca01d98d22bd2ace9b8d4a00e161
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const ogTitleEl = document.getElementById("ogTitle");
      const ogDescriptionEl = document.getElementById("ogDescription");
      const ogUrlEl = document.getElementById("ogUrl");
      const ogImageEl = document.getElementById("ogImage");
      const previewGridEl = document.getElementById("previewGrid");
      const statusEl = document.getElementById("status");

      const LS_KEY = "social_preview_v1";

      function generatePreview() {
        const title = ogTitleEl.value.trim() || "页面标题";
        const description = ogDescriptionEl.value.trim() || "页面描述会显示在这里...";
        const url = ogUrlEl.value.trim() || "example.com";
        const image = ogImageEl.value.trim();

        const domain = extractDomain(url);

        previewGridEl.textContent = "";

        // Twitter Card
        const twitterCard = createPreviewCard("Twitter", "twitter", function (content) {
          const card = document.createElement("div");
          card.className = "twitter-card";

          const imgDiv = document.createElement("div");
          imgDiv.className = "twitter-card-image";
          if (image) {
            const img = document.createElement("img");
            img.src = image;
            img.style.cssText = "width:100%;height:100%;object-fit:cover;";
            img.alt = title;
            img.onerror = function () {
              this.parentNode.textContent = "🖼️";
            };
            imgDiv.appendChild(img);
          } else {
            imgDiv.textContent = "🖼️";
          }

          const body = document.createElement("div");
          body.className = "twitter-card-body";

          const urlSpan = document.createElement("div");
          urlSpan.className = "twitter-card-url";
          urlSpan.textContent = domain;

          const titleDiv = document.createElement("div");
          titleDiv.className = "twitter-card-title";
          titleDiv.textContent = title;

          const descDiv = document.createElement("div");
          descDiv.className = "twitter-card-desc";
          descDiv.textContent = description;

          body.appendChild(urlSpan);
          body.appendChild(titleDiv);
          body.appendChild(descDiv);

          card.appendChild(imgDiv);
          card.appendChild(body);
          content.appendChild(card);
        });
        previewGridEl.appendChild(twitterCard);

        // Facebook Card
        const facebookCard = createPreviewCard("Facebook", "facebook", function (content) {
          const card = document.createElement("div");
          card.className = "facebook-card";

          const imgDiv = document.createElement("div");
          imgDiv.className = "facebook-card-image";
          if (image) {
            const img = document.createElement("img");
            img.src = image;
            img.style.cssText = "width:100%;height:100%;object-fit:cover;";
            img.alt = title;
            img.onerror = function () {
              this.parentNode.textContent = "🖼️";
            };
            imgDiv.appendChild(img);
          } else {
            imgDiv.textContent = "🖼️";
          }

          const body = document.createElement("div");
          body.className = "facebook-card-body";

          const urlSpan = document.createElement("div");
          urlSpan.className = "facebook-card-url";
          urlSpan.textContent = domain;

          const titleDiv = document.createElement("div");
          titleDiv.className = "facebook-card-title";
          titleDiv.textContent = title;

          const descDiv = document.createElement("div");
          descDiv.className = "facebook-card-desc";
          descDiv.textContent = description;

          body.appendChild(urlSpan);
          body.appendChild(titleDiv);
          body.appendChild(descDiv);

          card.appendChild(imgDiv);
          card.appendChild(body);
          content.appendChild(card);
        });
        previewGridEl.appendChild(facebookCard);

        // LinkedIn Card
        const linkedinCard = createPreviewCard("LinkedIn", "linkedin", function (content) {
          const card = document.createElement("div");
          card.className = "linkedin-card";

          const imgDiv = document.createElement("div");
          imgDiv.className = "linkedin-card-image";
          if (image) {
            const img = document.createElement("img");
            img.src = image;
            img.style.cssText = "width:100%;height:100%;object-fit:cover;";
            img.alt = title;
            img.onerror = function () {
              this.parentNode.textContent = "🖼️";
            };
            imgDiv.appendChild(img);
          } else {
            imgDiv.textContent = "🖼️";
          }

          const body = document.createElement("div");
          body.className = "linkedin-card-body";

          const titleDiv = document.createElement("div");
          titleDiv.className = "linkedin-card-title";
          titleDiv.textContent = title;

          const urlSpan = document.createElement("div");
          urlSpan.className = "linkedin-card-url";
          urlSpan.textContent = domain;

          body.appendChild(titleDiv);
          body.appendChild(urlSpan);

          card.appendChild(imgDiv);
          card.appendChild(body);
          content.appendChild(card);
        });
        previewGridEl.appendChild(linkedinCard);

        // Slack Card
        const slackCard = createPreviewCard("Slack", "slack", function (content) {
          const card = document.createElement("div");
          card.className = "slack-card";

          const titleDiv = document.createElement("div");
          titleDiv.className = "slack-card-title";
          titleDiv.textContent = title;

          const descDiv = document.createElement("div");
          descDiv.className = "slack-card-desc";
          descDiv.textContent = description;

          card.appendChild(titleDiv);
          card.appendChild(descDiv);

          if (image) {
            const imgDiv = document.createElement("div");
            imgDiv.className = "slack-card-image";
            const img = document.createElement("img");
            img.src = image;
            img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:4px;";
            img.alt = title;
            img.onerror = function () {
              this.parentNode.textContent = "🖼️";
            };
            imgDiv.appendChild(img);
            card.appendChild(imgDiv);
          }

          content.appendChild(card);
        });
        previewGridEl.appendChild(slackCard);

        saveToStorage();
        showStatus("预览已生成", "success");
      }

      function createPreviewCard(platform, iconClass, renderFn) {
        const card = document.createElement("div");
        card.className = "preview-card";

        const header = document.createElement("div");
        header.className = "preview-header";

        const icon = document.createElement("span");
        icon.className = "preview-platform-icon " + iconClass;

        const iconMap = {
          twitter: "𝕏",
          facebook: "f",
          linkedin: "in",
          slack: "#"
        };
        icon.textContent = iconMap[iconClass] || "?";

        const name = document.createElement("span");
        name.className = "preview-platform";
        name.textContent = platform;

        header.appendChild(icon);
        header.appendChild(name);

        const content = document.createElement("div");
        content.className = "preview-content";

        renderFn(content);

        card.appendChild(header);
        card.appendChild(content);

        return card;
      }

      function extractDomain(url) {
        try {
          if (!url.startsWith("http")) {
            url = "https://" + url;
          }
          const urlObj = new URL(url);
          return urlObj.hostname;
        } catch (e) {
          return url.split("/")[0];
        }
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function saveToStorage() {
        const data = {
          title: ogTitleEl.value,
          description: ogDescriptionEl.value,
          url: ogUrlEl.value,
          image: ogImageEl.value
        };
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }

      function loadFromStorage() {
        try {
          const saved = localStorage.getItem(LS_KEY);
          if (saved) {
            const data = JSON.parse(saved);
            if (data.title) ogTitleEl.value = data.title;
            if (data.description) ogDescriptionEl.value = data.description;
            if (data.url) ogUrlEl.value = data.url;
            if (data.image) ogImageEl.value = data.image;
          }
        } catch (e) {}
      }

      document.getElementById("btnPreview").addEventListener("click", generatePreview);

      document.getElementById("btnClear").addEventListener("click", function () {
        ogTitleEl.value = "";
        ogDescriptionEl.value = "";
        ogUrlEl.value = "";
        ogImageEl.value = "";
        previewGridEl.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      });

      ogTitleEl.addEventListener("input", saveToStorage);
      ogDescriptionEl.addEventListener("input", saveToStorage);
      ogUrlEl.addEventListener("input", saveToStorage);
      ogImageEl.addEventListener("input", saveToStorage);

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
    
