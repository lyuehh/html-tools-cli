// @ts-nocheck
// Generated from tools/seo/image-alt-checker.html
// Source SHA-256: c4a7fb45658046788774961d1818597c088a9603b94362795ecdc288dc8e917a
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

      let allImages = [];
      let currentFilter = "all";

      window.filterImages = function (filter) {
        currentFilter = filter;

        // 更新标签状态
        document.querySelectorAll(".filter-tabs button").forEach(function (btn) {
          btn.classList.remove("active");
        });
        event.target.closest("button").classList.add("active");

        renderImageList();
      };

      function createImageItem(img) {
        const item = document.createElement("div");
        item.className = "image-item";
        item.setAttribute("data-type", img.type);

        const status = document.createElement("div");
        status.className = "image-status";
        if (img.type === "has-alt") status.textContent = "✅";
        else if (img.type === "empty-alt") status.textContent = "⚠️";
        else status.textContent = "❌";

        const details = document.createElement("div");
        details.className = "image-details";

        const src = document.createElement("div");
        src.className = "image-src";
        src.textContent = "src: " + (img.src || "(未指定)");

        const alt = document.createElement("div");
        alt.className = "image-alt";
        if (img.type === "has-alt") {
          alt.classList.add("has-alt");
          alt.textContent = 'alt: "' + img.alt + '"';
        } else if (img.type === "empty-alt") {
          alt.classList.add("empty-alt");
          alt.textContent = 'alt: "" (空值)';
        } else {
          alt.classList.add("no-alt");
          alt.textContent = "缺少alt属性";
        }

        details.appendChild(src);
        details.appendChild(alt);

        // 显示其他属性
        if (img.title || img.width || img.height || img.loading) {
          const attrs = document.createElement("div");
          attrs.className = "image-attributes";

          if (img.title) {
            const tag = document.createElement("span");
            tag.className = "attr-tag";
            tag.textContent = "title: " + img.title;
            attrs.appendChild(tag);
          }
          if (img.width) {
            const tag = document.createElement("span");
            tag.className = "attr-tag";
            tag.textContent = "width: " + img.width;
            attrs.appendChild(tag);
          }
          if (img.height) {
            const tag = document.createElement("span");
            tag.className = "attr-tag";
            tag.textContent = "height: " + img.height;
            attrs.appendChild(tag);
          }
          if (img.loading) {
            const tag = document.createElement("span");
            tag.className = "attr-tag";
            tag.textContent = "loading: " + img.loading;
            attrs.appendChild(tag);
          }

          details.appendChild(attrs);
        }

        item.appendChild(status);
        item.appendChild(details);

        return item;
      }

      function renderImageList() {
        const list = document.getElementById("imageList");
        list.textContent = "";

        const filtered =
          currentFilter === "all"
            ? allImages
            : allImages.filter(function (img) {
                return img.type === currentFilter;
              });

        if (filtered.length === 0) {
          list.textContent = "没有找到符合条件的图片";
          return;
        }

        filtered.forEach(function (img) {
          list.appendChild(createImageItem(img));
        });
      }

      window.analyzeImages = function () {
        const html = document.getElementById("htmlInput").value;

        if (!html.trim()) {
          alert("请输入HTML代码");
          return;
        }

        // 解析图片标签
        const imgRegex = /<img\s+([^>]*)>/gi;
        allImages = [];
        let match;

        while ((match = imgRegex.exec(html)) !== null) {
          const attrs = match[1];

          // 提取各种属性
          const srcMatch = attrs.match(/src\s*=\s*["']([^"']*)["']/i);
          const altMatch = attrs.match(/alt\s*=\s*["']([^"']*)["']/i);
          const titleMatch = attrs.match(/title\s*=\s*["']([^"']*)["']/i);
          const widthMatch = attrs.match(/width\s*=\s*["']?(\d+)["']?/i);
          const heightMatch = attrs.match(/height\s*=\s*["']?(\d+)["']?/i);
          const loadingMatch = attrs.match(/loading\s*=\s*["']([^"']*)["']/i);

          const img = {
            src: srcMatch ? srcMatch[1] : "",
            alt: altMatch ? altMatch[1] : null,
            title: titleMatch ? titleMatch[1] : null,
            width: widthMatch ? widthMatch[1] : null,
            height: heightMatch ? heightMatch[1] : null,
            loading: loadingMatch ? loadingMatch[1] : null
          };

          // 判断类型
          if (altMatch === null) {
            img.type = "no-alt";
          } else if (img.alt === "") {
            img.type = "empty-alt";
          } else {
            img.type = "has-alt";
          }

          allImages.push(img);
        }

        // 统计
        const total = allImages.length;
        const hasAlt = allImages.filter(function (i) {
          return i.type === "has-alt";
        }).length;
        const emptyAlt = allImages.filter(function (i) {
          return i.type === "empty-alt";
        }).length;
        const noAlt = allImages.filter(function (i) {
          return i.type === "no-alt";
        }).length;

        // 更新统计显示
        document.getElementById("totalImages").textContent = total;
        document.getElementById("withAlt").textContent = hasAlt;
        document.getElementById("emptyAlt").textContent = emptyAlt;
        document.getElementById("noAlt").textContent = noAlt;

        // 更新徽章
        document.getElementById("badge-all").textContent = total;
        document.getElementById("badge-has").textContent = hasAlt;
        document.getElementById("badge-empty").textContent = emptyAlt;
        document.getElementById("badge-no").textContent = noAlt;

        // 计算分数
        let score = 100;
        if (total > 0) {
          // 无Alt扣分更多
          score = Math.round(((hasAlt + emptyAlt * 0.5) / total) * 100);
        }

        // 更新分数显示
        const scoreValue = document.getElementById("scoreValue");
        scoreValue.textContent = score;
        scoreValue.className = "score-value";
        if (score >= 90) scoreValue.classList.add("score-excellent");
        else if (score >= 70) scoreValue.classList.add("score-good");
        else if (score >= 50) scoreValue.classList.add("score-average");
        else if (score >= 30) scoreValue.classList.add("score-poor");
        else scoreValue.classList.add("score-bad");

        // 渲染图片列表
        currentFilter = "all";
        document.querySelectorAll(".filter-tabs button").forEach(function (btn, index) {
          btn.classList.toggle("active", index === 0);
        });
        renderImageList();

        document.getElementById("results").style.display = "block";
      };
    
