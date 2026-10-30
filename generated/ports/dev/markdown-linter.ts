// @ts-nocheck
// Generated from tools/dev/markdown-linter.html
// Source SHA-256: abdb8b2798237e81e192c1b48fc03cbc63de4c2c49f1e01eba9ac917f95a121d
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      var mdInputEl = document.getElementById("mdInput");
      var lintResultsEl = document.getElementById("lintResults");
      var statusEl = document.getElementById("status");
      var statsEl = document.getElementById("stats");
      var issueCountEl = document.getElementById("issueCount");
      var LS_KEY = "markdown_linter_input_v1";

      var SAMPLE_MD = [
        "# 项目简介",
        "",
        "这是一个示例 Markdown 文档，包含一些常见问题。",
        "",
        "### 安装方法",
        "",
        "跳过了 H2，直接使用 H3。",
        "",
        "## 快速开始",
        "",
        "```",
        "npm install",
        "```",
        "",
        "代码块缺少语言标识。",
        "",
        "## 快速开始",
        "",
        "这是一个重复的标题。",
        "",
        "## 链接示例  ",
        "",
        "这行末尾有多余空格。",
        "",
        "- [正常链接](https://example.com)",
        "- [空链接]()",
        "- [引用链接][ref]",
        "- 裸露 URL: http://example.org",
        "",
        "## 空节标题",
        "",
        "## 另一个节",
        "",
        "这里有内容。"
      ].join("\n");

      function loadFromStorage() {
        var saved = localStorage.getItem(LS_KEY);
        if (saved) mdInputEl.value = saved;
      }
      function saveToStorage() {
        localStorage.setItem(LS_KEY, mdInputEl.value);
      }
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      function lintMarkdown(text) {
        var lines = text.split("\n");
        var issues = [];
        var headingLevelEnabled = document.getElementById("chkHeadingLevel").checked;
        var dupHeadingEnabled = document.getElementById("chkDupHeading").checked;
        var codeLangEnabled = document.getElementById("chkCodeLang").checked;
        var brokenLinkEnabled = document.getElementById("chkBrokenLink").checked;
        var trailingSpaceEnabled = document.getElementById("chkTrailingSpace").checked;
        var emptySectionEnabled = document.getElementById("chkEmptySection").checked;
        var longLineEnabled = document.getElementById("chkLongLine").checked;

        var prevHeadingLevel = 0;
        var seenHeadings = {};
        var inCodeBlock = false;
        var codeBlockLine = -1;
        var lastHeadingText = null;
        var lastHeadingLineIdx = -1;
        var sectionHasContent = false;

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          var lineNum = i + 1;

          // Track fenced code blocks
          if (/^(`{3,}|~{3,})/.test(line)) {
            if (!inCodeBlock) {
              inCodeBlock = true;
              codeBlockLine = lineNum;
              var fenceMatch = line.match(/^(`{3,}|~{3,})(.*)/);
              var lang = fenceMatch ? fenceMatch[2].trim() : "";
              if (codeLangEnabled && !lang) {
                issues.push({
                  line: lineNum,
                  severity: "warning",
                  rule: "MD040",
                  message: "代码块未指定语言标识符"
                });
              }
            } else {
              inCodeBlock = false;
              codeBlockLine = -1;
            }
            continue;
          }

          if (inCodeBlock) continue;

          // Heading checks
          var headingMatch = line.match(/^(#{1,6})\s+(.+)/);
          if (headingMatch) {
            var level = headingMatch[1].length;
            var headingText = headingMatch[2].trim();

            // Check heading level jump
            if (headingLevelEnabled && prevHeadingLevel > 0 && level > prevHeadingLevel + 1) {
              issues.push({
                line: lineNum,
                severity: "error",
                rule: "MD001",
                message:
                  "标题层级跳跃：从 H" +
                  prevHeadingLevel +
                  " 跳到 H" +
                  level +
                  "（应为 H" +
                  (prevHeadingLevel + 1) +
                  "）"
              });
            }

            // Check empty section (previous heading had no content)
            if (emptySectionEnabled && lastHeadingText !== null && !sectionHasContent) {
              issues.push({
                line: lastHeadingLineIdx + 1,
                severity: "warning",
                rule: "MD026",
                message: "空节：标题「" + lastHeadingText + "」下没有任何内容"
              });
            }

            // Check duplicate headings
            var headingKey = headingText.toLowerCase();
            if (dupHeadingEnabled && seenHeadings[headingKey] !== undefined) {
              issues.push({
                line: lineNum,
                severity: "warning",
                rule: "MD024",
                message:
                  "重复标题：「" + headingText + "」已在第 " + seenHeadings[headingKey] + " 行出现"
              });
            } else {
              seenHeadings[headingKey] = lineNum;
            }

            prevHeadingLevel = level;
            lastHeadingText = headingText;
            lastHeadingLineIdx = i;
            sectionHasContent = false;
            continue;
          }

          // Track section content (non-empty lines that aren't headings)
          if (line.trim().length > 0) {
            sectionHasContent = true;
          }

          // Trailing spaces
          if (trailingSpaceEnabled && / {2,}$/.test(line)) {
            issues.push({
              line: lineNum,
              severity: "info",
              rule: "MD009",
              message: "行尾有多余空格（" + (line.length - line.trimEnd().length) + " 个）"
            });
          }

          // Broken / malformed links
          if (brokenLinkEnabled) {
            // Inline link with empty URL
            var emptyLinkRe = /\[([^\]]*)\]\(\s*\)/g;
            var emptyMatch;
            while ((emptyMatch = emptyLinkRe.exec(line)) !== null) {
              issues.push({
                line: lineNum,
                severity: "error",
                rule: "MD011",
                message: "链接 URL 为空：[" + emptyMatch[1] + "]()"
              });
            }

            // Reference-style link [text][ref]
            var refLinkRe = /\[([^\]]+)\]\[([^\]]*)\]/g;
            var refMatch;
            while ((refMatch = refLinkRe.exec(line)) !== null) {
              issues.push({
                line: lineNum,
                severity: "warning",
                rule: "MD052",
                message: "引用式链接 [" + refMatch[1] + "][" + refMatch[2] + "]，确认已定义引用"
              });
            }

            // Bare URLs (not inside a link or code span)
            var bareUrlRe = /(?<![(\[`])https?:\/\/[^\s)\]`]+/g;
            var bareMatch;
            while ((bareMatch = bareUrlRe.exec(line)) !== null) {
              issues.push({
                line: lineNum,
                severity: "info",
                rule: "MD034",
                message: "裸露 URL，建议用 <URL> 或 [文字](URL) 包裹：" + bareMatch[0]
              });
            }
          }

          // Long line check
          if (longLineEnabled && line.length > 120) {
            issues.push({
              line: lineNum,
              severity: "info",
              rule: "MD013",
              message: "行长度 " + line.length + " 超过 120 字符"
            });
          }
        }

        // Check last section for emptiness
        if (emptySectionEnabled && lastHeadingText !== null && !sectionHasContent) {
          issues.push({
            line: lastHeadingLineIdx + 1,
            severity: "warning",
            rule: "MD026",
            message: "空节：标题「" + lastHeadingText + "」下没有任何内容"
          });
        }

        // Check unclosed code block
        if (inCodeBlock) {
          issues.push({
            line: codeBlockLine,
            severity: "error",
            rule: "MD031",
            message: "代码块未闭合（从第 " + codeBlockLine + " 行开始）"
          });
        }

        // Sort by line number
        issues.sort(function (a, b) {
          return a.line - b.line || a.severity.localeCompare(b.severity);
        });

        return issues;
      }

      function escapeHtml(str) {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }

      function renderResults(issues, lineCount) {
        var errors = issues.filter(function (item) {
          return item.severity === "error";
        });
        var warnings = issues.filter(function (item) {
          return item.severity === "warning";
        });
        var infos = issues.filter(function (item) {
          return item.severity === "info";
        });

        document.getElementById("statErrors").textContent = errors.length;
        document.getElementById("statWarnings").textContent = warnings.length;
        document.getElementById("statInfos").textContent = infos.length;
        document.getElementById("statLines").textContent = lineCount;
        statsEl.classList.add("show");

        var total = issues.length;
        issueCountEl.textContent = total > 0 ? total + " 个问题" : "";

        if (total === 0) {
          lintResultsEl.innerHTML =
            '<div class="lint-all-clear">' +
            '<div class="lint-all-clear-icon">&#10003;</div>' +
            '<div class="lint-all-clear-text">没有发现问题，文档规范！</div>' +
            "</div>";
          showStatus("检查完成，0 个问题", "success");
          return;
        }

        var html = "";
        var groups = [
          { label: "错误", items: errors },
          { label: "警告", items: warnings },
          { label: "提示", items: infos }
        ];
        groups.forEach(function (group) {
          if (group.items.length === 0) return;
          html +=
            '<div class="lint-section-header">' +
            group.label +
            " (" +
            group.items.length +
            ")</div>";
          group.items.forEach(function (issue) {
            var sevClass = issue.severity;
            html +=
              '<div class="lint-item severity-' +
              sevClass +
              '">' +
              '<span class="lint-line">L' +
              issue.line +
              "</span>" +
              '<span class="lint-severity ' +
              sevClass +
              '">' +
              issue.severity +
              "</span>" +
              '<span class="lint-rule">' +
              escapeHtml(issue.rule) +
              "</span>" +
              '<span class="lint-msg">' +
              escapeHtml(issue.message) +
              "</span>" +
              "</div>";
          });
        });
        lintResultsEl.innerHTML = html;

        if (errors.length > 0) {
          showStatus("发现 " + errors.length + " 个错误，" + warnings.length + " 个警告", "error");
        } else {
          showStatus("发现 " + warnings.length + " 个警告，" + infos.length + " 个提示", "");
        }
      }

      function buildPlainReport(issues) {
        if (issues.length === 0) return "检查完成：没有发现问题。";
        var lines = ["Markdown Lint 报告", "=".repeat(40)];
        issues.forEach(function (issue) {
          lines.push(
            "L" + issue.line + "\t" + issue.severity + "\t" + issue.rule + "\t" + issue.message
          );
        });
        return lines.join("\n");
      }

      function runLint() {
        var text = mdInputEl.value;
        if (!text.trim()) {
          showStatus("请先输入 Markdown 内容", "error");
          lintResultsEl.innerHTML = '<div class="lint-empty">请先输入 Markdown 内容</div>';
          statsEl.classList.remove("show");
          issueCountEl.textContent = "";
          return;
        }
        var issues = lintMarkdown(text);
        var lineCount = text.split("\n").length;
        renderResults(issues, lineCount);
      }

      document.getElementById("btnPaste").onclick = async function () {
        try {
          var text = await navigator.clipboard.readText();
          mdInputEl.value = text;
          saveToStorage();
          showStatus("已粘贴", "success");
        } catch (e) {
          showStatus("无法访问剪贴板", "error");
        }
      };

      document.getElementById("btnLint").onclick = function () {
        runLint();
        saveToStorage();
      };

      document.getElementById("btnClear").onclick = function () {
        mdInputEl.value = "";
        lintResultsEl.innerHTML = '<div class="lint-empty">粘贴 Markdown 后点击「检查」</div>';
        statsEl.classList.remove("show");
        issueCountEl.textContent = "";
        statusEl.textContent = "";
        statusEl.className = "status";
        localStorage.removeItem(LS_KEY);
      };

      document.getElementById("btnCopyReport").onclick = async function () {
        var text = mdInputEl.value;
        if (!text.trim()) {
          showStatus("没有内容可检查", "error");
          return;
        }
        var issues = lintMarkdown(text);
        var report = buildPlainReport(issues);
        try {
          await navigator.clipboard.writeText(report);
          showStatus("报告已复制", "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      document.getElementById("btnLoadSample").onclick = function () {
        mdInputEl.value = SAMPLE_MD;
        saveToStorage();
        showStatus("示例已加载，点击「检查」查看结果", "");
      };

      mdInputEl.addEventListener("input", function () {
        saveToStorage();
      });

      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          runLint();
        }
      });

      window.toggleTheme = function () {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };
      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      }
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
      loadFromStorage();
    
