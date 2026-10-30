// @ts-nocheck
// Generated from tools/text/md-to-html.html
// Source SHA-256: a4c60cf5cb2419b092a958ef6587ecbece0628800466f6cafdac6703139b6266
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme
      function initTheme() {
        const saved = localStorage.getItem("theme");
        if (saved) document.documentElement.setAttribute("data-theme", saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
          document.documentElement.setAttribute("data-theme", "dark");
      }
      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      };
      initTheme();

      // Configure marked
      marked.setOptions({
        breaks: true,
        gfm: true
      });

      function convert() {
        const md = document.getElementById("mdInput").value;
        const html = marked.parse(md);

        document.getElementById("previewArea").innerHTML = html;
        document.getElementById("htmlOutput").value = html;
        document.getElementById("inputStats").textContent = md.length + " 字符";
      }

      window.switchTab = function (tab) {
        document.querySelectorAll(".tab-btn").forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.textContent.includes(tab === "preview" ? "预览" : "HTML")
          );
        });

        document.getElementById("previewArea").style.display = tab === "preview" ? "block" : "none";
        document.getElementById("htmlOutput").classList.toggle("active", tab === "html");
      };

      window.loadExample = function () {
        document.getElementById("mdInput").value = `# Markdown 示例

这是一个 **Markdown** 转 *HTML* 的示例。

## 功能特点

- 实时预览
- 支持 GFM 语法
- 代码高亮

### 代码示例

\`\`\`javascript
function hello() {
    console.log('Hello, World!');
}
\`\`\`

### 表格示例

| 名称 | 价格 | 数量 |
|------|------|------|
| 苹果 | ¥5   | 10   |
| 香蕉 | ¥3   | 20   |

### 引用

> 这是一段引用文字。
> 可以多行。

### 链接和图片

[访问 GitHub](https://github.com)

### 任务列表

- [x] 已完成任务
- [ ] 待完成任务

---

*感谢使用！*`;
        convert();
      };

      window.clearAll = function () {
        document.getElementById("mdInput").value = "";
        document.getElementById("previewArea").innerHTML = "";
        document.getElementById("htmlOutput").value = "";
        document.getElementById("inputStats").textContent = "0 字符";
      };

      window.copyHTML = function () {
        const html = document.getElementById("htmlOutput").value;
        if (html) {
          navigator.clipboard.writeText(html);
          alert("HTML 已复制");
        }
      };

      window.downloadHTML = function () {
        const html = document.getElementById("htmlOutput").value;
        if (!html) return;

        const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document - WebUtils</title>
    <style>
        body { font-family: var(--font-sans); line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { background: #f5f5f5; padding: 2px 5px; border-radius: 3px; }
        blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>
${html}
</body>
</html>`;

        const blob = new Blob([fullHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.html";
        a.click();
        URL.revokeObjectURL(url);
      };

      // Load example on start
      loadExample();
    
