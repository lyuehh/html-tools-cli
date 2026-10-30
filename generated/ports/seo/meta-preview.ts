// @ts-nocheck
// Generated from tools/seo/meta-preview.html
// Source SHA-256: d83296a02b979c22a09123bed43f400815b19b64a8b43cb577d95fe9e59df6f4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();

      let currentPreview = "google";

      window.switchPreview = function (type) {
        currentPreview = type;

        // 更新标签状态
        document.querySelectorAll(".preview-tabs button").forEach((btn) => {
          btn.classList.remove("active");
        });
        event.target.classList.add("active");

        // 切换预览
        document.getElementById("google-preview").style.display =
          type === "google" ? "block" : "none";
        document.getElementById("baidu-preview").style.display =
          type === "baidu" ? "block" : "none";
        document.getElementById("bing-preview").style.display = type === "bing" ? "block" : "none";
      };

      function updateCharCount(inputId, countId, maxLength) {
        const input = document.getElementById(inputId);
        const count = document.getElementById(countId);
        const length = input.value.length;

        count.textContent = length + " / " + maxLength;

        if (length > maxLength) {
          count.className = "char-count danger";
        } else if (length > maxLength * 0.9) {
          count.className = "char-count warning";
        } else {
          count.className = "char-count";
        }
      }

      function truncateText(text, maxLength, suffix) {
        suffix = suffix || "...";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength - suffix.length) + suffix;
      }

      function formatUrlForGoogle(url) {
        try {
          const urlObj = new URL(url);
          let path = urlObj.pathname;
          if (path === "/") path = "";
          path = path.replace(/\//g, " › ").replace(/^[\s›]+/, "");
          return urlObj.hostname + (path ? " › " + path : "");
        } catch {
          return url || "example.com";
        }
      }

      function getDomainFromUrl(url) {
        try {
          return new URL(url).hostname;
        } catch {
          return "example.com";
        }
      }

      window.updatePreview = function () {
        const title = document.getElementById("metaTitle").value || "页面标题将显示在这里";
        const desc =
          document.getElementById("metaDesc").value ||
          "页面描述将显示在这里。一个好的描述应该简洁明了地概括页面内容，吸引用户点击。";
        const url = document.getElementById("pageUrl").value || "https://example.com/page";
        const siteName = document.getElementById("siteName").value || "我的网站";

        // 更新字符计数
        updateCharCount("metaTitle", "titleCount", 60);
        updateCharCount("metaDesc", "descCount", 160);

        // Google 预览 - 标题约60字符，描述约160字符
        document.getElementById("g-title").textContent = truncateText(title, 60);
        document.getElementById("g-desc").textContent = truncateText(desc, 160);
        document.getElementById("g-url").textContent = formatUrlForGoogle(url);
        document.getElementById("g-sitename").textContent = siteName;

        // 百度预览 - 标题约50字符，描述约80字符
        document.getElementById("b-title").textContent = truncateText(title, 50);
        document.getElementById("b-desc").textContent = truncateText(desc, 100);
        document.getElementById("b-sitename").textContent = getDomainFromUrl(url);

        // Bing 预览
        document.getElementById("bing-title").textContent = truncateText(title, 65);
        document.getElementById("bing-desc").textContent = truncateText(desc, 150);
        document.getElementById("bing-url").textContent = url || "https://example.com/page";
      };

      // 初始化
      updatePreview();
    
