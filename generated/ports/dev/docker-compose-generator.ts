// @ts-nocheck
// Generated from tools/dev/docker-compose-generator.html
// Source SHA-256: c7480fabe3b81271532b597544ddc4e18d3e8c90b740ab9d1821848f78d31e2c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 服务数据
      let services = [];
      let editingIndex = -1;
      let tempPorts = [];
      let tempEnvs = [];
      let tempVolumes = [];

      // 服务模板
      const templates = {
        nginx: {
          name: "nginx",
          image: "nginx:alpine",
          ports: ["80:80", "443:443"],
          volumes: ["./nginx.conf:/etc/nginx/nginx.conf:ro", "./html:/usr/share/nginx/html"],
          restart: "unless-stopped"
        },
        mysql: {
          name: "mysql",
          image: "mysql:8.0",
          ports: ["3306:3306"],
          environment: ["MYSQL_ROOT_PASSWORD=root123", "MYSQL_DATABASE=app"],
          volumes: ["mysql_data:/var/lib/mysql"],
          restart: "unless-stopped"
        },
        postgres: {
          name: "postgres",
          image: "postgres:15-alpine",
          ports: ["5432:5432"],
          environment: ["POSTGRES_USER=postgres", "POSTGRES_PASSWORD=postgres", "POSTGRES_DB=app"],
          volumes: ["postgres_data:/var/lib/postgresql/data"],
          restart: "unless-stopped"
        },
        redis: {
          name: "redis",
          image: "redis:7-alpine",
          ports: ["6379:6379"],
          volumes: ["redis_data:/data"],
          restart: "unless-stopped"
        },
        mongo: {
          name: "mongo",
          image: "mongo:6",
          ports: ["27017:27017"],
          environment: ["MONGO_INITDB_ROOT_USERNAME=root", "MONGO_INITDB_ROOT_PASSWORD=root123"],
          volumes: ["mongo_data:/data/db"],
          restart: "unless-stopped"
        },
        node: {
          name: "app",
          image: "node:20-alpine",
          ports: ["3000:3000"],
          volumes: [".:/app", "/app/node_modules"],
          environment: ["NODE_ENV=development"],
          command: "npm run dev"
        },
        python: {
          name: "app",
          image: "python:3.11-slim",
          ports: ["8000:8000"],
          volumes: [".:/app"],
          environment: ["PYTHONUNBUFFERED=1"],
          command: "python main.py"
        },
        php: {
          name: "php",
          image: "php:8.2-fpm",
          volumes: ["./src:/var/www/html"],
          restart: "unless-stopped"
        },
        rabbitmq: {
          name: "rabbitmq",
          image: "rabbitmq:3-management-alpine",
          ports: ["5672:5672", "15672:15672"],
          environment: ["RABBITMQ_DEFAULT_USER=admin", "RABBITMQ_DEFAULT_PASS=admin123"],
          volumes: ["rabbitmq_data:/var/lib/rabbitmq"],
          restart: "unless-stopped"
        },
        elasticsearch: {
          name: "elasticsearch",
          image: "elasticsearch:8.11.0",
          ports: ["9200:9200"],
          environment: [
            "discovery.type=single-node",
            "ES_JAVA_OPTS=-Xms512m -Xmx512m",
            "xpack.security.enabled=false"
          ],
          volumes: ["es_data:/usr/share/elasticsearch/data"],
          restart: "unless-stopped"
        },
        minio: {
          name: "minio",
          image: "minio/minio:latest",
          ports: ["9000:9000", "9001:9001"],
          environment: ["MINIO_ROOT_USER=minioadmin", "MINIO_ROOT_PASSWORD=minioadmin"],
          volumes: ["minio_data:/data"],
          command: 'server /data --console-address ":9001"',
          restart: "unless-stopped"
        },
        custom: {
          name: "service",
          image: "",
          ports: [],
          environment: [],
          volumes: []
        }
      };

      window.addTemplate = function (type) {
        const template = JSON.parse(JSON.stringify(templates[type]));

        // 确保名称唯一
        let baseName = template.name;
        let counter = 1;
        while (services.some((s) => s.name === template.name)) {
          template.name = baseName + counter;
          counter++;
        }

        editingIndex = -1;
        openModal(template);
      };

      function openModal(service) {
        document.getElementById("modalTitle").textContent =
          editingIndex === -1 ? "添加服务" : "编辑服务";
        document.getElementById("serviceName").value = service.name || "";
        document.getElementById("serviceImage").value = service.image || "";
        document.getElementById("containerName").value = service.container_name || "";
        document.getElementById("restartPolicy").value = service.restart || "";
        document.getElementById("dependsOn").value = (service.depends_on || []).join(", ");

        tempPorts = service.ports || [];
        tempEnvs = service.environment || [];
        tempVolumes = service.volumes || [];

        renderPorts();
        renderEnvs();
        renderVolumes();

        document.getElementById("editModal").classList.add("active");
      }

      window.closeModal = function () {
        document.getElementById("editModal").classList.remove("active");
      };

      function renderPorts() {
        const container = document.getElementById("portsList");
        container.innerHTML = tempPorts
          .map(
            (port, i) => `
                <div class="list-item">
                    <input type="text" value="${port}" onchange="tempPorts[${i}]=this.value" placeholder="主机端口:容器端口">
                    <button onclick="tempPorts.splice(${i},1);renderPorts()">×</button>
                </div>
            `
          )
          .join("");
      }

      window.addPort = function () {
        tempPorts.push("");
        renderPorts();
      };

      function renderEnvs() {
        const container = document.getElementById("envList");
        container.innerHTML = tempEnvs
          .map(
            (env, i) => `
                <div class="list-item">
                    <input type="text" value="${env}" onchange="tempEnvs[${i}]=this.value" placeholder="KEY=value">
                    <button onclick="tempEnvs.splice(${i},1);renderEnvs()">×</button>
                </div>
            `
          )
          .join("");
      }

      window.addEnv = function () {
        tempEnvs.push("");
        renderEnvs();
      };

      function renderVolumes() {
        const container = document.getElementById("volumesList");
        container.innerHTML = tempVolumes
          .map(
            (vol, i) => `
                <div class="list-item">
                    <input type="text" value="${vol}" onchange="tempVolumes[${i}]=this.value" placeholder="主机路径:容器路径">
                    <button onclick="tempVolumes.splice(${i},1);renderVolumes()">×</button>
                </div>
            `
          )
          .join("");
      }

      window.addVolume = function () {
        tempVolumes.push("");
        renderVolumes();
      };

      window.saveService = function () {
        const name = document.getElementById("serviceName").value.trim();
        const image = document.getElementById("serviceImage").value.trim();

        if (!name) {
          alert("请输入服务名称");
          return;
        }
        if (!image) {
          alert("请输入镜像名称");
          return;
        }

        // 检查名称重复
        const isDuplicate = services.some((s, i) => s.name === name && i !== editingIndex);
        if (isDuplicate) {
          alert("服务名称已存在");
          return;
        }

        const service = {
          name,
          image,
          container_name: document.getElementById("containerName").value.trim(),
          ports: tempPorts.filter((p) => p.trim()),
          environment: tempEnvs.filter((e) => e.trim()),
          volumes: tempVolumes.filter((v) => v.trim()),
          restart: document.getElementById("restartPolicy").value,
          depends_on: document
            .getElementById("dependsOn")
            .value.split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        };

        if (editingIndex === -1) {
          services.push(service);
        } else {
          services[editingIndex] = service;
        }

        closeModal();
        renderServices();
        generateOutput();
      };

      function renderServices() {
        const container = document.getElementById("servicesList");

        if (services.length === 0) {
          container.innerHTML =
            '<p style="color: var(--color-text-secondary); text-align: center; padding: 2rem;">点击上方模板添加服务</p>';
          return;
        }

        container.innerHTML = services
          .map(
            (s, i) => `
                <div class="service-item">
                    <div class="service-header">
                        <span class="service-name">${s.name}</span>
                        <div class="service-actions">
                            <button onclick="editService(${i})" title="编辑">✏️</button>
                            <button onclick="removeService(${i})" title="删除">🗑️</button>
                        </div>
                    </div>
                    <div class="service-detail">
                        ${s.image}
                        ${s.ports.length ? " • " + s.ports.join(", ") : ""}
                    </div>
                </div>
            `
          )
          .join("");
      }

      window.editService = function (index) {
        editingIndex = index;
        openModal(services[index]);
      };

      window.removeService = function (index) {
        services.splice(index, 1);
        renderServices();
        generateOutput();
      };

      window.clearAll = function () {
        if (services.length && confirm("确定清空所有服务吗？")) {
          services = [];
          renderServices();
          generateOutput();
        }
      };

      function generateOutput() {
        if (services.length === 0) {
          document.getElementById("output").value = `version: '3.8'

services:
  # 点击左侧模板添加服务

networks:
  default:
    driver: bridge
`;
          return;
        }

        let yaml = "version: '3.8'\n\nservices:\n";

        // 收集命名卷
        const namedVolumes = new Set();

        services.forEach((s) => {
          yaml += `  ${s.name}:\n`;
          yaml += `    image: ${s.image}\n`;

          if (s.container_name) {
            yaml += `    container_name: ${s.container_name}\n`;
          }

          if (s.ports && s.ports.length) {
            yaml += "    ports:\n";
            s.ports.forEach((p) => (yaml += `      - "${p}"\n`));
          }

          if (s.environment && s.environment.length) {
            yaml += "    environment:\n";
            s.environment.forEach((e) => (yaml += `      - ${e}\n`));
          }

          if (s.volumes && s.volumes.length) {
            yaml += "    volumes:\n";
            s.volumes.forEach((v) => {
              yaml += `      - ${v}\n`;
              // 检测命名卷
              const parts = v.split(":");
              if (parts[0] && !parts[0].startsWith(".") && !parts[0].startsWith("/")) {
                namedVolumes.add(parts[0]);
              }
            });
          }

          if (s.restart) {
            yaml += `    restart: ${s.restart}\n`;
          }

          if (s.depends_on && s.depends_on.length) {
            yaml += "    depends_on:\n";
            s.depends_on.forEach((d) => (yaml += `      - ${d}\n`));
          }

          if (s.command) {
            yaml += `    command: ${s.command}\n`;
          }

          yaml += "\n";
        });

        // 添加命名卷定义
        if (namedVolumes.size > 0) {
          yaml += "volumes:\n";
          namedVolumes.forEach((v) => (yaml += `  ${v}:\n`));
          yaml += "\n";
        }

        yaml += "networks:\n  default:\n    driver: bridge\n";

        document.getElementById("output").value = yaml;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output");
        navigator.clipboard.writeText(output.value).then(() => {
          alert("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const output = document.getElementById("output").value;
        const blob = new Blob([output], { type: "text/yaml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "docker-compose.yml";
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
      })();
    
