// @ts-nocheck
// Generated from tools/dev/htaccess-nginx.html
// Source SHA-256: e2e4b59a023827d8d616c61bd7b3f4db5f7030499a3c17ad486c2a06cdcac501
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const examples = {
        rewrite: `RewriteEngine On
RewriteBase /

# Pretty URLs
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?url=$1 [L,QSA]

# Remove .php extension
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ^([^.]+)$ $1.php [NC,L]`,

        redirect: `# Redirect old URLs to new
Redirect 301 /old-page /new-page
Redirect 301 /blog/old-post /articles/new-post

# Redirect entire domain
RewriteCond %{HTTP_HOST} ^old-domain.com$ [NC]
RewriteRule ^(.*)$ https://new-domain.com/$1 [R=301,L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`,

        auth: `# Block specific IPs
Order Allow,Deny
Allow from all
Deny from 123.456.789.0

# Password protect directory
AuthType Basic
AuthName "Restricted Area"
AuthUserFile /path/to/.htpasswd
Require valid-user

# Block bad bots
RewriteCond %{HTTP_USER_AGENT} (bot|crawler|spider) [NC]
RewriteRule .* - [F,L]`,

        cache: `# Cache static files
<FilesMatch "\.(jpg|jpeg|png|gif|ico)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

<FilesMatch "\.(css|js)$">
    Header set Cache-Control "max-age=604800, public"
</FilesMatch>

<FilesMatch "\.(html|htm)$">
    Header set Cache-Control "max-age=3600, public"
</FilesMatch>`,

        gzip: `# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE application/xml
</IfModule>`
      };

      window.loadExample = function (name) {
        document.getElementById("htaccessInput").value = examples[name];
        convert();
      };

      function convert() {
        const htaccess = document.getElementById("htaccessInput").value;
        const nginx = convertToNginx(htaccess);
        document.getElementById("nginxOutput").value = nginx;
      }

      function convertToNginx(htaccess) {
        const lines = htaccess.split("\n");
        let nginx = [];
        let inLocationBlock = false;
        let rewriteConditions = [];

        nginx.push("# Converted from .htaccess");
        nginx.push("# Please review and adjust as needed");
        nginx.push("");

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim();

          // Skip empty lines and comments
          if (!line || line.startsWith("#")) {
            if (line.startsWith("#")) {
              nginx.push(line);
            }
            continue;
          }

          // Skip RewriteEngine and RewriteBase
          if (line.startsWith("RewriteEngine") || line.startsWith("RewriteBase")) {
            continue;
          }

          // Handle RewriteCond
          if (line.startsWith("RewriteCond")) {
            rewriteConditions.push(parseRewriteCond(line));
            continue;
          }

          // Handle RewriteRule
          if (line.startsWith("RewriteRule")) {
            const rule = parseRewriteRule(line, rewriteConditions);
            nginx.push(...rule);
            rewriteConditions = [];
            continue;
          }

          // Handle Redirect
          if (line.startsWith("Redirect")) {
            const match = line.match(/Redirect\s+(\d+)?\s*([^\s]+)\s+([^\s]+)/i);
            if (match) {
              const code = match[1] || "301";
              nginx.push(`rewrite ^${match[2]}$ ${match[3]} permanent;`);
            }
            continue;
          }

          // Handle FilesMatch for caching
          if (line.startsWith("<FilesMatch")) {
            const match = line.match(/<FilesMatch\s+"([^"]+)">/i);
            if (match) {
              const extensions = match[1].replace(/\\/g, "").replace(/\|/g, "|");
              nginx.push(`location ~* \\.(${extensions})$ {`);
              inLocationBlock = true;
            }
            continue;
          }

          if (line.startsWith("</FilesMatch>")) {
            nginx.push("}");
            nginx.push("");
            inLocationBlock = false;
            continue;
          }

          // Handle Header set
          if (line.startsWith("Header set")) {
            const match = line.match(/Header\s+set\s+([^\s]+)\s+"([^"]+)"/i);
            if (match) {
              nginx.push(`    add_header ${match[1]} "${match[2]}";`);
            }
            continue;
          }

          // Handle IfModule for compression
          if (line.includes("mod_deflate")) {
            nginx.push("gzip on;");
            nginx.push("gzip_vary on;");
            nginx.push("gzip_proxied any;");
            nginx.push("gzip_comp_level 6;");
            continue;
          }

          // Handle AddOutputFilterByType
          if (line.startsWith("AddOutputFilterByType")) {
            const match = line.match(/AddOutputFilterByType\s+DEFLATE\s+(.+)/i);
            if (match) {
              const type = match[1].trim();
              if (
                !nginx.includes(
                  "gzip_types text/plain text/css application/json application/javascript text/xml application/xml;"
                )
              ) {
                nginx.push(
                  "gzip_types text/plain text/css application/json application/javascript text/xml application/xml;"
                );
              }
            }
            continue;
          }

          // Handle Deny/Allow
          if (line.startsWith("Deny from")) {
            const ip = line.replace("Deny from", "").trim();
            nginx.push(`deny ${ip};`);
            continue;
          }

          if (line.startsWith("Allow from")) {
            const ip = line.replace("Allow from", "").trim();
            if (ip !== "all") {
              nginx.push(`allow ${ip};`);
            }
            continue;
          }

          // Handle auth
          if (
            line.startsWith("AuthType") ||
            line.startsWith("AuthName") ||
            line.startsWith("AuthUserFile") ||
            line.startsWith("Require")
          ) {
            if (line.startsWith("AuthUserFile")) {
              const path = line.replace("AuthUserFile", "").trim();
              nginx.push('auth_basic "Restricted Area";');
              nginx.push(`auth_basic_user_file ${path};`);
            }
            continue;
          }
        }

        return nginx.join("\n");
      }

      function parseRewriteCond(line) {
        // Parse common RewriteCond patterns
        if (line.includes("%{HTTPS}") && line.includes("off")) {
          return { type: "https", negate: false };
        }
        if (line.includes("%{REQUEST_FILENAME}") && line.includes("!-f")) {
          return { type: "not_file" };
        }
        if (line.includes("%{REQUEST_FILENAME}") && line.includes("!-d")) {
          return { type: "not_dir" };
        }
        if (line.includes("%{HTTP_HOST}")) {
          const match = line.match(/%{HTTP_HOST}\s+\^?([^$\s\[]+)/);
          return { type: "host", value: match ? match[1] : "" };
        }
        if (line.includes("%{HTTP_USER_AGENT}")) {
          const match = line.match(/\(([^)]+)\)/);
          return { type: "user_agent", value: match ? match[1] : "" };
        }
        return { type: "unknown", raw: line };
      }

      function parseRewriteRule(line, conditions) {
        const result = [];
        const match = line.match(/RewriteRule\s+\^?([^\s]+)\$?\s+([^\s\[]+)\s*(\[([^\]]+)\])?/i);

        if (!match) return result;

        const pattern = match[1];
        let replacement = match[2];
        const flags = match[4] || "";

        const isRedirect = flags.includes("R=301") || flags.includes("R=302");
        const isPermanent = flags.includes("R=301");

        // Check for HTTPS redirect
        const httpsCondition = conditions.find((c) => c.type === "https");
        if (httpsCondition && replacement.includes("https://")) {
          result.push('if ($scheme != "https") {');
          result.push("    return 301 https://$host$request_uri;");
          result.push("}");
          return result;
        }

        // Check for file/dir conditions
        const hasNotFile = conditions.some((c) => c.type === "not_file");
        const hasNotDir = conditions.some((c) => c.type === "not_dir");

        if (hasNotFile && hasNotDir) {
          result.push("location / {");
          result.push("    try_files $uri $uri/ /" + replacement.replace("$1", "$uri") + ";");
          result.push("}");
          return result;
        }

        // User agent blocking
        const uaCondition = conditions.find((c) => c.type === "user_agent");
        if (uaCondition && flags.includes("F")) {
          result.push(`if ($http_user_agent ~* "${uaCondition.value}") {`);
          result.push("    return 403;");
          result.push("}");
          return result;
        }

        // Simple rewrite
        if (isRedirect) {
          const redirect = isPermanent ? "permanent" : "redirect";
          result.push(`rewrite ^/${pattern}$ ${replacement} ${redirect};`);
        } else {
          result.push(`rewrite ^/${pattern}$ ${replacement} last;`);
        }

        return result;
      }

      window.copyOutput = function () {
        const output = document.getElementById("nginxOutput").value;
        if (!output) {
          alert("没有可复制的内容");
          return;
        }
        navigator.clipboard.writeText(output);
        showToast();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initial conversion
      convert();

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
