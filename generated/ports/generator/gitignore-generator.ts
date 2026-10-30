// @ts-nocheck
// Generated from tools/generator/gitignore-generator.html
// Source SHA-256: 66904e3ed537c67799069590f801b7e3393d1a69d85d7c7ed8e7cdf197def23b
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const templates = {
        "Node.js": `node_modules/\nnpm-debug.log\n.env\ndist/\n.DS_Store`,
        Python: `__pycache__/\n*.py[cod]\n.env\nvenv/\n*.egg-info/\ndist/`,
        Java: `*.class\n*.jar\ntarget/\n.idea/\n*.iml`,
        React: `node_modules/\nbuild/\n.env\n.DS_Store\nnpm-debug.log`,
        Vue: `node_modules/\ndist/\n.env.local\n*.log`,
        Go: `*.exe\n*.dll\nvendor/\n*.test`,
        Rust: `target/\nCargo.lock\n**/*.rs.bk`,
        macOS: `.DS_Store\n.AppleDouble\n.LSOverride\n._*`,
        Windows: `Thumbs.db\nehthumbs.db\nDesktop.ini\n*.lnk`,
        IDE: `.idea/\n.vscode/\n*.swp\n*.swo\n*.sublime-*`
      };
      const selected = new Set(["Node.js"]);
      function render() {
        document.getElementById("templates").innerHTML = Object.keys(templates)
          .map(
            (t) =>
              '<button class="template ' +
              (selected.has(t) ? "active" : "") +
              '" onclick="toggle(\'' +
              t +
              "')\">" +
              t +
              "</button>"
          )
          .join("");
        generate();
      }
      window.toggle = function (t) {
        selected.has(t) ? selected.delete(t) : selected.add(t);
        render();
      };
      function generate() {
        const content = [...selected].map((t) => "# " + t + "\n" + templates[t]).join("\n\n");
        document.getElementById("output").textContent = content || "# 请选择模板";
      }
      window.copy = function () {
        navigator.clipboard.writeText(document.getElementById("output").textContent);
        document.querySelector(".copy-btn").textContent = "已复制!";
        setTimeout(
          () => (document.querySelector(".copy-btn").textContent = "复制 .gitignore"),
          1500
        );
      };
      render();

      // Theme toggle
      function toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = newTheme === "light" ? "☀️" : "🌙";
        localStorage.setItem("theme", newTheme);
      }

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "dark";
      if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        const themeIcon = document.getElementById("theme-icon");
        if (themeIcon) themeIcon.textContent = "☀️";
      }
    
