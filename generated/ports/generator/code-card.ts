// @ts-nocheck
// Generated from tools/generator/code-card.html
// Source SHA-256: 2be2babba80abae773ea3035e617c047203c69195e4df77621aa3de402d77485
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme management
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      const editorThemes = [
        { name: "VS Code", bg: "#1e1e1e", header: "#323232", text: "#d4d4d4" },
        { name: "Monokai", bg: "#272822", header: "#1e1f1c", text: "#f8f8f2" },
        { name: "Dracula", bg: "#282a36", header: "#21222c", text: "#f8f8f2" },
        { name: "Nord", bg: "#2e3440", header: "#3b4252", text: "#d8dee9" },
        { name: "Solarized", bg: "#002b36", header: "#073642", text: "#839496" },
        { name: "One Dark", bg: "#282c34", header: "#21252b", text: "#abb2bf" },
        { name: "GitHub", bg: "#0d1117", header: "#161b22", text: "#c9d1d9" },
        { name: "Oceanic", bg: "#1b2b34", header: "#0d1f2d", text: "#d8dee9" }
      ];

      const bgPresets = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        "linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)",
        "#1a1a2e"
      ];

      let state = {
        code: document.getElementById("codeInput").value,
        language: "javascript",
        theme: editorThemes[0],
        background: bgPresets[0],
        padding: 32,
        borderRadius: 12,
        fontSize: 14,
        showLineNumbers: true,
        showWindowControls: true,
        showTitle: true,
        filename: "example.js"
      };

      function initThemes() {
        const container = document.getElementById("themeGrid");
        editorThemes.forEach((theme, i) => {
          const btn = document.createElement("div");
          btn.className = "theme-btn" + (i === 0 ? " active" : "");
          btn.textContent = theme.name;
          btn.style.background = theme.bg;
          btn.style.color = theme.text;
          btn.addEventListener("click", () => {
            document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            state.theme = theme;
            render();
          });
          container.appendChild(btn);
        });
      }

      function initBgPresets() {
        const container = document.getElementById("bgPresets");
        bgPresets.forEach((bg, i) => {
          const btn = document.createElement("div");
          btn.className = "bg-preset";
          btn.style.background = bg;
          btn.addEventListener("click", () => {
            state.background = bg;
            render();
          });
          container.appendChild(btn);
        });
      }

      function render() {
        // Background
        document.getElementById("cardBg").style.background = state.background;
        document.getElementById("cardBg").style.padding = state.padding + "px";

        // Window
        const codeWindow = document.getElementById("codeWindow");
        codeWindow.style.background = state.theme.bg;
        codeWindow.style.borderRadius = state.borderRadius + "px";

        // Header
        const header = document.getElementById("windowHeader");
        header.style.background = state.theme.header;
        header.style.display = state.showTitle ? "flex" : "none";

        // Window controls
        document.getElementById("windowDots").style.display = state.showWindowControls
          ? "flex"
          : "none";

        // Title
        document.getElementById("windowTitle").textContent = state.filename;
        document.getElementById("windowTitle").style.color = state.theme.text;

        // Code content
        const codeContent = document.getElementById("codeContent");
        codeContent.style.color = state.theme.text;
        codeContent.style.fontSize = state.fontSize + "px";

        const lines = state.code.split("\n");

        // Line numbers
        const lineNumsEl = document.getElementById("lineNumbers");
        lineNumsEl.style.display = state.showLineNumbers ? "block" : "none";
        lineNumsEl.textContent = lines.map((_, i) => i + 1).join("\n");

        // Code text
        document.getElementById("codeText").textContent = state.code;
      }

      // Event listeners
      document.getElementById("codeInput").addEventListener("input", (e) => {
        state.code = e.target.value;
        render();
      });

      document.getElementById("language").addEventListener("change", (e) => {
        state.language = e.target.value;
        render();
      });

      document.getElementById("padding").addEventListener("input", (e) => {
        state.padding = parseInt(e.target.value);
        document.getElementById("paddingValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("borderRadius").addEventListener("input", (e) => {
        state.borderRadius = parseInt(e.target.value);
        document.getElementById("borderRadiusValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("fontSize").addEventListener("input", (e) => {
        state.fontSize = parseInt(e.target.value);
        document.getElementById("fontSizeValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("showLineNumbers").addEventListener("change", (e) => {
        state.showLineNumbers = e.target.checked;
        render();
      });

      document.getElementById("showWindowControls").addEventListener("change", (e) => {
        state.showWindowControls = e.target.checked;
        render();
      });

      document.getElementById("showTitle").addEventListener("change", (e) => {
        state.showTitle = e.target.checked;
        render();
      });

      document.getElementById("filename").addEventListener("input", (e) => {
        state.filename = e.target.value;
        render();
      });

      window.downloadImage = function () {
        const card = document.getElementById("codeCard");

        // Create canvas
        const canvas = document.createElement("canvas");
        const scale = 2;
        const rect = card.getBoundingClientRect();
        canvas.width = rect.width * scale;
        canvas.height = rect.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);

        // Draw background
        if (state.background.startsWith("linear-gradient")) {
          const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
          const colors = state.background.match(/#[a-fA-F0-9]{6}/g);
          if (colors) {
            colors.forEach((color, i) => {
              gradient.addColorStop(i / (colors.length - 1), color);
            });
          }
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = state.background;
        }
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Draw code window
        const windowX = state.padding;
        const windowY = state.padding;
        const windowWidth = rect.width - state.padding * 2;
        const windowHeight = rect.height - state.padding * 2;

        // Window background with rounded corners
        ctx.fillStyle = state.theme.bg;
        ctx.beginPath();
        ctx.roundRect(windowX, windowY, windowWidth, windowHeight, state.borderRadius);
        ctx.fill();

        // Header
        if (state.showTitle) {
          ctx.fillStyle = state.theme.header;
          ctx.beginPath();
          ctx.roundRect(windowX, windowY, windowWidth, 36, [
            state.borderRadius,
            state.borderRadius,
            0,
            0
          ]);
          ctx.fill();

          // Dots
          if (state.showWindowControls) {
            const dotY = windowY + 18;
            const dotColors = ["#ff5f56", "#ffbd2e", "#27ca3f"];
            dotColors.forEach((color, i) => {
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(windowX + 20 + i * 18, dotY, 6, 0, Math.PI * 2);
              ctx.fill();
            });
          }

          // Title
          ctx.fillStyle = "#8b8b8b";
          ctx.font = "13px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(state.filename, windowX + windowWidth / 2, windowY + 22);
        }

        // Code
        const codeY = windowY + (state.showTitle ? 36 : 0) + 20;
        ctx.font = state.fontSize + "px monospace";
        ctx.textAlign = "left";

        const lines = state.code.split("\n");
        const lineHeight = state.fontSize * 1.6;

        lines.forEach((line, i) => {
          let x = windowX + 20;

          if (state.showLineNumbers) {
            ctx.fillStyle = "#6b6b6b";
            ctx.fillText((i + 1).toString(), x, codeY + i * lineHeight);
            x += 40;
          }

          ctx.fillStyle = state.theme.text;
          ctx.fillText(line, x, codeY + i * lineHeight);
        });

        // Download
        const link = document.createElement("a");
        link.download = "code-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Initialize
      initThemes();
      initBgPresets();
      render();
    
