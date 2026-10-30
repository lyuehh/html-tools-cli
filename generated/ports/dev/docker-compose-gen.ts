// @ts-nocheck
// Generated from tools/dev/docker-compose-gen.html
// Source SHA-256: 49706e37efc476453a606288ab0cb7e9ef216bb255d8046fe0f380da10578c83
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let services = [];
      let networks = [];
      let volumes = [];
      let serviceId = 0;
      let networkId = 0;
      let volumeId = 0;

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      // 服务模板
      const templates = {
        nginx: {
          name: "nginx",
          image: "nginx:alpine",
          ports: [{ host: "80", container: "80" }],
          volumes: [{ host: "./nginx.conf", container: "/etc/nginx/nginx.conf", readonly: true }]
        },
        mysql: {
          name: "mysql",
          image: "mysql:8.0",
          ports: [{ host: "3306", container: "3306" }],
          environment: [
            { key: "MYSQL_ROOT_PASSWORD", value: "rootpassword" },
            { key: "MYSQL_DATABASE", value: "mydb" }
          ],
          volumes: [{ host: "mysql_data", container: "/var/lib/mysql", readonly: false }]
        },
        postgres: {
          name: "postgres",
          image: "postgres:15-alpine",
          ports: [{ host: "5432", container: "5432" }],
          environment: [
            { key: "POSTGRES_PASSWORD", value: "postgres" },
            { key: "POSTGRES_DB", value: "mydb" }
          ],
          volumes: [
            { host: "postgres_data", container: "/var/lib/postgresql/data", readonly: false }
          ]
        },
        redis: {
          name: "redis",
          image: "redis:alpine",
          ports: [{ host: "6379", container: "6379" }],
          volumes: [{ host: "redis_data", container: "/data", readonly: false }]
        },
        mongo: {
          name: "mongo",
          image: "mongo:6",
          ports: [{ host: "27017", container: "27017" }],
          environment: [
            { key: "MONGO_INITDB_ROOT_USERNAME", value: "root" },
            { key: "MONGO_INITDB_ROOT_PASSWORD", value: "rootpassword" }
          ],
          volumes: [{ host: "mongo_data", container: "/data/db", readonly: false }]
        },
        node: {
          name: "app",
          image: "node:18-alpine",
          ports: [{ host: "3000", container: "3000" }],
          volumes: [{ host: ".", container: "/app", readonly: false }],
          workingDir: "/app",
          command: "npm start"
        },
        python: {
          name: "app",
          image: "python:3.11-slim",
          ports: [{ host: "8000", container: "8000" }],
          volumes: [{ host: ".", container: "/app", readonly: false }],
          workingDir: "/app",
          command: "python app.py"
        },
        php: {
          name: "php",
          image: "php:8.2-fpm",
          volumes: [{ host: "./src", container: "/var/www/html", readonly: false }]
        }
      };

      window.addTemplate = function (type) {
        const template = templates[type];
        if (template) {
          addService(template);
        }
      };

      function addService(template = null) {
        const id = serviceId++;
        const service = {
          id,
          name: template?.name || "service_" + id,
          image: template?.image || "",
          ports: template?.ports ? JSON.parse(JSON.stringify(template.ports)) : [],
          environment: template?.environment
            ? JSON.parse(JSON.stringify(template.environment))
            : [],
          volumes: template?.volumes ? JSON.parse(JSON.stringify(template.volumes)) : [],
          dependsOn: [],
          restart: "unless-stopped",
          workingDir: template?.workingDir || "",
          command: template?.command || "",
          networks: []
        };
        services.push(service);
        renderServices();
        generateOutput();
      }

      window.removeService = function (id) {
        services = services.filter((s) => s.id !== id);
        renderServices();
        generateOutput();
      };

      function renderServices() {
        const container = document.getElementById("servicesContainer");
        container.replaceChildren();

        services.forEach((service) => {
          const card = document.createElement("div");
          card.className = "service-card";

          // Header
          const header = document.createElement("div");
          header.className = "service-header";
          const title = document.createElement("h4");
          title.textContent = "🔧 " + service.name;
          const deleteBtn = document.createElement("button");
          deleteBtn.className = "outline secondary";
          deleteBtn.textContent = "删除";
          deleteBtn.onclick = () => removeService(service.id);
          header.appendChild(title);
          header.appendChild(deleteBtn);
          card.appendChild(header);

          // Name and Image inputs
          const gridDiv = document.createElement("div");
          gridDiv.className = "grid";

          const nameLabel = document.createElement("label");
          nameLabel.textContent = "服务名称";
          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = service.name;
          nameInput.onchange = (e) => updateService(service.id, "name", e.target.value);
          nameLabel.appendChild(nameInput);

          const imageLabel = document.createElement("label");
          imageLabel.textContent = "镜像";
          const imageInput = document.createElement("input");
          imageInput.type = "text";
          imageInput.value = service.image;
          imageInput.placeholder = "nginx:alpine";
          imageInput.onchange = (e) => updateService(service.id, "image", e.target.value);
          imageLabel.appendChild(imageInput);

          gridDiv.appendChild(nameLabel);
          gridDiv.appendChild(imageLabel);
          card.appendChild(gridDiv);

          // Ports details
          const portsDetails = document.createElement("details");
          const portsSummary = document.createElement("summary");
          portsSummary.textContent = "端口映射 (" + service.ports.length + ")";
          portsDetails.appendChild(portsSummary);

          const portsDiv = document.createElement("div");
          service.ports.forEach((p, i) => {
            const row = createPortRow(service.id, p, i);
            portsDiv.appendChild(row);
          });
          portsDetails.appendChild(portsDiv);

          const addPortBtn = document.createElement("button");
          addPortBtn.className = "outline";
          addPortBtn.textContent = "+ 添加端口";
          addPortBtn.onclick = () => addServicePort(service.id);
          portsDetails.appendChild(addPortBtn);
          card.appendChild(portsDetails);

          // Environment details
          const envDetails = document.createElement("details");
          const envSummary = document.createElement("summary");
          envSummary.textContent = "环境变量 (" + service.environment.length + ")";
          envDetails.appendChild(envSummary);

          const envDiv = document.createElement("div");
          service.environment.forEach((e, i) => {
            const row = createEnvRow(service.id, e, i);
            envDiv.appendChild(row);
          });
          envDetails.appendChild(envDiv);

          const addEnvBtn = document.createElement("button");
          addEnvBtn.className = "outline";
          addEnvBtn.textContent = "+ 添加变量";
          addEnvBtn.onclick = () => addServiceEnv(service.id);
          envDetails.appendChild(addEnvBtn);
          card.appendChild(envDetails);

          // Volumes details
          const volDetails = document.createElement("details");
          const volSummary = document.createElement("summary");
          volSummary.textContent = "数据卷 (" + service.volumes.length + ")";
          volDetails.appendChild(volSummary);

          const volDiv = document.createElement("div");
          service.volumes.forEach((v, i) => {
            const row = createVolumeRow(service.id, v, i);
            volDiv.appendChild(row);
          });
          volDetails.appendChild(volDiv);

          const addVolBtn = document.createElement("button");
          addVolBtn.className = "outline";
          addVolBtn.textContent = "+ 添加数据卷";
          addVolBtn.onclick = () => addServiceVol(service.id);
          volDetails.appendChild(addVolBtn);
          card.appendChild(volDetails);

          // Advanced options
          const advDetails = document.createElement("details");
          const advSummary = document.createElement("summary");
          advSummary.textContent = "高级选项";
          advDetails.appendChild(advSummary);

          // Restart policy
          const restartLabel = document.createElement("label");
          restartLabel.textContent = "重启策略";
          const restartSelect = document.createElement("select");
          ["no", "always", "on-failure", "unless-stopped"].forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            option.selected = service.restart === opt;
            restartSelect.appendChild(option);
          });
          restartSelect.onchange = (e) => updateService(service.id, "restart", e.target.value);
          restartLabel.appendChild(restartSelect);
          advDetails.appendChild(restartLabel);

          // Working directory
          const wdLabel = document.createElement("label");
          wdLabel.textContent = "工作目录";
          const wdInput = document.createElement("input");
          wdInput.type = "text";
          wdInput.value = service.workingDir;
          wdInput.placeholder = "/app";
          wdInput.onchange = (e) => updateService(service.id, "workingDir", e.target.value);
          wdLabel.appendChild(wdInput);
          advDetails.appendChild(wdLabel);

          // Command
          const cmdLabel = document.createElement("label");
          cmdLabel.textContent = "启动命令";
          const cmdInput = document.createElement("input");
          cmdInput.type = "text";
          cmdInput.value = service.command;
          cmdInput.placeholder = "npm start";
          cmdInput.onchange = (e) => updateService(service.id, "command", e.target.value);
          cmdLabel.appendChild(cmdInput);
          advDetails.appendChild(cmdLabel);

          // Depends on
          const depLabel = document.createElement("label");
          depLabel.textContent = "依赖服务";
          const depSelect = document.createElement("select");
          depSelect.multiple = true;
          services
            .filter((s) => s.id !== service.id)
            .forEach((s) => {
              const option = document.createElement("option");
              option.value = s.name;
              option.textContent = s.name;
              option.selected = service.dependsOn.includes(s.name);
              depSelect.appendChild(option);
            });
          depSelect.onchange = (e) => {
            const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
            service.dependsOn = selected;
            generateOutput();
          };
          depLabel.appendChild(depSelect);
          advDetails.appendChild(depLabel);

          card.appendChild(advDetails);
          container.appendChild(card);
        });
      }

      function createPortRow(serviceId, port, index) {
        const row = document.createElement("div");
        row.className = "port-row";

        const hostInput = document.createElement("input");
        hostInput.type = "text";
        hostInput.value = port.host;
        hostInput.placeholder = "主机端口";
        hostInput.className = "small-input";
        hostInput.onchange = (e) => updateServicePort(serviceId, index, "host", e.target.value);

        const sep = document.createElement("span");
        sep.textContent = ":";

        const containerInput = document.createElement("input");
        containerInput.type = "text";
        containerInput.value = port.container;
        containerInput.placeholder = "容器端口";
        containerInput.className = "small-input";
        containerInput.onchange = (e) =>
          updateServicePort(serviceId, index, "container", e.target.value);

        const delBtn = document.createElement("button");
        delBtn.className = "outline secondary";
        delBtn.textContent = "×";
        delBtn.onclick = () => removeServicePort(serviceId, index);

        row.appendChild(hostInput);
        row.appendChild(sep);
        row.appendChild(containerInput);
        row.appendChild(delBtn);
        return row;
      }

      function createEnvRow(serviceId, env, index) {
        const row = document.createElement("div");
        row.className = "env-row";

        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.value = env.key;
        keyInput.placeholder = "变量名";
        keyInput.onchange = (e) => updateServiceEnv(serviceId, index, "key", e.target.value);

        const sep = document.createElement("span");
        sep.textContent = "=";

        const valInput = document.createElement("input");
        valInput.type = "text";
        valInput.value = env.value;
        valInput.placeholder = "值";
        valInput.onchange = (e) => updateServiceEnv(serviceId, index, "value", e.target.value);

        const delBtn = document.createElement("button");
        delBtn.className = "outline secondary";
        delBtn.textContent = "×";
        delBtn.onclick = () => removeServiceEnv(serviceId, index);

        row.appendChild(keyInput);
        row.appendChild(sep);
        row.appendChild(valInput);
        row.appendChild(delBtn);
        return row;
      }

      function createVolumeRow(serviceId, vol, index) {
        const row = document.createElement("div");
        row.className = "volume-row";

        const hostInput = document.createElement("input");
        hostInput.type = "text";
        hostInput.value = vol.host;
        hostInput.placeholder = "主机路径";
        hostInput.onchange = (e) => updateServiceVol(serviceId, index, "host", e.target.value);

        const sep = document.createElement("span");
        sep.textContent = ":";

        const containerInput = document.createElement("input");
        containerInput.type = "text";
        containerInput.value = vol.container;
        containerInput.placeholder = "容器路径";
        containerInput.onchange = (e) =>
          updateServiceVol(serviceId, index, "container", e.target.value);

        const roLabel = document.createElement("label");
        roLabel.style.cssText = "margin:0;display:flex;align-items:center;gap:0.25rem;";
        const roCheck = document.createElement("input");
        roCheck.type = "checkbox";
        roCheck.checked = vol.readonly;
        roCheck.onchange = (e) => updateServiceVol(serviceId, index, "readonly", e.target.checked);
        roLabel.appendChild(roCheck);
        roLabel.appendChild(document.createTextNode("只读"));

        const delBtn = document.createElement("button");
        delBtn.className = "outline secondary";
        delBtn.textContent = "×";
        delBtn.onclick = () => removeServiceVol(serviceId, index);

        row.appendChild(hostInput);
        row.appendChild(sep);
        row.appendChild(containerInput);
        row.appendChild(roLabel);
        row.appendChild(delBtn);
        return row;
      }

      function updateService(id, field, value) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service[field] = value;
          if (field === "name") renderServices();
          generateOutput();
        }
      }

      // 端口操作
      function addServicePort(id) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.ports.push({ host: "", container: "" });
          renderServices();
          generateOutput();
        }
      }

      function updateServicePort(id, index, field, value) {
        const service = services.find((s) => s.id === id);
        if (service && service.ports[index]) {
          service.ports[index][field] = value;
          generateOutput();
        }
      }

      function removeServicePort(id, index) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.ports.splice(index, 1);
          renderServices();
          generateOutput();
        }
      }

      // 环境变量操作
      function addServiceEnv(id) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.environment.push({ key: "", value: "" });
          renderServices();
          generateOutput();
        }
      }

      function updateServiceEnv(id, index, field, value) {
        const service = services.find((s) => s.id === id);
        if (service && service.environment[index]) {
          service.environment[index][field] = value;
          generateOutput();
        }
      }

      function removeServiceEnv(id, index) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.environment.splice(index, 1);
          renderServices();
          generateOutput();
        }
      }

      // 数据卷操作
      function addServiceVol(id) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.volumes.push({ host: "", container: "", readonly: false });
          renderServices();
          generateOutput();
        }
      }

      function updateServiceVol(id, index, field, value) {
        const service = services.find((s) => s.id === id);
        if (service && service.volumes[index]) {
          service.volumes[index][field] = value;
          generateOutput();
        }
      }

      function removeServiceVol(id, index) {
        const service = services.find((s) => s.id === id);
        if (service) {
          service.volumes.splice(index, 1);
          renderServices();
          generateOutput();
        }
      }

      // 网络配置
      window.addNetwork = function () {
        const id = networkId++;
        networks.push({
          id,
          name: "network_" + id,
          driver: "bridge"
        });
        renderNetworks();
        generateOutput();
      };

      function removeNetwork(id) {
        networks = networks.filter((n) => n.id !== id);
        renderNetworks();
        generateOutput();
      }

      function renderNetworks() {
        const container = document.getElementById("networksContainer");
        container.replaceChildren();

        networks.forEach((network) => {
          const card = document.createElement("div");
          card.className = "service-card";

          const grid = document.createElement("div");
          grid.className = "grid";

          const nameLabel = document.createElement("label");
          nameLabel.textContent = "网络名称";
          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = network.name;
          nameInput.onchange = (e) => updateNetwork(network.id, "name", e.target.value);
          nameLabel.appendChild(nameInput);

          const driverLabel = document.createElement("label");
          driverLabel.textContent = "驱动";
          const driverSelect = document.createElement("select");
          ["bridge", "host", "overlay", "none"].forEach((d) => {
            const opt = document.createElement("option");
            opt.value = d;
            opt.textContent = d;
            opt.selected = network.driver === d;
            driverSelect.appendChild(opt);
          });
          driverSelect.onchange = (e) => updateNetwork(network.id, "driver", e.target.value);
          driverLabel.appendChild(driverSelect);

          grid.appendChild(nameLabel);
          grid.appendChild(driverLabel);
          card.appendChild(grid);

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.textContent = "删除网络";
          delBtn.onclick = () => removeNetwork(network.id);
          card.appendChild(delBtn);

          container.appendChild(card);
        });
      }

      function updateNetwork(id, field, value) {
        const network = networks.find((n) => n.id === id);
        if (network) {
          network[field] = value;
          generateOutput();
        }
      }

      // 数据卷配置
      window.addVolume = function () {
        const id = volumeId++;
        volumes.push({
          id,
          name: "volume_" + id,
          driver: "local"
        });
        renderVolumes();
        generateOutput();
      };

      function removeVolume(id) {
        volumes = volumes.filter((v) => v.id !== id);
        renderVolumes();
        generateOutput();
      }

      function renderVolumes() {
        const container = document.getElementById("volumesContainer");
        container.replaceChildren();

        volumes.forEach((volume) => {
          const card = document.createElement("div");
          card.className = "service-card";

          const grid = document.createElement("div");
          grid.className = "grid";

          const nameLabel = document.createElement("label");
          nameLabel.textContent = "数据卷名称";
          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.value = volume.name;
          nameInput.onchange = (e) => updateVolume(volume.id, "name", e.target.value);
          nameLabel.appendChild(nameInput);

          const driverLabel = document.createElement("label");
          driverLabel.textContent = "驱动";
          const driverSelect = document.createElement("select");
          const opt = document.createElement("option");
          opt.value = "local";
          opt.textContent = "local";
          opt.selected = volume.driver === "local";
          driverSelect.appendChild(opt);
          driverSelect.onchange = (e) => updateVolume(volume.id, "driver", e.target.value);
          driverLabel.appendChild(driverSelect);

          grid.appendChild(nameLabel);
          grid.appendChild(driverLabel);
          card.appendChild(grid);

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.textContent = "删除数据卷";
          delBtn.onclick = () => removeVolume(volume.id);
          card.appendChild(delBtn);

          container.appendChild(card);
        });
      }

      function updateVolume(id, field, value) {
        const volume = volumes.find((v) => v.id === id);
        if (volume) {
          volume[field] = value;
          generateOutput();
        }
      }

      // 生成输出
      function generateOutput() {
        const version = document.getElementById("composeVersion").value;
        let yaml = 'version: "' + version + '"\n\n';

        if (services.length > 0) {
          yaml += "services:\n";
          services.forEach((service) => {
            yaml += "  " + service.name + ":\n";
            if (service.image) yaml += "    image: " + service.image + "\n";
            if (service.command) yaml += "    command: " + service.command + "\n";
            if (service.workingDir) yaml += "    working_dir: " + service.workingDir + "\n";
            if (service.restart) yaml += "    restart: " + service.restart + "\n";

            if (service.ports.length > 0) {
              const validPorts = service.ports.filter((p) => p.host && p.container);
              if (validPorts.length > 0) {
                yaml += "    ports:\n";
                validPorts.forEach((p) => {
                  yaml += '      - "' + p.host + ":" + p.container + '"\n';
                });
              }
            }

            if (service.environment.length > 0) {
              const validEnv = service.environment.filter((e) => e.key);
              if (validEnv.length > 0) {
                yaml += "    environment:\n";
                validEnv.forEach((e) => {
                  yaml += "      " + e.key + ": " + e.value + "\n";
                });
              }
            }

            if (service.volumes.length > 0) {
              const validVols = service.volumes.filter((v) => v.host && v.container);
              if (validVols.length > 0) {
                yaml += "    volumes:\n";
                validVols.forEach((v) => {
                  const ro = v.readonly ? ":ro" : "";
                  yaml += "      - " + v.host + ":" + v.container + ro + "\n";
                });
              }
            }

            if (service.dependsOn.length > 0) {
              yaml += "    depends_on:\n";
              service.dependsOn.forEach((d) => {
                yaml += "      - " + d + "\n";
              });
            }

            yaml += "\n";
          });
        }

        if (networks.length > 0) {
          yaml += "networks:\n";
          networks.forEach((network) => {
            yaml += "  " + network.name + ":\n";
            yaml += "    driver: " + network.driver + "\n";
          });
          yaml += "\n";
        }

        if (volumes.length > 0) {
          yaml += "volumes:\n";
          volumes.forEach((volume) => {
            yaml += "  " + volume.name + ":\n";
            yaml += "    driver: " + volume.driver + "\n";
          });
        }

        document.getElementById("output").textContent = yaml;
      }

      window.copyOutput = function () {
        const output = document.getElementById("output").textContent;
        navigator.clipboard.writeText(output).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      window.downloadFile = function () {
        const output = document.getElementById("output").textContent;
        const blob = new Blob([output], { type: "text/yaml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "docker-compose.yml";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 监听版本变化
      document.getElementById("composeVersion").addEventListener("change", generateOutput);

      // 初始化
      generateOutput();
    
