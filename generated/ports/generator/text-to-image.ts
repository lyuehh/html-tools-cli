// @ts-nocheck
// Generated from tools/generator/text-to-image.html
// Source SHA-256: 7fc0e28ea573d75e1a25c6f92fb11c1a8f2c7b2ad4cf424997feb27cd4d189d9
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      document.addEventListener("DOMContentLoaded", () => {
        initTheme();
        render();
      });

      function initTheme() {
        const s = localStorage.getItem("theme");
        if (s) document.documentElement.setAttribute("data-theme", s);
      }
      window.toggleTheme = function () {
        const c = document.documentElement.getAttribute("data-theme");
        const n = c === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", n);
        localStorage.setItem("theme", n);
      };

      window.setSize = function (w, h) {
        document.getElementById("canvasWidth").value = w;
        document.getElementById("canvasHeight").value = h;
        render();
      };

      window.applyPreset = function (name) {
        const presets = {
          gradient1: { bg: "#667eea", text: "#ffffff" },
          gradient2: { bg: "#f5576c", text: "#ffffff" },
          gradient3: { bg: "#4facfe", text: "#ffffff" },
          dark: { bg: "#1a1a2e", text: "#eeeeee" },
          light: { bg: "#ffffff", text: "#333333" }
        };
        const p = presets[name];
        document.getElementById("bgColor").value = p.bg;
        document.getElementById("bgColorText").value = p.bg;
        document.getElementById("textColor").value = p.text;
        document.getElementById("textColorText").value = p.text;
        render();
      };

      function render() {
        const w = parseInt(document.getElementById("canvasWidth").value) || 800;
        const h = parseInt(document.getElementById("canvasHeight").value) || 600;
        canvas.width = w;
        canvas.height = h;

        // Background
        ctx.fillStyle = document.getElementById("bgColor").value;
        ctx.fillRect(0, 0, w, h);

        // Text
        const text = document.getElementById("textContent").value || "";
        const fontSize = parseInt(document.getElementById("fontSize").value);
        const fontFamily = document.getElementById("fontFamily").value;
        const textColor = document.getElementById("textColor").value;
        const textAlign = document.getElementById("textAlign").value;
        const enableShadow = document.getElementById("enableShadow").checked;

        ctx.fillStyle = textColor;
        ctx.font = fontSize + "px " + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = "middle";

        if (enableShadow) {
          ctx.shadowColor = "rgba(0,0,0,0.3)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;
        }

        const lines = text.split("\n");
        const lineHeight = fontSize * 1.4;
        const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
        const x = textAlign === "center" ? w / 2 : textAlign === "left" ? 40 : w - 40;

        lines.forEach((line, i) => {
          ctx.fillText(line, x, startY + i * lineHeight);
        });

        ctx.shadowColor = "transparent";
      }

      window.download = function (format) {
        const link = document.createElement("a");
        link.download = "text-card." + format;
        link.href = canvas.toDataURL("image/" + (format === "jpg" ? "jpeg" : "png"), 0.95);
        link.click();
        showToast("图片已下载");
      };

      window.copyImage = async function () {
        try {
          const blob = await new Promise((r) => canvas.toBlob(r, "image/png"));
          await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
          showToast("图片已复制");
        } catch (e) {
          showToast("复制失败");
        }
      };

      function showToast(m) {
        const t = document.createElement("div");
        t.className = "toast";
        t.textContent = m;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
      }
    
