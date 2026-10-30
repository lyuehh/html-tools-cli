// @ts-nocheck
// Generated from tools/generator/robots-generator.html
// Source SHA-256: 08880be240ad05b06546042687e33c6bf4067469cc614aee9884c57a03c5c14e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function addRule() {
        const list = document.getElementById("ruleList");
        const item = document.createElement("div");
        item.className = "rule-item";
        item.innerHTML =
          '<select><option value="Allow">Allow</option><option value="Disallow">Disallow</option></select><input type="text" placeholder="路径，如 /admin/"><button onclick="removeRule(this)">删除</button>';
        list.appendChild(item);
        generate();
      }
      function removeRule(btn) {
        btn.parentElement.remove();
        generate();
      }
      function applyPreset(preset) {
        document.getElementById("rulesCard").style.display = preset === "custom" ? "block" : "none";
        generate();
      }
      function generate() {
        const sitemap = document.getElementById("sitemap").value;
        const crawlDelay = document.getElementById("crawlDelay").value;
        const userAgent = document.getElementById("userAgent").value;
        const preset = document.querySelector('input[name="preset"]:checked').value;

        let output = `User-agent: ${userAgent}\n`;

        if (preset === "allow") {
          output += "Allow: /\n";
        } else if (preset === "disallow") {
          output += "Disallow: /\n";
        } else {
          const rules = document.querySelectorAll(".rule-item");
          rules.forEach((rule) => {
            const type = rule.querySelector("select").value;
            const path = rule.querySelector("input").value;
            if (path) output += `${type}: ${path}\n`;
          });
        }

        if (crawlDelay) output += `Crawl-delay: ${crawlDelay}\n`;
        if (sitemap) output += `\nSitemap: ${sitemap}`;

        document.getElementById("output").textContent = output;
      }
      function copyCode() {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制代码"), 1500);
      }
      document
        .querySelectorAll("input, select")
        .forEach((el) => el.addEventListener("input", generate));
      document.getElementById("rulesCard").style.display = "none";
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
    
