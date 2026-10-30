// @ts-nocheck
// Generated from tools/security/csp-generator.html
// Source SHA-256: fe00b9e3ec41ce0057b7dbcb497a20478ce6a56303b52d6b70c66430dec0c9be
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

      // CSP 指令定义
      const directives = [
        { name: "default-src", desc: "默认策略，其他指令的后备值", icon: "🏠" },
        { name: "script-src", desc: "控制 JavaScript 脚本的加载来源", icon: "📜" },
        { name: "style-src", desc: "控制 CSS 样式表的加载来源", icon: "🎨" },
        { name: "img-src", desc: "控制图片资源的加载来源", icon: "🖼️" },
        { name: "font-src", desc: "控制字体文件的加载来源", icon: "🔤" },
        { name: "connect-src", desc: "控制 XHR、WebSocket 等连接目标", icon: "🔗" },
        { name: "media-src", desc: "控制音频和视频资源的加载来源", icon: "🎬" },
        { name: "object-src", desc: "控制 Flash 和其他插件的加载来源", icon: "📦" },
        { name: "frame-src", desc: "控制 iframe 框架的来源", icon: "🖥️" },
        { name: "frame-ancestors", desc: "控制哪些页面可以嵌入当前页面", icon: "👨‍👧" },
        { name: "worker-src", desc: "控制 Web Worker 脚本的来源", icon: "👷" },
        { name: "base-uri", desc: "限制 base 元素的 URL", icon: "🔗" },
        { name: "form-action", desc: "限制表单提交的目标 URL", icon: "📝" },
        { name: "report-uri", desc: "指定 CSP 违规报告的接收地址", icon: "📊" }
      ];

      const sourceOptions = [
        { value: "'self'", label: "'self'" },
        { value: "'none'", label: "'none'" },
        { value: "'unsafe-inline'", label: "'unsafe-inline'" },
        { value: "'unsafe-eval'", label: "'unsafe-eval'" },
        { value: "'strict-dynamic'", label: "'strict-dynamic'" },
        { value: "https:", label: "https:" },
        { value: "data:", label: "data:" },
        { value: "blob:", label: "blob:" },
        { value: "*", label: "* (任意)" }
      ];

      // 存储状态
      const state = {};
      directives.forEach((d) => {
        state[d.name] = {
          enabled: false,
          sources: [],
          customSources: []
        };
      });

      let currentTab = "header";

      // 初始化界面
      function initDirectives() {
        const container = document.getElementById("directivesSection");
        container.textContent = "";

        directives.forEach((directive) => {
          const card = document.createElement("div");
          card.className = "directive-card";
          card.id = "directive-" + directive.name;

          // Header
          const header = document.createElement("div");
          header.className = "directive-header";

          const nameDiv = document.createElement("div");
          nameDiv.className = "directive-name";
          nameDiv.textContent = directive.icon + " " + directive.name;

          const toggleDiv = document.createElement("div");
          toggleDiv.className = "directive-toggle";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = "toggle-" + directive.name;
          checkbox.onchange = function () {
            state[directive.name].enabled = this.checked;
            updateOutput();
          };

          const label = document.createElement("label");
          label.htmlFor = "toggle-" + directive.name;
          label.textContent = "启用";

          toggleDiv.appendChild(checkbox);
          toggleDiv.appendChild(label);
          header.appendChild(nameDiv);
          header.appendChild(toggleDiv);
          card.appendChild(header);

          // Description
          const desc = document.createElement("div");
          desc.className = "directive-desc";
          desc.textContent = directive.desc;
          card.appendChild(desc);

          // Source options
          const sourcesDiv = document.createElement("div");
          sourcesDiv.className = "source-options";

          sourceOptions.forEach((opt) => {
            const chip = document.createElement("button");
            chip.className = "source-chip";
            chip.textContent = opt.label;
            chip.dataset.value = opt.value;
            chip.dataset.directive = directive.name;
            chip.onclick = function () {
              this.classList.toggle("selected");
              const sources = state[directive.name].sources;
              const idx = sources.indexOf(opt.value);
              if (idx === -1) {
                sources.push(opt.value);
              } else {
                sources.splice(idx, 1);
              }
              updateOutput();
            };
            sourcesDiv.appendChild(chip);
          });
          card.appendChild(sourcesDiv);

          // Custom sources
          const customDiv = document.createElement("div");
          customDiv.className = "custom-sources";

          const customInput = document.createElement("input");
          customInput.type = "text";
          customInput.placeholder = "添加自定义来源 (如: https://cdn.example.com)";
          customInput.id = "custom-" + directive.name;

          const addBtn = document.createElement("button");
          addBtn.className = "secondary";
          addBtn.textContent = "添加";
          addBtn.onclick = function () {
            const input = document.getElementById("custom-" + directive.name);
            const value = input.value.trim();
            if (value && state[directive.name].customSources.indexOf(value) === -1) {
              state[directive.name].customSources.push(value);
              input.value = "";
              renderCustomSources(directive.name);
              updateOutput();
            }
          };

          customDiv.appendChild(customInput);
          customDiv.appendChild(addBtn);
          card.appendChild(customDiv);

          // Custom sources tags container
          const tagsDiv = document.createElement("div");
          tagsDiv.id = "tags-" + directive.name;
          tagsDiv.style.marginTop = "0.5rem";
          tagsDiv.style.display = "flex";
          tagsDiv.style.flexWrap = "wrap";
          tagsDiv.style.gap = "0.5rem";
          card.appendChild(tagsDiv);

          container.appendChild(card);
        });

        updateOutput();
      }

      function renderCustomSources(directiveName) {
        const tagsDiv = document.getElementById("tags-" + directiveName);
        tagsDiv.textContent = "";

        state[directiveName].customSources.forEach((source, index) => {
          const tag = document.createElement("span");
          tag.className = "custom-source-tag";
          tag.textContent = source + " ";

          const removeBtn = document.createElement("button");
          removeBtn.textContent = "×";
          removeBtn.onclick = function () {
            state[directiveName].customSources.splice(index, 1);
            renderCustomSources(directiveName);
            updateOutput();
          };
          tag.appendChild(removeBtn);
          tagsDiv.appendChild(tag);
        });
      }

      function generateCSP() {
        const parts = [];

        directives.forEach((d) => {
          const s = state[d.name];
          if (s.enabled) {
            const allSources = s.sources.concat(s.customSources);
            if (allSources.length > 0) {
              parts.push(d.name + " " + allSources.join(" "));
            } else {
              parts.push(d.name + " 'none'");
            }
          }
        });

        return parts.join("; ");
      }

      function updateOutput() {
        const csp = generateCSP();
        const outputDiv = document.getElementById("outputContent");

        if (!csp) {
          outputDiv.textContent = "// 请启用并配置至少一个指令";
          return;
        }

        let output = "";
        switch (currentTab) {
          case "header":
            output = "Content-Security-Policy: " + csp;
            break;
          case "meta":
            output = '<meta http-equiv="Content-Security-Policy" content="' + csp + '">';
            break;
          case "nginx":
            output = 'add_header Content-Security-Policy "' + csp + '" always;';
            break;
          case "apache":
            output = 'Header set Content-Security-Policy "' + csp + '"';
            break;
        }

        outputDiv.textContent = output;
      }

      window.switchTab = function (tab) {
        currentTab = tab;
        document.querySelectorAll(".output-tab").forEach((t) => {
          t.classList.toggle(
            "active",
            t.textContent.toLowerCase().indexOf(tab) !== -1 ||
              (tab === "header" && t.textContent === "HTTP Header") ||
              (tab === "meta" && t.textContent === "Meta 标签") ||
              (tab === "nginx" && t.textContent === "Nginx 配置") ||
              (tab === "apache" && t.textContent === "Apache 配置")
          );
        });
        document.querySelectorAll(".output-tab").forEach((t, i) => {
          const tabs = ["header", "meta", "nginx", "apache"];
          t.classList.toggle("active", tabs[i] === tab);
        });
        updateOutput();
      };

      window.applyPreset = function (preset) {
        // 重置所有
        directives.forEach((d) => {
          state[d.name].enabled = false;
          state[d.name].sources = [];
          state[d.name].customSources = [];
        });

        if (preset === "strict") {
          state["default-src"].enabled = true;
          state["default-src"].sources = ["'none'"];
          state["script-src"].enabled = true;
          state["script-src"].sources = ["'self'"];
          state["style-src"].enabled = true;
          state["style-src"].sources = ["'self'"];
          state["img-src"].enabled = true;
          state["img-src"].sources = ["'self'"];
          state["font-src"].enabled = true;
          state["font-src"].sources = ["'self'"];
          state["connect-src"].enabled = true;
          state["connect-src"].sources = ["'self'"];
          state["frame-ancestors"].enabled = true;
          state["frame-ancestors"].sources = ["'none'"];
          state["base-uri"].enabled = true;
          state["base-uri"].sources = ["'self'"];
          state["form-action"].enabled = true;
          state["form-action"].sources = ["'self'"];
        } else if (preset === "moderate") {
          state["default-src"].enabled = true;
          state["default-src"].sources = ["'self'"];
          state["script-src"].enabled = true;
          state["script-src"].sources = ["'self'", "'unsafe-inline'"];
          state["style-src"].enabled = true;
          state["style-src"].sources = ["'self'", "'unsafe-inline'"];
          state["img-src"].enabled = true;
          state["img-src"].sources = ["'self'", "data:", "https:"];
          state["font-src"].enabled = true;
          state["font-src"].sources = ["'self'", "https:"];
          state["connect-src"].enabled = true;
          state["connect-src"].sources = ["'self'", "https:"];
        } else if (preset === "relaxed") {
          state["default-src"].enabled = true;
          state["default-src"].sources = ["'self'", "https:"];
          state["script-src"].enabled = true;
          state["script-src"].sources = ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:"];
          state["style-src"].enabled = true;
          state["style-src"].sources = ["'self'", "'unsafe-inline'", "https:"];
          state["img-src"].enabled = true;
          state["img-src"].sources = ["*", "data:", "blob:"];
        }

        // 更新 UI
        directives.forEach((d) => {
          const checkbox = document.getElementById("toggle-" + d.name);
          checkbox.checked = state[d.name].enabled;

          const chips = document.querySelectorAll("#directive-" + d.name + " .source-chip");
          chips.forEach((chip) => {
            chip.classList.toggle(
              "selected",
              state[d.name].sources.indexOf(chip.dataset.value) !== -1
            );
          });

          renderCustomSources(d.name);
        });

        updateOutput();
      };

      window.copyOutput = function () {
        const output = document.getElementById("outputContent").textContent;
        navigator.clipboard.writeText(output).then(() => {
          showToast("已复制到剪贴板");
        });
      };

      window.downloadOutput = function () {
        const csp = generateCSP();
        let content = "";
        let filename = "";

        switch (currentTab) {
          case "header":
          case "meta":
            content = document.getElementById("outputContent").textContent;
            filename = "csp-policy.txt";
            break;
          case "nginx":
            content =
              "# CSP Policy for Nginx\n" + document.getElementById("outputContent").textContent;
            filename = "csp-nginx.conf";
            break;
          case "apache":
            content =
              "# CSP Policy for Apache\n" + document.getElementById("outputContent").textContent;
            filename = "csp-apache.conf";
            break;
        }

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
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

      // 初始化
      initDirectives();
    
