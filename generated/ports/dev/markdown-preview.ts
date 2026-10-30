// @ts-nocheck
// Generated from tools/dev/markdown-preview.html
// Source SHA-256: 44c770dce80de481d1532d62d15f6c169c4633abbc2eb6c46e94ab57125ac374
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function render() {
        let md = document.getElementById("md").value;
        // Simple Markdown parser
        md = md.replace(/^### (.*$)/gm, "<h3>$1</h3>");
        md = md.replace(/^## (.*$)/gm, "<h2>$1</h2>");
        md = md.replace(/^# (.*$)/gm, "<h2>$1</h2>");
        md = md.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
        md = md.replace(/`([^`]+)`/g, "<code>$1</code>");
        md = md.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
        md = md.replace(/\*([^*]+)\*/g, "<em>$1</em>");
        md = md.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
        md = md.replace(/^- (.*$)/gm, "<li>$1</li>");
        md = md.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");
        md = md.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
        md = md.replace(/\n\n/g, "</p><p>");
        md = "<p>" + md + "</p>";
        document.getElementById("preview").innerHTML = md;
      }
      render();
    
