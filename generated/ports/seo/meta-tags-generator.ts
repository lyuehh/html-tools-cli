// @ts-nocheck
// Generated from tools/seo/meta-tags-generator.html
// Source SHA-256: c545f837965bce160380f9e56185e1c5419012c1f6f88c27c43d81468c8730db
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      // 初始化主题
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // Tab 切换
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById("preview-" + tab.dataset.preview).classList.add("active");
        });
      });

      // 更新字符计数
      function updateCharCount(inputId, countId, recommended) {
        const input = document.getElementById(inputId);
        const count = document.getElementById(countId);
        const len = input.value.length;

        count.textContent = len + "/" + recommended + " (推荐)";
        count.className = "char-count";

        if (len > recommended * 1.1) {
          count.classList.add("danger");
        } else if (len > recommended) {
          count.classList.add("warning");
        }
      }

      // 从 URL 提取域名
      function extractDomain(url) {
        try {
          const urlObj = new URL(url);
          return urlObj.hostname;
        } catch {
          return "example.com";
        }
      }

      // 更新预览
      window.updatePreview = function () {
        const title = document.getElementById("title").value || "页面标题将显示在这里";
        const description =
          document.getElementById("description").value || "页面描述将显示在这里...";
        const url = document.getElementById("url").value || "https://example.com";
        const image = document.getElementById("image").value;
        const domain = extractDomain(url);

        // 更新字符计数
        updateCharCount("title", "titleCount", 60);
        updateCharCount("description", "descCount", 160);

        // Google 预览
        document.getElementById("googleTitle").textContent = title;
        document.getElementById("googleUrl").textContent = url;
        document.getElementById("googleDesc").textContent = description;

        // Twitter 预览
        document.getElementById("twitterDomain").textContent = domain;
        document.getElementById("twitterTitle").textContent = title;
        document.getElementById("twitterDesc").textContent = description;
        const twitterImg = document.getElementById("twitterImage");
        if (image) {
          twitterImg.style.background = "url(" + image + ") center/cover";
          twitterImg.textContent = "";
        } else {
          twitterImg.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
          twitterImg.textContent = "🖼️";
        }

        // Facebook 预览
        document.getElementById("facebookDomain").textContent = domain.toUpperCase();
        document.getElementById("facebookTitle").textContent = title;
        document.getElementById("facebookDesc").textContent = description;
        const facebookImg = document.getElementById("facebookImage");
        if (image) {
          facebookImg.style.background = "url(" + image + ") center/cover";
          facebookImg.textContent = "";
        } else {
          facebookImg.style.background = "linear-gradient(135deg, #4267B2 0%, #3b5998 100%)";
          facebookImg.textContent = "🖼️";
        }

        // 生成代码
        generateCode();
      };

      // 生成 Meta Tags 代码
      function generateCode() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const keywords = document.getElementById("keywords").value;
        const url = document.getElementById("url").value;
        const image = document.getElementById("image").value;
        const imageAlt = document.getElementById("imageAlt").value;
        const author = document.getElementById("author").value;
        const siteName = document.getElementById("siteName").value;
        const ogType = document.getElementById("ogType").value;
        const twitterCard = document.getElementById("twitterCard").value;
        const twitterSite = document.getElementById("twitterSite").value;
        const locale = document.getElementById("locale").value;
        const robotsIndex = document.getElementById("robotsIndex").checked;
        const robotsFollow = document.getElementById("robotsFollow").checked;

        let code = "<!-- 基本 Meta Tags -->\n";
        code += '<meta charset="UTF-8">\n';
        code += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';

        if (title) {
          code += "<title>" + escapeHtml(title) + " - WebUtils</title>\n";
        }
        if (description) {
          code += '<meta name="description" content="' + escapeHtml(description) + '">\n';
        }
        if (keywords) {
          code += '<meta name="keywords" content="' + escapeHtml(keywords) + '">\n';
        }
        if (author) {
          code += '<meta name="author" content="' + escapeHtml(author) + '">\n';
        }

        // Robots
        const robotsValue =
          (robotsIndex ? "index" : "noindex") + ", " + (robotsFollow ? "follow" : "nofollow");
        code += '<meta name="robots" content="' + robotsValue + '">\n';

        // Open Graph
        code += "\n<!-- Open Graph / Facebook -->\n";
        code += '<meta property="og:type" content="' + ogType + '">\n';
        if (url) {
          code += '<meta property="og:url" content="' + escapeHtml(url) + '">\n';
        }
        if (title) {
          code += '<meta property="og:title" content="' + escapeHtml(title) + '">\n';
        }
        if (description) {
          code += '<meta property="og:description" content="' + escapeHtml(description) + '">\n';
        }
        if (image) {
          code += '<meta property="og:image" content="' + escapeHtml(image) + '">\n';
          if (imageAlt) {
            code += '<meta property="og:image:alt" content="' + escapeHtml(imageAlt) + '">\n';
          }
        }
        if (siteName) {
          code += '<meta property="og:site_name" content="' + escapeHtml(siteName) + '">\n';
        }
        code += '<meta property="og:locale" content="' + locale + '">\n';

        // Twitter
        code += "\n<!-- Twitter -->\n";
        code += '<meta name="twitter:card" content="' + twitterCard + '">\n';
        if (url) {
          code += '<meta name="twitter:url" content="' + escapeHtml(url) + '">\n';
        }
        if (title) {
          code += '<meta name="twitter:title" content="' + escapeHtml(title) + '">\n';
        }
        if (description) {
          code += '<meta name="twitter:description" content="' + escapeHtml(description) + '">\n';
        }
        if (image) {
          code += '<meta name="twitter:image" content="' + escapeHtml(image) + '">\n';
          if (imageAlt) {
            code += '<meta name="twitter:image:alt" content="' + escapeHtml(imageAlt) + '">\n';
          }
        }
        if (twitterSite) {
          code += '<meta name="twitter:site" content="' + escapeHtml(twitterSite) + '">\n';
        }

        // Canonical
        if (url) {
          code += "\n<!-- Canonical URL -->\n";
          code += '<link rel="canonical" href="' + escapeHtml(url) + '">\n';
        }

        document.getElementById("output").textContent = code;
      }

      // HTML 转义
      window.escapeHtml = function (text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML.replace(/"/g, "&quot;");
      };

      // 复制代码
      window.copyCode = function () {
        const code = document.getElementById("output").textContent;
        navigator.clipboard.writeText(code).then(() => {
          const btn = event.target;
          btn.textContent = "✅ 已复制";
          setTimeout(() => {
            btn.textContent = "📋 复制";
          }, 2000);
        });
      };

      // 下载代码
      window.downloadCode = function () {
        const code = document.getElementById("output").textContent;
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "meta-tags.html";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 重置表单
      window.resetForm = function () {
        document.querySelectorAll("input, textarea").forEach((el) => {
          if (el.type === "checkbox") {
            el.checked = true;
          } else {
            el.value = "";
          }
        });
        document.getElementById("ogType").value = "website";
        document.getElementById("twitterCard").value = "summary_large_image";
        document.getElementById("locale").value = "zh_CN";
        updatePreview();
      };

      // 初始化
      initTheme();
      updatePreview();
    
