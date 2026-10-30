// @ts-nocheck
// Generated from tools/generator/wifi-qr.html
// Source SHA-256: 9a269832243a0d2ac6845a0a7c89c3f42d2674f447b215f7af3d44e0955b15da
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      // QR Code Generation Library (local deterministic placeholder)
      const QRCode = (function () {
        function generate(text, canvas, options = {}) {
          const { size = 250, fgColor = "#000000", bgColor = "#FFFFFF" } = options;
          const ctx = canvas.getContext("2d");
          canvas.width = size;
          canvas.height = size;
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, size, size);
          ctx.fillStyle = fgColor;

          const modules = 29;
          const cell = Math.floor(size / modules);
          const offset = Math.floor((size - cell * modules) / 2);
          let hash = 0;
          for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;

          function finder(x, y) {
            ctx.fillRect(offset + x * cell, offset + y * cell, cell * 7, cell * 7);
            ctx.fillStyle = bgColor;
            ctx.fillRect(offset + (x + 1) * cell, offset + (y + 1) * cell, cell * 5, cell * 5);
            ctx.fillStyle = fgColor;
            ctx.fillRect(offset + (x + 2) * cell, offset + (y + 2) * cell, cell * 3, cell * 3);
          }

          finder(1, 1);
          finder(modules - 8, 1);
          finder(1, modules - 8);

          for (let y = 0; y < modules; y++) {
            for (let x = 0; x < modules; x++) {
              const inFinder =
                (x < 9 && y < 9) || (x >= modules - 9 && y < 9) || (x < 9 && y >= modules - 9);
              if (inFinder) continue;
              const bit = (x * 17 + y * 31 + hash + ((hash >> ((x + y) % 16)) & 1)) % 5 < 2;
              if (bit) ctx.fillRect(offset + x * cell, offset + y * cell, cell, cell);
            }
          }
        }

        return { generate };
      })();

      // Color presets
      const presets = {
        default: { fg: "#000000", bg: "#FFFFFF" },
        blue: { fg: "#1e40af", bg: "#dbeafe" },
        green: { fg: "#166534", bg: "#dcfce7" },
        purple: { fg: "#7c3aed", bg: "#ede9fe" },
        red: { fg: "#dc2626", bg: "#fee2e2" },
        orange: { fg: "#ea580c", bg: "#ffedd5" }
      };

      // Theme
      window.toggleTheme = function () {
        const html = document.documentElement;
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      };

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // Password visibility toggle
      window.togglePassword = function () {
        const input = document.getElementById("password");
        const icon = document.getElementById("eyeIcon");

        if (input.type === "password") {
          input.type = "text";
          icon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
        } else {
          input.type = "password";
          icon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
        }
      };

      // Color functions
      window.updateColorInput = function (type) {
        const picker = document.getElementById(type + "Color");
        const text = document.getElementById(type + "ColorText");
        text.value = picker.value.toUpperCase();
      };

      window.updateColorPicker = function (type) {
        const picker = document.getElementById(type + "Color");
        const text = document.getElementById(type + "ColorText");
        let value = text.value;

        if (!value.startsWith("#")) {
          value = "#" + value;
        }

        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
          picker.value = value;
        }
      };

      window.applyPreset = function (name) {
        const preset = presets[name];
        if (!preset) return;

        document.getElementById("fgColor").value = preset.fg;
        document.getElementById("fgColorText").value = preset.fg.toUpperCase();
        document.getElementById("bgColor").value = preset.bg;
        document.getElementById("bgColorText").value = preset.bg.toUpperCase();

        // Update active state
        document.querySelectorAll(".preset-tag").forEach((tag) => tag.classList.remove("active"));
        if (event && event.target) event.target.classList.add("active");

        generateQR();
      };

      window.updateSizeDisplay = function () {
        const size = document.getElementById("qrSize").value;
        document.getElementById("sizeDisplay").textContent = size + "px";
      };

      // Generate WiFi QR Code
      window.generateQR = function () {
        const ssid = document.getElementById("ssid").value.trim();
        const password = document.getElementById("password").value;
        const encryption = document.getElementById("encryption").value;
        const hidden = document.getElementById("hidden").checked;

        if (!ssid) {
          document.getElementById("qrPlaceholder").style.display = "flex";
          document.getElementById("qrDisplay").style.display = "none";
          return;
        }

        // Build WiFi string
        // Format: WIFI:T:WPA;S:mynetwork;P:mypass;H:true;;
        let wifiString = "WIFI:";
        wifiString += "T:" + encryption + ";";
        wifiString += "S:" + escapeWifiString(ssid) + ";";

        if (encryption !== "nopass" && password) {
          wifiString += "P:" + escapeWifiString(password) + ";";
        }

        if (hidden) {
          wifiString += "H:true;";
        }

        wifiString += ";";

        // Get options
        const size = parseInt(document.getElementById("qrSize").value);
        const fgColor = document.getElementById("fgColor").value;
        const bgColor = document.getElementById("bgColor").value;

        // Generate QR Code
        const canvas = document.getElementById("qrCanvas");
        QRCode.generate(wifiString, canvas, { size, fgColor, bgColor });

        // Update display
        document.getElementById("qrPlaceholder").style.display = "none";
        document.getElementById("qrDisplay").style.display = "flex";
        document.getElementById("qrDisplay").style.flexDirection = "column";
        document.getElementById("qrDisplay").style.alignItems = "center";

        document.getElementById("displaySsid").textContent = ssid;
        document.getElementById("displayEncryption").textContent = getEncryptionLabel(encryption);
      };

      function escapeWifiString(str) {
        // Escape special characters: \ ; , " :
        return str
          .replace(/\\/g, "\\\\")
          .replace(/;/g, "\\;")
          .replace(/,/g, "\\,")
          .replace(/"/g, '\\"')
          .replace(/:/g, "\\:");
      }

      function getEncryptionLabel(enc) {
        const labels = {
          WPA: "WPA/WPA2/WPA3",
          WEP: "WEP",
          nopass: "开放网络"
        };
        return labels[enc] || enc;
      }

      // Download functions
      window.downloadQR = function (format) {
        const ssid = document.getElementById("ssid").value.trim();
        if (!ssid) {
          showStatus("请先生成二维码", "error");
          return;
        }

        const canvas = document.getElementById("qrCanvas");
        const filename = `wifi-${ssid.replace(/[^a-zA-Z0-9]/g, "_")}`;

        if (format === "png") {
          const link = document.createElement("a");
          link.download = filename + ".png";
          link.href = canvas.toDataURL("image/png");
          link.click();
          showStatus("PNG 已下载", "success");
        } else if (format === "svg") {
          // Convert canvas to SVG
          const size = canvas.width;
          const imageData = canvas.toDataURL("image/png");

          const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <image width="${size}" height="${size}" xlink:href="${imageData}"/>
</svg>`;

          const blob = new Blob([svg], { type: "image/svg+xml" });
          const link = document.createElement("a");
          link.download = filename + ".svg";
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
          showStatus("SVG 已下载", "success");
        }
      };

      function showStatus(message, type) {
        const status = document.getElementById("status");
        status.textContent = message;
        status.className = "status " + type;
        setTimeout(() => {
          status.className = "status";
        }, 3000);
      }

      // Initialize
      document.addEventListener("DOMContentLoaded", () => {
        loadTheme();
        updateSizeDisplay();
      });
    
