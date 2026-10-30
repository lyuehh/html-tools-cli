// @ts-nocheck
// Generated from tools/dev/readme-generator.html
// Source SHA-256: 5c431c866ffe08ca62e0fef594083e9bc777888900a58f1e46822cdd4f10a5ed
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let badges = ["license-MIT", "build-passing", "prs"];

      const badgeTemplates = {
        "license-MIT": "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)",
        "license-Apache": "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)",
        version: "![Version](https://img.shields.io/badge/version-1.0.0-blue)",
        "build-passing": "![Build Status](https://img.shields.io/badge/build-passing-brightgreen)",
        "build-failing": "![Build Status](https://img.shields.io/badge/build-failing-red)",
        coverage: "![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)",
        npm: "![npm](https://img.shields.io/npm/v/PACKAGE)",
        downloads: "![Downloads](https://img.shields.io/npm/dm/PACKAGE)",
        stars: "![GitHub stars](https://img.shields.io/github/stars/USER/REPO)",
        issues: "![GitHub issues](https://img.shields.io/github/issues/USER/REPO)",
        prs: "![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)"
      };

      function renderBadges() {
        const container = document.getElementById("badgeList");
        container.innerHTML = badges
          .map(
            (b) => `
                <span class="badge-item">
                    ${b}
                    <button onclick="removeBadge('${b}')">✕</button>
                </span>
            `
          )
          .join("");
      }

      window.addBadge = function () {
        const type = document.getElementById("badgeType").value;
        if (!badges.includes(type)) {
          badges.push(type);
          renderBadges();
          generate();
        }
      };

      window.removeBadge = function (type) {
        badges = badges.filter((b) => b !== type);
        renderBadges();
        generate();
      };

      window.addFeature = function () {
        const list = document.getElementById("featureList");
        const div = document.createElement("div");
        div.className = "feature-item";
        div.innerHTML = `
                <input type="text" placeholder="新特性">
                <button onclick="removeFeature(this)">✕</button>
            `;
        list.appendChild(div);
        div.querySelector("input").focus();
      };

      window.removeFeature = function (btn) {
        btn.parentElement.remove();
        generate();
      };

      function getSelectedTechs() {
        return Array.from(document.querySelectorAll(".tech-tag.selected")).map(
          (t) => t.dataset.tech
        );
      }

      window.generate = function () {
        const name = document.getElementById("projectName").value || "My Project";
        const desc = document.getElementById("projectDesc").value;
        const url = document.getElementById("projectUrl").value;
        const pkgMgr = document.getElementById("packageManager").value;
        const pkgName = document.getElementById("packageName").value || "my-package";
        const usageCode = document.getElementById("usageCode").value;
        const apiDoc = document.getElementById("apiDoc").value;
        const license = document.getElementById("licenseType").value;
        const author = document.getElementById("authorName").value;
        const techs = getSelectedTechs();

        const features = Array.from(document.querySelectorAll("#featureList input"))
          .map((i) => i.value)
          .filter((v) => v.trim());

        let md = `# ${name}\n\n`;

        // Badges
        if (document.getElementById("showBadges").checked && badges.length) {
          md +=
            badges
              .map((b) => {
                let badge = badgeTemplates[b] || "";
                badge = badge.replace(/PACKAGE/g, pkgName);
                if (url) {
                  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
                  if (match) {
                    badge = badge.replace(/USER/g, match[1]).replace(/REPO/g, match[2]);
                  }
                }
                return badge;
              })
              .join(" ") + "\n\n";
        }

        // Description
        if (desc) {
          md += `${desc}\n\n`;
        }

        // Tech stack
        if (document.getElementById("showTech").checked && techs.length) {
          md += "## 🛠️ 技术栈\n\n";
          md += techs.map((t) => `- ${t}`).join("\n") + "\n\n";
        }

        // Features
        if (document.getElementById("showFeatures").checked && features.length) {
          md += "## ✨ 特性\n\n";
          md += features.map((f) => `- ${f}`).join("\n") + "\n\n";
        }

        // Installation
        if (document.getElementById("showInstall").checked) {
          md += "## 📦 安装\n\n";
          const cmds = {
            npm: `npm install ${pkgName}`,
            yarn: `yarn add ${pkgName}`,
            pnpm: `pnpm add ${pkgName}`,
            pip: `pip install ${pkgName}`,
            go: `go get ${pkgName}`,
            cargo: `cargo add ${pkgName}`
          };
          md += "```bash\n" + cmds[pkgMgr] + "\n```\n\n";
        }

        // Usage
        if (document.getElementById("showUsage").checked && usageCode) {
          md += "## 🚀 使用\n\n";
          const lang =
            pkgMgr === "pip"
              ? "python"
              : pkgMgr === "go"
                ? "go"
                : pkgMgr === "cargo"
                  ? "rust"
                  : "javascript";
          md += "```" + lang + "\n" + usageCode + "\n```\n\n";
        }

        // API
        if (document.getElementById("showApi").checked && apiDoc) {
          md += `## 📖 API\n\n${apiDoc}\n\n`;
        }

        // Contributing
        if (document.getElementById("showContrib").checked) {
          md += "## 🤝 贡献\n\n";
          md += "欢迎贡献代码！请查看 [贡献指南](CONTRIBUTING.md) 了解详情。\n\n";
          md += "1. Fork 本仓库\n";
          md += "2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)\n";
          md += "3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)\n";
          md += "4. 推送到分支 (`git push origin feature/AmazingFeature`)\n";
          md += "5. 提交 Pull Request\n\n";
        }

        // License
        if (document.getElementById("showLicense").checked) {
          md += "## 📄 许可证\n\n";
          md += `本项目采用 [${license}](LICENSE) 许可证`;
          if (author) md += ` - 版权所有 © ${new Date().getFullYear()} ${author}`;
          md += "。\n";
        }

        document.getElementById("output").value = md;
        updatePreview(md);
      };

      window.updatePreview = function (md) {
        document.getElementById("preview").innerHTML = marked.parse(md);
      };

      // Event listeners
      document.querySelectorAll(".tech-tag").forEach((tag) => {
        tag.addEventListener("click", () => {
          tag.classList.toggle("selected");
          generate();
        });
      });

      document.querySelectorAll(".tabs button").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const tab = btn.dataset.tab;
          document.getElementById("codeTab").style.display = tab === "code" ? "block" : "none";
          document.getElementById("previewTab").style.display =
            tab === "preview" ? "block" : "none";
        });
      });

      document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(document.getElementById("output").value);
        document.getElementById("copyBtn").textContent = "✓ 已复制";
        setTimeout(() => (document.getElementById("copyBtn").textContent = "📋 复制"), 2000);
      });

      document.getElementById("downloadBtn").addEventListener("click", () => {
        const blob = new Blob([document.getElementById("output").value], { type: "text/markdown" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "README.md";
        a.click();
      });

      // Auto-generate on input changes
      document.querySelectorAll("input, textarea, select").forEach((el) => {
        el.addEventListener("input", generate);
        el.addEventListener("change", generate);
      });

      // Feature input listener (delegated)
      document.getElementById("featureList").addEventListener("input", generate);

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";

      document.getElementById("themeToggle").addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      });

      // Initial render
      renderBadges();
      generate();

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
    
