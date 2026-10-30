// @ts-nocheck
// Generated from tools/dev/color-converter.html
// Source SHA-256: 9a6e935382643bca9e3b138216189041ea0221a5e21a2920164918bef5112eb4
// MIT: Copyright (c) 2025 chico; 2025-2026 chicogong

      const colorPicker = document.getElementById("colorPicker");
      const hexInput = document.getElementById("hexInput");
      const rgbInput = document.getElementById("rgbInput");
      const hslInput = document.getElementById("hslInput");
      const preview = document.getElementById("preview");
      const previewText = document.getElementById("previewText");
      const rSlider = document.getElementById("rSlider");
      const gSlider = document.getElementById("gSlider");
      const bSlider = document.getElementById("bSlider");
      const statusEl = document.getElementById("status");

      let currentColor = { r: 13, g: 110, b: 253 };

      // 颜色转换函数
      function rgbToHex(r, g, b) {
        return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
      }

      function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        if (hex.length === 3) {
          hex = hex
            .split("")
            .map((c) => c + c)
            .join("");
        }
        const num = parseInt(hex, 16);
        return {
          r: (num >> 16) & 255,
          g: (num >> 8) & 255,
          b: num & 255
        };
      }

      function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        let h,
          s,
          l = (max + min) / 2;

        if (max === min) {
          h = s = 0;
        } else {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
              break;
            case g:
              h = ((b - r) / d + 2) / 6;
              break;
            case b:
              h = ((r - g) / d + 4) / 6;
              break;
          }
        }
        return {
          h: Math.round(h * 360),
          s: Math.round(s * 100),
          l: Math.round(l * 100)
        };
      }

      function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;

        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          };
          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
        };
      }

      // 解析输入
      function parseHex(str) {
        const match = str.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (match) {
          return hexToRgb(match[1]);
        }
        return null;
      }

      function parseRgb(str) {
        const match = str.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
        if (match) {
          return {
            r: Math.min(255, parseInt(match[1])),
            g: Math.min(255, parseInt(match[2])),
            b: Math.min(255, parseInt(match[3]))
          };
        }
        return null;
      }

      function parseHsl(str) {
        const match = str.match(/hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/i);
        if (match) {
          return hslToRgb(
            parseInt(match[1]) % 360,
            Math.min(100, parseInt(match[2])),
            Math.min(100, parseInt(match[3]))
          );
        }
        return null;
      }

      // 更新显示
      function updateDisplay() {
        const { r, g, b } = currentColor;
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);

        // 更新输入框
        hexInput.value = hex;
        rgbInput.value = `rgb(${r}, ${g}, ${b})`;
        hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        // 更新取色器
        colorPicker.value = hex;

        // 更新滑块
        rSlider.value = r;
        gSlider.value = g;
        bSlider.value = b;
        document.getElementById("rValue").textContent = r;
        document.getElementById("gValue").textContent = g;
        document.getElementById("bValue").textContent = b;

        // 更新预览
        preview.style.background = hex;
        previewText.textContent = hex;

        // 根据亮度调整文字颜色
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        previewText.style.color = brightness > 128 ? "#212529" : "#ffffff";

        // 更新预设选中状态
        document.querySelectorAll(".preset").forEach((p) => {
          p.classList.toggle("active", p.dataset.color.toLowerCase() === hex.toLowerCase());
        });

        // 保存到 URL
        history.replaceState(null, "", "#" + hex.slice(1));
      }

      function showStatus(msg, type) {
        statusEl.textContent = msg;
        statusEl.className = "status " + (type || "");
      }

      window.copyValue = async function (inputId) {
        const value = document.getElementById(inputId).value;
        try {
          await navigator.clipboard.writeText(value);
          showStatus("已复制: " + value, "success");
        } catch (e) {
          showStatus("复制失败", "error");
        }
      };

      // 事件绑定
      colorPicker.addEventListener("input", (e) => {
        currentColor = hexToRgb(e.target.value);
        updateDisplay();
      });

      hexInput.addEventListener("input", (e) => {
        const rgb = parseHex(e.target.value);
        if (rgb) {
          currentColor = rgb;
          updateDisplay();
        }
      });

      rgbInput.addEventListener("input", (e) => {
        const rgb = parseRgb(e.target.value);
        if (rgb) {
          currentColor = rgb;
          updateDisplay();
        }
      });

      hslInput.addEventListener("input", (e) => {
        const rgb = parseHsl(e.target.value);
        if (rgb) {
          currentColor = rgb;
          updateDisplay();
        }
      });

      [rSlider, gSlider, bSlider].forEach((slider) => {
        slider.addEventListener("input", () => {
          currentColor = {
            r: parseInt(rSlider.value),
            g: parseInt(gSlider.value),
            b: parseInt(bSlider.value)
          };
          updateDisplay();
        });
      });

      document.querySelectorAll(".preset").forEach((preset) => {
        preset.addEventListener("click", () => {
          currentColor = hexToRgb(preset.dataset.color);
          updateDisplay();
        });
      });

      // 从 URL 加载
      window.loadFromUrl = function () {
        const hash = location.hash.slice(1);
        if (hash) {
          const rgb = parseHex(hash);
          if (rgb) {
            currentColor = rgb;
            return true;
          }
        }
        return false;
      };

      // 初始化
      if (!loadFromUrl()) {
        currentColor = { r: 13, g: 110, b: 253 };
      }
      updateDisplay();

      window.toggleTheme = function () {
        const html = document.documentElement;
        const btn = document.querySelector(".theme-toggle");
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", next);
        btn.textContent = next === "dark" ? "🌙" : "☀️";
        localStorage.setItem("theme", next);
      };
      (function () {
        const saved = localStorage.getItem("theme");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
          const btn = document.querySelector(".theme-toggle");
          if (btn) btn.textContent = saved === "dark" ? "🌙" : "☀️";
        }
      })();
    
