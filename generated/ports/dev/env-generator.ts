// @ts-nocheck
// Generated from tools/dev/env-generator.html
// Source SHA-256: e569371a4bc927363162f3a23647d64ce9ce3b5d3a9755a018a781c537185afe
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const templates = {
        node: [
          { key: "NODE_ENV", value: "development", comment: "运行环境" },
          { key: "PORT", value: "3000", comment: "服务端口" },
          {
            key: "DATABASE_URL",
            value: "postgresql://user:pass@localhost:5432/db",
            comment: "数据库连接"
          },
          { key: "REDIS_URL", value: "redis://localhost:6379", comment: "Redis 连接" },
          { key: "JWT_SECRET", value: "your-secret-key", comment: "JWT 密钥" },
          { key: "LOG_LEVEL", value: "debug", comment: "日志级别" }
        ],
        react: [
          { key: "REACT_APP_API_URL", value: "http://localhost:3001/api", comment: "API 地址" },
          { key: "REACT_APP_ENV", value: "development", comment: "环境" },
          { key: "REACT_APP_DEBUG", value: "true", comment: "调试模式" },
          { key: "REACT_APP_TITLE", value: "My App", comment: "应用标题" }
        ],
        nextjs: [
          {
            key: "NEXT_PUBLIC_API_URL",
            value: "http://localhost:3001/api",
            comment: "公开 API 地址"
          },
          {
            key: "DATABASE_URL",
            value: "postgresql://user:pass@localhost:5432/db",
            comment: "数据库连接"
          },
          { key: "NEXTAUTH_SECRET", value: "your-secret", comment: "NextAuth 密钥" },
          { key: "NEXTAUTH_URL", value: "http://localhost:3000", comment: "NextAuth URL" }
        ],
        django: [
          { key: "DEBUG", value: "True", comment: "调试模式" },
          { key: "SECRET_KEY", value: "your-secret-key", comment: "Django 密钥" },
          {
            key: "DATABASE_URL",
            value: "postgres://user:pass@localhost:5432/db",
            comment: "数据库连接"
          },
          { key: "ALLOWED_HOSTS", value: "localhost,127.0.0.1", comment: "允许的主机" },
          { key: "REDIS_URL", value: "redis://localhost:6379/0", comment: "Redis 连接" }
        ],
        laravel: [
          { key: "APP_NAME", value: "Laravel", comment: "应用名称" },
          { key: "APP_ENV", value: "local", comment: "环境" },
          { key: "APP_KEY", value: "base64:...", comment: "应用密钥" },
          { key: "APP_DEBUG", value: "true", comment: "调试模式" },
          { key: "DB_CONNECTION", value: "mysql", comment: "数据库类型" },
          { key: "DB_HOST", value: "127.0.0.1", comment: "数据库主机" },
          { key: "DB_PORT", value: "3306", comment: "数据库端口" },
          { key: "DB_DATABASE", value: "laravel", comment: "数据库名" },
          { key: "DB_USERNAME", value: "root", comment: "用户名" },
          { key: "DB_PASSWORD", value: "", comment: "密码" }
        ],
        docker: [
          { key: "COMPOSE_PROJECT_NAME", value: "myapp", comment: "项目名称" },
          { key: "POSTGRES_USER", value: "postgres", comment: "PG 用户" },
          { key: "POSTGRES_PASSWORD", value: "password", comment: "PG 密码" },
          { key: "POSTGRES_DB", value: "myapp", comment: "PG 数据库" },
          { key: "REDIS_PASSWORD", value: "redispass", comment: "Redis 密码" }
        ]
      };

      function loadTemplate(name) {
        const list = document.getElementById("envList");
        list.innerHTML = "";
        templates[name].forEach((env) => {
          addEnv(env.key, env.value, env.comment);
        });
        generate();
      }

      function addEnv(key = "", value = "", comment = "") {
        const list = document.getElementById("envList");
        const item = document.createElement("div");
        item.className = "env-item";
        item.innerHTML = `
        <input type="text" class="key" placeholder="变量名" value="${key}" oninput="generate()" />
        <input type="text" class="value" placeholder="值" value="${value}" oninput="generate()" />
        <input type="text" class="comment" placeholder="注释（可选）" value="${comment}" oninput="generate()" />
        <button onclick="removeEnv(this)">×</button>
      `;
        list.appendChild(item);
        generate();
      }

      function removeEnv(btn) {
        btn.parentElement.remove();
        generate();
      }

      function generate() {
        const addComments = document.getElementById("addComments").checked;
        const quoteValues = document.getElementById("quoteValues").checked;
        const sortKeys = document.getElementById("sortKeys").checked;

        let envs = [];
        document.querySelectorAll("#envList .env-item").forEach((item) => {
          const key = item.querySelector(".key").value.trim();
          const value = item.querySelector(".value").value;
          const comment = item.querySelector(".comment").value.trim();
          if (key) {
            envs.push({ key, value, comment });
          }
        });

        if (sortKeys) {
          envs.sort((a, b) => a.key.localeCompare(b.key));
        }

        let code = "";
        envs.forEach((env) => {
          if (addComments && env.comment) {
            code += `# ${env.comment}\n`;
          }
          let val = env.value;
          if (quoteValues || val.includes(" ") || val.includes("#")) {
            val = `"${val}"`;
          }
          code += `${env.key}=${val}\n`;
          if (addComments) code += "\n";
        });

        document.getElementById("output").textContent = code.trim();
      }

      function copyCode() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
      }

      function downloadFile(filename) {
        const code = document.getElementById("output").textContent;
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
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
    
