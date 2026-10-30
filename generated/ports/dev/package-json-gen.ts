// @ts-nocheck
// Generated from tools/dev/package-json-gen.html
// Source SHA-256: 54ae8724093d484539da335df368aa699f1ff8678da6ad4531ccefe7f5fbb426
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let scripts = [];
      let dependencies = [];
      let devDependencies = [];
      let scriptId = 0;
      let depId = 0;

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
        express: {
          scripts: [
            { name: "start", cmd: "node index.js" },
            { name: "dev", cmd: "nodemon index.js" }
          ],
          deps: ["express", "cors", "dotenv"],
          devDeps: ["nodemon"]
        },
        react: {
          type: "module",
          scripts: [
            { name: "dev", cmd: "vite" },
            { name: "build", cmd: "vite build" },
            { name: "preview", cmd: "vite preview" }
          ],
          deps: ["react", "react-dom"],
          devDeps: ["vite", "@vitejs/plugin-react"]
        },
        vue: {
          type: "module",
          scripts: [
            { name: "dev", cmd: "vite" },
            { name: "build", cmd: "vite build" },
            { name: "preview", cmd: "vite preview" }
          ],
          deps: ["vue"],
          devDeps: ["vite", "@vitejs/plugin-vue"]
        },
        typescript: {
          scripts: [
            { name: "build", cmd: "tsc" },
            { name: "dev", cmd: "ts-node src/index.ts" },
            { name: "start", cmd: "node dist/index.js" }
          ],
          deps: [],
          devDeps: ["typescript", "@types/node", "ts-node"]
        },
        cli: {
          scripts: [
            { name: "build", cmd: "tsc" },
            { name: "start", cmd: "node dist/index.js" }
          ],
          deps: ["commander", "chalk"],
          devDeps: ["typescript", "@types/node"]
        },
        api: {
          scripts: [
            { name: "start", cmd: "node dist/index.js" },
            { name: "dev", cmd: "ts-node-dev src/index.ts" },
            { name: "build", cmd: "tsc" }
          ],
          deps: ["express", "cors", "helmet", "dotenv"],
          devDeps: ["typescript", "@types/node", "@types/express", "@types/cors", "ts-node-dev"]
        }
      };

      window.addTemplate = function (type) {
        const tpl = templates[type];
        if (!tpl) return;

        if (tpl.type) {
          document.getElementById("pkgType").value = tpl.type;
        }

        tpl.scripts.forEach((s) => addScript(s));
        tpl.deps.forEach((d) => quickAddDep(d, "dep"));
        tpl.devDeps.forEach((d) => quickAddDep(d, "dev"));

        generateOutput();
      };

      window.addScript = function (template = null) {
        const id = scriptId++;
        scripts.push({
          id,
          name: template?.name || "",
          cmd: template?.cmd || ""
        });
        renderScripts();
        generateOutput();
      };

      window.removeScript = function (id) {
        scripts = scripts.filter((s) => s.id !== id);
        renderScripts();
        generateOutput();
      };

      function renderScripts() {
        const container = document.getElementById("scriptsContainer");
        container.replaceChildren();

        scripts.forEach((script) => {
          const row = document.createElement("div");
          row.className = "script-row";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.className = "script-name";
          nameInput.value = script.name;
          nameInput.placeholder = "脚本名";
          nameInput.onchange = (e) => {
            script.name = e.target.value;
            generateOutput();
          };

          const cmdInput = document.createElement("input");
          cmdInput.type = "text";
          cmdInput.className = "script-cmd";
          cmdInput.value = script.cmd;
          cmdInput.placeholder = "命令";
          cmdInput.onchange = (e) => {
            script.cmd = e.target.value;
            generateOutput();
          };

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.style.padding = "0.25rem 0.5rem";
          delBtn.textContent = "×";
          delBtn.onclick = () => removeScript(script.id);

          row.appendChild(nameInput);
          row.appendChild(cmdInput);
          row.appendChild(delBtn);
          container.appendChild(row);
        });
      }

      function addDependency(type, template = null) {
        const id = depId++;
        const dep = {
          id,
          name: template?.name || "",
          version: template?.version || "^"
        };

        if (type === "dep") {
          dependencies.push(dep);
          renderDependencies();
        } else {
          devDependencies.push(dep);
          renderDevDependencies();
        }
        generateOutput();
      }

      function quickAddDep(name, type) {
        const list = type === "dep" ? dependencies : devDependencies;
        if (list.some((d) => d.name === name)) return;

        addDependency(type, { name, version: "^" });
      }

      function removeDependency(id, type) {
        if (type === "dep") {
          dependencies = dependencies.filter((d) => d.id !== id);
          renderDependencies();
        } else {
          devDependencies = devDependencies.filter((d) => d.id !== id);
          renderDevDependencies();
        }
        generateOutput();
      }

      function renderDependencies() {
        renderDepList("depsContainer", dependencies, "dep");
      }

      function renderDevDependencies() {
        renderDepList("devDepsContainer", devDependencies, "dev");
      }

      function renderDepList(containerId, list, type) {
        const container = document.getElementById(containerId);
        container.replaceChildren();

        list.forEach((dep) => {
          const row = document.createElement("div");
          row.className = "dep-row";

          const nameInput = document.createElement("input");
          nameInput.type = "text";
          nameInput.className = "dep-name";
          nameInput.value = dep.name;
          nameInput.placeholder = "包名";
          nameInput.onchange = (e) => {
            dep.name = e.target.value;
            generateOutput();
          };

          const versionInput = document.createElement("input");
          versionInput.type = "text";
          versionInput.className = "dep-version";
          versionInput.value = dep.version;
          versionInput.placeholder = "^1.0.0";
          versionInput.onchange = (e) => {
            dep.version = e.target.value;
            generateOutput();
          };

          const delBtn = document.createElement("button");
          delBtn.className = "outline secondary";
          delBtn.style.padding = "0.25rem 0.5rem";
          delBtn.textContent = "×";
          delBtn.onclick = () => removeDependency(dep.id, type);

          row.appendChild(nameInput);
          row.appendChild(versionInput);
          row.appendChild(delBtn);
          container.appendChild(row);
        });
      }

      function generateOutput() {
        const pkg = {};

        // Basic info
        const name = document.getElementById("pkgName").value.trim();
        if (name) pkg.name = name;

        const version = document.getElementById("pkgVersion").value.trim();
        if (version) pkg.version = version;

        const description = document.getElementById("pkgDescription").value.trim();
        if (description) pkg.description = description;

        const main = document.getElementById("pkgMain").value.trim();
        if (main) pkg.main = main;

        const type = document.getElementById("pkgType").value;
        if (type) pkg.type = type;

        if (document.getElementById("pkgPrivate").checked) {
          pkg.private = true;
        }

        // Scripts
        if (scripts.length > 0) {
          const validScripts = scripts.filter((s) => s.name && s.cmd);
          if (validScripts.length > 0) {
            pkg.scripts = {};
            validScripts.forEach((s) => {
              pkg.scripts[s.name] = s.cmd;
            });
          }
        }

        // Keywords
        const keywords = document.getElementById("pkgKeywords").value.trim();
        if (keywords) {
          pkg.keywords = keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k);
        }

        // Author
        const author = document.getElementById("pkgAuthor").value.trim();
        if (author) pkg.author = author;

        // License
        pkg.license = document.getElementById("pkgLicense").value;

        // Repository
        const repository = document.getElementById("pkgRepository").value.trim();
        if (repository) {
          pkg.repository = {
            type: "git",
            url: repository
          };
        }

        // Homepage
        const homepage = document.getElementById("pkgHomepage").value.trim();
        if (homepage) pkg.homepage = homepage;

        // Bugs
        const bugs = document.getElementById("pkgBugs").value.trim();
        if (bugs) pkg.bugs = { url: bugs };

        // Engines
        const nodeEngine = document.getElementById("pkgNodeEngine").value.trim();
        const npmEngine = document.getElementById("pkgNpmEngine").value.trim();
        if (nodeEngine || npmEngine) {
          pkg.engines = {};
          if (nodeEngine) pkg.engines.node = nodeEngine;
          if (npmEngine) pkg.engines.npm = npmEngine;
        }

        // Bin
        const bin = document.getElementById("pkgBin").value.trim();
        if (bin && main) {
          pkg.bin = {};
          pkg.bin[bin] = main;
        }

        // Files
        const files = document.getElementById("pkgFiles").value.trim();
        if (files) {
          pkg.files = files
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f);
        }

        // Dependencies
        if (dependencies.length > 0) {
          const validDeps = dependencies.filter((d) => d.name);
          if (validDeps.length > 0) {
            pkg.dependencies = {};
            validDeps.forEach((d) => {
              pkg.dependencies[d.name] = d.version || "*";
            });
          }
        }

        // DevDependencies
        if (devDependencies.length > 0) {
          const validDevDeps = devDependencies.filter((d) => d.name);
          if (validDevDeps.length > 0) {
            pkg.devDependencies = {};
            validDevDeps.forEach((d) => {
              pkg.devDependencies[d.name] = d.version || "*";
            });
          }
        }

        document.getElementById("output").textContent = JSON.stringify(pkg, null, 2);

        // Generate install command
        let installCmd = "";
        const depNames = dependencies.filter((d) => d.name).map((d) => d.name);
        const devDepNames = devDependencies.filter((d) => d.name).map((d) => d.name);

        if (depNames.length > 0) {
          installCmd += "npm install " + depNames.join(" ") + "\n";
        }
        if (devDepNames.length > 0) {
          installCmd += "npm install -D " + devDepNames.join(" ");
        }

        document.getElementById("installCmd").textContent = installCmd.trim() || "# 暂无依赖";
      }

      window.copyOutput = function () {
        const output = document.getElementById("output").textContent;
        navigator.clipboard.writeText(output).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      window.copyInstallCmd = function () {
        const cmd = document.getElementById("installCmd").textContent;
        navigator.clipboard.writeText(cmd).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      window.downloadFile = function () {
        const output = document.getElementById("output").textContent;
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "package.json";
        a.click();
        URL.revokeObjectURL(url);
      };

      // Initialize with some default scripts
      addScript({ name: "start", cmd: "node index.js" });
      addScript({ name: "test", cmd: 'echo "Error: no test specified" && exit 1' });
      generateOutput();
    
