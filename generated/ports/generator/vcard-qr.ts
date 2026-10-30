// @ts-nocheck
// Generated from tools/generator/vcard-qr.html
// Source SHA-256: 815d47ea1caa2ae41cdc98629fb01b4f95d6bf74ebe0fab5fe4bb302879213f9
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

      let state = {
        firstName: "三",
        lastName: "张",
        title: "高级软件工程师",
        company: "科技创新有限公司",
        phone: "+86 138 0000 0000",
        workPhone: "",
        email: "zhangsan@example.com",
        website: "https://example.com",
        address: "北京市朝阳区科技园区",
        note: "",
        qrFgColor: "#2c3e50",
        qrBgColor: "#ffffff",
        qrSize: 250,
        errorLevel: "M",
        cardColor: "#2c3e50",
        avatar: null
      };

      // Tab management
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
          btn.classList.add("active");
          document.getElementById(btn.dataset.tab + "-tab").classList.add("active");
        });
      });

      // Event listeners
      const inputs = [
        "firstName",
        "lastName",
        "title",
        "company",
        "phone",
        "workPhone",
        "email",
        "website",
        "address",
        "note"
      ];
      inputs.forEach((id) => {
        document.getElementById(id).addEventListener("input", (e) => {
          state[id] = e.target.value;
          render();
        });
      });

      document.getElementById("qrFgColor").addEventListener("input", (e) => {
        state.qrFgColor = e.target.value;
        render();
      });

      document.getElementById("qrBgColor").addEventListener("input", (e) => {
        state.qrBgColor = e.target.value;
        render();
      });

      document.getElementById("qrSize").addEventListener("input", (e) => {
        state.qrSize = parseInt(e.target.value);
        document.getElementById("qrSizeValue").textContent = e.target.value + "px";
        render();
      });

      document.getElementById("cardColor").addEventListener("input", (e) => {
        state.cardColor = e.target.value;
        render();
      });

      document.querySelectorAll("[data-level]").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll("[data-level]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          state.errorLevel = btn.dataset.level;
          render();
        });
      });

      document.getElementById("avatarUpload").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.avatar = event.target.result;
            render();
          };
          reader.readAsDataURL(file);
        }
      });

      function generateVCard() {
        let vcard = "BEGIN:VCARD\n";
        vcard += "VERSION:3.0\n";
        vcard += "N:" + state.lastName + ";" + state.firstName + ";;;\n";
        vcard += "FN:" + state.lastName + state.firstName + "\n";

        if (state.title) vcard += "TITLE:" + state.title + "\n";
        if (state.company) vcard += "ORG:" + state.company + "\n";
        if (state.phone) vcard += "TEL;TYPE=CELL:" + state.phone + "\n";
        if (state.workPhone) vcard += "TEL;TYPE=WORK:" + state.workPhone + "\n";
        if (state.email) vcard += "EMAIL:" + state.email + "\n";
        if (state.website) vcard += "URL:" + state.website + "\n";
        if (state.address) vcard += "ADR;TYPE=WORK:;;" + state.address + ";;;;\n";
        if (state.note) vcard += "NOTE:" + state.note + "\n";

        vcard += "END:VCARD";
        return vcard;
      }

      function generateQR(canvas, size) {
        const vcard = generateVCard();

        const errorLevels = { L: 1, M: 0, Q: 3, H: 2 };
        const qr = qrcode(0, state.errorLevel);
        qr.addData(vcard);
        qr.make();

        const ctx = canvas.getContext("2d");
        const moduleCount = qr.getModuleCount();
        const cellSize = size / moduleCount;

        canvas.width = size;
        canvas.height = size;

        // Background
        ctx.fillStyle = state.qrBgColor;
        ctx.fillRect(0, 0, size, size);

        // QR modules
        ctx.fillStyle = state.qrFgColor;
        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
              ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
          }
        }
      }

      function render() {
        // Update QR code
        generateQR(document.getElementById("qrCanvas"), state.qrSize);
        generateQR(document.getElementById("cardQrCanvas"), 100);

        // Update card preview
        document.getElementById("cardHeader").style.background = state.cardColor;
        document.getElementById("cardName").textContent = state.lastName + state.firstName;
        document.getElementById("cardTitle").textContent = state.title;
        document.getElementById("cardCompany").textContent = state.company;
        document.getElementById("cardPhone").textContent = state.phone;
        document.getElementById("cardEmail").textContent = state.email;
        document.getElementById("cardWebsite").textContent = state.website;
        document.getElementById("cardAddress").textContent = state.address;

        // Avatar
        const avatarEl = document.getElementById("cardAvatar");
        if (state.avatar) {
          avatarEl.style.backgroundImage = "url(" + state.avatar + ")";
          avatarEl.style.backgroundSize = "cover";
          avatarEl.textContent = "";
        } else {
          avatarEl.style.backgroundImage = "";
          avatarEl.textContent = "👤";
        }
      }

      window.downloadQR = function () {
        const canvas = document.getElementById("qrCanvas");
        const link = document.createElement("a");
        link.download = "vcard-qr-" + state.lastName + state.firstName + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.downloadCard = function () {
        const cardPreview = document.getElementById("cardPreview");

        // Create a canvas to render the card
        const canvas = document.createElement("canvas");
        const scale = 2; // For higher resolution
        canvas.width = 500 * scale;
        canvas.height = 600 * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);

        // Background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 500, 600);

        // Header
        ctx.fillStyle = state.cardColor;
        ctx.fillRect(0, 0, 500, 180);

        // Avatar circle
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.beginPath();
        ctx.arc(250, 70, 40, 0, Math.PI * 2);
        ctx.fill();

        // Name
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(state.lastName + state.firstName, 250, 130);

        // Title
        ctx.font = "16px sans-serif";
        ctx.globalAlpha = 0.9;
        ctx.fillText(state.title, 250, 155);
        ctx.globalAlpha = 1;

        // Info items
        ctx.fillStyle = "#333333";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "left";

        const items = [
          { icon: "🏢", text: state.company },
          { icon: "📱", text: state.phone },
          { icon: "📧", text: state.email },
          { icon: "🌐", text: state.website },
          { icon: "📍", text: state.address }
        ];

        items.forEach((item, i) => {
          const y = 220 + i * 50;
          ctx.font = "20px sans-serif";
          ctx.fillText(item.icon, 50, y);
          ctx.font = "14px sans-serif";
          ctx.fillText(item.text, 90, y);
        });

        // QR code at bottom
        ctx.fillStyle = "#f9f9f9";
        ctx.fillRect(0, 480, 500, 120);

        const qrCanvas = document.getElementById("cardQrCanvas");
        ctx.drawImage(qrCanvas, 200, 490, 100, 100);

        ctx.fillStyle = "#666666";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("扫描二维码添加联系人", 250, 580);

        // Download
        const link = document.createElement("a");
        link.download = "business-card-" + state.lastName + state.firstName + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      };

      window.copyVCard = function () {
        const vcard = generateVCard();
        navigator.clipboard.writeText(vcard).then(() => {
          alert("vCard 已复制到剪贴板！");
        });
      };

      // Initial render
      render();
    
