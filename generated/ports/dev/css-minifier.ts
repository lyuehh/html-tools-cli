// @ts-nocheck
// Generated from tools/dev/css-minifier.html
// Source SHA-256: 9151062e6a5400b090fe39949e277003a6d548349df1bd401149faa25e1c3160
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

      // CSS 压缩
      function minifyCSS() {
        let css = document.getElementById("css-input").value;
        const originalSize = new Blob([css]).size;

        const removeComments = document.getElementById("opt-remove-comments").checked;
        const removeWhitespace = document.getElementById("opt-remove-whitespace").checked;
        const removeSemicolon = document.getElementById("opt-remove-semicolon").checked;
        const shortenColors = document.getElementById("opt-shorten-colors").checked;
        const shortenZero = document.getElementById("opt-shorten-zero").checked;
        const mergeSelectors = document.getElementById("opt-merge-selectors").checked;

        // 移除注释
        if (removeComments) {
          css = css.replace(/\/\*[\s\S]*?\*\//g, "");
        }

        // 简化颜色值
        if (shortenColors) {
          // #ffffff -> #fff
          css = css.replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/gi, "#$1$2$3");

          // rgb(255, 255, 255) -> #fff
          css = css.replace(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi, (match, r, g, b) => {
            const hex =
              "#" +
              [r, g, b]
                .map((x) => {
                  const h = parseInt(x).toString(16);
                  return h.length === 1 ? "0" + h : h;
                })
                .join("");
            // 检查是否可以简化
            if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
              return "#" + hex[1] + hex[3] + hex[5];
            }
            return hex;
          });
        }

        // 简化零值
        if (shortenZero) {
          css = css.replace(/\b0(px|em|rem|%|pt|pc|in|cm|mm|ex|ch|vw|vh|vmin|vmax)\b/gi, "0");
          css = css.replace(/\b0\.(\d)/g, ".$1");
        }

        // 移除空白
        if (removeWhitespace) {
          css = css.replace(/\s+/g, " ");
          css = css.replace(/\s*{\s*/g, "{");
          css = css.replace(/\s*}\s*/g, "}");
          css = css.replace(/\s*;\s*/g, ";");
          css = css.replace(/\s*:\s*/g, ":");
          css = css.replace(/\s*,\s*/g, ",");
          css = css.replace(/\s*>\s*/g, ">");
          css = css.replace(/\s*~\s*/g, "~");
          css = css.replace(/\s*\+\s*/g, "+");
          css = css.trim();
        }

        // 移除末尾分号
        if (removeSemicolon) {
          css = css.replace(/;}/g, "}");
        }

        // 合并相同选择器
        if (mergeSelectors) {
          const rules = {};
          const ruleRegex = /([^{}]+){([^{}]*)}/g;
          let match;
          const orderedSelectors = [];

          while ((match = ruleRegex.exec(css)) !== null) {
            const selector = match[1].trim();
            const declarations = match[2].trim();

            // 跳过 @规则
            if (selector.startsWith("@")) {
              orderedSelectors.push({ selector, declarations, isAtRule: true });
            } else {
              if (!rules[selector]) {
                rules[selector] = [];
                orderedSelectors.push({ selector, isAtRule: false });
              }
              rules[selector].push(declarations);
            }
          }

          css = orderedSelectors
            .map((item) => {
              if (item.isAtRule) {
                return `${item.selector}{${item.declarations}}`;
              }
              const merged = rules[item.selector].join(";");
              delete rules[item.selector]; // 防止重复
              return merged ? `${item.selector}{${merged}}` : "";
            })
            .filter(Boolean)
            .join("");
        }

        document.getElementById("css-output").value = css;

        // 更新统计
        const minifiedSize = new Blob([css]).size;
        const savings = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;
        const gzipEstimate = Math.round(minifiedSize * 0.3); // 粗略估算

        document.getElementById("original-size").textContent = originalSize.toLocaleString();
        document.getElementById("minified-size").textContent = minifiedSize.toLocaleString();
        document.getElementById("savings").textContent = savings + "%";
        document.getElementById("savings").className =
          "value " + (savings >= 0 ? "savings-positive" : "savings-negative");
        document.getElementById("gzip-estimate").textContent = gzipEstimate.toLocaleString();

        updateStats();
      }

      // CSS 美化
      window.beautifyCSS = function () {
        let css = document.getElementById("css-input").value;

        // 移除多余空白
        css = css.replace(/\s+/g, " ");

        // 在 { 后添加换行
        css = css.replace(/\s*{\s*/g, " {\n  ");

        // 在 } 后添加换行
        css = css.replace(/\s*}\s*/g, "\n}\n\n");

        // 在 ; 后添加换行
        css = css.replace(/;\s*/g, ";\n  ");

        // 修复缩进
        css = css.replace(/\n {2}}/g, "\n}");

        // 移除多余换行
        css = css.replace(/\n{3,}/g, "\n\n");

        css = css.trim();

        document.getElementById("css-output").value = css;
        updateStats();

        // 重置压缩统计
        const size = new Blob([css]).size;
        document.getElementById("original-size").textContent = new Blob([
          document.getElementById("css-input").value
        ]).size.toLocaleString();
        document.getElementById("minified-size").textContent = size.toLocaleString();
        document.getElementById("savings").textContent = "0%";
        document.getElementById("gzip-estimate").textContent = Math.round(
          size * 0.3
        ).toLocaleString();
      };

      // 更新统计
      function updateStats() {
        const input = document.getElementById("css-input").value;
        const output = document.getElementById("css-output").value;

        // 统计选择器数量
        const selectorCount = (input.match(/[^{}]+(?={)/g) || []).length;

        // 统计属性数量
        const propertyCount = (input.match(/[^{}:;]+:/g) || []).length;

        document.getElementById("input-stats").textContent =
          `行数: ${input.split("\n").length} | 选择器: ${selectorCount} | 属性: ${propertyCount}`;
        document.getElementById("output-stats").textContent = `行数: ${output.split("\n").length}`;
      }

      // 复制
      window.copyCSS = function () {
        const css = document.getElementById("css-output").value;
        navigator.clipboard
          .writeText(css)
          .then(() => {
            alert("CSS 代码已复制到剪贴板！");
          })
          .catch((err) => {
            console.error("复制失败:", err);
            const textarea = document.getElementById("css-output");
            textarea.select();
            document.execCommand("copy");
            alert("CSS 代码已复制到剪贴板！");
          });
      };

      // 下载
      window.downloadCSS = function () {
        const css = document.getElementById("css-output").value;
        const blob = new Blob([css], { type: "text/css;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "styles.min.css";
        a.click();
        URL.revokeObjectURL(url);
      };

      // 清空
      window.clearAll = function () {
        document.getElementById("css-input").value = "";
        document.getElementById("css-output").value = "";
        document.getElementById("original-size").textContent = "0";
        document.getElementById("minified-size").textContent = "0";
        document.getElementById("savings").textContent = "0%";
        document.getElementById("gzip-estimate").textContent = "0";
        updateStats();
      };

      // 加载示例
      window.loadSample = function () {
        const sample = `/* ==========================================================================
   基础样式
   ========================================================================== */

/* 重置样式 */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 根元素 */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --font-family: var(--font-sans);
    --font-size-base: 16px;
    --line-height-base: 1.5;
}

/* 页面主体 */
body {
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    line-height: var(--line-height-base);
    color: #333333;
    background-color: #ffffff;
}

/* ==========================================================================
   布局组件
   ========================================================================== */

/* 容器 */
.container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
}

/* 网格系统 */
.row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
}

.col {
    flex: 1;
    padding-left: 15px;
    padding-right: 15px;
}

/* ==========================================================================
   按钮组件
   ========================================================================== */

.btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, 
                background-color 0.15s ease-in-out, 
                border-color 0.15s ease-in-out, 
                box-shadow 0.15s ease-in-out;
}

.btn-primary {
    color: #ffffff;
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    color: #ffffff;
    background-color: #0069d9;
    border-color: #0062cc;
}

.btn-secondary {
    color: #ffffff;
    background-color: #6c757d;
    border-color: #6c757d;
}

/* ==========================================================================
   响应式设计
   ========================================================================== */

@media (max-width: 992px) {
    .container {
        max-width: 960px;
    }
}

@media (max-width: 768px) {
    .container {
        max-width: 720px;
    }
    
    .row {
        flex-direction: column;
    }
    
    .col {
        flex: none;
        width: 100%;
    }
}

@media (max-width: 576px) {
    .container {
        max-width: 540px;
    }
    
    .btn {
        display: block;
        width: 100%;
    }
}`;
        document.getElementById("css-input").value = sample;
        minifyCSS();
      };

      // 实时更新统计
      document.getElementById("css-input").addEventListener("input", updateStats);

      // 初始化
      loadTheme();
      minifyCSS();
    
