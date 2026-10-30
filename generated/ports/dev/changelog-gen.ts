// @ts-nocheck
// Generated from tools/dev/changelog-gen.html
// Source SHA-256: 6966518722def81ab9c7a3bbb56c47a8a63ae248944c2aff37c517cce0998a17
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const themeToggle = document.getElementById("themeToggle");
      const versionInput = document.getElementById("version");
      const releaseDateInput = document.getElementById("releaseDate");
      const changeTypeSelect = document.getElementById("changeType");
      const changeDescInput = document.getElementById("changeDesc");
      const versionListEl = document.getElementById("versionList");
      const entryListEl = document.getElementById("entryList");
      const previewEl = document.getElementById("preview");
      const currentVersionLabel = document.getElementById("currentVersionLabel");

      let versions = [];
      let currentVersionIndex = -1;

      // 初始化日期
      releaseDateInput.value = new Date().toISOString().split("T")[0];

      // 主题切换
      function initTheme() {
        const savedTheme = localStorage.getItem("changelog-gen-theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        updateThemeButton(savedTheme);
      }

      function updateThemeButton(theme) {
        themeToggle.textContent = theme === "dark" ? "浅色模式" : "深色模式";
      }

      themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("changelog-gen-theme", newTheme);
        updateThemeButton(newTheme);
      });

      // 添加版本
      function addVersion() {
        const version = versionInput.value.trim();
        const date = releaseDateInput.value;

        if (!version) {
          alert("请输入版本号！");
          return;
        }

        if (versions.find((v) => v.version === version)) {
          alert("版本号已存在！");
          return;
        }

        versions.unshift({
          version,
          date,
          entries: {
            added: [],
            changed: [],
            deprecated: [],
            removed: [],
            fixed: [],
            security: []
          }
        });

        versionInput.value = "";
        currentVersionIndex = 0;
        renderVersionList();
        renderEntries();
        updatePreview();
        saveToStorage();
      }

      // 渲染版本列表
      function renderVersionList() {
        if (versions.length === 0) {
          versionListEl.innerHTML = '<div class="empty-state">暂无版本，请先添加版本</div>';
          return;
        }

        versionListEl.innerHTML = versions
          .map(
            (v, i) => `
                <div class="version-item ${i === currentVersionIndex ? "active" : ""}" onclick="selectVersion(${i})">
                    <span><strong>v${v.version}</strong> - ${v.date}</span>
                    <button class="btn-delete" onclick="event.stopPropagation(); deleteVersion(${i})">删除</button>
                </div>
            `
          )
          .join("");
      }

      // 选择版本
      window.selectVersion = function (index) {
        currentVersionIndex = index;
        renderVersionList();
        renderEntries();
      };

      // 删除版本
      window.deleteVersion = function (index) {
        if (confirm("确定要删除这个版本吗？")) {
          versions.splice(index, 1);
          if (currentVersionIndex >= versions.length) {
            currentVersionIndex = versions.length - 1;
          }
          renderVersionList();
          renderEntries();
          updatePreview();
          saveToStorage();
        }
      };

      // 添加条目
      function addEntry() {
        if (currentVersionIndex < 0) {
          alert("请先选择一个版本！");
          return;
        }

        const type = changeTypeSelect.value;
        const desc = changeDescInput.value.trim();

        if (!desc) {
          alert("请输入变更描述！");
          return;
        }

        versions[currentVersionIndex].entries[type].push(desc);
        changeDescInput.value = "";
        renderEntries();
        updatePreview();
        saveToStorage();
      }

      // 渲染条目列表
      function renderEntries() {
        if (currentVersionIndex < 0) {
          entryListEl.innerHTML = '<div class="empty-state">请先选择一个版本</div>';
          currentVersionLabel.textContent = "";
          return;
        }

        const ver = versions[currentVersionIndex];
        currentVersionLabel.textContent = `(v${ver.version})`;

        const allEntries = [];
        const typeNames = {
          added: "Added",
          changed: "Changed",
          deprecated: "Deprecated",
          removed: "Removed",
          fixed: "Fixed",
          security: "Security"
        };

        Object.keys(ver.entries).forEach((type) => {
          ver.entries[type].forEach((entry, idx) => {
            allEntries.push({ type, entry, idx });
          });
        });

        if (allEntries.length === 0) {
          entryListEl.innerHTML = '<div class="empty-state">暂无变更记录</div>';
          return;
        }

        entryListEl.innerHTML = allEntries
          .map(
            (item) => `
                <div class="entry-item ${item.type}">
                    <div class="entry-content">
                        <span class="entry-type ${item.type}">${typeNames[item.type]}</span>
                        ${item.entry}
                    </div>
                    <button class="btn-delete" onclick="deleteEntry('${item.type}', ${item.idx})">删除</button>
                </div>
            `
          )
          .join("");
      }

      // 删除条目
      window.deleteEntry = function (type, idx) {
        versions[currentVersionIndex].entries[type].splice(idx, 1);
        renderEntries();
        updatePreview();
        saveToStorage();
      };

      // 更新预览
      window.updatePreview = function () {
        let md = `# Changelog

所有项目的显著变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

`;

        const typeHeaders = {
          added: "### Added",
          changed: "### Changed",
          deprecated: "### Deprecated",
          removed: "### Removed",
          fixed: "### Fixed",
          security: "### Security"
        };

        versions.forEach((ver) => {
          md += `## [${ver.version}] - ${ver.date}\n\n`;

          Object.keys(ver.entries).forEach((type) => {
            if (ver.entries[type].length > 0) {
              md += `${typeHeaders[type]}\n\n`;
              ver.entries[type].forEach((entry) => {
                md += `- ${entry}\n`;
              });
              md += "\n";
            }
          });
        });

        previewEl.textContent = md;
      };

      // 复制
      window.copyChangelog = function () {
        navigator.clipboard.writeText(previewEl.textContent).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      // 下载
      window.downloadChangelog = function () {
        const content = previewEl.textContent;
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "CHANGELOG.md";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        if (confirm("确定要清空所有数据吗？")) {
          versions = [];
          currentVersionIndex = -1;
          renderVersionList();
          renderEntries();
          updatePreview();
          saveToStorage();
        }
      };

      // 加载示例
      window.loadExample = function () {
        if (versions.length > 0 && !confirm("这将替换当前数据，确定继续吗？")) {
          return;
        }

        versions = [
          {
            version: "1.1.0",
            date: "2024-01-15",
            entries: {
              added: ["新增用户个人资料页面", "支持暗黑模式切换"],
              changed: ["优化首页加载速度"],
              deprecated: [],
              removed: [],
              fixed: ["修复登录页面样式问题"],
              security: []
            }
          },
          {
            version: "1.0.0",
            date: "2024-01-01",
            entries: {
              added: ["用户注册和登录功能", "基础数据展示页面", "响应式布局支持"],
              changed: [],
              deprecated: [],
              removed: [],
              fixed: [],
              security: ["使用 HTTPS 加密传输"]
            }
          }
        ];

        currentVersionIndex = 0;
        renderVersionList();
        renderEntries();
        updatePreview();
        saveToStorage();
      };

      // 保存到本地存储
      function saveToStorage() {
        localStorage.setItem("changelog-gen-data", JSON.stringify(versions));
      }

      // 从本地存储加载
      function loadFromStorage() {
        const saved = localStorage.getItem("changelog-gen-data");
        if (saved) {
          try {
            versions = JSON.parse(saved);
            if (versions.length > 0) {
              currentVersionIndex = 0;
            }
            renderVersionList();
            renderEntries();
            updatePreview();
          } catch (e) {
            console.error("Failed to load saved data:", e);
          }
        }
      }

      // 快捷键
      changeDescInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addEntry();
        }
      });

      versionInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addVersion();
        }
      });

      // 初始化
      initTheme();
      loadFromStorage();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.getElementById("theme-icon").textContent = "☀️";
      }
    
