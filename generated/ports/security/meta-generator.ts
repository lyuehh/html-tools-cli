// @ts-nocheck
// Generated from tools/security/meta-generator.html
// Source SHA-256: 8ba2ae3c57b1fa1076e151fbd9c6a49eac3e3a43e2c2c3ca05e41ce33e412008
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeToggle = document.querySelector(".theme-toggle");
        if (themeToggle) themeToggle.textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      const themeToggle = document.querySelector(".theme-toggle");
      if (themeToggle) themeToggle.textContent = savedTheme === "light" ? "🌙" : "☀️";

      function getValue(id) {
        return document.getElementById(id).value.trim();
      }

      function updateCharCounter(inputId, counterId, recommended) {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        const len = input.value.length;

        counter.textContent = len + " / " + recommended + " 字符";
        counter.className = "char-counter";

        if (len > recommended) {
          counter.classList.add("error");
        } else if (len > recommended * 0.9) {
          counter.classList.add("warning");
        }
      }

      function updateAll() {
        updateCharCounter("pageTitle", "titleCounter", 60);
        updateCharCounter("pageDesc", "descCounter", 160);
        updatePreview();
        generateOutput();
      }

      window.updatePreview = function () {
        const title = getValue("pageTitle") || "页面标题";
        const desc = getValue("pageDesc") || "页面描述将显示在这里...";
        const url = getValue("pageUrl") || "https://example.com";
        const ogTitle = getValue("ogTitle") || title;
        const ogDesc = getValue("ogDesc") || desc;
        const ogImage = getValue("ogImage");
        const ogSiteName = getValue("ogSiteName");
        const twitterTitle = getValue("twitterTitle") || ogTitle;
        const twitterDesc = getValue("twitterDesc") || ogDesc;
        const twitterImage = getValue("twitterImage") || ogImage;

        // Google preview
        document.getElementById("previewGoogleTitle").textContent = title;
        document.getElementById("previewGoogleUrl").textContent = url;
        document.getElementById("previewGoogleDesc").textContent = desc;

        // Facebook preview
        const fbImageEl = document.getElementById("previewFbImage");
        if (ogImage) {
          fbImageEl.style.backgroundImage = "url(" + ogImage + ")";
          fbImageEl.textContent = "";
        } else {
          fbImageEl.style.backgroundImage = "";
          fbImageEl.textContent = "1200 x 630";
        }
        document.getElementById("previewFbTitle").textContent = ogTitle;
        document.getElementById("previewFbDesc").textContent = ogDesc;
        try {
          document.getElementById("previewFbSite").textContent =
            ogSiteName || new URL(url).hostname.toUpperCase();
        } catch (e) {
          document.getElementById("previewFbSite").textContent = "EXAMPLE.COM";
        }

        // Twitter preview
        const twImageEl = document.getElementById("previewTwitterImage");
        if (twitterImage) {
          twImageEl.style.backgroundImage = "url(" + twitterImage + ")";
          twImageEl.textContent = "";
        } else {
          twImageEl.style.backgroundImage = "";
          twImageEl.textContent = "1200 x 600";
        }
        document.getElementById("previewTwitterTitle").textContent = twitterTitle;
        document.getElementById("previewTwitterDesc").textContent = twitterDesc;
        try {
          document.getElementById("previewTwitterSite").textContent = new URL(url).hostname;
        } catch (e) {
          document.getElementById("previewTwitterSite").textContent = "example.com";
        }
      };

      window.switchPreview = function (type) {
        document.querySelectorAll(".preview-tab").forEach(function (tab, index) {
          const types = ["google", "facebook", "twitter"];
          tab.classList.toggle("active", types[index] === type);
        });

        document.querySelectorAll(".preview-content").forEach(function (content) {
          content.classList.remove("active");
        });
        document.getElementById(type + "Preview").classList.add("active");
      };

      function generateOutput() {
        const title = getValue("pageTitle");
        const desc = getValue("pageDesc");
        const url = getValue("pageUrl");
        const keywords = getValue("pageKeywords");
        const author = getValue("pageAuthor");
        const ogTitle = getValue("ogTitle") || title;
        const ogDesc = getValue("ogDesc") || desc;
        const ogImage = getValue("ogImage");
        const ogType = getValue("ogType");
        const ogSiteName = getValue("ogSiteName");
        const ogLocale = getValue("ogLocale");
        const twitterCard = getValue("twitterCard");
        const twitterSite = getValue("twitterSite");
        const twitterTitle = getValue("twitterTitle");
        const twitterDesc = getValue("twitterDesc");
        const twitterImage = getValue("twitterImage");
        const robots = getValue("robots");
        const viewport = getValue("viewport");
        const canonical = getValue("canonical");

        let output = "<!-- 基本 Meta 标签 -->\n";
        output += '<meta charset="UTF-8">\n';
        output += '<meta name="viewport" content="' + viewport + '">\n';

        if (title) {
          output += "<title>" + escapeHtml(title) + " - WebUtils</title>\n";
        }
        if (desc) {
          output += '<meta name="description" content="' + escapeHtml(desc) + '">\n';
        }
        if (keywords) {
          output += '<meta name="keywords" content="' + escapeHtml(keywords) + '">\n';
        }
        if (author) {
          output += '<meta name="author" content="' + escapeHtml(author) + '">\n';
        }
        output += '<meta name="robots" content="' + robots + '">\n';

        if (canonical) {
          output += '<link rel="canonical" href="' + escapeHtml(canonical) + '">\n';
        }

        output += "\n<!-- Open Graph / Facebook -->\n";
        output += '<meta property="og:type" content="' + ogType + '">\n';
        if (url) {
          output += '<meta property="og:url" content="' + escapeHtml(url) + '">\n';
        }
        if (ogTitle) {
          output += '<meta property="og:title" content="' + escapeHtml(ogTitle) + '">\n';
        }
        if (ogDesc) {
          output += '<meta property="og:description" content="' + escapeHtml(ogDesc) + '">\n';
        }
        if (ogImage) {
          output += '<meta property="og:image" content="' + escapeHtml(ogImage) + '">\n';
        }
        if (ogSiteName) {
          output += '<meta property="og:site_name" content="' + escapeHtml(ogSiteName) + '">\n';
        }
        output += '<meta property="og:locale" content="' + ogLocale + '">\n';

        output += "\n<!-- Twitter Cards -->\n";
        output += '<meta name="twitter:card" content="' + twitterCard + '">\n';
        if (url) {
          output += '<meta name="twitter:url" content="' + escapeHtml(url) + '">\n';
        }
        if (twitterTitle || ogTitle) {
          output +=
            '<meta name="twitter:title" content="' + escapeHtml(twitterTitle || ogTitle) + '">\n';
        }
        if (twitterDesc || ogDesc) {
          output +=
            '<meta name="twitter:description" content="' +
            escapeHtml(twitterDesc || ogDesc) +
            '">\n';
        }
        if (twitterImage || ogImage) {
          output +=
            '<meta name="twitter:image" content="' + escapeHtml(twitterImage || ogImage) + '">\n';
        }
        if (twitterSite) {
          output += '<meta name="twitter:site" content="' + escapeHtml(twitterSite) + '">\n';
        }

        document.getElementById("outputContent").textContent = output;
      }

      window.escapeHtml = function (str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        navigator.clipboard.writeText(output).then(function () {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        const title = getValue("pageTitle") || "Untitled";

        let html = '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n';
        html += output
          .split("\n")
          .map(function (line) {
            return "    " + line;
          })
          .join("\n");
        html += "\n</head>\n<body>\n    <h2>" + escapeHtml(title) + "</h2>\n</body>\n</html>";

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "meta-tags.html";
        a.click();
        URL.revokeObjectURL(url);
      };

      function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#10b981;color:white;padding:0.75rem 1.5rem;border-radius:8px;z-index:1000;";
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      // 初始化
      updateAll();
    
