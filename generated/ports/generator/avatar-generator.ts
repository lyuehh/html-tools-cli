// @ts-nocheck
// Generated from tools/generator/avatar-generator.html
// Source SHA-256: 6dd9b86ebd70d7a59321b46da7470701921069fc4891b7bb81831efb0fb6e995
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      let currentStyle = "first";
      let currentShape = "circle";
      let color1 = "#667eea";
      let color2 = "#764ba2";

      function getInitials(name) {
        if (!name) return "?";
        name = name.trim();

        switch (currentStyle) {
          case "first":
            return name.charAt(0).toUpperCase();
          case "last":
            return name.charAt(name.length - 1).toUpperCase();
          case "initials":
            const parts = name.split(/\s+/);
            if (parts.length >= 2) {
              return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
            }
            return name.charAt(0).toUpperCase();
          case "two":
            return name.substring(0, 2).toUpperCase();
          default:
            return name.charAt(0).toUpperCase();
        }
      }

      function setStyle(style) {
        currentStyle = style;
        document.querySelectorAll("[data-style]").forEach((el) => {
          el.classList.toggle("active", el.dataset.style === style);
        });
        updateAvatar();
      }

      function setShape(shape) {
        currentShape = shape;
        document.querySelectorAll("[data-shape]").forEach((el) => {
          el.classList.toggle("active", el.dataset.shape === shape);
        });
        updateAvatar();
      }

      function setColor(c1, c2) {
        color1 = c1;
        color2 = c2;
        document.querySelectorAll(".color-preset").forEach((el) => el.classList.remove("active"));
        event.target.classList.add("active");
        updateAvatar();
      }

      function updateAvatar() {
        const name = document.getElementById("nameInput").value;
        const textColor = document.getElementById("textColor").value;
        const initials = getInitials(name);

        const gradient = `linear-gradient(135deg, ${color1}, ${color2})`;
        let borderRadius;
        switch (currentShape) {
          case "circle":
            borderRadius = "50%";
            break;
          case "rounded":
            borderRadius = "20%";
            break;
          case "square":
            borderRadius = "0";
            break;
        }

        ["avatarLg", "avatarMd", "avatarSm"].forEach((id) => {
          const el = document.getElementById(id);
          el.textContent = initials;
          el.style.background = gradient;
          el.style.color = textColor;
          el.style.borderRadius = borderRadius;
        });
      }

      function downloadAvatar(size) {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = size;
        canvas.height = size;

        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;

        // Draw shape
        if (currentShape === "circle") {
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (currentShape === "rounded") {
          const radius = size * 0.2;
          ctx.beginPath();
          ctx.roundRect(0, 0, size, size, radius);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, size, size);
        }

        // Draw text
        const name = document.getElementById("nameInput").value;
        const initials = getInitials(name);
        const fontSize = size * 0.4;
        ctx.fillStyle = document.getElementById("textColor").value;
        ctx.font = `bold ${fontSize}px -apple-system, blinkmacsystemfont, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(initials, size / 2, size / 2);

        // Download
        const link = document.createElement("a");
        link.download = `avatar-${size}px.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      }

      function randomAvatar() {
        const colors = [
          ["#667eea", "#764ba2"],
          ["#f093fb", "#f5576c"],
          ["#4facfe", "#00f2fe"],
          ["#43e97b", "#38f9d7"],
          ["#fa709a", "#fee140"],
          ["#ff9a9e", "#fecfef"],
          ["#a8edea", "#fed6e3"],
          ["#ffecd2", "#fcb69f"],
          ["#11998e", "#38ef7d"]
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        color1 = randomColor[0];
        color2 = randomColor[1];

        const shapes = ["circle", "rounded", "square"];
        setShape(shapes[Math.floor(Math.random() * shapes.length)]);

        updateAvatar();
      }

      updateAvatar();
    
