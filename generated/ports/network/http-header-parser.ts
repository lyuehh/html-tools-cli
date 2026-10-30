// @ts-nocheck
// Generated from tools/network/http-header-parser.html
// Source SHA-256: a84d0c522fe19a7b2d15e2483f44e5aba978d5b315494f88aec59b91ffb1e161
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const LS_KEY = "http_header_parser_v1";

      // Header descriptions database
      const headerDescriptions = {
        // General Headers
        "cache-control": {
          desc: "缓存指令",
          category: "cache",
          tip: "控制缓存行为，如 max-age, no-cache, no-store 等"
        },
        connection: {
          desc: "连接管理",
          category: "general",
          tip: "控制网络连接的选项，如 keep-alive 或 close"
        },
        date: { desc: "消息日期", category: "general", tip: "消息创建的日期和时间" },
        pragma: {
          desc: "兼容性缓存",
          category: "cache",
          tip: "HTTP/1.0 缓存控制，建议使用 Cache-Control"
        },
        trailer: { desc: "尾部字段", category: "general", tip: "在分块传输中包含的尾部头字段" },
        "transfer-encoding": {
          desc: "传输编码",
          category: "general",
          tip: "消息体的传输编码方式，如 chunked"
        },
        upgrade: { desc: "协议升级", category: "general", tip: "请求升级到其他协议，如 WebSocket" },
        via: { desc: "代理信息", category: "general", tip: "中间代理服务器信息" },
        warning: { desc: "警告信息", category: "general", tip: "关于消息状态的额外警告信息" },

        // Request Headers
        accept: {
          desc: "可接受类型",
          category: "request",
          tip: "客户端可接受的响应内容类型 (MIME)"
        },
        "accept-charset": {
          desc: "可接受字符集",
          category: "request",
          tip: "客户端可接受的字符编码"
        },
        "accept-encoding": {
          desc: "可接受编码",
          category: "request",
          tip: "客户端可接受的内容编码，如 gzip, deflate"
        },
        "accept-language": {
          desc: "可接受语言",
          category: "request",
          tip: "客户端偏好的语言，如 zh-CN, en-US"
        },
        authorization: {
          desc: "认证凭证",
          category: "auth",
          tip: "客户端认证信息，如 Bearer token 或 Basic 认证"
        },
        cookie: { desc: "Cookie", category: "auth", tip: "客户端发送的 Cookie 数据" },
        expect: { desc: "期望行为", category: "request", tip: "客户端期望服务器的特定行为" },
        from: { desc: "用户邮箱", category: "request", tip: "发出请求的用户的电子邮件地址" },
        host: { desc: "目标主机", category: "request", tip: "请求的目标主机名和端口号" },
        "if-match": { desc: "条件匹配", category: "cache", tip: "条件请求：仅当 ETag 匹配时执行" },
        "if-modified-since": {
          desc: "条件修改时间",
          category: "cache",
          tip: "条件请求：仅当资源在指定时间后修改"
        },
        "if-none-match": {
          desc: "条件不匹配",
          category: "cache",
          tip: "条件请求：仅当 ETag 不匹配时执行"
        },
        "if-range": { desc: "条件范围", category: "cache", tip: "条件范围请求" },
        "if-unmodified-since": {
          desc: "条件未修改",
          category: "cache",
          tip: "条件请求：仅当资源未修改时执行"
        },
        "max-forwards": {
          desc: "最大转发数",
          category: "request",
          tip: "限制代理或网关转发的最大次数"
        },
        "proxy-authorization": {
          desc: "代理认证",
          category: "auth",
          tip: "向代理服务器提供的认证凭证"
        },
        range: { desc: "范围请求", category: "request", tip: "请求资源的部分内容，用于断点续传" },
        referer: { desc: "来源页面", category: "request", tip: "发起请求的页面 URL" },
        te: { desc: "传输编码接受", category: "request", tip: "客户端可接受的传输编码" },
        "user-agent": {
          desc: "客户端标识",
          category: "request",
          tip: "客户端软件信息（浏览器、操作系统等）"
        },

        // Response Headers
        "accept-ranges": { desc: "支持范围", category: "response", tip: "服务器是否支持范围请求" },
        age: { desc: "缓存时间", category: "cache", tip: "响应在代理缓存中存在的时间（秒）" },
        etag: { desc: "实体标签", category: "cache", tip: "资源版本标识符，用于缓存验证" },
        location: { desc: "重定向位置", category: "response", tip: "重定向的目标 URL" },
        "proxy-authenticate": {
          desc: "代理认证要求",
          category: "auth",
          tip: "代理服务器要求的认证方式"
        },
        "retry-after": { desc: "重试时间", category: "response", tip: "客户端应在多久后重试请求" },
        server: { desc: "服务器信息", category: "response", tip: "服务器软件信息" },
        "set-cookie": { desc: "设置 Cookie", category: "auth", tip: "服务器设置的 Cookie" },
        vary: { desc: "缓存变体", category: "cache", tip: "决定缓存响应是否可用的请求头" },
        "www-authenticate": { desc: "认证要求", category: "auth", tip: "服务器要求的认证方式" },

        // Entity Headers
        allow: { desc: "允许方法", category: "entity", tip: "资源允许的 HTTP 方法" },
        "content-encoding": {
          desc: "内容编码",
          category: "entity",
          tip: "响应体的编码方式，如 gzip"
        },
        "content-language": { desc: "内容语言", category: "entity", tip: "响应内容的语言" },
        "content-length": { desc: "内容长度", category: "entity", tip: "响应体的字节大小" },
        "content-location": { desc: "内容位置", category: "entity", tip: "响应内容的备用位置" },
        "content-md5": { desc: "内容校验", category: "entity", tip: "响应体的 MD5 校验值" },
        "content-range": { desc: "内容范围", category: "entity", tip: "部分响应的范围信息" },
        "content-type": {
          desc: "MIME 类型",
          category: "entity",
          tip: "响应体的媒体类型，如 application/json"
        },
        expires: { desc: "过期时间", category: "cache", tip: "响应的过期日期/时间" },
        "last-modified": { desc: "最后修改", category: "cache", tip: "资源的最后修改时间" },

        // Security Headers
        "strict-transport-security": {
          desc: "HSTS",
          category: "security",
          tip: "强制使用 HTTPS 连接，防止降级攻击"
        },
        "content-security-policy": {
          desc: "CSP",
          category: "security",
          tip: "内容安全策略，防止 XSS 和数据注入攻击"
        },
        "content-security-policy-report-only": {
          desc: "CSP 报告",
          category: "security",
          tip: "仅报告违规，不阻止"
        },
        "x-frame-options": {
          desc: "框架选项",
          category: "security",
          tip: "控制页面是否可被 iframe 嵌入，防止点击劫持"
        },
        "x-content-type-options": {
          desc: "类型嗅探",
          category: "security",
          tip: "禁止浏览器 MIME 类型嗅探"
        },
        "x-xss-protection": {
          desc: "XSS 保护",
          category: "security",
          tip: "启用浏览器的 XSS 过滤器（已弃用）"
        },
        "x-permitted-cross-domain-policies": {
          desc: "跨域策略",
          category: "security",
          tip: "控制 Flash/PDF 跨域策略"
        },
        "referrer-policy": {
          desc: "Referer 策略",
          category: "security",
          tip: "控制 Referer 头的发送策略"
        },
        "permissions-policy": {
          desc: "权限策略",
          category: "security",
          tip: "控制浏览器功能和 API 的使用权限"
        },
        "feature-policy": {
          desc: "功能策略",
          category: "security",
          tip: "旧版权限策略（已被 Permissions-Policy 取代）"
        },
        "cross-origin-embedder-policy": {
          desc: "COEP",
          category: "security",
          tip: "跨源嵌入策略，控制资源加载"
        },
        "cross-origin-opener-policy": {
          desc: "COOP",
          category: "security",
          tip: "跨源开启者策略，控制窗口访问"
        },
        "cross-origin-resource-policy": {
          desc: "CORP",
          category: "security",
          tip: "跨源资源策略，控制资源共享"
        },

        // CORS Headers
        "access-control-allow-origin": {
          desc: "CORS 来源",
          category: "cors",
          tip: "允许访问资源的来源"
        },
        "access-control-allow-credentials": {
          desc: "CORS 凭证",
          category: "cors",
          tip: "是否允许发送凭证"
        },
        "access-control-allow-headers": {
          desc: "CORS 头",
          category: "cors",
          tip: "预检请求中允许的请求头"
        },
        "access-control-allow-methods": {
          desc: "CORS 方法",
          category: "cors",
          tip: "预检请求中允许的 HTTP 方法"
        },
        "access-control-expose-headers": {
          desc: "CORS 暴露头",
          category: "cors",
          tip: "可以暴露给客户端的响应头"
        },
        "access-control-max-age": {
          desc: "CORS 缓存",
          category: "cors",
          tip: "预检请求结果的缓存时间"
        },
        "access-control-request-headers": {
          desc: "CORS 请求头",
          category: "cors",
          tip: "预检请求中将使用的请求头"
        },
        "access-control-request-method": {
          desc: "CORS 请求方法",
          category: "cors",
          tip: "预检请求中将使用的方法"
        },
        origin: { desc: "请求来源", category: "cors", tip: "发起请求的来源" }
      };

      // Security headers to check
      const securityHeaders = [
        { name: "strict-transport-security", label: "HSTS" },
        { name: "content-security-policy", label: "CSP" },
        { name: "x-frame-options", label: "X-Frame-Options" },
        { name: "x-content-type-options", label: "X-Content-Type-Options" },
        { name: "referrer-policy", label: "Referrer-Policy" },
        { name: "permissions-policy", label: "Permissions-Policy" }
      ];

      // Sample headers
      const sampleRequest =
        "GET /api/users HTTP/1.1\n" +
        "Host: api.example.com\n" +
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\n" +
        "Accept: application/json\n" +
        "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8\n" +
        "Accept-Encoding: gzip, deflate, br\n" +
        "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\n" +
        "Cookie: session_id=abc123; user_pref=dark\n" +
        "Connection: keep-alive\n" +
        "Cache-Control: no-cache";

      const sampleResponse =
        "HTTP/1.1 200 OK\n" +
        "Date: Thu, 26 Dec 2024 10:00:00 GMT\n" +
        "Content-Type: application/json; charset=utf-8\n" +
        "Content-Length: 1234\n" +
        "Connection: keep-alive\n" +
        "Server: nginx/1.24.0\n" +
        "Cache-Control: max-age=3600, public\n" +
        'ETag: "abc123def456"\n' +
        "Last-Modified: Wed, 25 Dec 2024 08:00:00 GMT\n" +
        "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n" +
        "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'\n" +
        "X-Frame-Options: DENY\n" +
        "X-Content-Type-Options: nosniff\n" +
        "X-XSS-Protection: 1; mode=block\n" +
        "Referrer-Policy: strict-origin-when-cross-origin\n" +
        "Access-Control-Allow-Origin: https://example.com\n" +
        "Set-Cookie: session=xyz789; Path=/; HttpOnly; Secure; SameSite=Strict";

      let sampleIndex = 0;

      function parseHeaders(rawText) {
        const lines = rawText.trim().split(/\r?\n/);
        const headers = [];
        let headerType = "unknown";

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Check for request/response line
          if (i === 0) {
            if (/^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\s+/i.test(line)) {
              headerType = "request";
              continue;
            } else if (/^HTTP\/[\d.]+\s+\d+/i.test(line)) {
              headerType = "response";
              continue;
            }
          }

          // Parse header line
          const colonIndex = line.indexOf(":");
          if (colonIndex > 0) {
            const name = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            headers.push({ name: name, value: value });
          }
        }

        return { headers: headers, headerType: headerType };
      }

      function getCategoryClass(name) {
        const info = headerDescriptions[name.toLowerCase()];
        if (!info) return "";
        if (info.category === "security") return "security";
        if (info.category === "auth") return "auth";
        if (info.category === "cache") return "cache";
        return "";
      }

      function getHeaderInfo(name) {
        const info = headerDescriptions[name.toLowerCase()];
        return info || { desc: "-", tip: "" };
      }

      function renderHeaders(headers) {
        const tbody = document.getElementById("tbody");
        tbody.textContent = "";

        if (headers.length === 0) {
          document.getElementById("noResults").style.display = "block";
          return;
        }

        document.getElementById("noResults").style.display = "none";

        headers.forEach(function (header) {
          const info = getHeaderInfo(header.name);
          const categoryClass = getCategoryClass(header.name);
          const tr = document.createElement("tr");

          // Name cell
          const tdName = document.createElement("td");
          tdName.className = "header-name " + categoryClass;
          tdName.textContent = header.name;
          tr.appendChild(tdName);

          // Value cell
          const tdValue = document.createElement("td");
          tdValue.className = "header-value";
          tdValue.textContent = header.value;
          tr.appendChild(tdValue);

          // Description cell
          const tdDesc = document.createElement("td");
          tdDesc.className = "header-desc";
          if (info.tip) {
            const tooltip = document.createElement("span");
            tooltip.className = "tooltip";
            tooltip.setAttribute("data-tip", info.tip);
            tooltip.textContent = info.desc;
            tdDesc.appendChild(tooltip);
          } else {
            tdDesc.textContent = info.desc;
          }
          tr.appendChild(tdDesc);

          // Copy button cell
          const tdCopy = document.createElement("td");
          const copyBtn = document.createElement("button");
          copyBtn.className = "copy-btn";
          copyBtn.textContent = "复制";
          copyBtn.onclick = function () {
            copyToClipboard(header.value);
          };
          tdCopy.appendChild(copyBtn);
          tr.appendChild(tdCopy);

          tbody.appendChild(tr);
        });
      }

      function renderSecurityStatus(headers) {
        const grid = document.getElementById("securityGrid");
        grid.textContent = "";
        const headerMap = {};

        headers.forEach(function (h) {
          headerMap[h.name.toLowerCase()] = h.value;
        });

        securityHeaders.forEach(function (sh) {
          const present = sh.name in headerMap;
          const item = document.createElement("div");
          item.className = "security-item " + (present ? "present" : "missing");

          const icon = document.createElement("span");
          icon.className = "icon";
          icon.textContent = present ? "✓" : "✗";
          item.appendChild(icon);

          const name = document.createElement("span");
          name.className = "name";
          name.textContent = sh.label;
          item.appendChild(name);

          grid.appendChild(item);
        });
      }

      function parse() {
        const input = document.getElementById("input").value.trim();
        if (!input) {
          showStatus("请输入 HTTP 头", "error");
          return;
        }

        const result = parseHeaders(input);

        if (result.headers.length === 0) {
          showStatus("未找到有效的 HTTP 头", "error");
          document.getElementById("resultSection").style.display = "none";
          document.getElementById("securitySection").style.display = "none";
          return;
        }

        renderHeaders(result.headers);
        renderSecurityStatus(result.headers);

        // Update header type badge
        const typeEl = document.getElementById("headerType");
        if (result.headerType === "request") {
          typeEl.textContent = "REQUEST";
          typeEl.className = "type-badge type-request";
        } else if (result.headerType === "response") {
          typeEl.textContent = "RESPONSE";
          typeEl.className = "type-badge type-response";
        } else {
          typeEl.textContent = "";
          typeEl.className = "type-badge";
        }

        document.getElementById("resultSection").style.display = "block";
        document.getElementById("securitySection").style.display = "block";

        showStatus("解析成功，共 " + result.headers.length + " 个头", "success");
        saveToStorage();
        saveToUrl();
      }

      function showStatus(msg, type) {
        const el = document.getElementById("status");
        el.textContent = msg;
        el.className = "status " + (type || "");
      }

      window.copyToClipboard = async function (text) {
        try {
          await navigator.clipboard.writeText(text);
          showStatus("已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      // URL state
      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          document.getElementById("input").value = decodeURIComponent(atob(hash));
          return true;
        } catch (e) {
          return false;
        }
      };

      function saveToUrl() {
        try {
          const input = document.getElementById("input").value;
          if (input.length > 2000) return;
          const encoded = btoa(encodeURIComponent(input));
          history.replaceState(null, "", "#" + encoded);
        } catch (e) {
          // ignore encoding errors
        }
      }

      // localStorage
      function loadFromStorage() {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) {
          document.getElementById("input").value = saved;
        }
      }

      function saveToStorage() {
        localStorage.setItem(LS_KEY, document.getElementById("input").value);
      }

      // Event listeners
      document.getElementById("btnPaste").onclick = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("input").value = text;
          saveToStorage();
          showStatus("已粘贴", "success");
          parse();
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnParse").onclick = parse;

      document.getElementById("btnSample").onclick = function () {
        var samples = [sampleResponse, sampleRequest];
        document.getElementById("input").value = samples[sampleIndex % 2];
        sampleIndex++;
        saveToStorage();
        parse();
      };

      document.getElementById("btnShare").onclick = async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnClear").onclick = function () {
        document.getElementById("input").value = "";
        document.getElementById("resultSection").style.display = "none";
        document.getElementById("securitySection").style.display = "none";
        localStorage.removeItem(LS_KEY);
        history.replaceState(null, "", location.pathname);
        showStatus("已清空", "success");
      };

      document.getElementById("input").addEventListener("input", function () {
        saveToStorage();
      });

      // Auto-parse on input change (debounced)
      var parseTimeout;
      document.getElementById("input").addEventListener("input", function () {
        clearTimeout(parseTimeout);
        parseTimeout = setTimeout(function () {
          var input = document.getElementById("input").value.trim();
          if (input && input.indexOf(":") !== -1) {
            parse();
          }
        }, 500);
      });

      // Theme toggle
      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "light" ? "dark" : "light";

        if (next === "light") {
          html.setAttribute("data-theme", "light");
        } else {
          html.removeAttribute("data-theme");
        }

        btn.textContent = next === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", next);
      };

      // Initialize theme
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved === "light") {
          document.documentElement.setAttribute("data-theme", "light");
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "☀️";
        }
      })();

      // Initialize
      if (loadFromUrl()) {
        parse();
      } else {
        loadFromStorage();
        if (document.getElementById("input").value.trim()) {
          parse();
        }
      }
    
