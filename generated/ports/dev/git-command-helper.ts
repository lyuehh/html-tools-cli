// @ts-nocheck
// Generated from tools/dev/git-command-helper.html
// Source SHA-256: 69115ba8484df006dd5d63680883ac2853e739c988fdb8bfa5766690a2e8a191
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const gitCommands = [
        {
          cat: "基础",
          name: "初始化仓库",
          cmd: "git init",
          desc: "在当前目录初始化一个新的Git仓库"
        },
        { cat: "基础", name: "克隆仓库", cmd: "git clone <url>", desc: "克隆远程仓库到本地" },
        { cat: "基础", name: "查看状态", cmd: "git status", desc: "查看工作区和暂存区状态" },
        {
          cat: "基础",
          name: "添加文件",
          cmd: "git add <file>",
          desc: "将文件添加到暂存区，使用 . 添加所有"
        },
        { cat: "基础", name: "提交更改", cmd: 'git commit -m "message"', desc: "提交暂存区的更改" },
        { cat: "分支", name: "查看分支", cmd: "git branch", desc: "列出所有本地分支" },
        { cat: "分支", name: "创建分支", cmd: "git branch <name>", desc: "创建新分支" },
        { cat: "分支", name: "切换分支", cmd: "git checkout <branch>", desc: "切换到指定分支" },
        {
          cat: "分支",
          name: "创建并切换",
          cmd: "git checkout -b <branch>",
          desc: "创建新分支并切换"
        },
        {
          cat: "分支",
          name: "合并分支",
          cmd: "git merge <branch>",
          desc: "将指定分支合并到当前分支"
        },
        { cat: "分支", name: "删除分支", cmd: "git branch -d <branch>", desc: "删除本地分支" },
        { cat: "远程", name: "添加远程", cmd: "git remote add origin <url>", desc: "添加远程仓库" },
        { cat: "远程", name: "推送", cmd: "git push origin <branch>", desc: "推送到远程仓库" },
        { cat: "远程", name: "拉取", cmd: "git pull origin <branch>", desc: "从远程拉取并合并" },
        { cat: "远程", name: "获取", cmd: "git fetch", desc: "从远程获取但不合并" },
        { cat: "历史", name: "查看日志", cmd: "git log --oneline", desc: "查看简洁的提交历史" },
        { cat: "历史", name: "查看差异", cmd: "git diff", desc: "查看未暂存的更改" },
        { cat: "历史", name: "回退版本", cmd: "git reset --hard HEAD~1", desc: "回退到上一个版本" },
        { cat: "撤销", name: "撤销暂存", cmd: "git reset HEAD <file>", desc: "将文件从暂存区撤销" },
        { cat: "撤销", name: "撤销修改", cmd: "git checkout -- <file>", desc: "撤销工作区的修改" },
        { cat: "撤销", name: "修改提交", cmd: "git commit --amend", desc: "修改最后一次提交" },
        { cat: "标签", name: "创建标签", cmd: "git tag v1.0.0", desc: "创建轻量标签" },
        {
          cat: "标签",
          name: "推送标签",
          cmd: "git push origin --tags",
          desc: "推送所有标签到远程"
        },
        { cat: "储藏", name: "储藏更改", cmd: "git stash", desc: "临时储藏当前更改" },
        { cat: "储藏", name: "恢复储藏", cmd: "git stash pop", desc: "恢复最近储藏的更改" }
      ];
      const categories = [...new Set(gitCommands.map((c) => c.cat))];
      let activeCategory = "全部";
      function render(filter = "") {
        const filtered = gitCommands.filter(
          (c) =>
            (activeCategory === "全部" || c.cat === activeCategory) &&
            (!filter ||
              c.name.includes(filter) ||
              c.cmd.includes(filter) ||
              c.desc.includes(filter))
        );
        document.getElementById("commands").innerHTML =
          filtered
            .map(
              (c) => `
                <div class="cmd-item">
                    <div class="cmd-header"><span class="cmd-name">${c.name}</span><span class="cmd-tag">${c.cat}</span></div>
                    <div class="cmd-code"><code>${c.cmd}</code><button class="cmd-copy" onclick="copy('${c.cmd.replace(/'/g, "\\'")}')">📋</button></div>
                    <div class="cmd-desc">${c.desc}</div>
                </div>
            `
            )
            .join("") ||
          '<p style="padding:20px;text-align:center;color:#999">未找到匹配的命令</p>';
      }
      function renderCategories() {
        document.getElementById("categories").innerHTML = ["全部", ...categories]
          .map(
            (c) =>
              `<button class="cat-btn ${c === activeCategory ? "active" : ""}" onclick="setCategory('${c}')">${c}</button>`
          )
          .join("");
      }
      function setCategory(cat) {
        activeCategory = cat;
        renderCategories();
        render(document.getElementById("search").value);
      }
      function copy(text) {
        navigator.clipboard.writeText(text);
      }
      document.getElementById("search").addEventListener("input", (e) => render(e.target.value));
      renderCategories();
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
    
