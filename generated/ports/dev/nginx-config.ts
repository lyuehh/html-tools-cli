// @ts-nocheck
// Generated from tools/dev/nginx-config.html
// Source SHA-256: 2965673a4affc3cb97c6aeb56a10db9d87d9a334713a7073bf9853e03eca4877
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let servers = [];
      let upstreams = [];
      let serverId = 0;
      let upstreamId = 0;

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      const templates = {
        static: {
          listen: "80",
          serverName: "example.com",
          root: "/var/www/html",
          locations: [{ path: "/", type: "static", tryFiles: "$uri $uri/ =404" }]
        },
        spa: {
          listen: "80",
          serverName: "app.example.com",
          root: "/var/www/app/dist",
          locations: [{ path: "/", type: "static", tryFiles: "$uri $uri/ /index.html" }]
        },
        proxy: {
          listen: "80",
          serverName: "api.example.com",
          locations: [
            { path: "/", type: "proxy", proxyPass: "http://localhost:3000", proxyHeaders: true }
          ]
        },
        php: {
          listen: "80",
          serverName: "php.example.com",
          root: "/var/www/php",
          index: "index.php index.html",
          locations: [
            { path: "/", type: "static", tryFiles: "$uri $uri/ /index.php?$query_string" },
            { path: "~ \\.php$", type: "fastcgi", fastcgiPass: "unix:/var/run/php/php-fpm.sock" }
          ]
        },
        loadbalance: {
          listen: "80",
          serverName: "lb.example.com",
          locations: [
            { path: "/", type: "proxy", proxyPass: "http://backend", proxyHeaders: true }
          ],
          upstream: {
            name: "backend",
            servers: ["127.0.0.1:3001", "127.0.0.1:3002", "127.0.0.1:3003"]
          }
        },
        ssl: {
          listen: "443 ssl",
          serverName: "secure.example.com",
          ssl: true,
          sslCert: "/etc/nginx/ssl/cert.pem",
          sslKey: "/etc/nginx/ssl/key.pem",
          root: "/var/www/secure",
          locations: [{ path: "/", type: "static", tryFiles: "$uri $uri/ =404" }]
        }
      };

      window.addTemplate = function (type) {
        const tpl = templates[type];
        if (tpl) {
          if (tpl.upstream) {
            addUpstream(tpl.upstream);
          }
          addServer(tpl);
        }
      };

      window.addUpstream = function (template = null) {
        const id = upstreamId++;
        upstreams.push({
          id,
          name: template?.name || "backend_" + id,
          method: "round_robin",
          servers: template?.servers || ["127.0.0.1:3000"]
        });
        renderUpstreams();
        generateConfig();
      };

      window.removeUpstream = function (id) {
        upstreams = upstreams.filter((u) => u.id !== id);
        renderUpstreams();
        generateConfig();
      };

      function renderUpstreams() {
        const container = document.getElementById("upstreamsContainer");
        container.replaceChildren();

        upstreams.forEach((upstream) => {
          const card = document.createElement("div");
          card.className = "server-card";

          const header = document.createElement("div");
          header.className = "server-header";
          const title = document.createElement("h4");
          title.textContent = "⚖️ " + upstream.name;
          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.textContent = "删除";
          delBtn.onclick = () => removeUpstream(upstream.id);
          header.appendChild(title);
          header.appendChild(delBtn);
          card.appendChild(header);

          const grid = document.createElement("div");
          grid.className = "grid";

          const nameLabel = document.createElement("label");
          nameLabel.textContent = "Upstream 名称";
          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = upstream.name;
          nameInput.onchange = (e) => {
            upstream.name = e.target.value;
            renderUpstreams();
            generateConfig();
          };
          nameLabel.appendChild(nameInput);

          const methodLabel = document.createElement("label");
          methodLabel.textContent = "负载均衡方式";
          const methodSelect = document.createElement("select");
          ["round_robin", "least_conn", "ip_hash"].forEach((m) => {
            const opt = document.createElement("option");
            opt.value = m;
            opt.textContent =
              m === "round_robin" ? "轮询" : m === "least_conn" ? "最少连接" : "IP哈希";
            opt.selected = upstream.method === m;
            methodSelect.appendChild(opt);
          });
          methodSelect.onchange = (e) => {
            upstream.method = e.target.value;
            generateConfig();
          };
          methodLabel.appendChild(methodSelect);

          grid.appendChild(nameLabel);
          grid.appendChild(methodLabel);
          card.appendChild(grid);

          const serversLabel = document.createElement("label");
          serversLabel.textContent = "服务器列表 (每行一个，格式: host:port weight=N)";
          const serversArea = document.createElement("textarea");
          serversArea.value = upstream.servers.join("\n");
          serversArea.rows = 3;
          serversArea.onchange = (e) => {
            upstream.servers = e.target.value.split("\n").filter((s) => s.trim());
            generateConfig();
          };
          serversLabel.appendChild(serversArea);
          card.appendChild(serversLabel);

          container.appendChild(card);
        });
      }

      function addServer(template = null) {
        const id = serverId++;
        const server = {
          id,
          listen: template?.listen || "80",
          serverName: template?.serverName || "localhost",
          root: template?.root || "/var/www/html",
          index: template?.index || "index.html index.htm",
          ssl: template?.ssl || false,
          sslCert: template?.sslCert || "",
          sslKey: template?.sslKey || "",
          locations: template?.locations ? JSON.parse(JSON.stringify(template.locations)) : []
        };
        servers.push(server);
        renderServers();
        generateConfig();
      }

      function removeServer(id) {
        servers = servers.filter((s) => s.id !== id);
        renderServers();
        generateConfig();
      }

      function renderServers() {
        const container = document.getElementById("serversContainer");
        container.replaceChildren();

        servers.forEach((server) => {
          const card = document.createElement("div");
          card.className = "server-card";

          const header = document.createElement("div");
          header.className = "server-header";
          const title = document.createElement("h4");
          title.textContent = "🖥️ " + server.serverName;
          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.textContent = "删除";
          delBtn.onclick = () => removeServer(server.id);
          header.appendChild(title);
          header.appendChild(delBtn);
          card.appendChild(header);

          // Basic config
          const grid1 = document.createElement("div");
          grid1.className = "grid";

          const listenLabel = document.createElement("label");
          listenLabel.textContent = "监听端口";
          const listenInput = document.createElement("input");
          listenInput.type = "text";
          listenInput.value = server.listen;
          listenInput.onchange = (e) => {
            server.listen = e.target.value;
            generateConfig();
          };
          listenLabel.appendChild(listenInput);

          const nameLabel = document.createElement("label");
          nameLabel.textContent = "服务器名称";
          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = server.serverName;
          nameInput.onchange = (e) => {
            server.serverName = e.target.value;
            renderServers();
            generateConfig();
          };
          nameLabel.appendChild(nameInput);

          grid1.appendChild(listenLabel);
          grid1.appendChild(nameLabel);
          card.appendChild(grid1);

          const grid2 = document.createElement("div");
          grid2.className = "grid";

          const rootLabel = document.createElement("label");
          rootLabel.textContent = "根目录";
          const rootInput = document.createElement("input");
          rootInput.type = "text";
          rootInput.value = server.root;
          rootInput.onchange = (e) => {
            server.root = e.target.value;
            generateConfig();
          };
          rootLabel.appendChild(rootInput);

          const indexLabel = document.createElement("label");
          indexLabel.textContent = "默认文件";
          const indexInput = document.createElement("input");
          indexInput.type = "text";
          indexInput.value = server.index;
          indexInput.onchange = (e) => {
            server.index = e.target.value;
            generateConfig();
          };
          indexLabel.appendChild(indexInput);

          grid2.appendChild(rootLabel);
          grid2.appendChild(indexLabel);
          card.appendChild(grid2);

          // SSL config
          const sslDetails = document.createElement("details");
          const sslSummary = document.createElement("summary");
          sslSummary.textContent = "SSL/HTTPS 配置";
          sslDetails.appendChild(sslSummary);

          const sslCheck = document.createElement("label");
          const sslCheckbox = document.createElement("input");
          sslCheckbox.type = "checkbox";
          sslCheckbox.checked = server.ssl;
          sslCheckbox.onchange = (e) => {
            server.ssl = e.target.checked;
            generateConfig();
          };
          sslCheck.appendChild(sslCheckbox);
          sslCheck.appendChild(document.createTextNode(" 启用 SSL"));
          sslDetails.appendChild(sslCheck);

          const certLabel = document.createElement("label");
          certLabel.textContent = "SSL 证书路径";
          const certInput = document.createElement("input");
          certInput.type = "text";
          certInput.value = server.sslCert;
          certInput.placeholder = "/etc/nginx/ssl/cert.pem";
          certInput.onchange = (e) => {
            server.sslCert = e.target.value;
            generateConfig();
          };
          certLabel.appendChild(certInput);
          sslDetails.appendChild(certLabel);

          const keyLabel = document.createElement("label");
          keyLabel.textContent = "SSL 密钥路径";
          const keyInput = document.createElement("input");
          keyInput.type = "text";
          keyInput.value = server.sslKey;
          keyInput.placeholder = "/etc/nginx/ssl/key.pem";
          keyInput.onchange = (e) => {
            server.sslKey = e.target.value;
            generateConfig();
          };
          keyLabel.appendChild(keyInput);
          sslDetails.appendChild(keyLabel);

          card.appendChild(sslDetails);

          // Locations
          const locDetails = document.createElement("details");
          locDetails.open = true;
          const locSummary = document.createElement("summary");
          locSummary.textContent = "Location 配置 (" + server.locations.length + ")";
          locDetails.appendChild(locSummary);

          const locContainer = document.createElement("div");
          server.locations.forEach((loc, i) => {
            const locItem = createLocationItem(server, loc, i);
            locContainer.appendChild(locItem);
          });
          locDetails.appendChild(locContainer);

          const addLocBtn = document.createElement("button");
          addLocBtn.className = "outline";
          addLocBtn.textContent = "+ 添加 Location";
          addLocBtn.onclick = () => {
            server.locations.push({
              path: "/api",
              type: "proxy",
              proxyPass: "http://localhost:3000"
            });
            renderServers();
            generateConfig();
          };
          locDetails.appendChild(addLocBtn);
          card.appendChild(locDetails);

          container.appendChild(card);
        });
      }

      function createLocationItem(server, loc, index) {
        const item = document.createElement("div");
        item.className = "location-item";

        const header = document.createElement("div");
        header.style.cssText =
          "display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;";
        const pathSpan = document.createElement("strong");
        pathSpan.textContent = "location " + loc.path;
        const delBtn = document.createElement("button");
        delBtn.className = "outline secondary";
        delBtn.style.padding = "0.25rem 0.5rem";
        delBtn.textContent = "×";
        delBtn.onclick = () => {
          server.locations.splice(index, 1);
          renderServers();
          generateConfig();
        };
        header.appendChild(pathSpan);
        header.appendChild(delBtn);
        item.appendChild(header);

        const grid = document.createElement("div");
        grid.className = "grid";

        const pathLabel = document.createElement("label");
        pathLabel.textContent = "路径";
        const pathInput = document.createElement("input");
        pathInput.type = "text";
        pathInput.value = loc.path;
        pathInput.onchange = (e) => {
          loc.path = e.target.value;
          renderServers();
          generateConfig();
        };
        pathLabel.appendChild(pathInput);

        const typeLabel = document.createElement("label");
        typeLabel.textContent = "类型";
        const typeSelect = document.createElement("select");
        [
          { value: "static", text: "静态文件" },
          { value: "proxy", text: "反向代理" },
          { value: "fastcgi", text: "FastCGI" },
          { value: "redirect", text: "重定向" }
        ].forEach((t) => {
          const opt = document.createElement("option");
          opt.value = t.value;
          opt.textContent = t.text;
          opt.selected = loc.type === t.value;
          typeSelect.appendChild(opt);
        });
        typeSelect.onchange = (e) => {
          loc.type = e.target.value;
          renderServers();
          generateConfig();
        };
        typeLabel.appendChild(typeSelect);

        grid.appendChild(pathLabel);
        grid.appendChild(typeLabel);
        item.appendChild(grid);

        // Type-specific options
        if (loc.type === "static") {
          const tryLabel = document.createElement("label");
          tryLabel.textContent = "try_files";
          const tryInput = document.createElement("input");
          tryInput.type = "text";
          tryInput.value = loc.tryFiles || "";
          tryInput.placeholder = "$uri $uri/ =404";
          tryInput.onchange = (e) => {
            loc.tryFiles = e.target.value;
            generateConfig();
          };
          tryLabel.appendChild(tryInput);
          item.appendChild(tryLabel);
        } else if (loc.type === "proxy") {
          const proxyLabel = document.createElement("label");
          proxyLabel.textContent = "proxy_pass";
          const proxyInput = document.createElement("input");
          proxyInput.type = "text";
          proxyInput.value = loc.proxyPass || "";
          proxyInput.placeholder = "http://localhost:3000";
          proxyInput.onchange = (e) => {
            loc.proxyPass = e.target.value;
            generateConfig();
          };
          proxyLabel.appendChild(proxyInput);
          item.appendChild(proxyLabel);

          const headersCheck = document.createElement("label");
          const headersCheckbox = document.createElement("input");
          headersCheckbox.type = "checkbox";
          headersCheckbox.checked = loc.proxyHeaders !== false;
          headersCheckbox.onchange = (e) => {
            loc.proxyHeaders = e.target.checked;
            generateConfig();
          };
          headersCheck.appendChild(headersCheckbox);
          headersCheck.appendChild(document.createTextNode(" 添加代理头"));
          item.appendChild(headersCheck);
        } else if (loc.type === "fastcgi") {
          const fcgiLabel = document.createElement("label");
          fcgiLabel.textContent = "fastcgi_pass";
          const fcgiInput = document.createElement("input");
          fcgiInput.type = "text";
          fcgiInput.value = loc.fastcgiPass || "";
          fcgiInput.placeholder = "unix:/var/run/php/php-fpm.sock";
          fcgiInput.onchange = (e) => {
            loc.fastcgiPass = e.target.value;
            generateConfig();
          };
          fcgiLabel.appendChild(fcgiInput);
          item.appendChild(fcgiLabel);
        } else if (loc.type === "redirect") {
          const redirLabel = document.createElement("label");
          redirLabel.textContent = "重定向目标";
          const redirInput = document.createElement("input");
          redirInput.type = "text";
          redirInput.value = loc.redirectTo || "";
          redirInput.placeholder = "https://example.com$request_uri";
          redirInput.onchange = (e) => {
            loc.redirectTo = e.target.value;
            generateConfig();
          };
          redirLabel.appendChild(redirInput);
          item.appendChild(redirLabel);

          const codeLabel = document.createElement("label");
          codeLabel.textContent = "状态码";
          const codeSelect = document.createElement("select");
          ["301", "302", "307", "308"].forEach((c) => {
            const opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            opt.selected = loc.redirectCode === c;
            codeSelect.appendChild(opt);
          });
          codeSelect.onchange = (e) => {
            loc.redirectCode = e.target.value;
            generateConfig();
          };
          codeLabel.appendChild(codeSelect);
          item.appendChild(codeLabel);
        }

        return item;
      }

      function generateConfig() {
        const workerProcesses = document.getElementById("workerProcesses").value;
        const workerConnections = document.getElementById("workerConnections").value;
        const sendfile = document.getElementById("sendfile").checked;
        const tcpNopush = document.getElementById("tcpNopush").checked;
        const gzip = document.getElementById("gzip").checked;

        let config = "";
        config += "worker_processes " + workerProcesses + ";\n\n";
        config += "events {\n";
        config += "    worker_connections " + workerConnections + ";\n";
        config += "}\n\n";
        config += "http {\n";
        config += "    include       mime.types;\n";
        config += "    default_type  application/octet-stream;\n\n";

        if (sendfile) config += "    sendfile on;\n";
        if (tcpNopush) config += "    tcp_nopush on;\n";

        if (gzip) {
          config += "\n    gzip on;\n";
          config += "    gzip_vary on;\n";
          config += "    gzip_min_length 1024;\n";
          config +=
            "    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;\n";
        }

        // Upstreams
        if (upstreams.length > 0) {
          config += "\n";
          upstreams.forEach((upstream) => {
            config += "    upstream " + upstream.name + " {\n";
            if (upstream.method === "least_conn") {
              config += "        least_conn;\n";
            } else if (upstream.method === "ip_hash") {
              config += "        ip_hash;\n";
            }
            upstream.servers.forEach((s) => {
              if (s.trim()) {
                config += "        server " + s.trim() + ";\n";
              }
            });
            config += "    }\n\n";
          });
        }

        // Servers
        servers.forEach((server) => {
          config += "\n    server {\n";
          config += "        listen " + server.listen + ";\n";
          config += "        server_name " + server.serverName + ";\n";

          if (server.ssl) {
            if (server.sslCert) config += "        ssl_certificate " + server.sslCert + ";\n";
            if (server.sslKey) config += "        ssl_certificate_key " + server.sslKey + ";\n";
            config += "        ssl_protocols TLSv1.2 TLSv1.3;\n";
            config += "        ssl_prefer_server_ciphers on;\n";
          }

          if (server.root) config += "        root " + server.root + ";\n";
          if (server.index) config += "        index " + server.index + ";\n";

          server.locations.forEach((loc) => {
            config += "\n        location " + loc.path + " {\n";

            if (loc.type === "static") {
              if (loc.tryFiles) {
                config += "            try_files " + loc.tryFiles + ";\n";
              }
            } else if (loc.type === "proxy") {
              if (loc.proxyPass) {
                config += "            proxy_pass " + loc.proxyPass + ";\n";
              }
              if (loc.proxyHeaders !== false) {
                config += "            proxy_set_header Host $host;\n";
                config += "            proxy_set_header X-Real-IP $remote_addr;\n";
                config +=
                  "            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n";
                config += "            proxy_set_header X-Forwarded-Proto $scheme;\n";
              }
            } else if (loc.type === "fastcgi") {
              if (loc.fastcgiPass) {
                config += "            fastcgi_pass " + loc.fastcgiPass + ";\n";
                config += "            fastcgi_index index.php;\n";
                config +=
                  "            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;\n";
                config += "            include fastcgi_params;\n";
              }
            } else if (loc.type === "redirect") {
              const code = loc.redirectCode || "301";
              if (loc.redirectTo) {
                config += "            return " + code + " " + loc.redirectTo + ";\n";
              }
            }

            config += "        }\n";
          });

          config += "    }\n";
        });

        config += "}\n";

        document.getElementById("output").textContent = config;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output").textContent;
        navigator.clipboard.writeText(output).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      window.downloadFile = function () {
        const output = document.getElementById("output").textContent;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "nginx.conf";
        a.click();
        URL.revokeObjectURL(url);
      };

      // Initialize
      generateConfig();
    
