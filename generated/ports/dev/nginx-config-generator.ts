// @ts-nocheck
// Generated from tools/dev/nginx-config-generator.html
// Source SHA-256: e1ed6bced25c9c11404bdfbc250cd909891a96ac78bbddb2c3af8d0a6a143151
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function generate() {
        const serverName = document.getElementById("serverName").value.trim();
        const listenPort = document.getElementById("listenPort").value || "80";
        const rootPath = document.getElementById("rootPath").value.trim();
        const indexFiles = document.getElementById("indexFiles").value.trim();

        const enableSSL = document.getElementById("enableSSL").checked;
        const sslCert = document.getElementById("sslCert").value.trim();
        const sslKey = document.getElementById("sslKey").value.trim();
        const httpRedirect = document.getElementById("httpRedirect").checked;
        const http2 = document.getElementById("http2").checked;

        const enableProxy = document.getElementById("enableProxy").checked;
        const proxyPass = document.getElementById("proxyPass").value.trim();
        const proxyHeaders = document.getElementById("proxyHeaders").checked;
        const proxyWebsocket = document.getElementById("proxyWebsocket").checked;

        const gzip = document.getElementById("gzip").checked;
        const securityHeaders = document.getElementById("securityHeaders").checked;
        const staticCache = document.getElementById("staticCache").checked;
        const accessLog = document.getElementById("accessLog").checked;

        document.getElementById("sslSettings").style.display = enableSSL ? "block" : "none";
        document.getElementById("proxySettings").style.display = enableProxy ? "block" : "none";

        let config = "";

        // HTTP redirect block
        if (enableSSL && httpRedirect) {
          config += `server {
    listen 80;
    listen [::]:80;
    server_name ${serverName};
    return 301 https://$host$request_uri;
}

`;
        }

        // Main server block
        config += "server {\n";

        // Listen directive
        if (enableSSL) {
          config += `    listen 443 ssl${http2 ? " http2" : ""};\n`;
          config += `    listen [::]:443 ssl${http2 ? " http2" : ""};\n`;
        } else {
          config += `    listen ${listenPort};\n`;
          config += `    listen [::]:${listenPort};\n`;
        }

        config += `    server_name ${serverName};\n`;

        // SSL config
        if (enableSSL) {
          config += `\n    ssl_certificate ${sslCert};\n`;
          config += `    ssl_certificate_key ${sslKey};\n`;
          config += "    ssl_protocols TLSv1.2 TLSv1.3;\n";
          config += "    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;\n";
          config += "    ssl_prefer_server_ciphers off;\n";
        }

        // Root and index
        if (!enableProxy) {
          config += `\n    root ${rootPath};\n`;
          config += `    index ${indexFiles};\n`;
        }

        // Access log
        if (accessLog) {
          config += `\n    access_log /var/log/nginx/${serverName.split(" ")[0]}.access.log;\n`;
          config += `    error_log /var/log/nginx/${serverName.split(" ")[0]}.error.log;\n`;
        }

        // Gzip
        if (gzip) {
          config += "\n    gzip on;\n";
          config += "    gzip_vary on;\n";
          config += "    gzip_min_length 1024;\n";
          config +=
            "    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml;\n";
        }

        // Security headers
        if (securityHeaders) {
          config += '\n    add_header X-Frame-Options "SAMEORIGIN" always;\n';
          config += '    add_header X-Content-Type-Options "nosniff" always;\n';
          config += '    add_header X-XSS-Protection "1; mode=block" always;\n';
          config += '    add_header Referrer-Policy "strict-origin-when-cross-origin" always;\n';
        }

        // Location blocks
        config += "\n    location / {\n";
        if (enableProxy) {
          config += `        proxy_pass ${proxyPass};\n`;
          if (proxyHeaders) {
            config += "        proxy_set_header Host $host;\n";
            config += "        proxy_set_header X-Real-IP $remote_addr;\n";
            config += "        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n";
            config += "        proxy_set_header X-Forwarded-Proto $scheme;\n";
          }
          if (proxyWebsocket) {
            config += "        proxy_http_version 1.1;\n";
            config += "        proxy_set_header Upgrade $http_upgrade;\n";
            config += '        proxy_set_header Connection "upgrade";\n';
          }
        } else {
          config += "        try_files $uri $uri/ =404;\n";
        }
        config += "    }\n";

        // Static cache
        if (staticCache && !enableProxy) {
          config += "\n    location ~* \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {\n";
          config += "        expires 30d;\n";
          config += '        add_header Cache-Control "public, no-transform";\n';
          config += "    }\n";
        }

        config += "}\n";

        document.getElementById("output").textContent = config;
      }

      function copyConfig() {
        const config = document.getElementById("output").textContent;
        navigator.clipboard.writeText(config);
      }

      function downloadConfig() {
        const config = document.getElementById("output").textContent;
        const serverName = document.getElementById("serverName").value.split(" ")[0] || "nginx";
        const blob = new Blob([config], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${serverName}.conf`;
        a.click();
        URL.revokeObjectURL(url);
      }

      generate();

      function toggleTheme() {
        const html = document.documentElement;
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        document.querySelector(".theme-toggle").textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      }
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          document.querySelector(".theme-toggle").textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
