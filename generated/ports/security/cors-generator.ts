// @ts-nocheck
// Generated from tools/security/cors-generator.html
// Source SHA-256: 545bbced8a0f531c353d97e365f220fb24b6b8162fd2351f47ff32bf482d52cf
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

      // 状态
      const state = {
        origins: [],
        headers: ["Content-Type", "Accept"],
        exposeHeaders: [],
        currentTab: "headers"
      };

      // Tag 输入处理
      function setupTagInput(inputId, containerId, stateKey) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);

        input.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            const value = this.value.trim();
            if (value && state[stateKey].indexOf(value) === -1) {
              state[stateKey].push(value);
              renderTags(containerId, stateKey);
              this.value = "";
              updateConfig();
            }
          }
        });
      }

      function renderTags(containerId, stateKey) {
        const container = document.getElementById(containerId);
        const input = container.querySelector(".tag-input");

        // 移除现有标签
        container.querySelectorAll(".tag").forEach((tag) => tag.remove());

        // 添加标签
        state[stateKey].forEach((value, index) => {
          const tag = document.createElement("span");
          tag.className = "tag";
          tag.textContent = value + " ";

          const removeBtn = document.createElement("button");
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            state[stateKey].splice(index, 1);
            renderTags(containerId, stateKey);
            updateConfig();

            // 更新预设复选框
            if (stateKey === "headers") {
              const checkbox = document.querySelector('input[data-header="' + value + '"]');
              if (checkbox) checkbox.checked = false;
            }
          };
          tag.appendChild(removeBtn);
          container.insertBefore(tag, input);
        });
      }

      window.togglePresetHeader = function (checkbox) {
        const header = checkbox.dataset.header;
        const index = state.headers.indexOf(header);

        if (checkbox.checked && index === -1) {
          state.headers.push(header);
        } else if (!checkbox.checked && index !== -1) {
          state.headers.splice(index, 1);
        }

        renderTags("headersContainer", "headers");
        updateConfig();
      };

      // 初始化
      setupTagInput("originInput", "originsContainer", "origins");
      setupTagInput("headerInput", "headersContainer", "headers");
      setupTagInput("exposeHeaderInput", "exposeHeadersContainer", "exposeHeaders");
      renderTags("headersContainer", "headers");

      function getConfig() {
        const allowAllOrigins = document.getElementById("allowAllOrigins").checked;
        const allowAllHeaders = document.getElementById("allowAllHeaders").checked;
        const allowCredentials = document.getElementById("allowCredentials").checked;
        const maxAge = document.getElementById("maxAge").value;

        const methods = [];
        document.querySelectorAll(".checkbox-group input[value]").forEach((cb) => {
          if (cb.checked && cb.value) methods.push(cb.value);
        });

        return {
          allowAllOrigins,
          origins: state.origins,
          methods,
          allowAllHeaders,
          headers: state.headers,
          exposeHeaders: state.exposeHeaders,
          allowCredentials,
          maxAge: parseInt(maxAge) || 86400
        };
      }

      function updateConfig() {
        const config = getConfig();

        // 显示/隐藏来源输入
        document.getElementById("originsGroup").style.display = config.allowAllOrigins
          ? "none"
          : "block";
        document.getElementById("headersGroup").style.display = config.allowAllHeaders
          ? "none"
          : "block";

        // 警告检查
        const warnings = [];
        if (config.allowAllOrigins) {
          warnings.push("允许所有来源可能导致安全问题");
        }
        if (config.allowCredentials && config.allowAllOrigins) {
          warnings.push("携带凭证时不能使用 * 作为来源，浏览器会拒绝此配置");
        }

        const warningBox = document.getElementById("warningBox");
        if (warnings.length > 0) {
          document.getElementById("warningText").textContent = warnings.join("；");
          warningBox.classList.add("show");
        } else {
          warningBox.classList.remove("show");
        }

        generateOutput();
      }

      function generateOutput() {
        const config = getConfig();
        const outputDiv = document.getElementById("outputContent");
        let output = "";

        const origin = config.allowAllOrigins
          ? "*"
          : config.origins.length > 0
            ? config.origins[0]
            : "https://example.com";
        const methods = config.methods.join(", ");
        const headers = config.allowAllHeaders ? "*" : config.headers.join(", ");
        const exposeHeaders = config.exposeHeaders.join(", ");

        switch (state.currentTab) {
          case "headers":
            output = "Access-Control-Allow-Origin: " + origin + "\n";
            output += "Access-Control-Allow-Methods: " + methods + "\n";
            output += "Access-Control-Allow-Headers: " + headers + "\n";
            if (exposeHeaders) {
              output += "Access-Control-Expose-Headers: " + exposeHeaders + "\n";
            }
            if (config.allowCredentials) {
              output += "Access-Control-Allow-Credentials: true\n";
            }
            output += "Access-Control-Max-Age: " + config.maxAge;
            break;

          case "nginx":
            output = "# CORS Configuration for Nginx\n";
            output += "location / {\n";
            if (config.allowAllOrigins) {
              output += "    add_header 'Access-Control-Allow-Origin' '*' always;\n";
            } else {
              output += "    # Dynamic origin handling\n";
              output += '    set $cors_origin "";\n';
              config.origins.forEach((o) => {
                output +=
                  '    if ($http_origin = "' + o + '") { set $cors_origin $http_origin; }\n';
              });
              output += "    add_header 'Access-Control-Allow-Origin' $cors_origin always;\n";
            }
            output += "    add_header 'Access-Control-Allow-Methods' '" + methods + "' always;\n";
            output += "    add_header 'Access-Control-Allow-Headers' '" + headers + "' always;\n";
            if (exposeHeaders) {
              output +=
                "    add_header 'Access-Control-Expose-Headers' '" + exposeHeaders + "' always;\n";
            }
            if (config.allowCredentials) {
              output += "    add_header 'Access-Control-Allow-Credentials' 'true' always;\n";
            }
            output += "    add_header 'Access-Control-Max-Age' '" + config.maxAge + "' always;\n\n";
            output += "    # Handle preflight requests\n";
            output += "    if ($request_method = 'OPTIONS') {\n";
            output += "        return 204;\n";
            output += "    }\n";
            output += "}";
            break;

          case "apache":
            output = "# CORS Configuration for Apache\n";
            output += "<IfModule mod_headers.c>\n";
            output += '    Header set Access-Control-Allow-Origin "' + origin + '"\n';
            output += '    Header set Access-Control-Allow-Methods "' + methods + '"\n';
            output += '    Header set Access-Control-Allow-Headers "' + headers + '"\n';
            if (exposeHeaders) {
              output += '    Header set Access-Control-Expose-Headers "' + exposeHeaders + '"\n';
            }
            if (config.allowCredentials) {
              output += '    Header set Access-Control-Allow-Credentials "true"\n';
            }
            output += '    Header set Access-Control-Max-Age "' + config.maxAge + '"\n';
            output += "</IfModule>\n\n";
            output += "# Handle preflight requests\n";
            output += "<IfModule mod_rewrite.c>\n";
            output += "    RewriteEngine On\n";
            output += "    RewriteCond %{REQUEST_METHOD} OPTIONS\n";
            output += "    RewriteRule ^(.*)$ $1 [R=204,L]\n";
            output += "</IfModule>";
            break;

          case "express":
            output = "// CORS Configuration for Express.js\n";
            output += "const cors = require('cors');\n\n";
            output += "const corsOptions = {\n";
            if (config.allowAllOrigins) {
              output += "    origin: '*',\n";
            } else if (config.origins.length === 1) {
              output += "    origin: '" + config.origins[0] + "',\n";
            } else if (config.origins.length > 1) {
              output += "    origin: [\n";
              config.origins.forEach((o, i) => {
                output += "        '" + o + "'" + (i < config.origins.length - 1 ? "," : "") + "\n";
              });
              output += "    ],\n";
            }
            output +=
              "    methods: [" + config.methods.map((m) => "'" + m + "'").join(", ") + "],\n";
            output +=
              "    allowedHeaders: [" +
              (config.allowAllHeaders
                ? "'*'"
                : config.headers.map((h) => "'" + h + "'").join(", ")) +
              "],\n";
            if (exposeHeaders) {
              output +=
                "    exposedHeaders: [" +
                config.exposeHeaders.map((h) => "'" + h + "'").join(", ") +
                "],\n";
            }
            output += "    credentials: " + config.allowCredentials + ",\n";
            output += "    maxAge: " + config.maxAge + "\n";
            output += "};\n\n";
            output += "app.use(cors(corsOptions));";
            break;

          case "spring":
            output = "// CORS Configuration for Spring Boot\n";
            output += "@Configuration\n";
            output += "public class CorsConfig implements WebMvcConfigurer {\n\n";
            output += "    @Override\n";
            output += "    public void addCorsMappings(CorsRegistry registry) {\n";
            output += '        registry.addMapping("/**")\n';
            if (config.allowAllOrigins) {
              output += '            .allowedOrigins("*")\n';
            } else {
              output +=
                "            .allowedOrigins(" +
                (config.origins.length > 0
                  ? config.origins.map((o) => '"' + o + '"').join(", ")
                  : '"https://example.com"') +
                ")\n";
            }
            output +=
              "            .allowedMethods(" +
              config.methods.map((m) => '"' + m + '"').join(", ") +
              ")\n";
            output +=
              "            .allowedHeaders(" +
              (config.allowAllHeaders
                ? '"*"'
                : config.headers.map((h) => '"' + h + '"').join(", ")) +
              ")\n";
            if (exposeHeaders) {
              output +=
                "            .exposedHeaders(" +
                config.exposeHeaders.map((h) => '"' + h + '"').join(", ") +
                ")\n";
            }
            output += "            .allowCredentials(" + config.allowCredentials + ")\n";
            output += "            .maxAge(" + config.maxAge + ");\n";
            output += "    }\n";
            output += "}";
            break;
        }

        outputDiv.textContent = output;
      }

      window.switchTab = function (tab) {
        state.currentTab = tab;
        document.querySelectorAll(".output-tab").forEach((t, i) => {
          const tabs = ["headers", "nginx", "apache", "express", "spring"];
          t.classList.toggle("active", tabs[i] === tab);
        });
        generateOutput();
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        navigator.clipboard.writeText(output).then(function () {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadConfig = function () {
        const output = document.getElementById("outputContent").textContent;
        const extensions = {
          headers: "txt",
          nginx: "conf",
          apache: "conf",
          express: "js",
          spring: "java"
        };

        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "cors-config." + extensions[state.currentTab];
        a.click();
        URL.revokeObjectURL(url);
      };

      function showToast(message) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.cssText =
          "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#10b981;color:white;padding:0.75rem 1.5rem;border-radius:8px;z-index:1000;";
        document.body.appendChild(toast);
        setTimeout(function () {
          toast.remove();
        }, 2000);
      }

      // 初始化输出
      updateConfig();
    
