// @ts-nocheck
// Generated from tools/dev/package-json-editor.html
// Source SHA-256: 0f8aa6143ac8c84c153b11110537ea298810a798a7a536763f222017cf690e91
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let packageData = {
        name: "",
        version: "1.0.0",
        description: "",
        main: "index.js",
        scripts: { test: 'echo "Error: no test specified" && exit 1' },
        keywords: [],
        author: "",
        license: "MIT",
        dependencies: {},
        devDependencies: {}
      };

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

        ["basic", "deps", "scripts", "other"].forEach((t) => {
          document.getElementById(t + "Tab").style.display = t === tab ? "block" : "none";
        });
      };

      window.updateJson = function () {
        packageData.name = document.getElementById("name").value || undefined;
        packageData.version = document.getElementById("version").value || "1.0.0";
        packageData.description = document.getElementById("description").value || undefined;
        packageData.main = document.getElementById("main").value || undefined;
        packageData.author = document.getElementById("author").value || undefined;
        packageData.license = document.getElementById("license").value;

        const keywords = document.getElementById("keywords").value;
        packageData.keywords = keywords
          ? keywords
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k)
          : undefined;

        const repo = document.getElementById("repository").value;
        packageData.repository = repo ? { type: "git", url: repo } : undefined;

        const engineNode = document.getElementById("engineNode").value;
        packageData.engines = engineNode ? { node: engineNode } : undefined;

        const isPrivate = document.getElementById("private").value === "true";
        packageData.private = isPrivate || undefined;

        const type = document.getElementById("type").value;
        packageData.type = type || undefined;

        renderJson();
      };

      function renderJson() {
        const clean = Object.fromEntries(
          Object.entries(packageData).filter(
            ([k, v]) =>
              v !== undefined &&
              v !== "" &&
              !(Array.isArray(v) && v.length === 0) &&
              !(typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0)
          )
        );
        document.getElementById("jsonOutput").value = JSON.stringify(clean, null, 2);
      }

      window.parseJson = function () {
        try {
          const json = JSON.parse(document.getElementById("jsonOutput").value);
          packageData = { ...packageData, ...json };

          document.getElementById("name").value = json.name || "";
          document.getElementById("version").value = json.version || "1.0.0";
          document.getElementById("description").value = json.description || "";
          document.getElementById("main").value = json.main || "";
          document.getElementById("author").value = json.author || "";
          document.getElementById("license").value = json.license || "MIT";
          document.getElementById("keywords").value = (json.keywords || []).join(", ");
          document.getElementById("repository").value = json.repository?.url || "";
          document.getElementById("engineNode").value = json.engines?.node || "";
          document.getElementById("private").value = json.private ? "true" : "false";
          document.getElementById("type").value = json.type || "";

          renderDeps();
          renderScripts();
        } catch (e) {
          // Invalid JSON, ignore
        }
      };

      function renderDeps() {
        const depsList = document.getElementById("depsList");
        const devDepsList = document.getElementById("devDepsList");

        depsList.innerHTML =
          Object.entries(packageData.dependencies || {})
            .map(
              ([name, ver]) => `
                <div class="dep-item">
                    <input type="text" value="${name}" onchange="updateDepName('deps', '${name}', this.value)">
                    <input type="text" class="version-input" value="${ver}" onchange="updateDepVer('deps', '${name}', this.value)">
                    <button class="btn btn-danger btn-sm" onclick="removeDep('deps', '${name}')">×</button>
                </div>
            `
            )
            .join("") ||
          '<p style="color: var(--color-text-secondary); padding: 0.5rem;">暂无依赖</p>';

        devDepsList.innerHTML =
          Object.entries(packageData.devDependencies || {})
            .map(
              ([name, ver]) => `
                <div class="dep-item">
                    <input type="text" value="${name}" onchange="updateDepName('devDeps', '${name}', this.value)">
                    <input type="text" class="version-input" value="${ver}" onchange="updateDepVer('devDeps', '${name}', this.value)">
                    <button class="btn btn-danger btn-sm" onclick="removeDep('devDeps', '${name}')">×</button>
                </div>
            `
            )
            .join("") ||
          '<p style="color: var(--color-text-secondary); padding: 0.5rem;">暂无开发依赖</p>';
      }

      window.addDep = function (type) {
        const nameInput = document.getElementById(type === "deps" ? "newDep" : "newDevDep");
        const verInput = document.getElementById(type === "deps" ? "newDepVer" : "newDevDepVer");

        const name = nameInput.value.trim();
        const ver = verInput.value.trim() || "^1.0.0";

        if (!name) return;

        const target = type === "deps" ? "dependencies" : "devDependencies";
        packageData[target] = packageData[target] || {};
        packageData[target][name] = ver;

        nameInput.value = "";
        renderDeps();
        renderJson();
      };

      window.updateDepName = function (type, oldName, newName) {
        const target = type === "deps" ? "dependencies" : "devDependencies";
        const ver = packageData[target][oldName];
        delete packageData[target][oldName];
        packageData[target][newName] = ver;
        renderJson();
      };

      window.updateDepVer = function (type, name, ver) {
        const target = type === "deps" ? "dependencies" : "devDependencies";
        packageData[target][name] = ver;
        renderJson();
      };

      window.removeDep = function (type, name) {
        const target = type === "deps" ? "dependencies" : "devDependencies";
        delete packageData[target][name];
        renderDeps();
        renderJson();
      };

      function renderScripts() {
        const list = document.getElementById("scriptsList");
        list.innerHTML =
          Object.entries(packageData.scripts || {})
            .map(
              ([name, cmd]) => `
                <div class="script-item">
                    <input type="text" value="${name}" onchange="updateScriptName('${name}', this.value)">
                    <input type="text" value="${cmd}" onchange="updateScriptCmd('${name}', this.value)">
                    <button class="btn btn-danger btn-sm" onclick="removeScript('${name}')">×</button>
                </div>
            `
            )
            .join("") ||
          '<p style="color: var(--color-text-secondary); padding: 0.5rem;">暂无脚本</p>';
      }

      window.addScript = function () {
        const name = document.getElementById("newScriptName").value.trim();
        const cmd = document.getElementById("newScriptCmd").value.trim();

        if (!name || !cmd) return;

        packageData.scripts = packageData.scripts || {};
        packageData.scripts[name] = cmd;

        document.getElementById("newScriptName").value = "";
        document.getElementById("newScriptCmd").value = "";
        renderScripts();
        renderJson();
      };

      window.updateScriptName = function (oldName, newName) {
        const cmd = packageData.scripts[oldName];
        delete packageData.scripts[oldName];
        packageData.scripts[newName] = cmd;
        renderJson();
      };

      window.updateScriptCmd = function (name, cmd) {
        packageData.scripts[name] = cmd;
        renderJson();
      };

      window.removeScript = function (name) {
        delete packageData.scripts[name];
        renderScripts();
        renderJson();
      };

      window.formatJson = function () {
        try {
          const json = JSON.parse(document.getElementById("jsonOutput").value);
          document.getElementById("jsonOutput").value = JSON.stringify(json, null, 2);
        } catch (e) {
          alert("JSON格式错误");
        }
      };

      window.copyJson = function () {
        navigator.clipboard.writeText(document.getElementById("jsonOutput").value);
        showToast();
      };

      window.downloadJson = function () {
        const blob = new Blob([document.getElementById("jsonOutput").value], {
          type: "application/json"
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "package.json";
        link.click();
      };

      function showToast() {
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initialize
      renderJson();
      renderDeps();
      renderScripts();

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
    
