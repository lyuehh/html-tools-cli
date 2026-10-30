// @ts-nocheck
// Generated from tools/dev/npm-command-helper.html
// Source SHA-256: 6a558c036dd23277cfba09463bff461fb23aed32228a37ad95f3b2bf7ea35e4b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const npmCommands = [
        { name: "初始化项目", cmd: "npm init -y", desc: "快速初始化package.json" },
        { name: "安装依赖", cmd: "npm install", desc: "安装package.json中的所有依赖" },
        { name: "安装包", cmd: "npm install <package>", desc: "安装指定包到dependencies" },
        { name: "安装开发依赖", cmd: "npm install -D <package>", desc: "安装到devDependencies" },
        { name: "全局安装", cmd: "npm install -g <package>", desc: "全局安装包" },
        { name: "卸载包", cmd: "npm uninstall <package>", desc: "卸载指定包" },
        { name: "更新包", cmd: "npm update <package>", desc: "更新指定包到最新版本" },
        { name: "查看过时包", cmd: "npm outdated", desc: "检查过时的依赖" },
        { name: "运行脚本", cmd: "npm run <script>", desc: "运行package.json中定义的脚本" },
        { name: "启动项目", cmd: "npm start", desc: "运行start脚本" },
        { name: "运行测试", cmd: "npm test", desc: "运行test脚本" },
        { name: "构建项目", cmd: "npm run build", desc: "运行build脚本" },
        { name: "查看包信息", cmd: "npm info <package>", desc: "查看包的详细信息" },
        { name: "搜索包", cmd: "npm search <keyword>", desc: "搜索npm包" },
        { name: "发布包", cmd: "npm publish", desc: "发布包到npm" },
        { name: "登录npm", cmd: "npm login", desc: "登录npm账号" },
        { name: "查看配置", cmd: "npm config list", desc: "查看npm配置" },
        {
          name: "设置镜像",
          cmd: "npm config set registry https://registry.npmmirror.com",
          desc: "设置淘宝镜像"
        },
        { name: "清理缓存", cmd: "npm cache clean --force", desc: "清理npm缓存" },
        { name: "查看全局包", cmd: "npm list -g --depth=0", desc: "查看全局安装的包" },
        { name: "版本检查", cmd: "npm version", desc: "查看npm和node版本" },
        { name: "安全审计", cmd: "npm audit", desc: "检查安全漏洞" },
        { name: "修复漏洞", cmd: "npm audit fix", desc: "自动修复安全漏洞" },
        { name: "创建链接", cmd: "npm link", desc: "创建全局符号链接" }
      ];
      function render(filter = "") {
        const filtered = npmCommands.filter(
          (c) =>
            !filter || c.name.includes(filter) || c.cmd.includes(filter) || c.desc.includes(filter)
        );
        document.getElementById("commands").innerHTML =
          filtered
            .map(
              (c) => `
                <div class="cmd-item">
                    <div class="cmd-header"><span class="cmd-name">${c.name}</span></div>
                    <div class="cmd-code"><code>${c.cmd}</code><button class="cmd-copy" onclick="navigator.clipboard.writeText('${c.cmd.replace(/'/g, "\\'")}')">📋</button></div>
                    <div class="cmd-desc">${c.desc}</div>
                </div>
            `
            )
            .join("") ||
          '<p style="padding:20px;text-align:center;color:#999">未找到匹配的命令</p>';
      }
      document.getElementById("search").addEventListener("input", (e) => render(e.target.value));
      render();

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
    
