// @ts-nocheck
// Generated from tools/dev/git-cheatsheet.html
// Source SHA-256: b583642862ab78398a918cfd9b1c64d5a46a142497ab900456c27692f76313fe
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const GIT_COMMANDS = {
        基础配置: [
          { cmd: 'git config --global user.name "Your Name"', desc: "设置全局用户名" },
          { cmd: 'git config --global user.email "email@example.com"', desc: "设置全局邮箱" },
          { cmd: "git config --list", desc: "查看所有配置" },
          { cmd: "git config --global core.editor vim", desc: "设置默认编辑器" },
          { cmd: "git config --global alias.co checkout", desc: "创建命令别名" }
        ],
        仓库操作: [
          { cmd: "git init", desc: "初始化新仓库" },
          { cmd: "git clone <url>", desc: "克隆远程仓库" },
          { cmd: "git clone --depth 1 <url>", desc: "浅克隆（只克隆最新提交）" },
          { cmd: "git remote -v", desc: "查看远程仓库" },
          { cmd: "git remote add origin <url>", desc: "添加远程仓库" },
          { cmd: "git remote set-url origin <url>", desc: "修改远程仓库地址" }
        ],
        文件操作: [
          { cmd: "git status", desc: "查看工作区状态" },
          { cmd: "git add <file>", desc: "添加文件到暂存区" },
          { cmd: "git add .", desc: "添加所有更改" },
          { cmd: "git add -p", desc: "交互式添加（按块选择）" },
          { cmd: "git rm <file>", desc: "删除文件" },
          { cmd: "git rm --cached <file>", desc: "从暂存区移除（保留本地文件）" },
          { cmd: "git mv <old> <new>", desc: "重命名/移动文件" }
        ],
        提交操作: [
          { cmd: 'git commit -m "message"', desc: "提交更改" },
          { cmd: 'git commit -am "message"', desc: "添加并提交（仅已跟踪文件）" },
          { cmd: "git commit --amend", desc: "修改最后一次提交" },
          { cmd: "git commit --amend --no-edit", desc: "追加到上次提交（不改消息）" },
          { cmd: 'git commit --allow-empty -m "msg"', desc: "创建空提交" }
        ],
        分支管理: [
          { cmd: "git branch", desc: "列出本地分支" },
          { cmd: "git branch -a", desc: "列出所有分支（含远程）" },
          { cmd: "git branch <name>", desc: "创建新分支" },
          { cmd: "git branch -d <name>", desc: "删除分支（已合并）" },
          { cmd: "git branch -D <name>", desc: "强制删除分支" },
          { cmd: "git branch -m <new>", desc: "重命名当前分支" },
          { cmd: "git checkout <branch>", desc: "切换分支" },
          { cmd: "git checkout -b <branch>", desc: "创建并切换分支" },
          { cmd: "git switch <branch>", desc: "切换分支（新语法）" },
          { cmd: "git switch -c <branch>", desc: "创建并切换（新语法）" }
        ],
        合并与变基: [
          { cmd: "git merge <branch>", desc: "合并分支到当前分支" },
          { cmd: "git merge --no-ff <branch>", desc: "非快进合并（保留分支历史）" },
          { cmd: "git merge --squash <branch>", desc: "压缩合并（不创建合并提交）" },
          { cmd: "git rebase <branch>", desc: "变基到指定分支" },
          { cmd: "git rebase -i HEAD~3", desc: "交互式变基最近3个提交" },
          { cmd: "git rebase --abort", desc: "中止变基" },
          { cmd: "git rebase --continue", desc: "继续变基" },
          { cmd: "git cherry-pick <commit>", desc: "挑选特定提交" }
        ],
        远程同步: [
          { cmd: "git fetch", desc: "获取远程更新（不合并）" },
          { cmd: "git fetch --all", desc: "获取所有远程仓库更新" },
          { cmd: "git pull", desc: "获取并合并远程更新" },
          { cmd: "git pull --rebase", desc: "获取并变基" },
          { cmd: "git push", desc: "推送到远程" },
          { cmd: "git push -u origin <branch>", desc: "推送并设置上游分支" },
          { cmd: "git push --force", desc: "强制推送（危险）" },
          { cmd: "git push --force-with-lease", desc: "安全强制推送" },
          { cmd: "git push origin --delete <branch>", desc: "删除远程分支" }
        ],
        查看历史: [
          { cmd: "git log", desc: "查看提交历史" },
          { cmd: "git log --oneline", desc: "简洁历史（一行一提交）" },
          { cmd: "git log --graph", desc: "图形化显示分支历史" },
          { cmd: "git log -p", desc: "显示每次提交的差异" },
          { cmd: 'git log --author="name"', desc: "按作者筛选" },
          { cmd: 'git log --since="2 weeks ago"', desc: "按时间筛选" },
          { cmd: "git log -- <file>", desc: "查看文件历史" },
          { cmd: "git show <commit>", desc: "查看提交详情" },
          { cmd: "git blame <file>", desc: "查看文件每行的最后修改" }
        ],
        差异比较: [
          { cmd: "git diff", desc: "查看未暂存的更改" },
          { cmd: "git diff --staged", desc: "查看已暂存的更改" },
          { cmd: "git diff <commit1> <commit2>", desc: "比较两个提交" },
          { cmd: "git diff <branch1>..<branch2>", desc: "比较两个分支" },
          { cmd: "git diff --stat", desc: "查看更改统计" }
        ],
        撤销与重置: [
          { cmd: "git checkout -- <file>", desc: "撤销工作区更改" },
          { cmd: "git restore <file>", desc: "撤销工作区更改（新语法）" },
          { cmd: "git restore --staged <file>", desc: "取消暂存" },
          { cmd: "git reset HEAD <file>", desc: "取消暂存（旧语法）" },
          { cmd: "git reset --soft HEAD~1", desc: "撤销提交（保留更改在暂存区）" },
          { cmd: "git reset --mixed HEAD~1", desc: "撤销提交（保留更改在工作区）" },
          { cmd: "git reset --hard HEAD~1", desc: "撤销提交（丢弃所有更改）" },
          { cmd: "git revert <commit>", desc: "创建反向提交" },
          { cmd: "git clean -fd", desc: "删除未跟踪的文件和目录" }
        ],
        暂存工作: [
          { cmd: "git stash", desc: "暂存当前更改" },
          { cmd: 'git stash push -m "message"', desc: "暂存并添加描述" },
          { cmd: "git stash list", desc: "列出所有暂存" },
          { cmd: "git stash pop", desc: "恢复最近的暂存" },
          { cmd: "git stash apply stash@{0}", desc: "应用指定暂存" },
          { cmd: "git stash drop stash@{0}", desc: "删除指定暂存" },
          { cmd: "git stash clear", desc: "清空所有暂存" }
        ],
        标签管理: [
          { cmd: "git tag", desc: "列出所有标签" },
          { cmd: "git tag <name>", desc: "创建轻量标签" },
          { cmd: 'git tag -a <name> -m "msg"', desc: "创建附注标签" },
          { cmd: "git tag -d <name>", desc: "删除本地标签" },
          { cmd: "git push origin <tag>", desc: "推送标签" },
          { cmd: "git push origin --tags", desc: "推送所有标签" },
          { cmd: "git push origin --delete <tag>", desc: "删除远程标签" }
        ]
      };

      const categories = Object.keys(GIT_COMMANDS);
      let activeCategory = "全部";

      function renderTabs() {
        const tabs = document.getElementById("tabs");
        tabs.innerHTML = "";

        const allTab = document.createElement("button");
        allTab.className = "tab" + (activeCategory === "全部" ? " active" : "");
        allTab.textContent = "全部";
        allTab.addEventListener("click", function () {
          setCategory("全部");
        });
        tabs.appendChild(allTab);

        categories.forEach(function (cat) {
          const tab = document.createElement("button");
          tab.className = "tab" + (activeCategory === cat ? " active" : "");
          tab.textContent = cat;
          tab.addEventListener("click", function () {
            setCategory(cat);
          });
          tabs.appendChild(tab);
        });
      }

      window.setCategory = function (cat) {
        activeCategory = cat;
        renderTabs();
        renderCommands();
      };

      function renderCommands(filter) {
        const content = document.getElementById("content");
        content.innerHTML = "";
        const search = (filter || "").toLowerCase();

        const catsToShow = activeCategory === "全部" ? categories : [activeCategory];

        catsToShow.forEach(function (cat) {
          const commands = GIT_COMMANDS[cat].filter(function (c) {
            if (!search) return true;
            return c.cmd.toLowerCase().includes(search) || c.desc.toLowerCase().includes(search);
          });

          if (commands.length === 0) return;

          const title = document.createElement("h2");
          title.className = "category-title";
          title.textContent = cat;
          content.appendChild(title);

          commands.forEach(function (c) {
            const card = document.createElement("div");
            card.className = "card";

            const cmdDiv = document.createElement("div");
            cmdDiv.className = "cmd";
            cmdDiv.title = "点击复制";

            const code = document.createElement("code");
            code.textContent = c.cmd;
            cmdDiv.appendChild(code);

            const copyIcon = document.createElement("span");
            copyIcon.className = "copy-icon";
            copyIcon.textContent = "📋";
            cmdDiv.appendChild(copyIcon);

            cmdDiv.addEventListener("click", async function () {
              try {
                await navigator.clipboard.writeText(c.cmd);
                copyIcon.textContent = "✓";
                setTimeout(function () {
                  copyIcon.textContent = "📋";
                }, 1000);
              } catch (e) {}
            });

            const desc = document.createElement("div");
            desc.className = "desc-text";
            desc.textContent = c.desc;

            card.appendChild(cmdDiv);
            card.appendChild(desc);
            content.appendChild(card);
          });
        });

        if (content.children.length === 0) {
          const noResult = document.createElement("div");
          noResult.style.textAlign = "center";
          noResult.style.padding = "40px";
          noResult.style.color = "var(--text-muted)";
          noResult.textContent = "没有找到匹配的命令";
          content.appendChild(noResult);
        }
      }

      document.getElementById("search").addEventListener("input", function (e) {
        renderCommands(e.target.value);
      });

      renderTabs();
      renderCommands();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next || "light");
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = "🌙";
        }
      })();
    
