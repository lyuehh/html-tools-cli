// @ts-nocheck
// Generated from tools/text/markdown-editor.html
// Source SHA-256: c9baa0d863dc68153408d787840ec7e94880cf57ff685bfbf3c05c7f7b946206
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function parseMarkdown(md) {
        let html = md
          .replace(/^### (.*$)/gm, "<h3>$1</h3>")
          .replace(/^## (.*$)/gm, "<h2>$1</h2>")
          .replace(/^# (.*$)/gm, "<h2>$1</h2>")
          .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
          .replace(/\*([^*]+)\*/g, "<em>$1</em>")
          .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
          .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
          .replace(/^- (.*$)/gm, "<li>$1</li>")
          .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
          .replace(/^---$/gm, "<hr>")
          .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split("|").filter((c) => c.trim());
            if (cells.every((c) => /^[\s-]+$/.test(c))) return "";
            const tag = match.includes("---") ? "th" : "td";
            return "<tr>" + cells.map((c) => `<${tag}>${c.trim()}</${tag}>`).join("") + "</tr>";
          })
          .replace(/(<tr>.*<\/tr>\n?)+/g, "<table>$&</table>")
          .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
          .replace(/(<blockquote>.*<\/blockquote>\n?)+/g, (m) =>
            m.replace(/<\/blockquote>\n?<blockquote>/g, "<br>")
          )
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>");
        return "<p>" + html + "</p>";
      }
      function render() {
        document.getElementById("preview").innerHTML = parseMarkdown(
          document.getElementById("input").value
        );
      }
      function insert(before, after) {
        const ta = document.getElementById("input");
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const text = ta.value;
        ta.value = text.slice(0, start) + before + text.slice(start, end) + after + text.slice(end);
        ta.focus();
        ta.setSelectionRange(start + before.length, end + before.length);
        render();
      }
      function download() {
        const blob = new Blob([document.getElementById("input").value], { type: "text/markdown" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "document.md";
        a.click();
      }
      document.getElementById("input").addEventListener("input", render);
      render();

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
    
