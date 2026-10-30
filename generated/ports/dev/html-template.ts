// @ts-nocheck
// Generated from tools/dev/html-template.html
// Source SHA-256: 45acccda02a8cfeb4c304f270c17dfd850c5e38bf388015380d5eb0ce7703ae4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const templates = {
        basic: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ${getMeta()}
    <title>${getTitle()} - WebUtils</title>
    ${getCSS()}
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h2>${getTitle()}</h2>
    <p>欢迎访问我的页面。</p>
    ${getJS()}
</body>
</html>`,

        landing: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ${getMeta()}
    <title>${getTitle()} - WebUtils</title>
    ${getCSS()}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        .btn { display: inline-block; padding: 1rem 2rem; background: white; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: 600; transition: transform 0.2s; }
        .btn:hover { transform: translateY(-2px); }
        .features { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
        .features h2 { text-align: center; margin-bottom: 3rem; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature { text-align: center; padding: 2rem; border-radius: 8px; background: #f8f9fa; }
        .feature-icon { font-size: 3rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <section class="hero">
        <h2>${getTitle()}</h2>
        <p>${getDesc() || "打造卓越产品，提升用户体验"}</p>
        <a href="#features" class="btn">了解更多</a>
    </section>
    <section id="features" class="features">
        <h2>核心功能</h2>
        <div class="feature-grid">
            <div class="feature">
                <div class="feature-icon">🚀</div>
                <h3>快速部署</h3>
                <p>一键部署，快速上线您的项目</p>
            </div>
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <h3>安全可靠</h3>
                <p>企业级安全保障，数据加密存储</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📱</div>
                <h3>响应式设计</h3>
                <p>完美适配各种设备和屏幕尺寸</p>
            </div>
        </div>
    </section>
    ${getJS()}
</body>
</html>`,

        form: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ${getMeta()}
    <title>${getTitle()} - WebUtils</title>
    ${getCSS()}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; display: flex; justify-content: center; align-items: center; background: #f0f2f5; }
        .form-container { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .form-container h1 { text-align: center; margin-bottom: 1.5rem; font-size: 1.5rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
        .form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; transition: border-color 0.2s; }
        .form-group input:focus { outline: none; border-color: #667eea; }
        .btn {
      padding: 12px 24px;
      background: var(--color-accent-cyan);
      color: var(--color-bg-deep);
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    
    .btn:hover {
      background: #00dfc4;
      box-shadow: 0 0 20px var(--glow-cyan);
    }
        .btn:hover { background: #5a67d8; }
        .form-footer { text-align: center; margin-top: 1rem; color: #666; }
        .form-footer a { color: #667eea; text-decoration: none; }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>${getTitle()}</h2>
        <form id="loginForm" onsubmit="event.preventDefault(); alert('表单提交成功！');">
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" name="email" placeholder="请输入邮箱" required>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" id="password" name="password" placeholder="请输入密码" required>
            </div>
            <button type="submit" class="btn">登录</button>
        </form>
        <div class="form-footer">
            还没有账号？<a href="#">立即注册</a>
        </div>
    </div>
    ${getJS()}
</body>
</html>`,

        dashboard: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ${getMeta()}
    <title>${getTitle()} - WebUtils</title>
    ${getCSS()}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
        .dashboard { display: grid; grid-template-columns: 250px 1fr; min-height: 100vh; }
        .sidebar { background: #1a1a2e; color: white; padding: 1.5rem; }
        .sidebar h2 { margin-bottom: 2rem; font-size: 1.25rem; }
        .nav-item { display: block; padding: 0.75rem 1rem; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 6px; margin-bottom: 0.5rem; transition: all 0.2s; }
        .nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.1); color: white; }
        .main { background: #f0f2f5; }
        .header { background: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .content { padding: 2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .stat-card h3 { color: #666; font-size: 0.875rem; margin-bottom: 0.5rem; }
        .stat-card .value { font-size: 2rem; font-weight: 700; color: #1a1a2e; }
        .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (max-width: 768px) { .dashboard { grid-template-columns: 1fr; } .sidebar { display: none; } }
    </style>
</head>
<body>
    <div class="dashboard">
        <aside class="sidebar">
            <h2>📊 ${getTitle()}</h2>
            <nav>
                <a href="#" class="nav-item active">🏠 首页</a>
                <a href="#" class="nav-item">📈 数据分析</a>
                <a href="#" class="nav-item">👥 用户管理</a>
                <a href="#" class="nav-item">📝 内容管理</a>
                <a href="#" class="nav-item">⚙️ 系统设置</a>
            </nav>
        </aside>
        <main class="main">
            <header class="header">
                <h2>仪表盘</h2>
                <div>欢迎回来，管理员</div>
            </header>
            <div class="content">
                <div class="stats">
                    <div class="stat-card"><h3>总用户数</h3><div class="value">12,345</div></div>
                    <div class="stat-card"><h3>今日访问</h3><div class="value">1,234</div></div>
                    <div class="stat-card"><h3>收入</h3><div class="value">¥56,789</div></div>
                    <div class="stat-card"><h3>订单数</h3><div class="value">890</div></div>
                </div>
                <div class="card">
                    <h2>最近动态</h2>
                    <p style="color: #666; margin-top: 1rem;">暂无数据</p>
                </div>
            </div>
        </main>
    </div>
    ${getJS()}
</body>
</html>`,

        blog: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    ${getMeta()}
    <title>${getTitle()} - WebUtils</title>
    ${getCSS()}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Georgia, serif; line-height: 1.8; color: #333; }
        .article { max-width: 720px; margin: 0 auto; padding: 4rem 2rem; }
        .article-header { margin-bottom: 3rem; text-align: center; }
        .article-header h1 { font-size: 2.5rem; margin-bottom: 1rem; line-height: 1.3; }
        .article-meta { color: #666; font-size: 0.9rem; }
        .article-meta span { margin: 0 0.5rem; }
        .article-cover { width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem; }
        .article-content { font-size: 1.125rem; }
        .article-content p { margin-bottom: 1.5rem; }
        .article-content h2 { margin: 2rem 0 1rem; font-size: 1.5rem; }
        .article-content blockquote { border-left: 4px solid #667eea; padding-left: 1.5rem; margin: 2rem 0; color: #555; font-style: italic; }
        .article-content code { background: #f5f5f5; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; }
        .article-content pre { background: #1a1a2e; color: #f8f8f2; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
        .article-content pre code { background: none; padding: 0; }
        .article-tags { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
        .tag { display: inline-block; padding: 0.25rem 0.75rem; background: #f0f2f5; border-radius: 20px; font-size: 0.875rem; margin-right: 0.5rem; color: #666; text-decoration: none; }
    </style>
</head>
<body>
    <article class="article">
        <header class="article-header">
            <h2>${getTitle()}</h2>
            <div class="article-meta">
                <span>📅 2024-01-01</span>
                <span>✍️ ${getAuthor() || "作者"}</span>
                <span>⏱️ 5 分钟阅读</span>
            </div>
        </header>
        <img src="https://picsum.photos/800/400" alt="文章封面" class="article-cover">
        <div class="article-content">
            <p>${getDesc() || "这是文章的导语部分，用于概括文章的主要内容，吸引读者继续阅读。"}</p>
            <h2>第一部分</h2>
            <p>这里是文章的正文内容。你可以在这里添加段落、图片、代码块等各种内容。</p>
            <blockquote>这是一段引用文字，用于强调重要的观点或引用他人的话。</blockquote>
            <p>继续添加更多内容...</p>
            <h2>代码示例</h2>
            <pre><code>function hello() {
    console.log('Hello, World!');
}</code></pre>
        </div>
        <div class="article-tags">
            <a href="#" class="tag">#技术</a>
            <a href="#" class="tag">#教程</a>
            <a href="#" class="tag">#Web开发</a>
        </div>
    </article>
    ${getJS()}
</body>
</html>`,

        email: () => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getTitle()} - WebUtils</title>
    <!--[if mso]>
    <style type="text/css">
        body, table, td { font-family: Arial, sans-serif !important; }
    </style>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
            <td style="padding: 40px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #667eea; padding: 30px; text-align: center;">
                            <h2 style="margin: 0; color: #fff; font-size: 24px;">${getTitle()}</h2>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px; color: #333; font-size: 20px;">您好！</h2>
                            <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                                ${getDesc() || "感谢您使用我们的服务。这是一封示例邮件模板。"}
                            </p>
                            <p style="margin: 0 0 30px; color: #666; font-size: 16px; line-height: 1.6;">
                                请点击下面的按钮完成操作：
                            </p>
                            <!-- Button -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="background-color: #667eea; border-radius: 6px;">
                                        <a href="#" style="display: inline-block; padding: 15px 30px; color: #fff; text-decoration: none; font-weight: bold; font-size: 16px;">立即操作</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
                            <p style="margin: 0 0 10px; color: #999; font-size: 14px;">
                                如果您没有请求此邮件，请忽略它。
                            </p>
                            <p style="margin: 0; color: #999; font-size: 12px;">
                                © 2024 ${getAuthor() || "Company Name"}. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
      };

      // Helper functions
      function getTitle() {
        return document.getElementById("pageTitle").value || "我的页面";
      }
      function getDesc() {
        return document.getElementById("pageDesc").value;
      }
      function getAuthor() {
        return document.getElementById("pageAuthor").value;
      }

      function getMeta() {
        let meta = [];
        if (document.getElementById("optCharset").checked) meta.push('<meta charset="UTF-8">');
        if (document.getElementById("optViewport").checked)
          meta.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
        if (getDesc()) meta.push(``);
        if (getAuthor()) meta.push(`<meta name="author" content="${getAuthor()}">`);
        if (document.getElementById("optFavicon").checked)
          meta.push('<link rel="icon" href="/favicon.ico">');
        if (document.getElementById("optCanonical").checked)
          meta.push('<link rel="canonical" href="https://example.com/">');
        if (document.getElementById("optOG").checked) {
          meta.push(`<meta property="og:title" content="${getTitle()}">`);
          meta.push(`<meta property="og:description" content="${getDesc() || ""}">`);
          meta.push('<meta property="og:type" content="website">');
          meta.push('<meta property="og:url" content="https://example.com/">');
        }
        if (document.getElementById("optTwitter").checked) {
          meta.push('<meta name="twitter:card" content="summary_large_image">');
          meta.push(`<meta name="twitter:title" content="${getTitle()}">`);
          meta.push(`<meta name="twitter:description" content="${getDesc() || ""}">`);
        }
        return meta.join("\n    ");
      }

      function getCSS() {
        const framework = document.getElementById("cssFramework").value;
        const cssLinks = {
          pico: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">',
          bootstrap:
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">',
          tailwind: '<script src="https://cdn.tailwindcss.com"><\/script>',
          bulma:
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9/css/bulma.min.css">',
          normalize:
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8/normalize.min.css">'
        };
        return cssLinks[framework] || "";
      }

      function getJS() {
        let scripts = [];
        if (document.getElementById("libAlpine").checked)
          scripts.push(
            '<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js"><\/script>'
          );
        if (document.getElementById("libVue").checked)
          scripts.push(
            '<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.min.js"><\/script>'
          );
        if (document.getElementById("libJQuery").checked)
          scripts.push(
            '<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"><\/script>'
          );
        if (document.getElementById("libAxios").checked)
          scripts.push(
            '<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"><\/script>'
          );
        if (document.getElementById("cssFramework").value === "bootstrap")
          scripts.push(
            '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js"><\/script>'
          );
        return scripts.join("\n    ");
      }

      let currentTemplate = "basic";

      window.generate = function () {
        const output = templates[currentTemplate]();
        document.getElementById("output").value = output;
        updatePreview(output);
      };

      window.updatePreview = function (html) {
        const iframe = document.getElementById("previewFrame");
        iframe.srcdoc = html;
      };

      // Event listeners
      document.querySelectorAll(".template-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".template-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          currentTemplate = btn.dataset.template;
          generate();
        });
      });

      document.querySelectorAll(".tabs button").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tabs button").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const tab = btn.dataset.tab;
          document.getElementById("codeTab").style.display = tab === "code" ? "block" : "none";
          document.getElementById("previewTab").style.display =
            tab === "preview" ? "block" : "none";
        });
      });

      document.getElementById("generateBtn").addEventListener("click", generate);

      document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(document.getElementById("output").value);
        document.getElementById("copyBtn").textContent = "✓ 已复制";
        setTimeout(() => (document.getElementById("copyBtn").textContent = "📋 复制"), 2000);
      });

      document.getElementById("downloadBtn").addEventListener("click", () => {
        const blob = new Blob([document.getElementById("output").value], { type: "text/html" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "template.html";
        a.click();
      });

      document.getElementById("formatBtn").addEventListener("click", () => {
        const textarea = document.getElementById("output");
        let html = textarea.value;
        let formatted = "";
        let indent = 0;
        html.split(/>\s*</).forEach((element, i) => {
          if (i > 0) element = "<" + element;
          if (i < html.split(/>\s*</).length - 1) element = element + ">";
          if (element.match(/^<\/\w/)) indent--;
          formatted += "  ".repeat(Math.max(0, indent)) + element.trim() + "\n";
          if (element.match(/^<\w[^>]*[^\/]>.*$/)) indent++;
        });
        textarea.value = formatted.trim();
      });

      // Theme toggle
      const theme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", theme);
      document.getElementById("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";

      document.getElementById("themeToggle").addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        document.getElementById("themeToggle").textContent = next === "dark" ? "☀️" : "🌙";
      });

      // Auto-generate on input changes
      ["pageTitle", "pageDesc", "pageAuthor", "cssFramework"].forEach((id) => {
        document.getElementById(id).addEventListener("input", generate);
      });
      document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.addEventListener("change", generate);
      });

      // Initial generation
      generate();

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
    
