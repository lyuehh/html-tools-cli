// @ts-nocheck
// Generated from tools/dev/code-stats.html
// Source SHA-256: 5f82f06fda89444bf6807fdc3e7738c98a0e4ffd3cbe06f51dd2dc0a7d9059e6
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // 语言配置
      const langConfig = {
        javascript: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\b(function|const|let|var)\s+\w+\s*[=]?\s*(\(|async|function)/g,
          classes: /\bclass\s+\w+/g,
          imports: /\b(import|require)\b/g,
          keywords: [
            "function",
            "const",
            "let",
            "var",
            "if",
            "else",
            "for",
            "while",
            "return",
            "async",
            "await",
            "class",
            "export",
            "import",
            "try",
            "catch"
          ]
        },
        typescript: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\b(function|const|let|var)\s+\w+\s*[=:]?\s*(\(|async|function)/g,
          classes: /\b(class|interface|type)\s+\w+/g,
          imports: /\b(import|require)\b/g,
          keywords: [
            "function",
            "const",
            "let",
            "var",
            "if",
            "else",
            "for",
            "while",
            "return",
            "async",
            "await",
            "class",
            "interface",
            "type",
            "export",
            "import"
          ]
        },
        python: {
          singleComment: "#",
          multiCommentStart: '"""',
          multiCommentEnd: '"""',
          functions: /\bdef\s+\w+/g,
          classes: /\bclass\s+\w+/g,
          imports: /\b(import|from)\b/g,
          keywords: [
            "def",
            "class",
            "if",
            "elif",
            "else",
            "for",
            "while",
            "return",
            "import",
            "from",
            "try",
            "except",
            "with",
            "as",
            "lambda",
            "yield"
          ]
        },
        java: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions:
            /\b(public|private|protected|static)?\s*(void|int|String|boolean|\w+)\s+\w+\s*\(/g,
          classes: /\b(class|interface|enum)\s+\w+/g,
          imports: /\bimport\b/g,
          keywords: [
            "public",
            "private",
            "protected",
            "class",
            "interface",
            "void",
            "int",
            "String",
            "if",
            "else",
            "for",
            "while",
            "return",
            "new",
            "static",
            "final"
          ]
        },
        c: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\b(void|int|char|float|double|\w+)\s+\w+\s*\([^)]*\)\s*\{/g,
          classes: /\bstruct\s+\w+/g,
          imports: /\#include/g,
          keywords: [
            "int",
            "char",
            "void",
            "float",
            "double",
            "if",
            "else",
            "for",
            "while",
            "return",
            "struct",
            "typedef",
            "sizeof",
            "switch",
            "case",
            "break"
          ]
        },
        go: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\bfunc\s+(\(\w+\s+\*?\w+\)\s+)?\w+/g,
          classes: /\btype\s+\w+\s+(struct|interface)/g,
          imports: /\bimport\b/g,
          keywords: [
            "func",
            "type",
            "struct",
            "interface",
            "if",
            "else",
            "for",
            "range",
            "return",
            "go",
            "defer",
            "chan",
            "select",
            "package",
            "import",
            "var",
            "const"
          ]
        },
        rust: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\bfn\s+\w+/g,
          classes: /\b(struct|enum|trait|impl)\s+\w+/g,
          imports: /\buse\b/g,
          keywords: [
            "fn",
            "let",
            "mut",
            "struct",
            "enum",
            "impl",
            "trait",
            "if",
            "else",
            "for",
            "while",
            "loop",
            "match",
            "return",
            "use",
            "mod",
            "pub"
          ]
        },
        php: {
          singleComment: "//",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\bfunction\s+\w+/g,
          classes: /\b(class|interface|trait)\s+\w+/g,
          imports: /\b(use|require|include)\b/g,
          keywords: [
            "function",
            "class",
            "public",
            "private",
            "protected",
            "if",
            "else",
            "for",
            "foreach",
            "while",
            "return",
            "echo",
            "use",
            "namespace",
            "new",
            "static"
          ]
        },
        ruby: {
          singleComment: "#",
          multiCommentStart: "=begin",
          multiCommentEnd: "=end",
          functions: /\bdef\s+\w+/g,
          classes: /\bclass\s+\w+/g,
          imports: /\b(require|include)\b/g,
          keywords: [
            "def",
            "class",
            "module",
            "if",
            "elsif",
            "else",
            "unless",
            "while",
            "until",
            "for",
            "do",
            "end",
            "return",
            "require",
            "attr_accessor",
            "self"
          ]
        },
        html: {
          singleComment: null,
          multiCommentStart: "<!--",
          multiCommentEnd: "-->",
          functions: null,
          classes: /\bclass\s*=\s*["'][^"']+["']/g,
          imports: /<link|<script/g,
          keywords: [
            "div",
            "span",
            "p",
            "a",
            "img",
            "ul",
            "li",
            "table",
            "form",
            "input",
            "button",
            "head",
            "body",
            "html",
            "meta",
            "title"
          ]
        },
        css: {
          singleComment: null,
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /@(media|keyframes|import)/g,
          classes: /\.[a-zA-Z][\w-]*/g,
          imports: /@import/g,
          keywords: [
            "display",
            "position",
            "margin",
            "padding",
            "color",
            "background",
            "font",
            "width",
            "height",
            "border",
            "flex",
            "grid",
            "transform",
            "transition",
            "animation"
          ]
        },
        sql: {
          singleComment: "--",
          multiCommentStart: "/*",
          multiCommentEnd: "*/",
          functions: /\b(CREATE|ALTER)\s+(FUNCTION|PROCEDURE)/gi,
          classes: /\b(CREATE|ALTER)\s+TABLE/gi,
          imports: null,
          keywords: [
            "SELECT",
            "FROM",
            "WHERE",
            "INSERT",
            "UPDATE",
            "DELETE",
            "JOIN",
            "LEFT",
            "RIGHT",
            "INNER",
            "GROUP",
            "ORDER",
            "BY",
            "HAVING",
            "CREATE",
            "TABLE"
          ]
        },
        shell: {
          singleComment: "#",
          multiCommentStart: null,
          multiCommentEnd: null,
          functions: /\b\w+\s*\(\)\s*\{/g,
          classes: null,
          imports: /\b(source|\.)\s+/g,
          keywords: [
            "if",
            "then",
            "else",
            "elif",
            "fi",
            "for",
            "while",
            "do",
            "done",
            "case",
            "esac",
            "function",
            "return",
            "exit",
            "echo",
            "export"
          ]
        }
      };

      // 别名
      langConfig.csharp = langConfig.java;
      langConfig.swift = langConfig.java;
      langConfig.kotlin = langConfig.java;

      let currentLang = "auto";

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        }

        setupFileDrop();

        document.getElementById("codeInput").addEventListener("input", analyzeCode);
        document.getElementById("languageSelect").addEventListener("change", (e) => {
          currentLang = e.target.value;
          analyzeCode();
        });
      });

      // 设置文件拖放
      function setupFileDrop() {
        const dropZone = document.getElementById("fileDrop");
        const fileInput = document.getElementById("fileInput");

        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZone.classList.add("dragover");
        });

        dropZone.addEventListener("dragleave", () => {
          dropZone.classList.remove("dragover");
        });

        dropZone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropZone.classList.remove("dragover");
          const file = e.dataTransfer.files[0];
          if (file) loadFile(file);
        });

        fileInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) loadFile(file);
        });
      }

      // 加载文件
      window.loadFile = function (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("codeInput").value = e.target.result;
          detectLanguage(file.name);
          analyzeCode();
        };
        reader.readAsText(file);
      };

      // 检测语言
      function detectLanguage(filename) {
        const ext = filename.split(".").pop().toLowerCase();
        const extMap = {
          js: "javascript",
          jsx: "javascript",
          ts: "typescript",
          tsx: "typescript",
          py: "python",
          java: "java",
          c: "c",
          cpp: "c",
          h: "c",
          hpp: "c",
          cs: "csharp",
          go: "go",
          rs: "rust",
          php: "php",
          rb: "ruby",
          swift: "swift",
          kt: "kotlin",
          html: "html",
          htm: "html",
          css: "css",
          scss: "css",
          less: "css",
          sql: "sql",
          sh: "shell",
          bash: "shell"
        };

        if (extMap[ext]) {
          currentLang = extMap[ext];
          document.getElementById("languageSelect").value = currentLang;
        }
      }

      // 自动检测语言
      function autoDetectLanguage(code) {
        if (/\bdef\s+\w+.*:\s*$/m.test(code) || /^import\s+\w+$/m.test(code)) return "python";
        if (/\bfunc\s+\w+.*\{/m.test(code) || /^package\s+\w+$/m.test(code)) return "go";
        if (/\bfn\s+\w+.*->/m.test(code) || /^use\s+\w+::/m.test(code)) return "rust";
        if (/<\?php/i.test(code)) return "php";
        if (/^#!.*\/(ba)?sh/m.test(code)) return "shell";
        if (/<html|<div|<body/i.test(code)) return "html";
        if (/^\s*\{[\s\S]*\}[\s\S]*\{/m.test(code) || /@media|@keyframes/i.test(code)) return "css";
        if (/\bSELECT\b.*\bFROM\b/i.test(code)) return "sql";
        if (/\bpublic\s+class\b/i.test(code)) return "java";
        if (/\binterface\s+\w+\s*\{|:\s*\w+\s*[=;]/m.test(code)) return "typescript";
        return "javascript";
      }

      // 分析代码
      function analyzeCode() {
        const code = document.getElementById("codeInput").value;

        if (!code.trim()) {
          resetStats();
          return;
        }

        const lang = currentLang === "auto" ? autoDetectLanguage(code) : currentLang;
        const config = langConfig[lang] || langConfig.javascript;

        const lines = code.split("\n");
        const stats = {
          total: lines.length,
          code: 0,
          comment: 0,
          blank: 0,
          chars: code.length,
          nonSpaceChars: code.replace(/\s/g, "").length,
          words: (code.match(/\b\w+\b/g) || []).length,
          functions: 0,
          classes: 0,
          imports: 0
        };

        // 统计行
        let inMultiComment = false;
        const lineLengths = [];
        let indentSpaces = 0;

        lines.forEach((line) => {
          const trimmed = line.trim();
          lineLengths.push(line.length);

          // 统计缩进
          const leadingSpaces = line.match(/^\s*/)[0];
          indentSpaces += leadingSpaces.length;

          if (!trimmed) {
            stats.blank++;
            return;
          }

          // 多行注释检测
          if (
            config.multiCommentStart &&
            !inMultiComment &&
            trimmed.includes(config.multiCommentStart)
          ) {
            inMultiComment = true;
            if (
              !trimmed.includes(config.multiCommentEnd) ||
              trimmed.indexOf(config.multiCommentStart) > trimmed.indexOf(config.multiCommentEnd)
            ) {
              stats.comment++;
              return;
            }
          }

          if (inMultiComment) {
            stats.comment++;
            if (config.multiCommentEnd && trimmed.includes(config.multiCommentEnd)) {
              inMultiComment = false;
            }
            return;
          }

          // 单行注释检测
          if (config.singleComment && trimmed.startsWith(config.singleComment)) {
            stats.comment++;
            return;
          }

          stats.code++;
        });

        // 统计函数/类/导入
        if (config.functions) {
          stats.functions = (code.match(config.functions) || []).length;
        }
        if (config.classes) {
          stats.classes = (code.match(config.classes) || []).length;
        }
        if (config.imports) {
          stats.imports = (code.match(config.imports) || []).length;
        }

        // 计算关键字频率
        const keywordCounts = {};
        if (config.keywords) {
          config.keywords.forEach((kw) => {
            const regex = new RegExp("\\b" + kw + "\\b", "gi");
            const count = (code.match(regex) || []).length;
            if (count > 0) {
              keywordCounts[kw] = count;
            }
          });
        }

        // 更新 UI
        updateUI(stats, lineLengths, indentSpaces, keywordCounts);
      }

      // 更新 UI
      window.updateUI = function (stats, lineLengths, indentSpaces, keywordCounts) {
        // 行数
        document.getElementById("totalLines").textContent = stats.total;
        document.getElementById("codeLines").textContent = stats.code;
        document.getElementById("commentLines").textContent = stats.comment;
        document.getElementById("blankLines").textContent = stats.blank;

        // 进度条
        const total = stats.total || 1;
        document.getElementById("codeProgress").style.width = (stats.code / total) * 100 + "%";
        document.getElementById("commentProgress").style.width =
          (stats.comment / total) * 100 + "%";
        document.getElementById("blankProgress").style.width = (stats.blank / total) * 100 + "%";

        // 字符统计
        document.getElementById("totalChars").textContent = stats.chars.toLocaleString();
        document.getElementById("nonSpaceChars").textContent = stats.nonSpaceChars.toLocaleString();
        document.getElementById("wordCount").textContent = stats.words.toLocaleString();
        document.getElementById("avgLineLength").textContent =
          Math.round(lineLengths.reduce((a, b) => a + b, 0) / lineLengths.length) || 0;
        document.getElementById("maxLineLength").textContent = Math.max(...lineLengths) || 0;
        document.getElementById("indentSpaces").textContent = indentSpaces.toLocaleString();

        // 复杂度
        document.getElementById("functionCount").textContent = stats.functions;
        document.getElementById("classCount").textContent = stats.classes;
        document.getElementById("importCount").textContent = stats.imports;

        // 复杂度指标计算
        const complexity = Math.min(
          100,
          stats.functions * 5 + stats.classes * 10 + stats.total / 10
        );
        document.getElementById("complexityIndicator").style.left = complexity + "%";

        // Top 关键字
        const topKeywords = Object.entries(keywordCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        const keywordsContainer = document.getElementById("topKeywords");
        keywordsContainer.textContent = "";

        if (topKeywords.length === 0) {
          const div = document.createElement("div");
          div.className = "top-item";
          div.innerHTML = "<span>-</span><span>0</span>";
          keywordsContainer.appendChild(div);
        } else {
          topKeywords.forEach(([kw, count]) => {
            const div = document.createElement("div");
            div.className = "top-item";

            const kwSpan = document.createElement("code");
            kwSpan.textContent = kw;

            const countSpan = document.createElement("span");
            countSpan.textContent = count;

            div.appendChild(kwSpan);
            div.appendChild(countSpan);
            keywordsContainer.appendChild(div);
          });
        }
      };

      // 重置统计
      window.resetStats = function () {
        const ids = [
          "totalLines",
          "codeLines",
          "commentLines",
          "blankLines",
          "totalChars",
          "nonSpaceChars",
          "wordCount",
          "avgLineLength",
          "maxLineLength",
          "indentSpaces",
          "functionCount",
          "classCount",
          "importCount"
        ];
        ids.forEach((id) => (document.getElementById(id).textContent = "0"));

        document.getElementById("codeProgress").style.width = "0%";
        document.getElementById("commentProgress").style.width = "0%";
        document.getElementById("blankProgress").style.width = "0%";
        document.getElementById("complexityIndicator").style.left = "0%";

        document.getElementById("topKeywords").innerHTML =
          '<div class="top-item"><span>-</span><span>0</span></div>';
      };

      // 清空
      window.clearCode = function () {
        document.getElementById("codeInput").value = "";
        resetStats();
      };

      // 加载示例
      window.loadSample = function () {
        const sampleCode = `// 示例 JavaScript 代码
import React, { useState, useEffect } from 'react';
import { fetchData } from './api';

/**
 * 用户列表组件
 * @param {Object} props - 组件属性
 */
function UserList({ initialUsers = [] }) {
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 加载用户数据
    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await fetchData('/api/users');
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // 渲染加载状态
    if (loading) {
        return <div className="loading">加载中...</div>;
    }

    // 渲染错误状态
    if (error) {
        return <div className="error">错误: {error}</div>;
    }

    // 渲染用户列表
    return (
        <ul className="user-list">
            {users.map(user => (
                <li key={user.id} className="user-item">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                </li>
            ))}
        </ul>
    );
}

export default UserList;`;

        document.getElementById("codeInput").value = sampleCode;
        document.getElementById("languageSelect").value = "javascript";
        currentLang = "javascript";
        analyzeCode();
      };

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
        localStorage.setItem("theme", html.getAttribute("data-theme"));
      };
    
