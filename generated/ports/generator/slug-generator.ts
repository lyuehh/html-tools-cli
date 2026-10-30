// @ts-nocheck
// Generated from tools/generator/slug-generator.html
// Source SHA-256: 8f617047dc451fca053f4bba3a942c87713bf5be9737d475be40e61a08747476
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      window.generate = function () {
        const input = document.getElementById("input").value;
        const lowercase = document.getElementById("lowercase").checked;
        const removeChinese = document.getElementById("removeChinese").checked;
        const removeNumbers = document.getElementById("removeNumbers").checked;
        const separator = document.getElementById("separator").value;

        let slug = input;

        // Convert to lowercase if option is checked
        if (lowercase) slug = slug.toLowerCase();

        // Remove Chinese characters if option is checked
        if (removeChinese) slug = slug.replace(/[\u4e00-\u9fa5]/g, "");

        // Remove numbers if option is checked
        if (removeNumbers) slug = slug.replace(/[0-9]/g, "");

        // Replace special characters and spaces
        slug = slug
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Remove accents
          .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\s-]/g, "") // Keep only alphanumeric, Chinese, spaces, hyphens
          .trim()
          .replace(/\s+/g, separator) // Replace spaces with separator
          .replace(new RegExp(`${separator}+`, "g"), separator) // Remove multiple separators
          .replace(new RegExp(`^${separator}|${separator}$`, "g"), ""); // Remove leading/trailing separators

        document.getElementById("output").textContent = slug || "(空)";
        document.getElementById("urlPreview").textContent = slug || "slug";
      };

      window.setExample = function (text) {
        document.getElementById("input").value = text;
        generate();
      };

      window.copySlug = function () {
        const slug = document.getElementById("output").textContent;
        if (slug && slug !== "(空)") {
          navigator.clipboard.writeText(slug);
          document.getElementById("toast").classList.add("show");
          setTimeout(() => document.getElementById("toast").classList.remove("show"), 2000);
        }
      };

      window.toggleTheme = function () {
        const t = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
        document.body.setAttribute("data-theme", t);
        localStorage.setItem("theme", t);
      };

      document.body.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
      generate();
    
