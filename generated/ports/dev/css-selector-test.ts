// @ts-nocheck
// Generated from tools/dev/css-selector-test.html
// Source SHA-256: 2d360a57be2b7fc1ac27358132ed65f5f748b46f4acc9cd05e5a2d1eef5d2e07
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const defaultHtml = `<div id="main" class="container">
    <header class="header">
        <h2>网站标题</h2>
        <nav>
            <ul class="nav-list">
                <li class="item active"><a href="#">首页</a></li>
                <li class="item"><a href="#">产品</a></li>
                <li class="item"><a href="#">关于</a></li>
            </ul>
        </nav>
    </header>
    <main class="content">
        <article class="post">
            <h2 class="title">文章标题</h2>
            <p class="intro">这是第一段文字。</p>
            <p>这是第二段文字。</p>
            <button class="btn btn-primary">主要按钮</button>
            <button class="btn btn-secondary">次要按钮</button>
        </article>
    </main>
    <footer>
        <p>&copy; 2024 示例网站</p>
    </footer>
</div>`;

      // 初始化
      document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          document.documentElement.setAttribute("data-theme", savedTheme);
        }

        document.getElementById("htmlInput").value = defaultHtml;
        updatePreview();

        // 实时更新预览
        document.getElementById("htmlInput").addEventListener("input", () => {
          updatePreview();
          testSelector();
        });

        // 实时测试选择器
        document.getElementById("selectorInput").addEventListener("input", testSelector);

        // 回车测试
        document.getElementById("selectorInput").addEventListener("keypress", (e) => {
          if (e.key === "Enter") testSelector();
        });
      });

      // 更新预览
      window.updatePreview = function () {
        const html = document.getElementById("htmlInput").value;
        const preview = document.getElementById("previewContainer");

        // 安全地设置HTML内容
        preview.textContent = "";
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        preview.appendChild(wrapper);
      };

      // 测试选择器
      function testSelector() {
        const selector = document.getElementById("selectorInput").value.trim();
        const preview = document.getElementById("previewContainer");
        const errorMsg = document.getElementById("errorMessage");
        const matchCount = document.getElementById("matchCount");
        const matchedList = document.getElementById("matchedList");

        // 清除之前的高亮
        preview.querySelectorAll(".matched").forEach((el) => {
          el.classList.remove("matched");
        });

        errorMsg.textContent = "";
        matchedList.textContent = "";

        if (!selector) {
          matchCount.textContent = "0 个匹配";
          return;
        }

        try {
          const matched = preview.querySelectorAll(selector);
          matchCount.textContent = matched.length + " 个匹配";

          matched.forEach((el, index) => {
            el.classList.add("matched");

            // 显示匹配元素的外层HTML（截断）
            const div = document.createElement("div");
            div.className = "matched-item";

            let outerHtml = el.outerHTML;
            if (outerHtml.length > 200) {
              // 只显示开标签
              const tagMatch = outerHtml.match(/^<[^>]+>/);
              outerHtml = tagMatch ? tagMatch[0] + "..." : outerHtml.substring(0, 200) + "...";
            }
            div.textContent = index + 1 + ". " + outerHtml;
            matchedList.appendChild(div);
          });
        } catch (e) {
          errorMsg.textContent = "无效的选择器: " + e.message;
          matchCount.textContent = "错误";
        }
      }

      // 设置示例选择器
      window.setSelector = function (selector) {
        document.getElementById("selectorInput").value = selector;
        testSelector();
      };

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
        localStorage.setItem("theme", html.getAttribute("data-theme"));
      };
    
