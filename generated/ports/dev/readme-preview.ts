// @ts-nocheck
// Generated from tools/dev/readme-preview.html
// Source SHA-256: fe6f59b7e6a7bbdb0d492b54e9e436df13b2eaf00f2147260d5ea880c79246f5
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const editor = document.getElementById("editor");
      const preview = document.getElementById("preview");
      const stats = document.getElementById("stats");
      const themeToggle = document.getElementById("themeToggle");
      const fileInput = document.getElementById("fileInput");
      const templateSelect = document.getElementById("templateSelect");

      const templates = {
        basic: `# 项目名称

简短的项目描述。

## 功能特性

- 功能 1
- 功能 2
- 功能 3

## 安装

\`\`\`bash
npm install your-package
\`\`\`

## 使用方法

\`\`\`javascript
const pkg = require('your-package');
pkg.doSomething();
\`\`\`

## 贡献

欢迎提交 Pull Request。

## 许可证

MIT
`,
        npm: `# package-name

[![npm version](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name)
[![license](https://img.shields.io/npm/l/package-name.svg)](https://github.com/user/repo/blob/main/LICENSE)

> 一句话描述你的包

## 安装

\`\`\`bash
npm install package-name
# 或者
yarn add package-name
# 或者
pnpm add package-name
\`\`\`

## 快速开始

\`\`\`javascript
import { something } from 'package-name';

const result = something();
console.log(result);
\`\`\`

## API

### \`functionName(options)\`

函数描述。

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| option1 | \`string\` | \`''\` | 选项1描述 |
| option2 | \`number\` | \`0\` | 选项2描述 |

#### 返回值

返回 \`ResultType\` 类型的结果。

## 示例

更多示例请查看 [examples](./examples) 目录。

## 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md)

## 贡献指南

查看 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证

[MIT](./LICENSE) © Your Name
`,
        api: `# API 文档

## 概述

API 的简要描述。

**基础 URL:** \`https://api.example.com/v1\`

## 认证

所有请求需要在 Header 中包含 API Key：

\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`

## 端点

### 获取列表

\`\`\`
GET /items
\`\`\`

#### 查询参数

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| page | integer | 否 | 页码，默认 1 |
| limit | integer | 否 | 每页数量，默认 20 |

#### 响应示例

\`\`\`json
{
  "data": [
    {
      "id": 1,
      "name": "Item 1"
    }
  ],
  "total": 100,
  "page": 1
}
\`\`\`

### 创建项目

\`\`\`
POST /items
\`\`\`

#### 请求体

\`\`\`json
{
  "name": "New Item",
  "description": "Description"
}
\`\`\`

#### 响应

- \`201 Created\` - 创建成功
- \`400 Bad Request\` - 参数错误
- \`401 Unauthorized\` - 未授权

## 错误码

| 状态码 | 描述 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |
`
      };

      marked.setOptions({
        breaks: true,
        gfm: true
      });

      function initTheme() {
        const savedTheme = localStorage.getItem("readme-preview-theme") || "light";
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
        localStorage.setItem("readme-preview-theme", newTheme);
        updateThemeButton(newTheme);
      });

      window.updatePreview = function () {
        const markdown = editor.value;
        const rawHtml = marked.parse(markdown);
        preview.innerHTML = DOMPurify.sanitize(rawHtml);
        updateStats();
        localStorage.setItem("readme-preview-content", markdown);
      };

      function updateStats() {
        const content = editor.value;
        const chars = content.length;
        const lines = content ? content.split("\n").length : 0;
        const words = content.trim() ? content.trim().split(/\s+/).length : 0;
        stats.textContent = `${chars} 字符 | ${lines} 行 | ${words} 词`;
      }

      editor.addEventListener("input", updatePreview);

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            editor.value = event.target.result;
            updatePreview();
          };
          reader.readAsText(file);
        }
        fileInput.value = "";
      });

      window.downloadMarkdown = function () {
        const content = editor.value;
        if (!content.trim()) {
          alert("编辑器内容为空！");
          return;
        }
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.copyToClipboard = function () {
        navigator.clipboard.writeText(editor.value).then(() => {
          alert("已复制到剪贴板！");
        });
      };

      window.copyHtml = function () {
        navigator.clipboard.writeText(preview.innerHTML).then(() => {
          alert("HTML 已复制到剪贴板！");
        });
      };

      window.clearEditor = function () {
        if (confirm("确定要清空编辑器内容吗？")) {
          editor.value = "";
          updatePreview();
        }
      };

      window.loadTemplate = function () {
        const template = templateSelect.value;
        if (template && templates[template]) {
          if (editor.value.trim() && !confirm("当前内容将被替换，确定继续吗？")) {
            templateSelect.value = "";
            return;
          }
          editor.value = templates[template];
          updatePreview();
        }
        templateSelect.value = "";
      };

      function restoreContent() {
        const saved = localStorage.getItem("readme-preview-content");
        if (saved) {
          editor.value = saved;
          updatePreview();
        } else {
          editor.value = `# 欢迎使用 README 预览器

这是一个 **Markdown** 实时预览工具。

## 功能

- 实时预览
- 多种模板
- 导出文件
- 深色模式

## 代码示例

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

> 引用文本示例

| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |
`;
          updatePreview();
        }
      }

      editor.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey) {
          if (e.key === "s") {
            e.preventDefault();
            downloadMarkdown();
          }
        }
        if (e.key === "Tab") {
          e.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.value = editor.value.substring(0, start) + "    " + editor.value.substring(end);
          editor.selectionStart = editor.selectionEnd = start + 4;
          updatePreview();
        }
      });

      initTheme();
      restoreContent();

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
    
