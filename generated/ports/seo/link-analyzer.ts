// @ts-nocheck
// Generated from tools/seo/link-analyzer.html
// Source SHA-256: e8dc32e074ca760a43be711d9134eb3b3993728f000acde63b0c038689fec4d3
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

      let allLinks = [];
      let currentFilter = "all";

      function getDomain(url) {
        try {
          if (url.startsWith("//")) {
            url = "https:" + url;
          }
          const urlObj = new URL(url, "https://example.com");
          return urlObj.hostname;
        } catch (e) {
          return null;
        }
      }

      function isInternalLink(href, baseUrl) {
        if (!href) return false;

        // 锚点链接
        if (href.startsWith("#")) return true;

        // 相对路径
        if (href.startsWith("/") && !href.startsWith("//")) return true;
        if (!href.includes("://") && !href.startsWith("//")) return true;

        // 绝对路径，比较域名
        if (baseUrl) {
          const baseDomain = getDomain(baseUrl);
          const linkDomain = getDomain(href);
          if (baseDomain && linkDomain) {
            return baseDomain === linkDomain || linkDomain.endsWith("." + baseDomain);
          }
        }

        return false;
      }

      window.filterLinks = function (filter) {
        currentFilter = filter;

        // 更新标签状态
        document.querySelectorAll(".filter-tabs button").forEach(function (btn) {
          btn.classList.remove("active");
        });
        event.target.classList.add("active");

        renderLinkTable();
      };

      function createLinkRow(link) {
        const row = document.createElement("tr");
        row.setAttribute("data-type", link.type);

        const hrefCell = document.createElement("td");
        hrefCell.textContent = link.href || "(空链接)";

        const anchorCell = document.createElement("td");
        anchorCell.textContent = link.anchor || "(无锚文本)";

        const attrCell = document.createElement("td");

        // 类型徽章
        const typeBadge = document.createElement("span");
        typeBadge.className = "badge badge-" + link.type;
        typeBadge.textContent = link.type === "internal" ? "内链" : "外链";
        attrCell.appendChild(typeBadge);

        // nofollow徽章
        if (link.nofollow) {
          const nfBadge = document.createElement("span");
          nfBadge.className = "badge badge-nofollow";
          nfBadge.textContent = "nofollow";
          nfBadge.style.marginLeft = "0.25rem";
          attrCell.appendChild(nfBadge);
        }

        // target="_blank"徽章
        if (link.blank) {
          const blankBadge = document.createElement("span");
          blankBadge.className = "badge badge-blank";
          blankBadge.textContent = "_blank";
          blankBadge.style.marginLeft = "0.25rem";
          attrCell.appendChild(blankBadge);
        }

        row.appendChild(hrefCell);
        row.appendChild(anchorCell);
        row.appendChild(attrCell);

        return row;
      }

      function renderLinkTable() {
        const tbody = document.getElementById("linkTableBody");
        tbody.textContent = "";

        let filtered = allLinks;
        if (currentFilter === "internal") {
          filtered = allLinks.filter(function (l) {
            return l.type === "internal";
          });
        } else if (currentFilter === "external") {
          filtered = allLinks.filter(function (l) {
            return l.type === "external";
          });
        } else if (currentFilter === "nofollow") {
          filtered = allLinks.filter(function (l) {
            return l.nofollow;
          });
        }

        if (filtered.length === 0) {
          const row = document.createElement("tr");
          const cell = document.createElement("td");
          cell.colSpan = 3;
          cell.style.textAlign = "center";
          cell.style.color = "var(--pico-muted-color)";
          cell.textContent = "没有找到符合条件的链接";
          row.appendChild(cell);
          tbody.appendChild(row);
          return;
        }

        filtered.forEach(function (link) {
          tbody.appendChild(createLinkRow(link));
        });
      }

      function renderAnchorCloud(anchors) {
        const cloud = document.getElementById("anchorCloud");
        cloud.textContent = "";

        // 转换为数组并排序
        const sortedAnchors = Object.entries(anchors)
          .filter(function (a) {
            return a[0].trim();
          })
          .sort(function (a, b) {
            return b[1] - a[1];
          })
          .slice(0, 20);

        if (sortedAnchors.length === 0) {
          const msg = document.createElement("span");
          msg.className = "empty-message";
          msg.textContent = "没有发现有效的锚文本";
          cloud.appendChild(msg);
          return;
        }

        sortedAnchors.forEach(function (item) {
          var anchor = item[0];
          var count = item[1];
          const tag = document.createElement("span");
          tag.className = "anchor-tag";

          const text = document.createElement("span");
          text.textContent = anchor;

          const countBadge = document.createElement("span");
          countBadge.className = "anchor-count";
          countBadge.textContent = count;

          tag.appendChild(text);
          tag.appendChild(countBadge);
          cloud.appendChild(tag);
        });
      }

      window.analyzeLinks = function () {
        const html = document.getElementById("htmlInput").value;
        const baseUrl = document.getElementById("baseUrl").value.trim();

        if (!html.trim()) {
          alert("请输入HTML代码");
          return;
        }

        // 解析链接标签
        const linkRegex = /<a\s+([^>]*)>([\s\S]*?)<\/a>/gi;
        allLinks = [];
        const anchors = {};
        const domains = new Set();
        let match;

        while ((match = linkRegex.exec(html)) !== null) {
          const attrs = match[1];
          const anchorText = match[2].replace(/<[^>]+>/g, "").trim();

          // 提取属性
          const hrefMatch = attrs.match(/href\s*=\s*["']([^"']*)["']/i);
          const relMatch = attrs.match(/rel\s*=\s*["']([^"']*)["']/i);
          const targetMatch = attrs.match(/target\s*=\s*["']([^"']*)["']/i);

          const href = hrefMatch ? hrefMatch[1] : "";
          const rel = relMatch ? relMatch[1].toLowerCase() : "";
          const target = targetMatch ? targetMatch[1] : "";

          const isInternal = isInternalLink(href, baseUrl);

          const link = {
            href: href,
            anchor: anchorText,
            type: isInternal ? "internal" : "external",
            nofollow: rel.includes("nofollow"),
            blank: target === "_blank"
          };

          allLinks.push(link);

          // 统计锚文本
          if (anchorText) {
            anchors[anchorText] = (anchors[anchorText] || 0) + 1;
          }

          // 统计外部域名
          if (!isInternal && href) {
            const domain = getDomain(href);
            if (domain) domains.add(domain);
          }
        }

        // 统计
        const total = allLinks.length;
        const internal = allLinks.filter(function (l) {
          return l.type === "internal";
        }).length;
        const external = allLinks.filter(function (l) {
          return l.type === "external";
        }).length;
        const nofollow = allLinks.filter(function (l) {
          return l.nofollow;
        }).length;

        // 更新统计显示
        document.getElementById("totalLinks").textContent = total;
        document.getElementById("internalLinks").textContent = internal;
        document.getElementById("externalLinks").textContent = external;
        document.getElementById("nofollowLinks").textContent = nofollow;
        document.getElementById("uniqueDomains").textContent = domains.size;

        // 更新比例条
        if (total > 0) {
          const internalPercent = Math.round((internal / total) * 100);
          const externalPercent = 100 - internalPercent;
          document.getElementById("internalBar").style.width = internalPercent + "%";
          document.getElementById("externalBar").style.width = externalPercent + "%";
          document.getElementById("internalPercent").textContent = internalPercent + "%";
          document.getElementById("externalPercent").textContent = externalPercent + "%";
        } else {
          document.getElementById("internalBar").style.width = "50%";
          document.getElementById("externalBar").style.width = "50%";
          document.getElementById("internalPercent").textContent = "0%";
          document.getElementById("externalPercent").textContent = "0%";
        }

        // 渲染锚文本云
        renderAnchorCloud(anchors);

        // 渲染链接表格
        currentFilter = "all";
        document.querySelectorAll(".filter-tabs button").forEach(function (btn, index) {
          btn.classList.toggle("active", index === 0);
        });
        renderLinkTable();

        document.getElementById("results").style.display = "block";
      };
    
