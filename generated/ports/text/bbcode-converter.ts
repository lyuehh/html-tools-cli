// @ts-nocheck
// Generated from tools/text/bbcode-converter.html
// Source SHA-256: 3727e4f22510d70963b588545cfd1afd40e8a6878fb888da829232315336d809
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // BBCode转HTML规则
      const bbcodeToHtmlRules = [
        // 基本格式
        [/\[b\]([\s\S]*?)\[\/b\]/gi, "<strong>$1</strong>"],
        [/\[i\]([\s\S]*?)\[\/i\]/gi, "<em>$1</em>"],
        [/\[u\]([\s\S]*?)\[\/u\]/gi, "<u>$1</u>"],
        [/\[s\]([\s\S]*?)\[\/s\]/gi, "<s>$1</s>"],
        [/\[strike\]([\s\S]*?)\[\/strike\]/gi, "<s>$1</s>"],

        // 链接和图片
        [/\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, '<a href="$1">$2</a>'],
        [/\[url\]([\s\S]*?)\[\/url\]/gi, '<a href="$1">$1</a>'],
        [/\[img\]([\s\S]*?)\[\/img\]/gi, '<img src="$1" alt="image">'],
        [
          /\[img=(\d+)x(\d+)\]([\s\S]*?)\[\/img\]/gi,
          '<img src="$3" width="$1" height="$2" alt="image">'
        ],

        // 颜色和大小
        [/\[color=([^\]]+)\]([\s\S]*?)\[\/color\]/gi, '<span style="color:$1">$2</span>'],
        [/\[size=([^\]]+)\]([\s\S]*?)\[\/size\]/gi, '<span style="font-size:$1">$2</span>'],
        [/\[font=([^\]]+)\]([\s\S]*?)\[\/font\]/gi, '<span style="font-family:$1">$2</span>'],

        // 对齐
        [/\[center\]([\s\S]*?)\[\/center\]/gi, '<div style="text-align:center">$1</div>'],
        [/\[left\]([\s\S]*?)\[\/left\]/gi, '<div style="text-align:left">$1</div>'],
        [/\[right\]([\s\S]*?)\[\/right\]/gi, '<div style="text-align:right">$1</div>'],

        // 引用和代码
        [
          /\[quote=([^\]]+)\]([\s\S]*?)\[\/quote\]/gi,
          "<blockquote><cite>$1</cite><p>$2</p></blockquote>"
        ],
        [/\[quote\]([\s\S]*?)\[\/quote\]/gi, "<blockquote>$1</blockquote>"],
        [/\[code\]([\s\S]*?)\[\/code\]/gi, "<pre><code>$1</code></pre>"],

        // 列表
        [
          /\[list\]([\s\S]*?)\[\/list\]/gi,
          function (match, content) {
            const items = content.split(/\[\*\]/).filter((item) => item.trim());
            return "<ul>" + items.map((item) => "<li>" + item.trim() + "</li>").join("") + "</ul>";
          }
        ],
        [
          /\[list=1\]([\s\S]*?)\[\/list\]/gi,
          function (match, content) {
            const items = content.split(/\[\*\]/).filter((item) => item.trim());
            return "<ol>" + items.map((item) => "<li>" + item.trim() + "</li>").join("") + "</ol>";
          }
        ],

        // 标题
        [/\[h1\]([\s\S]*?)\[\/h1\]/gi, "<h2>$1</h2>"],
        [/\[h2\]([\s\S]*?)\[\/h2\]/gi, "<h2>$1</h2>"],
        [/\[h3\]([\s\S]*?)\[\/h3\]/gi, "<h3>$1</h3>"],

        // 分割线
        [/\[hr\]/gi, "<hr>"],

        // 换行
        [/\n/g, "<br>"]
      ];

      // HTML转BBCode规则
      const htmlToBBCodeRules = [
        // 基本格式
        [/<strong>([\s\S]*?)<\/strong>/gi, "[b]$1[/b]"],
        [/<b>([\s\S]*?)<\/b>/gi, "[b]$1[/b]"],
        [/<em>([\s\S]*?)<\/em>/gi, "[i]$1[/i]"],
        [/<i>([\s\S]*?)<\/i>/gi, "[i]$1[/i]"],
        [/<u>([\s\S]*?)<\/u>/gi, "[u]$1[/u]"],
        [/<s>([\s\S]*?)<\/s>/gi, "[s]$1[/s]"],
        [/<strike>([\s\S]*?)<\/strike>/gi, "[s]$1[/s]"],
        [/<del>([\s\S]*?)<\/del>/gi, "[s]$1[/s]"],

        // 链接和图片
        [/<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[url=$1]$2[/url]"],
        [/<img[^>]+src="([^"]*)"[^>]*>/gi, "[img]$1[/img]"],

        // 颜色和大小
        [
          /<span[^>]+style="[^"]*color:\s*([^;"]+)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
          "[color=$1]$2[/color]"
        ],
        [
          /<span[^>]+style="[^"]*font-size:\s*([^;"]+)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
          "[size=$1]$2[/size]"
        ],
        [
          /<span[^>]+style="[^"]*font-family:\s*([^;"]+)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
          "[font=$1]$2[/font]"
        ],

        // 对齐
        [
          /<div[^>]+style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
          "[center]$1[/center]"
        ],
        [
          /<div[^>]+style="[^"]*text-align:\s*left[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
          "[left]$1[/left]"
        ],
        [
          /<div[^>]+style="[^"]*text-align:\s*right[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
          "[right]$1[/right]"
        ],
        [/<center>([\s\S]*?)<\/center>/gi, "[center]$1[/center]"],

        // 引用和代码
        [
          /<blockquote[^>]*><cite>([^<]*)<\/cite><p>([\s\S]*?)<\/p><\/blockquote>/gi,
          "[quote=$1]$2[/quote]"
        ],
        [/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "[quote]$1[/quote]"],
        [/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "[code]$1[/code]"],
        [/<code[^>]*>([\s\S]*?)<\/code>/gi, "[code]$1[/code]"],

        // 列表
        [
          /<ul[^>]*>([\s\S]*?)<\/ul>/gi,
          function (match, content) {
            const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
            const bbItems = items.map((item) => "[*]" + item.replace(/<\/?li[^>]*>/gi, "").trim());
            return "[list]" + bbItems.join("") + "[/list]";
          }
        ],
        [
          /<ol[^>]*>([\s\S]*?)<\/ol>/gi,
          function (match, content) {
            const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
            const bbItems = items.map((item) => "[*]" + item.replace(/<\/?li[^>]*>/gi, "").trim());
            return "[list=1]" + bbItems.join("") + "[/list]";
          }
        ],

        // 标题
        [/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "[h1]$1[/h1]"],
        [/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "[h2]$1[/h2]"],
        [/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "[h3]$1[/h3]"],

        // 分割线
        [/<hr[^>]*>/gi, "[hr]"],

        // 换行和段落
        [/<br\s*\/?>/gi, "\n"],
        [/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n"],
        [/<div[^>]*>([\s\S]*?)<\/div>/gi, "$1\n"],

        // 清理其他标签
        [/<[^>]+>/g, ""]
      ];

      // 安全的HTML渲染（白名单方式）
      function sanitizeAndRenderHtml(html) {
        const preview = document.getElementById("preview");
        // 清空现有内容
        preview.textContent = "";

        // 创建一个临时容器来解析HTML
        const template = document.createElement("template");
        template.innerHTML = html;

        // 白名单标签
        const allowedTags = [
          "strong",
          "b",
          "em",
          "i",
          "u",
          "s",
          "strike",
          "del",
          "a",
          "img",
          "span",
          "div",
          "p",
          "br",
          "hr",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "pre",
          "code",
          "cite"
        ];

        // 递归清理节点
        function cleanNode(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            return document.createTextNode(node.textContent);
          }

          if (node.nodeType !== Node.ELEMENT_NODE) {
            return null;
          }

          const tagName = node.tagName.toLowerCase();

          if (!allowedTags.includes(tagName)) {
            // 不允许的标签，只保留文本内容
            const fragment = document.createDocumentFragment();
            for (const child of node.childNodes) {
              const cleanedChild = cleanNode(child);
              if (cleanedChild) {
                fragment.appendChild(cleanedChild);
              }
            }
            return fragment;
          }

          // 创建干净的元素
          const cleanElement = document.createElement(tagName);

          // 只允许特定属性
          if (tagName === "a" && node.hasAttribute("href")) {
            const href = node.getAttribute("href");
            if (
              href &&
              (href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:"))
            ) {
              cleanElement.setAttribute("href", href);
              cleanElement.setAttribute("target", "_blank");
              cleanElement.setAttribute("rel", "noopener noreferrer");
            }
          }

          if (tagName === "img" && node.hasAttribute("src")) {
            const src = node.getAttribute("src");
            if (
              src &&
              (src.startsWith("http://") ||
                src.startsWith("https://") ||
                src.startsWith("data:image/"))
            ) {
              cleanElement.setAttribute("src", src);
              cleanElement.setAttribute("alt", node.getAttribute("alt") || "image");
              cleanElement.style.maxWidth = "100%";
            }
          }

          // 处理style属性（只允许安全的样式）
          if (node.hasAttribute("style")) {
            const style = node.getAttribute("style");
            const safeStyles = [];

            // 允许的CSS属性
            const allowedStyles = [
              "color",
              "font-size",
              "font-family",
              "text-align",
              "text-decoration"
            ];

            for (const prop of allowedStyles) {
              const match = style.match(new RegExp(prop + "\\s*:\\s*([^;]+)"));
              if (match) {
                safeStyles.push(prop + ":" + match[1].trim());
              }
            }

            if (safeStyles.length > 0) {
              cleanElement.setAttribute("style", safeStyles.join(";"));
            }
          }

          // 递归处理子节点
          for (const child of node.childNodes) {
            const cleanedChild = cleanNode(child);
            if (cleanedChild) {
              cleanElement.appendChild(cleanedChild);
            }
          }

          return cleanElement;
        }

        // 处理所有子节点
        const fragment = document.createDocumentFragment();
        for (const child of template.content.childNodes) {
          const cleanedChild = cleanNode(child);
          if (cleanedChild) {
            fragment.appendChild(cleanedChild);
          }
        }

        preview.appendChild(fragment);
      }

      // BBCode转HTML
      window.bbcodeToHtml = function () {
        let text = document.getElementById("bbcode").value;

        for (const [pattern, replacement] of bbcodeToHtmlRules) {
          text = text.replace(pattern, replacement);
        }

        document.getElementById("html").value = text;
        sanitizeAndRenderHtml(text);
      };

      // HTML转BBCode
      window.htmlToBBCode = function () {
        let text = document.getElementById("html").value;

        for (const [pattern, replacement] of htmlToBBCodeRules) {
          text = text.replace(pattern, replacement);
        }

        // 清理多余空白
        text = text.replace(/\n{3,}/g, "\n\n").trim();

        document.getElementById("bbcode").value = text;
      };

      // 复制BBCode
      window.copyBBCode = function () {
        const bbcode = document.getElementById("bbcode").value;
        if (bbcode) {
          navigator.clipboard.writeText(bbcode).then(() => {
            showToast("BBCode已复制到剪贴板");
          });
        }
      };

      // 复制HTML
      window.copyHtml = function () {
        const html = document.getElementById("html").value;
        if (html) {
          navigator.clipboard.writeText(html).then(() => {
            showToast("HTML已复制到剪贴板");
          });
        }
      };

      // 清空BBCode
      window.clearBBCode = function () {
        document.getElementById("bbcode").value = "";
      };

      // 清空HTML
      window.clearHtml = function () {
        document.getElementById("html").value = "";
        document.getElementById("preview").textContent = "";
      };

      // 显示提示
      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 2000);
      }

      // 主题切换
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        document.querySelector(".theme-toggle").textContent = newTheme === "light" ? "🌙" : "☀️";
        localStorage.setItem("theme", newTheme);
      };

      // 初始化主题
      (function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.querySelector(".theme-toggle").textContent = savedTheme === "light" ? "🌙" : "☀️";
      })();

      // 实时预览HTML
      document.getElementById("html").addEventListener("input", function () {
        sanitizeAndRenderHtml(this.value);
      });
    
