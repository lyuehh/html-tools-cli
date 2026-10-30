// @ts-nocheck
// Generated from tools/education/unit-circle.html
// Source SHA-256: ad22f9e106c58aac8fbaf7de876afc1f5a3a87787b03e51e7bbb5ab26ddf59e2
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 160;

      let currentAngle = 45;

      function draw() {
        const isDark =
          window.matchMedia("(prefers-color-scheme: dark)").matches ||
          getComputedStyle(document.documentElement).getPropertyValue("--bg").trim() === "#0a0a0f";

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bgColor = isDark ? "#0a0a0f" : "#f5f5f5";
        const gridColor = isDark ? "#2a2a3a" : "#e0e0e0";
        const textColor = isDark ? "#888" : "#666";
        const mainColor = isDark ? "#fff" : "#333";

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX + i * (radius / 2), 30);
          ctx.lineTo(centerX + i * (radius / 2), canvas.height - 30);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(30, centerY + i * (radius / 2));
          ctx.lineTo(canvas.width - 30, centerY + i * (radius / 2));
          ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = mainColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, centerY);
        ctx.lineTo(canvas.width - 30, centerY);
        ctx.moveTo(centerX, 30);
        ctx.lineTo(centerX, canvas.height - 30);
        ctx.stroke();

        // Axis labels
        ctx.fillStyle = textColor;
        ctx.font = "14px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("x", canvas.width - 20, centerY - 10);
        ctx.fillText("y", centerX + 15, 25);
        ctx.fillText("1", centerX + radius + 10, centerY + 20);
        ctx.fillText("-1", centerX - radius - 10, centerY + 20);
        ctx.fillText("1", centerX + 10, centerY - radius - 5);
        ctx.fillText("-1", centerX + 15, centerY + radius + 15);

        // Draw unit circle
        ctx.strokeStyle = mainColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        const rad = (currentAngle * Math.PI) / 180;
        const x = Math.cos(rad);
        const y = Math.sin(rad);
        const px = centerX + x * radius;
        const py = centerY - y * radius;

        // Draw angle arc
        ctx.strokeStyle = "#8b5cf6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 40, 0, -rad, rad > 0);
        ctx.stroke();

        // Draw cos line (green)
        ctx.strokeStyle = "#22c55e";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, centerY);
        ctx.stroke();

        // Draw sin line (red)
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(px, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Draw tan line (yellow)
        if (Math.abs(Math.cos(rad)) > 0.01) {
          const tanLength = Math.tan(rad);
          const tanY = centerY - tanLength * radius;
          const clampedTanY = Math.max(30, Math.min(canvas.height - 30, tanY));

          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(centerX + radius, centerY);
          ctx.lineTo(centerX + radius, clampedTanY);
          ctx.stroke();

          // Tangent line from origin
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(centerX + radius, clampedTanY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw radius line
        ctx.strokeStyle = "#8b5cf6";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Draw point on circle
        ctx.fillStyle = "#8b5cf6";
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw coordinate label
        ctx.fillStyle = mainColor;
        ctx.font = "12px system-ui";
        ctx.textAlign = "left";
        const labelX = px + 15;
        const labelY = py - 15;
        ctx.fillText("(" + x.toFixed(2) + ", " + y.toFixed(2) + ")", labelX, labelY);

        // Angle label
        ctx.fillStyle = "#8b5cf6";
        ctx.font = "14px system-ui";
        ctx.textAlign = "center";
        const labelRad = rad / 2;
        ctx.fillText(
          currentAngle + "°",
          centerX + 60 * Math.cos(-labelRad),
          centerY + 60 * Math.sin(-labelRad) + 5
        );
      }

      function updateAngle(deg) {
        currentAngle = Math.max(0, Math.min(360, parseFloat(deg) || 0));
        document.getElementById("angleSlider").value = currentAngle;
        document.getElementById("angleInput").value = currentAngle;

        document.querySelectorAll(".angle-btn").forEach((btn) => {
          btn.classList.toggle("active", parseInt(btn.textContent) === currentAngle);
        });

        const rad = (currentAngle * Math.PI) / 180;
        const sinVal = Math.sin(rad);
        const cosVal = Math.cos(rad);
        const tanVal = Math.abs(Math.cos(rad)) < 0.0001 ? "∞" : Math.tan(rad).toFixed(4);

        document.getElementById("radValue").textContent = rad.toFixed(4);
        document.getElementById("sinValue").textContent = sinVal.toFixed(4);
        document.getElementById("cosValue").textContent = cosVal.toFixed(4);
        document.getElementById("tanValue").textContent = tanVal;
        document.getElementById("coordValue").textContent =
          "(" + cosVal.toFixed(2) + ", " + sinVal.toFixed(2) + ")";

        draw();
      }

      function setAngle(deg) {
        updateAngle(deg);
      }

      canvas.addEventListener("mousemove", function (e) {
        if (e.buttons !== 1) return;
        handleCanvasInput(e);
      });

      canvas.addEventListener("click", handleCanvasInput);

      function handleCanvasInput(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX - centerX;
        const y = centerY - (e.clientY - rect.top) * scaleY;

        let angle = (Math.atan2(y, x) * 180) / Math.PI;
        if (angle < 0) angle += 360;

        updateAngle(Math.round(angle));
      }

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);

      updateAngle(45);

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
    
