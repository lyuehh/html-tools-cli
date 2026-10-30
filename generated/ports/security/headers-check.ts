// @ts-nocheck
// Generated from tools/security/headers-check.html
// Source SHA-256: 8e25ecb448aa9b45789aaa9230ec10f9a1638041481bdacfa12e522ad89e0cd6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var securityHeaders = [
        {
          name: "Content-Security-Policy",
          level: "critical",
          description: "控制页面可以加载哪些资源，有效防止 XSS 攻击和数据注入攻击。",
          example:
            "Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
          details: [
            "default-src 'self' - 默认只允许同源资源",
            "script-src - 控制 JavaScript 来源",
            "style-src - 控制 CSS 来源",
            "img-src - 控制图片来源",
            "frame-ancestors - 防止点击劫持"
          ],
          attacks: ["XSS", "Data Injection", "Clickjacking"]
        },
        {
          name: "Strict-Transport-Security",
          level: "critical",
          description: "强制浏览器只通过 HTTPS 连接到服务器，防止协议降级攻击和 Cookie 劫持。",
          example: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
          details: [
            "max-age=31536000 - HSTS 有效期一年",
            "includeSubDomains - 包含所有子域名",
            "preload - 可提交到 HSTS 预加载列表"
          ],
          attacks: ["Man-in-the-Middle", "SSL Stripping", "Cookie Hijacking"]
        },
        {
          name: "X-Content-Type-Options",
          level: "critical",
          description: "防止浏览器进行 MIME 类型嗅探，减少基于 MIME 混淆的攻击风险。",
          example: "X-Content-Type-Options: nosniff",
          details: ["nosniff - 禁止 MIME 类型嗅探", "确保文件以声明的 Content-Type 处理"],
          attacks: ["MIME Confusion", "Drive-by Download"]
        },
        {
          name: "X-Frame-Options",
          level: "important",
          description: "控制页面是否可以被嵌入到 iframe 中，防止点击劫持攻击。",
          example: "X-Frame-Options: DENY",
          details: [
            "DENY - 完全禁止被嵌入",
            "SAMEORIGIN - 只允许同源嵌入",
            "ALLOW-FROM uri - 允许指定来源嵌入（已废弃）"
          ],
          attacks: ["Clickjacking", "UI Redressing"]
        },
        {
          name: "X-XSS-Protection",
          level: "important",
          description: "启用浏览器内置的 XSS 过滤器（已被 CSP 取代，但仍建议设置）。",
          example: "X-XSS-Protection: 1; mode=block",
          details: [
            "1 - 启用 XSS 过滤器",
            "mode=block - 检测到攻击时阻止渲染",
            "注意：现代浏览器已移除此功能"
          ],
          attacks: ["XSS"]
        },
        {
          name: "Referrer-Policy",
          level: "important",
          description: "控制请求中 Referer 头的信息量，保护用户隐私。",
          example: "Referrer-Policy: strict-origin-when-cross-origin",
          details: [
            "no-referrer - 不发送 Referer",
            "same-origin - 只同源请求发送",
            "strict-origin - 只发送源，不发送路径",
            "strict-origin-when-cross-origin - 推荐设置"
          ],
          attacks: ["Information Leakage", "Privacy Violation"]
        },
        {
          name: "Permissions-Policy",
          level: "recommended",
          description: "控制浏览器功能的使用权限，如摄像头、麦克风、地理位置等。",
          example: "Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()",
          details: [
            "camera=() - 禁用摄像头",
            "microphone=() - 禁用麦克风",
            "geolocation=() - 禁用地理位置",
            "可按需开放特定功能"
          ],
          attacks: ["Privacy Violation", "Feature Abuse"]
        },
        {
          name: "Cross-Origin-Embedder-Policy",
          level: "recommended",
          description: "控制文档是否可以加载未明确授权的跨源资源。",
          example: "Cross-Origin-Embedder-Policy: require-corp",
          details: [
            "require-corp - 要求所有资源都有 CORP 头",
            "credentialless - 使用无凭证模式加载",
            "与 COOP 配合使用可启用高精度计时器"
          ],
          attacks: ["Spectre", "Side-Channel"]
        },
        {
          name: "Cross-Origin-Opener-Policy",
          level: "recommended",
          description: "隔离浏览上下文，防止跨窗口攻击。",
          example: "Cross-Origin-Opener-Policy: same-origin",
          details: [
            "same-origin - 只与同源文档共享上下文",
            "same-origin-allow-popups - 允许弹窗",
            "防止 window.opener 相关攻击"
          ],
          attacks: ["Cross-Window Attack", "Spectre"]
        },
        {
          name: "Cross-Origin-Resource-Policy",
          level: "recommended",
          description: "控制资源是否可以被其他源加载。",
          example: "Cross-Origin-Resource-Policy: same-origin",
          details: [
            "same-origin - 只允许同源加载",
            "same-site - 允许同站加载",
            "cross-origin - 允许跨源加载"
          ],
          attacks: ["Cross-Origin Resource Theft"]
        },
        {
          name: "Cache-Control",
          level: "important",
          description: "控制响应的缓存行为，防止敏感数据被缓存。",
          example: "Cache-Control: no-store, no-cache, must-revalidate, private",
          details: [
            "no-store - 不存储任何缓存",
            "no-cache - 每次都要验证",
            "private - 只能被浏览器缓存",
            "敏感页面应禁用缓存"
          ],
          attacks: ["Information Disclosure", "Cache Poisoning"]
        },
        {
          name: "X-Permitted-Cross-Domain-Policies",
          level: "recommended",
          description: "控制 Adobe Flash 和 PDF 的跨域策略文件加载。",
          example: "X-Permitted-Cross-Domain-Policies: none",
          details: [
            "none - 不允许任何策略文件",
            "master-only - 只允许主策略文件",
            "主要用于遗留系统安全"
          ],
          attacks: ["Cross-Domain Data Theft"]
        }
      ];

      var attacks = [
        {
          name: "XSS (跨站脚本攻击)",
          description: "攻击者将恶意脚本注入到网页中，窃取用户数据或执行恶意操作。",
          headers: ["Content-Security-Policy", "X-XSS-Protection"],
          mitigation: "Content-Security-Policy: script-src 'self'; object-src 'none'"
        },
        {
          name: "点击劫持 (Clickjacking)",
          description: "通过透明 iframe 覆盖在合法页面上，诱导用户点击。",
          headers: ["X-Frame-Options", "Content-Security-Policy"],
          mitigation: "X-Frame-Options: DENY\nContent-Security-Policy: frame-ancestors 'none'"
        },
        {
          name: "中间人攻击 (MITM)",
          description: "攻击者截获并可能篡改客户端和服务器之间的通信。",
          headers: ["Strict-Transport-Security"],
          mitigation: "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
        },
        {
          name: "MIME 混淆攻击",
          description: "利用浏览器的 MIME 类型嗅探执行恶意内容。",
          headers: ["X-Content-Type-Options"],
          mitigation: "X-Content-Type-Options: nosniff"
        },
        {
          name: "Spectre 侧信道攻击",
          description: "利用 CPU 推测执行漏洞读取内存数据。",
          headers: ["Cross-Origin-Embedder-Policy", "Cross-Origin-Opener-Policy"],
          mitigation:
            "Cross-Origin-Embedder-Policy: require-corp\nCross-Origin-Opener-Policy: same-origin"
        },
        {
          name: "信息泄露",
          description: "Referer 头或缓存可能泄露敏感信息。",
          headers: ["Referrer-Policy", "Cache-Control"],
          mitigation:
            "Referrer-Policy: strict-origin-when-cross-origin\nCache-Control: no-store, private"
        }
      ];

      var checklist = [
        { text: "启用 HTTPS 并配置 HSTS", critical: true },
        { text: "配置 Content-Security-Policy", critical: true },
        { text: "设置 X-Content-Type-Options: nosniff", critical: true },
        { text: "设置 X-Frame-Options 防止点击劫持", critical: true },
        { text: "配置 Referrer-Policy 保护隐私", critical: false },
        { text: "设置 Permissions-Policy 限制 API 访问", critical: false },
        { text: "敏感页面禁用缓存", critical: true },
        { text: "移除不必要的服务器信息头", critical: false },
        { text: "配置 CORS 白名单", critical: true },
        { text: "定期审查和更新安全策略", critical: false }
      ];

      var currentFilter = "all";

      window.toggleTheme = function () {
        var html = document.documentElement;
        var current = html.getAttribute("data-theme");
        html.setAttribute("data-theme", current === "light" ? "dark" : "light");
      };

      window.switchTab = function (tabName) {
        document.querySelectorAll(".tab").forEach(function (t) {
          t.classList.remove("active");
        });
        document.querySelectorAll(".tab-content").forEach(function (c) {
          c.classList.remove("active");
        });
        document
          .querySelector("[onclick=\"switchTab('" + tabName + "')\"]")
          .classList.add("active");
        document.getElementById(tabName + "-tab").classList.add("active");
      };

      function renderHeaders() {
        var container = document.getElementById("headersContainer");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        securityHeaders.forEach(function (header) {
          var card = document.createElement("div");
          card.className = "header-card";
          card.dataset.level = header.level;
          card.dataset.name = header.name.toLowerCase();

          var levelText =
            header.level === "critical" ? "关键" : header.level === "important" ? "重要" : "推荐";

          var titleDiv = document.createElement("div");
          titleDiv.className = "header-card-title";

          var h3 = document.createElement("h3");
          h3.textContent = header.name;

          var badge = document.createElement("span");
          badge.className = "status-badge status-" + header.level;
          badge.textContent = levelText;

          titleDiv.appendChild(h3);
          titleDiv.appendChild(badge);

          var descP = document.createElement("p");
          descP.className = "header-description";
          descP.textContent = header.description;

          var exampleDiv = document.createElement("div");
          exampleDiv.className = "header-example";
          exampleDiv.textContent = header.example;

          var detailsDiv = document.createElement("details");
          detailsDiv.className = "header-details";

          var summary = document.createElement("summary");
          summary.textContent = "详细说明";
          detailsDiv.appendChild(summary);

          var ul = document.createElement("ul");
          header.details.forEach(function (detail) {
            var li = document.createElement("li");
            li.textContent = detail;
            ul.appendChild(li);
          });
          detailsDiv.appendChild(ul);

          if (header.attacks && header.attacks.length > 0) {
            var attacksP = document.createElement("p");
            var strong = document.createElement("strong");
            strong.textContent = "防护攻击: ";
            attacksP.appendChild(strong);
            attacksP.appendChild(document.createTextNode(header.attacks.join(", ")));
            detailsDiv.appendChild(attacksP);
          }

          card.appendChild(titleDiv);
          card.appendChild(descP);
          card.appendChild(exampleDiv);
          card.appendChild(detailsDiv);

          container.appendChild(card);
        });
      }

      function renderAttacks() {
        var container = document.getElementById("attacksContainer");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        attacks.forEach(function (attack) {
          var card = document.createElement("div");
          card.className = "attack-card";

          var h4 = document.createElement("h4");
          h4.textContent = attack.name;

          var p = document.createElement("p");
          p.textContent = attack.description;

          var headersP = document.createElement("p");
          var strong1 = document.createElement("strong");
          strong1.textContent = "相关安全头: ";
          headersP.appendChild(strong1);
          headersP.appendChild(document.createTextNode(attack.headers.join(", ")));

          var mitigationDiv = document.createElement("div");
          mitigationDiv.className = "mitigation";

          var mitigationLabel = document.createElement("strong");
          mitigationLabel.textContent = "防护配置:";
          mitigationDiv.appendChild(mitigationLabel);

          var pre = document.createElement("pre");
          pre.style.margin = "0.5rem 0 0 0";
          pre.textContent = attack.mitigation;
          mitigationDiv.appendChild(pre);

          card.appendChild(h4);
          card.appendChild(p);
          card.appendChild(headersP);
          card.appendChild(mitigationDiv);

          container.appendChild(card);
        });
      }

      function renderChecklist() {
        var container = document.getElementById("checklistContainer");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        checklist.forEach(function (item, index) {
          var div = document.createElement("div");
          div.className = "checklist-item";

          var icon = document.createElement("span");
          icon.className = "checklist-icon";
          icon.textContent = item.critical ? "🔴" : "🟡";

          var label = document.createElement("label");

          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = "check-" + index;

          var text = document.createTextNode(" " + item.text + (item.critical ? " (关键)" : ""));

          label.appendChild(checkbox);
          label.appendChild(text);

          div.appendChild(icon);
          div.appendChild(label);

          container.appendChild(div);
        });
      }

      function renderHeaderCheckboxes() {
        var container = document.getElementById("headerCheckboxes");
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        securityHeaders.forEach(function (header, index) {
          var label = document.createElement("label");

          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = "gen-" + index;
          checkbox.checked = header.level === "critical";
          checkbox.onchange = generateConfig;

          var text = document.createTextNode(" " + header.name);

          label.appendChild(checkbox);
          label.appendChild(text);

          container.appendChild(label);
        });
      }

      window.setFilter = function (filter) {
        currentFilter = filter;
        document.querySelectorAll(".filter-tag").forEach(function (tag) {
          tag.classList.remove("active");
        });
        document.querySelector('[data-filter="' + filter + '"]').classList.add("active");
        filterHeaders();
      };

      function filterHeaders() {
        var searchTerm = document.getElementById("headerSearch").value.toLowerCase();
        var cards = document.querySelectorAll(".header-card");

        cards.forEach(function (card) {
          var matchesFilter = currentFilter === "all" || card.dataset.level === currentFilter;
          var matchesSearch =
            card.dataset.name.indexOf(searchTerm) !== -1 ||
            card.textContent.toLowerCase().indexOf(searchTerm) !== -1;

          if (matchesFilter && matchesSearch) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      }

      function generateConfig() {
        var serverType = document.getElementById("serverType").value;
        var cspLevel = document.getElementById("cspLevel").value;

        var selectedHeaders = [];
        securityHeaders.forEach(function (header, index) {
          var checkbox = document.getElementById("gen-" + index);
          if (checkbox && checkbox.checked) {
            selectedHeaders.push(header);
          }
        });

        var cspValue;
        switch (cspLevel) {
          case "strict":
            cspValue =
              "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
            break;
          case "moderate":
            cspValue =
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-ancestors 'self'";
            break;
          case "permissive":
            cspValue =
              "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src * data:; font-src * data:; connect-src *";
            break;
        }

        var config = "";

        switch (serverType) {
          case "nginx":
            config = "# Nginx Security Headers Configuration\n\n";
            selectedHeaders.forEach(function (header) {
              var value = header.example.split(": ")[1];
              if (header.name === "Content-Security-Policy") {
                value = cspValue;
              }
              config += "add_header " + header.name + ' "' + value + '" always;\n';
            });
            break;

          case "apache":
            config =
              "# Apache Security Headers Configuration\n# Add to .htaccess or httpd.conf\n\n";
            selectedHeaders.forEach(function (header) {
              var value = header.example.split(": ")[1];
              if (header.name === "Content-Security-Policy") {
                value = cspValue;
              }
              config += "Header always set " + header.name + ' "' + value + '"\n';
            });
            break;

          case "iis":
            config =
              '<?xml version="1.0" encoding="UTF-8"?>\n<configuration>\n  <system.webServer>\n    <httpProtocol>\n      <customHeaders>\n';
            selectedHeaders.forEach(function (header) {
              var value = header.example.split(": ")[1];
              if (header.name === "Content-Security-Policy") {
                value = cspValue;
              }
              config += '        <add name="' + header.name + '" value="' + value + '" />\n';
            });
            config +=
              "      </customHeaders>\n    </httpProtocol>\n  </system.webServer>\n</configuration>";
            break;

          case "express":
            config =
              '// Node.js Express Security Headers\n// npm install helmet\n\nconst helmet = require("helmet");\n\napp.use(helmet());\n\n// Or manually:\napp.use((req, res, next) => {\n';
            selectedHeaders.forEach(function (header) {
              var value = header.example.split(": ")[1];
              if (header.name === "Content-Security-Policy") {
                value = cspValue;
              }
              config += '  res.setHeader("' + header.name + '", "' + value + '");\n';
            });
            config += "  next();\n});";
            break;

          case "cloudflare":
            config =
              "// Cloudflare Workers Security Headers\n\nasync function handleRequest(request) {\n  const response = await fetch(request);\n  const newResponse = new Response(response.body, response);\n\n";
            selectedHeaders.forEach(function (header) {
              var value = header.example.split(": ")[1];
              if (header.name === "Content-Security-Policy") {
                value = cspValue;
              }
              config += '  newResponse.headers.set("' + header.name + '", "' + value + '");\n';
            });
            config += "\n  return newResponse;\n}";
            break;
        }

        document.getElementById("generatedConfig").textContent = config;
      }

      window.copyConfig = function () {
        var config = document.getElementById("generatedConfig").textContent;
        navigator.clipboard
          .writeText(config)
          .then(function () {
            alert("配置已复制到剪贴板！");
          })
          .catch(function () {
            var textarea = document.createElement("textarea");
            textarea.value = config;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("配置已复制到剪贴板！");
          });
      };

      // Initialize
      renderHeaders();
      renderAttacks();
      renderChecklist();
      renderHeaderCheckboxes();
      generateConfig();
    
