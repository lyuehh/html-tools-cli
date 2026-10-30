// @ts-nocheck
// Generated from tools/extractor/favicon-extractor.html
// Source SHA-256: 392c98ff48a6a8a0a21fc6f1d2415a7d45d057ee994fe808cbf51098431e537e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.quickTest = function (domain) {
        document.getElementById("urlInput").value = domain;
        extractFavicons();
      };

      function getDomain(url) {
        try {
          if (!url.includes("://")) url = "https://" + url;
          return new URL(url).hostname;
        } catch {
          return url.replace(/^(https?:\/\/)?/, "").split("/")[0];
        }
      }

      function extractFavicons() {
        const input = document.getElementById("urlInput").value.trim();
        if (!input) {
          showError("请输入网站地址");
          return;
        }

        const domain = getDomain(input);

        document.getElementById("loading").classList.add("show");
        document.getElementById("result").style.display = "none";
        document.getElementById("errorMsg").style.display = "none";

        // Generate favicon URLs using various services
        const sizes = [16, 32, 48, 64, 128, 256];
        const icons = [];

        // Google Favicon Service (various sizes)
        sizes.forEach((size) => {
          icons.push({
            url: `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`,
            size: `${size}x${size}`,
            type: "Google Service",
            service: "google"
          });
        });

        // DuckDuckGo
        icons.push({
          url: `https://icons.duckduckgo.com/ip3/${domain}.ico`,
          size: "varies",
          type: "DuckDuckGo",
          service: "duckduckgo"
        });

        // Direct favicon.ico
        icons.push({
          url: `https://${domain}/favicon.ico`,
          size: "varies",
          type: "Direct /favicon.ico",
          service: "direct"
        });

        // Apple Touch Icon
        icons.push({
          url: `https://${domain}/apple-touch-icon.png`,
          size: "180x180",
          type: "Apple Touch Icon",
          service: "apple"
        });

        // Display results
        setTimeout(() => {
          document.getElementById("loading").classList.remove("show");
          displayResults(domain, icons);
        }, 500);
      }

      function displayResults(domain, icons) {
        document.getElementById("siteName").textContent = domain;
        document.getElementById("siteUrl").textContent = `https://${domain}`;

        // Set main icon
        const mainIcon = document.getElementById("mainIcon");
        mainIcon.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        mainIcon.onerror = () => {
          mainIcon.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
        };

        // Generate icons grid
        const grid = document.getElementById("iconsGrid");
        grid.innerHTML = icons
          .map(
            (icon, i) => `
                <div class="icon-card">
                    <div class="icon-preview checker">
                        <img src="${icon.url}" alt="favicon" onerror="this.parentElement.innerHTML='<span class=placeholder>加载失败</span>'">
                    </div>
                    <div class="icon-info">
                        <div class="size">${icon.size}</div>
                        <div class="type">${icon.type}</div>
                    </div>
                    <div class="icon-actions">
                        <button onclick="copyUrl('${icon.url}')" class="secondary outline">复制链接</button>
                        <button onclick="downloadIcon('${icon.url}', '${domain}', ${i})">下载</button>
                    </div>
                </div>
            `
          )
          .join("");

        document.getElementById("result").style.display = "block";
      }

      window.copyUrl = function (url) {
        navigator.clipboard.writeText(url);
        showToast("链接已复制");
      };

      window.downloadIcon = async function (url, domain, index) {
        try {
          // Open in new tab for download since we can't directly download cross-origin
          window.open(url, "_blank");
          showToast("已在新标签页打开，右键保存图片");
        } catch (e) {
          showToast("下载失败，请右键图片另存为", "error");
        }
      };

      function showError(msg) {
        document.getElementById("errorMsg").textContent = msg;
        document.getElementById("errorMsg").style.display = "block";
        document.getElementById("loading").classList.remove("show");
      }

      function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.background = type === "error" ? "#ef4444" : "#10b981";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Enter key support
      document.getElementById("urlInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") extractFavicons();
      });
    
