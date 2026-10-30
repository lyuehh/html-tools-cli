// @ts-nocheck
// Generated from tools/social-media/og-image-generator.html
// Source SHA-256: 4e76e1765d6e0d3665e9828a28dccb2626908d8714b70424b6330f1f51ad59a3
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      /* ===== OG Image Generator Logic ===== */

      const canvas = document.getElementById("ogCanvas");
      const ctx = canvas.getContext("2d");
      const statusEl = document.getElementById("status");
      const sizeLabel = document.getElementById("sizeLabel");

      // Platform sizes
      const PLATFORMS = {
        og: { w: 1200, h: 630, label: "1200 × 630 px — OG / Facebook" },
        twitter: { w: 1200, h: 600, label: "1200 × 600 px — Twitter Card" },
        linkedin: { w: 1200, h: 627, label: "1200 × 627 px — LinkedIn" }
      };

      let currentPlatform = "og";
      let currentTemplate = "gradient";

      // State
      function getState() {
        return {
          title: document.getElementById("inputTitle").value || "Your Amazing Title Here",
          desc: document.getElementById("inputDesc").value,
          site: document.getElementById("inputSite").value,
          emoji: document.getElementById("inputEmoji").value,
          titleSize: parseInt(document.getElementById("titleSize").value, 10),
          descSize: parseInt(document.getElementById("descSize").value, 10),
          bg1: document.getElementById("colorBg1").value,
          bg2: document.getElementById("colorBg2").value,
          accent: document.getElementById("colorAccent").value,
          textColor: document.getElementById("colorText").value
        };
      }

      // Wrap text for canvas
      function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines) {
        var words = text.split(" ");
        var line = "";
        var lines = [];
        for (var i = 0; i < words.length; i++) {
          var testLine = line + (line ? " " : "") + words[i];
          var metrics = context.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            lines.push(line);
            line = words[i];
          } else {
            line = testLine;
          }
        }
        lines.push(line);
        if (maxLines && lines.length > maxLines) {
          lines = lines.slice(0, maxLines);
          lines[maxLines - 1] += "…";
        }
        for (var j = 0; j < lines.length; j++) {
          context.fillText(lines[j], x, y + j * lineHeight);
        }
        return lines.length;
      }

      // Draw helper: rounded rect
      function roundRect(context, x, y, w, h, r) {
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.quadraticCurveTo(x + w, y, x + w, y + r);
        context.lineTo(x + w, y + h - r);
        context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        context.lineTo(x + r, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - r);
        context.lineTo(x, y + r);
        context.quadraticCurveTo(x, y, x + r, y);
        context.closePath();
      }

      // Templates
      var templates = {
        gradient: function (cw, ch, st) {
          var grad = ctx.createLinearGradient(0, 0, cw, ch);
          grad.addColorStop(0, st.bg1);
          grad.addColorStop(1, st.bg2);
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cw, ch);

          // Decorative circles
          ctx.globalAlpha = 0.15;
          ctx.fillStyle = st.accent;
          ctx.beginPath();
          ctx.arc(cw * 0.85, ch * 0.15, ch * 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(cw * 0.1, ch * 0.9, ch * 0.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;

          // Accent line
          ctx.fillStyle = st.accent;
          ctx.fillRect(60, ch - 80, 120, 5);

          var pad = 70;
          var titleY = ch * 0.35;
          if (st.emoji) {
            ctx.font = st.titleSize * 1.1 + "px sans-serif";
            ctx.fillText(st.emoji, pad, titleY - st.titleSize * 0.3);
            titleY += st.titleSize * 0.6;
          }
          ctx.font = "bold " + st.titleSize + "px 'Inter', sans-serif";
          ctx.fillStyle = st.textColor;
          ctx.textBaseline = "top";
          var titleLines = wrapText(
            ctx,
            st.title,
            pad,
            titleY,
            cw - pad * 2,
            st.titleSize * 1.25,
            3
          );
          if (st.desc) {
            var descY = titleY + titleLines * st.titleSize * 1.25 + 24;
            ctx.font = st.descSize + "px 'Inter', sans-serif";
            ctx.fillStyle = hexAlpha(st.textColor, 0.7);
            wrapText(ctx, st.desc, pad, descY, cw - pad * 2, st.descSize * 1.5, 2);
          }
          if (st.site) {
            ctx.font = "500 " + st.descSize * 0.85 + "px 'Inter', sans-serif";
            ctx.fillStyle = st.accent;
            ctx.textBaseline = "bottom";
            ctx.fillText(st.site, pad, ch - 50);
          }
        },

        dark: function (cw, ch, st) {
          ctx.fillStyle = "#0d0d14";
          ctx.fillRect(0, 0, cw, ch);
          // Grid lines
          ctx.strokeStyle = "rgba(255,255,255,0.04)";
          ctx.lineWidth = 1;
          for (var xi = 0; xi < cw; xi += 80) {
            ctx.beginPath();
            ctx.moveTo(xi, 0);
            ctx.lineTo(xi, ch);
            ctx.stroke();
          }
          for (var yi = 0; yi < ch; yi += 80) {
            ctx.beginPath();
            ctx.moveTo(0, yi);
            ctx.lineTo(cw, yi);
            ctx.stroke();
          }
          // Side accent bar
          ctx.fillStyle = st.accent;
          ctx.fillRect(0, 0, 8, ch);

          var pad = 90;
          var cy = ch / 2;
          var titleLines2 = 1;
          if (st.emoji) {
            ctx.font = st.titleSize * 1.1 + "px sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = st.textColor;
            ctx.fillText(st.emoji, pad, cy - st.titleSize * 0.9);
          }
          ctx.font = "bold " + st.titleSize + "px 'Inter', sans-serif";
          ctx.fillStyle = st.textColor;
          ctx.textBaseline = "middle";
          titleLines2 = wrapText(
            ctx,
            st.title,
            pad,
            cy - st.titleSize * 0.5,
            cw - pad * 2,
            st.titleSize * 1.3,
            2
          );
          if (st.desc) {
            ctx.font = st.descSize + "px 'Inter', sans-serif";
            ctx.fillStyle = hexAlpha(st.textColor, 0.6);
            ctx.textBaseline = "top";
            var descY2 = cy + titleLines2 * st.titleSize * 0.8 + 20;
            wrapText(ctx, st.desc, pad, descY2, cw - pad * 2, st.descSize * 1.5, 2);
          }
          if (st.site) {
            ctx.font = "500 " + st.descSize * 0.85 + "px 'Inter', sans-serif";
            ctx.fillStyle = st.accent;
            ctx.textBaseline = "bottom";
            ctx.fillText(st.site, pad, ch - 44);
          }
        },

        light: function (cw, ch, st) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, cw, ch);
          // Thin top bar
          ctx.fillStyle = st.accent;
          ctx.fillRect(0, 0, cw, 10);
          // Bottom stripe
          ctx.fillStyle = "#f4f4f8";
          ctx.fillRect(0, ch - 90, cw, 90);

          var pad = 80;
          var titleY2 = ch * 0.2;
          if (st.emoji) {
            ctx.font = st.titleSize * 1.1 + "px sans-serif";
            ctx.textBaseline = "top";
            ctx.fillText(st.emoji, pad, titleY2);
            titleY2 += st.titleSize * 1.2;
          }
          ctx.font = "bold " + st.titleSize + "px 'Inter', sans-serif";
          ctx.fillStyle = "#111118";
          ctx.textBaseline = "top";
          var tLines = wrapText(ctx, st.title, pad, titleY2, cw - pad * 2, st.titleSize * 1.3, 3);
          if (st.desc) {
            var dY = titleY2 + tLines * st.titleSize * 1.3 + 24;
            ctx.font = st.descSize + "px 'Inter', sans-serif";
            ctx.fillStyle = "#555560";
            wrapText(ctx, st.desc, pad, dY, cw - pad * 2, st.descSize * 1.5, 2);
          }
          if (st.site) {
            ctx.font = "500 " + st.descSize * 0.85 + "px 'Inter', sans-serif";
            ctx.fillStyle = st.accent;
            ctx.textBaseline = "bottom";
            ctx.fillText(st.site, pad, ch - 28);
          }
        },

        split: function (cw, ch, st) {
          var splitX = cw * 0.42;
          // Left panel gradient
          var gL = ctx.createLinearGradient(0, 0, splitX, ch);
          gL.addColorStop(0, st.bg1);
          gL.addColorStop(1, st.bg2);
          ctx.fillStyle = gL;
          ctx.fillRect(0, 0, splitX, ch);
          // Right panel
          ctx.fillStyle = "#0e0e18";
          ctx.fillRect(splitX, 0, cw - splitX, ch);
          // Divider accent
          ctx.fillStyle = st.accent;
          ctx.fillRect(splitX - 3, 0, 6, ch);
          // Emoji / icon on left
          if (st.emoji) {
            ctx.font = ch * 0.35 + "px sans-serif";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(st.emoji, splitX / 2, ch / 2);
            ctx.textAlign = "left";
          } else {
            // Decorative circle
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = st.accent;
            ctx.beginPath();
            ctx.arc(splitX / 2, ch / 2, ch * 0.28, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
          // Right content
          var rPad = splitX + 60;
          var rMax = cw - rPad - 40;
          var rY = ch * 0.25;
          ctx.font = "bold " + st.titleSize * 0.9 + "px 'Inter', sans-serif";
          ctx.fillStyle = st.textColor;
          ctx.textBaseline = "top";
          var tl = wrapText(ctx, st.title, rPad, rY, rMax, st.titleSize * 1.25 * 0.9, 3);
          if (st.desc) {
            var dYs = rY + tl * st.titleSize * 1.15 + 20;
            ctx.font = st.descSize * 0.9 + "px 'Inter', sans-serif";
            ctx.fillStyle = hexAlpha(st.textColor, 0.65);
            wrapText(ctx, st.desc, rPad, dYs, rMax, st.descSize * 1.5, 2);
          }
          if (st.site) {
            ctx.font = "500 " + st.descSize * 0.8 + "px 'Inter', sans-serif";
            ctx.fillStyle = st.accent;
            ctx.textBaseline = "bottom";
            ctx.fillText(st.site, rPad, ch - 44);
          }
        },

        centered: function (cw, ch, st) {
          var grad2 = ctx.createRadialGradient(cw / 2, ch / 2, 0, cw / 2, ch / 2, cw * 0.7);
          grad2.addColorStop(0, st.bg2);
          grad2.addColorStop(1, st.bg1);
          ctx.fillStyle = grad2;
          ctx.fillRect(0, 0, cw, ch);
          // Glow orb
          ctx.globalAlpha = 0.2;
          var gO = ctx.createRadialGradient(cw / 2, ch / 2, 0, cw / 2, ch / 2, ch * 0.55);
          gO.addColorStop(0, st.accent);
          gO.addColorStop(1, "transparent");
          ctx.fillStyle = gO;
          ctx.fillRect(0, 0, cw, ch);
          ctx.globalAlpha = 1;
          // Center text
          ctx.textAlign = "center";
          var cy2 = ch / 2;
          if (st.emoji) {
            ctx.font = st.titleSize * 1.2 + "px sans-serif";
            ctx.textBaseline = "bottom";
            ctx.fillText(st.emoji, cw / 2, cy2 - 10);
          }
          ctx.font = "bold " + st.titleSize + "px 'Inter', sans-serif";
          ctx.fillStyle = st.textColor;
          ctx.textBaseline = "top";
          wrapText(
            ctx,
            st.title,
            80,
            cy2 - (st.emoji ? 20 : st.titleSize * 0.5),
            cw - 160,
            st.titleSize * 1.3,
            2
          );
          if (st.desc) {
            ctx.font = st.descSize + "px 'Inter', sans-serif";
            ctx.fillStyle = hexAlpha(st.textColor, 0.65);
            ctx.textBaseline = "bottom";
            ctx.fillText(
              st.desc.length > 80 ? st.desc.slice(0, 77) + "…" : st.desc,
              cw / 2,
              ch - 70
            );
          }
          if (st.site) {
            ctx.font = "500 " + st.descSize * 0.85 + "px 'Inter', sans-serif";
            ctx.fillStyle = st.accent;
            ctx.textBaseline = "bottom";
            ctx.fillText(st.site, cw / 2, ch - 30);
          }
          ctx.textAlign = "left";
        },

        branded: function (cw, ch, st) {
          ctx.fillStyle = st.bg1;
          ctx.fillRect(0, 0, cw, ch);
          // Brand bar at top
          ctx.fillStyle = st.accent;
          ctx.fillRect(0, 0, cw, 14);
          // Accent rectangle top-right decorative
          ctx.globalAlpha = 0.12;
          ctx.fillStyle = st.accent;
          roundRect(ctx, cw - 220, -40, 240, 240, 120);
          ctx.fill();
          ctx.globalAlpha = 1;
          // Site/brand name pill
          if (st.site) {
            ctx.font = "600 " + st.descSize * 0.9 + "px 'Inter', sans-serif";
            var siteMetrics = ctx.measureText(st.site);
            var pillW = siteMetrics.width + 40;
            var pillH = st.descSize * 1.6;
            var pillX = 60;
            var pillY = 60;
            ctx.fillStyle = st.accent;
            roundRect(ctx, pillX, pillY, pillW, pillH, pillH / 2);
            ctx.fill();
            ctx.fillStyle = "#000000";
            ctx.textBaseline = "middle";
            ctx.fillText(st.site, pillX + 20, pillY + pillH / 2);
          }
          var pad3 = 70;
          var titleY3 = ch * 0.32;
          if (st.emoji) {
            ctx.font = st.titleSize * 1.1 + "px sans-serif";
            ctx.textBaseline = "top";
            ctx.fillText(st.emoji, pad3, titleY3);
            titleY3 += st.titleSize * 1.25;
          }
          ctx.font = "bold " + st.titleSize + "px 'Inter', sans-serif";
          ctx.fillStyle = st.textColor;
          ctx.textBaseline = "top";
          var tl3 = wrapText(ctx, st.title, pad3, titleY3, cw - pad3 * 2, st.titleSize * 1.3, 2);
          if (st.desc) {
            var dY3 = titleY3 + tl3 * st.titleSize * 1.3 + 20;
            ctx.font = st.descSize + "px 'Inter', sans-serif";
            ctx.fillStyle = hexAlpha(st.textColor, 0.65);
            wrapText(ctx, st.desc, pad3, dY3, cw - pad3 * 2, st.descSize * 1.5, 2);
          }
          // Bottom bar
          ctx.fillStyle = hexAlpha(st.accent, 0.08);
          ctx.fillRect(0, ch - 70, cw, 70);
          ctx.fillStyle = st.accent;
          ctx.fillRect(0, ch - 4, cw, 4);
        }
      };

      function hexAlpha(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
      }

      function render() {
        var p = PLATFORMS[currentPlatform];
        canvas.width = p.w;
        canvas.height = p.h;
        ctx.clearRect(0, 0, p.w, p.h);
        var st = getState();
        ctx.save();
        templates[currentTemplate](p.w, p.h, st);
        ctx.restore();

        // Scale canvas for display
        var wrapper = canvas.parentElement;
        var availW = wrapper.offsetWidth - 0;
        var scale = Math.min(1, availW / p.w);
        canvas.style.width = Math.round(p.w * scale) + "px";
        canvas.style.height = Math.round(p.h * scale) + "px";

        sizeLabel.textContent = p.label;
        showStatus("渲染完成", "success");
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      // Platform tabs
      document.querySelectorAll(".platform-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          document.querySelectorAll(".platform-tab").forEach(function (t) {
            t.classList.remove("active");
          });
          tab.classList.add("active");
          currentPlatform = tab.dataset.platform;
          render();
        });
      });

      // Template buttons
      document.querySelectorAll(".tpl-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".tpl-btn").forEach(function (b) {
            b.classList.remove("active");
          });
          btn.classList.add("active");
          currentTemplate = btn.dataset.tpl;
          applyTemplateDefaults(currentTemplate);
          render();
        });
      });

      function applyTemplateDefaults(tpl) {
        var defaults = {
          gradient: { bg1: "#0a0a0f", bg2: "#1a1a2e", accent: "#00f5d4", text: "#e8e8ed" },
          dark: { bg1: "#0d0d14", bg2: "#0d0d14", accent: "#f72585", text: "#e8e8ed" },
          light: { bg1: "#ffffff", bg2: "#f4f4f8", accent: "#00d4b8", text: "#111118" },
          split: { bg1: "#12121a", bg2: "#2a1a3e", accent: "#8b5cf6", text: "#e8e8ed" },
          centered: { bg1: "#0a0a0f", bg2: "#151530", accent: "#4cc9f0", text: "#e8e8ed" },
          branded: { bg1: "#0e0e18", bg2: "#0e0e18", accent: "#fbbf24", text: "#e8e8ed" }
        };
        var d = defaults[tpl];
        if (!d) return;
        setColor("colorBg1", d.bg1);
        setColor("colorBg2", d.bg2);
        setColor("colorAccent", d.accent);
        setColor("colorText", d.text);
      }

      function setColor(id, hex) {
        document.getElementById(id).value = hex;
        document.getElementById(id + "Hex").value = hex;
      }

      // Color sync: swatch ↔ hex
      ["colorBg1", "colorBg2", "colorAccent", "colorText"].forEach(function (id) {
        var swatch = document.getElementById(id);
        var hexInput = document.getElementById(id + "Hex");
        swatch.addEventListener("input", function () {
          hexInput.value = swatch.value;
          render();
        });
        hexInput.addEventListener("input", function () {
          var val = hexInput.value.trim();
          if (/^#[0-9a-fA-F]{6}$/.test(val)) {
            swatch.value = val;
            render();
          }
        });
      });

      // Range sliders
      document.getElementById("titleSize").addEventListener("input", function () {
        document.getElementById("titleSizeVal").textContent = this.value;
        render();
      });
      document.getElementById("descSize").addEventListener("input", function () {
        document.getElementById("descSizeVal").textContent = this.value;
        render();
      });

      // Text inputs
      ["inputTitle", "inputDesc", "inputSite", "inputEmoji"].forEach(function (id) {
        document.getElementById(id).addEventListener("input", render);
      });

      // Render button
      document.getElementById("btnRender").onclick = render;

      // Download PNG
      document.getElementById("btnDownloadPng").onclick = function () {
        render();
        var p = PLATFORMS[currentPlatform];
        var link = document.createElement("a");
        link.download = "og-image-" + currentPlatform + "-" + p.w + "x" + p.h + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        showStatus("已下载 PNG", "success");
      };

      // Copy Data URL
      document.getElementById("btnCopyDataUrl").onclick = async function () {
        render();
        var dataUrl = canvas.toDataURL("image/png");
        try {
          await navigator.clipboard.writeText(dataUrl);
          showStatus("Data URL 已复制到剪贴板", "success");
        } catch (e) {
          showStatus("复制失败，请手动复制", "error");
        }
      };

      // Reset
      document.getElementById("btnReset").onclick = function () {
        document.getElementById("inputTitle").value = "";
        document.getElementById("inputDesc").value = "";
        document.getElementById("inputSite").value = "";
        document.getElementById("inputEmoji").value = "";
        document.getElementById("titleSize").value = 60;
        document.getElementById("titleSizeVal").textContent = "60";
        document.getElementById("descSize").value = 28;
        document.getElementById("descSizeVal").textContent = "28";
        currentTemplate = "gradient";
        currentPlatform = "og";
        document.querySelectorAll(".tpl-btn").forEach(function (b) {
          b.classList.toggle("active", b.dataset.tpl === "gradient");
        });
        document.querySelectorAll(".platform-tab").forEach(function (t) {
          t.classList.toggle("active", t.dataset.platform === "og");
        });
        applyTemplateDefaults("gradient");
        render();
        showStatus("已重置", "success");
      };

      // Initial render
      render();

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
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem("theme"))
          document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      });

      initTheme();
    
