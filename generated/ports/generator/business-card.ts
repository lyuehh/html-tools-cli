// @ts-nocheck
// Generated from tools/generator/business-card.html
// Source SHA-256: a38c4388f06d86bfce0ef2029337c8ad9227c12fc51928620335fff8e45bb5ba
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

      // Tab management
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(btn.dataset.tab + "-tab").classList.add("active");
        });
      });

      // Canvas setup
      const canvasFront = document.getElementById("canvasFront");
      const canvasBack = document.getElementById("canvasBack");
      const ctxFront = canvasFront.getContext("2d");
      const ctxBack = canvasBack.getContext("2d");

      let state = {
        name: "张三",
        title: "高级软件工程师",
        company: "科技创新有限公司",
        email: "zhangsan@example.com",
        phone: "+86 138 0000 0000",
        website: "www.example.com",
        address: "北京市朝阳区科技园区",
        avatar: null,
        template: "modern",
        primaryColor: "#1e3c72",
        secondaryColor: "#2a5298",
        textColor: "#ffffff",
        accentColor: "#ffd700",
        nameSize: 28,
        titleSize: 14,
        borderRadius: 8
      };

      const templates = {
        modern: { primary: "#1e3c72", secondary: "#2a5298", text: "#ffffff", accent: "#ffd700" },
        minimal: { primary: "#ffffff", secondary: "#f5f5f5", text: "#333333", accent: "#2a5298" },
        dark: { primary: "#232526", secondary: "#414345", text: "#ffffff", accent: "#00d4ff" },
        elegant: { primary: "#834d9b", secondary: "#d04ed6", text: "#ffffff", accent: "#ffd700" },
        nature: { primary: "#11998e", secondary: "#38ef7d", text: "#ffffff", accent: "#ffffff" },
        sunset: { primary: "#eb3349", secondary: "#f45c43", text: "#ffffff", accent: "#ffe259" }
      };

      // Event listeners
      document.querySelectorAll(".template-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".template-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const t = templates[btn.dataset.template];
          state.template = btn.dataset.template;
          state.primaryColor = t.primary;
          state.secondaryColor = t.secondary;
          state.textColor = t.text;
          state.accentColor = t.accent;
          document.getElementById("primaryColor").value = t.primary;
          document.getElementById("secondaryColor").value = t.secondary;
          document.getElementById("textColor").value = t.text;
          document.getElementById("accentColor").value = t.accent;
          render();
        });
      });

      ["name", "title", "company", "email", "phone", "website", "address"].forEach((id) => {
        document.getElementById(id).addEventListener("input", (e) => {
          state[id] = e.target.value;
          render();
        });
      });

      ["primaryColor", "secondaryColor", "textColor", "accentColor"].forEach((id) => {
        document.getElementById(id).addEventListener("input", (e) => {
          state[id] = e.target.value;
          render();
        });
      });

      ["nameSize", "titleSize", "borderRadius"].forEach((id) => {
        document.getElementById(id).addEventListener("input", (e) => {
          state[id] = parseInt(e.target.value);
          render();
        });
      });

      document.getElementById("avatarUpload").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              state.avatar = img;
              render();
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

      function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      }

      function renderFront() {
        const ctx = ctxFront;
        const w = canvasFront.width;
        const h = canvasFront.height;

        ctx.clearRect(0, 0, w, h);

        // Background with gradient
        ctx.save();
        roundRect(ctx, 0, 0, w, h, state.borderRadius);
        ctx.clip();

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, state.primaryColor);
        gradient.addColorStop(1, state.secondaryColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // Decorative elements
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(w * 0.85, h * 0.2, 150, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(w * 0.9, h * 0.8, 100, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.restore();

        // Avatar/Logo
        const avatarSize = 100;
        const avatarX = 50;
        const avatarY = (h - avatarSize) / 2;

        if (state.avatar) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            avatarX + avatarSize / 2,
            avatarY + avatarSize / 2,
            avatarSize / 2,
            0,
            Math.PI * 2
          );
          ctx.clip();
          ctx.drawImage(state.avatar, avatarX, avatarY, avatarSize, avatarSize);
          ctx.restore();

          // Avatar border
          ctx.strokeStyle = state.accentColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(
            avatarX + avatarSize / 2,
            avatarY + avatarSize / 2,
            avatarSize / 2,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        } else {
          // Default avatar placeholder
          ctx.fillStyle = state.accentColor;
          ctx.beginPath();
          ctx.arc(
            avatarX + avatarSize / 2,
            avatarY + avatarSize / 2,
            avatarSize / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.fillStyle = state.primaryColor;
          ctx.font = "bold 40px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(state.name.charAt(0), avatarX + avatarSize / 2, avatarY + avatarSize / 2);
        }

        // Text content
        const textX = avatarX + avatarSize + 40;

        // Name
        ctx.fillStyle = state.textColor;
        ctx.font = `bold ${state.nameSize}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(state.name, textX, h / 2 - 50);

        // Title
        ctx.font = `${state.titleSize}px sans-serif`;
        ctx.globalAlpha = 0.9;
        ctx.fillText(state.title, textX, h / 2 - 15);

        // Company
        ctx.fillStyle = state.accentColor;
        ctx.font = `bold ${state.titleSize}px sans-serif`;
        ctx.fillText(state.company, textX, h / 2 + 15);

        ctx.globalAlpha = 1;

        // Accent line
        ctx.fillStyle = state.accentColor;
        ctx.fillRect(textX, h / 2 - 55, 50, 3);
      }

      function renderBack() {
        const ctx = ctxBack;
        const w = canvasBack.width;
        const h = canvasBack.height;

        ctx.clearRect(0, 0, w, h);

        // Background
        ctx.save();
        roundRect(ctx, 0, 0, w, h, state.borderRadius);
        ctx.clip();

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, state.secondaryColor);
        gradient.addColorStop(1, state.primaryColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // Decorative pattern
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < w; i += 30) {
          for (let j = 0; j < h; j += 30) {
            if ((i + j) % 60 === 0) {
              ctx.fillRect(i, j, 15, 15);
            }
          }
        }
        ctx.globalAlpha = 1;

        ctx.restore();

        // Contact info
        const startY = 80;
        const lineHeight = 50;
        const iconX = 80;
        const textX = 130;

        ctx.fillStyle = state.textColor;
        ctx.font = "18px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const contacts = [
          { icon: "📧", text: state.email },
          { icon: "📱", text: state.phone },
          { icon: "🌐", text: state.website },
          { icon: "📍", text: state.address }
        ];

        contacts.forEach((contact, i) => {
          const y = startY + i * lineHeight;

          // Icon background
          ctx.fillStyle = state.accentColor;
          ctx.beginPath();
          ctx.arc(iconX, y, 18, 0, Math.PI * 2);
          ctx.fill();

          // Icon
          ctx.font = "16px sans-serif";
          ctx.fillStyle = state.primaryColor;
          ctx.textAlign = "center";
          ctx.fillText(contact.icon, iconX, y);

          // Text
          ctx.font = "16px sans-serif";
          ctx.fillStyle = state.textColor;
          ctx.textAlign = "left";
          ctx.fillText(contact.text, textX, y);
        });

        // Company name at bottom
        ctx.fillStyle = state.accentColor;
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(state.company, w / 2, h - 50);

        // Decorative line
        ctx.fillStyle = state.accentColor;
        ctx.fillRect(w / 2 - 50, h - 75, 100, 2);
      }

      function render() {
        renderFront();
        renderBack();
      }

      window.downloadCard = function (side) {
        const canvas = side === "front" ? canvasFront : canvasBack;
        const link = document.createElement("a");
        link.download = `business-card-${side}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      // Initial render
      render();
    
