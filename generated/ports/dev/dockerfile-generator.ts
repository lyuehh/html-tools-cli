// @ts-nocheck
// Generated from tools/dev/dockerfile-generator.html
// Source SHA-256: c8044208760017cb0d9196c980803705d1b0daf0c7a4857d0a37e92166cc432d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var baseImageEl = document.getElementById("baseImage");
      var workdirEl = document.getElementById("workdir");
      var portEl = document.getElementById("port");
      var cmdEl = document.getElementById("cmd");
      var envVarsEl = document.getElementById("envVars");
      var runCommandsEl = document.getElementById("runCommands");
      var useMultiStageEl = document.getElementById("useMultiStage");
      var nonRootEl = document.getElementById("nonRoot");
      var healthCheckEl = document.getElementById("healthCheck");
      var outputEl = document.getElementById("output");
      var statusEl = document.getElementById("status");

      var templates = {
        node: {
          baseImage: "node:20-alpine",
          workdir: "/app",
          port: "3000",
          cmd: "node server.js",
          envVars: "NODE_ENV=production",
          runCommands: "",
          multiStage: true,
          nonRoot: true,
          healthCheck: true
        },
        python: {
          baseImage: "python:3.12-slim",
          workdir: "/app",
          port: "8000",
          cmd: "python -m uvicorn main:app --host 0.0.0.0 --port 8000",
          envVars: "PYTHONDONTWRITEBYTECODE=1\nPYTHONUNBUFFERED=1",
          runCommands: "",
          multiStage: false,
          nonRoot: true,
          healthCheck: true
        },
        go: {
          baseImage: "golang:1.22-alpine",
          workdir: "/app",
          port: "8080",
          cmd: "./main",
          envVars: "GIN_MODE=release",
          runCommands: "",
          multiStage: true,
          nonRoot: true,
          healthCheck: true
        },
        java: {
          baseImage: "maven:3.9-eclipse-temurin-21",
          workdir: "/app",
          port: "8080",
          cmd: "java -jar app.jar",
          envVars: "JAVA_OPTS=-Xmx512m",
          runCommands: "",
          multiStage: true,
          nonRoot: true,
          healthCheck: true
        },
        nginx: {
          baseImage: "nginx:alpine",
          workdir: "/usr/share/nginx/html",
          port: "80",
          cmd: 'nginx -g "daemon off;"',
          envVars: "",
          runCommands: "",
          multiStage: false,
          nonRoot: false,
          healthCheck: true
        },
        static: {
          baseImage: "nginx:alpine",
          workdir: "/usr/share/nginx/html",
          port: "80",
          cmd: "",
          envVars: "",
          runCommands: "",
          multiStage: false,
          nonRoot: false,
          healthCheck: false
        }
      };

      function applyTemplate(name) {
        var t = templates[name];
        if (!t) return;

        baseImageEl.value = t.baseImage;
        workdirEl.value = t.workdir;
        portEl.value = t.port;
        cmdEl.value = t.cmd;
        envVarsEl.value = t.envVars;
        runCommandsEl.value = t.runCommands;
        useMultiStageEl.checked = t.multiStage;
        nonRootEl.checked = t.nonRoot;
        healthCheckEl.checked = t.healthCheck;

        document.querySelectorAll(".template-btn").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.template === name);
        });

        generate();
      }

      window.generate = function () {
        var baseImage = baseImageEl.value;
        var workdir = workdirEl.value || "/app";
        var port = portEl.value;
        var cmd = cmdEl.value;
        var envVars = envVarsEl.value.trim();
        var runCommands = runCommandsEl.value.trim();
        var useMultiStage = useMultiStageEl.checked;
        var nonRoot = nonRootEl.checked;
        var healthCheck = healthCheckEl.checked;

        var lines = [];

        // Detect language/framework
        var isNode = baseImage.includes("node");
        var isPython = baseImage.includes("python");
        var isGo = baseImage.includes("golang");
        var isJava = baseImage.includes("maven") || baseImage.includes("openjdk");
        var isNginx = baseImage.includes("nginx");

        if (useMultiStage) {
          // Multi-stage build
          lines.push("# Build stage");

          if (isNode) {
            lines.push("FROM " + baseImage + " AS builder");
            lines.push("WORKDIR " + workdir);
            lines.push("");
            lines.push("# Install dependencies first (better caching)");
            lines.push("COPY package*.json ./");
            lines.push("RUN npm ci --only=production");
            lines.push("");
            lines.push("# Copy source code");
            lines.push("COPY . .");
            lines.push("");
            lines.push("# Production stage");
            lines.push("FROM " + baseImage + " AS production");
            lines.push("WORKDIR " + workdir);
          } else if (isGo) {
            lines.push("FROM " + baseImage + " AS builder");
            lines.push("WORKDIR " + workdir);
            lines.push("");
            lines.push("# Download dependencies");
            lines.push("COPY go.mod go.sum ./");
            lines.push("RUN go mod download");
            lines.push("");
            lines.push("# Build");
            lines.push("COPY . .");
            lines.push("RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .");
            lines.push("");
            lines.push("# Production stage");
            lines.push("FROM alpine:3.19 AS production");
            lines.push("RUN apk --no-cache add ca-certificates");
            lines.push("WORKDIR " + workdir);
            lines.push("COPY --from=builder " + workdir + "/main .");
          } else if (isJava) {
            lines.push("FROM " + baseImage + " AS builder");
            lines.push("WORKDIR " + workdir);
            lines.push("");
            lines.push("# Copy pom.xml and download dependencies");
            lines.push("COPY pom.xml .");
            lines.push("RUN mvn dependency:go-offline");
            lines.push("");
            lines.push("# Build");
            lines.push("COPY src ./src");
            lines.push("RUN mvn package -DskipTests");
            lines.push("");
            lines.push("# Production stage");
            lines.push("FROM eclipse-temurin:21-jre-alpine AS production");
            lines.push("WORKDIR " + workdir);
            lines.push("COPY --from=builder " + workdir + "/target/*.jar app.jar");
          }
        } else {
          // Single stage build
          lines.push("FROM " + baseImage);
          lines.push("");
          lines.push("WORKDIR " + workdir);
        }

        // Environment variables
        if (envVars) {
          lines.push("");
          lines.push("# Environment variables");
          envVars.split("\n").forEach(function (env) {
            env = env.trim();
            if (env && env.includes("=")) {
              lines.push("ENV " + env);
            }
          });
        }

        // Additional run commands
        if (runCommands) {
          lines.push("");
          lines.push("# Additional setup");
          runCommands.split("\n").forEach(function (cmd) {
            cmd = cmd.trim();
            if (cmd) {
              lines.push("RUN " + cmd);
            }
          });
        }

        // Copy files (for single stage or after multi-stage)
        if (!useMultiStage) {
          lines.push("");
          lines.push("# Copy application files");

          if (isNode) {
            lines.push("COPY package*.json ./");
            lines.push("RUN npm ci --only=production");
            lines.push("COPY . .");
          } else if (isPython) {
            lines.push("COPY requirements.txt .");
            lines.push("RUN pip install --no-cache-dir -r requirements.txt");
            lines.push("COPY . .");
          } else if (isNginx) {
            lines.push("COPY . .");
          } else {
            lines.push("COPY . .");
          }
        } else if (isNode) {
          lines.push("");
          lines.push("# Copy from builder");
          lines.push("COPY --from=builder " + workdir + "/node_modules ./node_modules");
          lines.push("COPY --from=builder " + workdir + " .");
        }

        // Non-root user
        if (nonRoot && !isNginx) {
          lines.push("");
          lines.push("# Create non-root user");
          if (baseImage.includes("alpine")) {
            lines.push("RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001");
          } else {
            lines.push(
              "RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -s /bin/sh nextjs"
            );
          }
          lines.push("USER nextjs");
        }

        // Expose port
        if (port) {
          lines.push("");
          lines.push("# Expose port");
          port.split(",").forEach(function (p) {
            p = p.trim();
            if (p) {
              lines.push("EXPOSE " + p);
            }
          });
        }

        // Health check
        if (healthCheck && port) {
          var firstPort = port.split(",")[0].trim();
          lines.push("");
          lines.push("# Health check");
          if (isNginx) {
            lines.push("HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\");
            lines.push("  CMD curl -f http://localhost:" + firstPort + "/ || exit 1");
          } else {
            lines.push("HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\");
            lines.push(
              "  CMD wget --no-verbose --tries=1 --spider http://localhost:" +
                firstPort +
                "/health || exit 1"
            );
          }
        }

        // CMD
        if (cmd) {
          lines.push("");
          lines.push("# Start command");
          var cmdParts = cmd.split(" ").filter(Boolean);
          lines.push('CMD ["' + cmdParts.join('", "') + '"]');
        }

        outputEl.textContent = lines.join("\n");
        saveToUrl();
      };

      // Template buttons
      document.querySelectorAll(".template-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          applyTemplate(btn.dataset.template);
        });
      });

      // Generate button
      document.getElementById("btnGenerate").addEventListener("click", generate);

      // Auto-generate on input change
      [
        baseImageEl,
        workdirEl,
        portEl,
        cmdEl,
        envVarsEl,
        runCommandsEl,
        useMultiStageEl,
        nonRootEl,
        healthCheckEl
      ].forEach(function (el) {
        el.addEventListener("change", generate);
        el.addEventListener("input", generate);
      });

      // Copy
      document.getElementById("btnCopy").addEventListener("click", async function () {
        try {
          await navigator.clipboard.writeText(outputEl.textContent);
          showStatus("已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      // Download
      document.getElementById("btnDownload").addEventListener("click", function () {
        var content = outputEl.textContent;
        var blob = new Blob([content], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "Dockerfile";
        a.click();
        URL.revokeObjectURL(url);
        showStatus("已下载 Dockerfile", "success");
      });

      // Share
      document.getElementById("btnShare").addEventListener("click", async function () {
        saveToUrl();
        try {
          await navigator.clipboard.writeText(location.href);
          showStatus("分享链接已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      });

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // URL state
      function saveToUrl() {
        var state = {
          base: baseImageEl.value,
          work: workdirEl.value,
          port: portEl.value,
          cmd: cmdEl.value,
          env: envVarsEl.value,
          run: runCommandsEl.value,
          multi: useMultiStageEl.checked,
          nonRoot: nonRootEl.checked,
          health: healthCheckEl.checked
        };
        try {
          history.replaceState(null, "", "#" + btoa(encodeURIComponent(JSON.stringify(state))));
        } catch (e) {
          // ignore
        }
      }

      window.loadFromUrl = function () {
        var hash = location.hash.slice(1);
        if (!hash) return false;
        try {
          var state = JSON.parse(decodeURIComponent(atob(hash)));
          if (state.base) baseImageEl.value = state.base;
          if (state.work) workdirEl.value = state.work;
          if (state.port !== undefined) portEl.value = state.port;
          if (state.cmd !== undefined) cmdEl.value = state.cmd;
          if (state.env !== undefined) envVarsEl.value = state.env;
          if (state.run !== undefined) runCommandsEl.value = state.run;
          if (state.multi !== undefined) useMultiStageEl.checked = state.multi;
          if (state.nonRoot !== undefined) nonRootEl.checked = state.nonRoot;
          if (state.health !== undefined) healthCheckEl.checked = state.health;
          return true;
        } catch (e) {
          // ignore
        }
        return false;
      };

      // Theme
      window.toggleTheme = function () {
        var html = document.documentElement;
        var btn = document.querySelector(".theme-toggle");
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      };

      // Init
      (function () {
        var saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          var btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }

        if (!loadFromUrl()) {
          applyTemplate("node");
        } else {
          generate();
        }
      })();
    
