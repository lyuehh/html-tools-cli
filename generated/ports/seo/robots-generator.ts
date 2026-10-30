// @ts-nocheck
// Generated from tools/seo/robots-generator.html
// Source SHA-256: 96b220f8a6184afbe5e8469cfd108ad21aee2a7b60a0457b09756f694ca5a99f
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 常见爬虫列表
      const commonBots = [
        { name: "*", label: "所有爬虫", selected: true },
        { name: "Googlebot", label: "Google", selected: false },
        { name: "Bingbot", label: "Bing", selected: false },
        { name: "Baiduspider", label: "百度", selected: false },
        { name: "Yandex", label: "Yandex", selected: false },
        { name: "DuckDuckBot", label: "DuckDuckGo", selected: false },
        { name: "Slurp", label: "Yahoo", selected: false },
        { name: "facebookexternalhit", label: "Facebook", selected: false },
        { name: "Twitterbot", label: "Twitter", selected: false },
        { name: "LinkedInBot", label: "LinkedIn", selected: false },
        { name: "GPTBot", label: "ChatGPT", selected: false },
        { name: "CCBot", label: "Common Crawl", selected: false }
      ];

      // 规则列表
      let rules = [{ type: "Disallow", path: "" }];

      // 自定义爬虫
      let customBots = [];

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 渲染爬虫列表
      function renderBotList() {
        const container = document.getElementById("botList");
        container.textContent = "";

        const allBots = [
          ...commonBots,
          ...customBots.map((b) => ({ name: b, label: b, selected: true }))
        ];

        allBots.forEach((bot, index) => {
          const label = document.createElement("label");
          label.className = "bot-tag" + (bot.selected ? " selected" : "");

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = bot.selected;
          checkbox.onchange = () => {
            if (index < commonBots.length) {
              commonBots[index].selected = checkbox.checked;
            }
            label.classList.toggle("selected", checkbox.checked);
            generateRobots();
          };

          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(" " + bot.label));
          container.appendChild(label);
        });
      }

      // 处理自定义爬虫输入
      window.handleCustomBot = function (e) {
        if (e.key === "Enter") {
          const input = document.getElementById("customBot");
          const value = input.value.trim();
          if (value && !customBots.includes(value)) {
            customBots.push(value);
            renderBotList();
            generateRobots();
          }
          input.value = "";
        }
      };

      // 渲染规则列表
      function renderRuleList() {
        const container = document.getElementById("ruleList");
        container.textContent = "";

        rules.forEach((rule, index) => {
          const div = document.createElement("div");
          div.className = "rule-item";

          const select = document.createElement("select");
          select.onchange = (e) => {
            rules[index].type = e.target.value;
            generateRobots();
          };

          ["Disallow", "Allow"].forEach((type) => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            option.selected = type === rule.type;
            select.appendChild(option);
          });

          const input = document.createElement("input");
          input.type = "text";
          input.value = rule.path;
          input.placeholder = "/path/to/block";
          input.oninput = (e) => {
            rules[index].path = e.target.value;
            generateRobots();
          };

          const removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.textContent = "×";
          removeBtn.onclick = () => {
            rules.splice(index, 1);
            renderRuleList();
            generateRobots();
          };

          div.appendChild(select);
          div.appendChild(input);
          div.appendChild(removeBtn);
          container.appendChild(div);
        });
      }

      // 添加规则
      window.addRule = function () {
        rules.push({ type: "Disallow", path: "" });
        renderRuleList();
      };

      // 应用预设
      window.applyPreset = function (preset) {
        const presets = {
          allowAll: {
            bots: ["*"],
            rules: [{ type: "Disallow", path: "" }],
            sitemap: ""
          },
          blockAll: {
            bots: ["*"],
            rules: [{ type: "Disallow", path: "/" }],
            sitemap: ""
          },
          standard: {
            bots: ["*"],
            rules: [
              { type: "Disallow", path: "/admin/" },
              { type: "Disallow", path: "/private/" },
              { type: "Disallow", path: "/api/" },
              { type: "Disallow", path: "/*.json$" },
              { type: "Allow", path: "/" }
            ],
            sitemap: "/sitemap.xml"
          },
          wordpress: {
            bots: ["*"],
            rules: [
              { type: "Disallow", path: "/wp-admin/" },
              { type: "Allow", path: "/wp-admin/admin-ajax.php" },
              { type: "Disallow", path: "/wp-includes/" },
              { type: "Disallow", path: "/trackback/" },
              { type: "Disallow", path: "/feed/" },
              { type: "Disallow", path: "/*?*" },
              { type: "Disallow", path: "/*.php$" }
            ],
            sitemap: "/sitemap.xml"
          },
          ecommerce: {
            bots: ["*"],
            rules: [
              { type: "Disallow", path: "/cart/" },
              { type: "Disallow", path: "/checkout/" },
              { type: "Disallow", path: "/account/" },
              { type: "Disallow", path: "/search/" },
              { type: "Disallow", path: "/*?*sort=" },
              { type: "Disallow", path: "/*?*filter=" },
              { type: "Disallow", path: "/admin/" },
              { type: "Allow", path: "/" }
            ],
            sitemap: "/sitemap.xml"
          },
          spa: {
            bots: ["*"],
            rules: [
              { type: "Disallow", path: "/api/" },
              { type: "Disallow", path: "/_next/" },
              { type: "Disallow", path: "/static/" },
              { type: "Allow", path: "/" }
            ],
            sitemap: "/sitemap.xml"
          }
        };

        const p = presets[preset];

        // 重置爬虫选择
        commonBots.forEach((bot, i) => {
          commonBots[i].selected = p.bots.includes(bot.name);
        });
        customBots = [];

        // 设置规则
        rules = [...p.rules];

        // 设置 sitemap
        document.getElementById("sitemapUrl").value = p.sitemap
          ? "https://example.com" + p.sitemap
          : "";

        // 清除其他设置
        document.getElementById("crawlDelay").value = "";
        document.getElementById("hostDirective").value = "";
        document.getElementById("addSitemapIndex").checked = false;

        renderBotList();
        renderRuleList();
        generateRobots();
      };

      // 生成 robots.txt
      function generateRobots() {
        const selectedBots = [
          ...commonBots.filter((b) => b.selected).map((b) => b.name),
          ...customBots
        ];

        const sitemap = document.getElementById("sitemapUrl").value.trim();
        const addIndex = document.getElementById("addSitemapIndex").checked;
        const crawlDelay = document.getElementById("crawlDelay").value;
        const host = document.getElementById("hostDirective").value.trim();

        let output = "# robots.txt generated by HTML Tools\n";
        output += "# " + new Date().toISOString().split("T")[0] + "\n\n";

        selectedBots.forEach((bot, index) => {
          output += "User-agent: " + bot + "\n";

          rules.forEach((rule) => {
            output += rule.type + ": " + rule.path + "\n";
          });

          if (crawlDelay) {
            output += "Crawl-delay: " + crawlDelay + "\n";
          }

          if (index < selectedBots.length - 1) {
            output += "\n";
          }
        });

        if (host) {
          output += "\nHost: " + host + "\n";
        }

        if (sitemap) {
          output += "\nSitemap: " + sitemap + "\n";
          if (addIndex) {
            const indexUrl = sitemap.replace(/sitemap\.xml$/, "sitemap_index.xml");
            if (indexUrl !== sitemap) {
              output += "Sitemap: " + indexUrl + "\n";
            }
          }
        }

        document.getElementById("output").textContent = output;
      }

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

      // 下载文件
      window.downloadFile = function () {
        const code = document.getElementById("output").textContent;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "robots.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 重置所有
      window.resetAll = function () {
        commonBots.forEach((bot, i) => {
          commonBots[i].selected = i === 0;
        });
        customBots = [];
        rules = [{ type: "Disallow", path: "" }];
        document.getElementById("sitemapUrl").value = "";
        document.getElementById("crawlDelay").value = "";
        document.getElementById("hostDirective").value = "";
        document.getElementById("addSitemapIndex").checked = false;

        renderBotList();
        renderRuleList();
        generateRobots();
      };

      // 初始化
      initTheme();
      renderBotList();
      renderRuleList();
      generateRobots();
    
