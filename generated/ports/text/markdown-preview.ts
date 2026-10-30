// @ts-nocheck
// Generated from tools/text/markdown-preview.html
// Source SHA-256: fb52dcc290ce36a95a5586081e7eee0197e568d391b9d8ce0561fe00b4307d4e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // ============================================
      // Variables
      // ============================================
      let currentView = "split";
      const editor = document.getElementById("editor");
      const preview = document.getElementById("preview");
      const editorPanel = document.getElementById("editorPanel");
      const previewPanel = document.getElementById("previewPanel");
      const charCountEl = document.getElementById("charCount");

      // ============================================
      // Markdown Preview Update
      // ============================================
      window.updatePreview = function () {
        const markdown = editor.value;
        const html = marked.parse(markdown);
        const sanitized = DOMPurify.sanitize(html);
        preview.innerHTML = sanitized;
        updateCharCount();
      };

      function updateCharCount() {
        const count = editor.value.length;
        charCountEl.textContent = count + " 字符";
      }

      // ============================================
      // View Mode Toggle
      // ============================================
      window.setView = function (view) {
        currentView = view;

        // Update button states
        document.querySelectorAll(".view-btn").forEach((btn) => btn.classList.remove("active"));
        document
          .querySelector(`.view-btn:nth-child(${view === "split" ? 1 : view === "edit" ? 2 : 3})`)
          .classList.add("active");

        // Update panel visibility
        editorPanel.classList.toggle("hidden", view === "preview");
        previewPanel.classList.toggle("hidden", view === "edit");

        // Adjust grid for single panel
        const container = document.querySelector(".editor-container");
        if (view === "split") {
          container.style.gridTemplateColumns = window.innerWidth >= 768 ? "1fr 1fr" : "1fr";
        } else {
          container.style.gridTemplateColumns = "1fr";
        }
      };

      // ============================================
      // Theme Management
      // ============================================
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function initTheme() {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // ============================================
      // Initialize
      // ============================================
      initTheme();
      updatePreview();

      // Handle resize for responsive view
      window.addEventListener("resize", function () {
        if (currentView === "split" && window.innerWidth >= 768) {
          document.querySelector(".editor-container").style.gridTemplateColumns = "1fr 1fr";
        } else if (currentView === "split" && window.innerWidth < 768) {
          document.querySelector(".editor-container").style.gridTemplateColumns = "1fr";
          // Show both panels stacked
          editorPanel.classList.remove("hidden");
          previewPanel.classList.remove("hidden");
        }
      });
    
