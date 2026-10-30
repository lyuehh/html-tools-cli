// @ts-nocheck
// Generated from tools/dev/tailwind-config-generator.html
// Source SHA-256: 71ade987bc28dff5828906b207e1978cb0578f98f4755579eb8fbfe0a0686da4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme handling
      function initTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      window.toggleTheme = function () {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Tab handling
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", () => {
          document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          tab.classList.add("active");
          document.getElementById(tab.dataset.tab + "-tab").classList.add("active");
        });
      });

      // Color management
      window.addColor = function () {
        const list = document.getElementById("colorList");
        const item = document.createElement("div");
        item.className = "color-item";
        item.innerHTML = `
                <input type="text" value="custom" placeholder="名称">
                <input type="text" value="#3b82f6" placeholder="色值">
                <input type="color" value="#3b82f6" onchange="this.previousElementSibling.value = this.value; generateConfig()">
                <button onclick="removeColor(this)">×</button>
            `;
        list.appendChild(item);
        generateConfig();
      };

      window.removeColor = function (btn) {
        btn.parentElement.remove();
        generateConfig();
      };

      // Font management
      window.addFont = function () {
        const list = document.getElementById("fontList");
        const item = document.createElement("div");
        item.className = "color-item";
        item.style.gridTemplateColumns = "100px 1fr 40px";
        item.innerHTML = `
                <input type="text" value="custom" placeholder="名称">
                <input type="text" value="Arial, sans-serif" placeholder="字体值">
                <button onclick="removeFont(this)">×</button>
            `;
        list.appendChild(item);
        generateConfig();
      };

      window.removeFont = function (btn) {
        btn.parentElement.remove();
        generateConfig();
      };

      // Screen management
      window.addScreen = function () {
        const list = document.getElementById("screenList");
        const item = document.createElement("div");
        item.className = "color-item";
        item.style.gridTemplateColumns = "80px 1fr 40px";
        item.innerHTML = `
                <input type="text" value="3xl" placeholder="名称">
                <input type="text" value="1920px" placeholder="断点值">
                <button onclick="removeScreen(this)">×</button>
            `;
        list.appendChild(item);
        generateConfig();
      };

      window.removeScreen = function (btn) {
        btn.parentElement.remove();
        generateConfig();
      };

      // Generate config
      function generateConfig() {
        const config = {
          content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
          theme: {
            extend: {}
          },
          plugins: []
        };

        // Dark mode
        if (document.getElementById("darkMode").checked) {
          config.darkMode = "class";
        }

        // Colors
        const colors = {};
        document.querySelectorAll("#colorList .color-item").forEach((item) => {
          const inputs = item.querySelectorAll('input[type="text"]');
          const name = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (name && value) {
            colors[name] = value;
          }
        });
        if (Object.keys(colors).length > 0) {
          config.theme.extend.colors = colors;
        }

        // Fonts
        const fonts = {};
        document.querySelectorAll("#fontList .color-item").forEach((item) => {
          const inputs = item.querySelectorAll('input[type="text"]');
          const name = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (name && value) {
            fonts[name] = value.split(",").map((f) => f.trim());
          }
        });
        if (Object.keys(fonts).length > 0) {
          config.theme.extend.fontFamily = fonts;
        }

        // Screens
        const screens = {};
        document.querySelectorAll("#screenList .color-item").forEach((item) => {
          const inputs = item.querySelectorAll('input[type="text"]');
          const name = inputs[0].value.trim();
          const value = inputs[1].value.trim();
          if (name && value) {
            screens[name] = value;
          }
        });
        if (Object.keys(screens).length > 0) {
          config.theme.screens = screens;
        }

        // Plugins
        const plugins = [];
        if (document.getElementById("pluginForms").checked) {
          plugins.push("require('@tailwindcss/forms')");
        }
        if (document.getElementById("pluginTypography").checked) {
          plugins.push("require('@tailwindcss/typography')");
        }
        if (document.getElementById("pluginAspectRatio").checked) {
          plugins.push("require('@tailwindcss/aspect-ratio')");
        }
        if (document.getElementById("pluginContainerQueries").checked) {
          plugins.push("require('@tailwindcss/container-queries')");
        }

        // Generate output
        let output = "/** @type {import('tailwindcss').Config} */\n";
        output += "module.exports = {\n";
        output += `  content: ${JSON.stringify(config.content)},\n`;

        if (config.darkMode) {
          output += `  darkMode: '${config.darkMode}',\n`;
        }

        output += "  theme: {\n";

        if (config.theme.screens) {
          output += "    screens: {\n";
          Object.entries(config.theme.screens).forEach(([k, v]) => {
            output += `      '${k}': '${v}',\n`;
          });
          output += "    },\n";
        }

        output += "    extend: {\n";

        if (config.theme.extend.colors) {
          output += "      colors: {\n";
          Object.entries(config.theme.extend.colors).forEach(([k, v]) => {
            output += `        '${k}': '${v}',\n`;
          });
          output += "      },\n";
        }

        if (config.theme.extend.fontFamily) {
          output += "      fontFamily: {\n";
          Object.entries(config.theme.extend.fontFamily).forEach(([k, v]) => {
            output += `        '${k}': ${JSON.stringify(v)},\n`;
          });
          output += "      },\n";
        }

        output += "    },\n";
        output += "  },\n";

        if (plugins.length > 0) {
          output += "  plugins: [\n";
          plugins.forEach((p) => {
            output += `    ${p},\n`;
          });
          output += "  ],\n";
        } else {
          output += "  plugins: [],\n";
        }

        output += "}\n";

        document.getElementById("configOutput").textContent = output;
      }

      // Presets
      window.loadPreset = function (preset) {
        const presets = {
          minimal: {
            colors: [{ name: "primary", value: "#3b82f6" }],
            fonts: [{ name: "sans", value: "system-ui, sans-serif" }],
            plugins: []
          },
          dashboard: {
            colors: [
              { name: "primary", value: "#6366f1" },
              { name: "secondary", value: "#8b5cf6" },
              { name: "success", value: "#22c55e" },
              { name: "warning", value: "#f59e0b" },
              { name: "danger", value: "#ef4444" },
              { name: "sidebar", value: "#1e1e2d" }
            ],
            fonts: [
              { name: "sans", value: "Inter, system-ui, sans-serif" },
              { name: "mono", value: "JetBrains Mono, monospace" }
            ],
            plugins: ["forms"]
          },
          landing: {
            colors: [
              { name: "primary", value: "#06b6d4" },
              { name: "secondary", value: "#8b5cf6" },
              { name: "accent", value: "#f59e0b" }
            ],
            fonts: [
              { name: "display", value: "Poppins, sans-serif" },
              { name: "body", value: "Inter, sans-serif" }
            ],
            plugins: ["typography"]
          },
          ecommerce: {
            colors: [
              { name: "primary", value: "#059669" },
              { name: "secondary", value: "#0891b2" },
              { name: "accent", value: "#f97316" },
              { name: "sale", value: "#dc2626" }
            ],
            fonts: [{ name: "sans", value: "Inter, system-ui, sans-serif" }],
            plugins: ["forms", "aspect-ratio"]
          }
        };

        const p = presets[preset];
        if (!p) return;

        // Update colors
        const colorList = document.getElementById("colorList");
        colorList.innerHTML = "";
        p.colors.forEach((c) => {
          const item = document.createElement("div");
          item.className = "color-item";
          item.innerHTML = `
                    <input type="text" value="${c.name}" placeholder="名称">
                    <input type="text" value="${c.value}" placeholder="色值">
                    <input type="color" value="${c.value}" onchange="this.previousElementSibling.value = this.value; generateConfig()">
                    <button onclick="removeColor(this)">×</button>
                `;
          colorList.appendChild(item);
        });

        // Update fonts
        const fontList = document.getElementById("fontList");
        fontList.innerHTML = "";
        p.fonts.forEach((f) => {
          const item = document.createElement("div");
          item.className = "color-item";
          item.style.gridTemplateColumns = "100px 1fr 40px";
          item.innerHTML = `
                    <input type="text" value="${f.name}" placeholder="名称">
                    <input type="text" value="${f.value}" placeholder="字体值">
                    <button onclick="removeFont(this)">×</button>
                `;
          fontList.appendChild(item);
        });

        // Update plugins
        document.getElementById("pluginForms").checked = p.plugins.includes("forms");
        document.getElementById("pluginTypography").checked = p.plugins.includes("typography");
        document.getElementById("pluginAspectRatio").checked = p.plugins.includes("aspect-ratio");
        document.getElementById("pluginContainerQueries").checked =
          p.plugins.includes("container-queries");

        generateConfig();
      };

      window.copyConfig = function () {
        const config = document.getElementById("configOutput").textContent;
        navigator.clipboard.writeText(config).then(() => {
          const btn = event.target;
          btn.textContent = "✓ 已复制";
          setTimeout(() => (btn.textContent = "📋 复制配置"), 2000);
        });
      };

      window.downloadConfig = function () {
        const config = document.getElementById("configOutput").textContent;
        const blob = new Blob([config], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tailwind.config.js";
        a.click();
        URL.revokeObjectURL(url);
      };

      window.resetConfig = function () {
        location.reload();
      };

      // Initialize
      initTheme();
      generateConfig();

      // Add input listeners for live update
      document.addEventListener("input", (e) => {
        if (e.target.matches(".color-item input, .spacing-item input")) {
          generateConfig();
        }
      });
    
