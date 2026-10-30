// @ts-nocheck
// Generated from tools/dev/nginx-generator.html
// Source SHA-256: f5573ec247a718b5efb214d5bbef80798f63311e3340aebdf19b799a8fa95307
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentScenario = "static";

      window.selectScenario = function (scenario) {
        currentScenario = scenario;

        // 更新按钮状态
        document.querySelectorAll(".scenario-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.scenario === scenario);
        });

        // 显示/隐藏配置区域
        document.getElementById("staticConfig").style.display = ["static", "spa"].includes(scenario)
          ? "block"
          : "none";
        document.getElementById("proxyConfig").style.display = ["proxy", "websocket"].includes(
          scenario
        )
          ? "block"
          : "none";
        document.getElementById("loadbalanceConfig").style.display =
          scenario === "loadbalance" ? "block" : "none";
        document.getElementById("phpConfig").style.display = scenario === "php" ? "block" : "none";

        // WebSocket 自动勾选
        if (scenario === "websocket") {
          document.getElementById("proxyWebsocket").checked = true;
        }

        generate();
      };

      window.toggleSsl = function () {
        const enabled = document.getElementById("enableSsl").checked;
        document.getElementById("sslConfig").style.display = enabled ? "block" : "none";
      };

      window.addUpstream = function () {
        const list = document.getElementById("upstreamList");
        const item = document.createElement("div");
        item.className = "upstream-item";
        item.innerHTML = `
                <input type="text" value="127.0.0.1:300${list.children.length + 1}" onchange="generate()">
                <button onclick="removeUpstream(this)">×</button>
            `;
        list.appendChild(item);
        generate();
      };

      window.removeUpstream = function (btn) {
        btn.parentElement.remove();
        generate();
      };

      function getUpstreams() {
        const inputs = document.querySelectorAll("#upstreamList input");
        return Array.from(inputs)
          .map((i) => i.value.trim())
          .filter((v) => v);
      }

      window.generate = function () {
        const serverName = document.getElementById("serverName").value || "example.com";
        const httpPort = document.getElementById("httpPort").value || "80";
        const httpsPort = document.getElementById("httpsPort").value || "443";
        const enableSsl = document.getElementById("enableSsl").checked;
        const httpRedirect = document.getElementById("httpRedirect").checked;
        const hsts = document.getElementById("hsts").checked;
        const gzip = document.getElementById("gzip").checked;
        const accessLog = document.getElementById("accessLog").checked;
        const cacheStatic = document.getElementById("cacheStatic").checked;

        let config = "";

        // 负载均衡 upstream
        if (currentScenario === "loadbalance") {
          const upstreams = getUpstreams();
          const lbMethod = document.getElementById("lbMethod").value;
          config += "upstream backend {\n";
          if (lbMethod) config += `    ${lbMethod};\n`;
          upstreams.forEach((u) => (config += `    server ${u};\n`));
          config += "}\n\n";
        }

        // HTTP 重定向到 HTTPS
        if (enableSsl && httpRedirect) {
          config += "server {\n";
          config += `    listen ${httpPort};\n`;
          config += `    listen [::]:${httpPort};\n`;
          config += `    server_name ${serverName};\n\n`;
          config += "    return 301 https://$server_name$request_uri;\n";
          config += "}\n\n";
        }

        // 主 server 块
        config += "server {\n";

        if (enableSsl) {
          config += `    listen ${httpsPort} ssl http2;\n`;
          config += `    listen [::]:${httpsPort} ssl http2;\n`;
        } else {
          config += `    listen ${httpPort};\n`;
          config += `    listen [::]:${httpPort};\n`;
        }

        config += `    server_name ${serverName};\n\n`;

        // SSL 配置
        if (enableSsl) {
          const sslCert = document.getElementById("sslCert").value;
          const sslKey = document.getElementById("sslKey").value;
          config += "    # SSL 配置\n";
          config += `    ssl_certificate ${sslCert};\n`;
          config += `    ssl_certificate_key ${sslKey};\n`;
          config += "    ssl_protocols TLSv1.2 TLSv1.3;\n";
          config += "    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;\n";
          config += "    ssl_prefer_server_ciphers off;\n";
          if (hsts) {
            config += '    add_header Strict-Transport-Security "max-age=63072000" always;\n';
          }
          config += "\n";
        }

        // 根据场景生成配置
        switch (currentScenario) {
          case "static":
            config += generateStatic();
            break;
          case "spa":
            config += generateSpa();
            break;
          case "proxy":
          case "websocket":
            config += generateProxy();
            break;
          case "loadbalance":
            config += generateLoadbalance();
            break;
          case "php":
            config += generatePhp();
            break;
        }

        // Gzip
        if (gzip) {
          config += "\n    # Gzip 压缩\n";
          config += "    gzip on;\n";
          config += "    gzip_vary on;\n";
          config += "    gzip_min_length 1024;\n";
          config +=
            "    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;\n";
        }

        // 静态资源缓存
        if (cacheStatic) {
          config += "\n    # 静态资源缓存\n";
          config += "    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|woff2?)$ {\n";
          config += "        expires 30d;\n";
          config += '        add_header Cache-Control "public, immutable";\n';
          config += "    }\n";
        }

        // 日志
        if (accessLog) {
          config += "\n    # 日志\n";
          config += `    access_log /var/log/nginx/${serverName.replace(/\./g, "_")}_access.log;\n`;
          config += `    error_log /var/log/nginx/${serverName.replace(/\./g, "_")}_error.log;\n`;
        }

        config += "}\n";

        document.getElementById("output").value = config;
      };

      function generateStatic() {
        const root = document.getElementById("rootPath").value;
        const index = document.getElementById("indexFiles").value;

        let config = "    # 静态文件服务\n";
        config += `    root ${root};\n`;
        config += `    index ${index};\n\n`;
        config += "    location / {\n";
        config += "        try_files $uri $uri/ =404;\n";
        config += "    }\n";

        return config;
      }

      function generateSpa() {
        const root = document.getElementById("rootPath").value;
        const index = document.getElementById("indexFiles").value;

        let config = "    # SPA 单页应用\n";
        config += `    root ${root};\n`;
        config += `    index ${index};\n\n`;
        config += "    location / {\n";
        config += "        try_files $uri $uri/ /index.html;\n";
        config += "    }\n";

        return config;
      }

      function generateProxy() {
        const proxyPass = document.getElementById("proxyPass").value;
        const websocket = document.getElementById("proxyWebsocket").checked;

        let config = "    # 反向代理\n";
        config += "    location / {\n";
        config += `        proxy_pass ${proxyPass};\n`;
        config += "        proxy_http_version 1.1;\n";
        config += "        proxy_set_header Host $host;\n";
        config += "        proxy_set_header X-Real-IP $remote_addr;\n";
        config += "        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n";
        config += "        proxy_set_header X-Forwarded-Proto $scheme;\n";

        if (websocket) {
          config += "\n        # WebSocket 支持\n";
          config += "        proxy_set_header Upgrade $http_upgrade;\n";
          config += '        proxy_set_header Connection "upgrade";\n';
          config += "        proxy_read_timeout 86400;\n";
        }

        config += "    }\n";

        return config;
      }

      function generateLoadbalance() {
        let config = "    # 负载均衡\n";
        config += "    location / {\n";
        config += "        proxy_pass http://backend;\n";
        config += "        proxy_http_version 1.1;\n";
        config += "        proxy_set_header Host $host;\n";
        config += "        proxy_set_header X-Real-IP $remote_addr;\n";
        config += "        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n";
        config += "        proxy_set_header X-Forwarded-Proto $scheme;\n";
        config += "    }\n";

        return config;
      }

      function generatePhp() {
        const phpFpm = document.getElementById("phpFpm").value;
        const root = document.getElementById("phpRoot").value;

        let config = "    # PHP-FPM 配置\n";
        config += `    root ${root};\n`;
        config += "    index index.php index.html;\n\n";
        config += "    location / {\n";
        config += "        try_files $uri $uri/ /index.php?$query_string;\n";
        config += "    }\n\n";
        config += "    location ~ \\.php$ {\n";
        config += `        fastcgi_pass ${phpFpm};\n`;
        config += "        fastcgi_index index.php;\n";
        config += "        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n";
        config += "        include fastcgi_params;\n";
        config += "    }\n\n";
        config += "    # 禁止访问隐藏文件\n";
        config += "    location ~ /\\. {\n";
        config += "        deny all;\n";
        config += "    }\n";

        return config;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output");
        navigator.clipboard.writeText(output.value).then(() => {
          alert("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const output = document.getElementById("output").value;
        const serverName = document.getElementById("serverName").value || "example.com";
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${serverName.replace(/\./g, "_")}.conf`;
        a.click();
        URL.revokeObjectURL(url);
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const current = html.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";
        html.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };

      // 初始化
      (function () {
        const saved = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", saved);
        generate();
      })();
    
