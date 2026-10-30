// @ts-nocheck
// Generated from tools/text/slug-generator.html
// Source SHA-256: 33809605300ca19d7a347985cd5097324c47a0a4a1e66ca834154f9b50880a17
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      function generateSlug() {
        let text = document.getElementById("input").value;
        const separator = document.getElementById("separator").value;
        const lowercase = document.getElementById("lowercase").checked;
        const removeChinese = document.getElementById("removeChinese").checked;
        const maxLength = document.getElementById("maxLength").checked;
        if (removeChinese) text = text.replace(/[\u4e00-\u9fa5]/g, "");
        let slug = text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s\u4e00-\u9fa5-]/g, "")
          .trim()
          .replace(/\s+/g, separator)
          .replace(new RegExp(`${separator}+`, "g"), separator);
        if (lowercase) slug = slug.toLowerCase();
        if (maxLength && slug.length > 50)
          slug = slug.substring(0, 50).replace(new RegExp(`${separator}$`), "");
        document.getElementById("output").textContent = slug || "(空)";
      }
      function copySlug() {
        const slug = document.getElementById("output").textContent;
        navigator.clipboard.writeText(slug);
        const btn = document.querySelector(".copy-btn");
        btn.textContent = "已复制!";
        setTimeout(() => (btn.textContent = "复制Slug"), 1500);
      }
      document.getElementById("input").addEventListener("input", generateSlug);
      document.getElementById("separator").addEventListener("change", generateSlug);
      document.getElementById("lowercase").addEventListener("change", generateSlug);
      document.getElementById("removeChinese").addEventListener("change", generateSlug);
      document.getElementById("maxLength").addEventListener("change", generateSlug);
      generateSlug();

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
    
