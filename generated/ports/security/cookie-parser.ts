// @ts-nocheck
// Generated from tools/security/cookie-parser.html
// Source SHA-256: 096ad241ca09acc01369d57daa773b2b3ae8c51ca1941c0ce7f0464c25635285
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

      let currentTab = "setcookie";

      function switchInputTab(tab) {
        currentTab = tab;
        document.querySelectorAll(".input-tab").forEach(function (t, i) {
          var tabs = ["setcookie", "cookieheader", "browser"];
          t.classList.toggle("active", tabs[i] === tab);
        });
        document.querySelectorAll(".input-panel").forEach(function (p) {
          p.classList.remove("active");
        });
        document.getElementById(tab + "Panel").classList.add("active");
      }

      window.readBrowserCookies = function () {
        const cookies = document.cookie;
        document.getElementById("browserCookieInput").value =
          cookies || "(当前页面没有可读取的 Cookie)";
      };

      window.loadSample = function () {
        document.getElementById("setCookieInput").value =
          "Set-Cookie: session=eyJhbGciOiJIUzI1NiJ9.abc123; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=3600\n" +
          "Set-Cookie: user_id=12345; Path=/; Domain=.example.com; Expires=Fri, 31 Dec 2025 23:59:59 GMT\n" +
          "Set-Cookie: theme=dark; Path=/\n" +
          "Set-Cookie: tracking=xyz789; Path=/; SameSite=None; Secure\n" +
          "Set-Cookie: remember_me=true; Path=/; Max-Age=2592000; HttpOnly";
        switchInputTab("setcookie");
      };

      window.clearAll = function () {
        document.getElementById("setCookieInput").value = "";
        document.getElementById("cookieHeaderInput").value = "";
        document.getElementById("browserCookieInput").value = "";
        document.getElementById("resultsSection").style.display = "none";
      };

      window.parseCookies = function () {
        var cookies = [];

        if (currentTab === "setcookie") {
          var input = document.getElementById("setCookieInput").value.trim();
          if (!input) {
            alert("请输入 Set-Cookie 内容");
            return;
          }
          cookies = parseSetCookieHeaders(input);
        } else if (currentTab === "cookieheader") {
          var input = document.getElementById("cookieHeaderInput").value.trim();
          if (!input) {
            alert("请输入 Cookie 请求头");
            return;
          }
          cookies = parseCookieHeader(input);
        } else {
          var input = document.getElementById("browserCookieInput").value.trim();
          if (!input || input.indexOf("没有") !== -1) {
            alert("没有可解析的 Cookie");
            return;
          }
          cookies = parseCookieHeader("Cookie: " + input);
        }

        if (cookies.length === 0) {
          alert("未找到有效的 Cookie");
          return;
        }

        renderResults(cookies);
      };

      function parseSetCookieHeaders(input) {
        var cookies = [];
        var lines = input.split("\n");

        lines.forEach(function (line) {
          var trimmed = line.trim();
          if (!trimmed) return;

          // 移除 Set-Cookie: 前缀
          if (trimmed.toLowerCase().indexOf("set-cookie:") === 0) {
            trimmed = trimmed.substring(11).trim();
          }

          var parts = trimmed.split(";");
          if (parts.length === 0) return;

          // 第一部分是 name=value
          var nameValue = parts[0].trim();
          var eqIndex = nameValue.indexOf("=");
          if (eqIndex === -1) return;

          var cookie = {
            name: nameValue.substring(0, eqIndex).trim(),
            value: nameValue.substring(eqIndex + 1).trim(),
            secure: false,
            httpOnly: false,
            sameSite: null,
            domain: null,
            path: null,
            maxAge: null,
            expires: null
          };

          // 解析属性
          for (var i = 1; i < parts.length; i++) {
            var attr = parts[i].trim();
            var attrLower = attr.toLowerCase();

            if (attrLower === "secure") {
              cookie.secure = true;
            } else if (attrLower === "httponly") {
              cookie.httpOnly = true;
            } else if (attrLower.indexOf("samesite=") === 0) {
              cookie.sameSite = attr.substring(9).trim();
            } else if (attrLower.indexOf("domain=") === 0) {
              cookie.domain = attr.substring(7).trim();
            } else if (attrLower.indexOf("path=") === 0) {
              cookie.path = attr.substring(5).trim();
            } else if (attrLower.indexOf("max-age=") === 0) {
              cookie.maxAge = parseInt(attr.substring(8).trim());
            } else if (attrLower.indexOf("expires=") === 0) {
              cookie.expires = attr.substring(8).trim();
            }
          }

          cookies.push(cookie);
        });

        return cookies;
      }

      function parseCookieHeader(input) {
        var cookies = [];
        var trimmed = input.trim();

        // 移除 Cookie: 前缀
        if (trimmed.toLowerCase().indexOf("cookie:") === 0) {
          trimmed = trimmed.substring(7).trim();
        }

        var pairs = trimmed.split(";");
        pairs.forEach(function (pair) {
          var p = pair.trim();
          var eqIndex = p.indexOf("=");
          if (eqIndex === -1) return;

          cookies.push({
            name: p.substring(0, eqIndex).trim(),
            value: p.substring(eqIndex + 1).trim(),
            secure: null,
            httpOnly: null,
            sameSite: null,
            domain: null,
            path: null,
            maxAge: null,
            expires: null,
            fromRequestHeader: true
          });
        });

        return cookies;
      }

      function renderResults(cookies) {
        document.getElementById("resultsSection").style.display = "block";

        // 统计
        var stats = {
          total: cookies.length,
          secure: cookies.filter(function (c) {
            return c.secure === true;
          }).length,
          httpOnly: cookies.filter(function (c) {
            return c.httpOnly === true;
          }).length,
          sameSite: cookies.filter(function (c) {
            return c.sameSite;
          }).length
        };

        var statsGrid = document.getElementById("statsGrid");
        statsGrid.textContent = "";

        var statItems = [
          { value: stats.total, label: "总数" },
          { value: stats.secure, label: "Secure" },
          { value: stats.httpOnly, label: "HttpOnly" },
          { value: stats.sameSite, label: "SameSite" }
        ];

        statItems.forEach(function (item) {
          var card = document.createElement("div");
          card.className = "stat-card";

          var value = document.createElement("div");
          value.className = "stat-value";
          value.textContent = item.value;

          var label = document.createElement("div");
          label.className = "stat-label";
          label.textContent = item.label;

          card.appendChild(value);
          card.appendChild(label);
          statsGrid.appendChild(card);
        });

        // Cookie 列表
        var container = document.getElementById("cookiesContainer");
        container.textContent = "";

        cookies.forEach(function (cookie) {
          var card = document.createElement("div");
          card.className = "cookie-card";

          // Header
          var header = document.createElement("div");
          header.className = "cookie-header";

          var name = document.createElement("span");
          name.className = "cookie-name";
          name.textContent = cookie.name;

          var badges = document.createElement("div");
          badges.className = "cookie-badges";

          if (cookie.secure === true) {
            var badge = document.createElement("span");
            badge.className = "badge badge-secure";
            badge.textContent = "Secure";
            badges.appendChild(badge);
          } else if (cookie.secure === false) {
            var badge = document.createElement("span");
            badge.className = "badge badge-warning";
            badge.textContent = "无 Secure";
            badges.appendChild(badge);
          }

          if (cookie.httpOnly === true) {
            var badge = document.createElement("span");
            badge.className = "badge badge-httponly";
            badge.textContent = "HttpOnly";
            badges.appendChild(badge);
          } else if (cookie.httpOnly === false) {
            var badge = document.createElement("span");
            badge.className = "badge badge-warning";
            badge.textContent = "无 HttpOnly";
            badges.appendChild(badge);
          }

          if (cookie.sameSite) {
            var badge = document.createElement("span");
            badge.className = "badge badge-samesite";
            badge.textContent = "SameSite=" + cookie.sameSite;
            badges.appendChild(badge);
          }

          header.appendChild(name);
          header.appendChild(badges);

          // Body
          var body = document.createElement("div");
          body.className = "cookie-body";

          // Value
          var valueDiv = document.createElement("div");
          valueDiv.className = "cookie-value";
          valueDiv.textContent = cookie.value;
          body.appendChild(valueDiv);

          // Attributes
          if (!cookie.fromRequestHeader) {
            var attrs = document.createElement("div");
            attrs.className = "cookie-attrs";

            var attrItems = [
              { label: "Domain", value: cookie.domain || "(当前域名)" },
              { label: "Path", value: cookie.path || "/" },
              { label: "Max-Age", value: cookie.maxAge ? cookie.maxAge + " 秒" : "(会话)" },
              { label: "Expires", value: cookie.expires || "(会话结束)" }
            ];

            attrItems.forEach(function (item) {
              var attrDiv = document.createElement("div");
              attrDiv.className = "attr-item";

              var label = document.createElement("div");
              label.className = "attr-label";
              label.textContent = item.label;

              var value = document.createElement("div");
              value.className = "attr-value";
              value.textContent = item.value;

              attrDiv.appendChild(label);
              attrDiv.appendChild(value);
              attrs.appendChild(attrDiv);
            });

            body.appendChild(attrs);

            // 安全分析
            var analysis = document.createElement("div");
            analysis.className = "security-analysis";

            var title = document.createElement("h4");
            title.textContent = "🔒 安全分析";
            analysis.appendChild(title);

            var checks = [
              {
                pass: cookie.secure,
                text: cookie.secure
                  ? "Secure 属性已设置"
                  : "缺少 Secure 属性，Cookie 可能通过 HTTP 泄露"
              },
              {
                pass: cookie.httpOnly,
                text: cookie.httpOnly
                  ? "HttpOnly 属性已设置"
                  : "缺少 HttpOnly 属性，Cookie 可被 JavaScript 访问"
              },
              {
                pass: cookie.sameSite && cookie.sameSite.toLowerCase() !== "none",
                text: cookie.sameSite
                  ? "SameSite=" + cookie.sameSite
                  : "缺少 SameSite 属性，可能受 CSRF 攻击"
              }
            ];

            if (cookie.sameSite && cookie.sameSite.toLowerCase() === "none" && !cookie.secure) {
              checks.push({
                pass: false,
                text: "SameSite=None 必须配合 Secure 使用"
              });
            }

            checks.forEach(function (check) {
              var item = document.createElement("div");
              item.className = "security-item";

              var icon = document.createElement("span");
              icon.className = "security-icon";
              icon.textContent = check.pass ? "✅" : "⚠️";

              var text = document.createElement("span");
              text.textContent = check.text;

              item.appendChild(icon);
              item.appendChild(text);
              analysis.appendChild(item);
            });

            body.appendChild(analysis);
          } else {
            var note = document.createElement("p");
            note.style.color = "var(--pico-muted-color)";
            note.style.fontSize = "0.9rem";
            note.textContent = "注意：Cookie 请求头不包含属性信息，无法进行完整的安全分析";
            body.appendChild(note);
          }

          card.appendChild(header);
          card.appendChild(body);
          container.appendChild(card);
        });
      }
    
