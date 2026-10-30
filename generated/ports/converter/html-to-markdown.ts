// @ts-nocheck
// Generated from tools/converter/html-to-markdown.html
// Source SHA-256: 5134397e5876d341ece155e94f7d243a5a21e23944ed5e40d352bd14413df22b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const examples = {
        basic: `<h2>标题一</h2>
<h2>标题二</h2>
<p>这是一个<strong>加粗</strong>和<em>斜体</em>的段落。</p>
<p>这里有一个<a href="https://example.com">链接</a>。</p>
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>
<ol>
    <li>有序项 1</li>
    <li>有序项 2</li>
</ol>
<blockquote>这是一段引用文字。</blockquote>`,

        table: `<h2>数据表格</h2>
<table>
    <thead>
        <tr>
            <th>名称</th>
            <th>价格</th>
            <th>数量</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>苹果</td>
            <td>¥5.00</td>
            <td>10</td>
        </tr>
        <tr>
            <td>香蕉</td>
            <td>¥3.00</td>
            <td>20</td>
        </tr>
        <tr>
            <td>橙子</td>
            <td>¥4.50</td>
            <td>15</td>
        </tr>
    </tbody>
</table>`,

        code: `<h2>代码示例</h2>
<p>行内代码: <code>const x = 1;</code></p>
<pre><code class="language-javascript">function hello(name) {
    console.log(\`Hello, \${name}!\`);
    return true;
}

hello('World');</code></pre>
<p>另一个代码块:</p>
<pre><code class="language-python">def greet(name):
    print(f"Hello, {name}!")
    return True</code></pre>`,

        complex: `<article>
    <h2>完整文章示例</h2>
    <p>这是一篇<strong>包含多种元素</strong>的文章。</p>
    
    <h2>图片</h2>
    <p><img src="https://via.placeholder.com/300x200" alt="示例图片"></p>
    
    <h2>列表</h2>
    <ul>
        <li>项目 A
            <ul>
                <li>子项目 A1</li>
                <li>子项目 A2</li>
            </ul>
        </li>
        <li>项目 B</li>
    </ul>
    
    <h2>引用</h2>
    <blockquote>
        <p>人生苦短，我用 Python。</p>
        <p>—— 某位程序员</p>
    </blockquote>
    
    <h2>分割线</h2>
    <hr>
    
    <h2>删除线和链接</h2>
    <p><del>这段文字被删除了</del></p>
    <p>访问 <a href="https://github.com" title="GitHub">GitHub</a> 了解更多。</p>
</article>`
      };

      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      (function () {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", savedTheme);
      })();

      window.loadExample = function (name) {
        document.getElementById("htmlInput").value = examples[name];
        convert();
      };

      window.pasteHtml = async function () {
        try {
          const text = await navigator.clipboard.readText();
          document.getElementById("htmlInput").value = text;
          convert();
        } catch (e) {
          showToast("无法访问剪贴板", "error");
        }
      };

      window.formatHtml = function () {
        const input = document.getElementById("htmlInput");
        try {
          const formatted = formatHtmlString(input.value);
          input.value = formatted;
        } catch (e) {}
      };

      function formatHtmlString(html) {
        let formatted = "";
        let indent = 0;
        const tags = html.replace(/>\s*</g, ">\n<").split("\n");

        tags.forEach((tag) => {
          if (tag.match(/^<\/\w/)) indent--;
          formatted += "  ".repeat(Math.max(0, indent)) + tag.trim() + "\n";
          if (tag.match(/^<\w[^>]*[^\/]>/) && !tag.match(/^<(br|hr|img|input|meta|link)/i))
            indent++;
        });

        return formatted.trim();
      }

      window.clearAll = function () {
        document.getElementById("htmlInput").value = "";
        document.getElementById("mdOutput").value = "";
        document.getElementById("preview").innerHTML = "";
        document.getElementById("stats").innerHTML = "";
      };

      window.swapContent = function () {
        const htmlInput = document.getElementById("htmlInput");
        const mdOutput = document.getElementById("mdOutput");
        htmlInput.value = mdOutput.value;
        convert();
      };

      function convert() {
        const html = document.getElementById("htmlInput").value;
        if (!html.trim()) {
          document.getElementById("mdOutput").value = "";
          document.getElementById("preview").innerHTML = "";
          document.getElementById("stats").innerHTML = "";
          return;
        }

        const options = {
          gfm: document.getElementById("optGfm").checked,
          codeBlock: document.getElementById("optCodeBlock").checked,
          strikethrough: document.getElementById("optStrikethrough").checked
        };

        const markdown = htmlToMarkdown(html, options);
        document.getElementById("mdOutput").value = markdown;

        // Simple preview
        document.getElementById("preview").innerHTML = markdownToHtml(markdown);

        // Stats
        const htmlLen = html.length;
        const mdLen = markdown.length;
        const ratio = htmlLen > 0 ? ((1 - mdLen / htmlLen) * 100).toFixed(1) : 0;
        document.getElementById("stats").innerHTML = `
                <span>HTML: ${htmlLen} 字符</span>
                <span>Markdown: ${mdLen} 字符</span>
                <span>压缩率: ${ratio}%</span>
            `;
      }

      function htmlToMarkdown(html, options) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        function processNode(node, listLevel = 0) {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent.replace(/\s+/g, " ");
          }

          if (node.nodeType !== Node.ELEMENT_NODE) return "";

          const tag = node.tagName.toLowerCase();
          const children = Array.from(node.childNodes)
            .map((n) => processNode(n, listLevel))
            .join("");

          switch (tag) {
            case "h1":
              return `# ${children.trim()}\n\n`;
            case "h2":
              return `## ${children.trim()}\n\n`;
            case "h3":
              return `### ${children.trim()}\n\n`;
            case "h4":
              return `#### ${children.trim()}\n\n`;
            case "h5":
              return `##### ${children.trim()}\n\n`;
            case "h6":
              return `###### ${children.trim()}\n\n`;
            case "p":
              return `${children.trim()}\n\n`;
            case "br":
              return "\n";
            case "hr":
              return "---\n\n";
            case "strong":
            case "b":
              return `**${children.trim()}**`;
            case "em":
            case "i":
              return `*${children.trim()}*`;
            case "del":
            case "s":
            case "strike":
              return options.strikethrough ? `~~${children.trim()}~~` : children;
            case "code":
              if (node.parentElement?.tagName.toLowerCase() === "pre") return children;
              return `\`${children.trim()}\``;
            case "pre":
              const codeEl = node.querySelector("code");
              const lang = codeEl?.className.match(/language-(\w+)/)?.[1] || "";
              const code = (codeEl || node).textContent.trim();
              if (options.codeBlock) {
                return `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
              }
              return (
                code
                  .split("\n")
                  .map((line) => "    " + line)
                  .join("\n") + "\n\n"
              );
            case "blockquote":
              return (
                children
                  .trim()
                  .split("\n")
                  .map((line) => `> ${line}`)
                  .join("\n") + "\n\n"
              );
            case "a":
              const href = node.getAttribute("href") || "";
              const title = node.getAttribute("title");
              if (title) return `[${children.trim()}](${href} "${title}")`;
              return `[${children.trim()}](${href})`;
            case "img":
              const src = node.getAttribute("src") || "";
              const alt = node.getAttribute("alt") || "";
              return `![${alt}](${src})`;
            case "ul":
              return (
                Array.from(node.children)
                  .map((li) => {
                    const indent = "  ".repeat(listLevel);
                    const content = processNode(li, listLevel + 1).trim();
                    return `${indent}- ${content}`;
                  })
                  .join("\n") + "\n\n"
              );
            case "ol":
              return (
                Array.from(node.children)
                  .map((li, i) => {
                    const indent = "  ".repeat(listLevel);
                    const content = processNode(li, listLevel + 1).trim();
                    return `${indent}${i + 1}. ${content}`;
                  })
                  .join("\n") + "\n\n"
              );
            case "li":
              return children;
            case "table":
              if (!options.gfm) return children;
              return processTable(node);
            case "thead":
            case "tbody":
            case "tfoot":
            case "tr":
            case "th":
            case "td":
              return children;
            default:
              return children;
          }
        }

        function processTable(table) {
          const rows = Array.from(table.querySelectorAll("tr"));
          if (rows.length === 0) return "";

          const result = [];
          rows.forEach((row, i) => {
            const cells = Array.from(row.querySelectorAll("th, td"));
            const line = "| " + cells.map((cell) => cell.textContent.trim()).join(" | ") + " |";
            result.push(line);

            if (i === 0 || row.querySelector("th")) {
              result.push("| " + cells.map(() => "---").join(" | ") + " |");
            }
          });

          return result.join("\n") + "\n\n";
        }

        let result = processNode(doc.body);
        // Clean up extra newlines
        result = result.replace(/\n{3,}/g, "\n\n").trim();
        return result;
      }

      function markdownToHtml(md) {
        // Simple markdown to html for preview
        let html = md
          .replace(/^### (.*$)/gm, "<h3>$1</h3>")
          .replace(/^## (.*$)/gm, "<h2>$1</h2>")
          .replace(/^# (.*$)/gm, "<h2>$1</h2>")
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/~~(.*?)~~/g, "<del>$1</del>")
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
          .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
          .replace(/^---$/gm, "<hr>")
          .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
          .replace(/^- (.*$)/gm, "<li>$1</li>");

        // Code blocks
        html = html.replace(
          /```(\w*)\n([\s\S]*?)```/g,
          '<pre><code class="language-$1">$2</code></pre>'
        );

        // Tables
        html = html.replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
          const headers = header
            .split("|")
            .filter((h) => h.trim())
            .map((h) => `<th>${h.trim()}</th>`)
            .join("");
          const rows = body
            .trim()
            .split("\n")
            .map((row) => {
              const cells = row
                .split("|")
                .filter((c) => c.trim())
                .map((c) => `<td>${c.trim()}</td>`)
                .join("");
              return `<tr>${cells}</tr>`;
            })
            .join("");
          return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        });

        // Paragraphs
        html = html
          .split("\n\n")
          .map((block) => {
            if (!block.match(/^<[h|p|ul|ol|li|blockquote|pre|table|hr]/)) {
              return `<p>${block}</p>`;
            }
            return block;
          })
          .join("\n");

        return html;
      }

      window.copyMarkdown = function () {
        const md = document.getElementById("mdOutput").value;
        navigator.clipboard.writeText(md);
        showToast("已复制到剪贴板");
      };

      window.downloadMarkdown = function () {
        const md = document.getElementById("mdOutput").value;
        const blob = new Blob([md], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.md";
        a.click();
        URL.revokeObjectURL(url);
      };

      function showToast(message, type = "success") {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.background = type === "error" ? "#ef4444" : "#10b981";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
      }

      // Init with example
      loadExample("basic");
    
