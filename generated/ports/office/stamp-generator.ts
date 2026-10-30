// @ts-nocheck
// Generated from tools/office/stamp-generator.html
// Source SHA-256: 2ffebd9de2e8f751224c3e6ed60fa97655ae6e7463536667f50401e9a120b6fd
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // DOM Elements
      var companyNameEl = document.getElementById("companyName");
      var subtitleEl = document.getElementById("subtitle");
      var shapeEl = document.getElementById("shape");
      var borderColorEl = document.getElementById("borderColor");
      var borderWidthEl = document.getElementById("borderWidth");
      var showStarEl = document.getElementById("showStar");
      var canvas = document.getElementById("previewCanvas");
      var ctx = canvas.getContext("2d");
      var statusEl = document.getElementById("status");

      // Constants
      var LS_KEY = "stamp_generator_config";
      var CANVAS_SIZE = 300;
      var PADDING = 20;

      // Load saved config
      function loadConfig() {
        try {
          var saved = localStorage.getItem(LS_KEY);
          if (saved) {
            var config = JSON.parse(saved);
            if (config.companyName) companyNameEl.value = config.companyName;
            if (config.subtitle) subtitleEl.value = config.subtitle;
            if (config.shape) shapeEl.value = config.shape;
            if (config.borderColor) borderColorEl.value = config.borderColor;
            if (config.borderWidth) borderWidthEl.value = config.borderWidth;
            if (typeof config.showStar === "boolean") showStarEl.checked = config.showStar;
          }
        } catch (e) {
          // Ignore
        }
      }

      // Save config
      function saveConfig() {
        var config = {
          companyName: companyNameEl.value,
          subtitle: subtitleEl.value,
          shape: shapeEl.value,
          borderColor: borderColorEl.value,
          borderWidth: borderWidthEl.value,
          showStar: showStarEl.checked
        };
        localStorage.setItem(LS_KEY, JSON.stringify(config));
      }

      // Draw five-pointed star
      function drawStar(cx, cy, outerRadius, innerRadius, color) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color;

        for (var i = 0; i < 5; i++) {
          // Outer point
          var outerAngle = Math.PI / 2 + (i * 2 * Math.PI) / 5;
          var outerX = cx + Math.cos(outerAngle) * outerRadius;
          var outerY = cy - Math.sin(outerAngle) * outerRadius;

          if (i === 0) {
            ctx.moveTo(outerX, outerY);
          } else {
            ctx.lineTo(outerX, outerY);
          }

          // Inner point
          var innerAngle = outerAngle + Math.PI / 5;
          var innerX = cx + Math.cos(innerAngle) * innerRadius;
          var innerY = cy - Math.sin(innerAngle) * innerRadius;
          ctx.lineTo(innerX, innerY);
        }

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // Draw text along arc (for circular stamps)
      function drawTextArc(text, cx, cy, radius, startAngle, endAngle, color, fontSize) {
        if (!text) return;

        ctx.save();
        ctx.fillStyle = color;
        ctx.font = "bold " + fontSize + "px SimHei, 'Microsoft YaHei', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        var chars = text.split("");
        var totalAngle = endAngle - startAngle;
        var anglePerChar = totalAngle / (chars.length + 1);

        for (var i = 0; i < chars.length; i++) {
          var angle = startAngle + anglePerChar * (i + 1);
          var x = cx + Math.cos(angle) * radius;
          var y = cy + Math.sin(angle) * radius;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(chars[i], 0, 0);
          ctx.restore();
        }

        ctx.restore();
      }

      // Draw stamp
      function drawStamp() {
        var companyName = companyNameEl.value.trim() || "示例公司名称";
        var subtitle = subtitleEl.value.trim();
        var shape = shapeEl.value;
        var color = borderColorEl.value;
        var borderWidth = parseInt(borderWidthEl.value, 10);
        var showStar = showStarEl.checked;

        var cx = CANVAS_SIZE / 2;
        var cy = CANVAS_SIZE / 2;

        // Clear canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Set line style
        ctx.strokeStyle = color;
        ctx.lineWidth = borderWidth;

        if (shape === "circle") {
          var radius = (CANVAS_SIZE - PADDING * 2 - borderWidth) / 2;

          // Draw outer circle
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.stroke();

          // Draw inner circle (optional)
          ctx.beginPath();
          ctx.arc(cx, cy, radius - 8, 0, Math.PI * 2);
          ctx.stroke();

          // Draw company name along top arc
          var textRadius = radius - 25;
          drawTextArc(companyName, cx, cy, textRadius, Math.PI * 1.2, Math.PI * 1.8, color, 18);

          // Draw star in center
          if (showStar) {
            drawStar(cx, cy, 28, 12, color);
          }

          // Draw subtitle at bottom
          if (subtitle) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.font = "bold 14px SimHei, 'Microsoft YaHei', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(subtitle, cx, cy + 55);
            ctx.restore();
          }
        } else if (shape === "oval") {
          var radiusX = (CANVAS_SIZE - PADDING * 2 - borderWidth) / 2;
          var radiusY = radiusX * 0.65;

          // Draw outer ellipse
          ctx.beginPath();
          ctx.ellipse(cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Draw inner ellipse
          ctx.beginPath();
          ctx.ellipse(cx, cy, radiusX - 6, radiusY - 6, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Draw company name along top arc (adjusted for oval)
          var textRadiusOval = radiusY - 20;
          drawTextArc(
            companyName,
            cx,
            cy,
            textRadiusOval,
            Math.PI * 1.15,
            Math.PI * 1.85,
            color,
            16
          );

          // Draw star in center
          if (showStar) {
            drawStar(cx, cy, 22, 9, color);
          }

          // Draw subtitle at bottom
          if (subtitle) {
            ctx.save();
            ctx.fillStyle = color;
            ctx.font = "bold 12px SimHei, 'Microsoft YaHei', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(subtitle, cx, cy + 35);
            ctx.restore();
          }
        } else if (shape === "rectangle") {
          var rectWidth = CANVAS_SIZE - PADDING * 2;
          var rectHeight = rectWidth * 0.4;
          var rectX = PADDING;
          var rectY = (CANVAS_SIZE - rectHeight) / 2;

          // Draw outer rectangle
          ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

          // Draw inner rectangle
          ctx.strokeRect(rectX + 5, rectY + 5, rectWidth - 10, rectHeight - 10);

          // Draw company name centered
          ctx.save();
          ctx.fillStyle = color;
          ctx.font = "bold 20px SimHei, 'Microsoft YaHei', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          if (subtitle) {
            ctx.fillText(companyName, cx, cy - 15);
            ctx.font = "bold 14px SimHei, 'Microsoft YaHei', sans-serif";
            ctx.fillText(subtitle, cx, cy + 15);
          } else {
            ctx.fillText(companyName, cx, cy);
          }

          ctx.restore();

          // Draw star (left side for rectangle)
          if (showStar) {
            drawStar(rectX + 40, cy, 18, 7, color);
          }
        }

        showStatus("印章已生成", "success");
        saveConfig();
      }

      // Download as PNG
      function downloadPNG() {
        var companyName = companyNameEl.value.trim() || "stamp";
        var fileName = companyName.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_") + "_stamp.png";

        var link = document.createElement("a");
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();

        showStatus("已下载 " + fileName, "success");
      }

      // Clear all
      function clearAll() {
        companyNameEl.value = "";
        subtitleEl.value = "";
        shapeEl.value = "circle";
        borderColorEl.value = "#dc2626";
        borderWidthEl.value = "5";
        showStarEl.checked = true;

        localStorage.removeItem(LS_KEY);
        drawStamp();
        showStatus("已清空", "success");
      }

      // Show status message
      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Event listeners
      document.getElementById("btnPreview").onclick = drawStamp;
      document.getElementById("btnDownload").onclick = downloadPNG;
      document.getElementById("btnClear").onclick = clearAll;

      // Auto-preview on input change
      companyNameEl.addEventListener("input", drawStamp);
      subtitleEl.addEventListener("input", drawStamp);
      shapeEl.addEventListener("change", drawStamp);
      borderColorEl.addEventListener("input", drawStamp);
      borderWidthEl.addEventListener("change", drawStamp);
      showStarEl.addEventListener("change", drawStamp);

      // Theme toggle
      function toggleTheme() {
        var html = document.documentElement;
        var currentTheme = html.getAttribute("data-theme") || "dark";
        var newTheme = currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      function initTheme() {
        var savedTheme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var theme = savedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.setAttribute("data-theme", theme);
      }

      // Initialize
      initTheme();
      loadConfig();
      drawStamp();
    
