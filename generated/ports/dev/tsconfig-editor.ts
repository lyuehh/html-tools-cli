// @ts-nocheck
// Generated from tools/dev/tsconfig-editor.html
// Source SHA-256: 75657b3dbee50cb7691521de564a4422fb08db7833cbd150b96c7836d31dcdce
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.toggleTheme = function () {
        const theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
      };
      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");

      window.toggleGroup = function (header) {
        const content = header.nextElementSibling;
        const icon = header.querySelector("span:last-child");
        content.classList.toggle("collapsed");
        icon.textContent = content.classList.contains("collapsed") ? "▶" : "▼";
      };

      function updateConfig() {
        const config = {
          compilerOptions: {}
        };

        // Basic options
        config.compilerOptions.target = document.getElementById("target").value;
        config.compilerOptions.module = document.getElementById("module").value;
        config.compilerOptions.moduleResolution = document.getElementById("moduleResolution").value;

        const outDir = document.getElementById("outDir").value;
        if (outDir) config.compilerOptions.outDir = outDir;

        const rootDir = document.getElementById("rootDir").value;
        if (rootDir) config.compilerOptions.rootDir = rootDir;

        const baseUrl = document.getElementById("baseUrl").value;
        if (baseUrl) config.compilerOptions.baseUrl = baseUrl;

        // Strict options
        if (document.getElementById("strict").checked) config.compilerOptions.strict = true;
        if (document.getElementById("noImplicitAny").checked)
          config.compilerOptions.noImplicitAny = true;
        if (document.getElementById("strictNullChecks").checked)
          config.compilerOptions.strictNullChecks = true;
        if (document.getElementById("strictFunctionTypes").checked)
          config.compilerOptions.strictFunctionTypes = true;
        if (document.getElementById("strictBindCallApply").checked)
          config.compilerOptions.strictBindCallApply = true;
        if (document.getElementById("noImplicitThis").checked)
          config.compilerOptions.noImplicitThis = true;
        if (document.getElementById("alwaysStrict").checked)
          config.compilerOptions.alwaysStrict = true;

        // Compile options
        if (document.getElementById("declaration").checked)
          config.compilerOptions.declaration = true;
        if (document.getElementById("declarationMap").checked)
          config.compilerOptions.declarationMap = true;
        if (document.getElementById("sourceMap").checked) config.compilerOptions.sourceMap = true;
        if (document.getElementById("esModuleInterop").checked)
          config.compilerOptions.esModuleInterop = true;
        if (document.getElementById("skipLibCheck").checked)
          config.compilerOptions.skipLibCheck = true;
        if (document.getElementById("forceConsistentCasingInFileNames").checked)
          config.compilerOptions.forceConsistentCasingInFileNames = true;
        if (document.getElementById("resolveJsonModule").checked)
          config.compilerOptions.resolveJsonModule = true;
        if (document.getElementById("isolatedModules").checked)
          config.compilerOptions.isolatedModules = true;

        // JSX
        const jsx = document.getElementById("jsx").value;
        if (jsx) config.compilerOptions.jsx = jsx;

        // Lib
        const libSelect = document.getElementById("lib");
        const libs = Array.from(libSelect.selectedOptions).map((o) => o.value);
        if (libs.length) config.compilerOptions.lib = libs;

        // Include/Exclude
        config.include = ["src/**/*"];
        config.exclude = ["node_modules", "dist"];

        document.getElementById("configOutput").textContent = JSON.stringify(config, null, 2);
      }

      window.loadPreset = function (preset) {
        const presets = {
          node: {
            target: "ES2022",
            module: "NodeNext",
            moduleResolution: "nodenext",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            sourceMap: true
          },
          react: {
            target: "ES2020",
            module: "ESNext",
            moduleResolution: "bundler",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            jsx: "react-jsx",
            esModuleInterop: true,
            skipLibCheck: true,
            isolatedModules: true
          },
          vue: {
            target: "ES2020",
            module: "ESNext",
            moduleResolution: "bundler",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            jsx: "preserve",
            esModuleInterop: true,
            skipLibCheck: true,
            isolatedModules: true
          },
          library: {
            target: "ES2020",
            module: "ESNext",
            moduleResolution: "node",
            outDir: "./dist",
            rootDir: "./src",
            strict: true,
            declaration: true,
            declarationMap: true,
            sourceMap: true,
            esModuleInterop: true
          },
          strict: {
            target: "ES2022",
            module: "ESNext",
            strict: true,
            noImplicitAny: true,
            strictNullChecks: true,
            strictFunctionTypes: true,
            strictBindCallApply: true,
            noImplicitThis: true,
            alwaysStrict: true
          }
        };

        const p = presets[preset];
        if (!p) return;

        document.getElementById("target").value = p.target || "ES2022";
        document.getElementById("module").value = p.module || "ESNext";
        document.getElementById("moduleResolution").value = p.moduleResolution || "node";
        document.getElementById("outDir").value = p.outDir || "./dist";
        document.getElementById("rootDir").value = p.rootDir || "./src";
        document.getElementById("strict").checked = p.strict || false;
        document.getElementById("jsx").value = p.jsx || "";
        document.getElementById("esModuleInterop").checked = p.esModuleInterop || false;
        document.getElementById("skipLibCheck").checked = p.skipLibCheck || false;
        document.getElementById("declaration").checked = p.declaration || false;
        document.getElementById("declarationMap").checked = p.declarationMap || false;
        document.getElementById("sourceMap").checked = p.sourceMap || false;
        document.getElementById("isolatedModules").checked = p.isolatedModules || false;

        document.querySelectorAll(".preset-btn").forEach((b) => b.classList.remove("active"));
        event.target.closest(".preset-btn").classList.add("active");

        updateConfig();
      };

      window.copyConfig = function () {
        const config = document.getElementById("configOutput").textContent;
        navigator.clipboard.writeText(config).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadConfig = function () {
        const config = document.getElementById("configOutput").textContent;
        const blob = new Blob([config], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tsconfig.json";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.importConfig = function () {
        document.getElementById("fileInput").click();
      };

      document.getElementById("fileInput").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target.result);
            applyConfig(config);
            showToast("导入成功");
          } catch (err) {
            alert("解析失败: " + err.message);
          }
        };
        reader.readAsText(file);
      });

      function applyConfig(config) {
        const opts = config.compilerOptions || {};
        if (opts.target) document.getElementById("target").value = opts.target;
        if (opts.module) document.getElementById("module").value = opts.module;
        if (opts.moduleResolution)
          document.getElementById("moduleResolution").value = opts.moduleResolution;
        if (opts.outDir) document.getElementById("outDir").value = opts.outDir;
        if (opts.rootDir) document.getElementById("rootDir").value = opts.rootDir;
        if (opts.baseUrl) document.getElementById("baseUrl").value = opts.baseUrl;
        document.getElementById("strict").checked = opts.strict || false;
        document.getElementById("noImplicitAny").checked = opts.noImplicitAny || false;
        document.getElementById("strictNullChecks").checked = opts.strictNullChecks || false;
        document.getElementById("strictFunctionTypes").checked = opts.strictFunctionTypes || false;
        document.getElementById("strictBindCallApply").checked = opts.strictBindCallApply || false;
        document.getElementById("noImplicitThis").checked = opts.noImplicitThis || false;
        document.getElementById("alwaysStrict").checked = opts.alwaysStrict || false;
        document.getElementById("declaration").checked = opts.declaration || false;
        document.getElementById("declarationMap").checked = opts.declarationMap || false;
        document.getElementById("sourceMap").checked = opts.sourceMap || false;
        document.getElementById("esModuleInterop").checked = opts.esModuleInterop || false;
        document.getElementById("skipLibCheck").checked = opts.skipLibCheck || false;
        document.getElementById("forceConsistentCasingInFileNames").checked =
          opts.forceConsistentCasingInFileNames || false;
        document.getElementById("resolveJsonModule").checked = opts.resolveJsonModule || false;
        document.getElementById("isolatedModules").checked = opts.isolatedModules || false;
        if (opts.jsx) document.getElementById("jsx").value = opts.jsx;
        updateConfig();
      }

      window.resetConfig = function () {
        document.querySelectorAll('input[type="checkbox"]').forEach((c) => (c.checked = false));
        document.querySelectorAll('input[type="text"]').forEach((i) => (i.value = ""));
        document.getElementById("target").value = "ES2022";
        document.getElementById("module").value = "ESNext";
        document.getElementById("moduleResolution").value = "nodenext";
        document.querySelectorAll(".preset-btn").forEach((b) => b.classList.remove("active"));
        updateConfig();
      };

      function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Initial render
      updateConfig();
    
