// @ts-nocheck
// Generated from tools/dev/markdown-to-html.html
// Source SHA-256: 7bb67d848392dbd2168eb8a7146ee9a9a60a63addc6d2e1877480935d888fa4c
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 加载保存的主题
      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      }

      // 标签切换
      window.switchTab = function (tab) {
        document.querySelectorAll(".tabs button").forEach((btn) => btn.classList.add("secondary"));
        document
          .querySelectorAll(".output-content")
          .forEach((content) => content.classList.remove("active"));

        document.getElementById(`tab-${tab}`).classList.remove("secondary");
        document.getElementById(`${tab}-output`).classList.add("active");
      };

      // 转换 Markdown
      function convertMarkdown() {
        const input = document.getElementById("markdown-input").value;

        // 配置 marked
        marked.setOptions({
          breaks: true,
          gfm: true
        });

        const html = marked.parse(input);
        const sanitizedHtml = DOMPurify.sanitize(html);

        document.getElementById("preview-output").innerHTML = sanitizedHtml;
        document.getElementById("html-code").value = html;

        updateStats();
      }

      // 更新统计信息
      function updateStats() {
        const input = document.getElementById("markdown-input").value;
        const html = document.getElementById("html-code").value;

        const lines = input.split("\n").length;
        const chars = input.length;

        document.getElementById("input-stats").textContent = `字符: ${chars} | 行数: ${lines}`;
        document.getElementById("output-stats").textContent = `HTML 字符: ${html.length}`;
      }

      // 复制 HTML
      window.copyHTML = function () {
        const html = document.getElementById("html-code").value;
        navigator.clipboard
          .writeText(html)
          .then(() => {
            alert("HTML 代码已复制到剪贴板！");
          })
          .catch((err) => {
            console.error("复制失败:", err);
            const textarea = document.getElementById("html-code");
            textarea.select();
            document.execCommand("copy");
            alert("HTML 代码已复制到剪贴板！");
          });
      };

      // 下载 HTML
      window.downloadHTML = function () {
        const html = document.getElementById("html-code").value;
        const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown 转换结果 - WebUtils</title>
    <style>
        body { font-family: var(--font-sans); max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        pre { background: #f4f4f4; padding: 1rem; overflow-x: auto; border-radius: 4px; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
        pre code { background: none; padding: 0; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f4f4f4; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1rem; color: #666; }
        img { max-width: 100%; }
    </style>
</head>
<body>
${html}
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "markdown-output.html";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("markdown-input").value = "";
        document.getElementById("preview-output").innerHTML = "";
        document.getElementById("html-code").value = "";
        updateStats();
      };

      // 加载示例
      window.loadSample = function () {
        const sample = `# Markdown 示例文档

## 文本格式

这是**粗体**文本，这是*斜体*文本，这是~~删除线~~文本。

## 列表

### 无序列表
- 项目一
- 项目二
  - 子项目
  - 另一个子项目
- 项目三

### 有序列表
1. 第一步
2. 第二步
3. 第三步

## 代码

行内代码：\`console.log('hello')\`

代码块：
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`

## 表格

| 标题1 | 标题2 | 标题3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

## 引用

> 这是一段引用文字
> 可以有多行

## 链接和图片

[这是一个链接](https://example.com)

![图片描述](https://via.placeholder.com/150)

## 分隔线

---

## 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 另一个任务
`;
        document.getElementById("markdown-input").value = sample;
        convertMarkdown();
      };

      // 实时转换
      document.getElementById("markdown-input").addEventListener("input", function () {
        convertMarkdown();
      });

      // 初始化
      loadTheme();
      convertMarkdown();
    
