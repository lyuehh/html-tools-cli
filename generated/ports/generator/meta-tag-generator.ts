// @ts-nocheck
// Generated from tools/generator/meta-tag-generator.html
// Source SHA-256: 45b697fc7b6c6eb6ccea832b30838fff89ae4c36886494cd52ee378c54253a6a
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function generate() {
        const title = document.getElementById("title").value;
        const desc = document.getElementById("description").value;
        const keywords = document.getElementById("keywords").value;
        const author = document.getElementById("author").value;
        const url = document.getElementById("url").value;
        const ogType = document.getElementById("ogType").value;
        const ogImage = document.getElementById("ogImage").value;
        const twitterCard = document.getElementById("twitterCard").value;
        const twitterSite = document.getElementById("twitterSite").value;

        let output = `<!-- 基本Meta标签 -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">`;

        if (keywords) output += `\n<meta name="keywords" content="${keywords}">`;
        if (author) output += `\n<meta name="author" content="${author}">`;

        output += `\n\n<!-- Open Graph / Facebook -->
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">`;
        if (url) output += `\n<meta property="og:url" content="${url}">`;
        if (ogImage) output += `\n<meta property="og:image" content="${ogImage}">`;

        output += `\n\n<!-- Twitter -->
<meta name="twitter:card" content="${twitterCard}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">`;
        if (twitterSite) output += `\n<meta name="twitter:site" content="${twitterSite}">`;
        if (ogImage) output += `\n<meta name="twitter:image" content="${ogImage}">`;

        document.getElementById("output").textContent = output;
      }
      function copyCode() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制代码"), 1500);
      }
      document
        .querySelectorAll("input, textarea, select")
        .forEach((el) => el.addEventListener("input", generate));
      generate();
    
