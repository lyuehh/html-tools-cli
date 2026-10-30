// @ts-nocheck
// Generated from tools/seo/heading-analyzer.html
// Source SHA-256: 9dd33c62dda94be1443d08d34c5d007be42c383f69dc043683bd291cfd8b7ab2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.getElementById("theme-icon").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      (function () {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.getElementById("theme-icon").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();

      function createIssueItem(issue) {
        const item = document.createElement("div");
        item.className = "issue-item " + issue.type;

        const icon = document.createElement("span");
        icon.className = "issue-icon";
        if (issue.type === "error") icon.textContent = "❌";
        else if (issue.type === "warning") icon.textContent = "⚠️";
        else icon.textContent = "✅";

        const content = document.createElement("div");
        content.className = "issue-content";

        const title = document.createElement("div");
        title.className = "issue-title";
        title.textContent = issue.title;

        const desc = document.createElement("div");
        desc.className = "issue-desc";
        desc.textContent = issue.desc;

        content.appendChild(title);
        content.appendChild(desc);
        item.appendChild(icon);
        item.appendChild(content);

        return item;
      }

      function createHeadingItem(h) {
        const item = document.createElement("div");
        item.className = "heading-item";
        item.style.paddingLeft = (h.level - 1) * 1.5 + "rem";

        const tag = document.createElement("span");
        tag.className = "heading-tag h" + h.level + "-tag";
        tag.textContent = "H" + h.level;

        const text = document.createElement("span");
        text.className = "heading-text";
        text.textContent = h.text || "(空标题)";

        const length = document.createElement("span");
        length.className = "heading-length";
        length.textContent = h.text.length + "字";

        item.appendChild(tag);
        item.appendChild(text);
        item.appendChild(length);

        return item;
      }

      window.analyzeHeadings = function () {
        const html = document.getElementById("htmlInput").value;

        if (!html.trim()) {
          alert("请输入HTML代码");
          return;
        }

        // 解析标题
        const headingRegex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
        const headings = [];
        let match;

        while ((match = headingRegex.exec(html)) !== null) {
          const level = parseInt(match[1]);
          // 移除HTML标签，获取纯文本
          const text = match[2].replace(/<[^>]+>/g, "").trim();
          headings.push({ level: level, text: text });
        }

        // 统计各级标题数量
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        headings.forEach(function (h) {
          counts[h.level]++;
        });

        // 更新统计显示
        for (var i = 1; i <= 6; i++) {
          document.getElementById("h" + i + "Count").textContent = counts[i];
        }

        // 检查问题
        const issues = [];
        let score = 100;

        // 检查H1
        if (counts[1] === 0) {
          issues.push({
            type: "error",
            title: "缺少H1标签",
            desc: "每个页面应该有一个H1标签作为主标题"
          });
          score -= 30;
        } else if (counts[1] > 1) {
          issues.push({
            type: "warning",
            title: "存在多个H1标签",
            desc: "发现 " + counts[1] + " 个H1标签，建议每页只使用一个H1"
          });
          score -= 15;
        } else {
          issues.push({
            type: "success",
            title: "H1标签使用正确",
            desc: "页面包含一个H1标签"
          });
        }

        // 检查标题层级跳跃
        let prevLevel = 0;
        let hasSkip = false;
        headings.forEach(function (h) {
          if (prevLevel > 0 && h.level > prevLevel + 1) {
            hasSkip = true;
          }
          prevLevel = h.level;
        });

        if (hasSkip) {
          issues.push({
            type: "warning",
            title: "标题层级跳跃",
            desc: "存在跳级现象（如H2直接跳到H4），建议保持层级连续性"
          });
          score -= 10;
        } else if (headings.length > 1) {
          issues.push({
            type: "success",
            title: "标题层级连续",
            desc: "标题层级结构良好，没有跳级现象"
          });
        }

        // 检查是否以H1开头
        if (headings.length > 0 && headings[0].level !== 1) {
          issues.push({
            type: "warning",
            title: "首个标题不是H1",
            desc: "页面的第一个标题应该是H1"
          });
          score -= 10;
        }

        // 检查空标题
        const emptyHeadings = headings.filter(function (h) {
          return !h.text;
        });
        if (emptyHeadings.length > 0) {
          issues.push({
            type: "error",
            title: "存在空标题",
            desc: "发现 " + emptyHeadings.length + " 个空标题，标题应该包含有意义的文本"
          });
          score -= 10 * emptyHeadings.length;
        }

        // 检查过长标题
        const longHeadings = headings.filter(function (h) {
          return h.text.length > 70;
        });
        if (longHeadings.length > 0) {
          issues.push({
            type: "warning",
            title: "存在过长标题",
            desc: "发现 " + longHeadings.length + " 个标题超过70字符，建议精简"
          });
          score -= 5;
        }

        // 检查标题数量
        if (headings.length === 0) {
          issues.push({
            type: "error",
            title: "未发现标题标签",
            desc: "输入的HTML中没有找到任何标题标签"
          });
          score = 0;
        } else if (headings.length < 3) {
          issues.push({
            type: "warning",
            title: "标题数量较少",
            desc: "只发现 " + headings.length + " 个标题，建议使用更多标题来组织内容"
          });
        }

        // 确保分数在0-100之间
        score = Math.max(0, Math.min(100, score));

        // 更新分数显示
        const scoreValue = document.getElementById("scoreValue");
        scoreValue.textContent = score;
        scoreValue.className = "score-value";
        if (score >= 90) scoreValue.classList.add("score-excellent");
        else if (score >= 70) scoreValue.classList.add("score-good");
        else if (score >= 50) scoreValue.classList.add("score-average");
        else if (score >= 30) scoreValue.classList.add("score-poor");
        else scoreValue.classList.add("score-bad");

        // 渲染问题列表
        const issuesList = document.getElementById("issuesList");
        issuesList.textContent = "";
        issues.forEach(function (issue) {
          issuesList.appendChild(createIssueItem(issue));
        });

        // 渲染标题树
        const tree = document.getElementById("headingTree");
        tree.textContent = "";

        if (headings.length === 0) {
          tree.textContent = "未发现标题标签";
        } else {
          headings.forEach(function (h) {
            tree.appendChild(createHeadingItem(h));
          });
        }

        document.getElementById("results").style.display = "block";
      };
    
