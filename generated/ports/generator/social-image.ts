// @ts-nocheck
// Generated from tools/generator/social-image.html
// Source SHA-256: 7a89a684b0ce1a8e56a1bfc8e4cd8b4accbdf6271d4e2b2b27863b43708f839e
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // Theme management
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      // Load saved theme
      const savedTheme = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);

      // Canvas and state
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      let state = {
        width: 1200,
        height: 630,
        bgColor1: "#667eea",
        bgColor2: "#764ba2",
        gradientType: "linear",
        titleText: "创建精美的社交媒体图片",
        titleColor: "#ffffff",
        titleSize: 48,
        subtitleText: "使用我们的工具轻松创建专业的分享图片",
        subtitleColor: "#ffffff",
        subtitleSize: 24,
        font: "sans-serif",
        icon: "🚀",
        logo: null
      };

      // Event listeners
      document.querySelectorAll(".size-preset").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".size-preset").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.width = parseInt(btn.dataset.width);
          state.height = parseInt(btn.dataset.height);
          canvas.width = state.width;
          canvas.height = state.height;
          render();
        });
      });

      document.querySelectorAll(".gradient-preset").forEach((preset) => {
        preset.addEventListener("click", () => {
          state.bgColor1 = preset.dataset.c1;
          state.bgColor2 = preset.dataset.c2;
          document.getElementById("bgColor1").value = preset.dataset.c1;
          document.getElementById("bgColor2").value = preset.dataset.c2;
          render();
        });
      });

      document.querySelectorAll(".font-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".font-option").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.font = btn.dataset.font;
          render();
        });
      });

      document.querySelectorAll(".icon-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".icon-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.icon = btn.dataset.icon;
          render();
        });
      });

      document.getElementById("bgColor1").addEventListener("input", (e) => {
        state.bgColor1 = e.target.value;
        render();
      });
      document.getElementById("bgColor2").addEventListener("input", (e) => {
        state.bgColor2 = e.target.value;
        render();
      });
      document.getElementById("gradientType").addEventListener("change", (e) => {
        state.gradientType = e.target.value;
        render();
      });
      document.getElementById("titleText").addEventListener("input", (e) => {
        state.titleText = e.target.value;
        render();
      });
      document.getElementById("titleColor").addEventListener("input", (e) => {
        state.titleColor = e.target.value;
        render();
      });
      document.getElementById("titleSize").addEventListener("input", (e) => {
        state.titleSize = parseInt(e.target.value);
        document.getElementById("titleSizeLabel").textContent = e.target.value + "px";
        render();
      });
      document.getElementById("subtitleText").addEventListener("input", (e) => {
        state.subtitleText = e.target.value;
        render();
      });
      document.getElementById("subtitleColor").addEventListener("input", (e) => {
        state.subtitleColor = e.target.value;
        render();
      });
      document.getElementById("subtitleSize").addEventListener("input", (e) => {
        state.subtitleSize = parseInt(e.target.value);
        document.getElementById("subtitleSizeLabel").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("logoUpload").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              state.logo = img;
              render();
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      function render() {
        // Background
        let gradient;
        if (state.gradientType === "linear") {
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        } else if (state.gradientType === "radial") {
          gradient = ctx.createRadialGradient(
            canvas.width / 2,
            canvas.height / 2,
            0,
            canvas.width / 2,
            canvas.height / 2,
            canvas.width / 2
          );
        } else {
          ctx.fillStyle = state.bgColor1;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (state.gradientType !== "solid") {
          gradient.addColorStop(0, state.bgColor1);
          gradient.addColorStop(1, state.bgColor2);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Add subtle pattern
        ctx.save();
        ctx.globalAlpha = 0.05;
        for (let i = 0; i < canvas.width; i += 40) {
          for (let j = 0; j < canvas.height; j += 40) {
            ctx.beginPath();
            ctx.arc(i, j, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
          }
        }
        ctx.restore();

        // Icon
        if (state.icon) {
          ctx.font = `${state.titleSize * 2}px ${state.font}`;
          ctx.textAlign = "center";
          ctx.fillText(state.icon, canvas.width / 2, canvas.height / 2 - state.titleSize);
        }

        // Title
        ctx.font = `bold ${state.titleSize}px ${state.font}`;
        ctx.fillStyle = state.titleColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const titleY = state.icon
          ? canvas.height / 2 + state.titleSize
          : canvas.height / 2 - state.subtitleSize;

        // Word wrap title
        const words = state.titleText.split("");
        let line = "";
        const lines = [];
        const maxWidth = canvas.width * 0.8;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n];
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n];
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        lines.forEach((l, i) => {
          ctx.fillText(l, canvas.width / 2, titleY + i * (state.titleSize * 1.2));
        });

        // Subtitle
        if (state.subtitleText) {
          ctx.font = `${state.subtitleSize}px ${state.font}`;
          ctx.fillStyle = state.subtitleColor;
          ctx.globalAlpha = 0.9;

          const subtitleY = titleY + lines.length * (state.titleSize * 1.2) + state.subtitleSize;

          const subtitleWords = state.subtitleText.split("");
          let subtitleLine = "";
          const subtitleLines = [];

          for (let n = 0; n < subtitleWords.length; n++) {
            const testLine = subtitleLine + subtitleWords[n];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
              subtitleLines.push(subtitleLine);
              subtitleLine = subtitleWords[n];
            } else {
              subtitleLine = testLine;
            }
          }
          subtitleLines.push(subtitleLine);

          subtitleLines.forEach((l, i) => {
            ctx.fillText(l, canvas.width / 2, subtitleY + i * (state.subtitleSize * 1.5));
          });
          ctx.globalAlpha = 1;
        }

        // Logo
        if (state.logo) {
          const logoSize = Math.min(80, canvas.height * 0.1);
          const logoX = 30;
          const logoY = 30;
          ctx.drawImage(state.logo, logoX, logoY, logoSize, logoSize);
        }
      }

      window.downloadImage = function () {
        const link = document.createElement("a");
        link.download = `social-image-${state.width}x${state.height}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Initial render
      render();
    
